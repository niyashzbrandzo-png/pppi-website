import React, { useState } from 'react';
import { testimonialsData } from '../data/websiteData';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const current = testimonialsData[currentIndex];

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <i className="fa-solid fa-comments"></i>
            <span>VOICES OF THE PEOPLE</span>
          </div>
          <h2 className="section-title">
            What Members & <span className="gradient-text">Leaders Say</span>
          </h2>
          <p className="section-subtitle">
            Hear directly from citizens, district coordinators, and youth volunteers across India.
          </p>
        </div>

        <div className="testimonial-card">
          <img src={current.avatar} alt={current.name} className="testimonial-avatar" />
          <div style={{ color: 'var(--color-saffron-dark)', fontSize: '1.2rem', marginBottom: '1rem' }}>
            <i className="fa-solid fa-quote-left"></i>
          </div>
          <p style={{ fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--text-primary)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            "{current.content}"
          </p>
          <h4 style={{ fontSize: '1.1rem', color: 'var(--color-navy)', marginBottom: '0.2rem' }}>{current.name}</h4>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>{current.role}</div>

          {/* Controls */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
            <button className="btn btn-secondary btn-sm" onClick={prevTestimonial} style={{ width: '40px', height: '40px', padding: 0, borderRadius: '50%' }}>
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <button className="btn btn-secondary btn-sm" onClick={nextTestimonial} style={{ width: '40px', height: '40px', padding: 0, borderRadius: '50%' }}>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
