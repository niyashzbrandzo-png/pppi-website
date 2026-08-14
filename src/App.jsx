import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
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
import { MembershipModal, EventModal, DonationModal, LightboxModal } from './components/Modals';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [membershipModalPlan, setMembershipModalPlan] = useState(null);
  const [eventModalData, setEventModalData] = useState(null);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [lightboxItem, setLightboxItem] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [showBackToTop, setShowBackToTop] = useState(false);

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
            setActivePage={setActivePage}
            addToast={addToast}
          />
        );
      case 'about':
        return <AboutPage setActivePage={setActivePage} />;
      case 'founder':
        return <FounderPage setActivePage={setActivePage} />;
      case 'leadership':
        return <LeadershipPage setActivePage={setActivePage} />;
      case 'manifesto':
        return <ManifestoPage setActivePage={setActivePage} />;
      case 'membership':
        return <MembershipPage openMembershipModal={(plan) => setMembershipModalPlan(plan)} />;
      case 'events':
        return <EventsPage openEventModal={(evt) => setEventModalData(evt)} />;
      case 'news':
        return <NewsPage setActivePage={setActivePage} />;
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
        return <NotFoundPage setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="app-container">
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        openMembershipModal={(plan) => setMembershipModalPlan(plan)}
        openDonationModal={() => setShowDonationModal(true)}
      />

      {renderCurrentPage()}

      <Footer
        setActivePage={setActivePage}
        openDonationModal={() => setShowDonationModal(true)}
      />

      {/* Floating Action Buttons */}
      <div className="floating-actions">
        <button
          className="fab-btn"
          style={{ background: 'var(--saffron-gradient)' }}
          onClick={() => setShowDonationModal(true)}
          title="Donate to PPPI Public Fund"
        >
          <i className="fa-solid fa-heart"></i>
        </button>

        {showBackToTop && (
          <button
            className="fab-btn"
            onClick={scrollToTop}
            title="Back to Top"
          >
            <i className="fa-solid fa-arrow-up"></i>
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
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast">
            <i className={`fa-solid ${toast.type === 'success' ? 'fa-circle-check green-text' : toast.type === 'warning' ? 'fa-triangle-exclamation saffron-text' : 'fa-circle-info'}`}></i>
            <span>{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
