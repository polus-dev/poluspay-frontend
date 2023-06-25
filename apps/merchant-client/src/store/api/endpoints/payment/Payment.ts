import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    ICreatePaymentRequest,
    ICreatePaymentResponse,
    IGetPaymentByMerchantId,
    IGetPaymentByPaymentId,
    IGetPaymentsResponse,
    IGetPaymentsResponseWithTotalCount,
} from './Payment.interface';
import { IResponseError } from '../../types';
import { RootState } from '../../../store';

export const paymentApi = createApi({
    reducerPath: 'paymentApi' as const,
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_REACT_APP_BASE_URL + 'private',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Payment'],
    endpoints: (builder) => ({
        createPayment: builder.mutation<
            ICreatePaymentResponse | IResponseError,
            ICreatePaymentRequest
        >({
            query: (body) => ({
                url: `v2/payment.create`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Payment'],
        }),
        getPaymentByMerchantId: builder.query<
            IGetPaymentsResponseWithTotalCount,
            IGetPaymentByMerchantId
        >({
            query: (body) => ({
                url: `payment.get`,
                method: 'POST',
                body,
            }),
            transformResponse: (response: IGetPaymentsResponse, meta) => ({
                data: response,
                totalCount:
                    Number(meta?.response?.headers.get('X-Total-Records')) ?? 0,
            }),
            providesTags: ['Payment'],
        }),
        getPaymentByPaymentId: builder.query<
            IGetPaymentsResponse[number],
            IGetPaymentByPaymentId
        >({
            query: (body) => ({
                url: `payment.get`,
                method: 'POST',
                body,
            }),
            transformResponse: (response: IGetPaymentsResponse) => response[0],
            providesTags: ['Payment'],
        }),
    }),
});

export const {
    useCreatePaymentMutation,
    useGetPaymentByMerchantIdQuery,
    useGetPaymentByPaymentIdQuery,
    useLazyGetPaymentByMerchantIdQuery,
} = paymentApi;
