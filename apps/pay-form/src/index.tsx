import {createWeb3Modal, defaultWagmiConfig} from '@web3modal/wagmi/react'

import {configureChains, createConfig, WagmiConfig} from 'wagmi';
import {mainnet, polygon, arbitrum, bsc, optimism} from 'wagmi/chains';

import {Provider} from 'react-redux';
import {store} from './store/store';

const chains = [polygon, mainnet, arbitrum, bsc, optimism];
const projectId = import.meta.env.VITE_PROJECT_ID;


const wagmiConfig = defaultWagmiConfig({chains, projectId})

createWeb3Modal({ wagmiConfig, projectId, chains })

import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {createRoot} from 'react-dom/client';

import {App} from './App';

import './assets/scss/main.scss';

const domNode = document.getElementById('root');

if (domNode) {
    const root = createRoot(domNode);

    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <WagmiConfig config={wagmiConfig}>
                    <Provider store={store}>
                        <App/>
                    </Provider>
                </WagmiConfig>
            </BrowserRouter>
        </React.StrictMode>
    );
}
