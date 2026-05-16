<script setup>
import { ref } from 'vue'
import ProfileUrl from "@/assets/images/profile.jpg";
const emit = defineEmits(['toggle-sidebar'])
const props = defineProps({
  userName:   { type: String, default: 'Sultan Mehmet' },
  userRole:   { type: String, default: 'Badshah e Jahan' },
  avatarUrl:  { type: String, default: ProfileUrl },
  pageTitle:  { type: String, default: 'Dashboard' },
})

const notifCount  = ref(3)
const dropOpen    = ref(false)
const toggleDrop  = () => (dropOpen.value = !dropOpen.value)

const onBlur = () => setTimeout(() => (dropOpen.value = false), 150)
</script>

<template>
  <header class="topnav">

    <div class="topnav__pattern" aria-hidden="true"></div>

    <div class="topnav__left">
      <button class="topnav__menu-btn" type="button" @click="emit('toggle-sidebar')" aria-label="Toggle sidebar">
        ☰
      </button>
      <span class="topnav__crescent" aria-hidden="true">☽</span>
      <div>
        <p class="topnav__breadcrumb">Sublime Porte · Admin</p>
        <h1 class="topnav__title">{{ pageTitle }}</h1>
      </div>
    </div>

    <div class="topnav__right">

      <button class="topnav__icon-btn" aria-label="Notifications">
        <span class="topnav__bell" aria-hidden="true">☾</span>
        <span v-if="notifCount" class="topnav__badge">{{ notifCount }}</span>
      </button>

      <span class="topnav__vdivider" aria-hidden="true"></span>

      <div class="topnav__user" @click="toggleDrop" @blur="onBlur" tabindex="0" role="button" :aria-expanded="dropOpen">
        <div class="topnav__avatar-frame">
          <img :src="avatarUrl" alt="User avatar" width="32" height="32" class="topnav__avatar" />
        </div>
        <div class="topnav__user-info">
          <span class="topnav__user-name">{{ userName }}</span>
          <span class="topnav__user-role">{{ userRole }}</span>
        </div>
        <span class="topnav__chevron" :class="{ 'topnav__chevron--open': dropOpen }" aria-hidden="true">▾</span>

        <transition name="drop">
          <ul v-if="dropOpen" class="topnav__dropdown" role="menu">
            <li role="menuitem"><a href="/admin/profile"  class="topnav__drop-item">⚔ &nbsp; My Profile</a></li>
            <li role="menuitem"><a href="/admin/settings" class="topnav__drop-item">⚙ &nbsp; Settings</a></li>
            <li class="topnav__drop-divider" role="separator"></li>
            <li role="menuitem"><a href="/logout"         class="topnav__drop-item topnav__drop-item--danger">✦ &nbsp; Leave the Porte</a></li>
          </ul>
        </transition>
      </div>

    </div>

    <div class="topnav__border" aria-hidden="true"></div>
  </header>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Cinzel:wght@400;600;700&family=EB+Garamond:ital,wght@0,400;1,400&display=swap');

.topnav {
  --gold:          #C9972A;
  --gold-light:    #E8B84B;
  --gold-pale:     #F5E6C0;
  --gold-border:   rgba(201, 151, 42, 0.22);
  --gold-dim:      rgba(201, 151, 42, 0.08);
  --ink:           #1A1208;
  --ink-deep:      #0F0B05;
  --parchment:     #F7F0DC;
  --parchment-muted: #C8B98A;
  --text-muted:    rgba(247, 240, 220, 0.4);
  --danger:        #8B1A1A;

  position: fixed;
  top: 0;
  left: 240px; 
  right: 0;
  height: 68px;
  background: var(--ink-deep);
  display: flex;
  align-items: center;
  padding: 0 28px;
  gap: 20px;
  z-index: 100;
  overflow: visible;
}


.topnav__pattern {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cg fill='none' stroke='%23C9972A' stroke-width='0.7'%3E%3Cpolygon points='30,3 39,12 57,12 45,22 51,39 30,28 9,39 15,22 3,12 21,12'/%3E%3Cpolygon points='30,10 37,17 49,17 40,24 44,35 30,28 16,35 20,24 11,17 23,17'/%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/svg%3E");
  background-size: 60px 60px;
}


.topnav__border {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, var(--gold-border) 20%, var(--gold-border) 80%, transparent 100%);
}

.topnav__left {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-shrink: 0;
}

.topnav__crescent {
  font-size: 22px;
  color: var(--gold);
  opacity: 0.55;
  line-height: 1;
}

.topnav__breadcrumb {
  font-family: 'Cinzel', serif;
  font-size: 9px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin: 0 0 2px;
}

.topnav__title {
  font-family: 'Cinzel Decorative', serif;
  font-size: 15px;
  font-weight: 700;
  color: var(--gold-pale);
  letter-spacing: 0.05em;
  margin: 0;
  line-height: 1;
}

.topnav__search {
  flex: 1;
  max-width: 380px;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;
}

.topnav__search-icon {
  position: absolute;
  left: 14px;
  font-size: 14px;
  color: var(--gold);
  opacity: 0.45;
  pointer-events: none;
}

.topnav__search-input {
  width: 100%;
  background: var(--gold-dim);
  border: 1px solid var(--gold-border);
  color: var(--parchment);
  font-family: 'EB Garamond', serif;
  font-size: 15px;
  font-style: italic;
  padding: 8px 16px 8px 38px;
  outline: none;
  border-radius: 1px;
  transition: border-color 0.25s, background 0.25s;
}

.topnav__search-input::placeholder {
  color: var(--text-muted);
  font-style: italic;
}

.topnav__search-input:focus {
  border-color: rgba(201, 151, 42, 0.55);
  background: rgba(201, 151, 42, 0.11);
}

.topnav__right {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
  margin-left: auto;
}

.topnav__menu-btn {
  display: none;
  border: 1px solid transparent;
  background: transparent;
  color: var(--gold);
  font-size: 20px;
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 1px;
  transition: background 0.2s, border-color 0.2s;
}

.topnav__menu-btn:hover {
  border-color: var(--gold-border);
  background: var(--gold-dim);
}

@media (max-width: 900px) {
  .topnav__menu-btn {
    display: inline-flex;
  }

  .topnav {
    padding: 0 16px;
    gap: 12px;
  }

  .topnav__title {
    font-size: 14px;
  }

  .topnav__breadcrumb {
    font-size: 8px;
  }
}

@media (max-width: 900px) {
  .topnav {
    left: 0;
    right: 0;
    padding: 0 16px;
  }

  .topnav__menu-btn {
    display: inline-flex;
  }

  .topnav__breadcrumb {
    font-size: 8px;
  }

  .topnav__title {
    font-size: 14px;
  }

  .topnav__right {
    gap: 10px;
  }
}

.topnav__icon-btn {
  position: relative;
  background: none;
  border: 1px solid transparent;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 1px;
  transition: border-color 0.2s, background 0.2s;
}

.topnav__icon-btn:hover {
  border-color: var(--gold-border);
  background: var(--gold-dim);
}

.topnav__bell {
  font-size: 16px;
  color: var(--gold);
  opacity: 0.6;
}

.topnav__badge {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 15px;
  height: 15px;
  background: var(--danger);
  border: 1px solid var(--ink-deep);
  border-radius: 50%;
  font-family: 'Cinzel', serif;
  font-size: 8px;
  font-weight: 700;
  color: var(--gold-pale);
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.topnav__vdivider {
  width: 1px;
  height: 28px;
  background: var(--gold-border);
}

.topnav__user {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 10px;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 1px;
  position: relative;
  transition: border-color 0.2s, background 0.2s;
  user-select: none;
}

.topnav__user:hover,
.topnav__user:focus {
  border-color: var(--gold-border);
  background: var(--gold-dim);
  outline: none;
}

.topnav__avatar-frame {
  width: 36px;
  height: 36px;
  position: relative;
  flex-shrink: 0;
}

.topnav__avatar-frame::before,
.topnav__avatar-frame::after {
  content: '';
  position: absolute;
  width: 7px;
  height: 7px;
  border-color: var(--gold);
  border-style: solid;
  opacity: 0.7;
  z-index: 1;
}
.topnav__avatar-frame::before {
  top: -1px; left: -1px;
  border-width: 1px 0 0 1px;
}
.topnav__avatar-frame::after {
  bottom: -1px; right: -1px;
  border-width: 0 1px 1px 0;
}

.topnav__avatar {
  width: 36px;
  height: 36px;
  object-fit: cover;
  display: block;
  filter: sepia(20%) contrast(1.05);
}

.topnav__user-info {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.topnav__user-name {
  font-family: 'Cinzel', serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--gold-pale);
  line-height: 1;
}

.topnav__user-role {
  font-family: 'EB Garamond', serif;
  font-size: 11px;
  font-style: italic;
  color: var(--text-muted);
  line-height: 1;
}

.topnav__chevron {
  font-size: 11px;
  color: var(--gold);
  opacity: 0.5;
  transition: transform 0.25s;
}
.topnav__chevron--open {
  transform: rotate(180deg);
  opacity: 0.9;
}

.topnav__dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  width: 200px;
  background: var(--ink-deep);
  border: 1px solid var(--gold-border);
  list-style: none;
  padding: 6px 0;
  margin: 0;
  z-index: 200;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.7);
}

.topnav__dropdown::before {
  content: '';
  position: absolute;
  top: 0; left: 10%; right: 10%;
  height: 1px;
  background: var(--gold);
  opacity: 0.5;
}

.topnav__drop-item {
  display: block;
  padding: 9px 18px;
  font-family: 'Cinzel', serif;
  font-size: 10.5px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--parchment-muted);
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
}

.topnav__drop-item:hover {
  background: var(--gold-dim);
  color: var(--gold-pale);
}

.topnav__drop-item--danger {
  color: rgba(201, 80, 80, 0.7);
}
.topnav__drop-item--danger:hover {
  background: rgba(139, 26, 26, 0.2);
  color: #E07070;
}

.topnav__drop-divider {
  height: 1px;
  background: var(--gold-border);
  margin: 6px 12px;
}

.drop-enter-active,
.drop-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}
.drop-enter-from,
.drop-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>