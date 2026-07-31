"use client";

import { useEffect, useState, type ReactNode } from "react";
import MainHeader from "./MainHeader";
import SiteFooter from "./SiteFooter";
import { persistLanguage, readStoredLanguage, type Language } from "../lib/language";

type Props = {
  theme?: "light" | "dark";
  current?: "projects" | "services" | "studio" | "team";
  precedingTone?: "light" | "dark";
  children: ReactNode;
};

/**
 * Chrome for routes that share one URL across languages (project details).
 * Header/footer follow the stored preference; page content stays as authored.
 */
export default function SharedLanguageShell({
  theme = "light",
  current,
  precedingTone = "light",
  children,
}: Props) {
  const [language, setLanguage] = useState<Language>("es");

  useEffect(() => {
    const stored = readStoredLanguage();
    if (stored) setLanguage(stored);
  }, []);

  const onLanguageChange = (next: Language) => {
    persistLanguage(next);
    setLanguage(next);
  };

  return (
    <>
      <MainHeader theme={theme} current={current} language={language} onLanguageChange={onLanguageChange} />
      {children}
      <SiteFooter language={language} precedingTone={precedingTone} />
    </>
  );
}
