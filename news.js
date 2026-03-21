import Parser from 'rss-parser';

const parser = new Parser({
  timeout: 8000,
  headers: { 'User-Agent': 'CyberBrief/3.0' },
});

// ═══════════ FREE CYBERSECURITY RSS FEEDS ═══════════
const FEEDS = [
  // Threats & Malware
  { url: 'https://feeds.feedburner.com/TheHackersNews', source: 'The Hacker News', category: 'threats', priority: 'high' },
  { url: 'https://www.bleepingcomputer.com/feed/', source: 'BleepingComputer', category: 'threats', priority: 'high' },
  { url: 'https://krebsonsecurity.com/feed/', source: 'Krebs on Security', category: 'breaches', priority: 'high' },
  { url: 'https://www.darkreading.com/rss.xml', source: 'Dark Reading', category: 'threats', priority: 'medium' },
  { url: 'https://threatpost.com/feed/', source: 'Threatpost', category: 'threats', priority: 'medium' },

  // Vulnerabilities
  { url: 'https://cvefeed.io/rssfeed/latest.xml', source: 'CVE Feed', category: 'vulnerabilities', priority: 'high' },
  { url: 'https://www.cisa.gov/news.xml', source: 'CISA', category: 'vulnerabilities', priority: 'critical' },

  // Cloud & AI
  { url: 'https://cloudsecurityalliance.org/blog/feed', source: 'Cloud Security Alliance', category: 'cloud', priority: 'medium' },

  // Policy & General
  { url: 'https://www.schneier.com/feed/atom/', source: 'Schneier on Security', category: 'policy', priority: 'medium' },
  { url: 'https://www.securityweek.com/feed', source: 'SecurityWeek', category: 'threats', priority: 'medium' },
  { url: 'https://nakedsecurity.sophos.com/feed/', source: 'Naked Security', category: 'threats', priority: 'medium' },
  { url: 'https://www.infosecurity-magazine.com/rss/news/', source: 'Infosecurity Magazine', category: 'policy', priority: 'medium' },
  { url: 'https://portswigger.net/daily-swig/rss', source: 'The Daily Swig', category: 'vulnerabilities', priority: 'medium' },
  { url: 'https://blog.talosintelligence.com/feeds/posts/default?alt=rss', source: 'Cisco Talos', category: 'threats', priority: 'high' },
  { url: 'https://securelist.com/feed/', source: 'Securelist (Kaspersky)', category: 'threats', priority: 'high' },
  { url: 'https://www.recordedfuture.com/feed', source: 'Recorded Future', category: 'threats', priority: 'medium' },
];

// ═══════════ SMART CATEGORIZATION ═══════════
const CATEGORY_KEYWORDS = {
  vulnerabilities: ['cve', 'vulnerability', 'patch', 'exploit', 'zero-day', 'zero day', 'rce', 'xss', 'sql injection', 'buffer overflow', 'advisory', 'update fixes', 'security update', 'critical flaw'],
  breaches: ['breach', 'leak', 'exposed', 'stolen', 'hack', 'compromised', 'data dump', 'ransomware', 'ransom', 'extortion', 'lockbit', 'blackcat', 'alphv', 'clop', 'records exposed'],
  cloud: ['aws', 'azure', 'gcp', 'cloud', 'kubernetes', 's3 bucket', 'container', 'serverless', 'iam', 'saas', 'cloud security', 'misconfiguration'],
  ai: ['ai ', 'artificial intelligence', 'llm', 'chatgpt', 'machine learning', 'deepfake', 'prompt injection', 'generative ai', 'copilot', 'model security', 'ai security'],
  policy: ['regulation', 'compliance', 'gdpr', 'policy', 'legislation', 'executive order', 'nist', 'congress', 'sec ', 'ftc', 'government', 'law enforcement', 'sanctions', 'ban'],
  threats: ['malware', 'phishing', 'apt', 'botnet', 'trojan', 'campaign', 'threat actor', 'attack', 'backdoor', 'spyware', 'state-sponsored'],
};

const PRIORITY_KEYWORDS = {
  critical: ['critical', 'emergency', 'actively exploited', 'zero-day', 'zero day', 'nation-state', 'cisa kev', 'mass exploitation', 'cvss 9', 'cvss 10'],
  high: ['high severity', 'major breach', 'ransomware', 'million records', 'billion', 'apt', 'state-sponsored', 'widespread'],
};

function categorize(title, description, defaultCategory) {
  const text = `${title} ${description}`.toLowerCase();
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(kw => text.includes(kw))) return cat;
  }
  return defaultCategory;
}

function prioritize(title, description, defaultPriority) {
  const text = `${title} ${description}`.toLowerCase();
  for (const [pri, keywords] of Object.entries(PRIORITY_KEYWORDS)) {
    if (keywords.some(kw => text.includes(kw))) return pri;
  }
  return defaultPriority;
}

function cleanHTML(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function truncate(text, maxLen = 200) {
  if (!text || text.length <= maxLen) return text;
  return text.substring(0, maxLen).replace(/\s+\S*$/, '') + '…';
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600'); // 30min edge cache
  if (req.method === 'OPTIONS') return res.status(200).end();

  const now = Date.now();
  const cutoff = now - 72 * 60 * 60 * 1000; // Last 72 hours

  try {
    // Fetch all feeds in parallel
    const results = await Promise.allSettled(
      FEEDS.map(async (feed) => {
        try {
          const parsed = await parser.parseURL(feed.url);
          return (parsed.items || []).slice(0, 8).map(item => ({
            title: cleanHTML(item.title) || 'Untitled',
            summary: truncate(cleanHTML(item.contentSnippet || item.content || item.description || '')),
            url: item.link || 'N/A',
            source: feed.source,
            pubDate: item.pubDate || item.isoDate || null,
            _defaultCat: feed.category,
            _defaultPri: feed.priority,
          }));
        } catch (e) {
          console.warn(`Feed failed: ${feed.source} — ${e.message}`);
          return [];
        }
      })
    );

    // Flatten and process
    let allItems = results
      .filter(r => r.status === 'fulfilled')
      .flatMap(r => r.value);

    // Filter to recent items
    allItems = allItems.filter(item => {
      if (!item.pubDate) return true; // keep items without dates
      const d = new Date(item.pubDate).getTime();
      return d > cutoff;
    });

    // Categorize and prioritize
    allItems = allItems.map(item => ({
      title: item.title,
      summary: item.summary,
      url: item.url,
      source: item.source,
      category: categorize(item.title, item.summary, item._defaultCat),
      priority: prioritize(item.title, item.summary, item._defaultPri),
      pubDate: item.pubDate,
    }));

    // Sort: critical first, then high, then by date
    const priOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    allItems.sort((a, b) => {
      const pDiff = (priOrder[a.priority] || 3) - (priOrder[b.priority] || 3);
      if (pDiff !== 0) return pDiff;
      const dA = a.pubDate ? new Date(a.pubDate).getTime() : 0;
      const dB = b.pubDate ? new Date(b.pubDate).getTime() : 0;
      return dB - dA;
    });

    // Deduplicate by similar titles
    const seen = new Set();
    allItems = allItems.filter(item => {
      const key = item.title.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 50);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    // Cap at 40 items
    allItems = allItems.slice(0, 40);

    return res.status(200).json({
      items: allItems,
      fetched_at: new Date().toISOString(),
      count: allItems.length,
      sources: [...new Set(allItems.map(i => i.source))].length,
    });

  } catch (err) {
    console.error('News handler error:', err);
    return res.status(500).json({ error: err.message });
  }
}
