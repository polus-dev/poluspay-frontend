export type Blockchain_t = 'arbitrum' | 'bsc' | 'ethereum' | 'polygon' | 'tron';
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
    | 'btc';

export type IAssetsResponse = {
    [key in Asset_t]: {
        [key in Blockchain_t]: {
            is_native: boolean;
            contract: string;
            decimals: number;
            is_seeded_amount: boolean;
        };
    };
};
