/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_POKEMON_API_BASE_URL?: string
  readonly VITE_APP_TITLE?: string
  readonly VITE_APP_VERSION?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
