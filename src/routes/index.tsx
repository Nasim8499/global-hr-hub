import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight, Globe2, ShieldCheck, Wallet, Users, Briefcase,
  Plane, CheckCircle2, Sparkles, Building2, BarChart3, HeartHandshake,
  Search, ArrowLeftRight, Download, Zap, Award, Clock, FileText, MessageSquare,
  TrendingUp, Lock, Layers, Lightbulb, Star, Quote, BookOpen, PieChart,
  Headphones, Map,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { countries } from "@/data/countries";
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
          <button
            type="button"
            onClick={exportCsv}
            disabled={filteredCountries.length === 0}
            aria-label={`Export ${filteredCountries.length} filtered countries as CSV`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-purple)] px-4 py-2 text-xs font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.55_0.22_290)] focus-visible:ring-offset-2"
          >
            <Download className="h-3.5 w-3.5" />
            Export results ({filteredCountries.length})
          </button>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {filteredCountries.map((c) => (
            <Link
              key={c.slug}
              to="/countries/$slug"
              params={{ slug: c.slug }}
              data-slug={c.slug}
              aria-label={`View hiring essentials for ${c.name}`}
              className="country-card group relative isolate flex flex-col justify-end overflow-hidden border border-border shadow-[var(--shadow-soft)] hover-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.55_0.22_290)]"
            >
              {/* Full-cover destination image with graceful fallback */}
              <img
                src={countryImages[c.slug]}
                alt=""
                loading="lazy"
                width={768}
                height={960}
                onError={(e) => {
                  const el = e.currentTarget;
                  el.style.display = "none";
                  const fb = el.nextElementSibling as HTMLElement | null;
                  if (fb) fb.style.display = "flex";
                }}
                className="country-img pointer-events-none absolute inset-0 h-full w-full"
              />
              <span
                aria-hidden
                style={{ display: countryImages[c.slug] ? "none" : "flex", backgroundImage: "var(--gradient-soft)" }}
                className="pointer-events-none absolute inset-0 items-center justify-center text-[14rem] leading-none"
              >
                {c.flag}
              </span>
              {/* Legibility + per-country tint overlays */}
              <span aria-hidden className="country-overlay pointer-events-none absolute inset-0" />
              <span aria-hidden className="country-tint pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-60" />
              {/* Region chip */}
              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                <span className="text-base leading-none">{c.flag}</span>
                {c.region}
              </span>
              <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-white group-hover:text-foreground">
                <ArrowRight className="h-4 w-4" />
              </span>
              {/* Bottom content */}
              <div className="relative z-10 flex flex-col gap-3 p-5">
                <h3 className="text-xl font-semibold tracking-tight text-white drop-shadow-sm">{c.name}</h3>
                <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium">
                  <span className="rounded-full border border-white/25 bg-white/15 px-2.5 py-1 text-white backdrop-blur-md">{c.currency}</span>
                  <span className="rounded-full border border-white/25 bg-white/15 px-2.5 py-1 text-white backdrop-blur-md">{c.payrollCycle.split(",")[0]}</span>
                </div>
                <span
                  aria-hidden
                  className="mt-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-white px-3 py-2 text-xs font-semibold text-foreground shadow-[var(--shadow-soft)] transition group-hover:bg-[image:var(--gradient-purple)] group-hover:text-primary-foreground"
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
            <ul
              ref={marqueeListRef}
              onKeyDown={onMarqueeKeyDown}
              className={`${direction === "rtl" ? "animate-marquee" : "animate-marquee-reverse"} flex w-max gap-3 focus-within:[animation-play-state:paused]`}
            >
              {[...countries, ...countries, ...countries].map((c, i) => (
                <li key={`${c.slug}-${i}`} className="shrink-0">
                  <Link
                    to="/countries/$slug"
                    params={{ slug: c.slug }}
                    aria-label={`${c.name} — view hiring essentials`}
                    tabIndex={i < countries.length ? 0 : -1}
                    aria-hidden={i >= countries.length}
                    data-marquee-item={i < countries.length ? "true" : undefined}
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
      <ExtendedSections />
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

/* =====================================================================
 * Extended sections — adds 12 rich content blocks for a long, vivid page
 * ===================================================================*/
function ExtendedSections() {
  return (
    <>
      <SectionWhyUs />
      <SectionServices />
      <SectionIndustries />
      <SectionProcess />
      <SectionMetrics />
      <SectionTestimonials />
      <SectionIntegrations />
      <SectionSecurity />
      <SectionPricing />
      <SectionResources />
      <SectionFaq />
      <SectionNewsletter />
    </>
  );
}

function SectionShell({ eyebrow, title, lead, children, alt = false, id }: { eyebrow: string; title: React.ReactNode; lead?: string; children: React.ReactNode; alt?: boolean; id?: string }) {
  return (
    <section id={id} className={alt ? "bg-secondary/40" : ""}>
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-[oklch(0.55_0.22_290)]">{eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">{title}</h2>
          {lead && <p className="mt-4 text-base text-muted-foreground sm:text-lg">{lead}</p>}
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

function SectionWhyUs() {
  const items = [
    { icon: Award, t: "20+ years of expertise", b: "Senior in-country specialists who have run global payroll long before remote work was cool." },
    { icon: Users, t: "Real human support", b: "Talk to a named advisor — not a chatbot — within one business day." },
    { icon: Clock, t: "Fast onboarding", b: "Most employees go live within 5 business days of contract signature." },
    { icon: ShieldCheck, t: "Audit-ready compliance", b: "Every payroll cycle is backed by documented controls and country playbooks." },
    { icon: Zap, t: "Zero hidden fees", b: "Transparent pricing with no setup costs and no annual lock-in." },
    { icon: TrendingUp, t: "Built to scale", b: "From 1 hire to 1,000 — the platform grows with your team." },
  ];
  return (
    <SectionShell eyebrow="Why VisaHOBe" title={<>Global hiring, <span className="gradient-text">made human.</span></>} lead="Local expertise paired with modern tooling so you can hire confidently in any market — without the legal headaches.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ icon: Icon, t, b }) => (
          <div key={t} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] hover-lift">
            <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40" style={{ backgroundImage: "var(--gradient-purple)" }} />
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-[image:var(--gradient-purple)] text-primary-foreground shadow-[var(--shadow-card)]">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="relative mt-5 text-base font-semibold text-foreground">{t}</h3>
            <p className="relative mt-2 text-sm text-muted-foreground">{b}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

function SectionServices() {
  const services = [
    { icon: Globe2, t: "Employer of Record", b: "Hire compliantly in 100+ countries with no entity setup." },
    { icon: Wallet, t: "Global Payroll", b: "Multi-currency payroll in your own entities and EOR regions." },
    { icon: Briefcase, t: "Contractor Management", b: "Onboard and pay contractors worldwide in minutes." },
    { icon: Plane, t: "Visa & Immigration", b: "End-to-end visa sponsorship and relocation support." },
    { icon: ShieldCheck, t: "Compliance & Tax", b: "Locally vetted contracts, statutory filings and audits." },
    { icon: HeartHandshake, t: "Benefits Admin", b: "Local healthcare, retirement and statutory benefits." },
    { icon: Users, t: "Recruitment", b: "In-country recruiters sourcing pre-vetted talent." },
    { icon: BookOpen, t: "Advisory", b: "Strategic guidance on entity vs. EOR, mobility and policy." },
  ];
  return (
    <SectionShell eyebrow="Our Services" title={<>One partner for every <span className="gradient-text">global hire.</span></>} alt>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map(({ icon: Icon, t, b }) => (
          <div key={t} className="group rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] hover-lift">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[image:var(--gradient-purple)] text-primary-foreground"><Icon className="h-4 w-4" /></div>
            <h3 className="mt-4 text-sm font-semibold text-foreground">{t}</h3>
            <p className="mt-1.5 text-xs text-muted-foreground">{b}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[oklch(0.55_0.22_290)] opacity-0 transition group-hover:opacity-100">Learn more <ArrowRight className="h-3 w-3" /></span>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

function SectionIndustries() {
  const items = [
    { t: "Technology & SaaS", b: "Hire engineers across time zones." },
    { t: "Financial Services", b: "Compliance-first global staffing." },
    { t: "Healthcare & Life Sciences", b: "Specialized clinical talent." },
    { t: "Manufacturing", b: "On-the-ground operators worldwide." },
    { t: "Retail & E-commerce", b: "Scale support and ops globally." },
    { t: "Media & Entertainment", b: "Production crews in any country." },
    { t: "Energy & Utilities", b: "Engineers across critical regions." },
    { t: "Education & EdTech", b: "Global instructors and curriculum." },
  ];
  return (
    <SectionShell eyebrow="Industries" title={<>Trusted across <span className="gradient-text">every sector.</span></>} lead="From early-stage startups to Fortune 500 enterprises, we power global teams in the industries that move the world.">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <div key={it.t} className="group flex items-start gap-3 rounded-2xl border border-border bg-card p-5 hover-lift">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[image:var(--gradient-soft)] text-foreground"><Layers className="h-4 w-4" /></div>
            <div>
              <p className="text-sm font-semibold text-foreground">{it.t}</p>
              <p className="mt-1 text-xs text-muted-foreground">{it.b}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

function SectionProcess() {
  const steps = [
    { n: "01", icon: MessageSquare, t: "Discovery call", b: "We map your countries, headcount and timeline." },
    { n: "02", icon: FileText, t: "Compliant contract", b: "Locally vetted agreements signed in days, not weeks." },
    { n: "03", icon: Plane, t: "Onboarding & visas", b: "Background checks, visas and equipment shipped globally." },
    { n: "04", icon: Wallet, t: "Live payroll", b: "Salaries, taxes and filings handled every cycle." },
  ];
  return (
    <SectionShell eyebrow="How it works" title={<>From <span className="gradient-text">first call</span> to first paycheck.</>} alt>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {steps.map(({ n, icon: Icon, t, b }) => (
          <div key={n} className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] hover-lift">
            <span aria-hidden className="absolute -right-2 -top-2 text-[5.5rem] font-bold leading-none text-foreground/5">{n}</span>
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-[image:var(--gradient-purple)] text-primary-foreground"><Icon className="h-5 w-5" /></div>
            <h3 className="relative mt-5 text-base font-semibold text-foreground">{t}</h3>
            <p className="relative mt-2 text-sm text-muted-foreground">{b}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

function SectionMetrics() {
  const items = [
    { n: "100+", l: "Countries covered", icon: Globe2 },
    { n: "12k+", l: "Employees onboarded", icon: Users },
    { n: "99.8%", l: "Payroll accuracy", icon: PieChart },
    { n: "<24h", l: "Average response time", icon: Headphones },
  ];
  return (
    <SectionShell eyebrow="By the numbers" title={<>Outcomes that <span className="gradient-text">speak for themselves.</span></>}>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ n, l, icon: Icon }) => (
          <div key={l} className="relative overflow-hidden rounded-3xl border border-border p-7 text-center shadow-[var(--shadow-card)]" style={{ backgroundImage: "var(--gradient-soft)" }}>
            <Icon className="mx-auto h-6 w-6 text-[oklch(0.55_0.22_290)]" />
            <p className="mt-4 text-4xl font-semibold tracking-tight gradient-text sm:text-5xl">{n}</p>
            <p className="mt-2 text-sm font-medium text-muted-foreground">{l}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

function SectionTestimonials() {
  const items = [
    { name: "Amelia Chen", role: "Head of People, Northwind", quote: "VisaHOBe handled our APAC expansion end-to-end. We went live in three new countries in under a month." },
    { name: "Marcus Becker", role: "COO, Helix Labs", quote: "Their compliance team is genuinely the best I've worked with. No surprises, ever." },
    { name: "Priya Raman", role: "VP Talent, Orbital", quote: "Real humans, fast answers, transparent pricing. Exactly what global hiring should feel like." },
  ];
  return (
    <SectionShell eyebrow="Customer stories" title={<>Loved by <span className="gradient-text">global teams.</span></>} alt>
      <div className="grid gap-5 md:grid-cols-3">
        {items.map((it) => (
          <figure key={it.name} className="relative rounded-2xl border border-border bg-card p-7 shadow-[var(--shadow-soft)] hover-lift">
            <Quote aria-hidden className="h-7 w-7 text-[oklch(0.55_0.22_290)]" />
            <blockquote className="mt-4 text-base text-foreground">"{it.quote}"</blockquote>
            <div className="mt-5 flex items-center gap-1 text-[oklch(0.75_0.18_70)]">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
            </div>
            <figcaption className="mt-4 text-sm">
              <p className="font-semibold text-foreground">{it.name}</p>
              <p className="text-muted-foreground">{it.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </SectionShell>
  );
}

function SectionIntegrations() {
  const tools = ["Slack", "Workday", "BambooHR", "QuickBooks", "Xero", "NetSuite", "Greenhouse", "Lever", "Okta", "Google Workspace", "Microsoft 365", "Notion"];
  return (
    <SectionShell eyebrow="Integrations" title={<>Plays nicely with your <span className="gradient-text">existing stack.</span></>}>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {tools.map((t) => (
          <div key={t} className="rounded-2xl border border-border bg-card p-5 text-center shadow-[var(--shadow-soft)] hover-lift">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-[image:var(--gradient-soft)] text-foreground"><Sparkles className="h-4 w-4" /></div>
            <p className="mt-3 text-xs font-semibold text-foreground">{t}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

function SectionSecurity() {
  const items = [
    { icon: Lock, t: "SOC 2 Type II" },
    { icon: ShieldCheck, t: "GDPR aligned" },
    { icon: Lock, t: "ISO 27001 ready" },
    { icon: ShieldCheck, t: "Encrypted at rest & in transit" },
  ];
  return (
    <SectionShell eyebrow="Trust & security" title={<>Enterprise-grade by <span className="gradient-text">default.</span></>} lead="Your people data deserves bank-level care. Independent audits, strict access controls and continuous monitoring keep your team safe." alt>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, t }) => (
          <div key={t} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5 hover-lift">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[image:var(--gradient-purple)] text-primary-foreground"><Icon className="h-4 w-4" /></div>
            <p className="text-sm font-semibold text-foreground">{t}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

function SectionPricing() {
  const tiers = [
    { t: "Contractor", p: "$29", per: "/contractor / mo", feats: ["Compliant agreements", "Multi-currency payments", "Tax docs (W-8/W-9)", "Email support"] },
    { t: "Employer of Record", p: "$499", per: "/employee / mo", feats: ["Local entity coverage", "Statutory benefits", "Visa support add-on", "Dedicated advisor"], featured: true },
    { t: "Global Payroll", p: "Custom", per: "your entities", feats: ["Multi-country payroll", "Filings & remittances", "ERP/HRIS integrations", "Implementation team"] },
  ];
  return (
    <SectionShell eyebrow="Simple pricing" title={<>Transparent plans, <span className="gradient-text">no surprises.</span></>}>
      <div className="grid gap-5 md:grid-cols-3">
        {tiers.map((tier) => (
          <div key={tier.t} className={`relative overflow-hidden rounded-3xl border p-7 shadow-[var(--shadow-card)] hover-lift ${tier.featured ? "border-transparent text-primary-foreground" : "border-border bg-card"}`} style={tier.featured ? { backgroundImage: "var(--gradient-purple)" } : undefined}>
            {tier.featured && <span className="absolute right-5 top-5 rounded-full bg-white/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur">Popular</span>}
            <h3 className={`text-lg font-semibold ${tier.featured ? "text-primary-foreground" : "text-foreground"}`}>{tier.t}</h3>
            <p className="mt-4 flex items-baseline gap-1">
              <span className={`text-4xl font-semibold tracking-tight ${tier.featured ? "text-primary-foreground" : "gradient-text"}`}>{tier.p}</span>
              <span className={`text-xs ${tier.featured ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{tier.per}</span>
            </p>
            <ul className="mt-6 space-y-2.5">
              {tier.feats.map((f) => (
                <li key={f} className={`flex items-start gap-2 text-sm ${tier.featured ? "text-primary-foreground/95" : "text-foreground"}`}>
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Link to="/contact" className={`mt-7 inline-flex w-full items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold transition ${tier.featured ? "bg-white text-foreground hover:bg-white/90" : "bg-[image:var(--gradient-purple)] text-primary-foreground hover:opacity-95"}`}>
              Get started <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

function SectionResources() {
  const items = [
    { icon: BookOpen, t: "Country hiring guides", b: "Step-by-step playbooks for every market we cover." },
    { icon: Lightbulb, t: "Compliance insights", b: "Monthly briefings on labor law and tax updates." },
    { icon: Map, t: "Global salary benchmarks", b: "Stay competitive with fresh, localized data." },
  ];
  return (
    <SectionShell eyebrow="Resources" title={<>Learn from the <span className="gradient-text">global hiring playbook.</span></>} alt>
      <div className="grid gap-5 md:grid-cols-3">
        {items.map(({ icon: Icon, t, b }) => (
          <Link key={t} to="/" className="group block rounded-3xl border border-border bg-card p-7 shadow-[var(--shadow-soft)] hover-lift">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[image:var(--gradient-purple)] text-primary-foreground"><Icon className="h-5 w-5" /></div>
            <h3 className="mt-5 text-lg font-semibold text-foreground">{t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{b}</p>
            <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-[oklch(0.55_0.22_290)]">Read more <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" /></span>
          </Link>
        ))}
      </div>
    </SectionShell>
  );
}

function SectionFaq() {
  const faqs = [
    { q: "How fast can we onboard a new hire?", a: "Most employees go live within 5 business days of contract signature." },
    { q: "Do we need our own legal entity?", a: "No. With Employer of Record we hire on your behalf in countries where you don't have an entity." },
    { q: "Which currencies do you support?", a: "We pay employees in their local currency in 100+ countries, with multi-currency invoicing." },
    { q: "Can you sponsor visas?", a: "Yes — our immigration team handles work permits, dependents and renewals end-to-end." },
    { q: "Is there a long-term contract?", a: "No. We work month-to-month with no annual lock-in." },
    { q: "How is my data protected?", a: "We are SOC 2 Type II certified and GDPR aligned, with full encryption and access controls." },
  ];
  return (
    <SectionShell eyebrow="FAQ" title={<>Answers to the <span className="gradient-text">questions that matter.</span></>}>
      <div className="grid gap-4 md:grid-cols-2">
        {faqs.map((f) => (
          <details key={f.q} className="group rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] hover-lift open:shadow-[var(--shadow-card)]">
            <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
              <span className="text-sm font-semibold text-foreground">{f.q}</span>
              <span aria-hidden className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[image:var(--gradient-soft)] text-foreground transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
    </SectionShell>
  );
}

function SectionNewsletter() {
  return (
    <section className="px-3 pb-12 sm:px-4 sm:pb-16">
      <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] border border-border bg-card p-8 shadow-[var(--shadow-card)] sm:p-12">
        <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-30 blur-3xl" style={{ backgroundImage: "var(--gradient-purple)" }} />
        <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[oklch(0.55_0.22_290)]">Stay in the loop</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Monthly insights on <span className="gradient-text">global hiring.</span>
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">No spam — just the regulatory updates, salary trends and playbooks our customers ask for.</p>
          </div>
          <form className="flex flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <label className="relative flex-1">
              <span className="sr-only">Work email</span>
              <input type="email" required placeholder="you@company.com" className="h-12 w-full rounded-full border border-border bg-card px-5 text-sm text-foreground shadow-[var(--shadow-soft)] placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.55_0.22_290)]" />
            </label>
            <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-purple)] px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] hover:opacity-95">
              Subscribe <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
