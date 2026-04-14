import Wordmark from "@/components/Wordmark";

const footerLinks = {
  Platform: [
    { label: "Features", href: "/business#features" },
    { label: "Pricing", href: "/business#pricing" },
    { label: "Live demo", href: "/business/demo" },
    { label: "Dashboard", href: "/business/dashboard" },
  ],
  Solutions: [
    { label: "Villas & stays", href: "/business#features" },
    { label: "Restaurants", href: "/business#features" },
    { label: "Beach clubs", href: "/business#features" },
    { label: "Transport", href: "/business#features" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Case studies", href: "#" },
    { label: "Contact sales", href: "mailto:business@skyrol.app" },
    { label: "Privacy", href: "#" },
  ],
};

export default function BusinessFooter() {
  return (
    <footer className="bg-foreground text-white/55">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4 text-white">
              <Wordmark className="text-xl" variant="business" tone="dark" />
            </div>
            <p className="text-[0.825rem] leading-relaxed max-w-[320px] mb-5">
              The all-in-one growth stack for Bali businesses. Social, content, ads, CRM — built for the island economy.
            </p>
            <a
              href="mailto:business@skyrol.app"
              className="inline-flex items-center gap-1.5 text-[0.825rem] font-medium text-white hover:text-coral transition-colors"
            >
              business@skyrol.app →
            </a>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white/90 font-semibold text-[0.825rem] mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-[0.825rem] hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-7 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[0.75rem] text-white/30">&copy; 2026 Skyrol Business. Built in Bali.</p>
          <a href="/" className="text-[0.75rem] text-white/30 hover:text-white/60 transition-colors">
            ← Skyrol for travelers
          </a>
        </div>
      </div>
    </footer>
  );
}
