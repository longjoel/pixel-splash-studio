# Pixel Splash Studio

Pixel Splash Studio is a pixel art editor built with C# and GtkSharp. It focuses on fast drawing, selection tools, stamping, and a reference layer that can be baked into pixels.

## Features

- Pixel-based drawing tools: pen, line, rectangle, oval, erase, flood fill.
- Selection tools: rectangle, oval, magic wand, plus add/subtract modes.
- Stamp tool with rotation, flip, scale, snap modes, and overwrite behavior.
- Reference layer for images or text, with opacity control and bake-to-pixels.
- Copy selection to stamp clipboard and export selections to PNG.
- Custom project file format (`.pss`).
- Configurable shortcuts in `config.ini`.

## Screenshots

![Pixel Splash Studio showing palette tools and a pixel art canvas.](docs/screenshot.png)
![Selection tools with add and subtract modes active.](docs/screenshot-selection-mode.png)
![Painting with a reference layer alongside the canvas.](docs/screenshot-painting-reference.png)

## Requirements

- .NET SDK (target framework: net10.0)
- GTK 3 runtime (required by GtkSharp)

## Build and Run

```bash
dotnet build
dotnet run
```

## Packaging (Linux AppImage)

Build a local AppImage with the provided script:

```bash
./scripts/build_linux_appimage.sh
```

Dependencies:

- `appimagetool` (required)
- `linuxdeploy` + `linuxdeploy-plugin-gtk` (optional but recommended for bundling GTK libs)

The output AppImage is written to `dist/pixel-splash-studio.AppImage`.

## Packaging (Windows)

Build Windows self-contained zips and optional self-extracting executables:

```powershell
.\scripts\build_windows_packages.ps1
```

Outputs:

- `dist/windows/pixel-splash-studio-win-x64.zip`
- `dist/windows/pixel-splash-studio-win-arm64.zip`
- `dist/windows/pixel-splash-studio-win-x64.exe` (if `7z` is installed)
- `dist/windows/pixel-splash-studio-win-arm64.exe` (if `7z` is installed)

Notes:

- Install `7z` if you want the self-extracting `.exe`.

## Configuration

The app writes a configuration file on first run:

- Linux: `~/.config/pixel-splash-studio/config.ini`

The file contains window settings, grid settings, and shortcut mappings. You can edit any `shortcut.*` entry to change keybindings.

## Shortcuts

Open Help -> Shortcut Keys to view the current shortcut cheat-sheet. It is generated from the `config.ini` entries, so any edits are reflected there.

## Notes

- The reference layer supports paste from clipboard (images or text) and can be baked onto the pixel layer.
- Selection export writes PNG files.

## How To: Add a New Tool (example: export tiles to animation)

This project routes tools through a common pipeline: a tool implementation, catalog wiring, UI hooks, and app state updates. A minimal path for a new tool looks like this:

1) Implement the tool
- Create a new tool class in `Tools/` and implement `ITool`. See `Tools/` and `Core/ITool.cs`.
- If the tool is not a drawing tool (e.g., “Export Tiles to Animation”), consider implementing it as a menu action/service instead of an `ITool` so it does not require cursor interactions.

2) Register the tool type
- Add a new value to `Core/ToolMode.cs`.
- Add the tool instance to `Services/ToolCatalog.cs` so it is constructed with the right dependencies.

3) Wire it to AppState
- Add an activation hook in `UI/MainWindow.cs` (toolbar/menu to `App/AppState.cs:SetActiveTool`).
- Extend `UI/MainWindow.cs: ApplyToolModeToView` and `UI/MainWindow.cs: UpdateToolbarSelection` to activate the tool in viewports.

4) Add UI entry points
- Add menu items in `UI/Layouts/MainWindow.glade` (Tools menu) and/or toolbar buttons in `UI/Layouts/ToolsPanelWidget.glade`.
- Wire events in `UI/MainWindow.cs` and `UI/Widgets/ToolsPanelWidget.cs`.

5) Add tool options (if any)
- Add option widgets to the Options menu in `UI/Layouts/MainWindow.glade`.
- Hook visibility and state in `UI/MainWindow.cs: UpdateOptionsMenu` and `UI/MainWindow.cs: UpdateToolbarOptions`.

6) Add shortcuts
- Add a `shortcut.*` entry to `config.ini` defaults in `App/AppConfig.cs`.
- Bind the action in `UI/MainWindow.cs: ApplyShortcutBindings`.

7) Test the flow
- Build and run, verify tool selection and interactions across both docked and detached viewports.

For an “Export Tiles to Animation” feature, it may be better as a menu-driven command:
- Create a new service in `Services/` to export frames (e.g., PNG sequence or GIF).
- Add a menu item under File or Tools in `UI/Layouts/MainWindow.glade`, then wire it in `UI/MainWindow.cs`.

### Tool Addition Checklist

- [ ] Tool class added in `Tools/` and implements `ITool` (`Core/ITool.cs`).
- [ ] New tool mode added in `Core/ToolMode.cs`.
- [ ] Tool constructed in `Services/ToolCatalog.cs`.
- [ ] Tool activation wired in `UI/MainWindow.cs` and `UI/Widgets/ToolsPanelWidget.cs`.
- [ ] Tool view selection wired in `UI/MainWindow.cs: ApplyToolModeToView` and `UI/MainWindow.cs: UpdateToolbarSelection`.
- [ ] Menu/toolbar entries added in `UI/Layouts/MainWindow.glade` and/or `UI/Layouts/ToolsPanelWidget.glade`.
- [ ] Options UI and state updates in `UI/MainWindow.cs: UpdateOptionsMenu` and `UI/MainWindow.cs: UpdateToolbarOptions`.
- [ ] Shortcuts added in `App/AppConfig.cs` and bound in `UI/MainWindow.cs: ApplyShortcutBindings`.

## Project Layout

- `App/` application bootstrap and configuration
- `Canvas/` canvas data and reference objects
- `Core/` core data structures
- `Rendering/` viewport rendering
- `Services/` app services (history, files, palettes, etc.)
- `Tools/` drawing and transform tools
- `UI/` GTK widgets, layouts, and main window
