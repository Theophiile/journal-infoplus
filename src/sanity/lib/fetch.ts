import type { Image as SanityImageType } from "sanity";

import { client } from "./client";
import {
  ARTICLES_QUERY,
  ARTICLE_QUERY,
  ARTICLE_SLUGS_QUERY,
  ARTICLES_BY_CATEGORY_QUERY,
  CATEGORIES_QUERY,
  CATEGORY_QUERY,
  CATEGORY_SLUGS_QUERY,
} from "./queries";

export type ArticleCard = {
  _id: string;
  title: string;
  slug: string;
  mainImage?: SanityImage;
  excerpt?: string;
  publishedAt: string;
  category?: string;
  categorySlug?: string;
};

export type Article = ArticleCard & {
  body?: PortableTextBlock[];
};

// Types Sanity simplifiés pour éviter une dépendance lourde.
export type SanityImage = SanityImageType & { alt?: string };

export type PortableTextBlock = Record<string, unknown>;

const revalidate = 60; // secondes : le site se met à jour ~1 min après publication

export async function getArticles(): Promise<ArticleCard[]> {
  if (!client) return [];
  return client.fetch(ARTICLES_QUERY, {}, { next: { revalidate } });
}

export async function getArticle(slug: string): Promise<Article | null> {
  if (!client) return null;
  return client.fetch(ARTICLE_QUERY, { slug }, { next: { revalidate } });
}

export async function getArticleSlugs(): Promise<{ slug: string }[]> {
  if (!client) return [];
  return client.fetch(ARTICLE_SLUGS_QUERY, {}, { next: { revalidate } });
}

export type Category = { title: string; slug: string };

export async function getCategories(): Promise<Category[]> {
  if (!client) return [];
  return client.fetch(CATEGORIES_QUERY, {}, { next: { revalidate } });
}

export async function getCategory(slug: string): Promise<Category | null> {
  if (!client) return null;
  return client.fetch(CATEGORY_QUERY, { slug }, { next: { revalidate } });
}

export async function getCategorySlugs(): Promise<{ slug: string }[]> {
  if (!client) return [];
  return client.fetch(CATEGORY_SLUGS_QUERY, {}, { next: { revalidate } });
}

export async function getArticlesByCategory(
  slug: string
): Promise<ArticleCard[]> {
  if (!client) return [];
  return client.fetch(
    ARTICLES_BY_CATEGORY_QUERY,
    { slug },
    { next: { revalidate } }
  );
}
