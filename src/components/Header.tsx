import fs from "node:fs";
import path from "node:path";

import Image from "next/image";
import Link from "next/link";

import { CurrentDate } from "./CurrentDate";

function findLogo(): string | null {
  for (const file of [
    "logo-journal-infoplus.webp",
    "logo-journal-infoplus.png",
    "logo-journal-infoplus.svg",
    "logo-journal-infoplus.jpg",
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

const nav = [
  { label: "Accueil", href: "/" },
  { label: "Contact", href: "/#contact" },
];

export function Header() {
  const logo = findLogo();

  return (
    <header className="shadow-md">
      {/* Bandeau supérieur — date + email */}
      <div className="bg-[#2a2a2a] border-b border-white/10">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-2 flex items-center justify-between gap-4">
          <CurrentDate />
          <a
            href="mailto:infoplusbellegarde@orange.fr"
            className="hidden sm:block text-[10px] tracking-widest uppercase text-white/85 hover:text-white transition-colors"
          >
            infoplusbellegarde@orange.fr
          </a>
        </div>
      </div>

      {/* Masthead */}
      <div className="bg-[#F4CC22] relative overflow-hidden">
        {/* Lignes décoratives discrètes */}
        <div className="absolute inset-x-0 top-0 h-px bg-black/10" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-black/20" />

        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-6 sm:py-8 flex flex-col items-center gap-3">
          {/* Ligne fine au-dessus du logo */}
          <div className="flex items-center gap-4 w-full max-w-xl mb-1">
            <span className="flex-1 h-px bg-black/35" />
            <span className="text-[9px] uppercase tracking-[0.35em] text-black/70 font-semibold whitespace-nowrap">
              Depuis 1985
            </span>
            <span className="flex-1 h-px bg-black/35" />
          </div>

          <Link href="/" className="inline-block group">
            {logo ? (
              <Image
                src={logo}
                alt="Journal Info Plus"
                width={860}
                height={172}
                priority
                className="mx-auto h-20 sm:h-28 lg:h-36 w-auto transition-all duration-200 group-hover:opacity-90"
              />
            ) : (
              <h1 className="font-display uppercase leading-none tracking-tight text-5xl sm:text-7xl lg:text-8xl text-red drop-shadow">
                Journal Info Plus
              </h1>
            )}
          </Link>

          {/* Ligne fine sous le logo */}
          <div className="flex items-center gap-4 w-full max-w-2xl mt-1">
            <span className="hidden sm:block flex-1 h-px bg-black/35" />
            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.3em] text-black/70 font-semibold text-center px-2 min-w-0">
              Directeur de publication : Joël Vallon · Bellegarde 01200
            </p>
            <span className="hidden sm:block flex-1 h-px bg-black/35" />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-[#2a2a2a] border-t-2 border-[#F4CC22]">
        <ul className="mx-auto max-w-7xl px-5 sm:px-8 flex items-center justify-center gap-1">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="relative block px-5 sm:px-7 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/85 hover:text-[#F4CC22] transition-colors duration-150 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-[#F5C700] after:transition-all after:duration-200 hover:after:w-full"
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
