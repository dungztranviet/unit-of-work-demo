# angular-unit-of-work-demo

[![live demo](https://img.shields.io/badge/demo-live-brightgreen)](https://dungztranviet.github.io/unit-of-work-demo/)
[![angular-unit-of-work](https://img.shields.io/npm/v/angular-unit-of-work.svg?label=angular-unit-of-work)](https://www.npmjs.com/package/angular-unit-of-work)

A small standalone, zoneless Angular app demoing [angular-unit-of-work](https://github.com/dungztranviet/angular-unit-of-work) — five scenarios, each editing a real `WritableSignal` directly through the UI (no `FormGroup`, no Reactive Forms) with a live `changes()` / `hasChanges()` panel underneath.

| Route | Scenario |
|---|---|
| `/profile` | Plain object — flat `Profile`, no arrays, no nesting |
| `/order` | Nested object + array, matched by `id` (the default `arrayStrategy`) |
| `/tags` | A real `Set<string>` and `Map<string, string>` — added/removed/modified without JSON tricks |
| `/reorder` | The **same list, two trackers** — `byId` vs `sequence` — to see why `arrayStrategy` changes the diff |
| `/custom-compare` | A class instance (`Money`) compared by reference vs. by a custom `isEqual` |

## Running it

`angular-unit-of-work` is consumed as a normal npm dependency:

```bash
npm install
npm start
```

### Developing against a local copy of the package

If you're changing `angular-unit-of-work` itself and want this app to pick up unpublished edits,
link it instead of installing from the registry:

```bash
cd ../angular-unit-of-work
npm run build
npm link

cd ../angular-unit-of-work-demo
npm link angular-unit-of-work
npm start
```

**If you change the linked package and don't see the update:** Angular's dev server (Vite-based)
pre-bundles dependencies on startup, including linked ones — a rebuild in the package directory
alone doesn't invalidate that cache. Stop the server, delete `.angular/cache`, and restart:

```bash
rm -rf .angular/cache
npm start
```

## Why this exists

Unit tests for the package import from `src/*.ts` directly and never exercise the actual published
package shape. This app was built specifically to catch what unit tests can't: real Angular
change detection, real DOM events, real `@angular/core` module resolution through `npm link`. It
already caught one real bug — see the package's git history around `clonePreservingInstances` for
what `structuredClone` was silently doing to class instances before this app existed.
