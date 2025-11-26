<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <ion-menu content-id="main-content" type="overlay">
        <ion-content>
          <ion-list id="inbox-list">
            <div class="sage-logo-wrapper">
              <img src="/sage-logo.svg" alt="SAGE logo" class="sage-logo-img" />
              <div class="sage-logo-text">Zimbabwe Disability<br>Toolkit</div>
            </div>
            <ion-menu-toggle :auto-hide="false" v-if="topHome">
              <ion-item @click="setActivePage('top', topHome.index)" router-direction="root" :router-link="topHome.page.url" lines="none" :detail="false" class="hydrated" :class="{ selected: activeSection === 'top' && activeIndex === topHome.index }">
                <ion-icon aria-hidden="true" slot="start" :ios="topHome.page.iosIcon" :md="topHome.page.mdIcon"></ion-icon>
                <ion-label>{{ topHome.page.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>

            <div class="menu-divider"></div>

            <ion-list id="working-categories">
              <ion-list-header>Overview of supporting learners with disabilities</ion-list-header>
              <ion-menu-toggle :auto-hide="false" v-for="(workingItem, index) in workingMenuItems" :key="workingItem.url">
                <ion-item
                  @click="setActivePage('working', index)"
                  router-direction="root"
                  :router-link="workingItem.url"
                  lines="none"
                  :detail="false"
                  class="hydrated category-item"
                  :class="{ selected: activeSection === 'working' && activeIndex === index }"
                >
                  <ion-icon aria-hidden="true" slot="start" :ios="workingItem.iosIcon" :md="workingItem.mdIcon"></ion-icon>
                  <ion-label>{{ workingItem.title }}</ion-label>
                </ion-item>
              </ion-menu-toggle>
            </ion-list>

            <div class="menu-divider"></div>

            <ion-list id="signposting-section" v-if="topRest.length">
              <ion-list-header>Screening and referring learners with disabilities</ion-list-header>

              <ion-menu-toggle :auto-hide="false" v-for="tp in topRest" :key="tp.index">
                <ion-item @click="setActivePage('top', tp.index)" router-direction="root" :router-link="tp.page.url" lines="none" :detail="false" class="hydrated" :class="{ selected: activeSection === 'top' && activeIndex === tp.index }">
                  <ion-icon aria-hidden="true" slot="start" :ios="tp.page.iosIcon" :md="tp.page.mdIcon"></ion-icon>
                  <ion-label>{{ tp.page.title }}</ion-label>
                </ion-item>
              </ion-menu-toggle>
            </ion-list>
          </ion-list>

          <ion-list id="disability-categories">
            <ion-list-header>Supporting individual learning needs</ion-list-header>

            <div v-for="(category, index) in disabilityCategories" :key="index">
              <!-- Main category item -->
              <ion-item lines="none" @click="handleCategoryClick(index)" class="category-item" router-direction="root" :class="{ selected: activeSection === 'bottom' && activeIndex === index }">
                <ion-icon aria-hidden="true" slot="start" :ios="category.icon" :md="category.icon"></ion-icon>
                <ion-label>{{ category.title }}</ion-label>
                <ion-icon v-if="category.subItems.length > 0" :icon="chevronDown" slot="end" :class="{ 'rotated': category.expanded }"></ion-icon>
              </ion-item>

              <!-- Submenu items -->
              <div v-show="category.expanded && category.subItems.length > 0" class="submenu-container">
                <ion-item v-for="subItem in category.subItems" :key="subItem.title" lines="none" class="submenu-item" @click="scrollToSection(subItem.anchor, index)">
                  <ion-label>{{ subItem.title }}</ion-label>
                </ion-item>
              </div>
            </div>
          </ion-list>

          <div class="menu-divider"></div>

          <div class="menu-bottom">
            <ion-menu-toggle :auto-hide="false" v-if="progressIndex !== -1">
              <ion-item @click="setActivePage('top', progressIndex)" router-direction="root" :router-link="progressUrl" lines="none" :detail="false" class="hydrated" :class="{ selected: activeSection === 'top' && activeIndex === progressIndex }">
                <ion-icon aria-hidden="true" slot="start" :ios="appPages[progressIndex].iosIcon" :md="appPages[progressIndex].mdIcon"></ion-icon>
                <ion-label>{{ appPages[progressIndex].title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </div>
        </ion-content>
      </ion-menu>
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>

<script setup lang="ts">
import {
  IonApp,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRouterOutlet,
  IonSplitPane,
} from '@ionic/vue';
import { ref, onMounted, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { scrollAnchorIntoView, storePendingAnchor, clearPendingAnchor } from '@/utils/anchorScroll';
import {
  homeOutline,
  homeSharp,
  accessibilityOutline,
  accessibilitySharp,
  schoolOutline,
  schoolSharp,
  peopleOutline,
  peopleSharp,
  settingsOutline,
  settingsSharp,
  chevronDown,
  eyeOutline,
  earOutline,
  bodyOutline,
  chatbubbleOutline,
  bulbOutline,
  medicalOutline,
  trophyOutline,
  trophySharp,
  chatboxEllipsesOutline,
  chatboxEllipsesSharp,
  mailOutline,
  mailSharp,
  handLeftOutline,
  handLeftSharp,
  bookOutline,
  bookSharp,
  constructOutline,
  constructSharp,
  navigateOutline,
  navigateSharp
} from 'ionicons/icons';

const route = useRoute();
const router = useRouter();
const activeSection = ref<'top' | 'bottom' | 'working'>('top');
const activeIndex = ref(0);
const workingMenuItems = [
  {
    title: 'Working in partnership',
    url: '/working/working-partnership',
    iosIcon: handLeftOutline,
    mdIcon: handLeftSharp,
  },
  {
    title: 'Language',
    url: '/working/working-language',
    iosIcon: bookOutline,
    mdIcon: bookSharp,
  },
  {
    title: 'Challenges and enablers',
    url: '/working/working-tensions',
    iosIcon: constructOutline,
    mdIcon: constructSharp,
  },
];
const appPages = [
  {
    title: 'Home and introduction',
    url: '/folder/Home',
    iosIcon: homeOutline,
    mdIcon: homeSharp,
  },
  {
    title: 'My certificate of participation',
    url: '/progress',
    iosIcon: trophyOutline,
    mdIcon: trophySharp,
  },
  {
    title: 'Signposting tool',
    url: '/folder/Screening',
    iosIcon: navigateOutline,
    mdIcon: navigateSharp,
  },
  {
    title: 'Contacts',
    url: '/folder/Contacts',
    iosIcon: mailOutline,
    mdIcon: mailSharp,
  },
  {
    title: 'Overview of supporting learners with disabilities',
    url: '/working-with-learners',
    iosIcon: peopleOutline,
    mdIcon: peopleSharp,
  },
];

const progressIndex = appPages.findIndex(page => page.title === 'My certificate of participation');
const progressUrl = progressIndex !== -1 ? appPages[progressIndex].url : '/progress';

const workingIndex = appPages.findIndex(page => page.title === 'Overview of supporting learners with disabilities');
const workingExpanded = ref(false);

const topHome = computed(() => appPages
  .map((page, index) => ({ page, index }))
  .find(({ page }) => page.url === '/folder/Home') || null
);

const topRest = computed(() => appPages
  .map((page, index) => ({ page, index }))
  .filter(({ page }) => page.title !== 'My certificate of participation' && page.url !== '/folder/Home' && page.title !== 'Overview of supporting learners with disabilities')
);

const topPages = computed(() => appPages
  .map((page, index) => ({ page, index }))
  .filter(({ page }) => page.title !== 'My certificate of participation' && page.title !== 'Overview of supporting learners with disabilities')
);

const createDisabilitySubItems = () => ([
  { title: 'Language', anchor: 'language' },
  { title: 'Understanding the learner', anchor: 'understanding' },
  { title: 'Challenges to learning', anchor: 'challenges' },
  { title: 'Enabling learning', anchor: 'enabling' },
  { title: 'Resources to support learning', anchor: 'resources' },
  { title: 'Case study', anchor: 'case-study' },
  { title: 'Reflective tasks', anchor: 'reflective-task' },
  { title: 'Quiz', anchor: 'knowledge-check' }
]);

const disabilityCategories = ref([
  {
    title: 'Visual needs',
    icon: eyeOutline,
    expanded: false,
    url: '/needs/visual',
    subItems: createDisabilitySubItems()
  },
  {
    title: 'Hearing needs',
    icon: earOutline,
    expanded: false,
    url: '/needs/hearing',
    subItems: createDisabilitySubItems()
  },
  {
    title: 'Physical and sensory needs',
    icon: bodyOutline,
    expanded: false,
    url: '/needs/physical-sensory',
    subItems: createDisabilitySubItems()
  },
  {
    title: 'Cognitive and intellectual needs',
    icon: bulbOutline,
    expanded: false,
    url: '/needs/cognitive-intellectual',
    subItems: createDisabilitySubItems()
  },
  {
    title: 'Speech and language needs',
    icon: chatboxEllipsesOutline,
    expanded: false,
    url: '/needs/speech-language',
    subItems: createDisabilitySubItems()
  },
  {
    title: 'Communication',
    icon: chatbubbleOutline,
    expanded: false,
    url: '/disability/communication',
    subItems: createDisabilitySubItems()
  },
  {
    title: 'Multiple disabilities',
    icon: medicalOutline,
    expanded: false,
    url: '/needs/multiple-disabilities',
    subItems: createDisabilitySubItems()
  },
]);

const toggleSubmenu = (index: number) => {
  disabilityCategories.value[index].expanded = !disabilityCategories.value[index].expanded;
};

const handleCategoryClick = (index: number) => {
  // Set this category as active
  setActivePage('bottom', index);

  // Close all other categories first (accordion behavior)
  disabilityCategories.value.forEach((category, i) => {
    category.expanded = i === index ? !category.expanded : false;
  });

  // Navigate to the category page
  const targetUrl = disabilityCategories.value[index].url;
  if (targetUrl) {
    router.push(targetUrl);
  }
};

const scrollToSection = async (anchor: string, categoryIndex: number) => {
  // Close the menu first
  const menuEl = document.querySelector('ion-menu') as any;
  if (menuEl && typeof menuEl.close === 'function') {
    try { await menuEl.close(); } catch {}
  }

  const currentPath = route.path;
  const targetPage = disabilityCategories.value[categoryIndex].url;

  if (currentPath !== targetPage) {
    console.log('[MenuScroll] Navigating to new page for anchor', { anchor, currentPath, targetPage });
    storePendingAnchor(anchor, targetPage);
    try {
      await router.push(targetPage);
      const didScroll = await scrollAnchorIntoView(anchor);
      if (didScroll) {
        clearPendingAnchor();
        console.log('[MenuScroll] Scrolled immediately after navigation', { anchor, targetPage });
      }
    } catch {
      window.location.href = `${targetPage}#${anchor}`;
    }
    return;
  }

  const didScroll = await scrollAnchorIntoView(anchor);
  console.log('[MenuScroll] Attempted scroll on current page', { anchor, didScroll });
  if (!didScroll) {
    setTimeout(() => {
      console.log('[MenuScroll] Retrying scroll after delay', { anchor });
      void scrollAnchorIntoView(anchor);
    }, 120);
  }
};

const setActivePage = (section: 'top' | 'bottom' | 'working', index: number) => {
  activeSection.value = section;
  activeIndex.value = index;
};

// General information has no expandable submenu; simple navigation via router-link

const handleWorkingClick = () => {
  if (workingExpanded.value) {
    workingExpanded.value = false;
    return;
  }
  if (workingIndex !== -1) {
    setActivePage('top', workingIndex);
  }
  router.push('/working-with-learners');
  workingExpanded.value = true;
};

const scrollToWorkingSection = async (anchor: string) => {
  const menu = document.querySelector('ion-menu') as any;
  if (menu && typeof menu.close === 'function') {
    try { await menu.close(); } catch {}
  }

  const targetPage = '/working-with-learners';
  const currentPath = route.path;

  if (currentPath !== targetPage) {
    console.log('[MenuScroll] Navigating to working page for anchor', { anchor });
    storePendingAnchor(anchor, targetPage);
    try {
      await router.push(targetPage);
      const didScroll = await scrollAnchorIntoView(anchor);
      if (didScroll) {
        clearPendingAnchor();
        console.log('[MenuScroll] Scrolled immediately after navigation (working section)', { anchor });
      }
    } catch {
      window.location.href = `${targetPage}#${anchor}`;
    }
    return;
  }

  const didScroll = await scrollAnchorIntoView(anchor);
  console.log('[MenuScroll] Attempted scroll on working page', { anchor, didScroll });
  if (!didScroll) {
    setTimeout(() => {
      console.log('[MenuScroll] Retrying scroll for working page', { anchor });
      void scrollAnchorIntoView(anchor);
    }, 120);
  }
};

onMounted(() => {
  updateActiveState();
});

// Watch for route changes to update active state
watch(() => route.path, () => {
  updateActiveState();
});

const updateActiveState = () => {
  const path = route.path;
  workingExpanded.value = (path === '/working-with-learners');
  
  // Check if we're on a top-level page by matching the full URL
  const topIndex = appPages.findIndex((page) => page.url === path);
  if (topIndex !== -1) {
    setActivePage('top', topIndex);
    return;
  }
  
  // Check if we're on one of the working menu pages
  const workingMenuIndex = workingMenuItems.findIndex(item => item.url === path);
  if (workingMenuIndex !== -1) {
    setActivePage('working', workingMenuIndex);
    return;
  }
  
  // Check if we're on a disability page
  const bottomIndex = disabilityCategories.value.findIndex((category) => 
    category.url === path
  );
  if (bottomIndex !== -1) {
    setActivePage('bottom', bottomIndex);
    return;
  }
  
  // Default to Home if no match found
  setActivePage('top', 0);
};
</script>

<style scoped>
ion-menu ion-content {
  --background: var(--ion-item-background, var(--ion-background-color, #fff));
}

ion-menu.md ion-content {
  --padding-start: 8px;
  --padding-end: 8px;
  --padding-top: 20px;
  --padding-bottom: 20px;
}

ion-menu.md ion-list {
  padding: 20px 0;
}

ion-menu.md ion-note {
  margin-bottom: 30px;
}

ion-menu.md ion-list-header,
ion-menu.md ion-note {
  padding-left: 10px;
}

ion-menu.md ion-list#inbox-list {
  border-bottom: 1px solid var(--ion-background-color-step-150, #d7d8da);
}

ion-menu.md ion-list#inbox-list ion-list-header {
  font-size: 22px;
  font-weight: 600;
  min-height: 20px;
}

ion-menu.md ion-list#disability-categories ion-list-header {
  font-size: 16px;
  margin-bottom: 18px;
  color: #757575;
  min-height: 26px;
}

ion-menu.md ion-list#working-categories ion-list-header {
  font-size: 16px;
  margin-bottom: 18px;
  color: #757575;
  min-height: 26px;
  font-weight: normal;
}

ion-menu.md ion-list#signposting-section ion-list-header {
  font-size: 16px;
  margin-bottom: 18px;
  color: #757575;
  min-height: 26px;
  font-weight: normal;
}

ion-menu.md ion-item {
  --padding-start: 10px;
  --padding-end: 10px;
  border-radius: 4px;
}

ion-menu.md ion-item.selected {
  --background: rgba(var(--ion-color-primary-rgb), 0.14);
}

ion-menu.md ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.md ion-item ion-icon {
  color: #616e7e;
}

ion-menu.md ion-item ion-label {
  font-weight: 500;
}

.category-item {
  --background: transparent;
  transition: background-color 0.2s ease;
}

.category-item:hover {
  --background: rgba(var(--ion-color-primary-rgb), 0.05);
}

.submenu-container {
  background: rgba(var(--ion-color-light-rgb), 0.3);
  border-radius: 0 0 8px 8px;
  margin: 0 8px 8px 8px;
  overflow: hidden;
}

.submenu-item {
  --padding-start: 30px;
  --padding-end: 16px;
  font-size: 14px;
  --background: transparent;
  margin: 0;
  border-radius: 0;
}

.submenu-item:hover {
  --background: rgba(var(--ion-color-primary-rgb), 0.1);
}

.rotated {
  transform: rotate(180deg);
  transition: transform 0.3s ease;
}

ion-menu.ios ion-content {
  --padding-bottom: 20px;
}

ion-menu.ios ion-list {
  padding: 20px 0 0 0;
}

ion-menu.ios ion-note {
  line-height: 24px;
  margin-bottom: 20px;
}

ion-menu.ios ion-item {
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 50px;
}

ion-menu.ios ion-item.selected ion-icon {
  color: var(--ion-color-primary);
}

ion-menu.ios ion-item ion-icon {
  font-size: 24px;
  color: #73849a;
}

ion-menu.ios ion-list#disability-categories ion-list-header {
  margin-bottom: 8px;
}

ion-menu.ios ion-list#working-categories ion-list-header {
  margin-bottom: 8px;
  font-weight: normal;
}

ion-menu.ios ion-list#signposting-section ion-list-header {
  margin-bottom: 8px;
  font-weight: normal;
}

ion-menu.ios ion-list-header,
ion-menu.ios ion-note {
  padding-left: 16px;
  padding-right: 16px;
}

ion-menu.ios ion-note {
  margin-bottom: 8px;
}

ion-note {
  display: inline-block;
  font-size: 16px;
  color: var(--ion-color-medium-shade);
}

ion-item.selected {
  --color: var(--ion-color-primary);
}

.sage-logo-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 8px 16px 8px;
  gap: 12px;
}
.sage-logo-img {
  width: 96px;
  height: 96px;
  display: block;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  background: transparent;
  margin-top: 0;
  flex-shrink: 0;
}
.sage-logo-text {
  font-size: 24px;
  font-weight: 700;
  line-height: 1.15;
  letter-spacing: .01em;
  font-family: var(--ion-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol');
  color: var(--ion-text-color, #1e1e1e);
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: break-word;
  text-align: left;
  max-width: 220px;
}
.menu-divider {
  height: 1px;
  background: var(--ion-background-color-step-150, #d7d8da);
  margin: 8px 0;
}
</style>
