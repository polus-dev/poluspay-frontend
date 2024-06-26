import { useParams } from 'react-router';

import { formatUnits } from 'viem';
import { roundCryptoAmount } from '@poluspay-frontend/utils';
import { usePaymentInfo } from '../../hooks/usePaymentInfo';
import { useAvailableTokens } from '../../hooks/useAvailableTokens';
import { useAppSelector } from '../../store/hooks';
import { SmartLineStatus } from '../../store/features/smartLine/smartLineSlice';

import { Loader } from '@poluspay-frontend/ui';
import { Form } from '../../components/pages/form/Form';
import { FormError } from '../../components/pages/form/states/Error/Error';
import { FormProcessing } from '../../components/pages/form/states/Processing/Processing';
import { FormSuccess } from '../../components/pages/form/states/Success/Success';

import classNames from 'classnames';

import './Form.scoped.scss';

interface IFormPageProps {
    error?: boolean;
    errorMessage?: string;
}

export const FormPage: React.FC<IFormPageProps> = ({ error, errorMessage }) => {
    const { id } = useParams<{ id: string }>();
    const {
        error: paymentError,
        isLoading: isPaymentInfoLoading,
        status: paymentStatus,
        isAssetsInfoLoading,
        ...payment
    } = usePaymentInfo(id!);

    const { availableTokens, isAvailableTokensLoading, availableCategories } =
        useAvailableTokens();

    const status = useAppSelector((state) => state.smartLine.smartLineStatus);
    const expiredMessage =
        payment.expireAt < new Date().toISOString() &&
        paymentStatus !== 'success'
            ? 'Payment is expired'
            : undefined;

    return (
        <div className="form-page">
            <div
                className={classNames({
                    'form-page__form': true,
                    'form-page__form--error':
                        error || status === SmartLineStatus.ERROR,
                    [`form-page__form--${status}`]:
                        status !== SmartLineStatus.DEFAULT,
                })}
            >
                {isPaymentInfoLoading ||
                isAssetsInfoLoading ||
                isAvailableTokensLoading ? (
                    <Loader height={280} />
                ) : error || paymentError || expiredMessage ? (
                    <FormError
                        message={
                            errorMessage ||
                            paymentError?.message ||
                            expiredMessage
                        }
                    />
                ) : paymentStatus === 'pending' ? (
                    <Form
                        availableCategories={availableCategories}
                        availableTokens={availableTokens}
                        id={id!}
                        {...payment}
                    />
                ) : payment.info && paymentStatus === 'success' ? (
                    <FormSuccess
                        merchant={payment.info.merchant}
                        payment={{
                            description: payment.info.payment.description,
                            amount: roundCryptoAmount(
                                formatUnits(
                                    BigInt(payment.amountInMerchantToken),
                                    payment.merchantToken!.decimals
                                )
                            ),
                            currency: payment.merchantToken!.name.toUpperCase(),
                        }}
                    />
                ) : (
                    paymentStatus === 'in_progress' && <FormProcessing />
                )}
            </div>
        </div>
    );
};
