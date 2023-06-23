import {PayloadAction, createSlice} from "@reduxjs/toolkit";
import {NewApi} from "../../../logic/api";



export interface UserState {
    token: string | null,
    oldAPi: NewApi,
    isAuth: boolean,
}

const newApiInstance = new NewApi();

const initialState: UserState = {
    token: newApiInstance.token ?? null,
    oldAPi: newApiInstance,
    isAuth: newApiInstance.checkAuth(),
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        refreshAuthStore: (state, action: PayloadAction<NewApi> ) => {
            debugger
            state.oldAPi = action.payload
            state.token = state.oldAPi.token ?? null;
            state.isAuth = state.oldAPi.checkAuth();
        }
    },
});
export const {refreshAuthStore} = userSlice.actions
