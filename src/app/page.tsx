import Image from "next/image";
import Link from "next/link";

import { ArticleCard } from "@/components/ArticleCard";
import { getArticles } from "@/sanity/lib/fetch";
import { isSanityConfigured } from "@/sanity/env";
import { urlForImage } from "@/sanity/lib/image";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export default async function Home() {
  const articles = await getArticles();
  const [featured, ...rest] = articles;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8" id="articles">
      {!isSanityConfigured ? <SetupNotice /> : null}

      {articles.length === 0 ? (
        <EmptyState configured={isSanityConfigured} />
      ) : (
        <>
          {featured ? <Featured article={featured} /> : null}

          {rest.length > 0 ? (
            <section className="mt-12">
              <h2 className="font-display text-2xl uppercase tracking-tight border-b-2 border-foreground pb-2 mb-6">
                À la une
              </h2>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((article) => (
                  <ArticleCard key={article._id} article={article} />
                ))}
              </div>
            </section>
          ) : null}
        </>
      )}
    </div>
  );
}

function Featured({
  article,
}: {
  article: Awaited<ReturnType<typeof getArticles>>[number];
}) {
  const img = article.mainImage?.asset
    ? urlForImage(article.mainImage).width(1400).height(800).fit("crop").url()
    : null;

  return (
    <section className="grid gap-6 lg:grid-cols-2 items-center border-b border-border pb-10">
      <Link
        href={`/article/${article.slug}`}
        className="block overflow-hidden group order-1 lg:order-none"
      >
        <div className="relative aspect-[16/10] bg-border">
          {img ? (
            <Image
              src={img}
              alt={article.mainImage?.alt || article.title}
              fill
              priority
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center font-display text-5xl text-muted/40 uppercase">
              Info Plus
            </div>
          )}
        </div>
      </Link>
      <div>
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
        <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
          <Link
            href={`/article/${article.slug}`}
            className="hover:text-accent transition-colors"
          >
            {article.title}
          </Link>
        </h2>
        {article.excerpt ? (
          <p className="mt-4 text-lg text-muted leading-relaxed">
            {article.excerpt}
          </p>
        ) : null}
        <time className="mt-4 block text-xs uppercase tracking-wide text-muted">
          {formatDate(article.publishedAt)}
        </time>
        <Link
          href={`/article/${article.slug}`}
          className="mt-5 inline-block border-b-2 border-foreground font-semibold uppercase text-sm tracking-wide hover:text-accent hover:border-accent transition-colors"
        >
          Lire l&apos;article
        </Link>
      </div>
    </section>
  );
}

function EmptyState({ configured }: { configured: boolean }) {
  return (
    <div className="text-center py-20 border border-dashed border-border rounded-sm">
      <p className="font-display text-3xl uppercase text-muted/60">
        Aucun article pour l&apos;instant
      </p>
      <p className="mt-3 text-muted">
        {configured
          ? "Connectez-vous à l'espace rédaction pour publier votre premier article."
          : "Configurez Sanity (voir le README) puis publiez votre premier article."}
      </p>
      <Link
        href="/studio"
        className="mt-6 inline-block bg-foreground text-white px-6 py-3 font-semibold uppercase text-sm tracking-wide hover:bg-accent transition-colors"
      >
        Aller à l&apos;espace rédaction
      </Link>
    </div>
  );
}

function SetupNotice() {
  return (
    <div className="mb-8 border-l-4 border-accent bg-accent/5 px-4 py-3 text-sm">
      <strong>Configuration requise :</strong> ajoutez vos identifiants Sanity
      dans le fichier <code className="font-mono">.env.local</code> pour activer
      la publication d&apos;articles (instructions dans le README).
    </div>
  );
}
