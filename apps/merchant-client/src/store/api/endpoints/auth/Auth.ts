import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    IAuthRequestLogin,
    IAuthRequestRefresh,
    IAuthRequestSendCode,
    IAuthResponseLogin,
} from './Auth.interface';
import { IResponseError } from '@poluspay-frontend/api';

type IResponseOkOrError = IResponseError;

export const authApi = createApi({
    reducerPath: 'authApi' as const,
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL + '/auth',
    }),
    endpoints: (builder) => ({
        sendCode: builder.mutation<IResponseOkOrError, IAuthRequestSendCode>({
            query: (body) => ({
                url: `.send_code`,
                method: 'POST',
                body,
            }),
        }),
        login: builder.mutation<
            IAuthResponseLogin | IResponseError,
            IAuthRequestLogin
        >({
            query: (body) => ({
                url: `.login`,
                method: 'POST',
                body,
            }),
        }),
        refresh: builder.mutation<IAuthResponseLogin, IAuthRequestRefresh>({
            query: (body) => ({
                url: `.refresh_token`,
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const {} = authApi;
