import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Imperial/Home.vue'),
    meta: { layout: 'website' }
  },
  { 
    path: '/history', 
    name: 'History',
    component: () => import('@/pages/Imperial/History.vue'), 
    meta: { layout: 'website' } 
  },
  { 
    path: '/sultans', 
    name: 'Sultans',
    component: () => import('@/pages/Imperial/Sultans.vue'), 
    meta: { layout: 'website' } 
  },
  { 
    path: '/campaigns', 
    name: 'Campaigns',
    component: () => import('@/pages/Imperial/Campaigns.vue'), 
    meta: { layout: 'website' } 
  },
  { 
    path: '/janissaries', 
    name: 'Janissaries',
    component: () => import('@/pages/Imperial/Janissaries.vue'), 
    meta: { layout: 'website' } 
  },
  { 
    path: '/features', 
    name: 'Administration',
    component: () => import('@/pages/Imperial/Administration.vue'), 
    meta: { layout: 'website' } 
  },
  { 
    path: '/demo', 
    name: 'Demo',
    component: () => import('@/pages/Imperial/Demo.vue'), 
    meta: { layout: 'website' } 
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Website/login.vue'),
    meta: { layout: 'website' }
  },
  {
    path: '/admin/dashboard',
    name: 'AdminDashboard',
    component: () => import('@/pages/AdminPanel/dashboard.vue'),
    meta: { layout: 'admin' }
  },
  {
    path: '/admin/recruits',
    name: 'AdminRecruits',
    component: () => import('@/pages/AdminPanel/recruit.vue'),
    meta: { layout: 'admin' }
  },
  {
    path: '/admin/provinces',
    name: 'AdminProvinces',
    component: () => import('@/pages/AdminPanel/province.vue'),
    meta: { layout: 'admin' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    return { top: 0, behavior: 'smooth' }
  }
})

export default router
