import { useState } from 'react';

import { usePaymentInfo } from '../../../hooks/usePaymentInfo';
import { formatUnits } from 'viem';
import { roundCryptoAmount } from '../../../../../../tools';

import { ProgressBar } from '../../ui/ProgressBar/ProgressBar';
import { FormButton } from './Button/Button';
import { FormHeader } from './Header/Header';
import { FormFooter } from './Footer/Footer';
import { FormNativePayment } from './Native/Native';
import { FormProcessBlock } from './ProcessBlock/Process';
import { FormPayment } from './Payment/Payment';

import './Form.scoped.scss';

type FormStage = 'configuration' | 'native' | 'processing';

interface IFormProps {
    id: string;
}

const MockHeaderData = {
    description: 'desc',
    amount: '1',
    currency: 'usdt',
};

export const Form: React.FC<IFormProps> = ({ id }) => {
    const [stage, setStage] = useState<FormStage>('native');
    // const {isLoading, info, merchantToken, amountInMerchantToken } = usePaymentInfo(id)

    return (
        <div className="form">
            <div className="form__header">
                {/*<FormHeader
                    merchant={info.merchant}
                    payment={{
                        description: info.payment.description,
                        amount: roundCryptoAmount(formatUnits(BigInt(amountInMerchantToken),
                        merchantToken.decimals)),
                        currency: merchantToken.name.toUpperCase()
                    }}
                />*/}
                <FormHeader payment={{ ...MockHeaderData }} />
            </div>
            <div className="form__progress">
                <ProgressBar value={70} />
            </div>
            {stage === 'configuration' ? (
                <FormPayment />
            ) : stage === 'native' ? (
                <FormNativePayment />
            ) : (
                <FormProcessBlock />
            )}
            <div className="form__footer">
                <div className="form__footer-button">
                    <FormButton onClick={() => console.log('handle click')} />
                </div>
                <div className="form__footer-inner">
                    <FormFooter />
                </div>
            </div>
            {/* add modals currency & blockchain selector */}
        </div>
    );
};
