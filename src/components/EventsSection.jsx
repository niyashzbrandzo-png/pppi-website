import React, { useState, useEffect } from 'react';
import { eventsData } from '../data/websiteData';
import { apiService } from '../services/api';

export default function EventsSection({ openEventModal }) {
  const [filter, setFilter] = useState('All');
  const [eventsList, setEventsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLiveEvents() {
      try {
        setLoading(true);
        const res = await apiService.fetchEvents();
        const apiEvents = Array.isArray(res.data) ? res.data : (Array.isArray(res) ? res : []);
        const formattedApiEvents = apiEvents.map((evt) => ({
          id: evt.id || `api-${Date.now()}`,
          title: evt.title,
          category: 'Upcoming',
          type: evt.organizer || 'Admin Special Event',
          date: evt.date,
          time: evt.time || '10:00 AM',
          venue: evt.venue,
          image: evt.banner_image || evt.banner || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
          desc: evt.description || 'Official PPPI event created by Admin Executive Committee.',
        }));

        setEventsList(formattedApiEvents);
      } catch (err) {
        console.warn('Could not load live events from API:', err);
      } finally {
        setLoading(false);
      }
    }
    loadLiveEvents();
  }, []);

  const filteredEvents = filter === 'All'
    ? eventsList
    : eventsList.filter((e) => e.category === filter);

  return (
    <section className="section-padding" id="events">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <i className="fa-solid fa-calendar-days"></i>
            <span>RALLIES & CONCLAVES</span>
          </div>
          <h2 className="section-title">
            Upcoming & Past <span className="gradient-text">Public Events</span>
          </h2>
          <p className="section-subtitle">
            Participate in democratic rallies, youth conclaves, agrarian workshops, and town halls across India.
          </p>

          <div className="filter-tabs" style={{ marginTop: '1.5rem' }}>
            {['All', 'Upcoming', 'Past'].map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat} Events
              </button>
            ))}
          </div>
        </div>

        <div className="cards-grid-3">
          {filteredEvents.map((evt) => (
            <div key={evt.id} className="event-card">
              <img src={evt.image} alt={evt.title} style={{ height: '220px', width: '100%', objectFit: 'cover' }} />
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: 'var(--border-radius-full)', background: evt.category === 'Upcoming' ? 'rgba(19, 136, 8, 0.12)' : 'rgba(100, 116, 139, 0.12)', color: evt.category === 'Upcoming' ? 'var(--color-green-dark)' : 'var(--text-muted)' }}>
                    {evt.category} • {evt.type}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.15rem', color: 'var(--color-navy)', marginBottom: '0.5rem', lineHeight: '1.3' }}>
                  {evt.title}
                </h3>

                <div className="event-meta">
                  <span><i className="fa-solid fa-calendar" style={{ color: 'var(--color-saffron-dark)' }}></i> {evt.date}</span>
                  <span><i className="fa-solid fa-clock"></i> {evt.time}</span>
                </div>

                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <i className="fa-solid fa-location-dot" style={{ color: 'var(--color-royal-blue)', marginTop: '0.2rem' }}></i>
                  <span>{evt.venue}</span>
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                  {evt.desc}
                </p>

                {evt.category === 'Upcoming' ? (
                  <button className="btn btn-primary btn-block btn-sm" onClick={() => openEventModal(evt)}>
                    <i className="fa-solid fa-ticket"></i> Register / Get Event Pass
                  </button>
                ) : (
                  <button className="btn btn-secondary btn-block btn-sm" disabled>
                    <i className="fa-solid fa-circle-check"></i> Event Concluded
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
