// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// While Freek reviews, the site is served from https://samuellabenne.github.io/AllSet/.
// At launch, set CUSTOM_DOMAIN to 'allsetpartners.com' and add public/CNAME.
const CUSTOM_DOMAIN = '';

export default defineConfig({
  site: CUSTOM_DOMAIN ? `https://${CUSTOM_DOMAIN}` : 'https://samuellabenne.github.io',
  base: CUSTOM_DOMAIN ? '/' : '/AllSet',
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  devToolbar: { enabled: false },
  integrations: [sitemap({ filter: (page) => !page.includes('/404') })],
});
