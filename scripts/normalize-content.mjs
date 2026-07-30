import * as cheerio from "cheerio";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const archive = join(root, "content-source");
const output = join(root, "app", "data");
await mkdir(output, { recursive: true });

const [projectsRaw, pagesEsRaw, pagesEnRaw, mediaIndexRaw] = await Promise.all([
  readFile(join(archive, "json", "proyectos.json"), "utf8"),
  readFile(join(archive, "json", "pages-es.json"), "utf8"),
  readFile(join(archive, "json", "pages-en.json"), "utf8"),
  readFile(join(archive, "media-index.json"), "utf8"),
]);

const projects = JSON.parse(projectsRaw);
const pagesEs = JSON.parse(pagesEsRaw);
const pagesEn = JSON.parse(pagesEnRaw);
const mediaIndex = JSON.parse(mediaIndexRaw);
const mediaById = new Map(mediaIndex.map((item) => [item.id, item]));
const mediaByUrl = new Map(mediaIndex.map((item) => [item.sourceUrl, item]));

function decodeEntities(value = "") {
  return cheerio.load(`<span>${value}</span>`)("span").text().replace(/\s+/g, " ").trim();
}

function compact(value = "") {
  return value.replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();
}

function comparable(value = "") {
  return compact(value)
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toUpperCase();
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function localMediaPath(url) {
  if (!url) return null;
  const exact = mediaByUrl.get(url);
  if (exact?.localPath) return `/source-media/${exact.localPath.replace(/^media\//, "").replaceAll("\\", "/")}`;
  try {
    const parsed = new URL(url);
    const marker = "/wp-content/uploads/";
    const index = parsed.pathname.indexOf(marker);
    if (index >= 0) return `/source-media/${decodeURIComponent(parsed.pathname.slice(index + marker.length))}`;
  } catch {
    return null;
  }
  return null;
}

function collectMedia($, html) {
  const images = [];
  $("img[src]").each((_, element) => {
    const url = $(element).attr("src");
    const localPath = localMediaPath(url);
    if (!localPath) return;
    images.push({
      src: localPath,
      sourceUrl: url,
      alt: compact($(element).attr("alt") || ""),
      width: Number($(element).attr("width")) || null,
      height: Number($(element).attr("height")) || null,
    });
  });

  const uploadMatches = html.match(/https:\/\/franruizarquitectos\.com\/wp-content\/uploads\/[^"' )\\]+?\.(?:jpe?g|png|webp|svg|mp4)/gi) || [];
  for (const url of uploadMatches) {
    if (!mediaByUrl.has(url)) continue;
    const localPath = localMediaPath(url);
    if (!localPath) continue;
    if (/\.(mp4)$/i.test(url)) continue;
    images.push({ src: localPath, sourceUrl: url, alt: "", width: null, height: null });
  }

  const videos = unique([
    ...$("video[src], video source[src]").map((_, element) => $(element).attr("src")).get(),
    ...(html.match(/https:\/\/franruizarquitectos\.com\/wp-content\/uploads\/[^"' )\\]+?\.mp4/gi) || []),
  ]).filter((url) => mediaByUrl.has(url))
    .map((url) => ({ src: localMediaPath(url), sourceUrl: url }))
    .filter((item) => item.src);

  return {
    images: [...new Map(images.map((item) => [item.src, item])).values()],
    videos,
  };
}

function extractParagraphs($) {
  const paragraphs = [];
  $(".elementor-widget-text-editor").each((_, widget) => {
    const paragraphNodes = $(widget).find("p, li");
    if (paragraphNodes.length) {
      paragraphNodes.each((__, node) => {
        const text = compact($(node).text());
        if (text) paragraphs.push(text);
      });
    } else {
      const text = compact($(widget).text());
      if (text) paragraphs.push(text);
    }
  });
  return unique(paragraphs);
}

function extractHeadings($) {
  return unique(
    $("h1, h2, h3, h4, .elementor-heading-title")
      .map((_, element) => compact($(element).text()))
      .get(),
  );
}

function valueAfterLabel(headings, labels) {
  const normalizedLabels = labels.map(comparable);
  const index = headings.findIndex((heading) => normalizedLabels.includes(comparable(heading)));
  return index >= 0 ? headings[index + 1] || "" : "";
}

function normalizeProject(project) {
  const html = project.content?.rendered || "";
  const $ = cheerio.load(html);
  const headings = extractHeadings($);
  const paragraphs = extractParagraphs($);
  const collected = collectMedia($, html);
  const featured = mediaById.get(project.featured_media);
  if (!collected.images.length && featured?.localPath) {
    collected.images.push({
      src: `/source-media/${featured.localPath.replace(/^media\//, "").replaceAll("\\", "/")}`,
      sourceUrl: featured.sourceUrl,
      alt: featured.alt || decodeEntities(project.title?.rendered || ""),
      width: featured.width,
      height: featured.height,
    });
  }

  return {
    id: project.id,
    slug: project.slug,
    sourceUrl: project.link,
    title: decodeEntities(project.title?.rendered || ""),
    year: valueAfterLabel(headings, ["AÑO", "YEAR"]),
    location: valueAfterLabel(headings, ["LOCALIZACIÓN", "LOCATION"]),
    category: valueAfterLabel(headings, ["CATEGORIA", "CATEGORÍA", "CATEGORY"]),
    architect: valueAfterLabel(headings, ["ARQUITECTO", "ARCHITECT"]) || "Fran Ruiz Arquitectos",
    headings,
    paragraphs,
    images: collected.images,
    videos: collected.videos,
    featuredImage: collected.images[0]?.src || null,
    modified: project.modified,
  };
}

function normalizePage(page, language) {
  const html = page.content?.rendered || "";
  const $ = cheerio.load(html);
  const collected = collectMedia($, html);
  return {
    id: page.id,
    language,
    slug: page.slug,
    sourceUrl: page.link,
    title: decodeEntities(page.title?.rendered || ""),
    excerpt: compact(cheerio.load(page.excerpt?.rendered || "").text()),
    headings: extractHeadings($),
    paragraphs: extractParagraphs($),
    images: collected.images,
    videos: collected.videos,
    modified: page.modified,
  };
}

const normalizedProjects = projects.map(normalizeProject);
const normalizedPages = [
  ...pagesEs.map((page) => normalizePage(page, "es")),
  ...pagesEn.map((page) => normalizePage(page, "en")),
];

await Promise.all([
  writeFile(join(output, "projects.json"), JSON.stringify(normalizedProjects, null, 2), "utf8"),
  writeFile(join(output, "pages.json"), JSON.stringify(normalizedPages, null, 2), "utf8"),
]);

const report = {
  projects: normalizedProjects.length,
  projectsWithImages: normalizedProjects.filter((project) => project.images.length).length,
  projectImages: normalizedProjects.reduce((sum, project) => sum + project.images.length, 0),
  projectVideos: normalizedProjects.reduce((sum, project) => sum + project.videos.length, 0),
  projectParagraphs: normalizedProjects.reduce((sum, project) => sum + project.paragraphs.length, 0),
  pages: normalizedPages.length,
  pageImages: normalizedPages.reduce((sum, page) => sum + page.images.length, 0),
  pageVideos: normalizedPages.reduce((sum, page) => sum + page.videos.length, 0),
  pageParagraphs: normalizedPages.reduce((sum, page) => sum + page.paragraphs.length, 0),
};

await writeFile(join(archive, "normalization-report.json"), JSON.stringify(report, null, 2), "utf8");
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
