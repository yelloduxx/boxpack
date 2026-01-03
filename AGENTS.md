# Repository Guidelines

## Project Structure & Module Organization
- This repository is currently empty; add source code and assets under clear top-level directories as they are introduced.
- Recommended layout:
  - `src/` for application/source code.
  - `tests/` for automated tests.
  - `assets/` for static files (images, models, shaders).
  - `docs/` for design notes and decisions.

## Build, Test, and Development Commands
- No build or test tooling is configured yet.
- When adding tooling, document commands here with examples (e.g., `npm run dev`, `npm test`).

## Coding Style & Naming Conventions
- Use 2-space indentation for JSON/YAML and 4-space indentation for code (unless a framework standard says otherwise).
- Prefer `kebab-case` for file names and `PascalCase` for class/type names.
- Add a formatter/linter (e.g., Prettier/ESLint) once the primary language is chosen.

## Testing Guidelines
- No testing framework is configured yet.
- When tests are added, keep files near code (`src/**/__tests__`) or centralized (`tests/`) and name them `*.test.*`.

## Commit & Pull Request Guidelines
- Use concise, imperative commit messages, e.g., `Add initial scene setup`.
- Keep commits focused; avoid mixing refactors with feature changes.
- PRs should include:
  - A short summary of changes.
  - Screenshots or short clips for visual changes (e.g., 3D scenes or UI).
  - Linked issues if applicable.

## Configuration & Secrets
- Do not commit secrets or credentials.
- Use `.env` for local configuration and add `.env.example` when needed.
