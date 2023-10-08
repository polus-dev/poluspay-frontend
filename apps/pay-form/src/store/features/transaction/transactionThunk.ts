import { createAsyncThunk } from '@reduxjs/toolkit';

import { notify } from '@poluspay-frontend/ui';
import { TransactionError } from './TransactionError';
import { approveThunk } from './stages/approveThunk';
import { signThunk } from './stages/signThunk';
import { sendThunk } from './stages/sendThunk';
import { ThunkConfig } from '../../store';

import {
    DEFAULT_STAGE_TEXT,
    initTransactionState,
    IPayload,
    setStage,
    StageStatus,
} from './transactionSlice';

import {
    setSmartLineStatus,
    SmartLineStatus,
} from '../smartLine/smartLineSlice';

const thunks = [approveThunk, signThunk, sendThunk] as const;

export const startPay = createAsyncThunk<any, IPayload, ThunkConfig>(
    'transaction/pay',
    async (payload, { dispatch, rejectWithValue, signal }) => {
        const startStagesLoop = async (rangeOfStageIds: {
            from: number;
            to: number;
        }) => {
            for (
                let stageId = rangeOfStageIds.from;
                stageId <= rangeOfStageIds.to;
                stageId++
            ) {
                await dispatch(thunks[stageId]()).unwrap();
            }
        };
        try {
            signal.addEventListener('abort', () => {
                return rejectWithValue('Aborted');
            });

            if (payload.startStage) {
                await startStagesLoop({
                    from: payload.startStage,
                    to: thunks.length - 1,
                });
            } else {
                dispatch(initTransactionState(payload));

                await startStagesLoop({ from: 0, to: thunks.length - 1 });
            }

            dispatch(setSmartLineStatus(SmartLineStatus.SUCCESS));
        } catch (error) {
            dispatch(setSmartLineStatus(SmartLineStatus.ERROR));

            if (error instanceof TransactionError) {
                dispatch(
                    setStage({
                        status: StageStatus.FAILURE,
                        text: DEFAULT_STAGE_TEXT[error.stageid],
                    })
                );

                notify({
                    title: error.name,
                    status: 'error',
                    description: error.message,
                });
            } else {
                notify({
                    title: error instanceof Error ? error.name : 'unknown',
                    status: 'error',
                    description:
                        error instanceof Error ? error.message : undefined,
                });

                return rejectWithValue(error);
            }
        }
    }
);
