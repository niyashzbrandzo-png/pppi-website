import React from 'react';
import AboutSection from '../components/AboutSection';
import InfrastructureSection from '../components/InfrastructureSection';

export default function AboutPage({ setActivePage }) {
  return (
    <div style={{ paddingTop: '6rem' }}>
      <div style={{ background: 'var(--accent-gradient)', color: '#FFFFFF', padding: '4rem 0 3rem', textAlign: 'center' }}>
        <div className="container">
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FF9933', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            ORGANIZATION CHARTER
          </span>
          <h1 style={{ fontSize: '3rem', color: '#FFFFFF', margin: '0.5rem 0 1rem' }}>
            About Pasha People Party of India
          </h1>
          <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', opacity: 0.9 }}>
            A modern political organization empowering Indian citizens through technology, transparency, and grassroots public service.
          </p>
        </div>
      </div>

      <AboutSection setActivePage={setActivePage} />
      <InfrastructureSection />
    </div>
  );
}
