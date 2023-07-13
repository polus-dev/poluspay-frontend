import { Blockchain } from './types';
import { evmBlockchains } from './constants';

export const isEVMBlockchain = (blockchain: Blockchain) =>
    evmBlockchains.includes(blockchain);
