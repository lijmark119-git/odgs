# ORBITAL DIGITAL SOLUTION

A bilingual, responsive company website built with React, TypeScript, Vite, Tailwind CSS, React Router, and Lucide icons.

## Run locally on Windows

Install Node.js LTS, open PowerShell in this folder, and run:

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

## Production build

```powershell
npm run build
npm run preview
```

The production files are written to `dist`.

Run `npm run` to see the available scripts. There is currently no automated test script; the production build runs the configured TypeScript project checks before bundling.

## Project structure

```text
src/
  App.tsx           Routes, page layouts, and page metadata
  components.tsx    Shared navigation, cards, form, and UI components
  data.ts           Navigation and service icon/route data
  siteConfig.ts     Editable company contact details and public endpoint/domain config
  main.tsx          React entry point
  styles.css        Responsive visual system and page styles
  translations.ts   English and Amharic website content
index.html          SEO defaults and browser entry point
vite.config.ts      Vite, React, and Tailwind CSS configuration
public/             Favicon, robots.txt, and sitemap.xml
```

## Production and domain setup

The planned canonical hostname is `orbitaldigitalsolution.com` (apex/non-www). It is a configuration target only; this project does not register or verify domain ownership. Do not publish until the company confirms it controls the domain. `www` should redirect permanently to the apex hostname.

- Set `VITE_SITE_URL=https://orbitaldigitalsolution.com` in the hosting provider's production environment. This is a public URL, not a secret. The current `.env.example`, canonical defaults, sitemap, and robots file use this planned hostname.
- Update the same origin in `public/robots.txt` and `public/sitemap.xml` if the final domain differs. Submit the production sitemap in Google Search Console after deployment.
- Add approved phone, WhatsApp, business email, office address, and social URLs to `src/siteConfig.ts`. Empty values intentionally show editable placeholders.
- `VITE_CONTACT_API_URL` must be a public HTTPS endpoint only. The client reports success only after a successful JSON response with `{ "received": true }`; it stays unconfigured and honest by default. Never put email-provider keys, database credentials, or other secrets in `VITE_*` variables.
- The planned contact backend is Django REST Framework + PostgreSQL: validate and normalize all fields server-side; reject oversized/invalid payloads; rate-limit by IP and address; add server-side honeypot and/or CAPTCHA; set exact allowed frontend origins; protect state-changing requests against CSRF where cookie authentication is used; send notifications from a background task if practical; and keep SMTP/API credentials in server-side environment variables. Return `{ "received": true }` only once the inquiry has been durably accepted. Log request IDs, not message contents or credentials.
- Configure the host's SPA fallback, HTTPS certificate, apex as the primary domain, and permanent `www` → apex redirect. `public/_headers` contains static-host security headers; review the CSP `connect-src` against the real API origin before launch. The matching Vercel configuration is in `vercel.json`.
- No backend, email service, CAPTCHA, domain registration, hosting account, or live DNS is included or configured here. Do not treat the browser honeypot as sufficient production spam protection.

## GitHub preparation

`.gitignore` excludes dependencies, generated builds, local environment files, deployment state, and common operating-system files. `.env.example` is safe to commit; never commit `.env.local` or credentials. This folder has not been initialized as a Git repository, and no repository has been published.

Suggested initial commit sequence:

1. `chore: prepare production deployment configuration`
2. `docs: document domain, hosting, and contact backend setup`

Review `git status` and scan staged files for secrets before creating either commit. No commit or push was made.

## Hosting comparison (estimates, USD)

Prices and quotas change; verify them at purchase time. Static frontend estimates exclude the domain, optional paid features, tax, email, and the Django/PostgreSQL backend.

| Option | Static frontend estimate | Custom domain / HTTPS | Django + PostgreSQL |
|---|---:|---|---|
| Vercel | Hobby $0; Pro about $20/month | Supported; TLS automatic | Best for frontend; host Django and PostgreSQL separately |
| Netlify | Free $0; Personal about $9/month; Pro about $20/month | Supported; SSL included | Static frontend works well; host Django and PostgreSQL separately |
| Cloudflare Pages | $0 for a static Pages site within plan limits | Supported; TLS via Cloudflare | Pages is not a conventional Django/PostgreSQL host; use a separate API/database provider |
| VPS | Roughly $5–$25/month for a small instance, plus backups/monitoring | Configure DNS, reverse proxy, and TLS | Can run Django and PostgreSQL; requires ongoing server, security, and backup administration |

These are indicative estimates, not quotes. Vercel's official plans list Hobby at $0 and Pro at $20/month; Netlify currently lists Free at $0, Personal at $9/month, and Pro at $20/month; Hetzner Cloud currently lists entry plans from €5.99/month before VAT. A managed database or managed Django service is an extra recurring cost.

**Practical startup choice:** deploy this lightweight static frontend to Cloudflare Pages (or Netlify if its workflow is more familiar), and host the Django REST API plus PostgreSQL separately in a reputable managed service. For lower initial cost, one small VPS can run both backend and database, but it transfers patching, monitoring, restore testing, and database security to the team. Keep PostgreSQL private; only expose the HTTPS API. Compare provider payment availability, latency, support, and data-location requirements before selecting a backend region.

Pricing sources: [Vercel](https://vercel.com/pricing), [Netlify](https://www.netlify.com/pricing/), [Cloudflare Pages](https://www.cloudflare.com/products/pages/), [Hetzner Cloud](https://www.hetzner.com/cloud/).

## Domain, DNS, and deployment steps

1. Confirm domain availability and register `orbitaldigitalsolution.com` through a registrar of your choice. No purchase has been made.
2. Create a GitHub repository yourself (or authorize publication separately). Push only after reviewing the `.gitignore`, staged diff, and secret scan.
3. Connect the repository to Cloudflare Pages, Netlify, or Vercel. Use `npm run build` and `dist` as the output directory. Set `VITE_SITE_URL=https://orbitaldigitalsolution.com` as a production build variable. No build-time API endpoint is required until the Django API exists.
4. Add both apex and `www` hostnames in the chosen host's domain settings. Add the exact DNS records supplied by that host at the registrar/DNS provider; avoid copying generic records from another platform. Set apex as primary and configure permanent `www` → apex redirection.
5. Wait for DNS validation and the host-managed HTTPS certificate. Test both hostnames, direct nested routes (for example `/services/web-development`), `robots.txt`, and `sitemap.xml`. Ensure the final response includes the configured security headers and the `www` redirect.
6. Configure a Django REST API on a separate HTTPS origin, a private PostgreSQL database, backups, exact CORS origins, server-side validation/rate limits/spam controls, and server-only email credentials. Configure `VITE_CONTACT_API_URL` to that public API URL only after it accepts the documented contract. Verify a response with `{ "received": true }` before the website shows success.
7. Add the confirmed business contact information to `src/siteConfig.ts`, then rebuild and redeploy. Verify contact delivery end-to-end before advertising the form.

DNS changes and TLS issuance can take time to propagate. No external account, deployment, domain purchase, commit, or publication was performed.

## SEO and assets
- Confirm ORBITAL POS availability and feature status before changing its in-development disclosures.
- Replace the clearly labeled portfolio placeholder with approved project work when available.
- Add an official logo asset when available; the current orbital mark is a replaceable icon-and-text treatment.
- Configure the production host to serve `index.html` for the application routes (SPA fallback), serve the `public` assets, and use HTTPS. Configure DNS records for the selected domain at the domain registrar/hosting provider.
- Rebuild after setting deployment environment values with `npm run build`, then deploy the contents of `dist`.

## SEO and hosting notes

Page titles, descriptions, canonical URLs, Open Graph/Twitter metadata, and organization structured data are updated for each client-side route. The planned canonical origin defaults to `https://orbitaldigitalsolution.com`; verify ownership and the final hostname before indexing. The interface uses original CSS illustrations and locally stored, optimized Unsplash technology photography in `public/images`; visitors do not need a third-party image request for these visuals.

No client projects, testimonials, customer identities, contact details, social URLs, or launched-product claims have been invented.
