// ThreatLens data: the list of things a user can say they use ("Does this affect me?")
// and the pre-written family alert text in each language.
//
// Catalog entries:
//   kw  keywords matched ignoring upper/lower case
//   cs  keywords matched with exact case, for brand names that are also ordinary
//       words (Signal, Zoom, Chase) so that "zoom in" or "chase down" don't match
// Each keyword is a regular-expression fragment and only matches as a whole word.
window.TL_DATA = {
  groups: [
    { name: 'Phones & tablets', items: [
      { id: 'iphone', label: 'iPhone / iPad', short: 'iPhone', kw: ['iphones?', 'ipads?', 'ipados', 'imessage', 'facetime'], cs: ['iOS', 'Apple'] },
      { id: 'android', label: 'Android phone', short: 'Android', kw: ['android', 'google play', 'play store'] },
      { id: 'samsung', label: 'Samsung Galaxy', short: 'Samsung', kw: ['samsung', 'galaxy s\\d+', 'one ui'] },
      { id: 'pixel', label: 'Google Pixel', short: 'Pixel', kw: ['google pixel'], cs: ['Pixel (?:\\d+\\w*|[Pp]hones?|[Dd]evices?|[Uu]sers?)'] },
      { id: 'xiaomi', label: 'Xiaomi / Redmi', short: 'Xiaomi', kw: ['xiaomi', 'redmi'] },
      { id: 'oneplus', label: 'OnePlus', kw: ['oneplus'] },
      { id: 'motorola', label: 'Motorola', kw: ['motorola'] },
    ] },
    { name: 'Computers', items: [
      { id: 'windows', label: 'Windows PC', short: 'Windows', kw: ['windows', 'microsoft defender', 'patch tuesday', 'bitlocker'] },
      { id: 'mac', label: 'Mac', kw: ['macos', 'macbooks?', 'imacs?'], cs: ['Macs?', 'Apple'] },
      { id: 'chromebook', label: 'Chromebook', kw: ['chromebooks?', 'chromeos', 'chrome os'] },
      { id: 'linux', label: 'Linux', kw: ['linux', 'ubuntu', 'debian', 'fedora'] },
      { id: 'dell', label: 'Dell', cs: ['Dell'] },
      { id: 'hp', label: 'HP (laptops, printers)', short: 'HP', kw: ['hewlett[- ]packard'], cs: ['HP'] },
      { id: 'lenovo', label: 'Lenovo', kw: ['lenovo', 'thinkpad'] },
      { id: 'asus', label: 'ASUS (laptops, routers)', short: 'ASUS', kw: ['asus'] },
      { id: 'acer', label: 'Acer', cs: ['Acer'] },
    ] },
    { name: 'Browsers', items: [
      { id: 'chrome', label: 'Chrome', kw: ['chrome(?! ?os)', 'chromium'] },
      { id: 'safari', label: 'Safari', kw: ['safari', 'webkit'] },
      { id: 'firefox', label: 'Firefox', kw: ['firefox', 'mozilla'] },
      { id: 'edge', label: 'Microsoft Edge', short: 'Edge', kw: ['microsoft edge', 'edge browser'] },
      { id: 'brave', label: 'Brave', kw: ['brave browser', 'brave software'], cs: ['Brave(?! [Nn]ew)'] },
      { id: 'opera', label: 'Opera', kw: ['opera browser', 'opera gx'], cs: ['Opera'] },
      { id: 'extensions', label: 'Browser extensions', short: 'Extensions', kw: ['browser extensions?', 'chrome extensions?', 'firefox add-ons?', 'browser add-ons?'] },
    ] },
    { name: 'Messaging & social', items: [
      { id: 'whatsapp', label: 'WhatsApp', kw: ['whatsapp'] },
      { id: 'telegram', label: 'Telegram', kw: ['telegram'] },
      { id: 'signal', label: 'Signal', cs: ['Signal'] },
      { id: 'instagram', label: 'Instagram', kw: ['instagram'] },
      { id: 'facebook', label: 'Facebook / Messenger', short: 'Facebook', kw: ['facebook'], cs: ['Meta'] },
      { id: 'x', label: 'X (Twitter)', kw: ['twitter', 'x\\.com'], cs: ['X (?:[Aa]ccounts?|[Uu]sers?|[Pp]latform|[Pp]osts?)'] },
      { id: 'tiktok', label: 'TikTok', kw: ['tiktok'] },
      { id: 'snapchat', label: 'Snapchat', kw: ['snapchat'] },
      { id: 'linkedin', label: 'LinkedIn', kw: ['linkedin'] },
      { id: 'discord', label: 'Discord', kw: ['discord'] },
      { id: 'reddit', label: 'Reddit', kw: ['reddit'] },
      { id: 'youtube', label: 'YouTube', kw: ['youtube'] },
    ] },
    { name: 'Email & accounts', items: [
      { id: 'google', label: 'Gmail / Google account', short: 'Google', kw: ['gmail', 'google accounts?', 'google workspace', 'google drive', 'google photos', 'google docs', 'google calendar'] },
      { id: 'microsoft', label: 'Outlook / Microsoft account', short: 'Microsoft', kw: ['outlook', 'hotmail', 'microsoft accounts?', 'microsoft 365', 'office 365', 'onedrive'] },
      { id: 'yahoo', label: 'Yahoo Mail', short: 'Yahoo', kw: ['yahoo'] },
      { id: 'icloud', label: 'iCloud / Apple ID', short: 'iCloud', kw: ['icloud', 'apple id', 'apple accounts?'] },
      { id: 'proton', label: 'Proton Mail', short: 'Proton', kw: ['proton ?mail', 'proton vpn', 'proton drive'], cs: ['Proton'] },
      { id: 'dropbox', label: 'Dropbox', kw: ['dropbox'] },
    ] },
    { name: 'Work & school', items: [
      { id: 'office', label: 'Microsoft Office', short: 'Office', kw: ['microsoft office', 'microsoft word', 'microsoft excel', 'powerpoint', 'office documents?', 'sharepoint'], cs: ['Excel'] },
      { id: 'teams', label: 'Microsoft Teams', short: 'Teams', kw: ['microsoft teams', 'ms teams'], cs: ['Teams (?:[Aa]pp|[Cc]hats?|[Mm]eetings?|[Uu]sers?|[Mm]essages?|[Cc]alls?)'] },
      { id: 'zoom', label: 'Zoom', cs: ['Zoom'] },
      { id: 'slack', label: 'Slack', cs: ['Slack'] },
      { id: 'adobe', label: 'Adobe (Acrobat, Photoshop)', short: 'Adobe', kw: ['adobe', 'acrobat', 'photoshop'] },
      { id: 'github', label: 'GitHub', kw: ['github'] },
      { id: 'wordpress', label: 'WordPress site', short: 'WordPress', kw: ['wordpress', 'woocommerce'] },
    ] },
    { name: 'Passwords & security apps', items: [
      { id: '1password', label: '1Password', kw: ['1password'] },
      { id: 'lastpass', label: 'LastPass', kw: ['lastpass'] },
      { id: 'bitwarden', label: 'Bitwarden', kw: ['bitwarden'] },
      { id: 'dashlane', label: 'Dashlane', kw: ['dashlane'] },
      { id: 'authenticator', label: 'Authenticator app', short: 'Authenticator', kw: ['google authenticator', 'microsoft authenticator', 'authy', 'authenticator apps?'] },
      { id: 'nordvpn', label: 'NordVPN', kw: ['nordvpn', 'nord vpn'] },
      { id: 'expressvpn', label: 'ExpressVPN', kw: ['expressvpn', 'express vpn'] },
      { id: 'vpn', label: 'VPN app (any)', short: 'VPN', kw: ['vpn apps?', 'vpn services?', 'vpn providers?', 'free vpns?'] },
    ] },
    { name: 'Money & shopping', items: [
      { id: 'paypal', label: 'PayPal', kw: ['paypal'] },
      { id: 'venmo', label: 'Venmo', kw: ['venmo'] },
      { id: 'cashapp', label: 'Cash App', kw: ['cash app'] },
      { id: 'zelle', label: 'Zelle', kw: ['zelle'] },
      { id: 'applepay', label: 'Apple Pay', kw: ['apple pay', 'apple wallet', 'apple card'] },
      { id: 'googlepay', label: 'Google Pay / Wallet', short: 'Google Pay', kw: ['google pay', 'google wallet', 'gpay'] },
      { id: 'upi', label: 'UPI apps (PhonePe, Paytm)', short: 'UPI', kw: ['phonepe', 'paytm'], cs: ['UPI', 'BHIM'] },
      { id: 'amazon', label: 'Amazon', kw: ['amazon(?! web services| s3| aws| ec2| bedrock| cloud)'] },
      { id: 'ebay', label: 'eBay', kw: ['ebay'] },
      { id: 'walmart', label: 'Walmart', kw: ['walmart'] },
      { id: 'flipkart', label: 'Flipkart', kw: ['flipkart'] },
      { id: 'coinbase', label: 'Coinbase', kw: ['coinbase'] },
      { id: 'binance', label: 'Binance', kw: ['binance'] },
      { id: 'metamask', label: 'MetaMask', kw: ['metamask'] },
      { id: 'cryptowallet', label: 'Crypto wallet (any)', short: 'Crypto wallet', kw: ['crypto wallets?', 'cryptocurrency wallets?', 'hardware wallets?', 'seed phrases?', 'trezor'] },
    ] },
    { name: 'Banks & cards', items: [
      { id: 'chase', label: 'Chase', kw: ['jpmorgan'], cs: ['Chase'] },
      { id: 'bofa', label: 'Bank of America', kw: ['bank of america'] },
      { id: 'wellsfargo', label: 'Wells Fargo', kw: ['wells fargo'] },
      { id: 'capitalone', label: 'Capital One', kw: ['capital one'] },
      { id: 'citi', label: 'Citi', kw: ['citibank', 'citigroup'], cs: ['Citi'] },
      { id: 'amex', label: 'American Express', short: 'Amex', kw: ['american express', 'amex'] },
      { id: 'sbi', label: 'SBI', kw: ['state bank of india'], cs: ['SBI'] },
      { id: 'hdfc', label: 'HDFC Bank', short: 'HDFC', kw: ['hdfc'] },
      { id: 'icici', label: 'ICICI Bank', short: 'ICICI', kw: ['icici'] },
      { id: 'axis', label: 'Axis Bank', kw: ['axis bank'] },
      { id: 'bureaus', label: 'Credit bureaus (Equifax, Experian)', short: 'Credit bureau', kw: ['equifax', 'experian', 'transunion', 'cibil'] },
    ] },
    { name: 'Phone & internet provider', items: [
      { id: 'att', label: 'AT&T', kw: ['at&t'] },
      { id: 'verizon', label: 'Verizon', kw: ['verizon'] },
      { id: 'tmobile', label: 'T-Mobile', kw: ['t-mobile'] },
      { id: 'comcast', label: 'Xfinity / Comcast', short: 'Xfinity', kw: ['xfinity', 'comcast'] },
      { id: 'spectrum', label: 'Spectrum', kw: ['charter communications'], cs: ['Spectrum'] },
      { id: 'jio', label: 'Jio', kw: ['reliance jio'], cs: ['Jio'] },
      { id: 'airtel', label: 'Airtel', kw: ['airtel'] },
      { id: 'bsnl', label: 'BSNL', cs: ['BSNL'] },
    ] },
    { name: 'Home & smart devices', items: [
      { id: 'router', label: 'Wi-Fi router (any brand)', short: 'Router', kw: ['routers?', 'home networks?'] },
      { id: 'tplink', label: 'TP-Link', kw: ['tp-link', 'tplink', 'tapo'] },
      { id: 'netgear', label: 'Netgear', kw: ['netgear'] },
      { id: 'linksys', label: 'Linksys', kw: ['linksys'] },
      { id: 'dlink', label: 'D-Link', kw: ['d-link', 'dlink'] },
      { id: 'eero', label: 'Eero', kw: ['eero'] },
      { id: 'ring', label: 'Ring doorbell / camera', short: 'Ring', kw: ['amazon ring', 'ring doorbells?', 'ring cameras?'], cs: ['Ring[\'’]s', 'Ring (?:[Aa]pp|[Uu]sers?|[Cc]ams?|[Vv]ideo)'] },
      { id: 'alexa', label: 'Alexa / Echo', short: 'Alexa', kw: ['alexa', 'amazon echo', 'echo dot', 'echo show'] },
      { id: 'googlehome', label: 'Google Home / Nest', short: 'Google Home', kw: ['google home', 'google nest', 'nest cams?', 'nest thermostats?', 'nest doorbells?', 'nest hub'] },
      { id: 'cameras', label: 'Security camera (any brand)', short: 'Camera', kw: ['security cameras?', 'ip cameras?', 'cctv', 'baby monitors?', 'wyze', 'hikvision', 'dahua'] },
      { id: 'smarttv', label: 'Smart TV', kw: ['smart tvs?', 'android tv', 'webos', 'tizen', 'roku', 'fire tv', 'fire stick'] },
      { id: 'printer', label: 'Printer', kw: ['printers?'] },
      { id: 'nas', label: 'Home storage (Synology, QNAP)', short: 'NAS', kw: ['synology', 'qnap'], cs: ['NAS'] },
      { id: 'watch', label: 'Smartwatch / fitness band', short: 'Smartwatch', kw: ['smartwatch(?:es)?', 'apple watch', 'fitbit', 'garmin', 'wear os'] },
      { id: 'car', label: 'Connected car', short: 'Car', kw: ['connected cars?', 'car apps?', 'keyless entry', 'tesla', 'electric vehicles?', 'ev chargers?'] },
    ] },
    { name: 'Entertainment & gaming', items: [
      { id: 'netflix', label: 'Netflix', kw: ['netflix'] },
      { id: 'spotify', label: 'Spotify', kw: ['spotify'] },
      { id: 'disney', label: 'Disney+', kw: ['disney\\+', 'disney plus'], cs: ['Disney'] },
      { id: 'steam', label: 'Steam', kw: ['steam accounts?', 'steam games?'], cs: ['Steam'] },
      { id: 'playstation', label: 'PlayStation', kw: ['playstation'], cs: ['PSN', 'Sony'] },
      { id: 'xbox', label: 'Xbox', kw: ['xbox'] },
      { id: 'nintendo', label: 'Nintendo', kw: ['nintendo'] },
      { id: 'roblox', label: 'Roblox', kw: ['roblox'] },
      { id: 'epic', label: 'Fortnite / Epic Games', short: 'Epic Games', kw: ['fortnite', 'epic games'] },
      { id: 'minecraft', label: 'Minecraft', kw: ['minecraft'] },
      { id: 'twitch', label: 'Twitch', kw: ['twitch'] },
    ] },
    { name: 'AI assistants', items: [
      { id: 'chatgpt', label: 'ChatGPT', kw: ['chatgpt', 'openai'] },
      { id: 'gemini', label: 'Google Gemini', short: 'Gemini', kw: ['google gemini'], cs: ['Gemini'] },
      { id: 'copilot', label: 'Microsoft Copilot', short: 'Copilot', kw: ['copilot'] },
      { id: 'claude', label: 'Claude', kw: ['anthropic'], cs: ['Claude'] },
      { id: 'aiagents', label: 'AI agents / AI browsers', short: 'AI agents', kw: ['ai agents?', 'agentic', 'ai browsers?'] },
    ] },
    { name: 'Travel & daily services', items: [
      { id: 'uber', label: 'Uber', cs: ['Uber'] },
      { id: 'airbnb', label: 'Airbnb', kw: ['airbnb'] },
      { id: 'booking', label: 'Booking.com', kw: ['booking\\.com'] },
      { id: 'ticketmaster', label: 'Ticketmaster', kw: ['ticketmaster', 'live nation'] },
      { id: 'doordash', label: 'DoorDash', kw: ['doordash'] },
    ] },
  ],

  // Languages offered for the family alert: [code, name shown on the button]
  langs: [['en', 'English'], ['hi', 'हिन्दी'], ['gu', 'ગુજરાતી'], ['es', 'Español']],

  // Maps the threat label the news API sends to the keys used in `alerts` below
  labelKeys: {
    'Ransomware': 'ransomware',
    'Phishing & Social Engineering': 'phishing',
    'Data Breach': 'data_breach',
    'Software Vulnerability': 'vulnerability',
    'Malware': 'malware',
    'Cloud Security': 'cloud_security',
    'AI-Related Threat': 'ai_threat',
    'Identity Theft & Fraud': 'identity_theft',
    'Supply Chain Attack': 'supply_chain',
    'IoT & Hardware': 'iot_hardware',
    'Privacy Concern': 'privacy',
    'Policy & Law Enforcement': 'government_policy',
    'Cybersecurity News': 'general',
  },

  // Family alert text. Each threat type has a short name, one sentence on what it
  // means, and three tips, written for someone with no technical background.
  // The Hindi, Gujarati and Spanish text was written alongside the English and
  // should be read through by a fluent speaker before relying on it.
  alerts: {
    en: {
      ui: {
        alertTitle: "Security alert",
        intro: "I saw this in the news and wanted you to know.",
        inTheNews: "In the news",
        whatHappened: "What happened",
        whatItMeans: "What it means",
        staySafe: "How to stay safe",
        readMore: "Read more",
      },
      types: {
        ransomware: {
          name: "Ransomware",
          means: "Criminals lock a person's or company's files and demand money to unlock them.",
          tips: [
            "Keep a copy of your important photos and files on a separate drive or cloud account.",
            "Do not open attachments or links from people you do not know.",
            "Install updates on your phone and computer when they ask.",
          ],
        },
        phishing: {
          name: "Fake messages (phishing)",
          means: "Scammers send messages that look like they come from a bank, a company or someone you know, to steal your passwords or money.",
          tips: [
            "Do not click links in unexpected messages. Open the official app or website yourself.",
            "Never share an OTP, PIN or password with anyone, even if they say they are from the bank.",
            "If a message rushes or scares you, stop and call the company on its official number.",
          ],
        },
        data_breach: {
          name: "Data leak",
          means: "A company was broken into and its customers' personal details may have been stolen.",
          tips: [
            "If you have an account with this company, change that password now.",
            "Do not use the same password on other websites.",
            "Be careful with calls or messages that mention this company. Scammers use leaks to trick people.",
          ],
        },
        vulnerability: {
          name: "Software security flaw",
          means: "A weakness was found in an app or device that attackers could use to break in. An update usually fixes it.",
          tips: [
            "Update your phone, computer and apps today.",
            "Turn on automatic updates so fixes install on their own.",
            "Delete apps you no longer use.",
          ],
        },
        malware: {
          name: "Harmful software (malware)",
          means: "Harmful software is spreading that can spy on people or steal passwords and money.",
          tips: [
            "Install apps only from the official app store.",
            "Do not install anything a caller or a pop-up tells you to install.",
            "If your phone or computer starts acting strangely, ask someone you trust to check it.",
          ],
        },
        cloud_security: {
          name: "Online storage problem",
          means: "Files stored on an online service were exposed or attacked.",
          tips: [
            "Turn on two-step verification for your email and cloud accounts.",
            "Check which files and photos you are sharing with others, and stop sharing what you do not need to.",
            "Use a strong password that you do not use anywhere else.",
          ],
        },
        ai_threat: {
          name: "AI scam or threat",
          means: "Criminals are using AI to make fake voices, videos and messages that seem real.",
          tips: [
            "If a family member calls asking for money urgently, hang up and call them back on their usual number.",
            "Let's agree on a family code word that only we know.",
            "Do not trust a video or voice message just because it looks or sounds real.",
          ],
        },
        identity_theft: {
          name: "Identity theft",
          means: "Criminals use stolen personal details to open accounts or take money in someone else's name.",
          tips: [
            "Never share OTPs, card numbers or ID numbers over a call or message.",
            "Check your bank statements regularly for payments you did not make.",
            "Turn on two-step verification for banking and email.",
          ],
        },
        supply_chain: {
          name: "Attack through trusted software",
          means: "Attackers hid harmful code inside software that people already trust and use.",
          tips: [
            "Install updates only from the official app store or the company's own website.",
            "If an app you use is named in the news, update it or remove it.",
            "Remove browser extensions and apps you do not need.",
          ],
        },
        iot_hardware: {
          name: "Smart device or router risk",
          means: "Smart devices such as cameras, routers and TVs can be taken over by someone else if they are not secured.",
          tips: [
            "Change the default password on your Wi-Fi router and cameras.",
            "Install updates for your router and smart devices.",
            "Switch off features you do not use, such as remote access.",
          ],
        },
        privacy: {
          name: "Privacy concern",
          means: "Apps or companies may be collecting or sharing more personal information than people expect.",
          tips: [
            "Check which apps can use your location, camera and microphone, and switch off what is not needed.",
            "Share less personal information on social media.",
            "Think before giving your phone number or email to a new app or website.",
          ],
        },
        government_policy: {
          name: "Cyber crime and law news",
          means: "This is news about cyber crime, new rules or police action. It is good to know about, even if there is nothing you need to do.",
          tips: [
            "Report online fraud quickly to the police or the cyber crime helpline in your country.",
            "Do not pay or share details with anyone who threatens you with legal action over a call.",
            "Keep your phone and apps updated.",
          ],
        },
        general: {
          name: "Security news",
          means: "This is a security story worth knowing about.",
          tips: [
            "Keep your phone and apps updated.",
            "Use a different password for each important account.",
            "Do not open links or attachments you were not expecting.",
          ],
        },
      },
    },

    hi: {
      ui: {
        alertTitle: "सुरक्षा चेतावनी",
        intro: "यह ख़बर देखी, सोचा आपको भी बता दूँ।",
        inTheNews: "ख़बर",
        whatItMeans: "इसका मतलब",
        staySafe: "सुरक्षित कैसे रहें",
        readMore: "पूरी ख़बर",
      },
      types: {
        ransomware: {
          name: "रैनसमवेयर",
          means: "अपराधी किसी व्यक्ति या कंपनी की फ़ाइलें लॉक कर देते हैं और उन्हें खोलने के लिए पैसे माँगते हैं।",
          tips: [
            "अपनी ज़रूरी फ़ोटो और फ़ाइलों की एक कॉपी अलग ड्राइव या क्लाउड अकाउंट में रखें।",
            "अनजान लोगों के भेजे अटैचमेंट या लिंक न खोलें।",
            "फ़ोन और कंप्यूटर जब अपडेट माँगें, तो अपडेट कर लें।",
          ],
        },
        phishing: {
          name: "नक़ली मैसेज (फ़िशिंग)",
          means: "ठग ऐसे मैसेज भेजते हैं जो बैंक, किसी कंपनी या जान-पहचान वाले की तरफ़ से आए लगते हैं, ताकि आपका पासवर्ड या पैसा चुरा सकें।",
          tips: [
            "अचानक आए मैसेज के लिंक पर क्लिक न करें। असली ऐप या वेबसाइट ख़ुद खोलें।",
            "OTP, PIN या पासवर्ड किसी को न बताएँ, चाहे वह ख़ुद को बैंक का कर्मचारी ही क्यों न बताए।",
            "अगर मैसेज जल्दबाज़ी करवाए या डराए, तो रुकें और कंपनी के आधिकारिक नंबर पर फ़ोन करें।",
          ],
        },
        data_breach: {
          name: "डेटा लीक",
          means: "किसी कंपनी के सिस्टम में सेंध लगी है और उसके ग्राहकों की निजी जानकारी चोरी हुई हो सकती है।",
          tips: [
            "अगर इस कंपनी में आपका अकाउंट है, तो उसका पासवर्ड अभी बदल दें।",
            "एक ही पासवर्ड दूसरी वेबसाइटों पर इस्तेमाल न करें।",
            "इस कंपनी के नाम से आने वाले फ़ोन या मैसेज से सावधान रहें। ठग ऐसे लीक का फ़ायदा उठाते हैं।",
          ],
        },
        vulnerability: {
          name: "सॉफ़्टवेयर की सुरक्षा ख़ामी",
          means: "किसी ऐप या डिवाइस में ऐसी कमज़ोरी मिली है जिससे हमलावर अंदर घुस सकते हैं। आम तौर पर अपडेट से यह ठीक हो जाती है।",
          tips: [
            "अपना फ़ोन, कंप्यूटर और ऐप आज ही अपडेट करें।",
            "ऑटोमैटिक अपडेट चालू रखें ताकि सुधार अपने-आप इंस्टॉल हो जाएँ।",
            "जो ऐप अब इस्तेमाल नहीं करते, उन्हें हटा दें।",
          ],
        },
        malware: {
          name: "हानिकारक सॉफ़्टवेयर (मैलवेयर)",
          means: "ऐसा हानिकारक सॉफ़्टवेयर फैल रहा है जो लोगों की जासूसी कर सकता है या पासवर्ड और पैसे चुरा सकता है।",
          tips: [
            "ऐप सिर्फ़ आधिकारिक ऐप स्टोर से ही इंस्टॉल करें।",
            "किसी फ़ोन करने वाले या पॉप-अप के कहने पर कुछ भी इंस्टॉल न करें।",
            "अगर फ़ोन या कंप्यूटर अजीब तरह से चलने लगे, तो किसी भरोसेमंद व्यक्ति से जाँच करवाएँ।",
          ],
        },
        cloud_security: {
          name: "ऑनलाइन स्टोरेज की समस्या",
          means: "किसी ऑनलाइन सेवा पर रखी फ़ाइलें उजागर हो गईं या उन पर हमला हुआ है।",
          tips: [
            "ईमेल और क्लाउड अकाउंट के लिए टू-स्टेप वेरिफ़िकेशन चालू करें।",
            "देखें कि आप कौन-सी फ़ाइलें और फ़ोटो दूसरों के साथ शेयर कर रहे हैं, और जो ज़रूरी नहीं उन्हें शेयर करना बंद करें।",
            "ऐसा मज़बूत पासवर्ड रखें जो आप कहीं और इस्तेमाल न करते हों।",
          ],
        },
        ai_threat: {
          name: "AI से जुड़ा धोखा या ख़तरा",
          means: "अपराधी AI की मदद से नक़ली आवाज़, वीडियो और मैसेज बना रहे हैं जो असली लगते हैं।",
          tips: [
            "अगर परिवार का कोई सदस्य फ़ोन पर तुरंत पैसे माँगे, तो फ़ोन काटकर उनके अपने नंबर पर ख़ुद फ़ोन करें।",
            "परिवार में एक गुप्त शब्द तय कर लें जो सिर्फ़ हमें पता हो।",
            "कोई वीडियो या आवाज़ असली लगे, सिर्फ़ इसलिए उस पर भरोसा न करें।",
          ],
        },
        identity_theft: {
          name: "पहचान की चोरी",
          means: "अपराधी चोरी की गई निजी जानकारी से किसी और के नाम पर अकाउंट खोलते हैं या पैसे निकालते हैं।",
          tips: [
            "फ़ोन या मैसेज पर OTP, कार्ड नंबर या पहचान पत्र के नंबर कभी न बताएँ।",
            "अपने बैंक स्टेटमेंट नियमित रूप से देखें कि कोई अनजान भुगतान तो नहीं हुआ।",
            "बैंकिंग और ईमेल के लिए टू-स्टेप वेरिफ़िकेशन चालू करें।",
          ],
        },
        supply_chain: {
          name: "भरोसेमंद सॉफ़्टवेयर के ज़रिए हमला",
          means: "हमलावरों ने ऐसे सॉफ़्टवेयर के अंदर हानिकारक कोड छिपा दिया जिस पर लोग पहले से भरोसा करते हैं।",
          tips: [
            "अपडेट सिर्फ़ आधिकारिक ऐप स्टोर या कंपनी की अपनी वेबसाइट से ही इंस्टॉल करें।",
            "अगर ख़बर में आपके किसी ऐप का नाम है, तो उसे अपडेट करें या हटा दें।",
            "जिन ब्राउज़र एक्सटेंशन और ऐप की ज़रूरत नहीं, उन्हें हटा दें।",
          ],
        },
        iot_hardware: {
          name: "स्मार्ट डिवाइस या राउटर का ख़तरा",
          means: "कैमरा, राउटर और टीवी जैसे स्मार्ट डिवाइस सुरक्षित न हों तो कोई और उन पर क़ब्ज़ा कर सकता है।",
          tips: [
            "अपने वाई-फ़ाई राउटर और कैमरों का डिफ़ॉल्ट पासवर्ड बदलें।",
            "राउटर और स्मार्ट डिवाइस के अपडेट इंस्टॉल करें।",
            "जो सुविधाएँ इस्तेमाल नहीं करते, जैसे रिमोट एक्सेस, उन्हें बंद कर दें।",
          ],
        },
        privacy: {
          name: "निजता की चिंता",
          means: "ऐप या कंपनियाँ लोगों की उम्मीद से ज़्यादा निजी जानकारी इकट्ठा या शेयर कर रही हो सकती हैं।",
          tips: [
            "देखें कि कौन-से ऐप आपकी लोकेशन, कैमरा और माइक्रोफ़ोन इस्तेमाल कर सकते हैं, और जो ज़रूरी नहीं उसे बंद कर दें।",
            "सोशल मीडिया पर निजी जानकारी कम शेयर करें।",
            "किसी नए ऐप या वेबसाइट को अपना फ़ोन नंबर या ईमेल देने से पहले सोचें।",
          ],
        },
        government_policy: {
          name: "साइबर अपराध और क़ानून की ख़बर",
          means: "यह साइबर अपराध, नए नियमों या पुलिस कार्रवाई की ख़बर है। जानकारी रखना अच्छा है, भले ही आपको कुछ करने की ज़रूरत न हो।",
          tips: [
            "ऑनलाइन धोखाधड़ी की शिकायत तुरंत पुलिस या अपने देश की साइबर क्राइम हेल्पलाइन पर करें।",
            "फ़ोन पर क़ानूनी कार्रवाई की धमकी देने वाले किसी व्यक्ति को पैसे या जानकारी न दें।",
            "अपना फ़ोन और ऐप अपडेट रखें।",
          ],
        },
        general: {
          name: "सुरक्षा समाचार",
          means: "यह सुरक्षा से जुड़ी एक ख़बर है जिसके बारे में जानना अच्छा है।",
          tips: [
            "अपना फ़ोन और ऐप अपडेट रखें।",
            "हर ज़रूरी अकाउंट के लिए अलग पासवर्ड रखें।",
            "ऐसे लिंक या अटैचमेंट न खोलें जिनकी आपको उम्मीद नहीं थी।",
          ],
        },
      },
    },

    gu: {
      ui: {
        alertTitle: "સુરક્ષા ચેતવણી",
        intro: "આ સમાચાર જોયા, થયું તમને પણ જણાવી દઉં.",
        inTheNews: "સમાચાર",
        whatItMeans: "આનો અર્થ",
        staySafe: "સુરક્ષિત કેવી રીતે રહેવું",
        readMore: "પૂરા સમાચાર",
      },
      types: {
        ransomware: {
          name: "રેન્સમવેર",
          means: "ગુનેગારો કોઈ વ્યક્તિ કે કંપનીની ફાઇલો લૉક કરી દે છે અને તેને ખોલવા માટે પૈસા માગે છે.",
          tips: [
            "તમારા મહત્વના ફોટા અને ફાઇલોની એક નકલ અલગ ડ્રાઇવ કે ક્લાઉડ એકાઉન્ટમાં રાખો.",
            "અજાણ્યા લોકોએ મોકલેલા અટેચમેન્ટ કે લિંક ખોલશો નહીં.",
            "ફોન અને કમ્પ્યુટર અપડેટ માગે ત્યારે અપડેટ કરી લો.",
          ],
        },
        phishing: {
          name: "નકલી મેસેજ (ફિશિંગ)",
          means: "ઠગ એવા મેસેજ મોકલે છે જે બેંક, કોઈ કંપની કે ઓળખીતા તરફથી આવ્યા હોય એવા લાગે, જેથી તમારો પાસવર્ડ કે પૈસા ચોરી શકે.",
          tips: [
            "અચાનક આવેલા મેસેજની લિંક પર ક્લિક ન કરો. અસલી ઍપ કે વેબસાઇટ જાતે ખોલો.",
            "OTP, PIN કે પાસવર્ડ કોઈને ન આપો, ભલે તે પોતાને બેંકનો કર્મચારી કહે.",
            "મેસેજ ઉતાવળ કરાવે કે ડરાવે તો થોભો અને કંપનીના સત્તાવાર નંબર પર ફોન કરો.",
          ],
        },
        data_breach: {
          name: "ડેટા લીક",
          means: "કોઈ કંપનીની સિસ્ટમમાં ઘૂસણખોરી થઈ છે અને તેના ગ્રાહકોની અંગત માહિતી ચોરાઈ હોઈ શકે છે.",
          tips: [
            "જો આ કંપનીમાં તમારું એકાઉન્ટ હોય, તો તેનો પાસવર્ડ હમણાં જ બદલી નાખો.",
            "એક જ પાસવર્ડ બીજી વેબસાઇટો પર વાપરશો નહીં.",
            "આ કંપનીના નામે આવતા ફોન કે મેસેજથી સાવધાન રહો. ઠગ આવા લીકનો લાભ લે છે.",
          ],
        },
        vulnerability: {
          name: "સૉફ્ટવેરની સુરક્ષા ખામી",
          means: "કોઈ ઍપ કે ડિવાઇસમાં એવી નબળાઈ મળી છે જેનાથી હુમલાખોરો અંદર ઘૂસી શકે. સામાન્ય રીતે અપડેટથી તે સુધરી જાય છે.",
          tips: [
            "તમારો ફોન, કમ્પ્યુટર અને ઍપ આજે જ અપડેટ કરો.",
            "ઑટોમેટિક અપડેટ ચાલુ રાખો જેથી સુધારા આપોઆપ ઇન્સ્ટૉલ થાય.",
            "જે ઍપ હવે વાપરતા નથી તે કાઢી નાખો.",
          ],
        },
        malware: {
          name: "હાનિકારક સૉફ્ટવેર (માલવેર)",
          means: "એવું હાનિકારક સૉફ્ટવેર ફેલાઈ રહ્યું છે જે લોકોની જાસૂસી કરી શકે અથવા પાસવર્ડ અને પૈસા ચોરી શકે.",
          tips: [
            "ઍપ ફક્ત સત્તાવાર ઍપ સ્ટોરમાંથી જ ઇન્સ્ટૉલ કરો.",
            "કોઈ ફોન કરનાર કે પૉપ-અપ કહે તેથી કંઈ પણ ઇન્સ્ટૉલ ન કરો.",
            "ફોન કે કમ્પ્યુટર વિચિત્ર રીતે ચાલવા લાગે તો કોઈ ભરોસાપાત્ર વ્યક્તિ પાસે તપાસ કરાવો.",
          ],
        },
        cloud_security: {
          name: "ઑનલાઇન સ્ટોરેજની સમસ્યા",
          means: "કોઈ ઑનલાઇન સેવા પર રાખેલી ફાઇલો ખુલ્લી પડી ગઈ અથવા તેના પર હુમલો થયો છે.",
          tips: [
            "ઈમેલ અને ક્લાઉડ એકાઉન્ટ માટે ટુ-સ્ટેપ વેરિફિકેશન ચાલુ કરો.",
            "તમે કઈ ફાઇલો અને ફોટા બીજા સાથે શેર કરો છો તે તપાસો, અને જે જરૂરી નથી તે શેર કરવાનું બંધ કરો.",
            "એવો મજબૂત પાસવર્ડ રાખો જે તમે બીજે ક્યાંય વાપરતા ન હો.",
          ],
        },
        ai_threat: {
          name: "AI સંબંધિત છેતરપિંડી કે જોખમ",
          means: "ગુનેગારો AIની મદદથી નકલી અવાજ, વીડિયો અને મેસેજ બનાવે છે જે અસલી લાગે છે.",
          tips: [
            "પરિવારનો કોઈ સભ્ય ફોન પર તાત્કાલિક પૈસા માગે, તો ફોન કાપીને તેમના પોતાના નંબર પર જાતે ફોન કરો.",
            "પરિવારમાં એક ગુપ્ત શબ્દ નક્કી કરી લો જે ફક્ત આપણને ખબર હોય.",
            "કોઈ વીડિયો કે અવાજ અસલી લાગે એટલા માટે જ તેના પર ભરોસો ન કરો.",
          ],
        },
        identity_theft: {
          name: "ઓળખની ચોરી",
          means: "ગુનેગારો ચોરેલી અંગત માહિતીથી બીજાના નામે એકાઉન્ટ ખોલે છે અથવા પૈસા ઉપાડે છે.",
          tips: [
            "ફોન કે મેસેજ પર OTP, કાર્ડ નંબર કે ઓળખપત્રના નંબર ક્યારેય ન આપો.",
            "તમારા બેંક સ્ટેટમેન્ટ નિયમિત તપાસો કે કોઈ અજાણી ચુકવણી તો નથી થઈ.",
            "બેંકિંગ અને ઈમેલ માટે ટુ-સ્ટેપ વેરિફિકેશન ચાલુ કરો.",
          ],
        },
        supply_chain: {
          name: "ભરોસાપાત્ર સૉફ્ટવેર દ્વારા હુમલો",
          means: "હુમલાખોરોએ એવા સૉફ્ટવેરની અંદર હાનિકારક કોડ છુપાવ્યો જેના પર લોકો પહેલેથી ભરોસો કરે છે.",
          tips: [
            "અપડેટ ફક્ત સત્તાવાર ઍપ સ્ટોર કે કંપનીની પોતાની વેબસાઇટ પરથી જ ઇન્સ્ટૉલ કરો.",
            "સમાચારમાં તમારી કોઈ ઍપનું નામ હોય, તો તેને અપડેટ કરો અથવા કાઢી નાખો.",
            "જે બ્રાઉઝર એક્સટેન્શન અને ઍપની જરૂર નથી તે કાઢી નાખો.",
          ],
        },
        iot_hardware: {
          name: "સ્માર્ટ ડિવાઇસ કે રાઉટરનું જોખમ",
          means: "કેમેરા, રાઉટર અને ટીવી જેવા સ્માર્ટ ડિવાઇસ સુરક્ષિત ન હોય તો કોઈ બીજું તેનો કબજો લઈ શકે.",
          tips: [
            "તમારા વાઇ-ફાઇ રાઉટર અને કેમેરાનો ડિફૉલ્ટ પાસવર્ડ બદલો.",
            "રાઉટર અને સ્માર્ટ ડિવાઇસના અપડેટ ઇન્સ્ટૉલ કરો.",
            "જે સુવિધાઓ વાપરતા નથી, જેમ કે રિમોટ ઍક્સેસ, તે બંધ કરી દો.",
          ],
        },
        privacy: {
          name: "ગોપનીયતાની ચિંતા",
          means: "ઍપ કે કંપનીઓ લોકોની ધારણા કરતાં વધુ અંગત માહિતી ભેગી કરતી કે શેર કરતી હોઈ શકે.",
          tips: [
            "કઈ ઍપ તમારું લોકેશન, કેમેરા અને માઇક્રોફોન વાપરી શકે છે તે તપાસો, અને જે જરૂરી નથી તે બંધ કરો.",
            "સોશિયલ મીડિયા પર અંગત માહિતી ઓછી શેર કરો.",
            "કોઈ નવી ઍપ કે વેબસાઇટને તમારો ફોન નંબર કે ઈમેલ આપતાં પહેલાં વિચારો.",
          ],
        },
        government_policy: {
          name: "સાયબર ગુના અને કાયદાના સમાચાર",
          means: "આ સાયબર ગુના, નવા નિયમો કે પોલીસ કાર્યવાહીના સમાચાર છે. તમારે કંઈ કરવાની જરૂર ન હોય તો પણ જાણકારી રાખવી સારી.",
          tips: [
            "ઑનલાઇન છેતરપિંડીની ફરિયાદ તરત પોલીસ કે તમારા દેશની સાયબર ક્રાઇમ હેલ્પલાઇન પર કરો.",
            "ફોન પર કાનૂની કાર્યવાહીની ધમકી આપનાર કોઈને પૈસા કે માહિતી ન આપો.",
            "તમારો ફોન અને ઍપ અપડેટ રાખો.",
          ],
        },
        general: {
          name: "સુરક્ષા સમાચાર",
          means: "આ સુરક્ષાને લગતા એક સમાચાર છે જેના વિશે જાણવું સારું.",
          tips: [
            "તમારો ફોન અને ઍપ અપડેટ રાખો.",
            "દરેક મહત્વના એકાઉન્ટ માટે અલગ પાસવર્ડ રાખો.",
            "જેની તમને અપેક્ષા ન હોય એવી લિંક કે અટેચમેન્ટ ખોલશો નહીં.",
          ],
        },
      },
    },

    es: {
      ui: {
        alertTitle: "Alerta de seguridad",
        intro: "Vi esta noticia y quería que lo supieras.",
        inTheNews: "En las noticias",
        whatItMeans: "Qué significa",
        staySafe: "Cómo protegerte",
        readMore: "Leer más",
      },
      types: {
        ransomware: {
          name: "Ransomware",
          means: "Los delincuentes bloquean los archivos de una persona o empresa y exigen dinero para desbloquearlos.",
          tips: [
            "Guarda una copia de tus fotos y archivos importantes en otro disco o en una cuenta en la nube.",
            "No abras archivos adjuntos ni enlaces de personas que no conoces.",
            "Instala las actualizaciones del teléfono y la computadora cuando te las pidan.",
          ],
        },
        phishing: {
          name: "Mensajes falsos (phishing)",
          means: "Los estafadores envían mensajes que parecen venir de un banco, una empresa o alguien conocido para robar tus contraseñas o tu dinero.",
          tips: [
            "No hagas clic en enlaces de mensajes inesperados. Abre por tu cuenta la aplicación o el sitio web oficial.",
            "Nunca compartas un código de verificación, PIN o contraseña con nadie, aunque diga que llama del banco.",
            "Si un mensaje te mete prisa o te asusta, detente y llama a la empresa a su número oficial.",
          ],
        },
        data_breach: {
          name: "Filtración de datos",
          means: "Entraron sin permiso a los sistemas de una empresa y es posible que hayan robado datos personales de sus clientes.",
          tips: [
            "Si tienes una cuenta en esta empresa, cambia esa contraseña ahora.",
            "No uses la misma contraseña en otros sitios web.",
            "Ten cuidado con llamadas o mensajes que mencionen a esta empresa. Los estafadores aprovechan las filtraciones para engañar.",
          ],
        },
        vulnerability: {
          name: "Falla de seguridad en un programa",
          means: "Se encontró una debilidad en una aplicación o dispositivo que los atacantes podrían usar para entrar. Normalmente una actualización la corrige.",
          tips: [
            "Actualiza hoy tu teléfono, tu computadora y tus aplicaciones.",
            "Activa las actualizaciones automáticas para que las correcciones se instalen solas.",
            "Elimina las aplicaciones que ya no usas.",
          ],
        },
        malware: {
          name: "Programa dañino (malware)",
          means: "Se está difundiendo un programa dañino que puede espiar a las personas o robar contraseñas y dinero.",
          tips: [
            "Instala aplicaciones solo desde la tienda oficial.",
            "No instales nada que te pida alguien por teléfono o una ventana emergente.",
            "Si tu teléfono o computadora empieza a comportarse de forma extraña, pide a alguien de confianza que lo revise.",
          ],
        },
        cloud_security: {
          name: "Problema con el almacenamiento en línea",
          means: "Archivos guardados en un servicio en línea quedaron expuestos o fueron atacados.",
          tips: [
            "Activa la verificación en dos pasos en tu correo y tus cuentas en la nube.",
            "Revisa qué archivos y fotos compartes con otras personas y deja de compartir lo que no haga falta.",
            "Usa una contraseña fuerte que no uses en ningún otro lugar.",
          ],
        },
        ai_threat: {
          name: "Estafa o amenaza con IA",
          means: "Los delincuentes usan inteligencia artificial para crear voces, videos y mensajes falsos que parecen reales.",
          tips: [
            "Si un familiar llama pidiendo dinero con urgencia, cuelga y llámalo a su número de siempre.",
            "Acordemos una palabra clave familiar que solo nosotros sepamos.",
            "No confíes en un video o mensaje de voz solo porque parece real.",
          ],
        },
        identity_theft: {
          name: "Robo de identidad",
          means: "Los delincuentes usan datos personales robados para abrir cuentas o sacar dinero a nombre de otra persona.",
          tips: [
            "Nunca compartas códigos de verificación, números de tarjeta o de documentos por llamada o mensaje.",
            "Revisa con frecuencia los movimientos de tu banco para detectar pagos que no hiciste.",
            "Activa la verificación en dos pasos en tu banco y tu correo.",
          ],
        },
        supply_chain: {
          name: "Ataque a través de programas de confianza",
          means: "Los atacantes escondieron código dañino dentro de programas que la gente ya usa y en los que confía.",
          tips: [
            "Instala actualizaciones solo desde la tienda oficial o el sitio web de la propia empresa.",
            "Si una aplicación que usas aparece en la noticia, actualízala o elimínala.",
            "Elimina las extensiones del navegador y las aplicaciones que no necesitas.",
          ],
        },
        iot_hardware: {
          name: "Riesgo en dispositivos inteligentes o el router",
          means: "Los dispositivos inteligentes, como cámaras, routers y televisores, pueden ser controlados por otra persona si no están protegidos.",
          tips: [
            "Cambia la contraseña de fábrica de tu router wifi y de tus cámaras.",
            "Instala las actualizaciones del router y de los dispositivos inteligentes.",
            "Desactiva las funciones que no usas, como el acceso remoto.",
          ],
        },
        privacy: {
          name: "Preocupación de privacidad",
          means: "Algunas aplicaciones o empresas pueden estar recopilando o compartiendo más información personal de la que la gente espera.",
          tips: [
            "Revisa qué aplicaciones pueden usar tu ubicación, cámara y micrófono, y desactiva lo que no haga falta.",
            "Comparte menos información personal en redes sociales.",
            "Piénsalo antes de dar tu número de teléfono o tu correo a una aplicación o sitio web nuevo.",
          ],
        },
        government_policy: {
          name: "Noticias sobre delitos informáticos y leyes",
          means: "Es una noticia sobre delitos informáticos, nuevas normas o acciones de la policía. Conviene estar al tanto, aunque no tengas que hacer nada.",
          tips: [
            "Denuncia rápido cualquier fraude en línea a la policía o a la línea de ayuda contra delitos informáticos de tu país.",
            "No pagues ni des datos a nadie que te amenace por teléfono con acciones legales.",
            "Mantén actualizados tu teléfono y tus aplicaciones.",
          ],
        },
        general: {
          name: "Noticia de seguridad",
          means: "Es una noticia de seguridad que vale la pena conocer.",
          tips: [
            "Mantén actualizados tu teléfono y tus aplicaciones.",
            "Usa una contraseña distinta para cada cuenta importante.",
            "No abras enlaces ni archivos adjuntos que no esperabas.",
          ],
        },
      },
    },
  },
};
