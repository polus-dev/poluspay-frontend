import { useEffect, useState } from 'react';
import { useTimer } from './useTimer';
import { IGetMerchantByIdResponse } from '../store/api/endpoints/merchant/Merchant.interface';
import { IGetPaymentsResponse } from '../store/api/endpoints/payment/Payment.interface';
import { useLazyGetPaymentByPaymentIdQuery } from '../store/api/endpoints/payment/Payment';
import { useLazyGetMerchantByIdQuery } from '../store/api/endpoints/merchant/Merchant';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useAvailableTokens } from './useAvailableTokens';
import { Token } from '../store/api/types';
import { Asset_t, Blockchain_t } from '../store/api/endpoints/types';
import { ResponseApiCode } from '../store/api/responseApiCode';
import { setCurrentBlockchain } from '../store/features/connection/connectionSlice';

interface IError {
    message: string;
    code: ResponseApiCode;
}

export interface IPaymentInfo {
    merchant: IGetMerchantByIdResponse;
    payment: IGetPaymentsResponse;
}

export const usePaymentInfo = (id: string) => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<IError>();
    const [getPaymentInfo] = useLazyGetPaymentByPaymentIdQuery({refetchOnFocus: true});
    const [getMerchantInfo] = useLazyGetMerchantByIdQuery({refetchOnFocus: true});
    const currentBlockchain = useAppSelector(
        (state) => state.connection.currentBlockchain
    );

    const { availableTokens } = useAvailableTokens();
    const [merchantToken, setMerchantToken] = useState<Token>();

    const [expireAt, setExpireAt] = useState('');

    const [info, setInfo] = useState<IPaymentInfo>();
    const [amountInMerchantToken, setAmountInMerchantToken] = useState('0');
    const [fee, setFee] = useState('0');
    const [merchantAmount, setMerchantAmount] = useState('0');
    const [merchantAddress, setMerchantAddress] = useState('');

    useEffect(() => {
        if (!info || !availableTokens.length) return;
        const assetKey = info.payment.assets[0].name as Asset_t;
        const token = availableTokens.find((token) => token.name === assetKey);

        const payment = currentBlockchain
            ? info.payment.assets.find((i) => i.network === currentBlockchain)
            : info.payment.assets[0];
        if (!payment) throw new Error('usePaymentInfo: Payment not found');

        setAmountInMerchantToken(
            (BigInt(payment.amount) + BigInt(payment.fee)).toString()
        );
        setFee(payment.fee);
        setMerchantAmount(payment.amount);
        setMerchantAddress(payment.address);
        if (!token) throw new Error('usePaymentInfo: Token not found');
        setMerchantToken(token);
        setIsLoading(false);
    }, [currentBlockchain, info, availableTokens]);

    useEffect(() => {
        setIsLoading(true);
        getPaymentInfo({ payment_id: id }).then((paymentResponse) => {
            if (paymentResponse.data && !paymentResponse.error) {
                setExpireAt(paymentResponse.data.expires_at);
                getMerchantInfo({
                    merchant_id: paymentResponse.data.merchant_id,
                }).then((merchantResponse) => {
                    if (merchantResponse.data && !merchantResponse.error) {
                        setInfo({
                            payment: paymentResponse.data!,
                            merchant: merchantResponse.data,
                        });
                        if (!currentBlockchain)
                            dispatch(
                                setCurrentBlockchain(
                                    paymentResponse.data!.blockchains[0] as Blockchain_t
                                )
                            );
                    } else if (merchantResponse.error) {
                        setError({
                            message: 'Error load data merchant',
                            code: 1002,
                        });
                    }
                });
            } else if (paymentResponse.error) {
                setError({
                    message: 'Error load data invoice',
                    code: 1002,
                });
            }
        });
    }, [currentBlockchain]);

    return {
        isLoading,
        error,
        info,
        merchantToken,
        amountInMerchantToken,
        fee,
        merchantAmount,
        merchantAddress,
        expireAt,
    };
};
