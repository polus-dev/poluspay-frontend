import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react'
import {
  WebviewType,
  AdaptivityProvider,
  ConfigProvider,
  IOS,
} from '@vkontakte/vkui';
import { App } from './App';
import { store } from './store/store';

const ConfigProviderFix: any = ConfigProvider;
const AdaptivityProviderFix: any = AdaptivityProvider;

if (import.meta.env.PROD) {
  posthog.init(import.meta.env.VITE_REACT_APP_PUBLIC_POSTHOG_KEY, { api_host: import.meta.env.VITE_REACT_APP_PUBLIC_POSTHOG_HOST })
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
            <PostHogProvider client={posthog}>
              <App />
            </PostHogProvider>
          </Provider>
        </AdaptivityProviderFix>
      </ConfigProviderFix>
    </React.StrictMode>
  </BrowserRouter>,
  document.querySelector('#root')
);
