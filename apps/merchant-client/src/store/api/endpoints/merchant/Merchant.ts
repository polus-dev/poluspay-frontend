import type {
    IChangeMerchantWalletStatusRequest,
    ICreateMerchantRequest,
    ICreateMerchantResponse,
    ICreateMerchantWalletRequest,
    IDeleteMerchantRequest,
    IDeleteMerchantWalletRequest,
    IGenerateSigningKeyResponse,
    IGetMerchantByIdResponse,
    IGetMerchantRequest,
    IGetMerchantResponse,
    IGetMerchantResponseWithTotalCount,
    IGetMerchantStatisticsRequest,
    IGetMerchantStatisticsResponse,
    IGetWebhookHistoryResponse,
    IGetWebhookHistoryResponseWithTotalCount,
    IMerchantId,
    IMerchantWallet,
    ISetWebhookRequest,
    IUpdateMerchantRequest,
    IUploadLogoRequest,
    IVerifyDomainRequest,
} from './Merchant.interface';
import type {
    IResponseError,
    IPagination,
    IResponseApiDefault,
    IMerchant,
} from '@poluspay-frontend/api';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthHelper } from '../../../../logic/api';

export const merchantApi = createApi({
    reducerPath: 'merchantApi' as const,
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL + 'private',
        prepareHeaders: (headers, { getState }) => {
            const token = new AuthHelper().checkAuth()?.token;

            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    tagTypes: ['Merchant', 'Wallet'],
    endpoints: (builder) => ({
        createMerchant: builder.mutation<
            ICreateMerchantResponse,
            ICreateMerchantRequest
        >({
            query: (body) => ({
                url: `merchant.create`,
                method: 'POST',
                body,
            }),
            // invalidatesTags: (result) =>
            //     result ? [{ type: 'Merchant', id: result.id }] : ['Merchant'],
            invalidatesTags: ['Merchant'],
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
            providesTags: (result) =>
                result ? [{ type: 'Merchant', id: result.id }] : ['Merchant'],
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
            providesTags: ['Merchant'],
        }),

        updateMerchantFields: builder.mutation<
            IGetMerchantResponse[number],
            IUpdateMerchantRequest
        >({
            query: (body) => {
                return {
                    url: `merchant.update`,
                    method: 'POST',
                    body,
                };
            },
            // invalidatesTags: (result) =>
            //     result ? [{ type: 'Merchant', id: result.id }] : ['Merchant'],
            invalidatesTags: ['Merchant'],
        }),

        setWebhook: builder.mutation<void | IResponseError, ISetWebhookRequest>(
            {
                query: (body) => ({
                    url: `merchant.setWebhook`,
                    method: 'POST',
                    body,
                }),
                invalidatesTags: (result, err, args) => {
                    return result
                        ? [{ type: 'Merchant', id: args.merchant_id }]
                        : ['Merchant'];
                },
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
            invalidatesTags: ['Merchant'],
            // invalidatesTags: (result, error, args) =>
            //     result
            //         ? [{ type: 'Merchant', id: args.merchant_id }]
            //         : ['Merchant'],
        }),
        getWebhookHistory: builder.query<
            IGetWebhookHistoryResponseWithTotalCount,
            IMerchantId
        >({
            query: (body) => ({
                url: 'merchant.webhook.get',
                method: 'POST',
                body,
            }),
            transformResponse(response: IGetWebhookHistoryResponse, meta) {
                return {
                    data: response,
                    totalCount:
                        Number(
                            meta?.response?.headers.get('x-total-records')
                        ) ?? 0,
                };
            },
        }),
        generateSigningKey: builder.mutation<
            IGenerateSigningKeyResponse,
            IMerchantId
        >({
            query: (body) => ({
                url: 'merchant.generateSigningKey',
                method: 'POST',
                body,
            }),
        }),
        verifyDomain: builder.mutation<
            IResponseApiDefault,
            IVerifyDomainRequest
        >({
            query: (body) => ({
                url: 'merchant.verifyDomain',
                method: 'POST',
                body,
            }),
            invalidatesTags: (result, error, args) =>
                result
                    ? [{ type: 'Merchant', id: args.merchant_id }]
                    : ['Merchant'],
        }),
        createMerchantWallet: builder.mutation<
            IMerchantWallet,
            ICreateMerchantWalletRequest
        >({
            query: (body) => ({
                url: 'merchant.wallet.create',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Wallet'],
        }),
        getMerchantWallet: builder.query<IMerchantWallet[], IMerchantId>({
            query: (body) => ({
                url: 'merchant.wallet.get',
                method: 'POST',
                body,
            }),
            providesTags: ['Wallet'],
        }),
        enableMerchantWallet: builder.mutation<
            IMerchantWallet,
            IChangeMerchantWalletStatusRequest
        >({
            query: (body) => ({
                url: 'merchant.wallet.enable',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Wallet'],
        }),
        disableMerchantWallet: builder.mutation<
            IMerchantWallet,
            IChangeMerchantWalletStatusRequest
        >({
            query: (body) => ({
                url: 'merchant.wallet.disable',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Wallet'],
        }),
        deleteMerchantWallet: builder.mutation<
            void,
            IDeleteMerchantWalletRequest
        >({
            query: (body) => ({
                url: 'merchant.wallet.delete',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Wallet'],
        }),
        uploadLogo: builder.mutation<IMerchant, IUploadLogoRequest>({
            query: (body) => {
                const formData = new FormData();
                formData.append('image', body.image);
                formData.append('merchant_id', body.merchant_id);

                return {
                    url: 'merchant.logo.update',
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: (result, error, args) =>
                result
                    ? [{ type: 'Merchant', id: args.merchant_id }]
                    : ['Merchant'],
        }),
        getMerchantStatistics: builder.query<
            IGetMerchantStatisticsResponse,
            IGetMerchantStatisticsRequest
        >({
            query: (body) => ({
                url: 'merchant.statistics.get',
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
    useGenerateSigningKeyMutation,
    useCreateMerchantWalletMutation,
    useEnableMerchantWalletMutation,
    useDisableMerchantWalletMutation,
    useGetMerchantWalletQuery,
    useUploadLogoMutation,
    useDeleteMerchantWalletMutation,
    useGetMerchantStatisticsQuery,
} = merchantApi;
