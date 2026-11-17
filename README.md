# ThreatLens

Security news for people who are not security experts. Every story comes with a plain-English explanation, steps to protect yourself, a check on whether it mentions something you use, and a ready-made alert you can forward to family in their language.

100% free to run: RSS feeds only, no API keys, no accounts, no tracking.

## What makes it different

- **Does this affect me?** Pick the phones, apps and services you use (or type your own). Stories that mention them get a "May affect you" badge and collect in the For You tab. The list is stored in the browser on your device and is never sent to a server.
- **Family alert.** "Tell family" on any story builds a short, plain-language warning in English, Hindi, Gujarati or Spanish, ready to send on WhatsApp, share, or copy. The headline stays in English; the explanation and tips are pre-written translations.
- **What this means / How to protect yourself.** Every story is matched to one of 12 threat types, each with a pre-written explanation and prevention tips.

## Other features

- 24 feeds scanned in real time, including mainstream outlets via Google News
- CVE stories in their own column (a separate tab on phones)
- Sources tab listing every outlet in the feed; tap one to filter
- Search, saved stories, share, and a refresh button
- Installable PWA (iPhone, Android, Windows) with offline fallback

## How the matching works

`public/data.js` holds a catalog of about 125 products in 14 groups. Each has keywords that are matched as whole words against a story's headline and summary. Brand names that are also ordinary words (Signal, Zoom, Chase) are matched with exact capitalisation to cut down false matches. Matching is by name only, so a flagged story is a prompt to check, not a diagnosis.

To add a product, add an entry to `groups` in `public/data.js`. To add a language, add its code and name to `langs` and a matching block under `alerts`.

The Hindi, Gujarati and Spanish alert text should be reviewed by a fluent speaker before you rely on it.

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repo
3. Click **Deploy** — no environment variables needed

Vercel serves the serverless function in `api/` and the static files in `public/`.

## Project structure

```
threatlens/
  api/
    news.js          # News API: RSS feeds, threat type detection, CVE split
  public/
    index.html       # The app (HTML, CSS and JS in one file)
    data.js          # Product catalog and family alert translations
    manifest.json    # PWA manifest
    sw.js            # Service worker
    icon-192.png     # PWA icon
    icon-512.png     # PWA icon
  package.json
  vercel.json
```

## Local development

```bash
npm install
npx vercel dev
```

Then open `http://localhost:3000`.

## Tech stack

- Vanilla HTML/CSS/JS (no frameworks)
- Vercel serverless function (Node.js)
- rss-parser for feed parsing
- Service worker for offline support
