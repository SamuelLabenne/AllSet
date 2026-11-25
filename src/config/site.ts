// Central place for business details. Anything marked TODO is a placeholder.
export const SITE = {
  name: 'All Set Partners',
  description:
    'All Set Partners is an official Odoo partner. We implement, migrate, customise and support Odoo for growing businesses in Australia and Europe.',
  // TODO: shown as plain text (not a link) until the mailbox is set up.
  email: 'hello@allsetpartners.com',
  region: 'Australia & Europe',
  // TODO: confirm the ABN for All Set Partners. Shown in the footer and privacy policy.
  abn: '',
  // Google Analytics 4 measurement ID (e.g. 'G-XXXXXXXXXX'). Only loaded after a
  // visitor accepts cookies in the consent banner. Empty = no analytics at all.
  analyticsId: '',
  indexable: true,
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
