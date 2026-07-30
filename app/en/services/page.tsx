import type { Metadata } from "next";
import ServiceIndexPage from "../../components/ServiceIndexPage";

export const metadata: Metadata = {
  title: "Architecture services in Malaga | Fran Ruiz Architects",
  description:
    "Residential architecture, developer projects, site management, Passivhaus, urban planning, interiors, expert reports and legalisation in Malaga and Marbella.",
  alternates: { canonical: "/en/services" },
  openGraph: {
    title: "Architecture services | Fran Ruiz Architects",
    description:
      "Design, technical expertise and management for every stage of your project in Malaga, Marbella and the Costa del Sol.",
    url: "/en/services",
    images: ["/source-media/2026/07/20260707_24002_VILLA-SIERRA-BLANCA_02-scaled.jpg"],
  },
};

export default function ServicesPage() {
  return <ServiceIndexPage language="en" />;
}
