import { IPagination } from '@poluspay-frontend/api';

interface IPayment {
    id: string;
    merchant_id: string;
    description: string;
    assets: IAssets;
    evm_fee_address: string;
    // TODO: make types
    status: string;
    transaction?: ITransaction;
    // TODO: make types
    selected_blockchain: any;
    expires_at: string;
    created_at: string;
}

interface ITransaction {
    hash: string;
    network: Blockchain_t;
    network_id: number;
    notification_delivered: boolean;
}

export type Blockchain_t =
    | 'arbitrum'
    | 'bsc'
    | 'ethereum'
    | 'polygon'
    | 'tron'
    | 'bitcoin'
    | 'dogecoin'
    | 'litecoin';

export type Asset_t =
    | 'usdt'
    | 'usdc'
    | 'dai'
    | 'busd'
    | 'matic'
    | 'eth'
    | 'bnb'
    | 'trx'
    | 'wbtc'
    | 'weth'
    | 'wmatic'
    | 'btc'
    | 'ltc'
    | 'doge';

export interface ICreatePaymentRequest {
    description: string;
    merchant_id: string;
    assets: Partial<IAssets>;
}

export type IAssets = {
    [key in Blockchain_t]: {
        [key in Asset_t]: {
            amount: string | number;
            address: string;
        };
    };
};

export interface IGetPaymentByMerchantId extends IPagination {
    merchant_id: string;
}

export interface IGetPaymentByPaymentId {
    payment_id: string;
}

export type ICreatePaymentResponse = IPayment;

export type IGetPaymentsResponseWithTotalCount = {
    data: IPayment[];
    totalCount: number;
};

export type IGetPaymentsResponse = IPayment[];
