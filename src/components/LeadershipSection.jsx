import React, { useState } from 'react';
import { leadershipTeam } from '../data/websiteData';

export default function LeadershipSection({ setActivePage }) {
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', 'National Executive', 'State Coordinators', 'District Coordinators'];

  const filteredTeam = filterCategory === 'All'
    ? leadershipTeam
    : leadershipTeam.filter((m) => m.category === filterCategory);

  return (
    <section className="section-padding" id="leadership" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <i className="fa-solid fa-users"></i>
            <span>EXECUTIVE GOVERNANCE</span>
          </div>
          <h2 className="section-title">
            Our National & <span className="gradient-text">District Leadership</span>
          </h2>
          <p className="section-subtitle">
            Dedicated administrative leaders and grassroots coordinators steering PPPI's digital transformation.
          </p>

          {/* Filter Buttons */}
          <div className="filter-tabs" style={{ marginTop: '1.5rem' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${filterCategory === cat ? 'active' : ''}`}
                onClick={() => setFilterCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="cards-grid-3">
          {filteredTeam.map((member) => (
            <div key={member.id} className="leader-card">
              <img src={member.image} alt={member.name} className="leader-image" />
              <div className="leader-info">
                <div className="leader-role">{member.role}</div>
                <h3 className="leader-name">{member.name}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                  {member.bio}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    <i className="fa-solid fa-location-dot" style={{ color: 'var(--color-saffron-dark)' }}></i> Verified Officer
                  </span>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => { setActivePage('leadership'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  >
                    View Directory
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
