import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, useReducedMotion, useSpring } from 'framer-motion';
import { RotateCw, ArrowUpRight } from 'lucide-react';
import paperPlaneImg from '../assets/paper-plane-3d-violet.png';

// 3D Glass Assets from the User's Composition
import crystalCoreImg from '../assets/hero-crystal-core.png';
import websitesImg from '../assets/hero-websites.png';
import applicationsImg from '../assets/hero-applications.png';
import marketingImg from '../assets/hero-marketing.png';
import brandingImg from '../assets/hero-branding.png';

import styles from './HeroConstellation.module.css';

interface HeroConstellationProps {
  onNavigateRoute?: (route: string) => void;
}

interface ConstellationNode {
  id: string;
  name: string;
  tagline: string;
  image?: string;
  route: string;
  accent: string;
  x: number; // percentage in container (0-100)
  y: number; // percentage in container (0-100)
  width: number;
  height: number;
  rotation: number; // deg
  depth: number;
  floatDuration: number;
  snapProgress: number; // normalized path progress (0..1) when it peels off and snaps
  isHero?: boolean;
}

// Galaxy Connect: Central 3D WX Crystal Core + 3D Glass Orbiting Service Cards
const GALAXY_NODES: ConstellationNode[] = [
  // 1. Central Hero: 3D Faceted Crystal Polyhedron with Illuminated WX Logo
  {
    id: 'crystal-core',
    name: 'WebKraftX',
    tagline: 'Digital Experience Engineering',
    image: crystalCoreImg,
    route: '/services/web-design',
    accent: '#A855F7', // Core Violet/Cyan
    x: 50,
    y: 48,
    width: 155,
    height: 155,
    rotation: 0,
    depth: 1.3,
    floatDuration: 5.2,
    snapProgress: 0.50,
    isHero: true,
  },
  // 2. Websites 3D Glass Card (Top-Left)
  {
    id: 'websites',
    name: 'Websites & Web Apps',
    tagline: 'High-Conversion Architecture',
    image: websitesImg,
    route: '/services/web-design',
    accent: '#38BDF8', // Soft Cyan
    x: 23,
    y: 20,
    width: 138,
    height: 99,
    rotation: -4,
    depth: 0.95,
    floatDuration: 5.6,
    snapProgress: 0.58,
  },
  // 3. Applications 3D Glass Card (Top-Right)
  {
    id: 'applications',
    name: 'Mobile Applications',
    tagline: 'iOS, Android & Digital Products',
    image: applicationsImg,
    route: '/services/web-design',
    accent: '#EC4899', // Lavender / Pink
    x: 77,
    y: 22,
    width: 132,
    height: 111,
    rotation: 3,
    depth: 1.05,
    floatDuration: 4.8,
    snapProgress: 0.65,
  },
  // 4. Digital Marketing 3D Glass Card (Bottom-Left)
  {
    id: 'marketing',
    name: 'Digital Marketing & SEO',
    tagline: 'Rankings, Paid Ads & Growth',
    image: marketingImg,
    route: '/services/digital-marketing',
    accent: '#2DD4BF', // Muted Teal
    x: 22,
    y: 76,
    width: 135,
    height: 97,
    rotation: -3,
    depth: 0.95,
    floatDuration: 5.4,
    snapProgress: 0.72,
  },
  // 5. Branding & Creative 3D Glass Card (Bottom-Right)
  {
    id: 'branding',
    name: 'Branding & Creative Design',
    tagline: 'Visual Identity & Design Systems',
    image: brandingImg,
    route: '/services/branding',
    accent: '#D946EF', // Magenta
    x: 78,
    y: 75,
    width: 140,
    height: 96,
    rotation: 3,
    depth: 1.1,
    floatDuration: 4.6,
    snapProgress: 0.79,
  },
  // 6. Video & Motion (Top-Center)
  {
    id: 'video',
    name: 'Video & Content Creation',
    tagline: 'Shorts, Commercials & Motion',
    route: '/services/video-content',
    accent: '#EF4444', // Red
    x: 50,
    y: 13,
    width: 122,
    height: 88,
    rotation: 2,
    depth: 0.85,
    floatDuration: 5.8,
    snapProgress: 0.85,
  },
  // 7. SEO & Organic Traffic (Right)
  {
    id: 'seo',
    name: 'SEO Optimization',
    tagline: 'Organic Rankings & Authority',
    route: '/services/seo',
    accent: '#22C55E', // Green
    x: 87,
    y: 48,
    width: 120,
    height: 86,
    rotation: -2,
    depth: 0.88,
    floatDuration: 6.2,
    snapProgress: 0.90,
  },
  // 8. E-Commerce Solutions (Bottom-Center)
  {
    id: 'ecommerce',
    name: 'E-Commerce Solutions',
    tagline: 'Shopify, Custom Cart & Scale',
    route: '/services/ecommerce',
    accent: '#FBBF24', // Amber
    x: 50,
    y: 83,
    width: 122,
    height: 88,
    rotation: 1,
    depth: 0.95,
    floatDuration: 5.0,
    snapProgress: 0.94,
  },
  // 9. AI & Custom Engineering (Left)
  {
    id: 'ai-dev',
    name: 'AI & Custom Engineering',
    tagline: 'Next.js, APIs & AI Integration',
    route: '/services/web-design',
    accent: '#38BDF8', // Cyan
    x: 13,
    y: 48,
    width: 120,
    height: 86,
    rotation: 4,
    depth: 0.88,
    floatDuration: 6.0,
    snapProgress: 0.97,
  },
];

// Galaxy Constellation Links: Core connected to all outer nodes + Orbit ring
const GALAXY_LINKS = [
  ['crystal-core', 'websites'],
  ['crystal-core', 'applications'],
  ['crystal-core', 'marketing'],
  ['crystal-core', 'branding'],
  ['crystal-core', 'video'],
  ['crystal-core', 'seo'],
  ['crystal-core', 'ecommerce'],
  ['crystal-core', 'ai-dev'],
  ['websites', 'video'],
  ['video', 'applications'],
  ['applications', 'seo'],
  ['seo', 'branding'],
  ['branding', 'ecommerce'],
  ['ecommerce', 'marketing'],
  ['marketing', 'ai-dev'],
  ['ai-dev', 'websites'],
];

// Curated SVG Path for Paper Plane swoop around the galaxy
const PLANE_FLIGHT_SVG_PATH =
  'M 260 -90 ' +
  'C 280 120, 330 310, 330 480 ' +
  'C 330 570, 240 600, 160 540 ' +
  'C 70 460, 70 280, 140 140 ' +
  'C 220 30, 480 30, 630 140 ' +
  'C 710 230, 710 440, 620 540 ' +
  'C 530 620, 430 550, 370 440 ' +
  'C 340 370, 360 300, 400 240 ' +
  'C 470 140, 600 160, 630 270 ' +
  'C 660 380, 580 500, 460 550 ' +
  'C 330 590, 200 520, 240 400 ' +
  'C 280 280, 440 220, 550 200 ' +
  'C 640 180, 680 110, 710 30';

interface ShootingStar {
  id: number;
  top: number;
  left: number;
  angle: number;
  length: number;
}

export function HeroConstellation({ onNavigateRoute }: HeroConstellationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const virtualPathRef = useRef<SVGPathElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const [replayKey, setReplayKey] = useState<number>(0);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [celebratingNodeId, setCelebratingNodeId] = useState<string | null>(null);
  const [shootingStar, setShootingStar] = useState<ShootingStar | null>(null);

  // Intro State: Plane Position and Locked Nodes
  const [introActive, setIntroActive] = useState<boolean>(!shouldReduceMotion);
  const [idlePlaneActive, setIdlePlaneActive] = useState<boolean>(false);
  const [planeState, setPlaneState] = useState<{
    x: number;
    y: number;
    angle: number;
    scale: number;
    opacity: number;
    trail: Array<{ x: number; y: number }>;
  } | null>(null);

  // Dynamic positions for chasing followers
  const [followerPositions, setFollowerPositions] = useState<
    Record<string, { x: number; y: number; angle: number; opacity: number; scale: number; locked: boolean; flash: boolean }>
  >({});

  // Burst explosion state when plane vanishes
  const [planeBurst, setPlaneBurst] = useState<{ x: number; y: number } | null>(null);

  // Magnetic cursor tracking
  const mouseX = useSpring(0, { stiffness: 90, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 90, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (shouldReduceMotion || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(nx);
      mouseY.set(ny);
    },
    [shouldReduceMotion, mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
    setHoveredNodeId(null);
  }, [mouseX, mouseY]);

  // Handle Replay
  const handleReplayIntro = useCallback(() => {
    setIntroActive(true);
    setIdlePlaneActive(false);
    setFollowerPositions({});
    setPlaneBurst(null);
    setReplayKey((prev) => prev + 1);
  }, []);

  // -------------------------------------------------------------------------
  // MAIN PAPER-PLANE INTRO CHASE SEQUENCE (0 - 4.2s)
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (shouldReduceMotion) {
      setIntroActive(false);
      return;
    }

    const pathElem = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    pathElem.setAttribute('d', PLANE_FLIGHT_SVG_PATH);
    const totalPathLength = pathElem.getTotalLength();
    virtualPathRef.current = pathElem;

    const startTime = performance.now();
    const INTRO_DURATION = 4200;
    let animFrame: number;

    const trailBuffer: Array<{ x: number; y: number }> = [];

    // Initialize follower positions
    const initialFollowers: Record<string, any> = {};
    GALAXY_NODES.forEach((node) => {
      initialFollowers[node.id] = {
        x: 360,
        y: -120,
        angle: 0,
        opacity: 0,
        scale: 0.6,
        locked: false,
        flash: false,
      };
    });
    setFollowerPositions(initialFollowers);

    const updateFrame = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(1, elapsed / INTRO_DURATION);

      const p =
        rawProgress < 0.2
          ? 2.5 * rawProgress * rawProgress
          : rawProgress > 0.85
          ? 1 - Math.pow(-2 * rawProgress + 2, 2) / 2
          : 0.1 + (rawProgress - 0.2) * 1.25;

      const currentDistance = Math.min(totalPathLength, Math.max(0, p * totalPathLength));

      const curPt = pathElem.getPointAtLength(currentDistance);
      const aheadPt = pathElem.getPointAtLength(Math.min(totalPathLength, currentDistance + 2));
      const dx = aheadPt.x - curPt.x;
      const dy = aheadPt.y - curPt.y;
      const baseAngle = (Math.atan2(dy, dx) * 180) / Math.PI;

      const bank = Math.sin(rawProgress * Math.PI * 6) * 18 * (1 - rawProgress * 0.5);
      const totalPlaneAngle = baseAngle + bank;

      trailBuffer.push({ x: curPt.x, y: curPt.y });
      if (trailBuffer.length > 22) trailBuffer.shift();

      const planeOpacity = rawProgress > 0.94 ? Math.max(0, 1 - (rawProgress - 0.94) / 0.06) : 1;
      const planeScale = rawProgress > 0.94 ? 1 + (rawProgress - 0.94) * 3 : 1;

      setPlaneState({
        x: curPt.x,
        y: curPt.y,
        angle: totalPlaneAngle,
        scale: planeScale,
        opacity: planeOpacity,
        trail: [...trailBuffer],
      });

      // Update Follower Ducklings along the path
      const nextFollowers: Record<string, any> = {};

      GALAXY_NODES.forEach((node, idx) => {
        const finalPxX = (node.x * 720) / 100;
        const finalPxY = (node.y * 640) / 100;

        if (rawProgress >= node.snapProgress) {
          const snapAge = (rawProgress - node.snapProgress) / (1 - node.snapProgress);
          nextFollowers[node.id] = {
            x: finalPxX,
            y: finalPxY,
            angle: node.rotation,
            opacity: 1,
            scale: 1,
            locked: true,
            flash: snapAge < 0.15,
          };
        } else {
          const followerLag = (idx + 1) * (totalPathLength * 0.042);
          const followerDist = Math.max(0, currentDistance - followerLag);

          if (currentDistance > followerLag * 0.5) {
            const fPt = pathElem.getPointAtLength(followerDist);
            const fAhead = pathElem.getPointAtLength(Math.min(totalPathLength, followerDist + 2));
            const fdx = fAhead.x - fPt.x;
            const fdy = fAhead.y - fPt.y;
            const fAngle = (Math.atan2(fdy, fdx) * 180) / Math.PI;
            const enterRatio = Math.min(1, (currentDistance - followerLag * 0.5) / 100);

            nextFollowers[node.id] = {
              x: fPt.x,
              y: fPt.y,
              angle: fAngle + Math.sin(rawProgress * 12 + idx) * 8,
              opacity: enterRatio,
              scale: 0.7 + enterRatio * 0.28,
              locked: false,
              flash: false,
            };
          } else {
            nextFollowers[node.id] = {
              x: 260,
              y: -120,
              angle: 45,
              opacity: 0,
              scale: 0.5,
              locked: false,
              flash: false,
            };
          }
        }
      });

      setFollowerPositions(nextFollowers);

      if (rawProgress < 1) {
        animFrame = requestAnimationFrame(updateFrame);
      } else {
        setPlaneBurst({ x: curPt.x, y: curPt.y });
        setPlaneState(null);
        setTimeout(() => {
          setPlaneBurst(null);
          setIntroActive(false);
        }, 600);
      }
    };

    animFrame = requestAnimationFrame(updateFrame);

    return () => {
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, [replayKey, shouldReduceMotion]);

  // Periodic Shooting Star
  useEffect(() => {
    if (shouldReduceMotion) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    const launchShootingStar = () => {
      const star: ShootingStar = {
        id: Date.now(),
        top: Math.random() * 60 + 5,
        left: Math.random() * 40 + 10,
        angle: Math.random() * 25 + 30,
        length: Math.random() * 70 + 90,
      };
      setShootingStar(star);

      setTimeout(() => {
        setShootingStar(null);
      }, 700);

      const nextDelay = Math.random() * 3000 + 4500;
      timeoutId = setTimeout(launchShootingStar, nextDelay);
    };

    timeoutId = setTimeout(launchShootingStar, 4500);
    return () => clearTimeout(timeoutId);
  }, [shouldReduceMotion]);

  // Periodic celebration pulse
  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * GALAXY_NODES.length);
      const chosen = GALAXY_NODES[randomIndex];
      setCelebratingNodeId(chosen.id);
      setTimeout(() => setCelebratingNodeId(null), 1200);
    }, 6000);

    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  // Periodic Idle Paper Plane Glider
  useEffect(() => {
    if (shouldReduceMotion || introActive) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    const triggerIdleFlight = () => {
      setIdlePlaneActive(true);
      setTimeout(() => {
        setIdlePlaneActive(false);
      }, 5200);

      const nextInterval = Math.random() * 4000 + 11000;
      timeoutId = setTimeout(triggerIdleFlight, nextInterval);
    };

    timeoutId = setTimeout(triggerIdleFlight, 3500);
    return () => clearTimeout(timeoutId);
  }, [introActive, shouldReduceMotion]);

  // 52 Twinkling Stars
  const stars = useMemo(() => {
    return Array.from({ length: 52 }).map((_, i) => ({
      id: i,
      x: Math.random() * 96 + 2,
      y: Math.random() * 96 + 2,
      size: Math.random() < 0.15 ? 3 : Math.random() < 0.45 ? 2 : 1.2,
      opacity: Math.random() * 0.5 + 0.3,
      duration: Math.random() * 3 + 2.2,
      delay: Math.random() * 3,
      isCross: i % 11 === 0,
    }));
  }, []);

  const nodeMap = useRef<Map<string, ConstellationNode>>(
    new Map(GALAXY_NODES.map((n) => [n.id, n]))
  ).current;

  // Background Parallax
  const [bgShiftX, setBgShiftX] = useState(0);
  const [bgShiftY, setBgShiftY] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const unsubX = mouseX.on('change', (v) => setBgShiftX(-v * 18));
    const unsubY = mouseY.on('change', (v) => setBgShiftY(-v * 18));
    return () => {
      unsubX();
      unsubY();
    };
  }, [mouseX, mouseY, shouldReduceMotion]);

  return (
    <div
      ref={containerRef}
      className={styles.galaxySceneWrapper}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      key={replayKey}
    >
      {/* 1. LAYERED NEBULA GAS CLOUDS (Seamless ambient glows on hero background) */}
      <div
        className={styles.nebulaParallaxLayer}
        style={{ transform: `translate3d(${bgShiftX}px, ${bgShiftY}px, 0)` }}
        aria-hidden="true"
      >
        <div className={`${styles.nebulaCloud} ${styles.nebulaViolet}`} />
        <div className={`${styles.nebulaCloud} ${styles.nebulaMagenta}`} />
        <div className={`${styles.nebulaCloud} ${styles.nebulaDeepBlue}`} />
        <div className={`${styles.nebulaCloud} ${styles.nebulaTeal}`} />

        {/* Large Soft Center Purple Glow (Zero hard boundaries) */}
        <div className={styles.galaxyCoreGlow} />
      </div>

      {/* 2. STARFIELD */}
      <div className={styles.starfieldContainer} aria-hidden="true">
        {stars.map((star) => (
          <span
            key={star.id}
            className={star.isCross ? styles.crossSparkleStar : styles.pinpointStar}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.isCross ? 'auto' : `${star.size}px`,
              height: star.isCross ? 'auto' : `${star.size}px`,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
              opacity: star.opacity,
            }}
          >
            {star.isCross ? '✦' : null}
          </span>
        ))}
      </div>

      {/* 3. DIAGONAL SHOOTING STARS */}
      {shootingStar && (
        <div
          className={styles.shootingStarTrail}
          style={{
            top: `${shootingStar.top}%`,
            left: `${shootingStar.left}%`,
            width: `${shootingStar.length}px`,
            transform: `rotate(${shootingStar.angle}deg)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* 4. SVG ORBIT RINGS & CONSTELLATION CONNECT NETWORK */}
      <svg
        className={styles.galaxySvgOrbits}
        viewBox="0 0 720 640"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="orbitGradA" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A855F7" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#EC4899" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.22" />
          </linearGradient>
          <linearGradient id="orbitGradB" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#C084FC" stopOpacity="0.16" />
          </linearGradient>
          <linearGradient id="lineGradActive" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A855F7" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#EC4899" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="lineGradDefault" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#EC4899" stopOpacity="0.16" />
          </linearGradient>
        </defs>

        {/* Orbit Ring 1 - Inner Planetary Path */}
        <ellipse
          cx="360"
          cy="307"
          rx="180"
          ry="120"
          transform="rotate(18 360 307)"
          fill="none"
          stroke="url(#orbitGradB)"
          strokeWidth="1.2"
          strokeDasharray="4 6"
        />

        {/* Orbit Ring 2 - Outer Spiral Path */}
        <ellipse
          cx="360"
          cy="307"
          rx="275"
          ry="190"
          transform="rotate(-12 360 307)"
          fill="none"
          stroke="url(#orbitGradA)"
          strokeWidth="1.3"
          strokeDasharray="6 8"
          className={styles.orbitPulse}
        />

        {/* Constellation Connect Lines */}
        {GALAXY_LINKS.map(([fromId, toId], idx) => {
          const fromNode = nodeMap.get(fromId);
          const toNode = nodeMap.get(toId);
          if (!fromNode || !toNode) return null;

          const isActive = hoveredNodeId === fromId || hoveredNodeId === toId;

          const x1 = (fromNode.x * 720) / 100;
          const y1 = (fromNode.y * 640) / 100;
          const x2 = (toNode.x * 720) / 100;
          const y2 = (toNode.y * 640) / 100;

          return (
            <line
              key={`glink-${idx}-${fromId}-${toId}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              className={isActive ? styles.galaxyLineActive : styles.galaxyLine}
              stroke={isActive ? 'url(#lineGradActive)' : 'url(#lineGradDefault)'}
              strokeWidth={isActive ? 2.5 : 1.2}
              strokeDasharray={isActive ? 'none' : '4 6'}
              style={{
                opacity: introActive ? 0.2 : undefined,
                transition: 'opacity 0.6s ease',
              }}
            />
          );
        })}
      </svg>

      {/* 5. GLOWING 3D VIOLET PAPER PLANE LEADER & DOTTED TRAIL */}
      {planeState && (
        <div className={styles.planeFlightOverlay} aria-hidden="true">
          <svg className={styles.planeTrailSvg}>
            {planeState.trail.length > 2 && (
              <polyline
                points={planeState.trail.map((p) => `${p.x},${p.y}`).join(' ')}
                fill="none"
                stroke="#C084FC"
                strokeWidth="2.5"
                strokeDasharray="4 6"
                strokeLinecap="round"
                opacity="0.8"
              />
            )}
          </svg>

          {/* Glowing Violet Paper Plane Leader (~84px) */}
          <div
            className={styles.heroPaperPlaneLeader}
            style={{
              transform: `translate3d(${planeState.x}px, ${planeState.y}px, 0) translate(-50%, -50%) rotate(${planeState.angle}deg) scale(${planeState.scale})`,
              opacity: planeState.opacity,
            }}
          >
            <div className={styles.heroPlaneBacklight} />
            <img src={paperPlaneImg} alt="" className={styles.heroPlaneImg} draggable={false} />
          </div>
        </div>
      )}

      {/* Plane Burst Explosion when it vanishes */}
      {planeBurst && (
        <div
          className={styles.planeBurstContainer}
          style={{ left: planeBurst.x, top: planeBurst.y }}
          aria-hidden="true"
        >
          <div className={styles.burstRing} />
          <div className={styles.burstFlash} />
          {['✦', '•', '✦', '•', '✦', '•', '✦'].map((char, i) => (
            <span
              key={i}
              className={styles.burstSparkle}
              style={{
                transform: `rotate(${i * 51}deg) translate(36px) rotate(-${i * 51}deg)`,
              }}
            >
              {char}
            </span>
          ))}
        </div>
      )}

      {/* Occasional Idle Paper Plane Glider */}
      {idlePlaneActive && !introActive && (
        <motion.div
          className={styles.idlePlaneGlider}
          initial={{ x: -70, y: 460, rotate: -32, opacity: 0 }}
          animate={{
            x: [-70, 220, 520, 780],
            y: [460, 350, 220, 70],
            rotate: [-32, -26, -20, -14],
            opacity: [0, 0.45, 0.45, 0],
          }}
          transition={{
            duration: 5.2,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          aria-hidden="true"
        >
          <div className={styles.idlePlaneGlow} />
          <img src={paperPlaneImg} alt="" className={styles.idlePlaneImg} draggable={false} />
        </motion.div>
      )}

      {/* 6. GALAXY CONNECT CONSTELLATION: 3D Crystal Core + 3D Glass Cards */}
      <div className={styles.spiralGalaxyContainer}>
        {GALAXY_NODES.map((node) => {
          const isHovered = hoveredNodeId === node.id;
          const isCelebrating = celebratingNodeId === node.id;
          const follower = followerPositions[node.id];

          return (
            <GalaxyItem
              key={node.id}
              node={node}
              isHovered={isHovered}
              isCelebrating={isCelebrating}
              introActive={introActive}
              followerState={follower}
              shouldReduceMotion={!!shouldReduceMotion}
              mouseX={mouseX}
              mouseY={mouseY}
              onHoverStart={() => setHoveredNodeId(node.id)}
              onHoverEnd={() => setHoveredNodeId((curr) => (curr === node.id ? null : curr))}
              onClick={() => {
                if (onNavigateRoute) {
                  onNavigateRoute(node.route);
                } else {
                  const servicesElem = document.getElementById('services');
                  servicesElem?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />
          );
        })}
      </div>

      {/* 7. GLASS REPLAY BUTTON */}
      <button
        type="button"
        className={styles.replayWarpBtn}
        onClick={handleReplayIntro}
        title="Replay paper-plane chase intro sequence"
        aria-label="Replay intro sequence"
      >
        <RotateCw size={13} className={introActive ? styles.spinIcon : ''} />
        <span>Replay</span>
      </button>
    </div>
  );
}

// Individual Galaxy Node: 3D WX Crystal Core or 3D Glass Card
interface GalaxyItemProps {
  node: ConstellationNode;
  isHovered: boolean;
  isCelebrating: boolean;
  introActive: boolean;
  followerState?: {
    x: number;
    y: number;
    angle: number;
    opacity: number;
    scale: number;
    locked: boolean;
    flash: boolean;
  };
  shouldReduceMotion: boolean;
  mouseX: any;
  mouseY: any;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
}

function GalaxyItem({
  node,
  isHovered,
  isCelebrating,
  introActive,
  followerState,
  shouldReduceMotion,
  mouseX,
  mouseY,
  onHoverStart,
  onHoverEnd,
  onClick,
}: GalaxyItemProps) {
  const [magneticX, setMagneticX] = useState(0);
  const [magneticY, setMagneticY] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const unsubX = mouseX.on('change', (latestX: number) => {
      setMagneticX(latestX * 38 * node.depth);
    });
    const unsubY = mouseY.on('change', (latestY: number) => {
      setMagneticY(latestY * 38 * node.depth);
    });
    return () => {
      unsubX();
      unsubY();
    };
  }, [mouseX, mouseY, node.depth, shouldReduceMotion]);

  const isChasing = introActive && followerState && !followerState.locked;

  const currentLeft = isChasing ? `${followerState.x}px` : `${node.x}%`;
  const currentTop = isChasing ? `${followerState.y}px` : `${node.y}%`;
  const currentOpacity = isChasing ? followerState.opacity : 1;

  return (
    <motion.div
      className={styles.nodeAnchor}
      style={{
        left: currentLeft,
        top: currentTop,
        zIndex: isHovered ? 75 : node.isHero ? 35 : 15,
        opacity: currentOpacity,
        x: isChasing ? 0 : magneticX,
        y: isChasing ? 0 : magneticY,
        transition: isChasing
          ? 'none'
          : 'left 0.45s cubic-bezier(0.34, 1.35, 0.64, 1), top 0.45s cubic-bezier(0.34, 1.35, 0.64, 1)',
      }}
    >
      {/* Floating Loop */}
      <motion.div
        className={styles.floatLoopWrapper}
        animate={
          (!introActive || (followerState && followerState.locked)) && !shouldReduceMotion
            ? {
                y: isHovered ? 0 : [-8, 8, -8],
                rotate: isHovered
                  ? 0
                  : [node.rotation - 1.5, node.rotation + 1.5, node.rotation - 1.5],
              }
            : {}
        }
        transition={{
          duration: node.floatDuration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {/* Interactive 3D Card / Crystal Core Container */}
        <motion.div
          className={`${styles.objectContainer} ${node.isHero ? styles.crystalCoreContainer : styles.glassCardContainer}`}
          style={{
            width: node.width,
            height: node.height,
          }}
          whileHover={{
            scale: 1.12,
            rotate: 0,
          }}
          whileTap={{ scale: 0.96 }}
          animate={
            followerState?.flash
              ? {
                  scale: [1.16, 0.95, 1],
                  filter: [
                    `drop-shadow(0 0 35px ${node.accent})`,
                    `drop-shadow(0 12px 28px rgba(0, 0, 0, 0.7))`,
                  ],
                }
              : isCelebrating
              ? {
                  scale: [1, 1.15, 0.95, 1.07, 1],
                  rotate: [node.rotation, node.rotation + 6, node.rotation - 6, node.rotation],
                }
              : {}
          }
          transition={{
            type: 'spring',
            stiffness: 350,
            damping: 24,
          }}
          onHoverStart={onHoverStart}
          onHoverEnd={onHoverEnd}
          onClick={onClick}
          role="button"
          tabIndex={0}
          aria-label={`Explore ${node.name}`}
        >
          {/* Snap Landing Glow Splash */}
          {followerState?.flash && (
            <div
              className={styles.snapGlowSplash}
              style={{
                background: `radial-gradient(circle, ${node.accent}99 0%, transparent 70%)`,
              }}
            />
          )}

          {/* Hover Cosmic Glow Aura */}
          <div
            className={`${styles.glowAura} ${isHovered ? styles.glowAuraVisible : ''}`}
            style={{
              background: `radial-gradient(circle, ${node.accent}99 0%, ${node.accent}33 55%, transparent 75%)`,
            }}
          />

          {/* Mini Warp Ring on Hover */}
          {isHovered && (
            <motion.div
              className={styles.miniWarpRing}
              style={{ borderColor: node.accent }}
              initial={{ scale: 0.5, opacity: 0.85 }}
              animate={{ scale: 1.6, opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          )}

          {/* 3D Glass Asset Image or Minimalist Graphic */}
          {node.image ? (
            <img
              src={node.image}
              alt={node.name}
              className={node.isHero ? styles.crystalCoreImg : styles.glassCardImg}
              draggable={false}
              loading="eager"
            />
          ) : (
            <div className={styles.fallbackNodeMock}>
              <span className={styles.fallbackDot} style={{ background: node.accent }} />
              <span className={styles.fallbackTitle}>{node.name}</span>
            </div>
          )}

          {/* Glass Label Chip with Star ✦ */}
          <div
            className={`${styles.labelChip} ${isHovered ? styles.labelChipVisible : ''}`}
            style={{
              borderColor: `${node.accent}88`,
              boxShadow: `0 12px 36px rgba(0, 0, 0, 0.75), 0 0 24px ${node.accent}55`,
            }}
          >
            <span
              className={styles.chipStar}
              style={{
                color: node.accent,
                textShadow: `0 0 8px ${node.accent}`,
              }}
            >
              ✦
            </span>
            <div className={styles.chipTextGroup}>
              <span className={styles.chipTitle}>{node.name}</span>
              <span className={styles.chipTagline}>{node.tagline}</span>
            </div>
            <ArrowUpRight size={14} className={styles.chipArrow} />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
