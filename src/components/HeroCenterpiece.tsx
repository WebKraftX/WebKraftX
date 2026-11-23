import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import styles from './HeroCenterpiece.module.css';

// 7 Isolated 3D Master Assets
import podiumImg from '../assets/3d/podium.png';
import gemImg from '../assets/3d/gem.png';
import ribbonImg from '../assets/3d/ribbon.png';
import websitesImg from '../assets/3d/websites.png';
import appsImg from '../assets/3d/applications.png';
import marketingImg from '../assets/3d/marketing.png';
import brandingImg from '../assets/3d/branding.png';

// Snap-to-origin configuration: allows dragging across the screen,
// and springs right back to its exact home position on release.
const FREE_DRAG_SNAP = {
  drag: true,
  dragSnapToOrigin: true,
  dragTransition: { bounceStiffness: 450, bounceDamping: 26 },
};

export function HeroCenterpiece() {
  const [isCharged, setIsCharged] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  // Smooth Mouse Parallax tracking
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  const springConfig = { stiffness: 90, damping: 20, mass: 0.8 };
  const smoothX = useSpring(rawMouseX, springConfig);
  const smoothY = useSpring(rawMouseY, springConfig);

  // Depth transforms for layered parallax:
  // Central gem moves least; front cards move most; central gem tilts in 3D toward cursor
  const gemX = useTransform(smoothX, [-1, 1], [-6, 6]);
  const gemY = useTransform(smoothY, [-1, 1], [-6, 6]);
  const gemRotateX = useTransform(smoothY, [-1, 1], [6, -6]);
  const gemRotateY = useTransform(smoothX, [-1, 1], [-7, 7]);

  const websitesX = useTransform(smoothX, [-1, 1], [-14, 14]);
  const websitesY = useTransform(smoothY, [-1, 1], [-12, 12]);

  const appsX = useTransform(smoothX, [-1, 1], [-12, 12]);
  const appsY = useTransform(smoothY, [-1, 1], [-10, 10]);

  const marketingX = useTransform(smoothX, [-1, 1], [-9, 9]);
  const marketingY = useTransform(smoothY, [-1, 1], [-8, 8]);

  const brandingX = useTransform(smoothX, [-1, 1], [-16, 16]);
  const brandingY = useTransform(smoothY, [-1, 1], [-14, 14]);

  const ribbonX = useTransform(smoothX, [-1, 1], [-4, 4]);
  const ribbonY = useTransform(smoothY, [-1, 1], [-3, 3]);

  const podiumGlowX = useTransform(smoothX, [-1, 1], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const normX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (rect.width / 2)));
    const normY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (rect.height / 2)));
    rawMouseX.set(normX);
    rawMouseY.set(normY);
  };

  const handleMouseLeave = () => {
    rawMouseX.set(0);
    rawMouseY.set(0);
  };

  useEffect(() => {
    const handleCharge = () => {
      setIsCharged(true);
      const timer = setTimeout(() => setIsCharged(false), 550);
      return () => clearTimeout(timer);
    };

    window.addEventListener('charge-gem', handleCharge);
    return () => window.removeEventListener('charge-gem', handleCharge);
  }, []);

  return (
    <div
      ref={stageRef}
      className={styles.stageWrapper}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Volumetric Radial Stage Glow behind the composition */}
      <div className={styles.stageBackdropGlow} aria-hidden="true" />
      <div className={styles.podiumLightBeam} aria-hidden="true" />

      {/* FIXED 630×510 STAGE CANVAS */}
      <div className={styles.stageCanvas}>
        {/* 1. BOTTOM CIRCLE / PODIUM with crystal reflection highlight */}
        <div className={styles.podiumLayer} aria-hidden="true">
          <img
            src={podiumImg}
            alt="WebKraftX 3D Stage Podium"
            className={styles.podiumImg}
            draggable={false}
          />
          {/* Dynamic podium glow reflection tracking gem tilt */}
          <motion.div
            className={styles.podiumReflectionGlow}
            style={{ x: podiumGlowX }}
            aria-hidden="true"
          />
        </div>

        {/* 2. CENTER RING / ORBITAL RIBBON with traveling light streak */}
        <motion.div
          className={styles.ribbonLayer}
          style={{ x: ribbonX, y: ribbonY }}
          aria-hidden="true"
        >
          <img
            src={ribbonImg}
            alt="Orbital Ribbon Ring"
            className={styles.ribbonImg}
            draggable={false}
          />
          {/* Continuous light streak traveling along the orbit ribbon */}
          <div className={styles.ribbonHighlight} aria-hidden="true" />
        </motion.div>

        {/* 3. WEBSITES CARD (Top-Left) - Independent float bob + mouse parallax + lift on hover */}
        <motion.div
          className={styles.websitesLayer}
          style={{ x: websitesX, y: websitesY }}
          {...FREE_DRAG_SNAP}
          whileDrag={{ scale: 1.08, zIndex: 100, cursor: 'grabbing' }}
          whileHover={{ y: -8, scale: 1.04, zIndex: 60 }}
          title="Drag Websites card"
        >
          <div className={styles.websitesFloatInner}>
            <img
              src={websitesImg}
              alt="Websites 3D Glass Card"
              className={styles.cardImg}
              draggable={false}
            />
          </div>
        </motion.div>

        {/* 4. APPLICATIONS CARD (Top-Right) - Independent float bob + mouse parallax */}
        <motion.div
          className={styles.applicationsLayer}
          style={{ x: appsX, y: appsY }}
          {...FREE_DRAG_SNAP}
          whileDrag={{ scale: 1.08, zIndex: 100, cursor: 'grabbing' }}
          whileHover={{ y: -8, scale: 1.04, zIndex: 60 }}
          title="Drag Applications card"
        >
          <div className={styles.applicationsFloatInner}>
            <img
              src={appsImg}
              alt="Applications 3D Glass Card"
              className={styles.cardImg}
              draggable={false}
            />
          </div>
        </motion.div>

        {/* 5. DIGITAL MARKETING CARD (Bottom-Left, sits BEHIND Gem) */}
        <motion.div
          className={styles.marketingLayer}
          style={{ x: marketingX, y: marketingY }}
          {...FREE_DRAG_SNAP}
          whileDrag={{ scale: 1.08, zIndex: 100, cursor: 'grabbing' }}
          whileHover={{ y: -8, scale: 1.04, zIndex: 60 }}
          title="Drag Digital Marketing card"
        >
          <div className={styles.marketingFloatInner}>
            <img
              src={marketingImg}
              alt="Digital Marketing 3D Glass Card"
              className={styles.cardImg}
              draggable={false}
            />
          </div>
        </motion.div>

        {/* 6. CENTRAL WX CRYSTAL GEM (Center, sits IN FRONT of Marketing card) */}
        {/* Continuous 360-degree rotation + zero-gravity float + facet light pulse */}
        <motion.div
          className={`${styles.gemLayer} ${isCharged ? styles.gemCharged : ''}`}
          style={{
            x: gemX,
            y: gemY,
            rotateX: gemRotateX,
            rotateY: gemRotateY,
          }}
          {...FREE_DRAG_SNAP}
          whileDrag={{ scale: 1.08, zIndex: 100, cursor: 'grabbing' }}
          whileHover={{ scale: 1.03, zIndex: 70 }}
          title="Drag WX Crystal Gem"
        >
          <div className={styles.gemFloatInner}>
            <div className={styles.gemRotateContainer}>
              <div className={styles.gemImgWrapper}>
                <img
                  src={gemImg}
                  alt="WebKraftX Central Crystal Gem"
                  className={styles.gemImg}
                  draggable={false}
                />
                {/* Soft purple reflection shimmer drifting across facet surface */}
                <div className={styles.gemSurfaceShimmer} aria-hidden="true" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* 7. BRANDING & CREATIVE CARD (Bottom-Right) */}
        <motion.div
          className={styles.brandingLayer}
          style={{ x: brandingX, y: brandingY }}
          {...FREE_DRAG_SNAP}
          whileDrag={{ scale: 1.08, zIndex: 100, cursor: 'grabbing' }}
          whileHover={{ y: -8, scale: 1.04, zIndex: 60 }}
          title="Drag Branding & Creative card"
        >
          <div className={styles.brandingFloatInner}>
            <img
              src={brandingImg}
              alt="Branding & Creative 3D Glass Card"
              className={styles.cardImg}
              draggable={false}
            />
          </div>
        </motion.div>

        {/* Ambient Sparkles ✦ Twinkling at Staggered Intervals */}
        <span className={styles.sparkle1} aria-hidden="true">✦</span>
        <span className={styles.sparkle2} aria-hidden="true">✦</span>
        <span className={styles.sparkle3} aria-hidden="true">✦</span>
        <span className={styles.sparkle4} aria-hidden="true">✦</span>
      </div>
    </div>
  );
}
