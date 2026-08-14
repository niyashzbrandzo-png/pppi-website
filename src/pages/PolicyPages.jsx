import React from 'react';

export function PrivacyPolicyPage() {
  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '5rem' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <h1 className="section-title">Privacy Policy</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Effective Date: August 13, 2026</p>

        <div style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
          <h3>1. Data Collection & Purpose</h3>
          <p style={{ marginBottom: '1rem' }}>
            Pasha People Party of India (PPPI CONNECT) collects user information including full name, mobile number, email address, state, and district strictly for identity verification, digital membership card generation, and official communication.
          </p>

          <h3>2. Security & Encryption</h3>
          <p style={{ marginBottom: '1rem' }}>
            All user data transmitted to `https://api.pppiconnect.com` is protected using end-to-end 256-bit SSL encryption. We do not sell or monetize personal member data with commercial advertising entities.
          </p>

          <h3>3. Member Control</h3>
          <p style={{ marginBottom: '1rem' }}>
            Members retain the right to update or delete their digital profile data at any time via the PPPI Connect Mobile App settings or by contacting `helpdesk@pppiconnect.com`.
          </p>
        </div>
      </div>
    </div>
  );
}

export function TermsPage() {
  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '5rem' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <h1 className="section-title">Terms & Conditions</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Effective Date: August 13, 2026</p>

        <div style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
          <h3>1. Code of Conduct</h3>
          <p style={{ marginBottom: '1rem' }}>
            By registering as a member on PPPI CONNECT, you agree to adhere to constitutional democratic principles, maintain civil discourse, and avoid hate speech or unlawful conduct.
          </p>

          <h3>2. Digital Membership Cards</h3>
          <p style={{ marginBottom: '1rem' }}>
            Digital ID cards generated via the platform are personal identity badges for official party conventions and check-ins. Unauthorized tampering or forgery of cryptographic QR badges is prohibited.
          </p>
        </div>
      </div>
    </div>
  );
}

export function RefundPolicyPage() {
  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '5rem' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <h1 className="section-title">Refund & Contribution Policy</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Effective Date: August 13, 2026</p>

        <div style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
          <h3>1. Political Donations</h3>
          <p style={{ marginBottom: '1rem' }}>
            Voluntary financial contributions made to Pasha People Party of India are non-refundable political contributions utilized for public welfare and organizational activities as per Election Commission of India guidelines.
          </p>

          <h3>2. Event Passes</h3>
          <p style={{ marginBottom: '1rem' }}>
            For paid tickets to specialized leadership summits, refund requests may be submitted up to 48 hours prior to event commencement by emailing `contact@pppiconnect.com`.
          </p>
        </div>
      </div>
    </div>
  );
}
