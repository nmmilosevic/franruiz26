import Link from "next/link";

const copy = {
  es: {
    studio: "Estudio",
    navigation: "Navegación",
    contact: "Contacto",
    projects: "Proyectos",
    services: "Servicios",
    team: "Equipo",
    privacy: "Privacidad",
    cookies: "Cookies",
    quality: "Calidad",
  },
  en: {
    studio: "Studio",
    navigation: "Navigation",
    contact: "Contact",
    projects: "Projects",
    services: "Services",
    team: "Team",
    privacy: "Privacy",
    cookies: "Cookies",
    quality: "Quality",
  },
} as const;

type SiteFooterProps = {
  language?: "es" | "en";
  precedingTone?: "light" | "dark";
};

export default function SiteFooter({
  language = "es",
  precedingTone = "dark",
}: SiteFooterProps) {
  const t = copy[language];

  return (
    <footer className={`home-footer home-footer--after-${precedingTone}`} id="footer">
      <div className="home-footer-card">
        <div className="home-footer-inner section-shell">
          <div className="home-footer-lead">
            <div className="home-footer-contact">
              <p>{t.contact}</p>
              <a className="home-footer-email" href="mailto:info@franruizarquitectos.com">
                info@franruizarquitectos.com
              </a>
              <a className="home-footer-phone" href="tel:+34952417723">+34 952 41 77 23</a>
            </div>
          </div>

          <div className="home-footer-details">
            <section>
              <p>{t.studio}</p>
              <address>
                <span>Málaga · Marbella</span>
                <span>Costa del Sol, España</span>
              </address>
            </section>
            <section>
              <p>{t.navigation}</p>
              <nav aria-label={t.navigation}>
                <span>
                  <Link href={language === "en" ? "/en/projects" : "/proyectos"}>{t.projects}</Link>
                  <Link href={language === "en" ? "/en/the-study" : "/estudio"}>{t.studio}</Link>
                </span>
                <span>
                  <Link href={language === "en" ? "/en/services" : "/servicios"}>{t.services}</Link>
                  <Link href="/equipo">{t.team}</Link>
                </span>
                <span>
                  <Link href={language === "en" ? "/en/contact" : "/contacto"}>{t.contact}</Link>
                </span>
              </nav>
            </section>
          </div>

          <div className="home-footer-base">
            <p>© {new Date().getFullYear()} Fran Ruiz Arquitectos</p>
            <div>
              <Link href="/politica-de-privacidad">{t.privacy}</Link>
              <Link href="/politica-de-cookies">{t.cookies}</Link>
              <Link href="/politica-de-calidad">{t.quality}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
