"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      // show after scrolling past hero, hide near bottom (CTA section)
      const docHeight = document.documentElement.scrollHeight;
      const viewport = window.innerHeight;
      const nearBottom = y + viewport > docHeight - 600;
      setVisible(y > 600 && !nearBottom);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="md:hidden fixed bottom-0 left-0 right-0 z-30 p-3 pointer-events-none"
        >
          <div className="pointer-events-auto bg-white/95 backdrop-blur-xl border border-border shadow-[0_-4px_24px_rgba(0,0,0,0.08)] rounded-2xl p-2 pl-4 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[0.72rem] font-semibold text-foreground leading-tight">
                Plan your Bali trip
              </p>
              <p className="text-[0.65rem] text-muted leading-tight mt-0.5">
                Takes under 60 seconds
              </p>
            </div>
            <a
              href="/onboarding"
              className="flex items-center gap-1 px-4 py-2.5 rounded-full bg-coral text-white font-semibold text-xs shrink-0 shadow-[0_2px_8px_rgba(255,56,92,0.35)]"
            >
              Start
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
