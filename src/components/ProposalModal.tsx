import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { siteConfig } from '../data/config';
import styles from './ProposalModal.module.css';

interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

const BUDGET_OPTIONS = [
  '$3,000 – $5,000',
  '$5,000 – $10,000',
  '$10,000 – $25,000',
  '$25,000+',
];

const SERVICE_OPTIONS = [
  'Web Design & Dev',
  'Conversion Rate Optimization (CRO)',
  'SEO & Organic Growth',
  'Paid Ads (Meta & Google)',
  'Social Media Management',
  'Short Video Shoots',
  'AI Video Production',
];

export function ProposalModal({ isOpen, onClose, preselectedService }: ProposalModalProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>(
    preselectedService ? [preselectedService] : [SERVICE_OPTIONS[0]]
  );
  const [selectedBudget, setSelectedBudget] = useState(BUDGET_OPTIONS[1]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [goals, setGoals] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const toggleService = (svc: string) => {
    setSelectedServices((prev) =>
      prev.includes(svc) ? prev.filter((s) => s !== svc) : [...prev, svc]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 2500);
  };

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
              <span className={styles.modalTag}>PROJECT INQUIRY & STRATEGY CALL</span>
              <h3 className={styles.modalTitle}>Request a Custom Proposal</h3>
            </div>
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close dialog">
              <X size={20} />
            </button>
          </div>

          {isSubmitted ? (
            <div className={styles.successState}>
              <div className={styles.successIcon}>
                <CheckCircle2 size={44} />
              </div>
              <h4 className={styles.successHeading}>Proposal Request Received!</h4>
              <p className={styles.successMessage}>
                Thank you, {name}. Our senior growth lead will review your project requirements and
                website ({website || 'provided'}) and send a tailored strategy audit to {email} within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.modalBody}>
              {/* Service Selection Pills */}
              <label className={styles.fieldLabel}>SERVICES NEEDED (SELECT ALL THAT APPLY):</label>
              <div className={styles.servicesWrap}>
                {SERVICE_OPTIONS.map((svc) => {
                  const isChecked = selectedServices.includes(svc);
                  return (
                    <button
                      type="button"
                      key={svc}
                      className={`${styles.servicePill} ${isChecked ? styles.servicePillActive : ''}`}
                      onClick={() => toggleService(svc)}
                    >
                      <span>{svc}</span>
                    </button>
                  );
                })}
              </div>

              {/* Target Budget */}
              <label className={styles.fieldLabel}>TARGET MONTHLY OR PROJECT BUDGET:</label>
              <div className={styles.budgetRow}>
                {BUDGET_OPTIONS.map((bgt) => (
                  <button
                    type="button"
                    key={bgt}
                    className={`${styles.budgetPill} ${
                      selectedBudget === bgt ? styles.budgetPillActive : ''
                    }`}
                    onClick={() => setSelectedBudget(bgt)}
                  >
                    {bgt}
                  </button>
                ))}
              </div>

              {/* Input Fields */}
              <div className={styles.inputsGrid}>
                <div>
                  <label className={styles.fieldLabel}>YOUR NAME / COMPANY:</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Morgan / Verve Co"
                    className={styles.inputField}
                  />
                </div>
                <div>
                  <label className={styles.fieldLabel}>WORK EMAIL:</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className={styles.inputField}
                  />
                </div>
              </div>

              <div>
                <label className={styles.fieldLabel}>CURRENT WEBSITE OR SOCIAL URL (OPTIONAL):</label>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://yourcompany.com"
                  className={styles.inputField}
                />
              </div>

              <div>
                <label className={styles.fieldLabel}>PRIMARY GOALS / TIMELINE / NOTES:</label>
                <textarea
                  rows={3}
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  placeholder="Tell us what you want to achieve (e.g. redesign site in 3 weeks, scale paid Meta ads to 4x ROAS, launch short video series)..."
                  className={styles.textareaField}
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className={`btn-primary ${styles.submitBtn}`}
                disabled={!name || !email}
              >
                <span>Submit & Book Strategy Call</span>
                <Send size={16} />
              </button>

              <div className={styles.privacyNote}>
                <ShieldCheck size={14} className={styles.shieldIcon} />
                <span>Strict confidentiality. Your information is never shared.</span>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
