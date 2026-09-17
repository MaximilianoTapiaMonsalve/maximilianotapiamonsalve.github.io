// @ts-check
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages del repositorio maximilianotapiamonsalve.github.io (sin `base`).
  site: 'https://maximilianotapiamonsalve.github.io',
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    react(),
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', es: 'es' } },
    }),
  ],
  vite: {
    resolve: {
      // Mismo alias que en tsconfig.json, para que también funcione en los @import de Less.
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
  },
});
