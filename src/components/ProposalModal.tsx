import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, ShieldCheck, Loader2, AlertCircle } from 'lucide-react';
import { submitContactEnquiry } from '../services/contactService';
import { CONTACT_CONFIG } from '../config/contactConfig';
import styles from './ProposalModal.module.css';

interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

const SERVICE_OPTIONS = [
  'Website Design & Development',
  'Content Creation',
  'SEO',
  'Brand Marketing',
  'Social Media Handling',
  'Paid Advertising',
  'Mobile App Development',
];

export function ProposalModal({ isOpen, onClose, preselectedService }: ProposalModalProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>(
    preselectedService ? [preselectedService] : [SERVICE_OPTIONS[0]]
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [budget, setBudget] = useState('');
  const [website, setWebsite] = useState('');
  const [goals, setGoals] = useState('');
  const [preferredContact, setPreferredContact] = useState<'WhatsApp' | 'Email'>('WhatsApp');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleService = (svc: string) => {
    setSelectedServices((prev) =>
      prev.includes(svc) ? prev.filter((s) => s !== svc) : [...prev, svc]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!name.trim() || !email.trim() || !budget.trim()) {
      return;
    }

    if (preferredContact === 'WhatsApp') {
      const digitsOnly = phone.replace(/\D/g, '');
      if (!phone.trim() || digitsOnly.length < 10) {
        setSubmitError('Please enter at least 10 digits for your phone number to connect on WhatsApp.');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const res = await submitContactEnquiry({
        fullName: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        service: selectedServices.join(', ') || 'General Enquiry',
        budget: budget.trim(),
        description: `Website: ${website || 'N/A'}\nGoals/Notes: ${goals || 'N/A'}`,
        preferredContact,
        privacyAgree: true,
      });

      if (res.success) {
        if (res.whatsAppUrl) {
          window.open(res.whatsAppUrl, '_blank', 'noopener,noreferrer');
        }
        setIsSubmitted(true);
        // Reset form
        setName('');
        setEmail('');
        setPhone('');
        setBudget('');
        setWebsite('');
        setGoals('');
        setPreferredContact('WhatsApp');
      } else {
        setSubmitError(res.message || 'Something went wrong while delivering your message.');
      }
    } catch (err: any) {
      setSubmitError(err.message || 'Something went wrong while delivering your message.');
    } finally {
      setIsSubmitting(false);
    }
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
              <span className={styles.modalTag}>PROJECT INQUIRY &amp; STRATEGY CALL</span>
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
              <h4 className={styles.successHeading}>Thanks! We&apos;ll get back to you within 24 hours.</h4>
              <p className={styles.successMessage}>
                Thank you, {name || 'there'}! Our team will review your project requirements and
                reach out with a clear, tailored proposal.
              </p>
              <button
                type="button"
                className={`btn-primary ${styles.submitBtn}`}
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                style={{ marginTop: '1.25rem' }}
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.modalBody}>
              {submitError && (
                <div className={styles.errorBanner}>
                  <AlertCircle size={16} style={{ display: 'inline', marginRight: 6, verticalAlign: -3 }} />
                  <span>Something went wrong. Reach us directly at </span>
                  <a href={`mailto:${CONTACT_CONFIG.contactEmail}`}>
                    {CONTACT_CONFIG.contactEmail}
                  </a>
                  <span> or on </span>
                  <a
                    href={CONTACT_CONFIG.getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>
                  .
                </div>
              )}

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

              {/* Target Budget - Free text/number input */}
              <div>
                <label className={styles.fieldLabel}>ESTIMATED BUDGET *:</label>
                <input
                  type="text"
                  inputMode="numeric"
                  required
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="e.g. ₹25,000 or ₹30,000 – ₹1,00,000"
                  className={styles.inputField}
                  disabled={isSubmitting}
                />
              </div>

              {/* Input Fields */}
              <div className={styles.inputsGrid}>
                <div>
                  <label className={styles.fieldLabel}>YOUR NAME / COMPANY *:</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Morgan / Verve Co"
                    className={styles.inputField}
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label className={styles.fieldLabel}>WORK EMAIL *:</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className={styles.inputField}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div>
                <label className={styles.fieldLabel}>
                  PHONE NUMBER {preferredContact === 'WhatsApp' ? '*' : '(OPTIONAL)'}:
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className={styles.inputField}
                  disabled={isSubmitting}
                  required={preferredContact === 'WhatsApp'}
                />
              </div>

              {/* Preferred Contact Method */}
              <div>
                <label className={styles.fieldLabel}>PREFERRED CONTACT METHOD:</label>
                <div className={styles.contactPillsRow}>
                  {(['WhatsApp', 'Email'] as const).map((method) => {
                    const isSelected = preferredContact === method;
                    return (
                      <button
                        type="button"
                        key={method}
                        className={`${styles.contactPill} ${isSelected ? styles.contactPillActive : ''}`}
                        onClick={() => setPreferredContact(method)}
                      >
                        {method}
                      </button>
                    );
                  })}
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
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label className={styles.fieldLabel}>PRIMARY GOALS / TIMELINE / NOTES:</label>
                <textarea
                  rows={3}
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  placeholder="Tell us what you want to achieve..."
                  className={styles.textareaField}
                  disabled={isSubmitting}
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className={`btn-primary ${styles.submitBtn}`}
                disabled={!name || !email || !budget || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Sending…</span>
                  </>
                ) : (
                  <>
                    <span>Submit &amp; Book Strategy Call</span>
                    <Send size={16} />
                  </>
                )}
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
