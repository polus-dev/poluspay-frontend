import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface IRouter {
    path?: string;
}

const initialState: IRouter = {};

export const routerSlice = createSlice({
    name: 'router',
    initialState,
    reducers: {
        setRouter: (state, action: PayloadAction<string>) => {
            state.path = action.payload;
        },
    },
});
export const { setRouter } = routerSlice.actions;
