import {useRef, useState} from 'react';

import {usePaymentInfo} from '../../../hooks/usePaymentInfo';
import {formatUnits} from 'viem';
import {roundCryptoAmount} from '../../../../../../tools';

import {ProgressBar} from '../../ui/ProgressBar/ProgressBar';
import {FormButton} from './Button/Button';
import {FormHeader} from './Header/Header';
import {FormFooter} from './Footer/Footer';
import {FormNativePayment} from './Native/Native';
import {FormProcessBlock} from './ProcessBlock/Process';
import {FormPayment} from './Payment/Payment';

import './Form.scoped.scss';
import {AssetRepresentation, Helper} from "@poluspay-frontend/api";
import {useTokenPairPrice} from "../../../hooks/useTokenPairPrice";
import {useAccount} from "wagmi";
import {useWeb3Modal} from "@web3modal/react";
import {startPay} from "../../../store/features/transaction/transactionThunk";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";

type FormStage = 'EVM' | 'QRCode' | 'ProcessBlock';

// make recursive required
interface IFormProps extends Required<Omit<ReturnType<typeof usePaymentInfo>, "isLoading" | "error">> {
    id: string;
    assets?: Helper
    availableTokens?: AssetRepresentation[];
    availableCategories?: string[];
}


export const Form = (props: IFormProps) => {
    const dispatch = useAppDispatch();
    const [stage, setStage] = useState<FormStage>('EVM');
    const {isConnected, address} = useAccount();
    const [userToken, setUserToken] = useState(props.availableTokens![0])
    const {amount, isLoading, assetName} = useTokenPairPrice(userToken, props.merchantToken, props.amountInMerchantToken)
    const {open} = useWeb3Modal();
    const abortPayment = useRef<() => void>();
    const paymentCb = useRef<(startStageIndex?: number) => () => void>();
    const currentBlockchain = useAppSelector(state => state.connection.currentBlockchain)
    const onButtonClick = () => {
        if (!isConnected) {
            open();
        } else if (stage === 'ProcessBlock') {
            abortPayment.current?.();
            setStage('EVM');
        } else if (stage === 'EVM') {
            paymentCb.current = startStageIndex =>  dispatch(startPay({...props, uuid: props.id, userToken, blockchain: currentBlockchain!, userAddress: address!, amount: (BigInt(props.fee) + BigInt(props.merchantAmount)).toString(), feeAddress: props.info!.payment.evm_fee_address, merchantToken: props.merchantToken!, targetStages: [startStageIndex!]})).abort;
            abortPayment.current = dispatch(startPay({...props, uuid: props.id, userToken, blockchain: currentBlockchain!, userAddress: address!, amount: (BigInt(props.fee) + BigInt(props.merchantAmount)).toString(), feeAddress: props.info!.payment.evm_fee_address, merchantToken: props.merchantToken!})).abort;
            setStage('ProcessBlock');
        }
    }
    if (!props.info || !props.merchantToken || !props.assets || !props.availableTokens || !props.availableCategories) {
        return null;
    }

    return (
        <div className="form">
            <div className="form__header">
                <FormHeader
                    merchant={props.info.merchant}
                    payment={{
                        description: props.info.payment.description,
                        amount: roundCryptoAmount(formatUnits(BigInt(props.amountInMerchantToken),
                            props.merchantToken.decimals)),
                        currency: props.merchantToken.name.toUpperCase()
                    }}
                />
            </div>
            <div className="form__progress">
                <ProgressBar value={70}/>
            </div>
            {stage === 'EVM' ? (
                <FormPayment paymentAvailableBlockchains={props.info.payment.blockchains}
                             availableTokens={props.availableTokens} availableCategories={props.availableCategories}
                             expireAt={props.expireAt}
                             setUserToken={setUserToken}
                             userToken={userToken}
                />
            ) : stage === 'QRCode' ? (
                <FormNativePayment/>
            ) : (
                <FormProcessBlock onRetry={paymentCb.current!}/>
            )}
            <div className="form__footer">
                <div className="form__footer-button">
                    <FormButton
                        text={stage === "EVM" && isConnected && !isLoading ? `Pay ≈ ${amount} ${userToken.name.toUpperCase()}` : stage === "ProcessBlock" ? "Cancel" : isLoading && isConnected ? "Loading..." : "Connect Wallet"}
                        disabled={isLoading && isConnected} onClick={onButtonClick}/>
                </div>
                <div className="form__footer-inner">
                    <FormFooter/>
                </div>
            </div>
        </div>
    );
};
