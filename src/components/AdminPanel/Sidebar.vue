<script setup>
import logoUrl from "@/assets/images/logo.png";
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  activePath: {
    type: String,
    default: "/admin/dashboard",
  },
});

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "⊞" },
  { href: "/admin/recruits", label: "Recruits", icon: "⚔" },
  { href: "/admin/provinces", label: "Provinces", icon: "☾" },
  { href: "/login", label: "Leave the Porte", icon: "✦" },
];

const route = useRoute();
const isActive = (href) => {
  const path = route && route.path ? route.path : props.activePath;
  return path === href;
};
</script>

<template>
  <aside class="sidebar">
    <div class="sidebar__pattern" aria-hidden="true"></div>

    <div class="sidebar__crescent" aria-hidden="true">
      <svg width="180" height="90" viewBox="0 0 180 90" fill="none">
        <ellipse
          cx="90"
          cy="0"
          rx="90"
          ry="90"
          fill="url(#crescentGrad)"
          opacity="0.07"
        />
        <defs>
          <radialGradient id="crescentGrad" cx="50%" cy="0%">
            <stop offset="0%" stop-color="#C9972A" />
            <stop offset="100%" stop-color="transparent" />
          </radialGradient>
        </defs>
      </svg>
    </div>

    <div class="sidebar__logo">
      <div class="sidebar__logo-frame">
        <img :src="logoUrl" alt="Janissaries CRM Logo" width="38" height="38" />
      </div>
      <div class="sidebar__logo-text">
        <span class="sidebar__logo-name">Janissaries</span>
        <span class="sidebar__logo-sub">CRM · Imperial Suite</span>
      </div>
    </div>

    <div class="sidebar__ornament" aria-hidden="true">
      <span class="sidebar__ornament-line"></span>
      <span class="sidebar__ornament-gem">✦</span>
      <span class="sidebar__ornament-line"></span>
    </div>

    <nav class="sidebar__nav" role="navigation" aria-label="Main navigation">
      <ul class="sidebar__nav-list">
        <li
          v-for="(item, i) in navItems"
          :key="item.href"
          class="sidebar__nav-item"
          :style="{ '--delay': `${i * 0.07}s` }"
        >
          <router-link 
            :to="item.href"
            class="sidebar__nav-link"
            :class="{ 'sidebar__nav-link--active': isActive(item.href) }"
            :aria-current="isActive(item.href) ? 'page' : undefined"
          >
            <span class="sidebar__nav-icon" aria-hidden="true">{{
              item.icon
            }}</span>
            <span class="sidebar__nav-label">{{ item.label }}</span>
            <span class="sidebar__nav-indicator" aria-hidden="true"></span>
          </router-link>
        </li>
      </ul>
    </nav>

    <div class="sidebar__seal">
      <span class="sidebar__seal-text">دولت عليه عثمانيه</span>
      <span class="sidebar__seal-year">Est. 1299</span>
    </div>
  </aside>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;600;700&family=EB+Garamond:ital,wght@0,400;1,400&display=swap");

.sidebar {
  --gold: #c9972a;
  --gold-light: #e8b84b;
  --gold-pale: #f5e6c0;
  --gold-dim: rgba(201, 151, 42, 0.15);
  --gold-border: rgba(201, 151, 42, 0.25);
  --ink: #1a1208;
  --ink-deep: #0f0b05;
  --parchment: #f7f0dc;
  --parchment-muted: #c8b98a;
  --text-muted: rgba(247, 240, 220, 0.45);
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 240px;
  height: 100vh;
  background-color: var(--ink-deep);
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
  box-shadow:
    4px 0 32px rgba(0, 0, 0, 0.7),
    1px 0 0 var(--gold-border);
  font-family: "Cinzel", serif;
  transition: transform 0.28s ease;
}

@media (max-width: 900px) {
  .sidebar {
    transform: translateX(-100%);
    z-index: 150;
  }

  .sidebar.sidebar--active {
    transform: translateX(0);
  }
}

.sidebar__pattern {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  opacity: 0.045;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cg fill='none' stroke='%23C9972A' stroke-width='0.7'%3E%3Cpolygon points='30,3 39,12 57,12 45,22 51,39 30,28 9,39 15,22 3,12 21,12'/%3E%3Cpolygon points='30,10 37,17 49,17 40,24 44,35 30,28 16,35 20,24 11,17 23,17'/%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/svg%3E");
  background-size: 60px 60px;
}

.sidebar__crescent {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
  z-index: 0;
}

.sidebar__logo,
.sidebar__ornament,
.sidebar__nav,
.sidebar__seal {
  position: relative;
  z-index: 1;
}

.sidebar__logo {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 28px 24px 22px;
  border-bottom: 1px solid var(--gold-border);
}

.sidebar__logo-frame {
  width: 46px;
  height: 46px;
  border: 1px solid var(--gold-border);
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(201, 151, 42, 0.08);
  flex-shrink: 0;
  position: relative;
}

.sidebar__logo-frame::before,
.sidebar__logo-frame::after {
  content: "";
  position: absolute;
  width: 8px;
  height: 8px;
  border-color: var(--gold);
  border-style: solid;
  opacity: 0.7;
}
.sidebar__logo-frame::before {
  top: -1px;
  left: -1px;
  border-width: 1px 0 0 1px;
}
.sidebar__logo-frame::after {
  bottom: -1px;
  right: -1px;
  border-width: 0 1px 1px 0;
}

.sidebar__logo-name {
  display: block;
  font-family: "Cinzel Decorative", serif;
  font-size: 12px;
  font-weight: 700;
  color: var(--gold);
  letter-spacing: 0.05em;
  line-height: 1;
}

.sidebar__logo-sub {
  display: block;
  font-family: "Cinzel", serif;
  font-size: 9px;
  letter-spacing: 0.2em;
  color: var(--text-muted);
  text-transform: uppercase;
  margin-top: 4px;
}

.sidebar__ornament {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 24px;
}

.sidebar__ornament-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--gold-border));
}
.sidebar__ornament-line:last-child {
  background: linear-gradient(90deg, var(--gold-border), transparent);
}

.sidebar__ornament-gem {
  font-size: 10px;
  color: var(--gold);
  opacity: 0.5;
}

.sidebar__nav {
  flex: 1;
  padding: 4px 16px;
  overflow-y: auto;
  scrollbar-width: none;
}
.sidebar__nav::-webkit-scrollbar {
  display: none;
}

.sidebar__nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.sidebar__nav-item {
  opacity: 0;
  animation: navFadeIn 0.5s var(--delay, 0s) forwards;
}

@keyframes navFadeIn {
  from {
    opacity: 0;
    transform: translateX(-8px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.sidebar__nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 14px;
  text-decoration: none;
  border-radius: 2px;
  border: 1px solid transparent;
  position: relative;
  transition:
    background 0.25s,
    border-color 0.25s;
  overflow: hidden;
}

.sidebar__nav-link::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(201, 151, 42, 0.06), transparent);
  opacity: 0;
  transition: opacity 0.25s;
}

.sidebar__nav-link:hover::before {
  opacity: 1;
}
.sidebar__nav-link:hover {
  border-color: var(--gold-border);
}

.sidebar__nav-link--active {
  background: rgba(201, 151, 42, 0.1);
  border-color: var(--gold-border) !important;
}
.sidebar__nav-link--active::before {
  opacity: 1 !important;
}

.sidebar__nav-indicator {
  position: absolute;
  left: 0;
  top: 20%;
  bottom: 20%;
  width: 2px;
  background: var(--gold);
  border-radius: 0 2px 2px 0;
  opacity: 0;
  transition:
    opacity 0.25s,
    top 0.25s,
    bottom 0.25s;
}

.sidebar__nav-link--active .sidebar__nav-indicator,
.sidebar__nav-link:hover .sidebar__nav-indicator {
  opacity: 1;
  top: 15%;
  bottom: 15%;
}

.sidebar__nav-icon {
  font-size: 14px;
  color: var(--gold);
  opacity: 0.6;
  width: 20px;
  text-align: center;
  flex-shrink: 0;
  transition: opacity 0.2s;
}

.sidebar__nav-link--active .sidebar__nav-icon,
.sidebar__nav-link:hover .sidebar__nav-icon {
  opacity: 1;
}

.sidebar__nav-label {
  font-family: "Cinzel", serif;
  font-size: 11.5px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--parchment-muted);
  transition: color 0.25s;
}

.sidebar__nav-link--active .sidebar__nav-label,
.sidebar__nav-link:hover .sidebar__nav-label {
  color: var(--gold-pale);
}

.sidebar__seal {
  padding: 18px 24px;
  border-top: 1px solid var(--gold-border);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.sidebar__seal-text {
  font-family: "EB Garamond", serif;
  font-size: 13px;
  color: var(--gold);
  opacity: 0.45;
  letter-spacing: 0.08em;
}

.sidebar__seal-year {
  font-family: "Cinzel", serif;
  font-size: 9px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--text-muted);
}
</style>
