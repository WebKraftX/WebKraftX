import React from 'react';
import {
  Layout,
  ShoppingBag,
  TrendingUp,
  Search,
  Target,
  Share2,
  Video,
  Sparkles,
  Palette,
} from 'lucide-react';

/* ========================================================
   1. TYPES FOR INDIVIDUAL SERVICE DETAIL PAGES & 9 URLS
   ======================================================== */
export interface ServiceDeliverable {
  title: string;
  description: string;
  iconName: string;
}

export interface ServiceExecutionStep {
  step: string;
  phase: string;
  title: string;
  description: string;
}

export interface ServiceOutcome {
  metric: string;
  label: string;
  description: string;
}

export interface ServiceData {
  id: string; // URL slug: e.g. 'web-design', 'ecommerce', 'seo'
  title: string;
  shortTitle: string;
  accentWord: string;
  divisionId: 'design' | 'growth' | 'content';
  divisionNumber: string;
  divisionTitle: string;
  iconName: string;
  oneLiner: string;
  heroDescription: string;
  breadcrumbLabel: string;
  whatsIncluded: ServiceDeliverable[];
  howWeExecute: ServiceExecutionStep[];
  whoItsFor: string[];
  outcomes: ServiceOutcome[];
  relatedServiceIds: string[];
}

export interface DivisionCategory {
  id: 'design' | 'growth' | 'content';
  number: string;
  title: string;
  tagline: string;
  serviceIds: string[];
}

export const DIVISIONS_LIST: DivisionCategory[] = [
  {
    id: 'design',
    number: '01',
    title: 'Design & Engineering',
    tagline: 'Websites and mobile apps built to engage and convert.',
    serviceIds: ['web-design', 'mobile-app-dev'],
  },
  {
    id: 'growth',
    number: '02',
    title: 'Growth & Reach',
    tagline: 'Search dominance, paid ad acquisition, and active social presence.',
    serviceIds: ['seo', 'paid-ads', 'social-media'],
  },
  {
    id: 'content',
    number: '03',
    title: 'Content & Branding',
    tagline: 'Content that stops the scroll and builds recognizable brand identity.',
    serviceIds: ['content-creation', 'brand-marketing'],
  },
];

export const SERVICES_MAP: Record<string, ServiceData> = {
  'web-design': {
    id: 'web-design',
    title: 'Website Design & Development',
    shortTitle: 'Web Design & Dev',
    accentWord: 'Engineered',
    divisionId: 'design',
    divisionNumber: '01',
    divisionTitle: 'Design & Development',
    iconName: 'Layout',
    oneLiner: 'Professional websites and landing pages for your business.',
    heroDescription:
      'We combine conversion-focused UI design in Figma with clean, modular frontend engineering. Every site is custom-built with sub-second page loads, headless CMS integration, and rigorous cross-device QA.',
    breadcrumbLabel: 'Web Design & Development',
    whatsIncluded: [
      {
        title: 'Bespoke UI Design in Figma',
        description: 'Complete high-fidelity design system tailored to your brand, including responsive layouts, interactions, and design tokens.',
        iconName: 'Palette',
      },
      {
        title: 'Modern Next.js / React Build',
        description: 'Blazing-fast frontend engineering using component-driven architecture with zero unnecessary plugin bloat.',
        iconName: 'Code',
      },
      {
        title: 'Headless CMS Integration',
        description: 'Empower your marketing team to edit copy, publish blog posts, and update media effortlessly without touching code.',
        iconName: 'FileText',
      },
      {
        title: 'Core Web Vitals & Speed Optimization',
        description: 'Sub-400ms First Contentful Paint, optimized asset delivery, lazy-loading, and perfect mobile responsiveness.',
        iconName: 'Zap',
      },
      {
        title: 'On-Page Technical SEO & Analytics',
        description: 'Semantic HTML5 structure, OpenGraph cards, schema markup, and GA4 event tracking configured out-of-the-box.',
        iconName: 'Search',
      },
      {
        title: 'Launch QA & 30-Day Post-Launch Care',
        description: 'Full cross-browser testing across iOS, Android, macOS, and Windows with 30 days of direct developer support.',
        iconName: 'ShieldCheck',
      },
    ],
    howWeExecute: [
      {
        step: '01',
        phase: 'Discover',
        title: 'Architecture & Sitemap Blueprint',
        description: 'We audit your business objectives, map user journeys, and establish a clear page-by-page information architecture.',
      },
      {
        step: '02',
        phase: 'Design',
        title: 'Interactive Figma Prototypes',
        description: 'We craft high-fidelity desktop and mobile wireframes and interactive prototypes for your review and approval.',
      },
      {
        step: '03',
        phase: 'Build',
        title: 'Modular Codebase Engineering',
        description: 'We translate approved designs into production React code with responsive styling, smooth micro-interactions, and CMS wiring.',
      },
      {
        step: '04',
        phase: 'Deploy',
        title: 'Speed QA & Domain Launch',
        description: 'Rigorous speed audits, SEO indexing validation, domain DNS setup, and zero-downtime deployment on modern edge hosting.',
      },
    ],
    whoItsFor: [
      'You are launching a new company and need an authoritative digital flagbearer that builds immediate trust.',
      'Your existing website feels sluggish, dated, or fails to convert incoming traffic into qualified inquiries.',
      'You want a custom, maintainable platform rather than being trapped in restrictive, slow templates.',
    ],
    outcomes: [
      {
        metric: '< 400ms',
        label: 'Initial Render',
        description: 'Instantaneous page loads that keep visitors engaged and reduce bounce rates.',
      },
      {
        metric: '100%',
        label: 'Responsive Fidelity',
        description: 'Flawless visual presentation and navigation on every screen size from iPhone to 4K.',
      },
      {
        metric: '0 Bloat',
        label: 'Clean Code Standard',
        description: 'Custom React code written for longevity, security, and effortless future scaling.',
      },
    ],
    relatedServiceIds: ['ecommerce', 'cro', 'seo'],
  },

  'ecommerce': {
    id: 'ecommerce',
    title: 'E-Commerce & Digital Storefronts',
    shortTitle: 'E-Commerce',
    accentWord: 'Frictionless',
    divisionId: 'design',
    divisionNumber: '01',
    divisionTitle: 'Design & Development',
    iconName: 'ShoppingBag',
    oneLiner: 'High-converting online storefronts engineered for fast browsing, seamless checkout, and higher average order values.',
    heroDescription:
      'From custom Shopify architectures and headless commerce to lightweight direct WhatsApp ordering systems, we build digital storefronts that turn casual product browsing into completed transactions.',
    breadcrumbLabel: 'E-Commerce Storefronts',
    whatsIncluded: [
      {
        title: 'Custom Product & Catalog UI',
        description: 'Artisan product display grids, category filtering, high-resolution media galleries, and clear variant selection.',
        iconName: 'Layers',
      },
      {
        title: 'Frictionless Multi-Gateway Checkout',
        description: 'Integrated Razorpay, Stripe, UPI, and zero-commission direct WhatsApp order routing for maximum local conversion.',
        iconName: 'CreditCard',
      },
      {
        title: 'Mobile-First Shopping Experience',
        description: 'Designed specifically for thumb-friendly mobile browsing, instant cart drawers, and single-tap checkout flows.',
        iconName: 'Smartphone',
      },
      {
        title: 'Inventory & Order Notifications',
        description: 'Automated order confirmations via WhatsApp and Email, customer receipts, and streamlined inventory management.',
        iconName: 'Bell',
      },
      {
        title: 'Cart Abandonment Recovery',
        description: 'Built-in notification triggers and discount incentives to recover drop-offs and maximize revenue per session.',
        iconName: 'RotateCcw',
      },
      {
        title: 'E-Commerce Analytics & Pixel Tracking',
        description: 'Server-side Meta Conversions API (CAPI) and GA4 E-Commerce events configured to measure exact revenue per ad.',
        iconName: 'BarChart2',
      },
    ],
    howWeExecute: [
      {
        step: '01',
        phase: 'Discover',
        title: 'Catalog & Margin Analysis',
        description: 'We review your SKUs, pricing structure, fulfillment logistics, and target buyer habits to design the optimal sales funnel.',
      },
      {
        step: '02',
        phase: 'Design',
        title: 'Merchandising & Checkout UX',
        description: 'We design high-converting product pages, trust badges, and minimal-step checkout journeys in Figma.',
      },
      {
        step: '03',
        phase: 'Build',
        title: 'Platform Engineering & Gateways',
        description: 'We build your custom storefront, integrate local payment rails, set up automated tax/shipping rules, and link inventory.',
      },
      {
        step: '04',
        phase: 'Launch',
        title: 'Live Transaction Testing & Scale',
        description: 'We execute test payments across all gateways, verify order delivery notifications, and hand off administrative training.',
      },
    ],
    whoItsFor: [
      'Artisan brands, cloud kitchens, and D2C businesses wanting to take direct orders without paying massive aggregator commissions.',
      'Retail businesses transitioning from offline sales or basic social DMs into an automated, professional digital store.',
      'Existing e-commerce stores struggling with high cart abandonment and clunky mobile checkout steps.',
    ],
    outcomes: [
      {
        metric: '1-Click',
        label: 'Fast Checkout',
        description: 'Streamlined checkout steps designed to eliminate friction and abandoned carts.',
      },
      {
        metric: '0% Comm.',
        label: 'Direct Channel Revenue',
        description: 'Own your customer relationships and order margins directly through your platform.',
      },
      {
        metric: '100% Sync',
        label: 'Automated Order Alerts',
        description: 'Instant WhatsApp and email dispatch notifications sent to both customer and fulfillment team.',
      },
    ],
    relatedServiceIds: ['web-design', 'cro', 'paid-ads'],
  },

  'cro': {
    id: 'cro',
    title: 'Conversion Rate Optimization (CRO)',
    shortTitle: 'CRO',
    accentWord: 'Compounding',
    divisionId: 'design',
    divisionNumber: '01',
    divisionTitle: 'Design & Development',
    iconName: 'TrendingUp',
    oneLiner: 'Systematic audits and UX refinements designed to turn more of your existing traffic into paying clients.',
    heroDescription:
      'Instead of spending more money on ads to acquire new visitors, we eliminate friction in your existing funnel. Through heatmap diagnostics, user session recordings, and disciplined A/B testing, we unlock hidden revenue.',
    breadcrumbLabel: 'Conversion Rate Optimization',
    whatsIncluded: [
      {
        title: 'Full Funnel & Friction Audit',
        description: 'Comprehensive evaluation of bounce rates, drop-off points, and cognitive friction across all primary conversion paths.',
        iconName: 'FileSearch',
      },
      {
        title: 'Heatmap & Session Analysis',
        description: 'Visual tracking of where users scroll, click, hesitate, or exit using Hotjar and Microsoft Clarity telemetry.',
        iconName: 'Eye',
      },
      {
        title: 'High-Converting Copy Refinements',
        description: 'Rewriting headlines, subheadings, and calls-to-action to communicate undeniable value in seconds.',
        iconName: 'Edit3',
      },
      {
        title: 'Form & Checkout Streamlining',
        description: 'Trimming unnecessary form fields, optimizing button affordances, and adding trust micro-copy.',
        iconName: 'CheckCircle',
      },
      {
        title: 'Scientific A/B Split Testing',
        description: 'Hypothesis-driven split testing protocol to scientifically validate design changes before permanent rollout.',
        iconName: 'GitBranch',
      },
      {
        title: 'Monthly CRO Performance Briefings',
        description: 'Clear reporting detailing conversion lift, captured lead increases, and prioritized next-sprint recommendations.',
        iconName: 'TrendingUp',
      },
    ],
    howWeExecute: [
      {
        step: '01',
        phase: 'Audit',
        title: 'Behavioral Data Collection',
        description: 'We install session telemetry and analyze 1,000+ real user visits to identify exactly where prospective clients drop off.',
      },
      {
        step: '02',
        phase: 'Hypothesize',
        title: 'Prioritized Friction Roadmap',
        description: 'We rank friction points by revenue potential and draft concrete design and copywriting interventions.',
      },
      {
        step: '03',
        phase: 'Implement',
        title: 'Variant Design & Live Testing',
        description: 'We deploy targeted landing page variants, improved form interactions, and revised headline hooks.',
      },
      {
        step: '04',
        phase: 'Scale',
        title: 'Permanent Rollout & Compounding',
        description: 'Winning variations are permanently integrated into the core site, creating a sustained baseline conversion lift.',
      },
    ],
    whoItsFor: [
      'You are spending money on Google or Meta Ads but noticing that visitors browse without submitting an enquiry.',
      'Your website generates consistent traffic from search or referrals, but your inquiry volume remains flat.',
      'You are planning a product launch and want to ensure every visitor lands on a proven high-converting structure.',
    ],
    outcomes: [
      {
        metric: '+35–60%',
        label: 'Inquiry Conversion',
        description: 'Realistic conversion improvements achieved by removing unnecessary form steps and friction.',
      },
      {
        metric: 'Lower CPA',
        label: 'Cost Per Acquisition',
        description: 'Make your advertising spend work harder by converting more clicks into paying customers.',
      },
      {
        metric: '0 Guesswork',
        label: 'Data-Backed Decisions',
        description: 'Every design change is justified by real user session recordings and behavioral metrics.',
      },
    ],
    relatedServiceIds: ['web-design', 'paid-ads', 'seo'],
  },

  'seo': {
    id: 'seo',
    title: 'SEO',
    shortTitle: 'SEO',
    accentWord: 'Discoverable',
    divisionId: 'growth',
    divisionNumber: '02',
    divisionTitle: 'Growth & Reach',
    iconName: 'Search',
    oneLiner: 'Helping your business rank better on Google and get discovered.',
    heroDescription:
      'We focus on high-intent commercial keywords that drive actual customer inquiries, not vanity search volume. From technical Core Web Vitals to local Google Maps pack dominance, we build compounding organic assets.',
    breadcrumbLabel: 'Search Engine Optimization',
    whatsIncluded: [
      {
        title: 'Technical Site Health & Crawl Audit',
        description: 'Resolving indexation issues, canonical tags, 404s, redirect loops, XML sitemaps, and Core Web Vitals hygiene.',
        iconName: 'Cpu',
      },
      {
        title: 'Commercial Intent Keyword Research',
        description: 'Identifying the exact queries prospective buyers use when ready to purchase, scoping competitor gaps.',
        iconName: 'Crosshair',
      },
      {
        title: 'On-Page Content & Schema Architecture',
        description: 'Structuring headings, title tags, meta descriptions, and JSON-LD schema to secure Google rich snippets.',
        iconName: 'Code',
      },
      {
        title: 'Google Business Profile & Local SEO',
        description: 'Optimizing local map pack presence, citation consistency, and review workflows for regional authority.',
        iconName: 'MapPin',
      },
      {
        title: 'Strategic Content Gap Roadmap',
        description: 'Monthly editorial recommendations targeting unanswered questions your target buyers are searching for.',
        iconName: 'Compass',
      },
      {
        title: 'Transparent Monthly Search Insights',
        description: 'Track real keyword ranking movements, organic impression gains, and verified inbound organic leads.',
        iconName: 'Activity',
      },
    ],
    howWeExecute: [
      {
        step: '01',
        phase: 'Audit',
        title: 'Full Technical & Crawl Diagnostics',
        description: 'We run deep crawls via Screaming Frog and Google Search Console to fix all site architecture bottlenecks.',
      },
      {
        step: '02',
        phase: 'Strategy',
        title: 'Commercial Keyword Clustering',
        description: 'We map high-intent keyword clusters to dedicated landing pages, ensuring each page answers a specific search intent.',
      },
      {
        step: '03',
        phase: 'Optimize',
        title: 'On-Page & Schema Deployment',
        description: 'We rewrite metadata, optimize internal linking graphs, and inject structured schema code across your site.',
      },
      {
        step: '04',
        phase: 'Compound',
        title: 'Authority Building & Tracking',
        description: 'We monitor indexation velocities, track ranking progressions, and expand into related long-tail commercial queries.',
      },
    ],
    whoItsFor: [
      'Businesses tired of relying exclusively on paid ad spend to keep the pipeline full.',
      'Regional service companies looking to dominate local search results in Bengaluru and key metropolitan markets.',
      'Brands whose competitors consistently outrank them on high-intent product and service search queries.',
    ],
    outcomes: [
      {
        metric: 'Top 3',
        label: 'Target Query Goals',
        description: 'Disciplined focus on securing top organic positions for high-intent commercial keywords.',
      },
      {
        metric: 'Zero Ad Cost',
        label: 'Organic Lead Flow',
        description: 'Every visitor arriving through organic search costs nothing in incremental media budget.',
      },
      {
        metric: '100% White Hat',
        label: 'Safe Practices',
        description: 'Ethical optimizations fully compliant with Google helpful content and quality guidelines.',
      },
    ],
    relatedServiceIds: ['web-design', 'cro', 'paid-ads'],
  },

  'paid-ads': {
    id: 'paid-ads',
    title: 'Paid Advertising',
    shortTitle: 'Paid Ads',
    accentWord: 'Targeted',
    divisionId: 'growth',
    divisionNumber: '02',
    divisionTitle: 'Growth & Reach',
    iconName: 'Target',
    oneLiner: 'Targeted Meta ads to reach potential customers.',
    heroDescription:
      'We eliminate wasted ad spend through granular audience targeting, high-converting creative variations, and clean server-side conversion tracking. Every rupee spent is measured against real revenue and qualified leads.',
    breadcrumbLabel: 'Paid Advertising',
    whatsIncluded: [
      {
        title: 'Full-Funnel Campaign Architecture',
        description: 'Segmenting top-of-funnel prospecting, middle-of-funnel consideration, and high-margin bottom-of-funnel retargeting.',
        iconName: 'Sliders',
      },
      {
        title: 'High-Converting Ad Copy & Creative',
        description: 'Multiple copy variations, visual hooks, benefit callouts, and urgency triggers designed for immediate action.',
        iconName: 'Sparkles',
      },
      {
        title: 'Precision Google Search & Performance Max',
        description: 'Negative keyword hygiene, search intent matching, and automated smart bidding calibrated to maximize ROAS.',
        iconName: 'Search',
      },
      {
        title: 'Server-Side CAPI & GA4 Tracking',
        description: 'First-party conversion tracking resilient against iOS privacy blocks and ad blockers, ensuring accurate attribution.',
        iconName: 'Database',
      },
      {
        title: 'Weekly Budget & Bid Hygiene',
        description: 'Continuous pruning of underperforming creative angles and scaling budgets into verified winning ad sets.',
        iconName: 'TrendingUp',
      },
      {
        title: 'Transparent Client Reporting Dashboard',
        description: 'Live analytics dashboard tracking cost-per-click, cost-per-lead, conversion rate, and return on ad spend.',
        iconName: 'PieChart',
      },
    ],
    howWeExecute: [
      {
        step: '01',
        phase: 'Audit',
        title: 'Account History & Economics Audit',
        description: 'We audit past campaigns, calculate target customer acquisition costs, and map competitor ad strategies.',
      },
      {
        step: '02',
        phase: 'Setup',
        title: 'Tracking & Creative Production',
        description: 'We configure server-side tracking pixels, produce initial creative suites, and draft hook-driven copy angles.',
      },
      {
        step: '03',
        phase: 'Launch',
        title: 'Controlled Testing Phase',
        description: 'We launch isolated test ad sets with disciplined micro-budgets to validate which angles yield the lowest cost per inquiry.',
      },
      {
        step: '04',
        phase: 'Scale',
        title: 'Budget Scaling & Optimization',
        description: 'We shift budget into winning creatives while systematically introducing fresh creative variations to prevent ad fatigue.',
      },
    ],
    whoItsFor: [
      'Founders who have burned ad budget on agency retainers without understanding where their money went.',
      'Growing businesses with proven product-market fit ready to predictably scale inbound leads each month.',
      'E-commerce brands seeking profitable customer acquisition with verified return on ad spend (ROAS).',
    ],
    outcomes: [
      {
        metric: '3.0x+',
        label: 'Target Account ROAS',
        description: 'Disciplined return thresholds maintained through continuous bid hygiene and creative testing.',
      },
      {
        metric: '100% CAPI',
        label: 'Attribution Fidelity',
        description: 'Server-side tracking ensures every conversion is accurately attributed to the right ad.',
      },
      {
        metric: '0 Hidden Fees',
        label: 'Transparent Billing',
        description: 'You pay ad networks directly from your account; our fee is strictly for strategy and execution.',
      },
    ],
    relatedServiceIds: ['cro', 'short-video', 'web-design'],
  },

  'social-media': {
    id: 'social-media',
    title: 'Social Media Handling',
    shortTitle: 'Social Media',
    accentWord: 'Compelling',
    divisionId: 'growth',
    divisionNumber: '02',
    divisionTitle: 'Growth & Reach',
    iconName: 'Share2',
    oneLiner: 'Managing and growing your social media presence.',
    heroDescription:
      'We manage your social presence end-to-end: monthly content calendars, custom graphic design, engaging copywriting, and community management. We turn silent profiles into active, trustworthy hubs that support your sales pipeline.',
    breadcrumbLabel: 'Social Media Management',
    whatsIncluded: [
      {
        title: 'Monthly Editorial Content Calendars',
        description: 'Strategic mix of educational authority posts, client proof, product spotlights, and interactive stories.',
        iconName: 'Calendar',
      },
      {
        title: 'High-Fidelity Carousel & Graphic Design',
        description: 'Bespoke social cards and carousel sequences crafted in Figma that align perfectly with your brand identity.',
        iconName: 'Image',
      },
      {
        title: 'Engaging, Value-Driven Copywriting',
        description: 'Hooks that halt scrolling, clear explanatory body text, and direct calls-to-action tailored to your platform.',
        iconName: 'Edit2',
      },
      {
        title: 'Community Management & DM Triage',
        description: 'Monitoring post comments, routing sales inquiries to WhatsApp, and maintaining positive audience engagement.',
        iconName: 'MessageSquare',
      },
      {
        title: 'Platform Scheduling & Hashtag Hygiene',
        description: 'Consistent posting at peak engagement windows across Instagram, LinkedIn, and Facebook.',
        iconName: 'Clock',
      },
      {
        title: 'Monthly Engagement & Reach Review',
        description: 'Clear reporting on follower growth, saves, shares, and inbound direct message inquiries.',
        iconName: 'BarChart',
      },
    ],
    howWeExecute: [
      {
        step: '01',
        phase: 'Pillars',
        title: 'Brand Voice & Content Pillars',
        description: 'We define 3–4 core content themes that resonate with your target clients and reflect your expertise.',
      },
      {
        step: '02',
        phase: 'Production',
        title: 'Monthly Batch Asset Creation',
        description: 'We design all graphics, write captions, and assemble the full month of posts in advance for your approval.',
      },
      {
        step: '03',
        phase: 'Publish',
        title: 'Scheduled Deployment & Outreach',
        description: 'Content is scheduled and published automatically while our team actively handles early engagement.',
      },
      {
        step: '04',
        phase: 'Review',
        title: 'Analytics & Strategy Tuning',
        description: 'We double down on top-performing post formats and prune angles that fail to spark discussion.',
      },
    ],
    whoItsFor: [
      'Founders who know social proof is critical but lack the hours to brainstorm, design, and post consistently.',
      'Professional service firms wanting an authoritative, polished presence on LinkedIn and Instagram.',
      'Brands whose profiles look dormant, causing potential clients to wonder if the business is still active.',
    ],
    outcomes: [
      {
        metric: '100% Ready',
        label: 'Pre-Approved Calendars',
        description: 'Review and approve an entire month of social assets in one single 20-minute session.',
      },
      {
        metric: 'Zero Silence',
        label: 'Consistent Cadence',
        description: 'Steady 3–4 weekly posts ensuring your brand stays top-of-mind with prospective clients.',
      },
      {
        metric: 'Active Pipeline',
        label: 'Inquiry Routing',
        description: 'Casual comments and direct messages are actively triaged into qualified sales conversations.',
      },
    ],
    relatedServiceIds: ['short-video', 'branding', 'paid-ads'],
  },

  'short-video': {
    id: 'short-video',
    title: 'Short-Form Video Production',
    shortTitle: 'Short Video',
    accentWord: 'Captivating',
    divisionId: 'content',
    divisionNumber: '03',
    divisionTitle: 'Content & AI',
    iconName: 'Video',
    oneLiner: 'High-retention vertical video filmed on-location, scripted with viral hooks for Reels, Shorts, and TikTok.',
    heroDescription:
      'We bring professional cinema cameras, lighting, and audio equipment to your location in Bengaluru. We write the scripts, film your space or product, and edit dynamic vertical videos with custom captions and sound design.',
    breadcrumbLabel: 'Short-Form Video Production',
    whatsIncluded: [
      {
        title: 'Hook-Driven Scripting & Storyboards',
        description: 'Pre-shoot scripting focused on the critical first 3 seconds, narrative pacing, and clear calls-to-action.',
        iconName: 'FileText',
      },
      {
        title: 'On-Location 4K Cinema Filming',
        description: 'Professional Sony FX cinema rigs, gimbal stabilization, cinema lighting, and wireless lapel audio capture.',
        iconName: 'Camera',
      },
      {
        title: 'Dynamic Rhythm Cuts & Motion Subtitles',
        description: 'Fast-paced edits, custom animated captions, sound effects, and kinetic typography that keep viewers watching.',
        iconName: 'Film',
      },
      {
        title: 'Sound Design & Royalty-Free Licensing',
        description: 'Multi-layer audio mixing, subtle ambient sound effects, and commercially licensed background music.',
        iconName: 'Volume2',
      },
      {
        title: '9:16 Vertical Optimization for All Feeds',
        description: 'Precision framing ensuring text and visuals never get covered by Instagram or TikTok interface icons.',
        iconName: 'Smartphone',
      },
      {
        title: 'Archival Raw Footage Delivery',
        description: 'All captured 4K footage organized and delivered in high-bitrate formats for your internal library.',
        iconName: 'HardDrive',
      },
    ],
    howWeExecute: [
      {
        step: '01',
        phase: 'Concept',
        title: 'Shot List & Hook Scripting',
        description: 'We draft 6–10 concrete video concepts with scripted spoken lines and detailed visual shot lists.',
      },
      {
        step: '02',
        phase: 'Shoot',
        title: 'On-Site Bengaluru Filming',
        description: 'Our production team arrives at your venue or location with full 4K cinema gear for a focused half-day shoot.',
      },
      {
        step: '03',
        phase: 'Edit',
        title: 'Post-Production & Motion Captions',
        description: 'We cut the footage, grade colors to match your brand, animate kinetic subtitles, and mix sound effects.',
      },
      {
        step: '04',
        phase: 'Deliver',
        title: 'Final Export & Social Distribution',
        description: 'High-bitrate vertical video files delivered ready to post, complete with recommended captions and sound tags.',
      },
    ],
    whoItsFor: [
      'Restaurants, cafes, bakeries, and cloud kitchens whose food looks extraordinary on camera.',
      'Doctors, clinics, and professional founders wanting to build relatable video authority and personal brand equity.',
      'D2C brands needing authentic, high-converting video creative for Meta Ads and organic Instagram Reels.',
    ],
    outcomes: [
      {
        metric: '80%+',
        label: '3-Sec Retention',
        description: 'Hooks engineered to halt scrolling within the first 3 seconds of entering the user feed.',
      },
      {
        metric: '4K Cinema',
        label: 'Production Standard',
        description: 'Shot on cinema sensors with pro lighting to instantly distinguish your brand from smartphone clips.',
      },
      {
        metric: '4–8 Reels',
        label: 'Monthly Delivery',
        description: 'A complete batch of high-retention video assets delivered from a single structured filming session.',
      },
    ],
    relatedServiceIds: ['ai-video', 'social-media', 'paid-ads'],
  },

  'ai-video': {
    id: 'ai-video',
    title: 'AI Video & Synthetic Media',
    shortTitle: 'AI Video',
    accentWord: 'Innovative',
    divisionId: 'content',
    divisionNumber: '03',
    divisionTitle: 'Content & AI',
    iconName: 'Sparkles',
    oneLiner: 'Generative AI concept visuals, realistic synthetic avatars, and multilingual voice dubbing for rapid campaign scaling.',
    heroDescription:
      'Scale your visual production without traditional filming constraints. We leverage state-of-the-art generative video models and natural voice synthesis to generate product demos, explainers, and localized ad variations in days.',
    breadcrumbLabel: 'AI Video Production',
    whatsIncluded: [
      {
        title: 'Generative 3D & Abstract B-Roll',
        description: 'Photorealistic product mockups, futuristic environments, and visual metaphors rendered via Midjourney and Runway Gen-3.',
        iconName: 'Image',
      },
      {
        title: 'Natural AI Voiceover & Multilingual Audio',
        description: 'Broadcast-grade voice synthesis across English, Hindi, Tamil, and Kannada with natural human cadence and emotion.',
        iconName: 'Mic',
      },
      {
        title: 'Synthetic Presenter & Avatar Integration',
        description: 'Hyper-realistic digital spokespeople with accurate lip-syncing for explainers, tutorials, and onboarding modules.',
        iconName: 'UserCheck',
      },
      {
        title: 'Rapid 15+ Creative Hook Iterations',
        description: 'Test multiple opening hooks and angles in 48 hours to find the winning ad creative before investing media budget.',
        iconName: 'FastForward',
      },
      {
        title: 'Hybrid Motion Graphics & Typography',
        description: 'Combining synthetic visuals with crisp vector UI overlays and kinetic typography in After Effects.',
        iconName: 'Layers',
      },
      {
        title: 'Commercial AI Rights & Clearances',
        description: 'Full commercial rights and ethical synthetic media disclosures compliant with advertising standards.',
        iconName: 'Shield',
      },
    ],
    howWeExecute: [
      {
        step: '01',
        phase: 'Prompt',
        title: 'Narrative Architecture & Prompts',
        description: 'We script the core message and engineer custom visual prompt matrices to guarantee brand visual consistency.',
      },
      {
        step: '02',
        phase: 'Synthesize',
        title: 'Asset Generation & Voice Cloning',
        description: 'We generate high-resolution b-roll sequences, produce synthetic voiceovers, and align lip-sync telemetry.',
      },
      {
        step: '03',
        phase: 'Composite',
        title: 'Hybrid Editing & Sound Mixing',
        description: 'We composite AI video clips with real interface screen-recordings, branding badges, and punchy audio effects.',
      },
      {
        step: '04',
        phase: 'Iterate',
        title: 'Multi-Hook Variation Batching',
        description: 'We export variations with differing first 3-second hooks for rapid paid ad testing and localization.',
      },
    ],
    whoItsFor: [
      'SaaS and tech startups needing explainer videos for complex software without spending months in animation production.',
      'Brands marketing across diverse linguistic regions wanting native voice ads in Hindi, Kannada, Tamil, and English.',
      'Performance marketers looking to test dozens of visual angles quickly without incurring repeated filming costs.',
    ],
    outcomes: [
      {
        metric: '10x Faster',
        label: 'Turnaround Speed',
        description: 'Produce high-fidelity video concepts in days instead of traditional multi-week production schedules.',
      },
      {
        metric: 'Multi-Lingual',
        label: 'Regional Reach',
        description: 'Expand your market reach with natural voiceovers across regional languages with zero re-shoots.',
      },
      {
        metric: 'Lower Cost',
        label: 'Creative Testing',
        description: 'Generate 15+ creative ad variations for a fraction of traditional production budgets.',
      },
    ],
    relatedServiceIds: ['short-video', 'paid-ads', 'branding'],
  },

  'branding': {
    id: 'branding',
    title: 'Branding & Creative Systems',
    shortTitle: 'Branding',
    accentWord: 'Distinctive',
    divisionId: 'content',
    divisionNumber: '03',
    divisionTitle: 'Content & AI',
    iconName: 'Palette',
    oneLiner: 'Unified visual identities, design systems, and digital collateral built to make your business unmistakable.',
    heroDescription:
      'Your brand is more than a logo. We create comprehensive creative systems: color palettes with calibrated contrast ratios, typography pairings, custom iconography, and reusable social and collateral templates.',
    breadcrumbLabel: 'Branding & Creative Systems',
    whatsIncluded: [
      {
        title: 'Core Brand Identity & Logo Suite',
        description: 'Primary logo, responsive icon mark, wordmark variations, and monochrome assets prepared for print and screen.',
        iconName: 'Feather',
      },
      {
        title: 'Color Architecture & Typography Scales',
        description: 'Carefully curated primary and accent colors, accessible contrast pairings, and hierarchy-driven font scales.',
        iconName: 'Type',
      },
      {
        title: 'Custom Vector Iconography & Patterns',
        description: 'Distinctive digital badges, background grain patterns, and illustration styles tailored exclusively to your brand.',
        iconName: 'Grid',
      },
      {
        title: 'Social & Marketing Collateral Templates',
        description: 'Editable Figma and Canva templates for announcements, carousels, business cards, and pitch decks.',
        iconName: 'Layout',
      },
      {
        title: 'Digital Design Tokens for Developers',
        description: 'CSS variables and Tailwind token configuration ready for instant, consistent integration into your web build.',
        iconName: 'Code',
      },
      {
        title: 'Comprehensive Brand Guidelines Deck',
        description: 'A clear reference manual detailing spacing rules, dos and don’ts, tone of voice, and visual examples.',
        iconName: 'BookOpen',
      },
    ],
    howWeExecute: [
      {
        step: '01',
        phase: 'Immersion',
        title: 'Market Positioning & Identity Audit',
        description: 'We analyze your competitive landscape, target audience perception, and core company values.',
      },
      {
        step: '02',
        phase: 'Concepts',
        title: 'Visual Direction Moodboards',
        description: 'We develop two distinct creative directions exploring typography, tone, and visual mood for your selection.',
      },
      {
        step: '03',
        phase: 'Refinement',
        title: 'Identity System Architecture',
        description: 'We refine the chosen direction into an exhaustive asset suite including logos, tokens, and collateral templates.',
      },
      {
        step: '04',
        phase: 'Handover',
        title: 'Brand Book & Asset Library',
        description: 'Complete vector asset delivery across all formats (SVG, PNG, PDF) with practical guidelines for your team.',
      },
    ],
    whoItsFor: [
      'New companies needing a world-class visual identity before making their public debut.',
      'Established businesses whose branding feels fragmented across different websites, brochures, and social accounts.',
      'Founders raising capital or launching enterprise products who need their brand to project institutional credibility.',
    ],
    outcomes: [
      {
        metric: '100% Vector',
        label: 'Scalable Assets',
        description: 'Crisp, perfectly prepared vector assets ready for everything from mobile favicons to billboard prints.',
      },
      {
        metric: 'Unified DNA',
        label: 'Cross-Platform Cohesion',
        description: 'Ensure every touchpoint from your website to your social posts speaks the exact same visual language.',
      },
      {
        metric: 'Dev-Ready',
        label: 'Design Tokens',
        description: 'Tokens exported as CSS/Tailwind variables for direct, painless implementation by engineers.',
      },
    ],
    relatedServiceIds: ['web-design', 'social-media', 'content-creation'],
  },

  'content-creation': {
    id: 'content-creation',
    title: 'Content Creation',
    shortTitle: 'Content Creation',
    accentWord: 'Engaging',
    divisionId: 'content',
    divisionNumber: '03',
    divisionTitle: 'Content & Branding',
    iconName: 'Video',
    oneLiner: 'Creative posts, reels, AI-powered videos and real short-form shoots.',
    heroDescription:
      'We combine on-location 4K cinema filming, viral vertical short-form editing, and generative AI media to produce high-retention content that captivates audiences across Reels, Shorts, and social feeds.',
    breadcrumbLabel: 'Content Creation',
    whatsIncluded: [
      {
        title: 'On-Location 4K Video Shoots',
        description: 'Professional cinema camera, lighting, and wireless audio setups for interviews, product demos, and brand showcases.',
        iconName: 'Camera',
      },
      {
        title: 'AI-Assisted Video & Avatars',
        description: 'Generative media models, natural voice synthesis, and digital avatars to scale production speed 5x.',
        iconName: 'Sparkles',
      },
      {
        title: 'High-Retention Short-Form Reels',
        description: 'Dynamic 9:16 vertical editing with animated subtitles, sound design, and retention hooks proven for TikTok and Instagram.',
        iconName: 'Film',
      },
      {
        title: 'Social Media Graphics & Carousels',
        description: 'Bespoke static and carousel graphics designed in Figma that stop the scroll and build visual authority.',
        iconName: 'Image',
      },
      {
        title: 'Hook Ideation & Scripting',
        description: 'Compelling 3-second opening hooks and story frameworks written to maximize watch-through and engagement.',
        iconName: 'MessageSquare',
      },
      {
        title: 'Cross-Platform Formatting',
        description: 'Master assets exported and tagged for Instagram, YouTube Shorts, LinkedIn, and Facebook.',
        iconName: 'Share2',
      },
    ],
    howWeExecute: [
      {
        step: '01',
        phase: 'Concept',
        title: 'Hook Strategy & Storyboards',
        description: 'We develop high-retention scripts, visual hooks, and shot lists aligned with your marketing milestones.',
      },
      {
        step: '02',
        phase: 'Produce',
        title: 'Cinema Shoot & Generative AI',
        description: 'We film on-location with 4K equipment and leverage generative AI workflows for b-roll and visual assets.',
      },
      {
        step: '03',
        phase: 'Edit',
        title: 'Kinetic Editing & Audio Design',
        description: 'Fast-paced editing, motion graphics, sound design, and color grading for maximum viewer retention.',
      },
      {
        step: '04',
        phase: 'Deliver',
        title: 'Master Assets & Distribution Kit',
        description: 'Complete cross-platform delivery with optimized thumbnails, captions, and publishing schedules.',
      },
    ],
    whoItsFor: [
      'Brands needing high-quality video and visual content without building an expensive in-house production crew.',
      'Businesses looking to scale social media reach through high-retention Reels, Shorts, and AI-powered video.',
      'Companies launching new products or services that demand cinematic visual storytelling.',
    ],
    outcomes: [
      {
        metric: '5x',
        label: 'Faster Production',
        description: 'Rapid asset turnaround combining on-site production with generative AI tooling.',
      },
      {
        metric: '80%+',
        label: 'Watch-Through',
        description: 'Hook-first scripting engineered to capture attention in the first 3 seconds.',
      },
      {
        metric: '100%',
        label: 'Brand Aligned',
        description: 'Consistent color grading, typography, and audio cues across all media.',
      },
    ],
    relatedServiceIds: ['social-media', 'brand-marketing', 'paid-ads'],
  },

  'brand-marketing': {
    id: 'brand-marketing',
    title: 'Brand Marketing',
    shortTitle: 'Brand Marketing',
    accentWord: 'Unmistakable',
    divisionId: 'content',
    divisionNumber: '03',
    divisionTitle: 'Content & Branding',
    iconName: 'Palette',
    oneLiner: 'Building a strong and recognizable brand identity.',
    heroDescription:
      'We craft iconic visual identities, cohesive brand guidelines, and distinctive design systems that make your business instantly recognizable and build long-term customer trust.',
    breadcrumbLabel: 'Brand Marketing',
    whatsIncluded: [
      {
        title: 'Core Logo & Visual Mark Suite',
        description: 'Primary logo, responsive icon mark, wordmarks, and monochrome variations prepared for digital and print.',
        iconName: 'Feather',
      },
      {
        title: 'Color Architecture & Typography Systems',
        description: 'Accessible color palettes, calibrated contrast ratios, and editorial font pairings for digital products.',
        iconName: 'Type',
      },
      {
        title: 'Comprehensive Brand Guidelines',
        description: 'A detailed brand handbook covering logo usage, spacing, color hierarchies, and tone of voice.',
        iconName: 'BookOpen',
      },
      {
        title: 'Marketing & Social Media Collateral',
        description: 'Custom social templates, pitch decks, business cards, and digital stationery in Figma.',
        iconName: 'Layout',
      },
      {
        title: 'Custom Vector Badges & Patterns',
        description: 'Unique digital badges, background grain textures, and custom graphic accents.',
        iconName: 'Grid',
      },
      {
        title: 'Digital Design Tokens for Developers',
        description: 'CSS variables and Tailwind token configuration ready for instant, consistent web implementation.',
        iconName: 'Code',
      },
    ],
    howWeExecute: [
      {
        step: '01',
        phase: 'Discovery',
        title: 'Brand Strategy & Market Positioning',
        description: 'We analyze your market, competitors, and target audience to define your visual positioning.',
      },
      {
        step: '02',
        phase: 'Design',
        title: 'Visual Direction Exploration',
        description: 'We develop two distinct creative directions exploring typography, mark design, and overall mood.',
      },
      {
        step: '03',
        phase: 'Refine',
        title: 'Identity System Architecture',
        description: 'We refine the chosen direction into an exhaustive asset suite including logos, tokens, and collateral.',
      },
      {
        step: '04',
        phase: 'Launch',
        title: 'Brand Book & Asset Library',
        description: 'Full delivery of vector assets (SVG, PNG, PDF) with practical guidelines for your team.',
      },
    ],
    whoItsFor: [
      'New companies needing an authoritative, cohesive visual identity before launching publicly.',
      'Established businesses whose branding feels fragmented across different websites, brochures, and channels.',
      'Founders raising capital or launching enterprise products who need to project premium credibility.',
    ],
    outcomes: [
      {
        metric: '100% Unique',
        label: 'Original Identity',
        description: 'Custom-designed from scratch with zero generic templates or stock logos.',
      },
      {
        metric: 'Unified DNA',
        label: 'Visual Consistency',
        description: 'Every touchpoint speaks the exact same professional visual language.',
      },
      {
        metric: 'High Trust',
        label: 'Market Credibility',
        description: 'A polished visual identity that commands confidence and premium client perception.',
      },
    ],
    relatedServiceIds: ['content-creation', 'web-design', 'social-media'],
  },

  'mobile-app-dev': {
    id: 'mobile-app-dev',
    title: 'Mobile App Development',
    shortTitle: 'Mobile Apps',
    accentWord: 'Frictionless',
    divisionId: 'design',
    divisionNumber: '01',
    divisionTitle: 'Design & Development',
    iconName: 'Smartphone',
    oneLiner: 'Custom apps for bookings, ordering and customer engagement.',
    heroDescription:
      'We design and build custom iOS and Android mobile apps engineered for frictionless customer bookings, digital ordering, instant push notifications, and high customer retention.',
    breadcrumbLabel: 'Mobile App Development',
    whatsIncluded: [
      {
        title: 'Cross-Platform iOS & Android Apps',
        description: 'High-performance native-feel applications built with modern frameworks for seamless deployment on both App Store and Google Play.',
        iconName: 'Smartphone',
      },
      {
        title: 'Booking & Appointment Workflows',
        description: 'Intuitive date/time scheduling, calendar sync, staff assignment, and automated reminder alerts.',
        iconName: 'Calendar',
      },
      {
        title: 'Digital Ordering & Menu Architecture',
        description: 'Fast catalog browsing, real-time item availability, variant modifiers, and instant cart drawer.',
        iconName: 'ShoppingBag',
      },
      {
        title: 'Integrated Secure Payments & UPI',
        description: 'Frictionless checkout with Razorpay, Stripe, UPI deep linking, and automated digital invoices.',
        iconName: 'CreditCard',
      },
      {
        title: 'Push Notifications & Re-engagement',
        description: 'Direct push messaging for order updates, appointment reminders, promotional deals, and retention triggers.',
        iconName: 'Bell',
      },
      {
        title: 'Store Publishing & Launch Support',
        description: 'Complete assistance with Apple Developer and Google Play Console review, compliance, and store publishing.',
        iconName: 'ShieldCheck',
      },
    ],
    howWeExecute: [
      {
        step: '01',
        phase: 'Blueprint',
        title: 'User Flows & Feature Scoping',
        description: 'We map every user screen, booking journey, and checkout touchpoint for maximum ease of use.',
      },
      {
        step: '02',
        phase: 'UI/UX',
        title: 'Figma Mobile App Prototypes',
        description: 'We craft thumb-friendly mobile layouts, micro-interactions, and high-fidelity clickable prototypes.',
      },
      {
        step: '03',
        phase: 'Engineering',
        title: 'Frontend & API Integration',
        description: 'We build responsive, robust app code integrated with your backend database, payment gateway, and notification services.',
      },
      {
        step: '04',
        phase: 'Publish',
        title: 'Testing & Store Submission',
        description: 'Rigorous device testing across iOS and Android models followed by store submission and launch.',
      },
    ],
    whoItsFor: [
      'Clinics, salons, consultants, and fitness studios wanting a direct, automated mobile booking system.',
      'Restaurants, cafes, and bakeries wanting to cut third-party marketplace commissions with their own direct ordering app.',
      'Brands wanting to boost customer loyalty with direct push notifications and mobile-first account profiles.',
    ],
    outcomes: [
      {
        metric: 'iOS & Android',
        label: 'Dual Launch',
        description: 'Single high-performance codebase published across both Apple and Android ecosystems.',
      },
      {
        metric: '0% Middleman',
        label: 'Direct Revenue',
        description: 'Keep 100% of your margins by avoiding aggregator commissions.',
      },
      {
        metric: 'Instant Reach',
        label: 'Push Notification Hub',
        description: 'Bring customers back to your business with direct lock-screen notifications.',
      },
    ],
    relatedServiceIds: ['web-design', 'paid-ads', 'social-media'],
  },
};

// Aliases for seamless backward compatibility
SERVICES_MAP['branding'] = SERVICES_MAP['brand-marketing'];
SERVICES_MAP['short-video'] = SERVICES_MAP['content-creation'];
SERVICES_MAP['ai-video'] = SERVICES_MAP['content-creation'];
SERVICES_MAP['ecommerce'] = SERVICES_MAP['mobile-app-dev'];
SERVICES_MAP['cro'] = SERVICES_MAP['web-design'];

/* ========================================================
   2. HOMEPAGE INTERACTIVE PREVIEW DATA (ServicesSection)
   ======================================================== */
export interface ServiceItemData {
  id: string;
  name: string;
  categoryTitle: string;
  icon: React.ReactNode;
  badge?: string;
  sparkle?: boolean;
  shortExplanation: string;
  description: string;
  included: string[];
  deliverables: string[];
  ctaText: string;
  accentColor?: string;
}

export interface ServiceCategoryGroup {
  id: string;
  number: string;
  title: string;
  intro: string;
  serviceIds: string[];
}

export const SERVICE_CATEGORIES: ServiceCategoryGroup[] = [
  {
    id: 'web',
    number: '01',
    title: 'Design & Development',
    intro: 'Websites, web apps and user experiences engineered to convert visitors into inquiries.',
    serviceIds: ['web-design-dev', 'cro'],
  },
  {
    id: 'growth',
    number: '02',
    title: 'Digital Growth',
    intro: 'Organic discovery, disciplined paid acquisition, and active social authority.',
    serviceIds: ['seo', 'paid-ads', 'social-media'],
  },
  {
    id: 'video',
    number: '03',
    title: 'Creative Production',
    intro: 'Vertical short-form cinema video and scalable synthetic media.',
    serviceIds: ['short-video', 'ai-video'],
  },
];

export const SERVICES_DATA: Record<string, ServiceItemData> = {
  'web-design-dev': {
    id: 'web-design-dev',
    name: 'Web Design & Development',
    categoryTitle: 'Design & Development',
    icon: React.createElement(Layout, { size: 18 }),
    badge: 'FAST CMS & CUSTOM BUILD',
    sparkle: true,
    shortExplanation: 'Editorial typography, responsive precision, and sub-second page speeds in Next.js.',
    description:
      'We combine conversion-focused UI design in Figma with clean, modular frontend engineering. Every site is custom-built with headless CMS integration, sub-400ms page loads, and mobile optimization.',
    included: [
      'Custom Figma UX/UI design system and responsive mobile prototypes',
      'Next.js / React frontend architecture with zero template bloat',
      'Headless CMS setup for effortless marketing copy and media updates',
      'Foundational on-page SEO, schema markup, and GA4 event tracking',
    ],
    deliverables: ['Custom Sitemap', 'Figma Prototypes', 'Next.js Build', 'CMS Wiring', 'Core Web Vitals'],
    ctaText: 'Discuss Web Development',
  },
  'cro': {
    id: 'cro',
    name: 'Conversion Rate Optimization (CRO)',
    categoryTitle: 'Design & Development',
    icon: React.createElement(TrendingUp, { size: 18 }),
    badge: 'HEATMAPS & USER TESTING',
    sparkle: false,
    shortExplanation: 'UX friction audits and iterative A/B testing to convert more existing visitors.',
    description:
      'Turn existing traffic into paying clients. Through heatmap diagnostics, user session recordings, and disciplined A/B testing, we find and eliminate conversion bottlenecks across your funnel.',
    included: [
      'Funnel drop-off diagnostics and user session recording audits',
      'Friction evaluation of high-intent landing pages and form layouts',
      'Copywriting improvements to communicate undeniable value quickly',
      'Prioritized A/B testing roadmap ranked by ease and expected return',
    ],
    deliverables: ['UX Friction Audit', 'Heatmap Review', 'A/B Test Plan', 'Form Streamlining', 'Monthly Briefing'],
    ctaText: 'Discuss CRO Audit',
  },
  'seo': {
    id: 'seo',
    name: 'Search Engine Optimization (SEO)',
    categoryTitle: 'Digital Growth',
    icon: React.createElement(Search, { size: 18 }),
    badge: 'TECHNICAL & LOCAL SEO',
    sparkle: false,
    shortExplanation: 'Ethical technical and on-page optimization for sustainable commercial search discovery.',
    description:
      'Target commercial keywords that drive actual customer inquiries, not vanity volume. From technical Core Web Vitals to local Google Maps pack dominance, we build compounding organic assets.',
    included: [
      'Deep technical crawl audit addressing indexation, speed, and schema',
      'Commercial intent keyword clustering and competitor gap analysis',
      'On-page title, meta, heading, and internal linking optimizations',
      'Google Business Profile setup and local citation dominance',
    ],
    deliverables: ['Technical Audit', 'Keyword Matrix', 'Schema Architecture', 'Local SEO Setup', 'Monthly Reports'],
    ctaText: 'Discuss SEO Strategy',
  },
  'paid-ads': {
    id: 'paid-ads',
    name: 'Paid Ads (Meta & Google)',
    categoryTitle: 'Digital Growth',
    icon: React.createElement(Target, { size: 18 }),
    badge: 'VERIFIED ROAS SPRINT',
    sparkle: true,
    shortExplanation: 'Disciplined performance advertising across Search, Performance Max, and Meta.',
    description:
      'Eliminate wasted ad spend with granular audience segmentation, high-converting creative variations, and clean server-side conversion tracking. Every rupee spent is measured against real revenue.',
    included: [
      'Full-funnel campaign architecture: prospecting, consideration, retargeting',
      'Multi-format ad copy, visual hooks, and urgency creative variations',
      'Server-side Meta Conversions API (CAPI) and GA4 event tracking setup',
      'Continuous bid hygiene and scaling budget into verified winning ad sets',
    ],
    deliverables: ['Campaign Strategy', 'Ad Creative Sets', 'CAPI Tracking', 'Bid Optimization', 'ROAS Dashboard'],
    ctaText: 'Discuss Paid Advertising',
  },
  'social-media': {
    id: 'social-media',
    name: 'Social Media Management',
    categoryTitle: 'Digital Growth',
    icon: React.createElement(Share2, { size: 18 }),
    badge: 'COMMUNITY & EDITORIAL',
    sparkle: false,
    shortExplanation: 'Consistent editorial calendars, visual carousels, and active community authority.',
    description:
      'We manage your social presence end-to-end: monthly content calendars, custom graphic design, engaging copywriting, and community monitoring that turns followers into qualified clients.',
    included: [
      'Monthly editorial content calendars aligned with business milestones',
      'Bespoke visual carousel designs and branded graphics in Figma',
      'Hook-driven copywriting with clear calls-to-action per platform',
      'Active comment triage and direct message routing to WhatsApp',
    ],
    deliverables: ['Editorial Calendar', '12–16 Post Assets', 'Caption Suite', 'Community Care', 'Monthly Review'],
    ctaText: 'Discuss Social Media',
  },
  'short-video': {
    id: 'short-video',
    name: 'Short Video Shoots',
    categoryTitle: 'Creative Production',
    icon: React.createElement(Video, { size: 18 }),
    badge: 'ON-LOCATION 4K CINEMA',
    sparkle: true,
    shortExplanation: 'High-retention vertical video filmed on-location for Reels, Shorts, and TikTok.',
    description:
      'We bring professional cinema cameras, cinema lighting, and wireless audio to your space in Bengaluru. We script, film, and edit dynamic vertical reels with kinetic typography and sound design.',
    included: [
      'Pre-shoot concept ideation, verbal hook development, and shot lists',
      'On-location 4K cinema filming with stabilization and cinema lighting',
      'Dynamic editing, color grading, motion subtitles, and sound effects',
      'Organized 9:16 delivery ready for Instagram Reels and YouTube Shorts',
    ],
    deliverables: ['Shot List Deck', 'Half/Full Day Shoot', '4–8 Polished Reels', 'Animated Captions', 'Sound Master'],
    ctaText: 'Discuss Video Production',
  },
  'ai-video': {
    id: 'ai-video',
    name: 'AI Video Production',
    categoryTitle: 'Creative Production',
    icon: React.createElement(Sparkles, { size: 18 }),
    badge: 'GENERATIVE MEDIA',
    sparkle: true,
    shortExplanation: 'Generative AI b-roll, multilingual voice synthesis, and rapid creative variations.',
    description:
      'Scale your video creative rapidly without repeated on-site filming. We use generative video models and natural voice synthesis to produce product explainers and localized ad variations in days.',
    included: [
      'Generative 3D and abstract b-roll visual concept modeling',
      'Natural AI voiceover narration across regional languages and accents',
      'Synthetic avatar and digital spokesperson integration with lip sync',
      'Rapid batching of 15+ opening hooks for ad testing and optimization',
    ],
    deliverables: ['Script Architecture', 'Voiceover Master', 'AI B-Roll Clips', '15+ Hook Variations', 'Rights Clearance'],
    ctaText: 'Discuss AI Video',
  },
};
