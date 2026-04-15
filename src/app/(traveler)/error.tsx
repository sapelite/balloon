"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCcw, Home } from "lucide-react";
import Wordmark from "@/components/Wordmark";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 lg:px-10 py-5 border-b border-foreground/5">
        <Link href="/" className="inline-flex items-center">
          <Wordmark className="text-xl" />
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-lg mx-auto text-center py-20">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5">
            Something went <span className="gradient-text">sideways</span>.
          </h1>
          <p className="text-foreground/60 mb-9">
            We hit an unexpected error. Try again — or head back home and we&apos;ll sort it out.
          </p>
          {error.digest && (
            <p className="text-xs text-foreground/40 font-mono mb-6">
              Ref · {error.digest}
            </p>
          )}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-coral text-white font-semibold text-sm shadow-[0_2px_8px_rgba(255,56,92,0.25)] hover:shadow-[0_4px_16px_rgba(255,56,92,0.35)] transition-all"
            >
              <RefreshCcw className="w-4 h-4" />
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-foreground/70 font-semibold text-sm hover:bg-foreground/5 transition-all"
            >
              <Home className="w-4 h-4" />
              Back to home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
