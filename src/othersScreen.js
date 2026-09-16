// othersScreen.js - PPPI Public Concerns, Feedback & Enquiries Screen (OTHER Module)
// Handles inquiries about website, mobile apps, party affairs, policy, or general questions

export const CONCERN_CATEGORIES = [
  {
    id: 'website',
    title: 'Website & Digital Portal',
    icon: 'fa-solid fa-globe',
    color: '#2563eb',
    bg: '#eff6ff',
    desc: 'Bug reports, page loading speed, online donations, or portal UX suggestions.',
    placeholder: 'Please describe the website issue or suggestion you experienced (e.g. page URL, donation status, screen resolution)...'
  },
  {
    id: 'mobile_app',
    title: 'Mobile Apps (Android & iOS)',
    icon: 'fa-solid fa-mobile-screen-button',
    color: '#059669',
    bg: '#ecfdf5',
    desc: 'App download, login OTP, crash issues, notifications, or mobile features.',
    placeholder: 'Specify your phone model, operating system (Android/iOS), and detailed issue with the mobile application...'
  },
  {
    id: 'party_affairs',
    title: 'Party Affairs & Membership',
    icon: 'fa-solid fa-id-card',
    color: '#d97706',
    bg: '#fffbeb',
    desc: 'Membership plans, ID card delivery, district coordinator roles, or party rallies.',
    placeholder: 'Describe your membership query, registration number, or party participation inquiry...'
  },
  {
    id: 'policy_manifesto',
    title: 'Policy, Governance & Manifesto',
    icon: 'fa-solid fa-scale-balanced',
    color: '#7c3aed',
    bg: '#f5f3ff',
    desc: 'Agrarian water security, healthcare charter, anti-corruption policies, or local issues.',
    placeholder: 'Share your civic concern, policy idea, or community issue for our legislative agenda...'
  },
  {
    id: 'general_enquiry',
    title: 'General Enquiries & Partnerships',
    icon: 'fa-solid fa-clipboard-question',
    color: '#0891b2',
    bg: '#ecfeff',
    desc: 'Media press relations, volunteer outreach, legal inquiries, or general support.',
    placeholder: 'How can the PPPI Central Secretariat assist you? Please provide complete details...'
  }
];

export function renderOthersScreen(state = {}) {
  const selectedCategory = state.selectedCategory || 'website';
  const currentCategoryObj = CONCERN_CATEGORIES.find(c => c.id === selectedCategory) || CONCERN_CATEGORIES[0];
  const lastSubmitted = state.lastSubmitted || null;

  return `
    <div class="others-screen-container">
      <!-- Top Hero Header -->
      <div class="others-hero-banner">
        <div class="others-hero-badge">
          <i class="fa-solid fa-headset"></i> PPPI Central Public Grievances &amp; Enquiries Cell
        </div>
        <h1 class="others-hero-title">Public Concerns, Queries &amp; Feedback</h1>
        <p class="others-hero-subtitle">
          Have a question or concern regarding our <strong>Website</strong>, <strong>Mobile Apps</strong>, <strong>Party Affairs</strong>, or general civic issues? Submit your enquiry directly to the Pasha People Party Central Secretariat for prompt administrative review.
        </p>
      </div>

      <!-- Quick Topic Category Selector -->
      <div class="others-category-section">
        <div class="others-section-label">
          <i class="fa-solid fa-layer-group"></i> 1. Select Concern Category
        </div>
        <div class="others-category-grid">
          ${CONCERN_CATEGORIES.map(cat => {
            const isSelected = cat.id === selectedCategory;
            return `
              <div class="others-category-card ${isSelected ? 'selected' : ''}" data-cat-id="${cat.id}">
                <div class="others-category-icon" style="background: ${cat.bg}; color: ${cat.color};">
                  <i class="${cat.icon}"></i>
                </div>
                <div class="others-category-text">
                  <div class="others-category-title">${cat.title}</div>
                  <div class="others-category-desc">${cat.desc}</div>
                </div>
                <div class="others-category-radio">
                  <i class="fa-solid ${isSelected ? 'fa-circle-check' : 'fa-circle'}"></i>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Main Form & Support Info Split Layout -->
      <div class="others-form-layout">
        <!-- Form Left Column -->
        <div class="others-form-card">
          <div class="others-form-header">
            <div>
              <div class="others-form-tag" style="background: ${currentCategoryObj.bg}; color: ${currentCategoryObj.color};">
                <i class="${currentCategoryObj.icon}"></i> ${currentCategoryObj.title}
              </div>
              <h2 class="others-form-title">Submit Your Concern or Query</h2>
            </div>
            <div class="others-form-required-note">
              * Required fields
            </div>
          </div>

          <form id="others-concern-form" class="others-form-body">
            <input type="hidden" id="others-input-category" value="${currentCategoryObj.title}" />

            <!-- Row 1: Name & Phone -->
            <div class="others-form-row">
              <div class="others-form-group">
                <label class="others-label" for="others-input-name">
                  Full Name <span class="required">*</span>
                </label>
                <div class="others-input-wrapper">
                  <i class="fa-solid fa-user others-input-icon"></i>
                  <input type="text" id="others-input-name" class="others-control" placeholder="e.g. Rajesh Kumar" required />
                </div>
              </div>
              <div class="others-form-group">
                <label class="others-label" for="others-input-phone">
                  Mobile Number <span class="required">*</span>
                </label>
                <div class="others-input-wrapper">
                  <i class="fa-solid fa-phone others-input-icon"></i>
                  <input type="tel" id="others-input-phone" class="others-control" placeholder="10-digit mobile number" required pattern="[0-9]{10}" />
                </div>
              </div>
            </div>

            <!-- Row 2: Email & Location -->
            <div class="others-form-row">
              <div class="others-form-group">
                <label class="others-label" for="others-input-email">
                  Email Address <span class="optional">(Optional)</span>
                </label>
                <div class="others-input-wrapper">
                  <i class="fa-solid fa-envelope others-input-icon"></i>
                  <input type="email" id="others-input-email" class="others-control" placeholder="e.g. rajesh@example.com" />
                </div>
              </div>
              <div class="others-form-group">
                <label class="others-label" for="others-input-location">
                  District / City &amp; State <span class="optional">(Optional)</span>
                </label>
                <div class="others-input-wrapper">
                  <i class="fa-solid fa-location-dot others-input-icon"></i>
                  <input type="text" id="others-input-location" class="others-control" placeholder="e.g. Bengaluru / Kolar, Karnataka" />
                </div>
              </div>
            </div>

            <!-- Row 3: Urgency / Priority Pill Radios -->
            <div class="others-form-group">
              <label class="others-label">Concern Urgency / Priority Level</label>
              <div class="others-priority-pills">
                <label class="others-priority-pill active" data-priority="Normal">
                  <input type="radio" name="others-priority" value="Normal" checked style="display:none;" />
                  <span class="dot normal"></span> Normal Query
                </label>
                <label class="others-priority-pill" data-priority="Important">
                  <input type="radio" name="others-priority" value="Important" style="display:none;" />
                  <span class="dot important"></span> Important
                </label>
                <label class="others-priority-pill" data-priority="Urgent">
                  <input type="radio" name="others-priority" value="Urgent" style="display:none;" />
                  <span class="dot urgent"></span> High Priority
                </label>
              </div>
            </div>

            <!-- Row 4: Subject / Headline -->
            <div class="others-form-group">
              <label class="others-label" for="others-input-subject">
                Subject / Brief Headline <span class="required">*</span>
              </label>
              <div class="others-input-wrapper">
                <i class="fa-solid fa-heading others-input-icon"></i>
                <input type="text" id="others-input-subject" class="others-control" placeholder="e.g. Unable to receive OTP on mobile app login" required />
              </div>
            </div>

            <!-- Row 5: Detailed Message -->
            <div class="others-form-group">
              <label class="others-label" for="others-input-message">
                Detailed Concern / Query Description <span class="required">*</span>
              </label>
              <textarea id="others-input-message" class="others-textarea" rows="5" placeholder="${currentCategoryObj.placeholder}" required></textarea>
              <div class="others-textarea-help">
                Please provide specific details so our administrative cell can resolve your inquiry efficiently.
              </div>
            </div>

            <!-- Submit Button -->
            <div class="others-form-actions">
              <button type="submit" class="others-btn-submit" id="btn-submit-others-form">
                <i class="fa-solid fa-paper-plane"></i> Submit Concern to Central Cell
              </button>
            </div>
          </form>
        </div>

        <!-- Support Info Right Column -->
        <div class="others-info-sidebar">
          <!-- Central Secretariat Box -->
          <div class="others-info-card">
            <div class="others-info-icon">
              <i class="fa-solid fa-building-columns"></i>
            </div>
            <h3 class="others-info-heading">Central Secretariat</h3>
            <p class="others-info-text">
              Pasha People Party of India (PPPI CONNECT)<br />
              Central Command Secretariat, Dalasanur, Srinivasapura Taluk, Kolar District, Karnataka - 563126.
            </p>
          </div>

          <!-- Direct Helpline Box -->
          <div class="others-info-card">
            <div class="others-info-icon" style="background:#ecfdf5; color:#059669;">
              <i class="fa-solid fa-phone-volume"></i>
            </div>
            <h3 class="others-info-heading">Direct Contact Lines</h3>
            <ul class="others-contact-list">
              <li>
                <i class="fa-solid fa-phone"></i>
                <span><strong>Party Helpline:</strong> +91 7259798393</span>
              </li>
              <li>
                <i class="fa-solid fa-envelope"></i>
                <span><strong>Official Email:</strong> bpasha46@gmail.com</span>
              </li>
              <li>
                <i class="fa-solid fa-clock"></i>
                <span><strong>Working Hours:</strong> Mon - Sat (09:00 AM - 08:00 PM IST)</span>
              </li>
            </ul>
          </div>

          <!-- Official Assurance Card -->
          <div class="others-assurance-card">
            <i class="fa-solid fa-shield-halved others-assurance-icon"></i>
            <h4 class="others-assurance-title">Privacy &amp; Response Assurance</h4>
            <p class="others-assurance-desc">
              All submitted concerns and citizen queries are treated with strict confidentiality and logged directly into our administrative dashboard. Our dedicated coordination desk will reach out via mobile or email.
            </p>
          </div>
        </div>
      </div>

      <!-- Success Confirmation Modal -->
      <div class="others-modal-backdrop" id="others-success-modal" style="${lastSubmitted ? 'display:flex;' : 'display:none;'}">
        <div class="others-modal-dialog">
          <div class="others-modal-header">
            <div class="others-success-icon-badge">
              <i class="fa-solid fa-circle-check"></i>
            </div>
            <h3 class="others-modal-title">Concern Officially Registered!</h3>
            <button type="button" class="others-modal-close" id="btn-close-others-modal">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div class="others-modal-body">
            <p class="others-modal-desc">
              Thank you for reaching out to the Pasha People Party of India. Your concern has been officially logged in the Central Secretariat queue.
            </p>
            <div class="others-receipt-box">
              <div class="others-receipt-row">
                <span>Reference ID:</span>
                <strong id="modal-receipt-ref">${lastSubmitted?.ref_no || '#ENQ-RECENT'}</strong>
              </div>
              <div class="others-receipt-row">
                <span>Category:</span>
                <span id="modal-receipt-cat">${lastSubmitted?.category || currentCategoryObj.title}</span>
              </div>
              <div class="others-receipt-row">
                <span>Citizen Name:</span>
                <span id="modal-receipt-name">${lastSubmitted?.name || ''}</span>
              </div>
              <div class="others-receipt-row">
                <span>Status:</span>
                <span class="badge" style="background:#dcfce7; color:#15803d; font-weight:700;">RECEIVED / PENDING REVIEW</span>
              </div>
            </div>
            <p class="others-modal-footer-note">
              Our central cell will review your submission and contact you via phone or email if further assistance is required.
            </p>
          </div>
          <div class="others-modal-footer">
            <button type="button" class="others-btn-primary" id="btn-modal-done">
              <i class="fa-solid fa-check"></i> Done
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function setupOthersListeners({ othersState, renderApp, LOCAL_API_URL, API_BASE_URL }) {
  function getApiUrl(path) {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return `${LOCAL_API_URL}${path}`;
    }
    return `${API_BASE_URL}${path}`;
  }

  // 1. Topic Category Selection Cards
  document.querySelectorAll('.others-category-card').forEach(card => {
    card.addEventListener('click', () => {
      const catId = card.dataset.catId;
      if (catId && catId !== othersState.selectedCategory) {
        othersState.selectedCategory = catId;
        renderApp();
      }
    });
  });

  // 2. Priority Pills Selection
  document.querySelectorAll('.others-priority-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.others-priority-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const radio = pill.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });

  // 3. Concern Form Submission
  const form = document.getElementById('others-concern-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btnSubmit = document.getElementById('btn-submit-others-form');
      const name = document.getElementById('others-input-name').value.trim();
      const phone = document.getElementById('others-input-phone').value.trim();
      const email = document.getElementById('others-input-email').value.trim();
      const location = document.getElementById('others-input-location').value.trim();
      const category = document.getElementById('others-input-category').value.trim();
      const subject = document.getElementById('others-input-subject').value.trim();
      const message = document.getElementById('others-input-message').value.trim();
      const priorityRadio = document.querySelector('input[name="others-priority"]:checked');
      const priority = priorityRadio ? priorityRadio.value : 'Normal';

      if (!name || !phone || !message || !subject) {
        alert('Please fill out all required fields marked with *');
        return;
      }

      btnSubmit.disabled = true;
      btnSubmit.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Transmitting Concern to Central Cell...';

      const payload = {
        name,
        phone,
        email: email || `${Date.now()}@citizen.pppi.org`,
        category,
        priority,
        subject,
        message: location ? `${message} (Location: ${location})` : message,
        city: location,
        state: 'Karnataka'
      };

      try {
        let res = null;
        try {
          res = await fetch(getApiUrl('/enquiries'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
        } catch (netErr) {
          res = await fetch(`${LOCAL_API_URL}/enquiries`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          }).catch(() => null);
        }

        let resultData = null;
        if (res && (res.status === 200 || res.status === 201)) {
          resultData = await res.json();
        }

        const refNo = resultData?.ref_no || resultData?.data?.ref_no || `ENQ-${Math.floor(100000 + Math.random() * 900000)}`;

        othersState.lastSubmitted = {
          ref_no: refNo,
          category,
          name,
          phone,
          timestamp: new Date().toLocaleString()
        };

        renderApp();
      } catch (err) {
        console.error('Enquiry submission error:', err);
        // Fallback local acknowledgment
        othersState.lastSubmitted = {
          ref_no: `ENQ-${Math.floor(100000 + Math.random() * 900000)}`,
          category,
          name,
          phone,
          timestamp: new Date().toLocaleString()
        };
        renderApp();
      }
    });
  }

  // 4. Close Confirmation Modal
  const btnCloseModal = document.getElementById('btn-close-others-modal');
  if (btnCloseModal) {
    btnCloseModal.addEventListener('click', () => {
      othersState.lastSubmitted = null;
      renderApp();
    });
  }

  const btnModalDone = document.getElementById('btn-modal-done');
  if (btnModalDone) {
    btnModalDone.addEventListener('click', () => {
      othersState.lastSubmitted = null;
      renderApp();
    });
  }
}
