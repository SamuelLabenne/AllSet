# All Set Partners website

Website for All Set Partners (ASP), an Odoo consultancy and official Odoo partner working with
businesses in Australia and Europe. Built with [Astro](https://astro.build) as a static site and
deployed to GitHub Pages at **https://allsetpartners.com**.

Pages: Home, About, Contact, Privacy policy, Cookie policy, 404.

## Working on the site

Requires Node 22.12 or newer.

```bash
npm install
npm run dev       # local dev server at http://localhost:4321/
npm run build     # production build into dist/
npm run preview   # serve the production build locally
```

Every push to `main` builds and deploys automatically (`.github/workflows/deploy.yml`).

## Photos

Put photos in `src/assets/photos/` with these names (`.jpg`, `.jpeg`, `.png` or `.webp`).
Until a photo exists, its spot shows a labelled placeholder. Photos are resized and converted to
WebP automatically, so originals of around 2000 px wide are ideal.

| File | Where it appears | Shape |
| --- | --- | --- |
| `hero` | Full-width background of the home page header (a dark blue overlay keeps text readable) | Landscape |
| `people-1`, `people-2`, `people-3` | "Who we are" photo row on the home page | Portrait, 4:5 |
| `about` | Next to "Our story" on the About page | Landscape, 4:3 |
| `samuel` | Samuel's card on the About page | Portrait |
| `freek` | Freek's card on the About page | Portrait |

## Where things live

| What | Where |
| --- | --- |
| Business details (email, ABN, region, analytics) | `src/config/site.ts` |
| Founder names, roles and bios | `src/pages/about.astro` |
| Pages | `src/pages/` |
| Design tokens and shared styles | `src/styles/global.css` |
| Logo mark (placeholder) | `src/components/Logo.astro`, `public/favicon.svg` |
| Official Odoo logo and partner badge | `src/components/OdooLogo.astro`, `src/components/PartnerBadge.astro` |

## Email and contact form

The email address is shown as plain text until the mailbox exists. Once it works, turn it into a
`mailto:` link on the contact page. A cookie consent banner is already in place for when a contact
form or analytics are added.

## Cookies, analytics and policies

A consent banner (`src/components/CookieConsent.astro`) asks new visitors to accept or decline
analytics cookies, with equal-weight buttons as EU rules require. The site sets no cookies today.
To add Google Analytics, put the GA4 measurement ID in `analyticsId` in `src/config/site.ts`: it
only loads after a visitor accepts, and the policies list it automatically. Bump
`policiesUpdated` whenever the policies change.

## Domain setup (allsetpartners.com)

- `astro.config.mjs` sets `CUSTOM_DOMAIN = 'allsetpartners.com'`, and `public/CNAME` holds the
  domain.
- Cloudflare DNS: four `A` and four `AAAA` records on `@` pointing to GitHub Pages, and a `CNAME`
  for `www` → `samuellabenne.github.io`, all **DNS only** (grey cloud) so GitHub can issue and
  renew the HTTPS certificate.
- GitHub → repo **Settings → Pages**: custom domain `allsetpartners.com`, **Enforce HTTPS** on.
