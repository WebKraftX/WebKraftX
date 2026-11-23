import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  FileText,
  SlidersHorizontal,
  ShieldCheck,
  Milestone,
  LifeBuoy,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  X,
  Send,
  Clock,
  Check,
} from 'lucide-react';
import paperPlaneMiniImg from '../assets/paper-plane-mini.png';
import styles from './PricingApproachSection.module.css';

interface PricingApproachSectionProps {
  onRequestEstimate?: () => void;
}

interface JourneyStep {
  id: string;
  number: string;
  title: string;
  titleMobile?: string;
  description: string;
  descMobile?: string;
  icon: React.ReactNode;
}

const PRICING_JOURNEY_STEPS: JourneyStep[] = [
  {
    id: 'step-quotations',
    number: '01',
    title: 'Project-based quotations',
    titleMobile: 'Project Quotations',
    description: 'Every project scoped individually, priced on its actual needs.',
    descMobile: 'Scoped individually on actual project needs.',
    icon: <FileText size={20} className={styles.stepIconSvg} />,
  },
  {
    id: 'step-requirements',
    number: '02',
    title: 'Pricing based on requirements',
    titleMobile: 'Requirement Pricing',
    description: 'You pay for what your project needs, nothing bundled in.',
    descMobile: 'Pay only for what your project needs.',
    icon: <SlidersHorizontal size={20} className={styles.stepIconSvg} />,
  },
  {
    id: 'step-deliverables',
    number: '03',
    title: 'Clearly defined deliverables',
    titleMobile: 'Clear Deliverables',
    description: "You know exactly what you're getting before we start.",
    descMobile: 'Exact deliverables clear before kickoff.',
    icon: <ShieldCheck size={20} className={styles.stepIconSvg} />,
  },
  {
    id: 'step-milestones',
    number: '04',
    title: 'Agreed payment milestones',
    titleMobile: 'Agreed Milestones',
    description: 'Work progresses in stages, payments tied to delivered milestones.',
    descMobile: 'Payments tied to delivered milestones.',
    icon: <Milestone size={20} className={styles.stepIconSvg} />,
  },
  {
    id: 'step-maintenance',
    number: '05',
    title: 'Optional maintenance packages',
    titleMobile: 'Optional Support',
    description: 'We stay after launch, only if you want us to.',
    descMobile: 'Post-launch maintenance only if requested.',
    icon: <LifeBuoy size={20} className={styles.stepIconSvg} />,
  },
];

const PROJECT_TYPE_OPTIONS = [
  'Website Development',
  'Web Application / Platform',
  'Conversion Rate Optimization (CRO)',
  'SEO & Organic Growth',
  'Branding & Creative Design',
  'Full Digital Overhaul',
];

export function PricingApproachSection({ onRequestEstimate }: PricingApproachSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: PROJECT_TYPE_OPTIONS[0],
    description: '',
  });

  // 3D Parallax tilt for the Estimate Sheet hero element
  const estimateRef = useRef<HTMLDivElement>(null);
  const [estimateTilt, setEstimateTilt] = useState({ x: 0, y: 0 });
  const [estimateGlare, setEstimateGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleEstimateMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!estimateRef.current) return;
    const rect = estimateRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setEstimateTilt({ x: -ny * 4, y: nx * 4 });
    const gx = ((e.clientX - rect.left) / rect.width) * 100;
    const gy = ((e.clientY - rect.top) / rect.height) * 100;
    setEstimateGlare({ x: gx, y: gy, opacity: 0.35 });
  };

  const handleEstimateMouseLeave = () => {
    setEstimateTilt({ x: 0, y: 0 });
    setEstimateGlare({ x: 50, y: 50, opacity: 0 });
  };

  // Magnetic CTA Button Hook
  const btnRef = useRef<HTMLButtonElement>(null);
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });

  const handleBtnMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setBtnOffset({
      x: (e.clientX - centerX) * 0.18,
      y: (e.clientY - centerY) * 0.18,
    });
  };

  const handleBtnMouseLeave = () => {
    setBtnOffset({ x: 0, y: 0 });
  };

  const handleOpenEstimateModal = () => {
    if (onRequestEstimate) {
      onRequestEstimate();
    } else {
      setModalOpen(true);
    }
  };

  const handleSubmitEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setModalOpen(false);
      setFormData({
        name: '',
        email: '',
        projectType: PROJECT_TYPE_OPTIONS[0],
        description: '',
      });
    }, 2400);
  };

  return (
    <section id="pricing" className={styles.pricingApproachSection}>
      {/* Background ambient lighting */}
      <div className={styles.ambientTopGlow} aria-hidden="true" />
      <div className={styles.ambientBottomGlow} aria-hidden="true" />

      <div className={styles.innerContainer}>
        {/* ========================================================
            MAIN TWO-COLUMN LAYOUT
            Left = Headline + Intro + Hero Estimate Visual + CTA
            Right = Connected Journey (5 Points with vertical line)
            ======================================================== */}
        <div className={styles.contentGrid}>
          {/* LEFT COLUMN */}
          <div className={styles.leftCol}>
            {/* 1. Section Label */}
            <motion.div
              className={styles.sectionLabel}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className={styles.labelDot} />
              <span>PRICING APPROACH</span>
            </motion.div>

            {/* Soft radial purple glow behind headline that slowly breathes */}
            <div className={styles.headlineAmbientGlow} aria-hidden="true" />

            {/* 2. Headline with Word-by-Word Reveal & Shimmer */}
            <h2 className={styles.headline}>
              <span className={styles.headlineLineSolid}>
                {['The', 'right', 'solution.'].map((word, i) => (
                  <span key={word} className={styles.headlineWordMask}>
                    <motion.span
                      className={styles.headlineWordInner}
                      initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.1 + i * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      {word}&nbsp;
                    </motion.span>
                  </span>
                ))}
              </span>

              <span className={styles.headlineLineShimmer}>
                {['A', 'clear'].map((word, i) => (
                  <span key={word} className={styles.headlineWordMask}>
                    <motion.span
                      className={styles.headlineWordInner}
                      initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.34 + i * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      {word}&nbsp;
                    </motion.span>
                  </span>
                ))}
                <span className={styles.headlineWordMask}>
                  <motion.span
                    className={`${styles.headlineWordInner} ${styles.investmentWord}`}
                    initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                      filter: [
                        'blur(8px) drop-shadow(0 0 0px rgba(166,107,255,0))',
                        'blur(0px) drop-shadow(0 0 16px rgba(166,107,255,0.85))',
                        'blur(0px) drop-shadow(0 0 4px rgba(166,107,255,0.3))'
                      ],
                    }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{
                      duration: 0.85,
                      delay: 0.5,
                      times: [0, 0.6, 1],
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    investment.
                  </motion.span>
                </span>
              </span>
            </h2>

            {/* 3. Short Intro Line */}
            <motion.p
              className={styles.introParagraph}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.32 }}
            >
              No hidden costs. No surprises. Just a transparent process from first call to final delivery.
            </motion.p>

            {/* 4. HERO MOMENT — "The Estimate" Stylized Document Visual */}
            <motion.div
              ref={estimateRef}
              className={styles.estimateVisualAnchor}
              onMouseMove={handleEstimateMouseMove}
              onMouseLeave={handleEstimateMouseLeave}
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                className={styles.estimateSheet}
                style={{
                  transform: shouldReduceMotion
                    ? 'none'
                    : `rotateX(${estimateTilt.x}deg) rotateY(${estimateTilt.y}deg)`,
                  transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {/* Light glare overlay shifting across the glass surface */}
                <div
                  className={styles.glassGlareOverlay}
                  style={{
                    background: `radial-gradient(circle at ${estimateGlare.x}% ${estimateGlare.y}%, rgba(255,255,255,0.22) 0%, transparent 65%)`,
                    opacity: estimateGlare.opacity,
                  }}
                  aria-hidden="true"
                />

                {/* 3D Paper Plane Perched on Top-Right Corner with gentle bob & 8s loop-de-loop */}
                <div className={styles.perchedPlaneWrap} aria-hidden="true">
                  <img
                    src={paperPlaneMiniImg}
                    alt=""
                    className={styles.perchedPlaneImg}
                    draggable={false}
                  />
                </div>

                {/* Top Sheet Header */}
                <div className={styles.sheetTopBar}>
                  <div className={styles.sheetDotCluster}>
                    <span className={styles.sheetDot} style={{ background: '#7C3AED' }} />
                    <span className={styles.sheetDot} style={{ background: '#A66BFF' }} />
                    <span className={styles.sheetDot} style={{ background: '#C7A7FF' }} />
                  </div>
                  <div className={styles.scopePill}>
                    <span className={styles.scopePulseDot} />
                    <span>PROJECT SCOPE</span>
                  </div>
                </div>

                {/* Scope Item Placeholders */}
                <div className={styles.sheetBody}>
                  <div className={styles.sheetTitleBlock}>
                    <div className={styles.sheetMainLine} />
                    <div className={styles.sheetSubLine} />
                  </div>

                  <div className={styles.milestoneBarsGrid}>
                    {/* Phase 01: 100% */}
                    <div className={styles.milestoneBarItem}>
                      <div className={styles.milestoneHeader}>
                        <span className={styles.milestoneDot} />
                        <span className={styles.milestoneLabel}>Phase 01 // Discovery &amp; Scope</span>
                        <motion.span
                          className={styles.milestoneStatus}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.35, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
                        >
                          DEFINED
                        </motion.span>
                      </div>
                      <div className={styles.milestoneTrack}>
                        <motion.div
                          className={styles.milestoneFill}
                          style={{ width: '100%', transformOrigin: 'left' }}
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <span className={styles.milestoneTipPulse} />
                        </motion.div>
                      </div>
                    </div>

                    {/* Phase 02: 70% */}
                    <div className={styles.milestoneBarItem}>
                      <div className={styles.milestoneHeader}>
                        <span className={styles.milestoneDot} />
                        <span className={styles.milestoneLabel}>Phase 02 // Production &amp; Milestones</span>
                        <motion.span
                          className={styles.milestoneStatus}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.35, delay: 1.35, ease: [0.16, 1, 0.3, 1] }}
                        >
                          AGREED
                        </motion.span>
                      </div>
                      <div className={styles.milestoneTrack}>
                        <motion.div
                          className={styles.milestoneFill}
                          style={{ width: '70%', transformOrigin: 'left' }}
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.85, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <span className={styles.milestoneTipPulse} />
                        </motion.div>
                      </div>
                    </div>

                    {/* Phase 03: 40% */}
                    <div className={styles.milestoneBarItem}>
                      <div className={styles.milestoneHeader}>
                        <span className={styles.milestoneDot} />
                        <span className={styles.milestoneLabel}>Phase 03 // Handover &amp; Care</span>
                        <motion.span
                          className={styles.milestoneStatus}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.35, delay: 1.55, ease: [0.16, 1, 0.3, 1] }}
                        >
                          OPTIONAL
                        </motion.span>
                      </div>
                      <div className={styles.milestoneTrack}>
                        <motion.div
                          className={styles.milestoneFill}
                          style={{ width: '40%', transformOrigin: 'left' }}
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <span className={styles.milestoneTipPulse} />
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.sheetFooterNotice}>
                    <span className={styles.twinkleSparkle1}>✦</span>
                    <span>Zero Bundling • Pure Transparent Delivery</span>
                    <span className={styles.twinkleSparkle2}>✦</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 5. CTA Button with Magnetic Hover & Reassurance Line */}
            <motion.div
              className={styles.ctaWrapper}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <button
                ref={btnRef}
                className={styles.primaryCtaBtn}
                onMouseMove={handleBtnMouseMove}
                onMouseLeave={handleBtnMouseLeave}
                onClick={handleOpenEstimateModal}
                style={{
                  transform: shouldReduceMotion
                    ? 'none'
                    : `translate3d(${btnOffset.x}px, ${btnOffset.y}px, 0)`,
                  transition: 'transform 0.15s ease-out',
                }}
              >
                <span className={styles.btnShineSweep} />
                <span className={styles.btnText}>Request a Project Estimate</span>
                <ArrowRight size={17} className={styles.btnArrow} />
              </button>

              <motion.div
                className={styles.reassuranceLine}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
              >
                <Clock size={13} className={styles.reassuranceClock} />
                <span>Response within 24 hours. No obligation.</span>
              </motion.div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: 5 JOURNEY POINTS (Connected vertical track) */}
          <div className={styles.rightCol}>
            <div className={styles.journeyTrackWrapper}>
              {/* Connecting Vertical Track Line */}
              <div className={styles.verticalTrackLine}>
                <motion.div
                  className={styles.verticalTrackProgress}
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                />
                {/* Glowing light orb continuously traveling down the line in a loop */}
                <div className={styles.travelingOrb} aria-hidden="true" />
              </div>

              {/* 5 Stacked Journey Step Tiles */}
              <div className={styles.stepsStack}>
                {PRICING_JOURNEY_STEPS.map((step, index) => (
                  <motion.div
                    key={step.id}
                    className={styles.journeyTile}
                    initial={{ opacity: 0, y: 22 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{
                      duration: 0.65,
                      delay: 0.15 + index * 0.15, // Staggered ~150ms apart
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {/* Faint diagonal shine on hover */}
                    <div className={styles.cardDiagonalShine} aria-hidden="true" />

                    {/* Node on the vertical track - pulses when in view */}
                    <div className={styles.trackNode}>
                      <span className={styles.trackNodeDot} />
                    </div>

                    {/* Left: Glossy Purple Brand Icon Badge (3D flip/pop on hover) */}
                    <div className={styles.stepIconBadge}>
                      {step.icon}
                    </div>

                    {/* Right: Step Content */}
                    <div className={styles.stepContent}>
                      <div className={styles.stepHeaderRow}>
                        <h3 className={styles.stepTitle}>
                          <span className={styles.titleDesktop}>{step.title}</span>
                          <span className={styles.titleMobile}>{step.titleMobile || step.title}</span>
                        </h3>
                        <span className={styles.stepNumberPill}>{step.number}</span>
                      </div>
                      <p className={styles.stepDescription}>
                        <span className={styles.descDesktop}>{step.description}</span>
                        <span className={styles.descMobile}>{step.descMobile || step.description}</span>
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          PROJECT ESTIMATE MINI MODAL
          ======================================================== */}
      <AnimatePresence>
        {modalOpen && (
          <div className={styles.modalOverlay} onClick={() => setModalOpen(false)}>
            <motion.div
              className={styles.modalCard}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Close Button */}
              <button
                className={styles.modalCloseBtn}
                onClick={() => setModalOpen(false)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              {isSubmitted ? (
                /* Success Message State */
                <div className={styles.modalSuccessState}>
                  <div className={styles.successIconCircle}>
                    <CheckCircle2 size={36} color="#A66BFF" />
                  </div>
                  <h3 className={styles.successTitle}>Estimate Request Received</h3>
                  <p className={styles.successDesc}>
                    Thank you, {formData.name || 'there'}! We will review your project requirements and send a clear, itemised scope estimate to <strong>{formData.email}</strong> within 24 hours.
                  </p>
                </div>
              ) : (
                /* Interactive Mini Form */
                <form onSubmit={handleSubmitEstimate} className={styles.modalForm}>
                  <div className={styles.modalHeader}>
                    <div className={styles.modalScopeTag}>
                      <Sparkles size={13} />
                      <span>PROJECT ESTIMATE REQUEST</span>
                    </div>
                    <h3 className={styles.modalTitle}>Tell us about your project</h3>
                    <p className={styles.modalSubtitle}>
                      Receive a transparent, requirement-based breakdown with zero obligations.
                    </p>
                  </div>

                  <div className={styles.formFields}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Morgan"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={styles.formInput}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Business Email</label>
                      <input
                        type="email"
                        required
                        placeholder="alex@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={styles.formInput}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Project Type</label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className={styles.formSelect}
                      >
                        {PROJECT_TYPE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className={styles.selectOption}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Short Description</label>
                      <textarea
                        rows={3}
                        placeholder="What are your key goals, timelines, or specific requirements?"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className={styles.formTextarea}
                      />
                    </div>
                  </div>

                  <button type="submit" className={styles.modalSubmitBtn}>
                    <Send size={15} />
                    <span>Send Estimate Request</span>
                  </button>

                  <p className={styles.modalFootnote}>
                    <Clock size={12} /> Response within 24 hours • No hidden costs
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
