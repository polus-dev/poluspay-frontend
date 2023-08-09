/// <reference types="vite/client" />

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
    readonly VITE_PROJECT_ID: string;
    readonly VITE_PAYFORM_SENTRY_DSN: string;
    readonly VITE_CHEAT_CODE: string;
    readonly VITE_API_URL: string;

    readonly VITE_POLYGON_RPC: string;
    readonly VITE_OPTIMISM_RPC: string;
    readonly VITE_ETHEREUM_RPC: string;
    readonly VITE_BSC_RPC: string;
    readonly VITE_ARBITRUM_RPC: string;
    readonly VITE_ASSET_URL: string;

    // readonly VITE_REACT_SENTRY_TRACES_SAMPLE_RATE: string;
    // readonly VITE_REACT_SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE: string;
    // readonly VITE_REACT_SENTRY_REPLAYS_SESSION_SAMPLE_RATE: string;
}
