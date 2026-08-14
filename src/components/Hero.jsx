import React from 'react';

export default function Hero({ openMembershipModal, setActivePage }) {
  return (
    <section className="hero-wrapper" id="home">
      {/* Royalty-free background rally overlay image */}
      <img
        src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1920&q=80"
        alt="PPPI Public Rally Crowd"
        className="hero-backdrop-image"
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="hero-grid">
          {/* Hero Left Content */}
          <div>
            <div className="section-badge">
              <i className="fa-solid fa-flag-checkered"></i>
              <span>DIGITAL POLITICAL MEMBERSHIP ECOSYSTEM</span>
            </div>

            <h1 className="hero-headline">
              Connecting People. <br />
              <span className="gradient-text">Empowering Democracy.</span>
            </h1>

            <p className="hero-subheading">
              PPPI Connect is a digital political membership platform designed to connect citizens, leaders, and communities through technology, transparency, and participation.
            </p>

            <div className="hero-actions">
              <button className="btn btn-primary btn-lg" onClick={() => openMembershipModal('Free Member')}>
                <i className="fa-solid fa-id-card"></i> Join Membership
              </button>
              <button className="btn btn-saffron btn-lg" onClick={() => { setActivePage('app'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <i className="fa-solid fa-mobile-screen"></i> Download Mobile App
              </button>
              <button className="btn btn-secondary btn-lg" onClick={() => { setActivePage('manifesto'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <i className="fa-solid fa-book-open"></i> Read Manifesto
              </button>
            </div>

            {/* Quick Trust Highlights */}
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                <i className="fa-solid fa-circle-check" style={{ color: 'var(--color-green)' }}></i> 100% KYC Verified
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                <i className="fa-solid fa-shield-halved" style={{ color: 'var(--color-royal-blue)' }}></i> AES-256 Encrypted
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                <i className="fa-solid fa-award" style={{ color: 'var(--color-saffron-dark)' }}></i> Open Fund Ledger
              </div>
            </div>
          </div>

          {/* Hero Right Banner Image */}
          <div className="hero-image-card">
            <img
              src="https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1000&q=80"
              alt="PPPI Leaders & Volunteers Convention"
            />
            <div className="hero-badge-overlay">
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--saffron-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', fontSize: '1.2rem', flexShrink: 0 }}>
                <i className="fa-solid fa-users-viewfinder"></i>
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--color-navy)' }}>Nationwide Network</div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Connecting 50,000+ Active Members & Coordinators</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Bottom Divider */}
      <div className="wave-divider">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.94,130.83,121.2,202,112.57,243,107.5,283.67,82.72,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
}
