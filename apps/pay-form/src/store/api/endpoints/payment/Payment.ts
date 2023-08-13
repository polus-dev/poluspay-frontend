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
        baseUrl: import.meta.env.VITE_API_URL + 'public',
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
                const blockchains = response.assets.map(
                    (item) => item.network
                ) as Blockchain_t[];
                // move tron to the end of the array to be the last blockchain
                // TODO: remove this in future
                const index = blockchains.findIndex((item) => item === 'tron');
                if (index > -1) {
                    blockchains.splice(index, 1);
                    blockchains.push('tron');
                }
                return {
                    ...response,
                    blockchains,
                };
            },
        }),
    }),
});

export const {
    useGetPaymentByPaymentIdQuery,
    useLazyGetPaymentByPaymentIdQuery,
} = paymentApi;
