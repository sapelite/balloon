"use client";

const CORAL = "#FF385C";
const FG = "#222222";

function Card({ name, tagline, children }: { name: string; tagline: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-border rounded-3xl p-8 shadow-airbnb">
      <div className="flex items-center justify-center h-32 mb-6">{children}</div>
      <div className="border-t border-border pt-4">
        <p className="font-bold text-sm">{name}</p>
        <p className="text-xs text-muted mt-1">{tagline}</p>
      </div>
    </div>
  );
}

function Wordmark({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mt-6">
      {children}
      <span className="text-2xl font-bold tracking-tight text-foreground">
        Sky<span style={{ color: CORAL }}>r</span>ol
      </span>
    </div>
  );
}

export default function LogosPage() {
  return (
    <div className="min-h-screen bg-sand/40 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
            Logo concepts for Sky<span style={{ color: CORAL }}>r</span>ol
          </h1>
          <p className="text-muted">Pick your favorite — or mix and match.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. Horizon — sun rising over a curved horizon. Says "sky" + warmth. */}
          <Card name="01 — Horizon" tagline="Sun rising over a curved horizon. Calm, optimistic, distinctly Bali.">
            <div className="flex flex-col items-center">
              <svg width="72" height="72" viewBox="0 0 64 64">
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={CORAL} />
                    <stop offset="100%" stopColor="#E00B41" />
                  </linearGradient>
                </defs>
                <rect width="64" height="64" rx="16" fill="url(#g1)" />
                <circle cx="32" cy="36" r="10" fill="white" />
                <path d="M8 44 Q32 32 56 44 L56 56 L8 56 Z" fill="white" opacity="0.95" />
                <path d="M8 44 Q32 32 56 44" stroke={FG} strokeWidth="0" fill="none" />
              </svg>
              <Wordmark>{null}</Wordmark>
            </div>
          </Card>

          {/* 2. Roll — wave/scroll forming an S. Plays on "Sky-rol" = sky + roll. */}
          <Card name="02 — The Roll" tagline="A wave that becomes an 'S'. Plays on Sky·rol = sky + roll.">
            <div className="flex flex-col items-center">
              <svg width="72" height="72" viewBox="0 0 64 64">
                <rect width="64" height="64" rx="16" fill={FG} />
                <path
                  d="M16 22 Q24 14 32 22 T48 22 M16 32 Q24 24 32 32 T48 32 M16 42 Q24 34 32 42 T48 42"
                  stroke={CORAL}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <Wordmark>{null}</Wordmark>
            </div>
          </Card>

          {/* 3. Frangipani — five-petal Bali flower, simplified. Cultural anchor. */}
          <Card name="03 — Frangipani" tagline="Bali's iconic flower, geometricized. Cultural and warm.">
            <div className="flex flex-col items-center">
              <svg width="72" height="72" viewBox="0 0 64 64">
                <rect width="64" height="64" rx="16" fill="white" stroke={FG} strokeWidth="2" />
                <g transform="translate(32 32)">
                  {[0, 72, 144, 216, 288].map((angle) => (
                    <ellipse
                      key={angle}
                      cx="0"
                      cy="-11"
                      rx="6"
                      ry="11"
                      fill={CORAL}
                      opacity="0.92"
                      transform={`rotate(${angle})`}
                    />
                  ))}
                  <circle r="4" fill="#F4C86A" />
                </g>
              </svg>
              <Wordmark>{null}</Wordmark>
            </div>
          </Card>

          {/* 4. Compass S — monogram S as a compass needle. Travel + direction. */}
          <Card name="04 — Compass S" tagline="An 'S' monogram drawn like a compass needle. Travel-coded.">
            <div className="flex flex-col items-center">
              <svg width="72" height="72" viewBox="0 0 64 64">
                <circle cx="32" cy="32" r="30" fill="none" stroke={FG} strokeWidth="2.5" />
                <path
                  d="M22 42 Q22 32 32 32 Q42 32 42 22"
                  stroke={CORAL}
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="22" cy="42" r="3" fill={CORAL} />
                <circle cx="42" cy="22" r="3" fill={CORAL} />
              </svg>
              <Wordmark>{null}</Wordmark>
            </div>
          </Card>

          {/* 5. Cloud + Pin — minimal cloud holding a coral dot. Sky + place. */}
          <Card name="05 — Skydot" tagline="A soft cloud cradling a coral dot. Light, modern, on-name.">
            <div className="flex flex-col items-center">
              <svg width="72" height="72" viewBox="0 0 64 64">
                <rect width="64" height="64" rx="16" fill="#F2EAF8" />
                <path
                  d="M18 38 Q14 38 14 33 Q14 28 19 28 Q20 22 27 22 Q34 22 35 28 Q41 28 42 33 Q47 33 47 38 Q47 42 43 42 L21 42 Q18 42 18 38 Z"
                  fill="white"
                />
                <circle cx="31" cy="46" r="4" fill={CORAL} />
              </svg>
              <Wordmark>{null}</Wordmark>
            </div>
          </Card>

          {/* 6. Wordmark only — letterforms with the 'r' as a wave. */}
          <Card name="06 — Letter as wave" tagline="No mark — the 'r' itself becomes a small wave.">
            <div className="flex flex-col items-center justify-center">
              <div className="text-[2.75rem] font-bold tracking-tight leading-none">
                <span>Sky</span>
                <span style={{ color: CORAL, position: "relative", display: "inline-block" }}>
                  <svg width="22" height="48" viewBox="0 0 22 48" style={{ verticalAlign: "middle" }}>
                    <path
                      d="M3 38 V18 Q3 8 12 8 Q19 8 19 14 Q19 18 14 19 Q9 20 5 26"
                      stroke={CORAL}
                      strokeWidth="5"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                </span>
                <span>ol</span>
              </div>
              <p className="text-xs text-muted mt-3 tracking-[0.3em] uppercase">Bali, in one click</p>
            </div>
          </Card>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-3xl border border-border">
            <p className="text-xs font-semibold text-muted uppercase tracking-[0.2em] mb-4">On dark</p>
            <div className="bg-foreground rounded-2xl p-10 flex items-center justify-center">
              <span className="text-3xl font-bold tracking-tight text-white">
                Sky<span style={{ color: CORAL }}>r</span>ol
              </span>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-border">
            <p className="text-xs font-semibold text-muted uppercase tracking-[0.2em] mb-4">Favicon</p>
            <div className="flex items-center gap-4">
              {[16, 32, 48, 64].map((s) => (
                <div key={s} className="flex flex-col items-center gap-1">
                  <div
                    className="rounded-md flex items-center justify-center text-white font-bold"
                    style={{
                      width: s,
                      height: s,
                      background: `linear-gradient(135deg, ${CORAL} 0%, #E00B41 100%)`,
                      fontSize: s * 0.5,
                    }}
                  >
                    S
                  </div>
                  <span className="text-[10px] text-muted">{s}px</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
