export type ServiceLanguage = "es" | "en";

export type ServiceDefinition = {
  es: string;
  en: string;
  title: Record<ServiceLanguage, string>;
  image: string;
  gallery: string[];
};

export const services: ServiceDefinition[] = [
  {
    es: "proyecto-vivienda-unifamiliar-malaga",
    en: "single-family-home-project-malaga",
    title: { es: "Vivienda unifamiliar", en: "Single-family homes" },
    image: "/source-media/2026/07/20260707_24002_VILLA-SIERRA-BLANCA_02-scaled.jpg",
    gallery: [
      "/source-media/2026/07/20260707_24002_VILLA-SIERRA-BLANCA_03-scaled.jpg",
      "/source-media/2026/07/20260707_24002_VILLA-SIERRA-BLANCA_04-scaled.jpg",
      "/source-media/2026/07/20260707_24002_VILLA-SIERRA-BLANCA_05-scaled.jpg",
    ],
  },
  {
    es: "proyecto-promotoras-malaga",
    en: "promoters-project-malaga",
    title: { es: "Proyectos para promotoras", en: "Developer projects" },
    image: "/source-media/2026/04/250208_23063_EDIFICIO-CRETA_02-copia-1-scaled.jpg",
    gallery: [
      "/source-media/2026/04/250211_23063_EDIFICIO-CRETA_03-copia-1-scaled.jpg",
      "/source-media/2026/04/250211_23063_EDIFICIO-CRETA_04-copia-1-scaled.jpg",
      "/source-media/2026/04/250211_23063_EDIFICIO-CRETA_09-copia-1-scaled.jpg",
    ],
  },
  {
    es: "arquitecto-tecnico-malaga",
    en: "technical-architect-malaga",
    title: { es: "Arquitectura técnica", en: "Technical architecture" },
    image: "/source-media/2026/07/23020_ISOMETRICA-PISCINA.jpg",
    gallery: [
      "/source-media/2026/07/23020_PISCINA.jpg",
      "/source-media/2026/07/23020_FACHADA-PRINCIPAL.jpg",
      "/source-media/2026/07/23020_DORMITORIO.jpg",
    ],
  },
  {
    es: "passivhaus-malaga",
    en: "passivhaus-malaga",
    title: { es: "Passivhaus", en: "Passivhaus" },
    image: "/source-media/2026/05/20210924_652021_PBE-VUP_JESUS-Y-MARTA_STA-CLARA_FRONTAL-CON-ANGULO_ATARDECER-copia.jpg",
    gallery: [
      "/source-media/2026/05/20210924_652021_PBE-VUP_JESUS-Y-MARTA_STA-CLARA_FRONTAL_DIURNA_ATARDECER-copia.jpg",
      "/source-media/2026/05/20210924_652021_PBE-VUP_JESUS-Y-MARTA_STA-CLARA_FRONTAL-INTERIOR_SALON-copia.jpg",
      "/source-media/2026/05/20210924_652021_PBE-VUP_JESUS-Y-MARTA_STA-CLARA_FRONTAL-INTERIOR_HABITACION-copia.jpg",
    ],
  },
  {
    es: "urbanismo-malaga",
    en: "malaga-urban-planning",
    title: { es: "Urbanismo", en: "Urban planning" },
    image: "/source-media/2026/04/Isometrica-lateral-copia.jpg",
    gallery: [
      "/source-media/2026/04/Entrada-copia.jpg",
      "/source-media/2026/04/Patio-exterior-propuesta-02-02-copia.jpg",
      "/source-media/2026/04/Patio-exterior-propuesta-02-01-copia.jpg",
    ],
  },
  {
    es: "interiorismo-malaga",
    en: "interior-design-malaga",
    title: { es: "Interiorismo", en: "Interior design" },
    image: "/source-media/2026/07/Interior-03-copia.jpg",
    gallery: [
      "/source-media/2026/05/20220417_69021_PBE-Villa-Flavia-Isa_INTERIOR_01-copia.jpg",
      "/source-media/2026/05/20220417_69021_PBE-Villa-Flavia-Isa_INTERIOR_03-copia.jpg",
      "/source-media/2026/05/20220417_69021_PBE-Villa-Flavia-Isa_INTERIOR_04-copia.jpg",
    ],
  },
  {
    es: "arquitecto-perito-malaga",
    en: "expert-architect-malaga",
    title: { es: "Peritaciones", en: "Expert reports" },
    image: "/source-media/2026/07/230704_20039_VILLA-CANDEAL_03-copia-scaled.jpg",
    gallery: [
      "/source-media/2026/07/230704_20039_VILLA-CANDEAL_04-copia-scaled.jpg",
      "/source-media/2026/07/230704_20039_VILLA-CANDEAL_02-copia.jpg",
      "/source-media/2026/07/230704_20039_VILLA-CANDEAL_01-copia-scaled.jpg",
    ],
  },
  {
    es: "proyectos-edificacion-malaga",
    en: "building-projects-malaga",
    title: { es: "Proyectos de edificación", en: "Building projects" },
    image: "/source-media/2026/04/250331_22018_PBE-EPEM_EDIFICIO-DATILES_02-copia-scaled.jpg",
    gallery: [
      "/source-media/2026/04/250331_22018_PBE-EPEM_EDIFICIO-DATILES_05-copia-scaled.jpg",
      "/source-media/2026/04/250331_22018_PBE-EPEM_EDIFICIO-DATILES_04-copia-scaled.jpg",
      "/source-media/2026/04/250331_22018_PBE-EPEM_EDIFICIO-DATILES_03-copia-scaled.jpg",
    ],
  },
  {
    es: "legalizar-vivienda-suelo-no-urbanizable-malaga",
    en: "legalizing-housing-on-non-urbanizable-land-in-malaga",
    title: { es: "Legalización de viviendas", en: "Property legalisation" },
    image: "/source-media/2026/05/20138_EL-RETIRO_EXTERIOR-copia.jpg",
    gallery: [
      "/source-media/2026/05/20138_EL-RETIRO_ENTRADA-PRINCIPAL-copia.jpg",
      "/source-media/2026/05/20138_EL-RETIRO_PASARELA-copia.jpg",
      "/source-media/2026/05/20138_EL-RETIRO_SENDERO-copia.jpg",
    ],
  },
];

export function serviceHref(service: ServiceDefinition, language: ServiceLanguage) {
  return language === "en" ? `/en/${service.en}` : `/${service.es}`;
}

export function serviceFromSlug(slug: string, language: ServiceLanguage) {
  return services.find((service) => service[language] === slug);
}
