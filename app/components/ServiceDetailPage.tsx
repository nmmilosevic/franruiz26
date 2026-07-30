import Image from "next/image";
import Link from "next/link";
import ArrowIcon from "./ArrowIcon";
import ActionLabel from "./ActionLabel";
import pagesData from "../data/pages.json";
import {
  serviceFromSlug,
  serviceHref,
  services,
  type ServiceLanguage,
} from "../data/services";
import ArchiveHeader from "./ArchiveHeader";
import SiteFooter from "./SiteFooter";
import type { SourcePageData } from "./SourceContentPage";

const copy = {
  es: {
    contact: "Hablar de tu proyecto",
    scope: "Un servicio pensado de principio a fin",
    coverage: "Qué incluye el servicio",
    expertise: "Criterio técnico para cada decisión",
    selected: "Arquitectura construida",
    related: "Otros servicios",
    all: "Ver todos los servicios",
    closing: "Tu proyecto empieza con una conversación.",
    closingBody:
      "Cuéntanos dónde está, en qué fase se encuentra y qué necesitas. Nuestro equipo te responderá para organizar una primera conversación.",
  },
  en: {
    contact: "Discuss your project",
    scope: "A service considered from start to finish",
    coverage: "What the service covers",
    expertise: "Technical judgment for every decision",
    selected: "Built architecture",
    related: "Other services",
    all: "View all services",
    closing: "Your project starts with a conversation.",
    closingBody:
      "Tell us where it is, its current stage and what you need. Our team will reply to arrange an initial conversation.",
  },
} as const;

function serviceParagraphs(page: SourcePageData, language: ServiceLanguage) {
  const commonStart = page.paragraphs.findIndex((paragraph) =>
    language === "es"
      ? paragraph.startsWith("Fusionamos diseño, técnica")
      : paragraph.startsWith("We unite design, technical"),
  );
  return page.paragraphs.slice(0, commonStart > 0 ? commonStart : page.paragraphs.length);
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20">
      <path d="m5 10.25 3.1 3.1L15.5 6" />
    </svg>
  );
}

export default function ServiceDetailPage({
  page,
  language,
}: {
  page: SourcePageData;
  language: ServiceLanguage;
}) {
  const service = serviceFromSlug(page.slug, language);
  if (!service) return null;

  const t = copy[language];
  const title = page.headings[0] || page.title;
  const subtitle = page.headings[1] || page.paragraphs[0];
  const paragraphs = serviceParagraphs(page, language);
  const contactHref = language === "en" ? "/en/contact" : "/contacto";
  const indexHref = language === "en" ? "/en/services" : "/servicios";
  const serviceIndex = services.indexOf(service);
  const relatedPool = services.filter((candidate) => candidate.es !== service.es);
  const relatedStart = serviceIndex % relatedPool.length;
  const related = Array.from(
    { length: 3 },
    (_, index) => relatedPool[(relatedStart + index) % relatedPool.length],
  );
  const gallery = service.gallery.map((src) => ({ src, alt: "" }));
  const remainingParagraphs = paragraphs.slice(3);
  const isHousingProcess = service.es === "proyecto-vivienda-unifamiliar-malaga";
  const longFormIndex = remainingParagraphs.findIndex(
    (paragraph) => paragraph.length > 240,
  );
  const scopeBoundary =
    longFormIndex === 0
      ? 0
      : Math.min(
          longFormIndex > 0 ? longFormIndex : remainingParagraphs.length,
          8,
        );
  const expertiseTitle = page.headings[3] || t.expertise;
  const scopeIntro = isHousingProcess ? remainingParagraphs.slice(0, 4) : [];
  const scopeItems = isHousingProcess
    ? remainingParagraphs.slice(4)
    : remainingParagraphs.slice(0, scopeBoundary);
  const detailParagraphs = isHousingProcess
    ? []
    : remainingParagraphs.slice(scopeBoundary);
  const scopeTitle = isHousingProcess ? expertiseTitle : t.coverage;

  return (
    <main className="service-detail">
      <ArchiveHeader theme="light" current="services" language={language} />

      <section className="service-detail-hero editorial-route-hero" aria-label={title}>
        <div className="service-detail-hero-copy">
          <h1>{title}</h1>
          <div>
            <p>{subtitle}</p>
            <Link className="action-pill" href={contactHref}><ActionLabel>{t.contact}</ActionLabel><ArrowIcon /></Link>
          </div>
        </div>
      </section>

      <section className="service-detail-overview section-shell">
        <h2>{t.scope}</h2>
        <div className="service-detail-overview-copy">
          {paragraphs.slice(0, 3).map((paragraph, index) => (
            <p key={`${page.id}-intro-${index}`}>{paragraph}</p>
          ))}
        </div>
      </section>

      {gallery.length ? (
        <section className="service-detail-gallery section-shell" aria-label={t.selected}>
          {gallery.map((image, index) => (
            <figure key={`${image.src}-${index}`}>
              <Image
                src={image.src}
                alt={image.alt || `${title} — ${index + 1}`}
                fill
                sizes={index === 0 ? "100vw" : "(max-width: 760px) 100vw, 50vw"}
                unoptimized
              />
            </figure>
          ))}
        </section>
      ) : null}

      {scopeIntro.length || scopeItems.length ? (
        <section className={`service-detail-scope section-shell${isHousingProcess ? " service-detail-scope--process" : ""}`}>
          <h2>{scopeTitle}</h2>
          <div className="service-detail-scope-content">
            {scopeIntro.length ? (
              <div className="service-detail-scope-context">
                {scopeIntro.map((paragraph, index) => (
                  <p key={`${page.id}-scope-context-${index}`}>{paragraph}</p>
                ))}
              </div>
            ) : null}
            {scopeItems.length ? (
              <ul>
                {scopeItems.map((item, index) => (
                  <li key={`${page.id}-scope-${index}`}>
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      ) : null}

      {detailParagraphs.length ? (
        <section className="service-detail-expertise section-shell">
          <h2>{expertiseTitle}</h2>
          <div>
            {detailParagraphs.map((paragraph, index) => (
              <p key={`${page.id}-body-${index}`}>{paragraph}</p>
            ))}
          </div>
        </section>
      ) : null}

      <section className="service-related section-shell">
        <div className="service-related-head">
          <h2>{t.related}</h2>
          <Link className="action-pill" href={indexHref}><ActionLabel>{t.all}</ActionLabel><ArrowIcon direction="right" /></Link>
        </div>
        <div className="service-related-grid">
          {related.map((candidate) => {
            const relatedPage = pagesData.find(
              (item) => item.language === language && item.slug === candidate[language],
            );
            if (!relatedPage) return null;
            return (
              <Link href={serviceHref(candidate, language)} key={candidate.es}>
                <figure>
                  <Image src={candidate.image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" unoptimized />
                </figure>
                <h3>{relatedPage.headings[0] || relatedPage.title}</h3>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="service-contact">
        <div className="section-shell">
          <h2>{t.closing}</h2>
          <div>
            <p>{t.closingBody}</p>
            <Link className="action-pill" href={contactHref}><ActionLabel>{t.contact}</ActionLabel><ArrowIcon /></Link>
          </div>
        </div>
      </section>

      <SiteFooter language={language} precedingTone="light" />
    </main>
  );
}
