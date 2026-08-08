// En-têtes CORS partagés par les Edge Functions appelées depuis le navigateur.
//
// ALLOWED_ORIGIN peut contenir PLUSIEURS origines séparées par des virgules
// (ex. "https://neotone-studio-delta.vercel.app,http://localhost:3000").
// On reflète l'origine de la requête si elle est autorisée — indispensable car
// un seul header Access-Control-Allow-Origin ne peut pas lister plusieurs valeurs.
// Si ALLOWED_ORIGIN vaut "*" (ou est vide), on autorise tout.

const RAW = (Deno.env.get('ALLOWED_ORIGIN') ?? '*').trim();
const ALLOWED = RAW.split(',').map((s) => s.trim()).filter(Boolean);

function resolveOrigin(req: Request): string {
    if (RAW === '*' || ALLOWED.length === 0) return '*';
    const origin = req.headers.get('Origin') ?? '';
    if (ALLOWED.includes(origin)) return origin;
    // Origine non listée : on renvoie la première autorisée (le navigateur bloquera
    // de toute façon si ça ne matche pas, mais ça évite un header vide).
    return ALLOWED[0];
}

/** En-têtes CORS adaptés à l'origine de la requête. */
export function corsHeadersFor(req: Request): Record<string, string> {
    return {
        'Access-Control-Allow-Origin': resolveOrigin(req),
        'Access-Control-Allow-Headers':
            'authorization, x-client-info, apikey, content-type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Vary': 'Origin',
    };
}

/** Réponse JSON avec les bons en-têtes CORS pour la requête. */
export function jsonResponse(req: Request, body: unknown, status = 200): Response {
    return new Response(JSON.stringify(body), {
        status,
        headers: { ...corsHeadersFor(req), 'Content-Type': 'application/json' },
    });
}
