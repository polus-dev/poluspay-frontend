/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly VITE_REACT_APP_PROJECT_ID: string;
  readonly VITE_REACT_APP_PAYFORM_SENTRY_DSN: string;
  readonly VITE_REACT_APP_CHEAT_CODE: string;
  readonly VITE_REACT_API_URL: string;

  readonly VITE_REACT_POLYGON_RPC: string;
  readonly VITE_REACT_OPTIMISM_RPC: string;
  readonly VITE_REACT_ETHEREUM_RPC: string;
  readonly VITE_REACT_BSC_RPC: string;
  readonly VITE_REACT_ARBITRUM_RPC: string;
  
  // readonly VITE_REACT_SENTRY_TRACES_SAMPLE_RATE: string;
  // readonly VITE_REACT_SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE: string;
  // readonly VITE_REACT_SENTRY_REPLAYS_SESSION_SAMPLE_RATE: string;
}
