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
      <section className="px-3 pt-3 sm:px-4 sm:pt-4">
        <div className="overflow-hidden rounded-[28px] sm:rounded-[36px] bg-[image:var(--gradient-hero)] shadow-[var(--shadow-elegant)]">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-10 sm:py-20 lg:px-14">
            <span className="inline-flex items-center rounded-full bg-white/85 px-3 py-1.5 text-xs font-semibold text-foreground shadow-[var(--shadow-soft)]">
              Legal services
            </span>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
              Local lawyers, global coverage.
            </h1>
            <p className="mt-5 max-w-2xl text-base text-foreground/80 sm:text-lg">
              Our network of in-country counsel supports VisaHOBe clients across employment, immigration and corporate matters — informational only, not legal advice.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {services.map(({ icon: Icon, t, b }) => (
            <div key={t} className="rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-card)] hover-lift">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[image:var(--gradient-purple)] text-primary-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-3 pb-12 sm:px-4 sm:pb-16">
        <div className="overflow-hidden rounded-[28px] sm:rounded-[36px] bg-[image:var(--gradient-hero)] shadow-[var(--shadow-elegant)]">
          <div className="mx-auto max-w-5xl px-6 py-16 text-center sm:py-20">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">Need a legal opinion in a new market?</h2>
            <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-purple)] px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elegant)] hover:opacity-95">
              Request a consultation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
