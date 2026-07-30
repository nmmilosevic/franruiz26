import { mkdir, writeFile, stat } from "node:fs/promises";
import { dirname, extname, join } from "node:path";

const ORIGIN = "https://franruizarquitectos.com";
const ROOT = join(process.cwd(), "content-source");
const JSON_DIR = join(ROOT, "json");
const HTML_DIR = join(ROOT, "html");
const MEDIA_DIR = join(ROOT, "media");
const collections = [
  { name: "pages-es", endpoint: "pages", language: "es" },
  { name: "pages-en", endpoint: "pages", language: "en" },
  { name: "proyectos", endpoint: "proyectos", language: "es" },
  { name: "posts", endpoint: "posts", language: "es" },
  { name: "media-es", endpoint: "media", language: "es" },
  { name: "media-en", endpoint: "media", language: "en" },
];
const PAGE_SIZE = 10;

await Promise.all([mkdir(JSON_DIR, { recursive: true }), mkdir(HTML_DIR, { recursive: true }), mkdir(MEDIA_DIR, { recursive: true })]);

async function fetchJson(url) {
  let lastError;
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: {
          "user-agent": "Fran Ruiz Arquitectos content migration",
          accept: "application/json",
        },
      });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`);
      return { data: await response.json(), headers: response.headers };
    } catch (error) {
      lastError = error;
      if (attempt < 4) await new Promise((resolve) => setTimeout(resolve, attempt * 1200));
    }
  }
  throw lastError;
}

async function fetchCollection(spec) {
  const query = `per_page=${PAGE_SIZE}&lang=${spec.language}`;
  const first = await fetchJson(`${ORIGIN}/wp-json/wp/v2/${spec.endpoint}?${query}&page=1`);
  const totalPages = Number(first.headers.get("x-wp-totalpages") || 1);
  const total = Number(first.headers.get("x-wp-total") || first.data.length);
  const items = [...first.data];
  for (let page = 2; page <= totalPages; page += 1) {
    const next = await fetchJson(`${ORIGIN}/wp-json/wp/v2/${spec.endpoint}?${query}&page=${page}`);
    items.push(...next.data);
  }
  await writeFile(join(JSON_DIR, `${spec.name}.json`), JSON.stringify(items, null, 2), "utf8");
  return { ...spec, total, items };
}

function decodeEntities(value = "") {
  return value
    .replaceAll("&#8211;", "–")
    .replaceAll("&#8212;", "—")
    .replaceAll("&#8217;", "’")
    .replaceAll("&#038;", "&")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#039;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function stripHtml(value = "") {
  return decodeEntities(
    value
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function languageFromLink(link = "") {
  return new URL(link).pathname.startsWith("/en/") ? "en" : "es";
}

function safeFileName(value) {
  return value.replace(/[<>:"/\\|?*\u0000-\u001f]/g, "-").replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 160);
}

function mediaRelativePath(url, id) {
  const parsed = new URL(url);
  const marker = "/wp-content/uploads/";
  const markerIndex = parsed.pathname.indexOf(marker);
  if (markerIndex >= 0) return decodeURIComponent(parsed.pathname.slice(markerIndex + marker.length));
  const extension = extname(parsed.pathname) || ".bin";
  return `${id}-${safeFileName(parsed.pathname.split("/").pop() || "asset")}${extension}`;
}

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function downloadAsset(media) {
  const url = media.source_url;
  if (!url) return { id: media.id, status: "skipped", reason: "missing source_url" };
  const relativePath = mediaRelativePath(url, media.id);
  const destination = join(MEDIA_DIR, relativePath);
  if (await exists(destination)) return { id: media.id, status: "existing", path: relativePath, url };
  await mkdir(dirname(destination), { recursive: true });
  try {
    const response = await fetch(url, { headers: { "user-agent": "Fran Ruiz Arquitectos content migration" } });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    const bytes = new Uint8Array(await response.arrayBuffer());
    await writeFile(destination, bytes);
    return { id: media.id, status: "downloaded", path: relativePath, url, bytes: bytes.byteLength };
  } catch (error) {
    return { id: media.id, status: "failed", url, reason: String(error) };
  }
}

const results = [];
for (const collection of collections) {
  const result = await fetchCollection(collection);
  results.push(result);
  process.stdout.write(`Fetched ${result.items.length}/${result.total} ${collection.name}\n`);
}

const pagesEs = results.find((item) => item.name === "pages-es")?.items || [];
const pagesEn = results.find((item) => item.name === "pages-en")?.items || [];
const pages = [
  ...pagesEs.map((item) => ({ ...item, archiveLanguage: "es" })),
  ...pagesEn.map((item) => ({ ...item, archiveLanguage: "en" })),
];
const projects = results.find((item) => item.name === "proyectos")?.items || [];
const posts = results.find((item) => item.name === "posts")?.items || [];
const mediaCandidates = [
  ...(results.find((item) => item.name === "media-es")?.items || []),
  ...(results.find((item) => item.name === "media-en")?.items || []),
];
const media = [...new Map(mediaCandidates.map((item) => [item.id, item])).values()];

const documents = [...pages.map((item) => ({ ...item, contentType: "page" })), ...projects.map((item) => ({ ...item, contentType: "project" })), ...posts.map((item) => ({ ...item, contentType: "post" }))];
const normalized = [];

for (const document of documents) {
  const html = document.content?.rendered || "";
  const folder = join(HTML_DIR, document.contentType);
  await mkdir(folder, { recursive: true });
  await writeFile(join(folder, `${document.id}-${safeFileName(document.slug)}.html`), html, "utf8");
  normalized.push({
    id: document.id,
    type: document.contentType,
    language: document.archiveLanguage || languageFromLink(document.link),
    slug: document.slug,
    url: document.link,
    date: document.date,
    modified: document.modified,
    status: document.status,
    parent: document.parent || 0,
    featuredMedia: document.featured_media || 0,
    title: decodeEntities(document.title?.rendered || ""),
    excerpt: stripHtml(document.excerpt?.rendered || ""),
    text: stripHtml(html),
    htmlFile: `html/${document.contentType}/${document.id}-${safeFileName(document.slug)}.html`,
  });
}

await writeFile(join(ROOT, "content-index.json"), JSON.stringify(normalized, null, 2), "utf8");

const mediaIndex = media.map((item) => ({
  id: item.id,
  date: item.date,
  modified: item.modified,
  slug: item.slug,
  title: decodeEntities(item.title?.rendered || ""),
  caption: stripHtml(item.caption?.rendered || ""),
  alt: item.alt_text || "",
  mediaType: item.media_type,
  mimeType: item.mime_type,
  sourceUrl: item.source_url,
  localPath: item.source_url ? `media/${mediaRelativePath(item.source_url, item.id)}` : null,
  width: item.media_details?.width || null,
  height: item.media_details?.height || null,
}));
await writeFile(join(ROOT, "media-index.json"), JSON.stringify(mediaIndex, null, 2), "utf8");

const sitemapResponse = await fetch(`${ORIGIN}/wp-sitemap.xml`, { headers: { "user-agent": "Fran Ruiz Arquitectos content migration" } });
if (sitemapResponse.ok) await writeFile(join(ROOT, "wp-sitemap.xml"), await sitemapResponse.text(), "utf8");

const downloadResults = [];
const concurrency = 6;
for (let start = 0; start < media.length; start += concurrency) {
  const batch = media.slice(start, start + concurrency);
  downloadResults.push(...(await Promise.all(batch.map(downloadAsset))));
  process.stdout.write(`Media ${Math.min(start + concurrency, media.length)}/${media.length}\n`);
}

const summary = {
  extractedAt: new Date().toISOString(),
  source: ORIGIN,
  counts: Object.fromEntries(results.map((item) => [item.name, item.items.length])),
  languages: normalized.reduce((acc, item) => ({ ...acc, [item.language]: (acc[item.language] || 0) + 1 }), {}),
  media: {
    total: media.length,
    downloaded: downloadResults.filter((item) => item.status === "downloaded").length,
    existing: downloadResults.filter((item) => item.status === "existing").length,
    skipped: downloadResults.filter((item) => item.status === "skipped").length,
    failed: downloadResults.filter((item) => item.status === "failed").length,
    bytes: downloadResults.reduce((sum, item) => sum + (item.bytes || 0), 0),
  },
  failures: downloadResults.filter((item) => item.status === "failed"),
};

await writeFile(join(ROOT, "summary.json"), JSON.stringify(summary, null, 2), "utf8");
process.stdout.write(`${JSON.stringify(summary, null, 2)}\n`);
