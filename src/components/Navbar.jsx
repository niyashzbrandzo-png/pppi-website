import React, { useState, useEffect } from 'react';

export default function Navbar({ activePage, setActivePage, openMembershipModal, openDonationModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'founder', label: 'Founder' },
    { id: 'leadership', label: 'Leadership' },
    { id: 'manifesto', label: 'Manifesto' },
    { id: 'membership', label: 'Membership Plans' },
    { id: 'app', label: 'Mobile App' },
    { id: 'events', label: 'Events' },
    { id: 'news', label: 'News' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'faq', label: 'FAQs' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setIsMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className={`navbar ${isScrolled ? 'scrolled' : ''}`} role="banner">
        <div className="container nav-container">
          {/* Logo */}
          <a
            href="/"
            className="brand-logo"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            title="PPPI CONNECT - Pasha People Party of India"
            style={{ textDecoration: 'none' }}
          >
            <div className="brand-emblem" aria-hidden="true">
              <i className="fa-solid fa-flag"></i>
            </div>
            <div className="brand-text-wrap">
              <span className="brand-title">PPPI CONNECT</span>
              <span className="brand-subtitle">PASHA PEOPLE PARTY OF INDIA</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="nav-menu" aria-label="Main Navigation">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link ${activePage === item.id ? 'active' : ''}`}
                aria-current={activePage === item.id ? 'page' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="nav-actions">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => openMembershipModal('Free Member')}
              aria-label="Join PPPI Membership"
            >
              <i className="fa-solid fa-user-plus" aria-hidden="true"></i> Join Now
            </button>
            <button
              className="btn btn-saffron btn-sm"
              onClick={() => handleNavClick('app')}
              aria-label="Download PPPI Connect Mobile App"
            >
              <i className="fa-solid fa-mobile-screen-button" aria-hidden="true"></i> Download App
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-toggle"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label={isMobileOpen ? 'Close mobile menu' : 'Open mobile menu'}
            aria-expanded={isMobileOpen}
          >
            <i className={`fa-solid ${isMobileOpen ? 'fa-xmark' : 'fa-bars'}`} aria-hidden="true"></i>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <nav
        className={`mobile-drawer ${isMobileOpen ? 'open' : ''}`}
        aria-label="Mobile Navigation"
        aria-hidden={!isMobileOpen}
      >
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="mobile-nav-link"
            aria-current={activePage === item.id ? 'page' : undefined}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(item.id);
            }}
          >
            {item.label}
          </a>
        ))}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
          <button
            className="btn btn-primary btn-block"
            onClick={() => {
              setIsMobileOpen(false);
              openMembershipModal('Free Member');
            }}
          >
            <i className="fa-solid fa-user-plus" aria-hidden="true"></i> Join Membership Now
          </button>
          <button
            className="btn btn-saffron btn-block"
            onClick={() => {
              setIsMobileOpen(false);
              handleNavClick('app');
            }}
          >
            <i className="fa-solid fa-mobile-screen-button" aria-hidden="true"></i> Download PPPI Mobile App
          </button>
        </div>
      </nav>
    </>
  );
}
