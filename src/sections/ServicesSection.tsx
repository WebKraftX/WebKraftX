import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './ServicesSection.module.css';

import webDesignImg from '../assets/services/service-web-design.png';
import croImg from '../assets/services/service-cro.png';
import seoImg from '../assets/services/service-seo.png';
import ecommerceImg from '../assets/services/service-ecommerce.png';
import paidAdsImg from '../assets/services/service-paid-ads.png';
import socialMediaImg from '../assets/services/service-social-media.png';
import shortVideoImg from '../assets/services/service-short-video.png';
import aiVideoImg from '../assets/services/service-ai-video.png';
import brandingImg from '../assets/services/service-branding.png';

export interface ServiceCardData {
  id: string;
  title: string;
  shortTitle: string;
  category: string;
  description: string;
  tags: string[];
  accentColor: string;
  image: string;
}

export const SEVEN_SERVICES_CARDS: ServiceCardData[] = [
  {
    id: 'content-creation',
    title: 'Content Creation',
    shortTitle: 'Content Creation',
    category: '01 CONTENT & MEDIA',
    description: 'Creative posts, reels, AI-powered videos and real short-form shoots.',
    tags: ['Reels & Posts', 'AI Video', 'Short Shoots'],
    accentColor: '#EC4899',
    image: shortVideoImg,
  },
  {
    id: 'web-design',
    title: 'Website Design & Development',
    shortTitle: 'Web Design & Dev',
    category: '02 DESIGN & DEV',
    description: 'Professional websites and landing pages for your business.',
    tags: ['Next.js / React', 'Landing Pages', 'Fast Performance'],
    accentColor: '#8B5CF6',
    image: webDesignImg,
  },
  {
    id: 'seo',
    title: 'SEO',
    shortTitle: 'Search Optimization',
    category: '03 DIGITAL GROWTH',
    description: 'Helping your business rank better on Google and get discovered.',
    tags: ['Google Ranking', 'Keywords', 'Organic Traffic'],
    accentColor: '#10B981',
    image: seoImg,
  },
  {
    id: 'brand-marketing',
    title: 'Brand Marketing',
    shortTitle: 'Brand Marketing',
    category: '04 BRANDING',
    description: 'Building a strong and recognizable brand identity.',
    tags: ['Brand Identity', 'Visual Systems', 'Positioning'],
    accentColor: '#F43F5E',
    image: brandingImg,
  },
  {
    id: 'social-media',
    title: 'Social Media Handling',
    shortTitle: 'Social Media',
    category: '05 SOCIAL & REACH',
    description: 'Managing and growing your social media presence.',
    tags: ['Content Engine', '30-Day Grid', 'Active Presence'],
    accentColor: '#A855F7',
    image: socialMediaImg,
  },
  {
    id: 'paid-ads',
    title: 'Paid Advertising',
    shortTitle: 'Paid Ads',
    category: '06 PAID MEDIA',
    description: 'Targeted Meta ads to reach potential customers.',
    tags: ['Meta Ads', 'Targeted Funnels', 'High ROAS'],
    accentColor: '#EF4444',
    image: paidAdsImg,
  },
  {
    id: 'mobile-app-dev',
    title: 'Mobile App Development',
    shortTitle: 'Mobile Apps',
    category: '07 MOBILE DEV',
    description: 'Custom apps for bookings, ordering and customer engagement.',
    tags: ['iOS & Android', 'Bookings & Orders', 'Custom Workflows'],
    accentColor: '#06B6D4',
    image: ecommerceImg,
  },
];

// Backwards compatibility alias
export const NINE_SERVICES_CARDS = SEVEN_SERVICES_CARDS;

interface ServicesSectionProps {
  onSelectService?: (serviceName: string) => void;
  onOpenProposal?: () => void;
}

export function ServicesSection({ onSelectService, onOpenProposal }: ServicesSectionProps = {}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="services" className={styles.servicesSection}>
      {/* Decorative ambient background accents */}
      <div className={styles.cornerPurpleTint} aria-hidden="true" />
      <span className={styles.spaceSparkle1} aria-hidden="true">✦</span>
      <span className={styles.spaceSparkle2} aria-hidden="true">✦</span>

      <div className={styles.innerContainer}>
        {/* --------------------------------------------------------
            1. SECTION HEADER — CENTERED & EDITORIAL ON BLACK
            -------------------------------------------------------- */}
        <div className={styles.headerCenter}>
          <motion.span
            className={styles.eyebrow}
            initial={{ opacity: 0, letterSpacing: '0.22em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.14em' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            OUR SERVICES
          </motion.span>

          <h2 className={styles.sectionHeading}>
            <span className={styles.headlineRow}>
              {['Seven', 'focused', 'services.'].map((word, i) => (
                <span key={word + i} className={styles.wordMask}>
                  <motion.span
                    className={styles.wordInner}
                    initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.12 + i * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {word}&nbsp;
                  </motion.span>
                </span>
              ))}
            </span>

            <span className={styles.headlineRow}>
              <span className={styles.wordMask}>
                <motion.span
                  className={`${styles.wordInner} ${styles.teamAccent}`}
                  initial={{ opacity: 0, y: 20, scale: 1.02, filter: 'blur(8px)' }}
                  whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.65,
                    delay: 0.52,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  One team.
                  {/* Accent Underline */}
                  <svg
                    className={styles.handDrawnVector}
                    viewBox="0 0 160 12"
                    fill="none"
                    aria-hidden="true"
                  >
                    <motion.path
                      d="M 3 8 Q 80 1, 157 7"
                      stroke="#A855F7"
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.55, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </svg>
                </motion.span>
              </span>
            </span>
          </h2>

          <motion.p
            className={styles.sectionSubline}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.68, ease: [0.16, 1, 0.3, 1] }}
          >
            From converting websites to AI-powered content and high-growth social media campaigns.
          </motion.p>
        </div>

        {/* --------------------------------------------------------
            2. TOTAL 7 SERVICE CARDS (4 in Row 1 + 3 Centered in Row 2)
            -------------------------------------------------------- */}
        <div className={styles.sevenCardsGrid}>
          {SEVEN_SERVICES_CARDS.map((card, index) => (
            <motion.div
              key={card.id}
              className={styles.cardContainer}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.55,
                delay: 0.06 + index * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={() => onSelectService && onSelectService(card.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectService && onSelectService(card.id);
                }
              }}
              style={{ cursor: 'pointer' }}
            >
              <div className={styles.cardSurface}>
                {/* 3D Illustration Area (Transparent PNG, Organic Wavy Pastel Blob) */}
                <div className={styles.illustrationWrapper}>
                  <img
                    src={card.image}
                    alt={card.title}
                    className={styles.cardIllustration}
                    draggable={false}
                    loading={index < 3 ? 'eager' : 'lazy'}
                  />
                </div>

                {/* Real HTML Content */}
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>
                    <span className={styles.desktopTitle}>{card.title}</span>
                    <span className={styles.mobileTitle}>{card.shortTitle}</span>
                  </h3>

                  <p className={styles.cardDesc}>{card.description}</p>

                  <div className={styles.tagsRow}>
                    {card.tags.map((tag) => (
                      <span key={tag} className={styles.tagChip}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
