"use client";

import { useEffect, useState } from "react";

function formatToday() {
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

export function CurrentDate() {
  // Rendu vide côté serveur, puis rempli avec la date locale du visiteur
  // une fois le composant monté dans son navigateur (évite tout décalage).
  const [date, setDate] = useState("");

  useEffect(() => {
    // Nécessaire pour éviter le décalage d'hydratation serveur/client
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDate(formatToday());
  }, []);

  return (
    <span
      className="capitalize tracking-widest text-[10px] text-white/85 min-h-[1em]"
      suppressHydrationWarning
    >
      {date}
    </span>
  );
}
