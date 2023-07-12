import type { Blockchain, URL } from 'tools';
export interface IMerchant {
    id: string;
    name: string;
    display_name: string | null;
    logo: URL | null;
    logo_status: LogoStatus;
    description: string | null;
    domain: string | null;
    domain_confirmation_code: string;
    success_redirect_url: string;
    fail_redirect_url: string;
    webhook_url: string;
    is_domain_confirmed: boolean;
    is_signing_key_generated: boolean;
    created_at: string;
}

export type LogoStatus = 'on_moderation' | 'declined' | 'accepted' | null;

type UnparsedJSON = string;

export interface ICreateMerchantRequest {
    name: string;
    description?: string;
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

export interface ISetWebhookRequest extends IMerchantId {
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
