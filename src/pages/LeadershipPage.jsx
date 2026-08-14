import React from 'react';
import LeadershipSection from '../components/LeadershipSection';

export default function LeadershipPage({ setActivePage }) {
  return (
    <div style={{ paddingTop: '6rem' }}>
      <div style={{ background: 'var(--accent-gradient)', color: '#FFFFFF', padding: '4rem 0 3rem', textAlign: 'center' }}>
        <div className="container">
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FF9933', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            NATIONAL EXECUTIVE DIRECTORY
          </span>
          <h1 style={{ fontSize: '3rem', color: '#FFFFFF', margin: '0.5rem 0 1rem' }}>
            Party Leadership & Coordinators
          </h1>
          <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', opacity: 0.9 }}>
            National Executive Council, Vice Presidents, General Secretaries, and State/District Coordinators.
          </p>
        </div>
      </div>

      <LeadershipSection setActivePage={setActivePage} />
    </div>
  );
}
