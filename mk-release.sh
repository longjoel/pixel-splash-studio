#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <version> [notes-file]" >&2
  exit 1
fi

version="$1"
notes_file="${2:-}"

export GIT_TERMINAL_PROMPT=0
export GH_PROMPT_DISABLED=1

if [[ ! -f package.json ]] || [[ ! -f package-lock.json ]]; then
  echo "Error: package.json/package-lock.json not found." >&2
  exit 1
fi

command -v git >/dev/null 2>&1 || { echo "Error: git is not installed." >&2; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "Error: npm is not installed." >&2; exit 1; }
command -v gh >/dev/null 2>&1 || { echo "Error: gh is not installed." >&2; exit 1; }
command -v python >/dev/null 2>&1 || command -v python3 >/dev/null 2>&1 || {
  echo "Error: python is not installed." >&2
  exit 1
}

python_bin="$(command -v python || command -v python3)"

git rev-parse --is-inside-work-tree >/dev/null 2>&1 || {
  echo "Error: not inside a git repository." >&2
  exit 1
}

gh auth status >/dev/null 2>&1 || {
  echo "Error: gh is not authenticated (run: gh auth login)." >&2
  exit 1
}

git clean -fdx >/dev/null

git checkout main >/dev/null 2>&1 || {
  echo "Error: unable to checkout main (is this a git repo with a main branch?)." >&2
  exit 1
}

git clean -fdx >/dev/null

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Error: working tree has tracked changes after git clean; aborting to avoid data loss." >&2
  exit 1
fi

npm install --no-fund --no-audit

"$python_bin" - <<PY
import json
from pathlib import Path
version = "${version}"
for path in [Path('package.json'), Path('package-lock.json')]:
    data = json.loads(path.read_text())
    data['version'] = version
    path.write_text(json.dumps(data, indent=2) + "\n")
PY

git add package.json package-lock.json

if git diff --cached --quiet; then
  echo "No version file changes to commit; continuing."
else
  git commit -m "Bump version to ${version}"
fi

if git rev-parse -q --verify "refs/tags/${version}" >/dev/null; then
  echo "Tag ${version} already exists; reusing it."
else
  git tag "${version}"
fi

if ! npm run build; then
  echo "Error: npm run build failed." >&2
  exit 1
fi

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

if gh release view "$version" >/dev/null 2>&1; then
  gh release upload "$version" "$artifact" --clobber
  echo "Uploaded artifact to existing release ${version}"
else
  gh release create "$version" "$artifact" --title "$version" --notes-file "$notes_file"
fi

echo "Release publishing completed for $version"
