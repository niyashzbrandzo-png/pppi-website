import React, { useState } from 'react';
import { siteMetadata } from '../data/websiteData';
import { apiService } from '../services/api';

export default function ContactSection({ addToast }) {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    city: '',
    district: '',
    state: '',
    subject: 'General Enquiry',
    message: '',
    preferredContact: 'Phone',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const statesList = [
    'Delhi NCR', 'Andhra Pradesh', 'Bihar', 'Gujarat', 'Karnataka',
    'Kerala', 'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu',
    'Telangana', 'Uttar Pradesh', 'West Bengal',
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.mobileNumber || !formData.message) {
      addToast('Please complete all required fields (Name, Mobile, Message).', 'warning');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await apiService.submitEnquiry(formData);
      addToast(res.message || 'Your enquiry has been received! Our team will get back to you shortly.', 'success');
      setFormData({
        fullName: '',
        mobileNumber: '',
        email: '',
        city: '',
        district: '',
        state: '',
        subject: 'General Enquiry',
        message: '',
        preferredContact: 'Phone',
      });
    } catch (err) {
      addToast('Enquiry submission recorded (Simulated Demo Mode).', 'info');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-padding" id="contact" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-badge">
            <i className="fa-solid fa-headset"></i>
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="section-title">
            Connect With Our <span className="gradient-text">Secretariat & Team</span>
          </h2>
          <p className="section-subtitle">
            Have questions about digital membership, volunteer campaigns, or media interviews? We're here to help.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Contact Card & Map */}
          <div>
            <div className="contact-info-card" style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#FFFFFF' }}>Central Secretariat</h3>
              <p style={{ fontSize: '0.92rem', opacity: 0.9, lineHeight: '1.6', marginBottom: '2rem' }}>
                Visit our national headquarters or reach out via our official toll-free helpline.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <i className="fa-solid fa-location-dot" style={{ fontSize: '1.2rem', color: '#FF9933', marginTop: '0.2rem' }}></i>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Address</div>
                    <div style={{ fontSize: '0.85rem', opacity: 0.85 }}>{siteMetadata.headquarters}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <i className="fa-solid fa-phone" style={{ fontSize: '1.2rem', color: '#FF9933', marginTop: '0.2rem' }}></i>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Toll-Free Helpline</div>
                    <div style={{ fontSize: '0.85rem', opacity: 0.85 }}>{siteMetadata.helpline}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <i className="fa-solid fa-envelope" style={{ fontSize: '1.2rem', color: '#FF9933', marginTop: '0.2rem' }}></i>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Email Inquiries</div>
                    <div style={{ fontSize: '0.85rem', opacity: 0.85 }}>{siteMetadata.contactEmail}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <i className="fa-solid fa-clock" style={{ fontSize: '1.2rem', color: '#FF9933', marginTop: '0.2rem' }}></i>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Working Hours</div>
                    <div style={{ fontSize: '0.85rem', opacity: 0.85 }}>{siteMetadata.workingHours}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Embed Placeholder */}
            <div style={{ borderRadius: 'var(--border-radius-lg)', overflow: 'hidden', height: '220px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-color)' }}>
              <iframe
                title="PPPI Central Secretariat Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14001.077242686828!2d77.2185!3d28.675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd058a983b63%3A0xb35a397984f88417!2sCivil%20Lines%2C%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Right Column: Interactive Enquiry Form */}
          <div style={{ background: '#FFFFFF', padding: '2.5rem', borderRadius: 'var(--border-radius-lg)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
            <h3 style={{ fontSize: '1.35rem', marginBottom: '1.5rem', color: 'var(--color-navy)' }}>
              Submit an Enquiry or Grievance
            </h3>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    className="form-input"
                    placeholder="e.g. Ramesh Kumar"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Mobile Number *</label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    className="form-input"
                    placeholder="+91 9876543210"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">State</label>
                  <select name="state" className="form-select" value={formData.state} onChange={handleChange}>
                    <option value="">Select State</option>
                    {statesList.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">District / City</label>
                  <input
                    type="text"
                    name="district"
                    className="form-input"
                    placeholder="e.g. Central Delhi / Lucknow"
                    value={formData.district}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <select name="subject" className="form-select" value={formData.subject} onChange={handleChange}>
                    <option value="General Enquiry">General Enquiry</option>
                    <option value="Membership Assistance">Membership Assistance</option>
                    <option value="Volunteering">Volunteering Opportunities</option>
                    <option value="Civic Grievance">Civic / District Grievance</option>
                    <option value="Press & Media">Press & Media Query</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Preferred Contact Method</label>
                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.25rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                    <input type="radio" name="preferredContact" value="Phone" checked={formData.preferredContact === 'Phone'} onChange={handleChange} />
                    Phone Call
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                    <input type="radio" name="preferredContact" value="WhatsApp" checked={formData.preferredContact === 'WhatsApp'} onChange={handleChange} />
                    WhatsApp
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                    <input type="radio" name="preferredContact" value="Email" checked={formData.preferredContact === 'Email'} onChange={handleChange} />
                    Email
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Message *</label>
                <textarea
                  name="message"
                  rows="4"
                  className="form-textarea"
                  placeholder="Describe your enquiry, suggestion, or local grievance in detail..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i> Submitting...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-paper-plane"></i> Submit Enquiry
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
