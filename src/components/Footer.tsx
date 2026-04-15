import Wordmark from "@/components/Wordmark";

const footerLinks = {
  Travel: [
    { label: "How it works", href: "/#how-it-works" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Free guides", href: "/guides" },
    { label: "Trip planner", href: "/trip-guide" },
  ],
  Audiences: [
    { label: "Travelers", href: "/onboarding" },
    { label: "For Business", href: "/business" },
    { label: "For Investors", href: "/investors" },
    { label: "Partners", href: "/partners" },
  ],
  Company: [
    { label: "Contact", href: "mailto:hello@skyrol.bali" },
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-foreground text-white/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4 text-white">
              <Wordmark className="text-xl" tone="dark" />
            </div>
            <p className="text-[0.825rem] leading-relaxed max-w-[280px] mb-5">
              Quality hotels, drivers, and tables in Canggu, Uluwatu & Ubud — with a concierge on call, 24/7.
            </p>
            <div className="flex gap-2.5">
              {["IG", "TK", "X"].map((name) => (
                <a
                  key={name}
                  href="#"
                  className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-white/[0.08] transition-colors flex items-center justify-center text-[0.7rem] font-bold text-white/40 hover:text-white/70"
                >
                  {name}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white/80 font-semibold text-[0.825rem] mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-[0.825rem] hover:text-white/80 transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-7 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[0.75rem] text-white/25">&copy; 2026 Skyrol. All rights reserved.</p>
          <p className="text-[0.75rem] text-white/25">Made with care for Bali travelers.</p>
        </div>
      </div>
    </footer>
  );
}
