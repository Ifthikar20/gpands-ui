// Input sanitization helpers for user-provided content.
//
// Vue's mustache interpolation always HTML-escapes text, and our
// policy linter forbids v-html outside the trusted SvgIcon registry,
// so direct script injection via post content is already neutralised.
// These helpers add defense in depth: type coercion, length clamping,
// URL scheme validation, and slug allowlisting.

const TITLE_MAX = 300
const BODY_MAX = 10_000
const SLUG_MAX = 32
const USERNAME_MAX = 32

// Control characters we strip from any text input. Preserves \t, \n, \r;
// strips the rest of the C0 range and DEL. Built from a string so the
// escape sequences stay as literal source text.
const CONTROL_CHARS = new RegExp(
  '[\\u0000-\\u0008\\u000B\\u000C\\u000E-\\u001F\\u007F]',
  'g',
)

// === Text =======================================================
export function sanitizeText(input, max = BODY_MAX) {
  if (typeof input !== 'string') return ''
  return input.replace(CONTROL_CHARS, '').slice(0, max)
}

export function sanitizeTitle(input) {
  return sanitizeText(input, TITLE_MAX)
    .replace(/[\r\n\t]+/g, ' ')
    .trim()
}

// === URLs =======================================================
// Accepts only absolute http: and https: URLs. Returns null for any
// other scheme (javascript:, data:, file:, vbscript:, etc.) or
// malformed input.
export function sanitizeUrl(input) {
  if (typeof input !== 'string') return null
  const trimmed = input.trim()
  if (!trimmed) return null
  try {
    const url = new URL(trimmed)
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null
    return url.toString()
  } catch {
    return null
  }
}

// === Slugs ======================================================
// Topic slugs in this app are lowercase ascii only.
export function sanitizeSlug(input) {
  if (typeof input !== 'string') return ''
  return input.toLowerCase().replace(/[^a-z]/g, '').slice(0, SLUG_MAX)
}

// === Usernames ==================================================
// Letters, digits, underscore, dot. No spaces or special chars.
export function sanitizeUsername(input) {
  if (typeof input !== 'string') return ''
  return input.toLowerCase().replace(/[^a-z0-9_.]/g, '').slice(0, USERNAME_MAX)
}

// === Paper style / texture allowlists ===========================
const PAPER_STYLES = new Set(['cream', 'ivory', 'linen', 'robin', 'rose', 'sage', 'slate'])
const PAPER_TEXTURES = new Set(['smooth', 'lined', 'grid', 'parchment', 'cardstock'])

export function sanitizePaperStyle(input) {
  return PAPER_STYLES.has(input) ? input : 'cream'
}
export function sanitizePaperTexture(input) {
  return PAPER_TEXTURES.has(input) ? input : 'smooth'
}

// === Vote direction =============================================
export function sanitizeDirection(input) {
  if (input === 1 || input === -1 || input === 0) return input
  return 0
}
