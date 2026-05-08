import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Banknote, Calendar, Clock, Globe2, Briefcase, Plane, ShieldCheck, FileText, CheckCircle2, DollarSign } from "lucide-react";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { countries, getCountry, type Country } from "@/data/countries";
import { visaTypes } from "@/data/visaTypes";
import iconCurrency from "@/assets/icon-currency.jpg";
import iconPayroll from "@/assets/icon-payroll.jpg";
import iconHours from "@/assets/icon-hours.jpg";
import iconLanguage from "@/assets/icon-language.jpg";
import countrySingapore from "@/assets/country-singapore.jpg";
import countryAustralia from "@/assets/country-australia.jpg";
import countryMoldova from "@/assets/country-moldova.jpg";
import countrySerbia from "@/assets/country-serbia.jpg";
import countrySaudi from "@/assets/country-saudi.jpg";
import countryUae from "@/assets/country-uae.jpg";
import countryKuwait from "@/assets/country-kuwait.jpg";
import countryMalaysia from "@/assets/country-malaysia.jpg";

const countryImages: Record<string, string> = {
  singapore: countrySingapore,
  australia: countryAustralia,
  moldova: countryMoldova,
  serbia: countrySerbia,
  "saudi-arabia": countrySaudi,
  uae: countryUae,
  kuwait: countryKuwait,
  malaysia: countryMalaysia,
};

const essentialImages: Record<string, string> = {
  Currency: iconCurrency,
  "Payroll cycle": iconPayroll,
  "Working hours": iconHours,
  "Official language": iconLanguage,
};

export const Route = createFileRoute("/countries/$slug")({
  loader: ({ params }) => {
    const country = getCountry(params.slug);
    if (!country) throw notFound();
    return { country };
  },
  head: ({ loaderData }) => {
    const c = loaderData?.country;
    const title = c ? `Hire in ${c.name} — VisaHOBe` : "Country — VisaHOBe";
    const desc = c ? `${c.tagline} Local employment, payroll, tax and visa essentials for hiring in ${c.name}.` : "";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-3xl font-semibold text-foreground">Country not found</h1>
        <p className="mt-3 text-muted-foreground">We don't yet cover that country.</p>
        <Link to="/" className="mt-6 inline-block text-sm font-medium text-foreground underline">Back home</Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: ({ error }) => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold text-foreground">Something went wrong</h1>
        <p className="mt-3 text-sm text-muted-foreground">{error.message}</p>
      </div>
    </SiteLayout>
  ),
  component: CountryPage,
});

function CountryPage() {
  const { country } = Route.useLoaderData();
  const others = countries.filter((c) => c.slug !== country.slug).slice(0, 4);
  return (
    <SiteLayout>
      <section className="px-3 pt-3 sm:px-4 sm:pt-4">
        <div className="relative isolate overflow-hidden rounded-[28px] sm:rounded-[36px] bg-[image:var(--gradient-hero)] shadow-[var(--shadow-elegant)]">
          {countryImages[country.slug] && (
            <>
              <img
                src={countryImages[country.slug]}
                alt=""
                aria-hidden
                className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60 motion-safe:animate-fade-up"
              />
              <span aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-background/30" />
            </>
          )}
          <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-10 sm:py-20 lg:px-14">
            <div className="flex flex-wrap items-center gap-2 text-xs text-foreground/75">
              <Link to="/" className="hover:text-foreground">Home</Link>
              <span>/</span><span>Countries</span><span>/</span>
              <span className="font-medium text-foreground">{country.name}</span>
            </div>
            <div className="mt-6 flex items-center gap-5">
              <span className="text-6xl drop-shadow-sm">{country.flag}</span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-foreground/75">{country.region}</p>
                <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">Hire in {country.name}</h1>
              </div>
            </div>
            <p className="mt-5 max-w-2xl text-base text-foreground/85 sm:text-lg">{country.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-purple)] px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elegant)] hover:opacity-95">
                Hire in {country.name} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/legal" className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-white/85 px-6 py-3 text-sm font-semibold text-foreground hover:bg-white">
                Legal advisory
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <Quick icon={Banknote} label="Currency" value={country.currency} />
          <Quick icon={Globe2} label="Official language" value={country.language} />
          <Quick icon={Clock} label="Working hours" value={country.workingHours} />
          <Quick icon={Calendar} label="Payroll cycle" value={country.payrollCycle} />
        </div>
      </section>

      <HiringEssentials country={country} />

      <Block title="Employment essentials" icon={Briefcase}>
        <Grid items={[
          ["Contracts", country.employment.contracts],
          ["Probation", country.employment.probation],
          ["Notice period", country.employment.notice],
          ["Termination", country.employment.termination],
        ]} />
      </Block>

      <Block title="Leave & benefits" icon={Calendar} alt>
        <Grid items={[
          ["Annual leave", country.leave.annual],
          ["Sick leave", country.leave.sick],
          ["Parental leave", country.leave.parental],
          ["Public holidays", country.leave.holidays],
        ]} />
      </Block>

      <Block title="Tax & contributions" icon={ShieldCheck}>
        <p className="text-base text-muted-foreground">{country.tax}</p>
      </Block>

      <Block title="Visas & work permits" icon={Plane} alt>
        <p className="text-base text-muted-foreground">{country.visa}</p>
        <p className="mt-4 text-xs text-muted-foreground">Informational only — not legal advice. Speak to a VisaHOBe specialist for case-specific guidance.</p>
      </Block>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Explore other markets</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {others.map((c) => (
            <Link key={c.slug} to="/countries/$slug" params={{ slug: c.slug }} className="group rounded-2xl border border-border bg-card p-5 hover-lift">
              <div className="flex items-center justify-between">
                <span className="text-3xl">{c.flag}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="mt-3 font-semibold text-foreground">{c.name}</p>
              <p className="text-xs text-muted-foreground">{c.region}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="px-3 pb-12 sm:px-4 sm:pb-16">
        <div className="overflow-hidden rounded-[28px] sm:rounded-[36px] bg-[image:var(--gradient-hero)] shadow-[var(--shadow-elegant)]">
          <div className="mx-auto max-w-5xl px-6 py-16 text-center sm:py-20">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">Ready to hire in {country.name}?</h2>
            <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-purple)] px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elegant)] hover:opacity-95">
              Talk to a specialist <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Quick({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
      <div className="flex items-center gap-3 text-muted-foreground"><Icon className="h-4 w-4" /><span className="text-xs uppercase tracking-wider">{label}</span></div>
      <p className="mt-2 text-base font-semibold text-foreground">{value}</p>
    </div>
  );
}

function Block({ title, icon: Icon, children, alt }: { title: string; icon: React.ComponentType<{ className?: string }>; children: React.ReactNode; alt?: boolean }) {
  return (
    <section className={alt ? "bg-secondary/40" : ""}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[image:var(--gradient-purple)] text-primary-foreground"><Icon className="h-5 w-5" /></div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{title}</h2>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}

function Grid({ items }: { items: [string, string][] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {items.map(([k, v]) => (
        <div key={k} className="rounded-2xl border border-border bg-card p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{k}</p>
          <p className="mt-2 text-sm text-foreground">{v}</p>
        </div>
      ))}
    </div>
  );
}

export type { Country };

function HiringEssentials({ country }: { country: Country }) {
  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "payroll", label: "Payroll & Currency" },
    { key: "compliance", label: "Compliance Highlights" },
    { key: "posting", label: "Job Posting Requirements" },
    { key: "visas", label: "Available Visa Types" },
  ] as const;
  type TabKey = typeof tabs[number]["key"];
  const [active, setActive] = useState<TabKey>("overview");

  return (
    <section id="hiring-essentials" className="bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[image:var(--gradient-purple)] text-primary-foreground">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Hiring essentials in {country.name}</h2>
            <p className="text-sm text-muted-foreground">Everything you need — payroll, compliance, postings and visas.</p>
          </div>
        </div>

        <div role="tablist" aria-label="Hiring essentials sections" className="mt-6 flex flex-wrap gap-2 border-b border-border">
          {tabs.map((t) => {
            const isActive = active === t.key;
            return (
              <button
                key={t.key}
                role="tab"
                aria-selected={isActive}
                aria-controls={`he-panel-${t.key}`}
                id={`he-tab-${t.key}`}
                type="button"
                onClick={() => setActive(t.key)}
                className={`rounded-t-lg px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.55_0.22_290)] ${
                  isActive
                    ? "border-b-2 border-[oklch(0.55_0.22_290)] text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="mt-8">
          {active === "overview" && (
            <div role="tabpanel" id="he-panel-overview" aria-labelledby="he-tab-overview" className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <EssentialCard label="Currency" value={country.currency} />
              <EssentialCard label="Payroll cycle" value={country.payrollCycle} />
              <EssentialCard label="Working hours" value={country.workingHours} />
              <EssentialCard label="Official language" value={country.language} />
            </div>
          )}

          {active === "payroll" && (
            <div role="tabpanel" id="he-panel-payroll" aria-labelledby="he-tab-payroll" className="grid gap-4 sm:gap-5 sm:grid-cols-2">
              <EssentialCard label="Currency" value={country.currency} />
              <EssentialCard label="Payroll cycle" value={country.payrollCycle} />
              <div className="sm:col-span-2 rounded-2xl border border-border bg-card p-6">
                <h3 className="text-base font-semibold text-foreground">Tax & contributions</h3>
                <p className="mt-2 text-sm text-muted-foreground">{country.tax}</p>
              </div>
            </div>
          )}

          {active === "compliance" && (
            <div role="tabpanel" id="he-panel-compliance" aria-labelledby="he-tab-compliance" className="grid gap-4 sm:grid-cols-2">
              {[
                ["Contracts", country.employment.contracts],
                ["Probation", country.employment.probation],
                ["Notice period", country.employment.notice],
                ["Termination", country.employment.termination],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl border border-border bg-card p-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{k}</p>
                  <p className="mt-2 text-sm text-foreground">{v}</p>
                </div>
              ))}
            </div>
          )}

          {active === "posting" && (
            <div role="tabpanel" id="he-panel-posting" aria-labelledby="he-tab-posting" className="rounded-2xl border border-border bg-card p-6">
              <h3 className="text-base font-semibold text-foreground">Job posting requirements</h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  `Job titles and descriptions in ${country.language}`,
                  "Salary range disclosure where required by law",
                  "Equal opportunity / non-discrimination statement",
                  "Employer legal name and registered address",
                  `Working hours: ${country.workingHours}`,
                  `Currency for compensation: ${country.currency}`,
                ].map((line) => (
                  <li key={line} className="flex gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.55_0.22_290)]" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {active === "visas" && (
            <div role="tabpanel" id="he-panel-visas" aria-labelledby="he-tab-visas">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-foreground">Available Visa Types</h3>
                <p className="mt-1 text-sm text-muted-foreground">We process {visaTypes.length} visa categories for {country.name}.</p>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {visaTypes.map((v) => (
                  <article key={v.name} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] hover-lift">
                    <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-20 blur-2xl" style={{ backgroundImage: "var(--gradient-purple)" }} />
                    <div className="relative flex items-start justify-between gap-3">
                      <div>
                        <h4 className="text-lg font-semibold text-foreground">{v.name}</h4>
                        <p className="mt-1 text-xs font-medium text-muted-foreground">{v.feeRange} · {v.duration}</p>
                      </div>
                      <Link to="/contact" className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[image:var(--gradient-purple)] px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-[var(--shadow-soft)] hover:opacity-95">
                        Apply Now <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                    <p className="relative mt-3 text-sm text-muted-foreground">{v.description}</p>
                    <div className="relative mt-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Requirements</p>
                      <ul className="mt-2 space-y-1.5">
                        {v.requirements.map((r) => (
                          <li key={r} className="flex gap-2 text-sm text-foreground">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.55_0.22_290)]" />
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="relative mt-5 rounded-xl border border-dashed border-border bg-secondary/40 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Required Documents</p>
                      <ul className="mt-2 flex flex-wrap gap-1.5">
                        {v.documents.map((d) => (
                          <li key={d} className="rounded-full bg-card px-2.5 py-1 text-[11px] font-medium text-foreground border border-border">{d}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function EssentialCard({ label, value }: { label: string; value: string }) {
  const img = essentialImages[label];
  return (
    <div className="essential-card hover-lift" data-label={label}>
      <div className="essential-media">
        {img ? (
          <img src={img} alt="" loading="lazy" width={512} height={512} />
        ) : null}
      </div>
      <div className="essential-body">
        <p className="essential-label">{label}</p>
        <p className="essential-value">{value}</p>
      </div>
    </div>
  );
}
