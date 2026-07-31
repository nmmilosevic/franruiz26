import type { Metadata } from "next";
import { Manrope, Tenor_Sans } from "next/font/google";
import MotionSystem from "./components/MotionSystem";
import PageTransition from "./components/PageTransition";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const tenor = Tenor_Sans({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://franruizarquitectos.com"),
  title: "Fran Ruiz Arquitectos | Málaga y Costa del Sol",
  description: "Estudio de arquitectura en Málaga y Marbella. Viviendas, interiorismo, Passivhaus, urbanismo y proyectos para promotoras.",
  openGraph: {
    title: "Fran Ruiz Arquitectos | Málaga y Costa del Sol",
    description: "Dos décadas proyectando espacios con identidad en Málaga, Marbella y la Costa del Sol.",
    type: "website",
    locale: "es_ES",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Fran Ruiz Arquitectos, Málaga, Marbella y Costa del Sol" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fran Ruiz Arquitectos | Málaga y Costa del Sol",
    description: "Arquitectura contemporánea desde Málaga y Marbella.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/brand/logo-fran.svg",
    shortcut: "/brand/logo-fran.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // Put font CSS variables on <html> so every descendant can use them.
    // Apply manrope.className on <body> so body text gets a real font-family
    // even if a CSS `var(--font-*)` reference fails (invalid vars fall back to serif).
    <html lang="es" className={`${manrope.variable} ${tenor.variable}`}>
      <body className={manrope.className}>
        <PageTransition />
        <MotionSystem />
        {children}
      </body>
    </html>
  );
}
