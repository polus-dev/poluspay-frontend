import { IPagination, IPaymentMerchant } from '@poluspay-frontend/api';

export interface IGetMerchantRequest extends IPagination {
    merchant_id?: string;
}

export type IGetMerchantResponse = IPaymentMerchant[];
export type IGetMerchantByIdResponse = IPaymentMerchant;
