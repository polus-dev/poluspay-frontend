import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    DEFAULT_STAGE_TEXT,
    initTransactionState,
    IPayload,
    setStage,
    StageStatus,
} from './transactionSlice';
import { TransactionError } from './TransactionError';
import {
    setSmartLineStatus,
    SmartLineStatus,
} from '../smartLine/smartLineSlice';
import { approveThunk } from './stages/approveThunk';
import { signThunk } from './stages/signThunk';
import { sendThunk } from './stages/sendThunk';
import { ThunkConfig } from '../../store';
import { notify } from '@poluspay-frontend/ui';

const thunks = [approveThunk, signThunk, sendThunk] as const;

export const startPay = createAsyncThunk<any, IPayload, ThunkConfig>(
    'transaction/pay',
    async (payload, { dispatch, rejectWithValue, signal }) => {
        try {
            signal.addEventListener('abort', () => {
                return rejectWithValue('Aborted');
            });
            if (payload.targetStages) {
                for (const stageId of payload.targetStages) {
                    await dispatch(thunks[stageId]()).unwrap();
                    return;
                }
            }
            dispatch(initTransactionState(payload));
            await dispatch(thunks[0]()).unwrap();
            await dispatch(thunks[1]()).unwrap();
            await dispatch(thunks[2]()).unwrap();
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
                // payload.consoleLog(error.message)
                notify({
                    title: error.name,
                    status: 'error',
                    description: error.message,
                });
            } else {
                // payload.consoleLog(
                //   error instanceof Error ? error.message : 'unknown error'
                // );
                notify({
                    title: error instanceof Error ? error.name : 'unknown',
                    status: 'error',
                    description:
                        error instanceof Error ? error.message : undefined,
                });
                console.error(error);
                return rejectWithValue(error);
            }
        }
    }
);

//
// const isv = verifyTypedData(
//   dataForSign.domain,
//   dataForSign.types,
//   dataForSign.value,
//   sign.data
// );
