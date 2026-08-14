import React from 'react';
import { whyChooseFeatures } from '../data/websiteData';

export default function WhyChooseSection() {
  return (
    <section className="section-padding">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <i className="fa-solid fa-gem"></i>
            <span>WHY PPPI CONNECT</span>
          </div>
          <h2 className="section-title">
            Reinventing Political <span className="gradient-text">Participation & Trust</span>
          </h2>
          <p className="section-subtitle">
            Built on cutting-edge software architecture to give every citizen a direct, secure voice in governance.
          </p>
        </div>

        <div className="features-grid-3">
          {whyChooseFeatures.map((item, idx) => (
            <div key={idx} className="feature-card">
              <div className="feature-icon-box">
                <i className={`fa-solid ${item.icon}`}></i>
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--color-navy)' }}>
                {item.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
