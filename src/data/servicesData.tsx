import React from 'react';
import {
  Layout,
  TrendingUp,
  Search,
  Target,
  Share2,
  Video,
  Sparkles,
} from 'lucide-react';

import webDesignImg from '../assets/services/web-design.jpg';
import croImg from '../assets/services/cro.jpg';
import seoImg from '../assets/services/seo.jpg';
import paidAdsImg from '../assets/services/paid-ads.jpg';
import socialMediaImg from '../assets/services/social-media.jpg';
import shortVideoImg from '../assets/services/short-video.jpg';
import aiVideoImg from '../assets/services/ai-video.jpg';

export interface ServiceItemData {
  id: string;
  number: string;
  categoryId: string;
  categoryNumber: string;
  categoryTitle: string;
  name: string;
  icon: React.ReactNode;
  shortExplanation: string;
  description: string;
  included: string[];
  deliverables: string[];
  ctaText: string;
  accentColor: string;
  secondaryColor: string;
  image: string;
  visualDirection: {
    title: string;
    description: string;
    colors: string;
  };
}

export interface ServiceCategoryData {
  id: string;
  number: string;
  title: string;
  intro: string;
  serviceIds: string[];
}

export const SERVICE_CATEGORIES: ServiceCategoryData[] = [
  {
    id: 'design-dev',
    number: '01',
    title: 'DESIGN & DEVELOPMENT',
    intro: 'Custom websites, web applications and digital interfaces built around business workflows.',
    serviceIds: ['web-design-dev', 'cro'],
  },
  {
    id: 'digital-growth',
    number: '02',
    title: 'DIGITAL GROWTH',
    intro: 'Targeted search visibility, performance advertising, and organic brand discoverability.',
    serviceIds: ['seo', 'paid-ads', 'social-media'],
  },
  {
    id: 'creative-production',
    number: '03',
    title: 'CREATIVE PRODUCTION',
    intro: 'Filmed commercial video, vertical content, and AI-assisted visual production.',
    serviceIds: ['short-video', 'ai-video'],
  },
];

export const SERVICES_DATA: Record<string, ServiceItemData> = {
  'web-design-dev': {
    id: 'web-design-dev',
    number: '01',
    categoryId: 'design-dev',
    categoryNumber: '01',
    categoryTitle: 'DESIGN & DEVELOPMENT',
    name: 'Web Design & Development',
    icon: <Layout size={19} />,
    shortExplanation: 'Your business deserves more than an ordinary website.',
    description:
      'We design and develop responsive websites and web applications around your business requirements, ensuring clean presentation, fast load times, and intuitive navigation.',
    included: [
      'Business and corporate websites.',
      'E-commerce and restaurant websites.',
      'Custom website functionality.',
      'Responsive UI/UX development.',
    ],
    deliverables: ['Custom Sitemap', 'Figma UI Prototypes', 'Production Web Code', 'CMS Setup', 'Speed Optimization'],
    ctaText: 'Discuss This Service →',
    accentColor: '#9B6BFF',
    secondaryColor: '#38BDF8',
    image: webDesignImg,
    visualDirection: {
      title: 'Responsive Multi-Device Interface Suite',
      description: 'Layered browser window, tablet view, and mobile website mockup with crisp UI cards and dark typography.',
      colors: 'Purple, soft blue and crisp white',
    },
  },
  cro: {
    id: 'cro',
    number: '02',
    categoryId: 'design-dev',
    categoryNumber: '01',
    categoryTitle: 'DESIGN & DEVELOPMENT',
    name: 'Conversion Rate Optimisation',
    icon: <TrendingUp size={19} />,
    shortExplanation: 'Turn more existing visitors into active business inquiries.',
    description:
      'Through structured user journey analysis, session reviews, and interface audits, we identify points of friction and refine layout and copy to support higher inquiry rates.',
    included: [
      'Quantitative funnel and drop-off analysis.',
      'Website friction audit across key landing pages.',
      'Clarity improvements to copy and call-to-actions.',
      'Form layout simplification and mobile usability tuning.',
    ],
    deliverables: ['UX Friction Audit', 'User Flow Analysis', 'Refined Layout Recommendations', 'Form Usability Guide'],
    ctaText: 'Discuss This Service →',
    accentColor: '#F1A66A',
    secondaryColor: '#9B6BFF',
    image: croImg,
    visualDirection: {
      title: 'Funnel Heatmap & Analytics Dashboard',
      description: 'Step-by-step conversion stage funnel, heat-density click overlays, and user engagement metrics.',
      colors: 'Warm orange, violet and dark purple',
    },
  },
  seo: {
    id: 'seo',
    number: '03',
    categoryId: 'digital-growth',
    categoryNumber: '02',
    categoryTitle: 'DIGITAL GROWTH',
    name: 'Search Engine Optimisation',
    icon: <Search size={19} />,
    shortExplanation: 'Help prospective clients find your business organically.',
    description:
      'We apply structured on-page and technical optimizations to help search engines accurately index your pages for relevant commercial and informational search queries.',
    included: [
      'Technical site health and indexing review.',
      'Industry-relevant keyword research & search intent mapping.',
      'On-page title, header, meta and internal linking updates.',
      'Content structure recommendations for key service pages.',
    ],
    deliverables: ['Technical SEO Audit', 'Keyword Intent Matrix', 'Metadata Optimizations', 'Content Gap Outline'],
    ctaText: 'Discuss This Service →',
    accentColor: '#56C8D8',
    secondaryColor: '#818CF8',
    image: seoImg,
    visualDirection: {
      title: 'Search Intelligence & Rank Architecture',
      description: 'Search console data visualization, 3D magnifying lens, keyword index cards, and organic growth curve.',
      colors: 'Cyan, indigo and pure white',
    },
  },
  'paid-ads': {
    id: 'paid-ads',
    number: '04',
    categoryId: 'digital-growth',
    categoryNumber: '02',
    categoryTitle: 'DIGITAL GROWTH',
    name: 'Paid Advertising',
    icon: <Target size={19} />,
    shortExplanation: 'Reach high-intent audiences with disciplined ad management.',
    description:
      'We design and manage targeted campaigns across Meta and Google, balancing visual creative testing with meticulous tracking to connect your offers with relevant buyers.',
    included: [
      'Campaign architecture across Google Search & Meta platforms.',
      'Ad copy, headline variations, and visual creative formatting.',
      'Conversion tracking setup and event verification.',
      'Routine search term hygiene and audience refinement.',
    ],
    deliverables: ['Campaign Structure Plan', 'Ad Copy & Creative Sets', 'Tracking Pixel Setup', 'Performance Reporting'],
    ctaText: 'Discuss This Service →',
    accentColor: '#F1A66A',
    secondaryColor: '#9B6BFF',
    image: paidAdsImg,
    visualDirection: {
      title: 'Omnichannel Campaign & Targeting Console',
      description: 'Multi-platform ad previews, ROAS metric dials, audience segment matrices, and click performance bars.',
      colors: 'Orange, purple and subtle blue',
    },
  },
  'social-media': {
    id: 'social-media',
    number: '05',
    categoryId: 'digital-growth',
    categoryNumber: '02',
    categoryTitle: 'DIGITAL GROWTH',
    name: 'Social Media Management',
    icon: <Share2 size={19} />,
    shortExplanation: 'Maintain a polished, credible presence across social channels.',
    description:
      'We produce consistent, brand-aligned visual assets and written updates that communicate company capability, highlight services, and reinforce credibility with prospects.',
    included: [
      'Monthly editorial calendar reflecting business updates.',
      'Custom visual templates, graphic posts, and carousels.',
      'Clear caption copywriting and relevant topic tags.',
      'Scheduled posting across prioritized brand channels.',
    ],
    deliverables: ['Monthly Content Calendar', '12–16 Branded Post Assets', 'Caption Copy Sets', 'Monthly Activity Summary'],
    ctaText: 'Discuss This Service →',
    accentColor: '#F472B6',
    secondaryColor: '#9B6BFF',
    image: socialMediaImg,
    visualDirection: {
      title: 'Editorial Content Matrix & Creative Previews',
      description: 'Structured 30-day publishing calendar, aesthetic carousel compositions, and social engagement metrics.',
      colors: 'Pink, violet and warm coral',
    },
  },
  'short-video': {
    id: 'short-video',
    number: '06',
    categoryId: 'creative-production',
    categoryNumber: '03',
    categoryTitle: 'CREATIVE PRODUCTION',
    name: 'Short Video Production',
    icon: <Video size={19} />,
    shortExplanation: 'Capture attention with clear, dynamic short-form video.',
    description:
      'From initial shot list planning to multi-angle 4K filming and post-production editing, we produce vertical video content crafted for modern social feeds and mobile viewers.',
    included: [
      'Hook ideation, script outlines, and shot list preparation.',
      'On-location 4K filming with dedicated lighting and audio.',
      'Pacing, subtitle typography, and color grading for 9:16.',
      'Background sound selection and audio level balancing.',
    ],
    deliverables: ['Pre-production Shot List', 'Half/Full Day Shoot', '4–8 Polished 9:16 Video Cuts', 'Custom Subtitle Pass'],
    ctaText: 'Discuss This Service →',
    accentColor: '#F59E0B',
    secondaryColor: '#7E22CE',
    image: shortVideoImg,
    visualDirection: {
      title: 'Cinema Camera & Editorial Timeline Suite',
      description: 'Precision cinema camera lens assembly, multi-track audio waveforms, 9:16 video viewports, and film spools.',
      colors: 'Warm amber, dark purple and muted red',
    },
  },
  'ai-video': {
    id: 'ai-video',
    number: '07',
    categoryId: 'creative-production',
    categoryNumber: '03',
    categoryTitle: 'CREATIVE PRODUCTION',
    name: 'AI Video Production',
    icon: <Sparkles size={19} />,
    shortExplanation: 'Expand visual storytelling with generative video workflows.',
    description:
      'We integrate generative image rendering, synthetic voiceover, and hybrid motion editing to create product explainers, visual demonstrations, and localized content variations.',
    included: [
      'Script pacing structured for synthetic voice synthesis.',
      'Generative scene generation and visual environment mockups.',
      'Hybrid editing combining screen captures and AI assets.',
      'Rapid revision cycles for testing multiple visual angles.',
    ],
    deliverables: ['Narrative Script', 'Voiceover Master Audio', 'Generative Visual Assets', 'Hybrid 9:16/16:9 Cuts'],
    ctaText: 'Discuss This Service →',
    accentColor: '#56C8D8',
    secondaryColor: '#9B6BFF',
    image: aiVideoImg,
    visualDirection: {
      title: 'Neural Synthesis & Creative Render Canvas',
      description: 'Abstract node-based generative graphs, timeline scrubber, futuristic rendering viewport, and audio spectrum.',
      colors: 'Cyan, violet and electric blue',
    },
  },
};
