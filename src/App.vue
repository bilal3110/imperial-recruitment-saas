<script setup>
import { computed, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import AdminLayout from '@/layouts/AdminLayout.vue';
import WebsiteLayout from '@/layouts/WebsiteLayout.vue';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const route = useRoute();
const layout = computed(() => route.meta.layout === 'admin' ? AdminLayout : WebsiteLayout);

let lenis = null;
let tickerFn = null;

onMounted(() => {
  // Only activate Lenis if user does NOT prefer reduced motion
  if (!window.matchMedia || !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    try {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true
      });

      lenis.on('scroll', ScrollTrigger.update);

      tickerFn = (time) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);
    } catch (e) {
      console.warn('Lenis smooth scrolling not active:', e);
    }
  }
});

onUnmounted(() => {
  if (tickerFn) {
    gsap.ticker.remove(tickerFn);
  }
  if (lenis) {
    lenis.destroy();
  }
});
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>
