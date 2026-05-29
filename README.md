<h1 align="center">Fulvio Nicolosi — Official Website</h1>

<p align="center">
  <img src="https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
</p>
<p align="center">
  <img src="https://img.shields.io/badge/Cloudflare_Pages-F38020?style=for-the-badge&logo=cloudflarepages&logoColor=white" alt="Cloudflare Pages" />
  <img src="https://img.shields.io/badge/Cloudflare_Workers-F38020?style=for-the-badge&logo=cloudflareworkers&logoColor=white" alt="Cloudflare Workers" />
  <img src="https://img.shields.io/badge/Notion_API-000000?style=for-the-badge&logo=notion&logoColor=white" alt="Notion API" />
  <img src="https://img.shields.io/badge/Web3Forms-3B82F6?style=for-the-badge&logo=maildotru&logoColor=white" alt="Web3Forms" />
</p>

<p align="center">The official website of Italian concert pianist <strong>Fulvio Nicolosi</strong> — a bilingual static site with a live concert agenda managed through Notion.</p>

<p align="center"><strong>Live:</strong> <a href="https://fulvionicolosi.com">fulvionicolosi.com</a></p>

## Preview

**Home**

![Home page](docs/home.jpg)

**Live agenda — powered by Notion**

![Calendar page](docs/calendar.png)

**Gallery**

![Gallery page](docs/gallery.jpg)

## Features

- **Bilingual (IT/EN)** with an in-page language toggle; the choice is persisted in `localStorage`.
- **Live concert agenda** managed in **Notion** as a headless CMS — upcoming and past appointments update without touching the code.
- **Contact form** handled by Web3Forms (no backend to maintain).
- **Image gallery** with WebP delivery for display and full-resolution originals available for download; swipe navigation on mobile.
- **Responsive design**, animated mobile menu, hero imagery, video sections, rotating quotes, and scroll-reveal animations.
- **Press kit** — short and full biographies (IT/EN) as downloadable PDFs.

## Tech stack

| Area | Technology |
|------|------------|
| Markup & styling | HTML5, Tailwind CSS (CDN) |
| Interactions | Vanilla JavaScript (no framework) |
| Hosting | Cloudflare Pages |
| Content / CMS | Notion API |
| API proxy | Cloudflare Workers |
| Contact form | Web3Forms |

## Architecture

Concert data lives in a Notion database. The browser never talks to Notion directly: requests go through a small **Cloudflare Worker** that injects the Notion integration token server-side and returns JSON.

```
Browser ──fetch──▶ Cloudflare Worker ──Bearer token──▶ Notion API
   ▲                                                      │
   └──────────────────── concerts JSON ◀──────────────────┘
```

This keeps the secret token out of the client and out of the repository — only the public Worker URL is shipped to the browser.

## Project structure

```
.
├── index.html          # Home (hero, bio, latest concerts, video, contact)
├── bio.html            # Full biography
├── calendar.html       # Full agenda (upcoming + past)
├── gallery.html        # Photo gallery
├── worker.js           # Cloudflare Worker: Notion API proxy
├── favicon.svg
├── img/
│   ├── img-original/   # Full-resolution images (downloads)
│   └── img-web/        # Optimized WebP for display
└── press-kit/          # Biography PDFs (IT/EN)
```

## Local development

The site is fully static and loads Tailwind via CDN — no build step required.

```bash
# serve the folder with any static server, e.g.
npx serve .
# or simply open index.html in a browser
```

## Deployment

- **Site:** Cloudflare Pages connected to this repository (branch `main`, no build command, output directory `/`).
- **Worker:** deployed separately with a `NOTION_TOKEN` secret; the Notion database is shared with the integration.

## Credits

Design & development — **Marco Sapienza**.
