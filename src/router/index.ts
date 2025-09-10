import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/folder/Home'
  },
  {
    path: '/folder/:id',
    component: () => import ('../views/FolderPage.vue')
  },
  {
    path: '/disability/:id',
    component: () => import ('../views/DisabilityPage.vue')
  },
  {
    path: '/progress',
    component: () => import ('../views/ProgressPage.vue')
  },
  {
    path: '/needs/hearing',
    component: () => import ('../views/HearingNeedsPage.vue')
  },
  {
    path: '/working/:id',
    component: () => import ('../views/WorkingWithLearnersPage.vue')
  },

  {
    path: '/introduction',
    component: () => import ('../views/IntroductionPage.vue')
  },
  {
    path: '/working-with-learners',
    component: () => import ('../views/WorkingWithLearnersPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
