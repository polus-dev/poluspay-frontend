import { Blockchain } from 'tools';

export interface Item {
    id: number;
    name: string;
    image: string;
    type: 'wallet' | 'exchange' | 'blockchain';
}

export interface WalletItemConnected extends Omit<Item, 'id'> {
    address: string;
    label: Blockchain;
}

export const walletList: Item[] = [
    {
        id: 2,
        name: '1inch Wallet',
        image: '1inch',
        type: 'wallet',
    },
    {
        id: 3,
        name: 'Coinomi',
        image: 'coinomi',
        type: 'wallet',
    },
    {
        id: 4,
        name: 'BitGo Wallet',
        image: 'bitgo',
        type: 'wallet',
    },
    {
        id: 5,
        name: 'TrustWallet',
        image: 'trust-wallet',
        type: 'wallet',
    },
    {
        id: 6,
        name: 'C98 Wallet',
        image: 'c98',
        type: 'wallet',
    },
    {
        id: 7,
        name: 'Bread Wallet',
        image: 'bread',
        type: 'wallet',
    },
    {
        id: 8,
        name: 'Jaxx Wallet',
        image: 'jaxx',
        type: 'wallet',
    },
    {
        id: 9,
        name: 'Phantom',
        image: 'phantom',
        type: 'wallet',
    },
    {
        id: 10,
        name: 'Coinbase Wallet',
        image: 'coinbase',
        type: 'wallet',
    },
    {
        id: 11,
        name: 'Guarda Wallet',
        image: 'guarda',
        type: 'wallet',
    },
    {
        id: 12,
        name: 'MyEtherWallet',
        image: 'mew',
        type: 'wallet',
    },
    {
        id: 13,
        name: 'Wirex Wallet',
        image: 'wirex',
        type: 'wallet',
    },
    {
        id: 14,
        name: 'Cryptonator',
        image: 'cryptonator',
        type: 'wallet',
    },
    {
        id: 15,
        name: 'Ledger',
        image: 'ledger',
        type: 'wallet',
    },
    {
        id: 16,
        name: 'Exodus',
        image: 'exodus',
        type: 'wallet',
    },
    {
        id: 17,
        name: 'Atomic Wallet',
        image: 'atomic',
        type: 'wallet',
    },
    {
        id: 18,
        name: 'Electrum',
        image: 'electrum',
        type: 'wallet',
    },
    {
        id: 19,
        name: 'KeepKey',
        image: 'keepkey',
        type: 'wallet',
    },
    {
        id: 20,
        name: 'Keplr Wallet',
        image: 'keplr',
        type: 'wallet',
    },
    {
        id: 21,
        name: 'Blockchain Wallet',
        image: 'blockchain-wallet',
        type: 'wallet',
    },
    {
        id: 22,
        name: 'Trezor',
        image: 'trezor',
        type: 'wallet',
    },
    {
        id: 23,
        name: 'Citadel One',
        image: 'citadel',
        type: 'wallet',
    },
];

export const exchangeList: Item[] = [
    {
        id: 24,
        name: 'Coinbase',
        image: 'coinbase',
        type: 'exchange',
    },
    {
        id: 25,
        name: 'KuCoin',
        image: 'kucoin',
        type: 'exchange',
    },
    {
        id: 26,
        name: 'OKX',
        image: 'okx',
        type: 'exchange',
    },
    {
        id: 27,
        name: 'Crypto.com',
        image: 'cryptocom',
        type: 'exchange',
    },
    {
        id: 28,
        name: 'Kraken',
        image: 'kraken',
        type: 'exchange',
    },
    {
        id: 29,
        name: 'Binance',
        image: 'binance',
        type: 'exchange',
    },
    {
        id: 30,
        name: 'Bybit',
        image: 'bybit',
        type: 'exchange',
    },
];

export const blockchainList: (Item & { label: Blockchain; evm: boolean })[] = [
    {
        id: 31,
        name: 'Arbitrum',
        image: 'arbitrum',
        type: 'blockchain',
        label: 'arbitrum',
        evm: true,
    },
    {
        id: 32,
        name: 'Ethereum',
        image: 'ethereum',
        type: 'blockchain',
        label: 'ethereum',
        evm: true,
    },
    {
        id: 33,
        name: 'Doge',
        image: 'doge',
        type: 'blockchain',
        label: 'dogecoin',
        evm: false,
    },
    {
        id: 34,
        name: 'Optimism',
        image: 'optimism',
        type: 'blockchain',
        label: 'optimism',
        evm: true,
    },
    {
        id: 35,
        name: 'Binance Smart Chain',
        image: 'bsc',
        type: 'blockchain',
        label: 'bsc',
        evm: true,
    },
    {
        id: 36,
        name: 'Polygon',
        image: 'polygon',
        type: 'blockchain',
        label: 'polygon',
        evm: true,
    },
    {
        id: 37,
        name: 'Bitcoin',
        image: 'bitcoin',
        type: 'blockchain',
        label: 'bitcoin',
        evm: false,
    },
    {
        id: 38,
        name: 'Bitcoin Cash',
        image: 'bitcoin-cash',
        type: 'blockchain',
        label: 'bitcoin-cash',
        evm: false,
    },
    {
        id: 39,
        name: 'Tron',
        image: 'tron',
        type: 'blockchain',
        label: 'tron',
        evm: false,
    },
];

const address = '0x00000000000000000000000000 ';
export const connectedWalletList: WalletItemConnected[] = [
    {
        name: 'Arbitrum',
        image: 'arbitrum',
        type: 'blockchain',
        label: 'arbitrum',
        address,
    },
    {
        name: 'Ethereum',
        image: 'ethereum',
        type: 'blockchain',
        label: 'ethereum',
        address,
    },
    {
        name: 'Doge',
        image: 'doge',
        type: 'blockchain',
        label: 'dogecoin',
        address,
    },
    {
        name: 'Optimism',
        image: 'optimism',
        type: 'blockchain',
        label: 'optimism',
        address,
    },
    {
        name: 'Binance Smart Chain',
        image: 'bsc',
        type: 'blockchain',
        label: 'bsc',
        address,
    },
    {
        name: 'Polygon',
        image: 'polygon',
        type: 'blockchain',
        label: 'polygon',
        address,
    },
    {
        name: 'Bitcoin',
        image: 'bitcoin',
        type: 'blockchain',
        label: 'bitcoin',
        address,
    },
    {
        name: 'Bitcoin Cash',
        image: 'bitcoin-cash',
        type: 'blockchain',
        label: 'bitcoin-cash',
        address,
    },
    {
        name: 'Tron',
        image: 'tron',
        address: '',
        type: 'blockchain',
        label: 'tron',
    },
];
