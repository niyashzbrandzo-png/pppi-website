import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export default function NewsSection({ setActivePage }) {
  const [selectedNews, setSelectedNews] = useState(null);
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLiveNews() {
      setLoading(true);
      try {
        const res = await apiService.fetchNewsletters();
        const apiNews = Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : []);
        if (apiNews.length > 0) {
          const formatted = apiNews.map(item => ({
            id: item.id,
            title: item.title,
            subtitle: item.subtitle || '',
            category: item.category || 'Press Release',
            date: item.publish_date ? new Date(item.publish_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recent',
            author: item.author || 'Mr. B S Vahid Pasha - Founder & National President',
            image: item.media_url || '/images/banner.jpg',
            summary: item.description || '',
            doc_url: item.doc_url || '',
            doc_name: item.doc_name || (item.doc_url ? 'Official_Press_Communique.pdf' : '')
          }));
          setNewsList(formatted);
        } else {
          setNewsList([]);
        }
      } catch (err) {
        console.warn('Failed to load live newsletters from API:', err);
        setNewsList([]);
      } finally {
        setLoading(false);
      }
    }
    loadLiveNews();
  }, []);

  return (
    <section className="section-padding" id="news" style={{ backgroundColor: 'var(--bg-secondary)' }} aria-label="PPPI News and Press Releases">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <i className="fa-solid fa-newspaper" aria-hidden="true"></i>
            <span>MEDIA & PRESS DESK</span>
          </div>
          <h2 className="section-title">
            Latest News & <span className="gradient-text">Official Newsletters</span>
          </h2>
          <p className="section-subtitle">
            Direct briefings, live press statements, policy whitepapers, and verified official bulletins from PPPI Central Secretariat.
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
            <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: '2.5rem', color: 'var(--color-royal-blue)', marginBottom: '1rem' }}></i>
            <p>Loading live newsletters from central database...</p>
          </div>
        ) : newsList.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3.5rem 1rem', background: '#FFFFFF', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
            <i className="fa-solid fa-newspaper" style={{ fontSize: '3rem', color: 'var(--text-muted)', opacity: 0.5, marginBottom: '1rem' }}></i>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>No Newsletters Published Yet</h3>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto' }}>
              Official press releases, gazettes, and statements published from the Admin Panel will appear here live.
            </p>
          </div>
        ) : (
          <div className="cards-grid-3">
            {newsList.map((item) => (
              <article key={item.id} className="news-card">
                <img
                  src={item.image}
                  alt={`${item.title} - PPPI News`}
                  style={{ height: '220px', width: '100%', objectFit: 'cover' }}
                  loading="lazy"
                  decoding="async"
                  width="600"
                  height="350"
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/banner.jpg'; }}
                />
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-royal-blue)', background: 'rgba(30, 58, 138, 0.1)', padding: '0.2rem 0.65rem', borderRadius: 'var(--border-radius-full)' }}>
                      {item.category}
                    </span>
                    <time className="news-date" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.date}</time>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', color: 'var(--color-navy)', marginBottom: '0.5rem', lineHeight: '1.35' }}>
                    {item.title}
                  </h3>

                  {item.subtitle && (
                    <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-saffron-dark)', marginBottom: '0.5rem' }}>
                      {item.subtitle}
                    </div>
                  )}

                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {item.summary}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem', marginTop: 'auto' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>By {item.author ? item.author.split('-')[0].trim() : 'PPPI Bureau'}</span>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setSelectedNews(item)}
                      aria-label={`Read full article: ${item.title}`}
                    >
                      Read More <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Read Full Press Release Modal */}
        {selectedNews && (
          <div className="modal-backdrop" onClick={() => setSelectedNews(null)} role="dialog" aria-modal="true" aria-labelledby="news-modal-title">
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto' }}>
              <button
                className="modal-close-btn"
                onClick={() => setSelectedNews(null)}
                aria-label="Close article modal"
              >
                <i className="fa-solid fa-xmark" aria-hidden="true"></i>
              </button>

              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-saffron-dark)', textTransform: 'uppercase' }}>
                {selectedNews.category} • {selectedNews.date}
              </span>

              <h3 id="news-modal-title" style={{ fontSize: '1.4rem', margin: '0.5rem 0 0.5rem', color: 'var(--color-navy)' }}>
                {selectedNews.title}
              </h3>

              {selectedNews.subtitle && (
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem', fontStyle: 'italic' }}>
                  {selectedNews.subtitle}
                </div>
              )}

              <img
                src={selectedNews.image}
                alt={selectedNews.title}
                style={{ borderRadius: 'var(--border-radius-md)', height: '280px', width: '100%', objectFit: 'cover', marginBottom: '1.25rem' }}
                loading="lazy"
                decoding="async"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/banner.jpg'; }}
              />

              <div style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.95rem', marginBottom: '1.5rem', whiteSpace: 'pre-line' }}>
                {selectedNews.summary}
              </div>

              {selectedNews.doc_url && (
                <div style={{ margin: '1rem 0 1.5rem', padding: '1rem', background: 'rgba(2,132,199,0.08)', border: '1px solid rgba(2,132,199,0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <i className="fa-solid fa-file-pdf" style={{ fontSize: '1.5rem', color: '#0284c7' }}></i>
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0284c7' }}>{selectedNews.doc_name || 'Download Official Communique'}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Official authenticated PDF attachment</div>
                    </div>
                  </div>
                  <a href={selectedNews.doc_url} target="_blank" rel="noopener noreferrer" download className="btn btn-primary btn-sm" style={{ textDecoration: 'none' }}>
                    <i className="fa-solid fa-download"></i> Download
                  </a>
                </div>
              )}

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <button className="btn btn-secondary btn-sm" onClick={() => setSelectedNews(null)}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
