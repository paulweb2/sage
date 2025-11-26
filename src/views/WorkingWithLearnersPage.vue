<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ pageTitle }}</ion-title>
        <ion-buttons slot="end">
          <span style="font-size: 14px; color: var(--ion-color-medium); margin-right: 8px;">v0.0.18</span>
          <ion-button @click="presentActionSheet">
            <ion-icon :icon="ellipsisVertical"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ pageTitle }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <ion-card id="intro" v-if="pageId !== 'working-language'">
          <ion-card-content>
            <p>{{ pageIntro }}</p>
          </ion-card-content>
        </ion-card>

        <div v-if="pageId === 'working-partnership'">
          <ion-card id="partnership-cards">
            <ion-card-header>
              <ion-card-title>Working in partnership</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <ion-grid class="partner-grid">
                <ion-row>
                  <ion-col size="12" size-md="6">
                    <ion-card class="partner-card partner-learners">
                      <ion-card-header class="partner-card-header">
                        <div class="partner-badge">
                          <ion-icon :icon="school" color="primary"></ion-icon>
                        </div>
                        <ion-card-title>Learners</ion-card-title>
                      </ion-card-header>
                      <ion-card-content>
                        <p>Learners with disabilities are at the centre of inclusion; they must be given a voice in their own education. Listening to their experiences and respecting their choices helps educators understand the support these learners need.</p>
                        <p>When learners are involved in decision-making, they gain confidence, independence and a stronger sense of belonging.</p>
                      </ion-card-content>
                    </ion-card>
                  </ion-col>
                  <ion-col size="12" size-md="6">
                    <ion-card class="partner-card partner-parents">
                      <ion-card-header class="partner-card-header">
                        <div class="partner-badge">
                          <ion-icon :icon="heart" color="danger"></ion-icon>
                        </div>
                        <ion-card-title>Parents</ion-card-title>
                      </ion-card-header>
                      <ion-card-content>
                        <p>Parents and caregivers know their children well in contexts that differ from school. They can, therefore, provide valuable information about their child’s strengths, challenges and preferred ways of learning.</p>
                        <p>Teachers working closely with parents ensures that support at home and at school complement each other. Parents can also be advocates for better resources, accessibility and teacher training.</p>
                      </ion-card-content>
                    </ion-card>
                  </ion-col>
                </ion-row>
                <ion-row>
                  <ion-col size="12" size-md="6">
                    <ion-card class="partner-card partner-communities">
                      <ion-card-header class="partner-card-header">
                        <div class="partner-badge">
                          <ion-icon :icon="people" color="success"></ion-icon>
                        </div>
                        <ion-card-title>Communities</ion-card-title>
                      </ion-card-header>
                      <ion-card-content>
                        <p>Communities influence how learners with disabilities are accepted and supported; raising awareness in the community helps reduce stigma and negative attitudes.</p>
                        <p>Local leaders, faith groups and organisations can play an important role in encouraging families to send children with disabilities to school, as well as in mobilising resources to support inclusive learning environments.</p>
                      </ion-card-content>
                    </ion-card>
                  </ion-col>
                  <ion-col size="12" size-md="6">
                    <ion-card class="partner-card partner-stakeholders">
                      <ion-card-header class="partner-card-header">
                        <div class="partner-badge">
                          <ion-icon :icon="business" color="warning"></ion-icon>
                        </div>
                        <ion-card-title>Other stakeholders</ion-card-title>
                      </ion-card-header>
                      <ion-card-content>
                        <p>Inclusion also requires collaboration with wider stakeholders such as Organisations of Persons with Disabilities (OPDs), government ministries, education authorities, Non-government Organisations (NGOs) and donors.</p>
                        <p>These groups can provide training, assistive technology, funding and technical expertise. Working together ensures that policies and practices are aligned and that learners with disabilities benefit from a coordinated support system.</p>
                      </ion-card-content>
                    </ion-card>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-card-content>
          </ion-card>
        </div>

        <div v-if="pageId === 'working-language'">
          <ion-card id="language-why-words">
            <ion-card-header>
              <ion-card-title>Why choice of words matters</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <p>Language shapes how society sees persons with disabilities. The words we use can show respect and promote inclusion, or they can spread stigma and exclusion.</p>
              <p>For example, saying ‘a child with a disability’ puts the child first, while ‘a disabled child’ suggests the disability is their main identity. Respectful language reminds us that people with disabilities are people first. The United Nations Convention on the Rights of Persons with Disabilities (CRPD) reaffirms calls for the use of respectful and dignified language.</p>
            </ion-card-content>
          </ion-card>

          <ion-card id="language-change-over-time">
            <ion-card-header>
              <ion-card-title>How language changes over time</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <p>Language is not fixed. Words that were once commonly used can later be seen as offensive. Terms such as ‘crippled’, ‘handicapped’ or ‘mentally retarded’ are now considered disrespectful.</p>
              <p>Today, we use terms like ‘persons with disabilities’, ‘learners with disabilities’ or ‘people with psychosocial impairments’. This change reflects growing respect for rights and dignity, and a shift in focus from the impairment to the barriers created by society.</p>
            </ion-card-content>
          </ion-card>

          <ion-card id="language-definitions">
            <ion-card-header>
              <ion-card-title>Defining impairment, disability and need</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <p><strong>Impairment:</strong> condition, absence of a body part or difficulties in body or mind functions (for example, seeing, hearing, walking, learning).</p>
              <p><strong>Disability:</strong> what happens when people with impairments face barriers in society that stop them from taking part fully and equally.</p>
              <p><strong>Needs:</strong> the support or adjustments a person may require because of an impairment (for example, Braille books, ramps, sign language).</p>
              <p>In the toolkit you will focus on needs and the support and adjustments required in your work as an educator.</p>
            </ion-card-content>
          </ion-card>

          <ion-card id="language-guidance">
            <ion-card-header>
              <ion-card-title>Language guidance</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <ion-accordion-group>
                <ion-accordion value="language-respectful">
                  <ion-item slot="header" color="success">
                    <ion-icon :icon="checkmark" slot="start" color="success"></ion-icon>
                    <ion-label>Respectful language</ion-label>
                  </ion-item>
                  <div class="ion-padding" slot="content">
                    <ion-list>
                      <ion-item>
                        <ion-icon :icon="checkmark" slot="start" color="success"></ion-icon>
                        <ion-label>Learners with impairments / learners with disabilities</ion-label>
                      </ion-item>
                      <ion-item>
                        <ion-icon :icon="checkmark" slot="start" color="success"></ion-icon>
                        <ion-label>Learners without disability</ion-label>
                      </ion-item>
                    </ion-list>
                  </div>
                </ion-accordion>
                <ion-accordion value="language-avoid">
                  <ion-item slot="header" color="danger">
                    <ion-icon :icon="close" slot="start" color="danger"></ion-icon>
                    <ion-label>Language to avoid</ion-label>
                  </ion-item>
                  <div class="ion-padding" slot="content">
                    <ion-list>
                      <ion-item>
                        <ion-icon :icon="close" slot="start" color="danger"></ion-icon>
                        <ion-label>The disabled / handicapped / people living with disabilities</ion-label>
                      </ion-item>
                      <ion-item>
                        <ion-icon :icon="close" slot="start" color="danger"></ion-icon>
                        <ion-label>Normal people / able-bodied people / non-disabled people</ion-label>
                      </ion-item>
                    </ion-list>
                  </div>
                </ion-accordion>
              </ion-accordion-group>
            </ion-card-content>
          </ion-card>
        </div>

        <div v-if="pageId === 'working-tensions'">
          <ion-card id="tensions-multiple-needs-2">
            <ion-card-header>
              <ion-card-title>Learners do not fall neatly into single categories</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <p>Each learner with a disability is unique; some may have multiple needs, while others may face challenges that are not always visible. For example, a learner could be both deaf and have a cognitive learning difficulty, or they may also come from a disadvantaged background.</p>
              <p>This means educators cannot rely on ‘one-size-fits-all’ approaches. Instead, they need to adopt flexible methods that respond to individual differences.</p>
            </ion-card-content>
          </ion-card>

          <ion-card id="tensions-reasonable-adjustments">
            <ion-card-header>
              <ion-card-title>Educators cannot do everything</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <p>Schools and educators may not be able to meet every need for everyone, all the time. This is why the idea of ‘reasonable adjustments’ is important.</p>
              <p>Reasonable adjustments are changes that remove barriers to learning and participation while remaining practical within the school’s circumstances. Examples include giving extra time in examinations, seating a learner at the front of the class, or using larger print materials. The focus of reasonable adjustments is on doing what is possible and practical within the available resources.</p>
            </ion-card-content>
          </ion-card>

          <ion-card id="tensions-resources">
            <ion-card-header>
              <ion-card-title>Resources: funds, staffing, expertise</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <p>One of the biggest challenges to a genuinely inclusive education system is a lack of resources. Schools may struggle with limited budgets, not enough staff, or a shortage of teachers trained in inclusive education. Assistive devices and accessible learning materials may be expensive or unavailable. These gaps can make it harder to provide the right support.</p>
              <p>However, partnerships with parents, communities, government and organisations can help to close some of these gaps and share responsibility.</p>
            </ion-card-content>
          </ion-card>
        </div>

        <ion-card id="reflective-task">
          <ion-card-header>
            <ion-card-title>Reflection</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <div class="reflection-section">
              <template v-if="pageId === 'working-language'">
                <p>What key points are important for you to take from this section about respectful language?</p>
              </template>
              <template v-else-if="pageId === 'working-partnership'">
                <p>What key points are important for you to take from this section about working in partnership with learners?</p>
              </template>
              <template v-else-if="pageId === 'working-tensions'">
                <p>What key points are important for you to take from this section about challenges and enablers?</p>
              </template>
              <template v-else>
                <h4>Reflection</h4>
              </template>
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

        <div v-if="pageId === 'working-partnership'">
          <ion-card id="summary">
            <ion-card-header>
              <ion-card-title>Summary</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <p>Building strong partnerships among learners, parents, communities and stakeholders ensures that learners with disabilities are not only included in education but also thrive and reach their full potential.</p>
            </ion-card-content>
          </ion-card>
        </div>

        <div v-if="pageId === 'working-language'">
          <ion-card id="language-summary">
            <ion-card-header>
              <ion-card-title>Summary</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <p>For each of the disabilities in the toolkit you will find advice about respectful language and language to avoid.</p>
            </ion-card-content>
          </ion-card>
        </div>

        <div v-if="pageId === 'working-tensions'">
          <ion-card id="tensions-summary">
            <ion-card-header>
              <ion-card-title>Summary</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <p>Working with learners with disabilities is complex because every learner is different, resources are limited and not all needs can be met fully. But through reasonable adjustments, creativity and collaboration, schools can still create more inclusive learning environments. You will find information about reasonable adjustments, resources and organisations for different learning needs in this toolkit.</p>
            </ion-card-content>
          </ion-card>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonTextarea, IonButton, IonIcon, IonProgressBar, IonNote, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonList, IonGrid, IonRow, IonCol, actionSheetController } from '@ionic/vue';
import { toastController } from '@ionic/vue';
import { save, download, trash, helpCircle, star, people, settings, school, heart, checkmark, ellipsisVertical, business, close } from 'ionicons/icons';

const route = useRoute();
const pageId = computed(() => (route.params.id as string) || 'working-partnership');

const pageTitle = computed(() => {
  if (pageId.value === 'working-partnership') return 'Working in partnership';
  if (pageId.value === 'working-language') return 'Language';
  if (pageId.value === 'working-tensions') return 'Challenges and enablers';
  return 'Working with learners with disabilities';
});

const pageSubtitle = computed(() => '');
const pageIntro = computed(() => {
  if (pageId.value === 'working-partnership') return 'Inclusive education works best when everyone plays a role; no one person or group can achieve it alone. Partnerships between learners, parents, communities and other stakeholders help remove barriers and create supportive environments.';
  if (pageId.value === 'working-language') return 'Use respectful, person-centred language and identity-first terms where preferred.';
  if (pageId.value === 'working-tensions') return 'Creating an inclusive learning environment is important, but it also comes with challenges. Teachers, parents, and schools often face tensions when trying to balance the needs of learners with disabilities with the resources available.';
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
    printPage();
  }
};

const printPage = () => {
  if (typeof window !== 'undefined') {
    window.print();
  }
};

const openAccessibilitySettings = () => {
  console.log('Accessibility settings coming soon!');
};
</script>

<style scoped>
ion-card { margin: 16px; }
.reflection-section { margin-top: 12px; }
.reflection-textarea { margin-top: 8px; }
.reflection-progress { margin-top: 12px; display: flex; align-items: center; gap: 8px; }
.reflection-actions { margin-top: 12px; display: flex; flex-direction: column; gap: 8px; }
.intro-note { margin-top: 8px; color: var(--ion-color-medium); }

/* Partnership grid styles */
.partner-grid { --ion-grid-padding: 0; }
.partner-card {
  border-radius: 14px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  /* Use default card background (no transparency) */
  --background: var(--ion-card-background, var(--ion-background-color));
}
.partner-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}
.partner-card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 0;
}
.partner-badge {
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: rgba(255,255,255,0.85);
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
}
.partner-badge ion-icon { font-size: 20px; }

/* Themed backgrounds per partner */
.partner-learners {
  background: var(--ion-card-background, var(--ion-background-color));
}
.partner-parents {
  background: var(--ion-card-background, var(--ion-background-color));
}
.partner-communities {
  background: var(--ion-card-background, var(--ion-background-color));
}
.partner-stakeholders {
  background: var(--ion-card-background, var(--ion-background-color));
}

/* Ensure readability uses Ionic defaults */

@media (prefers-color-scheme: dark) {
  .partner-badge {
    background: rgba(255,255,255,0.15);
    box-shadow: none;
  }
}
</style> 