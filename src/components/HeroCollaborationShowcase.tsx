import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import heroGridGif from '../assets/hero-collaboration-grid.gif';
import styles from './HeroCollaborationShowcase.module.css';

interface HeroCollaborationShowcaseProps {
  onNavigateRoute?: (route: string) => void;
}

export function HeroCollaborationShowcase({ onNavigateRoute }: HeroCollaborationShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Subtle interactive 3D perspective tilt on mouse move
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      className={styles.showcaseRoot}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 1. Large Ambient Nebula Glows Behind Showcase */}
      <div className={styles.nebulaGlowMain} aria-hidden="true" />
      <div className={styles.nebulaGlowSecondary} aria-hidden="true" />

      {/* 2. Twinkling Ambient Sparkles */}
      <span className={styles.sparkleLeft} aria-hidden="true">✦</span>
      <span className={styles.sparkleRight} aria-hidden="true">✦</span>

      {/* 3. Floating Motion Container */}
      <motion.div
        className={styles.floatingContainer}
        animate={
          shouldReduceMotion
            ? {}
            : {
                y: [0, -10, 0],
              }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={
          shouldReduceMotion
            ? undefined
            : {
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }
        }
      >
        {/* Top-Right Floating Live Badge */}
        <div className={styles.badgeTopFloating} aria-hidden="true">
          <span className={styles.badgeTopDot} />
          <span>Available for new projects</span>
        </div>

        {/* 4. Glass Viewport Card (HD Frame) */}
        <div className={styles.glassViewportCard}>
          {/* Header Bar */}
          <div className={styles.windowHeaderBar}>
            <div className={styles.windowDots}>
              <span className={`${styles.dot} ${styles.dotRed}`} />
              <span className={`${styles.dot} ${styles.dotYellow}`} />
              <span className={`${styles.dot} ${styles.dotGreen}`} />
            </div>

            <div className={styles.windowTitle}>
              <span className={styles.liveIndicatorDot} />
              <span>webkraftx.com — Client Dashboard</span>
            </div>
          </div>

          {/* Media Viewport */}
          <div className={styles.mediaViewport}>
            <img
              src={heroGridGif}
              alt="WebKraftX Animated Purple Team Collaboration Grid"
              className={styles.showcaseMedia}
              draggable={false}
              loading="eager"
            />
            {/* Glossy Sheen Overlay */}
            <div className={styles.glassSheenOverlay} aria-hidden="true" />
          </div>
        </div>

        {/* Bottom-Left Floating Badge */}
        <div className={styles.badgeBottomFloating} aria-hidden="true">
          <span className={styles.sparkleIcon}>✦</span>
          <span>Websites · Apps · Marketing · Branding</span>
        </div>
      </motion.div>
    </div>
  );
}
