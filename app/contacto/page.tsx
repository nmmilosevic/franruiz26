import type { Metadata } from "next";
import ContactPage from "./ContactPage";

export const metadata: Metadata = {
  title: "Contacto | Fran Ruiz Arquitectos",
  description:
    "Contacta con Fran Ruiz Arquitectos para hablar de tu proyecto en Málaga, Marbella y la Costa del Sol.",
};

export default function Page() {
  return <ContactPage />;
}
