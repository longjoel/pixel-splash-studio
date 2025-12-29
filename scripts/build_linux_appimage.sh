#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
APP_NAME="pixel-splash-studio"
RID="${RID:-linux-x64}"
CONFIG="${CONFIG:-Release}"
DIST_DIR="${ROOT}/dist"
PUBLISH_DIR="${DIST_DIR}/publish"
APPDIR="${DIST_DIR}/AppDir"
OUTPUT_APPIMAGE="${DIST_DIR}/${APP_NAME}.AppImage"

rm -rf "${DIST_DIR}"
mkdir -p "${PUBLISH_DIR}"

dotnet publish "${ROOT}/pixel-splash-studio.csproj" \
  -c "${CONFIG}" \
  -r "${RID}" \
  --self-contained true \
  -o "${PUBLISH_DIR}"

mkdir -p "${APPDIR}/usr/bin" \
  "${APPDIR}/usr/share/applications" \
  "${APPDIR}/usr/share/icons/hicolor/256x256/apps"

cp -a "${PUBLISH_DIR}/." "${APPDIR}/usr/bin/"

if [ ! -d "${APPDIR}/usr/bin/res" ]; then
  cp -a "${ROOT}/res" "${APPDIR}/usr/bin/"
fi

cat > "${APPDIR}/usr/share/applications/${APP_NAME}.desktop" <<EOF
[Desktop Entry]
Name=Pixel Splash Studio
Exec=${APP_NAME}
Icon=${APP_NAME}
Type=Application
Categories=Graphics;RasterGraphics;
EOF

cp "${ROOT}/res/icons/stamp.png" \
  "${APPDIR}/usr/share/icons/hicolor/256x256/apps/${APP_NAME}.png"

# AppImage expects these at the AppDir root for metadata.
cp "${APPDIR}/usr/share/applications/${APP_NAME}.desktop" "${APPDIR}/${APP_NAME}.desktop"
cp "${APPDIR}/usr/share/icons/hicolor/256x256/apps/${APP_NAME}.png" "${APPDIR}/${APP_NAME}.png"

cat > "${APPDIR}/AppRun" <<'EOF'
#!/bin/sh
HERE="$(dirname "$(readlink -f "$0")")"
exec "${HERE}/usr/bin/pixel-splash-studio" "$@"
EOF
chmod +x "${APPDIR}/AppRun"

if command -v linuxdeploy >/dev/null 2>&1; then
  if command -v linuxdeploy-plugin-gtk >/dev/null 2>&1; then
    # Bundle GTK and related runtime libraries when the plugin is available.
    linuxdeploy \
      --appdir "${APPDIR}" \
      --executable "${APPDIR}/usr/bin/${APP_NAME}" \
      --desktop-file "${APPDIR}/usr/share/applications/${APP_NAME}.desktop" \
      --icon-file "${APPDIR}/usr/share/icons/hicolor/256x256/apps/${APP_NAME}.png" \
      --plugin gtk
  else
    echo "linuxdeploy-plugin-gtk not found; skipping GTK bundling."
  fi
else
  echo "linuxdeploy not found; skipping GTK bundling."
fi

if ! command -v appimagetool >/dev/null 2>&1; then
  echo "appimagetool not found; install it to build the AppImage."
  exit 1
fi

ARCH=x86_64 appimagetool "${APPDIR}" "${OUTPUT_APPIMAGE}"
echo "AppImage created at ${OUTPUT_APPIMAGE}"
