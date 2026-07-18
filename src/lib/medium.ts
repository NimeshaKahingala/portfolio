// Build-time Medium RSS reader. Fetched once during `astro build`; if Medium
// is unreachable or the feed is empty, returns [] so the Writing page falls
// back to a "Follow on Medium" card (see docs/REVAMP_PLAN.md, Blog section).

export const MEDIUM_USER = "NimeshaKahingala";
export const MEDIUM_PROFILE = `https://medium.com/@${MEDIUM_USER}`;
const FEED_URL = `https://medium.com/feed/@${MEDIUM_USER}`;

export type MediumPost = {
  title: string;
  link: string;
  pubDate: string;
  isoDate: string;
  readingTime: number;
  snippet: string;
  thumbnail: string | null;
  categories: string[];
};

function decode(input: string): string {
  return input
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, " ")
    .trim();
}

function tag(block: string, name: string): string {
  const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, "i"));
  return m ? decode(m[1]) : "";
}

function stripHtml(html: string): string {
  return html
    .replace(/<figure[\s\S]*?<\/figure>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export async function getMediumPosts(limit = 12): Promise<MediumPost[]> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(FEED_URL, {
      signal: controller.signal,
      headers: { "User-Agent": "portfolio-build/1.0" },
    });
    clearTimeout(timer);
    if (!res.ok) return [];

    const xml = await res.text();
    const items = xml.match(/<item>([\s\S]*?)<\/item>/g) ?? [];

    const posts: MediumPost[] = items.map((raw) => {
      const block = raw.replace(/^<item>/, "").replace(/<\/item>$/, "");
      const contentMatch = block.match(
        /<content:encoded[^>]*>([\s\S]*?)<\/content:encoded>/i
      );
      const contentHtml = contentMatch ? decode(contentMatch[1]) : "";
      const text = stripHtml(contentHtml);
      const words = text ? text.split(" ").length : 0;
      const imgMatch = contentHtml.match(/<img[^>]+src="([^"]+)"/i);
      const pubDate = tag(block, "pubDate");
      const categories = [...block.matchAll(/<category>([\s\S]*?)<\/category>/gi)]
        .map((m) => decode(m[1]))
        .filter(Boolean);

      return {
        title: tag(block, "title"),
        link: tag(block, "link").split("?")[0],
        pubDate,
        isoDate: pubDate ? new Date(pubDate).toISOString() : "",
        readingTime: Math.max(1, Math.round(words / 200)),
        snippet: text.slice(0, 160).trim(),
        thumbnail: imgMatch ? imgMatch[1] : null,
        categories,
      };
    });

    return posts.filter((p) => p.title && p.link).slice(0, limit);
  } catch {
    return [];
  }
}
