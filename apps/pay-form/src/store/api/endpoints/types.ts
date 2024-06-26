export type Blockchain_t =
    | 'arbitrum'
    | 'bsc'
    | 'ethereum'
    | 'polygon'
    | 'optimism'
    | 'tron'
    | 'bitcoin'
    | 'dogecoin'
    | 'litecoin'
    | 'bitcoin-cash';

export type Asset_t =
    | 'usdt'
    | 'usdc'
    | 'dai'
    | 'busd'
    | 'matic'
    | 'eth'
    | 'bnb'
    | 'wbtc'
    | 'weth'
    | 'wmatic'
    | 'btc'
    | 'ltc'
    | 'doge'
    | 'aave'
    | 'ape'
    | 'bch'
    | 'bit'
    | 'btt'
    | 'chz'
    | 'crv'
    | 'egld'
    | 'eos'
    | 'etc'
    | 'fil'
    | 'flow'
    | 'gala'
    | 'grt'
    | 'gusd'
    | 'ht'
    | 'inj'
    | 'kava'
    | 'ldo'
    | 'leo'
    | 'link'
    | 'mana'
    | 'mkr'
    | 'near'
    | 'okb'
    | 'paxg'
    | 'polkadot'
    | 'qnt'
    | 'rndr'
    | 'rpl'
    | 'sand'
    | 'shib'
    | 'snx'
    | 'tusd'
    | 'uni'
    | 'usdd'
    | 'wbtc'
    | 'weth'
    | 'wmatic'
    | 'usdp'
    | 'zec';

type ChainIdEnumUnion = 1 | 56 | 137 | 42161 | -1 | -2 | 10;

export const ChainId: { [key in Blockchain_t]: number } = {
    ethereum: 1,
    bsc: 56,
    polygon: 137,
    arbitrum: 42161,
    optimism: 10,
    tron: -2,
    bitcoin: -1,
    litecoin: -1,
    dogecoin: -1,
    'bitcoin-cash': -1,
};

export const ChainIdToName: { [key in ChainIdEnumUnion]: Blockchain_t } = {
    1: 'ethereum',
    56: 'bsc',
    137: 'polygon',
    42161: 'arbitrum',
    10: 'optimism',
    '-2': 'tron',
    '-1': 'bitcoin',
};

export const WrappedToken: { [key in Asset_t]?: Asset_t } = {
    btc: 'wbtc',
    eth: 'weth',
    matic: 'wmatic',
};

export const WrappedTokenToToken: { [key in Asset_t]?: Asset_t } = {
    wbtc: 'btc',
    weth: 'eth',
    wmatic: 'matic',
};
