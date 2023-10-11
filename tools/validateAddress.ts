import { Blockchain } from './types';
import WAValidator from 'multicoin-address-validator';

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
        case 'ripple':
            return WAValidator.validate(address, 'Ripple');
        default:
            return true;
    }
};
