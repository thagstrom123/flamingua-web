# Flamingua Website

Promotional landing page for [Flamingua](https://apps.apple.com/us/app/flamingua-a1-french-german/id6759222904) — a curriculum-based A1 language learning app for German and French.

**Live:** https://thagstrom123.github.io/flamingua-web/

## Commands

```bash
npm install        # Install dependencies
npm run dev        # Local dev server
npm run build      # Production build
npm run deploy     # Build + deploy to GitHub Pages
```

## Custom Domain (flamingua.com)

When GoDaddy access is restored:

1. In GoDaddy DNS, add a CNAME record: `flamingua.com` → `thagstrom123.github.io`
2. In this repo's GitHub Settings > Pages, set custom domain to `flamingua.com`
3. Update `vite.config.ts`: change `base` from `'/flamingua-web/'` to `'/'`
4. Update OG image paths in `index.html` from `/flamingua-web/` to `/`
5. Redeploy: `npm run deploy`

## Tech Stack

- React + Vite + TypeScript
- CSS Modules
- GitHub Pages via `gh-pages`
- No router, no UI library, no icon library
