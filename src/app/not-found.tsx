import Link from "next/link";
import { ArrowLeft, Home, MapPin } from "lucide-react";
import Wordmark from "@/components/Wordmark";

export const metadata = {
  title: "Page not found",
  description: "This page took a detour to the rice fields. Let us point you home.",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 lg:px-10 py-5 border-b border-foreground/5">
        <Link href="/" className="inline-flex items-center">
          <Wordmark className="text-xl" />
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-lg mx-auto text-center py-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-coral/10 border border-coral/15 mb-6">
            <MapPin className="w-4 h-4 text-coral" />
            <span className="text-sm font-medium text-coral">404 · Off the map</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5">
            This page took a <span className="gradient-text">detour</span>.
          </h1>
          <p className="text-foreground/60 mb-9">
            The page you&apos;re looking for doesn&apos;t exist — or it&apos;s still on island time.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-coral text-white font-semibold text-sm shadow-[0_2px_8px_rgba(255,56,92,0.25)] hover:shadow-[0_4px_16px_rgba(255,56,92,0.35)] transition-all"
            >
              <Home className="w-4 h-4" />
              Back to home
            </Link>
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-foreground/70 font-semibold text-sm hover:bg-foreground/5 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              Browse free guides
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
