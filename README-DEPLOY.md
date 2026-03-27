# Deployment Notes — Balkan Project

This document describes how to deploy the project to common hosts (Vercel, Netlify, Render) and the minimum environment configuration required.

## Required environment variables
- `AUTH_SECRET` — string. Production-only secret used to sign session tokens. Must be set in your host environment. The app will throw on startup if missing in production.

## Recommended host: Vercel (easiest)
1. Connect your Git repository to Vercel.
2. Vercel auto-detects Next.js and will run `npm run build` by default.
3. Add `AUTH_SECRET` in Project Settings → Environment Variables (Production).
4. Deploy.

Notes: Vercel supports the Next.js App Router and server functions out of the box.

## Netlify
1. Enable the Next.js plugin on Netlify (Next on Netlify) for full support of Next features.
2. Use the existing `netlify.toml` which runs `npm ci && npm run build` and publishes `.next`.
3. Add `AUTH_SECRET` in Site settings → Build & deploy → Environment.

## Render
1. Create a Web Service on Render.
2. Build command: `npm ci && npm run build`
3. Start command: `npm start`
4. Add `AUTH_SECRET` in the Environment section.

## CI recommendations (GitHub Actions)
- Run `npm ci && npm run build && npm run test` on PRs to ensure code builds and tests pass before merging.

## Package manager
- This repository contains `package-lock.json` (npm). If you prefer `pnpm`, add `pnpm-lock.yaml` and configure CI accordingly. Do not mix lockfile types.

## Quick local steps
```powershell
npm ci
npm run build
npm run test -- --run
```

If you want me to create a GitHub Actions workflow or add a Vercel configuration, tell me and I'll add it.
