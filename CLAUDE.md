# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server
- `npm run build` — type-check (`tsc -b`) then build for production
- `npm run lint` — run Oxlint
- `npm run preview` — preview the production build locally

There is no test suite configured in this project.

## Architecture

This is a small client-only React + TypeScript + Vite habit tracker. All state lives in the browser (`localStorage`); there is no backend or routing.

Data flow: `App` renders `Dashboard`, the only component that calls the `useHabits` hook. `Dashboard` passes habit data and the `addHabit`/`toggleToday`/`deleteHabit` callbacks down to `AddHabitForm` and `HabitList` → `HabitCard`. No other component touches state directly — all mutations go through `useHabits`.

- `src/hooks/useHabits.ts` — single source of truth for the `Habit[]` state. On every change it persists via `src/utils/storage.ts` (`localStorage` key `habit-tracker:habits`), and initializes state by loading from storage.
- `src/types.ts` — the `Habit` model. `completedDates` is a sorted array of unique `"YYYY-MM-DD"` local-date strings (no `Date` objects are stored).
- `src/utils/dateUtils.ts` — all date handling funnels through this module (`getTodayString`, `shiftDateString`, `getLastNDateStrings`). It always works in local time and represents dates as `"YYYY-MM-DD"` strings, never `Date` objects, to avoid timezone bugs. New date logic should reuse these helpers rather than constructing `Date` objects inline.
- `src/utils/streak.ts` — `calculateStreak` computes the current streak by walking backward day-by-day from today (or yesterday, if today isn't yet completed) through `completedDates`.
- Styling is plain CSS (`App.css`, `index.css`), no CSS-in-JS or utility framework.

## Linting

Oxlint config (`.oxlintrc.json`) enables the `react`, `typescript`, and `oxc` plugin rule sets, with `react/rules-of-hooks` as an error.

## Git workflow

Commit and push regularly so there is always a saved version of the project on GitHub (`origin`, branch `master`). After completing a meaningful chunk of work (a feature, fix, or otherwise coherent set of changes), stage the relevant files, commit with a clear, descriptive message, and push — without waiting for the user to ask each time.
