import { Link } from "@tanstack/react-router";
import { Linkedin, Twitter, Github, Globe2 } from "lucide-react";
import { countries } from "@/data/countries";

const platform = [
  { to: "/", label: "Overview" },
  { to: "/global-recruitment", label: "Recruitment" },
  { to: "/global-recruitment", label: "Employer of Record" },
  { to: "/global-recruitment", label: "Global Payroll" },
  { to: "/global-recruitment", label: "Contractor Management" },
] as const;

const solutionsLinks = [
  { to: "/global-recruitment", label: "For Startups" },
  { to: "/global-recruitment", label: "For Finance" },
  { to: "/legal", label: "For Legal" },
  { to: "/contact", label: "For Enterprise" },
] as const;

const company = [
  { to: "/contact", label: "Contact" },
  { to: "/legal", label: "Legal" },
  { to: "/legal", label: "Privacy" },
  { to: "/legal", label: "Terms" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_3fr]">
          {/* Brand block */}
          <div>
            <Link to="/" className="inline-flex items-center">
              <span className="text-2xl font-bold tracking-tight">
                <span className="text-foreground">Visa</span>
                <span className="gradient-text">HOBe</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Global HR, payroll and compliance for distributed teams — backed by expert
              local support in 100+ markets.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <a href="#" aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:text-foreground"><Linkedin className="h-4 w-4" /></a>
              <a href="#" aria-label="Twitter"  className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:text-foreground"><Twitter className="h-4 w-4" /></a>
              <a href="#" aria-label="GitHub"   className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-muted-foreground hover:text-foreground"><Github className="h-4 w-4" /></a>
            </div>
            <p className="mt-6 text-xs text-muted-foreground">VisaHOBe Pte. Ltd. · Singapore</p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <FooterCol title="Platform" links={platform} />
            <FooterCol title="Solutions" links={solutionsLinks} />
            <FooterCol title="Company"  links={company} />
            <div>
              <h4 className="text-sm font-semibold text-foreground">Get in touch</h4>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li><a href="mailto:hello@visahobe.com" className="hover:text-foreground">hello@visahobe.com</a></li>
                <li>+65 0000 0000</li>
                <li>1 Raffles Place, Singapore</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Country chips */}
        <div className="mt-12 border-t border-border pt-8">
          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            <Globe2 className="h-3.5 w-3.5" /> Countries we cover
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {countries.map((c) => (
              <Link
                key={c.slug}
                to="/countries/$slug"
                params={{ slug: c.slug }}
                className="badge hover:bg-secondary/80"
              >
                <span>{c.flag}</span> {c.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} VisaHOBe Pte. Ltd. All rights reserved.</p>
          <p>Privacy · Terms · Cookies</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: ReadonlyArray<{ to: string; label: string }> }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-foreground">{title}</h4>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {links.map((l) => (
          <li key={l.label}><Link to={l.to} className="hover:text-foreground">{l.label}</Link></li>
        ))}
      </ul>
    </div>
  );
}
