import Image from "next/image";
import Link from "next/link";
import ArchiveHeader from "./ArchiveHeader";
import ArrowIcon from "./ArrowIcon";
import SiteFooter from "./SiteFooter";
import projectsData from "../data/projects.json";
import type { Language } from "../lib/language";

type Project = (typeof projectsData)[number];

const copy = {
  es: {
    title: (
      <>
        Arquitectura que
        <br />
        pertenece al lugar.
      </>
    ),
    lede: "Viviendas, espacios de hospitalidad, rehabilitación y proyectos urbanos desarrollados desde Málaga para la Costa del Sol.",
    label: "Todos los proyectos",
    view: "Ver",
  },
  en: {
    title: (
      <>
        Architecture that
        <br />
        belongs to its place.
      </>
    ),
    lede: "Homes, hospitality spaces, renovation, and urban projects developed from Málaga for the Costa del Sol.",
    label: "All projects",
    view: "View",
  },
} as const;

export default function ProjectsIndexPage({ language = "es" }: { language?: Language }) {
  const projects = projectsData as Project[];
  const t = copy[language];

  return (
    <main className="archive-page">
      <ArchiveHeader current="projects" language={language} />
      <section className="archive-intro section-shell">
        <h1>{t.title}</h1>
        <p className="archive-lede">{t.lede}</p>
      </section>

      <section className="project-index section-shell" aria-label={t.label}>
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} viewLabel={t.view} />
        ))}
      </section>
      <SiteFooter language={language} precedingTone="light" />
    </main>
  );
}

function ProjectCard({
  project,
  index,
  viewLabel,
}: {
  project: Project;
  index: number;
  viewLabel: string;
}) {
  return (
    <article className={`project-index-card project-index-card--${index % 5}`}>
      <Link href={`/proyectos/${project.slug}`} aria-label={`${viewLabel} ${project.title}`}>
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
          <span className="project-direction">
            <ArrowIcon />
          </span>
        </div>
      </Link>
    </article>
  );
}
