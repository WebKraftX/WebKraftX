import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import styles from './ServicesPage.module.css';
import { NINE_SERVICES_CARDS } from '../sections/ServicesSection';

interface ServicesPageProps {
  onNavigateHome: () => void;
  onNavigateRoute: (route: string) => void;
  onRequestQuote: (serviceTitle?: string) => void;
}

const HEADING_WORDS = ['Everything', 'your', 'business', 'needs', 'to', 'grow', 'online.'];

export function ServicesPage({
  onNavigateHome,
  onNavigateRoute,
  onRequestQuote,
}: ServicesPageProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={styles.servicesPageRoot}>
      {/* Ambient lighting glow */}
      <div className={styles.ambientWarmGlow} aria-hidden="true" />

      <div className={styles.pageContainer}>
        {/* Back to Home Button */}
        {onNavigateHome && (
          <div className={styles.backButtonRow}>
            <button
              type="button"
              className={styles.backToHomeBtn}
              onClick={onNavigateHome}
              aria-label="Back to Home"
            >
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </button>
          </div>
        )}

        {/* --------------------------------------------------------
            1. PAGE HEADER
            -------------------------------------------------------- */}
        <section className={styles.headerSection}>
          {/* Breadcrumb */}
          <div className={styles.breadcrumbRow}>
            <button className={styles.breadcrumbLink} onClick={onNavigateHome}>
              Home
            </button>
            <span className={styles.breadcrumbSep}>/</span>
            <span className={styles.breadcrumbActive}>Services</span>
          </div>

          {/* Eyebrow */}
          <div>
            <span className={styles.eyebrow}>OUR SERVICES</span>
          </div>

          {/* Mask Reveal Word-by-Word Heading */}
          <div className={styles.headingWrapper}>
            <h1 className={styles.mainHeading}>
              {HEADING_WORDS.map((word, idx) => (
                <span key={word + idx} className={styles.wordMask}>
                  <motion.span
                    className={styles.wordInner}
                    initial={shouldReduceMotion ? { opacity: 1 } : { y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.15 + idx * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {word}&nbsp;
                  </motion.span>
                </span>
              ))}
            </h1>
          </div>

          {/* Subheading */}
          <motion.p
            className={styles.subHeading}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Seven focused services engineered for conversion, performance, and commercial growth.
          </motion.p>
        </section>

        {/* --------------------------------------------------------
            2. TOTAL 7 SERVICE CARDS (4 in Row 1 + 3 Centered in Row 2)
            -------------------------------------------------------- */}
        <section className={styles.nineCardsSection}>
          <div className={styles.nineCardsGrid}>
            {NINE_SERVICES_CARDS.map((card, index) => (
              <motion.div
                key={card.id}
                className={styles.cardContainer}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.5,
                  delay: 0.06 + index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => onNavigateRoute('/services/' + card.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onNavigateRoute('/services/' + card.id);
                  }
                }}
                style={{ cursor: 'pointer' }}
              >
                <div className={styles.cardSurface}>
                  {/* 3D Illustration Area */}
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
        </section>

        {/* --------------------------------------------------------
            3. BOTTOM CONSULTATION CTA BANNER
            -------------------------------------------------------- */}
        <section className={styles.bottomCtaBanner}>
          <div className={styles.bottomCtaLeft}>
            <h3 className={styles.bottomCtaHeading}>Not sure which service fits your stage?</h3>
            <p className={styles.bottomCtaText}>
              Tell us about your business goals and current bottlenecks. We’ll recommend the exact right combination of web, growth, and content services without overselling.
            </p>
          </div>
          <div>
            <button
              className={styles.bottomCtaBtn}
              onClick={() => onNavigateRoute('/contact')}
            >
              <span>Let's Build Together</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
