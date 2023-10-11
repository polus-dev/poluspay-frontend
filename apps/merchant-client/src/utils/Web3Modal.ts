import { mainnet } from 'wagmi/chains';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';

export const projectId = import.meta.env.VITE_PROJECT_ID;
const chains = [mainnet];

export const wagmiConfig = defaultWagmiConfig({ chains, projectId });
createWeb3Modal({ wagmiConfig, projectId, chains });
