import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ChevronDown } from "lucide-react";
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
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-[image:var(--gradient-hero)] text-primary-foreground font-bold">
            V
          </div>
          <span className="text-lg font-semibold tracking-tight text-foreground">
            VisaHOBe
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
          <div
            className="relative"
            onMouseEnter={() => setCountriesOpen(true)}
            onMouseLeave={() => setCountriesOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              Countries <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {countriesOpen && (
              <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3">
                <div className="grid w-[420px] grid-cols-2 gap-1 rounded-xl border border-border bg-popover p-3 shadow-[var(--shadow-card)]">
                  {countries.map((c) => (
                    <Link
                      key={c.slug}
                      to="/countries/$slug"
                      params={{ slug: c.slug }}
                      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-popover-foreground transition-colors hover:bg-accent"
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

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/contact"
            className="rounded-md bg-[image:var(--gradient-hero)] px-4 py-2 text-sm font-medium text-primary-foreground shadow-[var(--shadow-card)] transition-opacity hover:opacity-90"
          >
            Book a demo
          </Link>
        </div>

        <button
          className="lg:hidden rounded-md p-2 text-foreground"
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
                className="block rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-accent"
              >
                {l.label}
              </Link>
            ))}
            <div className="px-3 pb-1 pt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Countries
            </div>
            {countries.map((c) => (
              <Link
                key={c.slug}
                to="/countries/$slug"
                params={{ slug: c.slug }}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent"
              >
                <span>{c.flag}</span>
                {c.name}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-3 block rounded-md bg-[image:var(--gradient-hero)] px-4 py-2 text-center text-sm font-medium text-primary-foreground"
            >
              Book a demo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}