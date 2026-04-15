"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { ArrowRight, ArrowLeft, Check, Sparkles } from "lucide-react";
import Wordmark from "@/components/Wordmark";

type Audience = "traveler" | "entrepreneur";

type Step = {
  key: string;
  question: string;
  subtitle?: string;
  type: "choice" | "multichoice" | "text" | "email" | "date";
  options?: { value: string; label: string; emoji?: string; hint?: string }[];
  placeholder?: string;
  optional?: boolean;
};

const TRAVELER_STEPS: Step[] = [
  {
    key: "when",
    question: "When are you coming to Bali?",
    subtitle: "Roughly is fine — helps us plan around seasons and availability.",
    type: "date",
    placeholder: "Arrival date",
  },
  {
    key: "duration",
    question: "How long are you staying?",
    type: "choice",
    options: [
      { value: "lt7", label: "Less than a week", emoji: "⚡" },
      { value: "1-2w", label: "1 – 2 weeks", emoji: "🌴" },
      { value: "2-4w", label: "2 – 4 weeks", emoji: "🗓️" },
      { value: "1m+", label: "A month or more", emoji: "🏝️" },
      { value: "open", label: "Open-ended", emoji: "✨" },
    ],
  },
  {
    key: "budget",
    question: "What's your trip budget?",
    subtitle: "Per person, excluding flights.",
    type: "choice",
    options: [
      { value: "lt1k", label: "Under $1,000", emoji: "💵" },
      { value: "1-3k", label: "$1,000 – $3,000", emoji: "💰" },
      { value: "3-7k", label: "$3,000 – $7,000", emoji: "💎" },
      { value: "gt7k", label: "$7,000+", emoji: "👑" },
    ],
  },
  {
    key: "mood",
    question: "What's the mood of your trip?",
    subtitle: "Pick the vibe that fits best.",
    type: "choice",
    options: [
      { value: "chill", label: "Chill & recharge", emoji: "🧘" },
      { value: "discover", label: "Explore & discover", emoji: "🗺️" },
      { value: "party", label: "Parties & nightlife", emoji: "🎉" },
      { value: "surf", label: "Surf & ocean", emoji: "🌊" },
      { value: "wellness", label: "Wellness & retreat", emoji: "🌿" },
      { value: "family", label: "Family-friendly", emoji: "👨‍👩‍👧" },
    ],
  },
  {
    key: "group",
    question: "Who's coming with you?",
    type: "choice",
    options: [
      { value: "solo", label: "Solo", emoji: "🙋" },
      { value: "couple", label: "Couple", emoji: "💑" },
      { value: "friends", label: "Friends", emoji: "👯" },
      { value: "family", label: "Family", emoji: "👨‍👩‍👧" },
    ],
  },
  {
    key: "services",
    question: "What do you want us to handle?",
    subtitle: "Pick anything — you'll see exact pricing after.",
    type: "multichoice",
    options: [
      { value: "hotel", label: "Hotel / villa booking", emoji: "🏨", hint: "Hand-picked in Canggu, Uluwatu, Ubud" },
      { value: "driver", label: "Private English-speaking driver", emoji: "🚘", hint: "Doubles as a local guide" },
      { value: "itinerary", label: "Custom day-by-day itinerary", emoji: "🗺️" },
      { value: "restaurants", label: "Restaurant reservations", emoji: "🍽️" },
      { value: "concierge", label: "24/7 on-island concierge", emoji: "📞", hint: "WhatsApp us, anytime" },
      { value: "experiences", label: "Curated experiences", emoji: "🌋", hint: "Volcano sunrise, surf lessons, spas" },
    ],
  },
];

const ENTREPRENEUR_STEPS: Step[] = [
  {
    key: "type",
    question: "What kind of business do you run?",
    type: "choice",
    options: [
      { value: "villa", label: "Villa / stay", emoji: "🏖️" },
      { value: "restaurant", label: "Restaurant / café", emoji: "🍽️" },
      { value: "spa", label: "Spa / wellness", emoji: "💆" },
      { value: "beach_club", label: "Beach club / bar", emoji: "🥂" },
      { value: "agency", label: "Agency / services", emoji: "💼" },
      { value: "creator", label: "Creator / influencer", emoji: "📸" },
      { value: "other", label: "Something else", emoji: "✨" },
    ],
  },
  {
    key: "presence",
    question: "Do you already have an online presence?",
    type: "choice",
    options: [
      { value: "yes_strong", label: "Yes — and it's performing", emoji: "🚀" },
      { value: "yes_weak", label: "Yes — but it's underperforming", emoji: "🫠" },
      { value: "basic", label: "Basic (social only, no site)", emoji: "📱" },
      { value: "none", label: "Nothing yet", emoji: "🌱" },
    ],
  },
  {
    key: "instagram",
    question: "Instagram handle?",
    subtitle: "Optional — helps us scan your stats.",
    type: "text",
    placeholder: "@yourbusiness",
    optional: true,
  },
  {
    key: "website",
    question: "Website URL?",
    subtitle: "Optional — leave blank if you don't have one.",
    type: "text",
    placeholder: "yoursite.com",
    optional: true,
  },
  {
    key: "services",
    question: "What do you need from us?",
    subtitle: "Pick everything that applies.",
    type: "multichoice",
    options: [
      { value: "website", label: "A new website", emoji: "🖥️" },
      { value: "crm", label: "CRM for bookings & clients", emoji: "📇" },
      { value: "social", label: "Social media management", emoji: "📱" },
      { value: "ads", label: "Paid ads (Meta / Google)", emoji: "🎯" },
      { value: "photo", label: "Photoshoot production", emoji: "📸" },
      { value: "events", label: "Event production", emoji: "🎪" },
      { value: "network", label: "Access to founder network", emoji: "🤝" },
    ],
  },
  {
    key: "goal",
    question: "What's your #1 goal right now?",
    type: "choice",
    options: [
      { value: "bookings", label: "More bookings / revenue", emoji: "📈" },
      { value: "brand", label: "Build the brand", emoji: "🎯" },
      { value: "launch", label: "Launch a new offer", emoji: "🚀" },
      { value: "ops", label: "Fix operations", emoji: "⚙️" },
      { value: "network", label: "Meet other founders", emoji: "🤝" },
    ],
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
];

const STEPS_BY_AUDIENCE: Record<Audience, Step[]> = {
  traveler: TRAVELER_STEPS,
  entrepreneur: ENTREPRENEUR_STEPS,
};

const NEXT_BY_AUDIENCE: Record<Audience, string> = {
  traveler: "/dashboard",
  entrepreneur: "/dashboard",
};

export default function OnboardingClient({
  initialAudience,
  userEmail,
}: {
  initialAudience: Audience;
  userEmail: string | null;
}) {
  const [audience, setAudience] = useState<Audience>(initialAudience);
  const steps = useMemo(() => STEPS_BY_AUDIENCE[audience], [audience]);
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const step = steps[stepIdx];
  const isLast = stepIdx === steps.length - 1;
  const currentValue = answers[step?.key];
  const canNext = (() => {
    if (step?.optional) return true;
    if (!currentValue) return false;
    if (Array.isArray(currentValue)) return currentValue.length > 0;
    return !!currentValue;
  })();

  async function submit() {
    setSubmitting(true);
    try {
      await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ audience, answers, email: userEmail || undefined }),
      });
    } catch {}
    try {
      localStorage.setItem("skyrol_profile", JSON.stringify({ audience, answers }));
    } catch {}
    setDone(true);
    setTimeout(() => {
      window.location.href = NEXT_BY_AUDIENCE[audience];
    }, 900);
  }

  function next() {
    if (!canNext) return;
    if (isLast) submit();
    else setStepIdx((i) => i + 1);
  }

  function back() {
    if (stepIdx === 0) return;
    setStepIdx((i) => i - 1);
  }

  function pickSingle(value: string) {
    setAnswers((a) => ({ ...a, [step.key]: value }));
    if (!isLast) setTimeout(() => setStepIdx((i) => i + 1), 180);
  }

  function toggleMulti(value: string) {
    setAnswers((a) => {
      const existing = Array.isArray(a[step.key]) ? (a[step.key] as string[]) : [];
      const nextArr = existing.includes(value)
        ? existing.filter((v) => v !== value)
        : [...existing, value];
      return { ...a, [step.key]: nextArr };
    });
  }

  function switchAudience(a: Audience) {
    setAudience(a);
    setStepIdx(0);
    setAnswers({});
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
            We&apos;re tailoring your Skyrol experience — redirecting you now.
          </p>
        </motion.div>
      </div>
    );
  }

  const currentArray = Array.isArray(currentValue) ? (currentValue as string[]) : [];
  const currentString = typeof currentValue === "string" ? currentValue : "";

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-border/60">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center">
            <Wordmark className="text-base" />
          </a>
          <div className="text-xs text-muted">
            {stepIdx + 1} of {steps.length}
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

      <div className="max-w-3xl mx-auto w-full px-6 pt-6">
        <div className="inline-flex items-center gap-1 p-1 rounded-full bg-sand text-xs font-medium">
          {(["traveler", "entrepreneur"] as Audience[]).map((a) => (
            <button
              key={a}
              onClick={() => switchAudience(a)}
              className={`px-3 py-1.5 rounded-full transition-colors capitalize ${
                audience === a
                  ? "bg-white shadow-sm text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

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
              {step.subtitle && <p className="text-muted mb-8">{step.subtitle}</p>}
              {!step.subtitle && <div className="mb-8" />}

              {step.type === "choice" && step.options && (
                <div className="grid gap-2.5">
                  {step.options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => pickSingle(opt.value)}
                      className={`group flex items-center gap-3 px-5 py-4 rounded-2xl border text-left transition-all ${
                        currentString === opt.value
                          ? "border-coral bg-coral-light"
                          : "border-border bg-white hover:border-foreground/30 hover:bg-sand/50"
                      }`}
                    >
                      {opt.emoji && <span className="text-xl">{opt.emoji}</span>}
                      <span className="font-semibold text-sm flex-1">{opt.label}</span>
                      {currentString === opt.value && <Check className="w-4 h-4 text-coral" />}
                    </button>
                  ))}
                </div>
              )}

              {step.type === "multichoice" && step.options && (
                <div className="grid gap-2.5">
                  {step.options.map((opt) => {
                    const selected = currentArray.includes(opt.value);
                    return (
                      <button
                        key={opt.value}
                        onClick={() => toggleMulti(opt.value)}
                        className={`group flex items-start gap-3 px-5 py-4 rounded-2xl border text-left transition-all ${
                          selected
                            ? "border-coral bg-coral-light"
                            : "border-border bg-white hover:border-foreground/30 hover:bg-sand/50"
                        }`}
                      >
                        {opt.emoji && <span className="text-xl mt-0.5">{opt.emoji}</span>}
                        <div className="flex-1">
                          <div className="font-semibold text-sm">{opt.label}</div>
                          {opt.hint && (
                            <div className="text-xs text-muted mt-0.5">{opt.hint}</div>
                          )}
                        </div>
                        <div
                          className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                            selected ? "border-coral bg-coral" : "border-border"
                          }`}
                        >
                          {selected && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {(step.type === "text" || step.type === "email") && (
                <input
                  type={step.type === "email" ? "email" : "text"}
                  placeholder={step.placeholder}
                  value={currentString}
                  onChange={(e) =>
                    setAnswers((a) => ({ ...a, [step.key]: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && canNext) next();
                  }}
                  className="w-full px-5 py-4 rounded-2xl bg-white border border-border text-base focus:outline-none focus:border-foreground focus:ring-2 focus:ring-foreground/10 transition-all"
                  autoFocus
                />
              )}

              {step.type === "date" && (
                <input
                  type="date"
                  placeholder={step.placeholder}
                  value={currentString}
                  onChange={(e) =>
                    setAnswers((a) => ({ ...a, [step.key]: e.target.value }))
                  }
                  min={new Date().toISOString().slice(0, 10)}
                  className="w-full px-5 py-4 rounded-2xl bg-white border border-border text-base focus:outline-none focus:border-foreground focus:ring-2 focus:ring-foreground/10 transition-all"
                  autoFocus
                />
              )}
            </motion.div>
          </AnimatePresence>

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
                  onClick={() => {
                    if (isLast) submit();
                    else setStepIdx((i) => i + 1);
                  }}
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
                    {isLast ? "Finish" : step.type === "multichoice" ? "Next" : "Next"}
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
