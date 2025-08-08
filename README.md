# Mechanical Design Portfolio (Vite + React + Tailwind)

This repo is a ready-to-deploy portfolio for a mechanical design engineer. It includes a responsive gallery, video placeholders, case-study template, and resume/contact sections.

## Local Development
```bash
npm install
npm run dev
```

## Deploy to Vercel (recommended)
1. Push this folder to a new GitHub repo.
2. Go to https://vercel.com/import and select the repo.
3. Framework preset: **Vite** (detected automatically).
4. Build command: `npm run build` (default).
5. Output directory: `dist` (default).
6. Click **Deploy**.

## GitHub Pages (alternative)
```bash
npm install
npm run build
# serve /dist on a static host or configure GH Pages with a gh-pages action
```

## Add your media
Put images/videos under `public/assets/…` and update the `PROJECTS` array in `src/App.jsx`.
