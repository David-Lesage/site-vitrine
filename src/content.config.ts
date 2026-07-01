import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

// Collection « blog » bilingue (FR + EN dans le même dossier, filtrés par `lang`).
// Astro 6 : Content Layer API (loader glob + entry.id + render(entry)).
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    permalink: z.string(),
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    cover: z.string(),
    tags: z.array(z.string()).default([]),
    lang: z.enum(['fr', 'en']),
    youtubeId: z.string().optional(),
    draft: z.boolean().default(false),
  }),
})

export const collections = { blog }
