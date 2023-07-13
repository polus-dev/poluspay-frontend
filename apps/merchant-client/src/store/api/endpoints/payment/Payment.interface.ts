import { IPagination, IPayment } from '@poluspay-frontend/api';

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
    [blockchain: string]: {
        [asset: string]: {
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
