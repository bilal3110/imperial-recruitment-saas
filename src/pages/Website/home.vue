<script setup>
import WebsiteLayout from '@/layouts/WebsiteLayout.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
import {
  Shield,
  Sparkles,
  ArrowDown,
  Zap,
  TrendingUp,
  Target,
  MapPin,
  DollarSign,
  Globe2,
  Infinity,
  Menu,
  X,
} from 'lucide-vue-next';

defineOptions({
  layout: WebsiteLayout,
})

const menuOpen = ref(false);

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

function closeMenu() {
  menuOpen.value = false;
}

function logout() {
  console.log("Logging out...");
  router.push("/login");
}
</script>

<template>
  <section class="hero">
    <div class="hero-pattern"></div>

    <div class="crescent-wrap">
      <svg width="300" height="300" viewBox="0 0 300 300" fill="none">
        <circle cx="150" cy="150" r="130" fill="#C9972A" />
        <circle cx="195" cy="120" r="115" fill="#1A1208" />
        <polygon
          points="150,30 158,55 185,55 163,70 171,95 150,80 129,95 137,70 115,55 142,55"
          fill="#C9972A"
          opacity="0.5"
        />
      </svg>
    </div>

    <!-- Overlay for mobile menu -->
    <div
      class="mobile-overlay"
      :class="{ active: menuOpen }"
      @click="closeMenu"
    ></div>

    <nav class="nav">
      <div class="nav-logo"><Shield class="icon-inline" /> Janissaries</div>

      <!-- Desktop links -->
      <ul class="nav-links">
        <li><a href="#" @click="closeMenu">Features</a></li>
        <li><a href="#" @click="closeMenu">Provinces</a></li>
        <li><a href="#" @click="closeMenu">Recruits</a></li>
        <li><a href="#" @click="closeMenu">Pricing</a></li>
        <li><a href="#" @click="closeMenu">Demo</a></li>
      </ul>

      <button class="nav-cta desktop-only" @click="logout">Sublime Porte</button>

      <!-- Burger button -->
      <button class="burger-btn" @click="toggleMenu" :aria-expanded="menuOpen" aria-label="Toggle navigation">
        <X v-if="menuOpen" class="burger-icon" />
        <Menu v-else class="burger-icon" />
      </button>
    </nav>

    <!-- Mobile drawer -->
    <div class="mobile-drawer" :class="{ open: menuOpen }">
      <ul class="mobile-nav-links">
        <li><a href="#" @click="closeMenu">Features</a></li>
        <li><a href="#" @click="closeMenu">Provinces</a></li>
        <li><a href="#" @click="closeMenu">Recruits</a></li>
        <li><a href="#" @click="closeMenu">Pricing</a></li>
        <li><a href="#" @click="closeMenu">Demo</a></li>
      </ul>
      <button class="nav-cta mobile-cta" @click="logout">Sublime Porte</button>
      <div class="mobile-drawer-mark">دولت عليه عثمانيه</div>
    </div>

    <p class="hero-eyebrow">CRM · Imperial Suite · Est. 1299</p>

    <div class="ornament">
      <div class="ornament-line"></div>
      <Sparkles class="ornament-symbol" />
      <div class="ornament-line right"></div>
    </div>

    <h1 class="hero-title">
      Recruit Elite Soldiers
      <span>at Imperial Scale.</span>
    </h1>

    <div class="ornament">
      <div class="ornament-line"></div>
      <Shield class="ornament-symbol" />
      <div class="ornament-line right"></div>
    </div>

    <p class="hero-subtitle">
      A modern recruitment system designed for medieval empire efficiency.
    </p>

    <div class="hero-btns">
      <button class="btn-primary">Start Recruiting</button>
      <button class="btn-secondary">View Demo Army</button>
    </div>

    <div class="scroll-hint"><ArrowDown class="scroll-icon" /></div>
  </section>

  <!-- ── MARQUEE ── -->
  <div class="marquee-band">
    <div class="marquee-track" id="marquee">
      <span class="marquee-item">Recruitment Automation <Sparkles class="marquee-sep-icon" /></span>
      <span class="marquee-item">Loyalty Analytics <Sparkles class="marquee-sep-icon" /></span>
      <span class="marquee-item">Province Intelligence <Sparkles class="marquee-sep-icon" /></span>
      <span class="marquee-item">Training Management <Sparkles class="marquee-sep-icon" /></span>
      <span class="marquee-item">Imperial Payroll <Sparkles class="marquee-sep-icon" /></span>
      <span class="marquee-item">Rebellion Detection <Sparkles class="marquee-sep-icon" /></span>
      <span class="marquee-item">Janissary CRM <Sparkles class="marquee-sep-icon" /></span>
      <span class="marquee-item">Approved by the Council <Sparkles class="marquee-sep-icon" /></span>
      <span class="marquee-item">Recruitment Automation <Sparkles class="marquee-sep-icon" /></span>
      <span class="marquee-item">Loyalty Analytics <Sparkles class="marquee-sep-icon" /></span>
      <span class="marquee-item">Province Intelligence <Sparkles class="marquee-sep-icon" /></span>
      <span class="marquee-item">Training Management <Sparkles class="marquee-sep-icon" /></span>
      <span class="marquee-item">Imperial Payroll <Sparkles class="marquee-sep-icon" /></span>
      <span class="marquee-item">Rebellion Detection <Sparkles class="marquee-sep-icon" /></span>
      <span class="marquee-item">Janissary CRM <Sparkles class="marquee-sep-icon" /></span>
      <span class="marquee-item">Approved by the Council <Sparkles class="marquee-sep-icon" /></span>
    </div>
  </div>

  <!-- ── SOCIAL PROOF ── -->
  <section class="section" style="background: #0a0804">
    <div class="section-inner">
      <p class="section-label">Imperial Endorsements</p>
      <h2 class="section-title">Trusted by the Realm</h2>
      <p class="section-body">
        Because reality is optional in satire — but these numbers are very, very
        real. Allegedly.
      </p>

      <div class="proof-grid">
        <div class="proof-card">
          <div class="proof-num">3</div>
          <div class="proof-title">Great Empires</div>
          <div class="proof-sub">Currently active deployments</div>
        </div>
        <div class="proof-card">
          <div class="proof-num">12,000+</div>
          <div class="proof-title">Recruits Processed</div>
          <div class="proof-sub">And counting since 1299</div>
        </div>
        <div class="proof-card">
          <div class="proof-num"><Infinity class="proof-icon" /></div>
          <div class="proof-title">Council Approved</div>
          <div class="proof-sub">Allegedly. We have paperwork.</div>
        </div>
      </div>

      <div class="testimonials-grid">
        <div class="testimonial">
          <p class="testimonial-text">
            "Reduced rebellion risk by 37%. The loyalty scoring feature alone
            saved three provinces from certain chaos."
          </p>
          <div class="testimonial-attr">
            — Some Random Vizier, Grand Vizier of the Eastern Territories
          </div>
        </div>
        <div class="testimonial">
          <p class="testimonial-text">
            "Finally digitized our empire workflow. The devshirme intake form
            alone was 40 scrolls — now it is one screen."
          </p>
          <div class="testimonial-attr">
            — Unnamed Sultan, Ruler of Everything Worth Ruling
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="divider"></div>

  <!-- ── FEATURES ── -->
  <section class="features-section">
    <div class="section-inner">
      <p class="section-label">The Arsenal</p>
      <h2 class="section-title">Imperial Grade Features</h2>
      <p class="section-body">
        Every tool your empire needs to recruit, train, and retain the most
        loyal — and eliminate the least.
      </p>
    </div>
    <div style="max-width: 1000px; margin: 0 auto">
      <div class="features-grid">
        <div class="feature-card">
          <Zap class="feature-icon" />
          <div class="feature-title">Recruitment Automation</div>
          <p class="feature-desc">
            Filter candidates by loyalty, skill, and questionable behavior
            patterns. The algorithm never sleeps.
          </p>
        </div>
        <div class="feature-card">
          <TrendingUp class="feature-icon" />
          <div class="feature-title">Loyalty Analytics</div>
          <p class="feature-desc">
            Detect potential betrayal before it becomes historically
            inconvenient. Powered by centuries of pattern recognition.
          </p>
        </div>
        <div class="feature-card">
          <Target class="feature-icon" />
          <div class="feature-title">Training Management</div>
          <p class="feature-desc">
            Assign recruits to sword, bow, or existential suffering. Track
            progress across all three disciplines.
          </p>
        </div>
        <div class="feature-card">
          <MapPin class="feature-icon" />
          <div class="feature-title">Province Intelligence</div>
          <p class="feature-desc">
            Track talent supply across Anatolia, the Balkans, and chaos zones.
            Know where the best soldiers are before they do.
          </p>
        </div>
        <div class="feature-card">
          <DollarSign class="feature-icon" />
          <div class="feature-title">Imperial Payroll</div>
          <p class="feature-desc">
            Pay soldiers in akçe. Denomination conversions handled
            automatically. Inflation not included.
          </p>
        </div>
        <div class="feature-card">
          <Globe2 class="feature-icon" />
          <div class="feature-title">Expansion Forecasting</div>
          <p class="feature-desc">
            Know which provinces to expand into next based on troop
            availability, loyalty scores, and conquest ROI.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- ── HOW IT WORKS ── -->
  <section class="how-section">
    <div class="section-inner">
      <p class="section-label">Onboarding · For War</p>
      <h2 class="section-title">How It Works</h2>
      <p class="section-body">
        Modern SaaS onboarding. Medieval empire outcomes. Three steps between
        you and your next conquest.
      </p>
    </div>

    <div class="steps-row">
      <div class="step">
        <div class="step-num-wrap"><span class="step-num">I</span></div>
        <div class="step-title">Select Province</div>
        <p class="step-desc">
          Choose your recruiting territory from our imperial province database.
          Each region has unique talent pools and loyalty baselines.
        </p>
        <span class="step-badge">Step One</span>
      </div>
      <div class="step">
        <div class="step-num-wrap"><span class="step-num">II</span></div>
        <div class="step-title">Evaluate Recruits</div>
        <p class="step-desc">
          Run candidates through our loyalty scoring, skills assessment, and
          behavioral flagging system. Sort by sword, bow, or rebellion risk.
        </p>
        <span class="step-badge">Step Two</span>
      </div>
      <div class="step">
        <div class="step-num-wrap"><span class="step-num">III</span></div>
        <div class="step-title">Approve for Service</div>
        <p class="step-desc">
          Onboard approved recruits into the Imperial Corps. Assign training
          camps, salary tiers, and post them to the frontier.
        </p>
        <span class="step-badge">Step Three</span>
      </div>
    </div>
  </section>

  <!-- ── QUOTE ── -->
  <section class="quote-section">
    <p class="quote-text">
      "An empire is not built on conquest alone — it is built on the men who
      remember why they fight."
    </p>
    <p class="quote-attr">
      — Janissaries CRM · Imperial Philosophy Document, Page 1
    </p>
  </section>

  <!-- ── CTA ── -->
  <section class="cta-section">
    <div class="ornament" style="justify-content: center">
      <div class="ornament-line"></div>
      <Shield class="ornament-symbol" />
      <div class="ornament-line right"></div>
    </div>
    <h2 class="cta-title">
      The Empire Does Not Wait. Neither Should Your Recruitment System.
    </h2>
    <p class="cta-subtitle">
      Every day without automation is a day your rivals are growing their armies
      faster than yours.
    </p>
    <div class="cta-btn-wrap">
      <button class="btn-cta-main"><Sparkles class="btn-icon" /> Begin Expansion</button>
    </div>
    <p class="cta-footnote">
      No long-term contract. Cancel anytime. Except from the Empire.
    </p>
  </section>

  <!-- ── FOOTER ── -->
  <footer>
    <div class="footer-logo"><Shield class="icon-inline" /> Janissaries CRM</div>
    <div class="footer-text">© 1299 — Present · All Provinces Reserved</div>
    <div class="calligraphy-mark">دولت عليه عثمانيه</div>
  </footer>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;600;700&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --gold: #c9972a;
  --gold-light: #e8b84b;
  --gold-pale: #f5e6c0;
  --crimson: #8b1a1a;
  --crimson-deep: #5c0f0f;
  --ink: #1a1208;
  --parchment: #f7f0dc;
  --parchment-dark: #e8d9a8;
  --teal-ott: #1a6b6b;
  --teal-light: #2a9d8f;
}

body {
  font-family: "EB Garamond", Georgia, serif;
  background-color: var(--ink);
  color: var(--parchment);
  overflow-x: hidden;
  cursor: default;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 1000;
  opacity: 0.4;
}

/* ── HERO ── */
.hero {
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: radial-gradient(ellipse at 50% 0%, #3d1f0a 0%, #1a1208 55%, #0a0804 100%);
}

.hero-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.07;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cg fill='none' stroke='%23C9972A' stroke-width='0.8'%3E%3Cpolygon points='40,4 52,16 76,16 60,30 68,52 40,38 12,52 20,30 4,16 28,16'/%3E%3Cpolygon points='40,14 49,22 65,22 53,32 59,47 40,38 21,47 27,32 15,22 31,22'/%3E%3Ccircle cx='40' cy='40' r='6'/%3E%3C/g%3E%3C/svg%3E");
  background-size: 80px 80px;
  animation: patternDrift 60s linear infinite;
}

@keyframes patternDrift {
  from { background-position: 0 0; }
  to { background-position: 160px 160px; }
}

.crescent-wrap {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.18;
  animation: moonGlow 4s ease-in-out infinite alternate;
}

@keyframes moonGlow {
  from { opacity: 0.12; }
  to { opacity: 0.22; }
}

/* ── NAV ── */
.nav {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 3rem;
  border-bottom: 1px solid rgba(201, 151, 42, 0.2);
  z-index: 200;
  backdrop-filter: blur(2px);
}

.nav-logo {
  font-family: "Cinzel Decorative", serif;
  font-size: 14px;
  font-weight: 700;
  color: var(--gold);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
}

.nav-links {
  display: flex;
  gap: 2.5rem;
  list-style: none;
}

.nav-links a {
  font-family: "Cinzel", serif;
  font-size: 11px;
  color: var(--gold-pale);
  text-decoration: none;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  opacity: 0.8;
  transition: opacity 0.2s, color 0.2s;
}

.nav-links a:hover {
  opacity: 1;
  color: var(--gold);
}

.nav-cta {
  font-family: "Cinzel", serif;
  font-size: 11px;
  padding: 0.5rem 1.4rem;
  border: 1px solid var(--gold);
  color: var(--gold);
  background: transparent;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.25s, color 0.25s;
  white-space: nowrap;
}

.nav-cta:hover {
  background: var(--gold);
  color: var(--ink);
}

/* Burger button */
.burger-btn {
  display: none;
  background: transparent;
  border: 1px solid rgba(201, 151, 42, 0.4);
  color: var(--gold);
  padding: 0.45rem;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s, background 0.2s;
  flex-shrink: 0;
  z-index: 300;
}

.burger-btn:hover {
  border-color: var(--gold);
  background: rgba(201, 151, 42, 0.1);
}

.burger-icon {
  width: 22px;
  height: 22px;
  display: block;
}

/* Mobile overlay */
.mobile-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
  z-index: 250;
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}

.mobile-overlay.active {
  opacity: 1;
  pointer-events: all;
}

/* Mobile drawer */
.mobile-drawer {
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  width: min(320px, 85vw);
  height: 100vh;
  background: #120e07;
  border-left: 1px solid rgba(201, 151, 42, 0.25);
  z-index: 260;
  padding: 5rem 2rem 2rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
  transform: translateX(100%);
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  overflow-y: auto;
}

.mobile-drawer::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
}

.mobile-drawer.open {
  transform: translateX(0);
}

.mobile-nav-links {
  list-style: none;
  width: 100%;
  border-top: 1px solid rgba(201, 151, 42, 0.15);
}

.mobile-nav-links li {
  border-bottom: 1px solid rgba(201, 151, 42, 0.1);
}

.mobile-nav-links a {
  display: block;
  padding: 1.1rem 0.5rem;
  font-family: "Cinzel", serif;
  font-size: 12px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--parchment-dark);
  text-decoration: none;
  opacity: 0.85;
  transition: color 0.2s, opacity 0.2s, padding-left 0.2s;
}

.mobile-nav-links a:hover {
  color: var(--gold);
  opacity: 1;
  padding-left: 1rem;
}

.mobile-cta {
  margin-top: 1.8rem;
  width: 100%;
  padding: 0.85rem 1.4rem;
  font-size: 11px;
}

.mobile-drawer-mark {
  margin-top: auto;
  padding-top: 3rem;
  font-size: 12px;
  color: var(--gold);
  opacity: 0.35;
  font-family: "EB Garamond", serif;
}

/* ── HERO CONTENT ── */
.ornament {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1.2rem 0;
  color: var(--gold);
  opacity: 0.7;
  font-size: 18px;
}

.ornament-line {
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold));
}

.ornament-line.right {
  background: linear-gradient(90deg, var(--gold), transparent);
}

.hero-eyebrow {
  font-family: "Cinzel", serif;
  font-size: 11px;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: var(--gold);
  opacity: 0.9;
  animation: fadeUp 1s 0.2s both;
  margin-top: 100px;
  text-align: center;
  padding: 0 1rem;
}

.hero-title {
  font-family: "Cinzel Decorative", serif;
  font-size: clamp(28px, 6vw, 64px);
  font-weight: 900;
  line-height: 1.15;
  text-align: center;
  color: var(--parchment);
  text-shadow: 0 0 80px rgba(201, 151, 42, 0.3);
  animation: fadeUp 1s 0.4s both;
  max-width: 780px;
  padding: 0 1.5rem;
}

.hero-title span {
  color: var(--gold);
  display: block;
}

.hero-subtitle {
  font-family: "EB Garamond", serif;
  font-size: clamp(16px, 2.5vw, 18px);
  line-height: 1.7;
  color: var(--parchment-dark);
  text-align: center;
  max-width: 520px;
  opacity: 0.85;
  animation: fadeUp 1s 0.6s both;
  font-style: italic;
  padding: 0 1.5rem;
}

.hero-btns {
  display: flex;
  gap: 1.2rem;
  animation: fadeUp 1s 0.8s both;
  margin-top: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0 1.5rem;
}

.btn-primary {
  font-family: "Cinzel", serif;
  font-size: 12px;
  padding: 1rem 2.5rem;
  background: var(--gold);
  color: var(--ink);
  border: none;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  font-weight: 700;
  transition: background 0.25s, transform 0.15s;
}

.btn-primary:hover {
  background: var(--gold-light);
  transform: translateY(-1px);
}

.btn-secondary {
  font-family: "Cinzel", serif;
  font-size: 12px;
  padding: 1rem 2.5rem;
  border: 1px solid rgba(201, 151, 42, 0.5);
  color: var(--gold-pale);
  background: transparent;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  transition: border-color 0.25s, color 0.25s;
}

.btn-secondary:hover {
  border-color: var(--gold);
  color: var(--gold);
}

.scroll-hint {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.35;
  animation: scrollBounce 2s ease-in-out infinite;
  font-size: 22px;
  color: var(--gold);
}

@keyframes scrollBounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(6px); }
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ── MARQUEE ── */
.marquee-band {
  background: var(--gold);
  padding: 1rem 0;
  overflow: hidden;
  position: relative;
}

.marquee-track {
  display: flex;
  gap: 3rem;
  animation: marqueeScroll 30s linear infinite;
  width: max-content;
}

@keyframes marqueeScroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.marquee-item {
  font-family: "Cinzel", serif;
  font-size: 11px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--ink);
  font-weight: 700;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

/* ── SECTIONS ── */
.section {
  padding: 6rem 3rem;
  position: relative;
}

.section-inner {
  max-width: 1000px;
  margin: 0 auto;
}

.section-label {
  font-family: "Cinzel", serif;
  font-size: 10px;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: var(--gold);
  opacity: 0.8;
  margin-bottom: 0.8rem;
}

.section-title {
  font-family: "Cinzel Decorative", serif;
  font-size: clamp(22px, 4vw, 40px);
  font-weight: 700;
  color: var(--parchment);
  margin-bottom: 1.2rem;
  line-height: 1.2;
}

.section-body {
  font-family: "EB Garamond", serif;
  font-size: 17px;
  line-height: 1.8;
  color: var(--parchment-dark);
  opacity: 0.85;
  max-width: 600px;
}

/* Proof cards */
.proof-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: rgba(201, 151, 42, 0.15);
  border: 1px solid rgba(201, 151, 42, 0.2);
  margin-top: 3rem;
}

.proof-card {
  background: #120e07;
  padding: 2.5rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: background 0.3s;
}

.proof-card:hover { background: #1e160a; }

.proof-card::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: var(--gold);
  transform: scaleX(0);
  transition: transform 0.3s;
  transform-origin: left;
}

.proof-card:hover::before { transform: scaleX(1); }

.proof-num {
  font-family: "Cinzel Decorative", serif;
  font-size: clamp(28px, 5vw, 40px);
  font-weight: 900;
  color: var(--gold);
  line-height: 1;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.proof-title {
  font-family: "Cinzel", serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--parchment);
  margin-bottom: 0.6rem;
}

.proof-sub {
  font-family: "EB Garamond", serif;
  font-size: 14px;
  font-style: italic;
  color: var(--parchment-dark);
  opacity: 0.6;
}

/* Testimonials */
.testimonials-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 3rem;
}

.testimonial {
  background: #120e07;
  border: 1px solid rgba(201, 151, 42, 0.18);
  padding: 2rem;
  position: relative;
}

.testimonial::before {
  content: '"';
  font-family: "Cinzel Decorative", serif;
  font-size: 80px;
  color: var(--gold);
  opacity: 0.08;
  position: absolute;
  top: -10px; left: 16px;
  line-height: 1;
  pointer-events: none;
}

.testimonial-text {
  font-family: "EB Garamond", serif;
  font-size: 16px;
  line-height: 1.7;
  font-style: italic;
  color: var(--parchment-dark);
  opacity: 0.85;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
}

.testimonial-attr {
  font-family: "Cinzel", serif;
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold);
  opacity: 0.65;
}

/* ── FEATURES ── */
.features-section {
  background: #0f0b05;
  padding: 6rem 3rem;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: rgba(201, 151, 42, 0.12);
  border: 1px solid rgba(201, 151, 42, 0.18);
  margin-top: 3.5rem;
}

.feature-card {
  background: #0f0b05;
  padding: 2.5rem 2rem;
  position: relative;
  overflow: hidden;
  transition: background 0.3s;
  cursor: default;
}

.feature-card:hover { background: #1a130a; }

.feature-card::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: var(--gold);
  transform: scaleX(0);
  transition: transform 0.3s;
  transform-origin: left;
}

.feature-card:hover::before { transform: scaleX(1); }

.feature-title {
  font-family: "Cinzel", serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 0.7rem;
}

.feature-desc {
  font-family: "EB Garamond", serif;
  font-size: 15px;
  line-height: 1.65;
  color: var(--parchment-dark);
  opacity: 0.75;
  font-style: italic;
}

/* ── HOW IT WORKS ── */
.how-section {
  padding: 6rem 3rem;
  background: #0a0804;
}

.steps-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  margin-top: 3.5rem;
  position: relative;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

.steps-row::before {
  content: "";
  position: absolute;
  top: 2.8rem;
  left: calc(16.66% + 2rem);
  right: calc(16.66% + 2rem);
  height: 1px;
  background: linear-gradient(90deg, var(--gold) 0%, rgba(201, 151, 42, 0.3) 50%, var(--gold) 100%);
  opacity: 0.35;
}

.step {
  text-align: center;
  padding: 0 2rem;
}

.step-num-wrap {
  width: 56px;
  height: 56px;
  border: 1px solid rgba(201, 151, 42, 0.4);
  background: #0a0804;
  margin: 0 auto 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
}

.step-num {
  font-family: "Cinzel Decorative", serif;
  font-size: 20px;
  color: var(--gold);
  font-weight: 700;
}

.step-title {
  font-family: "Cinzel", serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--parchment);
  margin-bottom: 0.7rem;
}

.step-desc {
  font-family: "EB Garamond", serif;
  font-size: 15px;
  line-height: 1.65;
  color: var(--parchment-dark);
  opacity: 0.7;
  font-style: italic;
}

.step-badge {
  display: inline-block;
  margin-top: 0.8rem;
  font-family: "Cinzel", serif;
  font-size: 8px;
  letter-spacing: 0.15em;
  padding: 3px 10px;
  border: 1px solid rgba(201, 151, 42, 0.35);
  color: var(--gold);
  text-transform: uppercase;
  opacity: 0.7;
}

/* ── QUOTE ── */
.quote-section {
  padding: 7rem 3rem;
  text-align: center;
  background: radial-gradient(ellipse at center, #1e1308 0%, #0a0804 70%);
  position: relative;
  overflow: hidden;
}

.quote-section::before {
  content: '"';
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  font-family: "Cinzel Decorative", serif;
  font-size: 280px;
  color: var(--gold);
  opacity: 0.04;
  line-height: 1;
  pointer-events: none;
}

.quote-text {
  font-family: "EB Garamond", serif;
  font-size: clamp(18px, 3.5vw, 32px);
  line-height: 1.6;
  color: var(--parchment);
  max-width: 680px;
  margin: 0 auto 1.5rem;
  font-style: italic;
  position: relative;
  z-index: 1;
}

.quote-attr {
  font-family: "Cinzel", serif;
  font-size: 11px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--gold);
  opacity: 0.7;
}

/* ── CTA ── */
.cta-section {
  padding: 8rem 3rem;
  text-align: center;
  background: linear-gradient(180deg, #0a0804 0%, #1a0d04 50%, #0a0804 100%);
  border-top: 1px solid rgba(201, 151, 42, 0.15);
  border-bottom: 1px solid rgba(201, 151, 42, 0.15);
}

.cta-title {
  font-family: "Cinzel Decorative", serif;
  font-size: clamp(20px, 4.5vw, 48px);
  color: var(--parchment);
  margin-bottom: 1.2rem;
  line-height: 1.25;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.cta-subtitle {
  font-family: "EB Garamond", serif;
  font-size: clamp(16px, 2.5vw, 19px);
  font-style: italic;
  color: var(--parchment-dark);
  opacity: 0.75;
  margin-bottom: 2.5rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.cta-btn-wrap {
  display: flex;
  justify-content: center;
  gap: 1.2rem;
}

.btn-cta-main {
  font-family: "Cinzel", serif;
  font-size: 13px;
  padding: 1.1rem 3rem;
  background: var(--gold);
  color: var(--ink);
  border: none;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  cursor: pointer;
  font-weight: 700;
  transition: background 0.25s, transform 0.15s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-cta-main:hover {
  background: var(--gold-light);
  transform: translateY(-1px);
}

.cta-footnote {
  margin-top: 1.4rem;
  font-family: "EB Garamond", serif;
  font-size: 14px;
  font-style: italic;
  color: var(--parchment-dark);
  opacity: 0.4;
}

/* ── FOOTER ── */
footer {
  padding: 3rem;
  border-top: 1px solid rgba(201, 151, 42, 0.15);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #070603;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-logo {
  font-family: "Cinzel Decorative", serif;
  font-size: 12px;
  color: var(--gold);
  opacity: 0.7;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.icon-inline,
.ornament-symbol,
.feature-icon,
.proof-icon,
.scroll-icon,
.btn-icon,
.marquee-sep-icon {
  display: inline-flex;
  vertical-align: middle;
}

.icon-inline {
  width: 1.1em;
  height: 1.1em;
  margin-right: 0.35em;
}

.ornament-symbol {
  width: 1.1rem;
  height: 1.1rem;
  color: var(--gold);
  opacity: 0.9;
}

.scroll-icon {
  width: 1.15rem;
  height: 1.15rem;
  color: var(--gold);
}

.feature-icon {
  width: 32px;
  height: 32px;
  color: var(--gold);
  margin-bottom: 1rem;
  display: block;
}

.proof-icon {
  width: 1.5rem;
  height: 1.5rem;
  color: var(--gold);
}

.btn-icon {
  width: 1em;
  height: 1em;
  color: var(--ink);
  display: inline-flex;
}

.marquee-sep-icon {
  width: 0.95rem;
  height: 0.95rem;
  color: var(--ink);
  opacity: 0.45;
}

.footer-text {
  font-family: "Cinzel", serif;
  font-size: 10px;
  letter-spacing: 0.2em;
  color: var(--parchment-dark);
  opacity: 0.35;
  text-transform: uppercase;
}

.calligraphy-mark {
  font-size: 11px;
  color: var(--gold);
  opacity: 0.5;
  letter-spacing: 0.1em;
  font-family: "EB Garamond", serif;
}

.divider {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(201, 151, 42, 0.3) 30%, rgba(201, 151, 42, 0.3) 70%, transparent);
}

.highlight { color: var(--gold); }

/* ═══════════════════════════════════════
   RESPONSIVE BREAKPOINTS
═══════════════════════════════════════ */

/* Tablet: ≤ 900px */
@media (max-width: 900px) {
  /* Nav */
  .nav {
    padding: 1.2rem 1.5rem;
  }

  .nav-links,
  .desktop-only {
    display: none;
  }

  .burger-btn {
    display: flex;
  }

  .mobile-overlay {
    display: block;
  }

  .mobile-drawer {
    display: flex;
  }

  /* Hero */
  .hero-eyebrow {
    margin-top: 80px;
    font-size: 9px;
    letter-spacing: 0.3em;
  }

  .ornament-line {
    width: 40px;
  }

  /* Social proof */
  .section {
    padding: 4rem 1.5rem;
  }

  .proof-grid {
    grid-template-columns: 1fr;
  }

  .testimonials-grid {
    grid-template-columns: 1fr;
  }

  /* Features */
  .features-section {
    padding: 4rem 1.5rem;
  }

  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  /* Steps */
  .how-section {
    padding: 4rem 1.5rem;
  }

  .steps-row {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }

  .steps-row::before {
    display: none;
  }

  /* Quote & CTA */
  .quote-section {
    padding: 5rem 1.5rem;
  }

  .cta-section {
    padding: 5rem 1.5rem;
  }

  /* Footer */
  footer {
    padding: 2rem 1.5rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
}

/* Mobile: ≤ 600px */
@media (max-width: 600px) {
  .nav {
    padding: 1rem 1.2rem;
  }

  .nav-logo {
    font-size: 11px;
  }

  /* Hero */
  .hero-eyebrow {
    margin-top: 75px;
    font-size: 8px;
    letter-spacing: 0.25em;
  }

  .ornament {
    margin: 0.8rem 0;
  }

  .ornament-line {
    width: 28px;
  }

  .hero-btns {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
    text-align: center;
    padding: 0.9rem 1.5rem;
  }

  /* Section labels */
  .section {
    padding: 3.5rem 1.2rem;
  }

  .section-body {
    font-size: 15px;
  }

  /* Proof */
  .proof-card {
    padding: 2rem 1.5rem;
  }

  /* Features — single column on small mobile */
  .features-section {
    padding: 3.5rem 1.2rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .feature-card {
    padding: 2rem 1.5rem;
  }

  /* Steps */
  .how-section {
    padding: 3.5rem 1.2rem;
  }

  .step {
    padding: 0 0.5rem;
  }

  /* Quote */
  .quote-section {
    padding: 4rem 1.2rem;
  }

  .quote-section::before {
    font-size: 160px;
  }

  /* CTA */
  .cta-section {
    padding: 4rem 1.2rem;
  }

  .cta-btn-wrap {
    flex-direction: column;
    align-items: center;
  }

  .btn-cta-main {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }

  /* Footer */
  footer {
    padding: 1.8rem 1.2rem;
    text-align: left;
  }

  .calligraphy-mark {
    display: none;
  }
}

/* Extra small: ≤ 380px */
@media (max-width: 380px) {
  .hero-title {
    font-size: 24px;
  }

  .nav-logo {
    font-size: 10px;
  }

  .hero-eyebrow {
    font-size: 7px;
    letter-spacing: 0.2em;
  }
}
</style>