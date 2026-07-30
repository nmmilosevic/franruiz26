import type { Metadata } from "next";
import ServiceIndexPage from "../components/ServiceIndexPage";

export const metadata: Metadata = {
  title: "Servicios de arquitectura en Málaga | Fran Ruiz Arquitectos",
  description:
    "Arquitectura residencial, proyectos para promotoras, dirección de obra, Passivhaus, urbanismo, interiorismo, peritaciones y legalizaciones en Málaga y Marbella.",
  alternates: { canonical: "/servicios" },
  openGraph: {
    title: "Servicios de arquitectura | Fran Ruiz Arquitectos",
    description:
      "Diseño, técnica y gestión para acompañar tu proyecto de principio a fin en Málaga, Marbella y la Costa del Sol.",
    url: "/servicios",
    images: ["/source-media/2026/07/20260707_24002_VILLA-SIERRA-BLANCA_02-scaled.jpg"],
  },
};

export default function ServicesPage() {
  return <ServiceIndexPage language="es" />;
}
