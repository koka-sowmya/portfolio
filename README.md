# Koka Sowmya — Portfolio

A personal portfolio built with **React 19 + TypeScript**, bundled with **esbuild**. All interface effects (intro, floating dock, comet card, flowing menu, chroma grid, scroll reveals, page transitions) are custom-written with CSS and React. Icons are Lucide (via `react-icons/lu`).

## 1. Install and run

Prerequisites: Node.js 20+ and npm.

```bash
npm install          # install dependencies
npm run dev          # build in watch mode + serve at http://localhost:4173
npm run build        # production build into dist/
npm run preview      # serve dist/ with SPA fallback at http://localhost:4173
npm run typecheck    # TypeScript check
```

### Deploy
Upload the `dist/` folder (after `npm run build`) to any static host. Direct URLs and refresh need a fallback to `index.html`, already configured for:
- **Netlify / Cloudflare Pages:** `public/_redirects`
- **Vercel:** `vercel.json`
- **Other hosts:** rewrite every unknown path to `/index.html` (status 200).

## 2. Structure

```
index.html                  page shell + SEO / Open Graph defaults
scripts/build.mjs           esbuild build (also auto-detects your profile photo)
scripts/serve.mjs           static server with SPA fallback (dev + preview)
public/                     files served as-is: images, certificates, documents, favicon
  images/profile.jpg        <- YOUR PHOTO GOES HERE (see §5)
  images/anchor-diagram.png diagram extracted from Anchor_Overview.pdf
  certificates/             certificate PNG previews + original PDFs
  documents/                research paper PDF, Anchor overview PDF
src/
  main.tsx, App.tsx         entry, route table, intro + dock + footer
  styles/globals.css        ALL styling and theme variables
  lib/router.tsx            tiny History-API router (Link, navigate, usePath)
  lib/icons.tsx             icon registry (Lucide)
  data/                     site.ts, skills.ts, projects.ts, certificates.ts, blogs.ts
  pages/                    one file per page (AnchorProject.tsx = generic project detail)
  components/
    animations/             Intro.tsx (loader + star reveal), Reveal.tsx (scroll reveal)
    navigation/             FloatingDock.tsx
    ui/                     CometCard.tsx, FlowingMenu.tsx, ChromaGrid.tsx
    layout/                 Footer.tsx, PageHeader.tsx
```

### Routes
`/` · `/about` · `/skills` · `/projects` · `/projects/:slug` (e.g. `/projects/anchor`) · `/certificates` · `/blogs` · `/blogs/:slug` (e.g. `/blogs/research-paper`) · `/contact` · anything else → custom 404. Routes are matched in `src/App.tsx` (`Route`).

## 3. Adding content

**Project** — append an object to `projects` in `src/data/projects.ts` (copy the Anchor entry). It appears in the Projects menu and gets its own `/projects/<slug>` page. Add `contribution: '...'` to show a "My contribution" section (hidden until set). Put images in `public/images/`.

**Certificate** — put `name.png` (preview) and `name.pdf` in `public/certificates/`, then add an entry to `src/data/certificates.ts`. Add `date: '...'` only if the certificate shows one.

**Blog / paper** — add an entry to `src/data/blogs.ts` (`slug`, `title`, `summary`, `abstract`, `topics`, `authors`, `affiliation`, `pdf`, `models`). Route `/blogs/<slug>` is created automatically. `models` can be an empty array to hide the results table (adjust `ResearchPaper.tsx` if you want other sections).

**Skill** — add to `src/data/skills.ts` (`icon` must exist in `src/lib/icons.tsx`).

## 4. Customisation

### Fonts (all in `:root` of `src/styles/globals.css`)
Each role has its own variable; change one without touching the others. To use a web font, add its `<link>` to `index.html`, then put the font name first in `--font-serif` / `--font-sans` or in a specific variable.

| Role | Variable | CSS class(es) |
|---|---|---|
| Main hero heading | `--font-hero` | `.hero-title`, `.fm-text` |
| Name typography | `--font-name` | `.loader-name`, `.footer-name` |
| Section headings | `--font-section` | `.section-title` |
| Page headings | `--font-page` | `.page-title`, `.post-title`, `.article-title`, `.contact-mail` |
| Body paragraphs | `--font-body` | `body`, `.body`, `.lead` |
| Subheadings | `--font-subheading` | `.subheading`, `.hero-college-name` |
| Navigation | `--font-nav` | `.dock-tip`, `.footer-links` |
| Buttons / links | `--font-button` | `.btn`, `.more`, `.back` |
| Card titles | `--font-card-title` | `.card-title`, `.cg-title`, `.meta dd`, `.step-n` |
| Card descriptions | `--font-card-desc` | `.card-desc`, `.cg-desc` |
| Footer text | `--font-footer` | `.footer` |
| Captions & labels | `--font-label` | `.label`, `.caption`, `.cg-sub`, `.tag` |

Sizes and weights live on those same classes (e.g. `.hero-title { font-size: clamp(...) }`).

### Colours
`:root` in `globals.css`: `--primary: #C599B6`, `--secondary: #E6B2BA`, `--accent: #FAD0C4`, `--bg: #FFF7F3`. Text colours: `--ink`, `--ink-2`; readable mauve for text/links: `--primary-ink`. Skill card accents are set per skill in `src/data/skills.ts` (`accent`). The intro's background uses `--primary` (`.intro`).

### Photograph
Save your photo as **`public/images/profile.jpg`** (`.jpeg`, `.png` or `.webp` also work), then re-run `npm run build` (or restart `npm run dev`). The build auto-detects it. Until then the card shows a "KS" placeholder (no 404s in the console). Portrait 4:5 works best.

### GitHub / LinkedIn
In `src/data/site.ts` set `socials: { github: 'https://github.com/…', linkedin: 'https://linkedin.com/in/…' }`. They then appear on Contact and in the footer; `null` hides them.

### Contact email, name, college
`src/data/site.ts` → `email`, `name`, `college`. (The footer and Contact page read from it.)

### Animation settings
- Scroll reveals: `--reveal-distance`, `--reveal-duration` (`:root`); per-element stagger via the `delay` prop on `<Reveal>`.
- Page transition: `--page-duration`, keyframes `pageIn`.
- Intro: `Intro.tsx` → `dur` (expansion ms), `INNER` (star point sharpness), the `900` minimum loader time, and `.loader-*` CSS.
- Hero transition: `.hero { height: 270vh }` (scroll length), `27vw` in `.hero-name` (how far the name travels).
- Dock: `FloatingDock.tsx` → `BASE`, `MAX`, `RANGE` (magnification).
- Reduced motion: `prefers-reduced-motion` skips the intro, disables reveals/marquee, and shows the hero statically.

## 5. Notes
- The intro plays on every page load/refresh, not on in-app navigation.
- Third-party credits: React (MIT), Lucide icons (ISC) via react-icons (MIT), esbuild (MIT). No third-party UI component code is bundled; the dock, card, menu, grid and intro are original implementations.
- Content comes only from the supplied documents (Anchor overview, two Girls Who Code certificates, research paper). The certificates show no dates or IDs, and the paper states no journal or publication status, so none are shown. The Anchor "family voice guidance" feature is marked **Planned**.


## Fonts
Display: Instrument Serif (`@fontsource/instrument-serif`); body: Geist. Change `--font-serif` / `--font-sans` (or any per-role `--font-*`) in `src/styles/globals.css`.
