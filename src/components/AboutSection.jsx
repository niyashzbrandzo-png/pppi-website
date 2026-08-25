import React from 'react';
import { siteMetadata, founderData } from '../data/websiteData';

export default function AboutSection({ setActivePage }) {
  const coreValues = [
    { icon: 'fa-dove', title: 'Universal Peace & Non-Violence', desc: 'Integration through love and affection, never by war. Uniting citizens across all religions and borders.' },
    { icon: 'fa-book-open', title: 'Wisdom & Free Education', desc: '"Nahi Jnaanena Sadrsham Pavithram Iha Vidyathe" — Wisdom is the highest holiness, standardizing 10+2 schooling.' },
    { icon: 'fa-shield-halved', title: 'Righteous Governance', desc: '"Save the mild and tame the wild — Dhushta Shikshana, Shishta Rakshana" — Protecting the innocent and eliminating crime.' },
    { icon: 'fa-laptop-code', title: 'Digital E-Governance', desc: 'Eliminating red tape through automated paperless civic workflows, online membership, and open public ledgers.' },
    { icon: 'fa-person-dress', title: 'Women Safety & Equality', desc: 'Daytime shift guarantees, financial autonomy, and equal executive leadership representation.' },
    { icon: 'fa-tractor', title: 'Agrarian Justice & Welfare', desc: 'Direct cultivable land grants to farmers, free drinking water rights, and zero-tax basic essentials.' },
  ];

  return (
    <section className="section-padding" id="about" style={{ backgroundColor: 'var(--bg-secondary)' }} aria-label="About PPPI">
      <div className="container">
        <div className="grid-2col">
          {/* Left Column: Organization Image */}
          <div style={{ position: 'relative' }}>
            <img
              src="/images/gallery/pppi_gallery_stage_assembly.jpg"
              alt="Pasha People Party of India (PPPI) State Committee and Grassroots Organizers"
              className="image-rounded-shadow"
              style={{ maxHeight: '560px', width: '100%', objectFit: 'cover' }}
              loading="lazy"
              decoding="async"
              width="1000"
              height="667"
            />
            <div className="about-founded-badge">
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: '800', color: 'var(--color-saffron)' }}>PPPI</div>
              <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>For Peace, Prosperity & Power</div>
            </div>
          </div>

          {/* Right Column: Content */}
          <div>
            <div className="section-badge">
              <i className="fa-solid fa-landmark" aria-hidden="true"></i>
              <span>ABOUT PASHA PEOPLE PARTY OF INDIA</span>
            </div>

            <h2 className="section-title">
              Pioneering Ethical Governance & <span className="gradient-text">Universal Brotherhood</span>
            </h2>

            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem', fontSize: '1.02rem', lineHeight: '1.7' }}>
              Founded by <strong>Dr. B. Pasha (Dr. Pasha Pasha)</strong> with headquarters in <strong>Hosur, Tamil Nadu</strong>, the Pasha People Party of India (PPPI) is built on a sacred commitment: to unite people through love, protect human dignity, eradicate corruption, and empower every citizen through digital transparency.
            </p>

            <div className="form-row-2col" style={{ marginBottom: '1.75rem' }}>
              <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color)' }}>
                <h3 style={{ color: 'var(--color-royal-blue)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.05rem' }}>
                  <i className="fa-solid fa-bullseye" style={{ color: 'var(--color-saffron-dark)' }} aria-hidden="true"></i> Our Mission
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  To establish eternal peace, prosperity, and zero unemployment for all citizens through our 15-Point Policy Charter, direct grievance tracking, and transparent governance.
                </p>
              </div>

              <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color)' }}>
                <h3 style={{ color: 'var(--color-royal-blue)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.05rem' }}>
                  <i className="fa-solid fa-compass" style={{ color: 'var(--color-green-dark)' }} aria-hidden="true"></i> Our Philosophy
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  <em>"Save the mild and tame the wild"</em> — Defending the innocent, ensuring free drinking water, time-bound 90-day justice, and equal opportunity for every Indian.
                </p>
              </div>
            </div>

            {/* Core Values Grid */}
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.85rem', color: 'var(--color-navy)' }}>Core Pillars of Our Charter</h3>
            <div className="values-grid">
              {coreValues.map((v, i) => (
                <div key={i} className="value-card">
                  <div className="value-icon" aria-hidden="true">
                    <i className={`fa-solid ${v.icon}`}></i>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.92rem', fontWeight: '700', marginBottom: '0.2rem' }}>{v.title}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '1.75rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                className="btn btn-primary"
                onClick={() => { setActivePage('founder'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                aria-label="Read Dr. Pasha's Official Preamble"
              >
                <i className="fa-solid fa-scroll"></i> Read Official Preamble
              </button>
              <button
                className="btn btn-outline"
                onClick={() => { setActivePage('manifesto'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                aria-label="Read PPPI 15-Point Policy Manifesto"
              >
                15-Point Manifesto <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
