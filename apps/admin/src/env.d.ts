/// <reference types="vite/client" />

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly VITE_PAYFORM_URL: string;
    readonly VITE_ASSET_URL: string;
}
