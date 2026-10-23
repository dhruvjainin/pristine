import type { APIRoute } from "astro";
import { examples } from "../data/examples";
import { commandDocs, lensDocs } from "../data/docs";

export const GET: APIRoute = ({ site }) => {
  const paths = ["/", "/docs/", ...[...commandDocs, ...lensDocs].map((d) => `/docs/${d.slug}/`), ...examples.map((e) => `/examples/${e.slug}/`)];
  const urls = paths.map((p) => `<url><loc>${new URL(p, site)}</loc></url>`).join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { "Content-Type": "application/xml" },
  });
};
