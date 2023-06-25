import { Blockchain_t } from '../store/api/endpoints/payment/Payment.interface';

export const getExplorer = (blockchain: Blockchain_t) => {
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
