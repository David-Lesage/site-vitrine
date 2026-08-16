// Lecture des dimensions réelles d'une image de `public/`, AU MOMENT DU BUILD.
//
// Pourquoi : les balises `og:image:width` / `og:image:height` servent à WhatsApp,
// Facebook et LinkedIn pour réserver la place de l'aperçu AVANT d'avoir téléchargé
// l'image. Les annoncer en dur (1200×630) alors que le fichier est carré ou portrait
// donne un aperçu rogné ou déformé. On mesure donc le fichier ; si on n'y arrive pas
// (SVG, image distante, fichier absent), on n'écrit tout simplement PAS les balises —
// elles sont optionnelles, et les plateformes mesurent alors le fichier elles-mêmes.
//
// Aucune dépendance npm ajoutée (bun.lock gelé) : on lit uniquement les en-têtes
// JPEG / PNG / WebP / GIF, ce qui suffit pour tous les visuels du site.

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

export type ImageSize = { width: number; height: number }

const cache = new Map<string, ImageSize | null>()

function parseHeader(buf: Buffer): ImageSize | null {
  // PNG — signature 89 50 4E 47, IHDR à l'offset 16
  if (buf.length >= 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) }
  }

  // GIF87a / GIF89a
  if (buf.length >= 10 && buf.toString('ascii', 0, 3) === 'GIF') {
    return { width: buf.readUInt16LE(6), height: buf.readUInt16LE(8) }
  }

  // WebP — conteneur RIFF, trois variantes de chunk
  if (buf.length >= 30 && buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
    const chunk = buf.toString('ascii', 12, 16)
    if (chunk === 'VP8 ') {
      // Lossy : start code 9D 01 2A puis 14 bits de largeur, 14 bits de hauteur
      return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff }
    }
    if (chunk === 'VP8L') {
      // Lossless : octet de signature 0x2F, puis (largeur-1) sur 14 bits, (hauteur-1) sur 14 bits
      const bits = buf.readUInt32LE(21)
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 }
    }
    if (chunk === 'VP8X') {
      // Étendu : dimensions du canevas sur 24 bits little-endian, moins 1
      const width = buf[24] | (buf[25] << 8) | (buf[26] << 16)
      const height = buf[27] | (buf[28] << 8) | (buf[29] << 16)
      return { width: width + 1, height: height + 1 }
    }
    return null
  }

  // JPEG — on parcourt les segments jusqu'au SOFn qui porte les dimensions
  if (buf.length >= 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) {
        i++
        continue
      }
      const marker = buf[i + 1]
      // Marqueurs sans charge utile
      if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
        i += 2
        continue
      }
      const len = buf.readUInt16BE(i + 2)
      // SOF0–SOF15, sauf DHT (C4), JPGA (C8) et DAC (CC) qui partagent la plage
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) }
      }
      if (len < 2) return null
      i += 2 + len
    }
  }

  return null
}

/**
 * Dimensions d'un fichier de `public/` désigné par son chemin web (`/images/x.jpg`).
 * Renvoie `null` si le format n'est pas mesurable ou si le fichier n'existe pas.
 */
export function publicImageSize(webPath: string): ImageSize | null {
  if (!webPath.startsWith('/')) return null
  if (cache.has(webPath)) return cache.get(webPath) ?? null

  let size: ImageSize | null = null
  try {
    // `astro build` est toujours lancé depuis la racine du projet (localement
    // comme sur Vercel, via `bun run build`), donc `public/` est sous cwd.
    const buf = readFileSync(resolve(process.cwd(), 'public', webPath.replace(/^\/+/, '')))
    size = parseHeader(buf)
  } catch {
    // Fichier absent → aperçu cassé : on le signale pendant le build.
    console.warn(`[SEO] og:image introuvable dans public/ : ${webPath}`)
    size = null
  }

  cache.set(webPath, size)
  return size
}

/** Type MIME déduit de l'extension, pour `og:image:type`. */
export function imageMimeType(webPath: string): string | null {
  const ext = webPath.split('?')[0].split('.').pop()?.toLowerCase()
  switch (ext) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg'
    case 'png':
      return 'image/png'
    case 'webp':
      return 'image/webp'
    case 'gif':
      return 'image/gif'
    default:
      return null
  }
}
