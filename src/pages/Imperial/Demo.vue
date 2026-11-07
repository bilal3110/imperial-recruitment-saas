<script setup>
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { 
  Search, Bell, ChevronDown, Check, X, Shield, 
  MapPin, Users, Coins, Sparkles, Filter, ExternalLink,
  RotateCcw, Sliders, AlertCircle, Award, CheckCircle2
} from 'lucide-vue-next';
import { playSealClick } from '@/utils/audio';

// INITIAL RECRUITS DATASET
const INITIAL_RECRUITS = [
  { id: 1, name: "Ibrahim of Bursa", age: 19, province: "Anatolia", skill: "Sword", loyalty: 86, stage: "Training Review", note: "Excels in two-handed kilij drills." },
  { id: 2, name: "Dimitri of Edirne", age: 21, province: "Rumelia", skill: "Archery", loyalty: 74, stage: "Records Review", note: "Imperial baptism verified; speaks Turkish & Greek." },
  { id: 3, name: "Mustafa of Aleppo", age: 24, province: "Syria", skill: "Cavalry", loyalty: 92, stage: "Assignment", note: "Recommended for Rumelian Sipahi reserve." },
  { id: 4, name: "Yusuf of Amasya", age: 18, province: "Anatolia", skill: "Matchlock", loyalty: 65, stage: "Apprentice", note: "Needs further firearm drill discipline." },
  { id: 5, name: "Ali of Konya", age: 20, province: "Anatolia", skill: "Sword", loyalty: 88, stage: "Assignment", note: "Ready for 5th Orta infantry deployment." },
  { id: 6, name: "Hasan of Monastir", age: 22, province: "Balkans", skill: "Archery", loyalty: 48, stage: "Loyalty Watch", note: "Reported grumbling over late halva rations." },
  { id: 7, name: "Selim of Damascus", age: 23, province: "Syria", skill: "Spearman", loyalty: 79, stage: "Assignment", note: "Stout physique; suitable for palisade defense." },
  { id: 8, name: "Tariq of Sofia", age: 19, province: "Rumelia", skill: "Cavalry", loyalty: 36, stage: "Disciplinary", note: "Cautionary flag: missed dawn assembly twice." }
];

const recruits = ref(INITIAL_RECRUITS.map(r => ({ ...r })));
const selectedRecruit = ref(recruits.value[0]);

// FILTERS & SEARCH
const filterProvince = ref('All');
const filterSkill = ref('All');
const filterLoyalty = ref('All');
const searchQuery = ref('');

// PROVINCIAL DATA
const provinces = [
  { name: "Anatolia", soldiers: 42000, revenue: "280,000 Akçe", loyalty: 91, status: "Loyal" },
  { name: "Rumelia", soldiers: 35000, revenue: "220,000 Akçe", loyalty: 84, status: "Loyal" },
  { name: "Syria", soldiers: 22000, revenue: "240,000 Akçe", loyalty: 79, status: "Loyal" },
  { name: "Balkans", soldiers: 28000, revenue: "190,000 Akçe", loyalty: 54, status: "Restless" },
  { name: "Egypt", soldiers: 30000, revenue: "350,000 Akçe", loyalty: 76, status: "Loyal" }
];
const selectedProvince = ref(provinces[0]);

// DECREES QUEUE
const decrees = ref([
  { id: 1, title: "Belgrade Fortress Repair Firman", eyalet: "Rumelia", cost: "4,500 Akçe", sealed: false },
  { id: 2, title: "Damascus Silk Caravan Escort Quota", eyalet: "Syria", cost: "1,200 Akçe", sealed: false },
  { id: 3, title: "Kazan Halva Emergency Allocation", eyalet: "Constantinople", cost: "850 Akçe", sealed: false }
]);

// COMPUTED RECRUITS
const filteredRecruits = computed(() => {
  return recruits.value.filter(r => {
    if (filterProvince.value !== 'All' && r.province !== filterProvince.value) return false;
    if (filterSkill.value !== 'All' && r.skill !== filterSkill.value) return false;
    if (filterLoyalty.value === 'high' && r.loyalty < 70) return false;
    if (filterLoyalty.value === 'mid' && (r.loyalty < 45 || r.loyalty >= 70)) return false;
    if (filterLoyalty.value === 'low' && r.loyalty >= 45) return false;
    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase();
      if (!r.name.toLowerCase().includes(q) && !r.province.toLowerCase().includes(q)) return false;
    }
    return true;
  });
});

function selectRecruit(r) {
  playSealClick();
  selectedRecruit.value = r;
}

function adjustLoyalty(delta) {
  playSealClick();
  if (!selectedRecruit.value) return;
  const target = recruits.value.find(r => r.id === selectedRecruit.value.id);
  if (target) {
    target.loyalty = Math.max(0, Math.min(100, target.loyalty + delta));
    selectedRecruit.value = { ...target };
  }
}

function approveRecruit() {
  playSealClick();
  if (!selectedRecruit.value) return;
  selectedRecruit.value.stage = "Sworn Janissary (Approved)";
  const target = recruits.value.find(r => r.id === selectedRecruit.value.id);
  if (target) {
    target.stage = "Sworn Janissary (Approved)";
    target.loyalty = Math.min(100, target.loyalty + 15);
  }
}

function rejectRecruit() {
  playSealClick();
  if (!selectedRecruit.value) return;
  selectedRecruit.value.stage = "Reassigned to Provincial Levy";
  const target = recruits.value.find(r => r.id === selectedRecruit.value.id);
  if (target) {
    target.stage = "Reassigned to Provincial Levy";
    target.loyalty = Math.max(0, target.loyalty - 20);
  }
}

function sealDecree(id) {
  playSealClick();
  const d = decrees.value.find(item => item.id === id);
  if (d) d.sealed = true;
}

function resetAll() {
  playSealClick();
  filterProvince.value = 'All';
  filterSkill.value = 'All';
  filterLoyalty.value = 'All';
  searchQuery.value = '';
  recruits.value = INITIAL_RECRUITS.map(r => ({ ...r }));
  selectedRecruit.value = recruits.value[0];
}
</script>

<template>
  <div class="demo-page">
    <!-- PAGE HERO -->
    <section class="demo-hero">
      <div class="demo-hero-content">
        <p class="eyebrow">Interactive Demonstration · v1.453</p>
        <h1 class="demo-title">Your Empire Awaits<br>Its Commander.</h1>
        <p class="demo-desc">
          The provinces are mapped, the recruitment offices are open, and the imperial treasury awaits your orders. Experience military personnel administration as commissioned by the Sublime Porte.
        </p>
      </div>

      <div class="demo-hero-badge">
        <span class="badge-title">✦ DIVAN COCKPIT ✦</span>
        <p>All records, names, akçe figures, and loyalty telemetry below are fictional sample data.</p>
        <RouterLink to="/admin/dashboard" class="btn-imperial gold">
          <span>Open Full Admin Panel</span>
          <ExternalLink :size="14" />
        </RouterLink>
      </div>
    </section>

    <!-- MAIN PRODUCT INTERFACE WORKSTATION -->
    <section class="workbench-section">
      <div class="product-window">
        <!-- TOP DESK BAR -->
        <header class="desk-top-bar">
          <div class="desk-brand">
            <span class="desk-tughra">✦</span>
            <div>
              <strong>JANISSARIES</strong>
              <small>Imperial Registry Console</small>
            </div>
          </div>

          <!-- Quick Info Center -->
          <div class="desk-stats-pill-row">
            <div class="stat-pill">
              <span class="pill-lbl">Current Date</span>
              <strong class="pill-val">15 Cemaziyelahir 932 (AH)</strong>
            </div>
            <div class="stat-pill">
              <span class="pill-lbl">Imperial Treasury</span>
              <strong class="pill-val">₳ 18,420 Akçe</strong>
            </div>
            <div class="stat-pill">
              <span class="pill-lbl">Readiness Index</span>
              <strong class="pill-val green">78.4% Loyal</strong>
            </div>
          </div>

          <!-- User Badge -->
          <div class="desk-user-badge">
            <div class="avatar-ring">GV</div>
            <div class="avatar-info">
              <span class="user-role">Grand Vizier</span>
              <span class="user-office">Sublime Porte</span>
            </div>
          </div>
        </header>

        <!-- MAIN DESK BODY GRID -->
        <div class="desk-body-grid">
          <!-- LEFT SIDE: RECRUITMENT WORKBENCH -->
          <div class="desk-main-col">
            <!-- Filter & Search Toolbar -->
            <div class="desk-toolbar">
              <div class="search-box">
                <Search :size="16" class="search-icon" />
                <input 
                  type="text" 
                  v-model="searchQuery" 
                  placeholder="Search candidate name or province..." 
                  class="search-input"
                />
              </div>

              <div class="filters-row">
                <!-- Province Filter -->
                <select v-model="filterProvince" class="desk-select">
                  <option value="All">All Provinces</option>
                  <option value="Anatolia">Anatolia</option>
                  <option value="Rumelia">Rumelia</option>
                  <option value="Syria">Syria</option>
                  <option value="Balkans">Balkans</option>
                </select>

                <!-- Skill Filter -->
                <select v-model="filterSkill" class="desk-select">
                  <option value="All">All Disciplines</option>
                  <option value="Sword">Sword (Kilij)</option>
                  <option value="Archery">Archery</option>
                  <option value="Cavalry">Cavalry</option>
                  <option value="Matchlock">Matchlock (Tüfek)</option>
                  <option value="Spearman">Spearman</option>
                </select>

                <!-- Loyalty Filter -->
                <select v-model="filterLoyalty" class="desk-select">
                  <option value="All">All Loyalty</option>
                  <option value="high">Loyal (≥70%)</option>
                  <option value="mid">Wavering (45–69%)</option>
                  <option value="low">Suspicious (&lt;45%)</option>
                </select>

                <button class="reset-btn" @click="resetAll" title="Reset all filters">
                  <RotateCcw :size="14" />
                </button>
              </div>
            </div>

            <!-- Recruitment Table -->
            <div class="table-container">
              <table class="imperial-table">
                <thead>
                  <tr>
                    <th>Candidate</th>
                    <th>Age</th>
                    <th>Province</th>
                    <th>Discipline</th>
                    <th>Loyalty Index</th>
                    <th>Current Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr 
                    v-for="r in filteredRecruits" 
                    :key="r.id"
                    :class="{ active: selectedRecruit?.id === r.id }"
                    @click="selectRecruit(r)"
                  >
                    <td class="candidate-cell">
                      <strong>{{ r.name }}</strong>
                    </td>
                    <td>{{ r.age }}</td>
                    <td><span class="prov-tag">{{ r.province }}</span></td>
                    <td>{{ r.skill }}</td>
                    <td>
                      <div class="table-loyalty-bar">
                        <span class="loyalty-num">{{ r.loyalty }}%</span>
                        <div class="bar-bg">
                          <div 
                            class="bar-fill" 
                            :style="{ 
                              width: r.loyalty + '%', 
                              backgroundColor: r.loyalty >= 70 ? '#3E7C47' : r.loyalty >= 45 ? '#B99A5B' : '#932828' 
                            }"
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span class="status-pill" :class="{ approved: r.stage.includes('Approved'), rejected: r.stage.includes('Reassigned') }">
                        {{ r.stage }}
                      </span>
                    </td>
                  </tr>
                  <tr v-if="filteredRecruits.length === 0">
                    <td colspan="6" class="no-records-cell">
                      No candidate records found matching your filters.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Bottom Row: Provincial Summary & Decrees -->
            <div class="desk-secondary-row">
              <!-- Provincial Intelligence Card -->
              <div class="provincial-intel-card">
                <div class="card-head">
                  <MapPin :size="16" class="head-icon" />
                  <h4>Provincial Quota & Readiness</h4>
                </div>
                <div class="provinces-tab-strip">
                  <button 
                    v-for="p in provinces" 
                    :key="p.name"
                    class="p-tab"
                    :class="{ active: selectedProvince.name === p.name }"
                    @click="selectedProvince = p"
                  >
                    {{ p.name }}
                  </button>
                </div>
                <div class="province-detail-view">
                  <div class="p-stat">
                    <span>Soldier Quota</span>
                    <strong>{{ selectedProvince.soldiers.toLocaleString() }} Troops</strong>
                  </div>
                  <div class="p-stat">
                    <span>Tax Revenue</span>
                    <strong>{{ selectedProvince.revenue }}</strong>
                  </div>
                  <div class="p-stat">
                    <span>Provincial Loyalty</span>
                    <strong :class="{ green: selectedProvince.loyalty >= 70, red: selectedProvince.loyalty < 60 }">
                      {{ selectedProvince.loyalty }}% ({{ selectedProvince.status }})
                    </strong>
                  </div>
                </div>
              </div>

              <!-- Pending Decrees Queue -->
              <div class="decrees-queue-card">
                <div class="card-head">
                  <Scroll :size="16" class="head-icon" />
                  <h4>Decrees Requiring Imperial Seal</h4>
                </div>
                <div class="decrees-list">
                  <div v-for="d in decrees" :key="d.id" class="decree-item">
                    <div class="decree-info">
                      <strong>{{ d.title }}</strong>
                      <small>{{ d.eyalet }} · Cost: {{ d.cost }}</small>
                    </div>
                    <button 
                      v-if="!d.sealed"
                      class="seal-btn" 
                      @click="sealDecree(d.id)"
                    >
                      <Sparkles :size="12" />
                      <span>Affix Tughra</span>
                    </button>
                    <span v-else class="sealed-label">
                      <CheckCircle2 :size="14" /> Sealed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- RIGHT SIDE: CANDIDATE INSPECTION DOSSIER -->
          <aside class="candidate-dossier-panel">
            <div class="dossier-head">
              <span class="dossier-eyebrow">CANDIDATE DOCKET</span>
              <h3>{{ selectedRecruit?.name || 'Select Candidate' }}</h3>
              <span class="dossier-sub">{{ selectedRecruit?.province }} Eyalet · Age {{ selectedRecruit?.age }}</span>
            </div>

            <div v-if="selectedRecruit" class="dossier-body">
              <div class="dossier-field">
                <span class="field-lbl">Primary Martial Skill</span>
                <strong class="field-val">{{ selectedRecruit.skill }}</strong>
              </div>

              <div class="dossier-field">
                <span class="field-lbl">Recruitment Stage</span>
                <span class="field-pill">{{ selectedRecruit.stage }}</span>
              </div>

              <!-- Loyalty Meter -->
              <div class="loyalty-control-group">
                <div class="loyalty-control-top">
                  <span class="field-lbl">Loyalty Index</span>
                  <strong class="loyalty-score" :style="{ color: selectedRecruit.loyalty >= 70 ? '#3E7C47' : '#B99A5B' }">
                    {{ selectedRecruit.loyalty }}%
                  </strong>
                </div>
                <div class="meter-bar">
                  <div 
                    class="meter-fill" 
                    :style="{ 
                      width: selectedRecruit.loyalty + '%', 
                      backgroundColor: selectedRecruit.loyalty >= 70 ? '#3E7C47' : selectedRecruit.loyalty >= 45 ? '#B99A5B' : '#932828' 
                    }"
                  ></div>
                </div>

                <div class="meter-adjust-btns">
                  <button class="meter-btn add" @click="adjustLoyalty(10)">
                    +10 Bonus Loyalty
                  </button>
                  <button class="meter-btn sub" @click="adjustLoyalty(-20)">
                    -20 Reprimand
                  </button>
                </div>
              </div>

              <div class="dossier-field">
                <span class="field-lbl">Divan Officer Note</span>
                <p class="field-note">{{ selectedRecruit.note }}</p>
              </div>

              <!-- Action Decision Buttons -->
              <div class="dossier-action-buttons">
                <button class="action-btn approve" @click="approveRecruit">
                  <Check :size="16" />
                  <span>Induct Into Janissary Orta</span>
                </button>
                <button class="action-btn reject" @click="rejectRecruit">
                  <X :size="16" />
                  <span>Reassign to Provincial Militia</span>
                </button>
              </div>
            </div>

            <div v-else class="empty-dossier">
              <p>Select any recruit from the ledger to inspect their docket and authorize regimental assignment.</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.demo-page {
  background: var(--ink);
  color: var(--parchment);
  min-height: 100vh;
}

/* HERO */
.demo-hero {
  padding: 140px max(24px, 8vw) 50px;
  background: linear-gradient(180deg, var(--night) 0%, var(--walnut) 100%);
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 50px;
  border-bottom: 1px solid var(--gold-border);
  flex-wrap: wrap;
}
.demo-title {
  font-family: var(--font-display);
  font-size: clamp(34px, 4.8vw, 64px);
  color: var(--gold-pale);
  line-height: 1.1;
  margin: 0 0 16px;
}
.demo-desc {
  font-size: 20px;
  color: var(--parchment);
  max-width: 660px;
  margin: 0;
  line-height: 1.6;
  opacity: 0.9;
}
.demo-hero-badge {
  background: rgba(23, 19, 16, 0.75);
  border: 1px solid var(--gold-border);
  padding: 24px;
  max-width: 320px;
}
.badge-title {
  display: block;
  font-family: var(--font-heading);
  font-size: 10px;
  letter-spacing: 0.25em;
  color: var(--gold);
  margin-bottom: 8px;
}
.demo-hero-badge p {
  font-size: 13px;
  color: var(--muted);
  line-height: 1.5;
  margin: 0 0 16px;
}

/* WORKBENCH */
.workbench-section {
  padding: 50px max(24px, 5vw) 100px;
}

.product-window {
  background: #EFE5CE;
  color: #241A13;
  border: 2px solid var(--gold);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7);
  overflow: hidden;
}

/* TOP DESK BAR */
.desk-top-bar {
  background: #1B1512;
  color: var(--gold-pale);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 2px solid var(--gold);
  gap: 20px;
  flex-wrap: wrap;
}
.desk-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}
.desk-tughra {
  font-size: 22px;
  color: var(--gold);
}
.desk-brand strong {
  display: block;
  font-family: var(--font-display);
  font-size: 15px;
  letter-spacing: 0.18em;
}
.desk-brand small {
  font-family: var(--font-sans);
  font-size: 8px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
}

.desk-stats-pill-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
.stat-pill {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(185, 154, 91, 0.2);
  padding: 6px 14px;
}
.pill-lbl {
  display: block;
  font-family: var(--font-sans);
  font-size: 8px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
}
.pill-val {
  font-family: var(--font-heading);
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--gold);
}
.pill-val.green {
  color: #5BA866;
}

.desk-user-badge {
  display: flex;
  align-items: center;
  gap: 10px;
}
.avatar-ring {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--burgundy);
  color: var(--gold-pale);
  display: grid;
  place-content: center;
  font-family: var(--font-heading);
  font-size: 11px;
  font-weight: 700;
  border: 1px solid var(--gold);
}
.avatar-info {
  display: flex;
  flex-direction: column;
}
.user-role {
  font-family: var(--font-heading);
  font-size: 11px;
  color: var(--gold-pale);
}
.user-office {
  font-size: 9px;
  color: var(--muted);
}

/* DESK BODY GRID */
.desk-body-grid {
  display: grid;
  grid-template-columns: 1fr 340px;
}

.desk-main-col {
  padding: 24px;
  border-right: 1px solid rgba(138, 114, 69, 0.3);
}

/* TOOLBAR */
.desk-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
.search-box {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #FAF3E3;
  border: 1px solid rgba(138, 114, 69, 0.3);
  padding: 8px 12px;
  flex: 1;
  min-width: 240px;
}
.search-icon {
  color: #726450;
}
.search-input {
  border: none;
  background: none;
  outline: none;
  font-family: var(--font-serif);
  font-size: 15px;
  color: #241A13;
  width: 100%;
}
.filters-row {
  display: flex;
  gap: 8px;
  align-items: center;
}
.desk-select {
  background: #FAF3E3;
  border: 1px solid rgba(138, 114, 69, 0.3);
  padding: 8px 12px;
  font-family: var(--font-heading);
  font-size: 10px;
  letter-spacing: 0.08em;
  color: #241A13;
  outline: none;
}
.reset-btn {
  padding: 8px 12px;
  background: #FAF3E3;
  border: 1px solid rgba(138, 114, 69, 0.3);
  color: #726450;
  transition: all 0.2s;
}
.reset-btn:hover {
  background: #E8DCC4;
  color: var(--burgundy);
}

/* TABLE */
.table-container {
  overflow-x: auto;
  background: #FAF4E8;
  border: 1px solid rgba(138, 114, 69, 0.3);
  margin-bottom: 24px;
}
.imperial-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}
.imperial-table th {
  padding: 12px 14px;
  font-family: var(--font-heading);
  font-size: 9px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #6C5F4D;
  background: #EFE6D5;
  border-bottom: 1px solid rgba(138, 114, 69, 0.25);
}
.imperial-table td {
  padding: 12px 14px;
  border-bottom: 1px solid rgba(138, 114, 69, 0.14);
  font-size: 15px;
  color: #281D14;
}
.imperial-table tr {
  cursor: pointer;
  transition: background 0.15s;
}
.imperial-table tr:hover {
  background: rgba(100, 30, 43, 0.05);
}
.imperial-table tr.active {
  background: rgba(100, 30, 43, 0.12);
}
.candidate-cell strong {
  font-family: var(--font-display);
  font-size: 16px;
  color: var(--burgundy);
}
.prov-tag {
  font-family: var(--font-heading);
  font-size: 9px;
  letter-spacing: 0.1em;
  padding: 3px 8px;
  border: 1px solid rgba(138, 114, 69, 0.3);
  background: #EFE6D5;
}
.table-loyalty-bar {
  display: flex;
  align-items: center;
  gap: 8px;
}
.loyalty-num {
  font-family: var(--font-sans);
  font-size: 11px;
  font-weight: 700;
  width: 32px;
}
.bar-bg {
  width: 60px;
  height: 6px;
  background: #D8CCA8;
  border-radius: 3px;
  overflow: hidden;
}
.bar-fill {
  height: 100%;
}
.status-pill {
  font-family: var(--font-sans);
  font-size: 10px;
  padding: 4px 8px;
  background: #EAE0C5;
  border-radius: 2px;
}
.status-pill.approved {
  background: #D9EAD3;
  color: #274E13;
  font-weight: 700;
}
.status-pill.rejected {
  background: #F4CCCC;
  color: #783F04;
}
.no-records-cell {
  text-align: center;
  padding: 30px;
  font-style: italic;
  color: #7A6F5D;
}

/* SECONDARY ROW */
.desk-secondary-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.provincial-intel-card,
.decrees-queue-card {
  background: #FAF4E8;
  border: 1px solid rgba(138, 114, 69, 0.3);
  padding: 18px;
}
.card-head {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(138, 114, 69, 0.2);
}
.head-icon {
  color: var(--burgundy);
}
.card-head h4 {
  font-family: var(--font-display);
  font-size: 15px;
  color: var(--burgundy);
  margin: 0;
}
.provinces-tab-strip {
  display: flex;
  gap: 6px;
  margin-bottom: 14px;
  overflow-x: auto;
}
.p-tab {
  padding: 4px 10px;
  font-family: var(--font-heading);
  font-size: 9px;
  letter-spacing: 0.1em;
  background: #EFE6D5;
  border: 1px solid rgba(138, 114, 69, 0.25);
  cursor: pointer;
}
.p-tab.active {
  background: var(--burgundy);
  color: #FAF4E8;
}
.province-detail-view {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.p-stat span {
  display: block;
  font-family: var(--font-sans);
  font-size: 8px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #726450;
  margin-bottom: 2px;
}
.p-stat strong {
  font-size: 13px;
  color: #241A13;
}

.decrees-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.decree-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #EFE6D5;
  border: 1px solid rgba(138, 114, 69, 0.2);
}
.decree-info strong {
  display: block;
  font-family: var(--font-display);
  font-size: 13px;
  color: #241A13;
}
.decree-info small {
  font-size: 10px;
  color: #726450;
}
.seal-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: var(--burgundy);
  color: #FAF4E8;
  font-family: var(--font-heading);
  font-size: 9px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: 1px solid var(--gold);
}
.seal-btn:hover {
  background: #7C2435;
}
.sealed-label {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: var(--font-heading);
  font-size: 9px;
  color: #274E13;
  font-weight: 700;
}

/* RIGHT CANDIDATE DOSSIER */
.candidate-dossier-panel {
  background: #FAF4E8;
  padding: 24px;
  display: flex;
  flex-direction: column;
}
.dossier-head {
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(138, 114, 69, 0.25);
  margin-bottom: 20px;
}
.dossier-eyebrow {
  display: block;
  font-family: var(--font-heading);
  font-size: 9px;
  letter-spacing: 0.22em;
  color: var(--burgundy);
  margin-bottom: 4px;
}
.dossier-head h3 {
  font-family: var(--font-display);
  font-size: 22px;
  color: var(--burgundy);
  margin: 0 0 4px;
}
.dossier-sub {
  font-size: 12px;
  color: #726450;
}

.dossier-body {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.dossier-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.field-lbl {
  font-family: var(--font-heading);
  font-size: 9px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #726450;
}
.field-val {
  font-family: var(--font-display);
  font-size: 16px;
  color: #241A13;
}
.field-pill {
  font-family: var(--font-sans);
  font-size: 11px;
  background: #EFE6D5;
  border: 1px solid rgba(138, 114, 69, 0.25);
  padding: 4px 8px;
  width: max-content;
}
.field-note {
  font-size: 14px;
  color: #4A3A26;
  line-height: 1.5;
  margin: 0;
  padding: 10px;
  background: #EFE6D5;
  border-left: 2px solid var(--burgundy);
}

/* Loyalty Meter */
.loyalty-control-group {
  padding: 14px;
  background: #EFE6D5;
  border: 1px solid rgba(138, 114, 69, 0.25);
}
.loyalty-control-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}
.loyalty-score {
  font-family: var(--font-sans);
  font-size: 16px;
  font-weight: 700;
}
.meter-bar {
  height: 8px;
  background: #D8CCA8;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 12px;
}
.meter-fill {
  height: 100%;
  transition: width 0.3s;
}
.meter-adjust-btns {
  display: flex;
  gap: 8px;
}
.meter-btn {
  flex: 1;
  padding: 6px;
  font-family: var(--font-heading);
  font-size: 8px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border: 1px solid rgba(138, 114, 69, 0.3);
  background: #FAF4E8;
}
.meter-btn:hover {
  background: #E8DCC4;
}

/* Decision Action Buttons */
.dossier-action-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
}
.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  font-family: var(--font-heading);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-weight: 700;
  border: 1px solid transparent;
  transition: all 0.2s;
}
.action-btn.approve {
  background: #274E13;
  color: #FAF4E8;
  border-color: #3E7C47;
}
.action-btn.approve:hover {
  background: #1E3D0F;
}
.action-btn.reject {
  background: #783F04;
  color: #FAF4E8;
  border-color: #A64D79;
}
.action-btn.reject:hover {
  background: #5B2F03;
}

.empty-dossier {
  padding: 40px 10px;
  text-align: center;
  color: #7A6F5D;
  font-style: italic;
}

@media (max-width: 1080px) {
  .desk-body-grid {
    grid-template-columns: 1fr;
  }
  .desk-main-col {
    border-right: none;
    border-bottom: 1px solid rgba(138, 114, 69, 0.3);
  }
  .desk-secondary-row {
    grid-template-columns: 1fr;
  }
}
</style>
