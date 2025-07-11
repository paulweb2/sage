<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <ion-menu content-id="main-content" type="overlay">
        <ion-content>
          <ion-list id="inbox-list">
            <div class="sage-logo-wrapper">
              <img src="/sage-logo.png" alt="SAGE: Supporting Adolescent Girls' Education logo" class="sage-logo-img" />
            </div>
            <ion-menu-toggle :auto-hide="false" v-for="(p, i) in appPages" :key="i">
              <ion-item @click="selectedIndex = i" router-direction="root" :router-link="p.url" lines="none" :detail="false" class="hydrated" :class="{ selected: selectedIndex === i }">
                <ion-icon aria-hidden="true" slot="start" :ios="p.iosIcon" :md="p.mdIcon"></ion-icon>
                <ion-label>{{ p.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>

          <ion-list id="disability-categories">
            <ion-list-header>Disability Categories</ion-list-header>

            <ion-item v-for="(category, index) in disabilityCategories" lines="none" :key="index" @click="toggleSubmenu(index)">
              <ion-icon aria-hidden="true" slot="start" :ios="category.icon" :md="category.icon"></ion-icon>
              <ion-label>{{ category.title }}</ion-label>
              <ion-icon :icon="chevronDown" slot="end" :class="{ 'rotated': category.expanded }"></ion-icon>
            </ion-item>

            <!-- Submenu items -->
            <div v-for="(category, index) in disabilityCategories" :key="`submenu-${index}`" v-show="category.expanded">
              <ion-item v-for="subItem in category.subItems" :key="subItem.title" lines="none" class="submenu-item" router-direction="root" :router-link="subItem.url">
                <ion-label>{{ subItem.title }}</ion-label>
              </ion-item>
            </div>
          </ion-list>
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
import { ref } from 'vue';
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
} from 'ionicons/icons';

const selectedIndex = ref(0);
const appPages = [
  {
    title: 'Home',
    url: '/folder/Home',
    iosIcon: homeOutline,
    mdIcon: homeSharp,
  },
  {
    title: 'General Information',
    url: '/folder/General',
    iosIcon: informationCircleOutline,
    mdIcon: informationCircleSharp,
  },
  {
    title: 'Screening Tool',
    url: '/folder/Screening',
    iosIcon: accessibilityOutline,
    mdIcon: accessibilitySharp,
  },
  {
    title: 'Resources',
    url: '/folder/Resources',
    iosIcon: schoolOutline,
    mdIcon: schoolSharp,
  },
  {
    title: 'About',
    url: '/folder/About',
    iosIcon: peopleOutline,
    mdIcon: peopleSharp,
  },
];

const disabilityCategories = ref([
  {
    title: 'Physical Disabilities',
    icon: bodyOutline,
    expanded: false,
    subItems: [
      { title: 'Visual Impairments', url: '/disability/visual-impairments' },
      { title: 'Hearing Impairments', url: '/disability/hearing-impairments' },
      { title: 'Physical Mobility', url: '/disability/physical-mobility' },
      { title: 'Speech Difficulties', url: '/disability/speech-difficulties' },
    ]
  },
  {
    title: 'Cognition & Learning',
    icon: bulbOutline,
    expanded: false,
    subItems: [
      { title: 'Dyslexia', url: '/disability/dyslexia' },
      { title: 'Dyscalculia', url: '/disability/dyscalculia' },
      { title: 'ADHD', url: '/disability/adhd' },
      { title: 'Memory Issues', url: '/disability/memory-issues' },
    ]
  },
  {
    title: 'Communication & Interaction',
    icon: chatbubbleOutline,
    expanded: false,
    subItems: [
      { title: 'Autism Spectrum', url: '/disability/autism-spectrum' },
      { title: 'Social Anxiety', url: '/disability/social-anxiety' },
      { title: 'Language Barriers', url: '/disability/language-barriers' },
    ]
  },
  {
    title: 'Multiple Impairments',
    icon: medicalOutline,
    expanded: false,
    subItems: [
      { title: 'Complex Needs', url: '/disability/complex-needs' },
      { title: 'Combined Disabilities', url: '/disability/combined-disabilities' },
    ]
  },
]);

const toggleSubmenu = (index: number) => {
  disabilityCategories.value[index].expanded = !disabilityCategories.value[index].expanded;
};



const path = window.location.pathname.split('folder/')[1];
if (path !== undefined) {
  selectedIndex.value = appPages.findIndex((page) => page.title.toLowerCase() === path.toLowerCase());
}
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

.submenu-item {
  --padding-start: 30px;
  font-size: 14px;
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
  justify-content: center;
  align-items: center;
  padding: 0 0 16px 0;
}
.sage-logo-img {
  max-width: 140px;
  width: 100%;
  height: auto;
  display: block;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  background: white;
  margin-top: 0;
}
</style>
