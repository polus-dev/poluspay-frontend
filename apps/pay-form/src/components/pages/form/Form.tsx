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
import { usePaymentInfo } from '../../../hooks/usePaymentInfo';
import { formatUnits } from 'viem';
import { roundCryptoAmount } from '../../../../../../tools';
import { SelectSubPage } from '../../../pages/subPages/SelectSubPage';
import { QRCodeSubPage } from '../../../pages/subPages/QRCodeSubPage';
import { ProcessBlock } from '../../../pages/subPages/ProcessBlock';

type FormStage = 'Select' | 'QRCode' | 'ProcessBlock';

interface IFormProps {
    id: string;
}

const MockHeaderData = {
    description: 'desc',
    amount: '1',
    currency: 'usdt',
};

export const Form = ({ id }: IFormProps) => {
    const [stage, setStage] = useState<FormStage>('Select');
    // const {isLoading, info, merchantToken, amountInMerchantToken } = usePaymentInfo(id)

    const ok = true;
    const isLoading = false;

    return (
        <div
            className={classNames({
                form: true,
                'form--error': !ok,
            })}
        >
            {!isLoading ? (
                <>
                    <div className="form__header">
                        {/*<FormHeader merchant={info.merchant}  payment={{description: info.payment.description, amount: roundCryptoAmount(formatUnits(BigInt(amountInMerchantToken), merchantToken.decimals)), currency: merchantToken.name.toUpperCase()}} />*/}
                        <FormHeader payment={{ ...MockHeaderData }} />
                    </div>
                    <div className="form__progress">
                        <ProgressBar value={70} />
                    </div>
                    {stage === 'Select' ? (
                        <SelectSubPage />
                    ) : stage === 'QRCode' ? (
                        <QRCodeSubPage />
                    ) : (
                        <ProcessBlock />
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
                <h1>loading</h1>
            )}
        </div>
    );
};
