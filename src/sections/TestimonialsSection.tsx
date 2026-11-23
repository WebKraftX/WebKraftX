import React from 'react';
import { Quote, Star } from 'lucide-react';
import { siteConfig } from '../data/config';
import { BrandWordmark } from '../components/BrandLogo';
import styles from './TestimonialsSection.module.css';

export function TestimonialsSection() {
  return (
    <section id="testimonials" className={styles.testimonialsSection}>
      <div className={`container ${styles.innerContainer}`}>
        {/* Header */}
        <div className={styles.headerRow}>
          <div className="section-tag">
            <span className="section-tag-dot" />
            <span>CLIENT ENDORSEMENTS</span>
          </div>

          <h2 className="section-title">
            What founders and product leads{'\n'}
            say about working with us.
          </h2>

          <p className="section-subtitle">
            Direct feedback from executive partners across Fintech, E-commerce, and Enterprise SaaS
            scaling their digital presence with <BrandWordmark />.
          </p>
        </div>

        {/* 3 Clean Quote Cards Grid */}
        <div className={styles.cardsGrid}>
          {siteConfig.testimonials.map((item, idx) => (
            <div key={idx} className={styles.quoteCard}>
              <div className={styles.cardTop}>
                <div className={styles.quoteIcon}>
                  <Quote size={18} />
                </div>
                <div className={styles.starsRow}>
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} size={14} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
              </div>

              <p className={styles.quoteText}>"{item.quote}"</p>

              <div className={styles.authorRow}>
                <img
                  src={item.avatar}
                  alt={item.author}
                  className={styles.authorAvatar}
                />
                <div className={styles.authorMeta}>
                  <h4 className={styles.authorName}>{item.author}</h4>
                  <p className={styles.authorRole}>
                    {item.role} • <span className={styles.companyName}>{item.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
