import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { CaseStudy } from '../data/config';
import styles from './CaseStudyModal.module.css';

interface CaseStudyModalProps {
  study: CaseStudy | null;
  onClose: () => void;
  onInquire: (client: string) => void;
}

export function CaseStudyModal({ study, onClose, onInquire }: CaseStudyModalProps) {
  if (!study) return null;

  return (
    <AnimatePresence>
      <div className={styles.backdrop}>
        <motion.div
          className={styles.backdropOverlay}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        <motion.div
          className={styles.modalCard}
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.25 }}
        >
          {/* Header */}
          <div className={styles.modalHeader}>
            <div>
              <span className={styles.clientTag}>{study.client} • {study.industry}</span>
              <h3 className={styles.modalTitle}>{study.headline}</h3>
            </div>
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close dialog">
              <X size={20} />
            </button>
          </div>

          <div className={styles.modalBody}>
            {/* Image Frame */}
            <div className={styles.imageFrame}>
              <img src={study.image} alt={study.headline} className={styles.coverImg} />
              <div className={styles.resultBadge}>
                <TrendingUp size={15} className={styles.trendIcon} />
                <span className={styles.metricVal}>{study.resultMetric}</span>
                <span className={styles.metricLabel}>{study.resultLabel}</span>
              </div>
            </div>

            {/* Services Executed */}
            <div className={styles.sectionBlock}>
              <h4 className={styles.sectionHeading}>Services & Frameworks Deployed</h4>
              <div className={styles.servicesRow}>
                {study.services.map((svc) => (
                  <div key={svc} className={styles.serviceChip}>
                    <CheckCircle size={14} className={styles.checkIcon} />
                    <span>{svc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Narrative */}
            <div className={styles.sectionBlock}>
              <h4 className={styles.sectionHeading}>The Challenge & Commercial Outcome</h4>
              <p className={styles.narrativeText}>{study.description}</p>
              <p className={styles.narrativeText}>
                By integrating technical precision, high-velocity ad testing, and relentless CRO,
                we scaled this client's commercial efficiency and established predictable customer acquisition.
              </p>
            </div>

            {/* Action Row */}
            <div className={styles.actionRow}>
              <button
                className={`btn-primary ${styles.actionBtn}`}
                onClick={() => onInquire(study.client)}
              >
                <span>Achieve Similar Results For Your Brand</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
