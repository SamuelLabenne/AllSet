// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Served from GitHub Pages on the custom domain (DNS on Cloudflare). Setting this
// to '' falls back to https://samuellabenne.github.io/AllSet/.
const CUSTOM_DOMAIN = 'allsetpartners.com';

export default defineConfig({
  site: CUSTOM_DOMAIN ? `https://${CUSTOM_DOMAIN}` : 'https://samuellabenne.github.io',
  base: CUSTOM_DOMAIN ? '/' : '/AllSet',
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  devToolbar: { enabled: false },
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
});
