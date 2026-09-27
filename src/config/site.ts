// Central place for business details. Anything marked TODO is a placeholder
// to confirm before the domain launch.
export const SITE = {
  name: 'All Set Consulting',
  shortName: 'All Set',
  description:
    'All Set Consulting implements Odoo for Australian businesses. Clear scope, senior consultants and long-term support, from first workshop to go-live and beyond.',
  // TODO: replace with the real mailbox once the domain is registered.
  email: 'hello@allsetconsulting.com.au',
  location: 'Australia-wide',
  // TODO: add the company LinkedIn page URL.
  linkedin: '',
  // Form backend for the contact page (e.g. https://formspree.io/f/xxxxxxx).
  // When empty, the form falls back to opening the visitor's email client.
  formEndpoint: '',
  // Optional booking link (Calendly, Cal.com, Odoo Appointments...). When set,
  // "Book a call" buttons go there instead of the contact page.
  bookingUrl: '',
  // Keep search engines out while the site holds placeholder content.
  // Flip to true at domain launch.
  indexable: false,
};

export const NAV = [
  { label: 'Services', href: '/services/' },
  { label: 'About', href: '/about/' },
  { label: 'Insights', href: '/insights/' },
  { label: 'Contact', href: '/contact/' },
];

/** Prefix an internal path with the configured base (e.g. /AllSet on GitHub Pages). */
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function bookingHref(): string {
  return SITE.bookingUrl || url('/contact/');
}
