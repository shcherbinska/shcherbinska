# Shcherbinska

Personal portfolio website for Olga Shcherbinskaya.

## Deployment

The site is deployed automatically with GitHub Actions.

- Deployment branch: `rollup-version`
- Workflow: `.github/workflows/deploy.yml`
- Build command: `npm run build`
- Published directory: `build/`
- Node.js version in CI: `22`
- Custom domain: `shcherbinska.com`

Every push to `rollup-version` starts the workflow. It installs the dependencies with `npm ci`, builds the site, and publishes the generated `build/` directory to GitHub Pages.

GitHub repository settings required for this setup:

1. `Settings` -> `Pages` -> `Source`: `GitHub Actions`
2. `Settings` -> `Environments` -> `github-pages`: allow deployments from `rollup-version`

The workflow can also be started manually from the `Actions` tab with `Run workflow`.

## Local development

Install dependencies:

```bash
npm ci
```

Build the site once:

```bash
npm run build
```

Start a local server with file watching:

```bash
npm start
```

The local site is served from the generated `build/` directory.

## Project structure

- `src/` - Pug templates, Sass styles, JavaScript, and image assets
- `build/` - generated files used for deployment; ignored by Git
- `gulpfile.js` - build and development tasks
- `CNAME` - custom GitHub Pages domain

Edit files in `src/` and push the changes to `rollup-version`. Do not edit generated files in `build/` as the next build will replace them.

## Dependency notes

The project uses the existing Gulp, Rollup, Sass, Pug, and Swiper toolchain. Dependencies are locked in `package-lock.json`; use `npm ci` for reproducible installs.

Some legacy dependencies and Sass syntax produce deprecation warnings during the build. They do not currently prevent a successful build and should be addressed separately during a planned migration.
