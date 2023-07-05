import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import * as Sentry from '@sentry/react';
import {
  WebviewType,
  AdaptivityProvider,
  ConfigProvider,
  IOS,
} from '@vkontakte/vkui/old';
import { App } from './App';
import { store } from './store/store';

const ConfigProviderFix: any = ConfigProvider;
const AdaptivityProviderFix: any = AdaptivityProvider;

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: import.meta.env.VITE_REACT_APP_MERCHANT_SENTRY_DSN,
    integrations: [
      new Sentry.BrowserTracing({
        tracePropagationTargets: [import.meta.env.VITE_REACT_API_URL],
      }),
      new Sentry.Replay({
        maskAllText: false,
        blockAllMedia: false,
        networkDetailAllowUrls: [import.meta.env.VITE_REACT_API_URL],
        networkResponseHeaders: ['X-Request-Id'],
      }),
    ],
    replaysSessionSampleRate: 1.0,
    replaysOnErrorSampleRate: 1.0,
  });
}

ReactDOM.render(
  <BrowserRouter basename="/">
    <React.StrictMode>
      <ConfigProviderFix
        appearance={'dark'}
        webviewType={WebviewType.INTERNAL}
        platform={IOS}
      >
        <AdaptivityProviderFix>
          <Provider store={store}>
            <App />
          </Provider>
        </AdaptivityProviderFix>
      </ConfigProviderFix>
    </React.StrictMode>
  </BrowserRouter>,
  document.querySelector('#root')
);
