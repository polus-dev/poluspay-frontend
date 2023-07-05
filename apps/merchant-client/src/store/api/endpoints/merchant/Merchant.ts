import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    IResponseError,
    IPagination,
    IResponseApiDefault,
} from '@poluspay-frontend/api';
import {
    IChangeMerchantWalletStatusRequest,
    ICreateMerchantRequest,
    ICreateMerchantResponse,
    ICreateMerchantWalletRequest,
    IDeleteMerchantRequest,
    IGenerateSigningKeyResponse,
    IGetMerchantByIdResponse,
    IGetMerchantRequest,
    IGetMerchantResponse,
    IGetMerchantResponseWithTotalCount,
    IGetWebhookHistoryResponse,
    IGetWebhookHistoryResponseWithTotalCount,
    IMerchantId,
    IMerchantWallet,
    ISetWebhookRequest,
    IUpdateMerchantRequest,
    IVerifyDomainRequest,
} from './Merchant.interface';
import { RootState } from '../../../store';

export const merchantApi = createApi({
    reducerPath: 'merchantApi' as const,
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_REACT_APP_BASE_URL + 'private',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.userToken;
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
} = merchantApi;
