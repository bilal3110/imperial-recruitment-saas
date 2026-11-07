<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { janissaryChapters, janissaryProgression } from '@/data/imperial';
import { ShieldCheck, Flame, Users, ScrollText, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-vue-next';

const activeProgressionIndex = ref(0);
const activeProgression = ref(janissaryProgression[0]);

function setProgression(idx) {
  activeProgressionIndex.value = idx;
  activeProgression.value = janissaryProgression[idx];
}
</script>

<template>
  <div class="janissaries-page">
    <!-- HERO SECTION -->
    <section class="page-hero">
      <div 
        class="page-hero-bg" 
        style="background-image: url('/images/janissary-regiment.jpg')"
      ></div>
      <div class="page-hero-overlay"></div>

      <div class="page-hero-content">
        <p class="eyebrow">Yeniçeri · The New Troops</p>
        <h1>The Sultan’s<br>Standing Army.</h1>
        <p class="hero-desc">
          Emerging in the fourteenth century, the Janissaries developed into an elite standing infantry corps closely bound to the authority and military power of the Ottoman Sultan. Their history was one of military discipline, institutional privilege, recruitment, and political revolution.
        </p>
      </div>
    </section>

    <!-- INTRODUCTORY DISCIPLINE BANNER -->
    <section class="discipline-banner">
      <div class="banner-content">
        <div class="bektashi-seal">
          <span>☾ YENİÇERİ OCAĞI ☽</span>
        </div>
        <p class="banner-quote">
          "Neither merchants nor farmers, but soldiers of the Sultan alone. The sleeve of the saint rests upon their brow, and the scimitar in their right hand."
        </p>
      </div>
    </section>

    <!-- INTERACTIVE RECRUITMENT PROGRESSION COMPONENT -->
    <section class="imperial-section paper progression-section">
      <div class="progression-intro">
        <p class="section-label">Educational Reconstruction</p>
        <h2 class="section-title">The Institutional Journey of an Imperial Recruit</h2>
        <p class="progression-desc">
          A step-by-step reconstruction illustrating the stages through which recruits historically advanced from initial provincial levying to regimental Orta service and veteran retirement.
        </p>
      </div>

      <!-- Step Stepper Track -->
      <div class="stepper-track">
        <button
          v-for="(st, idx) in janissaryProgression"
          :key="st.stage"
          class="stepper-step"
          :class="{ active: idx === activeProgressionIndex, done: idx < activeProgressionIndex }"
          @click="setProgression(idx)"
        >
          <div class="step-badge">
            <CheckCircle2 v-if="idx < activeProgressionIndex" :size="14" />
            <span v-else>{{ st.stage }}</span>
          </div>
          <span class="step-role">{{ st.role }}</span>
          <strong class="step-title">{{ st.title }}</strong>
        </button>
      </div>

      <!-- Active Stage Detailed Card -->
      <div class="active-stage-card">
        <div class="stage-card-header">
          <span class="stage-tag">STAGE {{ activeProgression.stage }} · {{ activeProgression.step }}</span>
          <h3 class="stage-title">{{ activeProgression.title }}</h3>
          <span class="stage-location">Operating Location: {{ activeProgression.location }}</span>
        </div>
        <p class="stage-body">{{ activeProgression.desc }}</p>

        <div class="stage-meta-strip">
          <div class="meta-item">
            <span class="meta-label">Institutional Status</span>
            <span class="meta-val">{{ activeProgression.role }}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">Primary Training</span>
            <span class="meta-val">Language · Archery · Kilij · Matchlock Drill</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 7 COMPREHENSIVE INSTITUTIONAL CHAPTERS -->
    <section class="imperial-section walnut chapters-section">
      <div class="chapters-header">
        <p class="section-label">The Seven Institutional Pillars</p>
        <h2 class="section-title">Not a Myth; A Transforming Imperial Body</h2>
        <p class="chapters-sub">
          Explore the historical evolution of the corps, from its gazwa origins to its abolition in 1826.
        </p>
      </div>

      <div class="chapters-stack">
        <article
          v-for="ch in janissaryChapters"
          :key="ch.id"
          class="chapter-entry"
          :class="{ 'caution-entry': ch.id === 'devshirme' }"
        >
          <div class="chapter-number-col">
            <span class="big-num">{{ ch.number }}</span>
            <span class="num-dash"></span>
          </div>

          <div class="chapter-main-col">
            <div class="ch-heading-row">
              <h3 class="ch-title">{{ ch.title }}</h3>
              <span v-if="ch.id === 'devshirme'" class="ethical-flag">
                <AlertTriangle :size="14" />
                <span>Historical Context Required</span>
              </span>
            </div>

            <p class="ch-summary">{{ ch.summary }}</p>
            <p class="ch-text">{{ ch.text }}</p>

            <div class="ch-highlight-card">
              <ScrollText :size="18" class="hl-icon" />
              <p>{{ ch.highlight }}</p>
            </div>

            <blockquote v-if="ch.quote" class="ch-quote">
              <span class="q-symbol">“</span>
              <p>{{ ch.quote }}</p>
            </blockquote>
          </div>
        </article>
      </div>
    </section>

    <!-- TRANSITION TO CRM / PLATFORM CTA -->
    <section class="imperial-section night crm-bridge-section">
      <div class="crm-bridge-wrap">
        <div class="bridge-crest">
          <Flame :size="28" />
        </div>
        <p class="section-label">From Quills & Cauldrons to Digital Architecture</p>
        <h2 class="section-title">Order the Janissary Roll Today.</h2>
        <p class="bridge-desc">
          Managing 14,000 disciplined infantrymen across thirty-two provinces requires more than soup cauldrons and scrolls. Explore Janissaries CRM—the fictional administrative platform designed for the Ottoman Court.
        </p>
        <div class="bridge-cta-row">
          <RouterLink to="/demo" class="btn-imperial gold">
            <span>Launch Recruitment Registry</span>
            <ArrowRight :size="15" />
          </RouterLink>
          <RouterLink to="/features" class="btn-imperial">
            <span>Explore Imperial Administration</span>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.discipline-banner {
  background: var(--night);
  border-bottom: 1px solid var(--gold-border);
  padding: 32px max(24px, 8vw);
  text-align: center;
}
.bektashi-seal {
  font-family: var(--font-heading);
  font-size: 11px;
  letter-spacing: 0.3em;
  color: var(--gold);
  margin-bottom: 10px;
}
.banner-quote {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 20px;
  color: var(--parchment);
  max-width: 800px;
  margin: 0 auto;
  opacity: 0.92;
}

/* PROGRESSION COMPONENT */
.progression-intro {
  max-width: 760px;
  margin-bottom: 40px;
}
.progression-desc {
  font-size: 20px;
  line-height: 1.55;
  color: #4D4030;
}

.stepper-track {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
  margin-bottom: 34px;
}
.stepper-step {
  background: #EFE6D5;
  border: 1px solid rgba(138, 114, 69, 0.3);
  padding: 16px 14px;
  text-align: left;
  transition: all 0.25s;
  cursor: pointer;
}
.stepper-step:hover {
  background: rgba(100, 30, 43, 0.06);
  border-color: var(--burgundy);
}
.stepper-step.active {
  background: var(--burgundy);
  border-color: var(--gold);
  color: var(--gold-pale);
}
.step-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid currentColor;
  font-family: var(--font-sans);
  font-size: 10px;
  font-weight: 700;
  margin-bottom: 8px;
}
.stepper-step.active .step-badge {
  background: var(--gold);
  color: var(--ink);
  border-color: var(--gold-bright);
}
.step-role {
  display: block;
  font-family: var(--font-sans);
  font-size: 8px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #7A6F5D;
  margin-bottom: 4px;
}
.stepper-step.active .step-role {
  color: var(--gold);
}
.step-title {
  display: block;
  font-family: var(--font-display);
  font-size: 14px;
  line-height: 1.25;
  color: var(--ink);
}
.stepper-step.active .step-title {
  color: var(--gold-pale);
}

.active-stage-card {
  background: #FAF4E8;
  border: 1px solid rgba(138, 114, 69, 0.35);
  padding: 36px;
  border-left: 5px solid var(--burgundy);
}
.stage-tag {
  font-family: var(--font-heading);
  font-size: 10px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--burgundy);
}
.stage-title {
  font-family: var(--font-display);
  font-size: 28px;
  color: var(--burgundy);
  margin: 6px 0 4px;
}
.stage-location {
  display: block;
  font-family: var(--font-sans);
  font-size: 11px;
  color: #726450;
  margin-bottom: 18px;
}
.stage-body {
  font-family: var(--font-serif);
  font-size: 20px;
  line-height: 1.65;
  color: #382C1E;
  margin: 0 0 24px;
}
.stage-meta-strip {
  display: flex;
  gap: 32px;
  padding-top: 18px;
  border-top: 1px solid rgba(138, 114, 69, 0.2);
  flex-wrap: wrap;
}
.meta-label {
  display: block;
  font-family: var(--font-heading);
  font-size: 9px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--burgundy);
  margin-bottom: 3px;
}
.meta-val {
  font-family: var(--font-display);
  font-size: 14px;
  color: var(--ink);
}

/* CHAPTERS STACK */
.chapters-header {
  max-width: 800px;
  margin-bottom: 50px;
}
.chapters-sub {
  font-size: 20px;
  color: var(--parchment);
  line-height: 1.55;
  opacity: 0.9;
}

.chapters-stack {
  display: flex;
  flex-direction: column;
  gap: 40px;
}
.chapter-entry {
  display: grid;
  grid-template-columns: 90px 1fr;
  gap: 36px;
  background: var(--walnut-card);
  border: 1px solid var(--gold-border);
  padding: 36px;
  transition: border-color 0.25s;
}
.chapter-entry:hover {
  border-color: var(--gold);
}
.chapter-entry.caution-entry {
  border-left: 4px solid #B99A5B;
  background: linear-gradient(90deg, rgba(185, 154, 91, 0.08) 0%, var(--walnut-card) 25%);
}

.chapter-number-col {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.big-num {
  font-family: var(--font-display);
  font-size: 42px;
  font-weight: 700;
  color: var(--gold);
  line-height: 1;
}
.num-dash {
  width: 2px;
  flex: 1;
  background: var(--gold-border);
  margin-top: 12px;
}

.ch-heading-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}
.ch-title {
  font-family: var(--font-display);
  font-size: clamp(24px, 3.2vw, 34px);
  color: var(--gold-pale);
  margin: 0;
}
.ethical-flag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-heading);
  font-size: 9px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #E5C378;
  background: rgba(185, 154, 91, 0.15);
  border: 1px solid var(--gold);
  padding: 4px 10px;
}

.ch-summary {
  font-family: var(--font-heading);
  font-size: 13px;
  letter-spacing: 0.06em;
  color: var(--gold);
  margin: 0 0 16px;
}
.ch-text {
  font-family: var(--font-serif);
  font-size: 19px;
  line-height: 1.65;
  color: var(--parchment);
  margin: 0 0 24px;
  opacity: 0.92;
}

.ch-highlight-card {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(185, 154, 91, 0.2);
  margin-bottom: 20px;
}
.hl-icon {
  color: var(--gold);
  flex-shrink: 0;
  margin-top: 2px;
}
.ch-highlight-card p {
  font-size: 15px;
  color: var(--gold-pale);
  margin: 0;
  line-height: 1.5;
}

.ch-quote {
  position: relative;
  margin: 0;
  padding: 18px 20px 18px 45px;
  background: rgba(100, 30, 43, 0.12);
  border-left: 2px solid var(--burgundy);
}
.q-symbol {
  position: absolute;
  top: 6px;
  left: 14px;
  font-family: var(--font-display);
  font-size: 38px;
  color: var(--gold);
  opacity: 0.6;
}
.ch-quote p {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 17px;
  color: var(--parchment);
  margin: 0;
}

/* CRM BRIDGE */
.crm-bridge-section {
  text-align: center;
  border-top: 1px solid var(--gold-border);
}
.crm-bridge-wrap {
  max-width: 820px;
  margin: 0 auto;
}
.bridge-crest {
  color: var(--gold);
  margin-bottom: 16px;
}
.bridge-desc {
  font-size: 21px;
  color: var(--parchment);
  line-height: 1.6;
  margin-bottom: 34px;
  opacity: 0.9;
}
.bridge-cta-row {
  display: flex;
  justify-content: center;
  gap: 18px;
  flex-wrap: wrap;
}

@media (max-width: 950px) {
  .stepper-track {
    grid-template-columns: repeat(2, 1fr);
  }
  .chapter-entry {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  .chapter-number-col {
    flex-direction: row;
    gap: 14px;
    align-items: center;
  }
  .num-dash {
    width: 60px;
    height: 1px;
    margin: 0;
  }
}
@media (max-width: 550px) {
  .stepper-track {
    grid-template-columns: 1fr;
  }
}
</style>
