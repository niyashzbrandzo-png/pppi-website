import React from 'react';
import { founderData, siteMetadata } from '../data/websiteData';

export default function FounderSection({ setActivePage }) {
  return (
    <section className="section-padding" id="founder" aria-label="Founder Presidential Profile and Preamble">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <i className="fa-solid fa-user-tie" aria-hidden="true"></i>
            <span>FOUNDER & NATIONAL PRESIDENT</span>
          </div>
          <h2 className="section-title">
            Mr. B S Vahid Pasha's <span className="gradient-text">Vision & Preamble</span>
          </h2>
          <p className="section-subtitle">
            Pioneering peace, universal brotherhood, ethical governance, and grassroots empowerment across India from Dalasanur, Srinivaspur Taluk, Kolar District, Karnataka.
          </p>
        </div>

        <div className="founder-card-wrapper">
          <div className="founder-grid">
            {/* Left Image Column */}
            <div className="founder-image-wrap">
              <img
                src={founderData.portrait}
                alt="Mr. B S Vahid Pasha - Founder & National President of Pasha People Party of India"
                loading="lazy"
                decoding="async"
                width="800"
                height="800"
                style={{ objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', background: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(8px)', color: '#FFFFFF', padding: '0.85rem 1.25rem', borderRadius: 'var(--border-radius-sm)', border: '1px solid rgba(255, 153, 51, 0.4)' }}>
                <div style={{ fontWeight: 800, fontSize: '1.15rem', color: '#FF9933' }}>{founderData.name}</div>
                <div style={{ fontSize: '0.82rem', opacity: 0.9 }}>{founderData.designation}</div>
                <div style={{ fontSize: '0.75rem', color: '#38BDF8', marginTop: '0.2rem' }}>Dalasanur, Srinivaspur, Kolar, Karnataka</div>
              </div>
            </div>

            {/* Right Biography Column */}
            <div className="founder-content">
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-saffron-dark)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                NATIONAL PRESIDENTIAL CHARTER
              </span>

              <h3 style={{ fontSize: '1.85rem', marginTop: '0.5rem', marginBottom: '0.75rem', color: 'var(--color-navy)' }}>
                {founderData.name}
              </h3>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.96rem', lineHeight: '1.7', marginBottom: '1rem' }}>
                {founderData.bio}
              </p>

              {/* Inspiring Quote Banner */}
              <blockquote className="founder-quote" style={{ fontStyle: 'italic', borderLeft: '4px solid #FF9933', paddingLeft: '1rem', margin: '1rem 0' }}>
                {founderData.quote}
              </blockquote>

              {/* Preamble Highlights Box */}
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-md)', padding: '1.25rem', margin: '1.25rem 0' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-royal-blue)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <i className="fa-solid fa-scale-balanced" style={{ color: '#FF9933' }} aria-hidden="true"></i>
                  PPPI Official Preamble Core Principles
                </h4>
                <ul style={{ paddingLeft: '1.2rem', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li><strong>Sacred Right to Live:</strong> Every living being has an inherent right to live peacefully on this planet without harm.</li>
                  <li><strong>Peace Over War:</strong> Universal integration must be established solely by love, affection, and brotherhood beyond all borders and religions.</li>
                  <li><strong>Wisdom & Education:</strong> <em>"Nahi Jnaanena Sadrsham Pavithram Iha Vidyathe"</em> — Education and wisdom are the highest holiness.</li>
                  <li><strong>Moral Protection:</strong> <em>"Save the mild and tame the wild — Dhushta Shikshana, Shishta Rakshana"</em> — Defend the righteous and punish the wicked.</li>
                </ul>
              </div>

              {/* Central Secretariat Direct Contact */}
              <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '1rem 0' }}>
                <div><i className="fa-solid fa-location-dot" style={{ color: '#FF9933' }} aria-hidden="true"></i> {siteMetadata.headquarters}</div>
                <div><i className="fa-solid fa-phone" style={{ color: '#16A34A' }} aria-hidden="true"></i> <a href="tel:+917259798393" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 700 }}>+91 7259798393</a></div>
                <div><i className="fa-solid fa-envelope" style={{ color: '#2563EB' }} aria-hidden="true"></i> <a href="mailto:bpasha46@gmail.com" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 700 }}>bpasha46@gmail.com</a></div>
              </div>

              {/* Social Links & Contact CTA */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem' }} aria-label="Mr. B S Vahid Pasha Social Channels">
                  <a
                    href="mailto:bpasha46@gmail.com"
                    className="btn btn-secondary btn-sm"
                    style={{ width: '40px', height: '40px', padding: 0, borderRadius: '50%' }}
                    aria-label="Email Mr. B S Vahid Pasha"
                  >
                    <i className="fa-solid fa-envelope" aria-hidden="true"></i>
                  </a>
                  <a
                    href="tel:+917259798393"
                    className="btn btn-secondary btn-sm"
                    style={{ width: '40px', height: '40px', padding: 0, borderRadius: '50%' }}
                    aria-label="Call Mr. B S Vahid Pasha"
                  >
                    <i className="fa-solid fa-phone" aria-hidden="true"></i>
                  </a>
                  <a
                    href={founderData.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                    style={{ width: '40px', height: '40px', padding: 0, borderRadius: '50%' }}
                    aria-label="Mr. B S Vahid Pasha Twitter"
                  >
                    <i className="fa-brands fa-twitter" aria-hidden="true"></i>
                  </a>
                  <a
                    href={founderData.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                    style={{ width: '40px', height: '40px', padding: 0, borderRadius: '50%' }}
                    aria-label="Mr. B S Vahid Pasha Facebook"
                  >
                    <i className="fa-brands fa-facebook-f" aria-hidden="true"></i>
                  </a>
                </div>

                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => { setActivePage('founder'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  aria-label="Read Full Preamble & Presidential Profile"
                >
                  <i className="fa-solid fa-book-bookmark" aria-hidden="true"></i> Read Full Preamble & Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
