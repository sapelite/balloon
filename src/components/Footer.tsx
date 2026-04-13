const footerLinks = {
  Product: [
    { label: "Services", href: "#services" },
    { label: "Pricing", href: "#pricing" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Partners", href: "/partners" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Cookies", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-foreground text-white/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-[9px] bg-gradient-to-br from-coral to-coral-dark flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M12 2C8 2 5 5.5 5 9.5C5 14 12 19 12 19C12 19 19 14 19 9.5C19 5.5 16 2 12 2Z" fill="currentColor" opacity="0.9" />
                  <circle cx="12" cy="9" r="2.5" fill="white" opacity="0.9" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Ball<span className="text-coral">oo</span>n
              </span>
            </div>
            <p className="text-[0.825rem] leading-relaxed max-w-[280px] mb-5">
              Your all-in-one concierge for Bali. Connecting travelers with trusted local services.
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
          <p className="text-[0.75rem] text-white/25">&copy; 2026 Balloon. All rights reserved.</p>
          <p className="text-[0.75rem] text-white/25">Made with care for Bali travelers.</p>
        </div>
      </div>
    </footer>
  );
}
