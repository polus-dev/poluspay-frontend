import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import './assets/scss/main.scss';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import * as Sentry from '@sentry/react';
import { ErrorBoundary } from '@sentry/react';
import { AuthGuard } from './components/Auth/AuthGuard';
const domNode = document.getElementById('root');

if (domNode) {
    const root = createRoot(domNode);

    if (import.meta.env.PROD) {
        Sentry.init({
            dsn: import.meta.env.VITE_MERCHANT_SENTRY_DSN,
            integrations: [
                new Sentry.BrowserTracing({
                    tracePropagationTargets: [import.meta.env.VITE_API_URL],
                }),
                new Sentry.Replay({
                    maskAllText: false,
                    blockAllMedia: false,
                    networkDetailAllowUrls: [import.meta.env.VITE_API_URL],
                    networkResponseHeaders: ['X-Request-Id'],
                }),
            ],
            replaysSessionSampleRate: 1.0,
            replaysOnErrorSampleRate: 1.0,
        });
    }

    root.render(
        <React.StrictMode>
            <ErrorBoundary>
                <BrowserRouter>
                    <Provider store={store}>
                        <AuthGuard>
                            <App />
                        </AuthGuard>
                    </Provider>
                </BrowserRouter>
            </ErrorBoundary>
        </React.StrictMode>
    );
}
