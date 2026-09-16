import './style.css';
import { renderHomeScreen } from './homeScreen.js';
import { renderAboutScreen } from './aboutScreen.js';
import { renderFounderScreen } from './founderScreen.js';
import { renderConstitutionScreen } from './constitutionScreen.js';
import { renderPreambleScreen } from './preambleScreen.js';
import { renderDonationScreen, DEFAULT_FUNDS, PRESET_AMOUNTS } from './donationScreen.js';
import { renderNewsletterScreen, DEFAULT_NEWSLETTERS } from './newsletterScreen.js';
import { renderPublicityScreen, DEFAULT_PUBLICITIES } from './publicityScreen.js';
import { renderComplaintsScreen, setupComplaintListeners } from './complaintsScreen.js';
import { renderEmploymentScreen, setupEmploymentListeners, DEFAULT_JOBS } from './employmentScreen.js';
import { renderAgricultureScreen, setupAgricultureListeners, DEFAULT_AGRI_QUESTIONS } from './agricultureScreen.js';
import { renderLawScreen, setupLawListeners, DEFAULT_LEGAL_CASES } from './lawScreen.js';
import { renderMarriageScreen, setupMarriageListeners, DEFAULT_MARRIAGE_APPLICATIONS } from './marriageScreen.js';
import { renderEmergencyScreen, setupEmergencyListeners, DEFAULT_EMERGENCY_ALERTS } from './emergencyScreen.js';
import { renderElectionsScreen, setupElectionsListeners, DEFAULT_ELECTIONS } from './electionsScreen.js';
import { renderOthersScreen, setupOthersListeners } from './othersScreen.js';

// 3 Exact Menu Rows matching Image 2
const MENU_ROWS = [
  // Row 1: 7 items
  [
    { id: 'home', label: 'HOME', bg: '#FADBD8', color: '#000000', flex: 1, title: 'This is Home Page' },
    { id: 'about', label: 'ABOUT', bg: '#5DADE2', color: '#000000', flex: 1, title: 'This is About Page' },
    { id: 'founder', label: 'FOUNDER', bg: '#F1948A', color: '#000000', flex: 1, title: 'This is Founder Page' },
    { id: 'membership', label: 'MEMBERSHIP', bg: '#FDEDEC', color: '#000000', flex: 1.1, title: 'Membership Plans' },
    { id: 'newsletter', label: 'NEWS LETTER', bg: '#E67E22', color: '#000000', flex: 1.1, title: 'This is News Letter Page' },
    { id: 'publicities', label: 'PUBLICITIES', bg: '#D6EAF8', color: '#000000', flex: 1.1, title: 'This is Publicities Page' },
    { id: 'public-complaints', label: 'PUBLIC COMPLAINTS', bg: '#D0C9B6', color: '#000000', flex: 1.4, title: 'This is Public Complaints Page' },
  ],
  // Row 2: 5 items
  [
    { id: 'employement', label: 'EMPLOYEMENT', bg: '#AED6F1', color: '#000000', flex: 1.1, title: 'This is Employement Page' },
    { id: 'agriculture', label: 'AGRICULTURE AND FARMERS', bg: '#A9DFBF', color: '#000000', flex: 1.8, title: 'This is Agriculture and Farmers Page' },
    { id: 'law', label: 'LAW AND JUDICIARY', bg: '#FCF3CF', color: '#000000', flex: 1.4, title: 'This is Law and Judiciary Page' },
    { id: 'marriages', label: 'MARRIAGES', bg: '#F4D03F', color: '#000000', flex: 1.1, title: 'This is Marriages Page' },
    { id: 'emergency', label: 'EMERGENCY', bg: '#E74C3C', color: '#FFFFFF', isEmergency: true, flex: 1.1, title: 'This is Emergency Page' },
  ],
  // Row 3: 5 items
  [
    { id: 'elections', label: 'ELECTIONS', bg: '#D0C9B6', color: '#000000', flex: 1, title: 'This is Elections Page' },
    { id: 'marketting', label: 'MARKETTING', bg: '#FADBD8', color: '#000000', flex: 1.1, title: 'This is Marketting Page' },
    { id: 'constitution', label: 'CONSTITUTION', bg: '#F39C12', color: '#000000', flex: 1.2, title: 'This is Constitution Page' },
    { id: 'contact', label: 'CONTACT US', bg: '#D2B4DE', color: '#000000', flex: 1.3, title: 'This is Contact Us Page' },
    { id: 'other', label: 'OTHER', bg: '#A2D9CE', color: '#000000', flex: 1.2, title: 'This is Other Page' },
  ],
];

const ALL_MENU_ITEMS = MENU_ROWS.flat();

// Primary API Endpoints
const API_BASE_URL = 'https://api.pppiconnect.com/api';
const LOCAL_API_URL = 'http://localhost:5000/api';
const RAZORPAY_TEST_KEY = 'rzp_test_TJIYJj3OndPKGr';

// Default Fallback Plans
const DEFAULT_PLANS = [
  { id: 1, plan_name: 'Platinum Plan', price: 25000, is_free: false, is_popular: false, benefits: ['Member for RAJYASABHA', 'Member for LOKSABHA'] },
  { id: 2, plan_name: 'Diamond Plan', price: 20000, is_free: false, is_popular: false, benefits: ['Member for LEGISLATIVE ASSEMBLY', 'Member for COUNCIL'] },
  { id: 3, plan_name: 'Gold Plan', price: 15000, is_free: false, is_popular: true, benefits: ['Member for CORPORATE', 'Member for ZILLA PANCHAYATH'] },
  { id: 4, plan_name: 'Silver Plan', price: 10000, is_free: false, is_popular: false, benefits: ['Member for MUNICIPAL COUNCIL', 'Member for TALUK PANCHAYATH'] },
  { id: 5, plan_name: 'Bronze Plan', price: 5000, is_free: false, is_popular: false, benefits: ['Member for GRAM PANCHAYATH'] },
  { id: 6, plan_name: 'Voter', price: 0, is_free: true, is_popular: false, benefits: ['Limited access'] },
];


let newsletterState = {
  newsletters: [...DEFAULT_NEWSLETTERS],
  activeCategory: 'ALL',
  selectedNewsletterId: null,
  isLoading: false,
};

async function fetchNewsletters() {
  newsletterState.isLoading = true;
  try {
    const cached = localStorage.getItem('pppi_cached_newsletters');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          newsletterState.newsletters = parsed;
        }
      } catch (e) {}
    }

    let res = null;
    try {
      res = await fetch(`${LOCAL_API_URL}/newsletters`);
    } catch (e) {
      res = await fetch(`${API_BASE_URL}/newsletters`).catch(() => null);
    }

    if (res && res.ok) {
      const data = await res.json();
      if (data && (data.data || Array.isArray(data))) {
        const list = Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : []);
        if (list.length > 0) {
          newsletterState.newsletters = list;
          localStorage.setItem('pppi_cached_newsletters', JSON.stringify(list));
          if (activePageId === 'newsletter') {
            renderApp();
          }
        }
      }
    }
  } catch (err) {
    console.warn('Newsletter fetch notice:', err.message);
  } finally {
    newsletterState.isLoading = false;
  }
}


let publicityState = {
  publicities: [...DEFAULT_PUBLICITIES],
  activeCategory: 'ALL',
  selectedPublicityId: null,
  isLoading: false,
};

async function fetchPublicities() {
  publicityState.isLoading = true;
  try {
    const cached = localStorage.getItem('pppi_cached_publicities');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          publicityState.publicities = parsed;
        }
      } catch (e) {}
    }

    let res = null;
    try {
      res = await fetch(`${LOCAL_API_URL}/publicities`);
    } catch (e) {
      res = await fetch(`${API_BASE_URL}/publicities`).catch(() => null);
    }

    if (res && res.ok) {
      const data = await res.json();
      if (data && (data.data || Array.isArray(data))) {
        const list = Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : []);
        if (list.length > 0) {
          publicityState.publicities = list;
          localStorage.setItem('pppi_cached_publicities', JSON.stringify(list));
          if (activePageId === 'publicities') {
            renderApp();
          }
        }
      }
    }
  } catch (err) {
    console.warn('Publicities fetch notice:', err.message);
  } finally {
    publicityState.isLoading = false;
  }
}

let employmentState = {
  jobs: [...DEFAULT_JOBS],
  searchQuery: '',
  activeDept: 'ALL',
  activeType: 'ALL',
  activeExp: 'ALL',
  isLoading: false,
};

async function fetchJobs() {
  employmentState.isLoading = true;
  try {
    const cached = localStorage.getItem('pppi_cached_jobs');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          employmentState.jobs = parsed;
        }
      } catch (e) {}
    }

    let res = null;
    try {
      res = await fetch(`${LOCAL_API_URL}/jobs`);
    } catch (e) {
      res = await fetch(`${API_BASE_URL}/jobs`).catch(() => null);
    }

    if (res && res.ok) {
      const data = await res.json();
      if (data && (data.data || Array.isArray(data))) {
        const list = Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : []);
        if (list.length > 0) {
          employmentState.jobs = list;
          localStorage.setItem('pppi_cached_jobs', JSON.stringify(list));
          if (activePageId === 'employement') {
            renderApp();
          }
        }
      }
    }
  } catch (err) {
    console.warn('Jobs fetch notice:', err.message);
  } finally {
    employmentState.isLoading = false;
  }
}

let marriageState = {
  applications: [...DEFAULT_MARRIAGE_APPLICATIONS],
  trackedApp: null,
  trackError: '',
  searchTrackRef: '',
  isSubmitting: false,
  isLoading: false,
};


let emergencyState = {
  alerts: DEFAULT_EMERGENCY_ALERTS,
  isLoading: false,
  submitSuccess: false,
  lastSubmittedAlert: null,
  trackedAlert: null,
  trackError: '',
  searchTrackRef: '',
  gpsCoords: null
};



let othersState = {
  selectedCategory: 'website',
  lastSubmitted: null,
  isLoading: false
};

let electionsState = {
  elections: [...DEFAULT_ELECTIONS],
  selectedElectionId: 1,
  constituencies: [],
  allConstituencies: [],
  districts: [],
  activeDistrict: 'ALL',
  activeStatus: 'ALL',
  searchQuery: '',
  selectedConstituency: null,
  isLoading: false,
  error: null,
  stats: null
};

async function fetchElectionsData() {
  electionsState.isLoading = true;
  try {
    let res = null;
    try {
      res = await fetch(`${LOCAL_API_URL}/elections`);
    } catch (e) {
      res = await fetch(`${API_BASE_URL}/elections`).catch(() => null);
    }
    if (res && res.ok) {
      const data = await res.json();
      if (data && data.success && Array.isArray(data.data) && data.data.length > 0) {
        electionsState.elections = data.data;
      }
    }

    const elId = electionsState.selectedElectionId || 1;
    let cRes = null;
    try {
      cRes = await fetch(`${LOCAL_API_URL}/elections/constituencies?election_id=${elId}`);
    } catch (e) {
      cRes = await fetch(`${API_BASE_URL}/elections/constituencies?election_id=${elId}`).catch(() => null);
    }
    if (cRes && cRes.ok) {
      const cData = await cRes.json();
      if (cData && cData.success && Array.isArray(cData.data)) {
        electionsState.constituencies = cData.data;
        electionsState.allConstituencies = cData.data;
        if (Array.isArray(cData.districts)) {
          electionsState.districts = cData.districts;
        }
        if (cData.stats) {
          electionsState.stats = cData.stats;
        }
      }
    }
    if (activePageId === 'elections') {
      renderApp();
    }
  } catch (err) {
    console.warn('fetchElectionsData error, keeping fallback:', err);
  } finally {
    electionsState.isLoading = false;
  }
}

async function fetchEmergencyAlerts() {
  emergencyState.isLoading = true;
  try {
    let res = await fetch(`${LOCAL_API_URL}/emergencies/alerts`);
    if (!res.ok) {
      res = await fetch(`${API_BASE_URL}/emergencies/alerts`).catch(() => null);
    }
    if (res && res.ok) {
      const data = await res.json();
      if (data && data.success && Array.isArray(data.data)) {
        const list = data.data;
        if (list.length > 0) {
          emergencyState.alerts = list;
          if (activePageId === 'emergency') {
            renderApp();
          }
        }
      }
    }
  } catch (err) {
    console.warn('fetchEmergencyAlerts error, keeping default fallback:', err);
  } finally {
    emergencyState.isLoading = false;
  }
}

async function fetchMarriageApplications() {
  marriageState.isLoading = true;
  try {
    let res = null;
    try {
      res = await fetch(`${LOCAL_API_URL}/marriages/applications`);
    } catch (e) {
      res = await fetch(`${API_BASE_URL}/marriages/applications`).catch(() => null);
    }

    if (res && res.ok) {
      const data = await res.json();
      if (data && (data.data || Array.isArray(data))) {
        const list = Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : []);
        if (list.length > 0) {
          marriageState.applications = list;
          if (activePageId === 'marriages') {
            renderApp();
          }
        }
      }
    }
  } catch (err) {
    console.warn('Marriage applications fetch notice:', err.message);
  } finally {
    marriageState.isLoading = false;
  }
}

let lawState = {
  cases: [...DEFAULT_LEGAL_CASES],
  trackedCase: null,
  trackError: '',
  searchTrackRef: '',
  isSubmitting: false,
  recentDossier: null,
  isLoading: false,
};

async function fetchLegalCases() {
  lawState.isLoading = true;
  try {
    let res = null;
    try {
      res = await fetch(`${LOCAL_API_URL}/law/cases`);
    } catch (e) {
      res = await fetch(`${API_BASE_URL}/law/cases`).catch(() => null);
    }

    if (res && res.ok) {
      const data = await res.json();
      if (data && (data.data || Array.isArray(data))) {
        const list = Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : []);
        if (list.length > 0) {
          lawState.cases = list;
          if (activePageId === 'law') {
            renderApp();
          }
        }
      }
    }
  } catch (err) {
    console.warn('Legal cases fetch notice:', err.message);
  } finally {
    lawState.isLoading = false;
  }
}

let agricultureState = {
  questions: [...DEFAULT_AGRI_QUESTIONS],
  activeCategory: 'ALL',
  searchQuery: '',
  expandedQuestionIds: [1],
  isLoading: false,
};

async function fetchAgriQuestions() {
  agricultureState.isLoading = true;
  try {
    const cached = localStorage.getItem('pppi_cached_agri_questions');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          agricultureState.questions = parsed;
        }
      } catch (e) {}
    }

    let res = null;
    try {
      res = await fetch(`${LOCAL_API_URL}/agriculture/questions`);
    } catch (e) {
      res = await fetch(`${API_BASE_URL}/agriculture/questions`).catch(() => null);
    }

    if (res && res.ok) {
      const data = await res.json();
      if (data && (data.data || Array.isArray(data))) {
        const list = Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : []);
        if (list.length > 0) {
          agricultureState.questions = list;
          localStorage.setItem('pppi_cached_agri_questions', JSON.stringify(list));
          if (activePageId === 'agriculture') {
            renderApp();
          }
        }
      }
    }
  } catch (err) {
    console.warn('Agri questions fetch notice:', err.message);
  } finally {
    agricultureState.isLoading = false;
  }
}

let complaintState = {
  isSubmitted: false,
  submittedData: null,
  trackingMode: false,
  trackedComplaint: null,
  trackingError: '',
  searchTrackingNo: '',
  latitude: null,
  longitude: null,
  gpsAccuracy: null,
  gpsStatus: 'waiting',
  selfieData: null,
  evidenceFiles: [],
  stream: null,
};

let activePageId = 'home';
let membershipPlans = [...DEFAULT_PLANS];
let isLoadingPlans = false;
let selectedPlanIndex = 2;
let currentStep = 'SELECT_PLAN';
let showPassword = false;
let isSubmitting = false;
let formErrorMessage = '';

let profileFormData = {
  name: '', email: '', password: '', phone: '', age: '', gender: 'Male',
  father_name: '', mother_name: '', blood_group: 'A+',
  aadhaar_no: '', voter_id_no: '', state_ut: 'Karnataka',
  district: '', taluk: '', town_city: '', pincode: '',
  terms_accepted: false, profile_image: '',
};

let registeredMemberData = null;

let donationState = {
  funds: DEFAULT_FUNDS,
  selectedFundId: 1,
  selectedAmount: 1000,
  customAmount: '',
  donorForm: {
    name: '',
    mobile: '',
    email: '',
    city: '',
    state: 'Karnataka',
    pan: '',
    isAnonymous: false,
  },
  isSubmitting: false,
  donationReceipt: null,
  showArchivalDoc: false,
};

async function fetchBackendFunds() {
  try {
    const res = await fetch(`${API_BASE_URL}/funds`);
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.data) && data.data.length > 0) {
        donationState.funds = data.data.map((f, idx) => ({
          ...f,
          badge: `TARGET ${idx + 1}`,
          target_amount: parseFloat(f.target_amount) || 5000000,
          raised_amount: parseFloat(f.raised_amount) || 0,
        }));
        if (activePageId === 'donation') {
          renderApp();
        }
      }
    }
  } catch (err) {
    console.log('Using default seeded targets:', err.message);
  }
}

async function fetchBackendPlans() {
  isLoadingPlans = true;
  try {
    const res = await fetch(`${API_BASE_URL}/plans`);
    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.data) && data.data.length > 0) {
        membershipPlans = data.data;
        const popIndex = membershipPlans.findIndex((p) => p.is_popular);
        if (popIndex !== -1) selectedPlanIndex = popIndex;
      }
    }
  } catch (err) {
    console.warn('Live API fetch note:', err);
  } finally {
    isLoadingPlans = false;
    renderApp();
  }
}

function formatCurrency(amount) {
  if (amount === 0 || amount === '0') return 'FREE (₹0)';
  return `₹${Number(amount).toLocaleString('en-IN')}`;
}

function renderApp() {
  const app = document.querySelector('#app');
  if (!app) return;

  const currentItem = activePageId === 'preamble'
    ? { id: 'preamble', label: 'PREAMBLE', bg: '#009639', color: '#FFFFFF', title: 'The Sacred Preamble of Pasha People Party of India' }
    : activePageId === 'donation'
    ? { id: 'donation', label: 'DONATE FOR THE FUTURE', bg: '#C62828', color: '#FFFFFF', title: 'Donate for the Future' }
    : (ALL_MENU_ITEMS.find((item) => item.id === activePageId) || ALL_MENU_ITEMS[0]);

  app.innerHTML = `
    <div class="portal-container">
      <header class="top-banner-wrapper">
        <img
          src="/images/banner.jpg"
          alt="PASHA PEOPLE PARTY OF INDIA - Official Banner"
          class="top-banner-img"
          loading="eager"
        />
      </header>

      <div class="header-logo-area">
        <div class="logo-text-main">PPPICONNECT.COM</div>
        <!-- <div class="logo-text-reflection" aria-hidden="true">PPPICONNECT.COM</div>
        <!-- <button type="button" class="btn-header-donate btn-trigger-donation-nav" id="btn-header-donate" title="Donate for the Future">
          <i class="fa-solid fa-heart"></i> DONATE FOR THE FUTURE
        </button> -->
      </div>

      <nav class="menu-bar-container" aria-label="Main Navigation Menu">
        ${MENU_ROWS.map((row, rowIdx) => `
          <div class="menu-row" data-row="${rowIdx + 1}">
            ${row.map((item) => `
              <button
                type="button"
                class="menu-item-btn ${item.id === activePageId ? 'active' : ''} ${item.isEmergency ? 'emergency-btn' : ''}"
                data-id="${item.id}"
                style="background-color: ${item.bg}; color: ${item.color}; flex: ${item.flex || 1};"
                title="${item.label}"
              >
                ${item.label}
              </button>
            `).join('')}
          </div>
        `).join('')}
      </nav>

      ${
  activePageId === 'membership'
    ? renderMembershipModule()
    : activePageId === 'home'
    ? renderHomeScreen()
    : activePageId === 'about'
    ? renderAboutScreen()
    : activePageId === 'founder'
    ? renderFounderScreen()
    : activePageId === 'constitution'
    ? renderConstitutionScreen()
    : activePageId === 'donation'
    ? renderDonationScreen(donationState)
    : activePageId === 'preamble'
    ? renderPreambleScreen()
    : activePageId === 'newsletter'
    ? renderNewsletterScreen(newsletterState)
    : activePageId === 'publicities'
    ? renderPublicityScreen(publicityState)
    : activePageId === 'public-complaints'
    ? renderComplaintsScreen(complaintState)
    : (activePageId === 'employement' || activePageId === 'employment')
    ? renderEmploymentScreen(employmentState)
    : activePageId === 'agriculture'
    ? renderAgricultureScreen(agricultureState)
    : activePageId === 'law'
    ? renderLawScreen(lawState)
    : activePageId === 'marriages'
    ? renderMarriageScreen(marriageState)
    : activePageId === 'emergency'
    ? renderEmergencyScreen(emergencyState)
    : activePageId === 'elections'
    ? renderElectionsScreen(electionsState)
    : activePageId === 'other'
    ? renderOthersScreen(othersState)
    : renderStandardPage(currentItem)
}
    </div>
  `;

  attachEventListeners();
}

function renderStandardPage(item) {
  return `
    <main class="page-content-wrapper" id="page-content" role="main">
      <div class="active-page-badge" style="background-color: ${item.bg}; color: ${item.color};">
        <i class="fa-solid fa-layer-group"></i>
        <span>${item.label}</span>
      </div>
      <h1 class="active-page-heading">${item.title}</h1>
      <p class="active-page-subtext">
        Welcome to the official section for <strong>${item.label}</strong> of Pasha People Party of India (PPPI CONNECT).
      </p>
      <div class="page-status-pill">
        <i class="fa-solid fa-circle-check"></i>
        <span>Active & ready for content updates</span>
      </div>
    </main>
  `;
}

function renderMembershipModule() {
  const selectedPlan = membershipPlans[selectedPlanIndex] || membershipPlans[0];

  return `
    <div class="mobile-membership-screen" id="membership-screen">
      <div class="membership-app-bar">
        <div class="app-bar-left">
          <div class="app-bar-icon-wrap">
            <i class="fa-solid fa-id-card"></i>
          </div>
          <div>
            <h2 class="app-bar-title">
              ${currentStep === 'SELECT_PLAN' ? 'Select Membership Plan' : ''}
              ${currentStep === 'COMPLETE_PROFILE' ? 'Complete Profile' : ''}
              ${currentStep === 'PAYMENT_CHECKOUT' ? 'Checkout & Payment' : ''}
              ${currentStep === 'REGISTRATION_SUCCESS' ? 'Official Membership Verified' : ''}
            </h2>
            <div class="app-bar-subtitle">Pasha People Party of India • Official Mobile Portal</div>
          </div>
        </div>
        <div class="app-bar-badge">
          <i class="fa-solid fa-shield-halved"></i>
          <span>${currentStep === 'REGISTRATION_SUCCESS' ? 'Active Member' : 'Verified Portal'}</span>
        </div>
      </div>

      <div class="registration-stepper">
        <div class="step-node ${currentStep === 'SELECT_PLAN' ? 'active' : 'completed'}" data-nav-step="SELECT_PLAN">
          <div class="step-circle">${currentStep === 'SELECT_PLAN' ? '1' : '<i class="fa-solid fa-check"></i>'}</div>
          <span>1. Plans</span>
        </div>
        <div class="step-divider ${currentStep !== 'SELECT_PLAN' ? 'completed' : ''}"></div>

        <div class="step-node ${currentStep === 'COMPLETE_PROFILE' ? 'active' : (currentStep === 'PAYMENT_CHECKOUT' || currentStep === 'REGISTRATION_SUCCESS' ? 'completed' : '')}">
          <div class="step-circle">${(currentStep === 'PAYMENT_CHECKOUT' || currentStep === 'REGISTRATION_SUCCESS') ? '<i class="fa-solid fa-check"></i>' : '2'}</div>
          <span>2. Profile</span>
        </div>
        <div class="step-divider ${(currentStep === 'PAYMENT_CHECKOUT' || currentStep === 'REGISTRATION_SUCCESS') ? 'completed' : ''}"></div>

        <div class="step-node ${currentStep === 'PAYMENT_CHECKOUT' ? 'active' : (currentStep === 'REGISTRATION_SUCCESS' ? 'completed' : '')}">
          <div class="step-circle">${currentStep === 'REGISTRATION_SUCCESS' ? '<i class="fa-solid fa-check"></i>' : '3'}</div>
          <span>3. Payment</span>
        </div>
        <div class="step-divider ${currentStep === 'REGISTRATION_SUCCESS' ? 'completed' : ''}"></div>

        <div class="step-node ${currentStep === 'REGISTRATION_SUCCESS' ? 'active completed' : ''}">
          <div class="step-circle">4</div>
          <span>4. ID Card</span>
        </div>
      </div>

      ${currentStep === 'SELECT_PLAN' ? renderStep1Plans(selectedPlan) : ''}
      ${currentStep === 'COMPLETE_PROFILE' ? renderStep2Profile(selectedPlan) : ''}
      ${currentStep === 'PAYMENT_CHECKOUT' ? renderStep3Payment(selectedPlan) : ''}
      ${currentStep === 'REGISTRATION_SUCCESS' ? renderStep4Success(selectedPlan) : ''}
    </div>
  `;
}

function renderStep1Plans(selectedPlan) {
  if (isLoadingPlans) {
    return `
      <div style="padding: 60px 20px; text-align: center; color: #64748b;">
        <i class="fa-solid fa-spinner fa-spin" style="font-size: 32px; color: #2e1a72; margin-bottom: 12px;"></i>
        <div style="font-weight: 700; font-size: 15px;">Loading Official Membership Plans...</div>
      </div>
    `;
  }

  return `
    <div class="plans-scroll-container">
      ${membershipPlans.map((plan, index) => {
        const isSelected = selectedPlanIndex === index;
        return `
          <div class="mobile-plan-card ${isSelected ? 'selected' : ''}" data-plan-index="${index}" role="button" tabindex="0">
            ${plan.is_popular ? `
              <div class="plan-popular-ribbon">
                <i class="fa-solid fa-star"></i>
                <span>Most Popular</span>
              </div>
            ` : ''}

            <div class="plan-benefits-list">
              ${(plan.benefits || []).map((benefit) => `
                <div class="plan-benefit-item">
                  <i class="fa-solid fa-star benefit-star-icon"></i>
                  <span class="benefit-text">${benefit}</span>
                </div>
              `).join('')}
            </div>

            <div class="plan-divider"></div>

            <div class="plan-bottom-row">
              <div>
                <span class="plan-name-badge">${(plan.plan_name || 'MEMBERSHIP PLAN').toUpperCase()}</span>
                <div class="plan-price-text">${formatCurrency(plan.price)}</div>
              </div>

              <div class="plan-radio-wrap">
                ${isSelected
                  ? '<i class="fa-solid fa-circle-check radio-selected-icon"></i>'
                  : '<i class="fa-regular fa-circle radio-unselected-icon"></i>'
                }
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>

    <div class="membership-action-footer">
      <button type="button" class="btn-proceed-register" id="btn-goto-profile" ${selectedPlanIndex === -1 ? 'disabled' : ''}>
        <span>Proceed To Register (${selectedPlan ? selectedPlan.plan_name : 'Select Plan'})</span>
        <i class="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  `;
}

function renderStep2Profile(selectedPlan) {
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const genders = ['Male', 'Female', 'Other'];

  return `
    <div class="complete-profile-container">
      ${formErrorMessage ? `
        <div class="form-alert-banner">
          <i class="fa-solid fa-triangle-exclamation"></i>
          <span>${formErrorMessage}</span>
        </div>
      ` : ''}

      <div style="background: #eef2ff; border: 1px solid #c7d2fe; border-radius: 12px; padding: 12px 16px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <span style="font-size: 11px; font-weight: 700; color: #4338ca; text-transform: uppercase;">Selected Plan:</span>
          <div style="font-size: 16px; font-weight: 900; color: #1e1b4b;">${selectedPlan.plan_name}</div>
        </div>
        <div style="font-size: 17px; font-weight: 900; color: #2e1a72;">
          ${formatCurrency(selectedPlan.price)}
        </div>
      </div>

      <form id="complete-profile-form">
        <div class="profile-photo-wrapper">
          <input type="file" id="profile-image-input" accept="image/*" style="display: none;" />
          <div class="profile-photo-circle" id="profile-photo-trigger" title="Upload Member Photo">
            ${profileFormData.profile_image
              ? `<img src="${profileFormData.profile_image}" alt="Profile Preview" class="profile-photo-img" />`
              : `<i class="fa-solid fa-user profile-photo-placeholder"></i>`
            }
            <div class="profile-photo-badge"><i class="fa-solid fa-camera"></i></div>
          </div>
          <div class="profile-photo-hint">Click to upload official member photo</div>
        </div>

        <div class="form-section-header">
          <div class="form-section-title-wrap">
            <div class="form-section-icon"><i class="fa-solid fa-user"></i></div>
            <div class="form-section-title">Personal Information</div>
          </div>
          <div class="form-section-divider"></div>
        </div>

        <div class="form-group">
          <label class="form-label">Full Name *</label>
          <div class="form-input-wrap">
            <i class="fa-solid fa-user form-input-icon"></i>
            <input type="text" id="field-name" class="form-input" placeholder="Full legal name" value="${profileFormData.name}" required />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Email Address *</label>
          <div class="form-input-wrap">
            <i class="fa-solid fa-envelope form-input-icon"></i>
            <input type="email" id="field-email" class="form-input" placeholder="member@example.com" value="${profileFormData.email}" required />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Password * (minimum 6 characters)</label>
          <div class="form-input-wrap">
            <i class="fa-solid fa-lock form-input-icon"></i>
            <input type="${showPassword ? 'text' : 'password'}" id="field-password" class="form-input" placeholder="Create strong password" value="${profileFormData.password}" minlength="6" required />
            <button type="button" class="form-password-toggle" id="toggle-password-btn">
              <i class="fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}"></i>
            </button>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Phone / Mobile Number * (10 digits)</label>
          <div class="form-input-wrap">
            <i class="fa-solid fa-mobile-screen form-input-icon"></i>
            <input type="tel" id="field-phone" class="form-input" placeholder="10-digit mobile number" value="${profileFormData.phone}" maxlength="10" pattern="[0-9]{10}" required />
          </div>
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label">Age *</label>
            <div class="form-input-wrap">
              <i class="fa-solid fa-cake-candles form-input-icon"></i>
              <input type="number" id="field-age" class="form-input" placeholder="Age (18-120)" min="18" max="120" value="${profileFormData.age}" required />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Gender *</label>
            <select id="field-gender" class="form-select">
              ${genders.map((g) => `<option value="${g}" ${profileFormData.gender === g ? 'selected' : ''}>${g}</option>`).join('')}
            </select>
          </div>
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label">Father Name *</label>
            <div class="form-input-wrap">
              <i class="fa-solid fa-people-roof form-input-icon"></i>
              <input type="text" id="field-father-name" class="form-input" placeholder="Father's full name" value="${profileFormData.father_name}" required />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Mother Name *</label>
            <div class="form-input-wrap">
              <i class="fa-solid fa-people-roof form-input-icon"></i>
              <input type="text" id="field-mother-name" class="form-input" placeholder="Mother's full name" value="${profileFormData.mother_name}" required />
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Blood Group *</label>
          <select id="field-blood-group" class="form-select">
            ${bloodGroups.map((bg) => `<option value="${bg}" ${profileFormData.blood_group === bg ? 'selected' : ''}>${bg}</option>`).join('')}
          </select>
        </div>

        <div class="form-section-header">
          <div class="form-section-title-wrap">
            <div class="form-section-icon"><i class="fa-solid fa-id-badge"></i></div>
            <div class="form-section-title">Identity Information</div>
          </div>
          <div class="form-section-divider"></div>
        </div>

        <div class="form-group">
          <label class="form-label">Aadhaar Number * (12 digits)</label>
          <div class="form-input-wrap">
            <i class="fa-solid fa-address-card form-input-icon"></i>
            <input type="text" id="field-aadhaar" class="form-input" placeholder="12-digit Aadhaar number" maxlength="12" pattern="[0-9]{12}" value="${profileFormData.aadhaar_no}" required />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Voter ID Number *</label>
          <div class="form-input-wrap">
            <i class="fa-solid fa-check-to-slot form-input-icon"></i>
            <input type="text" id="field-voter-id" class="form-input" placeholder="e.g. ABC1234567" value="${profileFormData.voter_id_no}" style="text-transform: uppercase;" required />
          </div>
        </div>

        <div class="form-section-header">
          <div class="form-section-title-wrap">
            <div class="form-section-icon"><i class="fa-solid fa-map-location-dot"></i></div>
            <div class="form-section-title">Location Details</div>
          </div>
          <div class="form-section-divider"></div>
        </div>

        <div class="form-group">
          <label class="form-label">State / UT *</label>
          <div class="form-input-wrap">
            <i class="fa-solid fa-map form-input-icon"></i>
            <input type="text" id="field-state" class="form-input" placeholder="State or Union Territory" value="${profileFormData.state_ut}" required />
          </div>
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label">District *</label>
            <input type="text" id="field-district" class="form-input has-no-icon" placeholder="District" value="${profileFormData.district}" required />
          </div>

          <div class="form-group">
            <label class="form-label">Taluk *</label>
            <input type="text" id="field-taluk" class="form-input has-no-icon" placeholder="Taluk" value="${profileFormData.taluk}" required />
          </div>
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label">Town / City *</label>
            <input type="text" id="field-town-city" class="form-input has-no-icon" placeholder="Town or City" value="${profileFormData.town_city}" required />
          </div>

          <div class="form-group">
            <label class="form-label">PIN Code * (6 digits)</label>
            <input type="text" id="field-pincode" class="form-input has-no-icon" placeholder="6-digit PIN code" maxlength="6" pattern="[0-9]{6}" value="${profileFormData.pincode}" required />
          </div>
        </div>

        <label class="terms-agreement-card">
          <input type="checkbox" id="field-terms" class="terms-checkbox" ${profileFormData.terms_accepted ? 'checked' : ''} required />
          <span class="terms-label">
            I agree to the Pasha People Party of India (PPPI) Terms & Conditions, Bylaws, and Official Code of Conduct.
          </span>
        </label>

        <div class="membership-action-footer" style="padding: 0; background: transparent; border: none; margin-top: 20px;">
          <button type="button" class="btn-secondary-back" id="btn-back-to-plans">
            <i class="fa-solid fa-arrow-left"></i>
            <span>Back to Plans</span>
          </button>

          <button type="submit" class="btn-proceed-register" id="btn-submit-profile" ${isSubmitting ? 'disabled' : ''}>
            ${isSubmitting
              ? '<i class="fa-solid fa-spinner fa-spin"></i><span>Saving Profile...</span>'
              : (selectedPlan.is_free || selectedPlan.price === 0
                  ? '<span>Complete & Activate Membership</span><i class="fa-solid fa-circle-check"></i>'
                  : '<span>Proceed to Payment</span><i class="fa-solid fa-lock"></i>'
                )
            }
          </button>
        </div>
      </form>
    </div>
  `;
}

function renderStep3Payment(selectedPlan) {
  const formattedFee = formatCurrency(selectedPlan.price);

  return `
    <div class="payment-screen-container">
      <div class="razorpay-test-mode-badge">
        <i class="fa-solid fa-flask-vial razorpay-test-icon"></i>
        <div class="razorpay-test-text">
          Razorpay Test Mode Active. Use test UPI, Netbanking, or test card to complete payment.
        </div>
      </div>

      <div class="order-summary-card">
        <div class="summary-plan-header">
          <div class="summary-plan-icon">
            <i class="fa-solid fa-award"></i>
          </div>
          <div>
            <div class="summary-plan-title-sub">Selected Membership Tier</div>
            <div class="summary-plan-title-main">${selectedPlan.plan_name}</div>
          </div>
        </div>

        <div class="summary-table">
          <div class="summary-row">
            <span>Membership Registration Fee</span>
            <span>${formattedFee}</span>
          </div>
          <div class="summary-row">
            <span>GST / Taxes</span>
            <span class="value-green">Included (0% Surcharge)</span>
          </div>
          <div class="summary-row total-row">
            <span>Total Payable Amount</span>
            <span>${formattedFee}</span>
          </div>
        </div>
      </div>

      <div class="user-recap-card">
        <div class="recap-title">Member Payment Details</div>
        <div class="recap-row">
          <i class="fa-solid fa-user"></i>
          <span>${profileFormData.name}</span>
        </div>
        <div class="recap-row">
          <i class="fa-solid fa-envelope"></i>
          <span>${profileFormData.email}</span>
        </div>
        <div class="recap-row">
          <i class="fa-solid fa-phone"></i>
          <span>+91 ${profileFormData.phone}</span>
        </div>
        <div class="recap-row">
          <i class="fa-solid fa-location-dot"></i>
          <span>${profileFormData.district || 'Karnataka'}, ${profileFormData.state_ut}</span>
        </div>
      </div>

      <div class="security-badges-row">
        <div class="security-badge-item">
          <i class="fa-solid fa-shield-halved security-badge-icon"></i>
          <span class="security-badge-label">Razorpay Secured</span>
        </div>
        <div class="security-badge-item">
          <i class="fa-solid fa-lock security-badge-icon"></i>
          <span class="security-badge-label">256-Bit SSL</span>
        </div>
        <div class="security-badge-item">
          <i class="fa-solid fa-bolt security-badge-icon"></i>
          <span class="security-badge-label">Instant Activation</span>
        </div>
      </div>

      <div class="membership-action-footer" style="padding: 0; background: transparent; border: none;">
        <button type="button" class="btn-secondary-back" id="btn-back-to-profile">
          <i class="fa-solid fa-arrow-left"></i>
          <span>Edit Profile</span>
        </button>

        <button type="button" class="btn-proceed-register" id="btn-trigger-razorpay" ${isSubmitting ? 'disabled' : ''}>
          ${isSubmitting
            ? '<i class="fa-solid fa-spinner fa-spin"></i><span>Opening Payment...</span>'
            : `<i class="fa-solid fa-lock"></i><span>Pay Now (${formattedFee})</span>`
          }
        </button>
      </div>
    </div>
  `;
}

function renderStep4Success(selectedPlan) {
  const member = registeredMemberData || {
    memberId: `PPPI-2026-${Math.floor(10000 + Math.random() * 90000)}`,
    registrationDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
    amountPaid: formatCurrency(selectedPlan.price),
    status: 'Verified & Active',
    ...profileFormData,
  };

  return `
    <div class="success-screen-container" id="printable-receipt-area">
      <div class="success-header-banner">
        <div class="success-icon-badge">
          <i class="fa-solid fa-circle-check"></i>
        </div>
        <h3 class="success-title">Registration Successful!</h3>
        <p class="success-subtext">
          Welcome to the Pasha People Party of India. Your membership is now officially registered.
        </p>
      </div>

      <div class="digital-id-card-rich">
        <i class="fa-solid fa-seedling digital-id-watermark-rich"></i>

        <div class="id-card-top-row">
          <div>
            <div class="id-party-name">PASHA PEOPLE PARTY OF INDIA</div>
            <div class="id-party-motto">For Peace, Prosperity and Power</div>
          </div>
          <div class="id-pineapple-badge">
            🍍 VOTE FOR PINEAPPLE
          </div>
        </div>

        <div class="id-card-middle-row">
          <div class="id-avatar-frame">
            ${member.profile_image
              ? `<img src="${member.profile_image}" alt="${member.name}" />`
              : `<i class="fa-solid fa-user"></i>`
            }
          </div>
          <div>
            <div class="id-name">${member.name || 'Party Member'}</div>
            <div class="id-number-tag">MEMBER ID: ${member.memberId}</div>
            <div class="id-contact-line">+91 ${member.phone} • ${member.district ? member.district + ', ' : ''}${member.state_ut}</div>
          </div>
        </div>

        <div class="id-card-bottom-row">
          <div>
            <div class="id-tier-label">MEMBERSHIP CATEGORY</div>
            <div class="id-tier-name">${selectedPlan.plan_name.toUpperCase()}</div>
          </div>
          <div class="id-qr-box" title="Digital Member Verification">
            <i class="fa-solid fa-qrcode"></i>
          </div>
        </div>
      </div>

      <div class="details-section-card">
        <div class="details-section-header">
          <i class="fa-solid fa-circle-info"></i>
          <span>Membership Summary</span>
        </div>
        <div class="details-grid">
          <div class="detail-item">
            <span class="detail-label">Membership ID</span>
            <span class="detail-value" style="color: #2e1a72; font-weight: 900;">${member.memberId}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Registration Date</span>
            <span class="detail-value">${member.registrationDate}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Membership Status</span>
            <span class="detail-value" style="color: #16a34a;"><i class="fa-solid fa-circle-check"></i> ${member.status}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Amount Paid</span>
            <span class="detail-value">${member.amountPaid}</span>
          </div>
        </div>
      </div>

      <div class="details-section-card">
        <div class="details-section-header">
          <i class="fa-solid fa-user"></i>
          <span>Personal Information</span>
        </div>
        <div class="details-grid">
          <div class="detail-item">
            <span class="detail-label">Full Name</span>
            <span class="detail-value">${member.name}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Age / Gender</span>
            <span class="detail-value">${member.age || 'N/A'} yrs • ${member.gender}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Father's Name</span>
            <span class="detail-value">${member.father_name}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Mother's Name</span>
            <span class="detail-value">${member.mother_name}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Blood Group</span>
            <span class="detail-value">${member.blood_group}</span>
          </div>
        </div>
      </div>

      <div class="details-section-card">
        <div class="details-section-header">
          <i class="fa-solid fa-id-badge"></i>
          <span>Contact & Identification</span>
        </div>
        <div class="details-grid">
          <div class="detail-item">
            <span class="detail-label">Mobile Number</span>
            <span class="detail-value">+91 ${member.phone}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Email Address</span>
            <span class="detail-value">${member.email}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Aadhaar Number</span>
            <span class="detail-value">XXXX-XXXX-${member.aadhaar_no ? member.aadhaar_no.slice(-4) : 'XXXX'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Voter ID Number</span>
            <span class="detail-value">${member.voter_id_no || 'N/A'}</span>
          </div>
        </div>
      </div>

      <div class="details-section-card">
        <div class="details-section-header">
          <i class="fa-solid fa-map-location-dot"></i>
          <span>Location Details</span>
        </div>
        <div class="details-grid">
          <div class="detail-item">
            <span class="detail-label">State / UT</span>
            <span class="detail-value">${member.state_ut}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">District</span>
            <span class="detail-value">${member.district}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Taluk</span>
            <span class="detail-value">${member.taluk}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Town / City</span>
            <span class="detail-value">${member.town_city}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">PIN Code</span>
            <span class="detail-value">${member.pincode}</span>
          </div>
        </div>
      </div>

      <div class="details-section-card">
        <div class="details-section-header">
          <i class="fa-solid fa-star" style="color: #ffd700;"></i>
          <span>Plan Entitlements (${selectedPlan.plan_name})</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${(selectedPlan.benefits || []).map((b) => `
            <div style="display: flex; align-items: center; gap: 10px; font-size: 13.5px; font-weight: 600; color: #1e293b;">
              <i class="fa-solid fa-circle-check" style="color: #16a34a;"></i>
              <span>${b}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="receipt-action-bar">
        <button type="button" class="btn-download-receipt" id="btn-print-receipt">
          <i class="fa-solid fa-download"></i>
          <span>Download / Print Official Receipt</span>
        </button>

        <button type="button" class="btn-proceed-register" id="btn-done-flow">
          <i class="fa-solid fa-house"></i>
          <span>Done & Return to Plans</span>
        </button>
      </div>
    </div>
  `;
}

function attachEventListeners() {
  // Image 1 Hero Action Buttons on Home
  ['btn-hero-app-download', 'btn-hero-app-mobile', 'btn-hero-app-money'].forEach((btnId) => {
    const el = document.getElementById(btnId);
    if (el) {
      el.addEventListener('click', () => {
        activePageId = 'membership';
        renderApp();
        window.scrollTo({ top: 350, behavior: 'smooth' });
      });
    }
  });

  // About Screen Listeners
  const aboutToMemberBtn = document.getElementById('btn-about-to-membership');
  if (aboutToMemberBtn) {
    aboutToMemberBtn.addEventListener('click', () => {
      activePageId = 'membership';
      renderApp();
      window.scrollTo({ top: 350, behavior: 'smooth' });
    });
  }

  const aboutToFounderBtn = document.getElementById('btn-about-to-founder');
  if (aboutToFounderBtn) {
    aboutToFounderBtn.addEventListener('click', () => {
      activePageId = 'preamble';
      renderApp();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const toggleAboutDocBtn = document.getElementById('btn-toggle-about-doc');
  const aboutDocPreview = document.getElementById('about-doc-preview');
  if (toggleAboutDocBtn && aboutDocPreview) {
    toggleAboutDocBtn.addEventListener('click', () => {
      const isHidden = aboutDocPreview.style.display === 'none';
      aboutDocPreview.style.display = isHidden ? 'block' : 'none';
      if (isHidden) {
        aboutDocPreview.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  const closeAboutDocBtn = document.getElementById('btn-close-about-doc');
  if (closeAboutDocBtn && aboutDocPreview) {
    closeAboutDocBtn.addEventListener('click', () => {
      aboutDocPreview.style.display = 'none';
    });
  }

  // Founder Screen Listeners
  // Expanded Founder Screen Listeners
  const founderJoinPlanBtn = document.getElementById('btn-founder-join-plan');
  if (founderJoinPlanBtn) {
    founderJoinPlanBtn.addEventListener('click', () => {
      activePageId = 'membership';
      renderApp();
      window.scrollTo({ top: 350, behavior: 'smooth' });
    });
  }

  const toggleFounderMsgDocsBtn = document.getElementById('btn-toggle-founder-msg-docs');
  const founderMsgDocsWrap = document.getElementById('founder-msg-docs-wrap');
  if (toggleFounderMsgDocsBtn && founderMsgDocsWrap) {
    toggleFounderMsgDocsBtn.addEventListener('click', () => {
      const isHidden = founderMsgDocsWrap.style.display === 'none';
      founderMsgDocsWrap.style.display = isHidden ? 'block' : 'none';
      if (isHidden) {
        founderMsgDocsWrap.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  const closeFounderMsgDocsBtn = document.getElementById('btn-close-founder-msg-docs');
  if (closeFounderMsgDocsBtn && founderMsgDocsWrap) {
    closeFounderMsgDocsBtn.addEventListener('click', () => {
      founderMsgDocsWrap.style.display = 'none';
    });
  }

  const founderToMemberBtn = document.getElementById('btn-founder-to-membership');
  if (founderToMemberBtn) {
    founderToMemberBtn.addEventListener('click', () => {
      activePageId = 'membership';
      renderApp();
      window.scrollTo({ top: 350, behavior: 'smooth' });
    });
  }

  const togglePreambleDocBtn = document.getElementById('btn-toggle-preamble-doc');
  const preambleDocPreview = document.getElementById('preamble-doc-preview');
  if (togglePreambleDocBtn && preambleDocPreview) {
    togglePreambleDocBtn.addEventListener('click', () => {
      const isHidden = preambleDocPreview.style.display === 'none';
      preambleDocPreview.style.display = isHidden ? 'block' : 'none';
      if (isHidden) {
        preambleDocPreview.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  const closePreambleDocBtn = document.getElementById('btn-close-preamble-doc');
  if (closePreambleDocBtn && preambleDocPreview) {
    closePreambleDocBtn.addEventListener('click', () => {
      preambleDocPreview.style.display = 'none';
    });
  }

  // Constitution Screen Listeners
  const constToMemberBtn = document.getElementById('btn-const-to-membership');
  if (constToMemberBtn) {
    constToMemberBtn.addEventListener('click', () => {
      activePageId = 'membership';
      renderApp();
      window.scrollTo({ top: 350, behavior: 'smooth' });
    });
  }

  const constToAboutBtn = document.getElementById('btn-const-to-about');
  if (constToAboutBtn) {
    constToAboutBtn.addEventListener('click', () => {
      activePageId = 'about';
      renderApp();
      window.scrollTo({ top: 200, behavior: 'smooth' });
    });
  }

  const heroJoinBtn = document.getElementById('btn-hero-join-pppi');
  if (heroJoinBtn) {
    heroJoinBtn.addEventListener('click', () => {
      activePageId = 'membership';
      renderApp();
      window.scrollTo({ top: 350, behavior: 'smooth' });
    });
  }
  // Navigation Menu Buttons
  document.querySelectorAll('.menu-item-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const clickedId = e.currentTarget.getAttribute('data-id');
      if (clickedId && clickedId !== activePageId) {
        activePageId = clickedId;
        if (clickedId === 'newsletter') {
          fetchNewsletters();
        }
        if (clickedId === 'publicities') {
          fetchPublicities();
        }
        if (clickedId === 'employement') {
          fetchJobs();
        }
        if (clickedId === 'agriculture') {
          fetchAgriQuestions();
        }
        if (clickedId === 'law') {
          fetchLegalCases();
        }
        if (clickedId === 'marriages') {
          fetchMarriageApplications();
        }
        if (clickedId === 'emergency') {
          fetchEmergencyAlerts();
        }
        if (clickedId === 'elections') {
          fetchElectionsData();
        }
        renderApp();
      }
    });
  });

  // Step 1: Plan Cards Selection
  document.querySelectorAll('.mobile-plan-card').forEach((card) => {
    card.addEventListener('click', (e) => {
      const idx = parseInt(e.currentTarget.getAttribute('data-plan-index'), 10);
      if (!isNaN(idx)) {
        selectedPlanIndex = idx;
        renderApp();
      }
    });
  });

  // Step 1: Proceed to Profile Button
  const gotoProfileBtn = document.getElementById('btn-goto-profile');
  if (gotoProfileBtn) {
    gotoProfileBtn.addEventListener('click', () => {
      currentStep = 'COMPLETE_PROFILE';
      formErrorMessage = '';
      renderApp();
      window.scrollTo({ top: 400, behavior: 'smooth' });
    });
  }

  // Stepper Header Node Clicks
  document.querySelectorAll('.step-node').forEach((node) => {
    node.addEventListener('click', (e) => {
      const targetStep = e.currentTarget.getAttribute('data-nav-step');
      if (targetStep && (targetStep === 'SELECT_PLAN' || (targetStep === 'COMPLETE_PROFILE' && registeredMemberData))) {
        currentStep = targetStep;
        renderApp();
      }
    });
  });

  // Step 2: Back to Plans Button
  const backToPlansBtn = document.getElementById('btn-back-to-plans');
  if (backToPlansBtn) {
    backToPlansBtn.addEventListener('click', () => {
      currentStep = 'SELECT_PLAN';
      renderApp();
    });
  }

  // Step 2: Password Visibility Toggle
  const togglePassBtn = document.getElementById('toggle-password-btn');
  if (togglePassBtn) {
    togglePassBtn.addEventListener('click', () => {
      showPassword = !showPassword;
      const passInput = document.getElementById('field-password');
      if (passInput) passInput.type = showPassword ? 'text' : 'password';
      togglePassBtn.innerHTML = `<i class="fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}"></i>`;
    });
  }

  // Step 2: Profile Photo Upload Click
  const photoTrigger = document.getElementById('profile-photo-trigger');
  const photoInput = document.getElementById('profile-image-input');
  if (photoTrigger && photoInput) {
    photoTrigger.addEventListener('click', () => photoInput.click());
    photoInput.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          profileFormData.profile_image = event.target.result;
          renderApp();
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Step 2: Complete Profile Form Submit
  const profileForm = document.getElementById('complete-profile-form');
  if (profileForm) {
    profileForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      formErrorMessage = '';

      profileFormData.name = document.getElementById('field-name')?.value.trim() || '';
      profileFormData.email = document.getElementById('field-email')?.value.trim() || '';
      profileFormData.password = document.getElementById('field-password')?.value.trim() || '';
      profileFormData.phone = document.getElementById('field-phone')?.value.trim() || '';
      profileFormData.age = document.getElementById('field-age')?.value.trim() || '';
      profileFormData.gender = document.getElementById('field-gender')?.value || 'Male';
      profileFormData.father_name = document.getElementById('field-father-name')?.value.trim() || '';
      profileFormData.mother_name = document.getElementById('field-mother-name')?.value.trim() || '';
      profileFormData.blood_group = document.getElementById('field-blood-group')?.value || 'A+';
      profileFormData.aadhaar_no = document.getElementById('field-aadhaar')?.value.trim() || '';
      profileFormData.voter_id_no = document.getElementById('field-voter-id')?.value.trim().toUpperCase() || '';
      profileFormData.state_ut = document.getElementById('field-state')?.value.trim() || 'Karnataka';
      profileFormData.district = document.getElementById('field-district')?.value.trim() || '';
      profileFormData.taluk = document.getElementById('field-taluk')?.value.trim() || '';
      profileFormData.town_city = document.getElementById('field-town-city')?.value.trim() || '';
      profileFormData.pincode = document.getElementById('field-pincode')?.value.trim() || '';
      profileFormData.terms_accepted = document.getElementById('field-terms')?.checked || false;

      if (!profileFormData.terms_accepted) {
        formErrorMessage = 'Please accept the Party Terms & Conditions and Code of Conduct.';
        renderApp();
        return;
      }

      if (profileFormData.phone.length !== 10) {
        formErrorMessage = 'Mobile number must be exactly 10 digits.';
        renderApp();
        return;
      }

      if (profileFormData.aadhaar_no.length !== 12) {
        formErrorMessage = 'Aadhaar number must be exactly 12 digits.';
        renderApp();
        return;
      }

      isSubmitting = true;
      renderApp();

      const selectedPlan = membershipPlans[selectedPlanIndex] || membershipPlans[0];

      let backendUserId = null;
      try {
        const payload = {
          name: profileFormData.name,
          email: profileFormData.email,
          password: profileFormData.password,
          phone: profileFormData.phone,
          role: 'USER',
          age: parseInt(profileFormData.age, 10) || 25,
          gender: profileFormData.gender,
          father_name: profileFormData.father_name,
          mother_name: profileFormData.mother_name,
          blood_group: profileFormData.blood_group,
          aadhaar_no: profileFormData.aadhaar_no,
          voter_id_no: profileFormData.voter_id_no,
          state_ut: profileFormData.state_ut,
          district: profileFormData.district,
          taluk: profileFormData.taluk,
          town_city: profileFormData.town_city,
          pincode: profileFormData.pincode,
          terms_accepted: true,
          profile_image: profileFormData.profile_image || null,
          status: true,
          plan_id: selectedPlan.id,
          is_paid: selectedPlan.is_free || selectedPlan.price === 0,
        };

        const res = await fetch(`${API_BASE_URL}/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (res.ok && data.data && data.data.id) {
          backendUserId = data.data.id;
        } else if (data && data.message) {
          console.warn('Backend user registration note:', data.message);
        }
      } catch (err) {
        console.warn('Backend connection note:', err);
      }

      isSubmitting = false;

      if (selectedPlan.is_free || selectedPlan.price === 0) {
        registeredMemberData = {
          ...profileFormData,
          userId: backendUserId || Math.floor(1000 + Math.random() * 9000),
          memberId: `PPPI-2026-${Math.floor(10000 + Math.random() * 90000)}`,
          registrationDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
          amountPaid: 'FREE (₹0)',
          status: 'Active & Verified',
        };
        currentStep = 'REGISTRATION_SUCCESS';
      } else {
        profileFormData.userId = backendUserId;
        currentStep = 'PAYMENT_CHECKOUT';
      }

      renderApp();
      window.scrollTo({ top: 350, behavior: 'smooth' });
    });
  }

  // Step 3: Back to Profile Edit Button
  const backToProfileBtn = document.getElementById('btn-back-to-profile');
  if (backToProfileBtn) {
    backToProfileBtn.addEventListener('click', () => {
      currentStep = 'COMPLETE_PROFILE';
      renderApp();
    });
  }

  // Step 3: Trigger Razorpay Checkout
  const triggerRazorpayBtn = document.getElementById('btn-trigger-razorpay');
  if (triggerRazorpayBtn) {
    triggerRazorpayBtn.addEventListener('click', async () => {
      const selectedPlan = membershipPlans[selectedPlanIndex] || membershipPlans[0];
      isSubmitting = true;
      renderApp();

      let orderId = `order_${Date.now()}`;
      let keyToUse = RAZORPAY_TEST_KEY;

      try {
        const orderRes = await fetch(`${API_BASE_URL}/payments/create-order`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            amount: selectedPlan.price,
            type: 'MEMBERSHIP',
            plan_id: selectedPlan.id,
            user_id: profileFormData.userId || 1,
          }),
        });

        if (orderRes.ok) {
          const orderData = await orderRes.json();
          if (orderData.data) {
            orderId = orderData.data.order_id || orderId;
            if (orderData.data.key_id) keyToUse = orderData.data.key_id;
          }
        }
      } catch (err) {
        console.warn('Backend order creation warning, using direct test mode:', err);
      }

      isSubmitting = false;
      renderApp();

      if (typeof window.Razorpay === 'function') {
        const options = {
          key: keyToUse,
          amount: Math.round(selectedPlan.price * 100),
          currency: 'INR',
          name: 'Pasha People Party of India',
          description: `Membership Payment - ${selectedPlan.plan_name}`,
          image: '/images/banner.jpg',
          order_id: (orderId && !orderId.startsWith('order_mock_')) ? orderId : undefined,
          handler: async function (response) {
            try {
              await fetch(`${API_BASE_URL}/payments/verify-payment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id || orderId,
                  razorpay_payment_id: response.razorpay_payment_id || `pay_${Date.now()}`,
                  razorpay_signature: response.razorpay_signature || '',
                  status: 'SUCCESS',
                  user_id: profileFormData.userId || 1,
                }),
              });
            } catch (_) {}

            registeredMemberData = {
              ...profileFormData,
              memberId: `PPPI-2026-${Math.floor(10000 + Math.random() * 90000)}`,
              registrationDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
              amountPaid: formatCurrency(selectedPlan.price),
              status: 'Active & Verified',
              paymentId: response.razorpay_payment_id,
            };

            currentStep = 'REGISTRATION_SUCCESS';
            renderApp();
            window.scrollTo({ top: 350, behavior: 'smooth' });
          },
          prefill: {
            name: profileFormData.name,
            email: profileFormData.email,
            contact: profileFormData.phone,
          },
          theme: {
            color: '#2e1a72',
          },
          modal: {
            ondismiss: function () {
              console.log('Payment modal dismissed by user');
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (response) {
          alert(`Payment failed or cancelled: ${response.error?.description || 'Please try again.'}`);
        });
        rzp.open();
      } else {
        const proceed = confirm(`Razorpay Checkout Simulation: Complete payment of ${formatCurrency(selectedPlan.price)}?`);
        if (proceed) {
          registeredMemberData = {
            ...profileFormData,
            memberId: `PPPI-2026-${Math.floor(10000 + Math.random() * 90000)}`,
            registrationDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
            amountPaid: formatCurrency(selectedPlan.price),
            status: 'Active & Verified',
          };
          currentStep = 'REGISTRATION_SUCCESS';
          renderApp();
        }
      }
    });
  }

  // Step 4: Print / Download Receipt
  const printReceiptBtn = document.getElementById('btn-print-receipt');
  if (printReceiptBtn) {
    printReceiptBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Step 4: Finish and Return
  const doneFlowBtn = document.getElementById('btn-done-flow');
  if (doneFlowBtn) {
    doneFlowBtn.addEventListener('click', () => {
      currentStep = 'SELECT_PLAN';
      renderApp();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // =========================================================================
  // PREAMBLE SCREEN EVENT LISTENERS
  // =========================================================================
  const preambleToAboutBtn = document.getElementById('btn-preamble-to-about');
  if (preambleToAboutBtn) {
    preambleToAboutBtn.addEventListener('click', () => {
      activePageId = 'about';
      renderApp();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const preambleFooterAboutBtn = document.getElementById('btn-preamble-footer-about');
  if (preambleFooterAboutBtn) {
    preambleFooterAboutBtn.addEventListener('click', () => {
      activePageId = 'about';
      renderApp();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const preambleToMemberBtn = document.getElementById('btn-preamble-to-membership');
  if (preambleToMemberBtn) {
    preambleToMemberBtn.addEventListener('click', () => {
      activePageId = 'membership';
      renderApp();
      window.scrollTo({ top: 350, behavior: 'smooth' });
    });
  }

  const preambleFooterFounderBtn = document.getElementById('btn-preamble-footer-founder');
  if (preambleFooterFounderBtn) {
    preambleFooterFounderBtn.addEventListener('click', () => {
      activePageId = 'founder';
      renderApp();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const preambleFooterDonateBtn = document.getElementById('btn-preamble-footer-donate');
  if (preambleFooterDonateBtn) {
    preambleFooterDonateBtn.addEventListener('click', () => {
      activePageId = 'donation';
      renderApp();
      window.scrollTo({ top: 300, behavior: 'smooth' });
    });
  }

  const printPreambleBtn = document.getElementById('btn-print-preamble');
  if (printPreambleBtn) {
    printPreambleBtn.addEventListener('click', () => {
      window.print();
    });
  }

  const togglePreambleArchiveBtn = document.getElementById('btn-toggle-preamble-archive');
  const preambleArchiveViewer = document.getElementById('preamble-archive-viewer');
  if (togglePreambleArchiveBtn && preambleArchiveViewer) {
    togglePreambleArchiveBtn.addEventListener('click', () => {
      const isHidden = preambleArchiveViewer.style.display === 'none';
      preambleArchiveViewer.style.display = isHidden ? 'block' : 'none';
      if (isHidden) {
        preambleArchiveViewer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  const closePreambleArchiveBtn = document.getElementById('btn-close-preamble-archive');
  if (closePreambleArchiveBtn && preambleArchiveViewer) {
    closePreambleArchiveBtn.addEventListener('click', () => {
      preambleArchiveViewer.style.display = 'none';
    });
  }

  // =========================================================================
  // DONATION SCREEN EVENT LISTENERS
  // =========================================================================
  const heroDonateScrollCard = document.getElementById('donate-future-scroll-card');
  if (heroDonateScrollCard) {
    heroDonateScrollCard.addEventListener('click', () => {
      activePageId = 'donation';
      donationState.donationReceipt = null;
      renderApp();
      window.scrollTo({ top: 300, behavior: 'smooth' });
    });
  }

  const heroDonateFutureBtn = document.getElementById('btn-hero-donate-future');
  if (heroDonateFutureBtn) {
    heroDonateFutureBtn.addEventListener('click', () => {
      activePageId = 'donation';
      donationState.donationReceipt = null;
      renderApp();
      window.scrollTo({ top: 300, behavior: 'smooth' });
    });
  }

  document.querySelectorAll('.btn-trigger-donation-nav').forEach((btn) => {
    btn.addEventListener('click', () => {
      activePageId = 'donation';
      donationState.donationReceipt = null;
      renderApp();
      window.scrollTo({ top: 300, behavior: 'smooth' });
    });
  });

  // Fund Purpose Selection
  document.querySelectorAll('.fund-card-item').forEach((card) => {
    card.addEventListener('click', () => {
      const fundId = parseInt(card.getAttribute('data-fund-id'), 10);
      if (fundId) {
        donationState.selectedFundId = fundId;
        renderApp();
      }
    });
  });

  // Home Screen: Preamble and Action Buttons
  const homeToPreambleBtn = document.getElementById('btn-home-to-preamble-page');
  if (homeToPreambleBtn) {
    homeToPreambleBtn.addEventListener('click', () => {
      activePageId = 'preamble';
      renderApp();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const homePrintPreambleBtn = document.getElementById('btn-home-print-preamble-doc');
  if (homePrintPreambleBtn) {
    homePrintPreambleBtn.addEventListener('click', () => {
      window.print();
    });
  }

  const heroAppDownloadBtn = document.getElementById('btn-hero-app-download');
  if (heroAppDownloadBtn) {
    heroAppDownloadBtn.addEventListener('click', () => {
      activePageId = 'membership';
      renderApp();
      window.scrollTo({ top: 350, behavior: 'smooth' });
    });
  }

  // Preset Amount Chips
  document.querySelectorAll('.btn-amount-chip').forEach((btn) => {
    btn.addEventListener('click', () => {
      const amt = parseFloat(btn.getAttribute('data-amount'));
      if (amt) {
        donationState.selectedAmount = amt;
        donationState.customAmount = '';
        renderApp();
      }
    });
  });

  // Custom Amount Field
  const customAmtInput = document.getElementById('input-custom-donation-amount');
  if (customAmtInput) {
    customAmtInput.addEventListener('input', (e) => {
      donationState.customAmount = e.target.value;
      renderApp();
      const reInp = document.getElementById('input-custom-donation-amount');
      if (reInp) {
        reInp.focus();
        reInp.selectionStart = reInp.selectionEnd = reInp.value.length;
      }
    });
  }

  // Donor Form Inputs Two-Way Sync
  ['donor-name', 'donor-mobile', 'donor-email', 'donor-state', 'donor-city', 'donor-pan'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', (e) => {
        const fieldMap = {
          'donor-name': 'name',
          'donor-mobile': 'mobile',
          'donor-email': 'email',
          'donor-state': 'state',
          'donor-city': 'city',
          'donor-pan': 'pan',
        };
        const key = fieldMap[id];
        if (key) {
          donationState.donorForm[key] = e.target.value;
        }
      });
    }
  });

  const anonEl = document.getElementById('donor-anonymous');
  if (anonEl) {
    anonEl.addEventListener('change', (e) => {
      donationState.donorForm.isAnonymous = e.target.checked;
    });
  }

  // Toggle Source Archival Documents
  const toggleDonDocsBtn = document.getElementById('btn-toggle-donation-docs');
  if (toggleDonDocsBtn) {
    toggleDonDocsBtn.addEventListener('click', () => {
      donationState.showArchivalDoc = !donationState.showArchivalDoc;
      renderApp();
    });
  }

  // Trigger Razorpay Checkout for Donation
  const donationForm = document.getElementById('form-donation-checkout');
  if (donationForm) {
    donationForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const currentFund = donationState.funds.find((f) => f.id === donationState.selectedFundId) || donationState.funds[0];
      const effectiveAmount = donationState.customAmount ? parseFloat(donationState.customAmount) || 0 : donationState.selectedAmount;

      if (!effectiveAmount || effectiveAmount < 10) {
        alert('Please enter a valid donation amount of at least ₹10.');
        return;
      }

      if (!donationState.donorForm.name || !donationState.donorForm.mobile) {
        alert('Please enter your Full Name and 10-digit Mobile Number.');
        return;
      }

      donationState.isSubmitting = true;
      renderApp();

      let orderId = null;
      let keyToUse = RAZORPAY_TEST_KEY;

      try {
        const orderRes = await fetch(`${API_BASE_URL}/donations/create-order`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fund_id: currentFund.id,
            amount: effectiveAmount,
            user_id: 1,
          }),
        });
        if (orderRes.ok) {
          const orderData = await orderRes.json();
          if (orderData?.data?.order?.id) {
            orderId = orderData.data.order.id;
          }
          if (orderData?.data?.key_id) {
            keyToUse = orderData.data.key_id;
          }
        }
      } catch (err) {
        console.warn('Donation order creation fallback:', err);
      }

      donationState.isSubmitting = false;
      renderApp();

      if (typeof window.Razorpay === 'function') {
        const options = {
          key: keyToUse,
          amount: Math.round(effectiveAmount * 100),
          currency: 'INR',
          name: 'Pasha People Party of India',
          description: `Donation: ${currentFund.title}`,
          image: '/images/vote_pineapple_card.jpg',
          order_id: orderId || undefined,
          prefill: {
            name: donationState.donorForm.name,
            contact: donationState.donorForm.mobile,
            email: donationState.donorForm.email || 'donor@pppiconnect.com',
          },
          theme: {
            color: '#16a34a',
          },
          handler: async function (response) {
            try {
              await fetch(`${API_BASE_URL}/donations/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id || orderId,
                  razorpay_payment_id: response.razorpay_payment_id || `pay_don_${Date.now()}`,
                  razorpay_signature: response.razorpay_signature || '',
                  status: 'SUCCESS',
                  user_id: 1,
                }),
              });
            } catch (_) {}

            donationState.donationReceipt = {
              receiptId: `PPPI-REC-${Math.floor(100000 + Math.random() * 900000)}`,
              paymentId: response.razorpay_payment_id || `pay_don_${Date.now()}`,
              amount: effectiveAmount,
              donorName: donationState.donorForm.name,
              donorMobile: donationState.donorForm.mobile,
              donorEmail: donationState.donorForm.email,
              donorCity: donationState.donorForm.city,
              donorState: donationState.donorForm.state,
              donorPan: donationState.donorForm.pan,
              isAnonymous: donationState.donorForm.isAnonymous,
              fundTitle: currentFund.title,
              fundDescription: currentFund.description,
              timestamp: new Date().toISOString(),
            };

            renderApp();
            window.scrollTo({ top: 150, behavior: 'smooth' });
          },
          modal: {
            ondismiss: function () {
              const simulateSuccess = confirm('Razorpay checkout closed. Would you like to complete payment in Test Mode and generate the official PPPI Donation Receipt?');
              if (simulateSuccess) {
                donationState.donationReceipt = {
                  receiptId: `PPPI-REC-${Math.floor(100000 + Math.random() * 900000)}`,
                  paymentId: `pay_test_${Date.now()}`,
                  amount: effectiveAmount,
                  donorName: donationState.donorForm.name,
                  donorMobile: donationState.donorForm.mobile,
                  donorEmail: donationState.donorForm.email,
                  donorCity: donationState.donorForm.city,
                  donorState: donationState.donorForm.state,
                  donorPan: donationState.donorForm.pan,
                  isAnonymous: donationState.donorForm.isAnonymous,
                  fundTitle: currentFund.title,
                  fundDescription: currentFund.description,
                  timestamp: new Date().toISOString(),
                };
                renderApp();
                window.scrollTo({ top: 150, behavior: 'smooth' });
              }
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on('payment.failed', function (response) {
          alert(`Donation payment failed or cancelled: ${response.error?.description || 'Please try again.'}`);
        });
        rzp.open();
      } else {
        const proceed = confirm(`Razorpay Checkout Simulation: Complete donation of ₹${effectiveAmount.toLocaleString('en-IN')} for ${currentFund.title}?`);
        if (proceed) {
          donationState.donationReceipt = {
            receiptId: `PPPI-REC-${Math.floor(100000 + Math.random() * 900000)}`,
            paymentId: `pay_sim_${Date.now()}`,
            amount: effectiveAmount,
            donorName: donationState.donorForm.name,
            donorMobile: donationState.donorForm.mobile,
            donorEmail: donationState.donorForm.email,
            donorCity: donationState.donorForm.city,
            donorState: donationState.donorForm.state,
            donorPan: donationState.donorForm.pan,
            isAnonymous: donationState.donorForm.isAnonymous,
            fundTitle: currentFund.title,
            fundDescription: currentFund.description,
            timestamp: new Date().toISOString(),
          };
          renderApp();
          window.scrollTo({ top: 150, behavior: 'smooth' });
        }
      }
    });
  }

  // Receipt Action Listeners
  const printDonReceiptBtn = document.getElementById('btn-print-donation-receipt');
  if (printDonReceiptBtn) {
    printDonReceiptBtn.addEventListener('click', () => {
      window.print();
    });
  }

  const makeAnotherDonBtn = document.getElementById('btn-make-another-donation');
  if (makeAnotherDonBtn) {
    makeAnotherDonBtn.addEventListener('click', () => {
      donationState.donationReceipt = null;
      renderApp();
      window.scrollTo({ top: 300, behavior: 'smooth' });
    });
  }

  const donBackHomeBtn = document.getElementById('btn-donation-back-home');
  if (donBackHomeBtn) {
    donBackHomeBtn.addEventListener('click', () => {
      activePageId = 'home';
      donationState.donationReceipt = null;
      renderApp();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Newsletter Category Filter Tabs
  document.querySelectorAll('.newsletter-cat-tab, .btn-reset-cat').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const cat = e.currentTarget.getAttribute('data-cat') || 'ALL';
      newsletterState.activeCategory = cat;
      renderApp();
    });
  });

  // Newsletter Open Detail Modal
  document.querySelectorAll('.btn-open-newsletter-detail').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      newsletterState.selectedNewsletterId = id;
      renderApp();
    });
  });

  // Newsletter Close Detail Modal
  const closeNewsModalBtn = document.getElementById('btn-close-newsletter-modal');
  if (closeNewsModalBtn) {
    closeNewsModalBtn.addEventListener('click', () => {
      newsletterState.selectedNewsletterId = null;
      renderApp();
    });
  }

  const footerCloseNewsModalBtn = document.getElementById('btn-footer-close-modal');
  if (footerCloseNewsModalBtn) {
    footerCloseNewsModalBtn.addEventListener('click', () => {
      newsletterState.selectedNewsletterId = null;
      renderApp();
    });
  }

  const newsModalBackdrop = document.getElementById('newsletter-detail-modal-backdrop');
  if (newsModalBackdrop) {
    newsModalBackdrop.addEventListener('click', (e) => {
      if (e.target === newsModalBackdrop) {
        newsletterState.selectedNewsletterId = null;
        renderApp();
      }
    });
  }

  // Publicity Category Filter Tabs
  document.querySelectorAll('.publicity-cat-tab, .btn-reset-publicity-cat').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const cat = e.currentTarget.getAttribute('data-cat') || 'ALL';
      publicityState.activeCategory = cat;
      renderApp();
    });
  });

  // Publicity Open Detail Modal
  document.querySelectorAll('.btn-open-publicity-modal').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      publicityState.selectedPublicityId = id;
      renderApp();
    });
  });

  // Publicity Close Detail Modal
  const closePublicityModalBtn = document.getElementById('btn-close-publicity-modal');
  if (closePublicityModalBtn) {
    closePublicityModalBtn.addEventListener('click', () => {
      publicityState.selectedPublicityId = null;
      renderApp();
    });
  }

  const footerClosePublicityModalBtn = document.getElementById('btn-footer-close-publicity');
  if (footerClosePublicityModalBtn) {
    footerClosePublicityModalBtn.addEventListener('click', () => {
      publicityState.selectedPublicityId = null;
      renderApp();
    });
  }

  const publicityModalBackdrop = document.getElementById('publicity-detail-modal-backdrop');
  if (publicityModalBackdrop) {
    publicityModalBackdrop.addEventListener('click', (e) => {
      if (e.target === publicityModalBackdrop) {
        publicityState.selectedPublicityId = null;
        renderApp();
      }
    });
  }



  // Employment screen event listeners
  if (activePageId === 'employement') {
    setupEmploymentListeners({
      employmentState,
      renderApp,
      LOCAL_API_URL,
      API_BASE_URL
    });
  }

  // Agriculture screen event listeners
  if (activePageId === 'agriculture') {
    setupAgricultureListeners({
      agricultureState,
      renderApp,
      LOCAL_API_URL,
      API_BASE_URL
    });
  }

  // Law and Judiciary screen event listeners
  if (activePageId === 'law') {
    setupLawListeners({
      lawState,
      renderApp,
      LOCAL_API_URL,
      API_BASE_URL
    });
  }

  // Marriages screen event listeners
  if (activePageId === 'marriages') {
    setupMarriageListeners({
      marriageState,
      renderApp,
      LOCAL_API_URL,
      API_BASE_URL
    });
  }

  // Emergency screen event listeners
  if (activePageId === 'emergency') {
    setupEmergencyListeners({
      emergencyState,
      renderApp,
      LOCAL_API_URL,
      API_BASE_URL
    });
  }

  // Elections screen event listeners
  if (activePageId === 'elections') {
    setupElectionsListeners({
      electionsState,
      renderApp,
      LOCAL_API_URL,
      API_BASE_URL
    });
  }

  // Others screen event listeners
  if (activePageId === 'other') {
    setupOthersListeners({
      othersState,
      renderApp,
      LOCAL_API_URL,
      API_BASE_URL
    });
  }

  // Public Complaints screen event listeners
  if (activePageId === 'public-complaints') {
    setupComplaintListeners({
      complaintState,
      renderApp,
      LOCAL_API_URL,
      API_BASE_URL,
      activePageId,
      setActivePageId: (id) => { activePageId = id; }
    });
  }
}

// Initial Backend Fetch & Render
fetchBackendPlans();
fetchBackendFunds();
fetchJobs();
