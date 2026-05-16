<script setup>
import AdminLayout from "@/layouts/AdminLayout.vue";
import { ref } from "vue";

const provinces = ref([
  {
    name: "Anatolia",
    region: "Anatolia",
    status: "loyal",
    desc: "Heartland of the empire, seat of the Sultanate since the earliest days of conquest.",
    soldiers: "42,000",
    revenue: "280K",
    loyalty: 91,
    resources: ["Grain", "Iron", "Cavalry", "Wool"],
    color: "#c9972a",
    tag: "anatolia",
  },
  {
    name: "Rumelia",
    region: "Europe",
    status: "loyal",
    desc: "Gateway to European domains, holding the key fortresses of the western frontier.",
    soldiers: "35,000",
    revenue: "220K",
    loyalty: 84,
    resources: ["Silver", "Timber", "Infantry", "Grain"],
    color: "#2a6078",
    tag: "europe",
  },
  {
    name: "Balkans",
    region: "Europe",
    status: "restless",
    desc: "A mosaic of peoples and faiths — prosperous yet volatile beneath the surface.",
    soldiers: "28,000",
    revenue: "190K",
    loyalty: 54,
    resources: ["Copper", "Livestock", "Iron"],
    color: "#2a6078",
    tag: "europe",
  },
  {
    name: "Syria",
    region: "Levant",
    status: "loyal",
    desc: "Ancient land of caravans and caliphates, now a jewel of the imperial treasury.",
    soldiers: "22,000",
    revenue: "240K",
    loyalty: 79,
    resources: ["Silk", "Spices", "Cotton", "Horses"],
    color: "#7a3b1e",
    tag: "levant",
  },
  {
    name: "Egypt",
    region: "Africa",
    status: "loyal",
    desc: "Granary of the empire, flowing with the wealth of the Nile and Mediterranean trade.",
    soldiers: "30,000",
    revenue: "350K",
    loyalty: 76,
    resources: ["Grain", "Cotton", "Gold", "Flax"],
    color: "#6b5a1a",
    tag: "africa",
  },
  {
    name: "Iraq",
    region: "Levant",
    status: "restless",
    desc: "Land between the rivers — eternally contested between East and West.",
    soldiers: "18,000",
    revenue: "160K",
    loyalty: 48,
    resources: ["Dates", "Horses", "Leather"],
    color: "#7a3b1e",
    tag: "levant",
  },
  {
    name: "Cappadocia",
    region: "Anatolia",
    status: "loyal",
    desc: "Rocky heartland of devout horsemen, training grounds for the finest Sipahi cavalry.",
    soldiers: "14,000",
    revenue: "120K",
    loyalty: 88,
    resources: ["Horses", "Salt", "Stone", "Wool"],
    color: "#c9972a",
    tag: "anatolia",
  },
  {
    name: "Greece",
    region: "Europe",
    status: "rebel",
    desc: "A proud and ancient people, simmering with discontent beneath the crescent banner.",
    soldiers: "16,000",
    revenue: "140K",
    loyalty: 22,
    resources: ["Olive Oil", "Marble", "Ships"],
    color: "#2a6078",
    tag: "europe",
  },
  {
    name: "Arabia",
    region: "Levant",
    status: "restless",
    desc: "Keeper of the holy cities, Mecca and Medina — vast, scorching, and ungovernable.",
    soldiers: "12,000",
    revenue: "180K",
    loyalty: 55,
    resources: ["Incense", "Horses", "Pearls"],
    color: "#7a3b1e",
    tag: "levant",
  },
  {
    name: "Libya",
    region: "Africa",
    status: "loyal",
    desc: "Desert fortress anchoring the western Maghreb under the Sublime Porte.",
    soldiers: "9,000",
    revenue: "90K",
    loyalty: 70,
    resources: ["Ivory", "Salt", "Slaves", "Camels"],
    color: "#6b5a1a",
    tag: "africa",
  },
  {
    name: "Bosnia",
    region: "Europe",
    status: "loyal",
    desc: "Mountain stronghold of the devshirme — loyal converts who rose to lead the Janissaries.",
    soldiers: "20,000",
    revenue: "110K",
    loyalty: 82,
    resources: ["Iron", "Timber", "Infantry", "Silver"],
    color: "#2a6078",
    tag: "europe",
  },
  {
    name: "Armenia",
    region: "Anatolia",
    status: "rebel",
    desc: "Ancient mountain realm — fiercely independent, caught between Persian and Ottoman ambition.",
    soldiers: "11,000",
    revenue: "85K",
    loyalty: 18,
    resources: ["Copper", "Dyes", "Silk", "Stone"],
    color: "#c9972a",
    tag: "anatolia",
  },
]);

function filterCards(filter, btn) {
  const grid = document.getElementById("grid");
  const cards = grid.getElementsByClassName("province-card");

  for (let card of cards) {
    if (filter === "all" || card.classList.contains(filter)) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  }

  const buttons = document.getElementsByClassName("filter-btn");
  for (let button of buttons) {
    button.classList.remove("active");
  }
  btn.classList.add("active");
}

function getStatusBadge(status) {
  if (status === "loyal") {
    return `<span class="status-badge status-loyal">Loyal</span>`;
  } else if (status === "restless") {
    return `<span class="status-badge status-restless">Restless</span>`;
  } else if (status === "rebel") {
    return `<span class="status-badge status-rebel">Rebel</span>`;
  }
  return "";
}

function getStatusClass(status) {
  return `status-${status}`;
}

function capitalize(s) {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}
defineOptions({
  layout: AdminLayout,
});
</script>
<template>
  <div class="page-header">
    <p class="eyebrow">Sublime Porte · Imperial Registry</p>
    <h1 class="page-title">Ottoman Provinces</h1>
    <div class="divider">
      <div class="divider-line"></div>
      <div class="divider-gem"></div>
      <div class="divider-line"></div>
    </div>
    <p
      style="
        font-size: 9px;
        letter-spacing: 0.25em;
        color: #c8b98a;
        text-transform: uppercase;
      "
    >
      Est. 1299 · Devlet-i Aliyye-i Osmâniyye
    </p>
  </div>

  <div class="summary-bar">
    <div class="summary-item">
      <div class="summary-num" id="total-count">12</div>
      <div class="summary-lbl">Total Provinces</div>
    </div>
    <div class="summary-item">
      <div class="summary-num" id="loyal-count">7</div>
      <div class="summary-lbl">Loyal</div>
    </div>
    <div class="summary-item">
      <div class="summary-num" id="restless-count">3</div>
      <div class="summary-lbl">Restless</div>
    </div>
    <div class="summary-item">
      <div class="summary-num" id="rebel-count">2</div>
      <div class="summary-lbl">Rebel</div>
    </div>
  </div>

  <div class="filter-bar">
    <button class="filter-btn active" @click="filterCards('all', $event.target)">
      All Provinces
    </button>
    <button class="filter-btn" @click="filterCards('loyal', $event.target)">
      Loyal
    </button>
    <button class="filter-btn" @click="filterCards('restless', $event.target)">
      Restless
    </button>
    <button class="filter-btn" @click="filterCards('rebel', $event.target)">
      Rebel
    </button>
    <button class="filter-btn" @click="filterCards('anatolia', $event.target)">
      Anatolia
    </button>
    <button class="filter-btn" @click="filterCards('europe', $event.target)">
      Europe
    </button>
    <button class="filter-btn" @click="filterCards('levant', $event.target)">
      Levant
    </button>
    <button class="filter-btn" @click="filterCards('africa', $event.target)">
      Africa
    </button>
  </div>

  <div class="grid" id="grid">
    <div class="card-body" v-for="p in provinces" :key="p.name" :class="`province-card ${p.status} ${p.tag}`">
      <div class="card-top">
        <div>
          <div class="province-name">{{ p.name }}</div>
          <div class="province-region">{{ p.region }}</div>
        </div>
        <span :class="['status-badge', getStatusClass(p.status)]">
          {{ capitalize(p.status) }}
        </span>
      </div>
      <div class="card-desc">{{ p.desc }}</div>
      <div class="card-stats">
        <div class="stat">
          <div class="stat-label">Soldiers</div>
          <div class="stat-value">{{ p.soldiers }}</div>
        </div>
        <div class="stat">
          <div class="stat-label">Revenue</div>
          <div class="stat-value">{{ p.revenue }}</div>
        </div>
      </div>
      <div class="loyalty-bar-wrap">
        <div class="loyalty-label">
          <span>Loyalty</span><span>{{ p.loyalty }}%</span>
        </div>
        <div class="loyalty-track">
          <div class="loyalty-fill" :style="{ width: p.loyalty + '%' }"></div>
        </div>
      </div>
      <div class="card-resources">
        <span v-for="r in p.resources" :key="r" class="resource-tag">{{ r }}</span>
      </div>
    </div>
  </div>
</template>
<style scoped>
:root {
  --gold: #c9972a;
  --gold-light: #e8b84b;
  --gold-pale: #f5e6c0;
  --gold-dim: rgba(201, 151, 42, 0.12);
  --gold-border: rgba(201, 151, 42, 0.25);
  --ink: #1a1208;
  --ink-deep: #0f0b05;
  --parchment: #f7f0dc;
  --parchment-muted: #c8b98a;
  --text-muted: rgba(26, 18, 8, 0.5);
  --danger: #8b1a1a;
  --danger-dim: rgba(139, 26, 26, 0.15);
  --success: #2a783c;
  --success-dim: rgba(42, 120, 60, 0.15);
  --bg: #1a1208;
}

.page-header {
  text-align: center;
  margin-bottom: 2.5rem;
  position: relative;
  z-index: 1;
}
.eyebrow {
  font-size: 10px;
  letter-spacing: 0.35em;
  color: var(--gold);
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  opacity: 0.8;
}
.page-title {
  font-family: "Cinzel Decorative", serif;
  font-size: clamp(1.4rem, 4vw, 2.2rem);
  font-weight: 700;
  color: var(--gold-light);
  letter-spacing: 0.05em;
  text-shadow: 0 0 40px rgba(201, 151, 42, 0.3);
  margin-bottom: 0.4rem;
}
.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 0.8rem auto;
}
.divider-line {
  flex: 1;
  max-width: 120px;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--gold-border),
    transparent
  );
}
.divider-gem {
  width: 6px;
  height: 6px;
  background: var(--gold);
  transform: rotate(45deg);
}

.filter-bar {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
}
.filter-btn {
  background: transparent;
  border: 1px solid rgba(201, 151, 42, 0.25);
  color: #c8b98a;
  font-family: "Cinzel", serif;
  font-size: 9px;
  letter-spacing: 0.2em;
  padding: 6px 14px;
  cursor: pointer;
  transition: all 0.2s;
  text-transform: uppercase;
}
.filter-btn:hover,
.filter-btn.active {
  background: var(--gold-dim);
  border-color: var(--gold);
  color: var(--gold-light);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
  position: relative;
  z-index: 1;
}

.province-card {
  background: linear-gradient(160deg, #241a0a 0%, #1a1208 60%, #120e06 100%);
  border: 1px solid var(--gold-border);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition:
    transform 0.25s,
    border-color 0.25s,
    box-shadow 0.25s;
  animation: fadeIn 0.5s ease both;
}
.province-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(201, 151, 42, 0.08) 0%,
    transparent 50%
  );
  pointer-events: none;
}
.province-card::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
  opacity: 0;
  transition: opacity 0.25s;
}
.province-card:hover {
  transform: translateY(-3px);
  border-color: var(--gold);
}
.province-card:hover::after {
  opacity: 1;
}

.corner {
  position: absolute;
  width: 12px;
  height: 12px;
}
.corner-tl {
  top: 6px;
  left: 6px;
  border-top: 1px solid var(--gold);
  border-left: 1px solid var(--gold);
}
.corner-tr {
  top: 6px;
  right: 6px;
  border-top: 1px solid var(--gold);
  border-right: 1px solid var(--gold);
}
.corner-bl {
  bottom: 6px;
  left: 6px;
  border-bottom: 1px solid var(--gold);
  border-left: 1px solid var(--gold);
}
.corner-br {
  bottom: 6px;
  right: 6px;
  border-bottom: 1px solid var(--gold);
  border-right: 1px solid var(--gold);
}

.card-banner {
  height: 6px;
}
.card-body {
  padding: 1.2rem 1.4rem 1.1rem;
}
.card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 0.8rem;
}
.province-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--gold-light);
  letter-spacing: 0.05em;
  line-height: 1.2;
}
.province-region {
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold);
  opacity: 0.7;
  margin-top: 3px;
}
.status-badge {
  font-size: 8px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 3px 8px;
  border: 1px solid;
  font-family: "Cinzel", serif;
  white-space: nowrap;
}
.status-loyal {
  border-color: var(--success);
  color: var(--success);
  background: var(--success-dim);
}
.status-restless {
  border-color: #8b6a1a;
  color: #c9972a;
  background: rgba(139, 106, 26, 0.15);
}
.status-rebel {
  border-color: var(--danger);
  color: #c54040;
  background: var(--danger-dim);
}

.card-desc {
  font-family: "IM Fell English", serif;
  font-style: italic;
  font-size: 12px;
  color: #c8b98a;
  line-height: 1.6;
  margin-bottom: 1rem;
  border-left: 2px solid var(--gold-border);
  padding-left: 10px;
}

.card-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 1rem;
}
.stat {
  background: var(--gold-dim);
  border: 1px solid var(--gold-border);
  padding: 7px 10px;
}
.stat-label {
  font-size: 7px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #c8b98a;
  margin-bottom: 3px;
}
.stat-value {
  font-size: 14px;
  font-weight: 600;
  color: var(--gold-light);
}

.loyalty-bar-wrap {
  margin-bottom: 1rem;
}
.loyalty-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 8px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #c8b98a;
  margin-bottom: 5px;
}
.loyalty-track {
  height: 3px;
  background: rgba(255, 255, 255, 0.08);
  position: relative;
}
.loyalty-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--gold), var(--gold-light));
  transition: width 0.4s;
}

.card-resources {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}
.resource-tag {
  font-size: 8px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 3px 8px;
  border: 1px solid var(--gold-border);
  color: #c8b98a;
  background: rgba(201, 151, 42, 0.05);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.summary-bar {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
  padding: 1rem 1.5rem;
  border: 1px solid var(--gold-border);
  background: rgba(201, 151, 42, 0.04);
}
.summary-item {
  text-align: center;
}
.summary-num {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--gold-light);
}
.summary-lbl {
  font-size: 8px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color:#c8b98a;
  margin-top: 2px;
}

.hidden {
  display: none !important;
}
</style>
