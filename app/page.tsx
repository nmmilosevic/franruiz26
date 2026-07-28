"use client";

import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";

type Lang = "es" | "en";

const copy = {
  es: {
    nav: { projects: "Proyectos", studio: "Estudio", services: "Servicios", team: "Equipo", contact: "Contacto" },
    heroOverline: "Arquitectura en Málaga y la Costa del Sol",
    heroTitle: "Espacios que entienden cómo quieres vivir.",
    heroBody: "Dos décadas escuchando, proyectando y construyendo lugares con identidad. Desde Málaga y Marbella, un único equipo acompaña cada decisión.",
    heroCta: "Cuéntanos tu proyecto",
    scroll: "Explorar",
    introTitle: "Diseñamos contigo, desde la primera conversación hasta la última decisión.",
    introBody: "Arquitectos, ingenieros, topógrafos, diseñadores e interioristas coordinados como un solo estudio. Traducimos necesidades complejas en espacios claros, sensibles y construidos para durar.",
    years: "años de experiencia",
    completed: "proyectos realizados",
    projectsTitle: "Proyectos que hablan por sí solos",
    projectsBody: "Viviendas, espacios de hospitalidad y proyectos de escala urbana definidos por el lugar, la luz y la vida que acogerán.",
    viewProject: "Ver proyecto",
    studioQuote: "La arquitectura empieza escuchando.",
    studioBody: "Fran Ruiz Arquitectos nació en 2006 en Alhaurín de la Torre. Hoy, desde nuestras oficinas de Málaga y Marbella, seguimos trabajando con la misma cercanía: acompañar al cliente, anticipar problemas y hacer comprensible cada fase.",
    servicesTitle: "Un estudio, todo el proceso",
    servicesBody: "Diseño, técnica y dirección reunidos para que el proyecto avance con claridad, calidad y control.",
    teamTitle: "Personas que hacen posible cada proyecto",
    teamBody: "Un equipo multidisciplinar que comparte criterio, responsabilidad y atención al detalle.",
    commitmentTitle: "Nuestro compromiso contigo",
    commitmentBody: "Creamos cada proyecto como una historia única, entendiendo tu estilo de vida, tus prioridades y aquello que hace tu espacio diferente. Te guiamos con criterios sólidos y decisiones fáciles de entender, para que disfrutes tanto del proceso como del resultado.",
    contactTitle: "Tu idea empieza aquí.",
    contactBody: "Cuéntanos dónde estás y qué necesitas. Te responderemos para concertar una primera conversación.",
    name: "Nombre",
    phone: "Teléfono",
    email: "Correo electrónico",
    message: "Háblanos de tu proyecto",
    privacy: "He leído y acepto la política de privacidad.",
    send: "Enviar consulta",
    sent: "Gracias. Hemos preparado tu consulta para el equipo.",
    offices: "Estudios",
    coverage: "Trabajamos en Marbella, Benalmádena, Estepona, Mijas, Sotogrande, Zagaleta y toda la provincia de Málaga.",
    legal: "Política de privacidad · Política de cookies · Política de calidad",
    close: "Cerrar proyecto",
    details: "Ficha del proyecto",
  },
  en: {
    nav: { projects: "Projects", studio: "Studio", services: "Services", team: "Team", contact: "Contact" },
    heroOverline: "Architecture in Málaga and the Costa del Sol",
    heroTitle: "Spaces that understand how you want to live.",
    heroBody: "Two decades listening, designing, and building places with identity. From Málaga and Marbella, one team guides every decision.",
    heroCta: "Start your project",
    scroll: "Explore",
    introTitle: "We design with you, from the first conversation to the final decision.",
    introBody: "Architects, engineers, surveyors, designers, and interior specialists coordinated as one studio. We turn complex needs into clear, sensitive spaces built to last.",
    years: "years of experience",
    completed: "completed projects",
    projectsTitle: "Projects that speak for themselves",
    projectsBody: "Homes, hospitality spaces, and urban-scale work defined by place, light, and the lives they will hold.",
    viewProject: "View project",
    studioQuote: "Architecture begins by listening.",
    studioBody: "Fran Ruiz Arquitectos was founded in Alhaurín de la Torre in 2006. Today, from our Málaga and Marbella offices, we work with the same close approach: guiding clients, anticipating problems, and making every stage understandable.",
    servicesTitle: "One studio, the entire process",
    servicesBody: "Design, technical expertise, and site direction brought together so every project moves with clarity, quality, and control.",
    teamTitle: "The people behind every project",
    teamBody: "A multidisciplinary team sharing judgment, responsibility, and attention to detail.",
    commitmentTitle: "Our commitment to you",
    commitmentBody: "We create each project as a unique story, understanding your lifestyle, priorities, and what makes your space different. We guide you with sound criteria and decisions that are easy to understand, so you can enjoy the process as much as the result.",
    contactTitle: "Your idea starts here.",
    contactBody: "Tell us where you are and what you need. We will reply to arrange an initial conversation.",
    name: "Name",
    phone: "Phone",
    email: "Email address",
    message: "Tell us about your project",
    privacy: "I have read and accept the privacy policy.",
    send: "Send enquiry",
    sent: "Thank you. Your enquiry is ready for our team.",
    offices: "Studios",
    coverage: "We work in Marbella, Benalmádena, Estepona, Mijas, Sotogrande, Zagaleta, and across Málaga province.",
    legal: "Privacy policy · Cookie policy · Quality policy",
    close: "Close project",
    details: "Project details",
  },
} as const;

const projects = [
  {
    id: "sierra",
    title: "Villa Sierra Blanca",
    location: "Marbella",
    year: "2026",
    category: { es: "Rehabilitación residencial", en: "Residential renovation" },
    image: "/media/projects/villa-sierra-blanca.jpg",
    excerpt: {
      es: "Una profunda transformación estructural convierte una villa existente en una residencia contemporánea abierta al paisaje de Marbella.",
      en: "A deep structural transformation turns an existing villa into a contemporary residence open to the Marbella landscape.",
    },
    description: {
      es: "Tres niveles articulan estancias generosas, terrazas orientadas a la costa, piscina, cocina de verano y un nuevo garaje privado. Líneas limpias, piedra, madera y grandes superficies de vidrio unen privacidad, vida social y exterior.",
      en: "Three levels organise generous rooms, coast-facing terraces, a pool, summer kitchen, and a new private garage. Clean lines, stone, timber, and expansive glass bring together privacy, social life, and the outdoors.",
    },
  },
  {
    id: "playa",
    title: "Casa Playa",
    location: "Costa del Sol",
    year: "2024",
    category: { es: "Vivienda unifamiliar", en: "Private residence" },
    image: "/media/projects/casa-playa.jpg",
    excerpt: {
      es: "Una vivienda definida por la horizontalidad, la sombra y una relación directa con el Mediterráneo.",
      en: "A home defined by horizontality, shade, and a direct relationship with the Mediterranean.",
    },
    description: {
      es: "La arquitectura extiende la vida interior hacia porches y terrazas, controlando el sol mediante planos profundos y una materialidad serena.",
      en: "The architecture extends interior life into porches and terraces, controlling the sun through deep planes and a calm material palette.",
    },
  },
  {
    id: "hotel",
    title: "Hotel Rural",
    location: "Alhaurín de la Torre",
    year: "2018",
    category: { es: "Hotel · Glamping", en: "Hotel · Glamping" },
    image: "/media/projects/hotel-rural.jpg",
    excerpt: {
      es: "Arquitectura, paisaje y bienestar conviven en un refugio contemporáneo inmerso en el bosque.",
      en: "Architecture, landscape, and wellbeing meet in a contemporary retreat immersed in woodland.",
    },
    description: {
      es: "El complejo integra alojamientos, restaurante, club social, piscinas y recorridos ajardinados. Piedra natural, madera termotratada y vidrio difuminan el límite entre interior y paisaje.",
      en: "The complex integrates accommodation, a restaurant, social club, pools, and landscaped paths. Natural stone, heat-treated timber, and glass soften the boundary between interior and landscape.",
    },
  },
  {
    id: "mandala",
    title: "Restaurante Mandala",
    location: "Costa del Sol",
    year: "2026",
    category: { es: "Hospitalidad e interiorismo", en: "Hospitality and interiors" },
    image: "/media/projects/restaurante-mandala.jpg",
    excerpt: {
      es: "Tres arcos, una fachada de vidrio y una terraza abierta al paseo marítimo construyen una experiencia ligada al mar.",
      en: "Three arches, a glass façade, and a promenade-facing terrace create an experience connected to the sea.",
    },
    description: {
      es: "El blanco, la madera y la vegetación articulan un interior de doble altura. Formas orgánicas y visuales abiertas convierten la arquitectura en una experiencia luminosa y sensorial.",
      en: "White surfaces, timber, and planting shape a double-height interior. Organic forms and open views turn the architecture into a bright, sensory experience.",
    },
  },
  {
    id: "micrimarva",
    title: "Villa Micrimarva",
    location: "Málaga",
    year: "2026",
    category: { es: "Vivienda unifamiliar", en: "Private residence" },
    image: "/media/projects/villa-micrimarva.jpg",
    excerpt: {
      es: "Volúmenes precisos y espacios exteriores protegidos organizan una forma de vida abierta y tranquila.",
      en: "Precise volumes and sheltered outdoor spaces organise an open, quiet way of living.",
    },
    description: {
      es: "La vivienda trabaja con luz, privacidad y continuidad material para reunir las zonas de día con el jardín y mantener espacios íntimos claramente definidos.",
      en: "The home works with light, privacy, and material continuity to connect living areas with the garden while keeping intimate spaces clearly defined.",
    },
  },
] as const;

const services = [
  {
    title: { es: "Arquitectura a medida", en: "Bespoke architecture" },
    body: { es: "Viviendas y espacios diseñados contigo, adaptados a tu forma de vivir.", en: "Homes and spaces designed with you, adapted to the way you live." },
  },
  {
    title: { es: "Proyectos para promotoras", en: "Development projects" },
    body: { es: "Viabilidad, proyecto, licencias, licitación, control económico y seguimiento de obra.", en: "Feasibility, design, permits, tendering, cost control, and construction oversight." },
  },
  {
    title: { es: "BIM y control de costes", en: "BIM and cost control" },
    body: { es: "Modelos precisos en 3D y planificación eficiente en cada fase.", en: "Accurate 3D models and efficient planning at every stage." },
  },
  {
    title: { es: "Dirección de obra", en: "Construction management" },
    body: { es: "Supervisión continua, coordinación técnica y control hasta la entrega.", en: "Continuous supervision, technical coordination, and control through delivery." },
  },
  {
    title: { es: "Passivhaus", en: "Passivhaus" },
    body: { es: "Espacios sostenibles y confortables con un consumo energético mínimo.", en: "Sustainable, comfortable spaces with minimal energy use." },
  },
  {
    title: { es: "Interiorismo", en: "Interior design" },
    body: { es: "Interiores funcionales y exclusivos, resueltos con detalle y equilibrio.", en: "Functional, distinctive interiors resolved with detail and balance." },
  },
  {
    title: { es: "Arquitectura técnica y peritaciones", en: "Technical architecture and surveys" },
    body: { es: "Informes, patologías, ITE, eficiencia energética, licencias y asesoramiento técnico.", en: "Reports, building pathology, inspections, energy certification, permits, and technical advice." },
  },
] as const;

const team = [
  { name: "Francisco J. Ruiz Palomo", role: { es: "Arquitecto, director y fundador", en: "Architect, director and founder" }, image: "/media/team/fran-ruiz.jpg" },
  { name: "Juan Antonio Benítez", role: { es: "Arquitecto técnico · Dirección de ejecución", en: "Technical architect · Site execution" }, image: "/media/team/juan-antonio-benitez.jpg" },
  { name: "Moisés Ruiz Palomo", role: { es: "Ingeniero de caminos · Estructuras", en: "Civil engineer · Structures" }, image: "/media/team/moises-ruiz.jpg" },
  { name: "Margarita Donaire Galiano", role: { es: "Arquitecta · Anteproyecto y planeamiento", en: "Architect · Concept design and planning" }, image: "/media/team/margarita-donaire.jpg" },
  { name: "Emilio Becerra Jiménez", role: { es: "Arquitecto sénior colaborador", en: "Senior architect contributor" }, image: "/media/team/emilio-becerra.jpg" },
  { name: "Salvador Tomé Cañada", role: { es: "Técnico superior en proyectos de edificación", en: "Senior building-project technician" }, image: "/media/team/salvador-tome.jpg" },
  { name: "Marina Escalona Chaves", role: { es: "Técnica superior en proyectos de edificación", en: "Senior building-project technician" }, image: "/media/team/marina-escalona.jpg" },
  { name: "Carmen", role: { es: "Equipo de estudio", en: "Studio team" }, image: "/media/team/carmen.jpeg" },
  { name: "Estrella", role: { es: "Equipo de estudio", en: "Studio team" }, image: "/media/team/estrella.jpeg" },
] as const;

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  const [lang, setLang] = useState<Lang>("es");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<(typeof projects)[number] | null>(null);
  const [sent, setSent] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const t = copy[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.setAttribute("data-visible", "true")),
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [lang]);

  useEffect(() => {
    if (!activeProject) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    const close = (event: KeyboardEvent) => event.key === "Escape" && setActiveProject(null);
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", close);
    };
  }, [activeProject]);

  const nav = [
    ["projects", t.nav.projects],
    ["studio", t.nav.studio],
    ["services", t.nav.services],
    ["team", t.nav.team],
  ];

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <main>
      <div className="load-veil" aria-hidden="true"><span /><span /><span /></div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Fran Ruiz Arquitectos, inicio">
          <Image src="/brand/logo-original.webp" alt="Fran Ruiz Arquitectos" width={300} height={126} priority />
        </a>
        <nav className="desktop-nav" aria-label={lang === "es" ? "Navegación principal" : "Main navigation"}>
          {nav.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>
        <div className="header-actions">
          <div className="language-switch" aria-label={lang === "es" ? "Seleccionar idioma" : "Select language"}>
            <button className={lang === "es" ? "active" : ""} onClick={() => setLang("es")} aria-pressed={lang === "es"}>ES</button>
            <span>/</span>
            <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")} aria-pressed={lang === "en"}>EN</button>
          </div>
          <a className="header-contact" href="#contact">{t.nav.contact}<Arrow /></a>
          <button className="menu-button" aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>
            <span>{menuOpen ? "Cerrar" : "Menu"}</span><i /><i />
          </button>
        </div>
      </header>

      <div id="mobile-menu" className={`mobile-menu ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <nav>
          {nav.map(([id, label], index) => (
            <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{label}</a>
          ))}
          <a href="#contact" onClick={() => setMenuOpen(false)}><span>05</span>{t.nav.contact}</a>
        </nav>
        <p>Málaga · Marbella · Costa del Sol</p>
      </div>

      <section id="top" className="hero">
        <div className="hero-media">
          <Image src="/media/projects/villa-sierra-blanca.jpg" alt={lang === "es" ? "Villa contemporánea en Sierra Blanca, Marbella" : "Contemporary villa in Sierra Blanca, Marbella"} fill priority sizes="100vw" />
          <div className="hero-shade" />
        </div>
        <div className="hero-copy">
          <p className="hero-overline">{t.heroOverline}</p>
          <h1>{t.heroTitle}</h1>
          <div className="hero-lower">
            <p>{t.heroBody}</p>
            <a className="circle-link" href="#contact"><span>{t.heroCta}</span><Arrow /></a>
          </div>
        </div>
        <a className="scroll-cue" href="#introduction"><span>{t.scroll}</span><i /></a>
      </section>

      <section id="introduction" className="introduction section-shell">
        <div className="section-index" data-reveal><span>FRA</span><span>2006—2026</span></div>
        <div className="intro-grid">
          <h2 data-reveal>{t.introTitle}</h2>
          <div className="intro-side" data-reveal>
            <p>{t.introBody}</p>
            <div className="facts">
              <div><strong>20+</strong><span>{t.years}</span></div>
              <div><strong>350+</strong><span>{t.completed}</span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="projects section-shell">
        <div className="section-heading" data-reveal>
          <h2>{t.projectsTitle}</h2>
          <p>{t.projectsBody}</p>
        </div>
        <div className="project-list">
          {projects.map((project, index) => (
            <article className={`project-entry project-${index + 1}`} key={project.id} data-reveal style={{ "--delay": `${(index % 2) * 90}ms` } as React.CSSProperties}>
              <button className="project-button" onClick={() => setActiveProject(project)} aria-label={`${t.viewProject}: ${project.title}`}>
                <span className="project-image">
                  <Image src={project.image} alt={`${project.title}, ${project.location}`} fill sizes="(max-width: 760px) 100vw, 62vw" />
                  <span className="project-hover">{t.viewProject}<Arrow /></span>
                </span>
                <span className="project-caption">
                  <span><strong>{project.title}</strong><small>{project.category[lang]}</small></span>
                  <span><small>{project.location}</small><small>{project.year}</small></span>
                </span>
              </button>
            </article>
          ))}
        </div>
      </section>

      <section id="studio" className="studio-story">
        <div className="studio-image" data-reveal>
          <Image src="/media/projects/villa-sierra-blanca-carousel.jpg" alt={lang === "es" ? "Vista de Villa Sierra Blanca" : "View of Villa Sierra Blanca"} fill sizes="55vw" />
        </div>
        <div className="studio-copy" data-reveal>
          <blockquote>{t.studioQuote}</blockquote>
          <p>{t.studioBody}</p>
          <a className="text-link" href="#team">{t.nav.team}<Arrow /></a>
        </div>
      </section>

      <section className="commitment section-shell">
        <div className="commitment-title" data-reveal>
          <span>20</span>
          <h2>{t.commitmentTitle}</h2>
        </div>
        <p data-reveal>{t.commitmentBody}</p>
      </section>

      <section id="services" className="services section-shell">
        <div className="section-heading service-heading" data-reveal>
          <h2>{t.servicesTitle}</h2>
          <p>{t.servicesBody}</p>
        </div>
        <div className="service-index">
          {services.map((service, index) => (
            <article key={service.title.es} data-reveal>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{service.title[lang]}</h3>
              <p>{service.body[lang]}</p>
              <i aria-hidden="true">↘</i>
            </article>
          ))}
        </div>
      </section>

      <section id="team" className="team">
        <div className="section-shell">
          <div className="section-heading" data-reveal>
            <h2>{t.teamTitle}</h2>
            <p>{t.teamBody}</p>
          </div>
        </div>
        <div className="team-track" aria-label={t.teamTitle}>
          {team.map((person, index) => (
            <figure key={`${person.name}-${index}`} data-reveal style={{ "--delay": `${Math.min(index * 45, 270)}ms` } as React.CSSProperties}>
              <div className="portrait"><Image src={person.image} alt={person.name} fill sizes="(max-width: 700px) 72vw, 24vw" /></div>
              <figcaption><strong>{person.name}</strong><span>{person.role[lang]}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="contact-heading" data-reveal>
          <h2>{t.contactTitle}</h2>
          <p>{t.contactBody}</p>
        </div>
        <div className="contact-grid">
          <form onSubmit={submit} data-reveal>
            <label><span>{t.name}</span><input name="name" autoComplete="name" required /></label>
            <label><span>{t.phone}</span><input name="phone" type="tel" autoComplete="tel" required /></label>
            <label><span>{t.email}</span><input name="email" type="email" autoComplete="email" required /></label>
            <label className="message-field"><span>{t.message}</span><textarea name="message" rows={3} required /></label>
            <label className="privacy-check"><input type="checkbox" required /><span>{t.privacy}</span></label>
            <button className="submit-button" type="submit">{t.send}<Arrow /></button>
            <p className="form-status" aria-live="polite">{sent ? t.sent : ""}</p>
          </form>
          <aside data-reveal>
            <h3>{t.offices}</h3>
            <address>
              <div><strong>Marbella</strong><a href="https://maps.app.goo.gl/" target="_blank" rel="noreferrer">Av. Ricardo Soriano, 18<br />29601 Marbella, Málaga</a></div>
              <div><strong>Alhaurín de la Torre</strong><a href="https://www.google.com/maps" target="_blank" rel="noreferrer">Avda. Cristóbal Colón, 3, 1º<br />29130 Alhaurín de la Torre, Málaga</a></div>
            </address>
            <div className="direct-contact">
              <a href="tel:+34952417723">+34 952 41 77 23</a>
              <a href="tel:+34648832353">+34 648 83 23 53</a>
              <a href="mailto:administracion@franruizarquitectos.com">administracion@franruizarquitectos.com</a>
            </div>
            <p className="coverage">{t.coverage}</p>
          </aside>
        </div>
        <footer>
          <Image src="/brand/logo-original.webp" alt="Fran Ruiz Arquitectos" width={300} height={126} />
          <p>© {new Date().getFullYear()} Fran Ruiz Arquitectos</p>
          <p>{t.legal}</p>
        </footer>
      </section>

      {activeProject && (
        <div className="project-modal" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setActiveProject(null)}>
          <div className="project-sheet" role="dialog" aria-modal="true" aria-labelledby="project-title" tabIndex={-1} ref={dialogRef}>
            <button className="close-project" onClick={() => setActiveProject(null)} aria-label={t.close}><span>{t.close}</span><i /><i /></button>
            <div className="sheet-image"><Image src={activeProject.image} alt={`${activeProject.title}, ${activeProject.location}`} fill sizes="70vw" priority /></div>
            <div className="sheet-content">
              <span>{t.details}</span>
              <h2 id="project-title">{activeProject.title}</h2>
              <div className="project-meta">
                <p><small>{lang === "es" ? "Localización" : "Location"}</small>{activeProject.location}</p>
                <p><small>{lang === "es" ? "Año" : "Year"}</small>{activeProject.year}</p>
                <p><small>{lang === "es" ? "Categoría" : "Category"}</small>{activeProject.category[lang]}</p>
              </div>
              <p className="sheet-lede">{activeProject.excerpt[lang]}</p>
              <p>{activeProject.description[lang]}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
