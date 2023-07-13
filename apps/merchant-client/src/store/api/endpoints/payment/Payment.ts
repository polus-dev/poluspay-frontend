import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    ICreatePaymentRequest,
    ICreatePaymentResponse,
    IGetPaymentByMerchantId,
    IGetPaymentByPaymentId,
    IGetPaymentsResponse,
    IGetPaymentsResponseWithTotalCount,
} from './Payment.interface';
import { AuthHelper } from 'apps/merchant-client/src/logic/api';
import { IResponseError } from '@poluspay-frontend/api';

export const paymentApi = createApi({
    reducerPath: 'paymentApi' as const,
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_REACT_APP_BASE_URL + 'private',
        prepareHeaders: (headers) => {
            const token = new AuthHelper().checkAuth()?.token;
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
} = paymentApi;
