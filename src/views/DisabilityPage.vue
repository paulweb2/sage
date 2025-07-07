<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ getPageTitle() }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ getPageTitle() }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <ion-card>
          <ion-card-header>
            <ion-card-title>{{ getPageTitle() }}</ion-card-title>
            <ion-card-subtitle>{{ getCategoryTitle() }}</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <div v-if="disabilityContent">
              <h3>Overview</h3>
              <p>{{ disabilityContent.overview }}</p>
              
              <h3>Key Considerations</h3>
              <ul>
                <li v-for="consideration in disabilityContent.considerations" :key="consideration">
                  {{ consideration }}
                </li>
              </ul>
              
              <h3>Support Strategies</h3>
              <ul>
                <li v-for="strategy in disabilityContent.strategies" :key="strategy">
                  {{ strategy }}
                </li>
              </ul>
              
              <h3>Resources</h3>
              <ion-list>
                <ion-item v-for="resource in disabilityContent.resources" :key="resource.title">
                  <ion-icon :icon="resource.icon" slot="start"></ion-icon>
                  <ion-label>
                    <h3>{{ resource.title }}</h3>
                    <p>{{ resource.description }}</p>
                  </ion-label>
                </ion-item>
              </ion-list>
            </div>
            
            <div v-else>
              <p>Content for {{ getPageTitle() }} is coming soon...</p>
            </div>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { 
  IonButtons, 
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon
} from '@ionic/vue';
import { 
  documentOutline,
  videocamOutline,
  micOutline,
  schoolOutline
} from 'ionicons/icons';

const route = useRoute();

// Disability content data
const disabilityData = {
  'visual-impairments': {
    title: 'Visual Impairments',
    category: 'Physical Disabilities',
    overview: 'Visual impairments can range from partial sight to complete blindness. Students may have difficulty with written materials, visual presentations, and navigating physical spaces.',
    considerations: [
      'Provide materials in accessible formats (large print, audio, digital)',
      'Ensure proper contrast and lighting in learning environments',
      'Use descriptive language when presenting visual content',
      'Consider assistive technologies like screen readers'
    ],
    strategies: [
      'Offer alternative formats for all visual materials',
      'Provide audio descriptions for videos and images',
      'Use high contrast and clear fonts in documents',
      'Ensure digital content is screen reader compatible'
    ],
    resources: [
      { title: 'Screen Reader Guide', description: 'How to make content accessible for screen readers', icon: documentOutline },
      { title: 'Audio Description Examples', description: 'Best practices for describing visual content', icon: micOutline },
      { title: 'Accessible Document Templates', description: 'Templates for creating accessible materials', icon: schoolOutline }
    ]
  },
  'hearing-impairments': {
    title: 'Hearing Impairments',
    category: 'Physical Disabilities',
    overview: 'Hearing impairments can affect a student\'s ability to process auditory information, including speech, audio content, and environmental sounds.',
    considerations: [
      'Provide captions and transcripts for all audio content',
      'Use visual aids to supplement verbal instructions',
      'Ensure good lighting for lip reading if applicable',
      'Consider assistive listening devices'
    ],
    strategies: [
      'Always provide written alternatives to spoken content',
      'Use visual cues and gestures to support communication',
      'Position yourself to face the student when speaking',
      'Reduce background noise in learning environments'
    ],
    resources: [
      { title: 'Captioning Guidelines', description: 'How to create effective captions for videos', icon: videocamOutline },
      { title: 'Communication Strategies', description: 'Best practices for communicating with hearing-impaired students', icon: documentOutline },
      { title: 'Assistive Technology Guide', description: 'Overview of hearing assistive technologies', icon: schoolOutline }
    ]
  },
  'dyslexia': {
    title: 'Dyslexia',
    category: 'Cognition & Learning',
    overview: 'Dyslexia is a learning difference that affects reading, writing, and spelling. Students may have difficulty with phonological processing and word recognition.',
    considerations: [
      'Provide materials in dyslexia-friendly fonts and formats',
      'Allow extra time for reading and writing tasks',
      'Use multi-sensory teaching approaches',
      'Offer alternative ways to demonstrate knowledge'
    ],
    strategies: [
      'Use clear, simple fonts like Arial or Open Sans',
      'Provide audio versions of written materials',
      'Break down complex instructions into smaller steps',
      'Use color coding and visual organization'
    ],
    resources: [
      { title: 'Dyslexia-Friendly Fonts', description: 'Guide to choosing accessible fonts', icon: documentOutline },
      { title: 'Multi-sensory Learning Activities', description: 'Activities that engage multiple senses', icon: schoolOutline },
      { title: 'Reading Support Tools', description: 'Technology tools to support reading', icon: schoolOutline }
    ]
  },
  'autism-spectrum': {
    title: 'Autism Spectrum',
    category: 'Communication & Interaction',
    overview: 'Autism spectrum conditions affect social communication and interaction, as well as sensory processing and information processing.',
    considerations: [
      'Provide clear, predictable routines and expectations',
      'Be aware of sensory sensitivities to light, sound, and touch',
      'Use literal, concrete language and avoid idioms',
      'Allow time for processing information and responses'
    ],
    strategies: [
      'Create structured, predictable learning environments',
      'Provide advance notice of changes to routines',
      'Use visual schedules and social stories',
      'Offer quiet spaces for sensory regulation'
    ],
    resources: [
      { title: 'Social Stories Guide', description: 'How to create effective social stories', icon: documentOutline },
      { title: 'Sensory-Friendly Environments', description: 'Creating supportive learning spaces', icon: schoolOutline },
      { title: 'Communication Strategies', description: 'Effective communication techniques', icon: micOutline }
    ]
  }
};

const getPageTitle = () => {
  const id = route.params.id as string;
  return disabilityData[id as keyof typeof disabilityData]?.title || id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

const getCategoryTitle = () => {
  const id = route.params.id as string;
  return disabilityData[id as keyof typeof disabilityData]?.category || 'Disability Category';
};

const disabilityContent = computed(() => {
  const id = route.params.id as string;
  return disabilityData[id as keyof typeof disabilityData] || null;
});
</script>

<style scoped>
#container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

ion-card {
  margin-bottom: 20px;
}

ion-card-content h3 {
  color: var(--ion-color-primary);
  margin-top: 20px;
  margin-bottom: 10px;
}

ion-card-content h3:first-child {
  margin-top: 0;
}

ion-card-content ul {
  padding-left: 20px;
}

ion-card-content li {
  margin-bottom: 8px;
  line-height: 1.5;
}

ion-card-content p {
  line-height: 1.6;
  margin-bottom: 15px;
}
</style> 