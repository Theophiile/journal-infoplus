import type { Metadata } from "next";
import { Anton, Playfair_Display, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const display = Anton({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const serif = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const SITE_URL = "https://journal-infoplus.fr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Journal Info Plus — L'actualité locale depuis 1985",
    template: "%s | Journal Info Plus",
  },
  description:
    "Journal Info Plus, votre journal indépendant d'information locale en Auvergne-Rhône-Alpes depuis 1985. Actualités, sport et vie locale de Bellegarde-sur-Valserine et ses environs.",
  keywords: [
    "journal local",
    "info plus",
    "Bellegarde-sur-Valserine",
    "Auvergne-Rhône-Alpes",
    "actualités locales",
    "presse locale",
  ],
  authors: [{ name: "Journal Info Plus", url: SITE_URL }],
  creator: "Journal Info Plus",
  publisher: "Journal Info Plus",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE_URL,
    siteName: "Journal Info Plus",
    title: "Journal Info Plus — L'actualité locale depuis 1985",
    description:
      "Journal indépendant d'information locale en Auvergne-Rhône-Alpes depuis 1985.",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Journal Info Plus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Journal Info Plus",
    description:
      "Journal indépendant d'information locale en Auvergne-Rhône-Alpes depuis 1985.",
    images: ["/og-default.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${display.variable} ${serif.variable} ${sans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
