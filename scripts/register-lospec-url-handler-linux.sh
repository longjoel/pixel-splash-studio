#!/usr/bin/env bash
set -euo pipefail

if [[ "${1:-}" == "" ]]; then
  echo "Usage: $0 /absolute/path/to/pixel-splash-studio"
  echo ""
  echo "Example (from an extracted zip folder):"
  echo "  $0 \"$(pwd)/pixel-splash-studio\""
  exit 2
fi

EXEC_PATH="$1"
if [[ ! -x "$EXEC_PATH" ]]; then
  echo "Error: not executable: $EXEC_PATH" >&2
  exit 2
fi

APP_NAME="Pixel Splash Studio"
DESKTOP_ID="pixel-splash-studio.desktop"
APPLICATIONS_DIR="${HOME}/.local/share/applications"
DESKTOP_PATH="${APPLICATIONS_DIR}/${DESKTOP_ID}"

mkdir -p "$APPLICATIONS_DIR"

cat > "$DESKTOP_PATH" <<EOF
[Desktop Entry]
Type=Application
Name=${APP_NAME}
Exec="${EXEC_PATH//\"/\\\"}" %u
Terminal=false
Categories=Graphics;
MimeType=x-scheme-handler/lospec-palette;
EOF

if command -v xdg-mime >/dev/null 2>&1; then
  xdg-mime default "$DESKTOP_ID" x-scheme-handler/lospec-palette || true
else
  echo "Warning: xdg-mime not found; you may need to set the default handler manually." >&2
fi

if command -v update-desktop-database >/dev/null 2>&1; then
  update-desktop-database "$APPLICATIONS_DIR" || true
fi

echo "Registered lospec-palette:// handler."
echo "Desktop entry: $DESKTOP_PATH"
echo "Try: xdg-open \"lospec-palette://oil-6\""

