<script setup>
import ImperialNav from "@/components/Imperial/ImperialNav.vue";
import ImperialFooter from "@/components/Imperial/ImperialFooter.vue";
</script>
<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="imperial-shell">
    <ImperialNav />
    <main id="main"><slot /></main>
    <ImperialFooter />
  </div>
</template>
