import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, ExternalLink, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';
import { siteConfig } from '../data/config';
import { BrandWordmark } from './BrandLogo';
import styles from './VideoModal.module.css';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProjectId?: string;
  onInquireProject?: (projectName: string) => void;
}

export function VideoModal({ isOpen, onClose, initialProjectId = 'begums-kitchen', onInquireProject }: VideoModalProps) {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(initialProjectId);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [playbackProgress, setPlaybackProgress] = useState<number>(35);
  const [activeTab, setActiveTab] = useState<'video' | 'live-demo'>('video');

  useEffect(() => {
    if (initialProjectId) {
      setSelectedProjectId(initialProjectId);
      setPlaybackProgress(30);
      setIsPlaying(true);
    }
  }, [initialProjectId, isOpen]);

  // Simulate progress bar when playing
  useEffect(() => {
    if (!isOpen || !isPlaying) return;
    const interval = setInterval(() => {
      setPlaybackProgress((prev) => (prev >= 100 ? 0 : prev + 1.2));
    }, 250);
    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const activeProject = siteConfig.caseStudies.find((c) => c.id === selectedProjectId) || siteConfig.caseStudies[0];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className={styles.backdrop} onClick={onClose}>
        <motion.div
          className={styles.modalCard}
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className={styles.modalHeader}>
            <div className={styles.headerLeft}>
              <div className={styles.pulseDot} />
              <div>
                <span className={styles.headerTag}>AGENCY WALKTHROUGH & CASE DEMO</span>
                <h3 className={styles.modalTitle}>{activeProject.client}</h3>
              </div>
            </div>

            {/* Project Switcher Tabs */}
            <div className={styles.projectSwitcher}>
              {siteConfig.caseStudies.map((study) => (
                <button
                  key={study.id}
                  className={`${styles.switcherTab} ${selectedProjectId === study.id ? styles.switcherTabActive : ''}`}
                  onClick={() => {
                    setSelectedProjectId(study.id);
                    setPlaybackProgress(20);
                  }}
                >
                  {study.client.split(' ')[0]}
                </button>
              ))}
            </div>

            <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
              <X size={20} />
            </button>
          </div>

          {/* Main Video & Content Area */}
          <div className={styles.bodyGrid}>
            {/* Left 65%: Video / Walkthrough Player */}
            <div className={styles.playerContainer}>
              <div className={styles.screenFrame}>
                {/* Browser/Window Header */}
                <div className={styles.windowChrome}>
                  <div className={styles.windowDots}>
                    <span className={styles.dotRed} />
                    <span className={styles.dotYellow} />
                    <span className={styles.dotGreen} />
                  </div>
                  <div className={styles.addressBar}>
                    <span>{activeProject.liveUrl}</span>
                  </div>
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.openExternalBtn}
                    title="Open live site in new tab"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>

                {/* Media Screen */}
                <div className={styles.mediaScreen}>
                  <img
                    src={activeProject.image}
                    alt={activeProject.client}
                    className={`${styles.screenImage} ${isPlaying ? styles.screenImagePanned : ''}`}
                    style={{
                      transform: `scale(1.05) translateY(-${(playbackProgress * 0.45).toFixed(1)}%)`,
                      transition: 'transform 0.4s linear',
                    }}
                  />

                  {/* Dynamic Playback Glow Overlay */}
                  <div className={styles.screenOverlay} />

                  {/* Watermark Tag */}
                  <div className={styles.screenBadge}>
                    <Sparkles size={13} />
                    <span><BrandWordmark /> Production</span>
                  </div>

                  {/* Center Play/Pause Indicator on hover/click */}
                  <button
                    className={styles.centerPlayButton}
                    onClick={() => setIsPlaying(!isPlaying)}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause size={24} /> : <Play size={24} style={{ marginLeft: 3 }} />}
                  </button>
                </div>

                {/* Custom Video Control Scrub Bar */}
                <div className={styles.playerControls}>
                  <button
                    className={styles.controlIconBtn}
                    onClick={() => setIsPlaying(!isPlaying)}
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause size={17} /> : <Play size={17} />}
                  </button>

                  <button
                    className={styles.controlIconBtn}
                    onClick={() => setPlaybackProgress(0)}
                    title="Restart from beginning"
                  >
                    <RotateCcw size={15} />
                  </button>

                  {/* Scrub Bar */}
                  <div
                    className={styles.scrubberRail}
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickX = e.clientX - rect.left;
                      const newPercent = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
                      setPlaybackProgress(newPercent);
                    }}
                  >
                    <div
                      className={styles.scrubberFilled}
                      style={{ width: `${playbackProgress}%` }}
                    />
                  </div>

                  <span className={styles.timeCounter}>
                    {`00:${Math.floor((playbackProgress * 0.6)).toString().padStart(2, '0')}`} / 01:00
                  </span>

                  <button
                    className={styles.controlIconBtn}
                    onClick={() => setIsMuted(!isMuted)}
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
                  </button>

                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.fullscreenBtn}
                    title="Visit live site in full screen"
                  >
                    <Maximize2 size={16} />
                  </a>
                </div>
              </div>

              {/* Bottom Quick Chapters */}
              <div className={styles.chaptersRow}>
                <span className={styles.chaptersLabel}>Chapters:</span>
                <button
                  className={styles.chapterBtn}
                  onClick={() => setPlaybackProgress(5)}
                >
                  00:05 Hero & Value Hook
                </button>
                <button
                  className={styles.chapterBtn}
                  onClick={() => setPlaybackProgress(35)}
                >
                  00:21 Interactive Menu / Catalog
                </button>
                <button
                  className={styles.chapterBtn}
                  onClick={() => setPlaybackProgress(70)}
                >
                  00:42 Direct WhatsApp Checkout
                </button>
              </div>
            </div>

            {/* Right 35%: Project Specs & Direct Actions */}
            <div className={styles.specsSidebar}>
              <div className={styles.metricsBox}>
                <span className={styles.metricBig}>{activeProject.resultMetric}</span>
                <span className={styles.metricTitle}>{activeProject.resultLabel}</span>
                <p className={styles.metricSubtitle}>Measured in real commercial conversion data</p>
              </div>

              <div className={styles.infoSection}>
                <h4 className={styles.infoHeading}>Project Architecture</h4>
                <p className={styles.infoText}>{activeProject.description}</p>
              </div>

              <div className={styles.highlightsSection}>
                <h4 className={styles.infoHeading}>Key Deliverables</h4>
                <ul className={styles.highlightsList}>
                  {activeProject.highlights?.map((hl, i) => (
                    <li key={i} className={styles.highlightItem}>
                      <CheckCircle2 size={15} className={styles.checkIcon} />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Group */}
              <div className={styles.sidebarCtas}>
                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`btn-primary ${styles.liveBtn}`}
                >
                  <span>Explore Live Site</span>
                  <ExternalLink size={16} />
                </a>

                {onInquireProject && (
                  <button
                    className={`btn-secondary ${styles.inquireBtn}`}
                    onClick={() => {
                      onClose();
                      onInquireProject(activeProject.client);
                    }}
                  >
                    Build Something Similar →
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
