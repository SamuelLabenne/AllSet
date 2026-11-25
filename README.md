# All Set Partners website

Website for All Set Partners (ASP), an Odoo consultancy and official Odoo partner working with
businesses in Australia and Europe. Built with [Astro](https://astro.build) as a static site and
deployed to GitHub Pages. It's currently in review at
**https://samuellabenne.github.io/AllSet/** and will move to **https://allsetpartners.com** at launch.

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
| `about` | Next to "Our story" on the About page | Landscape, 4:3 |
| `samuel` | Samuel's card on the home and About pages | Portrait |
| `freek` | Freek's card on the home and About pages | Portrait |

## Where things live

| What | Where |
| --- | --- |
| Business details (emails, ABN, region, analytics, indexing) | `src/config/site.ts` |
| Founder names, roles, bios and emails | `src/data/team.ts` |
| Pages | `src/pages/` |
| Design tokens and shared styles | `src/styles/global.css` |
| Logo mark (placeholder) | `src/components/Logo.astro`, `public/favicon.svg` |
| Official Odoo logo and partner badge | `src/components/OdooLogo.astro`, `src/components/PartnerBadge.astro` |

## Email and contact form

`sam@` and `freek@allsetpartners.com` are Cloudflare Email Routing addresses that forward to the
founders' inboxes. They're shown as plain text until `emailsLive: true` is set in
`src/config/site.ts`.

The contact form posts to a Cloudflare Worker in `worker/` (`asp-contact`), which checks
Cloudflare Turnstile and emails each enquiry to both founders with Reply-To set to the visitor.

- Deploy: `cd worker && npx wrangler deploy`
- Private settings (Worker secrets, never committed): `RECIPIENTS` (comma-separated, each must be a
  verified Email Routing destination address) and `TURNSTILE_SECRET`. Set with
  `npx wrangler secret put <NAME>`. Without `TURNSTILE_SECRET` the Worker refuses all submissions.
- Allowed sites are in `ALLOWED_ORIGINS` in `worker/wrangler.jsonc`.
- Local testing: create `worker/.dev.vars` with test values (Cloudflare's always-pass Turnstile test
  keys), run `npx wrangler dev`, and build the site with `PUBLIC_FORM_ENDPOINT=http://127.0.0.1:8787`
  and `PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA`.

## Cookies, analytics and policies

A consent banner (`src/components/CookieConsent.astro`) asks new visitors to accept or decline
analytics cookies, with equal-weight buttons as EU rules require. The site sets no cookies today.
To add Google Analytics, put the GA4 measurement ID in `analyticsId` in `src/config/site.ts`: it
only loads after a visitor accepts, and the policies list it automatically. Bump
`policiesUpdated` whenever the policies change.

## Going live on allsetpartners.com

1. In `astro.config.mjs`, set `CUSTOM_DOMAIN = 'allsetpartners.com'` and add `public/CNAME`
   containing `allsetpartners.com`.
2. In `src/config/site.ts`, set `indexable: true`.
3. Push to `main`, then set the custom domain and **Enforce HTTPS** as below.

Domain setup:
- Cloudflare DNS: four `A` and four `AAAA` records on `@` pointing to GitHub Pages, and a `CNAME`
  for `www` → `samuellabenne.github.io`, all **DNS only** (grey cloud) so GitHub can issue and
  renew the HTTPS certificate.
- GitHub → repo **Settings → Pages**: custom domain `allsetpartners.com`, **Enforce HTTPS** on.
