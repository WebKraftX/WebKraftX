import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import paperPlaneImg from '../assets/paper-plane-3d-violet.png';
import styles from './PaperPlaneFlight.module.css';

export interface Point {
  x: number;
  y: number;
}

interface PaperPlaneFlightProps {
  flight: {
    id: number;
    start: Point;
    end: Point;
    accentColor: string;
  } | null;
  onArrival: (accentColor: string) => void;
  panelContainerRef?: React.RefObject<HTMLDivElement | null>;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
  color: string;
  char: string;
}

export function PaperPlaneFlight({ flight, onArrival, panelContainerRef }: PaperPlaneFlightProps) {
  // Active flight state
  const [planePos, setPlanePos] = useState<{ x: number; y: number; angle: number; scale: number; opacity: number } | null>(null);
  const [trailPath, setTrailPath] = useState<string>('');
  const [burstState, setBurstState] = useState<{ x: number; y: number; accentColor: string; particles: Particle[] } | null>(null);
  const [idleLoopActive, setIdleLoopActive] = useState<boolean>(false);

  const animFrameRef = useRef<number | null>(null);
  const lastFlightIdRef = useRef<number | null>(null);

  // Idle delight: every ~8.5s, a small ghost plane glides lazily across the panel corner
  useEffect(() => {
    const idleTimer = setInterval(() => {
      // Only run if not actively flying
      if (!flight) {
        setIdleLoopActive(true);
        setTimeout(() => setIdleLoopActive(false), 2400);
      }
    }, 8500);

    return () => clearInterval(idleTimer);
  }, [flight]);

  // Handle active flight
  useEffect(() => {
    if (!flight || flight.id === lastFlightIdRef.current) return;
    lastFlightIdRef.current = flight.id;

    const { start, end, accentColor } = flight;
    const startTime = performance.now();
    const duration = 780; // 780ms hand-thrown glide duration

    const dx = end.x - start.x;
    const dy = end.y - start.y;

    // Glider flight control points:
    // P0 = start
    // P1 = rises up like a hand throw
    // P2 = gentle glider dip & banking swoop
    // P3 = end
    const cp1 = { x: start.x + dx * 0.28, y: start.y - 48 };
    const cp2 = { x: start.x + dx * 0.72, y: end.y - 32 };

    const trailPoints: Point[] = [];

    const cubicBezier = (t: number, p0: number, p1: number, p2: number, p3: number) => {
      const mt = 1 - t;
      return (
        mt * mt * mt * p0 +
        3 * mt * mt * t * p1 +
        3 * mt * t * t * p2 +
        t * t * t * p3
      );
    };

    const cubicBezierDerivative = (t: number, p0: number, p1: number, p2: number, p3: number) => {
      const mt = 1 - t;
      return (
        3 * mt * mt * (p1 - p0) +
        6 * mt * t * (p2 - p1) +
        3 * t * t * (p3 - p2)
      );
    };

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const rawT = Math.min(1, elapsed / duration);

      // Smooth glide easing (ease-out with gentle settle)
      // Ease out cubic: 1 - (1-t)^3
      const t = 1 - Math.pow(1 - rawT, 2.6);

      const curX = cubicBezier(t, start.x, cp1.x, cp2.x, end.x);
      const curY = cubicBezier(t, start.y, cp1.y, cp2.y, end.y);

      // Tangent angle
      const derX = cubicBezierDerivative(t, start.x, cp1.x, cp2.x, end.x);
      const derY = cubicBezierDerivative(t, start.y, cp1.y, cp2.y, end.y);
      const baseAngle = (Math.atan2(derY, derX) * 180) / Math.PI;

      // Playful paper-plane wobble banking (banks ±18 deg as it glides)
      const wobbleBank = Math.sin(rawT * Math.PI * 3.5) * 18 * (1 - rawT);
      const totalAngle = baseAngle + wobbleBank;

      // Scale: quick throw pop from 0 to 1 at start
      let scale = 1;
      if (rawT < 0.15) {
        scale = (rawT / 0.15) * 1.15;
      } else if (rawT < 0.25) {
        scale = 1.15 - ((rawT - 0.15) / 0.1) * 0.15;
      } else {
        scale = 1;
      }

      setPlanePos({
        x: curX,
        y: curY,
        angle: totalAngle,
        scale,
        opacity: rawT >= 0.96 ? 1 - (rawT - 0.96) / 0.04 : 1,
      });

      // Update trail
      trailPoints.push({ x: curX, y: curY });
      if (trailPoints.length > 1) {
        let pathStr = `M ${trailPoints[0].x} ${trailPoints[0].y}`;
        for (let i = 1; i < trailPoints.length; i++) {
          pathStr += ` L ${trailPoints[i].x} ${trailPoints[i].y}`;
        }
        setTrailPath(pathStr);
      }

      if (rawT < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Plane Arrival!
        setPlanePos(null);

        // Spawn arrival burst
        const particles: Particle[] = [];
        const burstChars = ['✦', '•', '✦', '•', '✦', '•', '✦', '•'];
        const burstColors = [accentColor, '#C084FC', '#F472B6', '#38BDF8', '#C8F31D'];

        for (let i = 0; i < 8; i++) {
          const angle = (i * Math.PI * 2) / 8 + (Math.random() * 0.4 - 0.2);
          const speed = 32 + Math.random() * 26;
          particles.push({
            id: i,
            x: end.x,
            y: end.y,
            dx: Math.cos(angle) * speed,
            dy: Math.sin(angle) * speed,
            size: Math.random() > 0.4 ? 14 : 9,
            color: burstColors[i % burstColors.length],
            char: burstChars[i % burstChars.length],
          });
        }

        setBurstState({
          x: end.x,
          y: end.y,
          accentColor,
          particles,
        });

        // Trigger arrival callback to swap service content
        onArrival(accentColor);

        // Clear trail and burst after fade
        setTimeout(() => {
          setTrailPath('');
          setBurstState(null);
        }, 550);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [flight, onArrival]);

  return (
    <div className={styles.flightOverlay} aria-hidden="true">
      {/* 1. Cartoon Paper-Plane Dotted Dashed SVG Flight Path Trail */}
      {trailPath && (
        <svg className={styles.trailSvg}>
          <defs>
            <linearGradient id="trailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9B6BFF" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#C084FC" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#F472B6" stopOpacity="0.85" />
            </linearGradient>
            <filter id="trailGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d={trailPath}
            fill="none"
            stroke="url(#trailGrad)"
            strokeWidth="2.5"
            strokeDasharray="4 6"
            strokeLinecap="round"
            filter="url(#trailGlow)"
            className={styles.trailLine}
          />
        </svg>
      )}

      {/* 2. The 3D Violet Paper Plane Flying Element (~54px) */}
      {planePos && (
        <div
          className={styles.planeWrapper}
          style={{
            transform: `translate3d(${planePos.x}px, ${planePos.y}px, 0) translate(-50%, -50%) rotate(${planePos.angle}deg) scale(${planePos.scale})`,
            opacity: planePos.opacity,
          }}
        >
          {/* Soft Violet Backlight Glow */}
          <div className={styles.planeBackGlow} />

          <img
            src={paperPlaneImg}
            alt=""
            className={styles.planeImage}
            draggable={false}
          />
        </div>
      )}

      {/* 3. Arrival Burst on the Panel */}
      <AnimatePresence>
        {burstState && (
          <div
            className={styles.arrivalBurstContainer}
            style={{ left: burstState.x, top: burstState.y }}
          >
            {/* Expanding Violet/Accent Ring Ripple */}
            <motion.div
              className={styles.burstRing}
              style={{ borderColor: burstState.accentColor }}
              initial={{ scale: 0.2, opacity: 0.95 }}
              animate={{ scale: 2.5, opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />

            {/* Quick Tinted Ambient Glow Flash */}
            <motion.div
              className={styles.burstGlowFlash}
              style={{
                background: `radial-gradient(circle, ${burstState.accentColor}99 0%, ${burstState.accentColor}33 50%, transparent 75%)`,
              }}
              initial={{ scale: 0.5, opacity: 1 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            />

            {/* 6-8 Sparkle Particles Bursting Radially */}
            {burstState.particles.map((p) => (
              <motion.span
                key={p.id}
                className={styles.burstParticle}
                style={{
                  color: p.color,
                  fontSize: p.size,
                  textShadow: `0 0 8px ${p.color}`,
                }}
                initial={{ x: 0, y: 0, scale: 1.2, opacity: 1 }}
                animate={{
                  x: p.dx,
                  y: p.dy,
                  scale: 0.3,
                  opacity: 0,
                  rotate: Math.random() > 0.5 ? 45 : -45,
                }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {p.char}
              </motion.span>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* 4. Idle Delight: Ghost Paper Plane lazy glide loop across panel corner */}
      {idleLoopActive && (
        <div className={styles.idleGhostPlaneStage}>
          <motion.div
            className={styles.idleGhostPlane}
            initial={{ x: 120, y: -20, rotate: -35, opacity: 0, scale: 0.65 }}
            animate={{
              x: [-40, -110, -180, -260],
              y: [20, -15, 25, -30],
              rotate: [-20, -45, 10, -25],
              opacity: [0, 0.45, 0.45, 0],
              scale: [0.6, 0.72, 0.68, 0.55],
            }}
            transition={{
              duration: 2.3,
              ease: 'easeInOut',
            }}
          >
            <div className={styles.idleGhostGlow} />
            <img src={paperPlaneImg} alt="" className={styles.idleGhostImg} draggable={false} />
          </motion.div>
        </div>
      )}
    </div>
  );
}
