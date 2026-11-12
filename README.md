# Giridharan Veeran — Portfolio Redesign

A responsive Next.js + TypeScript portfolio, redesigned around engineering work, Java solution architecture, experience and upcoming technical writing.

## Run locally

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
```

## What's changed

- Editorial dark visual direction with lime/teal accent, improved typography and responsive mobile navigation.
- New hero with existing profile photo, current focus and social links.
- Experience timeline reflecting Publicis Sapient (current), Virtusa and Tech Mahindra, based on the supplied CV.
- Engineering project cards clearly marked as **in development** or **planned**, rather than implying completed public projects.
- Grouped engineering capabilities, learning-series preview and clear contact CTA.
- Updated page metadata, semantic landmarks and accessibility improvements.

## Editing content

Most copy lives in `src/app/components/Portfolio.tsx` at the top in `experience`, `expertise`, `projects` and `articles` arrays. Visual styles are in `src/app/globals.css`.

## Before publishing

1. Verify titles, dates, project claims and external profile links.
2. Add published article URLs when the blog is implemented; the current writing cards are **coming soon** previews, not live articles.
3. Test the production build with the installed dependencies and deploy using your existing hosting workflow.
4. Schedule a separately tested framework/dependency upgrade; the current Next.js version was preserved to minimise redesign risk.
