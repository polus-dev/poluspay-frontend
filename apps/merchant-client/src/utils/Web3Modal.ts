import {
    EthereumClient,
    w3mConnectors,
    w3mProvider,
} from '@web3modal/ethereum';
import { configureChains, createConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';

export const projectId = import.meta.env.VITE_PROJECT_ID;
const chains = [mainnet];

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);

export const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient,
});

export const ethereumClient = new EthereumClient(wagmiConfig, []);
