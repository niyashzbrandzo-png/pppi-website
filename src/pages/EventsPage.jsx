import React from 'react';
import EventsSection from '../components/EventsSection';

export default function EventsPage({ openEventModal }) {
  return (
    <div style={{ paddingTop: '6rem' }}>
      <div style={{ background: 'var(--accent-gradient)', color: '#FFFFFF', padding: '4rem 0 3rem', textAlign: 'center' }}>
        <div className="container">
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FF9933', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            DEMOCRATIC RALLIES & WORKSHOPS
          </span>
          <h1 style={{ fontSize: '3rem', color: '#FFFFFF', margin: '0.5rem 0 1rem' }}>
            Campaign & Public Events
          </h1>
          <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', opacity: 0.9 }}>
            Register for upcoming national conventions, regional rallies, and agrarian technology conclaves.
          </p>
        </div>
      </div>

      <EventsSection openEventModal={openEventModal} />
    </div>
  );
}
