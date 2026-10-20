# Branding with Anna

Anna Chernoshtan's website for personal branding, women-owned business branding, coaching and discovery calls. The approved design and copy are retained.

## Repository

Canonical repository: https://github.com/brandingwithanna/website. Use `main` for all website changes. Push completed, validated changes to `origin/main`.

## Technology and build

Plain HTML, CSS and JavaScript; no framework or dependencies. Run `npm ci`, then `npm run build` from this repository's root. The build validates page metadata, local links, JavaScript syntax and asset size limits, then copies the website into `public/`. No environment variables are needed.

## Vercel deployment

Connect this GitHub repository to Vercel and use `main` as the production branch. The static-site preset is **Other**, with the repository root as the project root. The `vercel-build` script produces `public/`, Vercel's default static output directory. No Vercel configuration file is needed.

After that initial connection, successful pushes to `main` trigger automatic production deployments. Saving a local file alone does not deploy it. Deployment timing depends on Vercel's build queue and build result.

## Changes

Edit the root source files, run `npm run build`, review at 390px and 1440px, then commit and push directly to `main`. Do not edit generated files in `public/`. Keep photos under 1 MB, videos under 10 MB, and every file under 50 MB. Never commit secrets or private documents.

## Integrations

Discovery calls use the public Calendly URL in `config.js`. The booking widget loads only after the visitor chooses a time. Event duration and availability are managed in Calendly. No booking data is stored here. The six module purchase links (€20 each) and complete-course link (bundle €80) open Payhip. Payhip handles checkout and delivery of the purchased PDFs. No time-limited promotion is advertised. Paid course PDFs must not be added to this public repository.

## Assets

Anna supplied the photographs, compressed as WebP for the website. Photography displays in monochrome through CSS. Advercase Regular is used for headings, Crimson Text for body copy, and burgundy #3e0000 throughout. Crimson Text's license is in `fonts/OFL.txt`. Original brand logo assets are retained for the experience section.


## Audit update — 19 October 2026

Responsive portrait variants and WOFF2 body fonts reduce downloads. Course names match Payhip. Prices are explicitly before applicable VAT/sales tax, per Anna’s choice to retain tax-exclusive checkout. No offer expiry is implied. Share metadata uses the production Vercel URL; update it if the canonical domain changes.

Contact details and privacy/course terms pages added on 20 October 2026. Still awaiting owner confirmation: business correspondence address and any required registration details for complete seller disclosures, Advercase webfont licence, and permission for the security-header configuration file. Tax-exclusive checkout was retained at Anna’s request; this is not a certification of consumer pricing compliance.
