import type { MetadataRoute } from "next";
import { supabaseAdmin } from "@/lib/supabase";

const SITE_URL = "https://journal-infoplus.fr";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: articles } = await supabaseAdmin
    .from("articles")
    .select("id, created_at")
    .order("created_at", { ascending: false });

  const articleUrls: MetadataRoute.Sitemap = (articles ?? []).map((a) => ({
    url: `${SITE_URL}/article/${a.id}`,
    lastModified: new Date(a.created_at),
    changeFrequency: "never",
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...articleUrls,
  ];
}
