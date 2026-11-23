import React, { useState, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import {
  Code,
  MousePointer2,
  TrendingUp,
  ArrowUpRight,
  Percent,
  Search,
  Globe,
  Megaphone,
  Target,
  Zap,
  Heart,
  ThumbsUp,
  MessageCircle,
  Bell,
  Play,
  Film,
  Video,
  Sparkles,
  Cpu,
  Wand2,
  CheckCircle2,
  Flame,
} from 'lucide-react';

import styles from './ServiceSceneIllustrations.module.css';

interface ServiceSceneProps {
  serviceId: string;
}

// Spring pop entrance animation on service switch
const scenePopVariant: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.92,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
    },
  },
};

// ---------------------------------------------------------------------------
// 1. WEB DESIGN & DEVELOPMENT
// Huge Holographic Cyber-Browser + Live Code Stream & Laser Mesh
// ---------------------------------------------------------------------------
function WebDesignScene() {
  return (
    <div className={styles.heroClusterStage}>
      {/* 3D Holographic Cyber-Browser Machine */}
      <div className={styles.webHoloMachine}>
        <div className={styles.webTopBar}>
          <div className={styles.webDotsGroup}>
            <span className={styles.webDotItem} style={{ background: '#EF4444', boxShadow: '0 0 6px #EF4444' }} />
            <span className={styles.webDotItem} style={{ background: '#F59E0B', boxShadow: '0 0 6px #F59E0B' }} />
            <span className={styles.webDotItem} style={{ background: '#10B981', boxShadow: '0 0 6px #10B981' }} />
          </div>
          <span className={styles.webUrlTab}>webkraftx.com/experience</span>
          <span style={{ fontSize: '0.6rem', color: '#22D3EE' }}>✦ 60 FPS</span>
        </div>

        <div className={styles.webWorkspaceBody}>
          {/* Live Typing Code Stream */}
          <div className={styles.codeTerminalPanel}>
            <span className={styles.codeLine1}>import &#123; Experience &#125; from &apos;@webkraftx&apos;;</span>
            <span className={styles.codeLine2}>const digital = createWorld();</span>
            <span className={styles.codeLine3}>return &lt;WebKraftX.App /&gt;</span>
            <span className={styles.codeLine4}>
              status: active <span className={styles.typingCursor} />
            </span>
          </div>

          {/* Visual Layout Mesh with Laser Sweep */}
          <div className={styles.visualPreviewPanel}>
            <div className={styles.previewHeroMesh}>
              <span>HERO ENGINE</span>
              <div className={styles.laserScanGrid} />
            </div>
            <div className={styles.previewCardsGrid}>
              <div className={styles.previewMiniCard}>
                <div className={styles.miniCardBar} style={{ width: '80%' }} />
                <div className={styles.miniCardBar} style={{ width: '50%', background: '#C8F31D' }} />
              </div>
              <div className={styles.previewMiniCard}>
                <div className={styles.miniCardBar} style={{ width: '70%', background: '#A855F7' }} />
                <div className={styles.miniCardBar} style={{ width: '40%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wide Satellite Constellations */}
      <div
        className={`${styles.satellitePill} ${styles.satSizeLarge} ${styles.colorCyan} ${styles.wobblePhase1}`}
        style={{ top: '6px', right: '-10px', '--z-depth': '65px', '--rot': '-4deg' } as React.CSSProperties}
      >
        <Code size={15} />
        <span>&lt;WebKraftX /&gt;</span>
      </div>

      <div
        className={`${styles.satellitePill} ${styles.satSizeMedium} ${styles.colorLime} ${styles.wobblePhase2}`}
        style={{ bottom: '10px', left: '-12px', '--z-depth': '75px', '--rot': '3deg' } as React.CSSProperties}
      >
        <CheckCircle2 size={13} />
        <span>&#123; Next.js + React &#125;</span>
      </div>

      <div
        className={`${styles.satellitePill} ${styles.satSizeSmall} ${styles.colorPurple} ${styles.wobblePhase3}`}
        style={{ top: '16px', left: '-10px', '--z-depth': '50px', '--rot': '-5deg' } as React.CSSProperties}
      >
        <MousePointer2 size={12} />
        <span>UI / UX Motion</span>
      </div>

      <div
        className={`${styles.satellitePill} ${styles.satSizeSmall} ${styles.colorCyan} ${styles.wobblePhase4}`}
        style={{ bottom: '18px', right: '-10px', '--z-depth': '60px', '--rot': '2deg' } as React.CSSProperties}
      >
        <span>99.9% Performance</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 2. CONVERSION RATE OPTIMISATION
// Huge Liquid Energy Funnel + Shower Particles & +48.6% Uplift Dial
// ---------------------------------------------------------------------------
function CroScene() {
  return (
    <div className={styles.heroClusterStage}>
      <div className={styles.croReactorContainer}>
        {/* 3D Conical Funnel Assembly */}
        <div className={styles.funnel3dAssembly}>
          <div className={styles.funnelMouthTop} />

          <svg className={styles.funnelBeamsSvg} viewBox="0 0 160 170" fill="none">
            <line x1="16" y1="18" x2="52" y2="85" stroke="#C8F31D" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="144" y1="18" x2="108" y2="85" stroke="#C8F31D" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="52" y1="85" x2="68" y2="155" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="108" y1="85" x2="92" y2="155" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="4 4" />
          </svg>

          {/* Liquid Visitor Rain Particles Dropping in */}
          <span className={styles.croRainDrop} style={{ left: '30%', animationDelay: '0s' }} />
          <span className={styles.croRainDrop} style={{ left: '55%', animationDelay: '0.7s', background: '#FFFFFF', boxShadow: '0 0 15px #FFFFFF' }} />
          <span className={styles.croRainDrop} style={{ left: '42%', animationDelay: '1.4s' }} />

          <div className={styles.funnelMouthMid} />
          <div className={styles.funnelMouthBottom} />

          {/* High Velocity Energized Conversions Shooting Out */}
          <span className={styles.croRocketExit} style={{ left: '45%', animationDelay: '0.1s' }} />
          <span className={styles.croRocketExit} style={{ left: '55%', animationDelay: '0.6s' }} />
          <span className={styles.croRocketExit} style={{ left: '50%', animationDelay: '1.2s' }} />
        </div>

        {/* Beside Funnel: 3D Rotating Dial Badge */}
        <div className={styles.croDialWrapper}>
          <div className={styles.croDialOuterTrack} />
          <div className={styles.croDialCoreBadge}>
            <span className={styles.croUpliftNum}>+48%</span>
            <span className={styles.croUpliftSub}>UPLIFT ↑</span>
          </div>
        </div>
      </div>

      {/* Wide Satellite Constellations */}
      <div
        className={`${styles.satellitePill} ${styles.satSizeLarge} ${styles.colorLime} ${styles.wobblePhase1}`}
        style={{ top: '8px', right: '-12px', '--z-depth': '70px', '--rot': '-3deg' } as React.CSSProperties}
      >
        <TrendingUp size={16} />
        <span>+48.6% UPLIFT</span>
      </div>

      <div
        className={`${styles.satellitePill} ${styles.satSizeMedium} ${styles.colorCyan} ${styles.wobblePhase2}`}
        style={{ bottom: '12px', left: '-10px', '--z-depth': '60px', '--rot': '4deg' } as React.CSSProperties}
      >
        <ArrowUpRight size={15} />
        <span>3.8x Funnel Flow</span>
      </div>

      <div
        className={`${styles.satellitePill} ${styles.satSizeSmall} ${styles.colorAmber} ${styles.wobblePhase3}`}
        style={{ top: '18px', left: '-8px', '--z-depth': '50px', '--rot': '-4deg' } as React.CSSProperties}
      >
        <Percent size={12} />
        <span>A/B Variant Win</span>
      </div>

      <div
        className={`${styles.satellitePill} ${styles.satSizeSmall} ${styles.colorLime} ${styles.wobblePhase4}`}
        style={{ bottom: '16px', right: '-6px', '--z-depth': '55px', '--rot': '-2deg' } as React.CSSProperties}
      >
        <Flame size={12} />
        <span>Heatmap Audited</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 3. SEARCH ENGINE OPTIMISATION
// Huge Sonar Radar Lens + Ascending Rank Towers + SERP Beacon
// ---------------------------------------------------------------------------
function SeoScene() {
  return (
    <div className={styles.heroClusterStage}>
      <div className={styles.seoStationStage}>
        {/* Volumetric Ascending Rank Pillars */}
        <div className={styles.seoPillarsGroup}>
          <div className={styles.seoPillarBar} />
          <div className={styles.seoPillarBar} />
          <div className={styles.seoPillarBar} />
          <div className={styles.seoPillarBar}>
            <div className={styles.seoRankCrown}>★ RANK #1</div>
          </div>
        </div>

        {/* Floating Sonar Scanner Lens with Conical Radar Beam */}
        <div className={styles.seoSonarLens}>
          <div className={styles.sonarGlassRing}>
            <div className={styles.sonarRadarSweepBeam} />
            <div className={styles.sonarHandleGrip} />
          </div>
        </div>
      </div>

      {/* Wide Satellite Constellations */}
      <div
        className={`${styles.satellitePill} ${styles.satSizeLarge} ${styles.colorLime} ${styles.wobblePhase1}`}
        style={{ top: '8px', right: '-10px', '--z-depth': '70px', '--rot': '-3deg' } as React.CSSProperties}
      >
        <Search size={15} />
        <span>★ RANK #1 SERP</span>
      </div>

      <div
        className={`${styles.satellitePill} ${styles.satSizeMedium} ${styles.colorPurple} ${styles.wobblePhase2}`}
        style={{ bottom: '12px', left: '-12px', '--z-depth': '60px', '--rot': '3deg' } as React.CSSProperties}
      >
        <Globe size={14} />
        <span>+185% Organic Reach</span>
      </div>

      <div
        className={`${styles.satellitePill} ${styles.satSizeSmall} ${styles.colorCyan} ${styles.wobblePhase3}`}
        style={{ top: '16px', left: '-8px', '--z-depth': '50px', '--rot': '-5deg' } as React.CSSProperties}
      >
        <span>AI Overviews ✦</span>
      </div>

      <div
        className={`${styles.satellitePill} ${styles.satSizeSmall} ${styles.colorPurple} ${styles.wobblePhase4}`}
        style={{ bottom: '18px', right: '-8px', '--z-depth': '55px', '--rot': '2deg' } as React.CSSProperties}
      >
        <span>Top 3 Clicks: 72%</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 4. PAID ADVERTISING
// Concentric Bullseye Rings + Comet Laser Strike + Shockwave Waves
// ---------------------------------------------------------------------------
function PaidAdsScene() {
  return (
    <div className={styles.heroClusterStage}>
      <div className={styles.paidTargetStage}>
        {/* Concentric Bullseye Rings */}
        <div className={styles.concentricBullseye}>
          <div className={styles.bullseyeRingOuter} />
          <div className={styles.bullseyeRingMid} />
          <div className={styles.bullseyeCoreNode}>
            <Sparkles size={22} color="#FFFFFF" />
          </div>

          <div className={styles.targetLaserCrosshairs}>
            <div className={styles.crossLineHoriz} />
            <div className={styles.crossLineVert} />
          </div>

          {/* Periodic Expanding Impact Waves */}
          <div className={styles.targetImpactWave} />
          <div className={styles.targetImpactWave} style={{ animationDelay: '1.4s' }} />

          {/* Comet Laser Arrow Striking Core */}
          <div className={styles.targetCometArrow} />
        </div>
      </div>

      {/* Wide Satellite Constellations */}
      <div
        className={`${styles.satellitePill} ${styles.satSizeLarge} ${styles.colorOrange} ${styles.wobblePhase1}`}
        style={{ top: '8px', right: '-12px', '--z-depth': '70px', '--rot': '-4deg' } as React.CSSProperties}
      >
        <Megaphone size={15} />
        <span>4.8x ROAS SCALE</span>
      </div>

      <div
        className={`${styles.satellitePill} ${styles.satSizeMedium} ${styles.colorLime} ${styles.wobblePhase2}`}
        style={{ bottom: '12px', left: '-10px', '--z-depth': '60px', '--rot': '3deg' } as React.CSSProperties}
      >
        <Zap size={14} />
        <span>CTR 9.4% Verified</span>
      </div>

      <div
        className={`${styles.satellitePill} ${styles.satSizeSmall} ${styles.colorPink} ${styles.wobblePhase3}`}
        style={{ top: '18px', left: '-10px', '--z-depth': '50px', '--rot': '-5deg' } as React.CSSProperties}
      >
        <Target size={12} />
        <span>High-Intent Google Ads</span>
      </div>

      <div
        className={`${styles.satellitePill} ${styles.satSizeSmall} ${styles.colorOrange} ${styles.wobblePhase4}`}
        style={{ bottom: '18px', right: '-6px', '--z-depth': '55px', '--rot': '-2deg' } as React.CSSProperties}
      >
        <span>Meta Pixel Sync ✦</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 5. SOCIAL MEDIA MANAGEMENT
// 3D Spinning Holographic Globe + Continuous Rising Reaction Stream
// ---------------------------------------------------------------------------
function SocialMediaScene() {
  return (
    <div className={styles.heroClusterStage}>
      <div className={styles.socialGlobeStage}>
        {/* Geodesic Wireframe Globe */}
        <div className={styles.socialSphereWire}>
          <div className={styles.spherePerimeter} />
          <div className={styles.sphereLatitude} />
          <div className={styles.sphereLongitude1} />
          <div className={styles.sphereLongitude2} />
        </div>

        {/* Live Reaction Particles Rising Upwards */}
        <div className={styles.liveReactionsColumn}>
          <div className={styles.streamHeart1}>
            <Heart size={20} fill="#EC4899" color="#FFFFFF" />
          </div>
          <div className={styles.streamHeart2}>
            <ThumbsUp size={18} fill="#22D3EE" color="#FFFFFF" />
          </div>
          <div className={styles.streamHeart3}>
            <Flame size={20} fill="#F97316" color="#FFFFFF" />
          </div>
        </div>
      </div>

      {/* Saturated Circular Node Badges */}
      <div
        className={`${styles.circleNodeBadge} ${styles.colorPink} ${styles.wobblePhase1}`}
        style={{ top: '6px', left: '-10px', '--z-depth': '75px', '--rot': '-6deg' } as React.CSSProperties}
      >
        <Heart size={22} fill="#FFFFFF" color="#FFFFFF" />
      </div>

      <div
        className={`${styles.circleNodeBadge} ${styles.colorCyan} ${styles.wobblePhase2}`}
        style={{ top: '10px', right: '-10px', '--z-depth': '65px', '--rot': '6deg' } as React.CSSProperties}
      >
        <ThumbsUp size={22} fill="#FFFFFF" color="#FFFFFF" />
      </div>

      <div
        className={`${styles.circleNodeBadge} ${styles.colorLime} ${styles.wobblePhase3}`}
        style={{ bottom: '12px', right: '-12px', '--z-depth': '70px', '--rot': '-4deg' } as React.CSSProperties}
      >
        <MessageCircle size={22} fill="#090414" color="#090414" />
      </div>

      <div
        className={`${styles.satellitePill} ${styles.satSizeMedium} ${styles.colorPurple} ${styles.wobblePhase4}`}
        style={{ bottom: '14px', left: '-12px', '--z-depth': '60px', '--rot': '3deg' } as React.CSSProperties}
      >
        <Bell size={13} />
        <span>+120K Viral Reach</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 6. SHORT VIDEO PRODUCTION
// Snapping Clapperboard with Light Burst + Live Frequency Equalizer
// ---------------------------------------------------------------------------
function ShortVideoScene() {
  return (
    <div className={styles.heroClusterStage}>
      <div className={styles.videoCinemaStage}>
        {/* Holographic Clapperboard */}
        <div className={styles.clapperSlateHolo}>
          <div className={styles.clapperTopStickHolo} />
          <div className={styles.clapperBurstFlash} />

          <span className={styles.clapperTitleText}>SCENE 01 · TAKE 04</span>
          <span className={styles.clapperFpsText}>4K · 60FPS HDR</span>
        </div>

        {/* Dancing Audio Equalizer */}
        <div className={styles.audioEqualizerHolo}>
          <span className={styles.eqBarItem} style={{ animationDelay: '0.1s' }} />
          <span className={styles.eqBarItem} style={{ animationDelay: '0.4s' }} />
          <span className={styles.eqBarItem} style={{ animationDelay: '0.2s' }} />
          <span className={styles.eqBarItem} style={{ animationDelay: '0.7s' }} />
          <span className={styles.eqBarItem} style={{ animationDelay: '0.3s' }} />
          <span className={styles.eqBarItem} style={{ animationDelay: '0.6s' }} />
          <span className={styles.eqBarItem} style={{ animationDelay: '0.5s' }} />
        </div>
      </div>

      {/* Wide Satellite Constellations */}
      <div
        className={`${styles.satellitePill} ${styles.satSizeLarge} ${styles.colorAmber} ${styles.wobblePhase1}`}
        style={{ top: '8px', right: '-12px', '--z-depth': '70px', '--rot': '-4deg' } as React.CSSProperties}
      >
        <Play size={16} fill="#FFFFFF" color="#FFFFFF" />
        <span>▶ 4K 60FPS CINEMA</span>
      </div>

      <div
        className={`${styles.satellitePill} ${styles.satSizeMedium} ${styles.colorOrange} ${styles.wobblePhase2}`}
        style={{ bottom: '12px', left: '-10px', '--z-depth': '60px', '--rot': '3deg' } as React.CSSProperties}
      >
        <Film size={14} />
        <span>9:16 Viral Reels</span>
      </div>

      <div
        className={`${styles.satellitePill} ${styles.satSizeSmall} ${styles.colorLime} ${styles.wobblePhase3}`}
        style={{ top: '16px', left: '-8px', '--z-depth': '50px', '--rot': '-5deg' } as React.CSSProperties}
      >
        <Video size={12} />
        <span>85% Watch Completion</span>
      </div>

      <div
        className={`${styles.satellitePill} ${styles.satSizeSmall} ${styles.colorAmber} ${styles.wobblePhase4}`}
        style={{ bottom: '18px', right: '-6px', '--z-depth': '55px', '--rot': '2deg' } as React.CSSProperties}
      >
        <span>DaVinci Color Graded</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 7. AI VIDEO PRODUCTION
// Holographic AI Video Creation Studio: Neural Core + Real-Time Video Synthesis
// ---------------------------------------------------------------------------
function AiVideoScene() {
  return (
    <div className={styles.heroClusterStage}>
      <div className={styles.aiVideoStudioStage}>
        {/* Top Sci-Fi HUD Header */}
        <div className={styles.aiStudioTopBar}>
          <div className={styles.aiStatusDotGroup}>
            <span className={styles.aiPulseDot} />
            <span className={styles.aiEngineText}>NEURAL VIDEO ENGINE v4.2</span>
          </div>
          <span className={styles.aiFpsPill}>4K · 60 FPS · HDR</span>
        </div>

        {/* Live AI Prompt Bar with Blinking Cursor */}
        <div className={styles.aiPromptBar}>
          <Sparkles size={13} color="#C8F31D" />
          <span className={styles.aiPromptText}>
            prompt: &quot;Cinematic digital reality, 4k ultra-detailed, neural motion&quot;
          </span>
          <span className={styles.typingCursor} />
        </div>

        {/* Main Generative Canvas: Neural Core Orb + Video Frame Strip */}
        <div className={styles.aiCanvasBody}>
          {/* Central Pulsating 3D Neural Core Orb */}
          <div className={styles.aiCoreOrbWrapper}>
            <div className={styles.aiCoreOrb} />
            <div className={styles.aiCoreOrbitRing1} />
            <div className={styles.aiCoreOrbitRing2} />
            <span className={styles.aiCoreText}>AI CORE</span>
          </div>

          {/* Dynamic Video Keyframes Strip forming in real-time */}
          <div className={styles.aiKeyframesColumn}>
            <div className={styles.aiKeyframeCard}>
              <div className={styles.keyframeThumb1}>
                <span className={styles.keyframeTime}>00:04</span>
                <Play size={11} fill="#FFFFFF" color="#FFFFFF" />
              </div>
            </div>
            <div className={styles.aiKeyframeCard}>
              <div className={styles.keyframeThumb2}>
                <span className={styles.keyframeTime}>00:08</span>
                <Play size={11} fill="#FFFFFF" color="#FFFFFF" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Render Progress Timeline */}
        <div className={styles.aiTimelineBar}>
          <div className={styles.aiProgressFill}>
            <span className={styles.aiProgressGlow} />
          </div>
          <div className={styles.aiTimelineMeta}>
            <span style={{ color: '#C8F31D' }}>● SYNTHESIS 92%</span>
            <span style={{ color: '#22D3EE' }}>LATENT DIFFUSION 60FPS</span>
          </div>
        </div>
      </div>

      {/* Wide Satellite Constellations */}
      <div
        className={`${styles.satellitePill} ${styles.satSizeLarge} ${styles.colorCyan} ${styles.wobblePhase1}`}
        style={{ top: '8px', right: '-12px', '--z-depth': '75px', '--rot': '-3deg' } as React.CSSProperties}
      >
        <Sparkles size={16} />
        <span>✦ LATENT 4K RENDER</span>
      </div>

      <div
        className={`${styles.satellitePill} ${styles.satSizeMedium} ${styles.colorPurple} ${styles.wobblePhase2}`}
        style={{ bottom: '12px', left: '-10px', '--z-depth': '65px', '--rot': '4deg' } as React.CSSProperties}
      >
        <Cpu size={14} />
        <span>Diffusion 2.0 Engine</span>
      </div>

      <div
        className={`${styles.satellitePill} ${styles.satSizeSmall} ${styles.colorPink} ${styles.wobblePhase3}`}
        style={{ top: '16px', left: '-8px', '--z-depth': '50px', '--rot': '-5deg' } as React.CSSProperties}
      >
        <Wand2 size={12} />
        <span>Prompt-to-Video</span>
      </div>

      <div
        className={`${styles.satellitePill} ${styles.satSizeSmall} ${styles.colorCyan} ${styles.wobblePhase4}`}
        style={{ bottom: '18px', right: '-8px', '--z-depth': '55px', '--rot': '-2deg' } as React.CSSProperties}
      >
        <span>Fluid Interpolation 60fps</span>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// UNIFIED CINEMATIC STAGE: LAYERED ENVIRONMENT & MOUSE PARALLAX
// ---------------------------------------------------------------------------
export function ServiceSceneIllustration({ serviceId }: ServiceSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Full-scene mouse parallax with layered depth (max 7°)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setTilt({
      x: -ny * 7,
      y: nx * 7,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const getThemeConfig = () => {
    switch (serviceId) {
      case 'web-design-dev':
        return {
          aurora: styles.auroraWeb,
          floor: styles.floorWeb,
          ringBorder: 'rgba(6, 182, 212, 0.7)',
          bokehColor1: 'rgba(6, 182, 212, 0.45)',
          bokehColor2: 'rgba(168, 85, 247, 0.35)',
          dustColor: '#22D3EE',
          dustShadow: '0 0 10px #22D3EE',
        };
      case 'cro':
        return {
          aurora: styles.auroraCro,
          floor: styles.floorCro,
          ringBorder: 'rgba(200, 243, 29, 0.8)',
          bokehColor1: 'rgba(200, 243, 29, 0.5)',
          bokehColor2: 'rgba(16, 185, 129, 0.4)',
          dustColor: '#C8F31D',
          dustShadow: '0 0 10px #C8F31D',
        };
      case 'seo':
        return {
          aurora: styles.auroraSeo,
          floor: styles.floorSeo,
          ringBorder: 'rgba(168, 85, 247, 0.8)',
          bokehColor1: 'rgba(168, 85, 247, 0.5)',
          bokehColor2: 'rgba(34, 211, 238, 0.4)',
          dustColor: '#A855F7',
          dustShadow: '0 0 10px #A855F7',
        };
      case 'paid-ads':
        return {
          aurora: styles.auroraPaidAds,
          floor: styles.floorPaidAds,
          ringBorder: 'rgba(249, 115, 22, 0.8)',
          bokehColor1: 'rgba(249, 115, 22, 0.5)',
          bokehColor2: 'rgba(236, 72, 153, 0.4)',
          dustColor: '#F97316',
          dustShadow: '0 0 10px #F97316',
        };
      case 'social-media':
        return {
          aurora: styles.auroraSocial,
          floor: styles.floorSocial,
          ringBorder: 'rgba(236, 72, 153, 0.8)',
          bokehColor1: 'rgba(236, 72, 153, 0.5)',
          bokehColor2: 'rgba(6, 182, 212, 0.4)',
          dustColor: '#EC4899',
          dustShadow: '0 0 10px #EC4899',
        };
      case 'short-video':
        return {
          aurora: styles.auroraShortVideo,
          floor: styles.floorShortVideo,
          ringBorder: 'rgba(245, 158, 11, 0.8)',
          bokehColor1: 'rgba(245, 158, 11, 0.5)',
          bokehColor2: 'rgba(249, 115, 22, 0.4)',
          dustColor: '#F59E0B',
          dustShadow: '0 0 10px #F59E0B',
        };
      case 'ai-video':
        return {
          aurora: styles.auroraAiVideo,
          floor: styles.floorAiVideo,
          ringBorder: 'rgba(34, 211, 238, 0.8)',
          bokehColor1: 'rgba(34, 211, 238, 0.5)',
          bokehColor2: 'rgba(168, 85, 247, 0.45)',
          dustColor: '#22D3EE',
          dustShadow: '0 0 10px #22D3EE',
        };
      default:
        return {
          aurora: styles.auroraWeb,
          floor: styles.floorWeb,
          ringBorder: 'rgba(6, 182, 212, 0.7)',
          bokehColor1: 'rgba(6, 182, 212, 0.45)',
          bokehColor2: 'rgba(168, 85, 247, 0.35)',
          dustColor: '#22D3EE',
          dustShadow: '0 0 10px #22D3EE',
        };
    }
  };

  const theme = getThemeConfig();

  const renderActiveScene = () => {
    switch (serviceId) {
      case 'web-design-dev':
        return <WebDesignScene />;
      case 'cro':
        return <CroScene />;
      case 'seo':
        return <SeoScene />;
      case 'paid-ads':
        return <PaidAdsScene />;
      case 'social-media':
        return <SocialMediaScene />;
      case 'short-video':
        return <ShortVideoScene />;
      case 'ai-video':
        return <AiVideoScene />;
      default:
        return <WebDesignScene />;
    }
  };

  return (
    <div
      ref={containerRef}
      className={styles.holoContainer}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 1. Edge Vignette (smooth dark border) */}
      <div className={styles.edgeVignette} aria-hidden="true" />

      {/* 2. Color-Matched Drifting Aurora Glow behind object */}
      <div className={`${styles.auroraGlow} ${theme.aurora}`} aria-hidden="true" />

      {/* 3. Reflective Glossy Floor Glow under the object */}
      <div className={`${styles.glossyFloorReflection} ${theme.floor}`} aria-hidden="true" />
      <div className={styles.floorRing} style={{ borderColor: theme.ringBorder }} aria-hidden="true" />

      {/* 4. Depth Dust Particles */}
      <span className={styles.dustMote} style={{ top: '18%', left: '12%', width: '4px', height: '4px', background: '#FFFFFF', boxShadow: '0 0 8px #FFFFFF', animationDelay: '0s' }} />
      <span className={styles.dustMote} style={{ top: '30%', right: '14%', width: '5px', height: '5px', background: theme.dustColor, boxShadow: theme.dustShadow, animationDelay: '1.4s' }} />
      <span className={styles.dustMote} style={{ bottom: '26%', left: '18%', width: '3px', height: '3px', background: '#FFFFFF', boxShadow: '0 0 6px #FFFFFF', animationDelay: '2.8s' }} />
      <span className={styles.dustMote} style={{ top: '60%', right: '12%', width: '5px', height: '5px', background: theme.dustColor, boxShadow: theme.dustShadow, animationDelay: '3.9s' }} />
      <span className={styles.dustMote} style={{ top: '45%', left: '8%', width: '4px', height: '4px', background: theme.dustColor, boxShadow: theme.dustShadow, animationDelay: '2.1s' }} />

      {/* 5. Foreground Blurred Bokeh Depth-of-Field Shapes at Corners */}
      <div
        className={styles.bokehTopLeft}
        style={{ background: theme.bokehColor1 }}
        aria-hidden="true"
      />
      <div
        className={styles.bokehBottomRight}
        style={{ background: theme.bokehColor2 }}
        aria-hidden="true"
      />

      {/* 6. Parallax Tilt + Spring Pop Scene Wrapper */}
      <motion.div
        className={styles.parallaxTiltWrapper}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 18,
          mass: 0.8,
        }}
      >
        <motion.div
          variants={scenePopVariant}
          initial="hidden"
          animate="visible"
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {renderActiveScene()}
        </motion.div>
      </motion.div>
    </div>
  );
}
