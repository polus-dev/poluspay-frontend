import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    IGetNotificationsRequest,
    IGetNotificationsResponse,
    IUserEntity,
} from './User.interface';
import { AuthHelper } from 'apps/merchant-client/src/logic/api';

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
        getNotifications: builder.query<
            IGetNotificationsResponse,
            IGetNotificationsRequest
        >({
            query: (body) => ({
                url: 'user.notifications.get',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useGetMeQuery, useLazyGetMeQuery, useGetNotificationsQuery } =
    userApi;
