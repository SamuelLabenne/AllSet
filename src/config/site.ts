// Central place for business details. Anything marked TODO is a placeholder.
export const SITE = {
  name: 'All Set Partners',
  description:
    'All Set Partners is an official Odoo partner. We implement, migrate, customise and support Odoo for growing businesses in Australia and Europe.',
  // Shown as plain text until the mailboxes exist; set emailsLive to true to make them
  // clickable mailto: links. The contact form (later) should send to both addresses.
  emails: [
    { name: 'Sam', address: 'sam@allsetpartners.com' },
    { name: 'Freek', address: 'freek@allsetpartners.com' },
  ],
  emailsLive: false,
  // Contact form: posts to the Cloudflare Worker in /worker, which emails both founders.
  // Leave endpoint empty to hide the form. PUBLIC_* env vars override these for local testing.
  form: {
    endpoint: import.meta.env.PUBLIC_FORM_ENDPOINT ?? '',
    turnstileSiteKey: import.meta.env.PUBLIC_TURNSTILE_SITE_KEY ?? '',
  },
  region: 'Australia & Europe',
  abn: '12 415 125 386',
  // Google Analytics 4 measurement ID (e.g. 'G-XXXXXXXXXX'). Only loaded after a
  // visitor accepts cookies in the consent banner. Empty = no analytics at all.
  analyticsId: '',
  // Keep search engines out while Freek reviews on the github.io address. Set to true at launch.
  indexable: false,
  policiesUpdated: '2026-11-25',
};

export const NAV = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];

/** Prefix an internal path with the configured base. */
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
