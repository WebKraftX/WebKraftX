import React from 'react';
import { ExternalLink, CheckCircle } from 'lucide-react';
import { siteConfig } from '../data/config';
import styles from './TrustedStrip.module.css';

export function TrustedStrip() {
  return (
    <section className={styles.trustedSection}>
      <div className={`container ${styles.trustedInner}`}>
        <div className={styles.labelGroup}>
          <span className={styles.trustedDot} />
          <p className={styles.trustedLabel}>
            Trusted by local & growing brands
          </p>
        </div>

        <div className={styles.logosRow}>
          {siteConfig.trustedBrands.map((brand) => (
            <div key={brand.name} className={styles.brandChip}>
              {brand.liveUrl ? (
                <a
                  href={brand.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.brandLink}
                >
                  <span className={styles.brandDotLive} />
                  <span className={styles.brandName}>{brand.name}</span>
                  <span className={styles.brandTag}>Live Client</span>
                  <ExternalLink size={12} className={styles.extIcon} />
                </a>
              ) : (
                <div className={styles.brandMeta}>
                  <span className={styles.brandDot} />
                  <span className={styles.brandName}>{brand.name}</span>
                  <span className={styles.brandCategory}>{brand.category}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
