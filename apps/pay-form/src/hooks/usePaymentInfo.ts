import { useCallback, useEffect, useRef, useState } from 'react';
import { IGetMerchantByIdResponse } from '../store/api/endpoints/merchant/Merchant.interface';
import { IGetPaymentsResponse } from '../store/api/endpoints/payment/Payment.interface';
import {
    useGetPaymentByPaymentIdQuery,
    useLazyGetPaymentByPaymentIdQuery,
} from '../store/api/endpoints/payment/Payment';
import { useLazyGetMerchantByIdQuery } from '../store/api/endpoints/merchant/Merchant';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { useAvailableTokens } from './useAvailableTokens';
import { Token } from '../store/api/types';
import { Asset_t, Blockchain_t } from '../store/api/endpoints/types';
import { ResponseApiCode } from '../store/api/responseApiCode';
import { setCurrentBlockchain } from '../store/features/connection/connectionSlice';
import { useGetAssetsQuery } from '../store/api/endpoints/asset/Asset';
import { PaymentStatus } from '@poluspay-frontend/api';

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
    const [getPaymentInfo] = useLazyGetPaymentByPaymentIdQuery();
    const [getMerchantInfo] = useLazyGetMerchantByIdQuery();
    const currentBlockchain = useAppSelector(
        (state) => state.connection.currentBlockchain
    );

    const { data: assets, isLoading: isAssetsInfoLoading } =
        useGetAssetsQuery();

    const { availableTokens } = useAvailableTokens();
    const [merchantToken, setMerchantToken] = useState<Token>();

    const [expireAt, setExpireAt] = useState('');

    const [info, setInfo] = useState<IPaymentInfo>();
    const [amountInMerchantToken, setAmountInMerchantToken] = useState('0');
    const [fee, setFee] = useState('0');
    const [merchantAmount, setMerchantAmount] = useState('0');
    const [merchantAddress, setMerchantAddress] = useState('');
    const [status, setStatus] = useState<PaymentStatus>();
    const getInfo = useCallback(async () => {
        setIsLoading(true);
        try {
            const payment = await getPaymentInfo({ payment_id: id }).unwrap();
            setExpireAt(payment.expires_at);
            setStatus(payment.status);
            const merchant = await getMerchantInfo({
                merchant_id: payment.merchant_id,
            }).unwrap();
            setInfo({
                payment,
                merchant,
            });
            if (!currentBlockchain)
                dispatch(
                    setCurrentBlockchain(payment.blockchains[0] as Blockchain_t)
                );
        } catch (e) {
            setIsLoading(false);

            setError({
                message: 'Error loading payment data',
                code: 1001,
            });
        }
    }, [
        currentBlockchain,
        getPaymentInfo,
        getMerchantInfo,
        setExpireAt,
        setInfo,
        setIsLoading,
    ]);
    useEffect(() => {
        if (!info || !availableTokens.length) return;
        const assetKey = info.payment.assets[0].name as Asset_t;
        const token = availableTokens.find((token) =>
            info.payment.assets.some(
                (merchantToken) => merchantToken.name === token.name
            )
        );

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
        getInfo();
    }, []);

    const timer = useRef<NodeJS.Timer>();

    useEffect(() => {
        if (
            currentBlockchain &&
            assets?.getQRCodePaymentNetworks().includes(currentBlockchain)
        ) {
            if (timer.current) clearInterval(timer.current);
            timer.current = setInterval(() => {
                getPaymentInfo({ payment_id: id })
                    .unwrap()
                    .then((payment) => {
                        setStatus(payment.status);
                        if (payment.status === 'success') {
                            clearInterval(timer.current);
                        }
                    });
            }, 1000);
        }
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
        assets,
        isAssetsInfoLoading,
        status,
    };
};

// setError({
//   message: 'Error load data merchant',
//   code: 1002,
// });
