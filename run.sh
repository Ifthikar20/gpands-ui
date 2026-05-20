#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────
# Good People & Story — secure launcher
#
# Hardening notes:
#   - Strict shell mode: errexit, nounset, pipefail, hardened IFS
#   - umask 077 so any files this script creates are owner-only
#   - Loopback host by default; LAN binding requires ALLOW_LAN=1
#   - Port pinned and validated (1024–65535)
#   - npm ci --ignore-scripts: reproducible install, no post-install
#     scripts (no arbitrary code execution from transitive deps)
#   - Subcommand allowlist via case — no eval of user input anywhere
#   - Cleanup trap kills child Vite process on signals
#   - Quoted "$@" everywhere, -- separators where supported
# ─────────────────────────────────────────────────────────────────────

set -Eeuo pipefail
IFS=$'\n\t'
umask 077

# Resolve script directory without following symlinks blindly.
SCRIPT_DIR="$(CDPATH='' cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd -P)"
cd -- "$SCRIPT_DIR"

# ── Configuration ────────────────────────────────────────────────────
readonly MIN_NODE_MAJOR=18
readonly DEFAULT_PORT=5173
readonly DEFAULT_HOST='127.0.0.1'
readonly LOG_DIR="$SCRIPT_DIR/.run-logs"

PORT="${PORT:-$DEFAULT_PORT}"
HOST="${HOST:-$DEFAULT_HOST}"

# ── Coloring (no-op when stdout is not a TTY) ────────────────────────
if [[ -t 1 ]]; then
  C_RED=$'\033[31m'; C_GRN=$'\033[32m'; C_YLW=$'\033[33m'
  C_BLU=$'\033[34m'; C_DIM=$'\033[2m';  C_RST=$'\033[0m'
else
  C_RED=''; C_GRN=''; C_YLW=''; C_BLU=''; C_DIM=''; C_RST=''
fi

log()  { printf '%s[gpas]%s %s\n' "$C_BLU" "$C_RST" "$*"; }
ok()   { printf '%s[gpas]%s %s\n' "$C_GRN" "$C_RST" "$*"; }
warn() { printf '%s[gpas]%s %s\n' "$C_YLW" "$C_RST" "$*" >&2; }
err()  { printf '%s[gpas]%s %s\n' "$C_RED" "$C_RST" "$*" >&2; }

# ── Cleanup ──────────────────────────────────────────────────────────
CHILD_PID=''
cleanup() {
  local rc=$?
  if [[ -n "$CHILD_PID" ]] && kill -0 "$CHILD_PID" 2>/dev/null; then
    log 'shutting down…'
    kill -TERM "$CHILD_PID" 2>/dev/null || true
    # Give it a moment, then escalate.
    for _ in 1 2 3 4 5; do
      kill -0 "$CHILD_PID" 2>/dev/null || break
      sleep 1
    done
    kill -KILL "$CHILD_PID" 2>/dev/null || true
    wait "$CHILD_PID" 2>/dev/null || true
  fi
  exit "$rc"
}
trap cleanup EXIT INT TERM HUP

on_error() {
  err "command failed at line $1 (exit $2)"
}
trap 'on_error "$LINENO" "$?"' ERR

# ── Validation ───────────────────────────────────────────────────────
require_cmd() {
  command -v -- "$1" >/dev/null 2>&1 \
    || { err "missing required command: $1"; exit 127; }
}

check_node() {
  require_cmd node
  require_cmd npm
  local raw major
  raw="$(node -v)"
  major="${raw#v}"
  major="${major%%.*}"
  if ! [[ "$major" =~ ^[0-9]+$ ]] || (( major < MIN_NODE_MAJOR )); then
    err "Node $MIN_NODE_MAJOR+ required, found $raw"
    exit 1
  fi
}

validate_port() {
  local p="$1"
  if ! [[ "$p" =~ ^[0-9]+$ ]] || (( p < 1024 || p > 65535 )); then
    err "invalid PORT: '$p' (allowed range: 1024–65535)"
    exit 2
  fi
}

validate_host() {
  local h="$1"
  case "$h" in
    127.0.0.1|localhost|::1) return 0 ;;
  esac
  if [[ "${ALLOW_LAN:-0}" == '1' ]]; then
    # Even with opt-in, only allow IPv4/IPv6/hostname-shaped values.
    if [[ "$h" =~ ^[A-Za-z0-9.:_-]+$ ]]; then
      warn "binding to $h — ALLOW_LAN=1 set, app will be reachable on the network."
      return 0
    fi
    err "host '$h' contains unsupported characters"
    exit 2
  fi
  err "refusing to bind to '$h'. Set ALLOW_LAN=1 to override."
  exit 2
}

ensure_log_dir() {
  mkdir -p -m 700 -- "$LOG_DIR"
}

# ── Subcommands ──────────────────────────────────────────────────────
cmd_install() {
  log 'installing dependencies…'
  if [[ -f package-lock.json ]]; then
    # --ignore-scripts blocks post-install scripts from transitive deps,
    # neutering a common supply-chain attack vector.
    npm ci --no-audit --no-fund --ignore-scripts
  else
    warn 'no package-lock.json found — falling back to npm install'
    npm install --no-audit --no-fund --ignore-scripts
  fi
  ok 'dependencies installed.'
}

cmd_dev() {
  validate_port "$PORT"
  validate_host "$HOST"
  ensure_log_dir
  [[ -d node_modules ]] || cmd_install
  log "starting dev server on http://$HOST:$PORT"
  # --strictPort so we fail loud instead of silently choosing another port.
  npm run dev -- --host "$HOST" --port "$PORT" --strictPort &
  CHILD_PID=$!
  wait "$CHILD_PID"
}

cmd_build() {
  [[ -d node_modules ]] || cmd_install
  log 'building production bundle…'
  NODE_ENV=production npm run build
  ok 'build complete → dist/'
}

cmd_preview() {
  validate_port "$PORT"
  validate_host "$HOST"
  [[ -d dist ]] || cmd_build
  log "serving production build on http://$HOST:$PORT"
  npm run preview -- --host "$HOST" --port "$PORT" --strictPort &
  CHILD_PID=$!
  wait "$CHILD_PID"
}

cmd_audit() {
  log 'running npm audit (production deps, level=high)…'
  # Don't fail the script on findings — let the operator decide.
  npm audit --omit=dev --audit-level=high || true
}

cmd_clean() {
  log 'removing build artifacts…'
  rm -rf -- dist .vite "$LOG_DIR"
  ok 'cleaned.'
}

cmd_doctor() {
  log 'environment check'
  printf '  node    %s\n' "$(node -v 2>/dev/null || echo missing)"
  printf '  npm     %s\n' "$(npm -v 2>/dev/null || echo missing)"
  printf '  os      %s\n' "$(uname -srm)"
  printf '  pwd     %s\n' "$SCRIPT_DIR"
  printf '  port    %s\n' "$PORT"
  printf '  host    %s\n' "$HOST"
  printf '  lockfile present: %s\n' "$([[ -f package-lock.json ]] && echo yes || echo no)"
  printf '  node_modules: %s\n' "$([[ -d node_modules ]] && echo yes || echo no)"
}

cmd_help() {
  cat <<EOF
Good People & Story — secure launcher

Usage: ./run.sh <command>

Commands:
  install    Install dependencies reproducibly (npm ci, scripts disabled)
  dev        Start the dev server  (default: http://${DEFAULT_HOST}:${DEFAULT_PORT})
  build      Production build to ./dist
  preview    Serve ./dist locally
  audit      npm audit at level=high (production deps only)
  doctor     Print environment diagnostics
  clean      Remove dist/, .vite/, .run-logs/
  help       Show this message

Environment variables:
  PORT       Override port (1024–65535). Default ${DEFAULT_PORT}.
  HOST       Override host. Default ${DEFAULT_HOST}.
             Non-loopback values require ALLOW_LAN=1.
  ALLOW_LAN  Set to 1 to permit binding to non-loopback interfaces.

Security posture:
  • Strict shell mode (errexit, nounset, pipefail, hardened IFS)
  • umask 077 — created files/dirs are owner-only
  • npm ci --ignore-scripts (no post-install code execution)
  • Default host is 127.0.0.1; LAN exposure requires opt-in
  • --strictPort prevents silent port reassignment
  • Subcommand allowlist; no eval of user input
  • SIGTERM-then-SIGKILL cleanup of child process

Examples:
  ./run.sh dev                         # local dev on 127.0.0.1:5173
  PORT=3000 ./run.sh dev               # different port
  ALLOW_LAN=1 HOST=0.0.0.0 ./run.sh dev  # explicit LAN exposure
  ./run.sh build && ./run.sh preview   # production smoke test
EOF
}

# ── Dispatch ─────────────────────────────────────────────────────────
main() {
  check_node
  local sub="${1:-help}"
  case "$sub" in
    install) cmd_install ;;
    dev)     cmd_dev ;;
    build)   cmd_build ;;
    preview) cmd_preview ;;
    audit)   cmd_audit ;;
    doctor)  cmd_doctor ;;
    clean)   cmd_clean ;;
    help|-h|--help) cmd_help ;;
    *) err "unknown command: $sub"; cmd_help; exit 64 ;;
  esac
}

main "$@"
