# Test Spec — Autoencoder Interactive Site

## Build / Static Checks
- `node --check src/main.js`
- `node --check src/content.js`
- `npm run build`
- LSP diagnostics on `src/main.js`, `src/content.js`, `src/style.css`
- `npm audit --omit=dev`

## Content Checks
- Section count >= 15
- Challenge section exists
- Source trace exists
- Site notes exist
- Reference basis exists

## Visual Smoke Checks
- Home page screenshot renders without obvious layout breakage
- Challenge page screenshot renders without obvious layout breakage
- Sidebar, hero, main interaction panel, evidence cards visible

## Remaining Manual QA
- Mobile touch feel for canvas-heavy scenes
- Full scroll-through review of all sections in a live browser
