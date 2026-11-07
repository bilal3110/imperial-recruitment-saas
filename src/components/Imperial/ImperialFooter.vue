<script setup>
import { RouterLink } from 'vue-router';
import { ArrowUpRight } from 'lucide-vue-next';

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>

<template>
  <footer class="imperial-footer">
    <div class="footer-bg"></div>
    <div class="footer-overlay"></div>

    <div class="footer-content">
      <!-- Top Row: Royal Decree & Brand -->
      <div class="footer-top">
        <div class="footer-brand">
          <div class="brand-badge">
            <span>✦</span>
            <span>DEVLET-İ ALİYYE-İ OSMÂNİYYE</span>
            <span>✦</span>
          </div>
          <h2 class="footer-logo">JANISSARIES</h2>
          <p class="footer-motto">
            "Devlet-i Ebed-Müddet" — The Eternal State, 1299–1922.
          </p>
          <p class="footer-desc">
            An imperial portal uniting historical storytelling with a fictional military administration system engineered for the Sublime Porte.
          </p>
        </div>

        <div class="footer-cta-block">
          <span class="cta-eyebrow">The Sultan’s Court Awaits</span>
          <h3>Order the provinces.<br>Inspect the roll.</h3>
          <RouterLink class="btn-imperial gold" to="/demo">
            <span>Launch Imperial Access</span>
            <ArrowUpRight :size="15" />
          </RouterLink>
        </div>
      </div>

      <!-- Divider -->
      <div class="imperial-divider">
        <span class="emblem">☾ ✦ ☽</span>
      </div>

      <!-- Links Grid -->
      <div class="footer-links-grid">
        <div class="link-column">
          <h4 class="col-title">Historical Archive</h4>
          <ul>
            <li><RouterLink to="/history">Six Centuries Overview</RouterLink></li>
            <li><RouterLink to="/history#frontier-years">The Frontier Years (1299)</RouterLink></li>
            <li><RouterLink to="/history#recovery-constantinople">Conquest of 1453</RouterLink></li>
            <li><RouterLink to="/history#age-of-suleiman">The Age of Suleiman</RouterLink></li>
            <li><RouterLink to="/history#modernization-final-years">Modernization & 1922</RouterLink></li>
          </ul>
        </div>

        <div class="link-column">
          <h4 class="col-title">Sultans & Dynasts</h4>
          <ul>
            <li><RouterLink to="/sultans#osman-i">Osman I (The Founder)</RouterLink></li>
            <li><RouterLink to="/sultans#mehmed-ii">Mehmed II (Fatih)</RouterLink></li>
            <li><RouterLink to="/sultans#selim-i">Selim I (Yavuz)</RouterLink></li>
            <li><RouterLink to="/sultans#suleiman-i">Suleiman I (Kanuni)</RouterLink></li>
            <li><RouterLink to="/sultans#abdulhamid-ii">Abdulhamid II (Ulu Hakan)</RouterLink></li>
          </ul>
        </div>

        <div class="link-column">
          <h4 class="col-title">Campaigns Archive</h4>
          <ul>
            <li><RouterLink to="/campaigns#kosovo-1389">Kosovo (1389)</RouterLink></li>
            <li><RouterLink to="/campaigns#constantinople-1453">Constantinople (1453)</RouterLink></li>
            <li><RouterLink to="/campaigns#mohacs-1526">Mohács (1526)</RouterLink></li>
            <li><RouterLink to="/campaigns#vienna-1529">First Siege of Vienna (1529)</RouterLink></li>
            <li><RouterLink to="/campaigns#vienna-1683">Second Siege of Vienna (1683)</RouterLink></li>
          </ul>
        </div>

        <div class="link-column">
          <h4 class="col-title">Imperial CRM & System</h4>
          <ul>
            <li><RouterLink to="/features">Product Architecture</RouterLink></li>
            <li><RouterLink to="/janissaries">The Janissary Corps</RouterLink></li>
            <li><RouterLink to="/demo">Interactive Dashboard</RouterLink></li>
            <li><RouterLink to="/admin/dashboard">Divan-ı Hümayun Admin</RouterLink></li>
            <li><RouterLink to="/admin/provinces">Provincial Intelligence</RouterLink></li>
          </ul>
        </div>
      </div>

      <!-- Editorial & Satire Notice -->
      <div class="disclaimer-banner">
        <p class="disclaimer-text">
          <strong>HISTORICAL & EDITORIAL DISTINCTION:</strong> The historical storytelling across this publication is grounded in the documented history of the Ottoman Empire (1299–1922). The recruitment management platform, loyalty metrics, and software interfaces are creative fictional and satirical reconstructions. No claims are made that automated cloud software existed in sixteenth-century Topkapi Palace.
        </p>
      </div>

      <!-- Bottom Bar -->
      <div class="footer-bottom">
        <p class="copyright">
          © 2026 Janissaries Imperial Registry. Public domain historical artworks sourced from Topkapi Palace Museum, National Gallery London, and Wikimedia Commons.
        </p>
        <button class="back-to-top" @click="scrollToTop">
          <span>Back to Court</span>
          <span>↑</span>
        </button>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.imperial-footer {
  position: relative;
  background: var(--night);
  color: var(--parchment);
  padding: 100px max(24px, 8vw) 40px;
  overflow: hidden;
  border-top: 1px solid var(--gold-border);
}

.footer-bg {
  position: absolute;
  inset: 0;
  background-image: url('/images/palace-court.jpg');
  background-size: cover;
  background-position: center bottom;
  filter: brightness(0.18) contrast(1.2);
  transform: scale(1.05);
}

.footer-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(11, 8, 7, 0.95) 0%,
    rgba(23, 19, 16, 0.9) 50%,
    rgba(11, 8, 7, 0.98) 100%
  );
}

.footer-content {
  position: relative;
  z-index: 2;
  max-width: 1300px;
  margin: 0 auto;
}

.footer-top {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 60px;
  align-items: center;
}

.brand-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-heading);
  font-size: 9px;
  letter-spacing: 0.28em;
  color: var(--gold);
  margin-bottom: 14px;
}

.footer-logo {
  font-family: var(--font-display);
  font-size: clamp(32px, 4vw, 52px);
  font-weight: 900;
  letter-spacing: 0.18em;
  color: var(--gold-pale);
  margin: 0 0 12px;
}

.footer-motto {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 19px;
  color: var(--gold);
  margin: 0 0 12px;
}

.footer-desc {
  font-size: 16px;
  color: var(--muted);
  max-width: 540px;
  margin: 0;
  line-height: 1.6;
}

.footer-cta-block {
  background: rgba(36, 27, 24, 0.75);
  border: 1px solid var(--gold-border);
  padding: 32px;
  backdrop-filter: blur(8px);
}
.cta-eyebrow {
  display: block;
  font-family: var(--font-heading);
  font-size: 9px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 10px;
}
.footer-cta-block h3 {
  font-family: var(--font-display);
  font-size: 26px;
  line-height: 1.25;
  color: var(--gold-pale);
  margin: 0 0 24px;
}

.footer-links-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  margin: 50px 0;
}

.col-title {
  font-family: var(--font-heading);
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--gold);
  margin: 0 0 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(185, 154, 91, 0.2);
}

.link-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.link-column a {
  font-family: var(--font-serif);
  font-size: 16px;
  color: var(--muted);
  transition: color 0.25s var(--ease-imperial);
}
.link-column a:hover {
  color: var(--gold-pale);
  padding-left: 4px;
}

.disclaimer-banner {
  background: rgba(100, 30, 43, 0.15);
  border-left: 3px solid var(--gold);
  padding: 18px 24px;
  margin: 40px 0 30px;
}
.disclaimer-text {
  font-size: 13px;
  color: var(--parchment);
  margin: 0;
  line-height: 1.6;
  opacity: 0.88;
}
.disclaimer-text strong {
  color: var(--gold);
  letter-spacing: 0.1em;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  border-top: 1px solid rgba(185, 154, 91, 0.15);
  gap: 20px;
  flex-wrap: wrap;
}

.copyright {
  font-family: var(--font-sans);
  font-size: 11px;
  color: var(--muted-dark);
  margin: 0;
  letter-spacing: 0.05em;
}

.back-to-top {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-heading);
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold);
  padding: 6px 12px;
  border: 1px solid var(--gold-border);
  transition: all 0.25s;
}
.back-to-top:hover {
  border-color: var(--gold);
  background: var(--gold-dim);
  color: var(--gold-pale);
}

@media (max-width: 900px) {
  .footer-top {
    grid-template-columns: 1fr;
    gap: 36px;
  }
  .footer-links-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 550px) {
  .footer-links-grid {
    grid-template-columns: 1fr;
  }
}
</style>
