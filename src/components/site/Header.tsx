import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ChevronDown, Globe2 } from "lucide-react";
import { countries } from "@/data/countries";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/global-recruitment", label: "Recruitment" },
  { to: "/legal", label: "Legal" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [countriesOpen, setCountriesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight">
            <span className="text-foreground">Visa</span>
            <span className="gradient-text">HOBe</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "rounded-full px-4 py-2 text-sm font-medium text-foreground bg-secondary" }}
            >
              {l.label}
            </Link>
          ))}
          <div
            className="relative"
            onMouseEnter={() => setCountriesOpen(true)}
            onMouseLeave={() => setCountriesOpen(false)}
          >
            <button className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground">
              Countries <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {countriesOpen && (
              <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3">
                <div className="grid w-[440px] grid-cols-2 gap-1 rounded-2xl border border-border bg-popover p-3 shadow-[var(--shadow-card)]">
                  {countries.map((c) => (
                    <Link
                      key={c.slug}
                      to="/countries/$slug"
                      params={{ slug: c.slug }}
                      className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-popover-foreground hover:bg-secondary"
                    >
                      <span className="text-lg">{c.flag}</span>
                      <span>{c.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            to="/legal"
            className="rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary"
          >
            Log in
          </Link>
          <Link
            to="/contact"
            className="rounded-full bg-[image:var(--gradient-purple)] px-5 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] hover:opacity-95"
          >
            Book a Demo
          </Link>
        </div>

        <button
          className="rounded-md p-2 text-foreground lg:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-4">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
              >
                {l.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Globe2 className="h-3.5 w-3.5" /> Countries
            </div>
            <div className="grid grid-cols-2 gap-1">
              {countries.map((c) => (
                <Link
                  key={c.slug}
                  to="/countries/$slug"
                  params={{ slug: c.slug }}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-foreground hover:bg-secondary"
                >
                  <span>{c.flag}</span>
                  <span className="truncate">{c.name}</span>
                </Link>
              ))}
            </div>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-3 block rounded-full bg-[image:var(--gradient-purple)] px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
