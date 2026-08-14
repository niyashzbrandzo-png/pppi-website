import React from 'react';
import FounderSection from '../components/FounderSection';

export default function FounderPage({ setActivePage }) {
  return (
    <div style={{ paddingTop: '6rem' }}>
      <div style={{ background: 'var(--accent-gradient)', color: '#FFFFFF', padding: '4rem 0 3rem', textAlign: 'center' }}>
        <div className="container">
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FF9933', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            FOUNDER & NATIONAL PRESIDENT
          </span>
          <h1 style={{ fontSize: '3rem', color: '#FFFFFF', margin: '0.5rem 0 1rem' }}>
            Dr. Pasha Pasha
          </h1>
          <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', opacity: 0.9 }}>
            Presidential Vision, Biography, and 15-Year Legacy of Governance Reform in India.
          </p>
        </div>
      </div>

      <FounderSection setActivePage={setActivePage} />
    </div>
  );
}
