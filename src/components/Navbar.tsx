"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Partners", href: "/#partners" },
  { label: "FAQ", href: "/#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [user, setUser] = useState<{ name: string | null; email: string } | null>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setUser(d.user))
      .catch(() => {});
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 50);
    setHidden(latest > prev && latest > 300);
  });

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: hidden && !mobileOpen ? -100 : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass border-b border-black/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-[4.25rem] flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-[10px] bg-linear-to-br from-coral to-coral-dark flex items-center justify-center shadow-[0_2px_8px_rgba(255,99,99,0.3)] group-hover:shadow-[0_4px_16px_rgba(255,99,99,0.4)] transition-shadow duration-300">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M12 2C8 2 5 5.5 5 9.5C5 14 12 19 12 19C12 19 19 14 19 9.5C19 5.5 16 2 12 2Z" fill="currentColor" opacity="0.9" />
              <circle cx="12" cy="9" r="2.5" fill="white" opacity="0.9" />
              <path d="M12 19L12 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M9 21H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-[1.15rem] font-bold tracking-tight">
            Ball<span className="text-coral">oo</span>n
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative px-3.5 py-2 text-[0.825rem] font-medium text-foreground/55 hover:text-foreground transition-colors rounded-lg hover:bg-foreground/[0.03]"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="/trip-guide" className="text-[0.825rem] font-medium text-foreground/55 hover:text-foreground transition-colors px-3 py-2">
            Trip Guide
          </a>
          <a
            href="/entreprise"
            className="text-[0.825rem] font-semibold px-3.5 py-2 rounded-full bg-linear-to-r from-coral/10 to-gold/10 text-coral hover:from-coral/15 hover:to-gold/15 transition-colors border border-coral/10"
          >
            For Business
          </a>
          {user ? (
            <a
              href="/dashboard"
              className="group px-5 py-2.5 rounded-full bg-foreground text-white text-[0.825rem] font-semibold hover:bg-foreground/90 transition-all flex items-center gap-1.5"
            >
              Dashboard
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          ) : (
            <>
              <a href="/auth" className="text-[0.825rem] font-medium text-foreground/55 hover:text-foreground transition-colors px-3 py-2">
                Sign In
              </a>
              <a
                href="/#cta"
                className="group px-5 py-2.5 rounded-full bg-foreground text-white text-[0.825rem] font-semibold hover:bg-foreground/90 transition-all flex items-center gap-1.5"
              >
                Get Early Access
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 -mr-2 rounded-lg hover:bg-foreground/[0.04] transition-colors"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden glass border-t border-black/[0.04] overflow-hidden"
          >
            <div className="px-6 py-5 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm font-medium text-foreground/60 hover:text-foreground hover:bg-foreground/[0.03] transition-colors py-2.5 px-3 rounded-lg"
                >
                  {link.label}
                </a>
              ))}
              <a href="/trip-guide" onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-foreground/60 hover:text-foreground hover:bg-foreground/[0.03] transition-colors py-2.5 px-3 rounded-lg">
                Trip Guide
              </a>
              <a href="/entreprise" onClick={() => setMobileOpen(false)} className="block text-sm font-semibold text-coral bg-coral/5 hover:bg-coral/10 transition-colors py-2.5 px-3 rounded-lg">
                For Business
              </a>
              <div className="pt-3 space-y-2">
                {user ? (
                  <a
                    href="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="block w-full text-center px-5 py-3 rounded-full bg-foreground text-white text-sm font-semibold"
                  >
                    Open Dashboard
                  </a>
                ) : (
                  <>
                    <a href="/auth" className="block text-center py-2.5 text-sm font-medium text-foreground/60">
                      Sign In
                    </a>
                    <a
                      href="/#cta"
                      onClick={() => setMobileOpen(false)}
                      className="block w-full text-center px-5 py-3 rounded-full bg-foreground text-white text-sm font-semibold"
                    >
                      Get Early Access
                    </a>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
