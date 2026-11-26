// Builds a plain-English explanation of ONE story from its headline and summary.
// No AI service: it pulls out facts with patterns (which product, which group,
// how many people, is there a fix, is it already being exploited) and fills
// sentences with them, then explains any jargon the story itself uses.

// Well-known companies and products, matched as whole words with exact case
const PRODUCTS = [
  'Microsoft', 'Windows', 'Microsoft Exchange', 'Exchange Server', 'Outlook', 'Microsoft Teams', 'SharePoint', 'Microsoft Edge', 'Azure', 'Office 365', 'Microsoft 365', 'OneDrive', 'Copilot',
  'Apple', 'iPhone', 'iPhones', 'iPad', 'iOS', 'iPadOS', 'macOS', 'Safari', 'WebKit', 'iCloud', 'Apple Watch',
  'Google', 'Chrome', 'Chromium', 'Android', 'Gmail', 'Google Play', 'Google Cloud', 'Pixel', 'Gemini', 'YouTube',
  'WhatsApp', 'Meta', 'Facebook', 'Instagram', 'Messenger', 'Threads', 'Telegram', 'Signal', 'TikTok', 'Snapchat', 'Discord', 'LinkedIn', 'Reddit', 'X',
  'Samsung', 'Galaxy', 'Xiaomi', 'Huawei', 'OnePlus', 'Qualcomm', 'MediaTek', 'Intel', 'AMD', 'Nvidia', 'Arm',
  'Mozilla', 'Firefox', 'Thunderbird', 'Opera', 'Brave', 'Linux', 'Ubuntu', 'Debian', 'Red Hat', 'OpenSSH', 'OpenSSL', 'sudo',
  'Cisco', 'Fortinet', 'FortiOS', 'FortiGate', 'FortiWeb', 'Ivanti', 'Citrix', 'NetScaler', 'Palo Alto Networks', 'PAN-OS', 'SonicWall', 'Juniper', 'Check Point', 'F5', 'Zyxel', 'Ubiquiti',
  'TP-Link', 'Netgear', 'D-Link', 'Linksys', 'ASUS', 'Synology', 'QNAP', 'Hikvision', 'Dahua', 'Ring', 'Wyze',
  'VMware', 'ESXi', 'vCenter', 'Veeam', 'SolarWinds', 'MOVEit', 'Progress', 'Oracle', 'SAP', 'Salesforce', 'Snowflake', 'Okta', 'Atlassian', 'Confluence', 'Jira', 'ServiceNow', 'Workday',
  'Adobe', 'Acrobat', 'Zoom', 'Slack', 'Dropbox', 'Box', 'Cloudflare', 'Akamai', 'AWS', 'Amazon', 'Kubernetes', 'Docker', 'GitHub', 'GitLab', 'npm', 'PyPI', 'WordPress', 'Jenkins', 'Apache', 'Nginx', 'Tomcat', 'Redis', 'PostgreSQL', 'MySQL', 'Python', 'Java', 'Node.js', 'PHP',
  'OpenAI', 'ChatGPT', 'Anthropic', 'Claude', 'DeepSeek', 'Hugging Face',
  'PayPal', 'Venmo', 'Cash App', 'Zelle', 'Coinbase', 'Binance', 'MetaMask', 'Visa', 'Mastercard',
  'Netflix', 'Spotify', 'Steam', 'PlayStation', 'Xbox', 'Nintendo', 'Roblox', 'Minecraft', 'Fortnite',
  'AT&T', 'Verizon', 'T-Mobile', 'Comcast', 'Xfinity', 'Ticketmaster', 'Uber', 'Airbnb', 'Booking.com', 'eBay', 'Walmart',
  '1Password', 'LastPass', 'Bitwarden', 'NordVPN', 'ExpressVPN', 'Tesla',
  'Exchange OWA', 'Outlook Web Access', 'JetBrains', 'TeamCity', 'Arch Linux', 'Plex Media Server', 'Plex', 'Visual Studio', 'VS Code', 'Broadcom', 'Microsoft Defender', 'Chrome Web Store', 'App Store', 'Ivanti EPMM', 'Flowise', 'n8n', 'Notepad++', 'WinRAR', '7-Zip', 'mSecure', 'Substack', 'Discord',
];

// Jargon a non-technical reader may not know, explained in one line each
const GLOSSARY = [
  ['zero-day', /zero[- ]day|0-day/i, 'a flaw attackers found and used before the company had a fix ready.'],
  ['zero-click', /zero[- ]click|0-click/i, 'an attack that works without you tapping or opening anything.'],
  ['actively exploited', /actively exploited|exploited in the wild|in the wild|under active (?:attack|exploitation)/i, 'criminals are already using this flaw in real attacks, not just in theory.'],
  ['CVE', /\bCVE\b|CVE-\d/, 'the official ID number given to a publicly known security flaw.'],
  ['patch', /\bpatch(?:es|ed|ing)?\b|security update/i, 'a software update that fixes a security problem.'],
  ['remote code execution (RCE)', /remote code execution|\bRCE\b/, 'an attacker could run their own commands on your device from far away.'],
  ['privilege escalation', /privilege escalation|elevation of privilege|escalate privileges/i, 'an attacker who gets a small foothold can give themselves full control.'],
  ['authentication bypass', /authentication bypass|auth bypass|bypass authentication/i, 'a way to get in without the correct password.'],
  ['SQL injection', /sql injection|\bSQLi\b/i, 'typing special commands into a website form to read or change its database.'],
  ['cross-site scripting (XSS)', /cross-site scripting|\bXSS\b/, 'sneaking harmful code into a web page so it runs in visitors\' browsers.'],
  ['buffer overflow', /buffer overflow|memory corruption|use-after-free|out-of-bounds/i, 'a programming mistake that can crash a program or let an attacker take it over.'],
  ['proof of concept', /proof[- ]of[- ]concept|\bPoC\b/, 'working demo code that shows the flaw can be used, which makes attacks more likely soon.'],
  ['CVSS', /\bCVSS\b/, 'a 0–10 score for how serious a flaw is. 9 or above is critical.'],
  ['KEV catalog', /\bKEV\b|known exploited vulnerabilit/i, 'the US government list (CISA) of flaws hackers are known to be using right now.'],
  ['phishing', /phishing/i, 'fake messages pretending to be someone you trust, to steal passwords or money.'],
  ['smishing', /smishing/i, 'phishing sent by text message (SMS).'],
  ['vishing', /vishing|voice phishing/i, 'phishing done by phone call.'],
  ['quishing', /quishing|qr code phishing/i, 'phishing using a QR code that leads to a fake website.'],
  ['business email compromise (BEC)', /business email compromise|\bBEC\b/, 'criminals posing as a boss or supplier by email to get a payment sent to them.'],
  ['ransomware', /ransomware/i, 'malware that locks files and demands payment to unlock them.'],
  ['double extortion', /double extortion/i, 'attackers steal data before locking it, then threaten to publish it unless paid.'],
  ['malware', /\bmalware\b/i, 'any software made to cause harm.'],
  ['infostealer', /info-?stealers?|stealer malware|password stealer/i, 'malware that quietly copies saved passwords, cookies and crypto wallets from a device.'],
  ['trojan', /\btrojans?\b/i, 'harmful software disguised as something useful.'],
  ['remote access trojan (RAT)', /remote access trojan|\bRATs?\b/, 'malware that lets an attacker control a device from afar.'],
  ['spyware', /spyware/i, 'software that secretly watches what you do, read or say.'],
  ['keylogger', /keylogger/i, 'software that records everything you type, including passwords.'],
  ['backdoor', /backdoor/i, 'a hidden way into a system that skips the normal login.'],
  ['rootkit', /rootkit/i, 'malware that hides deep in a system so it is hard to find or remove.'],
  ['botnet', /botnet/i, 'a large group of hacked devices that criminals control together.'],
  ['DDoS', /\bDDoS\b|denial[- ]of[- ]service/i, 'flooding a website or service with traffic so it goes offline.'],
  ['wiper', /\bwiper\b/i, 'malware built to permanently erase data.'],
  ['cryptojacking', /cryptojacking|cryptominer|coin ?miner/i, 'secretly using someone\'s device to mine cryptocurrency.'],
  ['supply chain attack', /supply[- ]chain/i, 'hacking a trusted supplier or software so its customers get infected through it.'],
  ['typosquatting', /typosquat/i, 'fake apps, packages or websites with names one letter off from the real ones.'],
  ['malicious package', /malicious (?:npm|pypi|packages?|libraries|extensions?)/i, 'a harmful add-on or code library uploaded to look like a normal one.'],
  ['credential stuffing', /credential stuffing/i, 'trying usernames and passwords leaked from one site on many other sites.'],
  ['password spraying', /password spray/i, 'trying a few common passwords on many accounts at once.'],
  ['brute force', /brute[- ]force/i, 'guessing passwords over and over until one works.'],
  ['account takeover', /account takeover|\bATO\b/, 'criminals getting control of someone\'s online account.'],
  ['SIM swap', /sim[- ]swap/i, 'tricking a phone company into moving your number to a criminal\'s SIM card, so they get your codes.'],
  ['multi-factor authentication (MFA)', /\bMFA\b|\b2FA\b|multi-factor|two-factor/i, 'a second check after your password, like a code or app approval.'],
  ['MFA fatigue', /mfa fatigue|push bombing|mfa bombing/i, 'spamming someone with login approval requests until they tap "approve".'],
  ['session hijacking', /session hijack|cookie theft|session token|stolen cookies/i, 'stealing the "already logged in" token so no password is needed.'],
  ['OAuth', /\bOAuth\b/, 'the "Sign in with Google/Microsoft" style permission system. Bad apps can abuse it.'],
  ['man-in-the-middle', /man[- ]in[- ]the[- ]middle|\bMitM\b|adversary[- ]in[- ]the[- ]middle|\bAitM\b/i, 'someone secretly sitting between you and a website, reading or changing what is sent.'],
  ['dark web', /dark web|darknet/i, 'hidden websites where stolen data and hacking tools are sold.'],
  ['initial access broker', /initial access broker/i, 'a criminal who breaks into companies and sells that access to others.'],
  ['threat actor', /threat actors?/i, 'security-speak for the person or group behind an attack.'],
  ['APT', /\bAPT\s?\d*\b|advanced persistent threat/, 'a skilled, usually government-backed hacking group that stays hidden for long periods.'],
  ['nation-state', /nation[- ]state|state[- ]sponsored|state[- ]backed/i, 'hackers working for, or paid by, a government.'],
  ['data broker', /data brokers?/i, 'a company that collects and sells people\'s personal information.'],
  ['deepfake', /deepfake/i, 'AI-generated video, image or audio of a real person saying or doing something they never did.'],
  ['voice cloning', /voice clon/i, 'using AI to copy someone\'s voice from a short recording.'],
  ['prompt injection', /prompt injection/i, 'hiding instructions in text or web pages that trick an AI assistant into doing something harmful.'],
  ['AI agent', /\bAI agents?\b|agentic/i, 'an AI tool that can take actions on its own, like browsing, clicking or sending messages.'],
  ['LLM', /\bLLMs?\b|large language model/i, 'the type of AI behind chatbots like ChatGPT.'],
  ['firmware', /firmware/i, 'the built-in software that runs a device like a router or camera.'],
  ['end-to-end encryption', /end-to-end encrypt|\bE2EE\b/i, 'only you and the person you message can read it, not even the app company.'],
  ['sideloading', /sideload/i, 'installing an app from outside the official app store.'],
  ['malvertising', /malvertis/i, 'harmful ads, often in search results, that lead to fake sites or malware.'],
  ['VPN', /\bVPNs?\b/, 'a service that encrypts your internet connection. Company VPNs are a common target for hackers.'],
  ['edge device', /edge devices?|network appliances?/i, 'equipment that sits between a network and the internet, like firewalls, VPN boxes and routers.'],
  ['ICS / SCADA', /\bICS\b|\bSCADA\b|\bOT\b|industrial control/, 'computers that run factories, power, water and other physical systems.'],
  ['IoT', /\bIoT\b|internet of things/i, 'internet-connected gadgets like cameras, smart plugs and doorbells.'],
  ['bug bounty', /bug bounty/i, 'a reward a company pays researchers for reporting flaws responsibly.'],
  ['GDPR', /\bGDPR\b/, 'the EU privacy law that limits how companies use personal data.'],
];

const NUM = '(\\d[\\d,.]*\\s*(?:million|billion|thousand|[mMkK]\\b)?\\+?)';
const WHO = '(users?|customers?|people|patients|accounts?|records|individuals|employees|students|subscribers|members|households|families|residents|devices|phones|PCs|computers|websites|sites|servers|routers|switches|cameras|systems|organizations|companies|victims|passwords|emails|credentials)';
const COUNT_RE = new RegExp('(?<![$€£¥₹\\d])' + NUM + '\\s+(?:[A-Za-z-]+\\s+){0,2}?' + WHO + '\\b', 'i');
const SECTORS = '(?:users?|customers?|developers?|organizations?|organisations?|companies|firms|banks|hospitals|healthcare|health care|governments?|agencies|businesses|gamers|job seekers|retailers|schools?|school districts?|universities|students|people|victims|professionals|researchers|utilities|water (?:utilities|systems)|telecoms?|airlines|manufacturers|insurers|law firms|travelers|travellers|shoppers|investors|Windows|macOS|Android|iPhone|Linux)(?:\\s+(?:users?|systems?|devices?|sector|organizations?|providers?))?';

function escRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
const PRODUCT_RE = new RegExp('(?<![A-Za-z0-9])(' + [...PRODUCTS].sort((a, b) => b.length - a.length).map(escRe).join('|') + ')(?![A-Za-z0-9])', 'g');
const ALIASES = [[/\bNPM\b/g, 'npm'], [/\bPyPi\b/g, 'PyPI'], [/\bOWA\b/g, 'Outlook Web Access']];

function list(arr) {
  if (arr.length <= 1) return arr[0] || '';
  return arr.slice(0, -1).join(', ') + ' and ' + arr[arr.length - 1];
}
function firstSentence(text) {
  const m = (text || '').match(/^(.{25,260}?[.!?])(?:\s|$)/);
  return m ? m[1] : (text && text.length >= 25 && text.length <= 260 && !/…$/.test(text) ? text.replace(/\s*$/, '.') : '');
}
function cleanSubject(s) {
  return (s || '').replace(/^(?:the|a|an)\s+/i, '').replace(/^['"‘“]+|['"’”]+$/g, '').replace(/[,:;]+$/, '').trim();
}
const cap = s => s ? s[0].toUpperCase() + s.slice(1) : s;

// Products/companies named in the text, in order
function findProducts(text, title) {
  for (const [re, to] of ALIASES) text = text.replace(re, to);
  const out = [];
  for (const m of text.matchAll(PRODUCT_RE)) {
    let p = m[1];
    if (p === 'X' && !/\bX\s+(?:users?|accounts?|platform|posts?)|\(formerly Twitter\)|X\.com/.test(text)) continue;
    if (p === 'Ring' && !/\bRing (?:doorbell|camera|app|users?)/i.test(text)) continue;
    if (p === 'Box' && !/\bBox (?:users?|accounts?|files?)/.test(text)) continue;
    if (p === 'Progress' && !/Progress Software|MOVEit/.test(text)) continue;
    if (p === 'Threads' && !/Threads (?:app|users?)|Meta/.test(text)) continue;
    if (p === 'Arm' && !/Arm (?:chips?|processors?|Holdings)/.test(text)) continue;
    if (p === 'Signal' && !/Signal (?:app|users?|messenger|accounts?)|on Signal/.test(text)) continue;
    if (['sudo', 'Java', 'Python', 'PHP', 'Linux'].includes(p) && !/vulnerab|flaw|bug|CVE|malware|malicious|backdoor/i.test(text)) continue;
    if (p === 'iPhones') p = 'iPhone';
    if (p === 'Exchange OWA' || p === 'Outlook Web Access') p = 'Microsoft Exchange (Outlook on the web)';
    if (!out.includes(p)) out.push(p);
  }
  // A company that is only reporting the news ("Amazon links...", "Google says...") isn't what's affected
  const rep = title.match(/^([A-Z][\w&.-]*(?:\s[A-Z][\w&.-]*)?)\s+(?:says|links|ties|attributes|finds|found|reports|tracks|spots|uncovers|discovers|details|blames|disrupts|warns of (?:attacks|campaign))\b/);
  let res = out;
  if (rep) { const r = rep[1]; const rest = out.filter(p => p !== r && !r.startsWith(p)); if (rest.length) res = rest; }
  // Drop a parent brand when a more specific product is named ("Microsoft" + "Windows")
  const parents = { Microsoft: ['Windows', 'Outlook', 'Microsoft Exchange', 'Exchange Server', 'Microsoft Exchange (Outlook on the web)', 'Microsoft Teams', 'SharePoint', 'Microsoft Edge', 'Azure', 'Office 365', 'Microsoft 365', 'OneDrive', 'Copilot', 'Microsoft Defender', 'Visual Studio', 'VS Code'], Apple: ['iPhone', 'iPad', 'iOS', 'macOS', 'Safari', 'iCloud', 'Apple Watch', 'iPadOS', 'WebKit', 'App Store'], Google: ['Chrome', 'Android', 'Gmail', 'Google Play', 'Google Cloud', 'Pixel', 'Gemini', 'YouTube', 'Chrome Web Store'], Meta: ['WhatsApp', 'Facebook', 'Instagram', 'Messenger', 'Threads'], Outlook: ['Microsoft Exchange (Outlook on the web)'], Linux: ['Arch Linux', 'Ubuntu', 'Debian'], Plex: ['Plex Media Server'], Chrome: ['Chrome Web Store'], Anthropic: ['Claude'], OpenAI: ['ChatGPT'], JetBrains: ['TeamCity'], Broadcom: ['VMware'] };
  res = res.filter(p => !(parents[p] && parents[p].some(c => res.includes(c))));
  return res.slice(0, 3);
}

const GROUP_STOP = /^(?:New|Critical|Chinese|Russian|Iranian|Korean|North|Major|Massive|Android|Windows|Linux|Mac|The|This|A|An|Global|Hackers|Cyber|Security|Microsoft|Google|Apple|Amazon|Rising|Latest|Suspected|Alleged|Notorious|Prolific|Active|Banking|Mobile)\b/;
function findGroup(text) {
  const named = text.match(/\b(LockBit|BlackCat|ALPHV|Cl0p|Clop|Conti|REvil|Akira|Rhysida|Medusa|Black Basta|BianLian|Qilin|RansomHub|Scattered Spider|ShinyHunters|Lapsus\$|Lazarus|Kimsuky|Sandworm|Fancy Bear|Cozy Bear|APT\s?\d+|[A-Z][a-z]+ (?:Typhoon|Blizzard|Sleet|Sandstorm|Tempest|Panda|Bear|Kitten|Chollima|Spider|Falcon))\b/);
  if (named) return named[1];
  const m = text.match(/\b([A-Z0-9][A-Za-z0-9-]{1,}(?: [A-Z][A-Za-z0-9-]{2,})?) (?:ransomware gang|ransomware group|ransomware|hacking group|hackers|gang|botnet|malware|infostealer|stealer|spyware|trojan|backdoor|phishing kit)\b/);
  if (m && !GROUP_STOP.test(m[1]) && !PRODUCTS.includes(m[1])) return m[1];
  return '';
}
function findCountry(text) {
  const m = text.match(/\b(Chin(?:a|ese)(?:-speaking)?|Russia(?:n)?|North Korea(?:n)?|Iran(?:ian)?|Belarus(?:ian)?)(?:[- ](?:linked|backed|nexus|sponsored|aligned|based|speaking))?\s+(?:state[- ]sponsored\s+)?(?:hackers?|hacking|threat actors?|group|APT|spies|cyber|attackers?|operatives?|state)/i)
    || text.match(/\b(Chin(?:a|ese)|Russia(?:n)?|North Korea(?:n)?|Iran(?:ian)?)[- ](?:linked|backed|nexus|sponsored|aligned)\b/i)
    || text.match(/\bto (China|Russia|North Korea(?:n)?|Iran)(?:n)? (?:hackers|state)/i);
  if (!m) return '';
  const n = m[1].toLowerCase();
  return n.startsWith('chin') ? 'China' : n.startsWith('russia') ? 'Russia' : n.startsWith('north') ? 'North Korea' : n.startsWith('iran') ? 'Iran' : 'Belarus';
}
function findCount(text) {
  const m = text.match(COUNT_RE);
  if (!m) return '';
  let n = m[1].trim().replace(/\+$/, '');
  if (/^\d{4}$/.test(n) && +n > 1990 && +n < 2100) return ''; // a year, not a count
  if (/^[\d,.]+$/.test(n) && +n.replace(/,/g, '') < 2) return '';
  n = n.replace(/\s*[mM]$/, ' million').replace(/\s*[kK]$/, ' thousand');
  const what = /^[A-Z]+s?$/.test(m[2]) && m[2].length <= 4 ? m[2] : m[2].toLowerCase(); // keep "PCs", lowercase "Users"
  return n + ' ' + what;
}
// The organization a breach/attack story is about
function findVictim(title) {
  let m = title.match(/^(.{2,50}?) claims (?:the )?(.{2,40}?) (?:breach|hack|attack|data)/i);
  if (m) return cleanSubject(m[2]);
  if (actorSubject(title)) return '';
  m = title.match(/^(.{2,50}?)\s+(?:confirms|discloses|admits|notifies|reports|suffers|investigates|probes|rejects|refuses|pays|restores|recovers|says (?:it was|hackers|data)|warns customers|hit by|hit with|targeted by|struck by|hacked|breached|data breach|cyberattack|cyber attack|breach|shuts|takes systems)\b/i);
  if (m && !/\b(?:hackers?|attackers?|researchers?|police|feds?|ransomware|gang|group|CISA|FBI|experts?|report|study|survey|how|why|what)\b/i.test(m[1])) return cleanSubject(m[1]);
  m = title.match(/\b(?:breach|attack|cyberattack|hack|incident|leak) (?:at|of|against)\s+([A-Z][\w&.'-]*(?:\s+[A-Z][\w&.'-]*){0,3})/);
  if (m) return cleanSubject(m[1]);
  m = title.match(/\b(?:hits?|strikes?|cripples?|disrupts?)\s+((?:[A-Za-z0-9.&'-]+\s?){1,5}?)(?=\s+(?:in|with|after|for|via|using|amid|as|over)\b|[,:]|$)/);
  if (m && !/^(?:users?|windows|android|linux|record|new|all-time)\b/i.test(m[1])) return cleanSubject(m[1]);
  return '';
}
// "X breached 3 orgs" / "X hacked Y": X is the attacker, not the victim
function actorSubject(title) {
  return /^.{2,50}?\s(?:hacked|breached|attacked|compromised)\s(?!in\b|after\b|by\b|via\b|,)\S/i.test(title);
}
// "U.S. school district" -> "a U.S. school district" / "the U.S. school district"; names stay as they are
function np(v, art) {
  const last = v.split(/\s+/).pop();
  return /^[a-z]/.test(last) ? `${art} ${v}` : v;
}
function findTarget(text) {
  const re = new RegExp('\\b(?:target(?:s|ing|ed)?|aimed at|going after|hitting|against|on|disrupting|impersonating)\\s+((?:[A-Za-z0-9&\'.-]+\\s+){0,3}?' + SECTORS + ')\\b', 'i');
  const m = text.match(re);
  if (!m) return '';
  const t = cleanSubject(m[1]);
  return /^(?:health ?care)$/i.test(t) ? t + ' organizations' : t;
}
function findWarner(title) {
  const m = title.match(/^(.{2,40}?)\s+(?:warns|urges|alerts|cautions|flags|issues (?:warning|alert|advisory))\b/i);
  return m ? cleanSubject(m[1]) : '';
}

const has = (re, text) => re.test(text);

export function explainStory({ title, summary, type, typeExplanation, cveId }) {
  const text = `${title}. ${summary || ''}`;
  const products = findProducts(text, title);
  const prod = products.length ? list(products) : '';
  const group = findGroup(text);
  const country = findCountry(text);
  const count = findCount(text);
  const victim = findVictim(title);
  const target = findTarget(text);
  const warner = findWarner(title);
  const cve = cveId ? ` (tracked as ${cveId})` : '';
  const lead = firstSentence(summary);

  const exploited = has(/actively exploited|exploited in the wild|in the wild|under (?:active )?attack|zero[- ]day|0-day|being exploited|\bexploit(?:s|ed|ing)\b|exploitation|attackers (?:are )?(?:exploiting|abusing|using)|used to (?:compromise|hack|attack|breach|break)|\bKEV\b/i, text);
  const patched = has(/\bpatch(?:es|ed)?\b|\bfix(?:es|ed)?\b|security updates?|releases? (?:an )?updates?|updates? (?:to|for) fix|addresses|resolves|plugs|closes|urges? (?:users |customers )?to (?:update|patch|upgrade)/i, text);
  const noFix = has(/no (?:patch|fix)|unpatched|without a (?:patch|fix)|yet to (?:patch|fix)|not (?:yet )?(?:patched|fixed)/i, text);
  const law = has(/\b(?:arrest(?:s|ed)?|charg(?:es|ed)|indict(?:s|ed|ment)|sentenc(?:es|ed)|extradit|pleads? guilty|pleaded guilty|convicted|seiz(?:es|ed|ure)|takedown|taken down|dismantl|sanction(?:s|ed)|bust(?:s|ed)?|crackdown)/i, text);
  const penalty = has(/\bfine[sd]?\b|\bpenalt|\bsettle(?:s|d|ment)\b|lawsuit|\bsued?\b|class action/i, title);
  const breach = has(/\bbreach(?:es|ed)?\b|data leak|leaked|exposed|stolen|data theft|hacked|compromised|unauthorized (?:party|access)|cyberattack|cyber attack|security incident/i, text);
  const warning = has(/\bwarns?\b|\bwarning\b|\balerts?\b|advisory|\burges\b|cautions|flags/i, title);
  const trend = has(/\brising\b|\brise in\b|surge|increase|wave of|spike|growing|uptick|more than ever/i, text);
  const outage = has(/\boutages?\b|\bis down\b|went down|goes down|service disruption|knocked offline/i, title);
  const lines = [];
  let what = '', specific = true;

  if (law) {
    const who = group ? ` linked to ${group}` : country ? ` linked to ${country}` : '';
    what = `Police or prosecutors have taken action against people accused of cybercrime${who}. This is about stopping criminals, so it is not a new danger to you.`;
    if (lead) lines.push(lead);
  } else if (penalty) {
    const m = title.match(/\bfine[sd]?\s+(?:[a-z]+\s+){0,3}([A-Z][\w&.-]*(?:\s+[A-Z][\w&.-]*)?)/);
    const who = cleanSubject(m ? m[1] : victim) || 'A company';
    what = `${who} is facing a fine or legal action over a past security failure. It is a consequence of an earlier incident, not a new attack.`;
  } else if (outage && !breach) {
    what = `${prod || victim || 'An online service'} had an outage. Outages are usually technical faults, not attacks, unless the company says otherwise.`;
  } else if ((type === 'vulnerability' || cveId || type === 'iot_hardware') && (prod || cveId) && !(type !== 'vulnerability' && !cveId && warning && trend)) {
    const where = prod || 'a piece of software';
    if (exploited && noFix) what = `A security flaw in ${where}${cve} is already being used by attackers, and there is no fix yet.`;
    else if (exploited && patched) what = `A security flaw in ${where}${cve} was being used by attackers. A fix is now out, so updating closes the hole.`;
    else if (exploited) what = `A security flaw in ${where}${cve} is already being used by attackers in real attacks.`;
    else if (patched) { const many = /flaws|vulnerabilities|bugs/i.test(text); what = `${cap(where)} received an update that fixes ${many ? 'security flaws' : 'a security flaw'}${cve}. Until you install it, attackers could use ${many ? 'them' : 'it'} to break in.`; }
    else what = `A security flaw was found in ${where}${cve} that attackers could use to break in or take control.`;
    if (has(/\bAI\b.{0,20}\bhelp|\b(?:helped|using|used|with) (?:AI|artificial)/i, text) && !has(/attackers?|hackers?/i, title)) lines.push('AI tools helped find these flaws, so they could be fixed before criminals found them.');
  } else if (warning && (trend || !victim) && /attacks?|campaign|threat|scam|hack|theft|exploit/i.test(text)) {
    const who = warner || 'Security experts';
    const kind = /ransomware/i.test(text) ? 'ransomware ' : /phishing|scam/i.test(text) ? 'scam ' : /data theft|steal(?:ing)? data/i.test(text) ? 'data theft ' : '';
    what = `${who} ${/s$/.test(who) && !/\bISAC$|CISA$/.test(who) ? 'are' : 'is'} warning that ${group ? `the ${group} group's ` : ''}${kind}attacks${target ? ` on ${target}` : ''} are ${trend ? 'increasing' : 'happening right now'}${country ? `, linked to ${country}` : ''}. It is an alert about an ongoing threat, not a single incident.`;
  } else if (type === 'ransomware') {
    const by = group ? `The ${group} ransomware group` : 'A ransomware gang';
    if (victim) what = `${by} attacked ${np(victim, 'a')}, locking its computer systems and likely stealing data to pressure it into paying.`;
    else { what = `${by} is behind this: they lock computer systems and steal data, then demand payment.`; specific = !!group; }
  } else if (type === 'data_breach' || (breach && victim)) {
    if ((victim || prod) && !actorSubject(title)) {
      const who = victim ? np(victim, 'the') : prod;
      what = count ? `${cap(who)} had a security breach, and data linked to about ${count} may have been exposed.`
        : `${cap(who)} had a security breach, and personal or customer data may have been taken.`;
      if (group) lines.push(`The ${group} group says it is behind it${/leak|publish/i.test(text) ? ' and is threatening to leak the data' : ''}.`);
    } else specific = false;
  } else if (type === 'phishing') {
    const imp = text.match(/\bimpersonat\w*\s+((?:[\w-]+\s){0,3}?(?:IT support|support staff|help ?desk|executives?|banks?|police|delivery|the IRS|government)[\w ]{0,12}?)(?=[ ,.]|$)/i);
    const via = /\bcalls?\b|vishing|phone/i.test(text) ? 'phone or video calls' : /\btext|sms|smishing/i.test(text) ? 'text messages' : /\bqr\b|quishing/i.test(text) ? 'QR codes' : /\bads?\b|malvertis|search results/i.test(text) ? 'fake ads and search results' : /websites?|pages?|domains?|sites?/i.test(text) ? 'fake websites' : 'fake messages';
    what = `Scammers are using ${via}${imp ? ` pretending to be ${imp[1].trim()}` : prod ? ` that look like ${prod}` : ''}${target ? ` to target ${target}` : ''}, to trick people into handing over passwords, codes, money or access.`;
    if (/ransomware/i.test(text)) lines.push('Once they get in, the attackers install ransomware, which locks the company\'s computers.');
  } else if (type === 'malware' || type === 'supply_chain') {
    const via = text.match(/\b(?:via|through|using|hidden in|disguised as|posing as)\s+((?:fake|malicious|trojanized|pirated|cracked|bogus|compromised|tampered)\s+[\w\s-]{3,30}?)(?=[,.;]|\s+(?:to|that|and|which)\b)/i);
    if (type === 'supply_chain') {
      what = `Attackers slipped harmful code into trusted software or add-ons${prod ? ` on ${prod}` : ''}, so it reached users through normal downloads or updates.`;
      specific = !!prod;
    } else {
      const name = group ? `Malware called ${group}` : 'Harmful software';
      what = `${name} is spreading${target ? ` among ${target}` : ''}${via ? ` through ${via[1].trim()}` : prod ? ` through ${prod}` : ''}. Once on a device it can steal data or give attackers control.`;
      specific = !!(group || target || via || prod);
    }
    if (country) lines.push(`Investigators link it to hackers working for ${country}.`);
  } else if (type === 'ai_threat') {
    if (has(/deepfake|voice clon/i, text)) what = `Criminals are using AI-made fake voices or videos${target ? ` against ${target}` : ''} to make scams look real.`;
    else if (has(/\b(?:uses?|using|used|leverag\w+)\b.{0,40}\b(?:AI|model|agents?)\b.{0,50}\b(?:attack|hack|exploit|breach|target)/i, text)) what = `Attackers are using AI tools${prod ? ` (${prod})` : ''} to find and break into weak systems automatically, which lets one person attack many targets.`;
    else if (has(/prompt injection|jailbreak|AI agents?|agentic|AI skills?|malicious (?:AI|model)/i, text)) what = `This is about AI tools${prod ? ` such as ${prod}` : ''} being tricked or misused to leak data, run harmful code or take actions nobody asked for.`;
    else if (has(/\b(?:helped|helps|defend|detect|find (?:and fix )?bugs|fix)/i, text)) what = `AI${prod ? ` (${prod})` : ''} is being used to find and fix security problems faster.`;
    else specific = false;
  } else if (type === 'identity_theft') {
    what = `Criminals are taking over accounts or using stolen personal details${prod ? ` on ${prod}` : ''}${target ? `, going after ${target}` : ''} to steal money.`;
  } else if (type === 'cloud_security') {
    what = `Data or systems stored online${prod ? ` (${prod})` : ''} were exposed or attacked, often because of a wrong setting or a stolen password or key.`;
  } else if (type === 'privacy') {
    what = `This is about personal data being collected, tracked or shared${prod ? ` by ${prod}` : ''} in ways people may not expect.`;
  } else if (type === 'government_policy') {
    what = country ? `This involves state-backed hackers or government action connected to ${country}.` : '';
    specific = !!country;
  } else specific = false;

  // When the template has no names to fill in, the article's own first sentence says more
  if ((!what || !specific) && lead) { what = lead; }
  if (!what && warning) what = `${warner || 'A company or security agency'} is warning people about a new risk${target ? ` to ${target}` : ''}.`;
  if (!what && prod) what = `This story is about a security issue involving ${prod}.`;
  if (!what) what = 'The headline is all the feed provides for this story. Tap "Read" for the full details.';

  const who = [];
  if (!law && !penalty) {
    if (prod && !outage) who.push(`People who use ${prod}.`);
    else if (target) who.push(`Mainly ${target}.`);
    if (count && !what.includes(count)) who.push(`About ${count} are involved.`);
    if (victim && !prod && (type === 'data_breach' || type === 'ransomware' || breach)) who.push(`Anyone whose personal details ${np(victim, 'the')} holds.`);
    if (country && !what.includes(country) && !lines.join(' ').includes(country)) who.push(`The attackers are linked to ${country}.`);
  }

  let fix = '';
  if (!law && !penalty && !outage) {
    if (noFix) fix = 'Not yet. Watch for an update and follow any temporary advice from the company.';
    else if (patched && (type === 'vulnerability' || type === 'iot_hardware' || cveId) && prod) fix = `Yes. Install the latest update for ${prod}.`;
    else if (patched && (type === 'vulnerability' || cveId)) fix = 'Yes. An update is available.';
    else if (exploited && (type === 'vulnerability' || cveId)) fix = 'Check for updates now. Attacks are already happening.';
  }

  const words = [];
  for (const [term, re, def] of GLOSSARY) {
    if (re.test(text)) words.push({ term, def });
    if (words.length >= 4) break;
  }

  const points = [{ k: 'What happened', v: [what, ...lines].join(' ') }];
  if (who.length) points.push({ k: 'Who it affects', v: who.join(' ') });
  if (fix) points.push({ k: 'Is there a fix?', v: fix });
  if (typeExplanation && type !== 'general' && !law && !penalty && !outage) points.push({ k: 'Background', v: firstSentence(typeExplanation) || typeExplanation });

  return { points, words, text: points.map(p => `${p.k}: ${p.v}`).join(' ') };
}
