import {useEffect, useState} from 'react';
import { useParams } from 'react-router';

import { Loader } from '@poluspay-frontend/ui';
import { Form } from '../../components/pages/form/Form';
import { FormError } from '../../components/pages/form/states/Error/Error';
import { FormProcessing } from '../../components/pages/form/states/Processing/Processing';
import { FormSuccess } from '../../components/pages/form/states/Success/Success';

import classNames from 'classnames';

import './Form.scoped.scss';
import {usePaymentInfo} from "../../hooks/usePaymentInfo";
import {useGetAssetsQuery} from "../../store/api/endpoints/asset/Asset";
import {useAvailableTokens} from "../../hooks/useAvailableTokens";
import {roundCryptoAmount} from "../../../../../tools";
import {formatUnits} from "viem";

type FormStatus = 'default' | 'loading' | 'success' | 'in_progress';

interface IFormPageProps {
    error?: boolean;
    errorMessage?: string;
}

export const FormPage: React.FC<IFormPageProps> = ({ error, errorMessage }) => {
    const { id } = useParams<{ id: string }>();
    const {error: paymentError, isLoading: isPaymentInfoLoading, ...payment } = usePaymentInfo(id!);
    // TODO: rewrite prefetching
    const {data: assets, isLoading: isAssetsInfoLoading} = useGetAssetsQuery();

    const { availableTokens, isAvailableTokensLoading, availableCategories } =
    useAvailableTokens();

    const [status, setStatus] = useState<FormStatus>('default');

    return (
        <div className="form-page">
            <div
                className={classNames({
                    'form-page__form': true,
                    'form-page__form--error': error,
                    [`form-page__form--${status}`]: status !== 'default',
                })}
            >
                {error || paymentError ? (
                    <FormError message={errorMessage || paymentError?.message} />
                ) : payment.info?.payment.status === "pending" ? (
                    <Form availableCategories={availableCategories} availableTokens={availableTokens} assets={assets} id={id!} {...payment} />
                ) : isPaymentInfoLoading || isAssetsInfoLoading || isAvailableTokensLoading ? (
                    <Loader height={280} />
                ) : payment.info?.payment.status === "success" ? (
                    <FormSuccess
                      merchant={payment.info.merchant}
                      payment={{
                        description: payment.info.payment.description,
                        amount: roundCryptoAmount(formatUnits(BigInt(payment.amountInMerchantToken),
                          payment.merchantToken!.decimals)),
                        currency: payment.merchantToken!.name.toUpperCase()
                      }}
                    />
                ) : (
                    payment.info?.payment.status === "in_progress" && <FormProcessing />
                )}
            </div>
        </div>
    );
};
