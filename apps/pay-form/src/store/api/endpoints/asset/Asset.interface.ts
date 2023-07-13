import { Asset_t, Blockchain_t } from '../types';

export const enum Asset {
    AAVE = 'aave',
    APE = 'ape',
    BCH = 'bch',
    BIT = 'bit',
    BTC = 'btc',
    BTT = 'btt',
    BUSD = 'busd',
    CHZ = 'chz',
    CRV = 'crv',
    DAI = 'dai',
    DOGE = 'doge',
    EGLD = 'egld',
    EOS = 'eos',
    ETC = 'etc',
    ETH = 'eth',
    FIL = 'fil',
    FLOW = 'flow',
    GALA = 'gala',
    GRT = 'grt',
    GUSD = 'gusd',
    HT = 'ht',
    INJ = 'inj',
    KAVA = 'kava',
    LDO = 'ldo',
    LEO = 'leo',
    LINK = 'link',
    LTC = 'ltc',
    MANA = 'mana',
    MATIC = 'matic',
    MKR = 'mkr',
    NEAR = 'near',
    OKB = 'okb',
    PAXG = 'paxg',
    POLKADOT = 'polkadot',
    QNT = 'qnt',
    RNDR = 'rndr',
    RPL = 'rpl',
    SAND = 'sand',
    SHIB = 'shib',
    SNX = 'snx',
    TUSD = 'tusd',
    UNI = 'uni',
    USDC = 'usdc',
    USDD = 'usdd',
    USDP = 'usdp',
    USDT = 'usdt',
    WBTC = 'wbtc',
    WETH = 'weth',
    WMATIC = 'wmatic',
    ZEC = 'zec',
}

export const enum Blockchain {
    BITCOIN = 'bitcoin',
    ARBITRUM = 'arbitrum',
    BINANCE = 'bsc',
    ETHEREUM = 'ethereum',
    POLYGON = 'polygon',
    TRON = 'tron',
}

export interface TokenEntity {
    is_native: boolean;
    contract: string;
    decimals: number;
    min_amount: string;
    is_seeded_amount: boolean;
}

export type IAssetsResponse = {
    [key in Asset_t]: {
        networks: {
            [key in Blockchain_t]: TokenEntity;
        };
    };
};

export type IAssets = Required<IAssetsResponse>;
