<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ getPageTitle() }}</ion-title>
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
          <ion-title size="large">{{ getPageTitle() }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <!-- Home Page -->
        <div v-if="route.params.id === 'Home'">
          <div class="home-mobile-logo">
            <img src="/sage-logo.svg" alt="SAGE logo" class="home-mobile-logo-img" />
            <div class="home-mobile-logo-text">
              Zimbabwe Disability<br />Toolkit
            </div>
          </div>

          <!-- SAGE Cover Illustration -->
          <div class="sage-cover-illustration-wrapper">
            <img src="/Letwin_Gwambura_Danda.jpg" alt="Classroom scene of learners studying together, including a learner using a wheelchair" class="sage-cover-illustration" />
          </div>

          <ion-card>
            <ion-card-content>
              <p>Welcome to the Zimbabwe Disability Tookit App. In this section you will find an overview of the app, including the background, objectives, using the toolkit as an information source or a professional learning resource, and how to achieve your Certificate of Participation.</p>
            </ion-card-content>
          </ion-card>

          <ion-card>
            <ion-card-content>
              <p>This digital disability toolkit has been developed in collaboration with the Ministry of Primary and Secondary Education, Plan International, CBM Global, AWET and The Open University.</p>
              <p>This toolkit is designed to support teachers working with learners with disabilities in formal and non-formal education settings. It offers educators practical information and signposts to sources of further support for working with learners with disabilities. The toolkit includes classroom examples of good practice in educational settings in Zimbabwe. Educators will be able to use the toolkit, adapting the resources for their own settings to empower learners with disabilities and to promote a culture of understanding and inclusion among all learners, their families and communities.</p>
            </ion-card-content>
          </ion-card>

          <!-- General information highlights duplicated locally for the home page -->
          <ion-card id="home-introduction-background">
            <ion-card-header>
              <ion-card-title>Background to the toolkit</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <p>According to the World Health Organisation, around 15% of the world’s population has some form of disability. Many are excluded from education and face barriers that stop them from taking part in society equally with others.</p>
              <p>Getting an education is especially difficult in low- and middle-income countries due to challenges, such as:</p>
              <ul>
                <li>negative attitudes and stigma about disability</li>
                <li>long distances to school and/or poor transport networks</li>
                <li>school buildings and facilities that are not accessible</li>
                <li>teaching and learning materials that are not usable by everyone</li>
                <li>a shortage of teachers trained to support learners with disabilities.</li>
              </ul>
              <p>To change this, there is a need for clear, practical guidance on how to teach in ways that include all learners.</p>
              <p>The toolkit gives educators practical guidance on how to include learners with disabilities into all aspects of school and classroom life and support their progress in learning. The toolkit identifies resources that can be adapted for various needs and acts as a bridge between policy and practice by turning laws and commitments, such as the Convention on the Rights of Persons with Disabilities, into real actions that make classrooms inclusive.</p>
            </ion-card-content>
          </ion-card>

          <ion-card id="home-introduction-objectives">
            <ion-card-header>
              <ion-card-title>Objectives of the toolkit</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <p>The toolkit aims to help educators and others to:</p>
              <ol type="i">
                <li>use respectful language when talking to or about learners with disabilities</li>
                <li>recognise, screen, and refer learners with disabilities for further assessment and support</li>
                <li>teach in inclusive ways that meet the needs of all learners.</li>
              </ol>
            </ion-card-content>
          </ion-card>

          <ion-card id="home-introduction-info-source">
            <ion-card-header>
              <ion-card-title>Toolkit as an information source</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <p>The digital toolkit can be used by educators as an interactive and accessible information source which provides advice and guidance for learners in their classes or groups.</p>
              <p>It includes information in written, picture and video format to inform and illustrate strategies and resources for learners with different needs. The signposting tool can be used to screen learners and decide next steps.</p>
            </ion-card-content>
          </ion-card>

          <ion-card id="home-introduction-pd-resource">
            <ion-card-header>
              <ion-card-title>Toolkit as a professional learning resource</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <p>The digital toolkit can also be used by educators as a source of professional learning. Educators can choose to complete reflective tasks and quizzes.</p>
              <p>Responses to the reflective tasks can be typed into the App and are saved so that you can return to them at a later date. Quizzes are automatically marked and feedback given to support learning.</p>
            </ion-card-content>
          </ion-card>

          <ion-card id="home-introduction-certificate">
            <ion-card-header>
              <ion-card-title>Certificate of Participation</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <p>Educators who choose to use the toolkit as a professional learning resource should complete all of the tasks and quizzes in order to receive a certificate of participation which recognises their engagement with the learning and resources in this toolkit.</p>
            </ion-card-content>
          </ion-card>

          <ion-card>
            <ion-card-content>
              <div class="partners-strip single" role="img" aria-label="Programme sponsors and partners">
                <img src="/sage_logo_strip.png" alt="Programme partners" class="partners-strip-img" />
              </div>
              <p>
                SAGE (Supporting Adolescent Girls' Education) is a UK Aid-funded programme through the UK's Foreign,
                Commonwealth and Development Office's Girls' Education Challenge initiative, led by Plan International
                and involving a consortium of six partners and the Ministry of Primary and Secondary Education, Zimbabwe
                (MoPSE).
              </p>
            </ion-card-content>
          </ion-card>

          <ion-card>
            <ion-card-header>
              <ion-card-title>Acknowledgments</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <p>With thanks to all authors, partners and schools who took part in the creation and testing of this toolkit</p>
            </ion-card-content>
          </ion-card>

          <!-- Demo Video Player with Transcript -->
<!--           <ion-card>
            <ion-card-header>
              <ion-card-title>Demo Video: Inclusive Education</ion-card-title>
              <ion-card-subtitle>Sample video with transcript</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <video controls style="width: 100%; border-radius: 8px;">
                <source src="/demo-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <ion-accordion-group>
                <ion-accordion value="video-transcript">
                  <ion-item slot="header">
                    <ion-icon :icon="documentOutline" slot="start"></ion-icon>
                    <ion-label>Transcript</ion-label>
                  </ion-item>
                  <div class="ion-padding" slot="content">
                    <p><strong>Speaker 1:</strong> Welcome to this demonstration of inclusive education in action. In this video, you will see how teachers can adapt their classrooms to support all learners, including those with disabilities.</p>
                    <p><strong>Speaker 2:</strong> Notice how the teacher uses both visual and verbal instructions, and how students are encouraged to participate in different ways.</p>
                    <p><strong>Speaker 1:</strong> Remember, inclusion benefits everyone. Thank you for watching!</p>
                  </div>
                </ion-accordion>
              </ion-accordion-group>
            </ion-card-content>
          </ion-card> -->

          <!-- Demo Audio Player with Transcript -->
<!--           <ion-card>
            <ion-card-header>
              <ion-card-title>Demo Audio: Welcome Message</ion-card-title>
              <ion-card-subtitle>Sample audio with transcript</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <audio controls style="width: 100%;">
                <source src="/demo-audio.mp3" type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
              <ion-accordion-group>
                <ion-accordion value="audio-transcript">
                  <ion-item slot="header">
                    <ion-icon :icon="documentOutline" slot="start"></ion-icon>
                    <ion-label>Transcript</ion-label>
                  </ion-item>
                  <div class="ion-padding" slot="content">
                    <p><strong>Narrator:</strong> Welcome to the SAGE Disability Toolkit. This audio guide will help you get started and make the most of the resources available. Remember, every learner is unique, and your support makes a difference!</p>
                  </div>
                </ion-accordion>
              </ion-accordion-group>
            </ion-card-content>
          </ion-card> -->

          <!-- Media Players Section -->
<!--           <ion-card>
            <ion-card-header>
              <ion-card-title>Media Resources</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <MediaPlayer 
                type="audio"
                title="Demo Audio: Welcome Message"
                subtitle="Audio guide for educators"
                src="/demo-audio.mp3"
                :duration="180">
              </MediaPlayer>
              <ion-accordion-group>
                <ion-accordion value="media-audio-transcript">
                  <ion-item slot="header">
                    <ion-icon :icon="documentOutline" slot="start"></ion-icon>
                    <ion-label>Transcript</ion-label>
                  </ion-item>
                  <div class="ion-padding" slot="content">
                    <p><strong>Narrator:</strong> Welcome to the SAGE Disability Toolkit. This audio guide will help you get started and make the most of the resources available. Remember, every learner is unique, and your support makes a difference!</p>
                  </div>
                </ion-accordion>
              </ion-accordion-group>
              
              <MediaPlayer 
                type="video"
                title="Demo Video: Inclusive Education"
                subtitle="Video tutorial on Universal Design for Learning"
                src="/demo-video.mp4"
                :duration="300">
              </MediaPlayer>
              <ion-accordion-group>
                <ion-accordion value="media-video-transcript">
                  <ion-item slot="header">
                    <ion-icon :icon="documentOutline" slot="start"></ion-icon>
                    <ion-label>Transcript</ion-label>
                  </ion-item>
                  <div class="ion-padding" slot="content">
                    <p><strong>Speaker 1:</strong> Welcome to this demonstration of inclusive education in action. In this video, you will see how teachers can adapt their classrooms to support all learners, including those with disabilities.</p>
                    <p><strong>Speaker 2:</strong> Notice how the teacher uses both visual and verbal instructions, and how students are encouraged to participate in different ways.</p>
                    <p><strong>Speaker 1:</strong> Remember, inclusion benefits everyone. Thank you for watching!</p>
                  </div>
                </ion-accordion>
              </ion-accordion-group>
            </ion-card-content>
          </ion-card> -->
        </div>

        <!-- Enhanced Screening Tool/Quiz -->
        <div v-else-if="route.params.id === 'Screening'">
          <ion-card>
            <ion-card-content>
              <p>Screening and referring learners with disabilities.</p>
            </ion-card-content>
          </ion-card>
          <ion-card>
            <ion-card-header>
              <ion-card-title>Background</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <p>Learners with disabilities are not all the same; they have different strengths and challenges. Because of this diversity, educators need simple but reliable ways to identify learners who may require extra support.</p>
              <p>One recognised tool is the Washington Group Short Set of Questions (WGSSQ). These six questions are used worldwide to screen learners for possible difficulties in seeing, hearing, walking, remembering, communicating and self-care. The results can guide teachers in referring learners for further assessment by specialists such as doctors, psychologists or therapists, and/or in putting in place a strategy to support the learner in the classroom.</p>
              <p>There is an interactive version of the six questions in the toolkit — the Signposting Tool — which points you in the direction of specialist support, organisations that might be of assistance and aspects of the toolkit that will be of use.</p>
            </ion-card-content>
          </ion-card>

          <ion-card>
            <ion-card-header>
              <ion-card-title>Recommended steps for posing questions in the Signposting Tool</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <ol type="i">
                <li><strong>Introduce yourself clearly</strong> - Begin by greeting the learner and telling them your name. This helps to build trust and respect.</li>
                <li><strong>Explain the purpose</strong> - Tell the learner why you are asking the questions. For example, ‘These questions help us understand if you need extra support in learning.’ This reassures the learner that the process is meant to help them, not to judge them.</li>
                <li><strong>Ask the six questions</strong> - Use the WGSSQ on the Signposting Tool tab to check whether the learner has any difficulty in the key areas (seeing, hearing, walking, remembering, communicating and self-care). Ask in simple and clear language.</li>
                <li><strong>Ensure confidentiality</strong> - The answers must be kept private and only shared with relevant professionals. Learners should feel safe knowing their information will not be misused.</li>
                <li><strong>Refer for assessment and support and/or put strategies in place to support the learner</strong> - If the tool shows possible challenges, refer the learner to the right specialists or services for further assessment. Work with parents, community health workers or organisations of persons with disabilities to identify support needed. If the Signposting Tool suggests some adjustments to your practice might be needed, draw on your experience and what you have learned from the information and activities in the toolkit to put strategies in place to support the learner.</li>
              </ol>
            </ion-card-content>
          </ion-card>
          <ion-card class="wgssq-card">
            <ion-item
              button
              :detail="false"
              lines="none"
              class="wgssq-card-header"
              :aria-expanded="wgssqExpanded"
              aria-controls="wgssq-card-content"
              @click="toggleWgssqCard"
            >
              <ion-label>
                <h2>Washington Group Short Set of Questions (WGSSQ)</h2>
                <p>Identify areas where support may be needed</p>
              </ion-label>
              <ion-icon :icon="chevronDown" slot="end" :class="{ rotated: wgssqExpanded }"></ion-icon>
            </ion-item>
            <ion-card-content v-show="wgssqExpanded" id="wgssq-card-content" class="wgssq-card-content">
              <p>Answer each question. There are no right or wrong answers. Selecting an option will reveal guidance.</p>

              <div class="question-block" v-for="q in screeningQuestions" :key="q.id">
                <h4 class="question-title">{{ q.title }}</h4>
                <p class="question-prompt">{{ q.prompt }}</p>
                <ion-radio-group v-model="responses[q.id]">
                  <ion-item v-for="opt in q.options" :key="opt.value" lines="none">
                    <ion-radio :value="opt.value" slot="start"></ion-radio>
                    <ion-label>{{ opt.label }}</ion-label>
                  </ion-item>
                </ion-radio-group>

                <div class="guidance" v-if="responses[q.id]">
                  <div class="guidance-badge">Guidance</div>
                  <div v-html="optContent(q, responses[q.id])"></div>
                </div>

                <div class="divider"></div>
              </div>

              <p class="adapted-note">
                Adapted from
                <a
                  href="https://www.washingtongroup-disability.com/question-sets/wg-short-set-on-functioning-wg-ss/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WG Short Set on Functioning (WG-SS) - The Washington Group on Disability Statistics
                </a>
              </p>
            </ion-card-content>
          </ion-card>

          <ion-card id="signposting-reflection">
            <ion-card-header>
              <ion-card-title>Reflection</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <div class="reflection-section">
                <p>What key points are important for you to take from this section about screening and referring learners?</p>
                <ion-textarea
                  v-model="signpostingReflectionText"
                  placeholder="Write your reflections here…"
                  :rows="6"
                  :auto-grow="true"
                  :maxlength="2000"
                  :counter="true"
                  class="reflection-textarea"
                  @ionInput="autoSaveSignpostingReflection"
                ></ion-textarea>
              </div>

              <div class="reflection-actions">
                <ion-button expand="block" color="primary" @click="saveSignpostingReflection">
                  <ion-icon :icon="save" slot="start"></ion-icon>
                  Save Reflection
                </ion-button>

                <ion-button expand="block" fill="outline" color="warning" @click="clearSignpostingReflection">
                  <ion-icon :icon="trash" slot="start"></ion-icon>
                  Clear All
                </ion-button>
              </div>
            </ion-card-content>
          </ion-card>

          <ion-card>
            <ion-card-header>
              <ion-card-title>Summary</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <p>Screening using the WGSSQ is the first step in identifying learners who may need extra support. By handling the process with care, respect and confidentiality, educators can ensure that learners with disabilities are supported and where appropriate referred for further help they need to succeed in school.</p>
            </ion-card-content>
          </ion-card>
        </div>

        <!-- Enhanced About Page -->
        <div v-else-if="route.params.id === 'Contacts'">
          <!-- Contacts -->
          <ion-card>
            <ion-card-header>
              <ion-card-title>Zimbabwe organizations and key contacts</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <div class="contacts-table" role="table" aria-label="Zimbabwe organizations and key contacts">
                <div class="contacts-header" role="row">
                  <div class="contacts-cell contacts-name" role="columnheader">Organization</div>
                  <div class="contacts-cell contacts-expertise" role="columnheader">Area of expertise</div>
                  <div class="contacts-cell contacts-toggle" role="columnheader">Contact info</div>
                </div>

                <ion-accordion-group class="contacts-accordion" :multiple="true">
                  <ion-accordion v-for="contact in contacts" :key="contact.name" :value="contact.name">
                    <div class="contacts-row" slot="header" role="row">
                      <div class="contacts-cell contacts-name" role="cell">
                        <strong>{{ contact.name }}</strong>
                      </div>
                      <div class="contacts-cell contacts-expertise" role="cell">
                        <p>{{ contact.expertise }}</p>
                      </div>
                      <div class="contacts-cell contacts-toggle" role="cell">
                        <span>View details</span>
                        <ion-icon :icon="chevronDown" aria-hidden="true"></ion-icon>
                      </div>
                    </div>

                    <div class="contact-details" slot="content">
                      <div class="contact-detail" v-if="contact.address">
                        <h4>Address</h4>
                        <p class="pre-line">{{ contact.address }}</p>
                      </div>

                      <div class="contact-detail" v-if="contact.phones.length">
                        <h4>Telephone</h4>
                        <ul>
                          <li v-for="phone in contact.phones" :key="phone">{{ phone }}</li>
                        </ul>
                      </div>

                      <div class="contact-detail" v-if="contact.emails.length">
                        <h4>Email</h4>
                        <ul>
                          <li v-for="email in contact.emails" :key="email">{{ email }}</li>
                        </ul>
                      </div>

                      <div class="contact-detail" v-if="contact.website">
                        <h4>Website / resource</h4>
                        <p class="pre-line">{{ contact.website }}</p>
                        <ion-button
                          v-if="formatWebsite(contact.website)"
                          size="small"
                          fill="clear"
                          :href="formatWebsite(contact.website)"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Visit link
                          <ion-icon :icon="openOutline" slot="end"></ion-icon>
                        </ion-button>
                      </div>
                    </div>
                  </ion-accordion>
                </ion-accordion-group>
              </div>
            </ion-card-content>
          </ion-card>

          <ion-card>
            <ion-card-header>
              <ion-card-title>Worldwide organizations and key contacts</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <div class="contacts-table" role="table" aria-label="Worldwide organizations and key contacts">
                <div class="contacts-header" role="row">
                  <div class="contacts-cell contacts-name" role="columnheader">Organization</div>
                  <div class="contacts-cell contacts-expertise" role="columnheader">Area of expertise</div>
                  <div class="contacts-cell contacts-toggle" role="columnheader">Contact info</div>
                </div>

                <ion-accordion-group class="contacts-accordion" :multiple="true">
                  <ion-accordion v-for="contact in worldwideContacts" :key="contact.name" :value="contact.name">
                    <div class="contacts-row" slot="header" role="row">
                      <div class="contacts-cell contacts-name" role="cell">
                        <strong>{{ contact.name }}</strong>
                      </div>
                      <div class="contacts-cell contacts-expertise" role="cell">
                        <p>{{ contact.expertise }}</p>
                      </div>
                      <div class="contacts-cell contacts-toggle" role="cell">
                        <span>View details</span>
                        <ion-icon :icon="chevronDown" aria-hidden="true"></ion-icon>
                      </div>
                    </div>

                    <div class="contact-details" slot="content">
                      <div class="contact-detail" v-if="contact.address">
                        <h4>Address</h4>
                        <p class="pre-line">{{ contact.address }}</p>
                      </div>

                      <div class="contact-detail" v-if="contact.phones.length">
                        <h4>Telephone</h4>
                        <ul>
                          <li v-for="phone in contact.phones" :key="phone">{{ phone }}</li>
                        </ul>
                      </div>

                      <div class="contact-detail" v-if="contact.emails.length">
                        <h4>Email</h4>
                        <ul>
                          <li v-for="email in contact.emails" :key="email">{{ email }}</li>
                        </ul>
                      </div>

                      <div class="contact-detail" v-if="contact.website">
                        <h4>Website / resource</h4>
                        <p class="pre-line">{{ contact.website }}</p>
                        <ion-button
                          v-if="formatWebsite(contact.website)"
                          size="small"
                          fill="clear"
                          :href="formatWebsite(contact.website)"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Visit link
                          <ion-icon :icon="openOutline" slot="end"></ion-icon>
                        </ion-button>
                      </div>
                    </div>
                  </ion-accordion>
                </ion-accordion-group>
              </div>
            </ion-card-content>
          </ion-card>
        </div>

        <div v-else>
          <strong class="capitalize">{{ route.params.id }}</strong>
          <p>Content for {{ route.params.id }} coming soon...</p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref, computed } from 'vue';
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
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonProgressBar,
  IonNote,
  IonAccordionGroup,
  IonAccordion,
  IonSegment,
  IonSegmentButton,
  IonSearchbar,
  IonThumbnail,
  IonChip,
  IonFab,
  IonFabButton,
  IonRadioGroup,
  IonRadio,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonCheckbox,
  IonToggle,
  IonRange,
  IonTextarea,
  actionSheetController,
  toastController
} from '@ionic/vue';
import { ProgressService } from '../services/ProgressService';
import { 
  accessibilityOutline,
  informationCircleOutline,
  documentOutline,
  videocamOutline,
  micOutline,
  ellipsisVertical,
  playCircle,
  play,
  checkmarkCircle,
  time,
  ellipse,
  checkmark,
  shieldCheckmark,
  informationCircle,
  refresh,
  download,
  save,
  trash,
  helpCircle,
  star,
  settings,
  heart,
  add,
  calendar,
  mail,
  bulbOutline,
  helpCircleOutline,
  bodyOutline,
  chatbubbleOutline,
  eyeOutline,
  printOutline,
  trophy,
  arrowForward,
  openOutline,
  chevronDown
} from 'ionicons/icons';
import MediaPlayer from '../components/MediaPlayer.vue';
import { ref as vueRef } from 'vue';
import contactsData from '@/data/contacts.json';
import worldwideContactsData from '@/data/worldwideContacts.json';

const route = useRoute();
const router = useRouter();

type ContactRecord = {
  name: string;
  address: string;
  expertise: string;
  phones: string[];
  emails: string[];
  website: string;
};

const contacts = contactsData as ContactRecord[];
const worldwideContacts = worldwideContactsData as ContactRecord[];

// Quiz/Screening state
const screeningStarted = ref(false);
const screeningCompleted = ref(false);
const currentQuestion = ref(0);
const currentAnswer = ref<any>('');
const selectedVideo = ref('udl-video');
const searchTerm = ref('');
const selectedCategory = ref('all');

// Signposting reflection state
const signpostingReflectionText = ref('');
const signpostingStorageKey = 'signposting-reflection';

let signpostingSaveTimer: ReturnType<typeof setTimeout> | null = null;
const autoSaveSignpostingReflection = () => {
  if (signpostingSaveTimer) clearTimeout(signpostingSaveTimer);
  signpostingSaveTimer = setTimeout(() => {
    try {
      localStorage.setItem(signpostingStorageKey, JSON.stringify({ reflection: signpostingReflectionText.value }));
      // Mark as completed if non-empty using ProgressService reflection API with a custom pageId
      if (signpostingReflectionText.value.trim()) {
        // Persist completion meta so it appears in progress
        localStorage.setItem('sage-reflection-signposting-current', JSON.stringify({
          caseStudyReflection: signpostingReflectionText.value,
          practiceReflection: 'n/a',
          nextSteps: 'n/a'
        }));
        ProgressService.saveReflectionCompletion('signposting');
      }
    } catch {}
  }, 400);
};

const saveSignpostingReflection = () => {
  try {
    localStorage.setItem(signpostingStorageKey, JSON.stringify({ reflection: signpostingReflectionText.value }));
    if (signpostingReflectionText.value.trim()) {
      localStorage.setItem('sage-reflection-signposting-current', JSON.stringify({
        caseStudyReflection: signpostingReflectionText.value,
        practiceReflection: 'n/a',
        nextSteps: 'n/a'
      }));
      ProgressService.saveReflectionCompletion('signposting');
    }
  } finally {
    if (typeof toastController !== 'undefined') {
      toastController.create({ message: 'Reflection saved successfully!', duration: 2000, position: 'bottom', color: 'success' }).then(t => t.present());
    }
  }
};

const clearSignpostingReflection = () => {
  if (confirm('Are you sure you want to clear your reflection? This action cannot be undone.')) {
    signpostingReflectionText.value = '';
    localStorage.setItem(signpostingStorageKey, JSON.stringify({ reflection: '' }));
    localStorage.removeItem('sage-reflection-signposting-current');
    // Progress will update on next save if needed
    if (typeof toastController !== 'undefined') {
      toastController.create({ message: 'Reflection cleared successfully!', duration: 2000, position: 'bottom', color: 'warning' }).then(t => t.present());
    }
  }
};

// Add separate state for checkbox options
const checkboxAnswers = ref<{ [key: string]: boolean }>({});

// Progress tracking
const overallProgress = ref(ProgressService.getOverallProgress());
const achievementLevel = computed(() => ProgressService.getAchievementLevel(overallProgress.value.percentage));

// Add a computed property for the current question
const currentQuizQuestionObj = computed(() => questions[currentQuestion.value]);

// Quiz questions
type QuizQuestion =
  | { type: 'radio'; question: string; options: { value: string; text: string }[] }
  | { type: 'select'; question: string; options: { value: string; text: string }[] }
  | { type: 'input'; question: string; placeholder: string }
  | { type: 'checkbox'; question: string; options: { value: string; text: string }[] }
  | { type: 'toggle'; question: string }
  | { type: 'range'; question: string; min: number; max: number; step?: number }
  | { type: 'textarea'; question: string; placeholder: string; rows?: number };

const questions: QuizQuestion[] = [
  {
    type: 'radio',
    question: "What is the primary purpose of Universal Design for Learning (UDL)?",
    options: [
      { value: 'a', text: 'To create learning experiences that work for everyone' },
      { value: 'b', text: 'To provide special accommodations for disabled students only' },
      { value: 'c', text: 'To reduce the cost of educational materials' },
      { value: 'd', text: 'To standardize all learning approaches' }
    ]
  },
  {
    type: 'select',
    question: "Select the most accessible font for students with dyslexia:",
    options: [
      { value: 'arial', text: 'Arial' },
      { value: 'times', text: 'Times New Roman' },
      { value: 'comic', text: 'Comic Sans' },
      { value: 'impact', text: 'Impact' }
    ]
  },
  {
    type: 'input',
    question: "In your own words, describe one way to make a classroom more inclusive:",
    placeholder: "Type your answer here..."
  },
  {
    type: 'checkbox',
    question: "Which of the following are assistive technologies? (Select all that apply)",
    options: [
      { value: 'screenreader', text: 'Screen Reader' },
      { value: 'hearingaid', text: 'Hearing Aid' },
      { value: 'calculator', text: 'Calculator' },
      { value: 'wheelchair', text: 'Wheelchair' }
    ]
  },
  {
    type: 'toggle',
    question: "Do you use assistive technology in your classroom?"
  },
  {
    type: 'range',
    question: "How confident are you in supporting students with disabilities? (0 = Not confident, 10 = Very confident)",
    min: 0,
    max: 10,
    step: 1
  },
  {
    type: 'textarea',
    question: "Describe a specific challenge you've faced in supporting students with disabilities and how you addressed it:",
    placeholder: "Share your experience here...",
    rows: 6
  }
];

// Quiz results
const results = ref([
  {
    name: 'Physical Disabilities',
    description: 'Understanding of visual, hearing, and mobility impairments',
    score: 85,
    level: 'Advanced',
    color: 'primary',
    icon: 'body-outline'
  },
  {
    name: 'Cognition & Learning',
    description: 'Knowledge of dyslexia, ADHD, and learning differences',
    score: 72,
    level: 'Intermediate',
    color: 'secondary',
    icon: 'bulb-outline'
  },
  {
    name: 'Communication & Interaction',
    description: 'Awareness of autism spectrum and social communication needs',
    score: 68,
    level: 'Intermediate',
    color: 'tertiary',
    icon: 'chatbubble-outline'
  },
  {
    name: 'Multiple Impairments',
    description: 'Understanding of complex and combined disabilities',
    score: 45,
    level: 'Beginner',
    color: 'warning',
    icon: 'medical-outline'
  }
]);

// Resources data
const resources = ref([
  {
    id: 1,
    title: 'Accessibility Guidelines',
    description: 'Comprehensive guide for creating accessible content',
    category: 'documents',
    icon: documentOutline,
    color: 'primary'
  },
  {
    id: 2,
    title: 'Case Study Videos',
    description: 'Real-world examples of inclusive teaching practices',
    category: 'videos',
    icon: videocamOutline,
    color: 'secondary'
  },
  {
    id: 3,
    title: 'Audio Resources',
    description: 'Podcasts and audio guides for educators',
    category: 'audio',
    icon: micOutline,
    color: 'tertiary'
  },
  {
    id: 4,
    title: 'UDL Implementation Guide',
    description: 'Step-by-step guide to implementing UDL principles',
    category: 'documents',
    icon: documentOutline,
    color: 'success'
  },
  {
    id: 5,
    title: 'Assistive Technology Overview',
    description: 'Video overview of available assistive technologies',
    category: 'videos',
    icon: videocamOutline,
    color: 'warning'
  }
]);

const filteredResources = computed(() => {
  let filtered = resources.value;
  
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(r => r.category === selectedCategory.value);
  }
  
  if (searchTerm.value) {
    filtered = filtered.filter(r => 
      r.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      r.description.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
  }
  
  return filtered;
});

const getPageTitle = () => {
  const rawId = route.params.id;
  if (rawId === undefined || rawId === null) {
    return 'Home';
  }
  const id = String(rawId);
  console.log('Route ID:', id); // Debug logging
  
  // Handle case sensitivity - check both exact match and case-insensitive
  const titles: { [key: string]: string } = {
    'Home': 'Home and introduction',
    'home': 'Home and introduction', // Add lowercase version
    'Screening': 'Signposting tool',
    'Contacts': 'Contacts'
  };
  
  // Try exact match first, then case-insensitive
  let title = titles[id];
  if (!title) {
    // Try to find a case-insensitive match
    const lowerId = id.toLowerCase();
    for (const [key, value] of Object.entries(titles)) {
      if (key.toLowerCase() === lowerId) {
        title = value;
        break;
      }
    }
  }
  
  const finalTitle = title || id || 'Home and introduction';
  console.log('Page title:', finalTitle); // Debug logging
  return finalTitle;
};

const startScreening = () => {
  screeningStarted.value = true;
  currentQuestion.value = 0;
  // Set initial answer type
  const q = questions[0];
  if (q.type === 'checkbox') {
    currentAnswer.value = [];
    // Initialize checkbox answers
    checkboxAnswers.value = {};
    if (q.type === 'checkbox') {
      q.options.forEach(option => {
        checkboxAnswers.value[option.value] = false;
      });
    }
  } else if (q.type === 'toggle') {
    currentAnswer.value = false;
  } else if (q.type === 'range') {
    currentAnswer.value = q.min;
  } else {
    currentAnswer.value = '';
  }
  screeningCompleted.value = false;
};

const nextQuestion = () => {
  if (currentQuestion.value < questions.length - 1) {
    currentQuestion.value++;
    // Set initial answer type for next question
    const nextQ = questions[currentQuestion.value];
    if (nextQ.type === 'checkbox') {
      currentAnswer.value = [];
      // Initialize checkbox answers for next question
      checkboxAnswers.value = {};
      if (nextQ.type === 'checkbox') {
        nextQ.options.forEach(option => {
          checkboxAnswers.value[option.value] = false;
        });
      }
    } else if (nextQ.type === 'toggle') {
      currentAnswer.value = false;
    } else if (nextQ.type === 'range') {
      currentAnswer.value = nextQ.min;
    } else {
      currentAnswer.value = '';
    }
  } else {
    screeningCompleted.value = true;
  }
};

const resetScreening = () => {
  screeningStarted.value = false;
  screeningCompleted.value = false;
  currentQuestion.value = 0;
  currentAnswer.value = '';
};

const playVideo = (type: string) => {
  console.log(`Playing video: ${type}`);
  // Video player implementation would go here
};

const playAudio = (type: string) => {
  console.log(`Playing audio: ${type}`);
  // Audio player implementation would go here
};

const navigateTo = (page: string) => {
  router.push(`/folder/${page}`);
};

const showToast = (message: string) => {
  if (typeof toastController !== 'undefined') {
    toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
      color: 'success'
    }).then(toast => toast.present());
  }
};

const openAccessibilitySettings = () => {
  // Open accessibility settings modal or navigate to settings page
  console.log('Opening accessibility settings');
  showToast('Accessibility settings coming soon!');
};

const showFallbackOptions = () => {
  console.log('Showing fallback options');
  
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    console.warn('Not in browser environment, cannot show fallback');
    return;
  }
  
  try {
    // Simple alert as fallback
    const options = [
      'Print Page',
      'Accessibility'
    ];
    
    const choice = prompt(`Choose an option:\n${options.map((opt, i) => `${i + 1}. ${opt}`).join('\n')}`);
    
    console.log('User selected option:', choice);
    
    switch(choice) {
      case '1': 
        console.log('Executing print function');
        printPage(); 
        break;
      case '2': 
        console.log('Executing accessibility function');
        openAccessibilitySettings(); 
        break;
      default:
        console.log('No option selected or invalid choice');
    }
  } catch (error) {
    console.error('Error in fallback options:', error);
    // Last resort: just trigger print
    printPage();
  }
};

const presentActionSheet = async () => {
  console.log('Action sheet triggered');
  
  // Check if actionSheetController is available
  if (typeof actionSheetController === 'undefined') {
    console.warn('actionSheetController not available, using fallback');
    showFallbackOptions();
    return;
  }
  
  try {
    console.log('Creating action sheet...');
    const actionSheet = await actionSheetController.create({
      header: 'Page Options',
      buttons: [
        {
          text: 'Print Page',
          icon: 'print-outline',
          handler: () => {
            console.log('Print option selected');
            printPage();
          }
        },
        {
          text: 'Accessibility',
          icon: 'accessibility-outline',
          handler: () => {
            console.log('Accessibility option selected');
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
    
    console.log('Presenting action sheet...');
    await actionSheet.present();
    console.log('Action sheet presented successfully');
    
  } catch (error) {
    console.error('Error presenting action sheet:', error);
    console.log('Using fallback options');
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
    const container = document.querySelector('#container');
    if (!container) {
      console.error('Container not found');
      window.print(); // Fallback
      return;
    }
    
    console.log('Container found:', container);
    console.log('Container content:', container.innerHTML);
    
    // Create a new window with the content
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      console.error('Could not open print window');
      window.print(); // Fallback
      return;
    }
    
    // Write the content to the new window
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>SAGE - ${document.title}</title>
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
            <h1>SAGE - Supporting Accessible and Inclusive Education</h1>
            <p>Printed on: ${new Date().toLocaleDateString()}</p>
          </div>
          <div class="print-content">
            ${container.innerHTML}
          </div>
          <div class="print-footer">
            SAGE - Supporting Accessible and Inclusive Education
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

const filterResources = () => {
  // Filtering is handled by computed property
};

const openResource = (resource: any) => {
  console.log(`Opening resource: ${resource.title}`);
  // Resource viewer implementation would go here
};

const downloadResource = (resource: any) => {
  console.log(`Downloading resource: ${resource.title}`);
  // Download implementation would go here
};

const contactTeam = async () => {
  // if (typeof toastController === 'undefined') return;
  // const toast = await toastController.create({
  //   message: 'Contact form would open here',
  //   duration: 2000,
  //   position: 'bottom'
  // });
  // await toast.present();
};

const formatWebsite = (value: string) => {
  if (!value) return '';
  const match = value.match(/(https?:\/\/[^\s]+|www\.[^\s]+)/i);
  if (!match) return '';
  const cleaned = match[0].replace(/[),.;]+$/, '');
  return cleaned.startsWith('http') ? cleaned : `https://${cleaned}`;
};

type GuidanceMap = Record<string, string>;

type ScreeningQuestion = {
  id: string;
  title: string;
  prompt: string;
  options: { value: string; label: string }[];
  guidance: GuidanceMap;
};

const contactDetailsNote =
  '<p>Contact details for each of the organisations can be found in the <a href="/folder/Contacts">Contacts section</a>. The list is alphabetical to help you find each organisation.</p>';

const screeningQuestions = vueRef<ScreeningQuestion[]>([
  {
    id: 'vision',
    title: 'Question 1',
    prompt: 'Does the learner have difficulty seeing?',
    options: [
      { value: 'none', label: 'No difficulty' },
      { value: 'some', label: 'Some difficulty' },
      { value: 'lot', label: 'A lot of difficulty' },
      { value: 'cannot', label: 'Cannot do at all' }
    ],
    guidance: {
      none: '<p>No action required.</p>',
      some: `
        <p>Take these steps:</p>
        <ol>
          <li>Ask parents/carers to organise vision check to find out if glasses are needed.</li>
          <li>The visual needs section of this toolkit provides advice and guidance on working with learners with visual needs.</li>
        </ol>
      `,
      lot: `
        <p>Take these steps:</p>
        <ol>
          <li>Discuss referral to an optician or refractionist for diagnosis with parents.</li>
          <li>The visual needs section of this toolkit provides advice and guidance on working with learners with visual needs.</li>
          <li>Seek additional support with resources from organisations such as:
            <ol type="a">
              <li>Dorothy Duncan Centre</li>
              <li>Council for the Blind</li>
              <li>Richard Morris</li>
              <li>Healthcare Promotions</li>
              <li>Gross Care International</li>
              <li>National Braille Printing Press</li>
            </ol>
          </li>
        </ol>
        ${contactDetailsNote}
      `,
      cannot: `
        <p>Take these steps:</p>
        <ol>
          <li>If no diagnosis in place, discuss referral to an optician or refractionist for diagnosis with parents.</li>
          <li>The visual needs section of this toolkit provides advice and guidance on working with learners with visual needs.</li>
          <li>Seek support with resources from organisations such as:
            <ol type="a">
              <li>Dorothy Duncan Centre</li>
              <li>Council for the Blind</li>
              <li>Healthcare Promotions</li>
              <li>Richard Morris</li>
              <li>Gross Care International</li>
              <li>National Braille Printing Press</li>
            </ol>
          </li>
        </ol>
        ${contactDetailsNote}
      `
    }
  },
  {
    id: 'hearing',
    title: 'Question 2',
    prompt: 'Does the learner have difficulty hearing?',
    options: [
      { value: 'none', label: 'No difficulty' },
      { value: 'some', label: 'Some difficulty' },
      { value: 'lot', label: 'A lot of difficulty' },
      { value: 'cannot', label: 'Cannot do at all' }
    ],
    guidance: {
      none: '<p>No action required.</p>',
      some: `
        <p>Take these steps:</p>
        <ol>
          <li>Ask parents/carers to organise hearing check to find out if a hearing aid, removal of ear wax or treatment of an ear infection is needed.</li>
          <li>The hearing needs section of this toolkit provides advice and guidance on working with learners with hearing needs.</li>
        </ol>
      `,
      lot: `
        <p>Take these steps:</p>
        <ol>
          <li>Discuss a referral to an audiologist or Ear, Nose and Throat specialist for diagnosis with parents.</li>
          <li>The hearing needs section of this toolkit provides advice and guidance on working with learners with hearing needs.</li>
          <li>Seek support with resources from organisations such as:
            <ol type="a">
              <li>Deaf Zimbabwe Trust</li>
              <li>Emerald Hill School for the Deaf</li>
              <li>WizEar Trust</li>
              <li>Zimbabwe National Association of the Deaf (ZINADA)</li>
              <li>Association of the Deaf (ASSOD)</li>
              <li>National Audiological Laboratory</li>
            </ol>
          </li>
        </ol>
        ${contactDetailsNote}
      `,
      cannot: `
        <p>Take these steps:</p>
        <ol>
          <li>Discuss a referral to an audiologist or Ear, Nose and Throat specialist for diagnosis with parents.</li>
          <li>The hearing needs section of this toolkit provides advice and guidance on working with learners with hearing needs.</li>
          <li>Seek support with resources from organisations such as:
            <ol type="a">
              <li>Deaf Zimbabwe Trust</li>
              <li>Emerald Hill School for the Deaf</li>
              <li>WizEar Trust</li>
              <li>Zimbabwe National Association of the Deaf (ZINADA)</li>
              <li>Association of the Deaf (ASSOD)</li>
              <li>National Audiological Laboratory</li>
            </ol>
          </li>
        </ol>
        ${contactDetailsNote}
      `
    }
  },
  {
    id: 'mobility',
    title: 'Question 3',
    prompt: 'Does the learner have difficulty walking or climbing steps?',
    options: [
      { value: 'none', label: 'No difficulty' },
      { value: 'some', label: 'Some difficulty' },
      { value: 'lot', label: 'A lot of difficulty' },
      { value: 'cannot', label: 'Cannot do at all' }
    ],
    guidance: {
      none: '<p>No action required.</p>',
      some: `
        <p>Take these steps:</p>
        <ol>
          <li>Organise lessons in an accessible classroom.</li>
          <li>Ask parents/carers to organise health check.</li>
          <li>The physical needs section of this toolkit provides advice and guidance on working with learners with mobility needs.</li>
        </ol>
      `,
      lot: `
        <p>Take these steps:</p>
        <ol>
          <li>In discussion with parents, refer to rehabilitation technicians or an orthopaedic specialist for diagnosis.</li>
          <li>The physical needs section of this toolkit provides advice and guidance on working with learners with mobility needs.</li>
          <li>Seek support with resources from organisations such as:
            <ol type="a">
              <li>Healthcare Promotions</li>
              <li>Jairos Jiri Association</li>
              <li>Leonard Cheshire Disability Zimbabwe Orthopaedic Centre</li>
              <li>Rehabilitation Equipment Wholesalers</li>
              <li>St Giles Rehabilitation Centre</li>
              <li>Zimbabwe Parents of Children with Disabilities Association (ZPCDA)</li>
              <li>Mpilo Hospital Children's Resource Unit</li>
            </ol>
          </li>
        </ol>
        ${contactDetailsNote}
      `,
      cannot: `
        <p>Take these steps:</p>
        <ol>
          <li>If no diagnosis already in place, discuss referral to rehabilitation technicians or an orthopaedic specialist for diagnosis with parents.</li>
          <li>The physical needs section of this toolkit provides advice and guidance on working with learners with mobility needs.</li>
          <li>Seek support with resources from organisations such as:
            <ol type="a">
              <li>Healthcare Promotions</li>
              <li>Jairos Jiri Association</li>
              <li>Leonard Cheshire Disability Zimbabwe Orthopaedic Centre</li>
              <li>Rehabilitation Equipment Wholesalers</li>
              <li>St Giles Rehabilitation Centre</li>
              <li>Zimbabwe Parents of Children with Disabilities Association (ZPCDA)</li>
              <li>Mpilo Hospital Children's Resource Unit</li>
            </ol>
          </li>
        </ol>
        ${contactDetailsNote}
      `
    }
  },
  {
    id: 'cognition',
    title: 'Question 4',
    prompt: 'Does the learner have difficulty remembering or concentrating?',
    options: [
      { value: 'none', label: 'No difficulty' },
      { value: 'some', label: 'Some difficulty' },
      { value: 'lot', label: 'A lot of difficulty' },
      { value: 'cannot', label: 'Cannot do at all' }
    ],
    guidance: {
      none: '<p>No action required.</p>',
      some: `
        <p>Take these steps:</p>
        <ol>
          <li>Ask parents/carers to organise a health check.</li>
          <li>The cognitive needs section of this toolkit provides advice and guidance on working with learners with cognitive needs.</li>
        </ol>
      `,
      lot: `
        <p>Take these steps:</p>
        <ol>
          <li>In discussion with parents, refer to a psychologist or multi-disciplinary assessment panel for diagnosis.</li>
          <li>The cognitive needs section of this toolkit provides advice and guidance on working with learners with cognitive needs.</li>
          <li>Seek support with resources from organisations such as:
            <ol type="a">
              <li>Zimbabwe Down Syndrome Association (ZDSA)</li>
              <li>Dyscalculia Network</li>
              <li>Dyspraxia UK</li>
              <li>International Dyslexia Association</li>
            </ol>
          </li>
        </ol>
        ${contactDetailsNote}
      `,
      cannot: `
        <p>Take these steps:</p>
        <ol>
          <li>If no diagnosis in place, discuss referral to a psychologist or multi-disciplinary assessment panel for diagnosis with parents.</li>
          <li>The cognitive needs section of this toolkit provides advice and guidance on working with learners with cognitive needs.</li>
          <li>Seek support with resources from organisations such as:
            <ol type="a">
              <li>Zimbabwe Down Syndrome Association (ZDSA)</li>
              <li>Dyscalculia Network</li>
              <li>Dyspraxia UK</li>
              <li>International Dyslexia Association</li>
            </ol>
          </li>
        </ol>
        ${contactDetailsNote}
      `
    }
  },
  {
    id: 'selfcare',
    title: 'Question 5',
    prompt: 'Does the learner have difficulty with self-care, such as washing all over or dressing?',
    options: [
      { value: 'none', label: 'No difficulty' },
      { value: 'some', label: 'Some difficulty' },
      { value: 'lot', label: 'A lot of difficulty' },
      { value: 'cannot', label: 'Cannot do at all' }
    ],
    guidance: {
      none: '<p>No action required.</p>',
      some: '<p>Ask parents/carers to organise a health check.</p>',
      lot: `
        <p>Take these steps:</p>
        <ol>
          <li>In discussion with parents, refer to an educational psychologist or multi-disciplinary assessment panel for diagnosis.</li>
          <li>Seek support with resources from organisations such as:
            <ul>
              <li>Zimbabwe Down Syndrome Association (ZDSA)</li>
              <li>Zimbabwe Association for the Care of the Mentally Handicapped (ZIMCARE) Trust</li>
            </ul>
          </li>
        </ol>
        ${contactDetailsNote}
      `,
      cannot: `
        <p>Take these steps:</p>
        <ol>
          <li>In discussion with parents, refer to an educational psychologist or multi-disciplinary assessment panel for diagnosis.</li>
          <li>Seek support with resources from organisations such as:
            <ul>
              <li>Zimbabwe Down Syndrome Association (ZDSA)</li>
              <li>Zimbabwe Association for the Care of the Mentally Handicapped (ZIMCARE) Trust</li>
            </ul>
          </li>
        </ol>
        ${contactDetailsNote}
      `
    }
  },
  {
    id: 'communication',
    title: 'Question 6',
    prompt: 'Using their usual language, does the learner have difficulty communicating, for example understanding or being understood?',
    options: [
      { value: 'none', label: 'No difficulty' },
      { value: 'some', label: 'Some difficulty' },
      { value: 'lot', label: 'A lot of difficulty' },
      { value: 'cannot', label: 'Cannot do at all' }
    ],
    guidance: {
      none: '<p>No action required.</p>',
      some: `
        <p>Take these steps:</p>
        <ol>
          <li>Ask parents/carers to organise health check.</li>
          <li>The speech and communication sections of this toolkit provide guidance and advice on working with learners with language or communication needs.</li>
        </ol>
      `,
      lot: `
        <p>Take these steps:</p>
        <ol>
          <li>In discussion with parents, refer to a speech therapist or a speech correctionist for diagnosis.</li>
          <li>The speech and communication sections of this toolkit provide guidance and advice on working with learners with language or communication needs.</li>
          <li>Seek additional support with resources from organisations such as:
            <ol type="a">
              <li>Playing, Talking, Learning</li>
              <li>The Michael Palin Centre for Stammering</li>
              <li>Zimbabwe Association of Audiology and Speech Pathology</li>
            </ol>
          </li>
        </ol>
        ${contactDetailsNote}
      `,
      cannot: `
        <p>Take these steps:</p>
        <ol>
          <li>If no diagnosis in place, in discussion with parents, refer to a speech therapist or a speech correctionist for diagnosis.</li>
          <li>The speech and communication sections of this toolkit provide guidance and advice on working with learners with language or communication needs.</li>
          <li>Seek additional support with resources from organisations such as:
            <ol type="a">
              <li>Playing, Talking, Learning</li>
              <li>The Michael Palin Centre for Stammering</li>
              <li>Zimbabwe Association of Audiology and Speech Pathology</li>
            </ol>
          </li>
        </ol>
        ${contactDetailsNote}
      `
    }
  }
]);

const responses = vueRef<Record<string, string>>({});
const wgssqExpanded = vueRef(false);

const toggleWgssqCard = () => {
  wgssqExpanded.value = !wgssqExpanded.value;
};

const optContent = (q: ScreeningQuestion, value: string) => {
  if (q.guidance?.[value]) {
    return q.guidance[value];
  }
  return '<p>Refer to the relevant section of this toolkit for more guidance.</p>';
};
</script>

<style scoped>
ion-card {
  margin: 16px;
}

ion-progress-bar {
  margin: 8px 0;
}

ion-segment {
  margin: 16px;
}

ion-searchbar {
  margin: 16px;
}

ion-fab {
  margin-bottom: 16px;
}

ion-accordion ion-item[slot="header"] {
  --background: var(--ion-color-light);
}

ion-accordion .ion-padding {
  padding: 16px;
}

ion-chip {
  margin: 4px;
}

ion-thumbnail {
  --size: 48px;
}

ion-radio-group ion-item {
  --padding-start: 0;
}

ion-badge {
  margin-top: 8px;
}

.home-mobile-logo {
  display: none;
}

@media (max-width: 991px) {
  .home-mobile-logo {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 16px;
    padding: 12px 16px;
    border-radius: 12px;
    background: var(--ion-color-light);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  }

  .home-mobile-logo-img {
    width: 72px;
    height: 72px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    flex-shrink: 0;
  }

  .home-mobile-logo-text {
    font-size: 1.4rem;
    font-weight: 700;
    line-height: 1.2;
    color: var(--ion-text-color, #1e1e1e);
  }
}

.sage-cover-illustration-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 16px;
  padding: 16px;
  background-color: var(--ion-color-light);
  border-radius: 8px;
  overflow: hidden;
}

.sage-cover-illustration {
  width: 100%;
  height: auto;
  max-height: clamp(260px, 55vh, 640px);
  object-fit: contain; /* show whole image, no cropping */
  display: block;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .sage-cover-illustration-wrapper {
    padding: 8px;
  }
}

/* Print Styles */
@media print {
/* Hide navigation elements */
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
}

/* Progress Summary Card Styles */
.progress-summary-card {
  background: linear-gradient(135deg, var(--ion-color-primary-tint), var(--ion-color-secondary-tint));
  color: white;
}

.progress-summary-card ion-card-title,
.progress-summary-card ion-card-subtitle {
  color: white;
}

.progress-summary-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.progress-circle-small {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: conic-gradient(
    var(--ion-color-success) calc(var(--progress) * 3.6deg),
    rgba(255, 255, 255, 0.3) calc(var(--progress) * 3.6deg)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
}

.progress-circle-inner-small {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ion-color-primary);
}

.progress-percentage-small {
  font-size: 1.2rem;
  font-weight: bold;
  line-height: 1;
}

.progress-details {
  flex: 1;
}

.achievement-chip-small {
  margin-bottom: 8px;
}

.progress-stats-small {
  margin: 8px 0;
  font-size: 0.9rem;
  opacity: 0.9;
}

.view-progress-btn {
  margin-top: 8px;
  --color: var(--ion-color-primary);
}

/* Print Styles */
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

  /* Override Ionic's viewport restrictions */
  .ion-page {
    height: auto !important;
    overflow: visible !important;
    position: static !important;
    display: block !important;
  }

  /* Ensure scroll containers don't limit content */
  .ion-content-scroll-host {
    height: auto !important;
    overflow: visible !important;
    position: static !important;
  }
    
  /* Format container for print */
  #container {
    padding: 20px !important;
    max-width: 800px !important;
    margin: 0 auto !important;
    height: auto !important;
    overflow: visible !important;
  }

  /* Show all divs that might be hidden */
  div {
    display: block !important;
    height: auto !important;
    overflow: visible !important;
  }

  /* Ensure specific content elements are visible */
  ion-card,
  ion-card-content,
  ion-accordion-group,
  ion-accordion,
  ion-list,
  ion-item {
    display: block !important;
    height: auto !important;
    overflow: visible !important;
  }

  /* Ensure accordions are expanded for print */
  ion-accordion {
    --ion-item-background: transparent !important;
  }

  ion-accordion ion-item[slot="header"] {
    background: #f8f9fa !important;
  }

  ion-accordion .ion-padding {
    display: block !important;
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

  /* Format lists and items for print */
  ion-list {
    padding: 0 !important;
  }

  ion-item {
    --padding-start: 0 !important;
    --padding-end: 0 !important;
    border-bottom: 1px solid #eee !important;
  }

  ion-label {
    color: #000 !important;
  }

  /* Format progress bars and other elements */
  ion-progress-bar {
    border: 1px solid #ddd !important;
  }

  ion-note {
    color: #666 !important;
  }

  ion-chip {
    border: 1px solid #ddd !important;
    background: #f8f9fa !important;
  }

  /* Format grid for print */
  ion-grid {
    padding: 0 !important;
  }

  ion-col {
    padding: 8px !important;
  }

  /* Format search and segment controls */
  ion-searchbar,
  ion-segment {
    display: none !important;
  }

  /* Format images for print */
  .sage-cover-illustration {
    max-width: 100% !important;
    height: auto !important;
  }

  /* Ensure all page sections are visible */
  div[v-if] {
    display: block !important;
  }

  /* Show the currently active page content */
  div[v-if="route.params.id === 'Home'"],
  div[v-if="route.params.id === 'Contacts'"],
  div[v-if="route.params.id === 'Contact'"],
  div[v-if="route.params.id === 'Quiz'"] {
    display: block !important;
    height: auto !important;
    overflow: visible !important;
  }

  /* Ensure all cards and content are visible */
  ion-card,
  ion-card-content,
  ion-accordion-group,
  ion-accordion {
    display: block !important;
    height: auto !important;
    overflow: visible !important;
  }

  /* Ensure content scroll host is visible */
  .ion-content-scroll-host {
    height: auto !important;
    overflow: visible !important;
    position: static !important;
  }

  /* Add footer for print */
  body::after {
    content: "Printed from SAGE - Supporting Accessible and Inclusive Education | Date: " attr(data-print-date);
    display: block;
    text-align: center;
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px solid #ddd;
    font-size: 12px;
    color: #666;
  }
}
</style>

<style>
/* Global print styles - not scoped */
@media print {
/* Debug: Add a visible border to see if content is there */
#container {
    border: 2px solid red !important;
  }
  
/* Debug: Make sure content is visible */
  ion-content {
    background: white !important;
  }
/* Hide only navigation elements, not content */
  ion-header, 
  ion-toolbar, 
  ion-buttons, 
  ion-menu-button,
  ion-fab,
  ion-fab-button {
    display: none !important;
  }
  
/* Ensure content is visible */
  ion-content {
    padding: 0 !important;
    margin: 0 !important;
    height: auto !important;
    overflow: visible !important;
    position: static !important;
    display: block !important;
  }
  
/* Ensure page container is visible */
  ion-page {
    height: auto !important;
    overflow: visible !important;
    position: static !important;
    display: block !important;
  }
  
/* Ensure the main container is visible */
#container {
    display: block !important;
    height: auto !important;
    overflow: visible !important;
    padding: 20px !important;
  }
  
/* Ensure all divs with content are visible */
div {
    display: block !important;
    height: auto !important;
    overflow: visible !important;
  }
  
/* Ensure cards are visible */
ion-card {
    display: block !important;
    height: auto !important;
    overflow: visible !important;
  }
}
</style>

<style scoped>
.sponsors-img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
  margin: 8px 0 12px 0;
}

.partners-strip.single {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 12px;
}

.partners-strip-img {
  width: 100%;
  max-width: 840px;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.contacts-table {
  width: 100%;
  border: 1px solid var(--ion-color-light);
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
}

.contacts-header {
  display: grid;
  grid-template-columns: minmax(180px, 2fr) minmax(220px, 3fr) minmax(140px, 1fr);
  gap: 12px;
  padding: 12px 20px;
  background: var(--ion-color-light-shade, #f0f4f8);
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--ion-color-medium);
}

.contacts-accordion {
  display: block;
  width: 100%;
}

.contacts-row {
  display: grid;
  grid-template-columns: minmax(180px, 2fr) minmax(220px, 3fr) minmax(140px, 1fr);
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--ion-color-light);
  align-items: center;
}

.contacts-accordion ion-accordion:last-of-type .contacts-row {
  border-bottom: none;
}

.contacts-cell {
  min-width: 0;
}

.contacts-name strong {
  font-size: 1rem;
  color: var(--ion-color-dark);
}

.contacts-expertise p {
  margin: 0;
  color: var(--ion-color-medium);
  font-size: 0.95rem;
}

.contacts-toggle {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  color: var(--ion-color-primary);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.contacts-row ion-icon {
  transition: transform 0.2s ease;
}

ion-accordion[aria-expanded='true'] .contacts-row ion-icon {
  transform: rotate(180deg);
}

.contact-details {
  padding: 20px;
  background: var(--ion-color-light, #f7f9fb);
  display: grid;
  gap: 12px;
}

@media (min-width: 768px) {
  .contact-details {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }
}

.contact-detail {
  background: #fff;
  border: 1px solid var(--ion-color-light);
  border-radius: 10px;
  padding: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.04);
}

.contact-detail h4 {
  margin: 0 0 6px;
  font-size: 0.9rem;
  color: var(--ion-color-primary);
}

.contact-detail p {
  margin: 0;
  color: var(--ion-color-dark);
}

.contact-detail ul {
  margin: 0;
  padding-left: 18px;
  color: var(--ion-color-dark);
}

.pre-line {
  white-space: pre-line;
}

@media (max-width: 767px) {
  .contacts-header {
    display: none;
  }

  .contacts-row {
    grid-template-columns: 1fr;
    padding: 12px 16px;
  }

  .contacts-toggle {
    justify-content: flex-start;
  }

  .contact-details {
    padding: 16px;
  }
}
.question-block { margin: 16px 0; }
.question-title { margin: 0 0 6px 0; font-size: 16px; font-weight: 600; }
.question-prompt { margin: 0 0 8px 0; color: var(--ion-color-medium); }
.question-block ion-item { --background: transparent; border-radius: 8px; }
.question-block ion-item:hover { --background: rgba(var(--ion-color-primary-rgb), 0.06); }
.wgssq-card-header {
  --padding-start: 16px;
  --padding-end: 16px;
  --min-height: 72px;
  --background: linear-gradient(135deg, var(--ion-color-primary), var(--ion-color-secondary));
  color: #fff;
  border-radius: 8px 8px 0 0;
  box-shadow: inset 0 -1px 0 rgba(255,255,255,0.2);
}
.wgssq-card-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #fff;
}
.wgssq-card-header p {
  margin: 4px 0 0 0;
  font-size: 14px;
  color: rgba(255,255,255,0.9);
}
.wgssq-card-header ion-icon {
  color: #fff;
  transition: transform 0.25s ease;
}
.wgssq-card-content {
  border-top: 1px solid var(--ion-color-light);
  background: var(--ion-color-light-shade, #f9fbff);
}
.adapted-note {
  margin-top: 16px;
  font-size: 13px;
  color: var(--ion-color-medium);
}
.adapted-note a {
  color: var(--ion-color-primary);
  text-decoration: underline;
}

.guidance {
  margin: 10px 0 0 0;
  padding: 12px;
  background: rgba(var(--ion-color-primary-rgb), 0.06);
  border-left: 4px solid var(--ion-color-primary);
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.guidance-badge {
  display: inline-block;
  font-size: 11px;
  letter-spacing: .02em;
  text-transform: uppercase;
  color: var(--ion-color-primary);
  background: rgba(var(--ion-color-primary-rgb), 0.12);
  padding: 2px 8px;
  border-radius: 999px;
  margin-bottom: 8px;
}
.guidance li > ol,
.guidance li > ul {
  margin-left: 1.25rem;
  padding-left: 0.5rem;
  margin-top: 6px;
}
.divider { height: 1px; background: var(--ion-color-light); opacity: 0.6; margin-top: 12px; }
.org-card {
  padding: 10px;
  margin-top: 8px;
  background: #fff;
  border: 1px solid var(--ion-color-light);
  border-left: 3px solid var(--ion-color-medium);
  border-radius: 6px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
</style>
