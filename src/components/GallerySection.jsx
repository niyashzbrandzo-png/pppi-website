import React, { useState, useEffect } from 'react';
import { galleryData } from '../data/websiteData';
import { apiService } from '../services/api';

export default function GallerySection({ openLightbox }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [galleryItems, setGalleryItems] = useState(galleryData);

  useEffect(() => {
    async function loadLiveGallery() {
      try {
        const res = await apiService.fetchGallery();
        const apiData = Array.isArray(res.data) ? res.data : (Array.isArray(res) ? res : []);
        if (apiData.length > 0) {
          const formatted = apiData.map(item => ({
            id: item.id,
            title: item.title,
            category: item.category || 'Events',
            image: item.image_url,
            description: item.description
          }));
          setGalleryItems(formatted);
        }
      } catch (err) {
        console.warn('Failed to load gallery from API:', err);
      }
    }
    loadLiveGallery();
  }, []);

  const categories = ['All', 'Events', 'Political Events', 'Community Service', 'Meetings', 'Volunteers', 'Campaigns'];

  const filteredGallery = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section className="section-padding" id="gallery">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <i className="fa-solid fa-images"></i>
            <span>MEDIA ARCHIVE</span>
          </div>
          <h2 className="section-title">
            Photo Gallery & <span className="gradient-text">Ground Action</span>
          </h2>
          <p className="section-subtitle">
            Visual highlights of public rallies, volunteer initiatives, and executive council meetings.
          </p>

          <div className="filter-tabs" style={{ marginTop: '1.5rem' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="gallery-grid">
          {filteredGallery.map((item) => (
            <div key={item.id} className="gallery-item" onClick={() => openLightbox(item)}>
              <img src={item.image} alt={item.title} />
              <div className="gallery-overlay">
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-saffron)' }}>{item.category}</span>
                <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>{item.title}</h4>
                <div style={{ fontSize: '0.8rem', marginTop: '0.25rem' }}>
                  <i className="fa-solid fa-expand"></i> Click to Enlarge
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
