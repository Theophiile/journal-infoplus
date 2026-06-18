import Image from "next/image";
import Link from "next/link";

import { urlForImage } from "@/sanity/lib/image";
import type { ArticleCard as ArticleCardType } from "@/sanity/lib/fetch";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export function ArticleCard({ article }: { article: ArticleCardType }) {
  const img = article.mainImage?.asset
    ? urlForImage(article.mainImage).width(800).height(500).fit("crop").url()
    : null;

  return (
    <article className="group flex flex-col">
      <Link href={`/article/${article.slug}`} className="block overflow-hidden">
        <div className="relative aspect-[16/10] bg-border">
          {img ? (
            <Image
              src={img}
              alt={article.mainImage?.alt || article.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center font-display text-3xl text-muted/40 uppercase">
              Info Plus
            </div>
          )}
        </div>
      </Link>
      <div className="mt-3">
        {article.category ? (
          article.categorySlug ? (
            <Link
              href={`/rubrique/${article.categorySlug}`}
              className="text-xs font-bold uppercase tracking-wider text-accent hover:underline"
            >
              {article.category}
            </Link>
          ) : (
            <span className="text-xs font-bold uppercase tracking-wider text-accent">
              {article.category}
            </span>
          )
        ) : null}
        <h3 className="mt-1 font-serif text-xl leading-snug font-bold">
          <Link
            href={`/article/${article.slug}`}
            className="hover:text-accent transition-colors"
          >
            {article.title}
          </Link>
        </h3>
        {article.excerpt ? (
          <p className="mt-2 text-sm text-muted line-clamp-3">{article.excerpt}</p>
        ) : null}
        <time className="mt-2 block text-xs uppercase tracking-wide text-muted">
          {formatDate(article.publishedAt)}
        </time>
      </div>
    </article>
  );
}
