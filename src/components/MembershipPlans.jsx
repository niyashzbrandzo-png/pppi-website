import React, { useState, useEffect } from 'react';
import { membershipPlans } from '../data/websiteData';
import { apiService } from '../services/api';

export default function MembershipPlans({ openMembershipModal }) {
  const [plans, setPlans] = useState(membershipPlans);

  useEffect(() => {
    async function loadLivePlans() {
      try {
        const res = await apiService.fetchPlans();
        const apiData = Array.isArray(res.data) ? res.data : (Array.isArray(res) ? res : []);
        if (apiData.length > 0) {
          const formatted = apiData.map(plan => ({
            id: plan.id,
            name: plan.plan_name,
            price: Number(plan.price) === 0 || plan.is_free ? '₹0' : `₹${plan.price}`,
            period: 'per year',
            popular: plan.is_popular || false,
            color: plan.is_popular ? '#D97706' : '#0284C7',
            features: Array.isArray(plan.plan_benefits)
              ? plan.plan_benefits.map(b => b.benefit)
              : ['Digital Membership Card', 'Community Forum Access', 'Party News Updates']
          }));
          setPlans(formatted);
        }
      } catch (err) {
        console.warn('Failed to load plans from API:', err);
      }
    }
    loadLivePlans();
  }, []);

  return (
    <section className="section-padding" id="membership">
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <i className="fa-solid fa-id-card"></i>
            <span>MEMBERSHIP TIERS</span>
          </div>
          <h2 className="section-title">
            Choose Your <span className="gradient-text">Membership Tier</span>
          </h2>
          <p className="section-subtitle">
            Join thousands of active citizens shaping India's future. Digital QR cards included with every tier.
          </p>
        </div>

        <div className="pricing-grid">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`pricing-card ${plan.popular ? 'popular' : ''}`}
            >
              {plan.popular && <div className="popular-badge">Most Popular</div>}

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: plan.color }}></div>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--color-navy)' }}>{plan.name}</h3>
              </div>

              <div className="price-tag">
                {plan.price}
                <span className="price-period"> / {plan.period}</span>
              </div>

              <div className="pricing-features">
                {plan.features.map((feat, i) => (
                  <div key={i} className="pricing-feature-item">
                    <i className="fa-solid fa-circle-check"></i>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <button
                className={`btn ${plan.popular ? 'btn-saffron' : 'btn-primary'} btn-block`}
                onClick={() => openMembershipModal(plan.name)}
              >
                Join {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
