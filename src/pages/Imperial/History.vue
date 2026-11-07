<script setup>
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { timeline } from '@/data/imperial';
import { ArrowRight, MapPin, ShieldAlert, Award, Compass, BookOpen } from 'lucide-vue-next';

const activeIndex = ref(0);
const activeChapter = computed(() => timeline[activeIndex.value]);

function selectChapter(idx) {
  activeIndex.value = idx;
  const el = document.getElementById('chapter-content-anchor');
  if (el && window.innerWidth < 850) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
</script>

<template>
  <div class="history-page">
    <!-- HERO SECTION -->
    <section class="page-hero">
      <div 
        class="page-hero-bg" 
        style="background-image: url('/images/history-fleet.jpg')"
      ></div>
      <div class="page-hero-overlay"></div>

      <div class="page-hero-content">
        <p class="eyebrow">The Rise, The Reign, The Legacy</p>
        <h1>Six Centuries.<br>Three Continents.<br>One Empire.</h1>
        <p class="hero-desc">
          From a small frontier beylik in northwestern Anatolia to a world-spanning imperial power, the Ottoman story is one of extraordinary expansion, political transformation, cultural achievement, and eventual dissolution.
        </p>
      </div>
    </section>

    <!-- EDITORIAL INTRO BANNER -->
    <section class="editorial-banner">
      <div class="banner-inner">
        <div class="banner-crest">
          <span>1299 — 1922</span>
        </div>
        <p class="banner-text">
          For more than six centuries, thirty-six Ottoman sultans shaped the political, religious, and cultural landscape of southeastern Europe, Western Asia, and North Africa. This interactive chronicle traces the state’s evolution across seven distinct historical epochs.
        </p>
      </div>
    </section>

    <!-- INTERACTIVE HISTORICAL CHRONOLOGY -->
    <section class="imperial-section paper history-chronology" id="chapter-content-anchor">
      <div class="chronology-layout">
        <!-- Sticky Chapter Navigation Sidebar -->
        <aside class="chapter-sidebar">
          <div class="sidebar-header">
            <BookOpen :size="16" />
            <span>Historical Epochs</span>
          </div>

          <div class="sidebar-buttons">
            <button
              v-for="(t, idx) in timeline"
              :key="t.id"
              class="chapter-nav-btn"
              :class="{ active: idx === activeIndex }"
              @click="selectChapter(idx)"
            >
              <div class="btn-top">
                <span class="btn-num">EPOCH 0{{ idx + 1 }}</span>
                <span class="btn-years">{{ t.years }}</span>
              </div>
              <strong class="btn-title">{{ t.title }}</strong>
            </button>
          </div>
        </aside>

        <!-- Main Chapter Detail Article -->
        <article class="chapter-article">
          <div class="article-header">
            <span class="epoch-label">Epoch 0{{ activeIndex + 1 }} · {{ activeChapter.years }}</span>
            <h2 class="article-title">{{ activeChapter.title }}</h2>
            <p class="article-lead">{{ activeChapter.summary }}</p>
          </div>

          <!-- Archival Image for this epoch -->
          <div class="epoch-image-frame">
            <img :src="activeChapter.image" :alt="activeChapter.title" class="epoch-artwork" />
            <div class="epoch-caption">
              <span>Archival Plate · {{ activeChapter.title }} ({{ activeChapter.years }})</span>
            </div>
          </div>

          <!-- Editorial Long-form Text -->
          <div class="article-body">
            <p>{{ activeChapter.text }}</p>
          </div>

          <!-- Two-Column Analysis: Military & Territorial -->
          <div class="epoch-insights-grid">
            <div class="insight-box military">
              <div class="insight-icon">
                <ShieldAlert :size="20" />
              </div>
              <h4>Military Developments</h4>
              <p>{{ activeChapter.military }}</p>
            </div>

            <div class="insight-box territory">
              <div class="insight-icon">
                <MapPin :size="20" />
              </div>
              <h4>Territorial & Political Reach</h4>
              <p>{{ activeChapter.territory }}</p>
            </div>
          </div>

          <!-- Historical Takeaway Callout -->
          <div class="takeaway-box">
            <Award :size="22" class="takeaway-icon" />
            <div>
              <span class="takeaway-eyebrow">Historical Takeaway</span>
              <p class="takeaway-text">{{ activeChapter.takeaway }}</p>
            </div>
          </div>

          <!-- Key Milestones Strip -->
          <div class="milestones-bar">
            <span class="milestones-title">Epoch Key Milestones:</span>
            <span class="milestones-content">{{ activeChapter.events }}</span>
          </div>

          <!-- Cross-Links into Sultans & Campaigns -->
          <div class="chapter-cross-links">
            <RouterLink to="/sultans" class="cross-link-btn">
              <span>View Sultans of this Era</span>
              <ArrowRight :size="14" />
            </RouterLink>
            <RouterLink to="/campaigns" class="cross-link-btn">
              <span>View Campaigns of this Era</span>
              <ArrowRight :size="14" />
            </RouterLink>
          </div>
        </article>
      </div>
    </section>

    <!-- HISTORICAL CLOSING NOTE: 1922 & BEYOND -->
    <section class="imperial-section night dissolution-section">
      <div class="dissolution-wrap">
        <div class="dissolution-crest">✦ 1922 · 1923 ✦</div>
        <h2 class="section-title">The End of the Sultanate & The Eternal Legacy</h2>
        <p class="dissolution-lead">
          The Ottoman Sultanate was formally abolished by the Grand National Assembly of Turkey on 1 November 1922. Mehmed VI, the thirty-sixth and final reigning sultan, departed Istanbul aboard HMS Malaya. The Republic of Turkey was officially proclaimed on 29 October 1923 with Mustafa Kemal Atatürk as its first President.
        </p>
        <p class="dissolution-body">
          Yet the dissolution of an imperial throne did not erase the centuries of architectural majesty, civic institutions, legal traditions, cuisine, and multicultural urban tapestry shared across more than thirty sovereign nations across the Balkans, the Middle East, and North Africa today.
        </p>
        <div class="dissolution-cta-row">
          <RouterLink to="/sultans" class="btn-imperial gold">
            <span>Explore The 36 Sultans</span>
            <ArrowRight :size="15" />
          </RouterLink>
          <RouterLink to="/demo" class="btn-imperial">
            <span>Enter The Imperial Registry (CRM)</span>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.editorial-banner {
  background: var(--night);
  border-bottom: 1px solid var(--gold-border);
  padding: 36px max(24px, 8vw);
}
.banner-inner {
  display: flex;
  align-items: center;
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
}
.banner-crest {
  font-family: var(--font-heading);
  font-size: 13px;
  letter-spacing: 0.24em;
  color: var(--gold);
  border: 1px solid var(--gold-border);
  padding: 10px 18px;
  white-space: nowrap;
}
.banner-text {
  font-family: var(--font-serif);
  font-size: 19px;
  line-height: 1.6;
  color: var(--parchment);
  margin: 0;
  opacity: 0.9;
}

/* CHRONOLOGY LAYOUT */
.chronology-layout {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 60px;
  align-items: flex-start;
}

/* Sidebar */
.chapter-sidebar {
  position: sticky;
  top: 100px;
  background: #EFE6D5;
  border: 1px solid rgba(138, 114, 69, 0.3);
  padding: 20px;
}
.sidebar-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-heading);
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--burgundy);
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(138, 114, 69, 0.25);
  margin-bottom: 12px;
}

.sidebar-buttons {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.chapter-nav-btn {
  text-align: left;
  padding: 14px 16px;
  background: transparent;
  border: 1px solid transparent;
  border-left: 3px solid transparent;
  transition: all 0.2s;
  cursor: pointer;
}
.chapter-nav-btn:hover {
  background: rgba(100, 30, 43, 0.05);
  border-color: rgba(138, 114, 69, 0.2);
}
.chapter-nav-btn.active {
  background: rgba(100, 30, 43, 0.1);
  border-left-color: var(--burgundy);
  border-color: rgba(100, 30, 43, 0.2);
}

.btn-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}
.btn-num {
  font-family: var(--font-sans);
  font-size: 9px;
  letter-spacing: 0.16em;
  color: var(--burgundy);
  font-weight: 700;
}
.btn-years {
  font-family: var(--font-heading);
  font-size: 10px;
  letter-spacing: 0.1em;
  color: #7A6F5D;
}
.btn-title {
  display: block;
  font-family: var(--font-display);
  font-size: 15px;
  color: var(--ink);
  line-height: 1.3;
}

/* Article */
.chapter-article {
  background: #FAF4E8;
  border: 1px solid rgba(138, 114, 69, 0.25);
  padding: clamp(30px, 5vw, 60px);
}

.epoch-label {
  display: inline-block;
  font-family: var(--font-heading);
  font-size: 11px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--burgundy);
  margin-bottom: 10px;
}
.article-title {
  font-family: var(--font-display);
  font-size: clamp(32px, 4vw, 48px);
  color: var(--burgundy);
  margin: 0 0 16px;
  line-height: 1.15;
}
.article-lead {
  font-family: var(--font-serif);
  font-size: 22px;
  line-height: 1.5;
  color: #504432;
  margin: 0 0 32px;
}

.epoch-image-frame {
  margin-bottom: 34px;
  border: 1px solid rgba(138, 114, 69, 0.35);
  overflow: hidden;
}
.epoch-artwork {
  width: 100%;
  height: 380px;
  object-fit: cover;
  display: block;
}
.epoch-caption {
  padding: 10px 18px;
  background: #EFE6D5;
  font-family: var(--font-sans);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #6C5F4D;
}

.article-body {
  font-family: var(--font-serif);
  font-size: 20px;
  line-height: 1.7;
  color: #2D251C;
  margin-bottom: 36px;
}

.epoch-insights-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 36px;
}
.insight-box {
  background: #EFE6D5;
  border: 1px solid rgba(138, 114, 69, 0.25);
  padding: 24px;
}
.insight-icon {
  color: var(--burgundy);
  margin-bottom: 12px;
}
.insight-box h4 {
  font-family: var(--font-display);
  font-size: 18px;
  color: var(--burgundy);
  margin: 0 0 8px;
}
.insight-box p {
  font-size: 16px;
  line-height: 1.55;
  color: #554835;
  margin: 0;
}

.takeaway-box {
  display: flex;
  gap: 18px;
  align-items: flex-start;
  padding: 22px;
  background: rgba(100, 30, 43, 0.08);
  border-left: 4px solid var(--burgundy);
  margin-bottom: 32px;
}
.takeaway-icon {
  color: var(--burgundy);
  flex-shrink: 0;
  margin-top: 2px;
}
.takeaway-eyebrow {
  display: block;
  font-family: var(--font-heading);
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--burgundy);
  margin-bottom: 4px;
}
.takeaway-text {
  font-family: var(--font-serif);
  font-size: 18px;
  font-style: italic;
  line-height: 1.5;
  color: var(--ink);
  margin: 0;
}

.milestones-bar {
  padding: 16px;
  border-top: 1px solid rgba(138, 114, 69, 0.25);
  border-bottom: 1px solid rgba(138, 114, 69, 0.25);
  margin-bottom: 36px;
  font-size: 14px;
}
.milestones-title {
  font-family: var(--font-heading);
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--burgundy);
  margin-right: 12px;
}
.milestones-content {
  color: #554835;
}

.chapter-cross-links {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
.cross-link-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: 1px solid var(--burgundy);
  color: var(--burgundy);
  font-family: var(--font-heading);
  font-size: 10px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  transition: all 0.25s;
}
.cross-link-btn:hover {
  background: var(--burgundy);
  color: #FAF4E8;
}

/* DISSOLUTION CLOSING NOTE */
.dissolution-section {
  text-align: center;
  border-top: 1px solid var(--gold-border);
}
.dissolution-wrap {
  max-width: 860px;
  margin: 0 auto;
}
.dissolution-crest {
  font-family: var(--font-heading);
  font-size: 11px;
  letter-spacing: 0.35em;
  color: var(--gold);
  margin-bottom: 16px;
}
.dissolution-lead {
  font-size: 22px;
  line-height: 1.6;
  color: var(--gold-pale);
  margin-bottom: 20px;
}
.dissolution-body {
  font-size: 18px;
  line-height: 1.65;
  color: var(--muted);
  margin-bottom: 38px;
}
.dissolution-cta-row {
  display: flex;
  justify-content: center;
  gap: 18px;
  flex-wrap: wrap;
}

@media (max-width: 950px) {
  .chronology-layout {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .chapter-sidebar {
    position: static;
  }
  .sidebar-buttons {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  }
  .epoch-insights-grid {
    grid-template-columns: 1fr;
  }
  .banner-inner {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
}
</style>
