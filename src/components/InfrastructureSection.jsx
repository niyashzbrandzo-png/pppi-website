import React from 'react';

export default function InfrastructureSection() {
  const techSpecs = [
    { title: 'Secure API', desc: 'RESTful architecture with request throttling, DDoS protection, and SSL validation.' },
    { title: 'JWT Authentication', desc: 'State-less cryptographic access tokens for mobile apps and web admin sessions.' },
    { title: 'Role Based Access Control', desc: 'Granular policy permissions isolating National Executive, State Chairs, and Members.' },
    { title: 'Railway Cloud Deployment', desc: 'Auto-scaling multi-region cloud deployment guaranteeing 99.99% uptime.' },
    { title: 'PostgreSQL Relational DB', desc: 'ACID-compliant transactional database storing member profiles and audit logs.' },
    { title: 'Scalable Architecture', desc: 'Microservices architecture optimized to handle over 100,000 concurrent requests.' },
  ];

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <i className="fa-solid fa-server"></i>
            <span>BACKEND INFRASTRUCTURE</span>
          </div>
          <h2 className="section-title">
            Enterprise Cloud <span className="gradient-text">Architecture & Security</span>
          </h2>
          <p className="section-subtitle">
            Engineered for high availability, transactional integrity, and zero data compromise.
          </p>
        </div>

        {/* Architecture Flow Visual Diagram */}
        <div className="arch-diagram" style={{ marginBottom: '3rem' }}>
          <div style={{ textAlign: 'center', fontWeight: 800, fontSize: '0.9rem', color: 'var(--color-saffron-dark)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '2rem' }}>
            SYSTEM END-TO-END DATA FLOW
          </div>

          <div className="flow-nodes">
            <div className="flow-node">
              <i className="fa-solid fa-mobile-screen" style={{ fontSize: '1.8rem', color: 'var(--color-royal-blue)', marginBottom: '0.5rem' }}></i>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Flutter Mobile App</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>iOS & Android</div>
            </div>

            <div className="flow-arrow"><i className="fa-solid fa-right-long"></i></div>

            <div className="flow-node">
              <i className="fa-solid fa-network-wired" style={{ fontSize: '1.8rem', color: 'var(--color-saffron-dark)', marginBottom: '0.5rem' }}></i>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>API Gateway</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>JWT & HTTPS</div>
            </div>

            <div className="flow-arrow"><i className="fa-solid fa-right-long"></i></div>

            <div className="flow-node">
              <i className="fa-brands fa-node-js" style={{ fontSize: '1.8rem', color: 'var(--color-green-dark)', marginBottom: '0.5rem' }}></i>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Node.js Backend</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Express Microservices</div>
            </div>

            <div className="flow-arrow"><i className="fa-solid fa-right-long"></i></div>

            <div className="flow-node">
              <i className="fa-solid fa-cloud-arrow-up" style={{ fontSize: '1.8rem', color: 'var(--color-royal-blue)', marginBottom: '0.5rem' }}></i>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Railway Cloud</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Containerized Hosting</div>
            </div>

            <div className="flow-arrow"><i className="fa-solid fa-right-long"></i></div>

            <div className="flow-node">
              <i className="fa-solid fa-database" style={{ fontSize: '1.8rem', color: '#0284C7', marginBottom: '0.5rem' }}></i>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>PostgreSQL DB</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Encrypted Storage</div>
            </div>

            <div className="flow-arrow"><i className="fa-solid fa-right-long"></i></div>

            <div className="flow-node">
              <i className="fa-solid fa-display" style={{ fontSize: '1.8rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}></i>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Admin Panel</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>React Management</div>
            </div>
          </div>
        </div>

        {/* Spec Bullet Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {techSpecs.map((spec, idx) => (
            <div key={idx} style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
              <h4 style={{ fontSize: '1.05rem', color: 'var(--color-navy)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <i className="fa-solid fa-shield-check" style={{ color: 'var(--color-green-dark)' }}></i>
                {spec.title}
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                {spec.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
