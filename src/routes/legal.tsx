import { createFileRoute, Link } from "@tanstack/react-router";
import { Scale, FileText, Globe2, ShieldCheck, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/legal")({
  head: () => ({
    meta: [
      { title: "Legal Services — VisaHOBe" },
      { name: "description", content: "Corporate, employment and immigration law support across our covered jurisdictions." },
      { property: "og:title", content: "Legal Services — VisaHOBe" },
      { property: "og:description", content: "Corporate, employment and immigration law support across covered jurisdictions." },
    ],
  }),
  component: LegalPage,
});

const services = [
  { icon: Scale, t: "Employment Law", b: "Drafting and review of contracts, policies and termination procedures aligned to local statutes." },
  { icon: Globe2, t: "Immigration", b: "Work visas, residence permits and dependant filings coordinated by licensed partners." },
  { icon: FileText, t: "Corporate Setup", b: "Entity formation, registered office and ongoing corporate secretarial support." },
  { icon: ShieldCheck, t: "Compliance Advisory", b: "Audits, risk reviews and remediation across labour, tax and data protection laws." },
];

function LegalPage() {
  return (
    <SiteLayout>
      <section className="bg-secondary/40 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-[oklch(0.55_0.18_252)]">Legal services</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Local lawyers, global coverage.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Our network of in-country counsel supports VisaHOBe clients across employment, immigration and corporate matters — informational only, not legal advice.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2">
          {services.map(({ icon: Icon, t, b }) => (
            <div key={t} className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)]">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[image:var(--gradient-hero)] p-12 text-center shadow-[var(--shadow-elegant)]">
          <h2 className="text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl">Need a legal opinion in a new market?</h2>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-md bg-background px-6 py-3 text-sm font-semibold text-foreground hover:-translate-y-0.5 transition-transform">
            Request a consultation <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}