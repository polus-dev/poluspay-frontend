import { useEffect, useRef, useState } from 'react';

import { formatUnits } from 'viem';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
import { useWeb3Modal } from '@web3modal/react';

import { usePaymentInfo } from '../../../hooks/usePaymentInfo';
import { useTokenPairPrice } from '../../../hooks/useTokenPairPrice';
import { startPay } from '../../../store/features/transaction/transactionThunk';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setCurrentBlockchain } from '../../../store/features/connection/connectionSlice';
import { StageStatus } from '../../../store/features/transaction/transactionSlice';
import { redirectToMerchantSite } from '../../../utils/redirectToMerchantSite';
import { ChainId } from '../../../store/api/endpoints/types';
import { setView, ViewVariant } from '../../../store/features/view/viewSlice';
import {
    ProgressBarAction,
    setProgressBar,
    setSmartLineStatus,
    SmartLineStatus,
} from '../../../store/features/smartLine/smartLineSlice';

import { AssetRepresentation } from '@poluspay-frontend/api';
import { notify } from '@poluspay-frontend/ui';
import { useGetAssetsQuery } from '@poluspay-frontend/merchant-query';

import { ProgressBar } from '../../ui/ProgressBar/ProgressBar';
import { FormButton } from './Button/Button';
import { FormHeader } from './Header/Header';
import { FormFooter } from './Footer/Footer';
import { FormNativePayment as QRCodePayment } from './Native/Native';
import { FormProcessBlock } from './ProcessBlock/Process';
import { FormPayment } from './Payment/Payment';
import { FormSupport } from './Support/Support';

import './Form.scoped.scss';

// make recursive required
interface IFormProps
    extends Required<
        Omit<
            ReturnType<typeof usePaymentInfo>,
            'isLoading' | 'error' | 'isAssetsInfoLoading' | 'status'
        >
    > {
    id: string;
    availableTokens?: AssetRepresentation[];
    availableCategories?: string[];
}

export const Form = (props: IFormProps) => {
    const dispatch = useAppDispatch();
    const stage = useAppSelector((state) => state.view.currentView);
    const { isConnected, address } = useAccount();
    const [userToken, setUserToken] = useState(props.availableTokens![0]);
    const { data: assetHelper } = useGetAssetsQuery();

    const { amount, isLoading } = useTokenPairPrice(
        userToken,
        props.merchantToken,
        props.amountInMerchantToken
    );

    const { chain } = useNetwork();
    const { switchNetworkAsync } = useSwitchNetwork();
    const { open } = useWeb3Modal();

    const abortPayment = useRef<() => void>();
    const paymentCb = useRef<(startStageIndex?: number) => () => void>();

    const progressBarValue = useAppSelector(
        (state) => state.smartLine.progressBar
    );
    const currentBlockchain = useAppSelector(
        (state) => state.connection.currentBlockchain
    );
    const isSuccessTransaction = useAppSelector(
        (state) => state.transaction.stages[2].status === StageStatus.SUCCESS
    );
    const isFailedTransaction = useAppSelector(
        (state) => state.transaction.stages[2].status === StageStatus.FAILURE
    );

    const getButtonText = () => {
        if (isSuccessTransaction || isFailedTransaction) {
            return 'Back to store';
        } else if (!isConnected) {
            return 'Connect Wallet';
        } else if (isLoading && isConnected) {
            return 'Loading...';
        } else if (stage === ViewVariant.QRCODE) {
            return 'Switch Network';
        } else if (stage === ViewVariant.EVM) {
            return chain?.id !== ChainId[currentBlockchain!]
                ? 'Switch Network'
                : `Pay ≈ ${amount} ${userToken.name.toUpperCase()}`;
        } else if (stage === ViewVariant.PROCESS_BLOCK) {
            return 'Decline payment';
        }

        return 'Unknown';
    };

    const handleButtonClick = async () => {
        try {
            if (isSuccessTransaction || isFailedTransaction) {
                const { success_redirect_url, fail_redirect_url, domain } =
                    props.info!.merchant;

                const url =
                    isSuccessTransaction && success_redirect_url
                        ? success_redirect_url
                        : isFailedTransaction && fail_redirect_url
                        ? fail_redirect_url
                        : domain;

                redirectToMerchantSite(url);

                return undefined;
            }

            if (!isConnected) {
                await open();
            } else if (
                stage === ViewVariant.QRCODE &&
                props.info &&
                props.info.payment.blockchains.length > 1
            ) {
                dispatch(setView(ViewVariant.EVM));

                const firstEvmNetwork = props.info.payment.blockchains.find(
                    (blockchain) =>
                        !assetHelper
                            ?.getQRCodePaymentNetworks()
                            .includes(blockchain)
                );

                if (assetHelper && firstEvmNetwork) {
                    dispatch(setCurrentBlockchain(firstEvmNetwork));
                } else {
                    throw new Error('No EVM network available');
                }
            } else if (stage === ViewVariant.EVM) {
                if (
                    chain &&
                    switchNetworkAsync &&
                    chain.id !== ChainId[currentBlockchain!]
                ) {
                    setSmartLineStatus(SmartLineStatus.LOADING);
                    await switchNetworkAsync(ChainId[currentBlockchain!]);
                    setSmartLineStatus(SmartLineStatus.DEFAULT);
                }

                paymentCb.current = (startStageIndex) =>
                    dispatch(
                        startPay({
                            ...props,
                            uuid: props.id,
                            userToken,
                            blockchain: currentBlockchain!,
                            userAddress: address!,
                            amount: (
                                BigInt(props.fee) + BigInt(props.merchantAmount)
                            ).toString(),
                            feeAddress: props.info!.payment.evm_fee_address,
                            merchantToken: props.merchantToken!,
                            startStage: startStageIndex,
                        })
                    ).abort;

                abortPayment.current = paymentCb.current();

                dispatch(setView(ViewVariant.PROCESS_BLOCK));
            } else if (stage === ViewVariant.PROCESS_BLOCK) {
                abortPayment.current?.();

                dispatch(setView(ViewVariant.EVM));
                dispatch(setSmartLineStatus(SmartLineStatus.DEFAULT));
            }
        } catch (err) {
            console.error(err);

            setSmartLineStatus(SmartLineStatus.ERROR);
            notify({
                title: 'Error',
                description: 'Something went wrong. Please try again later',
                status: 'error',
            });
        }
    };

    useEffect(() => {
        if (isConnected && !progressBarValue) {
            dispatch(setProgressBar(ProgressBarAction.INC));
        } else if (!isConnected && progressBarValue)
            dispatch(setProgressBar(ProgressBarAction.DEC));
    }, [isConnected, progressBarValue]);

    useEffect(() => {
        if (
            props.info &&
            props.info.payment.blockchains.length === 1 &&
            props.assets
                ?.getQRCodePaymentNetworks()
                .includes(props.info.payment.blockchains[0])
        ) {
            dispatch(setView(ViewVariant.QRCODE));
        }
    }, [props.info]);

    useEffect(() => {
        if (
            props.assets
                ?.getQRCodePaymentNetworks()
                .includes(currentBlockchain!)
        ) {
            dispatch(setView(ViewVariant.QRCODE));
        } else {
            dispatch(setView(ViewVariant.EVM));
        }
    }, [currentBlockchain]);

    if (
        !props.info ||
        !props.merchantToken ||
        !props.assets ||
        !props.availableTokens ||
        !props.availableCategories
    ) {
        return null;
    }

    return (
        <div className="form">
            <div className="form__header">
                <FormHeader
                    merchant={props.info.merchant}
                    payment={{
                        description: props.info.payment.description,
                        amount: formatUnits(
                            BigInt(props.amountInMerchantToken),
                            props.merchantToken.decimals
                        ),
                        currency: props.merchantToken.name.toUpperCase(),
                    }}
                />
            </div>
            <div className="form__progress">
                <ProgressBar value={progressBarValue} />
            </div>
            {stage === ViewVariant.EVM ? (
                <>
                    <FormPayment
                        paymentAvailableBlockchains={
                            props.info.payment.blockchains
                        }
                        availableTokens={props.availableTokens}
                        availableCategories={props.availableCategories}
                        setUserToken={setUserToken}
                        userToken={userToken}
                    />
                    <FormSupport expiresAt={props.expireAt} />
                </>
            ) : stage === ViewVariant.QRCODE ? (
                <>
                    <QRCodePayment
                        currentBlockchain={currentBlockchain!}
                        availableTokens={props.availableTokens}
                        payment={props.info.payment}
                    />
                    <FormSupport expiresAt={props.expireAt} />
                </>
            ) : (
                <FormProcessBlock onRetry={paymentCb.current!} />
            )}
            <div className="form__footer">
                {!(
                    props.info.payment.blockchains.length === 1 &&
                    props.assets
                        .getQRCodePaymentNetworks()
                        .includes(currentBlockchain!)
                ) && (
                    <div className="form__footer-button">
                        <FormButton
                            text={getButtonText()}
                            hasIcon={!isConnected}
                            disabled={isLoading && isConnected}
                            onClick={handleButtonClick}
                        />
                    </div>
                )}
                <div className="form__footer-inner">
                    <FormFooter />
                </div>
            </div>
        </div>
    );
};
