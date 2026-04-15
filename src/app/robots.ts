import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://skyrol.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/dashboard", "/checkout", "/onboarding", "/investors", "/trip-guide"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
