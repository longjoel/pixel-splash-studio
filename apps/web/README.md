# Web App Target

This target hosts the standalone browser build of Pixel Splash Studio.

Current status:
1. Uses the root renderer (`src/renderer`) and Vite config (`vite.config.ts`).
2. Build output is generated at `dist/` from the repository root.

Build:
```bash
npm run build:renderer
```
