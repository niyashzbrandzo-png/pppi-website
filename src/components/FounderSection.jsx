import React from 'react';
import { founderData } from '../data/websiteData';

export default function FounderSection({ setActivePage }) {
  return (
    <section className="section-padding" id="founder">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <i className="fa-solid fa-user-tie"></i>
            <span>FOUNDER'S LEADERSHIP</span>
          </div>
          <h2 className="section-title">
            Meet Our <span className="gradient-text">Founder & President</span>
          </h2>
          <p className="section-subtitle">
            Championing digital democracy, transparent governance, and grassroots empowerment across India.
          </p>
        </div>

        <div className="founder-card-wrapper">
          <div className="founder-grid">
            {/* Left Image Column */}
            <div className="founder-image-wrap">
              <img src={founderData.portrait} alt={founderData.name} />
              <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(8px)', color: '#FFFFFF', padding: '0.85rem 1.25rem', borderRadius: 'var(--border-radius-sm)' }}>
                <div style={{ fontWeight: 800, fontSize: '1.1rem', color: '#FF9933' }}>{founderData.name}</div>
                <div style={{ fontSize: '0.8rem' }}>{founderData.designation}</div>
              </div>
            </div>

            {/* Right Biography Column */}
            <div className="founder-content">
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-saffron-dark)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                NATIONAL EXECUTIVE ADDRESS
              </span>

              <h3 style={{ fontSize: '2rem', marginTop: '0.5rem', marginBottom: '1rem', color: 'var(--color-navy)' }}>
                {founderData.name}
              </h3>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: '1.7' }}>
                {founderData.bio}
              </p>

              {/* Inspiring Quote */}
              <blockquote className="founder-quote">
                {founderData.quote}
              </blockquote>

              {/* Key Milestone Timeline */}
              <h4 style={{ fontSize: '1.05rem', marginTop: '1rem', color: 'var(--color-navy)' }}>Key Milestones & Impact</h4>
              <div className="founder-timeline">
                {founderData.achievements.map((item, idx) => (
                  <div key={idx} className="timeline-item">
                    <div className="timeline-year">{item.year}</div>
                    <div className="timeline-title">{item.title}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{item.desc}</div>
                  </div>
                ))}
              </div>

              {/* Social Links & Contact CTA */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <a href={founderData.socials.linkedin} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm" style={{ width: '40px', height: '40px', padding: 0, borderRadius: '50%' }}>
                    <i className="fa-brands fa-linkedin-in"></i>
                  </a>
                  <a href={founderData.socials.facebook} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm" style={{ width: '40px', height: '40px', padding: 0, borderRadius: '50%' }}>
                    <i className="fa-brands fa-facebook-f"></i>
                  </a>
                  <a href={founderData.socials.twitter} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm" style={{ width: '40px', height: '40px', padding: 0, borderRadius: '50%' }}>
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                  <a href={founderData.socials.instagram} target="_blank" rel="noreferrer" className="btn btn-secondary btn-sm" style={{ width: '40px', height: '40px', padding: 0, borderRadius: '50%' }}>
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </div>

                <button className="btn btn-primary btn-sm" onClick={() => { setActivePage('founder'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  <i className="fa-solid fa-file-invoice"></i> Read Full Presidential Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
