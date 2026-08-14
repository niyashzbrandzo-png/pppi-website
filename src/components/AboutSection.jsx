import React from 'react';

export default function AboutSection({ setActivePage }) {
  const coreValues = [
    { icon: 'fa-laptop-code', title: 'Digital Transformation', desc: 'Eliminating red tape through automated paperless civic workflows and e-governance.' },
    { icon: 'fa-eye', title: '100% Transparency', desc: 'Audited open fund ledgers, public policy drafts, and verified membership credentials.' },
    { icon: 'fa-user-astronaut', title: 'Youth Empowerment', desc: 'Mentoring next-generation leaders with legislative councils and startup incubators.' },
    { icon: 'fa-person-dress', title: 'Women Safety & Leadership', desc: 'Guaranteeing equal representation, safety patrol tech, and financial autonomy.' },
    { icon: 'fa-hand-holding-heart', title: 'Social Development', desc: 'Delivering healthcare, clean water, and agricultural subsidies directly to citizens.' },
    { icon: 'fa-users-gear', title: 'Public Participation', desc: 'Direct referendum polling on major policy decisions via the PPPI Connect app.' },
  ];

  return (
    <section className="section-padding" id="about" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="grid-2col">
          {/* Left Column: Organization Image */}
          <div style={{ position: 'relative' }}>
            <img
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=80"
              alt="PPPI Organization Assembly"
              className="image-rounded-shadow"
              style={{ maxHeight: '560px' }}
            />
            <div style={{ position: 'absolute', bottom: '-1.5rem', right: '-1.5rem', background: 'var(--color-navy)', color: '#FFFFFF', padding: '1.5rem 2rem', borderRadius: 'var(--border-radius-md)', boxShadow: 'var(--shadow-lg)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: '800', color: 'var(--color-saffron)' }}>2024</div>
              <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Founded for Modern India</div>
            </div>
          </div>

          {/* Right Column: Content */}
          <div>
            <div className="section-badge">
              <i className="fa-solid fa-landmark"></i>
              <span>ABOUT PPPI CONNECT</span>
            </div>

            <h2 className="section-title">
              Pioneering Tech-Driven <span className="gradient-text">Democracy & Governance</span>
            </h2>

            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1.05rem' }}>
              Pasha People Party of India (PPPI) was established with a bold mission: to bridge the gap between Indian citizens and political governance through modern digital technology, unyielding transparency, and inclusive social development.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '2rem' }}>
              <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color)' }}>
                <h4 style={{ color: 'var(--color-royal-blue)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <i className="fa-solid fa-bullseye" style={{ color: 'var(--color-saffron-dark)' }}></i> Our Mission
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  To empower every Indian citizen with digital tools to actively shape legislative policies, report local grievances, and elect transparent leaders.
                </p>
              </div>

              <div style={{ background: '#FFFFFF', padding: '1.25rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color)' }}>
                <h4 style={{ color: 'var(--color-royal-blue)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <i className="fa-solid fa-compass" style={{ color: 'var(--color-green-dark)' }}></i> Our Vision
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  A prosperous, corruption-free India driven by youth innovation, agrarian strength, world-class education, and equal opportunity for all.
                </p>
              </div>
            </div>

            {/* Core Values Grid */}
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--color-navy)' }}>Core Pillars & Values</h3>
            <div className="values-grid">
              {coreValues.map((v, i) => (
                <div key={i} className="value-card">
                  <div className="value-icon">
                    <i className={`fa-solid ${v.icon}`}></i>
                  </div>
                  <div>
                    <h5 style={{ fontSize: '0.95rem', fontWeight: '700', marginBottom: '0.2rem' }}>{v.title}</h5>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '2rem' }}>
              <button className="btn btn-outline" onClick={() => { setActivePage('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                Learn More About Our Charter <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
