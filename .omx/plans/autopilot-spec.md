# Autopilot Spec — Autoencoder Interactive Website

## Objective
Deliver a Vite-based, interactive educational website derived from `autoencoder.pdf` (Deep Learning Book Chapter 14) that explains autoencoders in easy Korean, focuses on core ideas, includes 15+ detailed pages/sections, and feels playful rather than static.

## Current Status
- Existing implementation already satisfies the main product shape.
- Current app is Vite-based and buildable.
- Current content covers 18 sections aligned to the chapter.
- Current site includes multiple interactive learning modules.

## Functional Requirements
1. Use Vite with runnable `dev/build/preview` scripts.
2. Provide at least 15 sections/pages; current target is 18.
3. Cover core chapter areas: undercomplete, regularized, sparse, denoising, score estimation, representational power, stochastic encoders/decoders, manifolds, contractive autoencoders, predictive sparse decomposition, applications.
4. Provide interactive learning modules rather than plain text.
5. Provide chapter navigation, previous/next controls, and progress.
6. Include easy explanation, analogy, misconception, and correction for each section.
7. Preserve evidence of multi-agent production/validation in the final report.

## Non-Functional Requirements
1. Responsive layout for desktop/tablet/mobile.
2. Lightweight implementation with no unnecessary dependencies.
3. Build must succeed.
4. Keyboard navigation should work.
5. Content must clearly read as an educational simulation, not a paper reproduction or trained-model demo.

## Pedagogical Requirements
1. Use easy Korean.
2. Prioritize “why this works” and “what each constraint does.”
3. Use analogies and misconception-correction.
4. Use interaction to reinforce learning.
5. End with recap/quiz.

## Remaining Polish Targets
1. Add explicit source/scope messaging to reduce ambiguity.
2. Add a compact references/source basis section to better match paper-to-web expectations.
3. Re-run verification after the polish pass.

## Acceptance Criteria
- `npm run build` succeeds.
- 15+ sections exist.
- Core chapter areas are represented.
- Navigation/progress exist.
- Multiple interactive modules exist.
- Easy explanation + analogy + misconception/correction exist per section.
- Source basis and educational-simulation scope are visible in the UI.
