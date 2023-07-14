import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    IGetPaymentByPaymentId,
    IGetPaymentsResponse,
} from './Payment.interface';
import { Blockchain_t } from '../types';
import { IPayment } from '@poluspay-frontend/api';

export const paymentApi = createApi({
    reducerPath: 'paymentApi' as const,
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_REACT_API_URL + 'public',
    }),
    endpoints: (builder) => ({
        getPaymentByPaymentId: builder.query<
            IGetPaymentsResponse,
            IGetPaymentByPaymentId
        >({
            query: (body) => ({
                url: `payment.take`,
                method: 'POST',
                body,
            }),
            transformResponse: (response: IPayment) => {
                return {
                    ...response,
                    blockchains: response.assets.map(
                        (item) => item.network
                    ) as Blockchain_t[],
                };
            },
        }),
    }),
});

export const {
    useGetPaymentByPaymentIdQuery,
    useLazyGetPaymentByPaymentIdQuery,
} = paymentApi;
