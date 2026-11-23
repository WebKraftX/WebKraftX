import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { siteConfig } from '../data/config';
import styles from './FaqSection.module.css';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="faq" className={styles.faqSection}>
      <div className={`container ${styles.innerContainer}`}>
        {/* Header */}
        <div className={styles.headerRow}>
          <div className="section-tag">
            <span className="section-tag-dot" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>

          <h2 className="section-title">
            Answers to common questions.{'\n'}
            Clear, honest expectations.
          </h2>

          <p className="section-subtitle">
            Everything you need to know about our sprints, pricing, communication cadences, and post-launch support.
          </p>
        </div>

        {/* 6 Questions Accordion */}
        <div className={styles.faqList}>
          {siteConfig.faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`${styles.faqCard} ${isOpen ? styles.faqCardOpen : ''}`}
              >
                <button
                  className={styles.faqQuestionBtn}
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.questionText}>{faq.question}</span>
                  <div className={styles.toggleIconWrap}>
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      className={styles.faqAnswerWrapper}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                    >
                      <p className={styles.answerText}>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
