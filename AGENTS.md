# Agents Guide

This repository is Pixel Splash Studio, a C# GtkSharp pixel art editor.
Use this file as a quick orientation and to keep future edits consistent.

## Build and Run

- Build: `dotnet build`
- Run: `dotnet run`
- Target framework: `net10.0` (preview)

## Packaging Scripts

- Linux AppImage: `scripts/build_linux_appimage.sh`
  - Outputs `dist/pixel-splash-studio.AppImage`
  - Uses `linuxdeploy` + `linuxdeploy-plugin-gtk` when available
  - Requires `appimagetool`
- Windows packages: `scripts/build_windows_packages.ps1`
  - Outputs `dist/windows/pixel-splash-studio-win-x64.zip` and `-win-arm64.zip`
  - Optional self-extracting `.exe` when `7z` is installed

## GitHub Actions

- `./github/workflows/build-linux-appimage.yml`
  - Builds AppImage on `workflow_dispatch` and release publish
  - Installs `appimagetool` and `linuxdeploy` before running the script
- `./github/workflows/build-windows-packages.yml`
  - Builds Windows packages on `workflow_dispatch` and release publish

## Project Layout

- `App/` bootstrap and configuration
- `Canvas/` canvas data and reference objects
- `Core/` core data structures
- `Rendering/` viewport rendering
- `Services/` app services
- `Tools/` drawing and transform tools
- `UI/` GTK widgets, layouts, main window
- `res/` icons and app assets

## Tooling Notes

- GTK 3 runtime is required by GtkSharp.
- Configuration file is generated on first run:
  - Linux: `~/.config/pixel-splash-studio/config.ini`

## License

- MIT (see `LICENSE`)
