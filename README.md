# Yehuti — The Black Archive
## African & Black Diasporal Research Library

Live at: https://the-black-archive.vercel.app

A decolonial research platform centring indigenous African scholarship, oral traditions, and primary cultural sources. Covers 20 research topics across cosmology, history, philosophy, and diaspora connections.

## Tech Stack

- **React 18 + Vite 5** — single-file app in `src/App.jsx`
- **Deployed on Vercel** (free tier)
- **API route** at `api/ai/route.js` — multi-provider AI proxy (Anthropic, OpenAI, Gemini, Mistral)
- **All data in browser localStorage** — no backend, no database
- **Scraping sources:** Internet Archive, Open Library, Wikimedia Commons, Europeana, Wikipedia, Gallica (BnF)

## Quick Start

```bash
npm install
npm run dev        # starts at http://localhost:5173
npm run build      # production build to dist/
```

## Project Structure

```
├── src/
│   ├── App.jsx          # Entire app — UI, scraping, AI, all tabs
│   └── main.jsx         # React entry point
├── api/
│   └── ai/
│       └── route.js     # Vercel serverless AI proxy
├── index.html           # HTML shell
├── vite.config.js       # Vite config
├── vercel.json          # Vercel deploy config
├── netlify.toml         # Netlify deploy config
└── package.json
```

## Deploy

### Vercel (recommended)
Connect GitHub repo to Vercel — auto-deploys on push. Set environment variables:
- `ANTHROPIC_API_KEY`
- `OPENAI_API_KEY` (optional)
- `GEMINI_API_KEY` (optional)
- `MISTRAL_API_KEY` (optional)

### Netlify
Drag `dist/` folder after `npm run build`, or connect repo.

## Environment Variables

Create `.env.local` for local development:
```
ANTHROPIC_API_KEY=sk-ant-...
```

For production, set these in your hosting dashboard.

## Features

- **9 tabs:** Home (universal search), Deep Dive (AI overviews), Books, Videos, Images, Links, Maps, Authors, Notes
- **Scraping engine** — populates content from 6 public sources across all 20 topics
- **Yehuti Assistant** — conversational AI that knows your saved archive
- **AI Settings** — swap providers and models
- **Dark/light themes** — Ndebele beadwork-inspired colour palette
- **Benin mask logo** — hand-coded SVG of the Queen Mother Idia ivory mask
- **Book reader** — inline Internet Archive embed
- **Map viewer** — fullscreen with historical context
- **8 scholar profiles** — Diop, Clarke, Ani, Van Sertima, Blyden, Fanon, Karenga, Obenga

## Roadmap

- [ ] User-provided API keys in Settings
- [ ] IndexedDB migration for larger storage
- [ ] African Artifact Globe (3D repatriation map)
- [ ] Expand scraping to Timbuktu manuscripts, Ethiopian Archives, DPLA
- [ ] More scholar profiles and curated content

---

Built with React + Vite
Powered by Anthropic Claude, Internet Archive, Open Library, Wikipedia, Europeana
