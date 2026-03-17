# Task Statement
Turn `autoencoder.pdf` into a Vite-based interactive educational website focused on core autoencoder principles, with at least 15 detailed sections/pages, simple explanations, fun interactions, and multi-agent execution.

# Desired Outcome
A working, buildable website that explains Deep Learning Book Chapter 14 accessibly in Korean, includes interactive learning modules, and is verified.

# Known Facts / Evidence
- `autoencoder.pdf` is present in repo root and contains 25 pages.
- Extracted chapter headings include 14.1 through 14.9, including sparse/denoising/contractive/manifold/applications.
- `paper-2-web` skill has been installed locally and referenced.
- Current implementation already exists in `index.html`, `package.json`, `src/content.js`, `src/main.js`, `src/style.css`.
- Current build succeeds with Vite.

# Constraints
- Keep explanations easy.
- Focus on core principles over excessive math.
- Make interaction playful and pedagogical.
- Use Vite.
- No new dependencies unless justified.
- Keep diffs small and reversible.

# Unknowns / Open Questions
- Whether to further close gaps such as explicit references/citation-style source mapping.
- Whether mobile visual QA needs additional tuning after final polishing.

# Likely Codebase Touchpoints
- `src/content.js`
- `src/main.js`
- `src/style.css`
- `package.json`
- `index.html`
