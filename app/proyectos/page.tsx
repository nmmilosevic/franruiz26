import type { Metadata } from "next";
import ProjectsIndexPage from "../components/ProjectsIndexPage";

export const metadata: Metadata = {
  title: "Proyectos | Fran Ruiz Arquitectos",
  description:
    "Archivo completo de proyectos de Fran Ruiz Arquitectos en Málaga, Marbella y la Costa del Sol.",
};

export default function ProjectsPage() {
  return <ProjectsIndexPage language="es" />;
}
