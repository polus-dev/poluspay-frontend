import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
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
