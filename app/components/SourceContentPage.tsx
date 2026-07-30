import Image from "next/image";
import ArchiveHeader from "./ArchiveHeader";
import pagesData from "../data/pages.json";

export type SourcePageData = (typeof pagesData)[number];

export default function SourceContentPage({ page }: { page: SourcePageData }) {
  const isEnglish = page.language === "en";
  const title = page.title === "HOME" ? (isEnglish ? "Architecture with identity" : "Arquitectura con identidad") : page.title;
  const lead = page.paragraphs[0] || page.excerpt;
  const hero = page.images[0];

  return (
    <main className="source-page">
      <ArchiveHeader theme={hero ? "dark" : "light"} language={isEnglish ? "en" : "es"} />
      <section className={`source-hero ${hero ? "source-hero--image" : ""}`}>
        {hero ? (
          <Image
            src={hero.src}
            alt={hero.alt || title}
            fill
            priority
            sizes="100vw"
            unoptimized
          />
        ) : null}
        {hero ? <div className="project-hero-shade" /> : null}
        <div className="source-hero-copy section-shell">
          <h1>{title}</h1>
          {lead ? <p>{lead}</p> : null}
        </div>
      </section>

      {page.paragraphs.length > 1 ? (
        <section className="source-copy section-shell">
          <aside>
            {page.headings.filter((heading) => heading !== page.title).map((heading, index) => (
              <span key={`${heading}-${index}`}>{heading}</span>
            ))}
          </aside>
          <div>
            {page.paragraphs.slice(1).map((paragraph, index) => (
              <p key={`${page.id}-paragraph-${index}`}>{paragraph}</p>
            ))}
          </div>
        </section>
      ) : null}

      {page.images.slice(1).length ? (
        <section className="source-gallery section-shell" aria-label={isEnglish ? "Image gallery" : "Galería de imágenes"}>
          {page.images.slice(1).map((image, index) => (
            <figure className={`source-gallery-item source-gallery-item--${index % 3}`} key={`${image.src}-${index}`}>
              <Image
                src={image.src}
                alt={image.alt || `${title} — ${index + 2}`}
                fill
                sizes="(max-width: 800px) 100vw, 60vw"
                unoptimized
              />
            </figure>
          ))}
        </section>
      ) : null}

      {page.videos.map((video, index) => (
        <section className="project-video section-shell" key={`${video.src}-${index}`}>
          <video controls playsInline preload="metadata">
            <source src={video.src || undefined} type="video/mp4" />
          </video>
        </section>
      ))}

      {page.slug === "contacto" || page.slug === "contact" ? (
        <section className="source-contact section-shell">
          <a href="mailto:info@franruizarquitectos.com">info@franruizarquitectos.com</a>
          <a href="tel:+34952355309">+34 952 35 53 09</a>
          <p>Málaga · Marbella · Costa del Sol</p>
        </section>
      ) : null}
    </main>
  );
}
