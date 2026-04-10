# 🧰 DevToolbox

Live URL - https://vipdevtoolbox.netlify.app/

> 22 developer utilities in one fast, clean URL. No ads. No login. No friction.

![DevToolbox](https://img.shields.io/badge/tools-22-a3e635?style=flat-square)
![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646cff?style=flat-square&logo=vite)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

## Tools included

| Category | Tools |
|----------|-------|
| **Data** | JSON Formatter, Timestamp Converter, JSON→CSV, CSV→JSON, Base Converter |
| **Encoding** | Base64, URL Encoder, HTML Entities |
| **Security** | JWT Decoder, Hash Generator (MD5/SHA1/SHA256/SHA512), Password Generator |
| **Text** | Regex Tester, Markdown Preview, Diff Checker, Case Converter, Word Counter |
| **Generators** | UUID Generator, Lorem Ipsum, QR Generator |
| **Design** | Color Converter (HEX/RGB/HSL), HTML Preview |
| **Misc** | Cron Parser |

## Getting started

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/devtoolbox.git
cd devtoolbox

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Deploy to Vercel (recommended)

### Option 1 — Vercel CLI (fastest)
```bash
npm i -g vercel
vercel
# Follow prompts → get a live URL instantly
```

### Option 2 — GitHub integration
1. Push to GitHub: `git push origin main`
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your GitHub repo
4. Click **Deploy** — done. Every `git push` auto-deploys.

## Deploy to Netlify

### Option 1 — Netlify CLI
```bash
npm run build
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

### Option 2 — Drag & drop
1. Run `npm run build`
2. Drag the `dist/` folder to [app.netlify.com/drop](https://app.netlify.com/drop)

### Option 3 — GitHub integration
1. Push to GitHub
2. Go to [app.netlify.com/start](https://app.netlify.com/start)
3. Connect repo → Build command: `npm run build` → Publish dir: `dist`

## Push to GitHub (fresh repo)

```bash
git init
git add .
git commit -m "feat: initial DevToolbox with 22 tools"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/devtoolbox.git
git push -u origin main
```

## Project structure

```
devtoolbox/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx        # Navigation sidebar
│   │   ├── ToolLayout.jsx     # Tool wrapper with header
│   │   └── HomeScreen.jsx     # Landing / tool grid
│   ├── hooks/
│   │   └── useCopy.js         # Clipboard hook
│   ├── tools/
│   │   ├── index.js           # Tool registry (add new tools here)
│   │   ├── JsonFormatter.jsx
│   │   ├── Base64Tool.jsx
│   │   ├── UrlEncoder.jsx
│   │   ├── JwtDecoder.jsx
│   │   ├── RegexTester.jsx
│   │   ├── UuidGenerator.jsx
│   │   ├── HashGenerator.jsx
│   │   ├── ColorConverter.jsx
│   │   ├── TimestampConverter.jsx
│   │   ├── HtmlEntities.jsx
│   │   ├── MarkdownPreview.jsx
│   │   ├── JsonToCsv.jsx
│   │   ├── CsvToJson.jsx
│   │   ├── BaseConverter.jsx
│   │   ├── LoremIpsum.jsx
│   │   ├── DiffChecker.jsx
│   │   ├── CaseConverter.jsx
│   │   ├── WordCounter.jsx
│   │   ├── QrGenerator.jsx
│   │   ├── PasswordGenerator.jsx
│   │   ├── CronParser.jsx
│   │   └── HtmlPreview.jsx
│   ├── App.jsx                # Root layout + hash routing
│   ├── index.css              # Tailwind + global styles
│   └── main.jsx               # Entry point
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json                # Vercel SPA routing
├── netlify.toml               # Netlify SPA routing
└── package.json
```

## Adding a new tool

1. Create `src/tools/MyTool.jsx`
2. Register it in `src/tools/index.js`:

```js
import MyTool from './MyTool.jsx'

// Add to TOOLS array:
{
  id: 'my-tool',
  name: 'My Tool',
  description: 'What it does',
  icon: '⚡',
  category: 'Data',   // Data | Encoding | Security | Text | Generators | Design
  component: MyTool,
}
```

3. Done — it appears in the sidebar and home grid automatically.

## Tech stack

- **React 18** — UI framework
- **Vite 5** — Build tool, dev server
- **Tailwind CSS 3** — Utility-first styling
- **marked** — Markdown rendering
- **qrcode** — QR code generation
- **crypto-js** — Hashing (MD5, SHA*)
- **lucide-react** — Icons

## License

MIT — free to use, fork, and deploy.
