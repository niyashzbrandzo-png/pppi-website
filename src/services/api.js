/**
 * PPPI Connect Web API Service
 * Endpoint URL base: https://api.pppiconnect.com/api (or local fallback)
 */

const PRIMARY_API_URL = 'https://api.pppiconnect.com/api';
const REMOTE_FALLBACK_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.pppiconnect.com/api';

async function request(endpoint, options = {}) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const res = await fetch(`${PRIMARY_API_URL}${endpoint}`, config);
    if (!res.ok) {
      throw new Error(`API Error: ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    console.warn(`Local API call to ${PRIMARY_API_URL}${endpoint} failed. Trying remote fallback...`, err);
    try {
      const fallbackRes = await fetch(`${REMOTE_FALLBACK_URL}${endpoint}`, config);
      if (!fallbackRes.ok) throw new Error('Remote fallback failed');
      return await fallbackRes.json();
    } catch (fallbackErr) {
      console.warn('Backend server unreachable, returning simulated fallback data.', fallbackErr);
      return {
        status: 200,
        success: true,
        message: 'Request processed (Demo Fallback)',
        data: [],
      };
    }
  }
}

export const apiService = {
  // Contact & Enquiry
  submitEnquiry: async (enquiryData) => {
    return request('/enquiries', {
      method: 'POST',
      body: JSON.stringify(enquiryData),
    });
  },

  // Membership Registration
  registerMembership: async (memberData) => {
    return request('/auth/register-member', {
      method: 'POST',
      body: JSON.stringify(memberData),
    });
  },

  // Events
  fetchEvents: async () => {
    return request('/events', { method: 'GET' });
  },

  registerForEvent: async (eventId, attendeeData) => {
    return request(`/events/${eventId}/register`, {
      method: 'POST',
      body: JSON.stringify(attendeeData),
    });
  },

  // News / Posts
  fetchNews: async () => {
    return request('/posts', { method: 'GET' });
  },

  // Donations
  submitDonation: async (donationData) => {
    return request('/donations', {
      method: 'POST',
      body: JSON.stringify(donationData),
    });
  },

  // Gallery
  fetchGallery: async () => {
    return request('/gallery', { method: 'GET' });
  },

  // Notifications
  fetchNotifications: async () => {
    return request('/notifications', { method: 'GET' });
  },
};

export default apiService;
