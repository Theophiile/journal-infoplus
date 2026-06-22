import Image from "next/image";
import Link from "next/link";

import { supabaseAdmin, type Article } from "@/lib/supabase";

export const dynamic = "force-dynamic";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

async function getArticles(): Promise<Article[]> {
  const { data } = await supabaseAdmin
    .from("articles")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "NewsMediaOrganization",
  name: "Journal Info Plus",
  url: "https://journal-infoplus.fr",
  description:
    "Journal indépendant d'information locale en Auvergne-Rhône-Alpes depuis 1985.",
  foundingDate: "1985",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bellegarde-sur-Valserine",
    addressRegion: "Auvergne-Rhône-Alpes",
    addressCountry: "FR",
  },
};

export default async function Home() {
  const articles = await getArticles();
  const [featured, ...rest] = articles;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      {articles.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-10">
          {/* À la une */}
          {featured && (
            <section>
              <SectionHeader label="À la une" />
              <Link
                href={`/article/${featured.id}`}
                className="group mt-4 block relative overflow-hidden rounded-sm bg-foreground"
              >
                <div className="relative aspect-video sm:aspect-21/9">
                  <Image
                    src={featured.image_url}
                    alt={featured.title}
                    fill
                    priority
                    className="object-cover opacity-80 transition-opacity duration-500 group-hover:opacity-70"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 lg:p-12">
                  <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight max-w-3xl drop-shadow-sm">
                    {featured.title}
                  </h2>
                  <time className="mt-3 block text-xs uppercase tracking-widest text-white/60">
                    {formatDate(featured.created_at)}
                  </time>
                </div>
              </Link>
            </section>
          )}

          {/* Tous les autres articles */}
          {rest.length > 0 && (
            <section>
              <SectionHeader label="Dernières actualités" />
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {rest.map((article) => (
                  <Link
                    key={article.id}
                    href={`/article/${article.id}`}
                    className="group relative overflow-hidden rounded-sm bg-foreground block"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={article.image_url}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-serif text-base sm:text-lg font-bold text-white leading-snug line-clamp-2 drop-shadow">
                        {article.title}
                      </h3>
                      <time className="mt-1 block text-[10px] uppercase tracking-widest text-white/60">
                        {formatDate(article.created_at)}
                      </time>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-5 w-1.5 bg-yellow rounded-sm" />
      <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground">
        {label}
      </h2>
      <span className="flex-1 h-px bg-border" />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-24 border border-dashed border-border-dark rounded-sm bg-surface">
      <p className="font-display text-3xl uppercase tracking-tight text-foreground/30">
        Aucun article pour l&apos;instant
      </p>
      <p className="mt-3 text-sm text-muted max-w-sm mx-auto leading-relaxed">
        Connectez-vous à l&apos;espace administration pour publier votre premier article.
      </p>
    </div>
  );
}
