import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Blockchain_t } from '../../api/endpoints/types';
import { getAccount } from 'wagmi/actions';

export interface ConnectionState {
    isActive: boolean;
    currentBlockchain: Blockchain_t | null;
    prevBlockchain: Blockchain_t | null;
    isMetamask: boolean;
}

const initialState: ConnectionState = {
    isActive: false,
    currentBlockchain: null,
    prevBlockchain: null,
    // @ts-ignore
    isMetamask: Boolean(window.ethereum?.isMetaMask),
};

export const connectionSlice = createSlice({
    name: 'connection',
    initialState,
    reducers: {
        activateConnection: (state) => {
            state.isActive = true;
        },
        deactivateConnection: (state) => {
            state.isActive = false;
        },
        setCurrentBlockchain: (state, action: PayloadAction<string | null>) => {
            state.prevBlockchain = state.currentBlockchain;
            // @ts-ignore
            state.currentBlockchain = action.payload;
        },
        setIsMetamask: (state, action: PayloadAction<boolean>) => {
            state.isMetamask = action.payload;
        },
    },
});

export const {
    activateConnection,
    deactivateConnection,
    setCurrentBlockchain,
    setIsMetamask,
} = connectionSlice.actions;

export default connectionSlice.reducer;
