import {
    EthereumClient,
    w3mConnectors,
    w3mProvider,
} from '@web3modal/ethereum';
import { configureChains, createConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';

const chains = [mainnet];
export const projectId = import.meta.env.VITE_REACT_APP_PROJECT_ID;

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
export const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, version: 2, chains }),
    publicClient,
});
export const ethereumClient = new EthereumClient(wagmiConfig, []);
