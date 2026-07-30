import { basename, join } from "node:path";
import { mkdir, readFile, writeFile } from "node:fs/promises";

const origin = "https://franruizarquitectos.com";
const output = join(process.cwd(), "content-source");
const userAgent = "Fran Ruiz Arquitectos content migration";

await mkdir(output, { recursive: true });

async function fetchText(url) {
  const response = await fetch(url, { headers: { "user-agent": userAgent } });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${url}`);
  return response.text();
}

function locations(xml) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
}

const indexUrl = `${origin}/wp-sitemap.xml`;
const indexXml = await fetchText(indexUrl);
await writeFile(join(output, "wp-sitemap.xml"), indexXml, "utf8");

const sitemapUrls = locations(indexXml).filter((url) => url.endsWith("-sitemap.xml"));
const sitemapResults = [];
const publicUrls = [];

for (const url of sitemapUrls) {
  const xml = await fetchText(url);
  const file = basename(new URL(url).pathname);
  await writeFile(join(output, file), xml, "utf8");
  const urls = locations(xml);
  publicUrls.push(...urls);
  sitemapResults.push({ file, url, count: urls.length });
}

const auxiliaryUrls = publicUrls.filter((url) => new URL(url).pathname.endsWith(".kml"));
const auxiliaryResults = [];

for (const url of auxiliaryUrls) {
  const content = await fetchText(url);
  const file = basename(new URL(url).pathname);
  await writeFile(join(output, file), content, "utf8");
  auxiliaryResults.push({ file, url, bytes: Buffer.byteLength(content) });
}

const archive = JSON.parse(await readFile(join(output, "content-index.json"), "utf8"));
const archivedUrls = new Set(archive.map((item) => String(item.url).replace(/\/$/, "")));
const representedAliases = new Set([
  `${origin}/en/home`,
  `${origin}/proyectos`,
  ...auxiliaryUrls.map((url) => url.replace(/\/$/, "")),
]);
const unmatched = publicUrls
  .map((url) => url.replace(/\/$/, ""))
  .filter((url) => !archivedUrls.has(url) && !representedAliases.has(url));

const report = {
  checkedAt: new Date().toISOString(),
  source: indexUrl,
  sitemaps: sitemapResults,
  publicUrls: publicUrls.length,
  auxiliary: auxiliaryResults,
  unmatched,
  complete: unmatched.length === 0,
};

await writeFile(join(output, "sitemap-audit.json"), JSON.stringify(report, null, 2), "utf8");
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
