import { Blockchain } from './types';

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
            case 'ripple':
            return 'r... OR X...';
        default:
            return '0x...';
    }
};
