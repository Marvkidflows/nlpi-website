// ─── Navigation Links ─────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Home',       to: '/' },
  { label: 'About',      to: '/about' },
  { label: 'Mission',    to: '/mission' },
  { label: 'Recipients', to: '/recipients' },
  { label: 'Partners',   to: '/partners' },
  { label: 'Media',      to: '/media' },
  { label: 'News',       to: '/news' },
  { label: 'Contact',    to: '/contact' },
]

// ─── Impact Stats (icons injected in component via react-icons) ───────────────
export const STATS = [
  { num: 1000,  suffix: '+', label: 'Target Recipients',  iconKey: 'wheelchair' },
  { num: 6,     suffix: '',  label: 'Continents',         iconKey: 'globe'      },
  { num: 50,    suffix: '+', label: 'Countries',          iconKey: 'flag'       },
  { num: 2543,  suffix: '',  label: 'Lives Impacted',     iconKey: 'heart'      },
]

// ─── Recipient Stories — using YOUR real images ───────────────────────────────
export const STORIES = [
  {
    id: 1,
    name: 'Ahmed',
    country: 'Nigeria',
    flag: '🇳🇬',
    imgKey: 'leg1',
    story: 'After losing his leg in an accident, Ahmed believed life was over. With an advanced microprocessor knee from NLPI, today he walks again and runs his own business.',
    progress: 92,
  },
  {
    id: 2,
    name: 'Marcus',
    country: 'India',
    flag: '🇮🇳',
    imgKey: 'leg6',
    story: 'Marcus lost his limb during a workplace accident. NLPI gave him the gift of independent movement and restored his confidence to provide for his family.',
    progress: 85,
  },
  {
    id: 3,
    name: 'James',
    country: 'Vietnam',
    flag: '🇻🇳',
    imgKey: 'leg2',
    story: 'A farmer who survived a serious injury, James now walks his fields again. His family calls the NLPI prosthetic knee a miracle of modern technology.',
    progress: 78,
  },
  {
    id: 4,
    name: 'Samuel',
    country: 'Kenya',
    flag: '🇰🇪',
    imgKey: 'leg3',
    story: 'Samuel lost his leg in a road accident at 19. With NLPI support he now coaches football and inspires an entire generation of young people.',
    progress: 95,
  },
  {
    id: 5,
    name: 'David',
    country: 'Colombia',
    flag: '🇨🇴',
    imgKey: 'leg4',
    story: 'David was told he would never walk properly again. Six months after his NLPI fitting, he walked his daughter down the aisle at her wedding.',
    progress: 88,
  },
  {
    id: 6,
    name: 'Emmanuel',
    country: 'Philippines',
    flag: '🇵🇭',
    imgKey: 'leg5',
    story: 'Emmanuel walked his children to school for the first time three months after receiving his advanced prosthetic knee through the NLPI programme.',
    progress: 80,
  },
]

// ─── How To Help ──────────────────────────────────────────────────────────────
export const HELP_OPTIONS = [
  {
    iconKey: 'donate',
    title: 'Donate',
    desc: 'Help fund prosthetic support for those who need it most.',
    cta: 'Give Now',
    link: '/donate',
  },
  {
    iconKey: 'sponsor',
    title: 'Sponsor a Recipient',
    desc: "Support one person's entire journey to mobility directly.",
    cta: 'Sponsor',
    link: '/donate',
  },
  {
    iconKey: 'partner',
    title: 'Partner With Us',
    desc: 'Hospitals, NGOs, and corporations can join our global network.',
    cta: 'Partner',
    link: '/partners',
  },
  {
    iconKey: 'share',
    title: 'Share Mission',
    desc: 'Spread awareness and bring hope to more people worldwide.',
    cta: 'Share',
    link: '/contact',
  },
]

// ─── Partners ─────────────────────────────────────────────────────────────────
export const PARTNERS = [
  { name: 'Ottobock',      type: 'Hospital',  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Ottobock_Logo.svg/320px-Ottobock_Logo.svg.png' },
  { name: 'Hanger Clinic', type: 'Hospital',  logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Hanger_Inc_logo.svg/320px-Hanger_Inc_logo.svg.png' },
  { name: 'Össur',         type: 'NGO',       logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Ossur-logo.svg/320px-Ossur-logo.svg.png' },
  { name: 'Red Cross',     type: 'NGO',       logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Flag_of_the_Red_Cross.svg/240px-Flag_of_the_Red_Cross.svg.png' },
  { name: 'Rotary',        type: 'Corporate', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Rotary_International_logo.svg/320px-Rotary_International_logo.svg.png' },
  { name: 'CBM',           type: 'NGO',       logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/CBM_logo.svg/320px-CBM_logo.svg.png' },
]

// ─── News ─────────────────────────────────────────────────────────────────────
export const NEWS = [
  {
    date: 'May 12, 2025',
    title: "Ahmed's New Journey of Hope and Strength",
    category: 'Story',
    imgKey: 'leg1',
    excerpt: 'Read how one man rebuilt his life from the ground up after receiving his microprocessor prosthetic knee through NLPI.',
  },
  {
    date: 'Apr 28, 2025',
    title: 'NLPI Expands to 15 New Countries',
    category: 'News',
    imgKey: 'leg2',
    excerpt: 'Our global footprint grows as we sign new partnerships with hospitals across Africa and South-East Asia.',
  },
  {
    date: 'Apr 10, 2025',
    title: 'Rehabilitation Camp in Kenya',
    category: 'Event',
    imgKey: 'leg3',
    excerpt: 'Over 60 recipients received fittings and physiotherapy at our Nairobi camp this spring.',
  },
  {
    date: 'Mar 22, 2025',
    title: '500 Lives Transformed This Year',
    category: 'Impact',
    imgKey: 'leg4',
    excerpt: 'Reaching the 500-recipient milestone, NLPI looks ahead to its boldest year of humanitarian impact yet.',
  },
]

// ─── Donation Tiers ───────────────────────────────────────────────────────────
export const DONATION_TIERS = [
  { amount: 100,  label: 'Supporter',    desc: 'Covers a prosthetic evaluation' },
  { amount: 250,  label: 'Sponsor',      desc: 'Supports a patient for a month' },
  { amount: 500,  label: 'Champion',     desc: 'Funds custom fitting' },
  { amount: 1000, label: 'Life Changer', desc: 'Transforms a life forever' },
  { amount: 5000, label: 'Visionary',    desc: 'Funds one advanced prosthetic knee' },
]

// ─── FAQ ──────────────────────────────────────────────────────────────────────
export const FAQ = [
  { q: 'Who qualifies for NLPI support?',         a: 'Any amputee in financial need across our 50+ partner countries. Priority is given to those with below- or above-knee amputation who lack access to advanced prosthetics.' },
  { q: 'How are donations used?',                 a: '85% goes directly to prosthetic procurement and fitting. 10% funds operational logistics and 5% supports administration and transparency reporting.' },
  { q: 'How long does the application process take?', a: 'Applications are reviewed within 4–6 weeks. Approved candidates are matched with a partner clinic and fitted within 3 months.' },
  { q: 'Can corporations become partners?',       a: 'Yes. Corporate partners can co-fund recipients, sponsor campaigns, or donate equipment through our structured partnership programme.' },
  { q: 'Is NLPI a registered foundation?',        a: 'Yes. NLPI is a registered humanitarian foundation operating under international nonprofit regulations with full financial transparency.' },
]

// ─── Map Markers ──────────────────────────────────────────────────────────────
export const MAP_MARKERS = [
  { lat: 6.5,   lng: 3.4,   country: 'Nigeria',     recipients: 142 },
  { lat: -1.3,  lng: 36.8,  country: 'Kenya',       recipients: 98  },
  { lat: 28.6,  lng: 77.2,  country: 'India',       recipients: 210 },
  { lat: 10.8,  lng: 106.7, country: 'Vietnam',     recipients: 87  },
  { lat: 4.7,   lng: -74.1, country: 'Colombia',    recipients: 65  },
  { lat: 14.6,  lng: 120.9, country: 'Philippines', recipients: 55  },
  { lat: 51.5,  lng: -0.1,  country: 'UK',          recipients: 30  },
  { lat: 40.7,  lng: -74.0, country: 'USA',         recipients: 48  },
  { lat: -33.9, lng: 151.2, country: 'Australia',   recipients: 22  },
  { lat: -23.5, lng: -46.6, country: 'Brazil',      recipients: 43  },
]
