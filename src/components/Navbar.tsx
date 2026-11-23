import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ArrowUpRight,
  ChevronDown,
  Layout,
  ShoppingBag,
  TrendingUp,
  Search,
  Target,
  Share2,
  Video,
  Sparkles,
  Palette,
  ArrowRight,
  Phone,
  ArrowLeft,
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { LogoRocketLaunch } from './LogoRocketLaunch';
import { DIVISIONS_LIST, SERVICES_MAP } from '../data/servicesData';
import styles from './Navbar.module.css';

interface NavbarProps {
  currentRoute?: string;
  onOpenProposal: () => void;
  onNavigate: (sectionId: string) => void;
  onNavigateRoute?: (route: string) => void;
  onSelectService?: (serviceName: string) => void;
}

function renderDropdownIcon(name: string, size = 16) {
  switch (name) {
    case 'Layout': return <Layout size={size} />;
    case 'ShoppingBag': return <ShoppingBag size={size} />;
    case 'TrendingUp': return <TrendingUp size={size} />;
    case 'Search': return <Search size={size} />;
    case 'Target': return <Target size={size} />;
    case 'Share2': return <Share2 size={size} />;
    case 'Video': return <Video size={size} />;
    case 'Sparkles': return <Sparkles size={size} />;
    case 'Palette': return <Palette size={size} />;
    default: return <Sparkles size={size} />;
  }
}

export function Navbar({
  currentRoute = '/',
  onOpenProposal,
  onNavigate,
  onNavigateRoute,
  onSelectService,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesAccordionOpen, setMobileServicesAccordionOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isLightMode = currentRoute === '/contact';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLinkClick = (target: string) => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);

    if (target === 'contact') {
      if (onNavigateRoute) {
        onNavigateRoute('/contact');
      } else {
        onNavigate('contact');
      }
      return;
    }

    if (target === 'hero' || target === 'home') {
      onNavigate('hero');
      return;
    }

    onNavigate(target);
  };

  const handleServiceClick = (serviceId: string) => {
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
    if (onNavigateRoute) {
      onNavigateRoute(`/services/${serviceId}`);
    }
  };

  return (
    <>
      <header
        className={`${styles.header} ${
          isScrolled
            ? isLightMode
              ? styles.headerScrolledLight
              : styles.headerScrolled
            : styles.headerTransparent
        }`}
      >
        {/* Full-Viewport Supersonic Rocket Flight (Runs once on load for 10s) */}
        <LogoRocketLaunch />

        <div className={`container ${styles.navInner}`}>
          {/* Logo with optional Mobile Back Button on non-home pages */}
          <div className={styles.navLeftGroup}>
            {currentRoute !== '/' && (
              <button
                type="button"
                className={`${styles.mobileBackBtn} ${
                  isLightMode ? styles.mobileBackBtnLight : ''
                }`}
                onClick={() => handleLinkClick('hero')}
                aria-label="Back to Home"
                title="Back to Home"
              >
                <ArrowLeft size={18} />
              </button>
            )}

            <div
              className={styles.logoGroup}
              onClick={() => {
                handleLinkClick('hero');
                window.dispatchEvent(new CustomEvent('launch-rocket'));
              }}
              title="WebKraftX — Click to Launch"
            >
              <BrandLogo size="navbar" isLightMode={isLightMode} />
            </div>
          </div>

          {/* Desktop Nav Links: 1st Home, then About, Services, Process, Contact */}
          <nav className={styles.desktopNav}>
            {/* 1. Home Link */}
            <button
              className={`${styles.navLink} ${isLightMode ? styles.navLinkLight : ''}`}
              onClick={() => handleLinkClick('hero')}
            >
              Home
            </button>

            {/* 2. About Link */}
            <button
              className={`${styles.navLink} ${isLightMode ? styles.navLinkLight : ''}`}
              onClick={() => handleLinkClick('about')}
            >
              About
            </button>

            {/* 3. Services Dropdown */}
            <div
              className={styles.dropdownWrapper}
              ref={dropdownRef}
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                className={`${styles.navLink} ${styles.servicesTrigger} ${
                  isLightMode ? styles.navLinkLight : ''
                }`}
                onClick={() => handleLinkClick('services')}
              >
                <span>Services</span>
                <ChevronDown
                  size={14}
                  className={`${styles.chevronIcon} ${
                    isLightMode ? styles.chevronLight : ''
                  } ${servicesDropdownOpen ? styles.chevronRotated : ''}`}
                />
              </button>

              <AnimatePresence>
                {servicesDropdownOpen && (
                  <motion.div
                    className={styles.dropdownMenu}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* 3-Division Grid */}
                    <div className={styles.dropdownDivisionsGrid}>
                      {DIVISIONS_LIST.map((division) => (
                        <div key={division.id} className={styles.dropdownCol}>
                          <div className={styles.dropdownColHeader}>
                            <span className={styles.dropdownColNum}>{division.number}</span>
                            <span className={styles.dropdownColTitle}>{division.title}</span>
                          </div>

                          <div className={styles.dropdownServicesList}>
                            {division.serviceIds.map((serviceId) => {
                              const service = SERVICES_MAP[serviceId];
                              if (!service) return null;
                              return (
                                <button
                                  key={service.id}
                                  className={styles.dropdownServiceItem}
                                  onClick={() => handleServiceClick(service.id)}
                                >
                                  <div className={styles.dropdownIconTile}>
                                    {renderDropdownIcon(service.iconName, 17)}
                                  </div>
                                  <div className={styles.dropdownTextGroup}>
                                    <span className={styles.dropdownServiceTitle}>
                                      {service.title}
                                    </span>
                                    <p className={styles.dropdownServiceDesc}>
                                      {service.oneLiner.length > 55
                                        ? `${service.oneLiner.slice(0, 55)}...`
                                        : service.oneLiner}
                                    </p>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Utility Strip */}
                    <div className={styles.dropdownFooter}>
                      <button
                        className={styles.dropdownAllServicesBtn}
                        onClick={() => handleLinkClick('services')}
                      >
                        <span>View All 9 Services Overview</span>
                        <ArrowRight size={14} />
                      </button>

                      <button
                        className={styles.dropdownFreeCallBtn}
                        onClick={() => {
                          setServicesDropdownOpen(false);
                          onOpenProposal();
                        }}
                      >
                        <span>Not sure what you need? Book a Free Call →</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 4. Process Link */}
            <button
              className={`${styles.navLink} ${isLightMode ? styles.navLinkLight : ''}`}
              onClick={() => handleLinkClick('process')}
            >
              Process
            </button>
          </nav>

          {/* Right CTA Button, Mobile Phone & Hamburger */}
          <div className={styles.actions}>
            <a
              href="tel:+917708136273"
              className={`${styles.headerPhoneLink} ${isLightMode ? styles.headerPhoneLinkLight : ''}`}
              title="Call WebKraftX: +91 77081 36273"
            >
              <span className={styles.phoneIconWrapper}>
                <Phone size={14} />
              </span>
              <span className={styles.phoneNumberText}>+91 77081 36273</span>
            </a>

            <motion.button
              className={styles.proposalPurpleBtn}
              onClick={() => {
                if (onNavigateRoute) {
                  onNavigateRoute('/contact');
                } else {
                  onOpenProposal();
                }
              }}
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              <span>Let's Build Together</span>
              <ArrowUpRight size={16} />
            </motion.button>

            <button
              className={`${styles.hamburgerBtn} ${isLightMode ? styles.hamburgerBtnLight : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Slide-Down Mobile Accordion Menu & Tap-Outside Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Semi-transparent Backdrop for Tap-Outside to Close */}
            <motion.div
              className={styles.mobileBackdrop}
              onClick={() => setMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              aria-label="Close menu"
            />

            <motion.div
              className={styles.mobileMenu}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
            >
            <div className={styles.mobileLinksList}>
              {/* 1. Home Link First */}
              <button className={styles.mobileNavLink} onClick={() => handleLinkClick('hero')}>
                Home
              </button>

              {/* 2. About Link */}
              <button className={styles.mobileNavLink} onClick={() => handleLinkClick('about')}>
                About
              </button>

              {/* 3. Services Accordion in Mobile */}
              <div>
                <button
                  className={`${styles.mobileNavLink} ${
                    currentRoute.startsWith('/services') ? styles.mobileNavLinkActive : ''
                  }`}
                  onClick={() => setMobileServicesAccordionOpen(!mobileServicesAccordionOpen)}
                >
                  <span>Services</span>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: mobileServicesAccordionOpen ? 'rotate(180deg)' : 'none',
                      transition: 'transform 0.2s',
                    }}
                  />
                </button>

                {mobileServicesAccordionOpen && (
                  <div className={styles.mobileServicesAccordion}>
                    <button
                      className={styles.mobileServiceItem}
                      style={{ fontWeight: 700, color: '#C7A7FF' }}
                      onClick={() => handleLinkClick('services')}
                    >
                      <span>→ All Services Overview</span>
                    </button>

                    {DIVISIONS_LIST.map((div) => (
                      <div key={div.id} className={styles.mobileDivisionBlock}>
                        <span className={styles.mobileDivisionTitle}>{div.title}</span>
                        {div.serviceIds.map((sId) => {
                          const s = SERVICES_MAP[sId];
                          if (!s) return null;
                          return (
                            <button
                              key={s.id}
                              className={styles.mobileServiceItem}
                              onClick={() => handleServiceClick(s.id)}
                            >
                              {renderDropdownIcon(s.iconName, 15)}
                              <span>{s.title}</span>
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 4. Process Link */}
              <button className={styles.mobileNavLink} onClick={() => handleLinkClick('process')}>
                Process
              </button>

              {/* Mobile Phone Tap-to-Call Row */}
              <a
                href="tel:+917708136273"
                className={styles.mobilePhoneRow}
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className={styles.mobilePhoneIcon}>
                  <Phone size={14} />
                </div>
                <div className={styles.mobilePhoneText}>
                  <span className={styles.mobilePhoneLabel}>CALL US DIRECTLY</span>
                  <span className={styles.mobilePhoneValue}>+91 77081 36273</span>
                </div>
              </a>

              <div className={styles.mobileCtaWrapper}>
                <button
                  type="button"
                  className={styles.mobileMenuCtaBtn}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onNavigateRoute) {
                      onNavigateRoute('/contact');
                    } else {
                      onOpenProposal();
                    }
                  }}
                >
                  <span>Let&apos;s Build Together</span>
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
