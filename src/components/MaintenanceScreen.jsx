import React, { useState } from 'react';
import { siteMetadata } from '../data/websiteData';

export default function MaintenanceScreen({ maintenanceData }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const headline = maintenanceData?.maintenance_message || 'Currently Website & Mobile App Under Development';
  const subtext = maintenanceData?.maintenance_subtext || 'Our mobile app and web services will be fully operational shortly.';
  const helpline = maintenanceData?.helpline || maintenanceData?.contact_helpline || siteMetadata.helpline || '+91 7259798393';
  const email = maintenanceData?.email || maintenanceData?.contact_email || siteMetadata.contactEmail || 'bpasha46@gmail.com';
  const address = siteMetadata.headquarters || '#138/B, Trendcity, Hosur - 635103, Tamil Nadu';

  const officialBanner = {
    id: 'horizontal-banner',
    title: 'Pasha People Party of India — Official Party Banner',
    subtitle: 'For Peace, Prosperity and Power • Vote for Pineapple • Hosur Central Secretariat',
    src: '/images/maintenance/pppi_horizontal_banner.jpg',
    alt: 'Pasha People Party of India Official Banner'
  };

  return (
    <div className="maintenance-wrapper" style={{ minHeight: '100vh', backgroundColor: '#0B1120', color: '#F8FAFC', display: 'flex', flexDirection: 'column', position: 'relative', overflowX: 'hidden' }}>
      {/* Background Ambient Glows */}
      <div style={{ position: 'absolute', top: '-150px', left: '15%', width: '550px', height: '550px', background: 'radial-gradient(circle, rgba(255,153,51,0.18) 0%, rgba(255,153,51,0) 70%)', pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', bottom: '-150px', right: '15%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(30,58,138,0.25) 0%, rgba(30,58,138,0) 70%)', pointerEvents: 'none' }}></div>

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
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2.5rem 1.5rem', maxWidth: '1100px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 10 }}>
        
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
        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: '#94A3B8', textAlign: 'center', maxWidth: '800px', lineHeight: '1.7', margin: '0 0 2rem' }}>
          {subtext}
        </p>

        {/* Official Banner Card (Single Featured Image) */}
        <div
          onClick={() => setSelectedImage(officialBanner)}
          style={{
            width: '100%',
            maxWidth: '1000px',
            background: 'rgba(15, 23, 42, 0.85)',
            border: '2px solid rgba(255, 153, 51, 0.45)',
            borderRadius: '1.25rem',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
            cursor: 'pointer',
            marginBottom: '2.5rem',
            transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
            position: 'relative'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.01)';
            e.currentTarget.style.borderColor = 'rgba(255, 153, 51, 0.85)';
            e.currentTarget.style.boxShadow = '0 25px 50px rgba(255, 153, 51, 0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.borderColor = 'rgba(255, 153, 51, 0.45)';
            e.currentTarget.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.5)';
          }}
        >
          <div style={{ position: 'relative', width: '100%', overflow: 'hidden', backgroundColor: '#000000' }}>
            <img
              src={officialBanner.src}
              alt={officialBanner.alt}
              style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '380px', objectFit: 'contain' }}
              loading="lazy"
            />
            <div style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)', padding: '6px 14px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <i className="fa-solid fa-magnifying-glass-plus" style={{ color: '#FF9933' }}></i> Click to Enlarge Official Banner
            </div>
          </div>
        </div>

        {/* Official Central Secretariat & Support Coordinates */}
        <div style={{
          width: '100%',
          maxWidth: '1000px',
          background: 'rgba(15, 23, 42, 0.75)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '1.25rem',
          padding: '1.75rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.5rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
        }}>
          {/* Location */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(255,153,51,0.15)', color: '#FF9933', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
              <i className="fa-solid fa-location-dot"></i>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Central Secretariat</div>
              <div style={{ fontSize: '0.9rem', color: '#F1F5F9', fontWeight: 600, marginTop: '2px' }}>{address}</div>
            </div>
          </div>

          {/* Helpline Phone */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(34,197,94,0.15)', color: '#22C55E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
              <i className="fa-solid fa-phone"></i>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Official Helpline</div>
              <a href={`tel:${helpline.replace(/\s+/g, '')}`} style={{ fontSize: '1.05rem', color: '#22C55E', fontWeight: 800, textDecoration: 'none', display: 'inline-block', marginTop: '2px' }}>
                {helpline}
              </a>
            </div>
          </div>

          {/* Email */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '10px', background: 'rgba(59,130,246,0.15)', color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>
              <i className="fa-solid fa-envelope"></i>
            </div>
            <div>
              <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Official Mail ID</div>
              <a href={`mailto:${email}`} style={{ fontSize: '0.95rem', color: '#60A5FA', fontWeight: 700, textDecoration: 'none', display: 'inline-block', marginTop: '2px' }}>
                {email}
              </a>
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
