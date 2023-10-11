export const getExplorerLink = (blockchain: string, hash: string) => {
    switch (blockchain) {
        case 'bitcoin':
            return `https://www.blockchain.com/btc/tx/${hash}`;
        case 'ethereum':
            return `https://etherscan.io/tx/${hash}`;
        case 'litecoin':
            return `https://live.blockcypher.com/ltc/tx/${hash}`;
        case 'tron':
            return `https://tronscan.org/#/transaction/${hash}`;
        case 'bsc':
            return `https://bscscan.com/tx/${hash}`;
        case 'dogecoin':
            return `https://live.blockcypher.com/doge/tx/${hash}`;
        case 'polygon':
            return `https://polygonscan.com/tx/${hash}`;
        case 'arbitrum':
            return `https://arbiscan.io/tx/${hash}`;
        default:
            return `https://www.blockchain.com/${blockchain}/tx/${hash}`;
    }
};
