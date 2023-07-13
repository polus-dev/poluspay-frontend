import { Blockchain } from './types';

export const EMAIL_CODE_LENGTH = 6;
export const evmBlockchains: Blockchain[] = [
    'ethereum',
    'bsc',
    'polygon',
    'optimism',
    'arbitrum',
];

export const MAX_UINT256 = 2n ** 256n - 1n;
