import type { Metadata } from "next";
import { Manrope, Tenor_Sans } from "next/font/google";
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
    icon: "/brand/isotipo-original.jpg",
    shortcut: "/brand/isotipo-original.jpg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${manrope.variable} ${tenor.variable}`}>{children}</body>
    </html>
  );
}
