<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>My certificate of participation</ion-title>
        <ion-buttons slot="end">
          <span style="font-size: 14px; color: var(--ion-color-medium); margin-right: 8px;">v0.0.19</span>
          <ion-button @click="presentActionSheet">
            <ion-icon :icon="ellipsisVertical"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div id="container">
        <!-- Overall Progress Card -->
      <ion-card class="overall-progress-card">
        <ion-card-header>
          <ion-card-title>
            <ion-icon :icon="trophy" slot="start" :color="achievement.color"></ion-icon>
            Overall Progress
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <!-- Progress Circle -->
          <div class="progress-circle-container">
            <div class="progress-circle" :style="{ '--progress': progress.percentage }">
              <div class="progress-circle-inner">
                <div class="progress-percentage">{{ progress.percentage }}%</div>
                <div class="progress-label">Complete</div>
              </div>
            </div>
          </div>

          <!-- Achievement Level -->
          <div class="achievement-section">
            <ion-chip :color="achievement.color" class="achievement-chip">
              <ion-icon :icon="achievement.icon"></ion-icon>
              <ion-label>{{ achievement.level }}</ion-label>
            </ion-chip>
            <p class="achievement-message">{{ achievement.message }}</p>
          </div>

          <!-- Progress Stats -->
          <div class="progress-stats">
            <div class="stat-item">
              <div class="stat-number">{{ progress.completedItems }}</div>
              <div class="stat-label">Completed</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">{{ progress.totalItems }}</div>
              <div class="stat-label">Total</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">{{ completionStreak }}</div>
              <div class="stat-label">Day Streak</div>
            </div>
          </div>
        </ion-card-content>
      </ion-card>

      <!-- Progress Statistics -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>
            <ion-icon :icon="analytics" slot="start" color="primary"></ion-icon>
            Progress Statistics
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-number">{{ progressStats.completedQuizzes }}</div>
              <div class="stat-label">Quizzes Completed</div>
              <div class="stat-subtitle">{{ progressStats.totalQuizzes }} total</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">{{ progressStats.completedReflections }}</div>
              <div class="stat-label">Reflections Completed</div>
              <div class="stat-subtitle">{{ progressStats.totalReflections }} total</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">{{ progressStats.averageQuizScore }}%</div>
              <div class="stat-label">Average Quiz Score</div>
              <div class="stat-subtitle">Across all quizzes</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">{{ progressStats.daysActive }}</div>
              <div class="stat-label">Days Active</div>
              <div class="stat-subtitle">Learning streak</div>
            </div>
          </div>
        </ion-card-content>
      </ion-card>

      <!-- Recent Activity -->
      <ion-card v-if="recentActivity.length > 0">
        <ion-card-header>
          <ion-card-title>
            <ion-icon :icon="time" slot="start" color="primary"></ion-icon>
            Recent Activity
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <ion-item v-for="item in recentActivity" :key="item.id" lines="none" class="activity-item">
              <ion-icon 
                :icon="item.type === 'quiz' ? helpCircle : bulb" 
                slot="start" 
                :color="item.completed ? 'success' : 'medium'"
              ></ion-icon>
              <ion-label>
                <h3>{{ item.title }}</h3>
                <p v-if="item.score">Score: {{ item.score }}%</p>
                <p v-if="item.lastCompleted">
                  {{ formatDate(item.lastCompleted) }}
                </p>
              </ion-label>
              <ion-icon 
                :icon="item.completed ? checkmarkCircle : ellipseOutline" 
                slot="end" 
                :color="item.completed ? 'success' : 'medium'"
              ></ion-icon>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>

      <!-- Detailed Progress -->
      <ion-card>
        <ion-card-header>
          <ion-card-title>
            <ion-icon :icon="list" slot="start" color="primary"></ion-icon>
            Detailed Progress
          </ion-card-title>
          <ion-card-subtitle>All Quizzes and Reflections</ion-card-subtitle>
        </ion-card-header>
        <ion-card-content>
          <ion-accordion-group>
            <ion-accordion v-for="(category, categoryIndex) in groupedProgress" :key="categoryIndex">
              <ion-item slot="header" :color="getCategoryColor(category.completionRate)">
                <ion-icon :icon="getCategoryIcon(category.completionRate)" slot="start" :color="getCategoryColor(category.completionRate)"></ion-icon>
                <ion-label>
                  <h3>{{ category.title }}</h3>
                  <p>{{ category.completedItems }}/{{ category.totalItems }} completed ({{ category.completionRate }}%)</p>
                </ion-label>
              </ion-item>
              <div slot="content" class="ion-padding">
                <ion-list>
                  <ion-item v-for="item in category.items" :key="item.id" lines="none" class="progress-item">
                    <ion-icon 
                      :icon="item.type === 'quiz' ? helpCircle : bulb" 
                      slot="start" 
                      :color="item.completed ? 'success' : 'medium'"
                    ></ion-icon>
                    <ion-label>
                      <h4>{{ item.title.replace(category.title + ' - ', '') }}</h4>
                      <p v-if="item.score && item.completed">Score: {{ item.score }}%</p>
                      <p v-if="item.lastCompleted && item.completed">
                        Completed: {{ formatDate(item.lastCompleted) }}
                      </p>
                      <p v-else-if="!item.completed">Not started</p>
                    </ion-label>
                    <ion-button 
                      v-if="!item.completed" 
                      fill="clear" 
                      size="small" 
                      :router-link="isItemEnabled(item.id) ? getItemRoute(item.id) : undefined"
                      :disabled="!isItemEnabled(item.id)"
                      :router-direction="'forward'"
                    >
                      Start
                    </ion-button>
                    <ion-icon 
                      v-else
                      :icon="item.completed ? checkmarkCircle : ellipseOutline" 
                      slot="end" 
                      :color="item.completed ? 'success' : 'medium'"
                    ></ion-icon>
                  </ion-item>
                </ion-list>
              </div>
            </ion-accordion>
          </ion-accordion-group>
        </ion-card-content>
      </ion-card>

      <!-- Certificate Access -->
      <ion-card v-if="certificateStatus.isUnlocked" class="celebration-card">
        <ion-card-header>
          <ion-card-title>
            <ion-icon :icon="star" slot="start" color="warning"></ion-icon>
            🎉 Congratulations! 🎉
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <div class="celebration-content">
            <div class="celebration-icon">🏆</div>
            <h3>You've completed all Disability Toolkit learning activities!</h3>
            <p>You're now a Disability Toolkit Master with comprehensive knowledge of supporting students with diverse needs.</p>
            <ion-button expand="block" color="warning" @click="showCertificateModal = true">
              <ion-icon :icon="document" slot="start"></ion-icon>
              Print Certificate
            </ion-button>
          </div>
        </ion-card-content>
      </ion-card>

      <!-- Progress Tips -->
      <ion-card v-if="progress.percentage < 100">
        <ion-card-header>
          <ion-card-title>
            <ion-icon :icon="bulb" slot="start" color="secondary"></ion-icon>
            Tips to Continue Progress
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <ion-item lines="none">
              <ion-icon :icon="play" slot="start" color="primary"></ion-icon>
              <ion-label>
                <h4>Start with quizzes</h4>
                <p>Complete the knowledge checks to test your understanding</p>
              </ion-label>
            </ion-item>
            <ion-item lines="none">
              <ion-icon :icon="bulb" slot="start" color="secondary"></ion-icon>
              <ion-label>
                <h4>Reflect regularly</h4>
                <p>Use the reflection tools to apply learning to your practice</p>
              </ion-label>
            </ion-item>
            <ion-item lines="none">
              <ion-icon :icon="time" slot="start" color="tertiary"></ion-icon>
              <ion-label>
                <h4>Build a streak</h4>
                <p>Complete activities daily to maintain momentum</p>
              </ion-label>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
      </div>
    </ion-content>

    <!-- Certificate Modal -->
    <ion-modal :is-open="showCertificateModal" @didDismiss="showCertificateModal = false">
      <ion-header>
        <ion-toolbar>
          <ion-title>Disability Toolkit Master Certificate</ion-title>
          <ion-buttons slot="end">
            <ion-button @click="showCertificateModal = false">Close</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <div class="certificate-modal-content">
          <SageCertificate
            ref="certificateRef"
            :completion-date="completionDate"
            :recipient-name="recipientName"
          />
          <div class="certificate-name-input">
            <ion-item lines="full">
              <ion-label position="stacked">Name on certificate</ion-label>
              <ion-input v-model="recipientName" placeholder="Enter your name"></ion-input>
            </ion-item>
          </div>
          <div class="certificate-actions">
            <ion-button expand="block" color="primary" @click="printCertificate">
              <ion-icon :icon="print" slot="start"></ion-icon>
              Print Certificate
            </ion-button>
            <ion-button expand="block" fill="outline" @click="downloadCertificate">
              <ion-icon :icon="download" slot="start"></ion-icon>
              Download PDF
            </ion-button>
          </div>
        </div>
      </ion-content>
    </ion-modal>

    <ion-toast
      :is-open="showToast"
      :message="toastMessage"
      :color="toastColor"
      :duration="3000"
      @didDismiss="showToast = false"
    ></ion-toast>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonChip,
  IonAccordionGroup,
  IonAccordion,
  IonToast,
  IonModal,
  IonInput
} from '@ionic/vue';
import { menuController } from '@ionic/vue';
import {
  trophy,
  time,
  list,
  star,
  share,
  bulb,
  play,
  helpCircle,
  checkmarkCircle,
  ellipseOutline,
  school,
  checkmark,
  analytics,
  document,
  print,
  download,
  ellipsisVertical,
  printOutline,
  accessibilityOutline
} from 'ionicons/icons';

import { ProgressService, type ProgressData, type ProgressItem, type ProgressOptions } from '../services/ProgressService';
import SageCertificate from '../components/SageCertificate.vue';
import { actionSheetController, toastController } from '@ionic/vue';

const route = useRoute();
const CERTIFICATE_EXCLUDED_ITEMS: string[] = ['signposting-reflection'];
const certificateProgressOptions: ProgressOptions = {
  excludedItemIds: CERTIFICATE_EXCLUDED_ITEMS
};

const progress = ref<ProgressData>({
  totalItems: 0,
  completedItems: 0,
  percentage: 0,
  items: [],
  lastUpdated: ''
});

const recentActivity = ref<ProgressItem[]>([]);
const completionStreak = ref(0);
const showToast = ref(false);
const toastMessage = ref('');
const toastColor = ref('success');
const isLoading = ref(false);
const showCertificateModal = ref(false);
const certificateRef = ref<InstanceType<typeof SageCertificate> | null>(null);
const recipientName = ref('');

const progressStats = ref<{
  totalQuizzes: number;
  completedQuizzes: number;
  totalReflections: number;
  completedReflections: number;
  averageQuizScore: number;
  daysActive: number;
  lastActivityDate?: string;
}>({
  totalQuizzes: 0,
  completedQuizzes: 0,
  totalReflections: 0,
  completedReflections: 0,
  averageQuizScore: 0,
  daysActive: 0
});

const achievement = computed(() => {
  return ProgressService.getAchievementLevel(progress.value.percentage);
});

const groupedProgress = computed(() => {
  const groups: { [key: string]: { title: string; items: ProgressItem[]; completedItems: number; totalItems: number; completionRate: number } } = {};
  
  progress.value.items.forEach(item => {
    const categoryTitle = item.title.split(' - ')[0];
    if (!groups[categoryTitle]) {
      groups[categoryTitle] = {
        title: categoryTitle,
        items: [],
        completedItems: 0,
        totalItems: 0,
        completionRate: 0
      };
    }
    
    groups[categoryTitle].items.push(item);
    groups[categoryTitle].totalItems++;
    if (item.completed) {
      groups[categoryTitle].completedItems++;
    }
  });

  // Calculate completion rates
  Object.values(groups).forEach(group => {
    group.completionRate = Math.round((group.completedItems / group.totalItems) * 100);
  });

  return Object.values(groups).sort((a, b) => b.completionRate - a.completionRate);
});

const certificateStatus = computed(() => ProgressService.getCertificateStatus(progress.value));

// Certificate data
const completionDate = computed(() => {
  const date = new Date();
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
});

const certificateNumber = computed(() => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${year}${month}${day}-${random}`;
});

// Only enable hearing quiz, hearing reflection, and communication quiz
const ENABLED_IDS = new Set([
  'hearing-needs-quiz',
  'hearing-needs-reflection',
  'communication-quiz',
  'visual-needs-quiz'
]);

function isItemEnabled(id: string): boolean {
  return ENABLED_IDS.has(id);
}

function getItemRoute(id: string): string {
  // id pattern: `${pageId}-quiz` or `${pageId}-reflection`
  const pageId = id.replace(/-(quiz|reflection)$/,'');
  if (pageId === 'hearing-needs') {
    return '/needs/hearing'; // dedicated hearing route
  }
  if (pageId === 'communication') {
    return '/disability/communication';
  }
  // Fallback (should be disabled for others): keep existing pattern
  return `/disability/${pageId}`;
}

const loadProgress = async () => {
  isLoading.value = true;
  try {
    // Add a small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const newProgress = ProgressService.getOverallProgress(certificateProgressOptions);
    const newRecentActivity = ProgressService.getRecentActivity(certificateProgressOptions);
    const newCompletionStreak = ProgressService.getCompletionStreak(certificateProgressOptions);
    const newProgressStats = ProgressService.getProgressStats(certificateProgressOptions);
    
    // Check if there are any new completions
    const newCompletedItems = newProgress.items.filter(item => item.completed).length;
    const oldCompletedItems = progress.value.items.filter(item => item.completed).length;
    
    if (newCompletedItems > oldCompletedItems) {
      const newItems = newProgress.items.filter(item => 
        item.completed && 
        !progress.value.items.find(oldItem => oldItem.id === item.id && oldItem.completed)
      );
      
      if (newItems.length > 0) {
        const item = newItems[0]; // Show notification for the first new completion
        toastMessage.value = `Great job! You completed ${item.title}`;
        toastColor.value = 'success';
        showToast.value = true;
      }
    }
    
    progress.value = newProgress;
    recentActivity.value = newRecentActivity;
    completionStreak.value = newCompletionStreak;
    progressStats.value = newProgressStats;
  } catch (error) {
    console.error('Error loading progress:', error);
    toastMessage.value = 'Error loading progress data';
    toastColor.value = 'danger';
    showToast.value = true;
  } finally {
    isLoading.value = false;
  }
};

// Removed manual refresh button; auto-refresh remains via route change and interval

// Auto-refresh when returning to this page
const handleRouteChange = () => {
  if (route.path === '/progress') {
    loadProgress();
  }
};

// Listen for storage changes to update progress in real-time
const handleStorageChange = (event: StorageEvent) => {
  if (event.key && (event.key.startsWith('sage-quiz-') || event.key.startsWith('sage-reflection-'))) {
    // Debounce the update to avoid too many refreshes
    setTimeout(() => {
      loadProgress();
    }, 100);
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};

const getCategoryColor = (completionRate: number) => {
  if (completionRate === 100) return 'success';
  if (completionRate >= 80) return 'primary';
  if (completionRate >= 60) return 'secondary';
  if (completionRate >= 40) return 'warning';
  return 'medium';
};

const getCategoryIcon = (completionRate: number) => {
  if (completionRate === 100) return checkmarkCircle;
  if (completionRate >= 80) return school;
  if (completionRate >= 60) return bulb;
  if (completionRate >= 40) return play;
  return ellipseOutline;
};

const printCertificate = () => {
  if (certificateRef.value) {
    certificateRef.value.printCertificate();
  }
};

const downloadCertificate = () => {
  // For now, just trigger print which can save as PDF
  // In a real implementation, you might want to use a library like jsPDF
  printCertificate();
  toastMessage.value = 'Use "Save as PDF" in the print dialog to download';
  toastColor.value = 'info';
  showToast.value = true;
};

const presentActionSheet = async () => {
  try {
    const actionSheet = await actionSheetController.create({
      header: 'Page Options',
      buttons: [
        {
          text: 'Print Page',
          icon: 'print-outline',
          handler: () => {
            printPage();
          }
        },
        {
          text: 'Accessibility',
          icon: 'accessibility-outline',
          handler: () => {
            openAccessibilitySettings();
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  } catch (error) {
    console.error('Error presenting action sheet:', error);
    // Fallback: show a simple alert with options
    showFallbackOptions();
  }
};

const printPage = () => {
  console.log('Print function called');
  
  // Check if we're in a browser environment
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    console.warn('Print function called in non-browser environment');
    return;
  }
  
  try {
    // Get the current page content
    const container = globalThis.document.querySelector('#container');
    if (!container) {
      console.error('Container not found');
      globalThis.window.print(); // Fallback
      return;
    }
    
    console.log('Container found:', container);
    console.log('Container content:', container.innerHTML);
    
    // Create a new window with the content
    const printWindow = globalThis.window.open('', '_blank');
    if (!printWindow) {
      console.error('Could not open print window');
      globalThis.window.print(); // Fallback
      return;
    }
    
    // Write the content to the new window
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Disability Toolkit - ${globalThis.document.title}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .print-header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 10px; }
            .print-content { margin: 20px 0; }
            .print-footer { text-align: center; margin-top: 30px; border-top: 1px solid #ccc; padding-top: 10px; font-size: 12px; color: #666; }
            @media print {
              body { margin: 0; }
            }
          </style>
        </head>
        <body>
          <div class="print-header">
            <h1>Disability Toolkit - Supporting Accessible and Inclusive Education</h1>
            <p>Printed on: ${new Date().toLocaleDateString()}</p>
          </div>
          <div class="print-content">
            ${container.innerHTML}
          </div>
          <div class="print-footer">
            Disability Toolkit - Supporting Accessible and Inclusive Education
          </div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    
    // Wait for content to load then print
    printWindow.onload = () => {
      console.log('Print window loaded, triggering print...');
      printWindow.print();
      printWindow.close();
    };
    
  } catch (error) {
    console.error('Error during print:', error);
    // Fallback to simple print
    window.print();
  }
};

const openAccessibilitySettings = () => {
  // Open accessibility settings modal or navigate to settings page
  console.log('Opening accessibility settings');
  toastMessage.value = 'Accessibility settings coming soon!';
  toastColor.value = 'info';
  showToast.value = true;
};

const showFallbackOptions = () => {
  // Simple alert as fallback
  const options = [
    'Print Page',
    'Accessibility'
  ];
  
  const choice = prompt(`Choose an option:\n${options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}`);
  
  switch(choice) {
    case '1': printPage(); break;
    case '2': openAccessibilitySettings(); break;
  }
};

// Watch for route changes
watch(() => route.path, handleRouteChange);

onMounted(() => {
  loadProgress();
  
  // Listen for storage changes (for real-time updates)
  window.addEventListener('storage', handleStorageChange);
  
  // Listen for custom events from other components
  window.addEventListener('sage-progress-updated', loadProgress);
  
  // Set up periodic refresh (every 30 seconds) to catch any missed updates
  const intervalId = setInterval(loadProgress, 30000);
  
  // Store interval ID for cleanup
  (window as any).sageProgressInterval = intervalId;
});

onUnmounted(() => {
  // Clean up event listeners and intervals
  window.removeEventListener('storage', handleStorageChange);
  window.removeEventListener('sage-progress-updated', loadProgress);
  
  if ((window as any).sageProgressInterval) {
    clearInterval((window as any).sageProgressInterval);
  }
});
</script>

<style scoped>
.overall-progress-card {
  background: linear-gradient(135deg, var(--ion-color-primary-tint), var(--ion-color-secondary-tint));
  color: white;
}

.overall-progress-card ion-card-title,
.overall-progress-card ion-card-subtitle {
  color: white;
}

.progress-circle-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.progress-circle {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: conic-gradient(
    var(--ion-color-success) calc(var(--progress) * 3.6deg),
    rgba(255, 255, 255, 0.3) calc(var(--progress) * 3.6deg)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.progress-circle-inner {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--ion-color-primary);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.stat-card {
  text-align: center;
  padding: 16px;
  background: var(--ion-color-light);
  border-radius: 8px;
  border: 1px solid var(--ion-color-light-shade);
}

.stat-number {
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--ion-color-primary);
  margin-bottom: 4px;
}

.stat-label {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--ion-color-dark);
  margin-bottom: 2px;
}

.stat-subtitle {
  font-size: 0.8rem;
  color: var(--ion-color-medium);
}

.progress-percentage {
  font-size: 2rem;
  font-weight: bold;
  line-height: 1;
}

.progress-label {
  font-size: 0.9rem;
  opacity: 0.8;
}

.achievement-section {
  text-align: center;
  margin: 20px 0;
}

.achievement-chip {
  margin-bottom: 10px;
}

.achievement-message {
  margin: 0;
  font-style: italic;
  opacity: 0.9;
}

.progress-stats {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--ion-color-success);
}

.stat-label {
  font-size: 0.8rem;
  opacity: 0.8;
  text-transform: uppercase;
}

.activity-item {
  --padding-start: 0;
  --inner-padding-end: 0;
}

.progress-item {
  --padding-start: 0;
  --inner-padding-end: 0;
}

.celebration-card {
  background: linear-gradient(135deg, var(--ion-color-warning-tint), var(--ion-color-warning));
  color: white;
}

.celebration-card ion-card-title {
  color: white;
}

.celebration-content {
  text-align: center;
}

.celebration-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.celebration-content h3 {
  color: white;
  margin-bottom: 10px;
}

.celebration-content p {
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 20px;
}

.certificate-modal-content {
  padding: 16px;
}

.certificate-actions {
  margin-top: 24px;
  display: flex;
  gap: 12px;
}

.certificate-actions ion-button {
  flex: 1;
}

/* Print styles */
@media print {
  ion-header, 
  ion-toolbar, 
  ion-buttons, 
  ion-menu-button,
  ion-fab,
  ion-fab-button {
    display: none !important;
  }
  
  /* Reset content padding and margins */
  ion-content {
    padding: 0 !important;
    margin: 0 !important;
    --padding-top: 0 !important;
    --padding-bottom: 0 !important;
    height: auto !important;
    overflow: visible !important;
    position: static !important;
  }
  
  /* Ensure the page shows all content */
  ion-page {
    height: auto !important;
    overflow: visible !important;
    position: static !important;
    display: block !important;
  }

  /* Format container for print */
  #container {
    padding: 20px !important;
    max-width: 800px !important;
    margin: 0 auto !important;
    height: auto !important;
    overflow: visible !important;
  }

  /* Format cards for print */
  ion-card {
    margin: 16px 0 !important;
    box-shadow: none !important;
    border: 1px solid #ddd !important;
    page-break-inside: avoid !important;
  }

  ion-card-header {
    padding: 16px !important;
    background: #f8f9fa !important;
  }

  ion-card-content {
    padding: 16px !important;
  }

  /* Format progress circles for print */
  .progress-circle {
    border: 2px solid #ddd !important;
  }

  .progress-circle-inner {
    background: white !important;
    color: #333 !important;
  }

  /* Format stats for print */
  .stats-grid {
    display: grid !important;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)) !important;
    gap: 16px !important;
  }

  .stat-card {
    border: 1px solid #ddd !important;
    background: #f8f9fa !important;
  }

  /* Format lists for print */
  ion-list {
    padding: 0 !important;
  }

  ion-item {
    --padding-start: 0 !important;
    --padding-end: 0 !important;
    border-bottom: 1px solid #eee !important;
  }

  /* Format accordions for print */
  ion-accordion-group {
    border: none !important;
  }

  ion-accordion {
    border: 1px solid #ddd !important;
    margin: 8px 0 !important;
  }

  ion-accordion ion-item[slot="header"] {
    background: #f8f9fa !important;
    border-bottom: 1px solid #ddd !important;
  }

  /* Hide interactive elements */
  ion-button {
    display: none !important;
  }

  ion-modal {
    display: none !important;
  }

  ion-toast {
    display: none !important;
  }
}
</style> 