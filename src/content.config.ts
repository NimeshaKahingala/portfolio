import { defineCollection } from "astro:content";
import { z } from "astro:schema";
import { glob } from "astro/loaders";

// Portfolio projects. Frontmatter carries the structured data; the markdown
// body holds the "What I did" bullets. Images use the image() helper so Astro
// optimizes them (AVIF/WebP, responsive srcset) at build time.
const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // One-line description for cards.
      summary: z.string(),
      // Longer intro shown on the detail page hero.
      description: z.string(),
      url: z.string().url(),
      role: z.string(),
      year: z.string(),
      tech: z.array(z.string()),
      fullStack: z.boolean().default(false),
      featured: z.boolean().default(false),
      // Lower numbers sort first.
      order: z.number().default(99),
      cover: image(),
      gallery: z.array(image()).default([]),
    }),
});

export const collections = { projects };
