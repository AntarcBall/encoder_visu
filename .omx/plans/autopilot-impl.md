# Autopilot Implementation Plan

## Phase 1 Plan
1. Preserve the existing app structure and avoid heavy refactors.
2. Add explicit “source basis / educational simulation” UI text near the top-level experience.
3. Add a compact references/source card for trust and paper-to-web polish.
4. Keep the implementation lightweight by editing only content/main/style files.
5. Verify with build + syntax checks + content count.

## Planned Touchpoints
- `src/content.js`
- `src/main.js`
- `src/style.css`

## Risks
- Over-expanding scope into full citation infrastructure.
- Visual regressions from layout additions.

## Done Definition
- UI visibly signals source + scope.
- Existing features remain intact.
- Build stays green.
