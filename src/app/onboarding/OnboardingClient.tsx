"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { ArrowRight, ArrowLeft, Check, Sparkles } from "lucide-react";
import Wordmark from "@/components/Wordmark";

type Audience = "traveler" | "business";

type Step = {
  key: string;
  question: string;
  subtitle?: string;
  type: "choice" | "multichoice" | "text" | "email";
  options?: { value: string; label: string; emoji?: string }[];
  placeholder?: string;
  optional?: boolean;
};

const TRAVELER_STEPS: Step[] = [
  {
    key: "why",
    question: "What brings you to Bali?",
    subtitle: "Helps us pick the right experiences for you.",
    type: "choice",
    options: [
      { value: "holiday", label: "Holiday / vacation", emoji: "🌴" },
      { value: "remote", label: "Remote work", emoji: "💻" },
      { value: "surf", label: "Surf trip", emoji: "🌊" },
      { value: "wellness", label: "Wellness / retreat", emoji: "🧘" },
      { value: "relocate", label: "Move to Bali", emoji: "🏡" },
      { value: "other", label: "Something else", emoji: "✨" },
    ],
  },
  {
    key: "when",
    question: "When are you coming?",
    type: "choice",
    options: [
      { value: "now", label: "I'm already here", emoji: "🛬" },
      { value: "1m", label: "Within a month", emoji: "📅" },
      { value: "3m", label: "In 1–3 months", emoji: "🗓️" },
      { value: "6m", label: "In 3–6 months", emoji: "⏳" },
      { value: "flex", label: "Just exploring", emoji: "👀" },
    ],
  },
  {
    key: "group",
    question: "Who's traveling?",
    type: "choice",
    options: [
      { value: "solo", label: "Solo", emoji: "🙋" },
      { value: "couple", label: "Couple", emoji: "💑" },
      { value: "friends", label: "Friends", emoji: "👯" },
      { value: "family", label: "Family", emoji: "👨‍👩‍👧" },
    ],
  },
  {
    key: "budget",
    question: "Rough monthly budget?",
    subtitle: "No wrong answer — we match anything.",
    type: "choice",
    options: [
      { value: "lt1k", label: "Under $1,000", emoji: "💵" },
      { value: "1-3k", label: "$1,000 – $3,000", emoji: "💰" },
      { value: "3-5k", label: "$3,000 – $5,000", emoji: "💎" },
      { value: "gt5k", label: "$5,000+", emoji: "👑" },
    ],
  },
  {
    key: "email",
    question: "Where should we send your Bali starter kit?",
    subtitle: "Custom pack + 1 free guide, unlocked at the end.",
    type: "email",
    placeholder: "you@email.com",
    optional: true,
  },
];

const BUSINESS_STEPS: Step[] = [
  {
    key: "type",
    question: "What kind of business?",
    type: "choice",
    options: [
      { value: "villa", label: "Villa / stay", emoji: "🏖️" },
      { value: "restaurant", label: "Restaurant / café", emoji: "🍽️" },
      { value: "spa", label: "Spa / wellness", emoji: "💆" },
      { value: "beach_club", label: "Beach club / bar", emoji: "🥂" },
      { value: "transport", label: "Transport / rentals", emoji: "🛵" },
      { value: "other", label: "Something else", emoji: "✨" },
    ],
  },
  {
    key: "goal",
    question: "What's your #1 goal right now?",
    type: "choice",
    options: [
      { value: "bookings", label: "More bookings", emoji: "📈" },
      { value: "brand", label: "Build the brand", emoji: "🎯" },
      { value: "social", label: "Grow social media", emoji: "📱" },
      { value: "ops", label: "Fix operations", emoji: "⚙️" },
      { value: "launch", label: "Launch a new offer", emoji: "🚀" },
    ],
  },
  {
    key: "socials",
    question: "Instagram handle (optional)",
    subtitle: "We use it to pre-scan your stats in the demo.",
    type: "text",
    placeholder: "@yourbusiness",
    optional: true,
  },
  {
    key: "budget",
    question: "Monthly marketing budget?",
    type: "choice",
    options: [
      { value: "lt500", label: "Under $500", emoji: "🌱" },
      { value: "500-2k", label: "$500 – $2,000", emoji: "🌿" },
      { value: "2-5k", label: "$2,000 – $5,000", emoji: "🌳" },
      { value: "gt5k", label: "$5,000+", emoji: "🏝️" },
      { value: "unsure", label: "Not sure yet", emoji: "🤔" },
    ],
  },
  {
    key: "email",
    question: "Where should we send your custom proposal?",
    subtitle: "Free audit + tailored plan within 24h.",
    type: "email",
    placeholder: "you@business.com",
    optional: true,
  },
];

export default function OnboardingClient({
  initialAudience,
  userEmail,
}: {
  initialAudience: Audience;
  userEmail: string | null;
}) {
  const [audience, setAudience] = useState<Audience>(initialAudience);
  const steps = useMemo(() => (audience === "business" ? BUSINESS_STEPS : TRAVELER_STEPS), [audience]);
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [email, setEmail] = useState(userEmail ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const step = steps[stepIdx];
  const isLast = stepIdx === steps.length - 1;
  const current = answers[step?.key] ?? "";
  const canNext = step?.optional || (step?.type === "email" ? !!email : !!current);

  async function submit() {
    setSubmitting(true);
    const finalAnswers = { ...answers };
    if (email) finalAnswers.email = email;
    // Save profile for logged-in users (ignore failure for guests)
    try {
      await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ audience, answers: finalAnswers, email: email || undefined }),
      });
    } catch {}
    // Capture email for guests
    if (email) {
      try {
        await fetch("/api/waitlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, source: "onboarding" }),
        });
      } catch {}
    }
    // Persist answers locally so we can hydrate on reload / attach to account later
    try {
      localStorage.setItem("skyrol_profile", JSON.stringify({ audience, answers: finalAnswers }));
    } catch {}
    setDone(true);
  }

  function next() {
    if (!canNext) return;
    if (isLast) {
      submit();
    } else {
      setStepIdx((i) => i + 1);
    }
  }

  function back() {
    if (stepIdx === 0) return;
    setStepIdx((i) => i - 1);
  }

  function pick(value: string) {
    setAnswers((a) => ({ ...a, [step.key]: value }));
    // auto-advance on choice, after small delay for visual feedback
    if (!isLast) setTimeout(() => setStepIdx((i) => i + 1), 180);
  }

  const progress = ((stepIdx + (done ? 1 : 0)) / steps.length) * 100;

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-md w-full text-center"
        >
          <div className="w-16 h-16 rounded-full bg-emerald/10 flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-emerald" />
          </div>
          <h1 className="text-3xl font-bold mb-3">You&apos;re all set.</h1>
          <p className="text-muted mb-8">
            We tailored your experience. {audience === "business"
              ? "Check your inbox for the custom proposal within 24h."
              : "Your Bali starter kit is ready."}
          </p>
          <a
            href={audience === "business" ? "/business" : "/"}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-white font-semibold text-sm hover:bg-foreground/90 transition-colors"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top bar with progress */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-border/60">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center">
            <Wordmark className="text-base" />
          </a>
          <div className="flex items-center gap-4">
            <div className="text-xs text-muted">
              {stepIdx + 1} of {steps.length}
            </div>
            <a
              href={audience === "business" ? "/business" : "/"}
              className="text-xs font-medium text-muted hover:text-foreground transition-colors"
            >
              Skip
            </a>
          </div>
        </div>
        <div className="h-1 bg-sand">
          <motion.div
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.35 }}
            className="h-full bg-coral"
          />
        </div>
      </div>

      {/* Audience sub-toggle */}
      <div className="max-w-3xl mx-auto w-full px-6 pt-6">
        <div className="inline-flex items-center gap-1 p-1 rounded-full bg-sand text-xs font-medium">
          <button
            onClick={() => { setAudience("traveler"); setStepIdx(0); setAnswers({}); }}
            className={`px-3 py-1.5 rounded-full transition-colors ${audience === "traveler" ? "bg-white shadow-sm text-foreground" : "text-muted hover:text-foreground"}`}
          >
            Traveler
          </button>
          <button
            onClick={() => { setAudience("business"); setStepIdx(0); setAnswers({}); }}
            className={`px-3 py-1.5 rounded-full transition-colors ${audience === "business" ? "bg-white shadow-sm text-foreground" : "text-muted hover:text-foreground"}`}
          >
            Business
          </button>
        </div>
      </div>

      {/* Step */}
      <div className="flex-1 flex items-start justify-center px-6 py-10">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${audience}-${stepIdx}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {stepIdx === 0 && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-coral/10 text-coral text-xs font-semibold mb-4">
                  <Sparkles className="w-3 h-3" />
                  Takes under 60s
                </div>
              )}
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
                {step.question}
              </h1>
              {step.subtitle && (
                <p className="text-muted mb-8">{step.subtitle}</p>
              )}
              {!step.subtitle && <div className="mb-8" />}

              {step.type === "choice" && step.options && (
                <div className="grid gap-2.5">
                  {step.options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => pick(opt.value)}
                      className={`group flex items-center gap-3 px-5 py-4 rounded-2xl border text-left transition-all ${
                        current === opt.value
                          ? "border-coral bg-coral-light"
                          : "border-border bg-white hover:border-foreground/30 hover:bg-sand/50"
                      }`}
                    >
                      {opt.emoji && <span className="text-xl">{opt.emoji}</span>}
                      <span className="font-semibold text-sm flex-1">{opt.label}</span>
                      {current === opt.value && (
                        <Check className="w-4 h-4 text-coral" />
                      )}
                    </button>
                  ))}
                </div>
              )}

              {(step.type === "text" || step.type === "email") && (
                <input
                  type={step.type === "email" ? "email" : "text"}
                  placeholder={step.placeholder}
                  value={step.type === "email" ? email : current}
                  onChange={(e) => {
                    if (step.type === "email") setEmail(e.target.value);
                    else setAnswers((a) => ({ ...a, [step.key]: e.target.value }));
                  }}
                  onKeyDown={(e) => { if (e.key === "Enter" && canNext) next(); }}
                  className="w-full px-5 py-4 rounded-2xl bg-white border border-border text-base focus:outline-none focus:border-foreground focus:ring-2 focus:ring-foreground/10 transition-all"
                  autoFocus
                />
              )}
            </motion.div>
          </AnimatePresence>

          {/* Nav */}
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={back}
              disabled={stepIdx === 0}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <div className="flex items-center gap-3">
              {step.optional && (
                <button
                  onClick={() => { if (isLast) submit(); else setStepIdx((i) => i + 1); }}
                  className="text-sm font-medium text-muted hover:text-foreground transition-colors"
                >
                  Skip
                </button>
              )}
              <button
                onClick={next}
                disabled={!canNext || submitting}
                className="inline-flex items-center gap-1.5 px-6 py-3 rounded-full bg-foreground text-white font-semibold text-sm hover:bg-foreground/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {isLast ? "Finish" : "Next"}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
