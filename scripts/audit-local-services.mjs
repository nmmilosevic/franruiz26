import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const base = process.argv[2] || "http://localhost:3000";
const spanish = [
  "proyecto-vivienda-unifamiliar-malaga",
  "proyecto-promotoras-malaga",
  "arquitecto-tecnico-malaga",
  "passivhaus-malaga",
  "urbanismo-malaga",
  "interiorismo-malaga",
  "arquitecto-perito-malaga",
  "proyectos-edificacion-malaga",
  "legalizar-vivienda-suelo-no-urbanizable-malaga",
];
const english = [
  "single-family-home-project-malaga",
  "promoters-project-malaga",
  "technical-architect-malaga",
  "passivhaus-malaga",
  "malaga-urban-planning",
  "interior-design-malaga",
  "expert-architect-malaga",
  "building-projects-malaga",
  "legalizing-housing-on-non-urbanizable-land-in-malaga",
];
const routes = [
  "/servicios",
  "/en/services",
  ...spanish.map((slug) => `/${slug}`),
  ...english.map((slug) => `/en/${slug}`),
];

function content(html, pattern) {
  return html.match(pattern)?.[1]?.trim() || "";
}

const results = [];
for (const route of routes) {
  const response = await fetch(`${base}${route}`);
  const html = await response.text();
  const checks = {
    status: response.status === 200,
    title: Boolean(content(html, /<title>(.*?)<\/title>/i)),
    description: Boolean(content(html, /<meta name="description" content="(.*?)"/i)),
    canonical: Boolean(content(html, /<link rel="canonical" href="(.*?)"/i)),
    ogTitle: Boolean(content(html, /<meta property="og:title" content="(.*?)"/i)),
    ogDescription: Boolean(content(html, /<meta property="og:description" content="(.*?)"/i)),
    ogImage: Boolean(content(html, /<meta property="og:image" content="(.*?)"/i)),
    twitterCard: Boolean(content(html, /<meta name="twitter:card" content="(.*?)"/i)),
    singleH1: (html.match(/<h1[\s>]/gi) || []).length === 1,
  };
  results.push({
    route,
    status: response.status,
    title: content(html, /<title>(.*?)<\/title>/i),
    canonical: content(html, /<link rel="canonical" href="(.*?)"/i),
    checks,
    passed: Object.values(checks).every(Boolean),
  });
}

const report = {
  checkedAt: new Date().toISOString(),
  base,
  routes: results.length,
  passed: results.filter((result) => result.passed).length,
  failed: results.filter((result) => !result.passed),
  results,
};

const output = join(process.cwd(), "reports");
await mkdir(output, { recursive: true });
await writeFile(join(output, "services-rendered-audit.json"), JSON.stringify(report, null, 2), "utf8");
process.stdout.write(`${JSON.stringify({ routes: report.routes, passed: report.passed, failed: report.failed }, null, 2)}\n`);
