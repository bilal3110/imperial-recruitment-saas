<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue';
import KPI from '@/components/AdminPanel/KPI.vue'
import RecruitTable from '@/components/AdminPanel/RecruitTable.vue'
defineOptions({
    layout: AdminLayout
})
</script>
<template>
    <div class="dashboard">
        <KPI class="KPI" />
        <RecruitTable class="recruit-table" />
    </div>
</template>