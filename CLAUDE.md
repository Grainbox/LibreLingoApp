# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run start        # Start Expo dev server
npm run web          # Launch web version at http://localhost:19006
npm run android      # Launch on Android via Expo Go
npm run ios          # Launch on iOS via Expo
npm run lint         # Run ESLint on .ts/.tsx files
npm run format       # Auto-format with Prettier
npm run type-check   # TypeScript check without emit (tsc --noEmit)
```

No test runner is configured yet (MVP phase).

## Architecture

**Stack:** React Native + Expo 54 / Expo Router 4 (file-based routing), TypeScript strict mode. Planned additions: React Native Skia (graphics), Reanimated (animations), WatermelonDB (offline SQLite storage).

**Routing:** Expo Router — directory structure *is* the route tree. `app/_layout.tsx` is the root Stack navigator; `app/(tabs)/` defines the three-tab group (Learn, Profile, Store). No explicit route registration needed.

**Source layout (`src/`):**
- `types/index.ts` — all shared TypeScript interfaces; the `Challenge` type is a discriminated union of 5 exercise types (`cards`, `shortInput`, `listeningExercise`, `options`, `chips`)
- `theme/` — design tokens only (colors, spacing scale, typography); import from here instead of hard-coding values
- `services/` — business logic (courseLoader, answerValidator, syncService); each file is annotated with its implementation ticket (e.g. BOOT-04, EX-02)
- `utils/normalize.ts` — text normalization for answer matching (trim + lowercase + NFC); mirrors the Python backend logic
- `hooks/useProgress.ts` — progress tracking hook (placeholder)

**Data flow:** JSON course files (to live in `assets/courses/`) → `courseLoader.ts` → WatermelonDB local DB → screens. Answer validation goes through `answerValidator.ts` → `normalize.ts`. No network dependency in v1; `syncService.ts` is a framework stub for future cloud sync.

**Path aliases** (configured in `tsconfig.json`): `@/*` → `src/*`, plus explicit aliases for `@components`, `@screens`, `@services`, `@hooks`, `@utils`, `@types`, `@theme`. Use these instead of relative imports.

**Prettier config:** double quotes, semicolons, trailing commas (es5), 100-char line width, 2-space indent.
