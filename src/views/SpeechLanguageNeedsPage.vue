<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Speech and Language Needs</ion-title>
        <ion-buttons slot="end">
          <span style="font-size: 14px; color: var(--ion-color-medium); margin-right: 8px;">v0.0.13</span>
          <ion-button @click="presentActionSheet">
            <ion-icon :icon="ellipsisVertical"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Speech and Language Needs</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <!-- Language Section -->
        <ion-card id="language">
          <ion-card-header>
            <ion-card-title>Language</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-accordion-group>
              <ion-accordion value="sln-lang-use">
                <ion-item slot="header" color="success">
                  <ion-icon :icon="checkmarkCircle" slot="start" color="success"></ion-icon>
                  <ion-label>Respectful language</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content">
                  <ion-list v-if="wordsToUse.length">
                    <ion-item v-for="(word, index) in wordsToUse" :key="`use-` + word.term + '-' + index">
                      <ion-icon :icon="checkmark" slot="start" color="success"></ion-icon>
                      <ion-label>
                        <h4>{{ word.term }}<template v-if="word.explanation"> - {{ word.explanation }}</template></h4>
                      </ion-label>
                    </ion-item>
                  </ion-list>
                  <ion-note v-else color="medium">Content coming soon.</ion-note>
                </div>
              </ion-accordion>

              <ion-accordion value="sln-lang-avoid">
                <ion-item slot="header" color="danger">
                  <ion-icon :icon="closeCircle" slot="start" color="danger"></ion-icon>
                  <ion-label>Language to avoid</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content">
                  <ion-list v-if="wordsToAvoid.length">
                    <ion-item v-for="(word, index) in wordsToAvoid" :key="`avoid-` + word.term + '-' + index">
                      <ion-icon :icon="close" slot="start" color="danger"></ion-icon>
                      <ion-label>
                        <h4>{{ word.term }}<template v-if="word.reason"> - {{ word.reason }}</template></h4>
                      </ion-label>
                    </ion-item>
                  </ion-list>
                  <ion-note v-else color="medium">Content coming soon.</ion-note>
                </div>
              </ion-accordion>
            </ion-accordion-group>
          </ion-card-content>
        </ion-card>

        <!-- Understanding Section -->
        <ion-card id="understanding">
          <ion-card-header>
            <ion-card-title>Understanding the Learner</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-segment v-model="selectedUnderstanding" :scrollable="true">
              <ion-segment-button value="strengths">
                <ion-icon :icon="star"></ion-icon>
                <ion-label>Strengths</ion-label>
              </ion-segment-button>
              <ion-segment-button value="challenges">
                <ion-icon :icon="helpCircle"></ion-icon>
                <ion-label>Challenges</ion-label>
              </ion-segment-button>
              <ion-segment-button value="strategies">
                <ion-icon :icon="bulb"></ion-icon>
                <ion-label>Strategies</ion-label>
              </ion-segment-button>
              <ion-segment-button value="advocacy">
                <ion-icon :icon="megaphone"></ion-icon>
                <ion-label>Advocacy</ion-label>
              </ion-segment-button>
            </ion-segment>

            <div class="ion-padding">
              <div v-if="selectedUnderstanding === 'strengths'">
                <p>Questions to help find out about a learner’s <strong>strengths</strong>:</p>
                <ion-list v-if="understanding.strengths.length">
                  <ion-item v-for="(q, i) in understanding.strengths" :key="`str-` + i + '-' + q">
                    <ion-icon :icon="star" slot="start" color="warning"></ion-icon>
                    <ion-label>{{ q }}</ion-label>
                  </ion-item>
                </ion-list>
                <ion-note v-else color="medium">Content coming soon.</ion-note>
              </div>
              <div v-else-if="selectedUnderstanding === 'challenges'">
                <p>Questions to help find out about <strong>challenges</strong> a learner may encounter:</p>
                <ion-list v-if="understanding.challenges.length">
                  <ion-item v-for="(q, i) in understanding.challenges" :key="`chal-` + i + '-' + q">
                    <ion-icon :icon="helpCircle" slot="start" color="secondary"></ion-icon>
                    <ion-label>{{ q }}</ion-label>
                  </ion-item>
                </ion-list>
                <ion-note v-else color="medium">Content coming soon.</ion-note>
              </div>
              <div v-else-if="selectedUnderstanding === 'strategies'">
                <p>Questions and prompts to understand <strong>strategies</strong> that can support the learner:</p>
                <ion-list v-if="understanding.strategies.length">
                  <ion-item v-for="(item, i) in understanding.strategies" :key="`strat-` + i">
                    <ion-icon :icon="bulb" slot="start" color="primary"></ion-icon>
                    <ion-label>
                      <h4>{{ item.question }}</h4>
                      <div v-if="item.prompts && item.prompts.length" style="margin: 6px 0 0 6px;">
                        <template v-if="item.question !== 'Prompts:'"><strong>Prompts:</strong></template>
                        <ul style="margin: 6px 0 0 6px; padding-left: 12px;">
                          <li v-for="(p, pi) in item.prompts" :key="`stratp-` + i + '-' + pi">{{ p }}</li>
                        </ul>
                      </div>
                    </ion-label>
                  </ion-item>
                </ion-list>
                <ion-note v-else color="medium">Content coming soon.</ion-note>
              </div>
              <div v-else-if="selectedUnderstanding === 'advocacy'">
                <p>Sentence starters to support learners to <strong>share</strong> their needs:</p>
                <ion-list v-if="understanding.advocacy.length">
                  <ion-item v-for="(q, i) in understanding.advocacy" :key="`adv-` + i + '-' + q">
                    <ion-icon :icon="megaphone" slot="start" color="tertiary"></ion-icon>
                    <ion-label>{{ q }}</ion-label>
                  </ion-item>
                </ion-list>
                <ion-note v-else color="medium">Content coming soon.</ion-note>
              </div>
            </div>
          </ion-card-content>
        </ion-card>

        <!-- Challenges Section -->
        <ion-card id="challenges">
          <ion-card-header>
            <ion-card-title>Challenges to Learning</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-grid v-if="challenges.physical.length + challenges.social.length + challenges.tasks.length + challenges.assessment.length > 0">
              <ion-row>
                <ion-col size="12" size-md="6">
                  <ion-card>
                    <ion-card-header>
                      <ion-card-title>Physical Environment</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                      <ion-list>
                        <ion-item v-for="(c, i) in challenges.physical" :key="`phys-` + i + '-' + c">
                          <ion-icon :icon="warning" slot="start" color="warning"></ion-icon>
                          <ion-label>{{ c }}</ion-label>
                        </ion-item>
                      </ion-list>
                    </ion-card-content>
                  </ion-card>
                </ion-col>
                <ion-col size="12" size-md="6">
                  <ion-card>
                    <ion-card-header>
                      <ion-card-title>Social Environment</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                      <ion-list>
                        <ion-item v-for="(c, i) in challenges.social" :key="`soc-` + i + '-' + c">
                          <ion-icon :icon="people" slot="start" color="secondary"></ion-icon>
                          <ion-label>{{ c }}</ion-label>
                        </ion-item>
                      </ion-list>
                    </ion-card-content>
                  </ion-card>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col size="12" size-md="6">
                  <ion-card>
                    <ion-card-header>
                      <ion-card-title>Tasks</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                      <ion-list>
                        <ion-item v-for="(c, i) in challenges.tasks" :key="`task-` + i + '-' + c">
                          <ion-icon :icon="documentIcon" slot="start" color="primary"></ion-icon>
                          <ion-label>{{ c }}</ion-label>
                        </ion-item>
                      </ion-list>
                    </ion-card-content>
                  </ion-card>
                </ion-col>
                <ion-col size="12" size-md="6">
                  <ion-card>
                    <ion-card-header>
                      <ion-card-title>Assessment</ion-card-title>
                    </ion-card-header>
                    <ion-card-content>
                      <ion-list>
                        <ion-item v-for="(c, i) in challenges.assessment" :key="`assess-` + i + '-' + c">
                          <ion-icon :icon="school" slot="start" color="tertiary"></ion-icon>
                          <ion-label>{{ c }}</ion-label>
                        </ion-item>
                      </ion-list>
                    </ion-card-content>
                  </ion-card>
                </ion-col>
              </ion-row>
            </ion-grid>
            <ion-note v-else color="medium">Content coming soon.</ion-note>
          </ion-card-content>
        </ion-card>

        <!-- Enabling Section -->
        <ion-card id="enabling">
          <ion-card-header>
            <ion-card-title>Enabling Learning</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-accordion-group v-if="enabling.physical.length + enabling.social.length + enabling.tasks.length + enabling.assessment.length > 0">
              <ion-accordion value="sln-enable-physical">
                <ion-item slot="header" color="primary">
                  <ion-icon :icon="home" slot="start" color="primary"></ion-icon>
                  <ion-label>Physical Environment</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content">
                  <ion-list>
                    <ion-item v-for="(s, i) in enabling.physical" :key="`en-phys-` + i + '-' + s">
                      <ion-icon :icon="checkmark" slot="start" color="success"></ion-icon>
                      <ion-label>{{ s }}</ion-label>
                    </ion-item>
                  </ion-list>
                </div>
              </ion-accordion>

              <ion-accordion value="sln-enable-social">
                <ion-item slot="header" color="success">
                  <ion-icon :icon="people" slot="start" color="success"></ion-icon>
                  <ion-label>Social</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content">
                  <ion-list>
                    <ion-item v-for="(s, i) in enabling.social" :key="`en-soc-` + i + '-' + s">
                      <ion-icon :icon="checkmark" slot="start" color="success"></ion-icon>
                      <ion-label>{{ s }}</ion-label>
                    </ion-item>
                  </ion-list>
                </div>
              </ion-accordion>

              <ion-accordion value="sln-enable-tasks">
                <ion-item slot="header" color="danger">
                  <ion-icon :icon="documentIcon" slot="start" color="danger"></ion-icon>
                  <ion-label>Tasks</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content">
                  <ion-list>
                    <ion-item v-for="(s, i) in enabling.tasks" :key="`en-task-` + i + '-' + s">
                      <ion-icon :icon="checkmark" slot="start" color="success"></ion-icon>
                      <ion-label>{{ s }}</ion-label>
                    </ion-item>
                  </ion-list>
                </div>
              </ion-accordion>

              <ion-accordion value="sln-enable-assessment">
                <ion-item slot="header" color="warning">
                  <ion-icon :icon="school" slot="start" color="warning"></ion-icon>
                  <ion-label>Assessment</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content">
                  <ion-list>
                    <ion-item v-for="(s, i) in enabling.assessment" :key="`en-assess-` + i + '-' + s">
                      <ion-icon :icon="checkmark" slot="start" color="success"></ion-icon>
                      <ion-label>{{ s }}</ion-label>
                    </ion-item>
                  </ion-list>
                </div>
              </ion-accordion>
            </ion-accordion-group>
            <ion-note v-else color="medium">Content coming soon.</ion-note>
          </ion-card-content>
        </ion-card>

        <!-- Resources Section -->
        <ion-card id="resources">
          <ion-card-header>
            <ion-card-title>Resources to Support Learning</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-segment v-model="selectedResourceType" :scrollable="true">
              <ion-segment-button value="electronic">
                <ion-icon :icon="laptop"></ion-icon>
                <ion-label>Electronic</ion-label>
              </ion-segment-button>
              <ion-segment-button value="paper">
                <ion-icon :icon="documentIcon"></ion-icon>
                <ion-label>Concrete resources</ion-label>
              </ion-segment-button>
              <ion-segment-button value="organizations">
                <ion-icon :icon="business"></ion-icon>
                <ion-label>Organizations</ion-label>
              </ion-segment-button>
            </ion-segment>

            <div class="ion-padding">
              <div v-if="selectedResourceType === 'electronic'">
                <ion-list v-if="electronicLines.length">
                  <ion-item v-for="(line, i) in electronicLines" :key="`res-elec-` + i">
                    <ion-icon :icon="laptop" slot="start" color="primary"></ion-icon>
                    <ion-label>
                      <p style="white-space: pre-wrap; margin: 0;" v-html="linkifyElectronicLine(line)"></p>
                    </ion-label>
                  </ion-item>
                </ion-list>
                <ion-note v-else color="medium">Content coming soon.</ion-note>
              </div>
              <div v-else-if="selectedResourceType === 'paper'">
                <ion-list v-if="resources.paper.length">
                  <ion-item v-for="(r, i) in resources.paper" :key="`res-paper-` + i + '-' + r.title">
                    <ion-icon :icon="documentIcon" slot="start" color="secondary"></ion-icon>
                    <ion-label>
                      <h4 v-html="linkifyText(r.title)"></h4>
                      <p>{{ r.description }}</p>
                      <p v-if="r.availability">{{ r.availability }}</p>
                    </ion-label>
                  </ion-item>
                </ion-list>
                <ion-note v-else color="medium">Content coming soon.</ion-note>
              </div>
              <div v-else-if="selectedResourceType === 'organizations'">
                <ion-list v-if="organizationsLines.length">
                  <ion-item v-for="(line, i) in organizationsLines" :key="`res-org-` + i">
                    <ion-icon :icon="business" slot="start" color="tertiary"></ion-icon>
                    <ion-label>
                      <p v-html="linkifyText(line)" style="white-space: pre-wrap; margin: 0;"></p>
                    </ion-label>
                  </ion-item>
                </ion-list>
                <ion-note v-else color="medium">Content coming soon.</ion-note>
              </div>
            </div>
          </ion-card-content>
        </ion-card>

        <!-- Case Study -->
        <ion-card id="case-study">
          <ion-card-header>
            <ion-card-title>Case Study</ion-card-title>
            <ion-card-subtitle>Real-World Example</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <div class="case-study-images">
              <img
                :src="getPublicUrl('speech_case_study.jpg')"
                alt="Learner participating in a speech and language activity"
                class="case-study-image"
              />
            </div>
            <div class="case-study-text">
              <p>
                Patience is a Grade 6 learner enrolled in a mainstream school with a resource unit that has
                specialised classes for deaf learners. The class consists of 10 learners (three boys, seven
                girls) who use Zimbabwe Sign Language (ZSL) for communication.
              </p>

              <p>
                Patience is the only learner in the class who exhibits mild-to-moderate stammering during
                oral reading and classroom discussions. To enhance oral communication for when she interacts
                with other mainstream peers, the educators use different teaching techniques aimed at
                improving oral expression, confidence and peer acceptance through supportive, inclusive
                learning strategies.
              </p>

              <p>
                The educator introduced the following literacy and communication activities to encourage
                participation and confidence:
              </p>
              <ul>
                <li>
                  <strong>Mirror speech training:</strong> a speech therapy method using mirrors to promote
                  articulation awareness.
                </li>
                <li>
                  <strong>Visual feedback therapy:</strong> using visual cues (cards, mirrors, video,
                  computer) to observe and adjust speech production.
                </li>
                <li>
                  <strong>Confidence-building games:</strong> such as “Describe the picture”.
                </li>
                <li>
                  <strong>Teacher modelling:</strong> demonstrating calm, slow speech and positive
                  reinforcement.
                </li>
              </ul>

              <p>The educator offers the following recommendations for supporting learners with speech needs:</p>
              <ul>
                <li>
                  Create a non-judgmental environment that encourages learners with speech needs to
                  participate.
                </li>
                <li>Plan activities which reduce stigma and promote cooperation.</li>
                <li>Give children thinking time so that they can plan how they want to respond.</li>
                <li>Include speech-friendly classroom rules, e.g., “Wait patiently for your friend to finish speaking”.</li>
                <li>Positive teacher feedback is critical for confidence-building.</li>
                <li>
                  Incorporate speech therapy principles such as visual cues, rhythm and breathing into
                  classroom routines.
                </li>
              </ul>

              <h4 class="case-study-subheading">Questions</h4>
              <ul>
                <li>What other speech-friendly rules might help a learner in your class?</li>
                <li>What other strategies could you use to provide positive educator feedback?</li>
                <li>
                  What other strategies could you use to foster confidence to contribute to all aspects of
                  school life?
                </li>
              </ul>
            </div>
            <div class="case-study-note">
              <ion-textarea
                v-model="caseStudyNote"
                placeholder="Write your case study notes here..."
                :rows="6"
                :auto-grow="true"
                :maxlength="2000"
                :counter="true"
                class="reflection-textarea"
                @ionInput="autoSaveCaseStudyNote"
              ></ion-textarea>
              <div class="reflection-actions">
                <ion-button expand="block" color="primary" @click="saveCaseStudyNote">
                  <ion-icon :icon="save" slot="start"></ion-icon>
                  Save
                </ion-button>
                <ion-button expand="block" fill="outline" color="secondary" @click="exportCaseStudyNote">
                  <ion-icon :icon="download" slot="start"></ion-icon>
                  Export as TXT
                </ion-button>
                <ion-button expand="block" fill="outline" color="warning" @click="clearCaseStudyNote">
                  <ion-icon :icon="trash" slot="start"></ion-icon>
                  Clear
                </ion-button>
              </div>
              <ul class="case-study-prompts">
                <li>
                  Can the group of learners agree a set of rules to create an environment where everyone
                  feels comfortable to speak?
                </li>
                <li>
                  Have you considered positive educator feedback in words, in pictures and in writing?
                </li>
                <li>
                  In small group activities, could learners have specific roles within the group which allow
                  them to contribute in different ways, for example, chairperson, timekeeper or scribe?
                </li>
                <li>
                  How might sentence starters and word lists support learners in your class with speech needs
                  to contribute more?
                </li>
                <li>
                  Could learners rehearse their ideas and thoughts with another learner through talking
                  partner activities before sharing with the whole group?
                </li>
              </ul>
            </div>
          </ion-card-content>
        </ion-card>

        <!-- Reflection Tool -->
        <ion-card id="reflective-task">
          <ion-card-header>
            <ion-card-title>Reflective task</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <div class="reflection-section">
              <p class="reflection-prompt">
                1) Thinking about a recent lesson, how might it be made more accessible to learners with speech and language needs?
              </p>
              <ion-textarea
                v-model="reflection.caseStudyReflection"
                placeholder="How could you adapt the supports mentioned in the case study for your own students?"
                :rows="6"
                :auto-grow="true"
                :maxlength="2000"
                :counter="true"
                class="reflection-textarea"
                @ionInput="autoSaveReflection"
              ></ion-textarea>
            </div>
            <div class="reflection-section">
              <h4>2) How could you help all children collaborate with those with a speech or language need?</h4>
              <ion-textarea
                v-model="reflection.practiceReflection"
                placeholder="Reflect on your current practice and identify areas for improvement in accessibility..."
                :rows="6"
                :auto-grow="true"
                :maxlength="2000"
                :counter="true"
                class="reflection-textarea"
                @ionInput="autoSaveReflection"
              ></ion-textarea>
            </div>
            <div class="reflection-progress">
              <ion-progress-bar :value="reflectionProgress" color="success"></ion-progress-bar>
              <ion-note>{{ Math.round(reflectionProgress * 100) }}% Complete</ion-note>
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
          </ion-card-content>
        </ion-card>

        <!-- Knowledge Check (Quiz) -->
        <ion-card id="knowledge-check">
          <ion-card-header>
            <ion-card-title>Quiz</ion-card-title>
          </ion-card-header>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
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
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonAccordionGroup,
  IonAccordion,
  IonSegment,
  IonSegmentButton,
  IonTextarea,
  IonProgressBar,
  IonButton,
  IonRadioGroup,
  IonRadio,
  IonNote,
  IonSelect,
  IonSelectOption,
  actionSheetController
} from '@ionic/vue';
import {
  checkmarkCircle,
  closeCircle,
  close,
  checkmark,
  star,
  helpCircle,
  bulb,
  megaphone,
  warning,
  people,
  document as documentIcon,
  school,
  home,
  laptop,
  business,
  save,
  download,
  trash,
  refresh,
  ellipsisVertical
} from 'ionicons/icons';
import { ProgressService } from '@/services/ProgressService';
import { toastController } from '@ionic/vue';
import { consumePendingAnchor } from '@/utils/anchorScroll';

const route = useRoute();
const selectedUnderstanding = ref('strengths');
const selectedResourceType = ref('electronic');

const getPublicUrl = (filename: string): string => {
  const base = (import.meta as any).env?.BASE_URL || '/';
  const normalizedBase = typeof base === 'string' ? base.replace(/\/$/, '') : '';
  return `${normalizedBase}/${filename}`;
};

const linkifyElectronicLine = (line: string): string => {
  const escapeHtml = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  let result = escapeHtml(line);
  const urlRegex = /(https?:\/\/[^\s)]+)/g;
  result = result.replace(urlRegex, (m) => {
    const href = m;
    return `<a href="${href}" target="_blank" rel="noopener noreferrer">${m}</a>`;
  });
  return result;
};

const linkifyText = (text: string): string => {
  const escapeHtml = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  let result = escapeHtml(text);
  const urlRegex = /(https?:\/\/[^\s)]+)/g;
  result = result.replace(urlRegex, (m) => {
    const href = m;
    return `<a href="${href}" target="_blank" rel="noopener noreferrer">${m}</a>`;
  });
  return result;
};

const wordsToUse: { term: string; explanation: string }[] = [
  { term: 'A learner with a stammer', explanation: '' },
  { term: 'A learner who experiences speech difficulties, difference, variation, struggles to produce specific sounds.', explanation: '' }
];
const wordsToAvoid: { term: string; reason: string }[] = [
  { term: 'Abnormal speech', reason: '' },
  { term: 'Speech impediment or impairment (unless medically diagnosed)', reason: '' },
  { term: 'Suffers from …', reason: '' },
  { term: 'Has a lisp', reason: '' },
  { term: 'Stammering girl/boy', reason: '' },
  { term: 'Stammerer.', reason: '' }
];

const understanding = {
  strengths: [
    'What do you like talking about?',
    'What helps you feel confident when you speak?'
  ] as string[],
  challenges: [
    'Is it difficult to find or order the words you want to say?',
    'What makes you feel frustrated when speaking?',
    'Do you have any hearing needs that impact your speech?'
  ] as string[],
  strategies: [
    { question: 'What helps you when you’re trying to say something? Do you use anything to help you ?', prompts: [] },
    { question: 'What is the easiest way for you to share your ideas?', prompts: [] },
    { question: 'Prompts:', prompts: ['drawing', 'mind maps', 'demonstrating', 'singing', 'writing.'] }
  ] as { question: string; prompts: string[] }[],
  advocacy: [
    'I need more time to speak.',
    'It helps me when you write things down.',
    'Please don’t interrupt. I need a moment to finish.'
  ] as string[]
};

const presentActionSheet = async () => {
  try {
    const actionSheet = await actionSheetController.create({
      header: 'Page Options',
      buttons: [
        {
          text: 'Print Page',
          icon: 'print-outline',
          handler: () => { printPage(); }
        },
        {
          text: 'Accessibility',
          icon: 'accessibility-outline',
          handler: () => { openAccessibilitySettings(); }
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

// Case Study note state
const caseStudyNote = ref('');
const autoSaveCaseStudyNote = () => {
  try {
    localStorage.setItem(`sage-cs-speech-language-needs-current`, JSON.stringify({ text: caseStudyNote.value }));
    ProgressService.saveCaseStudyCompletion('speech-language-needs');
  } catch {}
};
const saveCaseStudyNote = () => {
  try {
    localStorage.setItem(`sage-cs-speech-language-needs-current`, JSON.stringify({ text: caseStudyNote.value }));
  } finally {
    ProgressService.saveCaseStudyCompletion('speech-language-needs');
    toastController.create({ message: 'Case study note saved!', duration: 2000, position: 'bottom', color: 'success' }).then(t => t.present());
  }
};

const exportCaseStudyNote = () => {
  const content = `Case Study Note - Speech and Language Needs\n\n${caseStudyNote.value || 'No notes written yet.'}`;
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = window.document.createElement('a');
  a.href = url;
  a.download = 'case-study-speech-language-needs.txt';
  window.document.body.appendChild(a);
  a.click();
  window.document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toastController.create({ message: 'Case study note exported successfully!', duration: 2000, position: 'bottom', color: 'success' }).then(t => t.present());
};

const clearCaseStudyNote = () => {
  if (confirm('Are you sure you want to clear your case study note? This action cannot be undone.')) {
    caseStudyNote.value = '';
    localStorage.setItem(`sage-cs-speech-language-needs-current`, JSON.stringify({ text: '' }));
    ProgressService.saveCaseStudyCompletion('speech-language-needs');
    toastController.create({ message: 'Case study note cleared.', duration: 2000, position: 'bottom', color: 'warning' }).then(t => t.present());
  }
};

const challenges = {
  physical: [
    'In busy and rushed environments, learners may feel under pressure to speak quickly which may not be possible due to their speech needs.',
    'In noisy and over-stimulating environments, learners may experience anxiety, find it hard to focus, or worry about being heard.'
  ] as string[],
  social: [
    'Some learners struggle with expressive language. They find it difficult to convey their ideas due to challenges with word-finding. They might struggle to structure their language. This means others may not understand the learner’s speech.',
    'Challenges with speech can cause social anxiety and isolation, distracted behaviour and frustration.',
    'Some learners struggle with receptive language – understanding others.',
    'Learners might be vulnerable if they misinterpret sarcasm, idioms or exaggeration.',
    'Some learners may have slow processing speed or difficulties with auditory processing, so they may struggle to understand and join conversations.'
  ] as string[],
  tasks: [
    'Learners who have speech sound delays and disorders may struggle to articulate specific sounds, making substitutions, distortions or lisps. These difficulties make discussion-based tasks challenging.',
    'Learners who have motor language disorders may struggle to plan, sequence and conduct the movements needed to verbalise. These difficulties may make discussion-based tasks challenging.',
    'Learners who stammer might need more time to speak when answering questions, especially when under pressure.',
    'Learners may make spelling and grammatical errors in their writing because they struggle to spell phonetically or sequence language. Their writing might be overly simple if they struggle to find and order vocabulary.'
  ] as string[],
  assessment: [
    'Learners may find assessments more challenging if tasks rely solely on speaking or writing to convey their knowledge.',
    'Some children learn to use language in chunks/phrases rather than sounds, Gestalt Language Processing (GLP), so may struggle to respond to assessment questions unless they have been taught phrases to use.',
    'Learners might struggle to read and interpret written language.'
  ] as string[]
};

const enabling = {
  physical: [
    'Reduce background auditory and visual noise.',
    'Some learners may benefit from facing the speaker. For other learners, they may feel less pressured if they sit further away. Always ask the learner.'
  ] as string[],
  social: [
    'Take time to explain sarcasm and non-specific language.',
    'Teach and rehearse social scripts.',
    'Slow the conversation and ensure learners know they have time to think and speak.',
    'Be concise and specific.',
    'Ensure one person speaks at a time.',
    'Give learners equal opportunity to speak and participate.'
  ] as string[],
  tasks: [
    'Allow extra processing time.',
    'Provide structures/templates to help learners plan and sequence language.',
    'Avoid telling a learner that they articulated a sound incorrectly. Instead, model the correct pronunciation through your speech.',
    'Avoid finishing a leaners sentence. Instead, allow time for the learner to finish what they are saying.',
    'Teach spelling using multiple approaches, including letter names, sounds, and rules for using units of words (for example, prefixes and suffixes).',
    'Minimal pairs are two words that sound similar. They have one sound that is different. This different sound means that the word changes. An example could be ‘key and tea’ – they sound the same apart from the first sound. Minimal pairs games and activities help children to listen, and practise sounds they find tricky.',
    'Model ways to add detail to spoken and written responses.',
    'Pre-teach new vocabulary.'
  ] as string[],
  assessment: [
    'Ensure that you are aware of a learner’s speech needs. They should not impact their ability to answer questions verbally, but they may impact their ability to read and spell aloud.',
    'Diversify assessment approaches: do not solely rely on speaking and writing.',
    'Allow extra time.',
    'Explicitly teach strategies for interpreting written and spoken information.',
    'Explicitly teach phrases to use when answering assessment questions.',
    'A stammer is not an indication of a leaner’s level of intelligence.'
  ] as string[]
};

const resources = {
  electronic: [] as any[],
  paper: [] as Array<{ title: string; description?: string; availability?: string }>,
  organizations: [] as Array<{ name: string; description?: string; contact?: string }>
};
const electronicLines: string[] = [
  'Playing, Talking, Learning – a language progress checker used in Zimbabwe. Note that this resource is typically for younger girls, but it is relevant for those who struggle with speech and language at any age. https://playingtalkinglearning.org/product/traffic-light-profile/',
  'Information sheet about Gestalt Language Processing. https://www.coventrychildrensslt.co.uk/wp-content/uploads/2023/10/Gestalt-Language-Processing.pdf',
  'The Michael Palin Centre for Stammering – guidance for supporting learners who stammer. https://michaelpalincentreforstammering.org/wp-content/uploads/2023/11/MPC-School-Suggestions-Sheet.pdf',
  'Nottingham Trent University DIY Toolkit for Alternative & Inclusive Assessment Practice – toolkit to support inclusive assessment practice. https://inclusioninhe.com/wp-content/uploads/2020/07/nottingham-trent-university-diy-toolkit-for-inclusive-assessment.pdf'
];
const organizationsLines: string[] = [
  'NHS Speech, Language & Communication – information and advice about various speech and language needs. https://cambspborochildrenshealth.nhs.uk/speech-language-and-communication/',
  'Zimbabwe Association of Audiology and Speech Pathology (ZAASP) – promoting inclusive practice and resources. https://www.facebook.com/p/Zimbabwe-Association-of-Audiology-and-Speech-Pathology-61557098333881/'
];

// Concrete resources
resources.paper = [
  {
    title: 'Symbols to support communication. Learners might use these as physical cards, and others on devices. A speech therapist might provide symbols, or you may devise your own to support all pupils.',
    description: ''
  },
  {
    title: 'Storybooks – these include characters with a stammer. For examples, see https://stamma.org/get-help/parents/books-parents-children?gad_source=1&gad_campaignid=17747066382&gbraid=0AAAAADjl8m0K1kwZhfEOjGVJa_5xg_vmx&gclid=Cj0KCQjwtMHEBhC-ARIsABua5iQZfI4p_rVUFfwne91KSv22wDEtWLgJLrGbw_vECu5iw0ZmbgBhY6kaApobEALw_wcB',
    description: ''
  }
];

const reflection = ref({
  caseStudyReflection: '',
  practiceReflection: ''
});

const reflectionProgress = computed(() => {
  const total = 2;
  const completed = [
    reflection.value.caseStudyReflection.trim(),
    reflection.value.practiceReflection.trim()
  ].filter(Boolean).length;
  return completed / total;
});

let saveTimer: ReturnType<typeof setTimeout> | null = null;
const autoSaveReflection = () => {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      localStorage.setItem('speech-language-reflection', JSON.stringify(reflection.value));
      ProgressService.saveReflectionCompletion('speech-language-needs');
    } catch {}
  }, 500);
};

const saveReflection = () => {
  try {
    localStorage.setItem(`sage-reflection-speech-language-needs-current`, JSON.stringify(reflection.value));
    ProgressService.saveReflectionCompletion('speech-language-needs');
  } finally {
    toastController.create({ message: 'Reflection saved successfully!', duration: 2000, position: 'bottom', color: 'success' }).then(t => t.present());
  }
};

const exportReflection = () => {
  const content = `Reflective task - Speech and Language Needs\n\n1) CASE STUDY REFLECTION:\n${reflection.value.caseStudyReflection || 'No reflection written yet.'}\n\n2) PRACTICE REFLECTION:\n${reflection.value.practiceReflection || 'No reflection written yet.'}`;
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = window.document.createElement('a');
  a.href = url;
  a.download = 'reflection-speech-language-needs.txt';
  window.document.body.appendChild(a);
  a.click();
  window.document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toastController.create({ message: 'Reflection exported successfully!', duration: 2000, position: 'bottom', color: 'success' }).then(t => t.present());
};

const clearReflection = () => {
  if (confirm('Are you sure you want to clear all your reflections? This action cannot be undone.')) {
    reflection.value = { caseStudyReflection: '', practiceReflection: '' };
    localStorage.setItem(`sage-reflection-speech-language-needs-current`, JSON.stringify(reflection.value));
    ProgressService.saveReflectionCompletion('speech-language-needs');
    toastController.create({ message: 'Reflection cleared successfully!', duration: 2000, position: 'bottom', color: 'warning' }).then(t => t.present());
  }
};

onMounted(() => {
  console.log('[PageAnchor] SpeechLanguageNeeds mounted', { path: route.path });
  try {
    const saved = localStorage.getItem('speech-language-reflection');
    if (saved) reflection.value = JSON.parse(saved);
  } catch {}

  try {
    const csSaved = localStorage.getItem('sage-cs-speech-language-needs-current');
    if (csSaved) {
      const parsed = JSON.parse(csSaved);
      caseStudyNote.value = typeof parsed?.text === 'string' ? parsed.text : '';
    }
  } catch {}

  void consumePendingAnchor(route.path).then((didScroll) => {
    console.log('[PageAnchor] SpeechLanguageNeeds consume result', { didScroll });
  });
});
</script>

<style scoped>
ion-card { margin: 16px; }
.reflection-section { margin-top: 12px; }
.reflection-textarea { margin-top: 8px; }
.reflection-progress { margin-top: 12px; display: flex; align-items: center; gap: 8px; }
.reflection-actions { margin-top: 12px; display: flex; flex-direction: column; gap: 8px; }
.case-study-text { margin-bottom: 12px; }
.case-study-text ul { margin: 8px 0 12px 20px; }
.case-study-text .case-study-subheading { margin-top: 12px; margin-bottom: 8px; font-weight: 700; }
.case-study-prompts { margin-top: 12px; margin-left: 20px; }
.case-study-prompts li { margin-bottom: 6px; }
.case-study-images { display: grid; grid-template-columns: 1fr; gap: 12px; margin-bottom: 12px; }
.case-study-image { width: 100%; height: auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
@media (min-width: 768px) {
  .case-study-images { grid-template-columns: repeat(1, 1fr); }
}
</style>


