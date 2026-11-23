import React, { useRef, useState } from 'react';
import { motion, useSpring, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { MapPin, Sparkles, Ear, MessageSquare, Target, Handshake } from 'lucide-react';
import { BrandWordmark } from '../components/BrandLogo';
import founderBadgeImg from '../assets/founder-rithvik-badge.png';
import paperPlaneMiniImg from '../assets/paper-plane-mini.png';
import aboutExperienceImg from '../assets/about-digital-experience.png';
import styles from './AboutSection.module.css';

interface AboutSectionProps {
  onOpenProposal?: () => void;
}

// 150ms Cascading Stagger Variants (Fires only when panel is at least 20% visible)
const storyStaggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15, // exact 150ms apart
    },
  },
};

const storyItemFadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const PRINCIPLES = [
  {
    number: '01',
    title: 'Understand First',
    desc: 'Every business has different needs. We listen, ask questions and understand the requirement before suggesting a solution.',
    descMobile: 'We listen first, then suggest.',
    color: '#8B5CF6',
    icon: <Ear size={17} />,
    className: styles.principleViolet,
  },
  {
    number: '02',
    title: 'Keep It Honest',
    desc: 'Clear communication, realistic expectations and transparent project discussions matter at every stage.',
    descMobile: 'Clear communication at every step.',
    color: '#EC4899',
    icon: <MessageSquare size={17} />,
    className: styles.principlePink,
  },
  {
    number: '03',
    title: 'Build With Purpose',
    desc: 'Every design choice and feature should have a reason. We focus on solutions that are useful, practical and appropriate for the business.',
    descMobile: 'Practical solutions, built to fit.',
    color: '#F59E0B',
    icon: <Target size={17} />,
    className: styles.principleAmber,
  },
  {
    number: '04',
    title: 'Own The Outcome',
    desc: 'We take responsibility for the work we agree to deliver, from the initial discussion to testing and final handover.',
    descMobile: 'Full accountability, start to finish.',
    color: '#14B8A6',
    icon: <Handshake size={17} />,
    className: styles.principleTeal,
  },
];

export function AboutSection({ onOpenProposal }: AboutSectionProps) {
  // Flight track hover state: only one card animates at a time
  const [activePrinciple, setActivePrinciple] = useState<string | null>(null);

  // Parallax tracking for the floating right-side visual
  const stageRef = useRef<HTMLDivElement>(null);
  const [stageTilt, setStageTilt] = useState({ x: 0, y: 0 });

  const handleStageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setStageTilt({ x: -ny * 7, y: nx * 7 });
  };

  const handleStageMouseLeave = () => {
    setStageTilt({ x: 0, y: 0 });
  };

  // 3D Parallax tracking for the founder hero portrait (max 3 deg tilt)
  const founderStageRef = useRef<HTMLDivElement>(null);
  const [founderTilt, setFounderTilt] = useState({ x: 0, y: 0 });

  const handleFounderMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!founderStageRef.current) return;
    const rect = founderStageRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setFounderTilt({ x: -ny * 3, y: nx * 3 });
  };

  const handleFounderMouseLeave = () => {
    setFounderTilt({ x: 0, y: 0 });
  };

  // Scroll reveal on the About section (panel rises and unfolds from 0.98 scale as you scroll)
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 55%'],
  });

  const rawScale = useTransform(scrollYProgress, [0, 1], [0.98, 1]);
  const rawY = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const smoothScale = useSpring(rawScale, { stiffness: 90, damping: 22 });
  const smoothY = useSpring(rawY, { stiffness: 90, damping: 22 });

  const sectionScale = shouldReduceMotion ? 1 : smoothScale;
  const sectionY = shouldReduceMotion ? 0 : smoothY;

  return (
    <motion.section
      ref={sectionRef}
      id="about"
      className={styles.aboutSection}
      style={{ scale: sectionScale, y: sectionY }}
    >
      {/* 1. CURVED SEAM & BREATHING LAVENDER EDGE GLOW */}
      <div className={styles.curvedSeamContainer} aria-hidden="true">
        <svg
          viewBox="0 0 1440 64"
          fill="none"
          preserveAspectRatio="none"
          className={styles.curvedSeamSvg}
        >
          <defs>
            <linearGradient id="seamLavenderGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A855F7" stopOpacity="0" />
              <stop offset="20%" stopColor="#C084FC" stopOpacity="0.75" />
              <stop offset="50%" stopColor="#F5D0FE" stopOpacity="1" />
              <stop offset="80%" stopColor="#C084FC" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
            </linearGradient>
            <filter id="seamSoftGlow" x="-10%" y="-100%" width="120%" height="300%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Smooth curved tapered seam rising into the dark hero */}
          <path d="M 0 54 Q 720 0 1440 54 L 1440 66 L 0 66 Z" fill="#FAF6EF" />
          {/* Soft breathing lavender edge glow line right along the transition seam */}
          <path
            d="M 0 54 Q 720 0 1440 54"
            fill="none"
            stroke="url(#seamLavenderGlow)"
            strokeWidth="2.5"
            filter="url(#seamSoftGlow)"
            className={styles.edgeGlowLine}
          />
        </svg>
      </div>

      {/* Backward-compatibility anchor for existing navigation links */}
      <div id="why" style={{ position: 'absolute', top: '-70px', left: 0 }} aria-hidden="true" />

      {/* Subtle organic noise/grain texture overlay */}
      <div className={styles.grainOverlay} aria-hidden="true" />

      <div className={`container ${styles.innerContainer}`}>
        {/* ========================================================
            1. STORY SECTION (LIGHTER PANEL + RADIAL STUDIO LIGHT)
            ======================================================== */}
        <div className={styles.storyPanelWrapper}>
          <div className={styles.storyStudioLightGlow} aria-hidden="true" />

          <div className={styles.storyGrid}>
            {/* LEFT COLUMN: 150ms Cascading Content Stagger (Only after 20% in view) */}
            <motion.div
              className={styles.storyLeftCol}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={storyStaggerContainer}
            >
              {/* 1. Label */}
              <motion.div className={styles.editorialEyebrow} variants={storyItemFadeUp}>
                <span className={styles.eyebrowDot} />
                <span>BEHIND THE WORK — THE WEBKRAFTX STORY</span>
              </motion.div>

              {/* 2. Headline (150ms later) */}
              <motion.h2 className={styles.storyHeadline} variants={storyItemFadeUp}>
                Every business starts with an idea. We help give it a{' '}
                <span className={styles.lavenderText}>digital life.</span>
              </motion.h2>

              {/* 3. Paragraph 1 (150ms later) */}
              <motion.p className={styles.storyParagraph} variants={storyItemFadeUp}>
                WebKraftX started with a simple belief: businesses shouldn&apos;t need complicated processes or oversized budgets to build a meaningful digital presence.
              </motion.p>

              {/* 4. Paragraph 2 (150ms later) */}
              <motion.p className={styles.storyParagraph} variants={storyItemFadeUp}>
                We&apos;re a growing digital solutions team from Bengaluru, bringing together development, design and creativity to help businesses turn their ideas into something real.
              </motion.p>

              {/* 5. Paragraph 3 (150ms later) */}
              <motion.p className={styles.storyParagraph} variants={storyItemFadeUp}>
                We may be at the beginning of our journey, but our approach is clear: understand before building, be honest about what&apos;s possible, and take responsibility for the work we deliver.
              </motion.p>

              {/* 6. Location (150ms later) */}
              <motion.div className={styles.locationIndicator} variants={storyItemFadeUp}>
                <span className={styles.locationPinDot} />
                <span>BASED IN BENGALURU, KARNATAKA</span>
              </motion.div>
            </motion.div>

            {/* RIGHT COLUMN: ASYMMETRICAL 3D DIGITAL EXPERIENCE SCULPTURE */}
            <motion.div
              ref={stageRef}
              className={styles.compositionStageWrapper}
              onMouseMove={handleStageMouseMove}
              onMouseLeave={handleStageMouseLeave}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className={styles.composition3dScene}
                style={{
                  transform: `rotateX(${stageTilt.x}deg) rotateY(${stageTilt.y}deg)`,
                  transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <img
                  src={aboutExperienceImg}
                  alt="WebKraftX Digital Solutions & Experience"
                  className={styles.about3dCompositionImg}
                  draggable={false}
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* ========================================================
            2. BELIEFS SECTION (LIGHT HAPPY MULTI-COLOR DESIGN)
            ======================================================== */}
        <div className={styles.beliefsBlock}>
          {/* 4 Soft Blurred Ambient Color Blobs */}
          <div className={styles.beliefsBlobViolet} aria-hidden="true" />
          <div className={styles.beliefsBlobPink} aria-hidden="true" />
          <div className={styles.beliefsBlobAmber} aria-hidden="true" />
          <div className={styles.beliefsBlobSky} aria-hidden="true" />

          {/* Tiny ✦ sparkle accents */}
          <span className={styles.beliefsSparkle1} aria-hidden="true">✦</span>
          <span className={styles.beliefsSparkle2} aria-hidden="true">✦</span>
          <span className={styles.beliefsSparkle3} aria-hidden="true">✦</span>

          {/* Header */}
          <div className={styles.beliefsHeader}>
            <motion.h3
              className={styles.beliefsSectionTitle}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className={styles.multiGradientDot} aria-hidden="true" />
              <span>WHAT WE BELIEVE IN</span>
            </motion.h3>
            <motion.p
              className={styles.beliefsSubtitle}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12 }}
            >
              Four <span className={styles.corePrinciplesAccent}>core principles</span> guiding every client engagement
            </motion.p>
          </div>

          {/* 4 Multi-Color Cheerful Cards */}
          <div className={styles.principlesHorizontalGrid}>
            {PRINCIPLES.map((item, idx) => (
              <motion.div
                key={item.number}
                className={`${styles.principleCard} ${item.className}`}
                initial={{ opacity: 0, scale: 0.94, y: 22 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.1,
                  ease: [0.34, 1.3, 0.64, 1], // enthusiastic slight overshoot bounce
                }}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                      y: -8,
                      rotateZ: idx % 2 === 0 ? -1.8 : 1.8,
                    }
                }
              >
                {/* Top Row: Colorful Bold Number & Soft Tinted Icon Circle */}
                <div className={styles.principleCardTopRow}>
                  <span className={styles.principleNumber}>{item.number}</span>
                  <div className={styles.principleIconCircle}>
                    {item.icon}
                  </div>
                </div>

                {/* Title */}
                <h4 className={styles.principleTitle}>{item.title}</h4>

                {/* Body Description (Dark text for maximum readability) */}
                <p className={styles.principleDesc}>
                  <span className={styles.descDesktop}>{item.desc}</span>
                  <span className={styles.descMobile}>{item.descMobile}</span>
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ========================================================
            3. FOUNDER SECTION (ELEVATED #241540 PANEL + PRISTINE PORTRAIT)
            ======================================================== */}
        <div className={styles.founderBlock}>
          <div className={styles.founderSectionHeader}>
            <span className={styles.eyebrowDot} />
            <span className={styles.founderSectionTag}>THE PEOPLE BEHIND THE WORK</span>
          </div>

          <motion.div
            className={styles.founderGrid}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.founderAmbientGlow} aria-hidden="true" />

            {/* LEFT: 3D Founder Hero Badge with untouched high-res artwork & gentle tilt */}
            <div
              ref={founderStageRef}
              className={styles.founderPortraitContainer}
              onMouseMove={handleFounderMouseMove}
              onMouseLeave={handleFounderMouseLeave}
            >
              <motion.div
                className={styles.founderPortraitFrame}
                style={{
                  transform: `rotateX(${founderTilt.x}deg) rotateY(${founderTilt.y}deg)`,
                  transition: 'transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                initial={{ opacity: 0, scale: 0.96, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={styles.founderFloatScene}>
                  <img
                    src={founderBadgeImg}
                    alt="Rithvik Krishna V. - Founder of WebKraftX"
                    className={styles.founderPortraitImg}
                    draggable={false}
                  />
                </div>
              </motion.div>
            </div>

            {/* RIGHT: Founder Story & Credo */}
            <div className={styles.founderDetailsCol}>
              <motion.span
                className={styles.founderEyebrow}
                initial={{ opacity: 0, letterSpacing: '0.24em' }}
                whileInView={{ opacity: 1, letterSpacing: '0.16em' }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              >
                THE PERSON BEHIND WEBKRAFTX
              </motion.span>

              {/* Name: Word-by-word rise with blur-to-sharp entrance on scroll */}
              <h3 className={styles.founderName}>
                {['Rithvik', 'Krishna', 'V.'].map((word, index) => (
                  <span key={word} className={styles.founderWordMask}>
                    <motion.span
                      className={styles.founderWordInner}
                      initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
                      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.18 + index * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      {word}&nbsp;
                    </motion.span>
                  </span>
                ))}
              </h3>

              {/* Role line: fades up after name */}
              <motion.p
                className={styles.founderRole}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
              >
                Founder &amp; Digital Solutions Lead
              </motion.p>

              {/* Small purple divider line: draws left-to-right (~0.5s) right after role line */}
              <motion.div
                className={styles.founderDividerLine}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.54, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Paragraphs: staggered fade-up on scroll (120-150ms apart), static afterwards */}
              <div className={styles.founderBioText}>
                <motion.p
                  className={styles.founderBioParagraph}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                >
                  WebKraftX began with an idea to make digital solutions more accessible, practical and meaningful for businesses.
                </motion.p>
                <motion.p
                  className={styles.founderBioParagraph}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: 0.78, ease: [0.16, 1, 0.3, 1] }}
                >
                  As the founder, I focus on understanding business requirements, shaping digital ideas and bringing together the right development, design and creative solutions.
                </motion.p>
                <motion.p
                  className={styles.founderBioParagraph}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: 0.91, ease: [0.16, 1, 0.3, 1] }}
                >
                  I believe good work starts with listening, honest communication and a clear understanding of what a business actually needs.
                </motion.p>
                <motion.p
                  className={styles.founderBioParagraph}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: 1.04, ease: [0.16, 1, 0.3, 1] }}
                >
                  My goal is to build WebKraftX into a dependable digital partner, where every project receives genuine attention, thoughtful execution and a commitment to quality.
                </motion.p>
              </div>

              <motion.div
                className={styles.founderMetaFooter}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 1.16, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={styles.founderLocation}>
                  <MapPin size={14} color="#C8F31D" />
                  <span>Bengaluru, Karnataka</span>
                </div>

                <div className={styles.founderBrandMarkWrap}>
                  <BrandWordmark />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

// Alias for any existing imports
export { AboutSection as WhySection };
