import SourceContentPage from "../components/SourceContentPage";
import pagesData from "../data/pages.json";

export default function EnglishHomeArchive() {
  const page = pagesData.find((item) => item.language === "en" && item.slug === "home");
  return page ? <SourceContentPage page={page} /> : null;
}
