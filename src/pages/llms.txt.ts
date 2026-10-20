// /llms.txt — index court pour les moteurs de réponse IA (convention llmstxt.org).
// Généré à chaque build à partir des données du site : voir src/lib/llms.ts.
import type { APIRoute } from 'astro'
import { buildLlms, textResponse } from '@/lib/llms'

export const prerender = true

export const GET: APIRoute = async () => textResponse(await buildLlms('index'))
