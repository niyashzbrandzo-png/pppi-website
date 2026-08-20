import React from 'react';

export default function AdminPortalSection() {
  const adminCapabilities = [
    { icon: 'fa-gauge-high', title: 'Secure Dashboard', desc: 'Real-time telemetry showing live registrations, state metrics, and engagement graphs.' },
    { icon: 'fa-users-gear', title: 'Member Management', desc: 'Verify KYC submissions, assign district leadership roles, and issue digital ID cards.' },
    { icon: 'fa-calendar-check', title: 'Event & Rally Hub', desc: 'Schedule district conclaves, track QR check-ins, and broadcast RSVP notifications.' },
    { icon: 'fa-receipt', title: 'Donation Ledger & Audits', desc: 'Automated 80G tax receipt generation, bank reconciliation, and transparent export reports.' },
    { icon: 'fa-chart-pie', title: 'Analytics & Polling', desc: 'Deep demographic survey insights to shape policy drafting according to citizen needs.' },
    { icon: 'fa-user-lock', title: 'Role-Based Access Control', desc: 'Strict permission scopes for National President, State Chairs, and District Clerks.' },
  ];

  return (
    <section className="section-padding">
      <div className="container">
        <div className="grid-2col">
          {/* Left Column: Admin Capabilities Content */}
          <div>
            <div className="section-badge">
              <i className="fa-solid fa-sliders"></i>
              <span>PPPI MANAGEMENT PORTAL</span>
            </div>

            <h2 className="section-title">
              Centralized Control & <span className="gradient-text">District Administration</span>
            </h2>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '2rem' }}>
              The PPPI Admin Portal gives national executive leaders and district coordinators an enterprise-grade web suite to manage thousands of members with ironclad data security.
            </p>

            <div className="form-row-2col">
              {adminCapabilities.map((item, i) => (
                <div key={i} style={{ background: 'var(--bg-secondary)', padding: '1rem 1.25rem', borderRadius: 'var(--border-radius-md)', border: '1px solid var(--border-color)' }}>
                  <div style={{ color: 'var(--color-royal-blue)', fontSize: '1.2rem', marginBottom: '0.4rem' }}>
                    <i className={`fa-solid ${item.icon}`}></i>
                  </div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.2rem' }}>{item.title}</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Laptop Mockup */}
          <div style={{ position: 'relative' }}>
            <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: 'var(--border-radius-lg)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-color)' }}>
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80"
                alt="PPPI Executive Management Dashboard Laptop Interface"
                style={{ borderRadius: 'var(--border-radius-md)', width: '100%', height: '380px', objectFit: 'cover' }}
              />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem', padding: '0 0.5rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-navy)' }}>
                  <i className="fa-solid fa-lock" style={{ color: 'var(--color-green-dark)' }}></i> 256-Bit SSL Encrypted Admin Portal
                </span>
                <span style={{ fontSize: '0.8rem', background: 'rgba(30,58,138,0.1)', color: 'var(--color-royal-blue)', padding: '0.25rem 0.75rem', borderRadius: 'var(--border-radius-full)', fontWeight: 600 }}>
                  v2.4 Production
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
