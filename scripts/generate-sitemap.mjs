import { readdir, readFile, stat, writeFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const routesRoot = join(projectRoot, "src", "routes");
const siteUrl = "https://astrovaanii.in";
const excludedRouteFiles = new Set([
  "__root.tsx",
  "blog.tsx",
  "chat.tsx",
  "dashboard.tsx",
  "my-chart.tsx",
  "onboarding.tsx",
  "signup.tsx",
]);

async function findRouteFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? findRouteFiles(path) : [path];
    }),
  );
  return files.flat();
}

function routeUrl(filePath) {
  const path = relative(routesRoot, filePath).split(sep).join("/").replace(/\.tsx$/, "");
  if (path === "index") return "/";
  return `/${path.replace(/\/index$/, "")}`;
}

function priorityFor(url) {
  if (url === "/") return "1.0";
  if (["/free-kundli", "/ai-astrologer", "/kundali-matching", "/vimshottari-dasha-calculator"].includes(url)) return "0.9";
  if (url === "/tools" || url === "/blogs" || url.startsWith("/blogs/")) return "0.8";
  return "0.7";
}

const files = await findRouteFiles(routesRoot);
const pages = await Promise.all(
  files
    .filter((file) => file.endsWith(".tsx"))
    .filter((file) => !file.includes(`${sep}api${sep}`))
    .filter((file) => !excludedRouteFiles.has(relative(routesRoot, file)))
    .map(async (file) => {
      const source = await readFile(file, "utf8");
      if (source.includes('name: "robots", content: "noindex')) return null;
      const modified = await stat(file);
      return { url: routeUrl(file), lastmod: modified.mtime.toISOString().slice(0, 10) };
    }),
);

const urls = pages
  .filter(Boolean)
  .sort((a, b) => a.url.localeCompare(b.url))
  .map(({ url, lastmod }) => `  <url>\n    <loc>${siteUrl}${url}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priorityFor(url)}</priority>\n  </url>`)
  .join("\n\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n\n${urls}\n\n</urlset>\n`;
await writeFile(join(projectRoot, "public", "sitemap.xml"), sitemap);
