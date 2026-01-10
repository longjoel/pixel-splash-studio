#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <version> [notes-file]" >&2
  exit 1
fi

version="$1"
notes_file="${2:-}"

if [[ ! -f package.json ]] || [[ ! -f package-lock.json ]]; then
  echo "Error: package.json/package-lock.json not found." >&2
  exit 1
fi

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Error: working tree is not clean." >&2
  exit 1
fi

current_branch="$(git rev-parse --abbrev-ref HEAD)"
if [[ "$current_branch" != "main" ]]; then
  echo "Error: must be on main branch (current: $current_branch)." >&2
  exit 1
fi

python - <<PY
import json
from pathlib import Path
version = "${version}"
for path in [Path('package.json'), Path('package-lock.json')]:
    data = json.loads(path.read_text())
    data['version'] = version
    path.write_text(json.dumps(data, indent=2) + "\n")
PY

git add package.json package-lock.json

git commit -m "Bump version to ${version}"

git tag "${version}"

npm run make

artifact="out/make/zip/linux/x64/Pixel Splash Studio-linux-x64-${version}.zip"
if [[ ! -f "$artifact" ]]; then
  echo "Error: build artifact not found at $artifact" >&2
  exit 1
fi

git push origin main --tags

if [[ -z "$notes_file" ]]; then
  notes_file="/tmp/pixel-splash-release-${version}.txt"
  printf "Release %s\n" "$version" > "$notes_file"
fi

gh release create "$version" "$artifact" --title "$version" --notes-file "$notes_file"

echo "Release created for $version"
