import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, HelpCircle } from 'lucide-react';
import { siteConfig, PricingPlan } from '../data/config';
import styles from './PricingSection.module.css';

interface PricingSectionProps {
  onSelectPlan: (planName: string) => void;
}

export function PricingSection({ onSelectPlan }: PricingSectionProps) {
  return (
    <section id="pricing" className={styles.pricingSection}>
      <div className={`container ${styles.innerContainer}`}>
        {/* Header */}
        <div className={styles.headerRow}>
          <div className="section-tag">
            <span className="section-tag-dot" />
            <span>TRANSPARENT INVESTMENT</span>
          </div>

          <h2 className="section-title">
            Predictable pricing.{'\n'}
            Compounding ROI.
          </h2>

          <p className="section-subtitle">
            Choose the engagement model that matches your growth velocity. No hidden agency retainers,
            no surprise invoices, and no lock-in contracts.
          </p>
        </div>

        {/* 3 Package Cards */}
        <div className={styles.plansGrid}>
          {siteConfig.pricingPlans.map((plan) => {
            const isPopular = plan.isPopular;
            return (
              <div
                key={plan.id}
                className={`${styles.planCard} ${isPopular ? styles.popularCard : ''}`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className={styles.popularBadge}>
                    <span>{plan.badge || 'MOST POPULAR'}</span>
                  </div>
                )}

                {/* Plan Title & Price */}
                <div className={styles.planHeader}>
                  <h3 className={styles.planName}>{plan.name}</h3>
                  <div className={styles.priceRow}>
                    <span className={styles.priceNum}>{plan.price}</span>
                    <span className={styles.pricePeriod}>/ {plan.period}</span>
                  </div>
                  <p className={styles.planDesc}>{plan.description}</p>
                  <div className={styles.timelinePill}>
                    <span>Timeline: {plan.timeline}</span>
                  </div>
                </div>

                {/* Features List */}
                <div className={styles.featuresList}>
                  <span className={styles.featuresHeading}>WHAT IS INCLUDED:</span>
                  {plan.features.map((feature, fIdx) => (
                    <div key={fIdx} className={styles.featureItem}>
                      <div className={styles.checkWrap}>
                        <Check size={13} />
                      </div>
                      <span className={styles.featureText}>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  className={`${isPopular ? 'btn-primary' : 'btn-secondary'} ${styles.planCtaBtn}`}
                  onClick={() => onSelectPlan(plan.name)}
                >
                  <span>Select {plan.name}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Custom Quote Note */}
        <div className={styles.customQuoteBox}>
          <HelpCircle size={18} className={styles.infoIcon} />
          <p className={styles.customQuoteText}>
            Need an enterprise engagement, complex API integration, or bespoke ad spend structure?{' '}
            <button className={styles.customLink} onClick={() => onSelectPlan('Custom Enterprise')}>
              Request a tailored custom proposal →
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}
