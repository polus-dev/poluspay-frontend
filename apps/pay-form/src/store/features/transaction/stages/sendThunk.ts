import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    setStage,
    setStageText,
    StageId,
    StageStatus,
} from '../transactionSlice';
import { waitForTransaction } from '@wagmi/core';
import {
    fetchFeeData,
    prepareSendTransaction,
    sendTransaction,
} from 'wagmi/actions';
import { SwapOptions, SwapRouter } from '@uniswap/universal-router-sdk';

import { Percent } from '@uniswap/sdk-core';
import { encodePay } from '../../../../logic/transactionEncode/transactionEncode';
import { doPayThroughPolusContract } from '../../../../logic/transactionEncode/doPayThroughPolusContract';
import { ThunkConfig } from '../../../store';
import { CustomRouter } from '../../../../logic/router';
import { ChainId } from '../../../api/endpoints/types';
import { CustomProvider, WrapAltToken } from '../../../../logic/payment';
import { Token as ERC20 } from '@uniswap/sdk-core';
import { getPathFromCallData } from '../../../../logic/utils';
import {
    ProgressBarAction,
    setProgressBar,
} from '../../smartLine/smartLineSlice';
export const sendThunk = createAsyncThunk<any, void, ThunkConfig>(
    'transaction/sendThunk',
    async (_, { getState, dispatch, rejectWithValue }) => {
        const currentStage = () => getState().transaction.currentStage;
        const sendAmount =
            getState().transaction.amount;

        const {
            signature,
            fee,
            uuid,
            expireAt,
            feeAddress,
            merchantAddress,
            merchantAmount,
        } = getState().transaction.stages[StageId.SEND];

        const helper = getState().transaction.helper;

        if (
            !helper ||
            !sendAmount ||
            !currentStage ||
            !fee ||
            !uuid ||
            !expireAt ||
            !feeAddress ||
            !merchantAddress ||
            !merchantAmount
        ) {
            throw new Error('Invalid data');
        }

        try {
            dispatch(
                setStage({
                    status: StageStatus.LOADING,
                    text: 'Calculate fee',
                })
            );

            // const feeData = await fetchFeeData();
            // const maxPriorityFeePerGas = feeData.maxPriorityFeePerGas
            //     ? feeData.maxPriorityFeePerGas
            //     : undefined;
            // const maxFeePerGas =
            //     maxPriorityFeePerGas && feeData.lastBaseFeePerGas
            //         ? maxPriorityFeePerGas + feeData.lastBaseFeePerGas * 2n
            //         : undefined;
            let preparedTransaction: Awaited<
                ReturnType<typeof prepareSendTransaction>
            >;

            if (helper.Context === 'universal router') {
                const currentBlockchain =
                    getState().connection.currentBlockchain;
                if (!currentBlockchain)
                    return rejectWithValue(
                        'useTokenPrice: No blockchain'
                    ) as any;

                const router = new CustomRouter(ChainId[currentBlockchain]);
                const tokenA = helper.userToken.is_native
                    ? WrapAltToken.wrap(ChainId[currentBlockchain])
                    : new ERC20(
                          ChainId[currentBlockchain],
                          helper.userToken.contract,
                          helper.userToken.decimals
                      );
                const tokenB = helper.merchantToken.is_native
                    ? WrapAltToken.wrap(ChainId[currentBlockchain])
                    : new ERC20(
                          ChainId[currentBlockchain],
                          helper.merchantToken.contract,
                          helper.merchantToken.decimals
                      );
                const amountOut = BigInt(fee) + BigInt(merchantAmount);
                const response1 = await router.getRouter(
                    amountOut,
                    tokenA,
                    tokenB
                );

                if (!response1) {
                    return rejectWithValue('No response from router');
                }

                const provider = new CustomProvider(currentBlockchain);

                const deadline = Math.round(
                    new Date(expireAt).getTime() / 1000
                );
                const swapOptions: SwapOptions = {
                    slippageTolerance: new Percent('90', '100'),
                    deadlineOrPreviousBlockhash: deadline.toString(),
                    recipient: provider.RouterAddress,
                };

                if (signature) {
                    // @ts-ignore
                    swapOptions.inputTokenPermit = signature;
                }

                const { calldata } = SwapRouter.swapERC20CallParameters(
                    response1.trade,
                    swapOptions
                );

                const response2 = await provider.getValueForSwap(
                    getPathFromCallData(calldata),
                    amountOut
                );
                const sendAmount = response2.toString();

                // const deadline = Math.round(
                //     new Date(expireAt).getTime() / 1000,
                // );
                // const swapOptions: SwapOptions = {
                //     slippageTolerance: new Percent('90', '100'),
                //     deadlineOrPreviousBlockhash: deadline.toString(),
                //     recipient: helper.RouterAddress,
                // };
                // if (signature) {
                //     // @ts-ignore
                //     swapOptions.inputTokenPermit = signature;
                // }
                // const { calldata } = SwapRouter.swapERC20CallParameters(
                //     getState().transaction.pathTrade.path,
                //     swapOptions,
                // );
                const isContextFromNative = helper.userToken.is_native;

                dispatch(setStageText('Encode transaction'));
                const encodePayParams: Parameters<typeof encodePay>[0] = {
                    // @ts-ignore
                    uuid: uuid.replaceAll('-', ''),
                    fee,
                    merchantAmount,
                    tokenAddress: helper.merchantToken.contract,
                    merchant: merchantAddress,
                    asset_amount_decimals: sendAmount,
                    feeRecipient: feeAddress,
                    txData: calldata,
                    context: {
                        from: isContextFromNative ? 'native' : 'erc20',
                        to: helper.merchantToken.is_native ? 'native' : 'erc20',
                    },
                    universalRouterAddress: helper.RouterAddress,
                };
                const { data, path: universalRouterPath } =
                    encodePay(encodePayParams);
                let value;
                if (universalRouterPath && isContextFromNative) {
                    value = BigInt(sendAmount);
                }
                preparedTransaction = await prepareSendTransaction({
                    to: helper.RouterAddress,
                    data,
                    value,
                    // maxFeePerGas,
                });
            } else if (helper.Context === 'polus contract') {
                const isNative =
                    helper.userToken.is_native &&
                    helper.merchantToken.is_native;
                preparedTransaction = await prepareSendTransaction({
                    to: helper.PolusAddress,
                    value: BigInt(
                        helper.userToken.is_native
                            ? getState().transaction.amount!
                            : 0
                    ),
                    data: doPayThroughPolusContract({
                        uuid: uuid,
                        feeRecipient: feeAddress,
                        fee: fee,
                        merchant: merchantAddress,
                        merchantAmount: merchantAmount,
                        tokenAddress: isNative ? '' : helper.userToken.contract,
                    }),
                    // maxFeePerGas,
                });
            } else {
                throw new Error('Unknown context');
            }

            dispatch(setStageText('Send transaction ...'));

            const { hash } = await sendTransaction(preparedTransaction);
            dispatch(setStageText('Transaction pending ...'));
            await waitForTransaction({ hash });
            dispatch(
                setStage({
                    text: 'Transaction success',
                    status: StageStatus.SUCCESS,
                })
            );
            dispatch(setProgressBar(ProgressBarAction.INC));
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
