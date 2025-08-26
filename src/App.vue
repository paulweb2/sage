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
              <ion-item @click="setActivePage('top', i)" router-direction="root" :router-link="p.url" lines="none" :detail="false" class="hydrated" :class="{ selected: activeSection === 'top' && activeIndex === i }">
                <ion-icon aria-hidden="true" slot="start" :ios="p.iosIcon" :md="p.mdIcon"></ion-icon>
                <ion-label>{{ p.title }}</ion-label>
              </ion-item>
            </ion-menu-toggle>
          </ion-list>

          <ion-list id="disability-categories">
            <ion-list-header>Disability Categories</ion-list-header>

            <div v-for="(category, index) in disabilityCategories" :key="index">
              <!-- Main category item -->
              <ion-item lines="none" @click="handleCategoryClick(index)" class="category-item" router-direction="root" :router-link="category.url" :class="{ selected: activeSection === 'bottom' && activeIndex === index }">
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
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
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
} from 'ionicons/icons';

const route = useRoute();
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
    title: 'Visual Needs',
    icon: bodyOutline,
    expanded: false,
    url: '/disability/physical-disabilities',
    subItems: [
      { title: 'Language', anchor: 'language' },
      { title: 'Understanding the Learner', anchor: 'understanding' },
      { title: 'Challenges to Learning', anchor: 'challenges' },
      { title: 'Enabling Learning', anchor: 'enabling' },
      { title: 'Resources to Support Learning', anchor: 'resources' },
      { title: 'Case Study', anchor: 'case-study' },
      { title: 'Reflective Task', anchor: 'reflective-task' },
      { title: 'Knowledge Check', anchor: 'knowledge-check' },

    ]
  },
  {
    title: 'Hearing Needs',
    icon: earOutline,
    expanded: false,
    url: '/disability/hearing-needs',
    subItems: [
      { title: 'Language', anchor: 'language' },
      { title: 'Understanding the Learner', anchor: 'understanding' },
      { title: 'Challenges to Learning', anchor: 'challenges' },
      { title: 'Enabling Learning', anchor: 'enabling' },
      { title: 'Resources to Support Learning', anchor: 'resources' },
      { title: 'Case Study', anchor: 'case-study' },
      { title: 'Reflective Task', anchor: 'reflective-task' },
      { title: 'Knowledge Check', anchor: 'knowledge-check' }
    ]
  },
  {
    title: 'Physical and Sensory Needs',
    icon: bodyOutline,
    expanded: false,
    url: '/disability/physical-sensory-needs',
    subItems: []
  },
  {
    title: 'Cognitive and Intellectual Needs',
    icon: bulbOutline,
    expanded: false,
    url: '/disability/cognitive-intellectual-needs',
    subItems: []
  },
  {
    title: 'Speech and Language Needs',
    icon: chatbubbleOutline,
    expanded: false,
    url: '/disability/speech-language-needs',
    subItems: []
  },
  {
    title: 'Communication',
    icon: chatbubbleOutline,
    expanded: false,
    url: '/disability/communication',
    subItems: [
      { title: 'Quiz', anchor: 'knowledge-check' },
    ]
  },
  {
    title: 'Multiple Disabilities',
    icon: medicalOutline,
    expanded: false,
    url: '/disability/multiple-disabilities',
    subItems: []
  },
]);

const toggleSubmenu = (index: number) => {
  disabilityCategories.value[index].expanded = !disabilityCategories.value[index].expanded;
};

const handleCategoryClick = (index: number) => {
  // Set this category as active
  setActivePage('bottom', index);
  
  // If the clicked category is already expanded, collapse it and scroll to top
  if (disabilityCategories.value[index].expanded) {
    disabilityCategories.value[index].expanded = false;
    // Scroll to top of the page
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  } else {
    // Close all other categories first (accordion behavior)
    disabilityCategories.value.forEach((category, i) => {
      if (i !== index) {
        category.expanded = false;
      }
    });
    // Expand the clicked category
    disabilityCategories.value[index].expanded = true;
  }
};

const scrollToSection = (anchor: string, categoryIndex: number) => {
  // Close the menu first
  const menu = document.querySelector('ion-menu');
  if (menu) {
    menu.close();
  }
  
  // Get the current page and target page
  const currentPath = window.location.pathname;
  const targetPage = disabilityCategories.value[categoryIndex].url;
  
  // If we're not on the target page, navigate there first
  if (currentPath !== targetPage) {
    // Navigate to the target page
    window.location.href = targetPage;
    
    // Store the anchor to scroll to after navigation
    sessionStorage.setItem('scrollToAnchor', anchor);
    
    // Listen for the page to load and then scroll
    window.addEventListener('load', () => {
      setTimeout(() => {
        const element = document.getElementById(anchor);
        if (element) {
          const cardHeader = element.querySelector('ion-card-header');
          const targetElement = cardHeader || element;
          
          targetElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
        // Clear the stored anchor
        sessionStorage.removeItem('scrollToAnchor');
      }, 500);
    }, { once: true });
  } else {
    // We're already on the correct page, just scroll to the section
    setTimeout(() => {
      const element = document.getElementById(anchor);
      if (element) {
        const cardHeader = element.querySelector('ion-card-header');
        const targetElement = cardHeader || element;
        
        targetElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }, 300);
  }
};

const setActivePage = (section: 'top' | 'bottom', index: number) => {
  activeSection.value = section;
  activeIndex.value = index;
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
