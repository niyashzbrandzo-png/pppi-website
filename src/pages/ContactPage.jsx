import React from 'react';
import ContactSection from '../components/ContactSection';

export default function ContactPage({ addToast }) {
  return (
    <div style={{ paddingTop: '6rem' }}>
      <div style={{ background: 'var(--accent-gradient)', color: '#FFFFFF', padding: '4rem 0 3rem', textAlign: 'center' }}>
        <div className="container">
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FF9933', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            SECRETARIAT DIRECTORY
          </span>
          <h1 style={{ fontSize: '3rem', color: '#FFFFFF', margin: '0.5rem 0 1rem' }}>
            Contact PPPI Connect
          </h1>
          <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', opacity: 0.9 }}>
            Reach Central Secretariat offices, submit civic grievances, or get in touch with district coordinators.
          </p>
        </div>
      </div>

      <ContactSection addToast={addToast} />
    </div>
  );
}
