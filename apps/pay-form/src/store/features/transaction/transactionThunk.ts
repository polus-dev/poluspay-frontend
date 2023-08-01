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
import {notify} from "@poluspay-frontend/ui";
import {trimEndOfString} from "../../../../../../tools";

const thunks = [approveThunk, signThunk, sendThunk] as const;



export const startPay = createAsyncThunk<any, IPayload, ThunkConfig>(
    'transaction/pay',
    async (payload, { dispatch, rejectWithValue, signal }) => {
      const startStagesLoop = async (rangeOfStageIds: {from: number, to: number}) => {
        for (let stageId = rangeOfStageIds.from; stageId <= rangeOfStageIds.to; stageId++)
          await dispatch(thunks[stageId]()).unwrap();
      }
        try {
            signal.addEventListener('abort', () => {
                return rejectWithValue('Aborted');
            });
            if (payload.startStage) {
             await startStagesLoop({from: payload.startStage, to: thunks.length - 1})
            } else {
              dispatch(initTransactionState(payload));
                await startStagesLoop({from: 0, to: thunks.length - 1})
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
                // payload.consoleLog(error.message)
              notify({title: error.name , status: "error", description: trimEndOfString(error.message, 15)})
            } else {
              // payload.consoleLog(
              //   error instanceof Error ? error.message : 'unknown error'
              // );
                notify({title: error instanceof Error ? error.name : "unknown", status: "error", description: error instanceof Error ? error.message : undefined})
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
