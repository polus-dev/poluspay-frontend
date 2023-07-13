import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

import { IAuthResponseLogin } from './Auth.interface';

interface IPayload {
    email: string;
    code?: string;
}

export const emailAuthThunk = createAsyncThunk(
    'users/emailAuthThunk',
    async (payload: IPayload, { rejectWithValue }) => {
        try {
            const apiUrl =
                import.meta.env.VITE_REACT_APP_BASE_URL + 'public' + '/auth';
            if (!payload.code) {
                const { email } = payload;
                await axios.post(apiUrl + '.send_code', {
                    email,
                });
            } else {
                const {
                    data: { access_token, refresh_token },
                } = await axios.post<IAuthResponseLogin>(apiUrl + '.login', {
                    ...payload,
                });

                return { access_token, refresh_token };
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error);
            }
            return rejectWithValue(error as Error);
        }
    }
);
