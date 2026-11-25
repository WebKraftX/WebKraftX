import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { ProposalModal } from './components/ProposalModal';
import { VideoModal } from './components/VideoModal';
import { CaseStudyModal } from './components/CaseStudyModal';
import { HeroSection } from './sections/HeroSection';
import { AboutSection } from './sections/AboutSection';
import { ProcessSection } from './sections/ProcessSection';
import { PricingApproachSection } from './sections/PricingApproachSection';
import { CtaSection } from './sections/CtaSection';
import { FooterSection } from './sections/FooterSection';
import { ServicesSection } from './sections/ServicesSection';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ContactPage } from './pages/ContactPage';
import { CaseStudy } from './data/config';
import { SERVICES_MAP } from './data/servicesData';
import './styles/theme.css';

// Normalize pathname to support direct URLs, SPA routing, and hash fallbacks
function getCleanPath(): string {
  if (typeof window === 'undefined') return '/';
  let path = window.location.pathname.replace(/\/+$/, '') || '/';
  if (path === '/' && window.location.hash) {
    const hashRoute = window.location.hash.replace(/^#\/?/, '');
    if (hashRoute) {
      path = '/' + hashRoute;
    }
  }
  return path;
}

export default function App() {
  const [proposalModalOpen, setProposalModalOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<string | undefined>();
  const [activeCaseStudy, setActiveCaseStudy] = useState<CaseStudy | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoModalProjectId, setVideoModalProjectId] = useState<string>('begums-kitchen');

  // Client-side routing between Home ('/'), Services landing ('/services'), 9 Service pages ('/services/:id'), and Contact ('/contact')
  const [currentRoute, setCurrentRoute] = useState<string>(getCleanPath);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(getCleanPath());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (route: string) => {
    if (route !== currentRoute) {
      window.history.pushState({}, '', route);
      setCurrentRoute(route);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'contact') {
      navigateTo('/contact');
      return;
    }

    const scrollToTarget = () => {
      if (sectionId === 'hero' || sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const el = document.getElementById(sectionId);
      if (el) {
        const navbarHeight = 84; // header offset so section title isn't hidden under navbar
        const y = el.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      }
    };

    if (currentRoute !== '/') {
      // If we are on /services or /contact or /services/:slug, redirect to home page first, then scroll
      window.history.pushState({}, '', '/');
      setCurrentRoute('/');
      setTimeout(scrollToTarget, 100);
      return;
    }

    scrollToTarget();
  };

  const handleSelectService = (serviceId: string) => {
    navigateTo(`/services/${serviceId}`);
  };

  const handleCaseStudyInquire = (clientName: string) => {
    setActiveCaseStudy(null);
    setVideoModalOpen(false);
    setSelectedServiceForModal(`Client Project: ${clientName}`);
    setProposalModalOpen(true);
  };

  const handleOpenVideoWalkthrough = (projectId: string = 'begums-kitchen') => {
    setVideoModalProjectId(projectId);
    setVideoModalOpen(true);
  };

  // Check if currentRoute points to an individual service detail page
  let matchedService = null;
  if (currentRoute.startsWith('/services/')) {
    let slug = currentRoute.replace('/services/', '').replace(/\/+$/, '').toLowerCase();
    // Support common alias mapping
    if (slug === 'web-design-dev') slug = 'web-design';
    if (slug === 'ecommerce-storefronts') slug = 'ecommerce';
    if (SERVICES_MAP[slug]) {
      matchedService = SERVICES_MAP[slug];
    }
  }

  return (
    <div className="app-root">
      {/* 1. Navbar with clean 3-division spacious dropdown */}
      <Navbar
        currentRoute={currentRoute}
        onOpenProposal={() => navigateTo('/contact')}
        onNavigate={handleNavigate}
        onNavigateRoute={navigateTo}
        onSelectService={(serviceName) => {
          setSelectedServiceForModal(serviceName);
          setProposalModalOpen(true);
        }}
      />

      {/* Main Page Flow: Conditional on Route */}
      <main>
        {currentRoute === '/contact' ? (
          /* DEDICATED CONTACT PAGE (Light Theme: Lavender #EDE5F7) */
          <ContactPage onNavigateHome={() => navigateTo('/')} />
        ) : matchedService ? (
          /* INDIVIDUAL SERVICE DETAIL PAGE (1 template, 9 real URLs, Dark Theme) */
          <ServiceDetailPage
            service={matchedService}
            onNavigateHome={() => navigateTo('/')}
            onNavigateServices={() => navigateTo('/services')}
            onNavigateRoute={navigateTo}
            onOpenProposal={() => navigateTo('/contact')}
          />
        ) : currentRoute === '/services' ? (
          /* DEDICATED SERVICES LANDING PAGE (Light Theme: Warm Cream #FAF6EF) */
          <ServicesPage
            onNavigateHome={() => navigateTo('/')}
            onNavigateRoute={navigateTo}
            onRequestQuote={() => navigateTo('/contact')}
          />
        ) : (
          /* HOME PAGE FLOW (Dark Theme) */
          <>
            {/* 2. Hero Section: Asymmetric 55/45 with 3D Gift Box Opening */}
            <HeroSection
              onOpenProposal={() => navigateTo('/contact')}
              onExploreWork={() => handleNavigate('services')}
              onNavigateRoute={navigateTo}
              onOpenVideoWalkthrough={handleOpenVideoWalkthrough}
            />

            {/* 3. Redesigned Editorial About Us Section (Story, Beliefs, Human Connection, Founder Profile) */}
            <AboutSection
              onOpenProposal={() => navigateTo('/contact')}
            />

            {/* 4. Interactive Services Showcase ("What we do") */}
            <ServicesSection
              onSelectService={handleSelectService}
              onOpenProposal={() => navigateTo('/contact')}
            />

            {/* 5. Pricing Approach: "How we charge, not how much" (No price tags, transparent process) */}
            <PricingApproachSection
              onRequestEstimate={() => navigateTo('/contact')}
            />

            {/* 6. Execution Framework (4-Step Connected Timeline) */}
            <ProcessSection />

            {/* 7. Final CTA Block with WhatsApp Link */}
            <CtaSection
              onOpenProposal={() => navigateTo('/contact')}
              onNavigateRoute={navigateTo}
            />
          </>
        )}
      </main>

      {/* Footer Section */}
      <FooterSection
        onNavigate={handleNavigate}
        onNavigateRoute={navigateTo}
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />

      {/* Free Strategy Call & Proposal Modal */}
      <ProposalModal
        isOpen={proposalModalOpen}
        onClose={() => setProposalModalOpen(false)}
        preselectedService={selectedServiceForModal}
      />

      {/* Interactive Video Walkthrough Modal */}
      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        initialProjectId={videoModalProjectId}
        onInquireProject={handleCaseStudyInquire}
      />

      {/* Case Study Detail Modal */}
      <CaseStudyModal
        study={activeCaseStudy}
        onClose={() => setActiveCaseStudy(null)}
        onInquire={handleCaseStudyInquire}
      />
    </div>
  );
}
