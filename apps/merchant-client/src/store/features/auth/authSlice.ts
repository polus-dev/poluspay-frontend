import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthHelper } from '../../../logic/api';
import { emailAuthThunk } from '../../api/endpoints/auth/emailAuthThunk';
import { walletAuthThunk } from '../../api/endpoints/auth/walletAuthThunk';

export interface AuthState {
    helper: AuthHelper;
    isAuth: boolean;
    isAuthLoading: boolean;
}

const helper = new AuthHelper();

const initialState: AuthState = {
    helper,
    isAuth: Boolean(helper.checkAuth()),
    isAuthLoading: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuth = false;
            helper.logOut();
        },
    },
    extraReducers(builder) {
        builder.addCase(emailAuthThunk.pending, (state) => {
            state.isAuthLoading = true;
        });
        builder.addCase(emailAuthThunk.fulfilled, (state, action) => {
            if (action.payload?.access_token && action.payload.refresh_token) {
                const { refresh_token, access_token } = action.payload;
                state.isAuth = true;
                helper.setTokens(access_token, refresh_token);
            }
            state.isAuthLoading = false;
        });

        builder.addCase(walletAuthThunk.pending, (state) => {
            state.isAuthLoading = true;
        });

        builder.addCase(walletAuthThunk.fulfilled, (state, action) => {
            const { refresh_token, access_token } = action.payload;
            state.isAuth = true;
            helper.setTokens(access_token, refresh_token);
            state.isAuthLoading = false;
            window.location.href = '/';
        });

        builder.addCase(walletAuthThunk.rejected, (state, action) => {
            state.isAuthLoading = false;
        });

        builder.addCase(emailAuthThunk.rejected, (state, action) => {
            state.isAuthLoading = false;
        });
    },
});
export const { logout } = authSlice.actions;
