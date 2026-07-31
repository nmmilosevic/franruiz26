"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ArrowIcon from "../components/ArrowIcon";
import ActionLabel from "../components/ActionLabel";
import GoogleReviewsSection from "../components/GoogleReviewsSection";
import MainHeader from "../components/MainHeader";
import SiteFooter from "../components/SiteFooter";
import { readStoredLanguage, type Language } from "../lib/language";

type Lang = "es" | "en";

type TeamMember = {
  name: string;
  role: Record<Lang, string>;
  image: string;
  featured?: boolean;
};

const copy = {
  es: {
    projects: "Proyectos",
    studio: "Estudio",
    services: "Servicios",
    team: "Equipo",
    contact: "Contacto",
    back: "Volver al inicio",
    overline: "El estudio",
    title: "Un equipo multidisciplinar con un criterio compartido.",
    intro: "Arquitectos, ingenieros y técnicos coordinados como un solo equipo. Distintas disciplinas, una misma responsabilidad: cuidar cada decisión desde la primera idea hasta la obra construida.",
    closing: "Un proyecto sólido nace de muchas miradas trabajando en la misma dirección.",
    closingBody: "Reunimos diseño, estructura, ejecución y detalle dentro del estudio para que el proceso sea claro, ágil y coherente.",
    cta: "Cuéntanos tu proyecto",
  },
  en: {
    projects: "Projects",
    studio: "Studio",
    services: "Services",
    team: "Team",
    contact: "Contact",
    back: "Back to home",
    overline: "The studio",
    title: "A multidisciplinary team with a shared point of view.",
    intro: "Architects, engineers, and technical specialists coordinated as one team. Different disciplines, one responsibility: caring for every decision from the first idea to the finished building.",
    closing: "A strong project begins with many perspectives moving in the same direction.",
    closingBody: "We bring design, structure, delivery, and detail together within the studio so the process remains clear, agile, and coherent.",
    cta: "Start your project",
  },
} as const;

const team: readonly TeamMember[] = [
  { name: "Francisco J. Ruiz Palomo", role: { es: "Arquitecto, fundador y CEO", en: "Architect, founder and CEO" }, image: "/media/team/fran-ruiz.png", featured: true },
  { name: "Juan Antonio Benítez", role: { es: "Arquitecto técnico · Dirección de ejecución material de obra", en: "Technical architect · Construction execution management" }, image: "/media/team/juan-antonio-benitez.png" },
  { name: "Moisés Ruiz Palomo", role: { es: "Ingeniero de caminos, canales y puertos · Cálculo de estructuras", en: "Civil engineer · Structural engineering" }, image: "/media/team/moises-ruiz-clean.png" },
  { name: "Margarita Donaire Galiano", role: { es: "Arquitecta · Anteproyecto y planeamiento", en: "Architect · Concept design and planning" }, image: "/media/team/margarita-donaire.png" },
  { name: "Emilio Becerra Jiménez", role: { es: "Arquitecto superior · Colaborador", en: "Senior architect · Collaborator" }, image: "/media/team/emilio-becerra.png" },
  { name: "Salvador Tomé Cañada", role: { es: "Técnico superior en desarrollo y aplicación de proyectos de construcción", en: "Senior technician · Construction project development" }, image: "/media/team/salvador-tome-clean.png" },
  { name: "Marina Escalona Chaves", role: { es: "Modeladora BIM", en: "BIM modeller" }, image: "/media/team/marina-escalona.png" },
  { name: "Carmen Sánchez López", role: { es: "Finanzas · Jurídico", en: "Finance · Legal" }, image: "/media/team/carmen.png" },
  { name: "Estrella López Moreno", role: { es: "Producción · Obras", en: "Production · Construction" }, image: "/media/team/estrella.png" },
] as const;

export default function TeamPage() {
  const [lang, setLang] = useState<Lang>("es");
  const t = copy[lang];

  useEffect(() => {
    const stored = readStoredLanguage();
    if (stored) setLang(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLanguage = (next: Language) => {
    setLang(next);
  };

  return (
    <main className="team-page">
      <MainHeader language={lang} onLanguageChange={setLanguage} theme="light" current="team" />

      <section className="team-page-hero editorial-route-hero">
        <div className="team-page-hero-inner section-shell">
          <div className="team-hero-copy">
            <h1>{t.title}</h1>
          </div>
          <div className="team-hero-intro">
            <p>{t.intro}</p>
          </div>
        </div>
      </section>

      <section className="team-page-index section-shell">
        <div className="team-page-grid">
          {team.map((person, index) => (
            <figure
              key={person.name}
              className={`team-person team-person-${index + 1}${person.featured ? " team-person--founder" : ""}`}
              data-reveal
              style={{ "--delay": `${(index % 3) * 70}ms` } as React.CSSProperties}
            >
              <div className="team-person-image">
                <Image
                  src={person.image}
                  alt={person.name}
                  fill
                  sizes={person.featured ? "(max-width: 760px) 100vw, (max-width: 980px) 66vw, 42vw" : "(max-width: 760px) 100vw, 33vw"}
                  unoptimized
                />
              </div>
              <figcaption>
                <strong>{person.name}</strong>
                <span>{person.role[lang]}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <GoogleReviewsSection language={lang} />

      <section className="team-page-closing">
        <div className="section-shell">
          <h2>{t.closing}</h2>
          <div className="team-page-closing-support">
            <p>{t.closingBody}</p>
            <Link className="action-pill" href={lang === "en" ? "/en/contact" : "/contacto"}><ActionLabel>{t.cta}</ActionLabel><ArrowIcon /></Link>
          </div>
        </div>
      </section>

      <SiteFooter language={lang} precedingTone="light" />
    </main>
  );
}
