import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import MotionSystem from "./components/MotionSystem";
import ImageRevealSystem from "./components/ImageRevealSystem";
import PageTransition from "./components/PageTransition";
import "./globals.css";

// One sans family for body and titles — Tenor Sans read as serif to visitors.
const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
    <html lang="es" className={manrope.variable}>
      <body className={manrope.className}>
        <PageTransition />
        <MotionSystem />
        <ImageRevealSystem />
        {children}
      </body>
    </html>
  );
}
