import { Link } from "@tanstack/react-router";
import { countries } from "@/data/countries";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-foreground">Visa</span>
              <span className="gradient-text">HOBe</span>
            </span>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Global HR, payroll and compliance for distributed teams — backed by expert
              local support.
            </p>
            <p className="mt-4 text-xs text-muted-foreground">
              VisaHOBe Pte. Ltd. · Singapore
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">Platform</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground">Home</Link></li>
              <li><Link to="/global-recruitment" className="hover:text-foreground">Global Recruitment</Link></li>
              <li><Link to="/legal" className="hover:text-foreground">Legal Services</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">Countries</h4>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              {countries.map((c) => (
                <li key={c.slug}>
                  <Link to="/countries/$slug" params={{ slug: c.slug }} className="hover:text-foreground">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">Get in touch</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>hello@visahobe.com</li>
              <li>+65 0000 0000</li>
              <li>1 Raffles Place, Singapore</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} VisaHOBe Pte. Ltd. All rights reserved.</p>
          <p>Privacy · Terms · Cookies</p>
        </div>
      </div>
    </footer>
  );
}
