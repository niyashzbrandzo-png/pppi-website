import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SEO from './components/SEO';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import FounderPage from './pages/FounderPage';
import LeadershipPage from './pages/LeadershipPage';
import ManifestoPage from './pages/ManifestoPage';
import MembershipPage from './pages/MembershipPage';
import EventsPage from './pages/EventsPage';
import NewsPage from './pages/NewsPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import { PrivacyPolicyPage, TermsPage, RefundPolicyPage } from './pages/PolicyPages';
import NotFoundPage from './pages/NotFoundPage';
import MaintenanceScreen from './components/MaintenanceScreen';
import { apiService } from './services/api';
import { MembershipModal, EventModal, DonationModal, LightboxModal } from './components/Modals';

const VALID_PAGES = [
  'home', 'about', 'founder', 'leadership', 'manifesto',
  'membership', 'app', 'events', 'news', 'gallery',
  'faq', 'contact', 'privacy', 'terms', 'refund'
];

function getInitialPage() {
  if (typeof window === 'undefined') return 'home';

  // Check URL path e.g. /manifesto
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '');
  if (path && VALID_PAGES.includes(path)) {
    return path;
  }

  // Check hash e.g. #manifesto
  const hash = window.location.hash.replace(/^#/, '');
  if (hash && VALID_PAGES.includes(hash)) {
    return hash;
  }

  // Check query param e.g. ?page=manifesto
  const params = new URLSearchParams(window.location.search);
  const queryPage = params.get('page');
  if (queryPage && VALID_PAGES.includes(queryPage)) {
    return queryPage;
  }

  return 'home';
}

export default function App() {
  const [activePage, setActivePage] = useState(getInitialPage);
  const [membershipModalPlan, setMembershipModalPlan] = useState(null);
  const [eventModalData, setEventModalData] = useState(null);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [lightboxItem, setLightboxItem] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Maintenance Mode Dynamic State
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [maintenanceData, setMaintenanceData] = useState(null);

  // Poll & sync maintenance status from backend
  useEffect(() => {
    let isMounted = true;

    const checkMaintenanceStatus = async () => {
      try {
        // Query param override for live testing: ?preview=maintenance or ?preview=live
        if (typeof window !== 'undefined') {
          const params = new URLSearchParams(window.location.search);
          if (params.get('preview') === 'maintenance') {
            if (isMounted) setIsMaintenanceMode(true);
            return;
          }
          if (params.get('preview') === 'live') {
            if (isMounted) setIsMaintenanceMode(false);
            return;
          }
        }

        const res = await apiService.fetchMaintenanceStatus();
        if (isMounted && res && res.data) {
          setIsMaintenanceMode(Boolean(res.data.maintenance_mode));
          setMaintenanceData(res.data);
        }
      } catch (err) {
        console.warn('Maintenance status check fallback:', err.message);
      }
    };

    checkMaintenanceStatus();
    const interval = setInterval(checkMaintenanceStatus, 15000); // Sync every 15s

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  // Sync route navigation with browser history
  const navigateToPage = useCallback((pageId, updateHistory = true) => {
    const targetPage = VALID_PAGES.includes(pageId) ? pageId : 'home';
    setActivePage(targetPage);

    if (updateHistory && typeof window !== 'undefined') {
      const url = targetPage === 'home' ? '/' : `#${targetPage}`;
      if (window.location.hash !== `#${targetPage}` && !(targetPage === 'home' && (!window.location.hash || window.location.hash === '#home'))) {
        window.history.pushState({ page: targetPage }, '', url);
      }
    }
  }, []);

  // Listen for browser Back / Forward buttons & Hash changes
  useEffect(() => {
    const handlePopState = () => {
      const currentPage = getInitialPage();
      setActivePage(currentPage);
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Scroll back-to-top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If Maintenance Mode is Active, render dedicated under-development screen
  if (isMaintenanceMode) {
    return (
      <div className="app-container">
        <SEO page="maintenance" />
        <MaintenanceScreen maintenanceData={maintenanceData} />
      </div>
    );
  }

  const renderCurrentPage = () => {
    switch (activePage) {
      case 'home':
      case 'app':
      case 'faq':
        return (
          <HomePage
            openMembershipModal={(plan) => setMembershipModalPlan(plan)}
            openEventModal={(evt) => setEventModalData(evt)}
            openLightbox={(item) => setLightboxItem(item)}
            setActivePage={navigateToPage}
            addToast={addToast}
          />
        );
      case 'about':
        return <AboutPage setActivePage={navigateToPage} />;
      case 'founder':
        return <FounderPage setActivePage={navigateToPage} />;
      case 'leadership':
        return <LeadershipPage setActivePage={navigateToPage} />;
      case 'manifesto':
        return <ManifestoPage setActivePage={navigateToPage} />;
      case 'membership':
        return <MembershipPage openMembershipModal={(plan) => setMembershipModalPlan(plan)} />;
      case 'events':
        return <EventsPage openEventModal={(evt) => setEventModalData(evt)} />;
      case 'news':
        return <NewsPage setActivePage={navigateToPage} />;
      case 'gallery':
        return <GalleryPage openLightbox={(item) => setLightboxItem(item)} />;
      case 'contact':
        return <ContactPage addToast={addToast} />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsPage />;
      case 'refund':
        return <RefundPolicyPage />;
      default:
        return <NotFoundPage setActivePage={navigateToPage} />;
    }
  };

  return (
    <div className="app-container">
      {/* Dynamic SEO Meta & Schema.org JSON-LD */}
      <SEO page={activePage} />

      {/* Accessible Skip Link for SEO & Screen Readers */}
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      {/* Header & Navigation */}
      <Navbar
        activePage={activePage}
        setActivePage={navigateToPage}
        openMembershipModal={(plan) => setMembershipModalPlan(plan)}
        openDonationModal={() => setShowDonationModal(true)}
      />

      {/* Main Content Landmark */}
      <div id="main-content" tabIndex="-1" style={{ outline: 'none' }}>
        {renderCurrentPage()}
      </div>

      {/* Footer */}
      <Footer
        setActivePage={navigateToPage}
        openDonationModal={() => setShowDonationModal(true)}
      />

      {/* Floating Action Buttons */}
      <div className="floating-actions">
        <button
          className="fab-btn"
          style={{ background: 'var(--saffron-gradient)' }}
          onClick={() => setShowDonationModal(true)}
          title="Donate to PPPI Public Fund"
          aria-label="Donate to PPPI Public Fund"
        >
          <i className="fa-solid fa-heart" aria-hidden="true"></i>
        </button>

        {showBackToTop && (
          <button
            className="fab-btn"
            onClick={scrollToTop}
            title="Back to Top"
            aria-label="Scroll Back to Top"
          >
            <i className="fa-solid fa-arrow-up" aria-hidden="true"></i>
          </button>
        )}
      </div>

      {/* Modals */}
      {membershipModalPlan && (
        <MembershipModal
          planName={membershipModalPlan}
          onClose={() => setMembershipModalPlan(null)}
          addToast={addToast}
        />
      )}

      {eventModalData && (
        <EventModal
          event={eventModalData}
          onClose={() => setEventModalData(null)}
          addToast={addToast}
        />
      )}

      {showDonationModal && (
        <DonationModal
          onClose={() => setShowDonationModal(false)}
          addToast={addToast}
        />
      )}

      {lightboxItem && (
        <LightboxModal
          item={lightboxItem}
          onClose={() => setLightboxItem(null)}
        />
      )}

      {/* Toast Notification Container */}
      <div className="toast-container" role="region" aria-live="polite" aria-label="Notifications">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast" role="alert">
            <i className={`fa-solid ${toast.type === 'success' ? 'fa-circle-check green-text' : toast.type === 'warning' ? 'fa-triangle-exclamation saffron-text' : 'fa-circle-info'}`} aria-hidden="true"></i>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
