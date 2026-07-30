import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const root = process.cwd();
const datasets = await Promise.all([
  readFile(join(root, "app", "data", "projects.json"), "utf8"),
  readFile(join(root, "app", "data", "pages.json"), "utf8"),
]);
const records = datasets.flatMap((source) => JSON.parse(source));
const media = records.flatMap((record) => [...(record.images || []), ...(record.videos || [])]);
const unique = [...new Map(media.filter((item) => item.src && item.sourceUrl).map((item) => [item.src, item])).values()];
const repaired = [];

for (const item of unique) {
  const relative = item.src.replace(/^\/source-media\//, "");
  const publicPath = join(root, "public", "source-media", ...relative.split("/"));
  const archivePath = join(root, "content-source", "media", ...relative.split("/"));

  try {
    await readFile(publicPath);
    continue;
  } catch {
    // Download only absent files.
  }

  const response = await fetch(item.sourceUrl, {
    headers: { "user-agent": "Mozilla/5.0 (compatible; FranRuizArchive/1.0)" },
  });
  if (!response.ok) throw new Error(`${response.status} ${item.sourceUrl}`);
  const bytes = Buffer.from(await response.arrayBuffer());

  await Promise.all([
    mkdir(dirname(publicPath), { recursive: true }),
    mkdir(dirname(archivePath), { recursive: true }),
  ]);
  await Promise.all([writeFile(publicPath, bytes), writeFile(archivePath, bytes)]);
  repaired.push({ sourceUrl: item.sourceUrl, relative, bytes: bytes.length });
}

process.stdout.write(`${JSON.stringify({ repaired: repaired.length, files: repaired }, null, 2)}\n`);
