import Link from "next/link";
import { Home } from "lucide-react";
import Wordmark from "@/components/Wordmark";

export const metadata = {
  title: "Page not found",
};

export default function BusinessNotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="px-6 lg:px-10 py-5 border-b border-border">
        <Link href="/business" className="inline-flex items-center">
          <Wordmark className="text-xl" variant="business" />
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-lg mx-auto text-center py-20">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-5">
            This page moved on.
          </h1>
          <p className="text-foreground/60 mb-9">
            The link may be stale. Head back to the agency homepage.
          </p>
          <Link
            href="/business"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-lagoon text-white font-semibold text-sm hover:bg-lagoon-dark transition-all"
          >
            <Home className="w-4 h-4" />
            Back to Skyrol Business
          </Link>
        </div>
      </main>
    </div>
  );
}
