import type {
    IGetNotificationsRequest,
    IGetNotificationsResponse,
    INotification,
    IUserEntity,
} from './User.interface';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { io } from "socket.io-client";
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
        getNotifications: builder.query<
            IGetNotificationsResponse,
            IGetNotificationsRequest
        >({
            query: (body) => ({
                url: 'user.notifications.get',
                method: 'POST',
                body,
            }),
            async onCacheEntryAdded (arg, {
                updateCachedData,
                cacheDataLoaded,
                cacheEntryRemoved
            }) {
                const domain = import.meta.env.VITE_API_URL.replace(/^https?:\/\//, '')
                const url = `wss://${domain}/ws/notifications`

                console.log(url)

                const token = new AuthHelper().checkAuth()?.token;

                const socket = io(url, {
                    extraHeaders: {
                        Authorization: `Bearer ${token}`
                    }
                })

                try {
                    await cacheDataLoaded

                    socket.on('notification', (notification: INotification) => {
                        if (!notification) return undefined

                        updateCachedData((draft) => {
                            draft.notifications.unshift(notification)
                        })
                    })
                } catch (err) {
                    console.log(err)
                }

                await cacheEntryRemoved

                socket.close()
            }
        }),
    }),
});

export const {
    useGetMeQuery,
    useLazyGetMeQuery,
    useGetNotificationsQuery
} = userApi;
