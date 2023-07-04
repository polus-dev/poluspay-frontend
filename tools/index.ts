export type * from './types';
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
