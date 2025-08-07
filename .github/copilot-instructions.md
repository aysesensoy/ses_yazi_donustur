# Copilot Instructions for This Codebase

## Overview
- This project is a React single-page application bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
- Source code is located in the `src/` directory. Static assets and the main HTML template are in `public/`.
- The entry point is `src/index.js`, which renders the `App` component from `src/App.js`.

## Key Workflows
- **Development:**
  - Start the app locally: `npm start` (runs on http://localhost:3000)
  - Hot reloading is enabled; changes in `src/` will reload the browser.
- **Testing:**
  - Run tests: `npm test` (uses Jest, test files end with `.test.js`)
- **Build:**
  - Production build: `npm run build` (outputs to `build/`)
- **Eject:**
  - `npm run eject` exposes all configuration files (irreversible)

## Project Structure & Patterns
- **Component Structure:**
  - Main app logic is in `src/App.js`.
  - Styles are in `src/App.css` and `src/index.css`.
  - Entry point is `src/index.js`.
- **Testing:**
  - Tests are colocated with source files (e.g., `App.test.js`).
- **No custom configuration** is present by default; all config is managed by Create React App unless ejected.

## Conventions
- Use functional React components and hooks.
- Place new components in `src/`.
- Static assets (images, icons) go in `public/`.
- Do not modify files in `build/` (auto-generated).

## External References
- For advanced configuration, refer to the [Create React App docs](https://facebook.github.io/create-react-app/docs/advanced-configuration).

## Example: Adding a Component
1. Create `src/MyComponent.js`:
   ```js
   import React from 'react';
   export default function MyComponent() {
     return <div>Hello!</div>;
   }
   ```
2. Import and use in `App.js`:
   ```js
   import MyComponent from './MyComponent';
   // ...
   <MyComponent />
   ```

---
If you update project structure or add custom scripts/config, update this file to help future AI agents.
