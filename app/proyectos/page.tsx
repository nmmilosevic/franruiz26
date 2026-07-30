import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ArchiveHeader from "../components/ArchiveHeader";
import ArrowIcon from "../components/ArrowIcon";
import SiteFooter from "../components/SiteFooter";
import projectsData from "../data/projects.json";

type Project = (typeof projectsData)[number];

export const metadata: Metadata = {
  title: "Proyectos | Fran Ruiz Arquitectos",
  description:
    "Archivo completo de proyectos de Fran Ruiz Arquitectos en Málaga, Marbella y la Costa del Sol.",
};

export default function ProjectsPage() {
  const projects = projectsData as Project[];

  return (
    <main className="archive-page">
      <ArchiveHeader current="projects" />
      <section className="archive-intro section-shell">
        <h1>Arquitectura que<br />pertenece al lugar.</h1>
        <p className="archive-lede">
          Viviendas, espacios de hospitalidad, rehabilitación y proyectos urbanos
          desarrollados desde Málaga para la Costa del Sol.
        </p>
      </section>

      <section className="project-index section-shell" aria-label="Todos los proyectos">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </section>
      <SiteFooter precedingTone="light" />
    </main>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className={`project-index-card project-index-card--${index % 5}`}>
      <Link href={`/proyectos/${project.slug}`} aria-label={`Ver ${project.title}`}>
        <div className="project-index-image home-project-image">
          {project.featuredImage ? (
            <Image
              src={project.featuredImage}
              alt={project.images[0]?.alt || project.title}
              fill
              sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 44vw"
              unoptimized
            />
          ) : null}
        </div>
        <div className="project-index-meta home-project-caption">
          <h2>{project.title}</h2>
          <p>{[project.location, project.year].filter(Boolean).join(" · ")}</p>
          <span className="project-direction"><ArrowIcon /></span>
        </div>
      </Link>
    </article>
  );
}
