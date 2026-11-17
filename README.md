# ThreatLens

Real-time cybersecurity news with **plain-English explanations** and **protection tips** for every story. 100% free — no API keys needed.

## What's Different from CyberBrief

ThreatLens builds on CyberBrief and adds two features to every news card:

- **What This Means (Plain English)** — a non-technical explanation of each threat so anyone can understand the risk
- **How to Protect Yourself** — actionable prevention tips from the viewer's perspective

Everything runs on RSS feeds with a keyword-based threat classification system. No paid AI APIs.

## Features

- 24 feeds scanned in real time, including mainstream outlets via Google News
- 12 threat type categories with pre-written explanations
- Expandable insight panels on every news card
- CVE stories in their own column (a separate tab on phones)
- Sources tab listing every outlet in the feed, tap one to filter
- Refresh button to pull the latest stories on demand
- Installable PWA (iPhone, Android, Windows)
- Dark app-style design with pastel story cards, search, and saved stories
- Works offline via service worker caching

## Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repo
3. Click **Deploy** — no environment variables needed

That's it. Vercel auto-detects the serverless functions in `api/` and the static files in `public/`.

## Project Structure

```
threatlens/
  api/
    news.js          # News API — RSS + threat type detection
  public/
    index.html       # Frontend PWA
    manifest.json    # PWA manifest
    sw.js            # Service worker
    icon-192.png     # PWA icon
    icon-512.png     # PWA icon
  package.json
  vercel.json
```

## Local Development

```bash
npm install
npx vercel dev
```

Then open `http://localhost:3000`.

## Tech Stack

- Vanilla HTML/CSS/JS (no frameworks)
- Vercel serverless functions (Node.js)
- rss-parser for feed parsing
- Service worker for offline support
