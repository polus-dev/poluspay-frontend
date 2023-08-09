import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { startPay } from './transactionThunk';
import { PaymentHelper } from '../../../logic/payment';
import { Token } from '../../api/types';
import { Blockchain_t } from '../../api/endpoints/types';
import { Permit2Permit } from '../../../logic/uwm/builder';
import { Address } from 'viem';

export interface TransactionState {
    stages: [IApproveStage, ISignStage, ISendStage];
    currentStage: StageId;
    pathTrade: {
        path: any; // TODO
        amount?: string;
    };
    helper?: PaymentHelper;
    amount?: string;
}

export const enum StageId {
    APPROVE,
    SIGN,
    SEND,
}

interface IApproveStage extends IStage {}
interface ISignStage extends IStage {}
interface ISendStage extends IStage {
    uuid?: string;
    fee?: string;
    merchantAddress?: string;
    feeAddress?: string;
    merchantAmount?: string;
    expireAt?: string;
    signature?: Permit2Permit;
}

export interface IPayload {
    userToken: Token;
    merchantToken: Token;
    blockchain: Blockchain_t;
    uuid: string;
    userAddress: Address;
    amount: string;
    fee: string;
    merchantAddress: string;
    feeAddress: string;
    merchantAmount: string;
    expireAt: string;
    targetStages?: StageId[];
}

export const enum StageStatus {
    PENDING,
    LOADING,
    SUCCESS,
    FAILURE,
}

interface IStage {
    status: StageStatus;
    statusText: string;
}

export const DEFAULT_STAGE_TEXT: { [key in StageId]: string } = {
    0: 'Approve your tokens',
    1: 'Sign transaction',
    2: 'Sign your tokens',
};

const initialState: TransactionState = {
    stages: [
        { status: StageStatus.PENDING, statusText: DEFAULT_STAGE_TEXT[0] },
        { status: StageStatus.PENDING, statusText: DEFAULT_STAGE_TEXT[1] },
        { status: StageStatus.PENDING, statusText: DEFAULT_STAGE_TEXT[2] },
    ],
    currentStage: 0,
    pathTrade: {
        path: '',
    },
};

export const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        initTransactionState: (state, action: PayloadAction<IPayload>) => {
            if (
                action.payload.userToken.contract ===
                action.payload.merchantToken.contract
            ) {
                state.pathTrade.amount = undefined;
                state.amount = action.payload.amount;
            }
            // @ts-ignore
            state.helper = new PaymentHelper(
                action.payload.blockchain,
                action.payload.userToken,
                action.payload.merchantToken,
                action.payload.userAddress
            );
            state.stages[StageId.SEND].uuid = action.payload.uuid;
            state.stages[StageId.SEND].fee = action.payload.fee;
            state.stages[StageId.SEND].merchantAddress =
                action.payload.merchantAddress;
            state.stages[StageId.SEND].feeAddress = action.payload.feeAddress;
            state.stages[StageId.SEND].merchantAmount =
                action.payload.merchantAmount;
            state.stages[StageId.SEND].expireAt = action.payload.expireAt;
        },
        setStageText: (state, action: PayloadAction<string>) => {
            state.stages[state.currentStage].statusText = action.payload;
        },
        setStageStatus: (state, action: PayloadAction<StageStatus>) => {
            state.stages[state.currentStage].status = action.payload;
        },
        setStage: (
            state,
            action: PayloadAction<{
                status: StageStatus;
                text: string;
            }>
        ) => {
            state.stages[state.currentStage].status = action.payload.status;
            state.stages[state.currentStage].statusText = action.payload.text;
        },
        nextStage: (state) => {
            state.currentStage += 1;
        },
        setPathTrade: (
            state,
            action: PayloadAction<{ path: any; amount: string }>
        ) => {
            state.pathTrade = action.payload;
        },

        setPermitSignature: (state, action: PayloadAction<Permit2Permit>) => {
            state.stages[StageId.SEND].signature = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(startPay.pending, (state, action) => {
                if (action.meta.arg.targetStages) return;
                state.currentStage = initialState.currentStage;
                state.stages = initialState.stages;
            })
            .addCase(startPay.rejected, (state, action) => {
                if (action.error.name === 'AbortError') {
                    return;
                }
                state.stages[state.currentStage].status = StageStatus.FAILURE;
                state.stages[state.currentStage].statusText =
                    initialState.stages[state.currentStage].statusText;
                console.error(action.payload);
            });
    },
});

export const {
    setStageText,
    setStageStatus,
    setStage,
    nextStage,
    setPathTrade,
    setPermitSignature,
    initTransactionState,
} = transactionSlice.actions;
export default transactionSlice.reducer;
