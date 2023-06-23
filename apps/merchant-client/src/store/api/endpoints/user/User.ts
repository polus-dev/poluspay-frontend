import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {IUserEntity} from "./User.interface";
import {RootState} from "../../../store";


export const userApi = createApi({
    reducerPath: 'userApi' as const,
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_REACT_APP_BASE_URL + 'private', prepareHeaders: (headers, {getState}) => {
            const token = (getState() as RootState).auth.token
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;

        }
    }),
    endpoints: (builder) => ({
        getMe: builder.query<IUserEntity, void>({
            query: () => ({
                url: `user.me`,
                method: "POST"
            })
        }),
    }),
})


export const {useGetMeQuery} = userApi