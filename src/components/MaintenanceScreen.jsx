import React, { useState } from 'react';
import { siteMetadata, founderData } from '../data/websiteData';

export default function MaintenanceScreen({ maintenanceData }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const headline = maintenanceData?.maintenance_message || 'Currently Website & Mobile App Under Development';
  const subtext = maintenanceData?.maintenance_subtext || 'We are fine-tuning India\'s premier digital political membership platform, 15-Point Legislative Charter, and mobile application ecosystem. The portal and mobile app will be fully operational shortly.';
  const helpline = maintenanceData?.helpline || siteMetadata.helpline || '+91 7259798393';
  const email = maintenanceData?.email || siteMetadata.contactEmail || 'bpasha46@gmail.com';

  const banners = [
    {
      id: 'horizontal-banner',
      title: 'Pasha People Party of India — Official Party Banner',
      subtitle: 'For Peace, Prosperity and Power • Vote for Pineapple • Hosur Central Secretariat',
      src: '/images/maintenance/pppi_horizontal_banner.jpg',
      alt: 'Pasha People Party of India Official Banner'
    },
    {
      id: 'preamble-charter',
      title: 'PPPI Official Preamble & Organization Charter',
      subtitle: 'Dr. B. Pasha Presidential Philosophy, Maxims & Sacred Right to Live',
      src: '/images/maintenance/pppi_preamble_banner.jpg',
      alt: 'Pasha People Party of India Official Preamble Charter'
    }
  ];

  return (
    <div className="maintenance-wrapper" style={{ minHeight: '100vh', backgroundColor: '#0B1120', color: '#F8FAFC', display: 'flex', flexDirection: 'column', position: 'relative', overflowX: 'hidden' }}>
      {/* Background Glows */}
      <div style={{ position: 'absolute', top: '-150px', left: '10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(255,153,51,0.18) 0%, rgba(255,153,51,0) 70%)', pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', bottom: '-150px', right: '10%', width: '550px', height: '550px', background: 'radial-gradient(circle, rgba(30,58,138,0.3) 0%, rgba(30,58,138,0) 70%)', pointerEvents: 'none' }}></div>

      {/* Top Header Bar */}
      <header style={{ padding: '1.25rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'linear-gradient(135deg, #FF9933 0%, #E65100 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', boxShadow: '0 4px 15px rgba(255,153,51,0.4)' }}>
            🍍
          </div>
          <div>
            <div style={{ fontWeight: 900, fontSize: '1.25rem', letterSpacing: '0.04em', color: '#FFFFFF' }}>PPPI CONNECT</div>
            <div style={{ fontSize: '0.75rem', color: '#FF9933', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Pasha People Party of India
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#F87171', padding: '0.4rem 1rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EF4444', display: 'inline-block', boxShadow: '0 0 10px #EF4444' }}></span>
            Under Development Mode
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2.5rem 1.5rem', maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 10 }}>
        
        {/* Status Badge */}
        <div style={{ background: 'rgba(255,153,51,0.12)', border: '1px solid rgba(255,153,51,0.35)', color: '#FFB86C', padding: '0.45rem 1.2rem', borderRadius: '9999px', fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
          <i className="fa-solid fa-screwdriver-wrench" style={{ color: '#FF9933' }}></i>
          <span>Official Platform Upgrade In Progress</span>
        </div>

        {/* Large Prominent Main Headline */}
        <h1 style={{ fontSize: 'clamp(1.85rem, 4.5vw, 3.2rem)', fontWeight: 900, textAlign: 'center', lineHeight: '1.2', margin: '0 0 1rem', maxWidth: '960px', background: 'linear-gradient(135deg, #FFFFFF 30%, #CBD5E1 70%, #94A3B8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {headline}
        </h1>

        {/* Subtitle Notice */}
        <p style={{ fontSize: 'clamp(0.98rem, 1.8vw, 1.15rem)', color: '#94A3B8', textAlign: 'center', maxWidth: '820px', lineHeight: '1.7', margin: '0 0 2rem' }}>
          {subtext}
        </p>

        {/* 1. Wide Horizontal Official Banner (Featured Top) */}
        <div
          onClick={() => setSelectedImage(banners[0])}
          style={{
            width: '100%',
            maxWidth: '1050px',
            background: 'rgba(15, 23, 42, 0.85)',
            border: '2px solid rgba(255, 153, 51, 0.4)',
            borderRadius: '1.25rem',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
            cursor: 'pointer',
            marginBottom: '2rem',
            transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
            position: 'relative'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.01)';
            e.currentTarget.style.borderColor = 'rgba(255, 153, 51, 0.8)';
            e.currentTarget.style.boxShadow = '0 25px 50px rgba(255, 153, 51, 0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.borderColor = 'rgba(255, 153, 51, 0.4)';
            e.currentTarget.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.5)';
          }}
        >
          <div style={{ position: 'relative', width: '100%', overflow: 'hidden', backgroundColor: '#000000' }}>
            <img
              src={banners[0].src}
              alt={banners[0].alt}
              style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '340px', objectFit: 'contain' }}
              loading="lazy"
            />
            <div style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)', padding: '6px 14px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <i className="fa-solid fa-magnifying-glass-plus" style={{ color: '#FF9933' }}></i> Click to Enlarge Official Banner
            </div>
          </div>
        </div>

        {/* 2. Side-by-Side: Preamble Charter Document & Official Contact Card */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', width: '100%', maxWidth: '1050px', marginBottom: '2.5rem' }}>
          
          {/* Preamble Charter Image Card */}
          <div
            onClick={() => setSelectedImage(banners[1])}
            style={{
              background: 'rgba(15, 23, 42, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '1.25rem',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
              cursor: 'pointer',
              transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
              display: 'flex',
              flexDirection: 'column'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.borderColor = 'rgba(255, 153, 51, 0.5)';
              e.currentTarget.style.boxShadow = '0 25px 50px rgba(255, 153, 51, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
            }}
          >
            <div style={{ position: 'relative', height: '420px', overflow: 'hidden', backgroundColor: '#FFFFFF' }}>
              <img
                src={banners[1].src}
                alt={banners[1].alt}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                loading="lazy"
              />
              <div style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)', padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <i className="fa-solid fa-magnifying-glass-plus" style={{ color: '#FF9933' }}></i> Click to Read Full Charter
              </div>
            </div>
            <div style={{ padding: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.3rem' }}>
                {banners[1].title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#94A3B8', margin: 0 }}>
                {banners[1].subtitle}
              </p>
            </div>
          </div>

          {/* Right Column: Preamble Maxims & Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Preamble Core Maxims */}
            <div style={{ background: 'rgba(30, 41, 59, 0.65)', border: '1px solid rgba(255, 153, 51, 0.3)', borderRadius: '1.25rem', padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#FF9933', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                <i className="fa-solid fa-scroll"></i> PRESIDENTIAL PREAMBLE
              </div>
              <p style={{ fontSize: '0.96rem', color: '#E2E8F0', fontStyle: 'italic', lineHeight: '1.7', margin: '0 0 1rem' }}>
                "Each living being has a right to live on this earth... The universal integration and peace must be established by love and affection, but not by war."
              </p>
              
              <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderLeft: '3px solid #38BDF8', padding: '0.75rem 1rem', borderRadius: '6px', marginBottom: '0.75rem' }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#38BDF8' }}>
                  "Nahi Jnaanena Sadrsham Pavithram Iha Vidyathe"
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
                  — Providing true education and finding truth is the highest holiness.
                </div>
              </div>

              <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderLeft: '3px solid #22C55E', padding: '0.75rem 1rem', borderRadius: '6px' }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#22C55E' }}>
                  "Save the mild and tame the wild — Dhushta Shikshana Shishta Rakshana"
                </div>
                <div style={{ fontSize: '0.78rem', color: '#94A3B8' }}>
                  — Punish the wicked and protect the righteous.
                </div>
              </div>
            </div>

            {/* Central Secretariat Contact Coordinates */}
            <div style={{ background: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'rgba(255,153,51,0.15)', color: '#FF9933', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Central Secretariat</div>
                  <div style={{ fontSize: '0.85rem', color: '#F1F5F9', fontWeight: 600 }}>{siteMetadata.headquarters}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'rgba(34,197,94,0.15)', color: '#22C55E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Official Mobile</div>
                  <a href={`tel:${helpline.replace(/\s+/g, '')}`} style={{ fontSize: '0.95rem', color: '#22C55E', fontWeight: 800, textDecoration: 'none' }}>
                    {helpline}
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'rgba(59,130,246,0.15)', color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Official Mail ID</div>
                  <a href={`mailto:${email}`} style={{ fontSize: '0.9rem', color: '#60A5FA', fontWeight: 700, textDecoration: 'none' }}>
                    {email}
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

      </main>

      {/* Footer Bar */}
      <footer style={{ padding: '1.25rem 2rem', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.85rem', color: '#64748B', position: 'relative', zIndex: 10 }}>
        <div>
          © {new Date().getFullYear()} Pasha People Party of India (PPPI CONNECT) • Vote for Pineapple 🍍
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span>For Peace, Prosperity and Power</span>
        </div>
      </footer>

      {/* Fullscreen Image Preview Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.94)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            cursor: 'zoom-out'
          }}
        >
          <div style={{ position: 'relative', maxWidth: '92vw', maxHeight: '92vh', textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#FFFFFF',
                fontSize: '16px',
                fontWeight: 700,
                padding: '6px 14px',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              <i className="fa-solid fa-xmark"></i> Close
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              style={{ maxWidth: '100%', maxHeight: '85vh', borderRadius: '8px', boxShadow: '0 25px 50px rgba(0,0,0,0.8)', objectFit: 'contain' }}
            />
            <div style={{ marginTop: '12px', textAlign: 'center', color: '#FFFFFF', fontSize: '1.05rem', fontWeight: 700 }}>
              {selectedImage.title}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
