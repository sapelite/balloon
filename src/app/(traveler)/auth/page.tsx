"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Wordmark from "@/components/Wordmark";

function AuthInner() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next");
  // Only allow relative paths as redirect target to prevent open-redirect
  const safeNext = next && next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  async function doLogin(payload: { email: string; name?: string; provider: string }) {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Login failed");
    }
    window.location.href = safeNext;
  }

  const handleSocial = async (provider: string) => {
    setError(null);
    setLoading(provider);
    try {
      // Mock social login with a demo email per provider
      const demoEmail = `demo.${provider}@skyrol.app`;
      const demoName = provider === "google" ? "Google User" : "Apple User";
      await doLogin({ email: demoEmail, name: demoName, provider });
    } catch (err) {
      setError((err as Error).message);
      setLoading(null);
    }
  };

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setError(null);
    setLoading("email");
    try {
      await doLogin({ email, name: mode === "signup" ? name : undefined, provider: "email" });
    } catch (err) {
      setError((err as Error).message);
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-white">
      {/* Subtle background wash */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[32rem] h-[32rem] bg-coral rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[32rem] h-[32rem] bg-lagoon rounded-full blur-[140px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md mx-6"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <a href="/" className="inline-flex items-center">
            <Wordmark className="text-3xl" />
          </a>
          <p className="text-muted mt-3 text-sm">
            {mode === "login" ? "Welcome back to Bali" : "Start your Bali journey"}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-border shadow-airbnb p-8">
          {/* Social buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleSocial("google")}
              disabled={loading !== null}
              className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-white border border-border text-foreground font-semibold text-sm hover:bg-sand transition-all disabled:opacity-50"
            >
              {loading === "google" ? (
                <div className="w-5 h-5 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin" />
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
              )}
              Continue with Google
            </button>

            <button
              onClick={() => handleSocial("apple")}
              disabled={loading !== null}
              className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl bg-foreground text-white font-semibold text-sm hover:bg-foreground/90 transition-all disabled:opacity-50"
            >
              {loading === "apple" ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
              )}
              Continue with Apple
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Email form */}
          <form onSubmit={handleEmail} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3.5 rounded-xl bg-white border border-border text-foreground placeholder:text-muted/60 focus:outline-none focus:border-foreground focus:ring-2 focus:ring-foreground/10 transition-all text-sm"
            />
            {mode === "signup" && (
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-white border border-border text-foreground placeholder:text-muted/60 focus:outline-none focus:border-foreground focus:ring-2 focus:ring-foreground/10 transition-all text-sm"
              />
            )}
            {error && (
              <p className="text-xs text-coral-dark text-center" role="alert">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading !== null || !email}
              className="w-full py-3.5 rounded-xl bg-coral text-white font-semibold text-sm shadow-[0_2px_8px_rgba(255,56,92,0.3)] hover:shadow-[0_4px_16px_rgba(255,56,92,0.4)] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading === "email" ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                mode === "login" ? "Sign In" : "Create Account"
              )}
            </button>
          </form>

          {/* Toggle */}
          <p className="text-center text-sm text-muted mt-6">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="text-coral font-semibold hover:underline"
            >
              {mode === "login" ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted/60 mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </motion.div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <AuthInner />
    </Suspense>
  );
}
