export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="mt-20">
      {/* Bande supérieure jaune */}
      <div className="h-1.5 bg-yellow" />

      <div className="bg-foreground text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">

          {/* Titre */}
          <div>
            <p className="font-display text-3xl uppercase tracking-tight leading-none">
              Journal Info Plus
            </p>
            <div className="mt-3 h-1 w-12 bg-yellow rounded-sm" />
            <p className="mt-4 text-sm text-white/60 leading-relaxed max-w-xs">
              L&apos;information locale en Auvergne-Rhône-Alpes depuis 1985.
              Un journal indépendant, au service de la région.
            </p>
          </div>

          {/* Contact */}
          <div className="lg:col-start-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mb-4">
              Contact
            </p>
            <ul className="space-y-2 text-sm text-white/70">
              <li>Directeur : Joël Vallon</li>
              <li>01200 Bellegarde</li>
              <li>
                <a
                  href="mailto:infoplusbellegarde@orange.fr"
                  className="text-yellow hover:text-white transition-colors"
                >
                  infoplusbellegarde@orange.fr
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bas de footer */}
        <div className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] uppercase tracking-wider text-white/30">
            <span>© {year} Journal Info Plus — Tous droits réservés</span>
            <a href="/admin" className="hover:text-[#F4CC22] transition-colors">
              Espace rédaction
            </a>
            <a
              href="https://annecy-dev.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/60 transition-colors"
            >
              Site créé par Annecy Dev
            </a>
            <span>journal-infoplus.fr</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
