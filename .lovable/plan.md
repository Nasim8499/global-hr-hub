# VisaHOBe — Global HR, Payroll & Compliance Site

A multi-page marketing website for **VisaHOBe Pte. Ltd.** following the structure and section patterns common to global EOR/payroll platforms, with original copy, a corporate blue palette, and a text wordmark logo.

## Brand

- **Name / wordmark**: VisaHOBe Pte. Ltd.
- **Tagline**: "Global HR, Payroll & Compliance, with Expert Support"
- **Palette**: Deep navy/blue primary, white surfaces, soft gray sections, single accent (bright blue) for CTAs
- **Type**: Clean modern sans-serif (Inter), large hero headings, generous spacing
- **Logo**: Text wordmark — easy to swap for an uploaded logo later

## Pages (12 total)

Top nav: Home · Solutions · Countries (dropdown) · Legal · Contact

| Route | Page |
|---|---|
| `/` | Home |
| `/contact` | Contact |
| `/global-recruitment` | Global Recruitment System |
| `/legal` | Legal / Lawyer services |
| `/countries/singapore` | Singapore |
| `/countries/australia` | Australia |
| `/countries/moldova` | Moldova |
| `/countries/serbia` | Serbia |
| `/countries/saudi-arabia` | Saudi Arabia |
| `/countries/uae` | UAE |
| `/countries/kuwait` | Kuwait |
| `/countries/malaysia` | Malaysia |

## Page structures

**Home** — Hero (headline, subhead, two CTAs, hero illustration/world-map graphic) → trust strip ("trusted by teams in 100+ countries") → 3-column value props (Hire, Pay, Stay Compliant) → Solutions grid (EOR, Payroll, Contractors, Visa & Immigration, Recruitment) → "How it works" 4-step → Country coverage map with links to the 8 country pages → Testimonials → FAQ → CTA band → Footer.

**Country pages** (shared template, content varies per country) — Country hero (flag accent, country name, one-line value prop) → Quick facts card (currency, working hours, official languages, payroll cycle) → Employment essentials (contracts, probation, notice, termination) → Leave & benefits (annual, sick, parental, public holidays) → Tax & social contributions overview → Visa & work permit notes → "Hire in {country} with VisaHOBe" CTA → Footer. All facts written as general informational summaries, clearly marked "informational only — not legal advice."

**Global Recruitment System** — Overview, sourcing/screening/onboarding workflow, ATS-style feature grid, integrations strip, CTA.

**Legal** — Corporate/immigration/employment law service cards, jurisdictions covered, "request a consultation" CTA.

**Contact** — Headline, two-column layout: contact form (name, work email, company, country, message — non-functional, shows a thank-you toast on submit) + company info card (placeholder email, phone, Singapore office address). Map placeholder image.

**Shared**: Sticky header with nav + "Book a demo" button; rich footer with sitemap, country list, legal links, copyright.

## Design notes

- Consistent section rhythm (large vertical padding, max-w container)
- Reusable components: `SectionHeading`, `FeatureCard`, `CountryCard`, `Stat`, `FAQItem`, `CTABand`, `Header`, `Footer`, `CountryPageTemplate`
- Subtle blue gradient backgrounds on hero/CTA bands; cards with soft shadow and rounded corners
- Mobile-first responsive; nav collapses to a sheet menu on mobile
- Each route has unique `head()` metadata (title, description, og tags) for SEO

## Out of scope (this iteration)

- Working backend / form submission storage
- Authentication, dashboards, customer portal
- Real legal/tax data verification per country (copy is general informational)
- Custom logo upload (text wordmark used; can swap later)

## Technical notes

- TanStack Start file-based routing under `src/routes/` — one file per page; country pages under `src/routes/countries/`
- Tailwind v4 design tokens updated in `src/styles.css` for the blue palette
- Country data in a single `src/data/countries.ts` module consumed by both the home country grid and individual country pages, so adding/editing countries is one place
- Replaces the placeholder `src/routes/index.tsx`
