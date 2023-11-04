import type { Blockchain } from '@poluspay-frontend/utils';
import { IMerchant } from '@poluspay-frontend/api';

type UnparsedJSON = string;

export interface ICreateMerchantRequest {
    name: string;
    description?: string;
    domain?: string;
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

export interface ISetWebhookRequest extends IMerchantId {
    webhook_url: string;
}

export type IGetWebhookHistoryResponse = IWebhookItem[];
export type IGetMerchantResponse = IMerchant[];
export type IGetMerchantByIdResponse = IMerchant;

export type IGetWebhookHistoryResponseWithTotalCount = {
    data: IWebhookItem[];
    totalCount: number;
};
export type IGetMerchantResponseWithTotalCount = {
    data: IMerchant[];
    totalCount: number;
};
export interface IUpdateMerchantRequest
    extends IMerchantId,
        Partial<ICreateMerchantRequest & Pick<IMerchant, 'display_name'>> {}

export interface IGenerateSigningKeyResponse extends IMerchantId {
    signing_key: string;
}

export interface ICreateMerchantWalletRequest extends IMerchantId {
    address: string;
    networks: Blockchain[];
}

export interface IMerchantWallet extends IMerchantId {
    is_disabled: boolean;
    address: string;
    network: Blockchain;
}

export interface IChangeMerchantWalletStatusRequest extends IMerchantId {
    network: Blockchain;
}

export interface IVerifyDomainRequest extends IMerchantId {
    method: 'dns' | 'response';
    path?: string;
}

export interface IUploadLogoRequest extends IMerchantId {
    image: File;
}

export interface IDeleteMerchantWalletRequest extends IMerchantId {
    network: string;
}

export interface IGetMerchantStatisticsRequest extends Partial<IMerchantId> {
    from_date: string;
    to_date: string;
}

export interface PerDayTurnover {
    count: number;
    amount: string;
    posting_date: string;
}

export interface IGetMerchantStatisticsResponse {
    total_payments: number;
    success_payments: number;
    turnover_detalization: TurnoverDetalization[] | null;
    total_payments_per_day: PerDayTurnover[];
    success_payments_per_day: PerDayTurnover[];
}

export interface TurnoverDetalization extends IMerchantId {
    network: string;
    asset: string;
    amount: string;
    amount_decimals: string;
    number_of_success_payments: number;
    percent_of_total_success: number;
}
