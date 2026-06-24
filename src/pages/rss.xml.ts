import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

export async function GET(context: APIContext) {
  const posts = (await getCollection('blog'))
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  const site = context.site?.toString() ?? 'https://bwbh.lol/';
  const items = posts
    .map((post) => {
      const url = new URL(`/blog/${post.id}/`, site);

      return `
        <item>
          <title><![CDATA[${post.data.title}]]></title>
          <description><![CDATA[${post.data.description}]]></description>
          <link>${url}</link>
          <guid>${url}</guid>
          <pubDate>${post.data.pubDate.toUTCString()}</pubDate>
        </item>
      `;
    })
    .join('');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>BW&amp;BH Notebook</title>
        <description>A quiet writing corner built with Astro and MDX.</description>
        <link>${site}</link>
        ${items}
      </channel>
    </rss>`,
    {
      headers: {
        'Content-Type': 'application/rss+xml; charset=utf-8'
      }
    }
  );
}
