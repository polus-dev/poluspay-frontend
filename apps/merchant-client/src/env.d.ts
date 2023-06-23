/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly VITE_REACT_APP_IFRAME_URL: string;
  readonly VITE_REACT_APP_BASE_URL: string;
  readonly VITE_REACT_APP_PAYFORM_URL: string;
  readonly VITE_REACT_APP_PUBLIC_POSTHOG_KEY: string;
  readonly VITE_REACT_APP_PUBLIC_POSTHOG_HOST: string
}
