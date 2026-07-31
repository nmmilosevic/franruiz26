"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import MainHeader from "./MainHeader";
import SiteFooter from "./SiteFooter";
import ArrowIcon from "./ArrowIcon";
import ActionLabel from "./ActionLabel";
import GoogleReviewsSection from "./GoogleReviewsSection";

const copy = {
  es: {
    nav: ["Proyectos", "Estudio", "Equipo", "Contacto"],
    heroEyebrow: "Arquitectura · Málaga / Marbella",
    heroTitle: "Espacios para una vida extraordinaria.",
    heroBody:
      "Arquitectura contemporánea arraigada al paisaje, la luz y la manera mediterránea de vivir.",
    explore: "Explorar proyectos",
    scroll: "Desliza para descubrir",
    statement:
      "Diseñamos lugares que se sienten inevitables: serenos, precisos y profundamente vinculados a su entorno.",
    selected: "Proyectos seleccionados",
    archive: "Ver todos los proyectos",
    servicesTitle: "Soluciones pensadas para tu proyecto.",
    servicesIntro:
      "Fusionamos diseño, técnica y acompañamiento en un proceso pensado para ti, para que cada paso de tu proyecto avance con claridad, calidad y la tranquilidad de estar en buenas manos.",
    services: [
      ["01", "measure", "Arquitectura a medida", "Proyectos diseñados contigo, adaptados a tu forma de vivir.", "/proyecto-vivienda-unifamiliar-malaga"],
      ["02", "bim", "Proyectos para promotoras", "Viabilidad, proyecto y control de costes desde las primeras decisiones.", "/proyecto-promotoras-malaga"],
      ["03", "guarantee", "Proyectos de edificación", "Obra nueva, reforma, ampliación y rehabilitación con gestión integral.", "/proyectos-edificacion-malaga"],
      ["04", "site", "Dirección de obra", "Supervisión continua de la obra y control total hasta la entrega.", "/arquitecto-tecnico-malaga"],
      ["05", "passive", "Passivhaus", "Espacios sostenibles y confortables, con consumo energético mínimo.", "/passivhaus-malaga"],
      ["06", "interior", "Interiorismo", "Interiores exclusivos y funcionales, creados con detalle y equilibrio.", "/interiorismo-malaga"],
    ],
    allServices: "Ver todos los servicios",
    studioLabel: "El estudio",
    studioTitle: "Dos décadas convirtiendo ideas complejas en espacios claros.",
    studioBody:
      "Un equipo multidisciplinar acompaña cada proyecto desde la primera conversación hasta la obra terminada.",
    studioLink: "Conocer el estudio",
    reviewsLabel: "Reseñas de Google",
    reviewsTitle: "La confianza también se construye.",
    reviewsBody: "Experiencias compartidas por clientes y colaboradores que han recorrido el proceso con nosotros.",
    reviewsCta: "Ver todas en Google",
    previousReview: "Reseñas anteriores",
    nextReview: "Más reseñas",
    footerStudio: "Estudio",
    footerNavigation: "Navegación",
    footerContact: "Contacto",
    footerPrivacy: "Privacidad",
    footerCookies: "Cookies",
    footerQuality: "Calidad",
    footerTop: "Volver arriba",
  },
  en: {
    nav: ["Projects", "Studio", "Team", "Contact"],
    heroEyebrow: "Architecture · Málaga / Marbella",
    heroTitle: "Spaces for an extraordinary life.",
    heroBody:
      "Contemporary architecture rooted in landscape, light and the Mediterranean way of living.",
    explore: "Explore projects",
    scroll: "Scroll to discover",
    statement:
      "We design places that feel inevitable: serene, precise and deeply connected to their surroundings.",
    selected: "Selected projects",
    archive: "View all projects",
    servicesTitle: "Solutions designed around your project.",
    servicesIntro:
      "We unite design, technical expertise and close guidance in a process built around you, so every stage moves forward with clarity, quality and complete confidence.",
    services: [
      ["01", "measure", "Bespoke architecture", "Projects designed with you and adapted to the way you live.", "/en/single-family-home-project-malaga"],
      ["02", "bim", "Developer projects", "Feasibility, design and cost control from the earliest decisions.", "/en/promoters-project-malaga"],
      ["03", "guarantee", "Building projects", "New build, refurbishment, extension and rehabilitation with integrated management.", "/en/building-projects-malaga"],
      ["04", "site", "Site management", "Continuous site supervision and complete control through delivery.", "/en/technical-architect-malaga"],
      ["05", "passive", "Passivhaus", "Sustainable, comfortable spaces with minimal energy consumption.", "/en/passivhaus-malaga"],
      ["06", "interior", "Interior design", "Exclusive, functional interiors created with detail and balance.", "/en/interior-design-malaga"],
    ],
    allServices: "View all services",
    studioLabel: "The studio",
    studioTitle: "Two decades turning complex ideas into clear spaces.",
    studioBody:
      "A multidisciplinary team supports every project from the first conversation to the completed build.",
    studioLink: "Discover the studio",
    reviewsLabel: "Google reviews",
    reviewsTitle: "Trust is built too.",
    reviewsBody: "Experiences shared by clients and collaborators who have been through the process with us.",
    reviewsCta: "View all on Google",
    previousReview: "Previous reviews",
    nextReview: "More reviews",
    footerStudio: "Studio",
    footerNavigation: "Navigation",
    footerContact: "Contact",
    footerPrivacy: "Privacy",
    footerCookies: "Cookies",
    footerQuality: "Quality",
    footerTop: "Back to top",
  },
} as const;

const featuredProjects = [
  {
    title: "Villa Sierra Blanca",
    slug: "villa-nadia",
    meta: "Marbella · 2025",
    image: "/source-media/2026/07/20260707_24002_VILLA-SIERRA-BLANCA_02-scaled.jpg",
  },
  {
    title: "Restaurante Mandala",
    slug: "restaurante-mandala-2",
    meta: "Estepona · 2025",
    image: "/source-media/2026/07/Fachada-01-copia.jpg",
  },
  {
    title: "Villa Navío",
    slug: "villa-navio",
    meta: "Alhaurín de la Torre · 2024",
    image: "/source-media/2026/07/241023_24008_VILLA-NAVIO_01-scaled.jpg",
  },
] as const;

const serviceVisuals = {
  measure: "/media/services/Arquitectura a medida.png",
  bim: "/media/services/Proyectos para promotoras.png",
  guarantee: "/media/services/Proyectos de edificación.png",
  site: "/media/services/Dirección de obra.png",
  passive: "/media/services/Passivhaus.png",
  interior: "/media/services/Interiorismo.png",
} as const;

const heroSlides = [
  {
    src: "/source-media/2026/07/20260707_24002_VILLA-SIERRA-BLANCA_03-CARRUSEL.jpg",
    alt: "Villa Sierra Blanca, Marbella — Fran Ruiz Arquitectos",
  },
  {
    src: "/source-media/2026/07/20241114_24082-PBEDO-VUAP-CASA-PLAYA_01-BANNER.jpg",
    alt: "Casa Playa — Fran Ruiz Arquitectos",
  },
  {
    src: "/source-media/2026/07/20260118_24064_VILLA-MICRIMARVA_CARROUSEL.jpg",
    alt: "Villa Micrimarva — Fran Ruiz Arquitectos",
  },
] as const;

export default function HomeExperience({ language = "es" }: { language?: "es" | "en" }) {
  const t = copy[language];

  useEffect(() => {
    if (window.location.hash === "#top") {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
      window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "auto" }));
    }
  }, []);

  return (
    <main className="new-home" id="top">
      <MainHeader language={language} theme="dark" />

      <section className="new-hero">
        <div className="new-hero-media">
          {heroSlides.map((slide, index) => (
            <Image
              className={`new-hero-slide new-hero-slide--${index + 1}`}
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              unoptimized
              key={slide.src}
            />
          ))}
        </div>
        <div className="new-hero-shade" />
        <div className="new-hero-copy">
          <h1>{t.heroTitle}</h1>
          <div className="new-hero-bottom">
            <p>{t.heroBody}</p>
            <Link className="action-pill action-pill--on-dark" href={language === "en" ? "/en/projects" : "/proyectos"}><ActionLabel>{t.explore}</ActionLabel><ArrowIcon /></Link>
          </div>
        </div>
        <p className="new-hero-scroll"><span />{t.scroll}</p>
      </section>

      <section className="home-statement section-shell">
        <h2 data-reveal data-motion-pace="slow">{t.statement}</h2>
      </section>

      <section className="home-selected section-shell">
        <div className="home-section-head" data-reveal>
          <Link className="action-pill" href={language === "en" ? "/en/projects" : "/proyectos"}><ActionLabel>{t.archive}</ActionLabel><ArrowIcon direction="right" /></Link>
        </div>
        <div className="home-projects">
          {featuredProjects.map((project, index) => (
            <article className={`home-project home-project--${index + 1}`} data-reveal key={project.slug}>
              <Link href={`/proyectos/${project.slug}`}>
                <div className="home-project-image">
                  <Image src={project.image} alt={project.title} fill sizes="(max-width: 800px) 100vw, 70vw" unoptimized />
                </div>
                <div className="home-project-caption">
                  <h3>{project.title}</h3>
                  <p>{project.meta}</p>
                  <span className="project-direction"><ArrowIcon /></span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="home-services" id="servicios">
        <div className="section-shell">
          <div className="home-services-intro" data-reveal>
            <h2>{t.servicesTitle}</h2>
            <p>{t.servicesIntro}</p>
          </div>
          <div className="home-service-list">
            {t.services.map(([number, visualKey, title, description, href], index) => (
              <article className={`home-service-item home-service-item--${index + 1}`} data-reveal key={number}>
                <Link href={href} aria-label={title}>
                  <div className="home-service-visual">
                    <Image
                      src={serviceVisuals[visualKey]}
                      alt=""
                      fill
                      sizes="(max-width: 760px) 100vw, 62vw"
                      unoptimized
                    />
                  </div>
                  <div className="home-service-copy">
                    <h3>{title}</h3>
                    <p>{description}</p>
                    <span className="home-service-arrow" aria-hidden="true">
                      <ArrowIcon direction="right" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
          <div className="home-services-more" data-reveal>
            <Link className="action-pill" href={language === "en" ? "/en/services" : "/servicios"}>
              <ActionLabel>{t.allServices}</ActionLabel><ArrowIcon direction="right" />
            </Link>
          </div>
        </div>
      </section>

      <section className="home-studio section-shell">
        <div className="home-studio-image" data-reveal>
          <Image src="/media/projects/hotel-rural.jpg" alt="Architecture by Fran Ruiz Arquitectos" fill sizes="(max-width: 800px) 100vw, 48vw" unoptimized />
        </div>
        <div className="home-studio-copy" data-reveal>
          <h2>{t.studioTitle}</h2>
          <p>{t.studioBody}</p>
          <Link className="action-pill" href={language === "en" ? "/en/the-study" : "/estudio"}><ActionLabel>{t.studioLink}</ActionLabel><ArrowIcon direction="right" /></Link>
        </div>
      </section>

      <GoogleReviewsSection language={language} />

      <SiteFooter language={language} precedingTone="dark" />
    </main>
  );
}
