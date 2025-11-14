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

            <!-- Introduction as a simple link (no subitems) -->
            <ion-menu-toggle :auto-hide="false">
              <ion-item router-direction="root" router-link="/introduction" lines="none" :detail="false" class="hydrated" :class="{ selected: route.path === '/introduction' }">
                <ion-icon aria-hidden="true" slot="start" :ios="informationCircleOutline" :md="informationCircleSharp"></ion-icon>
                <ion-label>General Information</ion-label>
              </ion-item>
            </ion-menu-toggle>

            <div class="menu-divider"></div>

            <ion-list id="working-categories">
              <ion-list-header>Working with learners with disabilities</ion-list-header>
              <ion-menu-toggle :auto-hide="false">
                <ion-item router-direction="root" :router-link="'/working/working-partnership'" lines="none" :detail="false" class="hydrated category-item">
                  <ion-icon aria-hidden="true" slot="start" :ios="handLeftOutline" :md="handLeftSharp"></ion-icon>
                  <ion-label>Working in partnership</ion-label>
                </ion-item>
              </ion-menu-toggle>
              <ion-menu-toggle :auto-hide="false">
                <ion-item router-direction="root" :router-link="'/working/working-language'" lines="none" :detail="false" class="hydrated category-item">
                  <ion-icon aria-hidden="true" slot="start" :ios="bookOutline" :md="bookSharp"></ion-icon>
                  <ion-label>Language</ion-label>
                </ion-item>
              </ion-menu-toggle>
              <ion-menu-toggle :auto-hide="false">
                <ion-item router-direction="root" :router-link="'/working/working-tensions'" lines="none" :detail="false" class="hydrated category-item">
                  <ion-icon aria-hidden="true" slot="start" :ios="constructOutline" :md="constructSharp"></ion-icon>
                  <ion-label>Challenges and enablers</ion-label>
                </ion-item>
              </ion-menu-toggle>
            </ion-list>

            <div class="menu-divider"></div>

            <ion-menu-toggle :auto-hide="false" v-for="tp in topRest" :key="tp.index">
              <ion-item @click="setActivePage('top', tp.index)" router-direction="root" :router-link="tp.page.url" lines="none" :detail="false" class="hydrated" :class="{ selected: activeSection === 'top' && activeIndex === tp.index }">
                <ion-icon aria-hidden="true" slot="start" :ios="tp.page.iosIcon" :md="tp.page.mdIcon"></ion-icon>
                <ion-label>{{ tp.page.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>

          <ion-list id="disability-categories">
            <ion-list-header>Disability Categories</ion-list-header>

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
  informationCircleOutline,
  informationCircleSharp,
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
const activeSection = ref<'top' | 'bottom'>('top');
const activeIndex = ref(0);
const appPages = [
  {
    title: 'Home',
    url: '/folder/Home',
    iosIcon: homeOutline,
    mdIcon: homeSharp,
  },
  {
    title: 'My Progress',
    url: '/progress',
    iosIcon: trophyOutline,
    mdIcon: trophySharp,
  },
  {
    title: 'General Information',
    url: '/introduction',
    iosIcon: informationCircleOutline,
    mdIcon: informationCircleSharp,
  },
  {
    title: 'Signposting Tool',
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
    title: 'Working with learners with disabilities',
    url: '/working-with-learners',
    iosIcon: peopleOutline,
    mdIcon: peopleSharp,
  },
];

const progressIndex = appPages.findIndex(page => page.title === 'My Progress');
const progressUrl = progressIndex !== -1 ? appPages[progressIndex].url : '/progress';

const introductionIndex = appPages.findIndex(page => page.url === '/introduction');

const workingIndex = appPages.findIndex(page => page.title === 'Working with learners with disabilities');
const workingExpanded = ref(false);

const topHome = computed(() => appPages
  .map((page, index) => ({ page, index }))
  .find(({ page }) => page.title === 'Home') || null
);

const topRest = computed(() => appPages
  .map((page, index) => ({ page, index }))
  .filter(({ page }) => page.title !== 'My Progress' && page.url !== '/introduction' && page.title !== 'Home' && page.title !== 'Working with learners with disabilities')
);

const topPages = computed(() => appPages
  .map((page, index) => ({ page, index }))
  .filter(({ page }) => page.title !== 'My Progress' && page.url !== '/introduction' && page.title !== 'Working with learners with disabilities')
);

const disabilityCategories = ref([
  {
    title: 'Visual Needs',
    icon: eyeOutline,
    expanded: false,
    url: '/needs/visual',
    subItems: [
      { title: 'Language', anchor: 'language' },
      { title: 'Understanding the Learner', anchor: 'understanding' },
      { title: 'Challenges to Learning', anchor: 'challenges' },
      { title: 'Enabling Learning', anchor: 'enabling' },
      { title: 'Resources to Support Learning', anchor: 'resources' },
      { title: 'Case Study', anchor: 'case-study' },
      { title: 'Reflective Task', anchor: 'reflective-task' },
      { title: 'Quiz', anchor: 'knowledge-check' }
    ]
  },
  {
    title: 'Hearing Needs',
    icon: earOutline,
    expanded: false,
    url: '/needs/hearing',
    subItems: [
      { title: 'Language', anchor: 'language' },
      { title: 'Understanding the Learner', anchor: 'understanding' },
      { title: 'Challenges to Learning', anchor: 'challenges' },
      { title: 'Enabling Learning', anchor: 'enabling' },
      { title: 'Resources to Support Learning', anchor: 'resources' },
      { title: 'Case Study', anchor: 'case-study' },
      { title: 'Reflective Task', anchor: 'reflective-task' },
      { title: 'Quiz', anchor: 'knowledge-check' }
    ]
  },
  {
    title: 'Physical and Sensory Needs',
    icon: bodyOutline,
    expanded: false,
    url: '/needs/physical-sensory',
    subItems: [
      { title: 'Language', anchor: 'language' },
      { title: 'Understanding the Learner', anchor: 'understanding' },
      { title: 'Challenges to Learning', anchor: 'challenges' },
      { title: 'Enabling Learning', anchor: 'enabling' },
      { title: 'Resources to Support Learning', anchor: 'resources' },
      { title: 'Case Study', anchor: 'case-study' },
      { title: 'Reflective Task', anchor: 'reflective-task' },
      { title: 'Quiz', anchor: 'knowledge-check' }
    ]
  },
  {
    title: 'Cognitive and Intellectual Needs',
    icon: bulbOutline,
    expanded: false,
    url: '/needs/cognitive-intellectual',
    subItems: [
      { title: 'Language', anchor: 'language' },
      { title: 'Understanding the Learner', anchor: 'understanding' },
      { title: 'Challenges to Learning', anchor: 'challenges' },
      { title: 'Enabling Learning', anchor: 'enabling' },
      { title: 'Resources to Support Learning', anchor: 'resources' },
      { title: 'Case Study', anchor: 'case-study' },
      { title: 'Reflective Task', anchor: 'reflective-task' },
      { title: 'Quiz', anchor: 'knowledge-check' }
    ]
  },
  {
    title: 'Speech and Language Needs',
    icon: chatboxEllipsesOutline,
    expanded: false,
    url: '/needs/speech-language',
    subItems: [
      { title: 'Language', anchor: 'language' },
      { title: 'Understanding the Learner', anchor: 'understanding' },
      { title: 'Challenges to Learning', anchor: 'challenges' },
      { title: 'Enabling Learning', anchor: 'enabling' },
      { title: 'Resources to Support Learning', anchor: 'resources' },
      { title: 'Case Study', anchor: 'case-study' },
      { title: 'Reflective Task', anchor: 'reflective-task' },
      { title: 'Quiz', anchor: 'knowledge-check' }
    ]
  },
  {
    title: 'Communication',
    icon: chatbubbleOutline,
    expanded: false,
    url: '/disability/communication',
    subItems: [
      { title: 'Language', anchor: 'language' },
      { title: 'Understanding the Learner', anchor: 'understanding' },
      { title: 'Challenges to Learning', anchor: 'challenges' },
      { title: 'Enabling Learning', anchor: 'enabling' },
      { title: 'Resources to Support Learning', anchor: 'resources' },
      { title: 'Case Study', anchor: 'case-study' },
      { title: 'Reflective Task', anchor: 'reflective-task' },
      { title: 'Quiz', anchor: 'knowledge-check' }
    ]
  },
  {
    title: 'Multiple Disabilities',
    icon: medicalOutline,
    expanded: false,
    url: '/needs/multiple-disabilities',
    subItems: [
      { title: 'Language', anchor: 'language' },
      { title: 'Understanding the Learner', anchor: 'understanding' },
      { title: 'Challenges to Learning', anchor: 'challenges' },
      { title: 'Enabling Learning', anchor: 'enabling' },
      { title: 'Resources to Support Learning', anchor: 'resources' },
      { title: 'Case Study', anchor: 'case-study' },
      { title: 'Reflective Task', anchor: 'reflective-task' },
      { title: 'Quiz', anchor: 'knowledge-check' }
    ]
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

const setActivePage = (section: 'top' | 'bottom', index: number) => {
  activeSection.value = section;
  activeIndex.value = index;
};

// General Information has no expandable submenu; simple navigation via router-link

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
