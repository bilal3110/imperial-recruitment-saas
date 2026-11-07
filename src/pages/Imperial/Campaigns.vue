<script setup>
import { ref, computed, onMounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { campaigns } from '@/data/imperial';
import { Swords, MapPin, Users, Crosshair, Flag, Quote, ArrowRight, Filter } from 'lucide-vue-next';

const route = useRoute();
const selectedCampaignId = ref('constantinople-1453');
const filterType = ref('All');

const filteredCampaigns = computed(() => {
  if (filterType.value === 'All') return campaigns;
  if (filterType.value === 'Battle') {
    return campaigns.filter(c => c.type.toLowerCase().includes('battle') && !c.type.toLowerCase().includes('naval'));
  }
  if (filterType.value === 'Siege') {
    return campaigns.filter(c => c.type.toLowerCase().includes('siege'));
  }
  if (filterType.value === 'Naval') {
    return campaigns.filter(c => c.type.toLowerCase().includes('naval'));
  }
  return campaigns;
});

const currentCampaign = computed(() => {
  return campaigns.find(c => c.id === selectedCampaignId.value) || campaigns[2];
});

function selectCampaign(id) {
  selectedCampaignId.value = id;
}

onMounted(() => {
  const hash = window.location.hash.replace('#', '');
  if (hash && campaigns.some(c => c.id === hash)) {
    selectedCampaignId.value = hash;
  }
});
</script>

<template>
  <div class="campaigns-page">
    <!-- HERO SECTION -->
    <section class="page-hero">
      <div 
        class="page-hero-bg" 
        style="background-image: url('/images/campaigns/constantinople-1453.jpg')"
      ></div>
      <div class="page-hero-overlay"></div>

      <div class="page-hero-content">
        <p class="eyebrow">Wars, Sieges & Naval Clashes</p>
        <h1>Where History<br>Was Decided.</h1>
        <p class="hero-desc">
          The Ottoman Empire was shaped by campaigns that transformed borders, overturned kingdoms, and reordered the balance of global power across Europe, the Mediterranean, and Western Asia.
        </p>
      </div>
    </section>

    <!-- ARCHIVE CONTROLS & FILTER BAR -->
    <section class="archive-bar">
      <div class="archive-bar-inner">
        <div class="filter-group">
          <Filter :size="15" class="filter-icon" />
          <span class="filter-label">Engagement Type:</span>
          <button 
            v-for="ft in ['All', 'Battle', 'Siege', 'Naval']" 
            :key="ft"
            class="filter-tab"
            :class="{ active: filterType === ft }"
            @click="filterType = ft"
          >
            {{ ft === 'All' ? 'All Engagements (8)' : ft }}
          </button>
        </div>

        <div class="archive-meta-note">
          <span>8 Consequential Campaigns · 1389–1683</span>
        </div>
      </div>
    </section>

    <!-- MAIN CAMPAIGN ARCHIVE WORKBENCH -->
    <section class="imperial-section night campaign-workbench">
      <div class="workbench-layout">
        <!-- Left: Campaign List Index -->
        <aside class="campaign-index-panel">
          <div class="index-panel-header">
            <span>Historical Roll</span>
            <small>{{ filteredCampaigns.length }} Campaigns</small>
          </div>

          <div class="campaign-items-scroll">
            <button
              v-for="c in filteredCampaigns"
              :key="c.id"
              :id="c.id"
              class="campaign-entry-card"
              :class="{ selected: selectedCampaignId === c.id }"
              @click="selectCampaign(c.id)"
            >
              <div class="entry-header">
                <span class="entry-year">{{ c.year }}</span>
                <span class="entry-type">{{ c.type }}</span>
              </div>
              <strong class="entry-name">{{ c.name }}</strong>
              <div class="entry-meta">
                <span class="entry-loc"><MapPin :size="12" /> {{ c.location.split('(')[0] }}</span>
              </div>
              <div class="entry-footer">
                <span class="entry-outcome">{{ c.outcome }}</span>
              </div>
            </button>
          </div>
        </aside>

        <!-- Right: Comprehensive Campaign Dossier -->
        <article class="campaign-dossier-panel">
          <!-- Artwork Header -->
          <div class="dossier-hero-art">
            <img 
              :src="currentCampaign.image" 
              :alt="`Historical painting of ${currentCampaign.name}`" 
              class="dossier-painting" 
            />
            <div class="art-gradient"></div>
            <div class="art-badge-row">
              <span class="art-year-badge">{{ currentCampaign.date }}</span>
              <span class="art-type-badge">{{ currentCampaign.type }}</span>
            </div>
            <h2 class="art-title">{{ currentCampaign.name }}</h2>
          </div>

          <!-- Dossier Body Content -->
          <div class="dossier-inner-content">
            <!-- Summary Narrative -->
            <div class="dossier-lead-card">
              <p class="narrative-text">{{ currentCampaign.detail }}</p>
              <div v-if="currentCampaign.quote" class="quote-row">
                <Quote :size="18" class="q-icon" />
                <span class="quote-text">"{{ currentCampaign.quote }}"</span>
              </div>
            </div>

            <!-- Operational Details Grid -->
            <div class="dossier-tactics-grid">
              <!-- Commanders & Opposing Forces -->
              <div class="tactic-cell">
                <div class="cell-head">
                  <Users :size="18" class="cell-icon" />
                  <h4>Commanders & Leadership</h4>
                </div>
                <p>{{ currentCampaign.commanders }}</p>
              </div>

              <div class="tactic-cell">
                <div class="cell-head">
                  <Swords :size="18" class="cell-icon" />
                  <h4>Opposing Forces & Composition</h4>
                </div>
                <p>{{ currentCampaign.forces }}</p>
              </div>

              <!-- Geographic Setting & Strategy -->
              <div class="tactic-cell">
                <div class="cell-head">
                  <MapPin :size="18" class="cell-icon" />
                  <h4>Geographic Setting</h4>
                </div>
                <p>{{ currentCampaign.location }}</p>
              </div>

              <div class="tactic-cell">
                <div class="cell-head">
                  <Crosshair :size="18" class="cell-icon" />
                  <h4>Tactics & Technology</h4>
                </div>
                <p>{{ currentCampaign.strategy }}</p>
              </div>
            </div>

            <!-- Turning Point & Consequences -->
            <div class="impact-cards-row">
              <div class="impact-box turning-point">
                <span class="box-tag">TACTICAL TURNING POINT</span>
                <p>{{ currentCampaign.turningPoint }}</p>
              </div>

              <div class="impact-box consequences">
                <span class="box-tag">GEOPOLITICAL CONSEQUENCES</span>
                <p>{{ currentCampaign.consequences }}</p>
              </div>
            </div>

            <!-- Cross-Link Footer -->
            <div class="dossier-footer-nav">
              <RouterLink to="/janissaries" class="btn-imperial gold">
                <span>The Janissary Role in Campaigns</span>
                <ArrowRight :size="14" />
              </RouterLink>
              <RouterLink to="/sultans" class="btn-imperial">
                <span>View Campaign Commanders</span>
              </RouterLink>
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ARCHIVE BAR */
.archive-bar {
  background: #140E0C;
  border-bottom: 1px solid var(--gold-border);
  padding: 18px max(24px, 8vw);
}
.archive-bar-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}
.filter-group {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.filter-icon {
  color: var(--gold);
}
.filter-label {
  font-family: var(--font-heading);
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
}
.filter-tab {
  padding: 6px 14px;
  font-family: var(--font-heading);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--parchment);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--gold-border);
  transition: all 0.2s;
}
.filter-tab:hover {
  background: var(--gold-dim);
  border-color: var(--gold);
}
.filter-tab.active {
  background: var(--gold);
  color: var(--ink);
  border-color: var(--gold-bright);
  font-weight: 700;
}
.archive-meta-note {
  font-family: var(--font-sans);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--gold);
}

/* WORKBENCH */
.campaign-workbench {
  padding-block: 40px 80px;
}
.workbench-layout {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 40px;
  align-items: flex-start;
}

/* Left Index Panel */
.campaign-index-panel {
  background: var(--walnut-card);
  border: 1px solid var(--gold-border);
  position: sticky;
  top: 90px;
}
.index-panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid var(--gold-border);
  font-family: var(--font-heading);
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold);
}
.index-panel-header small {
  color: var(--muted);
}

.campaign-items-scroll {
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}
.campaign-entry-card {
  text-align: left;
  padding: 18px 20px;
  border-bottom: 1px solid rgba(185, 154, 91, 0.14);
  background: transparent;
  transition: all 0.2s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.campaign-entry-card:hover {
  background: rgba(185, 154, 91, 0.06);
}
.campaign-entry-card.selected {
  background: rgba(100, 30, 43, 0.35);
  border-left: 4px solid var(--gold);
}

.entry-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.entry-year {
  font-family: var(--font-heading);
  font-size: 12px;
  letter-spacing: 0.15em;
  color: var(--gold);
  font-weight: 700;
}
.entry-type {
  font-family: var(--font-sans);
  font-size: 9px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
}
.entry-name {
  font-family: var(--font-display);
  font-size: 17px;
  color: var(--gold-pale);
  line-height: 1.25;
}
.entry-meta {
  font-size: 12px;
  color: var(--muted);
}
.entry-loc {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.entry-footer {
  margin-top: 4px;
}
.entry-outcome {
  display: inline-block;
  font-family: var(--font-heading);
  font-size: 9px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--gold-bright);
}

/* Right Dossier Panel */
.campaign-dossier-panel {
  background: var(--walnut-card);
  border: 1px solid var(--gold-border);
  overflow: hidden;
}

.dossier-hero-art {
  position: relative;
  height: 380px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 30px 40px;
}
.dossier-painting {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.65) contrast(1.15);
}
.art-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 30%, rgba(23, 19, 16, 0.95) 100%);
}
.art-badge-row {
  position: relative;
  z-index: 2;
  display: flex;
  gap: 12px;
  margin-bottom: 10px;
}
.art-year-badge {
  font-family: var(--font-heading);
  font-size: 11px;
  letter-spacing: 0.18em;
  background: var(--burgundy);
  color: var(--gold-pale);
  padding: 4px 12px;
  border: 1px solid var(--gold-border);
}
.art-type-badge {
  font-family: var(--font-heading);
  font-size: 11px;
  letter-spacing: 0.18em;
  background: rgba(23, 19, 16, 0.7);
  color: var(--gold);
  padding: 4px 12px;
  border: 1px solid var(--gold-border);
}
.art-title {
  position: relative;
  z-index: 2;
  font-family: var(--font-display);
  font-size: clamp(30px, 4.2vw, 48px);
  color: var(--gold-pale);
  margin: 0;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
}

.dossier-inner-content {
  padding: clamp(24px, 4vw, 48px);
}

.dossier-lead-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--gold-border);
  padding: 24px;
  margin-bottom: 34px;
}
.narrative-text {
  font-family: var(--font-serif);
  font-size: 21px;
  line-height: 1.65;
  color: var(--parchment);
  margin: 0 0 16px;
}
.quote-row {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--gold);
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 18px;
  padding-top: 12px;
  border-top: 1px solid rgba(185, 154, 91, 0.2);
}
.q-icon {
  flex-shrink: 0;
}

.dossier-tactics-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 34px;
}
.tactic-cell {
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(185, 154, 91, 0.18);
  padding: 20px;
}
.cell-head {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
.cell-icon {
  color: var(--gold);
}
.cell-head h4 {
  font-family: var(--font-display);
  font-size: 16px;
  color: var(--gold-pale);
  margin: 0;
}
.tactic-cell p {
  font-size: 16px;
  line-height: 1.55;
  color: var(--muted);
  margin: 0;
}

.impact-cards-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 36px;
}
.impact-box {
  padding: 22px;
  border-left: 3px solid;
}
.turning-point {
  background: rgba(185, 154, 91, 0.06);
  border-left-color: var(--gold);
}
.consequences {
  background: rgba(100, 30, 43, 0.15);
  border-left-color: var(--burgundy);
}
.box-tag {
  display: block;
  font-family: var(--font-heading);
  font-size: 9px;
  letter-spacing: 0.22em;
  color: var(--gold);
  margin-bottom: 8px;
}
.impact-box p {
  font-size: 16px;
  line-height: 1.6;
  color: var(--parchment);
  margin: 0;
}

.dossier-footer-nav {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
  padding-top: 24px;
  border-top: 1px solid var(--gold-border);
}

@media (max-width: 950px) {
  .workbench-layout {
    grid-template-columns: 1fr;
  }
  .campaign-index-panel {
    position: static;
  }
  .campaign-items-scroll {
    max-height: 280px;
  }
  .dossier-tactics-grid,
  .impact-cards-row {
    grid-template-columns: 1fr;
  }
  .dossier-hero-art {
    height: 280px;
    padding: 20px;
  }
}
</style>
