"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ArrowRight, LayoutDashboard } from "lucide-react";
import Wordmark from "@/components/Wordmark";

const navLinks = [
  { label: "Features", href: "/business#features" },
  { label: "Results", href: "/business#results" },
  { label: "Pricing", href: "/business#pricing" },
  { label: "Demo", href: "/business/demo" },
  { label: "FAQ", href: "/business#faq" },
];

export default function BusinessNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<{ name: string | null; email: string } | null>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setUser(d.user))
      .catch(() => {});
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 30);
  });

  async function switchToTraveler() {
    try {
      await fetch("/api/audience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ audience: "traveler" }),
      });
    } catch {}
    window.location.href = "/";
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-border shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          : "bg-white border-b border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between gap-6">
        {/* Logo + badge */}
        <a href="/business" className="flex items-center group shrink-0">
          <Wordmark className="text-[1.25rem]" variant="business" />
        </a>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3.5 py-2 text-[0.825rem] font-medium text-foreground/65 hover:text-foreground transition-colors rounded-lg hover:bg-foreground/[0.03]"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <button
            onClick={switchToTraveler}
            className="text-[0.8rem] font-medium text-muted hover:text-foreground transition-colors px-3 py-2"
          >
            Traveler site
          </button>
          {user ? (
            <a
              href="/business/dashboard"
              className="group px-4 py-2 rounded-lg bg-foreground text-white text-[0.825rem] font-semibold hover:bg-foreground/90 transition-all flex items-center gap-1.5"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Dashboard
            </a>
          ) : (
            <>
              <a
                href="/auth?next=/business/dashboard"
                className="text-[0.825rem] font-medium text-foreground hover:text-foreground/80 transition-colors px-3 py-2"
              >
                Sign in
              </a>
              <a
                href="/business#pricing"
                className="group px-4 py-2 rounded-lg bg-lagoon text-white text-[0.825rem] font-semibold hover:bg-lagoon-dark transition-all flex items-center gap-1.5 shadow-[0_2px_8px_rgba(70,4,121,0.25)]"
              >
                Book a call
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 -mr-2 rounded-lg hover:bg-foreground/[0.04] transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white border-t border-border overflow-hidden"
          >
            <div className="px-6 py-5 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm font-medium text-foreground/65 hover:text-foreground hover:bg-foreground/[0.03] transition-colors py-2.5 px-3 rounded-lg"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => { setMobileOpen(false); switchToTraveler(); }}
                className="block w-full text-left text-sm font-medium text-muted py-2.5 px-3 rounded-lg"
              >
                ← Traveler site
              </button>
              <div className="pt-3 space-y-2">
                {user ? (
                  <a
                    href="/business/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="block w-full text-center px-5 py-3 rounded-lg bg-foreground text-white text-sm font-semibold"
                  >
                    Open Dashboard
                  </a>
                ) : (
                  <>
                    <a href="/auth?next=/business/dashboard" className="block text-center py-2.5 text-sm font-medium text-foreground">
                      Sign in
                    </a>
                    <a
                      href="/business#pricing"
                      onClick={() => setMobileOpen(false)}
                      className="block w-full text-center px-5 py-3 rounded-lg bg-lagoon text-white text-sm font-semibold"
                    >
                      Book a call
                    </a>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
