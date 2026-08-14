import React from 'react';
import ManifestoSection from '../components/ManifestoSection';

export default function ManifestoPage({ setActivePage }) {
  return (
    <div style={{ paddingTop: '6rem' }}>
      <div style={{ background: 'var(--accent-gradient)', color: '#FFFFFF', padding: '4rem 0 3rem', textAlign: 'center' }}>
        <div className="container">
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FF9933', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            POLICY CHARTER 2026
          </span>
          <h1 style={{ fontSize: '3rem', color: '#FFFFFF', margin: '0.5rem 0 1rem' }}>
            Official Party Manifesto
          </h1>
          <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', opacity: 0.9 }}>
            Our 10 core legislative pledges transforming Education, Healthcare, Agriculture, Women Safety, and Employment.
          </p>
        </div>
      </div>

      <ManifestoSection setActivePage={setActivePage} />
    </div>
  );
}
