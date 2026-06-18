export function Footer() {
  return (
    <footer id="contact" className="mt-20 border-t-2 border-foreground bg-foreground text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 grid gap-8 sm:grid-cols-3">
        <div>
          <p className="font-display text-2xl uppercase tracking-tight">
            Journal Info Plus
          </p>
          <p className="mt-2 text-sm text-white/70">
            L&apos;information locale de Bellegarde et ses environs depuis 1985.
          </p>
        </div>
        <div className="text-sm">
          <p className="uppercase tracking-widest text-white/50 mb-3">Contact</p>
          <p>Directeur de la publication : Joël Vallon</p>
          <p>01200 Bellegarde</p>
          <a
            href="mailto:infoplusbellegarde@orange.fr"
            className="mt-2 inline-block text-accent hover:underline"
          >
            infoplusbellegarde@orange.fr
          </a>
        </div>
        <div className="text-sm">
          <p className="uppercase tracking-widest text-white/50 mb-3">Espace rédaction</p>
          <a href="/studio" className="text-white hover:text-accent underline">
            Se connecter pour publier un article
          </a>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto max-w-6xl px-4 py-4 text-xs text-white/50 flex flex-col sm:flex-row justify-between gap-2">
          <span>© {new Date().getFullYear()} Journal Info Plus — Tous droits réservés.</span>
          <span>journal-infoplus.fr</span>
        </div>
      </div>
    </footer>
  );
}
