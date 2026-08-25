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
      id: 'manifesto',
      title: 'PPPI 15-Point Policy Manifesto Charter',
      subtitle: 'Official Legislative Pledges for Peace, Prosperity and Power',
      src: '/images/maintenance/pppi_manifesto_banner.jpg',
      alt: 'Pasha People Party of India 15-Point Manifesto Poster'
    },
    {
      id: 'preamble',
      title: 'Official Preamble & Headquarters Charter',
      subtitle: 'Dr. B. Pasha Presidential Philosophy & Hosur Secretariat',
      src: '/images/maintenance/pppi_preamble_banner.jpg',
      alt: 'Pasha People Party of India Official Preamble Banner'
    }
  ];

  return (
    <div className="maintenance-wrapper" style={{ minHeight: '100vh', backgroundColor: '#0B1120', color: '#F8FAFC', display: 'flex', flexDirection: 'column', position: 'relative', overflowX: 'hidden' }}>
      {/* Background Glows */}
      <div style={{ position: 'absolute', top: '-150px', left: '10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(255,153,51,0.18) 0%, rgba(255,153,51,0) 70%)', pointerEvents: 'none' }}></div>
      <div style={{ position: 'absolute', bottom: '-150px', right: '10%', width: '550px', height: '550px', background: 'radial-gradient(circle, rgba(30,58,138,0.3) 0%, rgba(30,58,138,0) 70%)', pointerEvents: 'none' }}></div>

      {/* Top Header Bar */}
      <header style={{ padding: '1.5rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', position: 'relative', zIndex: 10 }}>
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

      {/* Main Content Hero */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3.5rem 1.5rem', maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 10 }}>
        
        {/* Status Badge */}
        <div style={{ background: 'rgba(255,153,51,0.12)', border: '1px solid rgba(255,153,51,0.35)', color: '#FFB86C', padding: '0.5rem 1.25rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
          <i className="fa-solid fa-wrench" style={{ color: '#FF9933' }}></i>
          <span>Official Platform Upgrade In Progress</span>
        </div>

        {/* Large Prominent Main Headline */}
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)', fontWeight: 900, textAlign: 'center', lineHeight: '1.15', margin: '0 0 1.25rem', maxWidth: '950px', background: 'linear-gradient(135deg, #FFFFFF 30%, #CBD5E1 70%, #94A3B8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {headline}
        </h1>

        {/* Subtitle Notice */}
        <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: '#94A3B8', textAlign: 'center', maxWidth: '800px', lineHeight: '1.7', margin: '0 0 2.5rem' }}>
          {subtext}
        </p>

        {/* Two Featured Banner Images Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', width: '100%', margin: '1rem 0 3rem' }}>
          {banners.map((banner) => (
            <div
              key={banner.id}
              onClick={() => setSelectedImage(banner)}
              style={{
                background: 'rgba(15, 23, 42, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '1.25rem',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'rgba(255, 153, 51, 0.5)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(255, 153, 51, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
              }}
            >
              <div style={{ position: 'relative', height: '340px', overflow: 'hidden', backgroundColor: '#000000' }}>
                <img
                  src={banner.src}
                  alt={banner.alt}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', transition: 'transform 0.5s ease' }}
                  loading="lazy"
                />
                <div style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)', padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700, color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <i className="fa-solid fa-magnifying-glass-plus" style={{ color: '#FF9933' }}></i> Click to Enlarge
                </div>
              </div>

              <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '0.4rem' }}>
                  {banner.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#94A3B8', margin: 0 }}>
                  {banner.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Preamble Wisdom Quote Block */}
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255, 153, 51, 0.3)', borderRadius: '1.25rem', padding: '2rem', maxWidth: '900px', width: '100%', marginBottom: '2.5rem', textAlign: 'center', position: 'relative' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#FF9933', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            FOUNDER & PRESIDENTIAL PREAMBLE • DR. B. PASHA
          </div>
          <p style={{ fontSize: '1.05rem', color: '#E2E8F0', fontStyle: 'italic', lineHeight: '1.7', margin: '0 0 1rem' }}>
            "The universal integration and peace must be established by love and affection, but not by war. Seeding brotherhood between all religions and among all people beyond borders ought to become everyone's motto."
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.88rem', color: '#38BDF8', fontWeight: 700 }}>
            <span><i className="fa-solid fa-quote-left" style={{ opacity: 0.5 }}></i> Nahi Jnaanena Sadrsham Pavithram Iha Vidyathe</span>
            <span>•</span>
            <span>Save the mild and tame the wild — Dhushta Shikshana Shishta Rakshana <i className="fa-solid fa-quote-right" style={{ opacity: 0.5 }}></i></span>
          </div>
        </div>

        {/* Official Secretariat Contact Coordinates */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', width: '100%', maxWidth: '900px', marginBottom: '1.5rem' }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.25rem 1.75rem', display: 'flex', alignItems: 'center', gap: '1rem', flex: '1 1 260px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(255,153,51,0.15)', color: '#FF9933', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
              <i className="fa-solid fa-location-dot"></i>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Central Secretariat</div>
              <div style={{ fontSize: '0.88rem', color: '#F1F5F9', fontWeight: 600 }}>{siteMetadata.headquarters}</div>
            </div>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.25rem 1.75rem', display: 'flex', alignItems: 'center', gap: '1rem', flex: '1 1 240px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(34,197,94,0.15)', color: '#22C55E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
              <i className="fa-solid fa-phone"></i>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Helpline Contact</div>
              <a href={`tel:${helpline.replace(/\s+/g, '')}`} style={{ fontSize: '1rem', color: '#22C55E', fontWeight: 800, textDecoration: 'none' }}>
                {helpline}
              </a>
            </div>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1rem', padding: '1.25rem 1.75rem', display: 'flex', alignItems: 'center', gap: '1rem', flex: '1 1 240px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(59,130,246,0.15)', color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
              <i className="fa-solid fa-envelope"></i>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 700, textTransform: 'uppercase' }}>Official Email</div>
              <a href={`mailto:${email}`} style={{ fontSize: '0.92rem', color: '#60A5FA', fontWeight: 700, textDecoration: 'none' }}>
                {email}
              </a>
            </div>
          </div>
        </div>

      </main>

      {/* Footer Bar */}
      <footer style={{ padding: '1.5rem 2rem', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.85rem', color: '#64748B', position: 'relative', zIndex: 10 }}>
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
            backgroundColor: 'rgba(0, 0, 0, 0.92)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            cursor: 'zoom-out'
          }}
        >
          <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0',
                background: 'none',
                border: 'none',
                color: '#FFFFFF',
                fontSize: '24px',
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
            <div style={{ marginTop: '10px', textAlign: 'center', color: '#FFFFFF', fontSize: '1rem', fontWeight: 700 }}>
              {selectedImage.title}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
