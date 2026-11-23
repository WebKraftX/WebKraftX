import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  MessageSquare,
  Mail,
  Phone,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import paperPlaneMiniImg from '../assets/paper-plane-mini.png';
import styles from './CtaSection.module.css';

interface CtaSectionProps {
  onOpenProposal?: () => void;
  onNavigateRoute?: (route: string) => void;
}

const SUPPORTING_POINTS = [
  'Direct communication',
  'Clear project discussions',
  'No obligation to proceed',
];

export function CtaSection({ onOpenProposal, onNavigateRoute }: CtaSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  const handleStartProject = () => {
    if (onOpenProposal) {
      onOpenProposal();
    } else if (onNavigateRoute) {
      onNavigateRoute('/contact');
    } else {
      window.location.href = '/contact';
    }
  };

  const handleNavigateContact = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateRoute) {
      onNavigateRoute('/contact');
    } else {
      window.location.href = '/contact';
    }
  };

  return (
    <section id="contact" className={styles.ctaSection}>
      {/* Background Soft Violet Decorative Shapes */}
      <div className={styles.decorOrbTopLeft} aria-hidden="true" />
      <div className={styles.decorOrbBottomRight} aria-hidden="true" />

      {/* Subtle Ambient Geometric Curve */}
      <svg
        className={styles.decorativeCurveSvg}
        viewBox="0 0 1200 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M0,200 C300,120 450,280 750,180 C950,110 1100,240 1200,200"
          stroke="rgba(120, 56, 232, 0.12)"
          strokeWidth="2.5"
          strokeDasharray="6 6"
        />
        <circle cx="750" cy="180" r="5" fill="#7838E8" opacity="0.3" />
        <circle cx="450" cy="280" r="4" fill="#A66BFF" opacity="0.25" />
      </svg>

      <div className={`container ${styles.innerContainer}`}>
        {/* Main Secondary Surface Card */}
        <motion.div
          className={styles.ctaSurfaceCard}
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Subtle 3D Digital Creativity Brand Accent: Floating Paper Plane */}
          <div className={styles.floatingPlaneWrapper} aria-hidden="true">
            <motion.img
              src={paperPlaneMiniImg}
              alt=""
              className={styles.floatingPlaneImg}
              draggable={false}
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      y: [-4, 6, -4],
                      rotate: [-2, 2, -2],
                    }
              }
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>

          {/* Small Label */}
          <motion.div
            className={styles.sectionLabel}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <Sparkles size={14} className={styles.labelSparkle} aria-hidden="true" />
            <span>LET&apos;S START WITH A CONVERSATION</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            className={styles.mainHeading}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            Have an idea? Let&apos;s make it happen.
          </motion.h2>

          {/* Description */}
          <motion.p
            className={styles.description}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            Whether you need a website, an application or a stronger digital presence, tell us what you have in mind. We&apos;ll understand your requirements, discuss what&apos;s possible and help you find the right way forward.
          </motion.p>

          {/* CTA Buttons Directly Below Description */}
          <motion.div
            className={styles.actionsRow}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Primary Button: Violet */}
            <motion.button
              type="button"
              className={styles.primaryBtn}
              onClick={handleStartProject}
              whileHover={shouldReduceMotion ? {} : { y: -2 }}
              whileTap={shouldReduceMotion ? {} : { y: 0 }}
            >
              <span>Start a Project</span>
              <ArrowRight size={17} className={styles.btnArrow} />
            </motion.button>

            {/* Secondary Button: WhatsApp Green */}
            <motion.a
              href="https://wa.me/917708136273?text=Hi%20WebKraftX%2C%20I%20have%20an%20idea%20for%20a%20project%20and%20would%20love%20to%20discuss%20it."
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappBtn}
              whileHover={shouldReduceMotion ? {} : { y: -2 }}
              whileTap={shouldReduceMotion ? {} : { y: 0 }}
            >
              <MessageSquare size={17} className={styles.whatsappIcon} />
              <span>Chat on WhatsApp</span>
            </motion.a>
          </motion.div>

          {/* Supporting Information Reassurance */}
          <motion.div
            className={styles.supportingInfoRow}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {SUPPORTING_POINTS.map((point) => (
              <div key={point} className={styles.supportingItem}>
                <CheckCircle2 size={16} className={styles.checkIcon} aria-hidden="true" />
                <span>{point}</span>
              </div>
            ))}
          </motion.div>

          {/* Direct Email & Phone Contact Strip */}
          <motion.div
            className={styles.directContactStrip}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className={styles.contactPrompt}>Prefer direct correspondence?</span>
            <div className={styles.contactLinksGroup}>
              <a
                href="mailto:contact.webkraftx@gmail.com"
                className={styles.contactLink}
                title="Send an email to WebKraftX"
              >
                <Mail size={15} className={styles.contactLinkIcon} aria-hidden="true" />
                <span>contact.webkraftx@gmail.com</span>
              </a>
              <span className={styles.contactSeparator} aria-hidden="true">•</span>
              <a
                href="tel:+917708136273"
                className={styles.contactLink}
                title="Call WebKraftX"
              >
                <Phone size={14} className={styles.contactLinkIcon} aria-hidden="true" />
                <span>+91 7708136273</span>
              </a>
              <span className={styles.contactSeparator} aria-hidden="true">•</span>
              <a
                href="/contact"
                onClick={handleNavigateContact}
                className={styles.contactPageLink}
              >
                <span>Visit Contact Page &rarr;</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
