# 🛰 CyberBrief v3 — 100% Free Cybersecurity Dashboard

Daily cybersecurity news + student conference opportunities. Completely free — no API key, no paid services. Pulls from 15+ RSS feeds.

## Features

### 🛡 Daily Intel
Aggregates from: The Hacker News, BleepingComputer, Krebs on Security, Dark Reading, CISA, SecurityWeek, Cisco Talos, Securelist, Naked Security, Infosecurity Magazine, The Daily Swig, CVE Feed, Cloud Security Alliance, Schneier on Security, Recorded Future.

- Smart auto-categorization (Threats, Vulns, Breaches, Cloud, AI, Policy)
- Priority detection (Critical, High, Medium, Low)
- Deduplication across sources
- 30-min Vercel edge caching

### 🎓 Conferences & Opportunities
- Major conference listings (DEF CON, Black Hat, RSA, BSides, ShmooCon, etc.)
- **Student scholarships** (WiCyS, ISC², Black Hat, SANS)
- **Volunteer programs** (DEF CON Goons, BSides, GrrCON)
- Student competitions (CCDC, NCL)
- CFP deadlines
- RSS feed scanning for new announcements

## Deploy (Free on Vercel)

```bash
git init && git add . && git commit -m "init"
git remote add origin https://github.com/YOU/cyberbrief.git
git push -u origin main
```

1. Go to vercel.com → Import repo → Deploy
2. **No environment variables needed!**
3. Open URL on iPhone Safari → Share → Add to Home Screen

## Cost: $0

Zero. Free Vercel hobby tier + free RSS feeds. No API keys.

## Project Structure
```
cyberbrief/
├── api/
│   ├── news.js            # Fetches 15+ cybersec RSS feeds
│   └── conferences.js     # Conference data + RSS scanning
├── public/
│   ├── index.html
│   ├── manifest.json
│   ├── sw.js
│   └── icon-*.png
├── vercel.json
└── package.json
```
