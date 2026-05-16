<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import TopNav from '@/components/AdminPanel/TopNav.vue'
import Sidebar from '@/components/AdminPanel/Sidebar.vue'

const sidebarVisible = ref(true)

function updateSidebarState() {
  sidebarVisible.value = window.innerWidth >= 900
}

function toggleSidebar() {
  sidebarVisible.value = !sidebarVisible.value
}

onMounted(() => {
  updateSidebarState()
  window.addEventListener('resize', updateSidebarState)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSidebarState)
})
</script>

<template>
  <div class="admin-layout">
    <Sidebar :class="[{ 'sidebar--active': sidebarVisible }, 'sidebar']" />
    <div
      v-if="sidebarVisible"
      class="sidebar-backdrop"
      @click="sidebarVisible = false"
    ></div>

    <div class="main-area">
      <TopNav class="topnav" @toggle-sidebar="toggleSidebar" />

      <main class="content">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  overflow: hidden;
}

.sidebar {
  width: 240px;
  flex-shrink: 0;
}

.sidebar-backdrop {
  display: none;
}

.main-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 240px;
}

.topnav {
  height: 68px;
  flex-shrink: 0;
}

.content {
  flex: 1;
  min-height: 0;
  padding: 20px;
  margin-top: 68px;
  overflow-y: auto;
}

@media (max-width: 900px) {
  .topnav {
    left: 0;
    right: 0;
  }
}

@media (max-width: 900px) {
  .admin-layout {
    overflow: visible;
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    transform: translateX(-100%);
    transition: transform 0.28s ease;
    z-index: 150;
    box-shadow: 4px 0 32px rgba(0, 0, 0, 0.8);
  }

  .sidebar.sidebar--active {
    transform: translateX(0);
  }

  .sidebar-backdrop {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    z-index: 100;
  }

  .main-area {
    margin-left: 0;
    min-height: 100vh;
  }

  .content {
    margin-top: 68px;
    padding: 16px;
  }
}
</style>