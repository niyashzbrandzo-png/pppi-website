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
      <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          {/* Logo */}
          <div className="brand-logo" onClick={() => handleNavClick('home')} style={{ cursor: 'pointer' }}>
            <div className="brand-emblem">
              <i className="fa-solid fa-flag"></i>
            </div>
            <div className="brand-text-wrap">
              <span className="brand-title">PPPI CONNECT</span>
              <span className="brand-subtitle">PASHA PEOPLE PARTY OF INDIA</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="nav-menu">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link ${activePage === item.id ? 'active' : ''}`}
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
            <button className="btn btn-primary btn-sm" onClick={() => openMembershipModal('Free Member')}>
              <i className="fa-solid fa-user-plus"></i> Join Now
            </button>
            <button className="btn btn-saffron btn-sm" onClick={() => handleNavClick('app')}>
              <i className="fa-solid fa-mobile-screen-button"></i> Download App
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-toggle"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle navigation drawer"
          >
            <i className={`fa-solid ${isMobileOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${isMobileOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="mobile-nav-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(item.id);
            }}
          >
            {item.label}
          </a>
        ))}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
          <button className="btn btn-primary btn-block" onClick={() => { setIsMobileOpen(false); openMembershipModal('Free Member'); }}>
            <i className="fa-solid fa-user-plus"></i> Join Membership Now
          </button>
          <button className="btn btn-saffron btn-block" onClick={() => { setIsMobileOpen(false); handleNavClick('app'); }}>
            <i className="fa-solid fa-mobile-screen-button"></i> Download PPPI Mobile App
          </button>
        </div>
      </div>
    </>
  );
}
