import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthHelper } from '../../../logic/api';
import { emailAuthThunk } from '../../api/endpoints/auth/emailAuthThunk';
import { walletAuthThunk } from '../../api/endpoints/auth/walletAuthThunk';
import { AxiosError } from 'axios';

export interface AuthState {
    helper: AuthHelper;
    userToken: string | null;
    loading: boolean;
    success: boolean;
    error: Error | AxiosError | null;
}

const helper = new AuthHelper();

const initialState: AuthState = {
    helper,
    loading: false,
    success: false,
    error: null,
    userToken: helper.checkAuth()?.token || null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            helper.logOut();
            state.userToken = null;
            state.loading = false;
            state.success = false;
            state.error = null;
        },
        setCredentials: (state, action) => {},
    },
    extraReducers(builder) {
        builder.addCase(emailAuthThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(emailAuthThunk.fulfilled, (state, action) => {
            if (action.payload?.access_token && action.payload.refresh_token) {
                const { refresh_token, access_token } = action.payload;
                helper.setTokens(access_token, refresh_token);
                state.userToken = access_token;
                state.success = true;
            }
            state.loading = false;
        });

        builder.addCase(walletAuthThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(walletAuthThunk.fulfilled, (state, action) => {
            const { refresh_token, access_token } = action.payload;
            helper.setTokens(access_token, refresh_token);
            state.userToken = access_token;
            state.loading = false;
        });

        builder.addCase(walletAuthThunk.rejected, (state, action) => {
            state.loading = false;
        });

        builder.addCase(emailAuthThunk.rejected, (state, action) => {
            state.loading = false;
        });
    },
});
export const { logout } = authSlice.actions;
