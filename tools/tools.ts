import { Blockchain } from './types';
import WAValidator from 'multicoin-address-validator';
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const CODE_LENGTH = 6;

export const makeShortHash = (
    hash: string,
    leftAlignment: number = 4,
    rightAlignment = leftAlignment
) => `${hash.slice(0, leftAlignment)}...${hash.slice(-rightAlignment)}`;

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

export const roundCryptoAmount = (amount: string) => {
    let z = '0',
        o = 4,
        v = '.',
        isStartWithZero = amount.startsWith(z),
        floatPointIndex = amount.indexOf(v);
    while (
        isStartWithZero
            ? amount[++floatPointIndex] === z
            : amount[++floatPointIndex] !== z &&
              floatPointIndex < amount.length &&
              floatPointIndex <= o
    );
    return amount.slice(
        0,
        amount[floatPointIndex - 1] === v && !isStartWithZero
            ? floatPointIndex - 1
            : isStartWithZero
            ? floatPointIndex + 1
            : floatPointIndex
    );
};

export const formatDate = function (date: Date) {
    const formatNumbers = function (num: number) {
        return num < 10 ? '0' + num : num;
    };
    let day = formatNumbers(date.getDate());
    let month = formatNumbers(date.getMonth() + 1);
    let year = date.getFullYear();
    return day + '-' + month + '-' + year;
};

export const getExplorer = (blockchain: string) => {
    switch (blockchain) {
        case 'bitcoin':
            return 'https://www.blockchain.com/btc/tx/';
        case 'ethereum':
            return 'https://etherscan.io/tx/';
        case 'litecoin':
            return 'https://live.blockcypher.com/ltc/tx/';
        case 'tron':
            return 'https://tronscan.org/#/transaction/';
        case 'bsc':
            return 'https://explorer.binance.org/tx/';
        case 'dogecoin':
            return 'https://live.blockcypher.com/doge/tx/';
        case 'polygon':
            return 'https://polygonscan.com/tx/';
        case 'arbitrum':
            return 'https://arbiscan.io/tx/';

        default:
            return 'https://www.blockchain.com/';
    }
};
