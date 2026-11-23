import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  CheckCircle2,
  MessageCircle,
  Layout,
  Code,
  FileText,
  Zap,
  Search,
  ShieldCheck,
  Layers,
  CreditCard,
  Smartphone,
  Bell,
  RotateCcw,
  BarChart2,
  FileSearch,
  Eye,
  Edit3,
  CheckCircle,
  GitBranch,
  TrendingUp,
  Cpu,
  Crosshair,
  MapPin,
  Compass,
  Activity,
  Sliders,
  Sparkles,
  Database,
  PieChart,
  Calendar,
  Image,
  Edit2,
  MessageSquare,
  Clock,
  BarChart,
  Camera,
  Film,
  Volume2,
  HardDrive,
  Mic,
  UserCheck,
  FastForward,
  Shield,
  Feather,
  Type,
  Grid,
  BookOpen,
  ShoppingBag,
  Palette,
  Target,
  Share2,
  Video,
} from 'lucide-react';
import { ServiceData, SERVICES_MAP } from '../data/servicesData';
import styles from './ServiceDetailPage.module.css';

interface ServiceDetailPageProps {
  service: ServiceData;
  onNavigateHome: () => void;
  onNavigateServices: () => void;
  onNavigateRoute: (route: string) => void;
  onOpenProposal: (serviceName?: string) => void;
}

// Dynamic Lucide icon lookup helper
function renderServiceIcon(name: string, size = 20) {
  switch (name) {
    case 'Layout': return <Layout size={size} />;
    case 'Code': return <Code size={size} />;
    case 'FileText': return <FileText size={size} />;
    case 'Zap': return <Zap size={size} />;
    case 'Search': return <Search size={size} />;
    case 'ShieldCheck': return <ShieldCheck size={size} />;
    case 'Layers': return <Layers size={size} />;
    case 'CreditCard': return <CreditCard size={size} />;
    case 'Smartphone': return <Smartphone size={size} />;
    case 'Bell': return <Bell size={size} />;
    case 'RotateCcw': return <RotateCcw size={size} />;
    case 'BarChart2': return <BarChart2 size={size} />;
    case 'FileSearch': return <FileSearch size={size} />;
    case 'Eye': return <Eye size={size} />;
    case 'Edit3': return <Edit3 size={size} />;
    case 'CheckCircle': return <CheckCircle size={size} />;
    case 'GitBranch': return <GitBranch size={size} />;
    case 'TrendingUp': return <TrendingUp size={size} />;
    case 'Cpu': return <Cpu size={size} />;
    case 'Crosshair': return <Crosshair size={size} />;
    case 'MapPin': return <MapPin size={size} />;
    case 'Compass': return <Compass size={size} />;
    case 'Activity': return <Activity size={size} />;
    case 'Sliders': return <Sliders size={size} />;
    case 'Sparkles': return <Sparkles size={size} />;
    case 'Database': return <Database size={size} />;
    case 'PieChart': return <PieChart size={size} />;
    case 'Calendar': return <Calendar size={size} />;
    case 'Image': return <Image size={size} />;
    case 'Edit2': return <Edit2 size={size} />;
    case 'MessageSquare': return <MessageSquare size={size} />;
    case 'Clock': return <Clock size={size} />;
    case 'BarChart': return <BarChart size={size} />;
    case 'Camera': return <Camera size={size} />;
    case 'Film': return <Film size={size} />;
    case 'Volume2': return <Volume2 size={size} />;
    case 'HardDrive': return <HardDrive size={size} />;
    case 'Mic': return <Mic size={size} />;
    case 'UserCheck': return <UserCheck size={size} />;
    case 'FastForward': return <FastForward size={size} />;
    case 'Shield': return <Shield size={size} />;
    case 'Feather': return <Feather size={size} />;
    case 'Type': return <Type size={size} />;
    case 'Grid': return <Grid size={size} />;
    case 'BookOpen': return <BookOpen size={size} />;
    case 'ShoppingBag': return <ShoppingBag size={size} />;
    case 'Palette': return <Palette size={size} />;
    case 'Target': return <Target size={size} />;
    case 'Share2': return <Share2 size={size} />;
    case 'Video': return <Video size={size} />;
    default: return <Sparkles size={size} />;
  }
}

export function ServiceDetailPage({
  service,
  onNavigateHome,
  onNavigateServices,
  onNavigateRoute,
  onOpenProposal,
}: ServiceDetailPageProps) {
  const shouldReduceMotion = useReducedMotion();

  // Scroll to top when service changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [service.id]);

  const words = service.title.split(' ');
  const whatsappUrl = `https://wa.me/917708136273?text=${encodeURIComponent(
    `Hi WebKraftX, I would like to discuss ${service.title} for my business.`
  )}`;

  return (
    <motion.div
      className={styles.pageRoot}
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Ambient background glows */}
      <div className={styles.ambientRadialGlow} aria-hidden="true" />
      <div className={styles.ambientMidGlow} aria-hidden="true" />

      <div className={styles.container}>
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
            1. HERO SECTION
            ======================================================== */}
        <section className={styles.heroSection}>
          {/* Breadcrumb Navigation */}
          <nav className={styles.breadcrumbNav} aria-label="Breadcrumb">
            <button className={styles.breadcrumbLink} onClick={onNavigateHome}>
              Home
            </button>
            <ChevronRight size={14} className={styles.breadcrumbSep} />
            <button className={styles.breadcrumbLink} onClick={onNavigateServices}>
              Services
            </button>
            <ChevronRight size={14} className={styles.breadcrumbSep} />
            <span className={styles.breadcrumbCurrent}>{service.shortTitle}</span>
          </nav>

          {/* Division Pill */}
          <div className={styles.heroDivisionPill}>
            <span className={styles.divisionDot} />
            <span>
              Division {service.divisionNumber} · {service.divisionTitle}
            </span>
          </div>

          {/* Headline with word-by-word blur-to-sharp & shimmer accent */}
          <h1 className={styles.heroHeading}>
            {words.map((word, idx) => {
              const isAccent = word.toLowerCase().includes(service.accentWord.toLowerCase()) || idx === words.length - 1;
              return (
                <span key={word + idx} className={styles.wordMask}>
                  <motion.span
                    className={`${styles.wordInner} ${isAccent ? styles.shimmerWord : ''}`}
                    initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{
                      duration: 0.6,
                      delay: 0.08 + idx * 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {word}&nbsp;
                  </motion.span>
                </span>
              );
            })}
          </h1>

          {/* Positioning Lead */}
          <motion.p
            className={styles.heroLead}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {service.oneLiner}
          </motion.p>

          <motion.p
            className={styles.heroDeepDescription}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {service.heroDescription}
          </motion.p>

          {/* Hero CTAs */}
          <motion.div
            className={styles.heroActionsRow}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              className={styles.primaryCtaBtn}
              onClick={() => onOpenProposal(service.title)}
            >
              <span>Discuss this service</span>
              <ArrowRight size={17} className={styles.ctaArrow} />
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.secondaryWhatsappBtn}
            >
              <MessageCircle size={18} />
              <span>Chat on WhatsApp</span>
              <ArrowUpRight size={14} />
            </a>
          </motion.div>
        </section>

        {/* ========================================================
            2. OUTCOME STRIP
            ======================================================== */}
        <section className={styles.outcomeStripSection}>
          <motion.div
            className={styles.outcomeStripCard}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className={styles.outcomeGrid}>
              {service.outcomes.map((out) => (
                <div key={out.label} className={styles.outcomeItem}>
                  <div className={styles.outcomeMetric}>{out.metric}</div>
                  <div className={styles.outcomeLabel}>{out.label}</div>
                  <p className={styles.outcomeDesc}>{out.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ========================================================
            3. WHAT'S INCLUDED (4–6 CONCRETE DELIVERABLES)
            ======================================================== */}
        <section className={styles.deliverablesSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>SCOPE &amp; DELIVERABLES</span>
            <h2 className={styles.sectionHeading}>What&apos;s included in this service.</h2>
            <p className={styles.sectionSubline}>
              Concrete, production-grade deliverables engineered to eliminate ambiguity and deliver verified results.
            </p>
          </div>

          <div className={styles.deliverablesGrid}>
            {service.whatsIncluded.map((item, idx) => (
              <motion.div
                key={item.title}
                className={styles.deliverableCard}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className={styles.deliverableIconTile}>
                  {renderServiceIcon(item.iconName, 22)}
                </div>
                <h3 className={styles.deliverableTitle}>{item.title}</h3>
                <p className={styles.deliverableDesc}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ========================================================
            4. HOW WE EXECUTE (3–4 CONNECTED STEPS)
            ======================================================== */}
        <section className={styles.executionSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>EXECUTION CADENCE</span>
            <h2 className={styles.sectionHeading}>How we deliver this service.</h2>
            <p className={styles.sectionSubline}>
              A disciplined sprint cadence aligned with our transparent 4-step framework. No guesswork.
            </p>
          </div>

          <div className={styles.executionStepsGrid}>
            {service.howWeExecute.map((step, idx) => (
              <motion.div
                key={step.step}
                className={styles.stepCard}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className={styles.stepHeaderRow}>
                  <span className={styles.stepNumber}>{step.step}</span>
                  <span className={styles.stepPhaseBadge}>{step.phase}</span>
                </div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ========================================================
            5. WHO IT'S FOR (2–3 SCENARIOS)
            ======================================================== */}
        <section className={styles.whoSection}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>IDEAL FIT</span>
            <h2 className={styles.sectionHeading}>Is this the right service for you?</h2>
            <p className={styles.sectionSubline}>
              We do our best work when partnered with businesses facing one of these key moments:
            </p>
          </div>

          <div className={styles.whoScenariosList}>
            {service.whoItsFor.map((scenario, idx) => (
              <motion.div
                key={idx}
                className={styles.scenarioCard}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className={styles.scenarioCheckIcon}>
                  <CheckCircle2 size={18} />
                </div>
                <p className={styles.scenarioText}>{scenario}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ========================================================
            6. RELATED SERVICES
            ======================================================== */}
        {service.relatedServiceIds && service.relatedServiceIds.length > 0 && (
          <section className={styles.relatedSection}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionLabel}>CROSS-DISCIPLINE SYNERGY</span>
              <h2 className={styles.sectionHeading}>Related services that work well together.</h2>
              <p className={styles.sectionSubline}>
                Many clients pair this service with complementary growth and content capabilities.
              </p>
            </div>

            <div className={styles.relatedGrid}>
              {service.relatedServiceIds.map((relId) => {
                const relService = SERVICES_MAP[relId];
                if (!relService) return null;
                return (
                  <div
                    key={relId}
                    className={styles.relatedCard}
                    onClick={() => onNavigateRoute(`/services/${relId}`)}
                  >
                    <div>
                      <div className={styles.relatedCardTop}>
                        <div className={styles.relatedIconTile}>
                          {renderServiceIcon(relService.iconName, 18)}
                        </div>
                        <ArrowRight size={17} className={styles.relatedArrow} />
                      </div>
                      <h3 className={styles.relatedTitle}>{relService.title}</h3>
                    </div>
                    <p className={styles.relatedDesc}>{relService.oneLiner}</p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ========================================================
            7. FINAL CTA BLOCK
            ======================================================== */}
        <section className={styles.ctaSectionWrapper}>
          <div className={styles.serviceCtaCard}>
            <div className={styles.ctaCardGlow} aria-hidden="true" />
            <div className={styles.ctaCardContent}>
              <span className={styles.ctaCardLabel}>LET&apos;S TALK SCOPE</span>
              <h2 className={styles.ctaCardHeading}>
                Ready to move forward with {service.shortTitle}?
              </h2>
              <p className={styles.ctaCardDesc}>
                Book a 30-minute discovery session with our team. We review your current assets, define scope milestones, and provide a transparent project quotation.
              </p>
              <div className={styles.ctaCardButtons}>
                <button
                  className={styles.primaryCtaBtn}
                  onClick={() => onOpenProposal(service.title)}
                >
                  <span>Request a Project Proposal</span>
                  <ArrowRight size={17} className={styles.ctaArrow} />
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.secondaryWhatsappBtn}
                >
                  <MessageCircle size={18} />
                  <span>Quick WhatsApp Query</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
