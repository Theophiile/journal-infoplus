import fs from "node:fs";
import path from "node:path";

import Image from "next/image";
import Link from "next/link";

import { CurrentDate } from "./CurrentDate";
import { getCategories } from "@/sanity/lib/fetch";

// Si un fichier logo existe dans public/, on l'utilise comme logo.
// Sinon, on affiche le titre en typographie.
function findLogo(): string | null {
  for (const file of [
    "logo-journal-infoplus.webp",
    "logo-journal-infoplus.svg",
    "logo-journal-infoplus.png",
    "logo.svg",
    "logo.png",
    "logo.jpg",
    "logo.webp",
  ]) {
    if (fs.existsSync(path.join(process.cwd(), "public", file))) {
      return `/${file}`;
    }
  }
  return null;
}

export async function Header() {
  const logo = findLogo();
  const categories = await getCategories();

  const nav = [
    { label: "Accueil", href: "/" },
    ...categories.map((c) => ({
      label: c.title,
      href: `/rubrique/${c.slug}`,
    })),
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <header className="border-b-2 border-foreground">
      {/* Bandeau supérieur */}
      <div className="bg-foreground text-white text-[11px] sm:text-xs">
        <div className="mx-auto max-w-6xl px-4 py-1.5 flex items-center justify-between gap-4">
          <CurrentDate />
          <a
            href="mailto:infoplusbellegarde@orange.fr"
            className="hover:text-accent transition-colors truncate"
          >
            infoplusbellegarde@orange.fr
          </a>
        </div>
      </div>

      {/* Masthead */}
      <div className="mx-auto max-w-6xl px-4 pt-6 pb-3 text-center">
        <Link href="/" className="inline-block">
          {logo ? (
            <Image
              src={logo}
              alt="Journal Info Plus"
              width={900}
              height={180}
              priority
              className="mx-auto h-auto w-full max-w-[680px]"
            />
          ) : (
            <h1 className="font-display uppercase leading-[0.85] tracking-tight text-5xl sm:text-7xl lg:text-8xl">
              Journal Info Plus
            </h1>
          )}
        </Link>
        <p className="mt-3 text-[11px] sm:text-sm uppercase tracking-[0.25em] text-muted">
          Depuis 1985 · Directeur de la publication : Joël Vallon
        </p>
      </div>

      {/* Navigation */}
      <nav className="border-t border-border">
        <ul className="mx-auto max-w-6xl px-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 sm:gap-x-10 text-sm font-medium uppercase tracking-wide">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block py-3 hover:text-accent transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
