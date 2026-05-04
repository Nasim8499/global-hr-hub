import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, Globe2, ShieldCheck, Wallet, Users, Briefcase,
  Plane, CheckCircle2, Sparkles, Building2, BarChart3, HeartHandshake,
  Search, ArrowLeftRight, Download,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { countries } from "@/data/countries";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VisaHOBe — Global HR, Payroll & Compliance, Backed by Experts" },
      { name: "description", content: "Hire, pay and stay compliant in 100+ countries. Employer of record, payroll, contractors, visas and recruitment — backed by expert local support." },
      { property: "og:title", content: "VisaHOBe — Global HR, Payroll & Compliance" },
      { property: "og:description", content: "Hire, pay and stay compliant in 100+ countries with expert local support." },
    ],
  }),
  component: Index,
});

const tabs = [
  {
    key: "hire",
    label: "Hire & Onboard Employees",
    title: "Hire & Onboard Global Employees",
    items: [
      { icon: Globe2, t: "Employer of Record", b: "Compliantly hire and pay international employees without setting up local entities." },
      { icon: Plane, t: "Visa & Immigration support", b: "Sponsor visas for international hires and offload time-consuming visa administration." },
      { icon: HeartHandshake, t: "Localized fair benefits", b: "Localized benefits packages, anywhere — compliance and cost-control built in." },
    ],
  },
  {
    key: "contractors",
    label: "Manage Contractors",
    title: "Manage Global Contractors",
    items: [
      { icon: Users, t: "Contractor management", b: "Hire contractors globally, pay in their currency and manage compliance in one place." },
      { icon: ShieldCheck, t: "Misclassification protection", b: "Convert contractors to employees and avoid misclassification risk." },
      { icon: Wallet, t: "Multi-currency payouts", b: "Same payment process whether you're paying in USD, EUR, INR or GBP." },
    ],
  },
  {
    key: "payroll",
    label: "Run Compliant Payroll",
    title: "Run Compliant Payroll",
    items: [
      { icon: Briefcase, t: "Global payroll services", b: "Process in-country payroll from one dashboard, without switching vendors." },
      { icon: BarChart3, t: "Analytics & reporting", b: "Unify multi-vendor payroll data with rich analytics for data-driven decisions." },
      { icon: Sparkles, t: "Payroll automation", b: "Validate data, reconcile errors and add smart approval workflows to every run." },
    ],
  },
  {
    key: "entity",
    label: "Global Entity Setup",
    title: "Set Up Global Entities",
    items: [
      { icon: Building2, t: "Global entity setup", b: "Set up legal entities worldwide with payroll, tax registration and compliance handled." },
      { icon: ShieldCheck, t: "Compliance baked in", p: "", b: "Local employment law, tax filings and statutory benefits — always up to date." },
      { icon: Globe2, t: "100+ markets", b: "Expand into new countries without months of legal lift." },
    ],
  },
  {
    key: "support",
    label: "Dedicated Support",
    title: "Real People, Human Support",
    items: [
      { icon: Users, t: "Dedicated success manager", b: "Plan market entry, flag risks and sharpen your hiring as you scale." },
      { icon: HeartHandshake, t: "Employee success manager", b: "Your team gets replies in hours, not days." },
      { icon: Sparkles, t: "Beyond billing", b: "Real people supporting employers and employees — never just a ticket." },
    ],
  },
];

const workflow = [
  { n: "1", t: "Choose your country and hiring model",
    b: ["Hire employees or contractors — whichever fits your team.",
        "Use VisaHOBe payroll or connect your existing providers.",
        "Flat pricing, no hidden fees and no annual lock-in."] },
  { n: "2", t: "Onboard and pay your global team",
    b: ["Contracts, onboarding and localized benefits in any country.",
        "Run payroll across your own entities and EOR regions in one dashboard.",
        "No chasing contractor invoices — we automate payments."] },
  { n: "3", t: "Scale without the growing pains",
    b: ["Live compliance monitoring with regulatory updates tracked.",
        "Promotions, terminations and role changes handled across borders.",
        "Real people supporting employers and employees beyond billing."] },
];

const pillars = [
  { icon: ShieldCheck, t: "Hire like a local", b: "Stay compliant everywhere with locally-vetted contracts that protect your business and IP from day one." },
  { icon: Wallet, t: "Run compliant payroll", b: "Accurate calculations, local taxes and timely filings — your team gets paid on time, every time." },
  { icon: Globe2, t: "Stay up to speed", b: "Scale into 100+ regions faster with trusted in-country specialists who keep you ahead of local laws." },
  { icon: ShieldCheck, t: "Enterprise-grade security", b: "GDPR and SOC 2 aligned, with ongoing staff training and rigorous controls." },
];

function Index() {
  const [tab, setTab] = useState(0);
  const active = tabs[tab];
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<string>("All");
  const [direction, setDirection] = useState<"ltr" | "rtl">("rtl");
  const marqueeListRef = useRef<HTMLUListElement>(null);

  const regions = useMemo(
    () => ["All", ...Array.from(new Set(countries.map((c) => c.region)))],
    [],
  );
  const filteredCountries = useMemo(() => {
    const q = query.trim().toLowerCase();
    return countries.filter((c) => {
      const matchesQ = !q || c.name.toLowerCase().includes(q) || c.region.toLowerCase().includes(q) || c.currency.toLowerCase().includes(q);
      const matchesR = region === "All" || c.region === region;
      return matchesQ && matchesR;
    });
  }, [query, region]);

  const exportCsv = () => {
    const headers = ["Name", "Region", "Capital", "Currency", "Language", "Payroll Cycle", "Working Hours"];
    const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
    const rows = filteredCountries.map((c) =>
      [c.name, c.region, c.capital, c.currency, c.language, c.payrollCycle, c.workingHours].map(escape).join(","),
    );
    const csv = [headers.map(escape).join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `countries-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const onMarqueeKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    const list = marqueeListRef.current;
    if (!list) return;
    const items = Array.from(list.querySelectorAll<HTMLAnchorElement>('a[data-marquee-item="true"]'));
    if (items.length === 0) return;
    const current = document.activeElement as HTMLElement | null;
    const idx = items.findIndex((el) => el === current);
    let next = idx;
    switch (e.key) {
      case "ArrowRight": next = idx < 0 ? 0 : (idx + 1) % items.length; break;
      case "ArrowLeft":  next = idx <= 0 ? items.length - 1 : idx - 1; break;
      case "Home":       next = 0; break;
      case "End":        next = items.length - 1; break;
      default: return;
    }
    e.preventDefault();
    items[next]?.focus();
  };

  return (
    <SiteLayout>
      {/* HERO with full-width gradient panel */}
      <section className="px-3 pt-3 sm:px-4 sm:pt-4">
        <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] bg-[image:var(--gradient-hero)] shadow-[var(--shadow-elegant)]">
          <div className="mx-auto max-w-7xl px-5 pt-12 pb-16 sm:px-10 sm:pt-16 sm:pb-20 lg:px-14 lg:pt-20 lg:pb-28">
            <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
              <div className="animate-fade-up">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1.5 text-xs font-semibold text-foreground shadow-[var(--shadow-soft)]">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[image:var(--gradient-purple)] text-[10px] font-bold text-white">V</span>
                  Reduce HR admin by 60%
                </span>
                <h1 className="mt-5 text-[40px] font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[68px]">
                  Global HR, Payroll &amp; Compliance, Backed by Experts
                </h1>
                <p className="mt-6 max-w-xl text-base text-foreground/80 sm:text-lg">
                  Top companies trust VisaHOBe for EOR, international payroll &amp; contractor
                  management. One platform that combines compliance, local expertise and human
                  support — so you're never just a support ticket.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-purple)] px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elegant)] hover:opacity-95"
                  >
                    Book a 30-Min Demo <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/global-recruitment"
                    className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-white/80 px-6 py-3 text-sm font-semibold text-foreground hover:bg-white"
                  >
                    Explore the platform
                  </Link>
                </div>
              </div>

              {/* Mock employee card */}
              <div className="relative">
                <div className="animate-float rounded-3xl border border-white/40 bg-white/95 p-5 shadow-[var(--shadow-elegant)] backdrop-blur">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 shrink-0 rounded-2xl bg-[image:var(--gradient-purple)]" />
                    <div className="min-w-0 flex-1">
                      <span className="inline-block rounded-full bg-secondary px-2 py-0.5 text-[11px] font-semibold text-secondary-foreground">Employee</span>
                      <p className="mt-1 truncate text-base font-semibold text-foreground">Saskia Messow</p>
                      <p className="truncate text-xs text-muted-foreground">Software Developer</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 rounded-xl border border-border bg-secondary/60 px-3 py-2 text-xs text-foreground">
                    <span className="text-base">🇸🇬</span> Singapore <span className="mx-1 text-muted-foreground">|</span> SGD
                  </div>
                  <button className="mt-4 w-full rounded-full bg-[image:var(--gradient-purple)] px-4 py-2.5 text-sm font-semibold text-primary-foreground">
                    Generate Contract
                  </button>
                </div>
              </div>
            </div>

            {/* Trust strip inside hero */}
            <div className="mt-12 border-t border-white/30 pt-6 sm:mt-14">
              <p className="text-xs font-medium uppercase tracking-widest text-white/85">
                Trusted by Thousands of Global Businesses
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-semibold text-white/85">
                {["NORTHWIND", "ACME LABS", "HELIOS", "LUMEN CO.", "VERTEX", "QUANTA", "BAKERS", "TWININGS"].map((b) => (
                  <span key={b} className="opacity-90">{b}</span>
                ))}
                <div className="ml-auto flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-xs font-semibold text-white">
                  <span className="text-base font-bold">4.7</span> ★★★★★ G2 Review
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORM TABS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
            One platform to <span className="gradient-text">hire, manage &amp; pay</span> global teams
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Explore the different ways our global HR platform supports not just you, but your
            employees across the globe.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {tabs.map((t, i) => (
            <button
              key={t.key}
              onClick={() => setTab(i)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                i === tab
                  ? "bg-[image:var(--gradient-purple)] text-primary-foreground shadow-[var(--shadow-soft)]"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="rounded-3xl border border-border bg-[image:var(--gradient-soft)] p-6 shadow-[var(--shadow-card)] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{active.label}</p>
            <h3 className="mt-2 text-2xl font-semibold text-foreground sm:text-3xl">{active.title}</h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[1,2,3].map((i) => (
                <div key={i} className="rounded-2xl border border-border bg-card p-4">
                  <div className="h-2 w-12 rounded-full bg-[image:var(--gradient-purple)]" />
                  <div className="mt-3 h-2 w-full rounded-full bg-secondary" />
                  <div className="mt-2 h-2 w-3/4 rounded-full bg-secondary" />
                  <div className="mt-2 h-2 w-1/2 rounded-full bg-secondary" />
                </div>
              ))}
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-4">
                <div className="h-2 w-20 rounded-full bg-secondary" />
                <div className="mt-4 flex items-end gap-2">
                  {[40, 70, 55, 90, 60, 80].map((h, i) => (
                    <div key={i} className="w-4 rounded-t bg-[image:var(--gradient-purple)]" style={{ height: h }} />
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-4">
                {[1,2,3].map((i) => (
                  <div key={i} className="flex items-center justify-between border-b border-border py-2 last:border-0">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-secondary" />
                      <div className="h-2 w-16 rounded-full bg-secondary" />
                    </div>
                    <div className="h-2 w-10 rounded-full bg-[image:var(--gradient-purple)]" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            {active.items.map(({ icon: Icon, t, b }) => (
              <div key={t} className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 hover-lift">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[image:var(--gradient-purple)] text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{t}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{b}</p>
                </div>
                <ArrowRight className="ml-auto mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Hire your dream candidate. <span className="gradient-text">We'll handle the rest.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Whether you're hiring in one new country or ten, VisaHOBe gives you the
              infrastructure to move fast and get it right every time.
            </p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {workflow.map((s) => (
              <div key={s.n} className="rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-card)]">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[image:var(--gradient-purple)] text-base font-bold text-primary-foreground">
                  {s.n}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">{s.t}</h3>
                <ul className="mt-4 space-y-2.5">
                  {s.b.map((line) => (
                    <li key={line} className="flex gap-3 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.55_0.22_290)]" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COUNTRY COVERAGE */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[oklch(0.55_0.22_290)]">Where next to hire?</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Local expertise in your <span className="gradient-text">priority markets.</span>
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">Tap a country to see hiring essentials.</p>
        </div>

        {/* Search + region filter */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Search countries</span>
            <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search countries, regions or currencies…"
              className="h-12 w-full rounded-full border border-border bg-card pl-11 pr-4 text-sm text-foreground shadow-[var(--shadow-soft)] placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.55_0.22_290)]"
              aria-label="Search countries"
            />
          </label>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter by region">
            {regions.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRegion(r)}
                aria-pressed={region === r}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.55_0.22_290)] ${
                  region === r
                    ? "bg-[image:var(--gradient-purple)] text-primary-foreground shadow-[var(--shadow-soft)]"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {filteredCountries.map((c) => (
            <Link
              key={c.slug}
              to="/countries/$slug"
              params={{ slug: c.slug }}
              aria-label={`View hiring essentials for ${c.name}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card hover-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.55_0.22_290)]"
            >
              <div
                className="relative flex h-32 items-center justify-center text-7xl"
                style={{ backgroundImage: "var(--gradient-soft)" }}
                aria-hidden
              >
                <span className="absolute -right-3 -top-3 text-[8rem] opacity-20 blur-[1px] transition-transform duration-500 group-hover:scale-110">
                  {c.flag}
                </span>
                <span className="relative drop-shadow-sm">{c.flag}</span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-foreground">{c.name}</h3>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{c.region}</p>
                <div className="mt-3 flex items-center gap-2 text-[11px] font-medium text-muted-foreground">
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-secondary-foreground">{c.currency}</span>
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-secondary-foreground">{c.payrollCycle.split(",")[0]}</span>
                </div>
                <span
                  aria-hidden
                  className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-full bg-[image:var(--gradient-purple)] px-3 py-2 text-xs font-semibold text-primary-foreground shadow-[var(--shadow-soft)] opacity-90 transition group-hover:opacity-100"
                >
                  View hiring essentials <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
          {filteredCountries.length === 0 && (
            <p className="col-span-full rounded-2xl border border-dashed border-border bg-card p-8 text-center text-sm text-muted-foreground">
              No countries match your search. Try a different term or region.
            </p>
          )}
        </div>

        {/* Sliding country marquee */}
        <div className="mt-12">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Countries we cover
            </p>
            <button
              type="button"
              onClick={() => setDirection((d) => (d === "rtl" ? "ltr" : "rtl"))}
              aria-label={`Switch marquee direction (currently ${direction === "rtl" ? "right to left" : "left to right"})`}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground shadow-[var(--shadow-soft)] hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.55_0.22_290)]"
            >
              <ArrowLeftRight className="h-3.5 w-3.5" />
              {direction === "rtl" ? "Right → Left" : "Left → Right"}
            </button>
          </div>
          <div
            className="marquee-mask pause-on-hover mt-5 overflow-hidden"
            role="region"
            aria-label="Countries we cover, scrolling list"
          >
            <ul className={`${direction === "rtl" ? "animate-marquee" : "animate-marquee-reverse"} flex w-max gap-3`}>
              {[...countries, ...countries, ...countries].map((c, i) => (
                <li key={`${c.slug}-${i}`} className="shrink-0">
                  <Link
                    to="/countries/$slug"
                    params={{ slug: c.slug }}
                    aria-label={`${c.name} — view hiring essentials`}
                    tabIndex={i < countries.length ? 0 : -1}
                    aria-hidden={i >= countries.length}
                    className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-[var(--shadow-card)] transition hover:border-[oklch(0.55_0.22_290)] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.55_0.22_290)] focus-visible:ring-offset-2"
                  >
                    <span aria-hidden className="text-xl">{c.flag}</span>
                    <span>{c.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PILLARS + STATS */}
      <section className="bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Compliance you can count on, <span className="gradient-text">backed by real specialists.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Built for global teams that value clarity, confidence and genuinely human support.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {pillars.map(({ icon: Icon, t, b }) => (
              <div key={t} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] hover-lift">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
                  style={{ backgroundImage: "var(--gradient-purple)" }}
                />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-[image:var(--gradient-purple)] text-primary-foreground shadow-[var(--shadow-card)]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="relative mt-5 text-base font-semibold text-foreground">{t}</h3>
                <p className="relative mt-2 text-sm text-muted-foreground">{b}</p>
                <div className="relative mt-4 h-1 w-10 rounded-full bg-[image:var(--gradient-purple)] transition-all duration-300 group-hover:w-16" />
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            <Stat n="99%" l="Payroll Accuracy" />
            <Stat n="80%" l="Less Processing Time" />
            <Stat n="100+" l="Countries Covered" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-3 pb-12 sm:px-4 sm:pb-16">
        <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] bg-[image:var(--gradient-hero)] shadow-[var(--shadow-elegant)]">
          <div className="mx-auto max-w-5xl px-6 py-16 text-center sm:py-20">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Ready when you are.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-foreground/80">
              Talk to a VisaHOBe specialist and explore hiring in your priority markets — no commitment.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-[image:var(--gradient-purple)] px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-elegant)] hover:opacity-95"
              >
                Book a Demo <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/global-recruitment"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-white/85 px-6 py-3 text-sm font-semibold text-foreground hover:bg-white"
              >
                Try Recruitment
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-7 text-center shadow-[var(--shadow-card)]">
      <p className="text-4xl font-semibold tracking-tight gradient-text sm:text-5xl">{n}</p>
      <p className="mt-2 text-sm font-medium text-muted-foreground">{l}</p>
    </div>
  );
}
