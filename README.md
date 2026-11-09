# Griswold Hall website (private MVP)

Static site for the Griswold Hall board to review. **Not public, not indexed, not on griswoldhall.com.** Build rules are in `SPEC.md`. What matters most:

- Facts come only from `src/data/defaults.ts` (`FACTS`, real copy). Everything else is Latin placeholder.
- No resident names, unit numbers, finances, minutes, or published email addresses.
- No analytics.

## Stack choice

**Astro 7** (static output). It is a mainstream static-site framework, ships no JavaScript by default (good for mobile and accessibility), has built-in image optimization, and works well with Sanity. Fonts are self-hosted via Fontsource (no third-party requests): Josefin Sans (Deco-flavored geometric display) and Source Serif 4 (body).

## Run, build, test

```bash
npm install
npm run dev        # http://localhost:4321  (contact form stub logs to .contact-submissions.log)
npm run build      # outputs dist/
npm run preview    # serves dist/ (also runs the contact stub)
npm run qa         # build first. axe WCAG 2.1 AA at phone/tablet/desktop, scroll, links, privacy, placeholder checks
```
`npm run qa` uses Playwright. If its browser is missing, set `CHROMIUM_PATH` to a Chrome/Chromium binary.

## Build flags (environment variables, see `.env.example`)

| Flag | Default | Effect |
| --- | --- | --- |
| `SHOW_PLACEHOLDER_TAGS` | `true` | Shows a small "Placeholder" tag on every placeholder photo and Latin block, plus a "private preview" banner. `false` hides both. `data-placeholder` attributes always stay in the HTML. |
| `SHOW_UNVERIFIED` | `false` | Shows draft copy (landmark status, solar) with a "Draft: pending board confirmation" label. |

## Private preview deployment (needs a decision and an account)

No hosting account exists yet, so nothing is deployed. Requirements: password or equivalent access control in front of the whole site. Options, any of which works with `dist/`:

1. **Cloudflare Pages + Cloudflare Access** (free tier covers a small allow-list of board emails; no shared password). Build command `npm run build`, output `dist`.
2. **Netlify** with Password Protection (a paid feature) or Netlify Identity/SSO.
3. **Vercel** with Deployment Protection (password protection is a paid add-on).

Whatever is chosen: keep `public/robots.txt` (blocks all crawlers) and the `noindex` meta tag, and confirm `public/_headers` (`X-Robots-Tag`) is honored on that host (Cloudflare and Netlify read it; for Vercel mirror it in `vercel.json`). Set `SANITY_PROJECT_ID` in the host's build environment once Sanity exists. Do not attach griswoldhall.com.

## Contact form

Posts to `/api/contact`. In `dev` and `preview` a stub (`scripts/contact-stub-integration.mjs`) logs submissions locally and sends nothing; spam protection is a hidden honeypot field plus a minimum fill time. On a deployed static host there is no handler, and the page tells the visitor the form is not live. Wiring a real recipient is an open decision (`REVIEW.md`).

## Sanity

`studio/` is a separate Sanity Studio project; the site reads it at build time when `SANITY_PROJECT_ID` is set, and otherwise uses the built-in defaults. Setup needs accounts that do not exist yet:

1. Create a Sanity account and project (dataset `production`); note the project ID.
2. `cd studio && npm install && SANITY_STUDIO_PROJECT_ID=<id> npm run dev` to try it; `npm run deploy` hosts the Studio.
3. Add `SANITY_PROJECT_ID` (and optionally `SANITY_DATASET`) to the site host's build environment, and add a deploy hook so publishing in Sanity triggers a rebuild.
4. Add the editors as Sanity project members (the board liaison, once named).

The Studio code has not been run against a live project in this repo. Test it once the project exists. See `EDITING.md` for the editor guide.

## Layout

`src/pages` four pages · `src/components` Photo, Txt (placeholder text), Draft, Header, Footer · `src/data/defaults.ts` all default copy and facts · `src/lib/content.ts` Sanity + defaults merge · `src/styles/global.css` design tokens · `src/assets/placeholders` stock photos named by slot.
