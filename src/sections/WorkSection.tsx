import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Play, TrendingUp, Sparkles, ArrowRight, Laptop, Smartphone } from 'lucide-react';
import { siteConfig, CaseStudy } from '../data/config';
import styles from './WorkSection.module.css';

interface WorkSectionProps {
  onOpenVideoWalkthrough: (projectId: string) => void;
  onOpenProposal: () => void;
}

export function WorkSection({ onOpenVideoWalkthrough, onOpenProposal }: WorkSectionProps) {
  const begumsProject = siteConfig.caseStudies.find((c) => c.id === 'begums-kitchen') || siteConfig.caseStudies[0];
  const kgfProject = siteConfig.caseStudies.find((c) => c.id === 'kgf-bakehouse') || siteConfig.caseStudies[1];

  return (
    <section id="work" className={styles.workSection}>
      <div className={`container ${styles.innerContainer}`}>
        {/* Header */}
        <div className={styles.headerRow}>
          <div className="section-tag">
            <span className="section-tag-dot" />
            <span>REAL PROJECTS · LIVE SITES</span>
          </div>

          <h2 className="section-title">
            Crafted for conversion.{'\n'}
            Built to scale.
          </h2>

          <p className="section-subtitle">
            Explore live production builds engineered by WebKraftX. Every project pairs custom UI architecture with commercial revenue funnels and seamless checkout integrations.
          </p>
        </div>

        {/* Selected Work Grid: 2 Asymmetric Video/Interactive Cards + 1 Outlined Filler Card */}
        <div className={styles.casesGrid}>
          {/* PROJECT 01: Begum's Authentic Kitchen (Asymmetric Large Left) */}
          <motion.div
            className={`${styles.projectCard} ${styles.begumsCard}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
          >
            {/* Visual Frame */}
            <div className={styles.mediaFrame} onClick={() => onOpenVideoWalkthrough('begums-kitchen')}>
              <img
                src={begumsProject.image}
                alt={begumsProject.client}
                className={styles.projectImage}
              />
              <div className={styles.mediaOverlay} />

              {/* Status Badge */}
              <div className={styles.liveTagBadge}>
                <span className={styles.greenPulse} />
                <span>Production Live</span>
              </div>

              {/* Result Pill */}
              <div className={styles.resultPill}>
                <TrendingUp size={15} />
                <span className={styles.resultMetricBig}>{begumsProject.resultMetric}</span>
                <span className={styles.resultLabelText}>{begumsProject.resultLabel}</span>
              </div>

              {/* Video Walkthrough Trigger Overlay */}
              <div className={styles.playOverlayButton}>
                <div className={styles.playCircle}>
                  <Play size={20} fill="#FFFFFF" style={{ marginLeft: 3 }} />
                </div>
                <span className={styles.playLabel}>Watch Walkthrough</span>
              </div>
            </div>

            {/* Content Details */}
            <div className={styles.cardBody}>
              <div className={styles.clientMeta}>
                <span className={styles.clientName}>{begumsProject.client}</span>
                <span className={styles.dotSeparator}>•</span>
                <span className={styles.industryTag}>{begumsProject.industry}</span>
              </div>

              <h3 className={styles.cardTitle}>{begumsProject.headline}</h3>
              <p className={styles.cardDescription}>{begumsProject.description}</p>

              {/* Tech & Service Chips */}
              <div className={styles.chipsRow}>
                {begumsProject.services.map((svc) => (
                  <span key={svc} className={styles.serviceChip}>
                    {svc}
                  </span>
                ))}
              </div>

              {/* Action Buttons: View Live Site & Watch Full Walkthrough */}
              <div className={styles.actionButtonsRow}>
                <a
                  href={begumsProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`btn-primary ${styles.liveSiteBtn}`}
                >
                  <span>View Live Site</span>
                  <ExternalLink size={15} />
                </a>

                <button
                  className={`btn-secondary ${styles.walkthroughBtn}`}
                  onClick={() => onOpenVideoWalkthrough('begums-kitchen')}
                >
                  <Play size={14} fill="currentColor" />
                  <span>Watch Walkthrough</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* PROJECT 02: KGF Bakehouse (Asymmetric Large Right) */}
          <motion.div
            className={`${styles.projectCard} ${styles.kgfCard}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {/* Visual Frame */}
            <div className={styles.mediaFrame} onClick={() => onOpenVideoWalkthrough('kgf-bakehouse')}>
              <img
                src={kgfProject.image}
                alt={kgfProject.client}
                className={styles.projectImage}
              />
              <div className={styles.mediaOverlay} />

              {/* Status Badge */}
              <div className={styles.liveTagBadge}>
                <span className={styles.greenPulse} />
                <span>Production Live</span>
              </div>

              {/* Result Pill */}
              <div className={styles.resultPill}>
                <TrendingUp size={15} />
                <span className={styles.resultMetricBig}>{kgfProject.resultMetric}</span>
                <span className={styles.resultLabelText}>{kgfProject.resultLabel}</span>
              </div>

              {/* Video Walkthrough Trigger Overlay */}
              <div className={styles.playOverlayButton}>
                <div className={styles.playCircle}>
                  <Play size={20} fill="#FFFFFF" style={{ marginLeft: 3 }} />
                </div>
                <span className={styles.playLabel}>Watch Walkthrough</span>
              </div>
            </div>

            {/* Content Details */}
            <div className={styles.cardBody}>
              <div className={styles.clientMeta}>
                <span className={styles.clientName}>{kgfProject.client}</span>
                <span className={styles.dotSeparator}>•</span>
                <span className={styles.industryTag}>{kgfProject.industry}</span>
              </div>

              <h3 className={styles.cardTitle}>{kgfProject.headline}</h3>
              <p className={styles.cardDescription}>{kgfProject.description}</p>

              {/* Tech & Service Chips */}
              <div className={styles.chipsRow}>
                {kgfProject.services.map((svc) => (
                  <span key={svc} className={styles.serviceChip}>
                    {svc}
                  </span>
                ))}
              </div>

              {/* Action Buttons: View Live Site & Watch Full Walkthrough */}
              <div className={styles.actionButtonsRow}>
                <a
                  href={kgfProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`btn-primary ${styles.liveSiteBtn}`}
                >
                  <span>View Live Site</span>
                  <ExternalLink size={15} />
                </a>

                <button
                  className={`btn-secondary ${styles.walkthroughBtn}`}
                  onClick={() => onOpenVideoWalkthrough('kgf-bakehouse')}
                >
                  <Play size={14} fill="currentColor" />
                  <span>Watch Walkthrough</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* CARD 03: Outlined Filler Card ("Your brand could be next →") */}
          <motion.div
            className={styles.fillerCard}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.25 }}
            onClick={onOpenProposal}
          >
            <div className={styles.fillerInner}>
              <div className={styles.fillerBadge}>
                <Sparkles size={16} />
                <span>Q1 & Q2 AVAILABILITY</span>
              </div>

              <h3 className={styles.fillerTitle}>
                Your brand could be next <span className={styles.blueArrow}>→</span>
              </h3>

              <p className={styles.fillerDescription}>
                We partner with select high-growth brands to build digital flagships, deploy performance marketing funnels, and produce viral video content.
              </p>

              <div className={styles.fillerChecklist}>
                <div className={styles.fillerCheckItem}>✓ 2–4 Week Turnaround</div>
                <div className={styles.fillerCheckItem}>✓ Custom Design & React Code</div>
                <div className={styles.fillerCheckItem}>✓ Measured Bottom-Line ROI</div>
              </div>

              <button className={`btn-primary ${styles.fillerBtn}`}>
                <span>Start Your Project</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
