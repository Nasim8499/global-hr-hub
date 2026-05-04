import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Banknote, Calendar, Clock, Globe2, Briefcase, Plane, ShieldCheck } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { countries, getCountry, type Country } from "@/data/countries";

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
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10 bg-[image:var(--gradient-hero)] opacity-[0.06]" />
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <span>/</span><span>Countries</span><span>/</span>
            <span className="text-foreground">{country.name}</span>
          </div>
          <div className="mt-6 flex items-center gap-5">
            <span className="text-6xl">{country.flag}</span>
            <div>
              <p className="text-sm uppercase tracking-wider text-[oklch(0.55_0.18_252)]">{country.region}</p>
              <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Hire in {country.name}</h1>
            </div>
          </div>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{country.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-md bg-[image:var(--gradient-hero)] px-5 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-card)] hover:opacity-90">
              Hire in {country.name} <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/legal" className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-3 text-sm font-medium text-foreground hover:bg-accent">
              Legal advisory
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Quick icon={Banknote} label="Currency" value={country.currency} />
          <Quick icon={Globe2} label="Official language" value={country.language} />
          <Quick icon={Clock} label="Working hours" value={country.workingHours} />
          <Quick icon={Calendar} label="Payroll cycle" value={country.payrollCycle} />
        </div>
      </section>

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
        <h2 className="text-2xl font-semibold text-foreground">Explore other markets</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((c) => (
            <Link key={c.slug} to="/countries/$slug" params={{ slug: c.slug }} className="group rounded-2xl border border-border bg-card p-5 hover:-translate-y-0.5 transition-all hover:shadow-[var(--shadow-card)]">
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

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[image:var(--gradient-hero)] p-12 text-center shadow-[var(--shadow-elegant)]">
          <h2 className="text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl">Ready to hire in {country.name}?</h2>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-md bg-background px-6 py-3 text-sm font-semibold text-foreground hover:-translate-y-0.5 transition-transform">
            Talk to a specialist <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}

function Quick({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
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
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground"><Icon className="h-5 w-5" /></div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground">{title}</h2>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}

function Grid({ items }: { items: [string, string][] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {items.map(([k, v]) => (
        <div key={k} className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{k}</p>
          <p className="mt-2 text-sm text-foreground">{v}</p>
        </div>
      ))}
    </div>
  );
}

export type { Country };