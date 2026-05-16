<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue';
import Janesaries  from '@/components/AdminPanel/Janesaries.vue';
defineOptions({
    layout: AdminLayout
})
</script>
<template>
    <div class="recruit-page">
        <Janesaries />
    </div>   
</template>