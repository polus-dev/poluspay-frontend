import { configureStore } from '@reduxjs/toolkit'
import {merchantApi} from './api/endpoints/merchant/Merchant'
import {userApi} from './api/endpoints/user/User'
import {paymentApi} from './api/endpoints/payment/Payment'
import {setupListeners} from "@reduxjs/toolkit/query";
import {userSlice} from "./features/user/userSlice.";
import {assetApi} from "./api/endpoints/asset/Asset";

export const store = configureStore({
    reducer: {
        [merchantApi.reducerPath]: merchantApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [paymentApi.reducerPath]: paymentApi.reducer,
        [assetApi.reducerPath]: assetApi.reducer,
        auth: userSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({serializableCheck: false}).concat(
            merchantApi.middleware,
            userApi.middleware,
            paymentApi.middleware,
            assetApi.middleware,
        ),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch