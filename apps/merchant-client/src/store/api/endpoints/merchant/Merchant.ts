import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    ICreateMerchantRequest,
    ICreateMerchantResponse,
    IDeleteMerchantRequest,
    IGetMerchantByIdResponse,
    IGetMerchantRequest,
    IGetMerchantResponse,
    IGetMerchantResponseWithTotalCount,
    IGetWebhookHistoryResponse,
    IMerchantId,
    ISetWebhookRequest,
    IUpdateMerchantRequest,
} from './Merchant.interface';
import { IPagination, IResponseApiDefault, IResponseError } from '../../types';
import { RootState } from '../../../store';
import { AuthHelper } from 'apps/merchant-client/src/logic/api';

export const merchantApi = createApi({
    reducerPath: 'merchantApi' as const,
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
    endpoints: (builder) => ({
        createMerchant: builder.mutation<
            ICreateMerchantResponse | IResponseError,
            ICreateMerchantRequest
        >({
            query: (body) => ({
                url: `merchant.create`,
                method: 'POST',
                body,
            }),
        }),
        getMerchantById: builder.query<
            IGetMerchantByIdResponse,
            IGetMerchantRequest
        >({
            query: (body) => ({
                url: `merchant.get`,
                method: 'POST',
                body,
            }),
            transformResponse: (response: IGetMerchantResponse) => response[0],
        }),
        getMerchants: builder.query<
            IGetMerchantResponseWithTotalCount,
            IPagination
        >({
            query: (body) => ({
                url: `merchant.get`,
                method: 'POST',
                body,
            }),
            transformResponse: (response: IGetMerchantResponse, meta) => ({
                data: response,
                totalCount:
                    Number(meta?.response?.headers.get('x-total-records')) ?? 0,
            }),
        }),

        updateMerchantFields: builder.mutation<
            IResponseError | IGetMerchantResponse[number],
            IUpdateMerchantRequest
        >({
            query: (body) => {
                const filteredBody = {} as typeof body;
                for (const key in body)
                    if (body[key as keyof typeof body])
                        filteredBody[key as keyof typeof body] =
                            body[key as keyof typeof body];

                return {
                    url: `merchant.update`,
                    method: 'POST',
                    body: filteredBody,
                };
            },
        }),

        setWebhook: builder.mutation<void | IResponseError, ISetWebhookRequest>(
            {
                query: (body) => ({
                    url: `merchant.setWebhook`,
                    method: 'POST',
                    body,
                }),
            }
        ),
        deleteMerchant: builder.mutation<
            void | IResponseError,
            IDeleteMerchantRequest
        >({
            query: (body) => ({
                url: `merchant.delete`,
                method: 'POST',
                body,
            }),
        }),
        getWebhookHistory: builder.query<IGetWebhookHistoryResponse, void>({
            query: (body) => ({
                url: 'merchant.webhook.get',
                method: 'POST',
                body,
            }),
        }),
        verifyDomain: builder.mutation<IResponseApiDefault, IMerchantId>({
            query: (body) => ({
                url: 'merchant.verifyDomain',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const {
    useCreateMerchantMutation,
    useDeleteMerchantMutation,
    useSetWebhookMutation,
    useUpdateMerchantFieldsMutation,
    useGetMerchantsQuery,
    useGetWebhookHistoryQuery,
    useGetMerchantByIdQuery,
    useVerifyDomainMutation,
} = merchantApi;
