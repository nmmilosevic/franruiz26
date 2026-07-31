import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArchiveHeader from "../../components/ArchiveHeader";
import ArrowIcon from "../../components/ArrowIcon";
import SiteFooter from "../../components/SiteFooter";
import projectsData from "../../data/projects.json";

type ProjectVideo = {
  src: string;
  sourceUrl?: string;
};

type Project = Omit<(typeof projectsData)[number], "videos"> & {
  // projects.json currently uses empty arrays, so TS would infer `never[]`
  // without an explicit video shape for future media.
  videos: ProjectVideo[];
};

export function generateStaticParams() {
  return projectsData.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((item) => item.slug === slug);
  if (!project) return {};

  const description =
    project.paragraphs[0]?.slice(0, 155) ||
    `${project.title}, proyecto de Fran Ruiz Arquitectos.`;

  return {
    title: `${project.title} | Fran Ruiz Arquitectos`,
    description,
    openGraph: project.featuredImage
      ? { title: project.title, description, images: [project.featuredImage] }
      : undefined,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectsData.find((item) => item.slug === slug) as Project | undefined;
  if (!project) notFound();

  const currentIndex = projectsData.findIndex((item) => item.id === project.id);
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];

  return (
    <main className="project-detail" id="top">
      <ArchiveHeader theme={project.featuredImage ? "dark" : "light"} current="projects" />

      <section className="project-hero">
        {project.featuredImage ? (
          <Image
            src={project.featuredImage}
            alt={project.images[0]?.alt || project.title}
            fill
            sizes="100vw"
            priority
            unoptimized
          />
        ) : null}
        <div className="project-hero-shade" />
        <div className="project-hero-copy section-shell">
          <h1>{project.title}</h1>
        </div>
      </section>

      <section className="project-overview section-shell" aria-labelledby="project-overview-title">
        <div className="project-overview-heading">
          <h2 id="project-overview-title">Ficha del proyecto</h2>
        </div>
        <dl className="project-facts">
          <Fact label="Año" value={project.year} />
          <Fact label="Localización" value={project.location} />
          <Fact label="Categoría" value={project.category} />
          <Fact label="Arquitecto" value={project.architect} />
        </dl>
      </section>

      {project.paragraphs.length ? (
        <section className="project-story section-shell">
          <h2 className="project-story-title">El proyecto</h2>
          <div className="project-story-copy">
            <p className="project-story-lead">{project.paragraphs[0]}</p>
            {project.paragraphs.length > 1 ? (
              <div className="project-story-details">
                {project.paragraphs.slice(1).map((paragraph, index) => (
                  <p key={`${project.id}-p-${index + 1}`}>{paragraph}</p>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {project.images.slice(1).length ? (
        <section className="project-gallery section-shell" aria-label={`Galería de ${project.title}`}>
          {project.images.slice(1).map((image, index) => (
            <figure
              className={`project-gallery-item project-gallery-item--${index % 4}`}
              key={`${image.src}-${index}`}
            >
              <Image
                src={image.src}
                alt={image.alt || `${project.title}, imagen ${index + 2}`}
                fill
                sizes="(max-width: 800px) 100vw, 72vw"
                unoptimized
              />
            </figure>
          ))}
        </section>
      ) : null}

      {project.videos.map((video, index) => (
        <section className="project-video section-shell" key={`${video.src}-${index}`}>
          <video controls playsInline preload="metadata">
            <source src={video.src || undefined} type="video/mp4" />
          </video>
        </section>
      ))}

      <Link
        id="next-project"
        className="next-project"
        href={`/proyectos/${nextProject.slug}`}
        aria-label={`Siguiente proyecto: ${nextProject.title}`}
      >
        <Image
          className="next-project-image"
          src={nextProject.featuredImage}
          alt=""
          fill
          sizes="100vw"
          unoptimized
        />
        <span className="next-project-shade" aria-hidden="true" />
        <span className="next-project-inner section-shell">
          <span className="next-project-bottom">
            <span className="next-project-copy">
              <span className="next-project-label">Siguiente proyecto</span>
              <strong>{nextProject.title}</strong>
            </span>
            <span className="next-project-action project-direction" aria-hidden="true">
              <ArrowIcon />
            </span>
          </span>
        </span>
      </Link>
      <SiteFooter precedingTone="light" />
    </main>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
