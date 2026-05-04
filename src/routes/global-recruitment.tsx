import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, UserCheck, Rocket, Database, ArrowRight } from "lucide-react";
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

function RecruitmentPage() {
  return (
    <SiteLayout>
      <section className="bg-secondary/40 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-[oklch(0.55_0.18_252)]">Recruitment</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            A global recruitment system, with humans in every market.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Combine an applicant tracking system, sourcing tools and a global recruiter network — purpose-built for cross-border hiring.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, t, b }) => (
            <div key={t} className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[image:var(--gradient-hero)] text-primary-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-semibold text-foreground">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Built for cross-border teams.</h2>
              <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                {["Country-specific salary benchmarks","GDPR & local privacy compliance","Native ATS, scorecards and pipelines","Direct integration with payroll & EOR","Dedicated recruiter, never a chatbot"].map((x) => (
                  <li key={x} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-[oklch(0.55_0.18_252)]" />{x}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
              <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Live pipeline</p>
              <div className="mt-5 space-y-3">
                {[
                  { stage: "Sourced", n: 124 },
                  { stage: "Screened", n: 38 },
                  { stage: "Interviewing", n: 12 },
                  { stage: "Offer", n: 4 },
                ].map((row) => (
                  <div key={row.stage} className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3">
                    <span className="text-sm font-medium text-foreground">{row.stage}</span>
                    <span className="text-sm text-muted-foreground">{row.n}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[image:var(--gradient-hero)] p-12 text-center shadow-[var(--shadow-elegant)]">
          <h2 className="text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl">Hire with VisaHOBe Recruitment</h2>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-md bg-background px-6 py-3 text-sm font-semibold text-foreground hover:-translate-y-0.5 transition-transform">
            Talk to a recruiter <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}