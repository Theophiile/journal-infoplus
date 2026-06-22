import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { supabaseAdmin } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { data } = await supabaseAdmin
    .from("articles")
    .select("title")
    .eq("id", id)
    .single();
  if (!data) return { title: "Article introuvable" };
  return { title: data.title };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: article } = await supabaseAdmin
    .from("articles")
    .select("*")
    .eq("id", id)
    .single();

  if (!article) notFound();

  return (
    <div className="bg-black flex flex-col">
      {/* Bouton retour */}
      <div className="px-4 py-3 flex items-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white text-xs font-semibold uppercase tracking-widest transition"
        >
          ← Retour
        </Link>
      </div>

      {/* Image plein écran */}
      <div className="relative w-full" style={{ height: "calc(100svh - 120px)" }}>
        <Image
          src={article.image_url}
          alt={article.title}
          fill
          priority
          className="object-contain"
          sizes="100vw"
        />

        {/* Titre en bas */}
      </div>

      {/* Titre + date sous l'image */}
      <div className="px-6 py-6 sm:px-10">
        <p className="text-xs uppercase tracking-widest text-white/40 mb-2">
          {new Intl.DateTimeFormat("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }).format(new Date(article.created_at))}
        </p>
        <h1 className="font-serif text-2xl sm:text-4xl font-black text-white leading-tight max-w-3xl">
          {article.title}
        </h1>
      </div>
    </div>
  );
}
