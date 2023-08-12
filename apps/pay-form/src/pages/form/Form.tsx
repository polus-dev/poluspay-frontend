import { useParams } from 'react-router';

import {Loader} from '@poluspay-frontend/ui';
import { Form } from '../../components/pages/form/Form';
import { FormError } from '../../components/pages/form/states/Error/Error';
import { FormProcessing } from '../../components/pages/form/states/Processing/Processing';
import { FormSuccess } from '../../components/pages/form/states/Success/Success';

import classNames from 'classnames';

import './Form.scoped.scss';
import { usePaymentInfo } from '../../hooks/usePaymentInfo';
import { useGetAssetsQuery } from '../../store/api/endpoints/asset/Asset';
import { useAvailableTokens } from '../../hooks/useAvailableTokens';
import { roundCryptoAmount } from '../../../../../tools';
import { formatUnits } from 'viem';
import {useAppSelector} from "../../store/hooks";
import {SmartLineStatus} from "../../store/features/smartLine/smartLineSlice";

interface IFormPageProps {
    error?: boolean;
    errorMessage?: string;
}

export const FormPage: React.FC<IFormPageProps> = ({ error, errorMessage }) => {
    const { id } = useParams<{ id: string }>();
    const {
        error: paymentError,
        isLoading: isPaymentInfoLoading,
        ...payment
    } = usePaymentInfo(id!);
    // TODO: rewrite prefetching
    const { data: assets, isLoading: isAssetsInfoLoading } =
        useGetAssetsQuery();

    const { availableTokens, isAvailableTokensLoading, availableCategories } =
        useAvailableTokens();

    const status = useAppSelector(state => state.smartLine.smartLineStatus)
    const expiredMessage  = payment.expireAt < new Date().toISOString() ? "Payment is expired" : undefined
    return (
        <div className="form-page">
            <div
                className={classNames({
                    'form-page__form': true,
                    'form-page__form--error': error || status === SmartLineStatus.ERROR,
                    [`form-page__form--${status}`]: status !== SmartLineStatus.DEFAULT,
                })}
            >
                {error || paymentError || expiredMessage  ? (
                    <FormError
                        message={errorMessage || paymentError?.message || expiredMessage}
                    />
                ) : payment.info?.payment.status === 'pending' ? (
                    <Form
                        availableCategories={availableCategories}
                        availableTokens={availableTokens}
                        assets={assets}
                        id={id!}
                        {...payment}
                    />
                ) : isPaymentInfoLoading ||
                  isAssetsInfoLoading ||
                  isAvailableTokensLoading ? (
                    <Loader height={280} />
                ) : payment.info?.payment.status === 'success' ? (
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
                    payment.info?.payment.status === 'in_progress' && (
                        <FormProcessing />
                    )
                )}
            </div>
        </div>
    );
};
