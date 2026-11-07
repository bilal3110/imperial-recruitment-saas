<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { Menu, X, ArrowUpRight, Volume2, VolumeX, Sparkles } from 'lucide-vue-next';
import { toggleImperialAudio, getAudioState, playSealClick } from '@/utils/audio';

const route = useRoute();
const open = ref(false);
const scrolled = ref(false);
const isAudioOn = ref(false);

const links = [
  { path: '/', label: 'The Empire' },
  { path: '/history', label: 'History' },
  { path: '/sultans', label: 'Sultans' },
  { path: '/campaigns', label: 'Campaigns' },
  { path: '/janissaries', label: 'The Janissaries' },
  { path: '/features', label: 'Imperial Administration' }
];

function onScroll() {
  scrolled.value = window.scrollY > 40;
}

function handleAudioToggle() {
  isAudioOn.value = toggleImperialAudio();
}

function replayIntro() {
  playSealClick();
  window.dispatchEvent(new CustomEvent('janissaries:replay-intro'));
  open.value = false;
}

function onNavClick() {
  playSealClick();
  open.value = false;
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true });
  isAudioOn.value = getAudioState();
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
});
</script>

<template>
  <header :class="['imperial-nav-header', { scrolled, open }]">
    <!-- Brand Mark -->
    <RouterLink class="nav-brand" to="/" @click="onNavClick">
      <div class="brand-crest">
        <svg class="crest-svg" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="18" stroke="#B99A5B" stroke-width="1.2" stroke-dasharray="2 2"/>
          <path d="M24 13 C16 14 14 24 22 28 C14 27 11 17 19 12 C20.5 11 22.5 11.5 24 13 Z" fill="#B99A5B"/>
          <polygon points="25,20 26,21.5 28,21.5 26.5,22.7 27,24.5 25.5,23.3 24,24.5 24.5,22.7 23,21.5 25,21.5" fill="#B99A5B"/>
        </svg>
      </div>
      <div class="brand-titles">
        <span class="brand-main">JANISSARIES</span>
        <span class="brand-sub">Devlet-i Aliyye · Imperial Registry</span>
      </div>
    </RouterLink>

    <!-- Desktop Navigation Links -->
    <nav class="desktop-nav" aria-label="Imperial Navigation">
      <RouterLink 
        v-for="link in links" 
        :key="link.path" 
        :to="link.path"
        class="nav-item"
        :class="{ active: route.path === link.path }"
        @click="onNavClick"
      >
        <span>{{ link.label }}</span>
        <span class="indicator"></span>
      </RouterLink>
    </nav>

    <!-- Right Actions -->
    <div class="nav-actions">
      <!-- Audio Toggle Button -->
      <button 
        class="action-icon-btn" 
        :class="{ active: isAudioOn }" 
        @click="handleAudioToggle"
        :title="isAudioOn ? 'Mute ambient sound' : 'Enable imperial court ambiance'"
        :aria-label="isAudioOn ? 'Mute ambient sound' : 'Enable imperial court ambiance'"
      >
        <Volume2 v-if="isAudioOn" :size="16" />
        <VolumeX v-else :size="16" />
      </button>

      <!-- Replay Intro Gate Button -->
      <button 
        class="action-icon-btn replay-btn" 
        @click="replayIntro" 
        title="Experience court entrance doors again"
        aria-label="Replay court entrance sequence"
      >
        <Sparkles :size="15" />
        <span class="replay-label">Gates</span>
      </button>

      <!-- Imperial Access CRM CTA -->
      <RouterLink class="access-cta" to="/demo" @click="onNavClick">
        <span class="access-text">Imperial Access</span>
        <ArrowUpRight :size="14" class="access-icon" />
      </RouterLink>

      <!-- Mobile Menu Toggle Button -->
      <button 
        class="mobile-menu-btn" 
        :aria-expanded="open" 
        aria-label="Toggle navigation drawer"
        @click="open = !open"
      >
        <X v-if="open" :size="24" />
        <Menu v-else :size="24" />
      </button>
    </div>

    <!-- Mobile Drawer -->
    <div class="mobile-drawer" :class="{ visible: open }">
      <div class="mobile-drawer-header">
        <span class="drawer-title">✦ Imperial Directory ✦</span>
      </div>
      <div class="mobile-nav-links">
        <RouterLink 
          v-for="link in links" 
          :key="link.path" 
          :to="link.path"
          class="mobile-item"
          :class="{ active: route.path === link.path }"
          @click="onNavClick"
        >
          <span>{{ link.label }}</span>
          <span class="mobile-arrow">›</span>
        </RouterLink>
      </div>

      <div class="mobile-footer-actions">
        <RouterLink class="mobile-cta-btn" to="/demo" @click="onNavClick">
          <span>Enter Imperial Access (CRM)</span>
          <ArrowUpRight :size="16" />
        </RouterLink>

        <div class="mobile-util-row">
          <button class="mobile-util-btn" @click="replayIntro">
            <Sparkles :size="14" />
            <span>Replay Palace Gates</span>
          </button>
          <button class="mobile-util-btn" @click="handleAudioToggle">
            <Volume2 v-if="isAudioOn" :size="14" />
            <VolumeX v-else :size="14" />
            <span>{{ isAudioOn ? 'Mute' : 'Court Audio' }}</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.imperial-nav-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 84px;
  z-index: 9980;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 clamp(20px, 4.5vw, 64px);
  background: linear-gradient(180deg, rgba(11, 8, 7, 0.95) 0%, rgba(23, 19, 16, 0.6) 75%, transparent 100%);
  border-bottom: 1px solid transparent;
  transition: all 0.35s var(--ease-imperial);
}

.imperial-nav-header.scrolled {
  height: 68px;
  background: rgba(18, 14, 12, 0.96);
  border-bottom: 1px solid var(--gold-border);
  backdrop-filter: blur(12px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.6);
}

/* Brand */
.nav-brand {
  display: flex;
  align-items: center;
  gap: 14px;
}
.brand-crest {
  width: 36px;
  height: 36px;
  transition: transform 0.4s var(--ease-imperial);
}
.nav-brand:hover .brand-crest {
  transform: rotate(25deg) scale(1.08);
}
.crest-svg {
  width: 100%;
  height: 100%;
}

.brand-titles {
  display: flex;
  flex-direction: column;
}
.brand-main {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: var(--gold-pale);
  line-height: 1.1;
}
.brand-sub {
  font-family: var(--font-sans);
  font-size: 8px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--muted);
  margin-top: 3px;
}

/* Desktop Links */
.desktop-nav {
  display: flex;
  align-items: center;
  gap: clamp(16px, 1.8vw, 32px);
  margin: 0 auto 0 clamp(24px, 3vw, 48px);
}

.nav-item {
  position: relative;
  font-family: var(--font-heading);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--muted);
  padding: 8px 4px;
  transition: color 0.25s var(--ease-imperial);
}
.nav-item:hover {
  color: var(--gold-pale);
}
.nav-item.active {
  color: var(--gold-bright);
}

.nav-item .indicator {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--gold-bright), transparent);
  transform: scaleX(0);
  transition: transform 0.3s var(--ease-imperial);
}
.nav-item:hover .indicator,
.nav-item.active .indicator {
  transform: scaleX(1);
}

/* Right Actions */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.action-icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 36px;
  height: 36px;
  border-radius: 4px;
  border: 1px solid var(--gold-border);
  background: rgba(23, 19, 16, 0.6);
  color: var(--parchment);
  transition: all 0.25s var(--ease-imperial);
}
.action-icon-btn:hover {
  border-color: var(--gold);
  color: var(--gold-bright);
  background: var(--gold-dim);
}
.action-icon-btn.active {
  border-color: var(--gold-bright);
  color: var(--gold-bright);
}

.replay-btn {
  width: auto;
  padding: 0 12px;
}
.replay-label {
  font-family: var(--font-heading);
  font-size: 9px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.access-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: var(--burgundy);
  border: 1px solid var(--gold);
  color: var(--gold-pale);
  font-family: var(--font-heading);
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 700;
  transition: all 0.25s var(--ease-imperial);
}
.access-cta:hover {
  background: var(--gold);
  color: var(--ink);
  border-color: var(--gold-bright);
  box-shadow: 0 0 20px var(--burgundy-glow);
}
.access-icon {
  transition: transform 0.25s var(--ease-imperial);
}
.access-cta:hover .access-icon {
  transform: translate(2px, -2px);
}

.mobile-menu-btn {
  display: none;
  background: none;
  border: none;
  color: var(--parchment);
  padding: 6px;
}

/* Mobile Drawer */
.mobile-drawer {
  display: none;
}

@media (max-width: 1080px) {
  .desktop-nav {
    display: none;
  }
  .replay-btn {
    display: none;
  }
  .mobile-menu-btn {
    display: block;
  }
  
  .mobile-drawer {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 68px;
    left: 0;
    right: 0;
    bottom: 0;
    background: #140F0D;
    border-top: 1px solid var(--gold-border);
    padding: 24px 24px 40px;
    transform: translateY(-100%);
    opacity: 0;
    pointer-events: none;
    transition: transform 0.35s var(--ease-imperial), opacity 0.3s;
    overflow-y: auto;
  }
  .mobile-drawer.visible {
    transform: translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .mobile-drawer-header {
    text-align: center;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--gold-border);
    margin-bottom: 16px;
  }
  .drawer-title {
    font-family: var(--font-heading);
    font-size: 10px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--gold);
  }

  .mobile-nav-links {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .mobile-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 12px;
    border-bottom: 1px solid rgba(185, 154, 91, 0.12);
    font-family: var(--font-heading);
    font-size: 13px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--parchment);
  }
  .mobile-item.active {
    color: var(--gold-bright);
    background: var(--gold-dim);
  }
  .mobile-arrow {
    font-size: 18px;
    color: var(--gold);
  }

  .mobile-footer-actions {
    margin-top: auto;
    padding-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .mobile-cta-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 16px;
    background: var(--gold);
    color: var(--ink);
    font-family: var(--font-heading);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  .mobile-util-row {
    display: flex;
    gap: 12px;
  }
  .mobile-util-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px;
    border: 1px solid var(--gold-border);
    background: rgba(255, 255, 255, 0.03);
    color: var(--muted);
    font-family: var(--font-heading);
    font-size: 10px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
}
</style>
