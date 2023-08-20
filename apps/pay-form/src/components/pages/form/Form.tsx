import {useEffect, useRef, useState} from 'react';

import {usePaymentInfo} from '../../../hooks/usePaymentInfo';
import {formatUnits} from 'viem';

import {ProgressBar} from '../../ui/ProgressBar/ProgressBar';
import {FormButton} from './Button/Button';
import {FormHeader} from './Header/Header';
import {FormFooter} from './Footer/Footer';
import {FormNativePayment as QRCodePayment} from './Native/Native';
import {FormProcessBlock} from './ProcessBlock/Process';
import {FormPayment} from './Payment/Payment';

import './Form.scoped.scss';
import {AssetRepresentation, Helper} from '@poluspay-frontend/api';
import {useTokenPairPrice} from '../../../hooks/useTokenPairPrice';
import {useAccount, useNetwork, useSwitchNetwork} from 'wagmi';
import {useWeb3Modal} from '@web3modal/react';
import {startPay} from '../../../store/features/transaction/transactionThunk';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {setCurrentBlockchain} from '../../../store/features/connection/connectionSlice';
import {
  ProgressBarAction,
  setProgressBar,
  setSmartLineStatus,
  SmartLineStatus,
} from '../../../store/features/smartLine/smartLineSlice';
import {StageStatus} from "../../../store/features/transaction/transactionSlice";
import {redirectToMerchantSite} from "../../../utils/redirectToMerchantSite";
import {ChainId} from "../../../store/api/endpoints/types";
import {notify} from "@poluspay-frontend/ui";

type FormStage = 'EVM' | 'QRCode' | 'ProcessBlock';

// make recursive required
interface IFormProps
    extends Required<
        Omit<ReturnType<typeof usePaymentInfo>, 'isLoading' | 'error'>
    > {
    id: string;
    assets?: Helper;
    availableTokens?: AssetRepresentation[];
    availableCategories?: string[];
}

export const Form = (props: IFormProps) => {
    const dispatch = useAppDispatch();
    const [stage, setStage] = useState<FormStage>('EVM');
    const { isConnected, address } = useAccount();
    const [userToken, setUserToken] = useState(props.availableTokens![0]);
    const { amount, isLoading, assetName } = useTokenPairPrice(
        userToken,
        props.merchantToken,
        props.amountInMerchantToken
    );
    const {chain} = useNetwork();
    const {switchNetworkAsync} = useSwitchNetwork();
    const progressBarValue = useAppSelector(
        (state) => state.smartLine.progressBar
    );
    const { open } = useWeb3Modal();
    const abortPayment = useRef<() => void>();
    const paymentCb = useRef<(startStageIndex?: number) => () => void>();
    const currentBlockchain = useAppSelector(
        (state) => state.connection.currentBlockchain
    );
    const isSuccessTransaction = useAppSelector(state =>
      state.transaction.stages[2].status === StageStatus.SUCCESS
    )

  const isFailedTransaction = useAppSelector(state =>
    state.transaction.stages[2].status === StageStatus.FAILURE
  )

    useEffect(() => {
        if (isConnected && !progressBarValue) {
            console.log(progressBarValue);
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
            setStage('QRCode');
        }
    }, [props.info]);

    useEffect(() => {
        if (
            props.assets
                ?.getQRCodePaymentNetworks()
                .includes(currentBlockchain!)
        ) {
            setStage('QRCode');
            console.log(2);
        } else {
            setStage('EVM');
        }
    }, [currentBlockchain]);
    const onButtonClick = async () => {
        try {

          if (isSuccessTransaction || isFailedTransaction) {
            const {success_redirect_url, fail_redirect_url, domain} = props.info!.merchant;
            redirectToMerchantSite(isSuccessTransaction && success_redirect_url ? success_redirect_url : isFailedTransaction && fail_redirect_url ? fail_redirect_url : domain)
          } else if (
            stage === 'QRCode' &&
            props.info &&
            props.info.payment.blockchains.length > 1
          ) {
            setStage('EVM');
            dispatch(setCurrentBlockchain(props.info.payment.blockchains[0]));
          } else if (!isConnected) {
            open();
          } else if (stage === 'ProcessBlock') {
            abortPayment.current?.();
            setStage('EVM');
            dispatch(setSmartLineStatus(SmartLineStatus.DEFAULT));
          } else if (stage === 'EVM') {
            if (chain && switchNetworkAsync && chain.id !== ChainId[currentBlockchain!]) {
              setSmartLineStatus(SmartLineStatus.LOADING);
              await switchNetworkAsync(ChainId[currentBlockchain!])
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
            setStage('ProcessBlock');
          }
        }
      catch (e) {
          setSmartLineStatus(SmartLineStatus.ERROR);
          console.error(e);
          notify({title: "Error", description: "Something went wrong. Please try again later", status: "error"})
      }
    };
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
                        amount:
                            formatUnits(
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
            {stage === 'EVM' ? (
                <FormPayment
                    paymentAvailableBlockchains={props.info.payment.blockchains}
                    availableTokens={props.availableTokens}
                    availableCategories={props.availableCategories}
                    expireAt={props.expireAt}
                    setUserToken={setUserToken}
                    userToken={userToken}
                />
            ) : stage === 'QRCode' ? (
                <QRCodePayment
                    currentBlockchain={currentBlockchain!}
                    availableTokens={props.availableTokens}
                    payment={props.info.payment}
                />
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
                            text={ isSuccessTransaction || isFailedTransaction ? "Back to store" :
                                stage === 'EVM' && isConnected && !isLoading
                                    ? `Pay ≈ ${amount} ${userToken.name.toUpperCase()}`
                                    : stage === 'ProcessBlock' ||
                                      stage === 'QRCode'
                                    ? 'Cancel'
                                    : isLoading && isConnected
                                    ? 'Loading...'
                                    : 'Connect Wallet'
                            }
                            disabled={isLoading && isConnected}
                            onClick={onButtonClick}
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
