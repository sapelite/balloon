import Link from "next/link";
import Wordmark from "@/components/Wordmark";
import { conciergeEmail, mailHref, whatsappHref } from "@/lib/handoff";

const salesEmailHref = mailHref("Skyrol Business — hello", "business");
const salesEmail = conciergeEmail("business");
const waHref = whatsappHref("Hi Skyrol Business — I'd like to book a call");

const footerLinks = {
  Agency: [
    { label: "Case study", href: "/business#case-study" },
    { label: "How we work", href: "/business#features" },
    { label: "Pricing", href: "/business#pricing" },
    { label: "Live demo", href: "/business/demo" },
  ],
  Works: [
    { label: "Villas & stays", href: "/business#case-study" },
    { label: "Restaurants", href: "/business#case-study" },
    { label: "Beach clubs", href: "/business#case-study" },
    { label: "Creators", href: "/business#case-study" },
  ],
  Contact: [
    { label: "WhatsApp", href: waHref },
    { label: "Email", href: salesEmailHref },
    { label: "Client dashboard", href: "/business/dashboard" },
    { label: "Privacy", href: "#" },
  ],
};

export default function BusinessFooter() {
  return (
    <footer className="bg-foreground text-white/55">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          <div className="lg:col-span-2">
            <Wordmark className="text-[1.25rem] mb-3" variant="business" tone="dark" />
            <p className="text-[0.82rem] leading-relaxed max-w-[300px] mb-4">
              The all-in-one growth stack for Bali businesses. Brand, site, content, ads — one team, island-built.
            </p>
            <a href={salesEmailHref} className="inline-flex items-center gap-1.5 text-[0.82rem] font-medium text-white hover:text-coral transition-colors">
              {salesEmail} →
            </a>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white/80 font-semibold text-[0.8rem] mb-3 uppercase tracking-[0.1em]">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-[0.82rem] hover:text-white transition-colors">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[0.72rem] text-white/30">&copy; 2026 Skyrol Business. Built in Bali.</p>
          <Link href="/" className="text-[0.72rem] text-white/30 hover:text-white/60 transition-colors">
            ← Skyrol for travelers
          </Link>
        </div>
      </div>
    </footer>
  );
}
