# [Work in progress] - Yelp Restaurant Review Dashboard

## Setup

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

1. In `vite.config.js`, change `base: '/'` to `base: '/your-repo-name/'`
2. In `package.json`, the `deploy` script uses `gh-pages`. Run:

```bash
npm run build
npm run deploy
```

3. In your GitHub repo settings → Pages → set source to the `gh-pages` branch.

## Notes
- The dashboard calls `api.anthropic.com` directly from the browser for AI Insights.
  For production, proxy this through a serverless function to protect your API key.
- A/B testing and tour visit state are stored in `localStorage`.
- Google Analytics: add your GA4 `gtag` snippet to `index.html` to activate tracking.
