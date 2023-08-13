import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
const PROGRESS_BAR_STEP = 25;
export const enum SmartLineStatus {
    DEFAULT = 'default',
    SUCCESS = 'success',
    ERROR = 'smart-line-error-color',
    LOADING = 'loading',
    IN_PROGRESS = 'in_progress',
}

export const enum ProgressBarAction {
    INC,
    DEC,
}

export interface SmartLineState {
    smartLineStatus: SmartLineStatus;
    progressBar: number;
}

const initialState: SmartLineState = {
    smartLineStatus: SmartLineStatus.DEFAULT,
    progressBar: 0,
};

export const counterSlice = createSlice({
    name: 'smart line',
    initialState,
    reducers: {
        setSmartLineStatus: (state, action: PayloadAction<SmartLineStatus>) => {
            state.smartLineStatus = action.payload;
        },
        setProgressBar: (state, action: PayloadAction<ProgressBarAction>) => {
            if (
                action.payload === ProgressBarAction.INC &&
                state.progressBar < 100
            ) {
                state.progressBar += PROGRESS_BAR_STEP;
            } else if (
                action.payload === ProgressBarAction.DEC &&
                state.progressBar > 0
            ) {
                state.progressBar -= PROGRESS_BAR_STEP;
            }
        },
    },
});

export const { setSmartLineStatus, setProgressBar } = counterSlice.actions;

export default counterSlice.reducer;
