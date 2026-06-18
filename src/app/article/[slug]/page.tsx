import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { PortableText } from "@/components/PortableText";
import { getArticle, getArticleSlugs } from "@/sanity/lib/fetch";
import { urlForImage } from "@/sanity/lib/image";

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return { title: "Article introuvable" };
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) notFound();

  const img = article.mainImage?.asset
    ? urlForImage(article.mainImage).width(1600).height(900).fit("crop").url()
    : null;

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <Link
        href="/"
        className="text-xs uppercase tracking-wide text-muted hover:text-accent"
      >
        ← Retour à l&apos;accueil
      </Link>

      <header className="mt-6 text-center">
        {article.category ? (
          article.categorySlug ? (
            <Link
              href={`/rubrique/${article.categorySlug}`}
              className="text-sm font-bold uppercase tracking-wider text-accent hover:underline"
            >
              {article.category}
            </Link>
          ) : (
            <span className="text-sm font-bold uppercase tracking-wider text-accent">
              {article.category}
            </span>
          )
        ) : null}
        <h1 className="mt-3 font-serif text-3xl sm:text-5xl font-black leading-tight">
          {article.title}
        </h1>
        <time className="mt-4 block text-xs uppercase tracking-widest text-muted">
          {formatDate(article.publishedAt)}
        </time>
      </header>

      {img ? (
        <div className="relative aspect-[16/9] mt-8 bg-border">
          <Image
            src={img}
            alt={article.mainImage?.alt || article.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
      ) : null}

      {article.excerpt ? (
        <p className="mt-8 font-serif text-xl italic text-muted leading-relaxed border-l-4 border-foreground pl-4">
          {article.excerpt}
        </p>
      ) : null}

      <div className="mt-8">
        <PortableText value={article.body} />
      </div>

      <div className="mt-12 border-t border-border pt-6 text-center">
        <Link
          href="/"
          className="inline-block border-b-2 border-foreground font-semibold uppercase text-sm tracking-wide hover:text-accent hover:border-accent transition-colors"
        >
          ← Voir tous les articles
        </Link>
      </div>
    </article>
  );
}
