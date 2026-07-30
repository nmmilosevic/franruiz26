import Image from "next/image";
import Link from "next/link";
import pagesData from "../data/pages.json";
import { serviceHref, services, type ServiceLanguage } from "../data/services";
import ArrowIcon from "./ArrowIcon";
import ActionLabel from "./ActionLabel";
import ArchiveHeader from "./ArchiveHeader";
import SiteFooter from "./SiteFooter";

const copy = {
  es: {
    title: "Arquitectura para todo el proceso.",
    intro:
      "Del primer estudio de viabilidad a la dirección de obra, reunimos diseño, técnica y gestión en un único equipo.",
    action: "Descubrir servicio",
    contact: "Cuéntanos qué necesitas",
  },
  en: {
    title: "Architecture for the entire process.",
    intro:
      "From the first feasibility study to site management, we bring design, technical expertise and coordination into one team.",
    action: "Explore service",
    contact: "Tell us what you need",
  },
} as const;

export default function ServiceIndexPage({ language }: { language: ServiceLanguage }) {
  const t = copy[language];

  return (
    <main className="service-archive">
      <ArchiveHeader theme="light" current="services" language={language} />

      <section className="service-archive-hero editorial-route-hero section-shell">
        <h1>{t.title}</h1>
        <div className="service-archive-hero-support">
          <p>{t.intro}</p>
          <Link className="action-pill" href={language === "en" ? "/en/contact" : "/contacto"}>
            <ActionLabel>{t.contact}</ActionLabel><ArrowIcon />
          </Link>
        </div>
      </section>

      <section className="service-archive-grid section-shell" aria-label={t.title}>
        {services.map((service) => {
          const page = pagesData.find(
            (candidate) => candidate.language === language && candidate.slug === service[language],
          );
          if (!page) return null;
          const title = page.headings[0] || page.title;
          const summary = page.paragraphs[0] || page.excerpt;

          return (
            <article className="service-archive-card" key={service.es}>
              <Link href={serviceHref(service, language)}>
                <figure>
                  <Image
                    src={service.image}
                    alt={title}
                    fill
                    sizes="(max-width: 760px) 100vw, 50vw"
                    unoptimized
                  />
                </figure>
                <div className="service-archive-card-copy">
                  <h2>{title}</h2>
                  <p>{summary}</p>
                  <b>{t.action}<ArrowIcon /></b>
                </div>
              </Link>
            </article>
          );
        })}
      </section>

      <SiteFooter language={language} precedingTone="light" />
    </main>
  );
}
