# Target Capability Matrix

This table tracks practical host support, not just whether a JS function exists on `window`.

## Legend

- `yes`: supported and wired end-to-end
- `no`: intentionally unsupported in this target
- `partial`: available but constrained (see notes)

## Matrix

| Capability | Electron (full) | Web demo | VS Code extension |
| --- | --- | --- | --- |
| Project load/save/read (`.splash`, `.json`) | yes | no | yes |
| PNG selection/bookmark export | yes | no | yes |
| Tilemap export (`.png` + `.tmx`) | yes | no | yes |
| Additional image export (BMP/GIF/PCX/TGA) | yes | no | no |
| Import image / ROM source import | yes | no | no |
| Recording capture | yes | no | no |
| AI image generation | yes | no | no |
| Options persistence (keys/provider/advanced mode) | yes | partial | no |
| Native menu action dispatch | yes | no | no |
| View menu state reflection | yes | no | no |
| Fullscreen toggle | yes | partial | no |

## Notes

1. Web demo intentionally runs without host file system dialogs or persistent project writes.
2. Web demo `optionsApi` exists only to keep UI flow stable; it does not provide secure/persistent key management.
3. VS Code capabilities are negotiated at runtime from extension host to webview (`pss:event` with `capabilities`).
4. Electron remains the release-complete host while web/VS Code continue to converge via the shared platform boundary.
