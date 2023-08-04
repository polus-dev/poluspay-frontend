import { useState } from 'react';

import { ProgressBar } from '../../ui/ProgressBar/ProgressBar';
import { FormButton } from './Button/Button';
import { FormSelect } from './Select/Select';
import { FormTimer } from './Timer/Timer';
import { FormWarning } from './Warning/Warning';
import { FormHeader } from './Header/Header';
import { FormFooter } from './Footer/Footer';
import { FormNativePayment } from './Native/Native';
import { FormCurrencies } from './Currencies/Currencies';
import { FormProcessBlock } from './ProcessBlock/Process';
import { FormError } from './Error/Error';

import classNames from 'classnames';

import './Form.scoped.scss';
import {usePaymentInfo} from "../../../hooks/usePaymentInfo";
import {formatUnits} from "viem";
import {roundCryptoAmount} from "../../../../../../tools";

type FormStage = 'EVM' | 'QRCode' | 'ProcessBlock' | 'Loading';

interface IFormProps {
  id: string;
}

export const Form = ({id}: IFormProps) => {
    const [stage, setStage] = useState<FormStage>('EVM');
    const {isLoading, info, merchantToken, amountInMerchantToken } = usePaymentInfo(id)

    const ok = true;

    return (
        <div
            className={classNames({
                form: true,
                'form--error': !ok,
            })}
        >
            {info && merchantToken ? (
                <>
                    <div className="form__header">
                        <FormHeader merchant={info.merchant}  payment={{description: info.payment.description, amount: roundCryptoAmount(formatUnits(BigInt(amountInMerchantToken), merchantToken.decimals)), currency: merchantToken.name.toUpperCase()}} />
                    </div>
                    <div className="form__progress">
                        <ProgressBar value={70} />
                    </div>
                    {stage === 'EVM' ? (
                        <>
                            <div className="form__select">
                                <FormSelect
                                    item={{ image: '', text: '' }}
                                    onClick={() => console.log('open modal')}
                                />
                            </div>
                            <div className="form__currencies">
                                <FormCurrencies />
                            </div>
                            <div className="form__timer">
                                <FormTimer expiresAt={info.payment.expires_at} />
                            </div>
                        </>
                    ) : stage === 'QRCode' ? (
                        <>
                            <div className="form__native">
                                <FormNativePayment />
                            </div>
                            <div className="form__warning">
                                <FormWarning name="dai" amount={123123123} />
                            </div>
                        </>
                    ) : (
                        stage === 'ProcessBlock' ? (
                            <div className="form__process">
                                <FormProcessBlock />
                            </div>
                        ) : <h1>Loading...</h1>
                    )}
                    <div className="form__footer">
                        <div className="form__footer-button">
                            <FormButton
                                onClick={() => console.log('handle click')}
                            />
                        </div>
                        <div className="form__footer-inner">
                            <FormFooter />
                        </div>
                    </div>
                    {/* add modals currency & blockchain selector */}
                </>
            ) : (
                <FormError />
            )}
        </div>
    );
};
