# Pixel Splash Studio

Pixel Splash Studio is a pixel art editor built with C# and GtkSharp. It focuses on fast drawing, flexible selections, stamping, and a reference layer you can bake into pixels.

## Build and Run

Requirements:
- .NET SDK (target framework: net10.0 preview)
- GTK 3 runtime (required by GtkSharp)

Build:
```bash
dotnet build
```

Run:
```bash
dotnet run
```

## Using the App

Basics:
- Choose tools from the toolbar (pen, line, rectangle, oval, erase, flood fill, stamp, selections).
- Click the color swatch to swap primary/secondary colors.
- Use the selection tools to copy, cut, or export a selection as PNG.

Reference layer:
- Paste an image or text onto the reference layer.
- Adjust opacity and snap settings in Tool Options.
- Bake the reference into pixels when ready.

Shortcuts:
- Open `Help -> Shortcut Keys` to see the current bindings.
- Shortcuts are generated from `config.ini`, so your edits appear there.

Configuration:
- Linux config path: `~/.config/pixel-splash-studio/config.ini`

## Support the Project

Pixel Splash Studio is free and open-source. If it helps your work and you want to support development, you can contribute here:
- https://www.paypal.com/donate/?hosted_button_id=RKJDDK8J5ZPVW

Thanks for supporting the project.

## Project Layout

- `App/` application bootstrap and configuration
- `Canvas/` canvas data and reference objects
- `Core/` core data structures
- `Rendering/` viewport rendering
- `Services/` app services (history, files, palettes, etc.)
- `Tools/` drawing and transform tools
- `UI/` GTK widgets, layouts, and main window
