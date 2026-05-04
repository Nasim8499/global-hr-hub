import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Globe2, ShieldCheck, Wallet, Users, Briefcase, Plane, CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { countries } from "@/data/countries";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VisaHOBe — Global HR, Payroll & Compliance, with Expert Support" },
      { name: "description", content: "Hire, pay and stay compliant in 100+ countries. Employer of record, payroll, contractors, visas and recruitment — backed by expert local support." },
      { property: "og:title", content: "VisaHOBe — Global HR, Payroll & Compliance" },
      { property: "og:description", content: "Hire, pay and stay compliant in 100+ countries with expert local support." },
    ],
  }),
  component: Index,
});

const valueProps = [
  { icon: Users, title: "Hire anywhere", body: "Onboard employees and contractors in 100+ countries without setting up a local entity." },
  { icon: Wallet, title: "Pay everyone", body: "Run multi-currency payroll with on-time, fully compliant payments in local currency." },
  { icon: ShieldCheck, title: "Stay compliant", body: "Local employment law, tax filings and statutory benefits handled by in-country experts." },
];

const solutions = [
  { icon: Globe2, title: "Employer of Record", body: "Engage full-time talent abroad while we serve as the legal employer." },
  { icon: Briefcase, title: "Global Payroll", body: "Consolidated payroll for entities and EOR employees in one platform." },
  { icon: Users, title: "Contractor Management", body: "Compliant contractor onboarding, contracts and payments in 150+ currencies." },
  { icon: Plane, title: "Visa & Immigration", body: "Sponsor work visas with end-to-end coordination by licensed immigration partners." },
  { icon: ShieldCheck, title: "HR Compliance", body: "Country-specific contracts, policies and statutory benefits, kept always up to date." },
  { icon: Briefcase, title: "Recruitment", body: "Source and screen vetted talent across global markets with our recruitment desk." },
];

const steps = [
  { n: "01", t: "Tell us who you want to hire", b: "Share the role, location and start date — we surface what's needed in that country." },
  { n: "02", t: "We draft the contract", b: "Locally compliant employment agreement, ready for review in days, not weeks." },
  { n: "03", t: "Onboard your new hire", b: "Background checks, equipment, benefits enrolment — all from one dashboard." },
  { n: "04", t: "We run payroll & compliance", b: "Monthly payroll, taxes, filings and statutory benefits handled end-to-end." },
];

const faqs = [
  { q: "What is an Employer of Record?", a: "An EOR is a third party that legally employs workers on your behalf in countries where you don't have an entity, while they continue to work for you day-to-day." },
  { q: "How quickly can we onboard a new hire?", a: "Most countries onboard in 3–10 business days once contracts are signed. Visa-sponsored hires take longer based on the destination." },
  { q: "Can VisaHOBe handle visas and work permits?", a: "Yes. Our immigration desk and licensed partners coordinate sponsorship, applications and renewals in supported jurisdictions." },
  { q: "Do you support contractors as well as employees?", a: "Yes. We compliantly engage and pay contractors in 150+ currencies with appropriate classification reviews." },
];

function Index() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[image:var(--gradient-hero)] opacity-[0.04]" />
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <span className="inline-flex items-center rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                Global HR · Payroll · Compliance
              </span>
              <h1 className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Hire, pay and stay compliant{" "}
                <span className="bg-[image:var(--gradient-hero)] bg-clip-text text-transparent">
                  anywhere in the world.
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-muted-foreground">
                VisaHOBe is the modern global employment platform — employer of record,
                payroll, contractors and visas — backed by real human experts in every market.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-md bg-[image:var(--gradient-hero)] px-5 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-elegant)] transition-opacity hover:opacity-90"
                >
                  Book a demo <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/global-recruitment"
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                >
                  Explore the platform
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[oklch(0.55_0.18_252)]" /> 100+ countries</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[oklch(0.55_0.18_252)]" /> Local legal experts</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[oklch(0.55_0.18_252)]" /> SOC 2 & GDPR aligned</div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 -z-10 rounded-3xl bg-[image:var(--gradient-hero)] opacity-10 blur-2xl" />
              <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-elegant)]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">Live coverage</p>
                    <p className="mt-1 text-2xl font-semibold text-foreground">8 priority markets</p>
                  </div>
                  <Globe2 className="h-10 w-10 text-[oklch(0.55_0.18_252)]" />
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {countries.map((c) => (
                    <Link
                      key={c.slug}
                      to="/countries/$slug"
                      params={{ slug: c.slug }}
                      className="group flex items-center gap-3 rounded-lg border border-border bg-background px-3 py-3 transition-colors hover:border-[oklch(0.55_0.18_252)] hover:bg-accent"
                    >
                      <span className="text-xl">{c.flag}</span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">{c.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{c.region}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-border bg-secondary/50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Trusted by global teams scaling across borders
          </p>
          <div className="mt-6 grid grid-cols-2 gap-6 text-center text-sm font-semibold text-muted-foreground sm:grid-cols-3 lg:grid-cols-6">
            {["Northwind", "Acme Labs", "Helios", "Lumen Co.", "Vertex", "Quanta"].map((b) => (
              <span key={b} className="opacity-70">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {valueProps.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Solutions */}
      <section className="bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-[oklch(0.55_0.18_252)]">Solutions</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              One platform for the entire global employment lifecycle.
            </h2>
            <p className="mt-4 text-muted-foreground">
              From the first hire abroad to running payroll for hundreds — VisaHOBe brings
              the tools and the experts together in one place.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {solutions.map(({ icon: Icon, title, body }) => (
              <div key={title} className="group rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-[var(--shadow-card)]">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[image:var(--gradient-hero)] text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-base font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[oklch(0.55_0.18_252)]">How it works</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              From offer letter to first paycheck in days.
            </h2>
            <p className="mt-4 text-muted-foreground">
              A simple, transparent process so you can focus on growing your team — not
              decoding local labour law.
            </p>
          </div>
          <div className="space-y-4">
            {steps.map((s) => (
              <div key={s.n} className="flex gap-5 rounded-2xl border border-border bg-card p-5">
                <div className="text-2xl font-semibold text-[oklch(0.55_0.18_252)]">{s.n}</div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">{s.t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Country grid */}
      <section className="bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-wider text-[oklch(0.55_0.18_252)]">Country coverage</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Local expertise in your priority markets.
              </h2>
            </div>
            <p className="text-sm text-muted-foreground">Tap a country to see hiring essentials.</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {countries.map((c) => (
              <Link
                key={c.slug}
                to="/countries/$slug"
                params={{ slug: c.slug }}
                className="group rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{c.flag}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">{c.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{c.region} · {c.currency}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-card p-10 shadow-[var(--shadow-card)]">
          <p className="text-2xl font-medium leading-snug text-foreground sm:text-3xl">
            “VisaHOBe took the guesswork out of opening hiring in three new countries.
            Contracts, payroll and visas — all coordinated by people who actually picked up
            the phone.”
          </p>
          <div className="mt-6 flex items-center gap-4">
            <div className="h-11 w-11 rounded-full bg-[image:var(--gradient-hero)]" />
            <div>
              <p className="text-sm font-semibold text-foreground">Priya Naidu</p>
              <p className="text-xs text-muted-foreground">Head of People · Helios Robotics</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Frequently asked questions
        </h2>
        <div className="mt-10 space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-xl border border-border bg-card p-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between text-base font-medium text-foreground">
                {f.q}
                <span className="ml-4 text-muted-foreground transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-[image:var(--gradient-hero)] p-12 text-center shadow-[var(--shadow-elegant)] sm:p-16">
          <h2 className="text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl">
            Ready to hire your next team member, anywhere?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/85">
            Talk to a global employment expert and see how fast you can be up and running.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-background px-6 py-3 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5"
          >
            Book a demo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
