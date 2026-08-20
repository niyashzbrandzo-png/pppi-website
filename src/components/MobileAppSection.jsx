import React from 'react';

export default function MobileAppSection() {
  const appFeatures = [
    'Digital ID Card with Cryptographic QR Code',
    'Instant Online Registration & OTP Verification',
    'Real-time Press & Political Notification Alerts',
    'District & State Event Calendar & Check-in Pass',
    'Member Dashboard & Activity History',
    'Volunteer Registration & Task Allocation',
    'Transparent Online Donations & Instant Tax Receipt',
    'Direct Citizen Grievance Portal to Coordinators',
  ];

  return (
    <section className="section-padding" id="app" style={{ backgroundColor: 'var(--bg-secondary)', overflow: 'hidden' }}>
      <div className="container">
        <div className="grid-2col">
          {/* Left Column: Mockups & Visuals */}
          <div className="mockup-container">
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <img
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80"
                alt="PPPI Connect Mobile App Interface"
                className="mockup-img"
                style={{ width: '320px', height: '620px', objectFit: 'cover' }}
              />

              {/* Floating Badge Overlay */}
              <div className="app-qr-floating-badge">
                <i className="fa-solid fa-qrcode" style={{ fontSize: '2rem', color: 'var(--color-royal-blue)' }}></i>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>Digital ID Pass</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Scan at Rallies</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Features & Downloads */}
          <div>
            <div className="section-badge">
              <i className="fa-solid fa-mobile-screen-button"></i>
              <span>PPPI CONNECT MOBILE ECOSYSTEM</span>
            </div>

            <h2 className="section-title">
              Empowering Political Action <span className="gradient-text">In Your Pocket</span>
            </h2>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '2rem' }}>
              Available on Android and upcoming on iOS. Stay informed, verify your active membership status, register for state conventions, and connect with district coordinators seamlessly.
            </p>

            {/* Checklist of App Features */}
            <div className="form-row-2col" style={{ gap: '0.85rem', marginBottom: '2.5rem' }}>
              {appFeatures.map((feat, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                  <i className="fa-solid fa-circle-check" style={{ color: 'var(--color-green-dark)', marginTop: '0.2rem' }}></i>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* App Download Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <a
                href="https://play.google.com"
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary btn-lg"
                style={{ borderRadius: 'var(--border-radius-md)' }}
              >
                <i className="fa-brands fa-google-play" style={{ fontSize: '1.4rem' }}></i>
                <div style={{ textAlign: 'left', lineHeight: 1.1 }}>
                  <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.8 }}>Get it on</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700 }}>Google Play Store</div>
                </div>
              </a>

              <div className="app-store-badge disabled" title="iOS App Store version coming soon!">
                <i className="fa-brands fa-apple" style={{ fontSize: '1.6rem' }}></i>
                <div style={{ textAlign: 'left', lineHeight: 1.1 }}>
                  <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', opacity: 0.7 }}>Download on</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>App Store (Coming Soon)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
