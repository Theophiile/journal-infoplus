import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { ArticleCard } from "@/components/ArticleCard";
import {
  getArticlesByCategory,
  getCategory,
  getCategorySlugs,
} from "@/sanity/lib/fetch";

export async function generateStaticParams() {
  const slugs = await getCategorySlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) return { title: "Rubrique introuvable" };
  return { title: category.title };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) notFound();

  const articles = await getArticlesByCategory(slug);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link
        href="/"
        className="text-xs uppercase tracking-wide text-muted hover:text-accent"
      >
        ← Retour à l&apos;accueil
      </Link>

      <h1 className="mt-4 font-display text-4xl sm:text-5xl uppercase tracking-tight border-b-2 border-foreground pb-3">
        {category.title}
      </h1>

      {articles.length === 0 ? (
        <p className="mt-10 text-center text-muted">
          Aucun article dans cette rubrique pour l&apos;instant.
        </p>
      ) : (
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
