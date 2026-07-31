"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ArrowIcon from "../components/ArrowIcon";
import ActionLabel from "../components/ActionLabel";
import MainHeader from "../components/MainHeader";
import SiteFooter from "../components/SiteFooter";

type Lang = "es" | "en";

const copy = {
  es: {
    heroTitle: "Pensamos antes de dibujar.",
    heroBody:
      "Fran Ruiz Arquitectos es un estudio multidisciplinar con sedes en Málaga y Marbella. Arquitectura, técnica e interiorismo trabajan juntos desde la primera decisión.",
    heroCta: "Cuéntanos tu proyecto",
    imageCaption: "Arquitectura concebida desde el lugar, la luz y la forma de habitar.",
    heroFacts: [
      ["Desde", "2006"],
      ["Proyectos", "350+"],
      ["Sedes", "Málaga · Marbella"],
    ],
    projectLinkLabel: "Ver proyecto Villa Sierra Blanca",
    originTitle: "La arquitectura empieza escuchando.",
    originBody:
      "El estudio nació en 2006 en Alhaurín de la Torre. Desde entonces hemos crecido sin perder una forma de trabajar cercana: entender cómo vive cada cliente, anticipar las decisiones difíciles y hacer comprensible todo el proceso.",
    originBodyTwo:
      "Hoy reunimos arquitectos, ingenieros, topógrafos, diseñadores e interioristas. Esa estructura nos permite mantener una idea clara desde el primer croquis hasta la obra terminada.",
    timeline: [
      ["2006", "Fundación del estudio en Alhaurín de la Torre."],
      ["Málaga", "Trabajo continuo en toda la provincia y la Costa del Sol."],
      ["Marbella", "Segunda sede para acompañar proyectos en el litoral occidental."],
    ],
    methodTitle: "Cómo trabajamos",
    methodIntro:
      "Cada fase tiene una pregunta concreta. Resolverla en el momento adecuado evita ruido, retrasos y decisiones improvisadas.",
    method: [
      ["Escuchar", "Definimos necesidades, prioridades, presupuesto y relación con el lugar."],
      ["Ordenar", "Convertimos la información en una estrategia espacial, técnica y económica."],
      ["Coordinar", "Integramos arquitectura, estructura, instalaciones, interiorismo y licencias."],
      ["Construir", "Acompañamos la obra, verificamos cada decisión y cuidamos la entrega."],
    ],
    disciplinesTitle: "Una estructura completa",
    disciplinesIntro:
      "El proyecto no cambia de manos. Las distintas disciplinas comparten información, criterio y responsabilidad.",
    teamTitle: "El criterio es colectivo.",
    teamBody:
      "El estudio reúne perfiles distintos con una misma exigencia: que cada solución sea clara, construible y adecuada para quien la habita.",
    teamLink: "Conocer al equipo",
    contactTitle: "La siguiente conversación puede empezar aquí.",
    contactBody:
      "Cuéntanos dónde está tu proyecto, en qué fase se encuentra y qué necesitas. Nuestro equipo te responderá para organizar una primera conversación.",
    contactCta: "Ir a contacto",
    offices: "Málaga y Marbella",
    coverage:
      "Trabajamos en Marbella, Benalmádena, Estepona, Mijas, Sotogrande, Zagaleta y toda la provincia de Málaga.",
  },
  en: {
    heroTitle: "We think before we draw.",
    heroBody:
      "Fran Ruiz Architects is a multidisciplinary practice with studios in Málaga and Marbella. Architecture, technical design, and interiors work together from the first decision.",
    heroCta: "Start your project",
    imageCaption: "Architecture shaped by place, light, and the way people live.",
    heroFacts: [
      ["Since", "2006"],
      ["Projects", "350+"],
      ["Studios", "Málaga · Marbella"],
    ],
    projectLinkLabel: "View Villa Sierra Blanca project",
    originTitle: "Architecture begins by listening.",
    originBody:
      "The practice was founded in Alhaurín de la Torre in 2006. We have grown without losing a close way of working: understanding how each client lives, anticipating difficult decisions, and making the entire process understandable.",
    originBodyTwo:
      "Today we bring together architects, engineers, surveyors, designers, and interior specialists. This structure keeps one clear idea intact from the first sketch to the completed building.",
    timeline: [
      ["2006", "The practice is founded in Alhaurín de la Torre."],
      ["Málaga", "Continuous work across the province and the Costa del Sol."],
      ["Marbella", "A second studio serving projects along the western coast."],
    ],
    methodTitle: "How we work",
    methodIntro:
      "Each phase has a specific question. Answering it at the right moment prevents noise, delays, and improvised decisions.",
    method: [
      ["Listen", "We define needs, priorities, budget, and the relationship with the site."],
      ["Organise", "We turn information into a spatial, technical, and financial strategy."],
      ["Coordinate", "We integrate architecture, structure, services, interiors, and permits."],
      ["Build", "We follow the work, verify each decision, and oversee delivery."],
    ],
    disciplinesTitle: "A complete structure",
    disciplinesIntro:
      "The project does not change hands. Every discipline shares information, judgment, and responsibility.",
    teamTitle: "Judgment is collective.",
    teamBody:
      "The practice brings together different profiles with one shared standard: every solution must be clear, buildable, and right for the people who will inhabit it.",
    teamLink: "Meet the team",
    contactTitle: "The next conversation can start here.",
    contactBody:
      "Tell us where your project is, what stage it has reached, and what you need. Our team will reply to arrange an initial conversation.",
    contactCta: "Go to contact",
    offices: "Málaga and Marbella",
    coverage:
      "We work in Marbella, Benalmádena, Estepona, Mijas, Sotogrande, Zagaleta, and throughout Málaga province.",
  },
} as const;

const disciplines = [
  {
    title: { es: "Arquitectura residencial", en: "Residential architecture" },
    body: { es: "Vivienda nueva, rehabilitación y reforma integral.", en: "New homes, renovation, and comprehensive refurbishment." },
    slug: { es: "proyecto-vivienda-unifamiliar-malaga", en: "single-family-home-project-malaga" },
    image: "/source-media/2026/07/20260707_24002_VILLA-SIERRA-BLANCA_02-scaled.jpg",
    alt: { es: "Villa Sierra Blanca en Marbella", en: "Villa Sierra Blanca in Marbella" },
  },
  {
    title: { es: "Promoción y viabilidad", en: "Development and feasibility" },
    body: { es: "Estudios previos, licencias, proyecto y control económico.", en: "Early studies, permits, design, and cost control." },
    slug: { es: "proyecto-promotoras-malaga", en: "promoters-project-malaga" },
    image: "/source-media/2026/04/250208_23063_EDIFICIO-CRETA_02-copia-1-scaled.jpg",
    alt: { es: "Promoción residencial Edificio Creta", en: "Edificio Creta residential development" },
  },
  {
    title: { es: "BIM y coordinación técnica", en: "BIM and technical coordination" },
    body: { es: "Modelos coordinados para reducir incertidumbre antes de construir.", en: "Coordinated models that reduce uncertainty before construction." },
    slug: { es: "arquitecto-tecnico-malaga", en: "technical-architect-malaga" },
    image: "/source-media/2026/07/23020_ISOMETRICA-PISCINA.jpg",
    alt: { es: "Modelo isométrico coordinado de una vivienda", en: "Coordinated isometric model of a home" },
  },
  {
    title: { es: "Dirección de obra", en: "Construction management" },
    body: { es: "Seguimiento técnico, planificación y control hasta la entrega.", en: "Technical oversight, planning, and control through delivery." },
    slug: { es: "proyectos-edificacion-malaga", en: "building-projects-malaga" },
    image: "/source-media/2026/05/230325_20043_PB_POLIDEPORTIVO-SANTA-CLARA_06-EXTRA-copia-scaled.jpg",
    alt: { es: "Seguimiento de una obra de arquitectura", en: "Architectural construction oversight" },
  },
  {
    title: { es: "Interiorismo", en: "Interior design" },
    body: { es: "Espacio, material, iluminación y mobiliario como un único proyecto.", en: "Space, materials, lighting, and furniture treated as one project." },
    slug: { es: "interiorismo-malaga", en: "interior-design-malaga" },
    image: "/source-media/2026/07/Interior-03-copia.jpg",
    alt: { es: "Interior contemporáneo diseñado por el estudio", en: "Contemporary interior designed by the practice" },
  },
  {
    title: { es: "Passivhaus y consultoría", en: "Passivhaus and consultancy" },
    body: { es: "Eficiencia energética, informes, peritaciones y asesoramiento.", en: "Energy performance, reports, surveys, and technical advice." },
    slug: { es: "passivhaus-malaga", en: "passivhaus-malaga" },
    image: "/source-media/2026/03/250409_23067_VILLA-SUIZA_05-copia.jpg",
    alt: { es: "Villa Suiza de alta eficiencia energética", en: "Energy-efficient Villa Suiza" },
  },
] as const;

const methodVisuals = [
  {
    src: "/source-media/2025/11/architect-design-working-drawing-sketch-plans-blue-7BQRKK4.jpg",
    alt: {
      es: "Planos y herramientas sobre una mesa de trabajo",
      en: "Drawings and tools on a work table",
    },
  },
  {
    src: "/source-media/2025/11/architectural-building-design-8X4V44H.jpg",
    alt: {
      es: "Arquitectura definida mediante una estrategia precisa",
      en: "Architecture shaped through a precise strategy",
    },
  },
  {
    src: "/source-media/2026/07/23020_ISOMETRICA-PISCINA.jpg",
    alt: {
      es: "Modelo isométrico para la coordinación técnica",
      en: "Isometric model for technical coordination",
    },
  },
  {
    src: "/source-media/2026/07/20260707_24002_VILLA-SIERRA-BLANCA_03-scaled.jpg",
    alt: {
      es: "Villa Sierra Blanca durante la fase construida",
      en: "Villa Sierra Blanca in its completed phase",
    },
  },
] as const;

export default function StudioPage({ language = "es" }: { language?: Lang }) {
  const [activeMethod, setActiveMethod] = useState(0);
  const [activeDiscipline, setActiveDiscipline] = useState(0);
  const lang = language;
  const t = copy[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <main className="studio-profile">
      <MainHeader language={lang} current="studio" theme="light" />

      <section className="studio-profile-hero editorial-route-hero section-shell" id="top">
        <div className="studio-profile-hero-copy">
          <h1>{t.heroTitle}</h1>
          <p>{t.heroBody}</p>
          <Link className="action-pill" href={lang === "en" ? "/en/contact" : "/contacto"}><ActionLabel>{t.heroCta}</ActionLabel><ArrowIcon /></Link>
          <div className="studio-profile-hero-signature">
            <dl className="studio-profile-proof">
              {t.heroFacts.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <p className="studio-profile-hero-caption">{t.imageCaption}</p>
          </div>
        </div>
      </section>

      <article className="studio-project-feature project-index-card section-shell" data-reveal>
        <Link href="/proyectos/villa-nadia" aria-label={t.projectLinkLabel}>
          <div className="studio-project-feature-image project-index-image home-project-image">
            <Image
              src="/source-media/2026/07/20260707_24002_VILLA-SIERRA-BLANCA_02-scaled.jpg"
              alt={lang === "es" ? "Villa Sierra Blanca en Marbella" : "Villa Sierra Blanca in Marbella"}
              fill
              sizes="100vw"
              unoptimized
            />
          </div>
          <div className="project-index-meta home-project-caption">
            <h2>Villa Sierra Blanca</h2>
            <p>Marbella · 2025</p>
            <span className="project-direction" aria-hidden="true"><ArrowIcon /></span>
          </div>
        </Link>
      </article>

      <section className="studio-profile-origin" id="origen">
        <div className="studio-profile-origin-inner section-shell">
          <div className="studio-profile-origin-title" data-reveal>
            <blockquote>{t.originTitle}</blockquote>
          </div>
          <figure className="studio-profile-origin-media" data-reveal>
            <Image
              src="/source-media/2026/01/franruiz1.jpg"
              alt={lang === "es" ? "Arquitectura residencial contemporánea de Fran Ruiz Arquitectos" : "Contemporary residential architecture by Fran Ruiz Architects"}
              fill
              sizes="(max-width: 760px) 100vw, 52vw"
              unoptimized
            />
          </figure>
          <div className="studio-profile-origin-body" data-reveal>
            <p>{t.originBody}</p>
            <p>{t.originBodyTwo}</p>
            <ol>
              {t.timeline.map(([year, description]) => (
                <li key={year}><strong>{year}</strong><span>{description}</span></li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="studio-profile-method section-shell" id="metodo">
        <header data-reveal>
          <h2>{t.methodTitle}</h2>
          <p>{t.methodIntro}</p>
        </header>
        <div className="studio-profile-method-composition">
          <figure data-reveal aria-live="off">
            {methodVisuals.map((visual, index) => (
              <Image
                className={`studio-profile-method-image ${index === activeMethod ? "is-active" : ""}`}
                src={visual.src}
                alt={visual.alt[lang]}
                aria-hidden={index !== activeMethod}
                fill
                sizes="(max-width: 980px) 100vw, 58vw"
                unoptimized
                key={visual.src}
              />
            ))}
          </figure>
          <ol>
            {t.method.map(([title, body], index) => (
              <li key={title} data-active={index === activeMethod} data-reveal>
                <button
                  type="button"
                  aria-pressed={index === activeMethod}
                  aria-describedby={index === activeMethod ? `method-description-${index}` : undefined}
                  onMouseEnter={() => setActiveMethod(index)}
                  onFocus={() => setActiveMethod(index)}
                  onClick={() => setActiveMethod(index)}
                >
                  <span className="studio-profile-method-number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="studio-profile-method-title">{title}</span>
                </button>
                <p id={`method-description-${index}`} aria-hidden={index !== activeMethod}>{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="studio-profile-disciplines" id="disciplinas">
        <div className="studio-profile-disciplines-inner section-shell">
          <div className="studio-profile-disciplines-intro" data-reveal>
            <h2>{t.disciplinesTitle}</h2>
            <p>{t.disciplinesIntro}</p>
            <figure aria-live="off">
              {disciplines.map((discipline, index) => (
                <Image
                  className={`studio-profile-discipline-image ${index === activeDiscipline ? "is-active" : ""}`}
                  src={discipline.image}
                  alt={discipline.alt[lang]}
                  aria-hidden={index !== activeDiscipline}
                  fill
                  sizes="(max-width: 980px) 100vw, 34vw"
                  unoptimized
                  key={discipline.title.es}
                />
              ))}
            </figure>
          </div>
          <div className="studio-profile-disciplines-list">
            {disciplines.map((discipline, index) => (
              <article
                key={discipline.title.es}
                data-reveal
                data-active={index === activeDiscipline}
                onMouseEnter={() => setActiveDiscipline(index)}
                onFocus={() => setActiveDiscipline(index)}
              >
                <Link
                  className="studio-profile-discipline-link"
                  href={lang === "en" ? `/en/${discipline.slug.en}` : `/${discipline.slug.es}`}
                >
                  <h3>{discipline.title[lang]}</h3>
                  <p>{discipline.body[lang]}</p>
                  <ArrowIcon />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="studio-profile-team section-shell" id="equipo">
        <div className="studio-profile-team-copy" data-reveal>
          <h2>{t.teamTitle}</h2>
          <p>{t.teamBody}</p>
          <Link className="action-pill" href="/equipo"><ActionLabel>{t.teamLink}</ActionLabel><ArrowIcon /></Link>
        </div>
        <div className="studio-profile-team-portrait" data-reveal>
          <Image
            src="/media/team/fran-ruiz.png"
            alt="Fran Ruiz"
            fill
            sizes="(max-width: 760px) calc(100vw - 2.5rem), (max-width: 980px) 45vw, 620px"
            unoptimized
          />
        </div>
      </section>

      <section className="studio-profile-close">
        <div className="studio-profile-close-inner section-shell">
          <div data-reveal>
            <h2>{t.contactTitle}</h2>
            <p>{t.contactBody}</p>
            <Link className="action-pill" href={lang === "en" ? "/en/contact" : "/contacto"}><ActionLabel>{t.contactCta}</ActionLabel><ArrowIcon /></Link>
          </div>
          <address data-reveal>
              <strong>{t.offices}</strong>
              <a href="tel:+34952417723">+34 952 41 77 23</a>
              <a href="mailto:administracion@franruizarquitectos.com">administracion@franruizarquitectos.com</a>
              <p>{t.coverage}</p>
          </address>
        </div>
      </section>

      <SiteFooter language={lang} precedingTone="light" />
    </main>
  );
}
