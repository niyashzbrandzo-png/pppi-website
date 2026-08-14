import React, { useState } from 'react';
import { galleryData } from '../data/websiteData';

export default function GallerySection({ openLightbox }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Political Events', 'Community Service', 'Meetings', 'Volunteers', 'Campaigns'];

  const filteredGallery = activeCategory === 'All'
    ? galleryData
    : galleryData.filter((item) => item.category === activeCategory);

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
