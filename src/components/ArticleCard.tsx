import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/supabase";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
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
        <h3 className="font-serif text-base font-bold text-white leading-snug line-clamp-2 drop-shadow">
          {article.title}
        </h3>
        <time className="mt-1 block text-[10px] uppercase tracking-widest text-white/60">
          {formatDate(article.created_at)}
        </time>
      </div>
    </Link>
  );
}
