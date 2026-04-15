"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Eye,
  Users,
  Heart,
  MousePointerClick,
  Calendar,
  Camera,
  Music2,
  Globe,
  Sparkles,
  ArrowUpRight,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  Clock,
  Zap,
} from "lucide-react";

type Metric = {
  platform: string;
  metricKey: string;
  value: number;
  delta: number | null;
  periodLabel: string | null;
};

type Insight = {
  id: string;
  title: string;
  body: string;
  priority: string;
  status: string;
  category: string | null;
};

type Content = {
  id: string;
  platform: string;
  caption: string | null;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  publishedAt: Date;
};

type Briefing = {
  summary: string;
  body: string;
  nextAction: string | null;
  healthScore: number;
} | null;

type Client = {
  id: string;
  businessName: string;
  industry: string | null;
  plan: string;
  instagramHandle: string | null;
  tiktokHandle: string | null;
};

function fmtNum(n: number) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "k";
  return n.toFixed(0);
}

function platformIcon(p: string) {
  if (p === "instagram") return Camera;
  if (p === "tiktok") return Music2;
  return Globe;
}

function platformColor(p: string) {
  if (p === "instagram") return "text-coral";
  if (p === "tiktok") return "text-foreground";
  return "text-lagoon";
}

export default function BusinessDashboardClient({
  client,
  briefing,
  metrics,
  insights,
  content,
}: {
  client: Client;
  briefing: Briefing;
  metrics: Metric[];
  insights: Insight[];
  content: Content[];
}) {
  // Latest metric value per platform+key
  const latest = (platform: string, key: string) => {
    const list = metrics
      .filter((m) => m.platform === platform && m.metricKey === key)
      .sort((a, b) => (a.periodLabel || "").localeCompare(b.periodLabel || ""));
    return list[list.length - 1];
  };

  const kpis = [
    { label: "Instagram views", m: latest("instagram", "views"), icon: Eye, color: "text-coral" },
    { label: "TikTok views", m: latest("tiktok", "views"), icon: Eye, color: "text-foreground" },
    { label: "IG followers", m: latest("instagram", "followers"), icon: Users, color: "text-coral" },
    { label: "TikTok followers", m: latest("tiktok", "followers"), icon: Users, color: "text-foreground" },
    { label: "IG engagement", m: latest("instagram", "engagement"), icon: Heart, color: "text-gold", suffix: "%" },
    { label: "Site conversion", m: latest("website", "conversion"), icon: MousePointerClick, color: "text-emerald", suffix: "%" },
    { label: "Direct bookings", m: latest("website", "bookings"), icon: Calendar, color: "text-lagoon" },
    { label: "Site visitors", m: latest("website", "visitors"), icon: Globe, color: "text-lagoon" },
  ];

  const igViewsChart = metrics
    .filter((m) => m.platform === "instagram" && m.metricKey === "views")
    .sort((a, b) => (a.periodLabel || "").localeCompare(b.periodLabel || ""));
  const maxIg = Math.max(...igViewsChart.map((m) => m.value), 1);

  const tiktokViewsChart = metrics
    .filter((m) => m.platform === "tiktok" && m.metricKey === "views")
    .sort((a, b) => (a.periodLabel || "").localeCompare(b.periodLabel || ""));
  const maxTt = Math.max(...tiktokViewsChart.map((m) => m.value), 1);

  const score = briefing?.healthScore ?? 0;
  const scoreColor = score >= 80 ? "text-emerald" : score >= 60 ? "text-gold" : "text-coral";
  const scoreBg = score >= 80 ? "bg-emerald/10" : score >= 60 ? "bg-gold/10" : "bg-coral/10";

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-white border-b border-foreground/5 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <a href="/business" aria-label="Back to Skyrol Business" className="w-9 h-9 rounded-full bg-foreground/[0.04] hover:bg-foreground/[0.08] flex items-center justify-center transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </a>
            <div className="w-11 h-11 rounded-xl bg-linear-to-br from-coral to-gold flex items-center justify-center text-white font-bold">
              {client.businessName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-[1.05rem] leading-tight">{client.businessName}</p>
              <p className="text-xs text-foreground/50">
                {client.industry} · Skyrol Business <span className="text-coral font-semibold uppercase">{client.plan}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 text-[0.7rem] font-semibold px-3 py-1.5 rounded-full bg-emerald/10 text-emerald">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
              Live
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 space-y-8">
        {/* Briefing + Score */}
        {briefing && (
          <div className="grid lg:grid-cols-[1fr_auto] gap-5">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-linear-to-br from-foreground to-[#2A2A4E] text-white p-6 lg:p-7 relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-coral/20 blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-gold" />
                  <p className="text-[0.7rem] uppercase tracking-[0.15em] text-white/60 font-semibold">
                    Today&apos;s briefing
                  </p>
                </div>
                <h2 className="text-[1.35rem] lg:text-[1.6rem] font-bold leading-tight mb-3">
                  {briefing.summary}
                </h2>
                <p className="text-white/75 text-sm leading-relaxed mb-4">{briefing.body}</p>
                {briefing.nextAction && (
                  <div className="flex items-start gap-2.5 pt-4 border-t border-white/10">
                    <Zap className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[0.7rem] uppercase tracking-wider text-white/50 font-semibold mb-1">
                        Next action
                      </p>
                      <p className="text-sm text-white/90">{briefing.nextAction}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl border border-foreground/5 p-6 lg:w-[220px] flex flex-col items-center justify-center"
            >
              <p className="text-[0.7rem] uppercase tracking-wider text-foreground/40 font-semibold mb-3">
                Health score
              </p>
              <div className={`w-24 h-24 rounded-full ${scoreBg} flex items-center justify-center mb-2`}>
                <span className={`text-[2.25rem] font-bold ${scoreColor}`}>{score}</span>
              </div>
              <p className="text-sm font-semibold">
                {score >= 80 ? "Excellent" : score >= 60 ? "Good" : "Needs work"}
              </p>
              <p className="text-xs text-foreground/45 text-center mt-1">
                Based on reach, engagement, conversion & cadence
              </p>
            </motion.div>
          </div>
        )}

        {/* KPI grid */}
        <div>
          <h3 className="text-[0.75rem] font-semibold text-foreground/50 uppercase tracking-[0.15em] mb-3">
            Key metrics · last 7 days
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {kpis.map((kpi, i) => (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="bg-white rounded-2xl border border-foreground/5 p-4 hover:border-coral/20 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <kpi.icon className={`w-4 h-4 ${kpi.color}`} />
                  {kpi.m?.delta != null && (
                    <span
                      className={`inline-flex items-center gap-0.5 text-[0.65rem] font-bold ${
                        kpi.m.delta >= 0 ? "text-emerald" : "text-coral"
                      }`}
                    >
                      {kpi.m.delta >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {kpi.m.delta >= 0 ? "+" : ""}
                      {kpi.m.delta.toFixed(1)}%
                    </span>
                  )}
                </div>
                <p className="text-[1.5rem] font-bold tracking-tight leading-none">
                  {kpi.m ? fmtNum(kpi.m.value) : "—"}
                  {kpi.suffix && kpi.m ? <span className="text-sm text-foreground/40 font-semibold ml-0.5">{kpi.suffix}</span> : null}
                </p>
                <p className="text-[0.72rem] text-foreground/50 mt-1">{kpi.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Charts: IG + TikTok views over time */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-foreground/5 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-coral" />
                <p className="font-semibold text-sm">Instagram views</p>
              </div>
              {igViewsChart.length > 1 && (
                <p className="text-xs text-emerald font-semibold">
                  +{(((igViewsChart[igViewsChart.length - 1].value - igViewsChart[0].value) / igViewsChart[0].value) * 100).toFixed(0)}% vs W1
                </p>
              )}
            </div>
            <div className="flex items-end gap-2 h-28 mb-2">
              {igViewsChart.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${(m.value / maxIg) * 100}%` }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                  className="flex-1 rounded-t bg-linear-to-t from-coral/40 via-coral to-gold"
                />
              ))}
            </div>
            <div className="flex justify-between text-[0.65rem] text-foreground/40">
              {igViewsChart.map((m) => (
                <span key={m.periodLabel}>{m.periodLabel}</span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-foreground/5 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Music2 className="w-4 h-4 text-foreground" />
                <p className="font-semibold text-sm">TikTok views</p>
              </div>
              {tiktokViewsChart.length > 1 && (
                <p className="text-xs text-emerald font-semibold">
                  +{(((tiktokViewsChart[tiktokViewsChart.length - 1].value - tiktokViewsChart[0].value) / tiktokViewsChart[0].value) * 100).toFixed(0)}% vs W1
                </p>
              )}
            </div>
            <div className="flex items-end gap-2 h-28 mb-2">
              {tiktokViewsChart.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${(m.value / maxTt) * 100}%` }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                  className="flex-1 rounded-t bg-linear-to-t from-foreground/40 via-foreground to-lagoon"
                />
              ))}
            </div>
            <div className="flex justify-between text-[0.65rem] text-foreground/40">
              {tiktokViewsChart.map((m) => (
                <span key={m.periodLabel}>{m.periodLabel}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Insights + Top content */}
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-5">
          {/* Insights */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[0.75rem] font-semibold text-foreground/50 uppercase tracking-[0.15em]">
                Priority actions
              </h3>
              <span className="text-xs text-foreground/40">
                {insights.filter((i) => i.status === "open").length} open
              </span>
            </div>
            <div className="space-y-3">
              {insights.map((ins, i) => {
                const pri = ins.priority;
                const icon =
                  pri === "high" ? AlertCircle : pri === "normal" ? Clock : CheckCircle2;
                const Icon = icon;
                const priColor =
                  pri === "high" ? "text-coral bg-coral/10" : pri === "normal" ? "text-gold bg-gold/10" : "text-emerald bg-emerald/10";
                return (
                  <motion.div
                    key={ins.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white rounded-2xl border border-foreground/5 p-4 flex items-start gap-3 hover:border-coral/20 transition-colors"
                  >
                    <div className={`w-9 h-9 rounded-xl ${priColor} flex items-center justify-center shrink-0`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-sm">{ins.title}</p>
                        {ins.category && (
                          <span className="text-[0.6rem] uppercase tracking-wider text-foreground/40 font-semibold">
                            {ins.category}
                          </span>
                        )}
                      </div>
                      <p className="text-[0.82rem] text-foreground/60 leading-relaxed">{ins.body}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Top content */}
          <div>
            <h3 className="text-[0.75rem] font-semibold text-foreground/50 uppercase tracking-[0.15em] mb-3">
              Top content · last 14 days
            </h3>
            <div className="space-y-2">
              {content.slice(0, 5).map((c, i) => {
                const Icon = platformIcon(c.platform);
                const color = platformColor(c.platform);
                return (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white rounded-2xl border border-foreground/5 p-3 flex items-center gap-3 hover:border-coral/20 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-foreground/5 flex items-center justify-center shrink-0 ${color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[0.82rem] font-semibold truncate">{c.caption}</p>
                      <div className="flex items-center gap-3 text-[0.7rem] text-foreground/50 mt-0.5">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" /> {fmtNum(c.views)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" /> {fmtNum(c.likes)}
                        </span>
                        <span>{fmtNum(c.comments)} comments</span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-foreground/30 shrink-0" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
