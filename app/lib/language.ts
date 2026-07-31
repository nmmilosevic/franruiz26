import { services } from "../data/services";

export type Language = "es" | "en";

export const LANGUAGE_STORAGE_KEY = "franruiz-language";

/** Exact redesigned app routes (ES ↔ EN). */
const exactAlternates: Record<string, string> = {
  "/": "/en",
  "/proyectos": "/en/projects",
  "/servicios": "/en/services",
  "/estudio": "/en/the-study",
  "/contacto": "/en/contact",
  "/equipo": "/equipo",
};

/** CMS / SEO slug pairs that are not covered by services.ts. */
const slugAlternates: Record<string, string> = {
  "arquitectos-benalmadena": "architects-benalmadena",
  "arquitectos-cartama": "cartama-architects",
  "arquitectos-estepona": "architects-estepona",
  "arquitectos-fuengirola": "architects-fuengirola",
  "arquitectos-marbella": "architects-marbella",
  "arquitectos-mijas": "mijas-architects",
  "arquitectos-sotogrande": "sotogrande-architects",
  "arquitectos-torremolinos": "torremolinos-architects",
  "arquitectos-zagaleta": "zagaleta-architects",
  "arquitecto-perito-malaga": "expert-architect-malaga",
  "urbanismo-malaga": "malaga-urban-planning",
  "el-estudio": "the-study",
  "nuestros-proyectos": "projects",
  "contacto": "contact",
  // Same-slug bilingual CMS pages
  "mijas-architects": "mijas-architects",
  "passivhaus-malaga": "passivhaus-malaga",
};

const reverseExact = Object.fromEntries(
  Object.entries(exactAlternates).map(([es, en]) => [en, es]),
) as Record<string, string>;

const reverseSlugs = Object.fromEntries(
  Object.entries(slugAlternates).map(([es, en]) => [en, es]),
) as Record<string, string>;

for (const service of services) {
  slugAlternates[service.es] = service.en;
  reverseSlugs[service.en] = service.es;
}

export function languageFromPath(pathname: string): Language {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "es";
}

/** Paths that share one URL for both languages (chrome/content flip in place). */
export function isSharedLanguagePath(pathname: string): boolean {
  if (pathname === "/equipo") return true;
  if (pathname.startsWith("/proyectos/")) return true;
  return false;
}

export function homeHref(language: Language): string {
  return language === "en" ? "/en" : "/";
}

const languageListeners = new Set<() => void>();

function emitLanguageChange() {
  languageListeners.forEach((listener) => listener());
}

/** Subscribe to preferred-language changes (same-tab + cross-tab). */
export function subscribeLanguage(onStoreChange: () => void) {
  languageListeners.add(onStoreChange);
  if (typeof window !== "undefined") {
    window.addEventListener("storage", onStoreChange);
  }
  return () => {
    languageListeners.delete(onStoreChange);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", onStoreChange);
    }
  };
}

export function getStoredLanguageSnapshot(): Language {
  return readStoredLanguage() ?? "es";
}

export function getServerLanguageSnapshot(): Language {
  return "es";
}

export function persistLanguage(language: Language) {
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // Ignore private-mode / blocked storage.
  }
  if (typeof document !== "undefined") {
    document.documentElement.lang = language;
  }
  emitLanguageChange();
}

export function readStoredLanguage(): Language | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (value === "es" || value === "en") return value;
  } catch {
    // Ignore.
  }
  return null;
}

/**
 * Resolve the equivalent path in the target language.
 * Returns the same pathname when no alternate exists (shared or ES-only pages).
 */
export function getAlternatePath(pathname: string, target: Language): string {
  const normalized = pathname.replace(/\/$/, "") || "/";
  const current = languageFromPath(normalized);

  if (current === target) return normalized;

  if (normalized === "/equipo") return "/equipo";
  if (normalized.startsWith("/proyectos/")) return normalized;

  if (target === "en") {
    if (exactAlternates[normalized]) return exactAlternates[normalized];

    const slug = normalized.slice(1);
    if (slug && !slug.includes("/")) {
      const enSlug = slugAlternates[slug];
      if (enSlug) return `/en/${enSlug}`;
    }

    return "/en";
  }

  // target === "es"
  if (reverseExact[normalized]) return reverseExact[normalized];

  if (normalized === "/en") return "/";

  if (normalized.startsWith("/en/")) {
    const slug = normalized.slice(4);
    const esSlug = reverseSlugs[slug];
    if (esSlug) {
      // Prefer redesigned routes over raw CMS slugs where we have them.
      if (esSlug === "contacto") return "/contacto";
      if (esSlug === "el-estudio") return "/estudio";
      if (esSlug === "nuestros-proyectos") return "/proyectos";
      return `/${esSlug}`;
    }
    return "/";
  }

  return normalized;
}
