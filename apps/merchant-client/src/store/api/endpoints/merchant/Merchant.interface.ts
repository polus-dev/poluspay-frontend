import { IPagination } from '@poluspay-frontend/api';
interface IMerchant {
    id: string;
    name: string;
    description: string;
    domain: string;
    domain_confirmation_code: string;
    success_redirect_url: string;
    fail_redirect_url: string;
    webhook_url: string;
    is_domain_confirmed: boolean;
    is_signing_key_generated: boolean;
    created_at: string;
}

type UnparsedJSON = string;

export interface ICreateMerchantRequest {
    name: string;
    description: string;
    domain: string;
    success_redirect_url?: string;
    fail_redirect_url?: string;
}

export interface ICreateMerchantResponse {
    id: string;
    name: string;
    description: string;
    domain: string;
    domain_confirmation_code: string;
}

export interface IMerchantId {
    merchant_id: string;
}

export interface IGetMerchantRequest extends IMerchantId {}

export type IDeleteMerchantRequest = IMerchantId;

interface IWebhookItem {
    id: string;
    merchant_id: string;
    payment_id: string;
    endpoint: string;
    response_body: UnparsedJSON;
    response_status_code: 200 | 500;
    created_at: string;
}

export interface ISetWebhookRequest {
    merchant_id: string;
    webhook_url: string;
}

export type IGetWebhookHistoryResponse = IWebhookItem[];
export type IGetWebhookHistoryResponseWithTotalCount = {
    data: IWebhookItem[];
    totalCount: number;
};
export type IGetMerchantResponse = IMerchant[];
export type IGetMerchantResponseWithTotalCount = {
    data: IMerchant[];
    totalCount: number;
};
export type IGetMerchantByIdResponse = IMerchant;
export type IUpdateMerchantRequest = Partial<
    ICreateMerchantRequest & { merchant_id: string }
>;
