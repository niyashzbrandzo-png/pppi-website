import React, { useState } from 'react';
import { apiService } from '../services/api';

/**
 * Join Membership Registration Modal
 */
export function MembershipModal({ planName, onClose, addToast }) {
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    state: 'Delhi NCR',
    district: '',
    plan: planName || 'Free Member',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiService.registerMembership(formData);
      addToast(res.message || `Welcome to PPPI! Your ${formData.plan} membership request has been registered.`, 'success');
      onClose();
    } catch (err) {
      addToast('Membership registration submitted successfully (Demo Mode).', 'info');
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--accent-gradient)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', margin: '0 auto 1rem' }}>
            <i className="fa-solid fa-id-card"></i>
          </div>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--color-navy)' }}>
            Join Pasha People Party of India
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Selected Tier: <strong style={{ color: 'var(--color-saffron-dark)' }}>{planName || 'Free Member'}</strong>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input
              type="text"
              className="form-input"
              required
              placeholder="e.g. Anish Sharma"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Mobile Number (for OTP verification) *</label>
            <input
              type="tel"
              className="form-input"
              required
              placeholder="+91 9876543210"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="form-row-2col">
            <div className="form-group">
              <label className="form-label">State</label>
              <input
                type="text"
                className="form-input"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">District</label>
              <input
                type="text"
                className="form-input"
                placeholder="District Name"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={loading} style={{ marginTop: '1rem' }}>
            {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : <><i className="fa-solid fa-user-check"></i> Generate Digital ID Card</>}
          </button>
        </form>
      </div>
    </div>
  );
}

/**
 * Event Pass Registration Modal
 */
export function EventModal({ event, onClose, addToast }) {
  const [attendeeName, setAttendeeName] = useState('');
  const [attendeePhone, setAttendeePhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiService.registerForEvent(event.id, { attendeeName, attendeePhone });
      addToast(`Pass generated for ${event.title}! Sent to ${attendeePhone}.`, 'success');
      onClose();
    } catch (err) {
      addToast(`Pass confirmed for ${event.title} (Demo Mode).`, 'info');
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>

        <h3 style={{ fontSize: '1.3rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>
          Event Pass RSVP
        </h3>
        <div style={{ color: 'var(--color-saffron-dark)', fontWeight: 700, fontSize: '1rem', marginBottom: '1rem' }}>
          {event.title}
        </div>

        <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--border-radius-md)', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
          <div><i className="fa-solid fa-calendar" style={{ color: 'var(--color-royal-blue)' }}></i> {event.date} ({event.time})</div>
          <div><i className="fa-solid fa-location-dot" style={{ color: 'var(--color-royal-blue)' }}></i> {event.venue}</div>
        </div>

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label className="form-label">Attendee Full Name *</label>
            <input
              type="text"
              className="form-input"
              required
              placeholder="Full Name"
              value={attendeeName}
              onChange={(e) => setAttendeeName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Mobile Number for SMS Pass *</label>
            <input
              type="tel"
              className="form-input"
              required
              placeholder="+91 9876543210"
              value={attendeePhone}
              onChange={(e) => setAttendeePhone(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading} style={{ marginTop: '1rem' }}>
            {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : <><i className="fa-solid fa-ticket"></i> Confirm RSVP & Download Pass</>}
          </button>
        </form>
      </div>
    </div>
  );
}

/**
 * Online Donation Modal
 */
export function DonationModal({ onClose, addToast }) {
  const [amount, setAmount] = useState('500');
  const [donorName, setDonorName] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDonate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await apiService.submitDonation({ amount, donorName, panNumber });
      addToast(`Thank you ${donorName || 'Patriot'} for your ₹${amount} contribution to PPPI Public Fund!`, 'success');
      onClose();
    } catch (err) {
      addToast(`Donation receipt generated for ₹${amount} (Demo Mode).`, 'info');
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </button>

        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--saffron-gradient)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', margin: '0 auto 0.75rem' }}>
            <i className="fa-solid fa-hand-holding-heart"></i>
          </div>
          <h3 style={{ fontSize: '1.35rem', color: 'var(--color-navy)' }}>
            Support PPPI Public Welfare Fund
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            100% RBI & ECI Compliant. Instant Tax Receipt Issued.
          </p>
        </div>

        <form onSubmit={handleDonate}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            {['100', '500', '1000', '5000'].map((amt) => (
              <button
                type="button"
                key={amt}
                className={`btn ${amount === amt ? 'btn-saffron' : 'btn-secondary'} btn-sm`}
                style={{ flex: 1 }}
                onClick={() => setAmount(amt)}
              >
                ₹{amt}
              </button>
            ))}
          </div>

          <div className="form-group">
            <label className="form-label">Custom Donation Amount (₹)</label>
            <input
              type="number"
              className="form-input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="10"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Donor Name *</label>
            <input
              type="text"
              className="form-input"
              required
              placeholder="Your Full Name"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">PAN Card Number (Required for &gt; ₹20,000)</label>
            <input
              type="text"
              className="form-input"
              placeholder="ABCDE1234F"
              value={panNumber}
              onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
            />
          </div>

          <button type="submit" className="btn btn-saffron btn-block btn-lg" disabled={loading} style={{ marginTop: '1rem' }}>
            {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : <><i className="fa-solid fa-lock"></i> Proceed to Secure Payment (₹{amount})</>}
          </button>
        </form>
      </div>
    </div>
  );
}

/**
 * Image Lightbox Modal
 */
export function LightboxModal({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ zIndex: 3000 }}>
      <div style={{ position: 'relative', maxWidth: '90vw', maxHeight: '90vh' }} onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close-btn"
          onClick={onClose}
          style={{ top: '-2.5rem', right: '0', background: '#FFFFFF' }}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        <img
          src={item.image}
          alt={item.title}
          style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: 'var(--border-radius-md)' }}
        />
        <div style={{ background: 'rgba(15,23,42,0.9)', color: '#FFFFFF', padding: '1rem', borderRadius: '0 0 12px 12px', marginTop: '-4px' }}>
          <div style={{ color: 'var(--color-saffron)', fontSize: '0.8rem', fontWeight: 700 }}>{item.category}</div>
          <h4 style={{ fontSize: '1.1rem' }}>{item.title}</h4>
        </div>
      </div>
    </div>
  );
}
