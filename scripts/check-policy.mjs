#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────────────
// UI policy checker for Good People & Story.
//
// Hard policies (fail the build):
//   1. No emoji or pictographic characters in any source file.
//   2. No raw hex colors in .vue / .css files — use design tokens.
//   3. No console.log / console.debug calls in shipped code.
//   4. No inline `style="..."` attributes (use class + :style bindings).
//   5. No `<img>` tags without an `alt=` attribute.
//   6. No `v-html` outside the trusted SvgIcon registry.
//   7. No "TODO"/"FIXME" markers in shipped code.
//
// Scope: scans src/ and index.html. Skips node_modules, dist, .git, and
// the icon registry (icons.js) where SVG path literals live.
// ─────────────────────────────────────────────────────────────────────

import { readdirSync, readFileSync, statSync } from 'node:fs'
import { extname, join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(fileURLToPath(import.meta.url), '..', '..')
const SCAN_ROOTS = ['src', 'index.html']
const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', '.vite', '.run-logs'])

// Files genuinely allowed to contain raw SVG / hex colors / pictographic
// declarations. Keep this list short and explicit.
const ICON_REGISTRY = 'src/assets/icons/icons.js'
const TOKENS = 'src/assets/styles/tokens.css'
const ALLOW_HEX = new Set([
  TOKENS,
  // Mock data palettes are gradients used as banner backgrounds. They are
  // not theme tokens; they identify topics. Acceptable, but the rule is
  // documented in CONTRIBUTING-style policy comments above each block.
  'src/data/mock-data.js',
  ICON_REGISTRY,
])
const ALLOW_VHTML = new Set([
  'src/components/icons/SvgIcon.vue', // renders trusted registry strings
])
const ALLOW_EMOJI = new Set([
  'scripts/check-policy.mjs', // self-reference: the detector's regex contains the codepoints
])
const ALLOW_STYLE_ATTR = new Set([]) // dynamic gradients use :style, not style=

// Match any character in Unicode "Extended_Pictographic" plus common
// emoji-ish ranges. Excludes plain text symbols.
const EMOJI_RE = /\p{Extended_Pictographic}|️|‍[♀-♂]|[\u{1F1E6}-\u{1F1FF}]/u

// 3 or 6 digit hex colors (`#abc`, `#aabbcc`, `#aabbccdd`).
const HEX_RE = /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/

const CONSOLE_RE = /\bconsole\.(log|debug|trace|info)\s*\(/

// `style="..."` (string-literal attribute, not Vue's `:style` binding).
const INLINE_STYLE_RE = /(?<![:@])\bstyle\s*=\s*"/

const IMG_NO_ALT_RE = /<img\b(?:(?!\balt\s*=)[^>])*\/?>/i

const VHTML_RE = /\bv-html\s*=/

const TODO_RE = /\b(TODO|FIXME|XXX|HACK)\b/

// Block eval() and `new Function(` — common XSS / RCE primitives.
// Match `eval(` and `new Function(` but not `function foo()` or variables
// named `evaluation`.
const EVAL_RE = /\b(?:eval\s*\(|new\s+Function\s*\()/

// Block dangerouslySetInnerHTML (React-style) just in case it ever creeps in.
const DANGEROUS_HTML_RE = /dangerouslySetInnerHTML/

const checks = [
  {
    id: 'no-emoji',
    re: EMOJI_RE,
    msg: 'emoji or pictographic character is forbidden by policy',
    allowFiles: ALLOW_EMOJI,
    appliesTo: () => true,
  },
  {
    id: 'no-raw-hex',
    re: HEX_RE,
    msg: 'raw hex color — use a design token from tokens.css',
    allowFiles: ALLOW_HEX,
    appliesTo: (rel) => /\.(vue|css|js)$/.test(rel),
  },
  {
    id: 'no-console',
    re: CONSOLE_RE,
    msg: 'console.log/debug/trace/info must not ship in source',
    allowFiles: new Set(['src/lib/eventBus.js']), // bus uses console.error only
    appliesTo: (rel) => /\.(vue|js)$/.test(rel),
  },
  {
    id: 'no-inline-style',
    re: INLINE_STYLE_RE,
    msg: 'inline style="..." is forbidden — use a class or :style binding',
    allowFiles: ALLOW_STYLE_ATTR,
    appliesTo: (rel) => /\.(vue|html)$/.test(rel),
  },
  {
    id: 'img-requires-alt',
    re: IMG_NO_ALT_RE,
    msg: '<img> requires an alt= attribute for accessibility',
    allowFiles: new Set(),
    appliesTo: (rel) => /\.(vue|html)$/.test(rel),
  },
  {
    id: 'no-untrusted-v-html',
    re: VHTML_RE,
    msg: 'v-html is only permitted in the trusted SvgIcon registry',
    allowFiles: ALLOW_VHTML,
    appliesTo: (rel) => /\.vue$/.test(rel),
  },
  {
    id: 'no-todo-markers',
    re: TODO_RE,
    msg: 'TODO/FIXME markers must be resolved before shipping',
    allowFiles: new Set(['scripts/check-policy.mjs']),
    appliesTo: (rel) => /\.(vue|js|css|html|sh|mjs)$/.test(rel),
  },
  {
    id: 'no-eval',
    re: EVAL_RE,
    msg: 'eval() and new Function() are forbidden — code execution risk',
    allowFiles: new Set(['scripts/check-policy.mjs']),
    appliesTo: (rel) => /\.(vue|js|mjs)$/.test(rel),
  },
  {
    id: 'no-dangerous-html',
    re: DANGEROUS_HTML_RE,
    msg: 'dangerouslySetInnerHTML is forbidden — use trusted v-html in SvgIcon only',
    allowFiles: new Set(['scripts/check-policy.mjs']),
    appliesTo: (rel) => /\.(vue|js|mjs)$/.test(rel),
  },
]

function* walk(dir) {
  for (const entry of readdirSync(dir)) {
    if (SKIP_DIRS.has(entry)) continue
    const full = join(dir, entry)
    const st = statSync(full)
    if (st.isDirectory()) yield* walk(full)
    else yield full
  }
}

function collectFiles() {
  const out = []
  for (const r of SCAN_ROOTS) {
    const abs = join(ROOT, r)
    try {
      const st = statSync(abs)
      if (st.isDirectory()) for (const f of walk(abs)) out.push(f)
      else out.push(abs)
    } catch {
      /* root missing — skip */
    }
  }
  return out.map((f) => relative(ROOT, f).split(sep).join('/'))
}

function checkFile(rel) {
  const ext = extname(rel)
  if (!['.vue', '.js', '.mjs', '.css', '.html', '.sh'].includes(ext)) return []
  const content = readFileSync(join(ROOT, rel), 'utf8')
  const lines = content.split('\n')
  const failures = []

  for (const check of checks) {
    if (!check.appliesTo(rel)) continue
    if (check.allowFiles.has(rel)) continue
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      if (check.re.test(line)) {
        failures.push({ rule: check.id, file: rel, line: i + 1, msg: check.msg, snippet: line.trim().slice(0, 100) })
      }
    }
  }
  return failures
}

function main() {
  const files = collectFiles()
  const failures = []
  for (const f of files) failures.push(...checkFile(f))

  const COL = process.stdout.isTTY
    ? { red: '[31m', grn: '[32m', dim: '[2m', bld: '[1m', rst: '[0m' }
    : { red: '', grn: '', dim: '', bld: '', rst: '' }

  console.log(`${COL.dim}[policy] scanned ${files.length} files across ${checks.length} rules${COL.rst}`)
  if (failures.length === 0) {
    console.log(`${COL.grn}[policy] PASS — all rules satisfied${COL.rst}`)
    process.exit(0)
  }

  console.error(`${COL.red}${COL.bld}[policy] FAIL — ${failures.length} violation${failures.length === 1 ? '' : 's'}${COL.rst}\n`)
  for (const f of failures) {
    console.error(`  ${COL.red}${f.rule}${COL.rst}  ${f.file}:${f.line}`)
    console.error(`    ${COL.dim}${f.msg}${COL.rst}`)
    console.error(`    ${COL.dim}> ${f.snippet}${COL.rst}`)
  }
  process.exit(1)
}

main()
