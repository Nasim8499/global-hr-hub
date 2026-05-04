import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, UserCheck, Rocket, Database, ArrowRight, Sparkles, ShieldCheck, BarChart3, Users, Briefcase } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/global-recruitment")({
  head: () => ({
    meta: [
      { title: "Global Recruitment System — VisaHOBe" },
      { name: "description", content: "Source, screen and onboard vetted global talent in one platform — with local recruitment experts in every market." },
      { property: "og:title", content: "Global Recruitment System — VisaHOBe" },
      { property: "og:description", content: "Source, screen and onboard vetted global talent — with local recruiters in every market." },
    ],
  }),
  component: RecruitmentPage,
});

const steps = [
  { icon: Search, t: "Source", b: "Curated talent pools across 40+ countries with proactive headhunting." },
  { icon: UserCheck, t: "Screen", b: "Structured interviews, skills tests and reference checks built in." },
  { icon: Rocket, t: "Offer", b: "Locally compliant offers and contracts generated in minutes." },
  { icon: Database, t: "Onboard", b: "Background checks, equipment and benefits enrolment in one flow." },
];

const features = [
  { icon: Users, t: "Native ATS", b: "Pipelines, scorecards and structured interviews — no plug-ins required." },
  { icon: Sparkles, t: "AI sourcing", b: "Surface qualified candidates from global pools in seconds." },
  { icon: ShieldCheck, t: "Compliant by default", b: "GDPR, EEOC and country-specific rules baked in." },
  { icon: BarChart3, t: "Hiring analytics", b: "Time-to-hire, source quality and DEI dashboards out of the box." },
  { icon: Briefcase, t: "Salary benchmarks", b: "Real local benchmarks across 100+ markets." },
  { icon: Rocket, t: "Direct EOR handoff", b: "Move from offer to onboarded with one click." },
];

const integrations = ["Slack", "Greenhouse", "Workday", "BambooHR", "HiBob", "Okta", "Google Workspace", "Microsoft 365"];

function RecruitmentPage() {
  return (
    <SiteLayout>
      <section className="px-3 pt-3 sm:px-4 sm:pt-4">
        <div className="overflow-hidden rounded-[28px] sm:rounded-[36px] bg-[image:var(--gradient-hero)] shadow-[var(--shadow-elegant)]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
            <span className="inline-flex items-center rounded-full bg-white/85 px-3 py-1.5 text-xs font-semibold text-foreground shadow-[var(--shadow-soft)]">
              Recruitment
            </span>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
              A global recruitment system, with humans in every market.
            </h1>
            <p className="mt-5 max-w-2xl text-base text-foreground/80 sm:text-lg">
              Combine an applicant tracking system, sourcing tools and a global recruiter
              network — purpose-built for cross-border hiring.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-purple)] px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elegant)] hover:opacity-95">
                Talk to a recruiter <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            A workflow built for <span className="gradient-text">global hiring.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">From first source to first paycheck — in days, not months.</p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {steps.map(({ icon: Icon, t, b }) => (
            <div key={t} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] hover-lift">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[image:var(--gradient-purple)] text-primary-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-semibold text-foreground">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature grid (ATS) */}
      <section className="bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Built for cross-border teams.
              </h2>
              <p className="mt-4 text-muted-foreground">Every feature your in-house recruiter wishes they had.</p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {features.map(({ icon: Icon, t, b }) => (
                <div key={t} className="rounded-2xl border border-border bg-card p-5 hover-lift">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">{t}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Plays nicely with your stack
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm font-semibold text-muted-foreground">
          {integrations.map((i) => <span key={i} className="opacity-80">{i}</span>)}
        </div>
      </section>

      {/* CTA */}
      <section className="px-3 pb-12 sm:px-4 sm:pb-16">
        <div className="overflow-hidden rounded-[28px] sm:rounded-[36px] bg-[image:var(--gradient-hero)] shadow-[var(--shadow-elegant)]">
          <div className="mx-auto max-w-5xl px-6 py-16 text-center sm:py-20">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Hire with VisaHOBe Recruitment
            </h2>
            <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-purple)] px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elegant)] hover:opacity-95">
              Talk to a recruiter <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
