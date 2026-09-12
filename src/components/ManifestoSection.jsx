import React, { useState, useEffect } from 'react';
import { manifestoTopics } from '../data/websiteData';
import { apiService } from '../services/api';

export default function ManifestoSection({ setActivePage }) {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [topics, setTopics] = useState(manifestoTopics);

  useEffect(() => {
    async function loadLiveManifesto() {
      try {
        const res = await apiService.fetchManifesto();
        const apiData = Array.isArray(res.data) ? res.data : (Array.isArray(res) ? res : []);
        if (apiData.length > 0) {
          const formatted = apiData.map((item, idx) => ({
            id: item.id || idx + 1,
            pointNumber: item.point_number || idx + 1,
            icon: item.icon_name || 'fa-scroll',
            title: item.title,
            subtitle: item.subtitle || item.category || 'Party Charter',
            desc: item.content || item.summary || '',
            fullPolicy: item.full_policy || item.content || '',
            image: item.image_url || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
          }));
          setTopics(formatted);
        }
      } catch (err) {
        console.warn('Using default 15-point manifesto topics:', err);
      }
    }
    loadLiveManifesto();
  }, []);

  return (
    <section className="section-padding" id="manifesto" style={{ backgroundColor: 'var(--bg-secondary)' }} aria-label="PPPI 15 Core Manifesto Pledges">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <i className="fa-solid fa-scroll" aria-hidden="true"></i>
            <span>OFFICIAL MANIFESTO 2026</span>
          </div>
          <h2 className="section-title">
            15 Core Pledges for <span className="gradient-text">Peace, Prosperity & Power</span>
          </h2>
          <p className="section-subtitle">
            Our comprehensive, actionable legislative charter formulated by Founder & National President Mr. B S Vahid Pasha and the National Executive Committee.
          </p>
        </div>

        <div className="manifesto-grid">
          {topics.map((topic) => (
            <article key={topic.id} className="manifesto-card">
              <img
                src={topic.image}
                alt={`${topic.title} - PPPI Manifesto Policy`}
                loading="lazy"
                decoding="async"
                width="600"
                height="350"
              />
              <div className="manifesto-body">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(30, 58, 138, 0.1)', color: 'var(--color-royal-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', flexShrink: 0 }} aria-hidden="true">
                    <i className={`fa-solid ${topic.icon}`}></i>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', color: 'var(--color-navy)', lineHeight: '1.3' }}>{topic.title}</h3>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-saffron-dark)', fontWeight: 700 }}>{topic.subtitle}</div>
                  </div>
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: '1.6' }}>
                  {topic.desc}
                </p>

                <button
                  className="btn btn-secondary btn-sm btn-block"
                  onClick={() => setSelectedTopic(topic)}
                  aria-label={`Read full policy details: ${topic.title}`}
                >
                  <i className="fa-solid fa-book-open" aria-hidden="true"></i> Read Full Policy Charter
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Party Banner */}
        <div style={{ marginTop: '3.5rem', background: '#FEF08A', border: '2px solid #EAB308', borderRadius: 'var(--border-radius-md)', padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', boxShadow: 'var(--shadow-md)' }}>
          <div>
            <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#15803D', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              PASHA PEOPLE PARTY OF INDIA
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#B45309', letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '0.2rem' }}>
              FOR PEACE, PROSPERITY AND POWER
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#FFFFFF', padding: '0.6rem 1.25rem', borderRadius: 'var(--border-radius-sm)', border: '1px solid #FDE047' }}>
            <div style={{ fontSize: '2rem' }} aria-hidden="true">🍍</div>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#B91C1C', textTransform: 'uppercase' }}>VOTE FOR PINEAPPLE</div>
              <div style={{ fontSize: '1.3rem', fontWeight: '900', color: '#1E3A8A', lineHeight: 1 }}>PPPI</div>
            </div>
          </div>
        </div>

        {/* Policy Detail Modal */}
        {selectedTopic && (
          <div className="modal-backdrop" onClick={() => setSelectedTopic(null)} role="dialog" aria-modal="true" aria-labelledby="manifesto-modal-title">
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '650px' }}>
              <button
                className="modal-close-btn"
                onClick={() => setSelectedTopic(null)}
                aria-label="Close policy modal"
              >
                <i className="fa-solid fa-xmark" aria-hidden="true"></i>
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'var(--accent-gradient)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }} aria-hidden="true">
                  <i className={`fa-solid ${selectedTopic.icon}`}></i>
                </div>
                <div>
                  <h3 id="manifesto-modal-title" style={{ fontSize: '1.35rem', lineHeight: '1.3' }}>{selectedTopic.title}</h3>
                  <div style={{ color: 'var(--color-saffron-dark)', fontWeight: 700, fontSize: '0.85rem' }}>{selectedTopic.subtitle}</div>
                </div>
              </div>

              <img
                src={selectedTopic.image}
                alt={selectedTopic.title}
                style={{ borderRadius: 'var(--border-radius-md)', height: '220px', width: '100%', objectFit: 'cover', marginBottom: '1.25rem' }}
                loading="lazy"
                decoding="async"
              />

              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                <p style={{ fontWeight: 600, color: 'var(--color-navy)', marginBottom: '0.75rem' }}>
                  {selectedTopic.desc}
                </p>
                <p>
                  {selectedTopic.fullPolicy || "Pasha People Party of India pledges 100% legislative priority for this charter upon state and central representation. Detailed budget allocations and implementation milestones are legally binding."}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                <button className="btn btn-secondary btn-sm" onClick={() => setSelectedTopic(null)}>Close</button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => { setSelectedTopic(null); setActivePage('manifesto'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                >
                  <i className="fa-solid fa-file-pdf"></i> Download Official Manifesto
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
