<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { sultans } from '@/data/imperial';
import { Award, ShieldAlert, Swords, Scroll, ArrowRight, Quote } from 'lucide-vue-next';

const route = useRoute();
const activeSultanId = ref('mehmed-ii');

function setSultan(id) {
  activeSultanId.value = id;
}

onMounted(() => {
  const hash = window.location.hash.replace('#', '');
  if (hash && sultans.some(s => s.id === hash)) {
    activeSultanId.value = hash;
    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
});
</script>

<template>
  <div class="sultans-page">
    <!-- HERO SECTION -->
    <section class="page-hero">
      <div 
        class="page-hero-bg" 
        style="background-image: url('/images/palace-court.jpg')"
      ></div>
      <div class="page-hero-overlay"></div>

      <div class="page-hero-content">
        <p class="eyebrow">The Dynasty of Osman · 1299–1922</p>
        <h1>The Men Behind<br>the Throne.</h1>
        <p class="hero-desc">
          Thirty-six sultans governed across more than six centuries. Some conquered world empires, others established monumental legal codes, and some guided the state through existential geopolitical turmoil.
        </p>
      </div>
    </section>

    <!-- SULTAN QUICK SELECTOR BAR -->
    <nav class="sultans-quick-nav" aria-label="Sovereign Profiles Directory">
      <div class="quick-nav-track">
        <button
          v-for="s in sultans"
          :key="s.id"
          class="sovereign-tab-btn"
          :class="{ active: activeSultanId === s.id }"
          @click="setSultan(s.id)"
        >
          <div class="tab-portrait">
            <img :src="s.image" :alt="s.name" />
          </div>
          <div class="tab-info">
            <span class="tab-name">{{ s.name }}</span>
            <span class="tab-dates">{{ s.dates }}</span>
          </div>
        </button>
      </div>
    </nav>

    <!-- EDITORIAL MONARCH PROFILES GALLERY -->
    <section class="imperial-section paper sultans-gallery">
      <article
        v-for="(s, index) in sultans"
        :key="s.id"
        :id="s.id"
        class="sultan-dossier"
        :class="[s.tone, { 'layout-alternate': index % 2 === 1, highlighted: activeSultanId === s.id }]"
      >
        <!-- Portrait & Regalia Column -->
        <div class="dossier-portrait-col">
          <div class="ornate-frame">
            <img :src="s.image" :alt="`Official historical portrait of ${s.name}`" class="portrait-img" />
            <div class="frame-corner top-left"></div>
            <div class="frame-corner top-right"></div>
            <div class="frame-corner bottom-left"></div>
            <div class="frame-corner bottom-right"></div>
            <span class="arabic-seal">{{ s.arabicName }}</span>
          </div>

          <div class="portrait-details-box">
            <span class="regnal-index">SOVEREIGN 0{{ index + 1 }}</span>
            <h3 class="sovereign-moniker">{{ s.moniker }}</h3>
            <span class="regnal-reign">Reign: {{ s.dates }}</span>
          </div>

          <blockquote v-if="s.quote" class="sultan-quote-card">
            <Quote :size="18" class="quote-icon" />
            <p>{{ s.quote }}</p>
          </blockquote>
        </div>

        <!-- Extensive Dossier & History Column -->
        <div class="dossier-content-col">
          <div class="dossier-header">
            <span class="dossier-badge">{{ s.role }}</span>
            <h2 class="dossier-name">{{ s.name }}</h2>
            <p class="dossier-bio">{{ s.bio }}</p>
          </div>

          <!-- Major Achievements -->
          <div class="dossier-section">
            <div class="section-title-wrap">
              <Award :size="18" class="icon-burgundy" />
              <h4>Major Imperial Achievements</h4>
            </div>
            <ul class="achievements-list">
              <li v-for="(ach, i) in s.achievements" :key="i">
                <span class="bullet">✦</span>
                <span>{{ ach }}</span>
              </li>
            </ul>
          </div>

          <!-- Military Campaigns & Conquests -->
          <div class="dossier-section">
            <div class="section-title-wrap">
              <Swords :size="18" class="icon-burgundy" />
              <h4>Key Military Expeditions</h4>
            </div>
            <div class="campaign-tags">
              <span v-for="(camp, j) in s.campaigns" :key="j" class="camp-pill">
                {{ camp }}
              </span>
            </div>
          </div>

          <!-- Controversies & Administrative Challenges -->
          <div class="dossier-section">
            <div class="section-title-wrap">
              <ShieldAlert :size="18" class="icon-burgundy" />
              <h4>Political Controversies & Challenges</h4>
            </div>
            <p class="challenges-text">{{ s.challenges }}</p>
          </div>

          <!-- Historical Legacy Box -->
          <div class="legacy-card">
            <Scroll :size="20" class="legacy-icon" />
            <div>
              <span class="legacy-title">Historical Legacy & Institutional Imprint</span>
              <p class="legacy-content">{{ s.legacy }}</p>
            </div>
          </div>
        </div>
      </article>
    </section>

    <!-- CLOSING NAVIGATION CTA -->
    <section class="imperial-section night sultans-cta">
      <div class="cta-inner">
        <p class="section-label">From Sovereigns to Battlefield Action</p>
        <h2 class="section-title">Explore the Campaigns That Forged the Empire</h2>
        <p class="cta-desc">
          Discover the battlefields of Kosovo, the siege walls of Constantinople, the plains of Mohács, and the gates of Vienna.
        </p>
        <div class="cta-actions">
          <RouterLink to="/campaigns" class="btn-imperial gold">
            <span>Explore Wars & Conquests</span>
            <ArrowRight :size="15" />
          </RouterLink>
          <RouterLink to="/demo" class="btn-imperial">
            <span>Imperial Administration (CRM)</span>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* QUICK NAV BAR */
.sultans-quick-nav {
  position: sticky;
  top: 68px;
  z-index: 900;
  background: #18120F;
  border-bottom: 1px solid var(--gold-border);
  padding: 12px max(24px, 8vw);
  backdrop-filter: blur(10px);
}
.quick-nav-track {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 4px;
}
.quick-nav-track::-webkit-scrollbar {
  height: 4px;
}

.sovereign-tab-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(185, 154, 91, 0.2);
  white-space: nowrap;
  transition: all 0.25s;
}
.sovereign-tab-btn:hover {
  background: rgba(185, 154, 91, 0.1);
  border-color: var(--gold);
}
.sovereign-tab-btn.active {
  background: var(--gold-dim);
  border-color: var(--gold-bright);
}
.tab-portrait {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid var(--gold);
}
.tab-portrait img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.tab-name {
  display: block;
  font-family: var(--font-heading);
  font-size: 11px;
  letter-spacing: 0.12em;
  color: var(--gold-pale);
  text-align: left;
}
.tab-dates {
  display: block;
  font-family: var(--font-sans);
  font-size: 9px;
  color: var(--muted);
  text-align: left;
}

/* SULTANS GALLERY */
.sultans-gallery {
  padding-block: 60px;
}

.sultan-dossier {
  display: grid;
  grid-template-columns: 380px 1fr;
  gap: clamp(40px, 6vw, 80px);
  padding: 70px 0;
  border-bottom: 1px solid rgba(138, 114, 69, 0.3);
  align-items: flex-start;
  transition: background 0.3s;
}
.sultan-dossier:last-child {
  border-bottom: none;
}
.sultan-dossier.highlighted {
  position: relative;
}

.sultan-dossier.layout-alternate {
  grid-template-columns: 1fr 380px;
}
.sultan-dossier.layout-alternate .dossier-portrait-col {
  order: 2;
}
.sultan-dossier.layout-alternate .dossier-content-col {
  order: 1;
}

/* Portrait Column */
.dossier-portrait-col {
  display: flex;
  flex-direction: column;
}

.ornate-frame {
  position: relative;
  background: #17110C;
  border: 8px solid #2C211A;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.25), inset 0 0 20px rgba(0, 0, 0, 0.8);
  aspect-ratio: 4 / 5;
  overflow: hidden;
}
.portrait-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: contrast(1.1) brightness(0.95);
  transition: transform 0.6s var(--ease-imperial);
}
.ornate-frame:hover .portrait-img {
  transform: scale(1.04);
}

.frame-corner {
  position: absolute;
  width: 16px;
  height: 16px;
  border: 2px solid var(--gold);
}
.top-left { top: 8px; left: 8px; border-right: none; border-bottom: none; }
.top-right { top: 8px; right: 8px; border-left: none; border-bottom: none; }
.bottom-left { bottom: 8px; left: 8px; border-right: none; border-top: none; }
.bottom-right { bottom: 8px; right: 8px; border-left: none; border-top: none; }

.arabic-seal {
  position: absolute;
  bottom: 14px;
  right: 14px;
  font-family: var(--font-serif);
  font-size: 20px;
  color: var(--gold-pale);
  background: rgba(23, 17, 12, 0.85);
  border: 1px solid var(--gold-border);
  padding: 4px 12px;
}

.portrait-details-box {
  margin-top: 18px;
  padding: 16px;
  background: #EFE6D5;
  border: 1px solid rgba(138, 114, 69, 0.25);
}
.regnal-index {
  display: block;
  font-family: var(--font-sans);
  font-size: 9px;
  letter-spacing: 0.2em;
  color: var(--burgundy);
  font-weight: 700;
  margin-bottom: 4px;
}
.sovereign-moniker {
  font-family: var(--font-display);
  font-size: 16px;
  color: var(--ink);
  margin: 0 0 6px;
}
.regnal-reign {
  font-family: var(--font-heading);
  font-size: 11px;
  color: #6C5F4D;
}

.sultan-quote-card {
  margin: 18px 0 0;
  padding: 18px;
  background: rgba(100, 30, 43, 0.08);
  border-left: 3px solid var(--burgundy);
  display: flex;
  gap: 12px;
}
.quote-icon {
  color: var(--burgundy);
  flex-shrink: 0;
  margin-top: 2px;
}
.sultan-quote-card p {
  margin: 0;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 16px;
  line-height: 1.5;
  color: #382A1B;
}

/* Content Column */
.dossier-content-col {
  display: flex;
  flex-direction: column;
}
.dossier-badge {
  display: inline-block;
  font-family: var(--font-heading);
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--burgundy);
  margin-bottom: 8px;
}
.dossier-name {
  font-family: var(--font-display);
  font-size: clamp(34px, 4.5vw, 52px);
  color: var(--burgundy);
  margin: 0 0 18px;
  line-height: 1.12;
}
.dossier-bio {
  font-family: var(--font-serif);
  font-size: 21px;
  line-height: 1.6;
  color: #382C1E;
  margin: 0 0 32px;
}

.dossier-section {
  margin-bottom: 26px;
}
.section-title-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}
.icon-burgundy {
  color: var(--burgundy);
}
.section-title-wrap h4 {
  font-family: var(--font-display);
  font-size: 18px;
  color: var(--burgundy);
  margin: 0;
}

.achievements-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.achievements-list li {
  display: flex;
  align-items: baseline;
  gap: 10px;
  font-size: 17px;
  line-height: 1.5;
  color: #4D3F2E;
}
.bullet {
  font-size: 9px;
  color: var(--burgundy);
}

.campaign-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.camp-pill {
  font-family: var(--font-heading);
  font-size: 11px;
  letter-spacing: 0.1em;
  background: #EFE6D5;
  border: 1px solid rgba(138, 114, 69, 0.3);
  padding: 6px 14px;
  color: #4A3A26;
}

.challenges-text {
  font-size: 17px;
  line-height: 1.6;
  color: #554531;
  margin: 0;
}

.legacy-card {
  display: flex;
  gap: 18px;
  padding: 24px;
  background: #E8DCC4;
  border: 1px solid rgba(138, 114, 69, 0.35);
  margin-top: 14px;
}
.legacy-icon {
  color: var(--burgundy);
  flex-shrink: 0;
  margin-top: 2px;
}
.legacy-title {
  display: block;
  font-family: var(--font-heading);
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--burgundy);
  margin-bottom: 6px;
}
.legacy-content {
  font-family: var(--font-serif);
  font-size: 18px;
  line-height: 1.55;
  color: var(--ink);
  margin: 0;
}

/* CLOSING CTA */
.sultans-cta {
  text-align: center;
  border-top: 1px solid var(--gold-border);
}
.cta-inner {
  max-width: 780px;
  margin: 0 auto;
}
.cta-desc {
  font-size: 20px;
  color: var(--parchment);
  line-height: 1.6;
  margin-bottom: 34px;
  opacity: 0.9;
}
.cta-actions {
  display: flex;
  justify-content: center;
  gap: 18px;
  flex-wrap: wrap;
}

@media (max-width: 900px) {
  .sultan-dossier,
  .sultan-dossier.layout-alternate {
    grid-template-columns: 1fr;
    gap: 36px;
  }
  .sultan-dossier.layout-alternate .dossier-portrait-col {
    order: 0;
  }
  .dossier-portrait-col {
    max-width: 360px;
  }
}
</style>
