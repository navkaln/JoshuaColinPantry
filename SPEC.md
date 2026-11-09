# Griswold Hall Website: MVP Build Spec

Build instructions for coding agents. The goal is a private MVP that the Griswold Hall board can review. It is not a public launch.

## 1. Ground rules

- **Only build what is specified here.** If a detail is not in this file, do not invent it. Use a placeholder (Section 3).
- **Source of truth for facts:** Section 4. Never state anything about the building that is not listed there.
- **Tone:** a neighbor's invitation to a community, never a sales brochure. No sale prices, listings, investment language, or superlatives such as "luxury" or "most desirable."
- **Privacy:** no resident names, unit numbers, photos of identifiable residents, co-op financials, or meeting minutes anywhere on the site.
- **Private review only:** the MVP must not be indexed by search engines or open to the public (Phase 0).

## 2. Decisions already made

| Topic | Decision |
| --- | --- |
| Site type | Static site built by agents |
| CMS | Sanity, for editable content such as text, schedules, and later the blog |
| Domain | griswoldhall.com is the chosen primary, but it is not registered yet. The MVP does not use it. |
| Contact form | Will send to a new email address on griswoldhall.com. The address name is undecided. |
| Photography | Residents and committee volunteers will shoot it later, with board approval. Stock photos stand in until then. |
| Approvals | One board liaison approves public content (not yet named) |
| Design direction | Restrained Art Deco-inspired type and accents, palette from the building facade and garden greenery, photography-forward with generous white space |
| Quality targets | Mobile-first and responsive, optimized images with alt text, WCAG 2.1 AA |

## 3. Placeholder policy

Where the real detail is not known, use placeholders, and make every one easy to find and replace.

- **Photos:** royalty-free stock photos (for example Unsplash or Pexels). Check and record each license, credit where required, and never use photos of identifiable people. Name each slot after the real shot it will become: `lobby`, `facade`, `gardens`, `dog-run`, `playroom`.
- **Text:** Latin lorem ipsum for any copy that depends on unknown details. Never write plausible-sounding but invented facts.
- **Marking:** every placeholder photo and block of Latin text carries a `data-placeholder` attribute. In the private preview, show a small visible "Placeholder" tag on each. A single build flag hides the tags.
- **Inventory:** keep `PLACEHOLDERS.md` listing every placeholder, the page it is on, and what will replace it.

## 4. Known facts

Use these exactly as written.

- Name: Griswold Hall, a cooperative apartment building.
- Address: 86-10 34th Avenue, Jackson Heights, Queens, NY 11372, at the corner of 86th Street and 34th Avenue.
- Built in 1937. Six-story elevator prewar building in an Art Deco style.
- 84 residential units.
- Amenities confirmed from public listings: live-in super, full-time porter, children's playroom, landscaped rear garden, dog run.
- Located near the English Garden Homes.
- Jackson Heights has a Historic District, designated October 19, 1993. The Historic Districts Council describes Jackson Heights as the first and largest garden-apartment community in the United States.

**Draft-only content (not confirmed by the board).** Agents may write draft copy for these, but it must stay behind a build flag called `SHOW_UNVERIFIED`, default off, and must show a "Draft: pending board confirmation" label when on.

- Whether Griswold Hall itself falls inside the Jackson Heights Historic District. Public sources disagree.
- Solar panels: a public lead suggests a 140-panel system installed in 2021 alongside a roof project, but the source does not name the building.

**Not yet approved for publishing:** dog run rules and hours. The dog run itself may be featured.

## 5. Phases

### Phase 0: Project setup and private preview

- Create the repository with a mainstream static site framework. Document the choice and how to run, build, and deploy.
- Deploy to a private preview URL protected by a password or equivalent access control.
- Add `noindex` meta tags and a `robots.txt` that blocks all crawlers. Do not deploy to griswoldhall.com.
- Add the placeholder tooling from Section 3 and the `SHOW_UNVERIFIED` flag from Section 4.
- Skip analytics for the MVP.

**Done when:** the preview loads only behind the access control, search engines are told not to index it, and the placeholder and unverified flags work.

### Phase 1: Design foundation

- Define design tokens for colors, type scale, spacing, and radius. Use a restrained Art Deco-inspired look with a palette drawn from the facade and garden greenery. Choose and document the typefaces.
- Build the shared layout: header navigation, footer with the address, and reusable page components.
- Mobile-first, responsive, with a 16px minimum side gutter at phone width and no horizontal scroll.
- Meet WCAG 2.1 AA: color contrast, keyboard navigation, visible focus, and semantic headings.

**Done when:** a sample page renders correctly at phone, tablet, and desktop widths and passes an automated accessibility check.

### Phase 2: Core pages

Build only these four pages. Anything not listed is placeholder content.

**Home**
- Hero photo (placeholder: `facade`).
- One short paragraph about the building and community. Use only facts from Section 4 plus Latin text.
- Links to The Building, Amenities, and Contact.

**The Building**
- Short history and Art Deco character using Section 4 facts.
- Fact sheet: address, year built, six stories, elevator prewar, 84 units.
- Photo slots: `facade`, `lobby`.
- Historic District section: show only the district facts from Section 4. Any statement about the building's own status stays behind `SHOW_UNVERIFIED`.

**Amenities**
- Cards for: live-in super and porter, children's playroom, landscaped rear garden, dog run.
- Photo slots: `gardens`, `dog-run`, `playroom`.
- Dog run: feature it, with no rules or hours.
- Do not include laundry, bike storage, or garden access rules. They are unconfirmed.

**Contact**
- Form with name, email, and message, plus spam protection.
- The form is not live. Wire it to a stub handler that logs submissions locally and sends nothing. The real recipient address is undecided.
- Show the building address and a simple map or map link.
- Do not publish any email address on the page.

**Done when:** all four pages are built, linked from the navigation, fully responsive, and every placeholder is tagged and listed in `PLACEHOLDERS.md`.

### Phase 3: Content management

- Add Sanity so the board liaison or committee can edit page text and replace images without code.
- Keep the editor simple: expose only fields the pages actually use.
- Write a one-page editing guide in `EDITING.md` for non-technical users.
- Hosting and Sanity accounts are not yet created. Document what is needed instead of creating accounts.

**Done when:** a non-technical editor can change a page's text and swap a photo using the guide alone.

### Phase 4: Review readiness and QA

- Placeholder audit: every placeholder is tagged and listed, and nothing invented reads as fact.
- Privacy audit: no names, unit numbers, finances, minutes, or visible email addresses.
- Tone audit: could any sentence appear in a real estate listing? If so, rewrite it.
- Accessibility, performance, and broken-link checks across the four pages.
- Write a short `REVIEW.md` for the board: what is real, what is placeholder, and what decisions are still open.

**Done when:** the QA checks pass and `REVIEW.md` is ready for the board liaison.

## 6. Out of scope for the MVP

These are intentionally not specified yet. Do not build them.

- Internet and TV
- Sustainability and solar
- Neighborhood guide
- Gallery
- Public resident information
- Neighborhood blog
- Who thrives here
- Buying Here (under review by the project lead)
- Floor plans (on hold until the board decides)
- Public launch, the griswoldhall.com domain, live email, and analytics

## 7. Open decisions that affect later work

- Name the board liaison who approves content.
- Landmark status and solar details need board confirmation.
- Dog run rules and hours need board approval.
- Contact address name and who controls it.
- Hosting provider and account ownership.
- Whether the Buying Here page stays.
