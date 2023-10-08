import { createAsyncThunk } from '@reduxjs/toolkit';
import { erc20ABI, waitForTransaction } from '@wagmi/core';
import { prepareWriteContract, writeContract } from 'wagmi/actions';
import { MAX_UINT256 } from '@poluspay-frontend/utils';
import { TransactionError } from '../TransactionError';
import { ThunkConfig } from '../../../store';

import {
    nextStage,
    setStage,
    setStageText,
    StageStatus,
} from '../transactionSlice';

import {
    ProgressBarAction,
    setProgressBar,
} from '../../smartLine/smartLineSlice';

import { notify } from '@poluspay-frontend/ui';

export const approveThunk = createAsyncThunk<any, void, ThunkConfig>(
    'transaction/approveThunk',
    async (_, { getState, dispatch, rejectWithValue }) => {
        const currentStage = () => getState().transaction.currentStage;
        const isMetamask = getState().connection.isMetamask;
        const sendAmount = getState().transaction.amount;

        const helper = getState().transaction.helper;

        if (!helper || !sendAmount || !currentStage) {
            return undefined;
        }

        try {
            const checkAndApprove = async (
                contractType: Parameters<
                    typeof helper.checkAllowanceToUserToken
                >[0],
                allowance: bigint
            ) => {
                if (allowance < BigInt(sendAmount)) {
                    dispatch(setStageText('Need approve to smart contract'));

                    const preparedTransaction = await prepareWriteContract({
                        address: helper.userToken.contract as `0x${string}`,
                        abi: erc20ABI,
                        functionName: 'approve',
                        args: [
                            contractType === 'permit'
                                ? helper.PermitAddress
                                : contractType === 'router'
                                ? helper.RouterAddress
                                : helper.PolusAddress,
                            MAX_UINT256,
                        ],
                    });

                    const { hash } = await writeContract(preparedTransaction);

                    dispatch(setStageText('Transaction pending...'));

                    await waitForTransaction({ hash });
                }
            };

            dispatch(
                setStage({
                    text: 'Check your balance...',
                    status: StageStatus.LOADING,
                })
            );

            const balance = await helper.getBalance();

            if (balance < BigInt(sendAmount)) {
                throw new TransactionError(
                    'Not enough balance',
                    currentStage()
                );
            }

            dispatch(setStageText('Sufficient balance'));
            dispatch(setStageText('Checking allowance to smart contract'));

            notify({
                title: 'Need your action',
                description: 'Check your wallet',
                loading: true,
            });

            if (
                helper.Context === 'polus contract' &&
                !helper.userToken.is_native
            ) {
                const allowance = await helper.checkAllowanceToUserToken(
                    'polus'
                );

                await checkAndApprove('polus', allowance);
            } else if (
                helper.Context === 'universal router' &&
                !helper.userToken.is_native
            ) {
                if (isMetamask) {
                    const allowance = await helper.checkAllowanceToUserToken(
                        'permit'
                    );

                    await checkAndApprove('permit', allowance);
                } else {
                    const allowance = await helper.checkAllowanceToUserToken(
                        'router'
                    );

                    await checkAndApprove('router', allowance);
                }
            }

            dispatch(
                setStage({
                    text: 'Successful approve',
                    status: StageStatus.SUCCESS,
                })
            );
            dispatch(nextStage());
            dispatch(setProgressBar(ProgressBarAction.INC));
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
