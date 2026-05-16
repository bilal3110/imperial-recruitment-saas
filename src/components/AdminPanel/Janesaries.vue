<script setup>
import { ref, computed, watch } from "vue";

const ALL_RECRUITS = [
  { name: "Ali",     age: 19, province: "Anatolia",   skill: "Sword",    loyalty: 82 },
  { name: "Mehmet",  age: 22, province: "Balkans",     skill: "Archery",  loyalty: 41 },
  { name: "Fatima",  age: 18, province: "Cappadocia",  skill: "Spearman", loyalty: 58 },
  { name: "Yusuf",   age: 24, province: "Rumelia",     skill: "Cavalry",  loyalty: 91 },
  { name: "Hasan",   age: 20, province: "Anatolia",    skill: "Archery",  loyalty: 34 },
  { name: "Ibrahim", age: 17, province: "Syria",       skill: "Spearman", loyalty: 67 },
  { name: "Selim",   age: 23, province: "Balkans",     skill: "Sword",    loyalty: 75 },
  { name: "Omar",    age: 21, province: "Cappadocia",  skill: "Cavalry",  loyalty: 28 },
  { name: "Davud",   age: 25, province: "Rumelia",     skill: "Sword",    loyalty: 88 },
  { name: "Mustafa", age: 19, province: "Syria",       skill: "Archery",  loyalty: 52 },
  { name: "Kemal",   age: 22, province: "Anatolia",    skill: "Spearman", loyalty: 44 },
  { name: "Tariq",   age: 18, province: "Balkans",     skill: "Cavalry",  loyalty: 71 },
];

const recruits = ref(ALL_RECRUITS.map(r => ({ ...r })));


const filterProvince = ref("");
const filterSkill    = ref("");
const filterLoyalty  = ref("");
const filterSearch   = ref("");


const sortCol = ref(null);
const sortDir = ref(1);

function toggleSort(col) {
  if (sortCol.value === col) sortDir.value *= -1;
  else { sortCol.value = col; sortDir.value = 1; }
}

function sortIcon(col) {
  if (sortCol.value !== col) return "";
  return sortDir.value === 1 ? " ↑" : " ↓";
}


const PER_PAGE    = 5;
const currentPage = ref(1);


const selectedRecruit = ref(null);


const filtered = computed(() => {
  let list = recruits.value.filter(r => {
    if (filterProvince.value && r.province !== filterProvince.value) return false;
    if (filterSkill.value    && r.skill    !== filterSkill.value)    return false;
    if (filterLoyalty.value === "high" && r.loyalty <  70)           return false;
    if (filterLoyalty.value === "mid"  && (r.loyalty < 40 || r.loyalty >= 70)) return false;
    if (filterLoyalty.value === "low"  && r.loyalty >= 40)           return false;
    if (filterSearch.value) {
      const q = filterSearch.value.toLowerCase();
      if (!r.name.toLowerCase().includes(q) && !r.province.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  if (sortCol.value) {
    list = [...list].sort((a, b) => {
      const av = a[sortCol.value];
      const bv = b[sortCol.value];
      return (typeof av === "string" ? av.localeCompare(bv) : av - bv) * sortDir.value;
    });
  }

  return list;
});

const totalPages = computed(() => Math.max(1, Math.ceil(filtered.value.length / PER_PAGE)));

const paginated = computed(() => {
  const start = (currentPage.value - 1) * PER_PAGE;
  return filtered.value.slice(start, start + PER_PAGE);
});

const pageStart = computed(() => (currentPage.value - 1) * PER_PAGE + 1);
const pageEnd   = computed(() => Math.min(currentPage.value * PER_PAGE, filtered.value.length));

watch([filterProvince, filterSkill, filterLoyalty, filterSearch, sortCol], () => {
  currentPage.value = 1;
});

function selectRecruit(recruit) {
  selectedRecruit.value = recruit;
}

function resetFilters() {
  filterProvince.value = "";
  filterSkill.value    = "";
  filterLoyalty.value  = "";
  filterSearch.value   = "";
  sortCol.value        = null;
  sortDir.value        = 1;
  currentPage.value    = 1;
  selectedRecruit.value = null;
}

function adjustLoyalty(delta) {
  if (!selectedRecruit.value) return;
  const rec = recruits.value.find(r => r.name === selectedRecruit.value.name);
  if (rec) {
    rec.loyalty = Math.max(0, Math.min(100, rec.loyalty + delta));
    selectedRecruit.value = rec;
  }
}

function loyaltyClass(v)  { return v >= 70 ? "good" : v >= 40 ? "neutral" : "bad"; }
function loyaltyLabel(v)  { return v >= 70 ? "Loyal" : v >= 40 ? "Wavering" : "Suspicious"; }
function loyaltyBarColor(v){ return v >= 70 ? "var(--success)" : v >= 40 ? "var(--gold)" : "var(--danger)"; }
</script>

<template>
  <div class="recruit-root">

    <div class="page-header">
      <span class="h-line"></span>
      <span class="h-title">✦ &nbsp; Acemi Oğlanlar &nbsp; ✦</span>
      <span class="h-line right"></span>
    </div>

    <div class="filter-bar">
      <div class="filter-group">
        <label for="f-province">Province</label>
        <select id="f-province" v-model="filterProvince">
          <option value="">All Provinces</option>
          <option value="Anatolia">Anatolia</option>
          <option value="Balkans">Balkans</option>
          <option value="Cappadocia">Cappadocia</option>
          <option value="Rumelia">Rumelia</option>
          <option value="Syria">Syria</option>
        </select>
      </div>

      <div class="filter-group">
        <label for="f-skill">Skill</label>
        <select id="f-skill" v-model="filterSkill">
          <option value="">All Skills</option>
          <option value="Sword">Sword</option>
          <option value="Archery">Archery</option>
          <option value="Spearman">Spearman</option>
          <option value="Cavalry">Cavalry</option>
        </select>
      </div>

      <div class="filter-group">
        <label for="f-loyalty">Loyalty</label>
        <select id="f-loyalty" v-model="filterLoyalty">
          <option value="">All</option>
          <option value="high">High (≥70)</option>
          <option value="mid">Medium (40–69)</option>
          <option value="low">Low (&lt;40)</option>
        </select>
      </div>

      <div class="filter-group">
        <label for="f-search">Search</label>
        <input
          id="f-search"
          type="text"
          v-model="filterSearch"
          placeholder="Name or province..."
        />
      </div>

      <div class="filter-actions">
        <span class="result-count">{{ filtered.length }} recruit{{ filtered.length !== 1 ? "s" : "" }}</span>
        <button class="btn-reset" @click="resetFilters">Reset</button>
      </div>
    </div>

    <div class="recruit-grid">

      <section class="recruit-panel">
        <div class="recruit-header">
          <span class="r-hline"></span>
          <span class="r-htitle">✦ &nbsp; Janissaries List &nbsp; ✦</span>
          <span class="r-hline right"></span>
        </div>

        <div class="table-wrapper">
          <table class="recruit-table">
            <thead>
              <tr>
                <th @click="toggleSort('name')">Name<span class="sort-icon">{{ sortIcon('name') }}</span></th>
                <th @click="toggleSort('age')">Age<span class="sort-icon">{{ sortIcon('age') }}</span></th>
                <th @click="toggleSort('province')">Province<span class="sort-icon">{{ sortIcon('province') }}</span></th>
                <th @click="toggleSort('skill')">Skill<span class="sort-icon">{{ sortIcon('skill') }}</span></th>
                <th @click="toggleSort('loyalty')">Loyalty<span class="sort-icon">{{ sortIcon('loyalty') }}</span></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="recruit in paginated"
                :key="recruit.name"
                @click="selectRecruit(recruit)"
                :class="{ selected: selectedRecruit?.name === recruit.name }"
              >
                <td>{{ recruit.name }}</td>
                <td>{{ recruit.age }}</td>
                <td>{{ recruit.province }}</td>
                <td>{{ recruit.skill }}</td>
                <td>
                  <span :class="['loyalty-badge', loyaltyClass(recruit.loyalty)]">
                    {{ recruit.loyalty }}
                  </span>
                </td>
              </tr>
              <tr v-if="paginated.length === 0">
                <td colspan="5" class="empty-state">No recruits match the current filters.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="pagination" v-if="filtered.length > 0">
          <span class="page-info">
            Showing {{ pageStart }}–{{ pageEnd }} of {{ filtered.length }}
          </span>
          <div class="page-btns">
            <button class="page-btn" :disabled="currentPage === 1" @click="currentPage--">‹</button>
            <button
              v-for="p in totalPages"
              :key="p"
              class="page-btn"
              :class="{ active: p === currentPage }"
              @click="currentPage = p"
            >{{ p }}</button>
            <button class="page-btn" :disabled="currentPage === totalPages" @click="currentPage++">›</button>
          </div>
        </div>
      </section>

      <aside class="recruit-side">
        <h2>Recruit Details</h2>

        <template v-if="selectedRecruit">
          <div class="detail-row">
            <span class="detail-label">Name</span>
            <span class="detail-value">{{ selectedRecruit.name }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Age</span>
            <span class="detail-value">{{ selectedRecruit.age }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Province</span>
            <span class="detail-value">{{ selectedRecruit.province }}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Skill</span>
            <span class="detail-value">{{ selectedRecruit.skill }}</span>
          </div>
          <div class="detail-row loyalty-detail">
            <div class="loyalty-header">
              <span class="detail-label">Loyalty</span>
              <span :class="['loyalty-badge', loyaltyClass(selectedRecruit.loyalty)]">
                {{ selectedRecruit.loyalty }} · {{ loyaltyLabel(selectedRecruit.loyalty) }}
              </span>
            </div>
            <div class="loyalty-bar-track">
              <div
                class="loyalty-bar-fill"
                :style="{
                  width: selectedRecruit.loyalty + '%',
                  background: loyaltyBarColor(selectedRecruit.loyalty)
                }"
              ></div>
            </div>
          </div>

          <div class="btns">
            <button class="approve" @click="adjustLoyalty(10)">⚔ Approve</button>
            <button class="reject"  @click="adjustLoyalty(-20)">✦ Reject</button>
          </div>
        </template>

        <div v-else class="empty-side">
          <p>Select a recruit from the list to view details and actions.</p>
        </div>
      </aside>

    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Cinzel:wght@400;600;700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap");

.recruit-root {
  --gold: #c9972a;
  --gold-light: #e8b84b;
  --gold-pale: #f5e6c0;
  --gold-dim: rgba(201, 151, 42, 0.12);
  --gold-border: rgba(201, 151, 42, 0.25);
  --ink: #1a1208;
  --ink-deep: #0f0b05;
  --parchment: #f7f0dc;
  --parchment-muted: #c8b98a;
  --text-muted: rgba(26, 18, 8, 0.45);
  --danger: #8b1a1a;
  --danger-dim: rgba(139, 26, 26, 0.15);
  --success: #2a783c;
  --success-dim: rgba(42, 120, 60, 0.15);
  font-family: "Cinzel", serif;
  color: var(--ink-deep);
}

.page-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
}
.h-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, var(--gold-border), transparent);
}
.h-line.right {
  background: linear-gradient(90deg, transparent, var(--gold-border));
}
.h-title {
  font-size: 9px;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: var(--gold);
  opacity: 0.8;
  white-space: nowrap;
}

.filter-bar {
  background: var(--parchment);
  border: 1px solid var(--gold-border);
  border-radius: 10px;
  padding: 14px 18px;
  margin-bottom: 16px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 14px;
}
.filter-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.filter-group label {
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold);
  opacity: 0.8;
}
.filter-group select,
.filter-group input {
  background: rgba(247, 240, 220, 0.7);
  border: 1px solid var(--gold-border);
  border-radius: 4px;
  padding: 7px 10px;
  font-family: "EB Garamond", serif;
  font-size: 14px;
  color: var(--ink-deep);
  outline: none;
  min-width: 130px;
  transition: border-color 0.2s, background 0.2s;
}
.filter-group select:focus,
.filter-group input:focus {
  border-color: var(--gold);
  background: var(--parchment);
}
.filter-actions {
  display: flex;
  align-items: flex-end;
  gap: 10px;
  margin-left: auto;
}
.result-count {
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--parchment-muted);
  padding-bottom: 9px;
}
.btn-reset {
  padding: 8px 16px;
  background: transparent;
  color: var(--parchment-muted);
  border: 1px solid var(--gold-border);
  border-radius: 4px;
  font-family: "Cinzel", serif;
  font-size: 11px;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-reset:hover {
  background: var(--gold-dim);
  color: var(--ink-deep);
}

.recruit-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.8fr) minmax(260px, 1fr);
  gap: 16px;
}
.recruit-panel,
.recruit-side {
  background: var(--parchment);
  border: 1px solid var(--gold-border);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 8px 24px rgba(15, 11, 5, 0.07);
}

.recruit-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
}
.r-hline {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, var(--gold-border), transparent);
}
.r-hline.right {
  background: linear-gradient(90deg, transparent, var(--gold-border));
}
.r-htitle {
  font-size: 9px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--gold);
  opacity: 0.8;
  white-space: nowrap;
}

.table-wrapper {
  overflow-x: auto;
}
.recruit-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  min-width: 500px;
}
.recruit-table th {
  padding: 11px 12px;
  text-align: left;
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink);
  opacity: 0.6;
  border-bottom: 1px solid rgba(201, 151, 42, 0.2);
  background: rgba(247, 240, 220, 0.6);
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
  transition: opacity 0.2s, color 0.2s;
}
.recruit-table th:hover {
  opacity: 1;
  color: var(--gold);
}
.sort-icon {
  margin-left: 3px;
  opacity: 0.7;
}
.recruit-table tbody tr {
  cursor: pointer;
  transition: background 0.15s;
}
.recruit-table tbody tr:hover {
  background: rgba(201, 151, 42, 0.08);
}
.recruit-table tbody tr.selected {
  background: rgba(201, 151, 42, 0.15) !important;
}
.recruit-table td {
  padding: 13px 12px;
  border-bottom: 1px solid rgba(26, 18, 8, 0.07);
  font-family: "EB Garamond", serif;
  font-size: 15px;
  color: var(--ink-deep);
}
.recruit-table tbody tr:last-child td {
  border-bottom: none;
}
.empty-state {
  padding: 36px 20px;
  text-align: center;
  font-family: "EB Garamond", serif;
  font-style: italic;
  font-size: 15px;
  color: var(--parchment-muted);
}

.loyalty-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 999px;
  font-family: "Cinzel", serif;
  font-size: 11px;
}
.good    { background: var(--success-dim); color: var(--success); }
.neutral { background: var(--gold-dim);    color: #7a5b07; }
.bad     { background: var(--danger-dim);  color: var(--danger); }

.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid var(--gold-border);
}
.page-info {
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--parchment-muted);
}
.page-btns {
  display: flex;
  gap: 5px;
}
.page-btn {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--gold-border);
  border-radius: 3px;
  background: transparent;
  font-family: "Cinzel", serif;
  font-size: 11px;
  color: var(--parchment-muted);
  cursor: pointer;
  transition: all 0.2s;
}
.page-btn:hover:not(:disabled) {
  background: var(--gold-dim);
  color: var(--ink-deep);
  border-color: var(--gold);
}
.page-btn.active {
  background: var(--gold);
  color: var(--ink-deep);
  border-color: var(--gold);
  font-weight: 700;
}
.page-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.recruit-side h2 {
  font-family: "Cinzel Decorative", serif;
  font-size: 18px;
  margin-bottom: 16px;
  color: var(--ink-deep);
}
.detail-row {
  padding: 10px 0;
  border-bottom: 1px solid rgba(26, 18, 8, 0.07);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.detail-row.loyalty-detail {
  flex-direction: column;
  align-items: stretch;
  gap: 8px;
}
.loyalty-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.detail-label {
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold);
  opacity: 0.75;
}
.detail-value {
  font-family: "EB Garamond", serif;
  font-size: 15px;
  color: var(--ink-deep);
}
.loyalty-bar-track {
  height: 4px;
  background: rgba(26, 18, 8, 0.1);
  border-radius: 2px;
  overflow: hidden;
}
.loyalty-bar-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s;
}
.empty-side {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 180px;
  font-family: "EB Garamond", serif;
  font-style: italic;
  font-size: 14px;
  color: var(--parchment-muted);
  text-align: center;
  padding: 20px;
  opacity: 0.8;
}

.btns {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
button.approve,
button.reject {
  flex: 1;
  padding: 10px 14px;
  border: none;
  border-radius: 4px;
  font-family: "Cinzel", serif;
  font-size: 11px;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: opacity 0.15s, transform 0.15s;
}
button.approve { background: var(--success); color: #fff; }
button.reject  { background: var(--danger);  color: #fff; }
button.approve:hover,
button.reject:hover {
  opacity: 0.85;
  transform: translateY(-1px);
}
</style>