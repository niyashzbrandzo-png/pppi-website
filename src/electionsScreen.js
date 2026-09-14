// electionsScreen.js - PPPI Elections Management & Karnataka 224 Assembly Constituencies Directory
// Displays upcoming elections, 224 Karnataka assembly constituencies, and conducted/contesting member profiles

export const DEFAULT_ELECTIONS = [
  {
    id: 1,
    title: '2028 Karnataka Legislative Assembly Election (CM Election)',
    code: 'KA-2028-LA',
    election_type: 'ASSEMBLY',
    state: 'Karnataka',
    year: 2028,
    total_seats: 224,
    status: 'UPCOMING',
    target_seats: 113,
    manifesto_theme: 'People-Centric Governance, Free Healthcare, Agrarian Water Security & Zero Corruption',
    description: 'General Assembly Election to the 16th Karnataka Legislative Assembly to elect all 224 Members of Legislative Assembly (MLAs) and form the People Party Government with Founder President Mr. B S Vahid Pasha as Chief Ministerial Face.'
  },
  {
    id: 2,
    title: '2029 Indian General Election (PM Election / 19th Lok Sabha)',
    code: 'IN-2029-LS',
    election_type: 'PARLIAMENTARY',
    state: 'All India (Karnataka 28 Seats)',
    year: 2029,
    total_seats: 28,
    status: 'UPCOMING',
    target_seats: 15,
    manifesto_theme: 'Federal Autonomy, Farmer MSP Guarantee & Universal Social Security',
    description: 'Parliamentary Elections for the 19th Lok Sabha across 28 parliamentary constituencies of Karnataka to represent the people voice in New Delhi.'
  }
];

export function renderElectionsScreen(state = {}) {
  const elections = state.elections || DEFAULT_ELECTIONS;
  const selectedElectionId = state.selectedElectionId || 1;
  const selectedElection = elections.find(e => e.id === selectedElectionId) || elections[0];
  const constituencies = state.constituencies || [];
  const districts = state.districts || [];
  const activeDistrict = state.activeDistrict || 'ALL';
  const activeStatus = state.activeStatus || 'ALL';
  const searchQuery = state.searchQuery || '';
  const selectedConstituency = state.selectedConstituency || null;
  const isLoading = !!state.isLoading;

  const totalCount = state.stats ? state.stats.total : constituencies.length;
  const declaredCount = state.stats ? state.stats.declared : constituencies.filter(c => c.status === 'DECLARED').length;
  const vacantCount = totalCount - declaredCount;

  return `
    <div class="elections-page-wrapper">
      
      <!-- HERO & ELECTION TIMELINE STRIP -->
      <section class="elections-hero-banner">
        <div class="elections-hero-bg-overlay"></div>
        <div class="elections-hero-content">
          <div class="elections-badge">
            <i class="fa-solid fa-check-to-slot"></i> PPPI ELECTORAL COMMAND &amp; CANDIDATE DIRECTORY
          </div>
          <h1 class="elections-hero-title">
            Karnataka Assembly &amp; General Elections
          </h1>
          <p class="elections-hero-sub">
            224 Assembly Constituencies • Mission 113+ Majority • Grassroots Contesting Members
          </p>
          <p class="elections-hero-description">
            Explore upcoming elections across Karnataka. Browse all 224 Assembly Constituencies to inspect officially declared PPPI candidates, their background, verified membership tier, and localized 5-point development pledges for every taluk.
          </p>

          <!-- UPCOMING ELECTIONS SELECTOR CARDS -->
          <div class="election-timeline-grid">
            ${elections.map(el => {
              const isSel = el.id === selectedElectionId;
              return `
                <div class="election-card-tab ${isSel ? 'active' : ''}" data-election-id="${el.id}">
                  <div class="election-card-top">
                    <span class="election-type-badge ${el.election_type === 'ASSEMBLY' ? 'type-assembly' : 'type-parliamentary'}">
                      <i class="fa-solid ${el.election_type === 'ASSEMBLY' ? 'fa-building-columns' : 'fa-landmark'}"></i>
                      ${el.election_type === 'ASSEMBLY' ? 'KARNATAKA CM ELECTION' : 'INDIAN PM ELECTION'}
                    </span>
                    <span class="election-year-tag">${el.year}</span>
                  </div>
                  <h3 class="election-card-title">${el.title}</h3>
                  <div class="election-card-metrics">
                    <div><strong>${el.total_seats}</strong> <span>Constituencies</span></div>
                    <div><strong>${el.target_seats || '113+'}</strong> <span>Majority Target</span></div>
                    <div><strong style="color: #10b981;">UPCOMING</strong> <span>Status</span></div>
                  </div>
                  <div class="election-card-footer">
                    <span class="view-constituencies-link">
                      ${isSel ? '<i class="fa-solid fa-circle-dot"></i> Viewing 224 Constituencies' : '<i class="fa-solid fa-arrow-right"></i> Switch to this Election'}
                    </span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </section>

      <!-- ACTIVE ELECTION OVERVIEW & KPI BAR -->
      <section class="elections-kpi-bar-section">
        <div class="elections-kpi-container">
          <div class="elections-kpi-item">
            <span class="kpi-num">${totalCount}</span>
            <span class="kpi-lbl">Total Constituencies</span>
          </div>
          <div class="elections-kpi-divider"></div>
          <div class="elections-kpi-item">
            <span class="kpi-num" style="color: #10b981;">${declaredCount}</span>
            <span class="kpi-lbl">Candidates Declared</span>
          </div>
          <div class="elections-kpi-divider"></div>
          <div class="elections-kpi-item">
            <span class="kpi-num" style="color: #f59e0b;">${vacantCount}</span>
            <span class="kpi-lbl">Applications Open</span>
          </div>
          <div class="elections-kpi-divider"></div>
          <div class="elections-kpi-item">
            <span class="kpi-num" style="color: #6366f1;">31</span>
            <span class="kpi-lbl">Districts Represented</span>
          </div>
        </div>
      </section>

      <!-- CONSTITUENCIES DIRECTORY SECTION -->
      <main class="constituencies-directory-section">
        <div class="directory-container">
          
          <!-- SEARCH & FILTER TOOLBAR -->
          <div class="directory-toolbar">
            <div class="toolbar-search-box">
              <i class="fa-solid fa-magnifying-glass"></i>
              <input 
                type="text" 
                id="constituency-search-input" 
                placeholder="Search by constituency # (e.g. 141), name (Srinivaspur), district, or candidate..." 
                value="${searchQuery}"
              />
              ${searchQuery ? `<button type="button" id="btn-clear-constituency-search" class="btn-clear-search"><i class="fa-solid fa-xmark"></i></button>` : ''}
            </div>

            <div class="toolbar-filters-row">
              <!-- District Selector -->
              <div class="filter-item">
                <label><i class="fa-solid fa-location-dot"></i> District:</label>
                <select id="select-district-filter" class="filter-dropdown">
                  <option value="ALL" ${activeDistrict === 'ALL' ? 'selected' : ''}>All 31 Districts</option>
                  ${districts.map(d => `<option value="${d}" ${activeDistrict === d ? 'selected' : ''}>${d}</option>`).join('')}
                </select>
              </div>

              <!-- Candidate Status Filter -->
              <div class="filter-item">
                <label><i class="fa-solid fa-user-check"></i> Candidate Status:</label>
                <select id="select-status-filter" class="filter-dropdown">
                  <option value="ALL" ${activeStatus === 'ALL' ? 'selected' : ''}>All Seats (224)</option>
                  <option value="DECLARED" ${activeStatus === 'DECLARED' ? 'selected' : ''}>Candidate Declared</option>
                  <option value="VACANT" ${activeStatus === 'VACANT' ? 'selected' : ''}>Applications Open / Vacant</option>
                </select>
              </div>
            </div>
          </div>

          <!-- CONSTITUENCIES GRID -->
          ${isLoading ? `
            <div class="directory-loading-state">
              <i class="fa-solid fa-spinner fa-spin"></i>
              <span>Loading Karnataka 224 Assembly Constituencies &amp; Candidates...</span>
            </div>
          ` : constituencies.length === 0 ? `
            <div class="directory-empty-state">
              <i class="fa-solid fa-magnifying-glass"></i>
              <h3>No Constituencies Found</h3>
              <p>No constituency matched your search "${searchQuery}" in the selected district.</p>
              <button type="button" class="btn btn-outline" id="btn-reset-filters">Reset All Filters</button>
            </div>
          ` : `
            <div class="constituencies-cards-grid">
              ${constituencies.map(c => {
                const isDeclared = c.status === 'DECLARED';
                return `
                  <div class="constituency-card ${isDeclared ? 'has-candidate' : 'vacant'}" data-constituency-id="${c.id}">
                    
                    <!-- Card Top Header -->
                    <div class="const-card-header">
                      <div class="const-number-badge">
                        #${c.constituency_no}
                      </div>
                      <div class="const-cat-badge cat-${(c.category || 'GEN').toLowerCase()}">
                        ${c.category || 'GEN'}
                      </div>
                    </div>

                    <!-- Constituency Title & District -->
                    <h3 class="const-name">${c.name}</h3>
                    <div class="const-district">
                      <i class="fa-solid fa-location-dot"></i> ${c.district} District
                    </div>

                    <!-- Candidate Card Section -->
                    <div class="const-candidate-box">
                      ${isDeclared ? `
                        <div class="candidate-snapshot">
                          <div class="candidate-avatar">
                            ${c.candidate_photo 
                              ? `<img src="${c.candidate_photo}" alt="${c.candidate_name}" onerror="this.src='/images/founder.jpg'" />`
                              : `<div class="avatar-placeholder"><i class="fa-solid fa-user-tie"></i></div>`
                            }
                          </div>
                          <div class="candidate-info">
                            <span class="candidate-tag"><i class="fa-solid fa-award"></i> OFFICIAL PPPI CANDIDATE</span>
                            <h4 class="candidate-name">${c.candidate_name}</h4>
                            <span class="candidate-plan-pill">${c.candidate_plan || 'Active Paid Member'}</span>
                          </div>
                        </div>
                        ${c.campaign_vision ? `
                          <p class="candidate-vision-snippet">
                            "${c.campaign_vision.substring(0, 110)}${c.campaign_vision.length > 110 ? '...' : ''}"
                          </p>
                        ` : ''}
                      ` : `
                        <div class="candidate-vacant-state">
                          <i class="fa-solid fa-hourglass-half"></i>
                          <div>
                            <strong>Candidate To Be Announced</strong>
                            <span>Ticket applications open for verified members</span>
                          </div>
                        </div>
                      `}
                    </div>

                    <!-- Card Action Footer -->
                    <div class="const-card-footer">
                      <span class="btn-inspect-const">
                        <i class="fa-solid fa-address-card"></i> View Constituency &amp; Candidate Dossier &rarr;
                      </span>
                    </div>

                  </div>
                `;
              }).join('')}
            </div>
          `}

        </div>
      </main>

      <!-- CONSTITUENCY & CANDIDATE DOSSIER POPUP MODAL -->
      ${selectedConstituency ? `
        <div class="constituency-modal-overlay" id="constituency-dossier-modal">
          <div class="constituency-modal-card">
            
            <div class="const-modal-header">
              <div class="const-modal-title-box">
                <div class="const-number-badge large">#${selectedConstituency.constituency_no}</div>
                <div>
                  <h2>${selectedConstituency.name} Assembly Constituency</h2>
                  <span>${selectedConstituency.district} District, Karnataka • Category: ${selectedConstituency.category || 'GEN'}</span>
                </div>
              </div>
              <button type="button" class="btn-close-const-modal" id="btn-close-const-dossier">&times;</button>
            </div>

            <div class="const-modal-body">
              
              <!-- CANDIDATE SECTION -->
              ${selectedConstituency.status === 'DECLARED' ? `
                <div class="modal-candidate-profile-card">
                  <div class="profile-left">
                    <div class="profile-img-wrap">
                      ${selectedConstituency.candidate_photo 
                        ? `<img src="${selectedConstituency.candidate_photo}" alt="${selectedConstituency.candidate_name}" onerror="this.src='/images/founder.jpg'" />`
                        : `<div class="avatar-placeholder-large"><i class="fa-solid fa-user-tie"></i></div>`
                      }
                    </div>
                    <div class="verified-nomination-badge">
                      <i class="fa-solid fa-certificate"></i> Verified Candidate
                    </div>
                  </div>

                  <div class="profile-right">
                    <span class="profile-tier-badge"><i class="fa-solid fa-crown"></i> ${selectedConstituency.candidate_plan || 'Active Paid Member'}</span>
                    <h3 class="profile-name">${selectedConstituency.candidate_name}</h3>
                    <p class="profile-bio">${selectedConstituency.candidate_bio || `PPPI leadership contestant for #${selectedConstituency.constituency_no} ${selectedConstituency.name} Assembly Constituency.`}</p>

                    <div class="profile-contacts-row">
                      <div><i class="fa-solid fa-phone"></i> <strong>Phone:</strong> <a href="tel:${selectedConstituency.candidate_phone}">${selectedConstituency.candidate_phone || 'Party Central Secretariat'}</a></div>
                      <div><i class="fa-solid fa-envelope"></i> <strong>Email:</strong> ${selectedConstituency.candidate_email || 'info@pppiconnect.com'}</div>
                      <div><i class="fa-solid fa-calendar-check"></i> <strong>Declared:</strong> ${new Date(selectedConstituency.declared_at || Date.now()).toLocaleDateString('en-IN')}</div>
                    </div>
                  </div>
                </div>

                <!-- CAMPAIGN PLEDGES / VISION -->
                <div class="modal-vision-card">
                  <h4><i class="fa-solid fa-bullhorn"></i> Candidate's 5-Point Constituency Action Plan:</h4>
                  <p class="vision-text">
                    ${selectedConstituency.campaign_vision || `Dedicated to water security, modern schools, farmer price support, and transparent grievance redressal across ${selectedConstituency.name}.`}
                  </p>
                </div>
              ` : `
                <div class="modal-vacant-card">
                  <div class="vacant-icon"><i class="fa-solid fa-award"></i></div>
                  <h3>Candidate Selection Under Process</h3>
                  <p>
                    PPPI Central Parliamentary Board is currently reviewing candidate nomination petitions from active party members in <strong>${selectedConstituency.name}</strong>.
                  </p>
                  <div class="eligibility-notice">
                    <i class="fa-solid fa-shield-halved"></i>
                    <span>
                      <strong>Candidate Eligibility Criteria:</strong> Must be an active member with a purchased Membership Plan (Bronze, Silver, Gold, Diamond, or Platinum). Free voter accounts are not eligible to contest.
                    </span>
                  </div>
                </div>
              `}

              <!-- CONSTITUENCY DEMOGRAPHICS & FACTS -->
              <div class="const-facts-grid">
                <div class="fact-card">
                  <span class="fact-label">Total Registered Voters</span>
                  <span class="fact-val">${(selectedConstituency.total_voters || 215000).toLocaleString('en-IN')}</span>
                </div>
                <div class="fact-card">
                  <span class="fact-label">Reservation Category</span>
                  <span class="fact-val">${selectedConstituency.category === 'SC' ? 'Scheduled Caste (SC)' : selectedConstituency.category === 'ST' ? 'Scheduled Tribe (ST)' : 'General Category (GEN)'}</span>
                </div>
                <div class="fact-card">
                  <span class="fact-label">Administrative District</span>
                  <span class="fact-val">${selectedConstituency.district}</span>
                </div>
                <div class="fact-card">
                  <span class="fact-label">Election Type</span>
                  <span class="fact-val">Karnataka Legislative Assembly (16th Vidhana Sabha)</span>
                </div>
              </div>

            </div>

            <div class="const-modal-footer">
              <button type="button" class="btn btn-outline" id="btn-close-const-modal-footer">Close Dossier</button>
              <a href="tel:+917259798393" class="btn btn-primary" style="background:#b91c1c; border-color:#b91c1c; text-decoration:none;">
                <i class="fa-solid fa-hand-holding-heart"></i> Volunteer for this Constituency
              </a>
            </div>

          </div>
        </div>
      ` : ''}

    </div>
  `;
}

// Setup Event Listeners
export function setupElectionsListeners({ electionsState, renderApp, LOCAL_API_URL, API_BASE_URL }) {
  function getApiUrl(path) {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return `${LOCAL_API_URL}${path}`;
    }
    return `${API_BASE_URL}${path}`;
  }

  // 1. Election Timeline Cards Switch
  document.querySelectorAll('.election-card-tab').forEach(card => {
    card.addEventListener('click', async () => {
      const elId = parseInt(card.dataset.electionId, 10);
      if (elId && elId !== electionsState.selectedElectionId) {
        electionsState.selectedElectionId = elId;
        electionsState.activeDistrict = 'ALL';
        electionsState.activeStatus = 'ALL';
        electionsState.searchQuery = '';
        electionsState.isLoading = true;
        renderApp();

        try {
          const res = await fetch(getApiUrl(`/elections/constituencies?election_id=${elId}`));
          const data = await res.json();
          if (data && data.success) {
            electionsState.constituencies = data.data || [];
            electionsState.districts = data.districts || [];
            electionsState.stats = data.stats || null;
          }
        } catch (e) {
          console.warn('Election switch remote fetch notice:', e.message);
        } finally {
          electionsState.isLoading = false;
          renderApp();
        }
      }
    });
  });

  // 2. Search Input
  const searchInput = document.getElementById('constituency-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      electionsState.searchQuery = e.target.value;
      filterConstituencies();
    });
  }

  // 3. Clear Search Button
  const btnClearSearch = document.getElementById('btn-clear-constituency-search');
  if (btnClearSearch) {
    btnClearSearch.addEventListener('click', () => {
      electionsState.searchQuery = '';
      filterConstituencies();
    });
  }

  // 4. District Filter Dropdown
  const selectDistrict = document.getElementById('select-district-filter');
  if (selectDistrict) {
    selectDistrict.addEventListener('change', (e) => {
      electionsState.activeDistrict = e.target.value;
      filterConstituencies();
    });
  }

  // 5. Status Filter Dropdown
  const selectStatus = document.getElementById('select-status-filter');
  if (selectStatus) {
    selectStatus.addEventListener('change', (e) => {
      electionsState.activeStatus = e.target.value;
      filterConstituencies();
    });
  }

  // 6. Reset Filters Button
  const btnReset = document.getElementById('btn-reset-filters');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      electionsState.searchQuery = '';
      electionsState.activeDistrict = 'ALL';
      electionsState.activeStatus = 'ALL';
      filterConstituencies();
    });
  }

  // Filter Helper (Local instant search with server sync)
  async function filterConstituencies() {
    const elId = electionsState.selectedElectionId || 1;
    const q = (electionsState.searchQuery || '').trim();
    const dist = electionsState.activeDistrict || 'ALL';
    const st = electionsState.activeStatus || 'ALL';

    try {
      const url = getApiUrl(`/elections/constituencies?election_id=${elId}&district=${encodeURIComponent(dist)}&status=${encodeURIComponent(st)}&search=${encodeURIComponent(q)}`);
      const res = await fetch(url);
      const data = await res.json();
      if (data && data.success) {
        electionsState.constituencies = data.data || [];
        renderApp();
        return;
      }
    } catch (e) {
      // client filter fallback
    }

    // Client-side fallback filter
    let list = electionsState.allConstituencies || [];
    if (dist !== 'ALL') {
      list = list.filter(c => (c.district || '').toLowerCase() === dist.toLowerCase());
    }
    if (st !== 'ALL') {
      list = list.filter(c => (c.status || '').toUpperCase() === st.toUpperCase());
    }
    if (q) {
      const s = q.toLowerCase();
      list = list.filter(c =>
        c.constituency_no.toString() === s ||
        (c.name || '').toLowerCase().includes(s) ||
        (c.district || '').toLowerCase().includes(s) ||
        (c.candidate_name || '').toLowerCase().includes(s)
      );
    }
    electionsState.constituencies = list;
    renderApp();
  }

  // 7. Constituency Card Click -> Open Dossier Modal
  document.querySelectorAll('.constituency-card').forEach(card => {
    card.addEventListener('click', () => {
      const cId = parseInt(card.dataset.constituencyId, 10);
      const item = (electionsState.constituencies || []).find(c => c.id === cId);
      if (item) {
        electionsState.selectedConstituency = item;
        renderApp();
      }
    });
  });

  // 8. Close Dossier Modal
  const btnCloseModal = document.getElementById('btn-close-const-dossier');
  if (btnCloseModal) {
    btnCloseModal.addEventListener('click', () => {
      electionsState.selectedConstituency = null;
      renderApp();
    });
  }

  const btnCloseModalFooter = document.getElementById('btn-close-const-modal-footer');
  if (btnCloseModalFooter) {
    btnCloseModalFooter.addEventListener('click', () => {
      electionsState.selectedConstituency = null;
      renderApp();
    });
  }
}
