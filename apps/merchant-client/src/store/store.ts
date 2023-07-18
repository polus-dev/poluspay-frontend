import { configureStore } from '@reduxjs/toolkit';
import { merchantApi } from './api/endpoints/merchant/Merchant';
import { userApi } from './api/endpoints/user/User';
import { paymentApi } from './api/endpoints/payment/Payment';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authSlice } from './features/auth/authSlice';
import { routerSlice } from './features/router/routerSlice';
import { assetApi } from './api/endpoints/asset/Asset';
import {rtkQueryErrorLogger} from "./middleware/ErrorHandler.middleware";

export const store = configureStore({
    reducer: {
        [merchantApi.reducerPath]: merchantApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [paymentApi.reducerPath]: paymentApi.reducer,
        [assetApi.reducerPath]: assetApi.reducer,
        auth: authSlice.reducer,
        router: routerSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(
            merchantApi.middleware,
            userApi.middleware,
            paymentApi.middleware,
            assetApi.middleware,
            rtkQueryErrorLogger,
        ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
