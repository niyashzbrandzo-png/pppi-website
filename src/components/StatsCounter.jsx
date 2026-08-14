import React, { useState, useEffect } from 'react';
import { statsData } from '../data/websiteData';

export default function StatsCounter() {
  const [counts, setCounts] = useState(statsData.map(() => 0));

  useEffect(() => {
    const duration = 2000; // 2 seconds animation
    const steps = 50;
    const intervalTime = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCounts(
        statsData.map((item) => Math.min(item.count, Math.floor((item.count / steps) * step)))
      );
      if (step >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {statsData.map((item, idx) => (
            <div key={item.id} className="stat-card">
              <div className="stat-number">
                {counts[idx].toLocaleString()}{item.suffix}
              </div>
              <div className="stat-label">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
