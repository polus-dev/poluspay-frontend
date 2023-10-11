import { mainnet } from 'wagmi/chains';
import {createWeb3Modal, defaultWagmiConfig} from "@web3modal/wagmi";

const chains = [mainnet];
export const projectId = import.meta.env.VITE_PROJECT_ID;

export const wagmiConfig = defaultWagmiConfig({chains, projectId})
createWeb3Modal({ wagmiConfig, projectId, chains })
