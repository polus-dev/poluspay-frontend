/// <reference types="vite/client" />

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
    readonly VITE_REACT_APP_IFRAME_URL: string;
    readonly VITE_REACT_APP_BASE_URL: string;
    readonly VITE_REACT_APP_PAYFORM_URL: string;
    readonly VITE_REACT_APP_PROJECT_ID: string;
    readonly VITE_REACT_APP_ASSET_URL: string;
    readonly VITE_REACT_APP_PRICE_URL: string;
}
