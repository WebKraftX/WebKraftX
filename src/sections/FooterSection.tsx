import React from 'react';
import {
  ArrowUp,
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Linkedin,
  Twitter,
  Instagram,
  Github,
} from 'lucide-react';
import { siteConfig } from '../data/config';
import { BrandLogo } from '../components/BrandLogo';
import styles from './FooterSection.module.css';

interface FooterSectionProps {
  onNavigate: (sectionId: string) => void;
  onNavigateRoute?: (route: string) => void;
  onScrollToTop: () => void;
}

export function FooterSection({ onNavigate, onNavigateRoute, onScrollToTop }: FooterSectionProps) {
  const handleServiceClick = (slug: string) => {
    if (onNavigateRoute) {
      onNavigateRoute(`/services/${slug}`);
    } else {
      onNavigate('services');
    }
  };

  const handleRouteClick = (route: string, fallbackSectionId: string) => {
    if (onNavigateRoute) {
      onNavigateRoute(route);
    } else {
      onNavigate(fallbackSectionId);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerInner}`}>
        {/* Main 4-Column Grid: Aligned to Same Top Line */}
        <div className={styles.columnsGrid}>
          {/* Column 1: Brand Info */}
          <div className={styles.colBrand}>
            <div
              className={styles.logoRow}
              onClick={() => onNavigate('hero')}
              title="WebKraftX"
            >
              <BrandLogo size="md" />
            </div>
            <p className={styles.brandDesc}>
              An independent digital team in Bengaluru engineering high-converting web applications, managing data-driven Meta &amp; Google ad campaigns, and producing scroll-stopping commercial video &amp; AI content.
            </p>
            <div className={styles.locationItem}>
              <MapPin size={15} className={styles.locationIcon} />
              <span>{siteConfig.contact.location}</span>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className={styles.colLinks}>
            <h4 className={styles.colHeader}>SERVICES</h4>
            <button className={styles.linkBtn} onClick={() => handleServiceClick('content-creation')}>
              Content Creation
            </button>
            <button className={styles.linkBtn} onClick={() => handleServiceClick('web-design')}>
              Website Design &amp; Development
            </button>
            <button className={styles.linkBtn} onClick={() => handleServiceClick('seo')}>
              SEO
            </button>
            <button className={styles.linkBtn} onClick={() => handleServiceClick('brand-marketing')}>
              Brand Marketing
            </button>
            <button className={styles.linkBtn} onClick={() => handleServiceClick('social-media')}>
              Social Media Handling
            </button>
            <button className={styles.linkBtn} onClick={() => handleServiceClick('paid-ads')}>
              Paid Advertising
            </button>
            <button className={styles.linkBtn} onClick={() => handleServiceClick('mobile-app-dev')}>
              Mobile App Development
            </button>
          </div>

          {/* Column 3: Company & Navigation */}
          <div className={styles.colLinks}>
            <h4 className={styles.colHeader}>COMPANY</h4>
            <button className={styles.linkBtn} onClick={() => handleRouteClick('/services', 'services')}>
              All Services Overview
            </button>
            <button className={styles.linkBtn} onClick={() => onNavigate('about')}>
              About WebKraftX
            </button>
            <button className={styles.linkBtn} onClick={() => onNavigate('process')}>
              Execution Framework
            </button>
            <button className={styles.linkBtn} onClick={() => onNavigate('pricing')}>
              Pricing Approach
            </button>
            <button className={styles.linkBtn} onClick={() => handleRouteClick('/contact', 'contact')}>
              Contact Us
            </button>
          </div>

          {/* Column 4: Direct Contact & Inquiries */}
          <div className={styles.colLinks}>
            <h4 className={styles.colHeader}>CONNECT</h4>
            <div className={styles.contactList}>
              <a
                href="https://wa.me/917708136273"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactItemLink}
              >
                <div className={`${styles.contactIconChip} ${styles.whatsappChip}`}>
                  <MessageCircle size={15} />
                </div>
                <span>WhatsApp: +91 7708136273</span>
              </a>

              <a href="mailto:contact.webkraftx@gmail.com" className={styles.contactItemLink}>
                <div className={`${styles.contactIconChip} ${styles.emailChip}`}>
                  <Mail size={15} />
                </div>
                <span>contact.webkraftx@gmail.com</span>
              </a>

              <a href="tel:+917708136273" className={styles.contactItemLink}>
                <div className={`${styles.contactIconChip} ${styles.phoneChip}`}>
                  <Phone size={15} />
                </div>
                <span>+91 7708136273</span>
              </a>
            </div>

            <div className={styles.responseNotice}>
              <p>We review all direct inquiries personally and respond within 24 hours on business days.</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright (Left), Back to Top (Far Right) */}
        <div className={styles.bottomBar}>
          <div className={styles.copyText}>
            © {new Date().getFullYear()} WebKraftX. All rights reserved.
          </div>

          <div className={styles.bottomActions}>
            <button className={styles.backToTopBtn} onClick={onScrollToTop} title="Back to top">
              <span>Back to top</span>
              <ArrowUp size={15} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
