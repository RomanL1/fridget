/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ViteTypeOptions {
  strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
  readonly VITE_API_HOST: string;
  readonly VITE_CHEFKOCH_HOST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
