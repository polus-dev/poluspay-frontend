// import React from 'react';
// import ReactDOM from 'react-dom';
// import { TourProvider } from '@reactour/tour';
// import { BrowserRouter } from 'react-router-dom';
// import * as Sentry from '@sentry/react';
// import {
//     WebviewType,
//     AdaptivityProvider,
//     ConfigProvider,
// } from '@vkontakte/vkui';

import {
    EthereumClient,
    w3mConnectors,
    w3mProvider,
} from '@web3modal/ethereum';

import { Web3Modal } from '@web3modal/react';

import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, arbitrum, bsc, optimism } from 'wagmi/chains';

// import { App } from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
// import { steps } from './guid/steps';
// import {ErrorBoundary} from "@poluspay-frontend/ui";

const chains = [polygon, mainnet, arbitrum, bsc, optimism];
const projectId = import.meta.env.VITE_PROJECT_ID;

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({
        projectId,
        chains,
    }),
    publicClient,
});

// if (import.meta.env.PROD) {
//     Sentry.init({
//         dsn: import.meta.env.VITE_PAYFORM_SENTRY_DSN,
//         integrations: [
//             new Sentry.BrowserTracing({
//                 tracePropagationTargets: [import.meta.env.VITE_API_URL],
//             }),
//             new Sentry.Replay({ maskAllText: false, blockAllMedia: false }),
//         ],
//         tracesSampleRate:
//             parseFloat(import.meta.env.VITE_REACT_SENTRY_TRACES_SAMPLE_RATE) ||
//             0.1,
//         replaysSessionSampleRate:
//             parseFloat(
//                 import.meta.env.VITE_REACT_SENTRY_REPLAYS_SESSION_SAMPLE_RATE
//             ) || 0.1,
//         replaysOnErrorSampleRate:
//             parseFloat(
//                 import.meta.env.VITE_REACT_SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE
//             ) || 1.0,
//     });
// }

// // Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiConfig, chains);

// const ConfigProviderFix: any = ConfigProvider;
// const AdaptivityProviderFix: any = AdaptivityProvider;

// ReactDOM.render(
//   <ErrorBoundary>
//     <Provider store={store}>
//         <BrowserRouter basename="/">
//             <WagmiConfig config={wagmiConfig}>
//                 <React.StrictMode>
//                     <ConfigProviderFix
//                         appearance={'dark'}
//                         webviewType={WebviewType.INTERNAL}
//                         platform="ios"
//                     >
//                         <AdaptivityProviderFix>
//                             <TourProvider
//                                 steps={steps}
//                                 styles={{
//                                     popover: (base) => ({
//                                         ...base,
//                                         backgroundColor: '#18181e',
//                                         borderRadius: 8,
//                                         boxShadow:
//                                             '0 0 20px rgba(0, 0, 0, 0.2)',
//                                         color: '#fff',
//                                         justifyContent: 'center',
//                                     }),
//                                     button: (base) => ({
//                                         ...base,
//                                         // background: "linear-gradient(235deg, #5ddcff, #3c67e3 43%, #4e00c2)",
//                                         borderRadius: 8,
//                                         fontSize: 16,
//                                         fontWeight: 600,
//                                         padding: '8px 16px',
//                                         textTransform: 'uppercase',
//                                         border: 'none',
//                                         boxShadow:
//                                             '0 0 20px rgba(0, 0, 0, 0.2)',
//                                         color: '#fff',
//                                     }),
//                                     close: (base) => ({
//                                         ...base,
//                                         // color: "#fff",
//                                         display: 'none',
//                                     }),
//                                     dot: (base) => ({
//                                         ...base,
//                                     }),
//                                     arrow: (base) => ({
//                                         ...base,
//                                     }),
//                                 }}
//                             >
//                                 <App />
//                             </TourProvider>
//                         </AdaptivityProviderFix>
//                     </ConfigProviderFix>
//                 </React.StrictMode>
//             </WagmiConfig>
//             <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
//         </BrowserRouter>
//     </Provider>
//   </ErrorBoundary>,
//     document.querySelector('#root')
// );

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import { App } from './App';

import './assets/scss/main.scss';

const domNode = document.getElementById('root');

if (domNode) {
    const root = createRoot(domNode);

    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <WagmiConfig config={wagmiConfig}>
                    <Provider store={store}>
                        <App />
                    </Provider>
                    <Web3Modal
                        projectId={projectId}
                        ethereumClient={ethereumClient}
                    />
                </WagmiConfig>
            </BrowserRouter>
        </React.StrictMode>
    );
}
