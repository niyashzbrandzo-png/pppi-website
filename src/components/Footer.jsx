import React from 'react';

export default function Footer({ setActivePage, openDonationModal }) {
  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div>
            <div className="brand-logo" style={{ marginBottom: '1.25rem' }}>
              <div className="brand-emblem">
                <i className="fa-solid fa-flag"></i>
              </div>
              <div className="brand-text-wrap">
                <span className="brand-title" style={{ color: '#FFFFFF' }}>PPPI CONNECT</span>
                <span className="brand-subtitle" style={{ color: '#FF9933' }}>PASHA PEOPLE PARTY OF INDIA</span>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              Connecting citizens, grassroots leaders, and district coordinators through transparent digital governance, youth empowerment, and open participation.
            </p>
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm" style={{ borderRadius: '50%', width: '38px', height: '38px', padding: 0 }}>
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm" style={{ borderRadius: '50%', width: '38px', height: '38px', padding: 0 }}>
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm" style={{ borderRadius: '50%', width: '38px', height: '38px', padding: 0 }}>
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm" style={{ borderRadius: '50%', width: '38px', height: '38px', padding: 0 }}>
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm" style={{ borderRadius: '50%', width: '38px', height: '38px', padding: 0 }}>
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-title">Quick Links</h4>
            <div className="footer-links">
              <a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }} className="footer-link">About PPPI</a>
              <a href="#founder" onClick={(e) => { e.preventDefault(); handleNavClick('founder'); }} className="footer-link">Founder's Vision</a>
              <a href="#leadership" onClick={(e) => { e.preventDefault(); handleNavClick('leadership'); }} className="footer-link">Leadership Directory</a>
              <a href="#manifesto" onClick={(e) => { e.preventDefault(); handleNavClick('manifesto'); }} className="footer-link">Party Manifesto</a>
              <a href="#membership" onClick={(e) => { e.preventDefault(); handleNavClick('membership'); }} className="footer-link">Membership Plans</a>
              <a href="#app" onClick={(e) => { e.preventDefault(); handleNavClick('app'); }} className="footer-link">Mobile Application</a>
            </div>
          </div>

          {/* Resources & Support */}
          <div>
            <h4 className="footer-title">Resources & Support</h4>
            <div className="footer-links">
              <a href="#events" onClick={(e) => { e.preventDefault(); handleNavClick('events'); }} className="footer-link">Rallies & Events</a>
              <a href="#news" onClick={(e) => { e.preventDefault(); handleNavClick('news'); }} className="footer-link">Press & Media</a>
              <a href="#gallery" onClick={(e) => { e.preventDefault(); handleNavClick('gallery'); }} className="footer-link">Photo Gallery</a>
              <a href="#faq" onClick={(e) => { e.preventDefault(); handleNavClick('faq'); }} className="footer-link">Frequently Asked Questions</a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }} className="footer-link">Central Secretariat Contact</a>
              <button onClick={openDonationModal} className="footer-link" style={{ background: 'none', border: 'none', textAlign: 'left', cursor: 'pointer', padding: 0, font: 'inherit' }}>Online Donation Fund</button>
            </div>
          </div>

          {/* Legal & Policies */}
          <div>
            <h4 className="footer-title">Policies & Legal</h4>
            <div className="footer-links">
              <a href="#privacy" onClick={(e) => { e.preventDefault(); handleNavClick('privacy'); }} className="footer-link">Privacy Policy</a>
              <a href="#terms" onClick={(e) => { e.preventDefault(); handleNavClick('terms'); }} className="footer-link">Terms & Conditions</a>
              <a href="#refund" onClick={(e) => { e.preventDefault(); handleNavClick('refund'); }} className="footer-link">Refund & Cancellation Policy</a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }} className="footer-link">Volunteer Registration</a>
              <div style={{ marginTop: '1rem' }}>
                <span style={{ fontSize: '0.8rem', display: 'block', color: '#64748B', marginBottom: '0.5rem' }}>Helpline Toll-Free</span>
                <span style={{ fontSize: '1.1rem', fontWeight: '700', color: '#FF9933' }}>1800-572-7774</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} Pasha People Party of India (PPPI CONNECT). All Rights Reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>ECI Registration Pending / Recognized Organization</span>
            <span>Secured via SSL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
