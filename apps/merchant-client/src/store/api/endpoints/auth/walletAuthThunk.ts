import type { IAuthResponseLogin, IAuthResponseNonce } from './Auth.interface';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { signMessage } from '@wagmi/core';
import axios, { AxiosError } from 'axios';

export const walletAuthThunk = createAsyncThunk(
    'users/walletAuthThunk',
    async (address: string, { rejectWithValue }) => {
        try {
            const apiUrl =
                import.meta.env.VITE_API_URL + 'public' + '/auth.wallet';
            const response = await axios.post<IAuthResponseNonce>(
                apiUrl + '.getNonce',
                {
                    address,
                }
            );

            const { message } = response.data;
            const signature = await signMessage({ message });
            const response2 = await axios.post<IAuthResponseLogin>(
                apiUrl + '.login',
                { address, signature }
            );

            return response2.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error);
            }

            return rejectWithValue(error as Error);
        }
    }
);
