<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

import AdminLayout from "@/layouts/AdminLayout.vue";
import WebsiteLayout from "@/layouts/WebsiteLayout.vue";

const route = useRoute();

const layout = computed(() => {
  return route.meta.layout === "admin" ? AdminLayout : WebsiteLayout;
});
</script>

<template>
  <main>
    <div class="pattern"></div>
    <component :is="layout">
      <router-view />
    </component>
  </main>
</template>

<style scoped>
.pattern {
  position: absolute;
  inset: 0;
  opacity: 0.07;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cg fill='none' stroke='%23C9972A' stroke-width='0.8'%3E%3Cpolygon points='40,4 52,16 76,16 60,30 68,52 40,38 12,52 20,30 4,16 28,16'/%3E%3Cpolygon points='40,14 49,22 65,22 53,32 59,47 40,38 21,47 27,32 15,22 31,22'/%3E%3Ccircle cx='40' cy='40' r='6'/%3E%3C/g%3E%3C/svg%3E");
  background-size: 80px 80px;
  animation: patternDrift 60s linear infinite;
  z-index: -1;
}
</style>
