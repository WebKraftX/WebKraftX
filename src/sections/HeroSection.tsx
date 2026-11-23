import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { HeroCollaborationShowcase } from '../components/HeroCollaborationShowcase';
import { BrandWordmark } from '../components/BrandLogo';
import styles from './HeroSection.module.css';

interface HeroSectionProps {
  onOpenProposal: () => void;
  onExploreWork: () => void;
  onNavigateRoute?: (route: string) => void;
  onOpenVideoWalkthrough?: (projectId?: string) => void;
}

const HEADLINE_LINE1 = ['Ideas', 'are', 'everywhere.'];
const HEADLINE_LINE2_PLAIN = ['Lets', 'build', 'together'];
const HEADLINE_LINE2_GRADIENT = ['which', 'works.'];

export function HeroSection({
  onOpenProposal,
  onExploreWork,
  onNavigateRoute,
}: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll tracking for layered parallax depth (hero bottom content drifts slower than scroll)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const rawParallaxY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const smoothParallaxY = useSpring(rawParallaxY, { stiffness: 100, damping: 25 });
  const parallaxBottomY = shouldReduceMotion ? 0 : smoothParallaxY;

  const rawRightY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const smoothRightY = useSpring(rawRightY, { stiffness: 100, damping: 25 });
  const parallaxRightY = shouldReduceMotion ? 0 : smoothRightY;

  return (
    <section ref={heroRef} id="hero" className={styles.heroSection}>
      {/* Background Ambient Glows & Sparkles with Drifting Nebula */}
      <div className={styles.ambientGlowTop} aria-hidden="true" />
      <div className={styles.ambientGlowRight} aria-hidden="true" />

      {/* Decorative Sparkles with Staggered Twinkle */}
      <div className={styles.sparkle1} aria-hidden="true">✦</div>
      <div className={styles.sparkle2} aria-hidden="true">✦</div>
      <div className={styles.sparkle3} aria-hidden="true">✦</div>
      <div className={styles.sparkle4} aria-hidden="true">✦</div>

      <div className={`container ${styles.heroContainer}`}>
        {/* Main 2-Column Desktop Grid */}
        <div className={styles.heroGrid}>
          {/* LEFT COLUMN: 50% Content */}
          <div className={styles.leftCol}>
            {/* Headline with Word-by-Word Cinematic Blur-to-Sharp Reveal */}
            <div className={styles.headlineWrapper}>
              {/* Line 1: Ideas are everywhere. */}
              <div className={styles.headlineLine}>
                <motion.span
                  className={styles.headlineLeadSparkle}
                  aria-hidden="true"
                  initial={{ scale: 0, rotate: -45, opacity: 0 }}
                  animate={{
                    scale: [0, 1.35, 1, 1.2, 0.95, 1],
                    rotate: [-45, 15, 0, 10, -6, 0],
                    opacity: [0, 1, 0.9, 1, 0.8, 1],
                  }}
                  transition={{
                    scale: { duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] },
                    rotate: { duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: 0.4, delay: 0.25 },
                  }}
                >
                  <motion.span
                    animate={{
                      scale: [1, 1.25, 0.92, 1.18, 1],
                      rotate: [0, 12, -8, 6, 0],
                      opacity: [0.9, 1, 0.75, 1, 0.9],
                    }}
                    transition={{
                      duration: 4.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 1.0,
                    }}
                    style={{ display: 'inline-block' }}
                  >
                    ✦
                  </motion.span>
                </motion.span>
                {HEADLINE_LINE1.map((word, idx) => (
                  <span key={word} className={styles.wordMask}>
                    <motion.span
                      className={styles.wordInner}
                      initial={{ y: 26, opacity: 0, filter: 'blur(8px)' }}
                      animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                      transition={{
                        duration: 0.65,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.2 + idx * 0.08,
                      }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </div>

              {/* Line 2: Let's build something that works. */}
              <div className={styles.headlineLine}>
                {HEADLINE_LINE2_PLAIN.map((word, idx) => (
                  <span key={word} className={styles.wordMask}>
                    <motion.span
                      className={styles.wordInner}
                      initial={{ y: 26, opacity: 0, filter: 'blur(8px)' }}
                      animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                      transition={{
                        duration: 0.65,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.2 + (HEADLINE_LINE1.length + idx) * 0.08,
                      }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
                {HEADLINE_LINE2_GRADIENT.map((word, idx) => (
                  <span key={word} className={styles.wordMask}>
                    <motion.span
                      className={`${styles.wordInner} ${styles.digitalRealityGradient}`}
                      initial={{ y: 26, opacity: 0, filter: 'blur(8px)' }}
                      animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                      transition={{
                        duration: 0.65,
                        ease: [0.22, 1, 0.36, 1],
                        delay: 0.2 + (HEADLINE_LINE1.length + HEADLINE_LINE2_PLAIN.length + idx) * 0.08,
                      }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Content Group with Layered Parallax Lag */}
            <motion.div style={{ y: parallaxBottomY }} className={styles.bottomParallaxWrap}>
              {/* Description Paragraph */}
              <motion.p
                className={styles.description}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
              >
                Maybe it's your first website, a new business, or an idea you've been waiting to bring to life. Wherever you're starting, we'll help you take the next step with clarity, creativity and honest work.
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                className={styles.ctaGroup}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <motion.button
                  className={styles.primaryLimeBtn}
                  onClick={onOpenProposal}
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ y: 0, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                >
                  <span>Let's Make It Happen</span>
                  <ArrowUpRight size={18} />
                </motion.button>

                <motion.button
                  className={styles.secondaryGlassBtn}
                  onClick={onExploreWork}
                  whileHover={{ y: -3, scale: 1.02 }}
                  whileTap={{ y: 0, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                >
                  <span>Explore Services</span>
                  <ArrowUpRight size={15} style={{ marginLeft: 2 }} />
                </motion.button>
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Big HD Looping Collaboration Grid Showcase */}
          <motion.div className={styles.rightCol} style={{ y: parallaxRightY }}>
            <HeroCollaborationShowcase onNavigateRoute={onNavigateRoute} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
