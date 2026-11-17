import Parser from 'rss-parser';

const parser = new Parser({
  timeout: 8000,
  headers: { 'User-Agent': 'ThreatLens/1.0' },
});

// ═══════════ FREE CYBERSECURITY RSS FEEDS ═══════════
const FEEDS = [
  { url: 'https://feeds.feedburner.com/TheHackersNews', source: 'The Hacker News', site: 'https://thehackernews.com', category: 'threats', priority: 'high' },
  { url: 'https://www.bleepingcomputer.com/feed/', source: 'BleepingComputer', category: 'threats', priority: 'high' },
  { url: 'https://krebsonsecurity.com/feed/', source: 'Krebs on Security', category: 'breaches', priority: 'high' },
  { url: 'https://www.darkreading.com/rss.xml', source: 'Dark Reading', category: 'threats', priority: 'medium' },
  { url: 'https://threatpost.com/feed/', source: 'Threatpost', category: 'threats', priority: 'medium' },
  { url: 'https://cvefeed.io/rssfeed/latest.xml', source: 'CVE Feed', category: 'vulnerabilities', priority: 'high' },
  { url: 'https://www.cisa.gov/news.xml', source: 'CISA', category: 'vulnerabilities', priority: 'critical' },
  { url: 'https://cloudsecurityalliance.org/blog/feed', source: 'Cloud Security Alliance', category: 'cloud', priority: 'medium' },
  { url: 'https://www.schneier.com/feed/atom/', source: 'Schneier on Security', category: 'policy', priority: 'medium' },
  { url: 'https://www.securityweek.com/feed', source: 'SecurityWeek', category: 'threats', priority: 'medium' },
  { url: 'https://nakedsecurity.sophos.com/feed/', source: 'Naked Security', category: 'threats', priority: 'medium' },
  { url: 'https://www.infosecurity-magazine.com/rss/news/', source: 'Infosecurity Magazine', category: 'policy', priority: 'medium' },
  { url: 'https://portswigger.net/daily-swig/rss', source: 'The Daily Swig', category: 'vulnerabilities', priority: 'medium' },
  { url: 'https://blog.talosintelligence.com/feeds/posts/default?alt=rss', source: 'Cisco Talos', category: 'threats', priority: 'high' },
  { url: 'https://securelist.com/feed/', source: 'Securelist (Kaspersky)', category: 'threats', priority: 'high' },
  { url: 'https://www.recordedfuture.com/feed', source: 'Recorded Future', category: 'threats', priority: 'medium' },
  // Google News aggregated — pulls mainstream outlets (Yahoo, Fox, CNN, BBC, etc.)
  { url: 'https://news.google.com/rss/search?q=cybersecurity+attack+OR+hack+OR+breach&hl=en-US&gl=US&ceid=US:en', source: 'Google News', category: 'threats', priority: 'medium' },
  { url: 'https://news.google.com/rss/search?q=cybersecurity+AI+threat+OR+deepfake&hl=en-US&gl=US&ceid=US:en', source: 'Google News', category: 'ai', priority: 'medium' },
  { url: 'https://news.google.com/rss/search?q=data+breach+OR+records+exposed+OR+hack&hl=en-US&gl=US&ceid=US:en', source: 'Google News', category: 'breaches', priority: 'medium' },
  { url: 'https://news.google.com/rss/search?q=cybersecurity+outage+OR+infrastructure+attack&hl=en-US&gl=US&ceid=US:en', source: 'Google News', category: 'threats', priority: 'medium' },
  // Additional security news sources
  { url: 'https://www.helpnetsecurity.com/feed/', source: 'Help Net Security', category: 'threats', priority: 'medium' },
  { url: 'https://cyberscoop.com/feed/', source: 'CyberScoop', category: 'policy', priority: 'medium' },
  { url: 'https://www.wired.com/feed/category/security/latest/rss', source: 'WIRED Security', category: 'threats', priority: 'medium' },
  { url: 'https://techcrunch.com/category/security/feed/', source: 'TechCrunch Security', category: 'threats', priority: 'medium' },
];

// ═══════════ THREAT TYPE KNOWLEDGE BASE ═══════════
// Each threat type has a plain-English explanation + actionable prevention tips
const THREAT_KB = {
  ransomware: {
    keywords: ['ransomware', 'ransom', 'encrypt files', 'lockbit', 'blackcat', 'alphv', 'clop', 'conti', 'revil', 'akira', 'rhysida', 'medusa ransomware', 'double extortion', 'ransomware-as-a-service'],
    label: 'Ransomware',
    icon: '🔒',
    explanation: 'Ransomware is malicious software that locks your files or entire computer and demands payment (usually in cryptocurrency) to unlock them. Attackers often steal your data first and threaten to publish it if you don\'t pay — this is called "double extortion."',
    prevention: [
      'Keep regular backups on an external drive or cloud service that isn\'t always connected',
      'Never open email attachments or click links from unknown senders',
      'Keep your operating system and all software updated',
      'Use reputable antivirus software and keep it updated',
      'Enable multi-factor authentication (MFA) on all accounts',
      'If hit: disconnect from internet immediately and contact a cybersecurity professional'
    ]
  },
  phishing: {
    keywords: ['phishing', 'spear phishing', 'social engineering', 'credential theft', 'fake login', 'credential harvesting', 'business email compromise', 'bec', 'impersonation', 'smishing', 'vishing', 'quishing', 'qr code phishing'],
    label: 'Phishing & Social Engineering',
    icon: '🎣',
    explanation: 'Phishing is when attackers send fake emails, texts, or messages that look like they\'re from trusted companies to trick you into giving up passwords, credit card numbers, or personal information. These messages often create urgency to pressure you into acting without thinking.',
    prevention: [
      'Check the sender\'s actual email address — hover over it to see the real address',
      'Never click links in unexpected emails or texts — type the website address yourself',
      'Look for signs: spelling errors, generic greetings, urgent threats',
      'Enable multi-factor authentication so stolen passwords alone can\'t access your accounts',
      'Contact companies directly using numbers from their official website, not from suspicious messages',
      'Be skeptical of QR codes in emails or public places'
    ]
  },
  data_breach: {
    keywords: ['data breach', 'data leak', 'data exposed', 'records stolen', 'records exposed', 'personal data', 'leaked database', 'credentials leaked', 'information stolen', 'breach notification', 'dark web'],
    label: 'Data Breach',
    icon: '💧',
    explanation: 'A data breach means a company had its security broken into and people\'s personal information — names, emails, passwords, credit cards, Social Security numbers — was stolen. This stolen data often ends up for sale on the dark web where criminals buy it for identity theft.',
    prevention: [
      'Use a unique, strong password for every account — a password manager makes this easy',
      'Check if your email was in a breach at haveibeenpwned.com and change those passwords',
      'Enable multi-factor authentication everywhere, especially email and banking',
      'Monitor bank and credit card statements for unauthorized charges',
      'Consider freezing your credit with Equifax, Experian, and TransUnion',
      'Be wary of emails claiming to be from the breached company — scammers exploit breaches to phish'
    ]
  },
  vulnerability: {
    keywords: ['vulnerability', 'cve-', 'zero-day', '0-day', 'exploit', 'rce', 'remote code execution', 'privilege escalation', 'buffer overflow', 'sql injection', 'xss', 'cross-site', 'patch', 'security update', 'security flaw', 'critical flaw', 'actively exploited', 'proof of concept'],
    label: 'Software Vulnerability',
    icon: '🐛',
    explanation: 'A software vulnerability is a flaw in a program, app, or operating system that attackers can exploit to break in, steal data, or take control of your device. Companies release "patches" (updates) to fix them. "Zero-day" means attackers were using the flaw before a fix existed — especially dangerous.',
    prevention: [
      'Turn on automatic updates for your operating system (Windows, macOS, iOS, Android)',
      'Update all apps regularly — especially browsers, email clients, and PDF readers',
      'Install security updates as soon as you see them',
      'Remove apps and software you no longer use',
      'Use a modern, updated web browser (Chrome, Firefox, Edge)',
      'For businesses: implement patch management and prioritize critical vulnerabilities'
    ]
  },
  malware: {
    keywords: ['malware', 'trojan', 'spyware', 'keylogger', 'botnet', 'worm', 'rootkit', 'backdoor', 'infostealer', 'stealer', 'loader malware', 'dropper', 'remote access trojan', 'rat', 'cryptominer', 'cryptojacking'],
    label: 'Malware',
    icon: '🦠',
    explanation: 'Malware ("malicious software") is any program designed to harm you or your device. This includes viruses, trojans (look legitimate but are harmful), spyware (secretly watches you), and keyloggers (records everything you type). Malware can steal data, spy on you, or mine cryptocurrency using your device.',
    prevention: [
      'Only download software from official sources — app stores or developer websites',
      'Don\'t click "Download" on random websites or pop-ups claiming your computer is infected',
      'Use reputable antivirus/anti-malware software',
      'Be careful with USB drives from unknown sources',
      'Don\'t pirate software or media — cracked programs are a top malware delivery method',
      'If your device is suddenly slow or behaving oddly, run a full malware scan'
    ]
  },
  cloud_security: {
    keywords: ['cloud security', 'aws', 'azure', 'gcp', 'misconfiguration', 'exposed bucket', 's3 bucket', 'cloud breach', 'saas', 'cloud vulnerability', 'api security', 'api key', 'exposed api', 'serverless', 'container', 'kubernetes', 'docker'],
    label: 'Cloud Security',
    icon: '☁️',
    explanation: 'Cloud security issues happen when online services and storage (Google Drive, iCloud, Dropbox, or business services like AWS) are misconfigured or attacked. This can expose your files, photos, or data stored in the cloud. Misconfigured cloud storage is one of the most common causes of large data leaks.',
    prevention: [
      'Review privacy and sharing settings on your cloud accounts (Google Drive, iCloud, Dropbox)',
      'Don\'t store sensitive documents in cloud storage without encryption',
      'Use strong, unique passwords and MFA for all cloud accounts',
      'Be careful what permissions you grant to third-party apps',
      'Regularly review which apps have access to your cloud accounts and revoke unused ones',
      'For businesses: audit cloud configurations and enforce least-privilege access'
    ]
  },
  ai_threat: {
    keywords: ['ai security', 'artificial intelligence', 'machine learning', 'deepfake', 'llm', 'chatgpt', 'generative ai', 'ai-powered attack', 'ai-generated', 'prompt injection', 'ai scam', 'voice clone', 'ai fraud'],
    label: 'AI-Related Threat',
    icon: '🤖',
    explanation: 'Criminals are using AI to create more convincing scams: deepfakes (realistic fake video/audio), AI-generated phishing emails that are harder to spot, voice cloning to impersonate family or bosses, and AI tools that help find and exploit vulnerabilities faster than ever.',
    prevention: [
      'Set up a family "safe word" to verify unexpected distress calls',
      'Don\'t trust video or audio just because it looks/sounds real — deepfakes are convincing',
      'Be cautious about sharing personal photos, videos, and voice recordings on social media',
      'Don\'t share sensitive information with AI chatbots',
      'Verify unusual requests (especially financial) through a separate communication channel',
      'Use AI-detection tools when you suspect content might be fake'
    ]
  },
  identity_theft: {
    keywords: ['identity theft', 'identity fraud', 'account takeover', 'credential stuffing', 'password spray', 'brute force', 'stolen credentials', 'financial fraud', 'sim swap', 'sim swapping'],
    label: 'Identity Theft & Fraud',
    icon: '🪪',
    explanation: 'Identity theft is when someone steals your personal information and uses it to open accounts, make purchases, or commit crimes in your name. Attackers buy stolen credentials from data breaches or trick you via phishing. SIM swapping — where criminals hijack your phone number — is a growing threat.',
    prevention: [
      'Use unique, strong passwords for every account with a password manager',
      'Enable MFA using an authenticator app (not SMS) to prevent SIM swap attacks',
      'Freeze your credit with all three bureaus if not opening new accounts',
      'Monitor credit reports at annualcreditreport.com',
      'Shred physical documents with personal information',
      'Set up a PIN with your mobile carrier to prevent SIM swaps'
    ]
  },
  supply_chain: {
    keywords: ['supply chain', 'dependency', 'npm package', 'pypi', 'package compromise', 'backdoor', 'solarwinds', 'software supply chain', 'third-party', 'vendor compromise', 'typosquatting'],
    label: 'Supply Chain Attack',
    icon: '🔗',
    explanation: 'A supply chain attack is when hackers compromise a trusted software provider to attack all their customers at once. Instead of attacking you directly, they inject malicious code into a software update or tool you already trust — especially dangerous because it comes from a "safe" source.',
    prevention: [
      'Keep software updated, but only through official channels',
      'Be cautious with browser extensions — only install well-known ones from official stores',
      'Use security software that detects unusual behavior, not just known threats',
      'If a trusted service announces a breach, change your password immediately',
      'Monitor news about software you use — act quickly if a tool is compromised',
      'For developers: audit dependencies and use lockfiles'
    ]
  },
  iot_hardware: {
    keywords: ['iot', 'internet of things', 'smart home', 'router', 'firmware', 'hardware vulnerability', 'camera hack', 'smart device', 'connected device', 'scada', 'industrial control', 'ics', 'ot security'],
    label: 'IoT & Hardware',
    icon: '📡',
    explanation: 'IoT threats target smart devices — security cameras, smart speakers, routers, smart TVs, baby monitors. Many have weak security and rarely get updates, making them easy targets for hackers who can spy on you or use your device in attacks.',
    prevention: [
      'Change default passwords on ALL smart devices and your router immediately',
      'Keep your router firmware updated — check quarterly',
      'Set up a separate WiFi network (guest network) for IoT devices',
      'Disable features you don\'t use (remote access, voice activation)',
      'Research security reputation before buying smart devices',
      'Turn off or unplug cameras and microphones when not in use'
    ]
  },
  privacy: {
    keywords: ['privacy', 'tracking', 'surveillance', 'data collection', 'gdpr', 'data protection', 'personal information', 'location tracking', 'browser fingerprint', 'cookies', 'ad tracking'],
    label: 'Privacy Concern',
    icon: '👁️',
    explanation: 'Privacy threats involve unauthorized collection or exposure of your personal data — companies tracking your behavior without clear consent, apps collecting more data than needed, surveillance programs, and data brokers selling your information.',
    prevention: [
      'Review app permissions — revoke camera, microphone, and location for apps that don\'t need them',
      'Use a privacy-focused browser or enable strict tracking protection',
      'Use a VPN on public WiFi',
      'Check tosdr.org for plain-English privacy policy summaries',
      'Opt out of data broker sites (DeleteMe can automate this)',
      'Use private browsing for sensitive searches and limit social media sharing'
    ]
  },
  government_policy: {
    keywords: ['regulation', 'legislation', 'policy', 'government', 'sanctions', 'law enforcement', 'fbi', 'doj', 'sec', 'indictment', 'arrested', 'charged', 'cybercrime bust', 'executive order', 'nation-state', 'apt', 'cyberwarfare'],
    label: 'Policy & Law Enforcement',
    icon: '⚖️',
    explanation: 'This covers government cybersecurity actions — new laws, law enforcement operations against criminals, sanctions against hacking groups, and policy changes affecting your digital rights. Also includes nation-state operations where governments attack each other\'s infrastructure.',
    prevention: [
      'Stay informed about your digital rights and new privacy laws',
      'If notified you\'re a victim in a law enforcement case, follow their guidance',
      'Use free resources from CISA (cisa.gov) for security best practices',
      'Report cybercrime to FBI\'s IC3 (ic3.gov)',
      'During geopolitical tensions, be extra vigilant — cyberattacks increase',
      'Support companies that comply with security regulations'
    ]
  }
};

const GENERAL_ENTRY = {
  label: 'Cybersecurity News',
  icon: '🛡️',
  explanation: 'Staying informed about security developments helps you make better decisions about protecting your digital life — from stronger passwords to spotting new scam techniques.',
  prevention: [
    'Keep all devices and apps updated with the latest security patches',
    'Use strong, unique passwords and enable multi-factor authentication',
    'Be cautious with emails, links, and attachments from unknown sources',
    'Back up your important files regularly',
    'Stay informed by following trusted cybersecurity news sources'
  ]
};

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

// ═══════════ THREAT TYPE DETECTION ═══════════
function detectThreatType(title, description) {
  const text = `${title} ${description}`.toLowerCase();
  let bestMatch = null;
  let bestScore = 0;

  for (const [type, config] of Object.entries(THREAT_KB)) {
    let score = 0;
    for (const kw of config.keywords) {
      if (text.includes(kw)) score += kw.length; // longer keywords = more specific
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = type;
    }
  }

  if (bestScore < 5) return GENERAL_ENTRY;

  const matched = THREAT_KB[bestMatch];
  return {
    label: matched.label,
    icon: matched.icon,
    explanation: matched.explanation,
    prevention: matched.prevention,
  };
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
  res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const now = Date.now();
  const cutoff = now - 72 * 60 * 60 * 1000;

  try {
    const results = await Promise.allSettled(
      FEEDS.map(async (feed) => {
        try {
          const parsed = await parser.parseURL(feed.url);
          return (parsed.items || []).slice(0, 8).map(item => {
            let title = cleanHTML(item.title) || 'Untitled';
            let source = feed.source;
            let summary = truncate(cleanHTML(item.contentSnippet || item.content || item.description || ''));
            // Google News titles look like "Headline - Publisher" and the
            // description just repeats the headline, so show the real publisher
            // and drop the duplicate text.
            if (feed.source === 'Google News') {
              const cut = title.lastIndexOf(' - ');
              if (cut > 0) {
                source = title.slice(cut + 3).trim() || feed.source;
                title = title.slice(0, cut).trim();
              }
              summary = '';
            }
            return {
              title,
              summary,
              url: item.link || 'N/A',
              source,
              pubDate: item.pubDate || item.isoDate || null,
              _defaultCat: feed.category,
              _defaultPri: feed.priority,
            };
          });
        } catch (e) {
          console.warn(`Feed failed: ${feed.source} — ${e.message}`);
          return [];
        }
      })
    );

    let allItems = results
      .filter(r => r.status === 'fulfilled')
      .flatMap(r => r.value);

    // Filter to recent items
    allItems = allItems.filter(item => {
      if (!item.pubDate) return true;
      return new Date(item.pubDate).getTime() > cutoff;
    });

    // Categorize, prioritize, and detect threat type
    allItems = allItems.map(item => {
      const threat = detectThreatType(item.title, item.summary);
      return {
        title: item.title,
        summary: item.summary,
        url: item.url,
        source: item.source,
        category: categorize(item.title, item.summary, item._defaultCat),
        priority: prioritize(item.title, item.summary, item._defaultPri),
        pubDate: item.pubDate,
        // NEW: threat intelligence for plain-English explanations
        threat_label: threat.label,
        threat_icon: threat.icon,
        explanation: threat.explanation,
        prevention: threat.prevention,
      };
    });

    // Sort: critical first, then high, then by date
    const priOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    allItems.sort((a, b) => {
      const pDiff = (priOrder[a.priority] || 3) - (priOrder[b.priority] || 3);
      if (pDiff !== 0) return pDiff;
      const dA = a.pubDate ? new Date(a.pubDate).getTime() : 0;
      const dB = b.pubDate ? new Date(b.pubDate).getTime() : 0;
      return dB - dA;
    });

    // Deduplicate
    const seen = new Set();
    allItems = allItems.filter(item => {
      const key = item.title.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 50);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    allItems = allItems.slice(0, 60);

    return res.status(200).json({
      items: allItems,
      fetched_at: new Date().toISOString(),
      count: allItems.length,
      sources: [...new Set(allItems.map(i => i.source))].length,
      // Every feed the app monitors, so the frontend can list its sources
      feeds: [...new Map(FEEDS.map(f => [f.source, { name: f.source, site: f.site || new URL(f.url).origin }])).values()],
    });

  } catch (err) {
    console.error('News handler error:', err);
    return res.status(500).json({ error: err.message });
  }
}
