export interface ServiceItem {
  id: string;
  title: string;
  iconName: string;
  category: 'web' | 'growth' | 'video';
  description: string;
  deliverables: string[];
  metricsBadge: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  industry: string;
  liveUrl?: string;
  services: string[];
  headline: string;
  description: string;
  resultMetric: string;
  resultLabel: string;
  image: string;
  walkthroughTitle?: string;
  highlights?: string[];
}

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  timeline: string;
  isPopular?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}

export const siteConfig = {
  name: 'WebKraftX',
  tagline: 'Independent Digital Solutions · Bengaluru',
  heroLabel: 'INDEPENDENT DIGITAL SOLUTIONS · BENGALURU',
  heroHeadlineLine1: 'We build websites that win clients.',
  heroHeadlineLine2: 'And marketing that pays for itself.',
  heroDescription:
    'We design websites, run data-driven marketing, and produce scroll-stopping video & AI content — everything your brand needs to grow, under one roof.',
  heroTrustItems: [
    'Live client projects',
    'One team for web + marketing + video',
    'Launch in 2–4 weeks',
  ],

  contact: {
    email: 'contact@webkraftx.com',
    phone: '+91 77081 36273',
    whatsapp: 'https://wa.me/919845012345?text=Hi%20WebKraftX%2C%20I%20would%20like%20to%20discuss%20a%20website%20%26%20growth%20project',
    location: 'Chikkamanahalli, Bannerghatta Main Road, K.G. Hommadevanahalli, Bengaluru – 560083',
    hours: 'Monday – Saturday: 9:00 AM – 7:00 PM IST',
    availability: 'Accepting select new client projects for Q1 & Q2',
  },

  socials: [
    { label: 'LinkedIn', url: 'https://linkedin.com' },
    { label: 'Twitter / X', url: 'https://twitter.com' },
    { label: 'Instagram', url: 'https://instagram.com' },
    { label: 'GitHub', url: 'https://github.com' },
  ],

  stats: [
    { value: '140+', label: 'Projects Delivered', desc: 'Websites, ad funnels & video assets' },
    { value: '3.4x', label: 'Average Client ROAS', desc: 'Across Meta, Google & TikTok campaigns' },
    { value: '94%', label: 'Client Retention', desc: 'Long-term ongoing growth partners' },
    { value: '< 28d', label: 'Turnaround Time', desc: 'From initial design sprint to live launch' },
  ],

  trustedBrands: [
    { name: "Begum's Authentic Kitchen", category: 'Royal Cloud Kitchen & F&B', liveUrl: 'https://begums-authentic-kitchen.vercel.app' },
    { name: 'KGF Bakehouse', category: 'Artisan Gluten-Free Bakery', liveUrl: 'https://kgfbakehouse.vercel.app' },
    { name: 'Verve Technologies', category: 'Fintech Platform' },
    { name: 'Novacore Health', category: 'Biotech SaaS' },
    { name: 'Aura Organics', category: 'Direct-to-Consumer' },
    { name: 'Zenith Fleet', category: 'Mobility & Logistics' },
  ],

  serviceCategories: [
    { id: 'all', label: 'All Services (7)' },
    { id: 'web', label: 'Design & Web (2)' },
    { id: 'growth', label: 'Growth Marketing (3)' },
    { id: 'video', label: 'Video & AI Content (2)' },
  ],

  services: [
    {
      id: 'web-design-dev',
      category: 'web',
      iconName: 'Layout',
      title: 'Web Design & Development',
      description:
        'Custom React/Next.js architectures with sub-second page speeds, editorial layouts, responsive precision, and tailored design systems.',
      deliverables: [
        'Custom Figma UX/UI & Responsive Design Systems',
        'Next.js / React High-Performance Architecture',
        'Headless CMS, E-Commerce & WhatsApp Checkout',
      ],
      metricsBadge: '< 400ms First Contentful Paint',
    },
    {
      id: 'cro',
      category: 'web',
      iconName: 'TrendingUp',
      title: 'Conversion Rate Optimization (CRO)',
      description:
        'Behavioral heatmap diagnostics, user journey friction audits, and iterative A/B testing engineered to convert visitors into qualified buyers.',
      deliverables: [
        'Full Funnel UX & Checkout Friction Audits',
        'Data-Backed A/B Split Testing Protocols',
        'High-Converting Landing Pages & Lead Funnels',
      ],
      metricsBadge: '+42% Avg. Conversion Lift',
    },
    {
      id: 'seo',
      category: 'growth',
      iconName: 'Search',
      title: 'Search Engine Optimization (SEO)',
      description:
        'Technical site health, programmatic keyword clustering, local map-pack dominance, and strategic link building for sustainable organic revenue.',
      deliverables: [
        'Technical SEO Architecture & Core Web Vitals',
        'High-Intent Commercial Keyword Clusters',
        'Google Business Profile & Local Search Dominance',
      ],
      metricsBadge: 'Top 3 Organic Search Rankings',
    },
    {
      id: 'paid-ads',
      category: 'growth',
      iconName: 'Target',
      title: 'Paid Ads (Meta & Google)',
      description:
        'Full-funnel customer acquisition across Google Search, Performance Max, Instagram, and Facebook with verified ROAS tracking and creative testing.',
      deliverables: [
        'Granular Audience Segmentation & Keyword Bidding',
        'Weekly High-Converting Ad Creative Sprints',
        'Server-Side CAPI & Multi-Touch Attribution Dashboards',
      ],
      metricsBadge: '3.4x Average Account ROAS',
    },
    {
      id: 'social-media',
      category: 'growth',
      iconName: 'Share2',
      title: 'Social Media Management',
      description:
        'Strategic content calendars, community building, and brand positioning that turns casual followers into loyal brand advocates.',
      deliverables: [
        'Monthly Editorial Content Schedules & Copy',
        'High-Fidelity Visual Posts & Carousel Graphics',
        'Active Audience Engagement & DM Growth Funnels',
      ],
      metricsBadge: '+280% Organic Engagement Growth',
    },
    {
      id: 'short-video',
      category: 'video',
      iconName: 'Video',
      title: 'Short Video Shoots',
      description:
        'High-retention vertical short-form video production filmed on-location, engineered specifically for Instagram Reels, YouTube Shorts, and TikTok.',
      deliverables: [
        'Hook-Driven Scriptwriting & Shot Lists',
        'Professional 4K On-Location Filming & Lighting',
        'Dynamic Viral Color Grading, Sound FX & Captions',
      ],
      metricsBadge: '82% 3-Second Retention Rate',
    },
    {
      id: 'ai-video',
      category: 'video',
      iconName: 'Sparkles',
      title: 'AI Video Production',
      description:
        'Next-generation synthetic media production, multilingual voice cloning, hyper-personalized product ads, and rapid creative variations at scale.',
      deliverables: [
        'Photorealistic AI Spokesperson & Avatar Generation',
        'Multilingual Voice Dubbing & Dynamic Lip Sync',
        'Rapid 20+ Ad Creative Variations Delivered in 48h',
      ],
      metricsBadge: '10x Faster Video Output',
    },
  ] as ServiceItem[],

  caseStudies: [
    {
      id: 'begums-kitchen',
      client: "Begum's Authentic Kitchen",
      industry: 'Cloud Kitchen & Royal Heritage F&B',
      liveUrl: 'https://begums-authentic-kitchen.vercel.app',
      services: ['Web Design & Dev', 'Royal UI Theme', 'WhatsApp Checkout', 'Local CRO'],
      headline: "Royal Flavours of Hyderabad: Heritage Cloud Kitchen Platform",
      description:
        "Designed and engineered a bespoke digital storefront reflecting Hyderabad's royal culinary heritage. Features rich dark-navy & gold styling, Nizami breakfast & Sunday specials menu curation, and frictionless zero-commission WhatsApp pre-ordering.",
      resultMetric: '+240%',
      resultLabel: 'Direct Online Orders',
      image: '/project-begums.jpg',
      walkthroughTitle: "Begum's Authentic Kitchen — Web Experience & Ordering Flow",
      highlights: [
        'Royal heritage dark aesthetic with amber-gold highlights',
        'Interactive Nizami Breakfast & Sunday Dum Biryani menus',
        'Zero-commission direct WhatsApp handoff with itemized billing',
        'Sub-300ms page loads with 99.8% Core Web Vitals score',
      ],
    },
    {
      id: 'kgf-bakehouse',
      client: 'KGF Bakehouse',
      industry: 'Artisan Bakery & E-Commerce',
      liveUrl: 'https://kgfbakehouse.vercel.app',
      services: ['E-Commerce Storefront', 'Custom Cake Builder', 'Brand Storytelling', 'Meta Ads'],
      headline: 'Goodness in Every Bite: 100% Gluten-Free Artisan E-Commerce',
      description:
        'Crafted a warm, artisan e-commerce platform for Bengaluru’s premier dedicated gluten-free kitchen. Integrated custom cake pre-order workflows, artisan sourdough showcase, and certified celiac-safe trust badges.',
      resultMetric: '3.4x',
      resultLabel: 'Cake Inquiries & Sales',
      image: '/project-kgf.jpg',
      walkthroughTitle: 'KGF Bakehouse — E-Commerce Experience & Custom Cake Funnel',
      highlights: [
        'Warm chocolate-brown & cream palette with cupcake silhouette cutouts',
        'Custom celebration cake pre-order builder with flavor selection',
        'Dedicated 100% Celiac-Safe Kitchen certification trust seal',
        'One-click WhatsApp pre-order integration for fast local delivery',
      ],
    },
  ] as CaseStudy[],

  differentiators: [
    {
      number: '01',
      title: 'Full-Stack Team Under One Roof',
      desc: 'Web designers, full-stack React developers, performance ad buyers, and video production directors work in the same room. No handoff bottlenecks, no finger-pointing, and complete coherence across code and creative.',
      stat: '1 Unified Team',
    },
    {
      number: '02',
      title: 'Data-Driven & Commercial Focus',
      desc: 'We do not build vanity websites that merely look pretty. Every line of code, headline hook, and paid campaign is engineered to lower customer acquisition cost (CAC), maximize ROAS, and convert visitors into revenue.',
      stat: '3.4x Avg. ROAS',
    },
    {
      number: '03',
      title: 'Rapid 2–4 Week Launch Velocity',
      desc: 'Traditional agencies take 3 to 6 months to ship average websites. We operate in high-velocity agile sprints, deploying your custom website and initial acquisition engine in 2 to 4 weeks flat.',
      stat: '14–28 Days',
    },
    {
      number: '04',
      title: 'Direct Access to Principal Creators',
      desc: 'You speak directly with the designers and engineers building your project. No junior account managers, no layers of bureaucracy, and zero telephone games. Pure clarity and weekly video updates.',
      stat: 'Zero Bureaucracy',
    },
  ],

  processSteps: [
    {
      step: '01',
      phase: 'Discover',
      title: 'Discovery & Growth Architecture',
      duration: 'Week 1',
      desc: 'We analyze your target audience, unit economics, competitors, and current funnel friction to define the technical blueprint and acquisition hypothesis.',
      deliverables: ['Growth Audit & Competitor Teardown', 'UX Wireframes & Site Architecture', 'Technical & Tracking Specification'],
    },
    {
      step: '02',
      phase: 'Strategy',
      title: 'Design System & Creative Strategy',
      duration: 'Week 2',
      desc: 'High-fidelity Figma design mockups crafted around your brand essence. Simultaneously, our video team writes high-retention video ad scripts.',
      deliverables: ['Custom High-Fidelity Figma Prototype', 'Ad Creative Angles & Hook Scripts', 'Conversion Copywriting Review'],
    },
    {
      step: '03',
      phase: 'Build & Launch',
      title: 'Engineering, Filming & Deployment',
      duration: 'Week 3',
      desc: 'We build your responsive platform using Next.js/React, film and edit video assets, integrate analytics & WhatsApp API, and deploy with zero downtime.',
      deliverables: ['Full React/Next.js Codebase Deployment', 'On-Location 4K Video Production & Edits', 'Server-Side Analytics & Tag Validation'],
    },
    {
      step: '04',
      phase: 'Scale & Optimize',
      title: 'Traffic Scaling & CRO Optimization',
      duration: 'Week 4+',
      desc: 'Turn on paid Meta & Google campaigns, run programmatic A/B tests on landing pages, and optimize weekly for maximum qualified customer acquisition.',
      deliverables: ['Live Multi-Channel Ad Campaigns', 'Weekly ROAS & Conversion Reports', 'Continuous A/B Variant Deployments'],
    },
  ],

  pricingPlans: [
    {
      id: 'starter-web',
      name: 'Starter Website',
      badge: 'Fast Launch',
      price: '₹45,000',
      period: 'one-time investment',
      description: 'Ideal for local businesses, clinics, and premium brands needing a world-class digital flagship deployed rapidly.',
      timeline: '2 weeks turnaround',
      features: [
        'Custom 5-Page Responsive Web Application (React / Next.js)',
        'Editorial Typography & Mobile-First UX Architecture',
        'Sub-second page speeds (< 400ms FCP)',
        'Direct WhatsApp & Lead Form Integration',
        'Complete Technical SEO & Google Business Optimization',
        'Free SSL, Cloud Hosting Setup & 30 Days Support',
      ],
    },
    {
      id: 'growth-engine',
      name: 'Growth Engine',
      badge: 'Most Popular',
      price: '₹85,000',
      period: 'per month',
      description: 'The end-to-end growth partner for brands ready to scale ad spend, acquire customers profitably, and dominate search.',
      timeline: 'Sprint kickoff in 48 hours',
      isPopular: true,
      features: [
        'Everything in Starter Website (Continuous Dev & Upgrades)',
        'Full-Funnel Paid Ads Management (Meta & Google Ads)',
        'High-Converting Landing Pages & Active A/B Testing',
        '4 Short-Form Viral Video Shoots / AI Video Variations monthly',
        'Comprehensive SEO Link Building & Content Clustering',
        'Real-time Custom ROAS & Lead Attribution Dashboard',
        'Weekly Strategy Calls & Dedicated Slack Channel',
      ],
    },
    {
      id: 'full-stack-partner',
      name: 'Full-Stack Partner',
      badge: 'Enterprise & D2C',
      price: 'Custom',
      period: 'tailored quarterly roadmap',
      description: 'Comprehensive technical and media firepower for established brands scaling past 8 figures in annual revenue.',
      timeline: 'Custom dedicated sprint team',
      features: [
        'Bespoke Headless E-Commerce / SaaS Web Platform',
        'Full Multi-Channel Media Buying ($10k+ to $100k+/mo ad spend)',
        'Bi-Weekly On-Location Video Shoots & Custom AI Avatars',
        'Automated CRM, Email & WhatsApp Retention Workflows',
        'Dedicated Senior Engineer & Creative Director',
        'Custom Multi-Touch Attribution Server Infrastructure',
      ],
    },
  ] as PricingPlan[],

  faqs: [
    {
      question: 'How fast can you design and launch our website?',
      answer:
        'Our Starter Website packages are fully designed, built, and launched in 2 weeks (14 business days). Comprehensive custom platforms with e-commerce or booking funnels typically launch in 3 to 4 weeks.',
    },
    {
      question: 'Do you only serve Bengaluru brands or global clients?',
      answer:
        'While our team is based in Bengaluru (Bannerghatta Main Road), we partner with clients across India, Singapore, the UAE, the UK, and North America. Video shoots can be organized on-location in Bengaluru or remotely coordinated using high-end AI synthetic media production.',
    },
    {
      question: 'What makes WebKraftX different from a traditional marketing agency?',
      answer:
        'Most digital agencies choose between high-end visual design or technical marketing performance. At WebKraftX, our software engineers, designers, and performance media buyers sit at the same table. We do not pass your project off to junior interns — you work directly with experienced principals.',
    },
    {
      question: 'What technologies do you use for web development?',
      answer:
        'We build with modern, high-performance web standards: React, Next.js, TypeScript, TailwindCSS / CSS Modules, and Vite. We avoid heavy bloated WordPress themes or slow builders so your site achieves 95+ Google Lighthouse scores and loads in under 400 milliseconds.',
    },
    {
      question: 'How do you handle video shoots and AI video production?',
      answer:
        'For physical short-video shoots, our crew handles everything: hook-driven scripting, lighting, 4K camera gear, audio, and high-retention fast-cut editing. For AI video production, we use industry-leading synthetic media pipelines to generate photorealistic spokespersons, voice clones, and rapid creative variations.',
    },
    {
      question: 'What happens after the project launches?',
      answer:
        'Every web build includes 30 days of complimentary technical support and performance monitoring. Following launch, most clients transition into our Growth Engine partnership for ongoing paid advertising, SEO, conversion rate optimization, and monthly video content.',
    },
  ] as FaqItem[],

  testimonials: [
    {
      quote:
        'WebKraftX transformed our online presence. The royal Nizami theme and frictionless WhatsApp checkout increased our direct orders by 240% within the first 60 days. They are fast, reliable, and deeply commercial.',
      author: 'Mirza Baig',
      role: 'Co-Founder & Culinary Director',
      company: "Begum's Authentic Kitchen",
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    },
    {
      quote:
        'Finding a team that could capture the warmth of our artisan bakery while engineering a spotless gluten-free ordering funnel was tough until we found WebKraftX. Inquiries for custom cakes tripled right after launch.',
      author: 'Kavitha Rao',
      role: 'Founder & Head Baker',
      company: 'KGF Bakehouse',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
    },
    {
      quote:
        'The combination of high-end UI design, sub-second web speed, and sharp Meta ad creative under one roof made our product launch an undeniable success. A true full-stack partner in Bengaluru.',
      author: 'Rohan Sharma',
      role: 'VP of Growth',
      company: 'Verve Technologies',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    },
  ] as TestimonialItem[],
};
