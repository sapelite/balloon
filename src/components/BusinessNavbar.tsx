"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ArrowRight, LayoutDashboard } from "lucide-react";
import Wordmark from "@/components/Wordmark";

const navLinks = [
  { label: "Case study", href: "/business#case-study" },
  { label: "How we work", href: "/business#features" },
  { label: "Pricing", href: "/business#pricing" },
  { label: "Live demo", href: "/business/demo" },
];

export default function BusinessNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<{ name: string | null; email: string } | null>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((d) => setUser(d.user)).catch(() => {});
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 20));

  async function goToAudience(audience: "traveler" | "entrepreneur", href: string) {
    try {
      await fetch("/api/audience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ audience }),
      });
    } catch {}
    window.location.href = href;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-xl border-b border-foreground/[0.06]" : "bg-white"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 lg:px-10 h-14 flex items-center justify-between gap-6">
        <Link href="/business" className="flex items-center shrink-0">
          <Wordmark className="text-[1.2rem]" variant="business" />
        </Link>

        <div className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="px-3 py-1.5 text-[0.82rem] font-medium text-foreground/60 hover:text-foreground transition-colors rounded-lg hover:bg-foreground/[0.03]">
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <div className="flex items-center rounded-full border border-foreground/10 p-0.5">
            <button onClick={() => goToAudience("traveler", "/")} className="text-[0.72rem] font-semibold px-2.5 py-1 rounded-full text-foreground/60 hover:text-coral transition-colors">Travel</button>
            <button className="text-[0.72rem] font-semibold px-2.5 py-1 rounded-full bg-lagoon/10 text-lagoon" aria-current="page">Business</button>
          </div>
          {user ? (
            <Link href="/business/dashboard" className="group px-4 py-2 rounded-full bg-foreground text-white text-[0.8rem] font-semibold hover:bg-foreground/90 transition-all flex items-center gap-1.5">
              <LayoutDashboard className="w-3.5 h-3.5" /> Dashboard
            </Link>
          ) : (
            <>
              <Link href="/auth?next=/business/dashboard" className="text-[0.8rem] font-medium text-foreground/60 hover:text-foreground transition-colors px-2 py-1.5">Sign in</Link>
              <a href="/business#pricing" className="group px-4 py-2 rounded-full bg-coral text-white text-[0.8rem] font-semibold shadow-sm hover:shadow-md hover:scale-[1.02] transition-all flex items-center gap-1.5">
                Book a call <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </>
          )}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 -mr-2 rounded-lg hover:bg-foreground/[0.04] transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-t border-foreground/[0.06] overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-foreground/65 py-2 px-3 rounded-lg">
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => { setMobileOpen(false); goToAudience("traveler", "/"); }}
                className="block w-full text-left text-sm font-semibold text-coral bg-coral/5 py-2 px-3 rounded-lg"
              >
                For Travelers →
              </button>
              <div className="pt-2 grid gap-2">
                {user ? (
                  <Link href="/business/dashboard" onClick={() => setMobileOpen(false)} className="block text-center px-4 py-2.5 rounded-full bg-foreground text-white text-sm font-semibold">
                    Open Dashboard
                  </Link>
                ) : (
                  <a href="/business#pricing" onClick={() => setMobileOpen(false)} className="block text-center px-4 py-2.5 rounded-full bg-coral text-white text-sm font-semibold">
                    Book a call
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
