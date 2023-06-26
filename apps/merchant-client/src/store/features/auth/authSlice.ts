import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AuthHelper } from '../../../logic/api';
import { emailAuthThunk } from '../../api/endpoints/auth/emailAuthThunk';
import { walletAuthThunk } from '../../api/endpoints/auth/walletAuthThunk';

export interface AuthState {
    helper: AuthHelper;
    isAuth: boolean;
}

const helper = new AuthHelper();

const initialState: AuthState = {
    helper,
    isAuth: Boolean(helper.checkAuth()),
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
        builder.addCase(emailAuthThunk.fulfilled, (state, action) => {
            if (action.payload?.access_token && action.payload.refresh_token) {
                const { refresh_token, access_token } = action.payload;
                state.isAuth = true;
                helper.setTokens(access_token, refresh_token);
            }
        });

        builder.addCase(walletAuthThunk.fulfilled, (state, action) => {
            const { refresh_token, access_token } = action.payload;
            state.isAuth = true;
            helper.setTokens(access_token, refresh_token);
        });
    },
});
export const { logout } = authSlice.actions;
