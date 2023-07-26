/// <reference types="vite/client" />

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
    readonly VITE_IFRAME_URL: string;
    readonly VITE_API_URL: string;
    readonly VITE_PAYFORM_URL: string;
    readonly VITE_PROJECT_ID: string;
    readonly VITE_ASSET_URL: string;
    readonly VITE_PRICE_URL: string;
}
