/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NODE_ENV: string
  readonly VITE_PORT: string
  readonly VITE_APP_HOST: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
