import React from 'react';
import MembershipPlans from '../components/MembershipPlans';

export default function MembershipPage({ openMembershipModal }) {
  return (
    <div style={{ paddingTop: '6rem' }}>
      <div style={{ background: 'var(--accent-gradient)', color: '#FFFFFF', padding: '4rem 0 3rem', textAlign: 'center' }}>
        <div className="container">
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FF9933', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            DIGITAL IDENTITY TIERS
          </span>
          <h1 style={{ fontSize: '3rem', color: '#FFFFFF', margin: '0.5rem 0 1rem' }}>
            PPPI Membership Plans
          </h1>
          <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', opacity: 0.9 }}>
            Join as a Free Member or upgrade to Silver, Gold, Diamond, or Platinum tiers with customized Digital ID cards.
          </p>
        </div>
      </div>

      <MembershipPlans openMembershipModal={openMembershipModal} />
    </div>
  );
}
