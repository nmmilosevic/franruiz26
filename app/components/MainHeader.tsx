"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type MouseEvent, useEffect, useRef, useState } from "react";
import { serviceHref, services as serviceItems } from "../data/services";
import ArrowIcon from "./ArrowIcon";

type Language = "es" | "en";
type HeaderSection = "projects" | "services" | "studio" | "team" | "contact";

type MainHeaderProps = {
  language?: Language;
  onLanguageChange?: (language: Language) => void;
  theme?: "light" | "dark";
  current?: HeaderSection;
};

const labels = {
  es: {
    projects: "Proyectos",
    services: "Servicios",
    servicesOverview: "Arquitectura, técnica y gestión",
    allServices: "Ver todos los servicios",
    studio: "Estudio",
    team: "Equipo",
    contact: "Contacto",
    navigation: "Navegación principal",
    language: "Idioma",
    open: "Abrir menú",
    close: "Cerrar menú",
  },
  en: {
    projects: "Projects",
    services: "Services",
    servicesOverview: "Architecture, technical expertise and management",
    allServices: "View all services",
    studio: "Studio",
    team: "Team",
    contact: "Contact",
    navigation: "Main navigation",
    language: "Language",
    open: "Open menu",
    close: "Close menu",
  },
} as const;

export default function MainHeader(props: MainHeaderProps) {
  const pathname = usePathname();

  return <MainHeaderRoute key={pathname} {...props} pathname={pathname} />;
}

function MainHeaderRoute({
  language: controlledLanguage,
  onLanguageChange,
  theme = "light",
  current,
  pathname,
}: MainHeaderProps & { pathname: string }) {
  const [localLanguage, setLocalLanguage] = useState<Language>(controlledLanguage ?? "es");
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [headerHidden, setHeaderHidden] = useState(false);
  const [headerAtTop, setHeaderAtTop] = useState(true);
  const previousScrollY = useRef(0);
  const language = onLanguageChange ? (controlledLanguage ?? localLanguage) : localLanguage;
  const t = labels[language];

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) {
      return;
    }

    previousScrollY.current = window.scrollY;
    let frame = 0;

    const updateHeader = () => {
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - previousScrollY.current;
        setHeaderAtTop(currentScrollY < 96);

        if (window.innerWidth > 760 || currentScrollY < 96) {
          setHeaderHidden(false);
        } else if (delta > 2) {
          setHeaderHidden(true);
        } else if (delta < -2) {
          setHeaderHidden(false);
        }

        previousScrollY.current = currentScrollY;
        frame = 0;
      });
    };

    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", updateHeader);

    return () => {
      window.removeEventListener("scroll", updateHeader);
      window.removeEventListener("resize", updateHeader);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [menuOpen]);

  const changeLanguage = (nextLanguage: Language) => {
    if (onLanguageChange) onLanguageChange(nextLanguage);
    else setLocalLanguage(nextLanguage);
  };

  const handleHomeClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      pathname !== "/" ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  const links = language === "en"
    ? [
        ["/en/projects", t.projects, "projects"],
        ["/en/services", t.services, "services"],
        ["/en/the-study", t.studio, "studio"],
        ["/equipo", t.team, "team"],
        ["/en/contact", t.contact, "contact"],
      ] as const
    : [
        ["/proyectos", t.projects, "projects"],
        ["/servicios", t.services, "services"],
        ["/estudio", t.studio, "studio"],
        ["/equipo", t.team, "team"],
        ["/contacto", t.contact, "contact"],
      ] as const;

  return (
    <>
      <div
        className={`home-header-system ${servicesMenuOpen ? "is-services-open" : ""}`}
        onMouseLeave={() => setServicesMenuOpen(false)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setServicesMenuOpen(false);
          }
        }}
      >
        <header className={`home-header theme-${theme} ${headerAtTop ? "is-at-top" : ""} ${menuOpen ? "is-menu-open" : ""} ${headerHidden ? "is-hidden" : ""}`}>
          <div className="home-header-inner section-shell">
            <Link className="home-brand" href="/" onClick={handleHomeClick} aria-label="Fran Ruiz Arquitectos, inicio">
              <Image src="/brand/logo-fran.svg" alt="Fran Ruiz Arquitectos" width={1435} height={461} priority unoptimized />
            </Link>
            <nav className="home-nav" aria-label={t.navigation}>
              {links.map(([href, label, section]) => section === "services" ? (
                <div
                  className="home-nav-services"
                  key={href}
                  onMouseEnter={() => setServicesMenuOpen(true)}
                  onFocus={() => setServicesMenuOpen(true)}
                >
                  <Link
                    href={href}
                    aria-current={section === current ? "page" : undefined}
                    onClick={() => setServicesMenuOpen(false)}
                  >
                    {label}
                  </Link>
                </div>
              ) : (
                <Link href={href} key={href} aria-current={section === current ? "page" : undefined}>
                  {label}
                </Link>
              ))}
            </nav>
            <div className="home-actions">
              <div className="home-language" aria-label={t.language}>
                <button className={language === "es" ? "active" : ""} onClick={() => changeLanguage("es")} aria-pressed={language === "es"}>ES</button>
                <span>/</span>
                <button className={language === "en" ? "active" : ""} onClick={() => changeLanguage("en")} aria-pressed={language === "en"}>EN</button>
              </div>
              <button
                className="home-menu-button"
                type="button"
                aria-label={menuOpen ? t.close : t.open}
                aria-expanded={menuOpen}
                aria-controls="main-mobile-menu"
                onClick={() => setMenuOpen((open) => !open)}
              >
                <span /><span />
              </button>
            </div>
          </div>
        </header>

        <div
          className="home-services-dropdown"
          onMouseEnter={() => setServicesMenuOpen(true)}
        >
          <div className="home-services-dropdown-inner">
            <div className="home-services-dropdown-list">
              {serviceItems.map((service) => (
                <Link
                  href={serviceHref(service, language)}
                  key={service.es}
                  onClick={() => setServicesMenuOpen(false)}
                >
                  <span>{service.title[language]}</span>
                  <ArrowIcon direction="right" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div id="main-mobile-menu" className={`home-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        {links.map(([href, label, section]) => section === "services" ? (
          <details className="home-mobile-services" key={href}>
            <summary>{label}</summary>
            <div>
              <Link href={href} onClick={() => setMenuOpen(false)}>{t.allServices}</Link>
              {serviceItems.map((service) => (
                <Link
                  href={serviceHref(service, language)}
                  key={service.es}
                  onClick={() => setMenuOpen(false)}
                >
                  {service.title[language]}
                </Link>
              ))}
            </div>
          </details>
        ) : (
          <Link
            href={href}
            key={href}
            aria-current={section === current ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            {label}
          </Link>
        ))}
      </div>
    </>
  );
}
