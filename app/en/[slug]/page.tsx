import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceDetailPage from "../../components/ServiceDetailPage";
import SourceContentPage from "../../components/SourceContentPage";
import pagesData from "../../data/pages.json";
import { serviceFromSlug } from "../../data/services";

export function generateStaticParams() {
  return pagesData
    .filter((page) => page.language === "en" && page.slug !== "home")
    .map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = pagesData.find((item) => item.language === "en" && item.slug === slug);
  if (!page) return {};
  const title = page.headings[0] || page.title;
  const description = (page.paragraphs[0] || page.excerpt).slice(0, 158);
  const service = serviceFromSlug(page.slug, "en");
  const image =
    service?.image ||
    page.images.find((item) => !/isotipo|\.svg$/i.test(item.src))?.src ||
    "/og.png";
  return {
    title: `${title} | Fran Ruiz Architects`,
    description,
    alternates: { canonical: `/en/${page.slug}` },
    openGraph: {
      title: `${title} | Fran Ruiz Architects`,
      description,
      url: `/en/${page.slug}`,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Fran Ruiz Architects`,
      description,
      images: [image],
    },
  };
}

export default async function EnglishSourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = pagesData.find((item) => item.language === "en" && item.slug === slug);
  if (!page) notFound();
  if (serviceFromSlug(slug, "en")) {
    return <ServiceDetailPage page={page} language="en" />;
  }
  return <SourceContentPage page={page} />;
}
