<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';
import { ArrowDownRight, ArrowRight, ShieldCheck, Compass, Users, Coins, Sparkles, ScrollText, CheckCircle2 } from 'lucide-vue-next';
import IntroOverlay from '@/components/Imperial/IntroOverlay.vue';
import { timeline, sultans, campaigns, satiricalTestimonials, imperialStats } from '@/data/imperial';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const heroRef = ref(null);
const heroCopyRef = ref(null);
const particleCanvasRef = ref(null);
const sultanImgRef = ref(null);

let particlesAnimationId = null;
let mouseX = 0;
let mouseY = 0;

function setupParticleCanvas() {
  const canvas = particleCanvasRef.value;
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  function resize() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Generate glowing golden dust motes & ember particles
  const count = 45;
  const particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 0.6,
    speedY: Math.random() * -0.5 - 0.2,
    speedX: (Math.random() - 0.5) * 0.4,
    opacity: Math.random() * 0.7 + 0.2,
    pulseSpeed: Math.random() * 0.02 + 0.01,
    glow: Math.random() > 0.6
  }));

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.opacity += Math.sin(Date.now() * p.pulseSpeed) * 0.008;

      if (p.y < -10) p.y = canvas.height + 10;
      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.glow 
        ? `rgba(255, 230, 150, ${Math.max(0.1, Math.min(0.9, p.opacity))})` 
        : `rgba(185, 154, 91, ${Math.max(0.1, Math.min(0.7, p.opacity))})`;
      ctx.shadowBlur = p.glow ? 8 : 0;
      ctx.shadowColor = '#D4AF37';
      ctx.fill();
    });

    particlesAnimationId = requestAnimationFrame(animate);
  }

  animate();
}

function handleMouseMove(e) {
  if (!sultanImgRef.value) return;
  const rect = heroRef.value?.getBoundingClientRect();
  if (!rect) return;
  
  mouseX = (e.clientX - rect.left) / rect.width - 0.5;
  mouseY = (e.clientY - rect.top) / rect.height - 0.5;

  gsap.to(sultanImgRef.value, {
    x: mouseX * 24,
    y: mouseY * 16,
    duration: 1.2,
    ease: 'power2.out'
  });
}

onMounted(() => {
  setupParticleCanvas();

  // Hero staggered entrance animation
  if (heroCopyRef.value) {
    const elements = heroCopyRef.value.querySelectorAll('.hero-anim');
    gsap.fromTo(elements, 
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, duration: 1.1, stagger: 0.18, ease: 'power3.out', delay: 0.4 }
    );
  }

  // Scroll animations for sections
  gsap.utils.toArray('.scroll-reveal').forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 45 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
});

onUnmounted(() => {
  if (particlesAnimationId) cancelAnimationFrame(particlesAnimationId);
  ScrollTrigger.getAll().forEach(t => t.kill());
});
</script>

<template>
  <div class="home-page">
    <IntroOverlay />

    <!-- HERO SECTION: THE SULTAN'S COURT LIVING SCENE -->
    <section 
      ref="heroRef" 
      class="court-hero" 
      @mousemove="handleMouseMove"
      aria-label="The Sultan's Court"
    >
      <!-- Background Living Scene: Sultan Sword Training in Palace Courtyard -->
      <div class="hero-backdrop">
        <img 
          ref="sultanImgRef" 
          src="/images/sultan-training.jpg" 
          alt="16th-century Ottoman Sultan practicing swordsmanship with scimitar in Topkapi Palace courtyard at golden hour"
          class="hero-scene-img"
        />
        <!-- Atmospheric Vignettes & Overlays -->
        <div class="hero-gradient-overlay"></div>
        <div class="blade-gleam"></div>
        <canvas ref="particleCanvasRef" class="particle-canvas"></canvas>
      </div>

      <!-- Hero Copy & Callouts -->
      <div ref="heroCopyRef" class="hero-content-wrap">
        <div class="hero-anim eyebrow-container">
          <p class="eyebrow">The Sublime Porte · Est. 1299</p>
          <span class="eyebrow-accent">Devlet-i Aliyye</span>
        </div>

        <h1 class="hero-anim hero-title">
          An Empire Is Only As Strong As Those Who Defend It.
        </h1>

        <p class="hero-anim hero-desc">
          From the frontier provinces of Anatolia to the gates of Vienna, manage the empire's most valuable resource: its soldiers. Janissaries is an imperial-grade recruitment and military personnel management system, engineered for an empire that has no intention of slowing down.
        </p>

        <div class="hero-anim hero-cta-row">
          <RouterLink class="btn-imperial gold" to="/demo">
            <span>Enter the Imperial Court</span>
            <ArrowDownRight :size="16" />
          </RouterLink>

          <RouterLink class="btn-imperial" to="/history">
            <span>Explore the Empire</span>
            <ArrowRight :size="16" />
          </RouterLink>
        </div>

        <div class="hero-anim hero-features-strip">
          <div class="strip-item">
            <ShieldCheck :size="16" class="strip-icon" />
            <span>32 Eyalets Integrated</span>
          </div>
          <div class="strip-item">
            <Users :size="16" class="strip-icon" />
            <span>14,530 Janissary Recruits</span>
          </div>
          <div class="strip-item">
            <Coins :size="16" class="strip-icon" />
            <span>Quarterly Akçe Ulufe</span>
          </div>
        </div>
      </div>

      <!-- Vertical Imperial Motto -->
      <div class="hero-vertical-motto" aria-hidden="true">
        <span>One Empire. Countless Provinces. One Imperial Command.</span>
      </div>
    </section>

    <!-- SECTION 2: AN ARCHIVE & AN INSTRUMENT -->
    <section class="imperial-section night manifesto-section scroll-reveal">
      <div class="manifesto-grid">
        <div class="manifesto-left">
          <p class="section-label">An Archive & An Instrument</p>
          <h2 class="section-title">Six centuries cannot be contained by a ledger.</h2>
          <div class="manifesto-seal-box">
            <span class="crest-rune">✦</span>
            <p class="seal-quote">"Devlet-i Ebed-Müddet" — The state shall endure across epochs.</p>
          </div>
        </div>

        <div class="manifesto-right">
          <p class="editorial-lead">
            From a small frontier beylik in northwestern Anatolia, the Ottoman Empire grew to shape political, religious, and cultural life across southeastern Europe, Western Asia, and North Africa for over six hundred years.
          </p>
          <p class="editorial-body">
            This digital archive preserves the authentic historical record: the founder Osman I, the conquest of 1453, the legal architecture of Suleiman, and the dramatic transformations of the nineteenth century. Parallel to this historical documentary lies Janissaries CRM—a satirical, highly detailed reconstruction of a modern recruitment and intelligence suite built for the Grand Vizier's council.
          </p>
          <div class="distinction-tag">
            <ScrollText :size="16" />
            <span>Historical record & fictional product, clearly distinguished.</span>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 3: CHRONOLOGY / TIMELINE PREVIEW -->
    <section class="imperial-section paper timeline-section scroll-reveal">
      <div class="section-header-row">
        <div>
          <p class="section-label">Imperial Chronology</p>
          <h2 class="section-title">Six Centuries of Dynastic Rule</h2>
        </div>
        <RouterLink to="/history" class="btn-imperial burgundy">
          <span>Read Full History</span>
          <ArrowRight :size="15" />
        </RouterLink>
      </div>

      <div class="timeline-cards-grid">
        <RouterLink 
          v-for="(chapter, idx) in timeline.slice(0, 4)" 
          :key="chapter.id" 
          :to="`/history#${chapter.id}`"
          class="timeline-card"
        >
          <div class="card-top">
            <span class="card-epoch">{{ chapter.years }}</span>
            <span class="card-number">0{{ idx + 1 }}</span>
          </div>
          <h3 class="card-heading">{{ chapter.title }}</h3>
          <p class="card-desc">{{ chapter.summary }}</p>
          <div class="card-footer">
            <span class="footer-events">{{ chapter.events }}</span>
            <ArrowRight :size="16" class="card-arrow" />
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- SECTION 4: FEATURED SULTANS GALLERY PREVIEW -->
    <section class="imperial-section walnut sultans-section scroll-reveal">
      <div class="section-header-row">
        <div>
          <p class="section-label">Faces of the House of Osman</p>
          <h2 class="section-title">The Men Behind the Throne</h2>
          <p class="section-sub">Thirty-six monarchs governed an empire across three continents.</p>
        </div>
        <RouterLink to="/sultans" class="btn-imperial gold">
          <span>Explore Sultan Gallery</span>
          <ArrowRight :size="15" />
        </RouterLink>
      </div>

      <div class="sultans-cards-grid">
        <article v-for="s in sultans.slice(0, 4)" :key="s.id" class="sultan-card">
          <div class="sultan-portrait-frame">
            <img :src="s.image" :alt="`Historical portrait of ${s.name}`" class="sultan-img" />
            <div class="sultan-portrait-overlay"></div>
            <span class="sultan-arabic">{{ s.arabicName }}</span>
          </div>
          <div class="sultan-card-content">
            <span class="sultan-role-tag">{{ s.role }}</span>
            <h3 class="sultan-name">{{ s.name }}</h3>
            <span class="sultan-dates">{{ s.dates }}</span>
            <p class="sultan-bio-preview">{{ s.bio.slice(0, 140) }}...</p>
            <RouterLink :to="`/sultans#${s.id}`" class="sultan-link">
              <span>View Sovereign Profile</span>
              <ArrowRight :size="14" />
            </RouterLink>
          </div>
        </article>
      </div>
    </section>

    <!-- SECTION 5: CAMPAIGNS & SIEGES PREVIEW -->
    <section class="imperial-section night campaigns-section scroll-reveal">
      <div class="campaign-split">
        <div class="campaign-intro">
          <p class="section-label">Wars & Conquests</p>
          <h2 class="section-title">Where History Was Decided.</h2>
          <p class="campaign-desc">
            The Ottoman realm expanded through field battles, monumental sieges, and maritime warfare that reshaped borders from the Danube to the Euphrates.
          </p>
          <div class="campaign-featured-box">
            <img src="/images/campaigns/constantinople-1453.jpg" alt="Conquest of Constantinople 1453 by Fausto Zonaro" class="featured-campaign-img" />
            <div class="featured-campaign-info">
              <span class="featured-year">1453</span>
              <h4>The Conquest of Constantinople</h4>
              <p>Urban's super-heavy cannons and the 53-day siege that transformed the imperial center.</p>
            </div>
          </div>
          <RouterLink to="/campaigns" class="btn-imperial gold">
            <span>Explore All 8 Campaigns</span>
            <ArrowRight :size="15" />
          </RouterLink>
        </div>

        <div class="campaign-list">
          <RouterLink 
            v-for="c in campaigns.slice(0, 5)" 
            :key="c.id" 
            :to="`/campaigns#${c.id}`"
            class="campaign-row-item"
          >
            <div class="row-year">{{ c.year }}</div>
            <div class="row-title">
              <strong>{{ c.name }}</strong>
              <small>{{ c.type }} · {{ c.location }}</small>
            </div>
            <div class="row-outcome">
              <span class="outcome-pill">{{ c.outcome }}</span>
              <ArrowRight :size="16" class="row-arrow" />
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- SECTION 6: THE JANISSARY CORPS OVERVIEW -->
    <section class="imperial-section walnut corps-spotlight scroll-reveal">
      <div class="corps-banner-grid">
        <div class="corps-image-col">
          <img 
            src="/images/janissary-regiment.jpg" 
            alt="Ottoman Janissary corps in morning regiment formation" 
            class="corps-painting"
          />
          <div class="corps-image-caption">
            <span>Historical Illustration · The Janissary Corps on Parade Grounds</span>
          </div>
        </div>

        <div class="corps-text-col">
          <div class="corps-badge">
            <span class="crescent">☾</span>
            <span class="badge-title">YENİÇERİ OCAĞI</span>
          </div>

          <h2 class="section-title">The Sultan's Standing Army</h2>
          <p class="corps-lead">
            Emerging in the fourteenth century under Murad I, the Janissaries evolved from the Sultan's personal household guards into an elite standing infantry and firearm vanguard that dominated battlefields for centuries.
          </p>
          <p class="corps-p">
            Their story contains institutional brotherhood, the complex and coercive Devshirme recruitment system, Bektashi mystical rituals, and eventually formidable political influence that could crown or depose sultans at the overturn of a soup cauldron.
          </p>

          <div class="corps-stats-row">
            <div class="c-stat">
              <strong>Orta</strong>
              <small>Regimental Unit</small>
            </div>
            <div class="c-stat">
              <strong>Kazan</strong>
              <small>Sacred Cauldron</small>
            </div>
            <div class="c-stat">
              <strong>Bork</strong>
              <small>White Felt Cap</small>
            </div>
          </div>

          <RouterLink to="/janissaries" class="btn-imperial gold">
            <span>Study the Janissary Corps</span>
            <ArrowRight :size="15" />
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- SECTION 7: SATIRICAL RECRUITMENT CRM HIGHLIGHT -->
    <section class="imperial-section paper crm-highlight scroll-reveal">
      <div class="crm-intro-center">
        <p class="section-label">Janissaries CRM · Fictional Platform</p>
        <h2 class="section-title">Your recruitment pipeline is currently less organized than the Byzantine defenses.</h2>
        <p class="crm-subtitle">
          Commissioned by the Sublime Porte to modernize troop intake, loyalty analysis, and provincial taxation across thirty-two eyalets.
        </p>
      </div>

      <div class="crm-features-quad">
        <div class="feature-box">
          <div class="box-icon">
            <Users :size="24" />
          </div>
          <h3>Recruitment Automation</h3>
          <p>Track candidate induction stages from Balkan levying to apprentice barracks with automatic Eşkâl defter indexing.</p>
        </div>

        <div class="feature-box">
          <div class="box-icon">
            <Compass :size="24" />
          </div>
          <h3>Provincial Governance</h3>
          <p>Real-time troop quotas and taxation status across Anatolia, Rumelia, Egypt, and the Levant before governors submit reports.</p>
        </div>

        <div class="feature-box">
          <div class="box-icon">
            <ShieldCheck :size="24" />
          </div>
          <h3>Loyalty Intelligence</h3>
          <p>Predictive palace coup prevention metrics. Because trusting everyone in the Divan is how you end up in the Seven Towers.</p>
        </div>

        <div class="feature-box">
          <div class="box-icon">
            <Coins :size="24" />
          </div>
          <h3>Akçe Payroll & Ulufe</h3>
          <p>Quarterly salary distribution in fine silver akçe with automatic deductions for burned halva pots and lost arrows.</p>
        </div>
      </div>

      <div class="crm-center-action">
        <RouterLink to="/features" class="btn-imperial burgundy">
          <span>Explore Administration Architecture</span>
          <ArrowRight :size="16" />
        </RouterLink>
      </div>
    </section>

    <!-- SECTION 8: IMPERIAL STATISTICS -->
    <section class="imperial-section night stats-section scroll-reveal">
      <div class="stats-grid">
        <div v-for="stat in imperialStats" :key="stat.label" class="stat-cell">
          <span class="stat-value">{{ stat.value }}</span>
          <h4 class="stat-label">{{ stat.label }}</h4>
          <p class="stat-note">{{ stat.note }}</p>
        </div>
      </div>
    </section>

    <!-- SECTION 9: SATIRICAL HISTORICAL ENDORSEMENTS -->
    <section class="imperial-section walnut testimonials-section scroll-reveal">
      <div class="section-header-center">
        <p class="section-label">Imperial Council Endorsements</p>
        <h2 class="section-title">Satirical Reviews from the Divan</h2>
      </div>

      <div class="testimonials-grid">
        <div v-for="t in satiricalTestimonials" :key="t.author" class="testimonial-card">
          <div class="quote-mark">“</div>
          <p class="testimonial-text">{{ t.text }}</p>
          <div class="testimonial-author-block">
            <strong>{{ t.author }}</strong>
            <span>{{ t.role }}</span>
            <div class="cypher-stamp">{{ t.seal }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 10: FINAL IMPERIAL DECREE CTA -->
    <section class="final-cta-section scroll-reveal">
      <div class="final-cta-bg"></div>
      <div class="final-cta-content">
        <div class="cta-tughra">
          <span>☾ ✦ ☽</span>
        </div>
        <p class="cta-eyebrow">BY ORDER OF THE SUBLIME PORTE</p>
        <h2 class="cta-heading">Your Empire Awaits Its Commander.</h2>
        <p class="cta-sub">
          The recruitment ledger is open, the provinces are mapped, and the treasury stands ready. Enter the interactive demonstration.
        </p>
        <div class="cta-btn-group">
          <RouterLink class="btn-imperial gold large" to="/demo">
            <span>Open Imperial Access (CRM)</span>
            <ArrowRight :size="18" />
          </RouterLink>
          <RouterLink class="btn-imperial" to="/history">
            <span>Explore Imperial History</span>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* HERO SECTION */
.court-hero {
  min-height: 100svh;
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 130px max(24px, 8vw) 70px;
  overflow: hidden;
  background: var(--night);
}

.hero-backdrop {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.hero-scene-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
  transform: scale(1.05);
  filter: brightness(0.68) contrast(1.15) saturate(1.1);
  transition: transform 0.5s ease;
}

.hero-gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(11, 8, 7, 0.45) 0%,
    rgba(11, 8, 7, 0.25) 40%,
    rgba(23, 19, 16, 0.85) 85%,
    var(--ink) 100%
  ),
  radial-gradient(
    circle at 75% 45%,
    rgba(212, 175, 55, 0.18) 0%,
    transparent 55%
  );
}

.blade-gleam {
  position: absolute;
  top: 36%;
  right: 32%;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 245, 200, 0.45) 0%, rgba(212, 175, 55, 0.15) 45%, transparent 70%);
  filter: blur(10px);
  animation: gleamPulse 4s ease-in-out infinite;
  pointer-events: none;
}
@keyframes gleamPulse {
  0%, 100% { opacity: 0.3; transform: scale(0.9); }
  50% { opacity: 0.85; transform: scale(1.15); }
}

.particle-canvas {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.hero-content-wrap {
  position: relative;
  z-index: 10;
  max-width: 820px;
}

.eyebrow-container {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}
.eyebrow-accent {
  font-family: var(--font-heading);
  font-size: 10px;
  letter-spacing: 0.22em;
  color: var(--muted);
  text-transform: uppercase;
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(38px, 5.8vw, 76px);
  font-weight: 900;
  line-height: 1.08;
  color: var(--gold-pale);
  margin: 0 0 24px;
  text-shadow: 0 4px 30px rgba(0, 0, 0, 0.85);
}

.hero-desc {
  font-family: var(--font-serif);
  font-size: clamp(18px, 2.1vw, 24px);
  line-height: 1.55;
  color: var(--parchment);
  max-width: 680px;
  margin: 0 0 34px;
  text-shadow: 0 2px 15px rgba(0, 0, 0, 0.9);
}

.hero-cta-row {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 38px;
}

.hero-features-strip {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  padding-top: 24px;
  border-top: 1px solid rgba(185, 154, 91, 0.2);
}
.strip-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-heading);
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--gold);
}
.strip-icon {
  color: var(--gold-bright);
}

.hero-vertical-motto {
  position: absolute;
  right: max(24px, 4vw);
  bottom: 80px;
  writing-mode: vertical-rl;
  font-family: var(--font-heading);
  font-size: 10px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--muted);
  opacity: 0.65;
  pointer-events: none;
}

/* SECTION 2: MANIFESTO */
.manifesto-section {
  border-top: 1px solid var(--gold-border);
}
.manifesto-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(40px, 8vw, 100px);
  align-items: center;
}
.manifesto-seal-box {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 32px;
  padding: 16px 20px;
  border: 1px solid var(--gold-border);
  background: rgba(185, 154, 91, 0.05);
}
.crest-rune {
  font-size: 24px;
  color: var(--gold);
}
.seal-quote {
  margin: 0;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 17px;
  color: var(--gold);
}

.editorial-lead {
  font-size: 23px;
  line-height: 1.55;
  color: var(--gold-pale);
  margin-bottom: 20px;
}
.editorial-body {
  font-size: 18px;
  line-height: 1.65;
  color: var(--muted);
  margin-bottom: 28px;
}
.distinction-tag {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-heading);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--gold);
  border-left: 2px solid var(--burgundy);
  padding-left: 12px;
}

/* SECTION 3: TIMELINE PREVIEW */
.section-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 48px;
  gap: 30px;
  flex-wrap: wrap;
}
.timeline-cards-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
.timeline-card {
  display: flex;
  flex-direction: column;
  background: #EFE6D5;
  border: 1px solid rgba(138, 114, 69, 0.3);
  padding: 28px;
  transition: all 0.3s var(--ease-imperial);
}
.timeline-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  border-color: var(--burgundy);
}
.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}
.card-epoch {
  font-family: var(--font-heading);
  font-size: 11px;
  letter-spacing: 0.16em;
  color: var(--burgundy);
  font-weight: 700;
}
.card-number {
  font-family: var(--font-display);
  font-size: 18px;
  color: rgba(100, 30, 43, 0.4);
}
.card-heading {
  font-family: var(--font-display);
  font-size: 22px;
  line-height: 1.25;
  color: var(--ink);
  margin: 0 0 12px;
}
.card-desc {
  font-size: 16px;
  color: #5A4E3D;
  margin: 0 0 24px;
  line-height: 1.5;
  flex: 1;
}
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 14px;
  border-top: 1px solid rgba(138, 114, 69, 0.2);
}
.footer-events {
  font-family: var(--font-sans);
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #7A6F5D;
}
.card-arrow {
  color: var(--burgundy);
  transition: transform 0.2s;
}
.timeline-card:hover .card-arrow {
  transform: translateX(4px);
}

/* SECTION 4: SULTANS GALLERY PREVIEW */
.sultans-cards-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 28px;
  margin-top: 20px;
}
.sultan-card {
  background: var(--walnut-card);
  border: 1px solid var(--gold-border);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: all 0.3s var(--ease-imperial);
}
.sultan-card:hover {
  transform: translateY(-5px);
  border-color: var(--gold);
}
.sultan-portrait-frame {
  position: relative;
  aspect-ratio: 4 / 5;
  overflow: hidden;
}
.sultan-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.9) contrast(1.1);
  transition: transform 0.6s var(--ease-imperial);
}
.sultan-card:hover .sultan-img {
  transform: scale(1.06);
}
.sultan-portrait-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 50%, var(--walnut-card) 100%);
}
.sultan-arabic {
  position: absolute;
  top: 16px;
  right: 16px;
  font-family: var(--font-serif);
  font-size: 18px;
  color: var(--gold);
  background: rgba(23, 19, 16, 0.7);
  padding: 4px 10px;
  border: 1px solid var(--gold-border);
}
.sultan-card-content {
  padding: 22px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.sultan-role-tag {
  font-family: var(--font-heading);
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 6px;
}
.sultan-name {
  font-family: var(--font-display);
  font-size: 21px;
  color: var(--gold-pale);
  margin: 0 0 4px;
}
.sultan-dates {
  font-family: var(--font-sans);
  font-size: 11px;
  color: var(--muted);
  margin-bottom: 12px;
}
.sultan-bio-preview {
  font-size: 15px;
  color: var(--parchment);
  line-height: 1.5;
  opacity: 0.85;
  margin: 0 0 20px;
  flex: 1;
}
.sultan-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-heading);
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--gold);
}
.sultan-link:hover {
  color: var(--gold-pale);
}

/* SECTION 5: CAMPAIGNS PREVIEW */
.campaign-split {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: clamp(40px, 7vw, 90px);
  align-items: center;
}
.campaign-desc {
  font-size: 20px;
  color: var(--parchment);
  line-height: 1.6;
  margin-bottom: 30px;
  opacity: 0.9;
}
.campaign-featured-box {
  background: var(--walnut-card);
  border: 1px solid var(--gold-border);
  overflow: hidden;
  margin-bottom: 30px;
}
.featured-campaign-img {
  width: 100%;
  height: 220px;
  object-fit: cover;
}
.featured-campaign-info {
  padding: 20px;
}
.featured-year {
  font-family: var(--font-heading);
  font-size: 10px;
  letter-spacing: 0.2em;
  color: var(--gold);
}
.featured-campaign-info h4 {
  font-family: var(--font-display);
  font-size: 20px;
  color: var(--gold-pale);
  margin: 6px 0;
}
.featured-campaign-info p {
  font-size: 15px;
  color: var(--muted);
  margin: 0;
}

.campaign-list {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--gold-border);
}
.campaign-row-item {
  display: grid;
  grid-template-columns: 70px 1fr auto;
  gap: 20px;
  align-items: center;
  padding: 22px 0;
  border-bottom: 1px solid rgba(185, 154, 91, 0.18);
  transition: all 0.25s;
}
.campaign-row-item:hover {
  padding-left: 10px;
  background: rgba(185, 154, 91, 0.04);
}
.row-year {
  font-family: var(--font-heading);
  font-size: 12px;
  letter-spacing: 0.15em;
  color: var(--gold);
}
.row-title strong {
  display: block;
  font-family: var(--font-display);
  font-size: 19px;
  color: var(--gold-pale);
}
.row-title small {
  font-family: var(--font-sans);
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
}
.row-outcome {
  display: flex;
  align-items: center;
  gap: 14px;
}
.outcome-pill {
  font-family: var(--font-heading);
  font-size: 9px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 4px 10px;
  border: 1px solid var(--gold-border);
  color: var(--gold);
}
.row-arrow {
  color: var(--gold);
  transition: transform 0.2s;
}
.campaign-row-item:hover .row-arrow {
  transform: translateX(4px);
}

/* SECTION 6: CORPS SPOTLIGHT */
.corps-banner-grid {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: clamp(40px, 6vw, 80px);
  align-items: center;
}
.corps-image-col {
  border: 1px solid var(--gold-border);
  background: var(--night);
  overflow: hidden;
}
.corps-painting {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
}
.corps-image-caption {
  padding: 12px 18px;
  background: var(--night);
  font-family: var(--font-sans);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
}
.corps-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-heading);
  font-size: 10px;
  letter-spacing: 0.25em;
  color: var(--gold);
  margin-bottom: 16px;
}
.crescent {
  font-size: 18px;
}
.corps-lead {
  font-size: 21px;
  line-height: 1.55;
  color: var(--gold-pale);
  margin-bottom: 18px;
}
.corps-p {
  font-size: 17px;
  line-height: 1.6;
  color: var(--muted);
  margin-bottom: 28px;
}
.corps-stats-row {
  display: flex;
  gap: 24px;
  margin-bottom: 34px;
  padding: 18px 0;
  border-top: 1px solid var(--gold-border);
  border-bottom: 1px solid var(--gold-border);
}
.c-stat strong {
  display: block;
  font-family: var(--font-display);
  font-size: 20px;
  color: var(--gold);
}
.c-stat small {
  font-family: var(--font-sans);
  font-size: 9px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
}

/* SECTION 7: SATIRICAL CRM HIGHLIGHT */
.crm-intro-center {
  text-align: center;
  max-width: 860px;
  margin: 0 auto 60px;
}
.crm-subtitle {
  font-size: 20px;
  color: #554835;
  line-height: 1.5;
}
.crm-features-quad {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 48px;
}
.feature-box {
  background: #EFE6D5;
  border: 1px solid rgba(138, 114, 69, 0.25);
  padding: 30px;
  transition: all 0.3s;
}
.feature-box:hover {
  transform: translateY(-4px);
  border-color: var(--burgundy);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}
.box-icon {
  width: 48px;
  height: 48px;
  border-radius: 4px;
  background: rgba(100, 30, 43, 0.1);
  color: var(--burgundy);
  display: grid;
  place-content: center;
  margin-bottom: 20px;
}
.feature-box h3 {
  font-family: var(--font-display);
  font-size: 20px;
  color: var(--burgundy);
  margin: 0 0 12px;
}
.feature-box p {
  font-size: 15px;
  color: #5A4E3D;
  line-height: 1.55;
  margin: 0;
}
.crm-center-action {
  text-align: center;
}

/* SECTION 8: IMPERIAL STATS */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}
.stat-cell {
  text-align: center;
  padding: 30px 20px;
  border: 1px solid var(--gold-border);
  background: rgba(23, 19, 16, 0.6);
}
.stat-value {
  display: block;
  font-family: var(--font-display);
  font-size: clamp(38px, 4.5vw, 62px);
  font-weight: 700;
  color: var(--gold-bright);
  line-height: 1;
  margin-bottom: 12px;
}
.stat-label {
  font-family: var(--font-heading);
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold-pale);
  margin: 0 0 8px;
}
.stat-note {
  font-size: 13px;
  color: var(--muted);
  margin: 0;
}

/* SECTION 9: SATIRICAL ENDORSEMENTS */
.section-header-center {
  text-align: center;
  margin-bottom: 50px;
}
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}
.testimonial-card {
  background: var(--walnut-card);
  border: 1px solid var(--gold-border);
  padding: 36px 30px 30px;
  position: relative;
  display: flex;
  flex-direction: column;
}
.quote-mark {
  font-family: var(--font-display);
  font-size: 60px;
  line-height: 0.8;
  color: var(--gold);
  opacity: 0.4;
  margin-bottom: 12px;
}
.testimonial-text {
  font-family: var(--font-serif);
  font-size: 18px;
  line-height: 1.6;
  color: var(--parchment);
  margin: 0 0 28px;
  flex: 1;
}
.testimonial-author-block {
  padding-top: 18px;
  border-top: 1px solid rgba(185, 154, 91, 0.2);
}
.testimonial-author-block strong {
  display: block;
  font-family: var(--font-heading);
  font-size: 12px;
  letter-spacing: 0.12em;
  color: var(--gold-pale);
}
.testimonial-author-block span {
  display: block;
  font-size: 13px;
  color: var(--muted);
  margin: 4px 0 10px;
}
.cypher-stamp {
  font-family: var(--font-sans);
  font-size: 9px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold);
  border: 1px dashed var(--gold-border);
  padding: 4px 8px;
  width: max-content;
}

/* SECTION 10: FINAL CTA */
.final-cta-section {
  position: relative;
  padding: 130px max(24px, 8vw);
  background: var(--burgundy-dark);
  text-align: center;
  overflow: hidden;
}
.final-cta-bg {
  position: absolute;
  inset: 0;
  background-image: url('/images/palace-court.jpg');
  background-size: cover;
  background-position: center;
  filter: brightness(0.2) saturate(1.2);
}
.final-cta-content {
  position: relative;
  z-index: 2;
  max-width: 820px;
  margin: 0 auto;
}
.cta-tughra {
  font-size: 26px;
  color: var(--gold);
  margin-bottom: 18px;
  letter-spacing: 0.3em;
}
.cta-eyebrow {
  font-family: var(--font-heading);
  font-size: 10px;
  letter-spacing: 0.32em;
  color: var(--gold);
  margin-bottom: 16px;
}
.cta-heading {
  font-family: var(--font-display);
  font-size: clamp(36px, 5.2vw, 68px);
  color: var(--gold-pale);
  line-height: 1.1;
  margin: 0 0 20px;
}
.cta-sub {
  font-size: 21px;
  color: var(--parchment);
  line-height: 1.55;
  max-width: 660px;
  margin: 0 auto 36px;
  opacity: 0.9;
}
.cta-btn-group {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}
.btn-imperial.large {
  padding: 16px 36px;
  font-size: 12px;
}

/* Responsive Queries */
@media (max-width: 1100px) {
  .timeline-cards-grid,
  .sultans-cards-grid,
  .crm-features-quad,
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .testimonials-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 850px) {
  .manifesto-grid,
  .campaign-split,
  .corps-banner-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .hero-vertical-motto {
    display: none;
  }
  .court-hero {
    padding-bottom: 50px;
  }
}

@media (max-width: 600px) {
  .timeline-cards-grid,
  .sultans-cards-grid,
  .crm-features-quad,
  .stats-grid {
    grid-template-columns: 1fr;
  }
  .campaign-row-item {
    grid-template-columns: 50px 1fr;
  }
  .row-outcome {
    grid-column: 2;
  }
}
</style>
