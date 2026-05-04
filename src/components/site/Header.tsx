import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ChevronDown, Globe2, Briefcase, Users, Wallet, Plane, ShieldCheck, Building2, BarChart3, Sparkles, Search } from "lucide-react";
import { countries } from "@/data/countries";

type MegaItem = { icon: React.ComponentType<{ className?: string }>; label: string; desc: string; to: string };

const productsMenu: MegaItem[] = [
  { icon: Globe2,      label: "Employer of Record",   desc: "Hire abroad without local entities",  to: "/global-recruitment" },
  { icon: Wallet,      label: "Global Payroll",       desc: "Multi-country, multi-currency payroll", to: "/global-recruitment" },
  { icon: Users,       label: "Contractor Management",desc: "Compliant contracts & payouts",        to: "/global-recruitment" },
  { icon: Plane,       label: "Visa & Immigration",   desc: "Sponsor and renew work visas",         to: "/legal" },
];

const solutionsMenu: MegaItem[] = [
  { icon: Briefcase,   label: "For Startups",         desc: "Make your first global hires",         to: "/global-recruitment" },
  { icon: BarChart3,   label: "For Finance Teams",    desc: "Consolidate multi-country payroll",    to: "/global-recruitment" },
  { icon: ShieldCheck, label: "For Legal Teams",      desc: "Vetted contracts & IP protection",     to: "/legal" },
  { icon: Building2,   label: "For Enterprise",       desc: "Scale across borders, fast",           to: "/contact" },
];

const navLinks = [
  { to: "/global-recruitment", label: "Pricing" },
  { to: "/legal",              label: "Resources" },
] as const;

type Open = null | "products" | "solutions" | "countries";

export function Header() {
  const [mobile, setMobile] = useState(false);
  const [open, setOpen] = useState<Open>(null);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight">
            <span className="text-foreground">Visa</span>
            <span className="gradient-text">HOBe</span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          onMouseLeave={() => setOpen(null)}
        >
          <MegaTrigger label="Products"  isOpen={open === "products"}  onEnter={() => setOpen("products")} />
          <MegaTrigger label="Solutions" isOpen={open === "solutions"} onEnter={() => setOpen("solutions")} />
          <MegaTrigger label="Countries" isOpen={open === "countries"} onEnter={() => setOpen("countries")} />
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onMouseEnter={() => setOpen(null)}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "rounded-full px-4 py-2 text-sm font-medium text-foreground bg-secondary" }}
            >
              {l.label}
            </Link>
          ))}

          {/* Mega panels */}
          {open === "products" && <MegaPanel items={productsMenu} onClose={() => setOpen(null)} />}
          {open === "solutions" && <MegaPanel items={solutionsMenu} onClose={() => setOpen(null)} />}
          {open === "countries" && <CountriesPanel onClose={() => setOpen(null)} />}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <button aria-label="Search" className="rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground">
            <Search className="h-4 w-4" />
          </button>
          <Link to="/legal" className="btn btn-sm btn-outline">Log in</Link>
          <Link to="/contact" className="btn btn-sm btn-primary">Book a Demo</Link>
        </div>

        <button
          className="rounded-md p-2 text-foreground lg:hidden"
          onClick={() => setMobile((o) => !o)}
          aria-label="Toggle menu"
        >
          {mobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobile && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto max-w-7xl space-y-4 px-4 py-5">
            <MobileGroup title="Products" items={productsMenu} onClose={() => setMobile(false)} />
            <MobileGroup title="Solutions" items={solutionsMenu} onClose={() => setMobile(false)} />
            <div>
              <p className="flex items-center gap-2 px-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                <Globe2 className="h-3.5 w-3.5" /> Countries
              </p>
              <div className="mt-2 grid grid-cols-2 gap-1">
                {countries.map((c) => (
                  <Link
                    key={c.slug}
                    to="/countries/$slug"
                    params={{ slug: c.slug }}
                    onClick={() => setMobile(false)}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-foreground hover:bg-secondary"
                  >
                    <span>{c.flag}</span>
                    <span className="truncate">{c.name}</span>
                  </Link>
                ))}
              </div>
            </div>
            <div className="space-y-1 border-t border-border pt-3">
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setMobile(false)}
                  className="block rounded-xl px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
                >
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <Link to="/legal" onClick={() => setMobile(false)} className="btn btn-outline w-full">Log in</Link>
              <Link to="/contact" onClick={() => setMobile(false)} className="btn btn-primary w-full">Book a Demo</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function MegaTrigger({ label, isOpen, onEnter }: { label: string; isOpen: boolean; onEnter: () => void }) {
  return (
    <button
      onMouseEnter={onEnter}
      className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition ${
        isOpen ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
      }`}
    >
      {label}
      <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
    </button>
  );
}

function MegaPanel({ items, onClose }: { items: MegaItem[]; onClose: () => void }) {
  return (
    <div className="absolute left-1/2 top-full z-40 -translate-x-1/2 pt-3">
      <div className="grid w-[640px] grid-cols-2 gap-2 rounded-2xl border border-border bg-popover p-3 shadow-[var(--shadow-card)]">
        {items.map(({ icon: Icon, label, desc, to }) => (
          <Link
            key={label}
            to={to}
            onClick={onClose}
            className="group flex items-start gap-3 rounded-xl p-3 hover:bg-secondary"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[image:var(--gradient-purple)] text-primary-foreground">
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function CountriesPanel({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute left-1/2 top-full z-40 -translate-x-1/2 pt-3">
      <div className="grid w-[480px] grid-cols-2 gap-1 rounded-2xl border border-border bg-popover p-3 shadow-[var(--shadow-card)]">
        {countries.map((c) => (
          <Link
            key={c.slug}
            to="/countries/$slug"
            params={{ slug: c.slug }}
            onClick={onClose}
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-popover-foreground hover:bg-secondary"
          >
            <span className="text-lg">{c.flag}</span>
            <span>{c.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function MobileGroup({ title, items, onClose }: { title: string; items: MegaItem[]; onClose: () => void }) {
  return (
    <div>
      <p className="px-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">{title}</p>
      <div className="mt-2 grid grid-cols-1 gap-1">
        {items.map(({ icon: Icon, label, desc, to }) => (
          <Link
            key={label}
            to={to}
            onClick={onClose}
            className="flex items-start gap-3 rounded-xl p-3 hover:bg-secondary"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[image:var(--gradient-purple)] text-primary-foreground">
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
