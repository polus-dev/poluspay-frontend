import { Blockchain } from './types';
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
            return /^0x[a-fA-F0-9]{40}$/.test(address);
        case 'tron':
            return /^T[a-zA-Z0-9]{33}$/.test(address);
        case 'bitcoin-cash':
            return /^((bitcoincash:)?(q|p)[a-z0-9]{41})$/.test(address);
        case 'bitcoin':
            return /^(bc1|[13])[a-km-zA-HJ-NP-Z1-9]{25,34}$/.test(address);
        case 'dogecoin':
            return /^((dogecoin:)?(q|p)[a-z0-9]{41})$/.test(address);
        default:
            return false;
    }
};
