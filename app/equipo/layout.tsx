import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Equipo | Fran Ruiz Arquitectos",
  description: "Conoce al equipo multidisciplinar de Fran Ruiz Arquitectos en Málaga y Marbella.",
};

export default function TeamLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
