import { IPayment } from '@poluspay-frontend/api';
import { Blockchain_t } from '../types';

export interface IGetPaymentByPaymentId {
    payment_id: string;
}

export type IGetPaymentsResponse = IPayment & {
    blockchains: Blockchain_t[];
};

export type Payment = IGetPaymentsResponse;
