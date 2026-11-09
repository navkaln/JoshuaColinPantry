# Board review notes: Griswold Hall website preview

This is a private draft. It is not public and search engines are told to ignore it. Yellow "Placeholder" tags mark anything that is not final.

## What is real
- Name, address, corner of 86th Street and 34th Avenue.
- Built in 1937; six-story elevator prewar building in an Art Deco style; 84 residential units; cooperative apartment building.
- Amenities named in public listings: live-in super, full-time porter, children's playroom, landscaped rear garden, dog run.
- Located near the English Garden Homes.
- Jackson Heights Historic District designated October 19, 1993; the Historic Districts Council's description of Jackson Heights as the first and largest garden-apartment community in the United States.

## What is placeholder
- **All photos** are stock images of other places. The facade placeholder shows a real hotel in Miami with its sign visible. See `PLACEHOLDERS.md`.
- **All paragraphs in Latin** stand in for text the board has not provided.
- **The contact form does nothing.** Nothing is sent or stored on the live preview.
- **The map** is a link, not an embedded map.

## Hidden on purpose (not confirmed)
- Whether Griswold Hall is inside the Historic District (public sources disagree).
- The 2021 solar panel lead (the source does not name the building).
- Dog run rules and hours. The dog run itself is featured.
Draft wording exists for the first two and can be shown by the `SHOW_UNVERIFIED` build flag, always labeled "Draft: pending board confirmation".

## Open decisions
1. Name the board liaison who approves content.
2. Confirm landmark status and solar details.
3. Approve dog run rules and hours (or leave them off).
4. Choose the contact address name on griswoldhall.com and who controls it.
5. Choose the hosting provider and who owns the accounts (needed for the password-protected preview and for Sanity).
6. Decide whether a "Buying Here" page stays (not built).
7. Photography: who shoots, and board approval of images.

## QA results (run `npm run qa`)
- Automated accessibility check (axe, WCAG 2.1 AA rules): no violations on all four pages at phone, tablet, and desktop widths.
- No horizontal scroll at 375, 768, and 1280 px; side gutter at least 16 px.
- Every page has one h1, a skip link, visible keyboard focus, `noindex` meta, and `robots.txt` blocking all crawlers.
- Every image has alt text; images are resized and served as WebP.
- No email addresses, unit numbers, prices, or listing language found in page HTML.
- Internal links resolve.

Manual audits done by reading all copy: **Tone** (no sentence reads like a listing; no superlatives) and **Privacy** (no names, units, finances, or minutes). A human should still read each page once on a phone.

## Not done / needs accounts
- The preview is **not deployed**: it needs a hosting account with access control (`README.md`).
- Sanity Studio code is written but has not been run against a real project.
- Colors and type were chosen from the brief's description (facade cream, garden green, brass accent), not from real facade photos. The board may want to adjust them once real photography exists.
