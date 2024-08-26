// / <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NP_API_KEY: string;
  readonly VITE_STORAGE_SECRET_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
