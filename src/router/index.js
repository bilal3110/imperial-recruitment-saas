import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/admin/dashboard',
    component: () => import('@/pages/AdminPanel/dashboard.vue'),
    meta: { layout: 'admin' }
  },
  {
    path: '/admin/recruits',
    component: () => import('@/pages/AdminPanel/recruit.vue'),
    meta: { layout: 'admin' }
  },
  {
    path: '/admin/provinces',
    component: () => import('@/pages/AdminPanel/province.vue'),
    meta: { layout: 'admin' }
  },
  {
    path: '/',
    component: () => import('@/pages/Website/home.vue'),
    meta: { layout: 'website' }
  },
  {
    path: '/login',
    component: () => import('@/pages/Website/login.vue'),
    meta: { layout: 'website' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
