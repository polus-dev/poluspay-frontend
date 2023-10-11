import type {
    IGetMerchantByIdResponse,
    IGetMerchantRequest,
} from './Merchant.interface';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const merchantApi = createApi({
    reducerPath: 'merchantApi' as const,
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL + 'public',
    }),
    endpoints: (builder) => ({
        getMerchantById: builder.query<
            IGetMerchantByIdResponse,
            IGetMerchantRequest
        >({
            query: (body) => ({
                url: `merchant.take`,
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useGetMerchantByIdQuery, useLazyGetMerchantByIdQuery } =
    merchantApi;
