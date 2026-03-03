import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { registerSW } from 'virtual:pwa-register'

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

// Removed dark mode CSS imports

/* Theme variables */
import './theme/variables.css';

type OfflineCacheStatus = {
  timestamp: string
  requestedVideos: string[]
  cachedVideos: string[]
  omittedVideos: string[]
  fullyOffline: boolean
}

const OFFLINE_STATUS_EVENT = 'sage-offline-status'

const publishOfflineStatus = (status: OfflineCacheStatus) => {
  localStorage.setItem('sage-offline-cache-status', JSON.stringify(status))
  window.dispatchEvent(new CustomEvent(OFFLINE_STATUS_EVENT, { detail: status }))
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', (event) => {
    const data = event.data as { type?: string; payload?: OfflineCacheStatus } | undefined
    if (data?.type === 'OFFLINE_CACHE_STATUS' && data.payload) {
      publishOfflineStatus(data.payload)
    }
  })

  navigator.serviceWorker.ready.then((registration) => {
    registration.active?.postMessage({ type: 'GET_OFFLINE_CACHE_STATUS' })
  }).catch(() => {
    // Ignore readiness errors; app should still bootstrap.
  })
}

registerSW({ immediate: true })

const app = createApp(App)
  .use(IonicVue)
  .use(router);

router.isReady().then(() => {
  app.mount('#app');
});
