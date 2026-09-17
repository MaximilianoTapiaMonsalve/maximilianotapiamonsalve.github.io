import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

import { projectCategories } from './config/site';

const projects = defineCollection({
  // Un archivo por idioma: src/content/projects/en/<id>.md y src/content/projects/es/<id>.md
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      year: z.number().int(),
      stack: z.array(z.string()).default([]),
      categories: z.array(z.enum(projectCategories)).min(1),
      repo: z.url().optional(),
      demo: z.url().optional(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      featured: z.boolean().default(false),
      order: z.number().default(0),
    }),
});

const about = defineCollection({
  // Un archivo por idioma: src/content/about/en.md y src/content/about/es.md
  loader: glob({ pattern: '*.md', base: './src/content/about' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      portrait: image().optional(),
      portraitAlt: z.string().optional(),
      tools: z.array(z.string()).default([]),
      timeline: z
        .array(
          z.object({
            period: z.string(),
            role: z.string(),
            place: z.string(),
            summary: z.string().optional(),
          }),
        )
        .default([]),
    }),
});

export const collections = { projects, about };
