import type { APIRoute } from 'astro';

// Se genera a partir de `site` (astro.config.mjs) para no repetir la URL del sitio.
export const GET: APIRoute = ({ site }) => {
  const sitemapUrl = new URL('sitemap-index.xml', site);

  return new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl.href}\n`,
  );
};
