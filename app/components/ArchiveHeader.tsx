import MainHeader from "./MainHeader";

type ArchiveHeaderProps = {
  theme?: "light" | "dark";
  current?: "projects" | "services" | "studio" | "team";
  language?: "es" | "en";
};

export default function ArchiveHeader({ theme = "light", current, language = "es" }: ArchiveHeaderProps) {
  return <MainHeader theme={theme} current={current} language={language} />;
}
