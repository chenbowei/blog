import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
  const site = context.site?.toString() ?? 'https://bwbh.lol/';
  const posts = (await getCollection('blog')).filter((post) => !post.data.draft);

  const urls = [
    { loc: new URL('/', site), lastmod: new Date() },
    { loc: new URL('/blog/', site), lastmod: new Date() },
    ...posts.map((post) => ({
      loc: new URL(`/blog/${post.id}/`, site),
      lastmod: post.data.updatedDate ?? post.data.pubDate
    }))
  ];

  return new Response(
    `<?xml version="1.0" encoding="UTF-8" ?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls
        .map(
          (url) => `
            <url>
              <loc>${url.loc}</loc>
              <lastmod>${url.lastmod.toISOString()}</lastmod>
            </url>
          `
        )
        .join('')}
    </urlset>`,
    {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8'
      }
    }
  );
}
