import React from 'react';
import FounderSection from '../components/FounderSection';
import { founderData, siteMetadata } from '../data/websiteData';

export default function FounderPage({ setActivePage }) {
  return (
    <div style={{ paddingTop: '6rem' }}>
      {/* Header Banner */}
      <div style={{ background: 'var(--accent-gradient)', color: '#FFFFFF', padding: '4rem 0 3rem', textAlign: 'center' }}>
        <div className="container">
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FF9933', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            FOUNDER & NATIONAL PRESIDENT • PASHA PEOPLE PARTY OF INDIA
          </span>
          <h1 style={{ fontSize: '3rem', color: '#FFFFFF', margin: '0.5rem 0 1rem' }}>
            {founderData.name}
          </h1>
          <p style={{ maxWidth: '780px', margin: '0 auto', fontSize: '1.1rem', opacity: 0.9 }}>
            Presidential Vision, Official Party Preamble, and Guiding Philosophy for Peace, Prosperity, and Power.
          </p>
        </div>
      </div>

      {/* Main Founder Section */}
      <FounderSection setActivePage={setActivePage} />

      {/* Dedicated Full Official Preamble Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-primary)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🍍</div>
            <div className="section-badge" style={{ margin: '0 auto 0.75rem' }}>
              <i className="fa-solid fa-scroll"></i>
              <span>OFFICIAL CHARTER</span>
            </div>
            <h2 className="section-title">
              THE <span className="gradient-text">PREAMBLE</span>
            </h2>
            <p className="section-subtitle">
              Pasha People Party of India — Founded by Mr. B S Vahid Pasha
            </p>
          </div>

          <div style={{ background: 'var(--bg-secondary)', border: '2px solid rgba(255, 153, 51, 0.3)', borderRadius: 'var(--border-radius-lg)', padding: '2.5rem', boxShadow: 'var(--shadow-md)', lineHeight: '1.85', color: 'var(--text-primary)', fontSize: '1.05rem' }}>
            <p style={{ marginBottom: '1.5rem', textIndent: '1.5rem', textAlign: 'justify' }}>
              Each living being has a right to live on this earth unless it causes harm to someone or others. Beyond the mere survival of the fittest and a struggle for existence, it is the sacred responsibility of each and every one to protect the peace and the prosperity of the planet for offspring as a whole, and hence unity and peace must be established on earth as our ultimate destination.
            </p>

            <p style={{ marginBottom: '1.5rem', textIndent: '1.5rem', textAlign: 'justify' }}>
              The universal integration and peace must be established by love and affection, never by war. War is not the solution to resolve any obstacles that occur on earth in the path of integration and peace. Seeding brotherhood between all religions and among all people beyond borders ought to become everyone's motto.
            </p>

            <div style={{ background: '#FFFFFF', borderLeft: '4px solid var(--color-royal-blue)', padding: '1.25rem 1.5rem', margin: '1.5rem 0', borderRadius: 'var(--border-radius-sm)', fontStyle: 'italic' }}>
              <p style={{ fontWeight: '700', color: 'var(--color-navy)', fontSize: '1.1rem', marginBottom: '0.3rem' }}>
                "Nahi Jnaanena Sadrsham Pavithram Iha Vidyathe" (न हि ज्ञानेन सदृशं पवित्रमिह विद्यते)
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                — Unless wisdom finds the ultimate truth, providing true education is the highest holiness.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', borderLeft: '4px solid #16A34A', padding: '1.25rem 1.5rem', margin: '1.5rem 0', borderRadius: 'var(--border-radius-sm)', fontStyle: 'italic' }}>
              <p style={{ fontWeight: '700', color: 'var(--color-navy)', fontSize: '1.1rem', marginBottom: '0.3rem' }}>
                "Save the mild and tame the wild — Dhushta Shikshana, Shishta Rakshana" (दुष्ट शिक्षण, शिष्ट रक्षण)
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                — Punish the wicked and protect the righteous. Peace and prosperity must evolve on this earth as final forever.
              </p>
            </div>

            {/* Official Party Footnote Box */}
            <div style={{ marginTop: '2rem', borderTop: '1px dashed var(--border-color)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <div>
                <strong style={{ color: 'var(--color-navy)' }}>Headquarters:</strong> {siteMetadata.headquarters}
              </div>
              <div style={{ display: 'flex', gap: '1.25rem' }}>
                <span><i className="fa-solid fa-phone" style={{ color: '#16A34A' }}></i> {siteMetadata.helpline}</span>
                <span><i className="fa-solid fa-envelope" style={{ color: '#2563EB' }}></i> {siteMetadata.contactEmail}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
