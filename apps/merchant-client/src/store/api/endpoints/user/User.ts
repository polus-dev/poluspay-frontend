import type { IUserEntity } from './User.interface';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthHelper } from '../../../../logic/api';

export const userApi = createApi({
    reducerPath: 'userApi' as const,
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL + 'private',
        prepareHeaders: (headers) => {
            const token = new AuthHelper().checkAuth()?.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getMe: builder.query<IUserEntity, void>({
            query: () => ({
                url: `user.me`,
                method: 'POST',
            }),
        }),
    }),
});

export const { useGetMeQuery, useLazyGetMeQuery } = userApi;
