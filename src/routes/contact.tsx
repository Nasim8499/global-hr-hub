import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/SiteLayout";
import { countries } from "@/data/countries";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact VisaHOBe — Talk to a global employment expert" },
      { name: "description", content: "Get in touch with VisaHOBe to discuss hiring, payroll, compliance and visas in your target markets." },
      { property: "og:title", content: "Contact VisaHOBe" },
      { property: "og:description", content: "Talk to a global employment expert about hiring in 100+ countries." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-[oklch(0.55_0.18_252)]">Contact</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">Let’s talk global hiring.</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Tell us where you’re hiring and what you need. A specialist will get back within one business day.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
            {sent ? (
              <div className="flex flex-col items-center py-12 text-center">
                <CheckCircle2 className="h-12 w-12 text-[oklch(0.55_0.18_252)]" />
                <h2 className="mt-4 text-2xl font-semibold text-foreground">Thanks — we got it.</h2>
                <p className="mt-2 max-w-md text-muted-foreground">A VisaHOBe specialist will reach out within one business day.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                  toast.success("Message received", {
                    description: "A VisaHOBe specialist will reach out within one business day.",
                  });
                }}
                className="grid gap-5 sm:grid-cols-2"
              >
                <Field label="Full name" name="name" required />
                <Field label="Work email" name="email" type="email" required />
                <Field label="Company" name="company" required />
                <div>
                  <label className="text-sm font-medium text-foreground">Hiring country</label>
                  <select className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground">
                    <option>Select a country</option>
                    {countries.map((c) => <option key={c.slug}>{c.name}</option>)}
                    <option>Other</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-foreground">How can we help?</label>
                  <textarea rows={5} className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground" />
                </div>
                <div className="sm:col-span-2">
                  <button className="w-full rounded-md bg-[image:var(--gradient-hero)] px-5 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-card)] transition-opacity hover:opacity-90">
                    Request a call
                  </button>
                </div>
              </form>
            )}
          </div>
          <div className="space-y-5">
            <InfoCard icon={Mail} title="Email" body="hello@visahobe.com" />
            <InfoCard icon={Phone} title="Phone" body="+65 0000 0000" />
            <InfoCard icon={MapPin} title="Headquarters" body="VisaHOBe Pte. Ltd. · 1 Raffles Place, Singapore" />
            <div className="overflow-hidden rounded-2xl border border-border">
              <div className="aspect-[4/3] bg-[image:var(--gradient-hero)] opacity-90" />
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="text-sm font-medium text-foreground">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
      />
    </div>
  );
}

function InfoCard({ icon: Icon, title, body }: { icon: React.ComponentType<{ className?: string }>; title: string; body: string }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{body}</p>
      </div>
    </div>
  );
}