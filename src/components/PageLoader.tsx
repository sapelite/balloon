"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const SESSION_KEY = "balloon_loaded";
const DURATION_MS = 2100;

export default function PageLoader() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Only show on the first paint of a tab session — avoids replaying on
    // client-side navigations or quick refreshes.
    try {
      const seen = sessionStorage.getItem(SESSION_KEY);
      if (seen) return;
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      /* sessionStorage blocked — show loader anyway */
    }
    setVisible(true);
    // Prevent body scroll while loader is up
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = prevOverflow;
    }, DURATION_MS);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ y: 0 }}
          exit={{ y: "-105%" }}
          transition={{
            duration: 0.9,
            ease: [0.76, 0, 0.24, 1], // strong ease-in-out cubic
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, #1b1b3a 0%, #0e0e22 55%, #050510 100%)",
          }}
          aria-hidden="true"
        >
          {/* Soft color orbs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 0.45, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute top-1/4 left-1/4 w-[28rem] h-[28rem] rounded-full blur-[120px]"
            style={{ background: "#ff7a7a" }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 0.35, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.15, ease: "easeOut" }}
            className="absolute bottom-1/4 right-1/4 w-[24rem] h-[24rem] rounded-full blur-[120px]"
            style={{ background: "#4fb4d8" }}
          />

          {/* Subtle grain (pure CSS) */}
          <div
            className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.55'/></svg>\")",
            }}
          />

          {/* Center composition */}
          <div className="relative flex flex-col items-center gap-6">
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                type: "spring",
                stiffness: 140,
                damping: 16,
              }}
              className="relative"
            >
              {/* Glow ring */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [0.95, 1.15, 1], opacity: [0.25, 0.5, 0.35] }}
                transition={{ duration: 1.6, delay: 0.4, ease: "easeInOut" }}
                className="absolute inset-0 rounded-[22px] blur-xl"
                style={{ background: "#ff7a7a" }}
              />
              <div className="relative w-20 h-20 rounded-[22px] flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #ff7a7a 0%, #e85858 100%)",
                  boxShadow: "0 10px 40px -10px rgba(255, 122, 122, 0.6)",
                }}>
                <motion.svg
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  fill="none"
                  initial="hidden"
                  animate="visible"
                >
                  {/* Pin body */}
                  <motion.path
                    d="M12 2C8 2 5 5.5 5 9.5C5 14 12 19 12 19C12 19 19 14 19 9.5C19 5.5 16 2 12 2Z"
                    stroke="white"
                    strokeWidth="1.2"
                    variants={{
                      hidden: { pathLength: 0, fill: "rgba(255,255,255,0)" },
                      visible: {
                        pathLength: 1,
                        fill: "rgba(255,255,255,0.95)",
                        transition: {
                          pathLength: { duration: 0.9, delay: 0.35, ease: "easeOut" },
                          fill: { duration: 0.4, delay: 1.05 },
                        },
                      },
                    }}
                  />
                  {/* Inner dot */}
                  <motion.circle
                    cx="12"
                    cy="9"
                    r="2.5"
                    variants={{
                      hidden: { scale: 0, opacity: 0 },
                      visible: {
                        scale: 1,
                        opacity: 1,
                        transition: { delay: 1.25, duration: 0.3, type: "spring" },
                      },
                    }}
                    style={{ transformOrigin: "12px 9px", fill: "#ff7a7a" }}
                  />
                  {/* Small string */}
                  <motion.path
                    d="M12 19L12 22"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    variants={{
                      hidden: { pathLength: 0, opacity: 0 },
                      visible: {
                        pathLength: 1,
                        opacity: 1,
                        transition: { delay: 1.35, duration: 0.3 },
                      },
                    }}
                  />
                  <motion.path
                    d="M9 21H15"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    variants={{
                      hidden: { pathLength: 0, opacity: 0 },
                      visible: {
                        pathLength: 1,
                        opacity: 1,
                        transition: { delay: 1.5, duration: 0.25 },
                      },
                    }}
                  />
                </motion.svg>
              </div>
            </motion.div>

            {/* Word mark — reveals via clip-path */}
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="text-3xl font-bold tracking-tight text-white"
              >
                Ball
                <span style={{ color: "#ff7a7a" }}>oo</span>
                n
              </motion.div>
            </div>

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.25 }}
              className="flex items-center gap-3"
            >
              <motion.span
                className="h-px w-8"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 1.3 }}
                style={{ background: "rgba(255,255,255,0.35)", transformOrigin: "left" }}
              />
              <span className="text-xs uppercase tracking-[0.35em] text-white/50 font-medium">
                Bali, in one click
              </span>
              <motion.span
                className="h-px w-8"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 1.3 }}
                style={{ background: "rgba(255,255,255,0.35)", transformOrigin: "right" }}
              />
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="relative mt-2 h-[2px] w-40 rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.6, delay: 0.5, ease: [0.65, 0, 0.35, 1] }}
                className="absolute inset-y-0 left-0"
                style={{
                  background: "linear-gradient(90deg, #ff7a7a, #f4c86a, #4fb4d8)",
                }}
              />
            </motion.div>
          </div>

          {/* Top seam — gives the exit "curtain lift" a clean edge */}
          <div
            className="absolute inset-x-0 -bottom-px h-px"
            style={{ background: "rgba(255,255,255,0.04)" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
