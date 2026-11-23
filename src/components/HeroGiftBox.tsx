import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { RotateCw, ArrowUpRight } from 'lucide-react';
import styles from './HeroGiftBox.module.css';

// 9 Service 3D Asset Images
import webDevImg from '../assets/hero-services/web-dev.jpg';
import appDevImg from '../assets/hero-services/app-dev.png';
import ecommerceImg from '../assets/hero-services/ecommerce.jpg';
import uiUxImg from '../assets/hero-services/ui-ux.jpg';
import brandingImg from '../assets/hero-services/branding.jpg';
import seoImg from '../assets/hero-services/seo.jpg';
import digitalMarketingImg from '../assets/hero-services/digital-marketing.png';
import videoContentImg from '../assets/hero-services/video-content.png';
import aiVideosImg from '../assets/hero-services/ai-videos.png';

// Video of the gift box opening
import heroGiftboxVideo from '../assets/hero-giftbox.mp4';

interface HeroGiftBoxProps {
  onNavigateRoute?: (route: string) => void;
}

interface ServiceOrbitItem {
  id: string;
  title: string;
  category: string;
  img: string;
  route: string;
}

const ORBIT_SERVICES: ServiceOrbitItem[] = [
  {
    id: 'web-dev',
    title: 'Web Development',
    category: 'Design & Dev',
    img: webDevImg,
    route: '/services/web-design',
  },
  {
    id: 'app-dev',
    title: 'Application Development',
    category: 'Design & Dev',
    img: appDevImg,
    route: '/services/web-design',
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Solutions',
    category: 'Design & Dev',
    img: ecommerceImg,
    route: '/services/ecommerce',
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    category: 'Design & Dev',
    img: uiUxImg,
    route: '/services/web-design',
  },
  {
    id: 'branding',
    title: 'Branding & Creative Design',
    category: 'Design & Dev',
    img: brandingImg,
    route: '/services/branding',
  },
  {
    id: 'seo',
    title: 'SEO Optimization',
    category: 'Growth',
    img: seoImg,
    route: '/services/seo',
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    category: 'Growth',
    img: digitalMarketingImg,
    route: '/services/paid-ads',
  },
  {
    id: 'video-content',
    title: 'Video & Content Creation',
    category: 'Content & AI',
    img: videoContentImg,
    route: '/services/short-video',
  },
  {
    id: 'ai-videos',
    title: 'AI Videos',
    category: 'Content & AI',
    img: aiVideosImg,
    route: '/services/ai-video',
  },
];

export function HeroGiftBox({ onNavigateRoute }: HeroGiftBoxProps) {
  const shouldReduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [videoEnded, setVideoEnded] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  // Responsive radius calculation
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const radiusX = isMobile ? 150 : 250;
  const radiusY = isMobile ? 44 : 70;

  // Video Autoplay & End Handling
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play().catch(() => {
        // If browser blocks autoplay, fallback after short duration
        const timer = setTimeout(() => setVideoEnded(true), 3500);
        return () => clearTimeout(timer);
      });
    }
  }, []);

  const handleVideoEnded = () => {
    setVideoEnded(true);
  };

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setVideoEnded(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  // 3D Orbit Continuous Rotation Loop
  useEffect(() => {
    if (!videoEnded || shouldReduceMotion) return;

    let animId: number;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      // When hovered, rotate very slowly; normal speed: full orbit in ~22s
      const speed = isHovered ? 0.08 : 0.28;
      setRotation((prev) => (prev + speed * delta) % (Math.PI * 2));

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [videoEnded, isHovered, shouldReduceMotion]);

  const handleCardClick = (route: string) => {
    if (onNavigateRoute) {
      onNavigateRoute(route);
    } else {
      window.location.href = route;
    }
  };

  return (
    <div
      className={styles.heroGiftboxStage}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setHoveredCardId(null);
      }}
    >
      {/* Background Ambient Radial Glow */}
      <div className={styles.stageAmbientGlow} aria-hidden="true" />

      {/* Center 3D Box Video Container */}
      <div className={styles.videoBoxWrapper}>
        <video
          ref={videoRef}
          src={heroGiftboxVideo}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={handleVideoEnded}
          className={styles.boxVideo}
        />

        {/* Soft light burst puff when video ends */}
        {videoEnded && (
          <motion.div
            className={styles.openLightBurst}
            initial={{ scale: 0.2, opacity: 0.9 }}
            animate={{ scale: 1.6, opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            aria-hidden="true"
          />
        )}
      </div>

      {/* 9 Orbiting 3D Service Cards */}
      {videoEnded && (
        <div className={styles.orbitTrack}>
          {ORBIT_SERVICES.map((service, index) => {
            const total = ORBIT_SERVICES.length;
            const baseAngle = (index / total) * Math.PI * 2;
            const currentAngle = baseAngle + rotation;

            // 3D Coordinates
            const x = Math.sin(currentAngle) * radiusX;
            const y = Math.cos(currentAngle) * radiusY - 10;
            const zNorm = Math.cos(currentAngle); // -1 (back) to +1 (front)

            // Front vs Back perspective
            const isFront = zNorm > 0;
            const depthScale = 0.76 + ((zNorm + 1) / 2) * 0.38; // 0.76x -> 1.14x
            const depthOpacity = 0.55 + ((zNorm + 1) / 2) * 0.45; // 0.55 -> 1.0
            const zIndex = isFront ? 60 + Math.round(zNorm * 30) : 15 + Math.round((zNorm + 1) * 15);

            const isCardHovered = hoveredCardId === service.id;

            return (
              <motion.div
                key={service.id}
                className={`${styles.orbitCard} ${isCardHovered ? styles.orbitCardHovered : ''}`}
                style={{
                  transform: `translate3d(${x}px, ${y}px, 0px) scale(${isCardHovered ? depthScale * 1.18 : depthScale})`,
                  opacity: depthOpacity,
                  zIndex: isCardHovered ? 120 : zIndex,
                }}
                initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                animate={{
                  scale: isCardHovered ? depthScale * 1.18 : depthScale,
                  opacity: depthOpacity,
                  x,
                  y,
                }}
                transition={{
                  scale: { duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 0.4, delay: index * 0.08 },
                }}
                onClick={() => handleCardClick(service.route)}
                onMouseEnter={() => setHoveredCardId(service.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                title={`${service.title} (${service.category})`}
              >
                <div className={styles.cardImageContainer}>
                  <img
                    src={service.img}
                    alt={service.title}
                    className={styles.cardImg}
                    draggable={false}
                  />
                  <div className={styles.cardGlassGleam} />
                </div>

                {/* Hover Quick Label Badge */}
                {isCardHovered && (
                  <motion.div
                    className={styles.cardHoverTooltip}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <span>{service.title}</span>
                    <ArrowUpRight size={12} className={styles.tooltipArrow} />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Replay Video Button (subtle pill) */}
      {videoEnded && (
        <button
          type="button"
          onClick={handleReplay}
          className={styles.replayButton}
          title="Replay Box Opening Video"
        >
          <RotateCw size={13} className={styles.replayIcon} />
          <span>Replay Box</span>
        </button>
      )}
    </div>
  );
}
