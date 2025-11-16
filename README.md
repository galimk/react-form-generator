# Custom Fields Wizard (React 19 + TypeScript)

This repository now hosts a modern Vite application that reimplements the legacy Custom Fields Wizard with React 19, TypeScript, and a Context-based state model.

- `src/` contains the new implementation.
- `legacy/` preserves the historical Backbone/React hybrid source code for reference.

## Getting started

```bash
npm install
npm run dev
```

The app uses plain React Context for sharing the template collection between the builder column and the live preview. Drag-and-drop ordering is handled by `@hello-pangea/dnd`, and validation logic lives under `src/models`.

> **Note:** If installing dependencies fails in your environment, ensure you have access to the public npm registry or configure your proxy credentials accordingly.
