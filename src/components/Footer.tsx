"use client";

const footerLinks = {
  Product: [
    { label: "Services", href: "#services" },
    { label: "Pricing", href: "#pricing" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Partners", href: "#partners" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-foreground text-white/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-coral to-coral-dark flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-white"
                >
                  <path
                    d="M12 2C8 2 5 5.5 5 9.5C5 14 12 19 12 19C12 19 19 14 19 9.5C19 5.5 16 2 12 2Z"
                    fill="currentColor"
                    opacity="0.9"
                  />
                  <circle cx="12" cy="9" r="2.5" fill="white" />
                  <path
                    d="M12 19L12 22"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M9 21H15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Ball<span className="text-coral">oo</span>n
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-sm mb-6">
              Your all-in-one concierge for Bali. We connect travelers with
              trusted local services to make every trip effortless.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {["Instagram", "TikTok", "Twitter"].map((name) => (
                <a
                  key={name}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-coral/20 hover:text-coral transition-colors flex items-center justify-center text-xs font-bold"
                >
                  {name[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold text-sm mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm hover:text-coral transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">
            &copy; 2026 Balloon. All rights reserved.
          </p>
          <p className="text-xs">
            Made with care for Bali travelers worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
