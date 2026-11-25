import React, { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowUpRight,
  ArrowLeft,
} from 'lucide-react';
import paperPlaneMiniImg from '../assets/paper-plane-mini.png';
import { submitContactEnquiry, ContactFormData } from '../services/contactService';
import { CONTACT_CONFIG } from '../config/contactConfig';
import styles from './ContactPage.module.css';

interface ContactPageProps {
  onNavigateHome?: () => void;
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

const NEXT_STEPS = [
  {
    num: '01',
    title: 'We receive your enquiry',
    desc: 'Our team logs and acknowledges your submission.',
  },
  {
    num: '02',
    title: 'We review your requirements',
    desc: 'We examine your project scope, business context, and goals.',
  },
  {
    num: '03',
    title: 'We discuss the project & solutions',
    desc: 'A focused discussion to clarify technical and creative details.',
  },
  {
    num: '04',
    title: 'You receive a clear proposal',
    desc: 'Transparent deliverables, timelines, and tailored quotation.',
  },
];

export function ContactPage({ onNavigateHome }: ContactPageProps) {
  const shouldReduceMotion = useReducedMotion();

  // Form State
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    service: SERVICE_OPTIONS[0],
    budget: '',
    description: '',
    preferredContact: 'WhatsApp',
    privacyAgree: false,
    honeypot: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [hasSubmittedAttempt, setHasSubmittedAttempt] = useState(false);

  // Bot-detection rate check timestamp
  const loadTimeRef = useRef<number>(Date.now());
  useEffect(() => {
    loadTimeRef.current = Date.now();
  }, []);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Phone is only required if WhatsApp is selected
    if (formData.preferredContact === 'WhatsApp') {
      const digitsOnly = formData.phone ? formData.phone.replace(/\D/g, '') : '';
      if (!formData.phone || !formData.phone.trim()) {
        newErrors.phone = 'Please enter your phone number for WhatsApp.';
      } else if (digitsOnly.length < 10) {
        newErrors.phone = 'Please enter at least 10 digits for your phone number.';
      }
    }

    if (!formData.service) {
      newErrors.service = 'Please select a service.';
    }

    if (!formData.budget.trim()) {
      newErrors.budget = 'Please enter an estimated budget (e.g. ₹25,000 or ₹30,000 – ₹1,00,000).';
    }

    if (!formData.privacyAgree) {
      newErrors.privacyAgree = 'You must agree to the privacy policy to continue.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (hasSubmittedAttempt) {
      if (errors[name]) {
        setErrors((prev) => {
          const updated = { ...prev };
          delete updated[name];
          return updated;
        });
      }
    }
  };

  const handlePreferredContactChange = (val: 'WhatsApp' | 'Email') => {
    setFormData((prev) => ({ ...prev, preferredContact: val }));
    if (val === 'Email' && errors.phone) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated.phone;
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmittedAttempt(true);
    setSubmitError(null);

    const timeSpent = Date.now() - loadTimeRef.current;
    if (timeSpent < 1500 && !formData.honeypot) {
      await new Promise((r) => setTimeout(r, 600));
    }

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await submitContactEnquiry(formData);
      if (res.success) {
        if (res.whatsAppUrl) {
          window.open(res.whatsAppUrl, '_blank', 'noopener,noreferrer');
        }
        setIsSuccess(true);
        // Reset form on success
        setFormData({
          fullName: '',
          businessName: '',
          email: '',
          phone: '',
          service: SERVICE_OPTIONS[0],
          budget: '',
          description: '',
          preferredContact: 'WhatsApp',
          privacyAgree: false,
          honeypot: '',
        });
        setHasSubmittedAttempt(false);
        setErrors({});
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
    <div className={styles.contactPageRoot}>
      {/* Background layered diagonal tint variation & subtle ambient glow */}
      <div className={styles.diagonalTintOverlay} aria-hidden="true" />
      <div className={styles.ambientTopGlow} aria-hidden="true" />
      <div className={styles.ambientBottomGlow} aria-hidden="true" />

      <div className={styles.pageContainer}>
        {/* Back to Home Button */}
        {onNavigateHome && (
          <div className={styles.backButtonRow}>
            <button
              type="button"
              className={styles.backToHomeBtn}
              onClick={onNavigateHome}
              aria-label="Back to Home"
            >
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </button>
          </div>
        )}

        {/* ========================================================
            1. HERO SECTION (Grounded with Identity)
            ======================================================== */}
        <section className={styles.heroSection}>
          {/* Large soft radial lavender glow behind the headline */}
          <div className={styles.headlineAmbientGlow} aria-hidden="true" />

          {/* Twinkling ✦ sparkles framing the hero */}
          <span className={styles.sparkleOne} aria-hidden="true">✦</span>
          <span className={styles.sparkleTwo} aria-hidden="true">✦</span>
          <span className={styles.sparkleThree} aria-hidden="true">✦</span>

          <div className={styles.heroContent}>
            {/* Label: LET'S CONNECT with short line before it */}
            <motion.div
              className={styles.heroLabel}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={styles.labelLine} aria-hidden="true" />
              <span>LET&apos;S CONNECT</span>
            </motion.div>

            {/* Headline: Much larger, tight leading, "conversation." in #783DE0 with hand-drawn underline */}
            <h1 className={styles.heroHeading}>
              <span className={styles.headlineBaseRow}>
                {['Every', 'great', 'project', 'starts', 'with', 'a'].map((word, i) => (
                  <span key={word} className={styles.wordMask}>
                    <motion.span
                      className={styles.wordInner}
                      initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{
                        duration: 0.65,
                        delay: 0.08 + i * 0.065,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      {word}&nbsp;
                    </motion.span>
                  </span>
                ))}
              </span>

              {/* Accent Word: "conversation." with Hand-Drawn Underline and Perched Plane */}
              <span className={styles.conversationWrap}>
                <span className={styles.wordMask}>
                  <motion.span
                    className={`${styles.wordInner} ${styles.conversationText}`}
                    initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{
                      duration: 0.7,
                      delay: 0.48,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    conversation.
                  </motion.span>
                </span>

                {/* Hand-drawn purple underline that draws itself on load */}
                <svg
                  className={styles.handDrawnVector}
                  viewBox="0 0 280 18"
                  fill="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="underlineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#7C3AED" />
                      <stop offset="50%" stopColor="#C026D3" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M 4 13 Q 140 3, 276 11"
                    stroke="url(#underlineGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.75, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
                  />
                </svg>

                {/* Paper plane subtly perched near the headline's edge */}
                <div className={styles.perchedPlaneWrap} aria-hidden="true">
                  <img
                    src={paperPlaneMiniImg}
                    alt=""
                    draggable={false}
                    className={styles.perchedPlaneImg}
                  />
                </div>
              </span>
            </h1>

            {/* Supporting Text */}
            <motion.p
              className={styles.heroSupportingText}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.72, ease: [0.16, 1, 0.3, 1] }}
            >
              Whether you are looking to build a new website, develop a custom web application, scale paid marketing, or rethink your brand&apos;s digital presence — we&apos;re here to understand your goals and deliver a solution that works for your business.
            </motion.p>
          </div>
        </section>

        {/* ========================================================
            2. TWO-COLUMN LAYOUT (DESKTOP)
            Left: Contact Info Panel (#E5D7F4)
            Right: Project Enquiry Form Panel (#F5EFFB)
            ======================================================== */}
        <section className={styles.mainGridSection}>
          <div className={styles.twoColumnGrid}>
            {/* ----------------------------------------------------
                LEFT COLUMN: CONTACT INFO PANEL (#E5D7F4 surface)
                ---------------------------------------------------- */}
            <div className={styles.leftInfoCol}>
              <motion.div
                className={styles.infoPanelSurface}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={styles.infoStickyWrap}>
                  <h2 className={styles.infoHeading}>
                    We&apos;d love to hear what you&apos;re planning.
                  </h2>
                  <p className={styles.infoDescription}>
                    Tell us about your requirements, timelines, and ideas. We review every enquiry personally and get back with clear next steps.
                  </p>

                  {/* Contact Rows with clean line icons */}
                  <div className={styles.contactRowsList}>
                    {/* Phone */}
                    <motion.a
                      href="tel:+917708136273"
                      className={`${styles.contactRowItem} ${styles.phoneRowItem}`}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.12 }}
                    >
                      <div className={`${styles.contactTileIcon} ${styles.phoneIconTile}`}>
                        <Phone size={19} />
                      </div>
                      <div className={styles.contactRowContent}>
                        <span className={styles.contactRowLabel}>PHONE</span>
                        <span className={styles.contactRowValue}>+91 7708136273</span>
                      </div>
                    </motion.a>

                    {/* Email */}
                    <motion.a
                      href="mailto:contact.webkraftx@gmail.com"
                      className={`${styles.contactRowItem} ${styles.emailRowItem}`}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.24 }}
                    >
                      <div className={`${styles.contactTileIcon} ${styles.emailIconTile}`}>
                        <Mail size={19} />
                      </div>
                      <div className={styles.contactRowContent}>
                        <span className={styles.contactRowLabel}>EMAIL</span>
                        <span className={styles.contactRowValue}>contact.webkraftx@gmail.com</span>
                      </div>
                    </motion.a>

                    {/* WhatsApp (with "Chat now ↗" hover hint) */}
                    <motion.a
                      href="https://wa.me/917708136273"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.contactRowItem} ${styles.whatsAppRowItem}`}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.36 }}
                    >
                      <div className={`${styles.contactTileIcon} ${styles.whatsAppIconTile}`}>
                        <MessageCircle size={19} />
                      </div>
                      <div className={styles.contactRowContent}>
                        <span className={styles.contactRowLabel}>WHATSAPP</span>
                        <div className={styles.whatsAppValRow}>
                          <span className={styles.contactRowValue}>+91 7708136273</span>
                          <span className={styles.chatNowHint}>
                            Chat now <ArrowUpRight size={13} />
                          </span>
                        </div>
                      </div>
                    </motion.a>

                    {/* Location: Plain text, clean typography */}
                    <motion.div
                      className={`${styles.contactRowItemStatic} ${styles.locationRowItem}`}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.48 }}
                    >
                      <div className={`${styles.contactTileIcon} ${styles.locationIconTile}`}>
                        <MapPin size={19} />
                      </div>
                      <div className={styles.contactRowContent}>
                        <span className={styles.contactRowLabel}>OFFICE LOCATION</span>
                        <span className={styles.contactRowValueStatic}>
                          Chikkamanahalli, Bannerghatta Main Road, K.G. Hommadevanahalli, Bengaluru – 560083
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ----------------------------------------------------
                RIGHT COLUMN: PROJECT ENQUIRY FORM (#F5EFFB surface)
                ---------------------------------------------------- */}
            <div className={styles.rightFormCol}>
              <motion.div
                className={styles.formSurfaceCard}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              >
                {isSuccess ? (
                  /* Elegant Inline Success State (replaces form) */
                  <div className={styles.successStateBox}>
                    <div className={styles.successIconBubble}>
                      <CheckCircle2 size={42} className={styles.successCheckIcon} />
                    </div>
                    <h3 className={styles.successTitle}>Thanks! We&apos;ll get back to you within 24 hours.</h3>
                    <p className={styles.successMessage}>
                      Your project enquiry has been submitted successfully. We review every requirement personally and will reach out with clear next steps.
                    </p>
                    <button
                      type="button"
                      className={styles.submitAnotherBtn}
                      onClick={() => {
                        setIsSuccess(false);
                      }}
                    >
                      Send another enquiry
                    </button>
                  </div>
                ) : (
                  /* The Form */
                  <form onSubmit={handleSubmit} noValidate className={styles.enquiryForm}>
                    <div className={styles.formHeaderBlock}>
                      <h3 className={styles.formHeading}>Tell us about your project.</h3>
                      <p className={styles.formSubText}>
                        Fill out the details below and we will get back to discuss scope, timeline, and an initial estimate.
                      </p>
                    </div>

                    {/* Server error alert banner if delivery fails */}
                    {submitError && (
                      <div className={styles.errorAlertBanner}>
                        <AlertCircle size={18} className={styles.errorAlertIcon} />
                        <div>
                          <span>Something went wrong. Reach us directly at </span>
                          <a href={`mailto:${CONTACT_CONFIG.contactEmail}`} className={styles.errorAlertLink}>
                            {CONTACT_CONFIG.contactEmail}
                          </a>
                          <span> or on </span>
                          <a
                            href={CONTACT_CONFIG.getWhatsAppUrl()}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.errorAlertLink}
                          >
                            WhatsApp
                          </a>
                          .
                        </div>
                      </div>
                    )}

                    {/* Honeypot field for bot suppression (hidden from users) */}
                    <div style={{ display: 'none' }} aria-hidden="true">
                      <label htmlFor="website_hp">Website</label>
                      <input
                        id="website_hp"
                        type="text"
                        name="honeypot"
                        value={formData.honeypot}
                        onChange={handleChange}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    <div className={styles.fieldsGrid}>
                      {/* 1. Full Name* */}
                      <div className={styles.fieldGroup}>
                        <label htmlFor="fullName" className={styles.fieldLabel}>
                          Full Name <span className={styles.requiredStar}>*</span>
                        </label>
                        <input
                          id="fullName"
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="e.g. Rahul Sharma"
                          className={`${styles.textInput} ${errors.fullName ? styles.inputInvalid : ''}`}
                          disabled={isSubmitting}
                          required
                        />
                        {errors.fullName && (
                          <span className={styles.fieldErrorMessage}>{errors.fullName}</span>
                        )}
                      </div>

                      {/* 2. Business Name (optional) */}
                      <div className={styles.fieldGroup}>
                        <label htmlFor="businessName" className={styles.fieldLabel}>
                          Business Name <span className={styles.optionalNote}>(Optional)</span>
                        </label>
                        <input
                          id="businessName"
                          type="text"
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleChange}
                          placeholder="e.g. Acme Health / Company"
                          className={styles.textInput}
                          disabled={isSubmitting}
                        />
                      </div>

                      {/* 3. Email* */}
                      <div className={styles.fieldGroup}>
                        <label htmlFor="email" className={styles.fieldLabel}>
                          Email Address <span className={styles.requiredStar}>*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="name@company.com"
                          className={`${styles.textInput} ${errors.email ? styles.inputInvalid : ''}`}
                          disabled={isSubmitting}
                          required
                        />
                        {errors.email && (
                          <span className={styles.fieldErrorMessage}>{errors.email}</span>
                        )}
                      </div>

                      {/* 4. Phone Number */}
                      <div className={styles.fieldGroup}>
                        <label htmlFor="phone" className={styles.fieldLabel}>
                          Phone Number{' '}
                          {formData.preferredContact === 'WhatsApp' ? (
                            <span className={styles.requiredStar}>*</span>
                          ) : (
                            <span className={styles.optionalNote}>(Optional)</span>
                          )}
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="e.g. +91 98765 43210"
                          className={`${styles.textInput} ${errors.phone ? styles.inputInvalid : ''}`}
                          disabled={isSubmitting}
                          required={formData.preferredContact === 'WhatsApp'}
                        />
                        {errors.phone && (
                          <span className={styles.fieldErrorMessage}>{errors.phone}</span>
                        )}
                      </div>

                      {/* 5. Service Dropdown (9 options) */}
                      <div className={styles.fieldGroup}>
                        <label htmlFor="service" className={styles.fieldLabel}>
                          Service Needed <span className={styles.requiredStar}>*</span>
                        </label>
                        <div className={styles.selectWrapper}>
                          <select
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className={styles.customSelect}
                            disabled={isSubmitting}
                          >
                            {SERVICE_OPTIONS.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* 6. Estimated Budget (Free text/number with numeric mode) */}
                      <div className={styles.fieldGroup}>
                        <label htmlFor="budget" className={styles.fieldLabel}>
                          Estimated Budget <span className={styles.requiredStar}>*</span>
                        </label>
                        <input
                          id="budget"
                          type="text"
                          inputMode="numeric"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          placeholder="e.g. ₹25,000 or ₹30,000 – ₹1,00,000"
                          className={`${styles.textInput} ${errors.budget ? styles.inputInvalid : ''}`}
                          disabled={isSubmitting}
                          required
                        />
                        {errors.budget && (
                          <span className={styles.fieldErrorMessage}>{errors.budget}</span>
                        )}
                      </div>
                    </div>

                    {/* 7. Project Description textarea */}
                    <div className={styles.fieldGroupFull}>
                      <label htmlFor="description" className={styles.fieldLabel}>
                        Project Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Tell us a bit about what you want to build, current challenges, target launch timeline, or specific requirements..."
                        className={styles.textAreaInput}
                        disabled={isSubmitting}
                      />
                    </div>

                    {/* 8. Preferred Contact Method (WhatsApp & Email only) */}
                    <div className={styles.fieldGroupFull}>
                      <label className={styles.fieldLabel}>Preferred Contact Method</label>
                      <div className={styles.radioPillsRow}>
                        {(['WhatsApp', 'Email'] as const).map((method) => {
                          const isSelected = formData.preferredContact === method;
                          return (
                            <button
                              type="button"
                              key={method}
                              className={`${styles.radioPill} ${isSelected ? styles.radioPillActive : ''}`}
                              onClick={() => handlePreferredContactChange(method)}
                            >
                              <span>{method}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 9. Privacy Policy Checkbox (Required) */}
                    <div className={styles.privacyCheckGroup}>
                      <label className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          name="privacyAgree"
                          checked={formData.privacyAgree}
                          onChange={handleChange}
                          className={styles.checkboxInput}
                          disabled={isSubmitting}
                        />
                        <span className={styles.checkboxCustom} />
                        <span className={styles.checkboxText}>
                          I agree to allow WebKraftX to store and process my details to respond to this enquiry.{' '}
                          <span className={styles.requiredStar}>*</span>
                        </span>
                      </label>
                      {errors.privacyAgree && (
                        <span className={styles.fieldErrorMessage}>{errors.privacyAgree}</span>
                      )}
                    </div>

                    {/* Submit Button: Full-width, #783DE0, hover deepens, arrow slides right */}
                    <div className={styles.submitRow}>
                      <button
                        type="submit"
                        className={styles.submitBtn}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={18} className={styles.spinnerIcon} />
                            <span>Sending…</span>
                          </>
                        ) : (
                          <>
                            <span>Let's Build Together</span>
                            <ArrowRight size={18} className={styles.submitArrow} />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ========================================================
            3. "WHAT HAPPENS NEXT?" STEPPER
            Horizontal 4-step row with thin connecting line (compact timeline)
            ======================================================== */}
        <section className={styles.nextStepsSection}>
          <div className={styles.nextStepsHeader}>
            <span className={styles.nextStepsLabel}>WHAT HAPPENS NEXT?</span>
            <h3 className={styles.nextStepsHeading}>A clear, disciplined process from day one.</h3>
          </div>

          <div className={styles.stepperWrapper}>
            {/* Horizontal connecting line passing through numbers */}
            <div className={styles.stepperConnectingTrack} aria-hidden="true">
              <motion.div
                className={styles.stepperConnectingFill}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            <div className={styles.stepperRow}>
              {NEXT_STEPS.map((step, idx) => (
                <motion.div
                  key={step.num}
                  className={styles.stepperItem}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: 0.12 + idx * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <div className={styles.stepperNodeNumber}>{step.num}</div>
                  <h4 className={styles.stepperItemTitle}>{step.title}</h4>
                  <p className={styles.stepperItemDesc}>{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================
            4. BOTTOM CTA: "Not sure where to begin?" (Centered)
            ======================================================== */}
        <section className={styles.bottomCtaSection}>
          <div className={styles.bottomCtaCentered}>
            <div className={styles.ctaSparkleWrap} aria-hidden="true">
              <span className={styles.ctaSparkle}>✦</span>
            </div>
            <h3 className={styles.bottomCtaHeading}>Not sure where to begin?</h3>
            <p className={styles.bottomCtaDesc}>
              If you&apos;d prefer an informal discussion first, reach out directly on WhatsApp. We&apos;re happy to answer quick questions about feasibility, approach, or rough scopes.
            </p>

            <a
              href="https://wa.me/917708136273"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.talkToWebkraftxBtn}
            >
              <span>Talk to WebKraftX</span>
              <ArrowRight size={17} className={styles.ctaBtnArrow} />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
