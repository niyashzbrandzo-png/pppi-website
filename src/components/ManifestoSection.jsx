import React, { useState } from 'react';
import { manifestoTopics } from '../data/websiteData';

export default function ManifestoSection({ setActivePage }) {
  const [selectedTopic, setSelectedTopic] = useState(null);

  return (
    <section className="section-padding" id="manifesto" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <i className="fa-solid fa-scroll"></i>
            <span>PARTY MANIFESTO 2026</span>
          </div>
          <h2 className="section-title">
            10 Pillars of <span className="gradient-text">Peace, Prosperity & Power</span>
          </h2>
          <p className="section-subtitle">
            Our comprehensive, actionable policy blueprint for transforming Indian governance and public welfare.
          </p>
        </div>

        <div className="manifesto-grid">
          {manifestoTopics.map((topic) => (
            <div key={topic.id} className="manifesto-card">
              <img src={topic.image} alt={topic.title} />
              <div className="manifesto-body">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(30, 58, 138, 0.1)', color: 'var(--color-royal-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
                    <i className={`fa-solid ${topic.icon}`}></i>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', color: 'var(--color-navy)' }}>{topic.title}</h3>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-saffron-dark)', fontWeight: 700 }}>{topic.subtitle}</div>
                  </div>
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: '1.6' }}>
                  {topic.desc}
                </p>

                <button
                  className="btn btn-secondary btn-sm btn-block"
                  onClick={() => setSelectedTopic(topic)}
                >
                  <i className="fa-solid fa-book-open"></i> Read Full Policy Charter
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Policy Detail Modal */}
        {selectedTopic && (
          <div className="modal-backdrop" onClick={() => setSelectedTopic(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={() => setSelectedTopic(null)}>
                <i className="fa-solid fa-xmark"></i>
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'var(--accent-gradient)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
                  <i className={`fa-solid ${selectedTopic.icon}`}></i>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.4rem' }}>{selectedTopic.title}</h3>
                  <div style={{ color: 'var(--color-saffron-dark)', fontWeight: 700, fontSize: '0.85rem' }}>{selectedTopic.subtitle}</div>
                </div>
              </div>

              <img src={selectedTopic.image} alt={selectedTopic.title} style={{ borderRadius: 'var(--border-radius-md)', height: '220px', width: '100%', objectFit: 'cover', marginBottom: '1.25rem' }} />

              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                {selectedTopic.desc} Pasha People Party of India pledges 100% legislative priority for this charter upon state and central representation. Detailed budget allocations and implementation milestones are available in our official manifesto document.
              </p>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button className="btn btn-secondary btn-sm" onClick={() => setSelectedTopic(null)}>Close</button>
                <button className="btn btn-primary btn-sm" onClick={() => { setSelectedTopic(null); setActivePage('manifesto'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  Download Full Manifesto PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
