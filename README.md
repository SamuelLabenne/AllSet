# All Set Consulting website

Marketing site for All Set Consulting, an Odoo implementation practice in Australia.
Built with [Astro](https://astro.build) as a static site and deployed to GitHub Pages.

- **Preview (staging):** https://samuellabenne.github.io/AllSet/
- **Pages:** Home, Services, About, Insights (blog), Contact, 404

## Working on the site

Requires Node 22.12 or newer.

```bash
npm install
npm run dev       # local dev server at http://localhost:4321/AllSet/
npm run build     # production build into dist/
npm run preview   # serve the production build locally
```

Every push to `main` builds and deploys automatically (`.github/workflows/deploy.yml`).

## Where things live

| What | Where |
| --- | --- |
| Business details (email, form endpoint, booking link, indexing) | `src/config/site.ts` |
| Pages | `src/pages/` |
| Blog posts (Insights) | `src/content/insights/*.md` |
| Home page sections and 3D effects | `src/components/home/` |
| Design tokens and shared styles | `src/styles/global.css` |
| Scroll engine for the 3D effects | `src/scripts/scroll.ts` |

## Writing an Insights post

Add a Markdown file to `src/content/insights/`. The file name becomes the URL
(`my-post.md` → `/insights/my-post/`).

```markdown
---
title: Your headline
description: One or two sentences shown on cards and in search results.
date: 2026-10-01
author: Samuel Labenne
category: Guide        # e.g. News, Guide, Odoo
cover: 2               # optional cover style 0–3 (blue, violet, teal, warm)
draft: false           # true hides the post
---

Post body in Markdown…
```

## Contact form

GitHub Pages only serves static files, so form submissions go to a form service.
Create a form at a provider such as [Formspree](https://formspree.io) and paste its
endpoint into `formEndpoint` in `src/config/site.ts`. Until then, the form opens the
visitor's email app with the message pre-filled.

## Launching on the custom domain

1. In `astro.config.mjs`, set `CUSTOM_DOMAIN` (for example `'allsetconsulting.com.au'`).
2. Add `public/CNAME` containing just the domain.
3. In `src/config/site.ts`, update `email` and set `indexable: true`.
4. Point the domain's DNS at GitHub Pages and add the domain under
   *Settings → Pages → Custom domain* (then tick *Enforce HTTPS*).
5. Push to `main`.
