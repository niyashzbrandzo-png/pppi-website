import React from 'react';
import NewsSection from '../components/NewsSection';

export default function NewsPage({ setActivePage }) {
  return (
    <div style={{ paddingTop: '6rem' }}>
      <div style={{ background: 'var(--accent-gradient)', color: '#FFFFFF', padding: '4rem 0 3rem', textAlign: 'center' }}>
        <div className="container">
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FF9933', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            MEDIA & PRESS RELEASES
          </span>
          <h1 style={{ fontSize: '3rem', color: '#FFFFFF', margin: '0.5rem 0 1rem' }}>
            Official Press Bureau
          </h1>
          <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', opacity: 0.9 }}>
            Latest political announcements, policy updates, and executive council press briefs.
          </p>
        </div>
      </div>

      <NewsSection setActivePage={setActivePage} />
    </div>
  );
}
