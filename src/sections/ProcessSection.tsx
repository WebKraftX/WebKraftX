import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Search,
  Layers,
  Code2,
  TrendingUp,
} from 'lucide-react';
import paperPlaneMiniImg from '../assets/paper-plane-mini.png';
import styles from './ProcessSection.module.css';

interface ProcessStepData {
  number: string;
  stepName: string;
  title: string;
  titleMobile?: string;
  description: string;
  descMobile?: string;
  tags: string[];
  icon: React.ReactNode;
  themeClass: string;
}

const PROCESS_STEPS: ProcessStepData[] = [
  {
    number: '01',
    stepName: 'Discovery & Growth Architecture',
    title: 'Discovery & Growth Architecture',
    titleMobile: 'Discovery & Scope',
    description:
      'We audit your funnel, competitors, and analytics to find the highest-leverage growth opportunities.',
    descMobile: 'Audit funnels and define growth.',
    tags: ['Growth Audit', 'Funnel Mapping', 'KPI Baseline'],
    icon: <Search size={21} className={styles.stepIconSvg} />,
    themeClass: styles.cardViolet,
  },
  {
    number: '02',
    stepName: 'Design System & Creative Strategy',
    title: 'Design System & Creative Strategy',
    titleMobile: 'Design & Creative',
    description:
      'We build a conversion-focused design system and test creative angles before scaling spend.',
    descMobile: 'Conversion-focused UI and creative.',
    tags: ['UI System', 'Ad Creatives', 'A/B Hooks'],
    icon: <Layers size={21} className={styles.stepIconSvg} />,
    themeClass: styles.cardPink,
  },
  {
    number: '03',
    stepName: 'Engineering, Tracking & Deployment',
    title: 'Engineering, Tracking & Deployment',
    titleMobile: 'Engineering & Launch',
    description:
      'We ship fast, pixel-perfect builds with full tracking so every rupee is measurable.',
    descMobile: 'Fast, pixel-perfect build & tracking.',
    tags: ['Web Build', 'GA4 & Pixels', 'QA Launch'],
    icon: <Code2 size={21} className={styles.stepIconSvg} />,
    themeClass: styles.cardBlue,
  },
  {
    number: '04',
    stepName: 'Traffic Scaling & CRO Optimization',
    title: 'Traffic Scaling & CRO Optimization',
    titleMobile: 'Scaling & CRO',
    description:
      'We scale winning campaigns and iterate landing pages to compound returns.',
    descMobile: 'Scale campaigns to compound ROI.',
    tags: ['Paid Scaling', 'CRO Sprints', 'Weekly Reports'],
    icon: <TrendingUp size={21} className={styles.stepIconSvg} />,
    themeClass: styles.cardTeal,
  },
];

export function ProcessSection() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="process" ref={sectionRef} className={styles.processSection}>
      {/* ========================================================
          LARGE, SOFT, BLURRED MESH-GRADIENT BLOBS (Linear/Stripe Aurora)
          ======================================================== */}
      <div className={styles.blobViolet} aria-hidden="true" />
      <div className={styles.blobPink} aria-hidden="true" />
      <div className={styles.blobBlue} aria-hidden="true" />
      <div className={styles.blobAmber} aria-hidden="true" />

      {/* Subtle background ambient sparkles */}
      <span className={styles.bgSparkle1} aria-hidden="true">✦</span>
      <span className={styles.bgSparkle2} aria-hidden="true">✦</span>
      <span className={styles.bgSparkle3} aria-hidden="true">✦</span>
      <span className={styles.bgSparkle4} aria-hidden="true">✦</span>

      <div className={styles.innerContainer}>
        {/* ========================================================
            1. SECTION HEADER
            ======================================================== */}
        <div className={styles.headerRow}>
          {/* Label: WEBKRAFTX PROCESS */}
          <motion.div
            className={styles.sectionLabel}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.labelSparkle} aria-hidden="true">✦</span>
            <span>WEBKRAFTX PROCESS</span>
          </motion.div>

          {/* Headline: Word-by-word blur-to-sharp entrance on scroll */}
          <h2 className={styles.sectionHeading}>
            <span className={styles.headlineLineSolid}>
              {['Our', '4-step', 'execution', 'framework.'].map((word, i) => (
                <span key={word} className={styles.wordMask}>
                  <motion.span
                    className={styles.wordInner}
                    initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.08 + i * 0.07,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {word}&nbsp;
                  </motion.span>
                </span>
              ))}
            </span>

            <span className={styles.headlineLineSecond}>
              <span className={styles.headlineLineSolid}>
                {['From', 'audit', 'to'].map((word, i) => (
                  <span key={word} className={styles.wordMask}>
                    <motion.span
                      className={styles.wordInner}
                      initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{
                        duration: 0.55,
                        delay: 0.28 + i * 0.07,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      {word}&nbsp;
                    </motion.span>
                  </span>
                ))}
              </span>

              {/* "launch." in radiant gradient shimmer */}
              <span className={styles.wordMask}>
                <motion.span
                  className={`${styles.wordInner} ${styles.shimmerWord}`}
                  initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  launch.
                </motion.span>
              </span>
            </span>
          </h2>

          {/* Sub-line: Fades up after headline lands */}
          <motion.p
            className={styles.sectionSubtitle}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.76, ease: [0.16, 1, 0.3, 1] }}
          >
            A structured, transparent sprint framework designed to eliminate guesswork, accelerate time-to-market, and drive reliable returns on ad spend.
          </motion.p>
        </div>

        {/* ========================================================
            2. CONNECTED TIMELINE & 4 FROSTED GLASS STEP CARDS
            ======================================================== */}
        <div className={styles.timelineContainer}>
          {/* Horizontal Connecting Timeline Line (Desktop: Violet → Pink → Blue → Teal) */}
          <div className={styles.timelineBar} aria-hidden="true">
            <motion.div
              className={styles.timelineLineFill}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            />
            {/* Glowing Orb Traveling Along the Line in a Loop with Shifting Multi-Color Glow */}
            <div className={styles.travelingOrb} />
          </div>

          {/* 4 Step Cards Grid */}
          <div className={styles.stepsGrid}>
            {PROCESS_STEPS.map((step, index) => (
              <motion.div
                key={step.number}
                className={`${styles.stepCard} ${step.themeClass}`}
                initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  delay: 0.15 + index * 0.15, // Staggered 150ms apart
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {/* Thin top accent bar: gradient of its 2 hues */}
                <div className={styles.cardTopAccentBar} aria-hidden="true" />

                {/* Timeline node anchor point with pulsing dot in this card's color */}
                <div className={styles.nodeAnchor} aria-hidden="true">
                  <span className={styles.nodePulseRing} />
                  <span className={styles.nodePointDot} />
                </div>

                {/* Paper-plane watermark brand mark in the corner at low opacity */}
                <div className={styles.planeWatermark} aria-hidden="true">
                  <img
                    src={paperPlaneMiniImg}
                    alt=""
                    draggable={false}
                    className={styles.watermarkImg}
                  />
                </div>

                {/* Top Card Row: Icon Badge & Big Ghost Number */}
                <div className={styles.cardTopRow}>
                  <div className={styles.iconBadge}>
                    {step.icon}
                  </div>
                  {/* Big Ghost Number (01-04) */}
                  <span className={styles.stepGhostNumber}>{step.number}</span>
                </div>

                {/* Step Title with underline draw on hover */}
                <h3 className={styles.stepTitle}>
                  <span className={`${styles.stepTitleText} ${styles.titleDesktop}`}>{step.title}</span>
                  <span className={`${styles.stepTitleText} ${styles.titleMobile}`}>{step.titleMobile || step.title}</span>
                  <span className={styles.titleUnderline} aria-hidden="true" />
                </h3>

                {/* Description: Dark text on light frosted card for pristine readability */}
                <p className={styles.stepDescription}>
                  <span className={styles.descDesktop}>{step.description}</span>
                  <span className={styles.descMobile}>{step.descMobile || step.description}</span>
                </p>

                {/* Deliverable Tags: white pills with colored text + dot */}
                <div className={styles.tagsContainer}>
                  {step.tags.map((tag, tIdx) => (
                    <motion.span
                      key={tag}
                      className={styles.deliverableTag}
                      initial={{ opacity: 0, scale: 0.82 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.42 + index * 0.15 + tIdx * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <span className={styles.tagDot} />
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
