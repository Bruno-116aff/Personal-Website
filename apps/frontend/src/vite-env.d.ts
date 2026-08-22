/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL: string;
  readonly VITE_CONTACT_API_URL: string;
  readonly VITE_GA4_MEASUREMENT_ID: string;
  readonly VITE_GITHUB_URL: string;
  readonly VITE_LINKEDIN_URL: string;
  readonly VITE_OG_IMAGE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
