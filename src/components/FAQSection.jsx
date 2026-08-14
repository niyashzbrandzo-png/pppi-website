import React, { useState } from 'react';
import { faqsData, faqCategories } from '../data/websiteData';

export default function FAQSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openId, setOpenId] = useState(1);

  const filteredFaqs = activeCategory === 'All'
    ? faqsData
    : faqsData.filter((faq) => faq.category === activeCategory);

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="section-padding" id="faq">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <i className="fa-solid fa-circle-question"></i>
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="section-title">
            Everything You Need <span className="gradient-text">To Know</span>
          </h2>
          <p className="section-subtitle">
            Comprehensive answers regarding party membership, donations, mobile app usage, and legal compliance.
          </p>

          <div className="filter-tabs" style={{ marginTop: '1.5rem' }}>
            {faqCategories.map((cat) => (
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

        <div className="faq-accordion">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="faq-item">
                <button className="faq-question" onClick={() => toggleFaq(faq.id)}>
                  <span>{faq.question}</span>
                  <i className={`fa-solid ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`} style={{ color: 'var(--color-royal-blue)' }}></i>
                </button>
                {isOpen && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'inline-block', marginTop: '0.5rem', background: 'var(--bg-secondary)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                      Category: {faq.category}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
