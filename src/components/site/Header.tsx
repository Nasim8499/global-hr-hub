import { useState, useRef, useEffect, useCallback } from "react";
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
  const navRef = useRef<HTMLElement | null>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const panelRef = useRef<HTMLDivElement | null>(null);
  const mobileSheetRef = useRef<HTMLDivElement | null>(null);
  const mobileToggleRef = useRef<HTMLButtonElement | null>(null);

  // Close on Escape; restore focus to trigger
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(null);
        triggerRefs.current[open]?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Focus first item when panel opens (keyboard activation)
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      const first = panelRef.current?.querySelector<HTMLElement>('[role="menuitem"]');
      first?.focus();
    }, 30);
    return () => clearTimeout(t);
  }, [open]);

  // Roving keyboard nav within the open panel
  const onPanelKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const items = Array.from(
      panelRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []
    );
    if (items.length === 0) return;
    const active = document.activeElement as HTMLElement | null;
    const idx = active ? items.indexOf(active) : -1;
    const focusAt = (i: number) => items[(i + items.length) % items.length]?.focus();
    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        e.preventDefault();
        focusAt(idx + 1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        e.preventDefault();
        focusAt(idx - 1);
        break;
      case "Home":
        e.preventDefault();
        items[0]?.focus();
        break;
      case "End":
        e.preventDefault();
        items[items.length - 1]?.focus();
        break;
      case "Tab": {
        // Focus trap: keep tabbing inside the panel
        e.preventDefault();
        focusAt(idx + (e.shiftKey ? -1 : 1));
        break;
      }
    }
  }, []);

  // Mobile sheet: focus trap + Escape
  useEffect(() => {
    if (!mobile) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobile(false);
        mobileToggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const focusables = mobileSheetRef.current?.querySelectorAll<HTMLElement>(
        'a, button, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables || focusables.length === 0) return;
      const list = Array.from(focusables);
      const first = list[0];
      const last = list[list.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobile]);

  // Close mobile sheet when resizing to desktop
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mql.matches && setMobile(false);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // Lock body scroll while mobile sheet is open
  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobile]);

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
          ref={navRef}
          className="hidden items-center gap-1 lg:flex"
          onMouseLeave={() => setOpen(null)}
        >
          <MegaTrigger refCb={(el) => (triggerRefs.current.products = el)}  label="Products"  panelId="mega-products"  isOpen={open === "products"}  onEnter={() => setOpen("products")}  onToggle={() => setOpen(open === "products" ? null : "products")} />
          <MegaTrigger refCb={(el) => (triggerRefs.current.solutions = el)} label="Solutions" panelId="mega-solutions" isOpen={open === "solutions"} onEnter={() => setOpen("solutions")} onToggle={() => setOpen(open === "solutions" ? null : "solutions")} />
          <MegaTrigger refCb={(el) => (triggerRefs.current.countries = el)} label="Countries" panelId="mega-countries" isOpen={open === "countries"} onEnter={() => setOpen("countries")} onToggle={() => setOpen(open === "countries" ? null : "countries")} />
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onMouseEnter={() => setOpen(null)}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              activeProps={{ className: "rounded-full px-4 py-2 text-sm font-medium text-foreground bg-secondary" }}
            >
              {l.label}
            </Link>
          ))}

          {/* Mega panels */}
          {open === "products" && <MegaPanel panelRef={panelRef} onKeyDown={onPanelKeyDown} id="mega-products" items={productsMenu} onClose={() => setOpen(null)} />}
          {open === "solutions" && <MegaPanel panelRef={panelRef} onKeyDown={onPanelKeyDown} id="mega-solutions" items={solutionsMenu} onClose={() => setOpen(null)} />}
          {open === "countries" && <CountriesPanel panelRef={panelRef} onKeyDown={onPanelKeyDown} id="mega-countries" onClose={() => setOpen(null)} />}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <button aria-label="Search" className="rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground">
            <Search className="h-4 w-4" />
          </button>
          <Link to="/legal" className="btn btn-sm btn-outline">Log in</Link>
          <Link to="/contact" className="btn btn-sm btn-primary">Book a Demo</Link>
        </div>

        <button
          ref={mobileToggleRef}
          className="rounded-md p-2 text-foreground lg:hidden"
          onClick={() => setMobile((o) => !o)}
          aria-label={mobile ? "Close menu" : "Open menu"}
          aria-expanded={mobile}
          aria-controls="mobile-nav-sheet"
        >
          {mobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobile && (
        <div
          id="mobile-nav-sheet"
          ref={mobileSheetRef}
          role="dialog"
          aria-modal="true"
          aria-label="Main navigation"
          className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto overscroll-contain border-t border-border bg-background lg:hidden"
        >
          <div className="mx-auto max-w-7xl space-y-4 px-4 py-5 pb-[max(env(safe-area-inset-bottom),24px)]">
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
                    className="flex min-h-11 items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
                  className="flex min-h-11 items-center rounded-xl px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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

function MegaTrigger({ label, panelId, isOpen, onEnter, onToggle, refCb }: { label: string; panelId: string; isOpen: boolean; onEnter: () => void; onToggle: () => void; refCb?: (el: HTMLButtonElement | null) => void }) {
  return (
    <button
      ref={refCb}
      onMouseEnter={onEnter}
      onFocus={onEnter}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (!isOpen) onEnter();
        }
      }}
      aria-haspopup="menu"
      aria-expanded={isOpen}
      aria-controls={panelId}
      className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
        isOpen ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary hover:text-foreground"
      }`}
    >
      {label}
      <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
    </button>
  );
}

function MegaPanel({ id, items, onClose, panelRef, onKeyDown }: { id: string; items: MegaItem[]; onClose: () => void; panelRef?: React.Ref<HTMLDivElement>; onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void }) {
  return (
    <div ref={panelRef} onKeyDown={onKeyDown} id={id} role="menu" aria-label={id} className="absolute left-1/2 top-full z-40 -translate-x-1/2 pt-3 animate-in fade-in-0 zoom-in-95 slide-in-from-top-1 duration-150">
      <div className="grid w-[640px] grid-cols-2 gap-2 rounded-2xl border border-border bg-popover p-3 shadow-[var(--shadow-card)]">
        {items.map(({ icon: Icon, label, desc, to }) => (
          <Link
            key={label}
            to={to}
            role="menuitem"
            onClick={onClose}
            className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-secondary focus-visible:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[image:var(--gradient-purple)] text-primary-foreground transition-transform group-hover:scale-105">
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

function CountriesPanel({ id, onClose, panelRef, onKeyDown }: { id: string; onClose: () => void; panelRef?: React.Ref<HTMLDivElement>; onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void }) {
  return (
    <div ref={panelRef} onKeyDown={onKeyDown} id={id} role="menu" aria-label="Countries" className="absolute left-1/2 top-full z-40 -translate-x-1/2 pt-3 animate-in fade-in-0 zoom-in-95 slide-in-from-top-1 duration-150">
      <div className="grid max-h-[70vh] w-[480px] grid-cols-2 gap-1 overflow-y-auto rounded-2xl border border-border bg-popover p-3 shadow-[var(--shadow-card)]">
        {countries.map((c) => (
          <Link
            key={c.slug}
            to="/countries/$slug"
            params={{ slug: c.slug }}
            role="menuitem"
            onClick={onClose}
            className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-popover-foreground transition-colors hover:bg-secondary focus-visible:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
            className="flex min-h-12 items-start gap-3 rounded-xl p-3 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
