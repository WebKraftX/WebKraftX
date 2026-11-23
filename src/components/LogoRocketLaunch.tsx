import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './LogoRocketLaunch.module.css';

// 3D Purple Paper Plane Graphic from User
import logoPaperPlaneImg from '../assets/logo-paper-plane.png';

// Exact cubic-bezier(0.3, 0, 0.2, 1) solver for snappy energetic launch
function cubicBezierSolver(p1x: number, p1y: number, p2x: number, p2y: number) {
  return function (t: number): number {
    if (t <= 0) return 0;
    if (t >= 1) return 1;
    let s = t;
    for (let i = 0; i < 8; i++) {
      const currentX = 3 * (1 - s) * (1 - s) * s * p1x + 3 * (1 - s) * s * s * p2x + s * s * s;
      const dx = 3 * (1 - s) * (1 - s) * p1x + 6 * (1 - s) * s * (p2x - p1x) + 3 * s * s * (1 - p2x);
      if (Math.abs(currentX - t) < 1e-5 || Math.abs(dx) < 1e-5) break;
      s -= (currentX - t) / dx;
    }
    return 3 * (1 - s) * (1 - s) * s * p1y + 3 * (1 - s) * s * s * p2y + s * s * s;
  };
}

const easeLaunch = cubicBezierSolver(0.3, 0, 0.2, 1);

// Get exact coordinates of the VX logo rocket icon in the navbar
function getLogoOrigin(): { x: number; y: number } {
  const el = document.querySelector('[data-logo-rocket-origin]') as HTMLElement | null;
  if (el) {
    const rect = el.getBoundingClientRect();
    // The VX origami rocket mark sits at the left portion of the logo
    return {
      x: Math.round(rect.left + 22),
      y: Math.round(rect.top + rect.height * 0.42),
    };
  }
  // Fallback if element not found yet
  const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const containerMargin = Math.max(20, (w - 1280) / 2 + 36);
  return {
    x: Math.round(containerMargin + 22),
    y: 32,
  };
}

export function LogoRocketLaunch() {
  const [windowSize, setWindowSize] = useState({ width: 1200, height: 800 });
  const [stage, setStage] = useState<'idle' | 'igniting' | 'flying' | 'exiting' | 'done'>('idle');

  const [rocketState, setRocketState] = useState({
    x: 60,
    y: 30,
    rotation: 0,
    scale: 0.45,
    opacity: 0,
  });

  const [trailDash, setTrailDash] = useState<string>('0 9999');
  const [trailOffset, setTrailOffset] = useState<number>(0);
  const [showTrail, setShowTrail] = useState<boolean>(false);
  const [pathData, setPathData] = useState<string>('');

  // Sparkles triggered along the flight path
  const [sparkle1, setSparkle1] = useState(false);
  const [sparkle2, setSparkle2] = useState(false);
  const [sparkle3, setSparkle3] = useState(false);
  const [sparkleCoords, setSparkleCoords] = useState<{ s1: { x: number; y: number }; s2: { x: number; y: number }; s3: { x: number; y: number } }>({
    s1: { x: 0, y: 0 },
    s2: { x: 0, y: 0 },
    s3: { x: 0, y: 0 },
  });

  const pathRef = useRef<SVGPathElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const timeoutRefs = useRef<number[]>([]);

  const clearAllTimers = () => {
    timeoutRefs.current.forEach((t) => clearTimeout(t));
    timeoutRefs.current = [];
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth || 1200,
        height: window.innerHeight || 800,
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { width } = windowSize;
  const isMobile = width < 768;

  // Master Flight Trigger
  const triggerLaunch = useCallback(() => {
    clearAllTimers();
    setSparkle1(false);
    setSparkle2(false);
    setSparkle3(false);
    setShowTrail(false);

    const origin = getLogoOrigin();
    const w = window.innerWidth || width;

    // Build Catmull-Rom smooth spline starting EXACTLY from the logo icon
    let pts: { x: number; y: number }[];
    if (isMobile) {
      pts = [
        { x: origin.x, y: origin.y },
        { x: origin.x + 70, y: origin.y + 65 },
        { x: w * 0.52, y: 130 },
        { x: w * 0.78, y: 220 },
        { x: w * 0.65, y: 310 },
        { x: w * 0.46, y: 240 },
        { x: w * 0.68, y: 130 },
        { x: Math.min(w - 25, w * 0.86), y: 34 },
      ];
    } else {
      pts = [
        { x: origin.x, y: origin.y },
        { x: origin.x + 130, y: origin.y + 75 }, // shoots along logo's ~34° upward vector
        { x: w * 0.48, y: 140 }, // Arcs above headline
        { x: w * 0.78, y: 210 }, // Dives near Applications card
        { x: w * 0.83, y: 335 }, // Sweeps down right side of gem
        { x: w * 0.74, y: 430 }, // Loops smoothly under the gem (charges it!)
        { x: w * 0.68, y: 360 }, // Curves upward
        { x: w * 0.80, y: 195 }, // Ascends
        { x: Math.min(w - 60, w * 0.90), y: 38 }, // Exits near Get a Proposal
      ];
    }

    setSparkleCoords({
      s1: pts[3],
      s2: pts[5],
      s3: pts[pts.length - 1],
    });

    let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = i > 0 ? pts[i - 1] : pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = i < pts.length - 2 ? pts[i + 2] : p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }

    setPathData(d);

    // 1. Stage: Igniting at logo
    setStage('igniting');
    setRocketState({
      x: origin.x,
      y: origin.y,
      rotation: 0, // Natural orientation aligns with logo
      scale: 0.5,
      opacity: 1,
    });

    // 2. Flight Launch (after 300ms ignition)
    const tFly = window.setTimeout(() => {
      setStage('flying');
      setShowTrail(true);
      const flightDuration = 2050; // 2.05s sleek flight
      const startTime = performance.now();
      let gemCharged = false;

      const animateFlight = (now: number) => {
        const elapsed = now - startTime;
        const rawProgress = Math.min(1, elapsed / flightDuration);
        const easedProgress = easeLaunch(rawProgress);

        if (pathRef.current) {
          const totalLen = pathRef.current.getTotalLength();
          const distance = easedProgress * totalLen;
          const pt = pathRef.current.getPointAtLength(distance);
          const nextPt = pathRef.current.getPointAtLength(Math.min(distance + 2, totalLen));
          
          // Tangent angle along trajectory
          const tangentAngle = Math.atan2(nextPt.y - pt.y, nextPt.x - pt.x) * (180 / Math.PI);
          // Natural angle of the paper plane image is ~ -33.8deg, so adding 33.8deg aligns its tip forward
          const planeRotation = tangentAngle + 33.8;

          // Scale smoothly expands from 0.5 at logo up to 1.0 in flight
          const currentScale = Math.min(1, 0.5 + easedProgress * 1.5);

          setRocketState({
            x: pt.x,
            y: pt.y,
            rotation: planeRotation,
            scale: currentScale,
            opacity: 1,
          });

          // Comet tail: short ~65px luminous beam directly behind the paper plane
          const tailLen = Math.min(65, distance);
          setTrailDash(`${tailLen} 9999`);
          setTrailOffset(-(distance - tailLen));

          // Trigger sparkles along trajectory
          if (rawProgress >= 0.32) setSparkle1(true);
          if (rawProgress >= 0.58) {
            setSparkle2(true);
            if (!gemCharged) {
              gemCharged = true;
              window.dispatchEvent(new CustomEvent('charge-gem'));
            }
          }
          if (rawProgress >= 0.88) setSparkle3(true);
        }

        if (rawProgress < 1) {
          animFrameRef.current = requestAnimationFrame(animateFlight);
        } else {
          setStage('exiting');
          setShowTrail(false);
        }
      };

      animFrameRef.current = requestAnimationFrame(animateFlight);
    }, 320);

    // 3. Exit pop
    const tExit = window.setTimeout(() => {
      setRocketState((prev) => ({ ...prev, scale: 1.25, opacity: 0 }));
      setShowTrail(false);
    }, 2500);

    // 4. Reset to done
    const tDone = window.setTimeout(() => {
      setStage('done');
    }, 3800);

    timeoutRefs.current.push(tFly, tExit, tDone);
  }, [width, isMobile]);

  // Initial auto-launch on page load (starts 0.8s after mount)
  useEffect(() => {
    const initialTimer = window.setTimeout(() => {
      triggerLaunch();
    }, 850);

    // Listen for manual triggers (e.g. clicking the logo)
    const handleManualLaunch = () => {
      triggerLaunch();
    };

    window.addEventListener('launch-rocket', handleManualLaunch);

    return () => {
      clearTimeout(initialTimer);
      clearAllTimers();
      window.removeEventListener('launch-rocket', handleManualLaunch);
    };
  }, [triggerLaunch]);

  if (stage === 'idle' || stage === 'done') {
    return null;
  }

  return (
    <div className={styles.flightViewportOverlay} aria-hidden="true">
      {/* 1. Fast-Fading Comet Exhaust Tail */}
      <svg
        className={styles.trailSvg}
        viewBox={`0 0 ${windowSize.width} ${windowSize.height}`}
        style={{ opacity: showTrail ? 1 : 0, transition: 'opacity 0.2s ease-out' }}
      >
        <defs>
          <linearGradient id="rocketTrailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A855F7" stopOpacity="0.1" />
            <stop offset="45%" stopColor="#C084FC" stopOpacity="0.75" />
            <stop offset="85%" stopColor="#E879F9" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#C8F31D" stopOpacity="1" />
          </linearGradient>

          <filter id="trailGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur1" />
            <feGaussianBlur stdDeviation="4.5" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          ref={pathRef}
          d={pathData}
          className={styles.trailPath}
          style={{
            strokeDasharray: trailDash,
            strokeDashoffset: trailOffset,
            visibility: showTrail ? 'visible' : 'hidden',
          }}
        />
      </svg>

      {/* 2. Sparkles popping right after rocket passes */}
      <AnimatePresence>
        {sparkle1 && (
          <motion.span
            className={styles.orbitSparkle}
            style={{ left: sparkleCoords.s1.x, top: sparkleCoords.s1.y }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.4, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            ✦
          </motion.span>
        )}
        {sparkle2 && (
          <motion.span
            className={`${styles.orbitSparkle} ${styles.orbitSparkleLavender}`}
            style={{ left: sparkleCoords.s2.x, top: sparkleCoords.s2.y }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.4, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            ✦
          </motion.span>
        )}
        {sparkle3 && (
          <motion.span
            className={styles.orbitSparkle}
            style={{ left: sparkleCoords.s3.x, top: sparkleCoords.s3.y }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.4, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            ✦
          </motion.span>
        )}
      </AnimatePresence>

      {/* 3. The 3D Purple Paper Plane Rocket */}
      <motion.div
        className={styles.rocketWrapper}
        style={{
          left: rocketState.x,
          top: rocketState.y,
          transform: `translate(-50%, -50%) rotate(${rocketState.rotation}deg) scale(${rocketState.scale})`,
          opacity: rocketState.opacity,
        }}
        animate={
          stage === 'igniting'
            ? {
                scale: [0.4, 0.7, 0.65],
                transition: { duration: 0.32, ease: 'easeOut' },
              }
            : stage === 'exiting'
            ? {
                scale: [1, 1.3, 0],
                opacity: [1, 0.7, 0],
                transition: { duration: 0.38, ease: 'easeOut' },
              }
            : {}
        }
      >
        <div className={styles.paperPlaneGraphicWrap}>
          {stage === 'igniting' && <div className={styles.ignitionFlash} aria-hidden="true" />}
          <div className={styles.paperPlaneAura} aria-hidden="true" />
          <img
            src={logoPaperPlaneImg}
            alt="WebKraftX 3D Origami Rocket"
            className={styles.paperPlaneImg}
            draggable={false}
          />
        </div>
      </motion.div>
    </div>
  );
}
