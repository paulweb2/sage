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
    path: '/needs/physical-sensory',
    component: () => import ('../views/PhysicalSensoryNeedsPage.vue')
  },
  {
    path: '/needs/visual',
    component: () => import ('../views/VisualNeedsPage.vue')
  },
  {
    path: '/needs/cognitive-intellectual',
    component: () => import ('../views/CognitiveIntellectualNeedsPage.vue')
  },
  {
    path: '/needs/speech-language',
    component: () => import ('../views/SpeechLanguageNeedsPage.vue')
  },
  {
    path: '/needs/multiple-disabilities',
    component: () => import ('../views/MultipleDisabilitiesPage.vue')
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
