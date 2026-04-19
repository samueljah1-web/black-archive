# Yehuti — The Black Archive
## African & Black Diasporal Research Library

---

## WHAT YOU HAVE

Two folders:
- `black-archive-final/`        → Web app (runs in any browser, deployable online for free)
- `black-archive-final-electron/` → Desktop app (runs as a native window on Mac/Windows/Linux)

---

## STEP 1 — INSTALL NODE.JS (one time only, free)

Node.js is the engine that runs both apps. You only install it once.

1. Go to: https://nodejs.org
2. Download the **LTS** version (the one that says "Recommended for most users")
3. Run the installer — click Next through everything
4. When done, open a Terminal (Mac) or Command Prompt (Windows) and type:
   ```
   node --version
   ```
   You should see something like `v20.x.x` — that means it worked.

---

## STEP 2A — RUN THE WEB APP LOCALLY

This runs The Black Archive in your browser at http://localhost:3000

```bash
# 1. Open Terminal / Command Prompt
# 2. Navigate to the web app folder:
cd black-archive-final

# 3. Install dependencies (only needed once):
npm install

# 4. Start the app:
npm run dev
```

Your browser will open automatically at http://localhost:3000
Every time you want to use it, just run `npm run dev` from that folder.

---

## STEP 2B — RUN THE DESKTOP APP

This opens The Black Archive as its own native window (like Spotify or Slack).

```bash
# 1. Open Terminal / Command Prompt
# 2. Navigate to the desktop app folder:
cd black-archive-final-electron

# 3. Install dependencies (only needed once):
npm install

# 4. Run in development mode:
npm run dev
```

The app will open in its own window. Notes, catalogue, and saved items
persist between sessions using your browser's local storage.

### To build a permanent installable app (.dmg / .exe / .AppImage):
```bash
npm run build:electron
```
Find your installer in the `dist-app/` folder.
- Mac → `The Black Archive.dmg`
- Windows → `The Black Archive Setup.exe`
- Linux → `The Black Archive.AppImage`

---

## STEP 3 — DEPLOY ONLINE FOR FREE (optional but recommended)

Putting it online means you can access it from any device — phone, tablet, another computer.

### Option A: Vercel (easiest, recommended)

1. Create a free account at https://vercel.com (use your GitHub or Google account)
2. Install Vercel CLI:
   ```
   npm install -g vercel
   ```
3. Inside the `black-archive-final/` folder, run:
   ```
   vercel
   ```
4. Follow the prompts — accept all defaults
5. You get a live URL like: `https://the-black-archive.vercel.app`

To update after any changes: run `vercel` again in the folder.

### Option B: Netlify (also free, also easy)

1. Create a free account at https://netlify.com
2. Drag and drop the `black-archive-final/` folder onto the Netlify dashboard
   (after running `npm run build` first)
   OR
3. Connect your GitHub repo and it auto-deploys every time you push

### Option C: GitHub Pages (free, requires GitHub account)

1. Create a free account at https://github.com
2. Create a new repository called `black-archive`
3. Push your `black-archive-final/` folder to it
4. In repo Settings → Pages → set Source to GitHub Actions
5. Add this file as `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy
   on:
     push:
       branches: [main]
   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: 20
         - run: npm install
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

---

## STEP 4 — USE ON MOBILE (no install needed)

Once your app is deployed online (Step 3), open the URL on your phone.

### Add to Home Screen (makes it feel like a real app):
- **iPhone (Safari):** Open the URL → tap Share icon → "Add to Home Screen"
- **Android (Chrome):** Open the URL → tap ⋮ menu → "Add to Home Screen"

It will appear on your home screen with an icon and open full-screen like a native app.

---

## TROUBLESHOOTING

**"npm: command not found"**
→ Node.js isn't installed yet. Go back to Step 1.

**"EACCES permission denied"**
→ On Mac, prefix commands with `sudo`:
```
sudo npm install
```

**"Port 3000 is already in use"**
→ Change port in vite.config.js from 3000 to 3001, or kill the process using that port.

**App opens but search/deep dive doesn't work**
→ The AI features use the Anthropic API which works within Claude.ai's artifact environment.
   For standalone deployment, you'll need an Anthropic API key:
   1. Get a free key at https://console.anthropic.com
   2. Create a file called `.env` in the project root:
      ```
      VITE_ANTHROPIC_KEY=sk-ant-your-key-here
      ```
   3. In App.jsx, find all fetch calls to anthropic.com and add the header:
      ```
      "x-api-key": import.meta.env.VITE_ANTHROPIC_KEY
      ```
   Note: Keep your API key private. Never commit it to GitHub.

---

## QUICK REFERENCE

| Task | Command |
|------|---------|
| Start web app locally | `cd black-archive-final && npm run dev` |
| Start desktop app | `cd black-archive-final-electron && npm run dev` |
| Build desktop installer | `cd black-archive-final-electron && npm run build:electron` |
| Deploy to Vercel | `cd black-archive-final && vercel` |
| Build for web hosting | `cd black-archive-final && npm run build` |

---

## FOLDER STRUCTURE

```
black-archive-final/
├── src/
│   ├── App.jsx          ← The entire library UI
│   └── main.jsx         ← React entry point
├── index.html           ← HTML shell
├── vite.config.js       ← Build config
├── package.json         ← Dependencies
├── netlify.toml         ← Netlify deploy config
└── vercel.json          ← Vercel deploy config

black-archive-final-electron/
├── electron/
│   └── main.js          ← Desktop window config
├── src/
│   ├── App.jsx          ← Same library UI
│   └── main.jsx         ← React entry point
├── index.html
├── vite.config.js
└── package.json         ← Includes Electron + builder
```

---

Built with React + Vite + Electron
Powered by Anthropic Claude API + Open Library + Internet Archive + Wikipedia
