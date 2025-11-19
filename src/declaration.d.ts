// src/declaration.d.ts
declare module "*.css";

declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY: string;
  readonly VITE_RECAPTCHA_SITE_KEY: string;
  readonly VITE_RECAPTCHA_SECRET_KEY: string;
  readonly VITE_BACKEND_URL: string;
  readonly VITE_MODE: string;
  // add more custom env variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
