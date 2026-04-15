import type { MetadataRoute } from "next";
import { db } from "@/lib/db";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://skyrol.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/business`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/partners`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/auth`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
  ];

  const [guides, partners] = await Promise.all([
    db.guide.findMany({ select: { slug: true, updatedAt: true } }).catch(() => []),
    db.partner.findMany({ select: { slug: true, updatedAt: true } }).catch(() => []),
  ]);

  const guideRoutes: MetadataRoute.Sitemap = guides.map((g) => ({
    url: `${SITE_URL}/guides/${g.slug}`,
    lastModified: g.updatedAt ?? now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const partnerRoutes: MetadataRoute.Sitemap = partners.map((p) => ({
    url: `${SITE_URL}/partners/${p.slug}`,
    lastModified: p.updatedAt ?? now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...guideRoutes, ...partnerRoutes];
}
