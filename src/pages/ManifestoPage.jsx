import React from 'react';
import ManifestoSection from '../components/ManifestoSection';

export default function ManifestoPage({ setActivePage }) {
  return (
    <div style={{ paddingTop: '6rem' }}>
      <div style={{ background: 'var(--accent-gradient)', color: '#FFFFFF', padding: '4rem 0 3rem', textAlign: 'center' }}>
        <div className="container">
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FF9933', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            POLICY CHARTER 2026 • FOR PEACE, PROSPERITY AND POWER
          </span>
          <h1 style={{ fontSize: '3rem', color: '#FFFFFF', margin: '0.5rem 0 1rem' }}>
            Official Party Manifesto (15 Pledges)
          </h1>
          <p style={{ maxWidth: '780px', margin: '0 auto', fontSize: '1.1rem', opacity: 0.9 }}>
            Our 15 core legislative pledges transforming Higher Education, Healthcare, Labor Rights, Women Safety, Zero Unemployment, Farmer Land Grants, and Time-Bound Justice.
          </p>
          <div style={{ marginTop: '1.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(6px)', padding: '0.5rem 1.25rem', borderRadius: 'var(--border-radius-full)', fontSize: '0.9rem', fontWeight: 600 }}>
            <span>🍍 Election Symbol: <strong>Pineapple (Vote for Pineapple)</strong></span>
          </div>
        </div>
      </div>

      <ManifestoSection setActivePage={setActivePage} />
    </div>
  );
}
