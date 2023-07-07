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
