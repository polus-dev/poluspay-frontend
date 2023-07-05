import { Blockchain } from './types';
import WAValidator from 'multicoin-address-validator';
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const CODE_LENGTH = 6;

export const formatAddress = (address: string) =>
    `${address.slice(0, 6)}...${address.slice(-4)}`;

export const httpsUrlRegex = /^https:\/\/.*/;

// O(n)
// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
export const shuffleArray = (array: unknown[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

export const validateAddress = (
    address: string,
    blockchain: Blockchain
): boolean => {
    switch (blockchain) {
        case 'ethereum':
        case 'bsc':
        case 'polygon':
        case 'optimism':
        case 'arbitrum':
            return WAValidator.validate(address, 'Ethereum');
        case 'tron':
            return WAValidator.validate(address, 'Tron');
        case 'bitcoin-cash':
            return WAValidator.validate(address, 'BitcoinCash');
        case 'bitcoin':
            return WAValidator.validate(address, 'Bitcoin');
        case 'dogecoin':
            return WAValidator.validate(address, 'DogeCoin');
        default:
            return false;
    }
};

export const placeHolderForAddress = (blockchain: Blockchain) => {
    switch (blockchain) {
        case 'bitcoin':
            return 'bc1...';
        case 'bitcoin-cash':
            return 'bitcoincash:...';
        case 'tron':
            return 'T...';
        case 'dogecoin':
            return 'D...';
        default:
            return '0x...';
    }
};

const evmBlockchains: Blockchain[] = [
    'ethereum',
    'bsc',
    'polygon',
    'optimism',
    'arbitrum',
];

export const isEVMBlockchain = (blockchain: Blockchain) =>
    evmBlockchains.includes(blockchain);
