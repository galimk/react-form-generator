# React Form Generator

This repository now uses [Vite](https://vitejs.dev) for local development and builds.

## Getting started

```bash
npm install
```

## Available scripts

- `npm run dev` (or `npm run start`) – starts Vite's development server on port 5173 and serves `index.html`.
- `npm run build` – produces a production build in `dist/` using Vite + Rollup.
- `npm run preview` – serves the contents of `dist/` locally to verify the build output.

The Vite entry point lives in [`index.html`](./index.html) which loads [`src/main.jsx`](./src/main.jsx). That file imports the legacy registry (`src/registry.js`) so the historical `window.initReactComponent` bootstrap continues to work, and it also loads the Less styles that used to be compiled through Gulp.

## Legacy JSX / Babel

Vite is configured with `@vitejs/plugin-react` and a project level [`.babelrc`](./.babelrc) to keep the legacy React 0.14 + CommonJS codebase compiling without edits. The config enables the classic JSX runtime and compiles down to IE11-compatible syntax so existing consumers of the generated bundle still work.

## Notes

- The old Gulp/Browserify pipeline has been removed. Use the scripts listed above for development/builds.
- Output bundles are written to `dist/` which is now ignored by Git.
- When running `npm run dev`, Vite exposes the same globals that `registry.js` has always exported, so downstream apps can continue calling `window.initReactComponent`.
- The historic standalone HTML demos under `src/components/customfields/` and `src/components/shell/` now use the `.legacy.tpl` extension so Vite treats them as templates instead of build entries. Open them manually if you still need to preview the legacy markup outside of Vite.
- The repository no longer includes the Browserify-era `src/components/node_modules/` directory, the nested `package.json`, or the component-specific Gulp build scripts/HTML stubs, keeping Vite as the single source of truth for local builds.
