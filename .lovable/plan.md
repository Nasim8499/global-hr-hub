I’ll rebuild the VisaHOBe site to closely match the Playroll visual direction you shared: clean white layout, rounded pill navigation, purple/blue gradient hero blocks, large thin headings, smooth transitions, and responsive mobile/tablet layouts.

Scope of work:

1. [playroll theme same exaclty color also](https://www.playroll.com/)  and styling

- Update `src/styles.css` to a Playroll-like palette: white base, deep ink text, soft grey borders, purple/blue primary, pink/orange/purple hero gradient.
- Add reusable CSS utilities for smooth fade-up, soft hover lift, pill buttons, gradient text, and glass/blur cards.
- Tune typography to reduce “font drift”: larger desktop headings, tighter tracking, lighter weights, readable mobile sizes.
- Keep smooth transitions, but make them subtle and consistent across links, buttons, cards, menus, and images.

2. Header/navigation

- Rework `src/components/site/Header.tsx` to visually match the reference: centered max-width, wordmark at left, product-style dropdown nav, search-style icon area, outline secondary button, purple primary button.
- Improve the countries dropdown with a clean two-column floating panel.
- Replace the current mobile dropdown with a proper mobile sheet/menu style: full-width white panel, grouped links, countries list, clear CTA, and consistent spacing.
- Ensure mobile header remains compact and usable at 360–430px widths.

3. Homepage sections

- Rebuild `src/routes/index.tsx` to follow the Playroll page structure and spacing:
  - Large hero with badge, headline, paragraph, CTA, right-side employee/contract card mockup, and large gradient background panel.
  - Trusted logo/rating strip inside the hero bottom.
  - “One platform to hire, manage & pay global teams” section with pill tabs and a dashboard/product mockup.
  - CTA/workflow section: choose country/model, onboard/pay, scale confidently.
  - Country coverage/resources section using VisaHOBe’s countries.
  - Compliance/support section with feature cards and stats.
  - Team-stage cards and final CTA.
- Use VisaHOBe content, not Playroll text/logo, while matching the layout, color, and style closely.

4. Global Recruitment page

- Restyle `src/routes/global-recruitment.tsx` to match the new visual system:
  - Playroll-like hero.
  - Overview section.
  - Workflow cards.
  - ATS-style feature grid.
  - Integrations strip.
  - CTA with purple gradient and rounded card styling.
- Keep the page responsive with two-column mobile/tablet grids where appropriate.

5. Contact page

- Restyle `src/routes/contact.tsx` with the same theme: large rounded panels, soft gradient sidebar, cleaner inputs, required fields, and submit confirmation toast.
- Ensure select/message required fields are correctly marked if the UI says they are required.
- Keep it static UI only; no backend submission.

6. Country pages

- Restyle `src/routes/countries/$slug.tsx` shared template to match the new design:
  - Gradient country hero.
  - Quick facts in responsive cards.
  - Employment, leave, tax, and visa sections with consistent rounded cards.
  - Other-market grid and final CTA.
- Keep all existing country-specific content for Singapore, Australia, Moldova, Serbia, Saudi Arabia, UAE, Kuwait, and Malaysia.
- Ensure country card grids render as 2 columns on small mobile/tablet where space allows and don’t overflow.

7. Footer

- Update `src/components/site/Footer.tsx` to match the new design: clean white/soft grey footer, wordmark, grouped links, countries, contact details, and subtle borders.

8. Responsive verification and fixes

- After implementation, verify layouts at common breakpoints:
  - Mobile: 375px / 390px / 430px
  - Tablet: 768px / 1024px
  - Desktop: 1280px / 1440px
- Fix visible spacing/font drift, overflow, wrapping, grid issues, and CTA alignment problems.

Technical notes:

- I’ll keep the TanStack Start route structure intact.
- I won’t copy Playroll branding, logos, or proprietary images directly; I’ll recreate the visual style with VisaHOBe branding and CSS-built dashboard/card illustrations.
- I’ll avoid editing `src/routeTree.gen.ts` because it is auto-generated.
- No database or backend changes are needed.