<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ pageTitle }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ pageTitle }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <ion-card id="intro">
          <ion-card-content>
            <p>{{ pageIntro }}</p>
            <p class="intro-note">This section provides context and practical considerations for your work. Use the reflection tool below to capture your ideas and next steps.</p>
          </ion-card-content>
        </ion-card>

        <ion-card id="reflective-task">
          <ion-card-header>
            <ion-card-title>Reflective Writing Journal</ion-card-title>
            <ion-card-subtitle>Deepen Your Learning Through Reflection</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <div class="reflection-section">
              <h4>Reflection</h4>
              <ion-textarea
                v-model="reflectionText"
                placeholder="Write your reflection..."
                :rows="6"
                :auto-grow="true"
                :maxlength="2000"
                :counter="true"
                class="reflection-textarea"
                @ionInput="autoSaveReflection"
              ></ion-textarea>
            </div>

            <div class="reflection-actions">
              <ion-button expand="block" color="primary" @click="saveReflection">
                <ion-icon :icon="save" slot="start"></ion-icon>
                Save Reflection
              </ion-button>

              <ion-button expand="block" fill="outline" color="secondary" @click="exportReflection">
                <ion-icon :icon="download" slot="start"></ion-icon>
                Export as TXT
              </ion-button>

              <ion-button expand="block" fill="outline" color="warning" @click="clearReflection">
                <ion-icon :icon="trash" slot="start"></ion-icon>
                Clear All
              </ion-button>
            </div>

            <div class="reflection-progress">
              <ion-progress-bar :value="progressValue" color="success"></ion-progress-bar>
              <ion-note>{{ Math.round(progressValue * 100) }}% Complete</ion-note>
            </div>

            <ion-accordion-group>
              <ion-accordion value="general-prompts">
                <ion-item slot="header" color="light">
                  <ion-icon :icon="helpCircle" slot="start" color="primary"></ion-icon>
                  <ion-label>General Reflection Prompts</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content">
                  <ion-list>
                    <ion-item>
                      <ion-icon :icon="star" slot="start" color="warning"></ion-icon>
                      <ion-label>What are your student's strengths and how can you build on them?</ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-icon :icon="people" slot="start" color="secondary"></ion-icon>
                      <ion-label>How can you involve the student's family and support network?</ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-icon :icon="settings" slot="start" color="tertiary"></ion-icon>
                      <ion-label>What environmental changes would make the biggest difference?</ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-icon :icon="school" slot="start" color="primary"></ion-icon>
                      <ion-label>How can you collaborate with other professionals and specialists?</ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-icon :icon="heart" slot="start" color="danger"></ion-icon>
                      <ion-label>What would help your student feel more confident and included?</ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-icon :icon="checkmark" slot="start" color="success"></ion-icon>
                      <ion-label>How will you know if your interventions are working?</ion-label>
                    </ion-item>
                  </ion-list>
                </div>
              </ion-accordion>
            </ion-accordion-group>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonTextarea, IonButton, IonIcon, IonProgressBar, IonNote, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonList } from '@ionic/vue';
import { toastController } from '@ionic/vue';
import { save, download, trash, helpCircle, star, people, settings, school, heart, checkmark } from 'ionicons/icons';

const route = useRoute();
const pageId = computed(() => (route.params.id as string) || 'working-partnership');

const pageTitle = computed(() => {
  if (pageId.value === 'working-partnership') return 'Working in partnership with learners';
  if (pageId.value === 'working-language') return 'Language of disability';
  if (pageId.value === 'working-tensions') return 'Tensions and complexity';
  return 'Working with learners with disabilities';
});

const pageSubtitle = computed(() => '');
const pageIntro = computed(() => {
  if (pageId.value === 'working-partnership') return 'Engage learners as partners in planning, adjusting supports and reviewing progress.';
  if (pageId.value === 'working-language') return 'Use respectful, person-centred language and identity-first terms where preferred.';
  if (pageId.value === 'working-tensions') return 'Balance needs, resources and contexts; recognise intersecting needs and evolving support.';
  return '';
});

const reflectionText = ref('');
const storageKey = computed(() => `working-reflection-${pageId.value}`);

const progressValue = computed(() => (reflectionText.value.trim() ? 1 : 0));

let saveTimer: ReturnType<typeof setTimeout> | null = null;
const autoSaveReflection = () => {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      localStorage.setItem(storageKey.value, JSON.stringify({ reflection: reflectionText.value }));
    } catch {}
  }, 400);
};

const saveReflection = () => {
  try {
    localStorage.setItem(storageKey.value, JSON.stringify({ reflection: reflectionText.value }));
  } finally {
    toastController.create({ message: 'Reflection saved successfully!', duration: 2000, position: 'bottom', color: 'success' }).then(t => t.present());
  }
};

const exportReflection = () => {
  const content = `${pageTitle.value}\n\nREFLECTION:\n${reflectionText.value || 'No reflection written yet.'}`;
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = window.document.createElement('a');
  a.href = url;
  a.download = `reflection-${pageId.value}.txt`;
  window.document.body.appendChild(a);
  a.click();
  window.document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toastController.create({ message: 'Reflection exported successfully!', duration: 2000, position: 'bottom', color: 'success' }).then(t => t.present());
};

const clearReflection = () => {
  if (confirm('Are you sure you want to clear your reflection? This action cannot be undone.')) {
    reflectionText.value = '';
    localStorage.setItem(storageKey.value, JSON.stringify({ reflection: '' }));
    toastController.create({ message: 'Reflection cleared successfully!', duration: 2000, position: 'bottom', color: 'warning' }).then(t => t.present());
  }
};

onMounted(() => {
  try {
    const saved = localStorage.getItem(storageKey.value);
    if (saved) {
      const parsed = JSON.parse(saved);
      reflectionText.value = parsed?.reflection || '';
    }
  } catch {}
});
</script>

<style scoped>
ion-card { margin: 16px; }
.reflection-section { margin-top: 12px; }
.reflection-textarea { margin-top: 8px; }
.reflection-progress { margin-top: 12px; display: flex; align-items: center; gap: 8px; }
.reflection-actions { margin-top: 12px; display: flex; flex-direction: column; gap: 8px; }
.intro-note { margin-top: 8px; color: var(--ion-color-medium); }
</style> 