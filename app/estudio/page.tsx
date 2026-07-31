import type { Metadata } from "next";
import StudioPage from "./StudioPage";

export const metadata: Metadata = {
  title: "Estudio | Fran Ruiz Arquitectos",
  description:
    "Fran Ruiz Arquitectos es un estudio multidisciplinar con sedes en Málaga y Marbella.",
};

export default function Page() {
  return <StudioPage language="es" />;
}
