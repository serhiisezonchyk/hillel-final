// / <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NP_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
