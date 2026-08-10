import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'
import { BLOG_CATEGORIES } from './lib/blogCategories'

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
    // Catégorie = « type de sujet » (filtre du blog). Obligatoire : un article
    // sans catégorie fait échouer le build avec un message explicite, plutôt
    // que d'atterrir en silence dans la mauvaise case. Libellés FR/EN dans
    // `src/lib/blogCategories.ts`.
    category: z.enum(BLOG_CATEGORIES),
    tags: z.array(z.string()).default([]),
    lang: z.enum(['fr', 'en']),
    youtubeId: z.string().optional(),
    draft: z.boolean().default(false),
  }),
})

export const collections = { blog }
