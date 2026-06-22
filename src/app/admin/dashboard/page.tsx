"use client";

import { useState, useEffect, useRef, DragEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { Article } from "@/lib/supabase";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function AdminDashboard() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [articles, setArticles] = useState<Article[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function fetchArticles() {
    setLoadingArticles(true);
    const res = await fetch("/api/admin/articles-list");
    if (res.ok) {
      const data = await res.json();
      setArticles(data.articles ?? []);
    }
    setLoadingArticles(false);
  }

  useEffect(() => {
    fetchArticles();
  }, []);

  function handleFile(file: File) {
    setImage(file);
    const url = URL.createObjectURL(file);
    setPreview(url);
  }

  function onDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) handleFile(file);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title || !image) return;
    setSubmitting(true);
    setSubmitError("");

    const fd = new FormData();
    fd.append("title", title);
    fd.append("image", image);

    const res = await fetch("/api/admin/articles", {
      method: "POST",
      body: fd,
    });

    if (res.ok) {
      setTitle("");
      setImage(null);
      setPreview(null);
      fetchArticles();
    } else {
      const data = await res.json();
      setSubmitError(data.error ?? "Erreur lors de la publication");
    }
    setSubmitting(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Supprimer cet article ?")) return;
    setDeletingId(id);

    const res = await fetch(`/api/admin/articles/${id}`, { method: "DELETE" });
    if (res.ok) {
      setArticles((prev) => prev.filter((a) => a.id !== id));
    }
    setDeletingId(null);
  }

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#1a1a1a] text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-28">
            <Image
              src="/logo-journal-infoplus.webp"
              alt="Journal Info Plus"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-sm text-gray-400 font-medium">— Administration</span>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-300 hover:text-white transition"
        >
          Déconnexion
        </button>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10 space-y-10">
        {/* Publication form */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-5">
            Publier un nouvel article
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titre <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Ex : Fête de la Musique à Bellegarde"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#F5C700] focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Photo <span className="text-red-500">*</span>
              </label>
              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative rounded-xl border-2 border-dashed cursor-pointer transition overflow-hidden ${
                  dragging
                    ? "border-[#F5C700] bg-yellow-50"
                    : "border-gray-200 hover:border-[#F5C700] hover:bg-yellow-50"
                }`}
                style={{ minHeight: "180px" }}
              >
                {preview ? (
                  <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
                    <Image src={preview} alt="Aperçu" fill className="object-cover rounded-xl" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition rounded-xl">
                      <span className="text-white text-sm font-medium">
                        Changer la photo
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                    <svg className="w-10 h-10 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium text-gray-700">Glisser une photo</span> ou cliquer pour choisir
                    </p>
                    <p className="text-xs text-gray-400 mt-1">JPG, PNG, WebP</p>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(f);
                }}
              />
            </div>

            {submitError && (
              <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting || !title || !image}
              className="w-full bg-[#F5C700] hover:bg-[#e6b800] text-black font-bold py-3 rounded-xl transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {submitting ? "Publication en cours…" : "Publier l'article"}
            </button>
          </form>
        </section>

        {/* Article list */}
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Articles publiés{" "}
            {!loadingArticles && (
              <span className="text-sm font-normal text-gray-400">
                ({articles.length})
              </span>
            )}
          </h2>

          {loadingArticles ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl h-20 animate-pulse" />
              ))}
            </div>
          ) : articles.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-gray-400">
              <p className="text-sm">Aucun article publié pour le moment.</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {articles.map((article) => (
                <li
                  key={article.id}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm flex items-center gap-4 p-3"
                >
                  <div className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                    <Image
                      src={article.image_url}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm truncate">
                      {article.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Publié le {formatDate(article.created_at)} · Expire le{" "}
                      <span className="text-orange-500">
                        {formatDate(article.expires_at)}
                      </span>
                    </p>
                    <p className="text-xs text-[#F5C700] font-semibold mt-0.5">
                      👁 {(article as Article & { views?: number }).views ?? 0} vue{((article as Article & { views?: number }).views ?? 0) > 1 ? "s" : ""}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(article.id)}
                    disabled={deletingId === article.id}
                    className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition disabled:opacity-40"
                    title="Supprimer"
                  >
                    {deletingId === article.id ? (
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}
