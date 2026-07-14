# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tech Stack

- **React 19** + **TypeScript** (on **Vite 8**)
- Build/dev server: **Vite**
- Linter: **Oxlint** (not ESLint)
- Package manager: npm

## Key Commands

```bash
npm install         # install dependencies
npm run dev         # run the dev server (default port 5173)
npm run build       # type-check (tsc -b), then produce a production build with vite build
npm run preview     # preview the built output locally
npm run lint        # run oxlint
npm run format      # format the codebase with Prettier
npm run format:check # check formatting without writing (used by the pre-commit hook)
npm test            # run the Vitest test suite
```

To only run a type check:

```bash
npx tsc --noEmit -p tsconfig.app.json
```

## Testing

**Vitest** is installed. Tests live next to the code they test (e.g. `src/game/engine.test.ts`). The pure functions in `src/game/engine.ts` (physics, collisions, splitting, item rolls) are the highest-value place to add tests — they take plain data in and out, no DOM/React needed. Run `npm test` (or `npx vitest run`) before considering game-logic changes done.

## Pre-commit Hook

Husky runs `.husky/pre-commit` before every commit: `prettier --check`, `tsc --noEmit`, and `oxlint`, in that order. A commit is blocked if any of these fail — run `npm run format` to fix formatting issues it flags.

## Architecture

- The entry point is `src/main.tsx` → `src/App.tsx`.
- `src/App.tsx`: the top-level component that manages screen transitions (main/countdown/play/demo/map/end), stage progression, and local score-history state.
- `src/GamePlay.tsx`: the actual gameplay screen. Draws obstacles, balls, harpoons, items, player, and particles on Canvas 2D (backgrounds come from `src/game/backgrounds.ts`), and in a `requestAnimationFrame`-based game loop handles input (keyboard/touch, or the demo-mode AI), physics updates, collision detection, and score/combo/HP/buff updates.
- `src/StageMap.tsx`: read-only stage list with live background thumbnails, reusing `src/game/backgrounds.ts`.
- `src/game/constants.ts`: game constants — canvas size, player/harpoon speed, gravity/restitution/min-bounce-speed, HP, per-ball-size score, combo window, stage count, obstacle position, item drop/duration constants, etc.
- `src/game/types.ts`: game domain types such as `Ball`, `Harpoon`, `Item`, `StageResult`.
- `src/game/engine.ts`: pure logic — stage generation (`createStage`), ball gravity/bounce physics (`stepBall`), splitting (`splitBall`/`explodeToSmallest`), item rolls (`rollItemDrop`), and harpoon/ball/player/item collision detection. Covered by `src/game/engine.test.ts` (Vitest).
- `src/game/backgrounds.ts`: the 5 world-tour stage background drawing functions, shared by `GamePlay.tsx` and `StageMap.tsx`.
- `src/game/audio.ts`: sound effects synthesized with Web Audio API oscillators (ball hit, player hit, item pickup, clear, game over) plus per-stage-theme BGM patterns.
- `src/game/scoreHistory.ts`: local score-history storage (`localStorage`), player name, and rank computation.
- The root `tsconfig.json` is split into two project references: `tsconfig.app.json` (for app source) and `tsconfig.node.json` (for the Node environment, e.g. Vite config).
- `vite.config.ts` sets the GitHub Pages `base` path and uses the `@vitejs/plugin-react` plugin; `vitest.config.ts` is separate, for the test runner.
- The Oxlint config lives in `.oxlintrc.json`, with type-aware lint rules (typeAware) disabled by default. Prettier config is in `.prettierrc.json`.

## Working Style

- When a new requirement comes in, don't modify code right away — first update the relevant design docs (`docs/PRD.md`, `docs/PLAN.md`, `docs/design/*.md`), then implement.
- Split commits into small, feature-sized units, and push to the remote (`origin master`) immediately after every commit.

## Commit Convention

Follow the [Conventional Commits](https://www.conventionalcommits.org/) format.

```
<type>: <description (English, imperative mood, lowercase start)>
```

- `feat`: add a new feature/gameplay element
- `fix`: bug fix
- `docs`: changes to design docs under `docs/` (no code changes)
- `style`: visual/styling changes (no behavior change, e.g. color/font/layout)
- `refactor`: code structure improvements with no behavior change
- `chore`: build config, dependencies, and other miscellaneous chores

Example: `feat: add power-up drops and effects`, `docs: design phase3-4 power-ups`

If a body is needed, leave a blank line after the subject and add the description there. End the commit message with `Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>`.

## Design Docs

- `docs/PRD.md` — overview of the game's overall requirements
- `docs/FEATURES/main.md` — main screen features
- `docs/FEATURES/game_rule.md` — game rules
- `docs/FEATURES/mission1.md` — mission 1 (tutorial stage)
- `docs/PLAN.md` — file laying out the goals for each phase
- `docs/design/` — detailed design docs for each phase in PLAN.md (1-1 to 1-6, 2-1 to 2-7, 3-1 to 3-4, 4-1 to 4-4)
