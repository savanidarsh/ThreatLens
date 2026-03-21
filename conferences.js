import Parser from 'rss-parser';

const parser = new Parser({
  timeout: 8000,
  headers: { 'User-Agent': 'CyberBrief/3.0' },
});

// ═══════════ CONFERENCE & OPPORTUNITY FEEDS ═══════════
const CONF_FEEDS = [
  // Conference aggregators
  { url: 'https://infosec-conferences.com/feed/', source: 'InfoSec Conferences', type: 'conference' },
  { url: 'https://www.sans.org/blog/feed/', source: 'SANS Blog', type: 'conference' },

  // Security community blogs (often announce conferences, CFPs, scholarships)
  { url: 'https://www.blackhat.com/blog/rss.xml', source: 'Black Hat Blog', type: 'conference' },
  { url: 'https://blog.defcon.org/feed/', source: 'DEF CON Blog', type: 'conference' },
  { url: 'https://www.bsides.org/feed/', source: 'BSides', type: 'conference' },

  // Scholarships & student programs
  { url: 'https://www.wicys.org/feed/', source: 'WiCyS', type: 'scholarship' },
  { url: 'https://iamcybersafe.org/s/feed/0D5t000000GZ1FHCA1', source: '(ISC)² Foundation', type: 'scholarship' },

  // Security news that covers conferences
  { url: 'https://feeds.feedburner.com/TheHackersNews', source: 'The Hacker News', type: 'conference' },
  { url: 'https://www.securityweek.com/feed', source: 'SecurityWeek', type: 'conference' },
  { url: 'https://www.darkreading.com/rss.xml', source: 'Dark Reading', type: 'conference' },
  { url: 'https://portswigger.net/daily-swig/rss', source: 'The Daily Swig', type: 'conference' },
];

// ═══════════ KNOWN MAJOR CONFERENCES (static data enrichment) ═══════════
function getStaticConferences() {
  const year = new Date().getFullYear();
  return [
    {
      title: `DEF CON ${year}`,
      summary: `One of the world\'s largest hacker conventions. Features villages, CTFs, workshops, and talks. Volunteers ("Goons") get free admission in exchange for helping run the event. Student-friendly with affordable badges.`,
      type: 'conference', urgency: 'upcoming',
      deadline: `Check defcon.org for ${year} dates`,
      location: 'Las Vegas, NV', url: 'https://defcon.org',
      cost_for_students: 'Cash-only badge ~$380 / Free for Goon volunteers',
      source: 'DEF CON',
    },
    {
      title: `DEF CON Goon Volunteer Program ${year}`,
      summary: `Volunteer as a DEF CON Goon and get FREE admission to DEF CON. Goons help with crowd management, door security, and logistics. Applications typically open a few months before the conference. Great way for students to attend for free.`,
      type: 'volunteer', urgency: 'upcoming',
      deadline: `Watch defcon.org/goons for applications`,
      location: 'Las Vegas, NV', url: 'https://defcon.org',
      cost_for_students: 'Free (volunteer)',
      source: 'DEF CON',
    },
    {
      title: `Black Hat USA ${year}`,
      summary: `Premier cybersecurity conference with cutting-edge research talks, trainings, and an arsenal of security tools. Student passes are available at a significantly discounted rate. Check their scholarship programs for additional funding.`,
      type: 'conference', urgency: 'upcoming',
      deadline: `Check blackhat.com for ${year} dates`,
      location: 'Las Vegas, NV', url: 'https://www.blackhat.com',
      cost_for_students: 'Discounted student rate available',
      source: 'Black Hat',
    },
    {
      title: `Black Hat Student Scholarship Program ${year}`,
      summary: `Black Hat offers scholarships that cover full conference passes for qualifying students studying cybersecurity. Includes access to briefings and the business hall. Applications typically open in spring.`,
      type: 'scholarship', urgency: 'upcoming',
      deadline: `Watch blackhat.com for application opening`,
      location: 'Las Vegas, NV', url: 'https://www.blackhat.com',
      cost_for_students: 'Free (scholarship)',
      source: 'Black Hat',
    },
    {
      title: `RSA Conference ${year}`,
      summary: `The world\'s largest cybersecurity conference and expo. Features keynotes from industry leaders, hundreds of sessions, and a massive expo hall. They offer student programs including discounted passes and career resources.`,
      type: 'conference', urgency: 'upcoming',
      deadline: `Check rsaconference.com`,
      location: 'San Francisco, CA', url: 'https://www.rsaconference.com',
      cost_for_students: 'Expo pass often free / Student discounts available',
      source: 'RSA Conference',
    },
    {
      title: `BSides Events ${year} — Free/Cheap Community Conferences`,
      summary: `Security BSides are community-organized, often FREE or very low-cost events held worldwide. BSides DC, BSides NoVA, BSides Charm (Baltimore) are close to College Park. Great for networking, learning, and presenting. Many accept student volunteers for free entry.`,
      type: 'conference', urgency: 'open',
      deadline: 'Various dates — check bsides.org',
      location: 'Multiple cities worldwide', url: 'https://www.bsides.org',
      cost_for_students: 'Free or under $25',
      source: 'BSides',
    },
    {
      title: `BSides DC / BSides NoVA / BSides Charm — Local to Maryland`,
      summary: `BSides events in the DC/Maryland/Virginia area are excellent for UMD students. Typically free or very low cost. Great first conferences for students to attend, present lightning talks, or volunteer.`,
      type: 'conference', urgency: 'upcoming',
      deadline: 'Check respective BSides websites',
      location: 'DC / NoVA / Baltimore area', url: 'https://www.bsides.org',
      cost_for_students: 'Free or under $25',
      source: 'BSides',
    },
    {
      title: `WiCyS (Women in CyberSecurity) Conference ${year}`,
      summary: `Annual conference for women in cybersecurity with excellent scholarship program. Scholarships cover conference registration, travel, and hotel. Open to students of all genders studying cybersecurity. Strong networking and career fair component.`,
      type: 'scholarship', urgency: 'upcoming',
      deadline: `Check wicys.org for scholarship deadlines`,
      location: 'Varies', url: 'https://www.wicys.org',
      cost_for_students: 'Scholarships cover full cost',
      source: 'WiCyS',
    },
    {
      title: `(ISC)² Scholarships for Cybersecurity Students`,
      summary: `The (ISC)² Foundation offers scholarships ranging from $1,000 to $5,000 for undergraduate and graduate students pursuing cybersecurity degrees. Can be used for tuition, certifications, or conference attendance.`,
      type: 'scholarship', urgency: 'open',
      deadline: 'Annual cycle — check iamcybersafe.org',
      location: 'Online application', url: 'https://iamcybersafe.org/s/scholarships',
      cost_for_students: '$1,000 - $5,000 awards',
      source: '(ISC)² Foundation',
    },
    {
      title: `SANS Cyber Academy & Work Study Programs`,
      summary: `SANS offers Work Study programs where you can attend expensive SANS trainings for free or heavily discounted by helping facilitate courses. They also have the Cyber Academy with competitive scholarships for full SANS courses and GIAC certifications.`,
      type: 'scholarship', urgency: 'open',
      deadline: 'Rolling applications',
      location: 'Various / Online', url: 'https://www.sans.org/work-study/',
      cost_for_students: 'Free or heavily discounted',
      source: 'SANS Institute',
    },
    {
      title: `CCDC (Collegiate Cyber Defense Competition) ${year}`,
      summary: `National competition for college teams to defend simulated business networks against professional red teamers. Compete regionally first, then advance to nationals. Excellent resume builder and great for practical defensive skills.`,
      type: 'student_program', urgency: 'upcoming',
      deadline: 'Regionals typically in spring',
      location: 'Regional + National', url: 'https://www.nationalccdc.org',
      cost_for_students: 'Free to compete',
      source: 'NCCDC',
    },
    {
      title: `NCL (National Cyber League) ${year}`,
      summary: `CTF-style competition designed for students. Individual and team games covering log analysis, OSINT, cryptography, network traffic analysis, and more. Great for beginners and experienced players. Rankings visible to employers.`,
      type: 'student_program', urgency: 'upcoming',
      deadline: 'Spring and Fall seasons',
      location: 'Online', url: 'https://nationalcyberleague.org',
      cost_for_students: 'Small registration fee (~$35)',
      source: 'NCL',
    },
    {
      title: `ShmooCon ${year}`,
      summary: `East coast hacker convention held in Washington DC. Very close to UMD. Known for its technical talks and community vibe. Tickets sell out extremely fast. They also need volunteers who get free entry.`,
      type: 'conference', urgency: 'upcoming',
      deadline: 'Tickets sell out in seconds — watch shmoocon.org',
      location: 'Washington, DC', url: 'https://www.shmoocon.org',
      cost_for_students: '~$150 / Free for volunteers',
      source: 'ShmooCon',
    },
    {
      title: `Wild West Hackin\' Fest ${year}`,
      summary: `Community-focused security conference by Black Hills Information Security. Offers affordable passes, community scholarships, and great training tracks. John Strand and the BHIS team are known for student-friendly pricing.`,
      type: 'conference', urgency: 'upcoming',
      deadline: 'Check wildwesthackinfest.com',
      location: 'Deadwood, SD / Online', url: 'https://wildwesthackinfest.com',
      cost_for_students: 'Affordable + scholarships available',
      source: 'WWHF',
    },
    {
      title: `GrrCON ${year}`,
      summary: `Mid-size security conference in Michigan known for hands-on workshops, CTFs, and a welcoming community. Offers student discounts and volunteer opportunities for free admission.`,
      type: 'conference', urgency: 'upcoming',
      deadline: 'Check grrcon.com',
      location: 'Grand Rapids, MI', url: 'https://grrcon.com',
      cost_for_students: 'Student discounts + volunteer for free',
      source: 'GrrCON',
    },
    {
      title: `OWASP Global AppSec Conferences ${year}`,
      summary: `OWASP hosts AppSec conferences focused on application security. Student discounts available. OWASP chapters also host free local meetups — check for the DC/Maryland chapter. Great for web security focus areas.`,
      type: 'conference', urgency: 'upcoming',
      deadline: 'Check owasp.org/events',
      location: 'Various', url: 'https://owasp.org',
      cost_for_students: 'Student discounts / Local meetups free',
      source: 'OWASP',
    },
    {
      title: `Diana Initiative ${year}`,
      summary: `Conference focused on diversity in information security, held alongside DEF CON in Las Vegas. Offers scholarships and is committed to supporting underrepresented groups in cybersecurity. Free or low-cost attendance.`,
      type: 'scholarship', urgency: 'upcoming',
      deadline: 'Check dianainitiative.org',
      location: 'Las Vegas, NV', url: 'https://www.dianainitiative.org',
      cost_for_students: 'Free or low-cost + scholarships',
      source: 'Diana Initiative',
    },
  ];
}

// ═══════════ KEYWORD FILTERS FOR CONFERENCE-RELATED NEWS ═══════════
const CONF_KEYWORDS = [
  'conference', 'summit', 'con ', 'bsides', 'defcon', 'def con', 'black hat', 'blackhat',
  'rsa conference', 'shmoocon', 'scholarship', 'student', 'volunteer', 'cfp', 'call for papers',
  'call for presentations', 'call for speakers', 'registration open', 'early bird',
  'training', 'workshop', 'capture the flag', 'ctf', 'hackathon', 'career fair',
  'grant', 'fellowship', 'travel stipend', 'diversity', 'mentorship',
];

const TYPE_KEYWORDS = {
  scholarship: ['scholarship', 'grant', 'fellowship', 'stipend', 'award', 'financial', 'funding', 'sponsored student', 'travel grant', 'reimbursement'],
  volunteer: ['volunteer', 'goon', 'helper', 'staff application', 'free admission for volunteer'],
  student_program: ['student', 'collegiate', 'university', 'academic', 'career fair', 'mentorship', 'internship', 'ctf competition', 'hackathon'],
  cfp: ['cfp', 'call for papers', 'call for presentations', 'call for speakers', 'submit talk', 'lightning talk', 'submission deadline'],
  conference: ['conference', 'summit', 'con ', 'convention', 'symposium', 'event', 'registration'],
};

const URGENCY_KEYWORDS = {
  deadline_soon: ['deadline', 'last day', 'closes soon', 'final call', 'ending', 'expires', 'due date'],
  open: ['open now', 'registration open', 'now accepting', 'apply now', 'applications open', 'early bird'],
};

function classifyType(title, desc, defaultType) {
  const text = `${title} ${desc}`.toLowerCase();
  for (const [type, kws] of Object.entries(TYPE_KEYWORDS)) {
    if (type === 'conference') continue; // check last
    if (kws.some(kw => text.includes(kw))) return type;
  }
  return defaultType;
}

function classifyUrgency(title, desc) {
  const text = `${title} ${desc}`.toLowerCase();
  for (const [urg, kws] of Object.entries(URGENCY_KEYWORDS)) {
    if (kws.some(kw => text.includes(kw))) return urg;
  }
  return 'upcoming';
}

function cleanHTML(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim();
}

function truncate(text, maxLen = 220) {
  if (!text || text.length <= maxLen) return text;
  return text.substring(0, maxLen).replace(/\s+\S*$/, '') + '…';
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=7200'); // 1hr edge cache
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    // 1. Fetch RSS feeds and filter for conference-related items
    const results = await Promise.allSettled(
      CONF_FEEDS.map(async (feed) => {
        try {
          const parsed = await parser.parseURL(feed.url);
          return (parsed.items || []).slice(0, 10).map(item => ({
            title: cleanHTML(item.title) || '',
            description: cleanHTML(item.contentSnippet || item.content || item.description || ''),
            url: item.link || 'N/A',
            source: feed.source,
            pubDate: item.pubDate || item.isoDate || null,
            _defaultType: feed.type,
          }));
        } catch (e) {
          console.warn(`Feed failed: ${feed.source} — ${e.message}`);
          return [];
        }
      })
    );

    let feedItems = results
      .filter(r => r.status === 'fulfilled')
      .flatMap(r => r.value);

    // Filter for conference/opportunity-related items only
    feedItems = feedItems.filter(item => {
      const text = `${item.title} ${item.description}`.toLowerCase();
      return CONF_KEYWORDS.some(kw => text.includes(kw));
    });

    // Process feed items
    const processedFeed = feedItems.map(item => ({
      title: item.title,
      summary: truncate(item.description),
      type: classifyType(item.title, item.description, item._defaultType),
      urgency: classifyUrgency(item.title, item.description),
      deadline: 'Check source',
      location: 'See details',
      url: item.url,
      cost_for_students: 'N/A',
      source: item.source,
      pubDate: item.pubDate,
    }));

    // 2. Combine with static conference data
    const staticItems = getStaticConferences();

    // Merge: static items first (curated), then feed items
    let allItems = [...staticItems, ...processedFeed];

    // Deduplicate
    const seen = new Set();
    allItems = allItems.filter(item => {
      const key = item.title.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 40);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    // Sort: deadline_soon first, then scholarships, then rest
    const urgOrder = { deadline_soon: 0, open: 1, upcoming: 2, future: 3 };
    const typeOrder = { scholarship: 0, volunteer: 1, student_program: 2, cfp: 3, conference: 4 };
    allItems.sort((a, b) => {
      const uDiff = (urgOrder[a.urgency] || 3) - (urgOrder[b.urgency] || 3);
      if (uDiff !== 0) return uDiff;
      return (typeOrder[a.type] || 4) - (typeOrder[b.type] || 4);
    });

    return res.status(200).json({
      items: allItems,
      fetched_at: new Date().toISOString(),
      count: allItems.length,
    });

  } catch (err) {
    console.error('Conference handler error:', err);
    return res.status(500).json({ error: err.message });
  }
}
