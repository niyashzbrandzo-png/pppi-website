import React, { useState, useEffect } from 'react';
import { newsData } from '../data/websiteData';
import { apiService } from '../services/api';

export default function NewsSection({ setActivePage }) {
  const [selectedNews, setSelectedNews] = useState(null);
  const [newsList, setNewsList] = useState(newsData);

  useEffect(() => {
    async function loadLiveNews() {
      try {
        const res = await apiService.fetchNews();
        const apiPosts = Array.isArray(res.data) ? res.data : (Array.isArray(res) ? res : []);
        if (apiPosts.length > 0) {
          const formatted = apiPosts.map(post => ({
            id: post.id,
            title: post.user?.name ? `Update from ${post.user.name}` : 'Official PPPI Announcement',
            category: 'Press Release',
            date: post.created_at ? new Date(post.created_at).toLocaleDateString() : 'Recent',
            author: post.user?.name || 'PPPI Press Bureau',
            image: (post.images && post.images.length > 0) ? post.images[0].image_url : 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80',
            summary: post.description || 'Latest political announcement from Pasha People Party of India.'
          }));
          setNewsList(formatted);
        }
      } catch (err) {
        console.warn('Failed to load news from API:', err);
      }
    }
    loadLiveNews();
  }, []);

  return (
    <section className="section-padding" id="news" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <i className="fa-solid fa-newspaper"></i>
            <span>MEDIA & PRESS DESK</span>
          </div>
          <h2 className="section-title">
            Latest News & <span className="gradient-text">Political Updates</span>
          </h2>
          <p className="section-subtitle">
            Official announcements, press releases, and media coverage from PPPI Central Secretariat.
          </p>
        </div>

        <div className="cards-grid-3">
          {newsList.map((item) => (
            <div key={item.id} className="news-card">
              <img src={item.image} alt={item.title} style={{ height: '220px', width: '100%', objectFit: 'cover' }} />
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-royal-blue)', background: 'rgba(30, 58, 138, 0.1)', padding: '0.2rem 0.65rem', borderRadius: 'var(--border-radius-full)' }}>
                    {item.category}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.date}</span>
                </div>

                <h3 style={{ fontSize: '1.15rem', color: 'var(--color-navy)', marginBottom: '0.75rem', lineHeight: '1.35' }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem', lineHeight: '1.6' }}>
                  {item.summary}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>By {item.author}</span>
                  <button className="btn btn-secondary btn-sm" onClick={() => setSelectedNews(item)}>
                    Read More <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Read Full Press Release Modal */}
        {selectedNews && (
          <div className="modal-backdrop" onClick={() => setSelectedNews(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={() => setSelectedNews(null)}>
                <i className="fa-solid fa-xmark"></i>
              </button>

              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-saffron-dark)', textTransform: 'uppercase' }}>
                {selectedNews.category} • {selectedNews.date}
              </span>

              <h3 style={{ fontSize: '1.4rem', margin: '0.5rem 0 1rem', color: 'var(--color-navy)' }}>
                {selectedNews.title}
              </h3>

              <img src={selectedNews.image} alt={selectedNews.title} style={{ borderRadius: 'var(--border-radius-md)', height: '260px', width: '100%', objectFit: 'cover', marginBottom: '1.25rem' }} />

              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                {selectedNews.summary} The Pasha People Party of India remains committed to transparent public communications. Members are encouraged to share official updates via the PPPI Connect app.
              </p>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button className="btn btn-secondary btn-sm" onClick={() => setSelectedNews(null)}>Close</button>
                <button className="btn btn-primary btn-sm" onClick={() => { setSelectedNews(null); setActivePage('news'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  View All News Articles
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
