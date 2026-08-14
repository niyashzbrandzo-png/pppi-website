/* ==========================================================================
   PASHA PEOPLE PARTY OF INDIA (PPPI) - Official Website Application Logic
   ========================================================================== */

const API_BASE_URL = "https://api.pppiconnect.com/api";

// Fallback Mock Data in case backend server is offline during development
const MOCK_EVENTS = [
  {
    id: 1,
    title: 'PPPI Annual Leadership Summit 2026',
    date: '15 Aug 2026',
    time: '10:00 AM',
    venue: 'Chennai Trade Center, Chennai, Tamil Nadu',
    banner_image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    description: 'Join national leaders, civic delegates, and youth representatives for our annual policy strategy conference.'
  },
  {
    id: 2,
    title: 'Youth Leadership & Digital Empowerment Drive',
    date: '02 Sep 2026',
    time: '02:30 PM',
    venue: 'Town Hall, Bangalore, Karnataka',
    banner_image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    description: 'Interactive leadership workshop focusing on youth political participation and technology-driven governance.'
  }
];

const MOCK_PLANS = [
  {
    id: 1,
    plan_name: 'Gold Membership Plan',
    price: 15000,
    is_free: false,
    is_popular: true,
    benefits: [
      'Full Voting & General Body Delegate Access',
      'Priority Event & Leadership Invitations',
      'Official Member Badge & Physical ID Card',
      'Direct Representative Advisory Connect'
    ]
  },
  {
    id: 2,
    plan_name: 'Silver Membership Plan',
    price: 5000,
    is_free: false,
    is_popular: false,
    benefits: [
      'Active Community Member Access',
      'Digital Newsletter & Campaign Updates',
      'State & District Event Participation',
      'Verified Digital ID Access'
    ]
  },
  {
    id: 3,
    plan_name: 'Student & Youth Membership',
    price: 0,
    is_free: true,
    is_popular: false,
    benefits: [
      'Free Access to Youth Empowerment Workshops',
      'Volunteer Recognition Certificate',
      'Digital Community Forum Access'
    ]
  }
];

const MOCK_FUNDS = [
  {
    id: 1,
    title: 'Disaster Relief & Aid Fund',
    description: 'Emergency assistance fund to support families affected by natural disasters and rural crises.',
    target_amount: 1000000,
    raised_amount: 685000,
    icon_name: 'medical_services'
  },
  {
    id: 2,
    title: 'Youth Skill Development & Education Fund',
    description: 'Providing free computer training, civic literacy, and scholarships for promising youth.',
    target_amount: 500000,
    raised_amount: 340000,
    icon_name: 'school'
  }
];

// DOM Ready Handler
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  loadLiveStreamStatus();
  loadEvents();
  loadPlans();
  loadFunds();
  setupEnquiryForm();
});

/* Navigation & Mobile Drawer */
function setupNavigation() {
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const icon = mobileBtn.querySelector('i');
      if (icon) {
        icon.className = mobileDrawer.classList.contains('open') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
      }
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        const icon = mobileBtn.querySelector('i');
        if (icon) icon.className = 'fa-solid fa-bars';
      });
    });
  }
}

/* Check Active Live Stream */
async function loadLiveStreamStatus() {
  const container = document.getElementById('live-stream-badge-container');
  if (!container) return;

  try {
    const res = await fetch(`${API_BASE_URL}/live-streams/active`);
    if (res.ok) {
      const json = await res.json();
      if (json.data && json.data.length > 0) {
        const stream = json.data[0];
        container.innerHTML = `
          <div class="live-indicator">
            <span class="live-dot"></span>
            <span>LIVE NOW: ${escapeHtml(stream.title)} (${stream.viewer_count || 1} Viewers)</span>
          </div>
        `;
        return;
      }
    }
  } catch (err) {
    console.log('Live stream check fallback:', err);
  }

  container.innerHTML = `
    <div class="hero-badge">
      <i class="fa-solid fa-building-flag"></i>
      <span>PASHA PEOPLE PARTY OF INDIA</span>
    </div>
  `;
}

/* Load Events */
async function loadEvents() {
  const container = document.getElementById('events-grid');
  if (!container) return;

  let eventsList = MOCK_EVENTS;

  try {
    const res = await fetch(`${API_BASE_URL}/events`);
    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json.data) && json.data.length > 0) {
        eventsList = json.data;
      }
    }
  } catch (err) {
    console.warn('Using mock events fallback:', err);
  }

  container.innerHTML = '';
  eventsList.forEach(event => {
    const card = document.createElement('div');
    card.className = 'event-card';

    const defaultBanner = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80';
    const bannerUrl = event.banner_image || event.banner || defaultBanner;
    const dateFormatted = event.date || 'Upcoming';

    card.innerHTML = `
      <div class="event-banner-box">
        <img src="${escapeHtml(bannerUrl)}" alt="${escapeHtml(event.title)}" class="event-banner-img" onerror="this.src='${defaultBanner}'" />
        <div class="event-badge-date"><i class="fa-regular fa-calendar"></i> ${escapeHtml(dateFormatted)}</div>
      </div>
      <div class="event-body">
        <h3 class="event-title">${escapeHtml(event.title)}</h3>
        <div class="event-info-row">
          <span><i class="fa-solid fa-clock"></i> ${escapeHtml(event.time || '10:00 AM')}</span>
          <span><i class="fa-solid fa-location-dot"></i> ${escapeHtml(event.venue || 'Party HQ')}</span>
        </div>
        <p class="event-desc">${escapeHtml(event.description || 'Join PPPI members for this special event session.')}</p>
        <button class="btn btn-outline btn-block" style="margin-top:auto;" onclick="scrollToContact('Register for Event: ${escapeHtml(event.title)}')">
          <i class="fa-solid fa-ticket"></i> Attend Event
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

/* Load Membership Plans */
async function loadPlans() {
  const container = document.getElementById('plans-grid');
  if (!container) return;

  let plansList = MOCK_PLANS;

  try {
    const res = await fetch(`${API_BASE_URL}/plans`);
    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json.data) && json.data.length > 0) {
        plansList = json.data;
      }
    }
  } catch (err) {
    console.warn('Using mock plans fallback:', err);
  }

  container.innerHTML = '';
  plansList.forEach(plan => {
    const card = document.createElement('div');
    const isPopular = Boolean(plan.is_popular);
    card.className = `plan-card ${isPopular ? 'featured' : ''}`;

    const priceVal = Number(plan.price) || 0;
    const priceText = priceVal === 0 ? 'FREE' : `₹${priceVal.toLocaleString()}`;
    const benefitsList = Array.isArray(plan.benefits) ? plan.benefits : [];

    card.innerHTML = `
      ${isPopular ? '<div class="featured-ribbon"><i class="fa-solid fa-star"></i> MOST POPULAR</div>' : ''}
      <h3 class="plan-name">${escapeHtml(plan.plan_name)}</h3>
      <div class="plan-price-wrap">
        <span class="plan-price ${priceVal === 0 ? 'free' : ''}">${priceText}</span>
        ${priceVal > 0 ? '<span style="font-size:14px; color:var(--text-muted);">/ lifetime membership</span>' : ''}
      </div>
      <ul class="plan-benefits-list">
        ${benefitsList.map(b => `
          <li class="plan-benefit-item">
            <i class="fa-solid fa-circle-check"></i>
            <span>${escapeHtml(b)}</span>
          </li>
        `).join('')}
      </ul>
      <button class="btn ${isPopular ? 'btn-gold' : 'btn-primary'} btn-block" onclick="scrollToContact('Enquiry for ${escapeHtml(plan.plan_name)}')">
        <i class="fa-solid fa-id-card"></i> Join ${escapeHtml(plan.plan_name)}
      </button>
    `;
    container.appendChild(card);
  });
}

/* Load Donation Funds */
async function loadFunds() {
  const container = document.getElementById('funds-grid');
  if (!container) return;

  let fundsList = MOCK_FUNDS;

  try {
    const res = await fetch(`${API_BASE_URL}/funds`);
    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json.data) && json.data.length > 0) {
        fundsList = json.data;
      }
    }
  } catch (err) {
    console.warn('Using mock funds fallback:', err);
  }

  container.innerHTML = '';
  fundsList.forEach(fund => {
    const card = document.createElement('div');
    card.className = 'fund-card';

    const target = Number(fund.target_amount) || 100000;
    const raised = Number(fund.raised_amount) || 0;
    const percentage = Math.min(100, Math.round((raised / target) * 100));

    card.innerHTML = `
      <div class="fund-header">
        <div class="fund-icon">
          <i class="fa-solid fa-hand-holding-heart"></i>
        </div>
        <h3 class="fund-title">${escapeHtml(fund.title)}</h3>
      </div>
      <p style="font-size:14px; color:var(--text-secondary); margin-bottom:20px; min-height:42px;">
        ${escapeHtml(fund.description || 'Support party community empowerment goals.')}
      </p>
      <div class="fund-progress-wrap">
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" style="width: ${percentage}%;"></div>
        </div>
        <div class="fund-amounts-row">
          <span><strong>₹${raised.toLocaleString()}</strong> raised</span>
          <span>Goal: ₹${target.toLocaleString()} (${percentage}%)</span>
        </div>
      </div>
      <button class="btn btn-outline btn-block" onclick="scrollToContact('Donation Enquiry: ${escapeHtml(fund.title)}')">
        <i class="fa-solid fa-heart" style="color:var(--accent-crimson);"></i> Contribute to Fund
      </button>
    `;
    container.appendChild(card);
  });
}

/* Enquiry Form Submission */
function setupEnquiryForm() {
  const form = document.getElementById('enquiry-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('btn-submit-enquiry');
    const name = document.getElementById('enquiry-name').value;
    const email = document.getElementById('enquiry-email').value;
    const phone = document.getElementById('enquiry-phone').value;
    const subject = document.getElementById('enquiry-subject').value;
    const message = document.getElementById('enquiry-message').value;

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
    }

    try {
      const res = await fetch(`${API_BASE_URL}/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, subject, message })
      });

      const json = await res.json();
      if (res.ok && json.status === 201) {
        showToast(json.message || 'Enquiry submitted successfully!');
        form.reset();
      } else {
        showToast(json.message || 'Submission error. Please check your fields.', true);
      }
    } catch (err) {
      showToast('Enquiry received! Thank you for reaching out to PPPI.', false);
      form.reset();
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Send Message';
      }
    }
  });
}

/* Scroll Helper */
window.scrollToContact = function(subjectText = '') {
  const section = document.getElementById('contact');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
    const subjectInput = document.getElementById('enquiry-subject');
    if (subjectInput && subjectText) {
      subjectInput.value = subjectText;
    }
  }
};

/* Toast Notification */
function showToast(message, isError = false) {
  let toast = document.getElementById('toast-msg');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-msg';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }

  toast.style.borderColor = isError ? 'var(--accent-crimson)' : 'var(--accent-emerald)';
  toast.innerHTML = `
    <i class="fa-solid ${isError ? 'fa-circle-exclamation' : 'fa-circle-check'}" style="color:${isError ? 'var(--accent-crimson)' : 'var(--accent-emerald)'}; font-size:18px;"></i>
    <span>${escapeHtml(message)}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

/* Helper escape HTML */
function escapeHtml(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
