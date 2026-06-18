import type { Metadata } from "next";
import { Anton, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

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

export const metadata: Metadata = {
  title: {
    default: "Journal Info Plus — L'actualité de Bellegarde depuis 1985",
    template: "%s | Journal Info Plus",
  },
  description:
    "Journal Info Plus, l'information locale de Bellegarde et ses environs depuis 1985.",
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
