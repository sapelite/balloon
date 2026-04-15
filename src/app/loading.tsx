export default function Loading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-background"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="flex items-center gap-3 text-foreground/50">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-coral opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-coral" />
        </span>
        <span className="text-sm font-medium tracking-wide">Loading…</span>
      </div>
    </div>
  );
}
