<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ getPageTitle() }}</ion-title>
        <ion-buttons slot="end">
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
        <div v-if="disabilityContent">
          <!-- 1. Name of Disability -->
          <ion-card>
            <ion-card-header>
              <ion-card-title>{{ disabilityContent.title }}</ion-card-title>
              <ion-card-subtitle>{{ disabilityContent.category }}</ion-card-subtitle>
              <ion-chip :color="getDisabilityColor()">
                <ion-icon :icon="getDisabilityIcon()"></ion-icon>
                <ion-label>{{ disabilityContent.category }}</ion-label>
              </ion-chip>
            </ion-card-header>
            <ion-card-content>
              <p>{{ disabilityContent.description }}</p>
            </ion-card-content>
          </ion-card>

          <!-- 2. Language Section -->
          <ion-card>
            <ion-card-header>
              <ion-card-title>Language</ion-card-title>
              <ion-card-subtitle>Using Respectful and Appropriate Language</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <ion-accordion-group>
                <ion-accordion value="words-to-avoid">
                  <ion-item slot="header" color="danger">
                    <ion-icon :icon="closeCircle" slot="start" color="danger"></ion-icon>
                    <ion-label>Words Not to Use</ion-label>
                  </ion-item>
                  <div class="ion-padding" slot="content">
                    <ion-list>
                      <ion-item v-for="(word, index) in disabilityContent.language.wordsToAvoid" :key="index">
                        <ion-icon :icon="close" slot="start" color="danger"></ion-icon>
                        <ion-label>
                          <h4>{{ word.term }}</h4>
                          <p>{{ word.reason }}</p>
                        </ion-label>
                      </ion-item>
                    </ion-list>
                  </div>
                </ion-accordion>

                <ion-accordion value="words-to-use">
                  <ion-item slot="header" color="success">
                    <ion-icon :icon="checkmarkCircle" slot="start" color="success"></ion-icon>
                    <ion-label>Words to Use</ion-label>
                  </ion-item>
                  <div class="ion-padding" slot="content">
                    <ion-list>
                      <ion-item v-for="(word, index) in disabilityContent.language.wordsToUse" :key="index">
                        <ion-icon :icon="checkmark" slot="start" color="success"></ion-icon>
                        <ion-label>
                          <h4>{{ word.term }}</h4>
                          <p>{{ word.explanation }}</p>
                        </ion-label>
                      </ion-item>
                    </ion-list>
                  </div>
                </ion-accordion>
              </ion-accordion-group>
            </ion-card-content>
          </ion-card>

          <!-- 3. Understanding the Learner -->
        <ion-card>
          <ion-card-header>
              <ion-card-title>Understanding the Learner</ion-card-title>
              <ion-card-subtitle>Questions to Support Understanding</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
              <ion-segment v-model="selectedUnderstandingSection" :scrollable="true">
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
                <div v-if="selectedUnderstandingSection === 'strengths'">
                  <h3>Understanding Strengths</h3>
                  <ion-list>
                    <ion-item v-for="(question, index) in disabilityContent.understanding.strengths" :key="index">
                      <ion-icon :icon="star" slot="start" color="warning"></ion-icon>
                      <ion-label>{{ question }}</ion-label>
                    </ion-item>
                  </ion-list>
                </div>

                <div v-else-if="selectedUnderstandingSection === 'challenges'">
                  <h3>Understanding Challenges</h3>
                  <ion-list>
                    <ion-item v-for="(question, index) in disabilityContent.understanding.challenges" :key="index">
                      <ion-icon :icon="helpCircle" slot="start" color="secondary"></ion-icon>
                      <ion-label>{{ question }}</ion-label>
                    </ion-item>
                  </ion-list>
                </div>

                <div v-else-if="selectedUnderstandingSection === 'strategies'">
              <h3>Support Strategies</h3>
                  <ion-list>
                    <ion-item v-for="(question, index) in disabilityContent.understanding.strategies" :key="index">
                      <ion-icon :icon="bulb" slot="start" color="primary"></ion-icon>
                      <ion-label>{{ question }}</ion-label>
                    </ion-item>
                  </ion-list>
                </div>

                <div v-else-if="selectedUnderstandingSection === 'advocacy'">
                  <h3>Supporting Self-Advocacy</h3>
                  <ion-list>
                    <ion-item v-for="(statement, index) in disabilityContent.understanding.advocacy" :key="index">
                      <ion-icon :icon="megaphone" slot="start" color="tertiary"></ion-icon>
                      <ion-label>{{ statement }}</ion-label>
                    </ion-item>
                  </ion-list>
                </div>
              </div>
            </ion-card-content>
          </ion-card>

          <!-- 4. Challenges to Learning -->
          <ion-card>
            <ion-card-header>
              <ion-card-title>Challenges to Learning</ion-card-title>
              <ion-card-subtitle>Common Barriers and Difficulties</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <ion-grid>
                <ion-row>
                  <ion-col size="12" size-md="6">
                    <ion-card>
                      <ion-card-header>
                        <ion-card-title>Physical Environment</ion-card-title>
                      </ion-card-header>
                      <ion-card-content>
                        <ion-list>
                          <ion-item v-for="(challenge, index) in disabilityContent.challenges.physical" :key="index">
                            <ion-icon :icon="warning" slot="start" color="warning"></ion-icon>
                            <ion-label>{{ challenge }}</ion-label>
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
                          <ion-item v-for="(challenge, index) in disabilityContent.challenges.social" :key="index">
                            <ion-icon :icon="people" slot="start" color="secondary"></ion-icon>
                            <ion-label>{{ challenge }}</ion-label>
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
                          <ion-item v-for="(challenge, index) in disabilityContent.challenges.tasks" :key="index">
                            <ion-icon :icon="document" slot="start" color="primary"></ion-icon>
                            <ion-label>{{ challenge }}</ion-label>
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
                          <ion-item v-for="(challenge, index) in disabilityContent.challenges.assessment" :key="index">
                            <ion-icon :icon="school" slot="start" color="tertiary"></ion-icon>
                            <ion-label>{{ challenge }}</ion-label>
                          </ion-item>
                        </ion-list>
                      </ion-card-content>
                    </ion-card>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-card-content>
          </ion-card>

          <!-- 5. Enabling Learning -->
          <ion-card>
            <ion-card-header>
              <ion-card-title>Enabling Learning</ion-card-title>
              <ion-card-subtitle>Strategies to Support Success</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <ion-accordion-group>
                <ion-accordion value="physical-enabling">
                  <ion-item slot="header" color="primary">
                    <ion-icon :icon="home" slot="start" color="primary"></ion-icon>
                    <ion-label>Physical Environment</ion-label>
                  </ion-item>
                  <div class="ion-padding" slot="content">
                    <ion-list>
                      <ion-item v-for="(strategy, index) in disabilityContent.enabling.physical" :key="index">
                        <ion-icon :icon="checkmark" slot="start" color="success"></ion-icon>
                        <ion-label>{{ strategy }}</ion-label>
                      </ion-item>
                    </ion-list>
                  </div>
                </ion-accordion>

                <ion-accordion value="social-enabling">
                  <ion-item slot="header" color="secondary">
                    <ion-icon :icon="people" slot="start" color="secondary"></ion-icon>
                    <ion-label>Social Environment</ion-label>
                  </ion-item>
                  <div class="ion-padding" slot="content">
                    <ion-list>
                      <ion-item v-for="(strategy, index) in disabilityContent.enabling.social" :key="index">
                        <ion-icon :icon="checkmark" slot="start" color="success"></ion-icon>
                        <ion-label>{{ strategy }}</ion-label>
                      </ion-item>
                    </ion-list>
                  </div>
                </ion-accordion>

                <ion-accordion value="tasks-enabling">
                  <ion-item slot="header" color="tertiary">
                    <ion-icon :icon="document" slot="start" color="tertiary"></ion-icon>
                    <ion-label>Tasks</ion-label>
                  </ion-item>
                  <div class="ion-padding" slot="content">
                    <ion-list>
                      <ion-item v-for="(strategy, index) in disabilityContent.enabling.tasks" :key="index">
                        <ion-icon :icon="checkmark" slot="start" color="success"></ion-icon>
                        <ion-label>{{ strategy }}</ion-label>
                      </ion-item>
                    </ion-list>
                  </div>
                </ion-accordion>

                <ion-accordion value="assessment-enabling">
                  <ion-item slot="header" color="warning">
                    <ion-icon :icon="school" slot="start" color="warning"></ion-icon>
                    <ion-label>Assessment</ion-label>
                  </ion-item>
                  <div class="ion-padding" slot="content">
                    <ion-list>
                      <ion-item v-for="(strategy, index) in disabilityContent.enabling.assessment" :key="index">
                        <ion-icon :icon="checkmark" slot="start" color="success"></ion-icon>
                        <ion-label>{{ strategy }}</ion-label>
                      </ion-item>
                    </ion-list>
                  </div>
                </ion-accordion>
              </ion-accordion-group>
            </ion-card-content>
          </ion-card>

          <!-- 6. Resources to Support Learning -->
          <ion-card>
            <ion-card-header>
              <ion-card-title>Resources to Support Learning</ion-card-title>
              <ion-card-subtitle>Key Resources and Organizations</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <ion-segment v-model="selectedResourceType" :scrollable="true">
                <ion-segment-button value="electronic">
                  <ion-icon :icon="laptop"></ion-icon>
                  <ion-label>Electronic</ion-label>
                </ion-segment-button>
                <ion-segment-button value="paper">
                  <ion-icon :icon="document"></ion-icon>
                  <ion-label>Paper</ion-label>
                </ion-segment-button>
                <ion-segment-button value="organizations">
                  <ion-icon :icon="business"></ion-icon>
                  <ion-label>Organizations</ion-label>
                </ion-segment-button>
              </ion-segment>

              <div class="ion-padding">
                <div v-if="selectedResourceType === 'electronic'">
                  <ion-list>
                    <ion-item v-for="(resource, index) in disabilityContent.resources.electronic" :key="index" button @click="openResource(resource)">
                      <ion-icon :icon="laptop" slot="start" color="primary"></ion-icon>
                      <ion-label>
                        <h4>{{ resource.title }}</h4>
                        <p>{{ resource.description }}</p>
                        <ion-note>{{ resource.url }}</ion-note>
                      </ion-label>
                      <ion-button fill="clear" slot="end" @click="downloadResource(resource)">
                        <ion-icon :icon="download"></ion-icon>
                      </ion-button>
                    </ion-item>
                  </ion-list>
                </div>

                <div v-else-if="selectedResourceType === 'paper'">
                  <ion-list>
                    <ion-item v-for="(resource, index) in disabilityContent.resources.paper" :key="index" button @click="openResource(resource)">
                      <ion-icon :icon="document" slot="start" color="secondary"></ion-icon>
                      <ion-label>
                        <h4>{{ resource.title }}</h4>
                        <p>{{ resource.description }}</p>
                        <ion-note>{{ resource.availability }}</ion-note>
                      </ion-label>
                      <ion-button fill="clear" slot="end" @click="downloadResource(resource)">
                        <ion-icon :icon="download"></ion-icon>
                      </ion-button>
                    </ion-item>
                  </ion-list>
                </div>

                <div v-else-if="selectedResourceType === 'organizations'">
                  <ion-list>
                    <ion-item v-for="(org, index) in disabilityContent.resources.organizations" :key="index" button @click="contactOrganization(org)">
                      <ion-icon :icon="business" slot="start" color="tertiary"></ion-icon>
                      <ion-label>
                        <h4>{{ org.name }}</h4>
                        <p>{{ org.description }}</p>
                        <ion-note>{{ org.contact }}</ion-note>
                      </ion-label>
                      <ion-button fill="clear" slot="end" @click="contactOrganization(org)">
                        <ion-icon :icon="mail"></ion-icon>
                      </ion-button>
                    </ion-item>
                  </ion-list>
                </div>
              </div>
            </ion-card-content>
          </ion-card>

          <!-- 7. Case Study -->
          <ion-card>
            <ion-card-header>
              <ion-card-title>Case Study</ion-card-title>
              <ion-card-subtitle>Real-World Example</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <div class="case-study">
                <h3>{{ disabilityContent.caseStudy.title }}</h3>
                <p>{{ disabilityContent.caseStudy.scenario }}</p>
                
                <ion-list>
                  <ion-item v-for="(detail, index) in disabilityContent.caseStudy.details" :key="index">
                    <ion-icon :icon="informationCircle" slot="start" color="primary"></ion-icon>
                    <ion-label>{{ detail }}</ion-label>
                  </ion-item>
                </ion-list>

                <h4>Key Learning Points</h4>
                <ion-chip v-for="(point, index) in disabilityContent.caseStudy.learningPoints" :key="index" color="success">
                  <ion-icon :icon="checkmark"></ion-icon>
                  <ion-label>{{ point }}</ion-label>
                </ion-chip>
              </div>
            </ion-card-content>
          </ion-card>

          <!-- 8. Reflective Task -->
          <ion-card>
            <ion-card-header>
              <ion-card-title>Reflective Task</ion-card-title>
              <ion-card-subtitle>Apply Your Learning</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <ion-list>
                <ion-item v-for="(task, index) in disabilityContent.reflectiveTasks" :key="index">
                  <ion-icon :icon="getTaskIcon(index)" slot="start" :color="getTaskColor(index)"></ion-icon>
                  <ion-label>
                    <h4>{{ task.title }}</h4>
                    <p>{{ task.description }}</p>
                  </ion-label>
                  <ion-button fill="clear" slot="end" @click="completeTask(index)">
                    <ion-icon :icon="task.completed ? checkmarkCircle : ellipse"></ion-icon>
                  </ion-button>
                </ion-item>
              </ion-list>
            </ion-card-content>
          </ion-card>

          <!-- 9. Quiz -->
          <ion-card>
            <ion-card-header>
              <ion-card-title>Knowledge Check</ion-card-title>
              <ion-card-subtitle>Test Your Understanding</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <div v-if="!quizCompleted">
                <ion-card>
                  <ion-card-header>
                    <ion-card-title>Question {{ currentQuizQuestion + 1 }} of {{ quizQuestions.length }}</ion-card-title>
                    <ion-progress-bar :value="(currentQuizQuestion + 1) / quizQuestions.length" color="primary"></ion-progress-bar>
                  </ion-card-header>
                  <ion-card-content>
                    <h4>{{ quizQuestions[currentQuizQuestion].question }}</h4>
                    
                    <ion-radio-group v-model="currentQuizAnswer">
                      <ion-item v-for="(option, index) in quizQuestions[currentQuizQuestion].options" :key="index">
                        <ion-radio :value="option.value" slot="start"></ion-radio>
                        <ion-label>{{ option.text }}</ion-label>
                      </ion-item>
                    </ion-radio-group>
                    
                    <div class="ion-padding-top">
                      <ion-button expand="block" color="primary" @click="nextQuizQuestion" :disabled="!currentQuizAnswer">
                        {{ currentQuizQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question' }}
                      </ion-button>
                    </div>
                  </ion-card-content>
                </ion-card>
              </div>
              
              <div v-if="quizCompleted">
                <ion-card>
                  <ion-card-header>
                    <ion-card-title>Quiz Results</ion-card-title>
                    <ion-card-subtitle>Your Score: {{ quizScore }}%</ion-card-subtitle>
                  </ion-card-header>
                  <ion-card-content>
                    <ion-progress-bar :value="quizScore / 100" :color="getQuizScoreColor()"></ion-progress-bar>
                    <ion-note>{{ getQuizScoreMessage() }}</ion-note>
                    
                    <ion-button expand="block" color="primary" @click="retakeQuiz">
                      <ion-icon :icon="refresh" slot="start"></ion-icon>
                      Retake Quiz
                    </ion-button>
                  </ion-card-content>
                </ion-card>
              </div>
            </ion-card-content>
          </ion-card>
            </div>
            
            <div v-else>
          <ion-card>
            <ion-card-content>
              <ion-spinner name="crescent"></ion-spinner>
              <p>Content for {{ getPageTitle() }} is coming soon...</p>
          </ion-card-content>
        </ion-card>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed, ref } from 'vue';
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
  IonChip,
  IonRange,
  IonNote,
  IonToggle,
  IonThumbnail,
  IonButton,
  IonSegment,
  IonSegmentButton,
  IonFab,
  IonFabButton,
  IonRadioGroup,
  IonRadio,
  IonProgressBar,
  IonSpinner,
  IonGrid,
  IonRow,
  IonCol,
  IonAccordionGroup,
  IonAccordion,
  actionSheetController,
  toastController
} from '@ionic/vue';
import { 
  documentOutline,
  videocamOutline,
  micOutline,
  schoolOutline,
  ellipsisVertical,
  informationCircle,
  bulb,
  library,
  helpCircle,
  checkmarkCircle,
  ellipse,
  heart,
  heartOutline,
  download,
  add,
  refresh,
  star,
  starOutline,
  closeCircle,
  close,
  checkmark,
  megaphone,
  warning,
  people,
  document,
  school,
  home,
  laptop,
  business,
  mail
} from 'ionicons/icons';

const route = useRoute();

// State variables
const selectedUnderstandingSection = ref('strengths');
const selectedResourceType = ref('electronic');
const currentQuizQuestion = ref(0);
const currentQuizAnswer = ref('');
const quizCompleted = ref(false);
const quizScore = ref(0);

// Comprehensive disability content data following the specified structure
const disabilityData = {
  'visual-impairments': {
    title: 'Visual Impairments',
    category: 'Physical Disabilities',
    description: 'Visual impairments encompass a range of conditions from partial sight to complete blindness. Students may experience difficulties with written materials, visual presentations, navigation, and accessing visual information in learning environments.',
    language: {
      wordsToAvoid: [
        { term: 'Blind as a bat', reason: 'Offensive and inaccurate comparison' },
        { term: 'The blind leading the blind', reason: 'Negative stereotype about capabilities' },
        { term: 'Visually handicapped', reason: 'Outdated term that focuses on limitations' }
      ],
      wordsToUse: [
        { term: 'Student with visual impairment', explanation: 'Person-first language that respects individual identity' },
        { term: 'Visually impaired student', explanation: 'Alternative acceptable terminology' },
        { term: 'Student who is blind', explanation: 'Clear, respectful description when relevant' }
      ]
    },
    understanding: {
      strengths: [
        'What are your strongest learning methods?',
        'Which assistive technologies work best for you?',
        'What activities do you enjoy and feel confident doing?',
        'How do you prefer to receive information?'
      ],
      challenges: [
        'What visual information is most difficult to access?',
        'How do you currently navigate new environments?',
        'What barriers do you face in typical learning situations?',
        'Which tasks take you longer due to visual limitations?'
    ],
    strategies: [
        'What support strategies have been most helpful in the past?',
        'How do you prefer to access written materials?',
        'What environmental adjustments make learning easier?',
        'Which technologies or tools do you find most useful?'
      ],
      advocacy: [
        'I need materials in accessible formats',
        'Please describe visual content verbally',
        'I prefer to sit in the front of the classroom',
        'I need extra time for reading tasks'
      ]
    },
    challenges: {
      physical: [
        'Poor lighting and contrast in classrooms',
        'Inaccessible digital content and websites',
        'Physical barriers and navigation difficulties',
        'Limited access to visual learning materials'
      ],
      social: [
        'Difficulty reading social cues and facial expressions',
        'Challenges participating in visual group activities',
        'Potential isolation from sighted peers',
        'Misunderstandings about capabilities'
      ],
      tasks: [
        'Reading standard print materials',
        'Completing visual assignments and projects',
        'Accessing diagrams, charts, and graphs',
        'Participating in visual demonstrations'
      ],
      assessment: [
        'Standard written exams may not be accessible',
        'Visual components in assessments create barriers',
        'Limited access to visual feedback and corrections',
        'Difficulty with visual presentation requirements'
      ]
    },
    enabling: {
      physical: [
        'Ensure adequate lighting and high contrast',
        'Provide accessible seating arrangements',
        'Create clear pathways and remove obstacles',
        'Use tactile markers and audio cues'
      ],
      social: [
        'Include student in all group activities with appropriate support',
        'Provide verbal descriptions of visual social cues',
        'Encourage peer support and collaboration',
        'Foster understanding among classmates'
      ],
      tasks: [
        'Provide materials in accessible formats (large print, audio, digital)',
        'Offer alternative ways to complete visual assignments',
        'Use descriptive language for all visual content',
        'Provide extra time for reading and processing'
      ],
      assessment: [
        'Offer alternative assessment formats',
        'Provide audio or tactile versions of visual content',
        'Allow use of assistive technologies during assessment',
        'Focus on content mastery rather than visual presentation'
      ]
    },
    resources: {
      electronic: [
        { title: 'Screen Reader Software Guide', description: 'Comprehensive guide to screen reader technologies', url: 'www.rnib.org.uk/screen-readers' },
        { title: 'Accessible Document Creation', description: 'Tutorial on creating accessible digital documents', url: 'www.abilitynet.org.uk/accessible-documents' },
        { title: 'Audio Description Services', description: 'Professional audio description for educational content', url: 'www.audiodescription.org.uk' }
      ],
      paper: [
        { title: 'Large Print Guidelines', description: 'Standards for creating large print materials', availability: 'Available from RNIB' },
        { title: 'Tactile Graphics Manual', description: 'Guide to creating tactile diagrams and charts', availability: 'Available from local resource centers' },
        { title: 'Braille Learning Resources', description: 'Materials for learning and teaching Braille', availability: 'Available from specialist organizations' }
      ],
      organizations: [
        { name: 'Royal National Institute of Blind People (RNIB)', description: 'Leading UK charity supporting blind and partially sighted people', contact: '0303 123 9999' },
        { name: 'Guide Dogs for the Blind Association', description: 'Provides mobility and independence training', contact: '0118 983 5555' },
        { name: 'Vision Australia', description: 'Comprehensive support services for people with vision loss', contact: '1300 84 74 66' }
      ]
    },
    caseStudy: {
      title: 'Supporting Sarah in Science Class',
      scenario: 'Sarah is a 14-year-old student with severe visual impairment who loves science but struggles with laboratory work and visual demonstrations.',
      details: [
        'Sarah uses a screen reader and magnification software',
        'She has difficulty accessing diagrams and charts in textbooks',
        'Laboratory safety is a concern due to visual limitations',
        'She feels isolated during group experiments'
      ],
      learningPoints: [
        'Individual safety training is essential',
        'Audio descriptions make experiments accessible',
        'Peer support enhances learning experience',
        'Alternative assessment methods show true understanding'
      ]
    },
    reflectiveTasks: [
      { title: 'Case Study Question', description: 'How would you adapt a chemistry experiment for Sarah?', completed: false },
      { title: 'Practice Reflection', description: 'What visual content in your teaching could be made more accessible?', completed: false },
      { title: 'Next Steps', description: 'Identify three ways to improve accessibility in your classroom', completed: false }
    ]
  },
  'hearing-impairments': {
    title: 'Hearing Impairments',
    category: 'Physical Disabilities',
    description: 'Hearing impairments affect a student\'s ability to process auditory information, including speech, audio content, and environmental sounds. The impact varies from mild to profound hearing loss.',
    language: {
      wordsToAvoid: [
        { term: 'Deaf and dumb', reason: 'Offensive and inaccurate - people with hearing loss can communicate' },
        { term: 'Hearing impaired person', reason: 'Some prefer "deaf person" or "person with hearing loss"' },
        { term: 'Suffers from hearing loss', reason: 'Implies illness or tragedy rather than a difference' }
      ],
      wordsToUse: [
        { term: 'Student with hearing loss', explanation: 'Person-first language that respects individual identity' },
        { term: 'Deaf student', explanation: 'Identity-first language preferred by many in the Deaf community' },
        { term: 'Student with hearing impairment', explanation: 'Alternative acceptable terminology' }
      ]
    },
    understanding: {
      strengths: [
        'What communication methods work best for you?',
        'Which assistive technologies do you find most helpful?',
        'What are your preferred learning activities?',
        'How do you like to receive information?'
      ],
      challenges: [
        'What sounds or speech are most difficult to understand?',
        'How do you handle group conversations?',
        'What barriers do you face in noisy environments?',
        'Which learning situations are most challenging?'
    ],
    strategies: [
        'What support strategies have been most effective?',
        'How do you prefer to access audio content?',
        'What environmental adjustments help you most?',
        'Which communication methods work best for you?'
      ],
      advocacy: [
        'I need captions for all videos',
        'Please face me when speaking',
        'I prefer written instructions',
        'I need a quiet environment for learning'
      ]
    },
    challenges: {
      physical: [
        'Poor acoustics in classrooms',
        'Background noise interfering with speech',
        'Inadequate lighting for lip reading',
        'Lack of assistive listening devices'
      ],
      social: [
        'Difficulty following group conversations',
        'Challenges with social interactions and friendships',
        'Potential isolation from hearing peers',
        'Misunderstandings in communication'
      ],
      tasks: [
        'Following verbal instructions',
        'Participating in class discussions',
        'Accessing audio and video content',
        'Understanding spoken feedback'
      ],
      assessment: [
        'Oral presentations and discussions',
        'Listening comprehension tests',
        'Audio-based assessments',
        'Group oral examinations'
      ]
    },
    enabling: {
      physical: [
        'Improve classroom acoustics and reduce background noise',
        'Ensure adequate lighting for lip reading',
        'Provide assistive listening devices',
        'Create quiet spaces for individual work'
      ],
      social: [
        'Include student in all social activities with appropriate support',
        'Teach classmates basic sign language if relevant',
        'Encourage peer support and understanding',
        'Provide communication strategies for group work'
      ],
      tasks: [
        'Provide written alternatives to all spoken content',
        'Use visual aids and gestures to support communication',
        'Offer captions and transcripts for audio/video',
        'Allow extra time for processing information'
      ],
      assessment: [
        'Offer alternative assessment formats',
        'Provide written versions of oral assessments',
        'Allow use of assistive technologies',
        'Focus on content rather than communication method'
      ]
    },
    resources: {
      electronic: [
        { title: 'Captioning Guidelines', description: 'How to create effective captions for educational videos', url: 'www.captioning.org/guidelines' },
        { title: 'Assistive Listening Technology', description: 'Overview of hearing assistive technologies', url: 'www.hearinglink.org/technology' },
        { title: 'Sign Language Learning Apps', description: 'Digital resources for learning sign language', url: 'www.british-sign.co.uk/apps' }
      ],
      paper: [
        { title: 'Communication Strategies Guide', description: 'Best practices for communicating with hearing-impaired students', availability: 'Available from local hearing services' },
        { title: 'Lip Reading Manual', description: 'Guide to lip reading techniques and support', availability: 'Available from specialist organizations' },
        { title: 'Classroom Acoustics Guide', description: 'How to improve classroom sound quality', availability: 'Available from educational resource centers' }
      ],
      organizations: [
        { name: 'National Deaf Children\'s Society', description: 'Supporting deaf children and their families', contact: '0808 800 8880' },
        { name: 'Action on Hearing Loss', description: 'Supporting people with hearing loss and tinnitus', contact: '0808 808 0123' },
        { name: 'British Deaf Association', description: 'Promoting sign language and Deaf culture', contact: '0121 450 7711' }
      ]
    },
    caseStudy: {
      title: 'Supporting James in English Literature',
      scenario: 'James is a 16-year-old student with moderate hearing loss who struggles with class discussions and audio content in his English literature class.',
      details: [
        'James uses hearing aids and prefers written materials',
        'He misses parts of class discussions and group work',
        'Audio recordings of literature are difficult to access',
        'He feels embarrassed to ask for repetition'
      ],
      learningPoints: [
        'Written summaries help clarify discussions',
        'Peer note-taking supports learning',
        'Alternative formats make content accessible',
        'Confidence building reduces communication barriers'
      ]
    },
    reflectiveTasks: [
      { title: 'Case Study Question', description: 'How would you adapt a class discussion for James?', completed: false },
      { title: 'Practice Reflection', description: 'What audio content in your teaching could be made more accessible?', completed: false },
      { title: 'Next Steps', description: 'Identify three ways to improve communication accessibility', completed: false }
    ]
  }
};

// Quiz questions for each disability
const quizQuestions = ref([
  {
    question: "What is the most important consideration when supporting students with this disability?",
    options: [
      { value: 'a', text: 'Providing extra time for all activities' },
      { value: 'b', text: 'Understanding individual needs and preferences' },
      { value: 'c', text: 'Using the same approach for all students' },
      { value: 'd', text: 'Focusing only on academic performance' }
    ]
  },
  {
    question: "Which strategy is most effective for this disability category?",
    options: [
      { value: 'a', text: 'Standardized testing' },
      { value: 'b', text: 'Flexible learning approaches' },
      { value: 'c', text: 'Strict deadlines' },
      { value: 'd', text: 'One-size-fits-all instruction' }
    ]
  },
  {
    question: "What should you avoid when working with students with this disability?",
    options: [
      { value: 'a', text: 'Making assumptions about their capabilities' },
      { value: 'b', text: 'Providing clear instructions' },
      { value: 'c', text: 'Offering multiple ways to demonstrate learning' },
      { value: 'd', text: 'Using assistive technologies' }
    ]
  },
  {
    question: "How should you approach language when discussing this disability?",
    options: [
      { value: 'a', text: 'Use medical terminology only' },
      { value: 'b', text: 'Use person-first language and respect individual preferences' },
      { value: 'c', text: 'Use outdated terms if they are commonly understood' },
      { value: 'd', text: 'Avoid discussing the disability altogether' }
    ]
  },
  {
    question: "What is the best way to support self-advocacy for students with this disability?",
    options: [
      { value: 'a', text: 'Make all decisions for them' },
      { value: 'b', text: 'Encourage them to express their needs and preferences' },
      { value: 'c', text: 'Ignore their input to maintain authority' },
      { value: 'd', text: 'Assume you know what they need' }
    ]
  }
]);

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

const getDisabilityColor = () => {
  const category = getCategoryTitle();
  const colors: { [key: string]: string } = {
    'Physical Disabilities': 'primary',
    'Cognition & Learning': 'secondary',
    'Communication & Interaction': 'tertiary',
    'Multiple Impairments': 'warning'
  };
  return colors[category] || 'primary';
};

const getDisabilityIcon = () => {
  const category = getCategoryTitle();
  const icons: { [key: string]: string } = {
    'Physical Disabilities': 'body-outline',
    'Cognition & Learning': 'bulb-outline',
    'Communication & Interaction': 'chatbubble-outline',
    'Multiple Impairments': 'medical-outline'
  };
  return icons[category] || 'help-outline';
};

const getStrategyIcon = (index: number) => {
  const icons = ['school-outline', 'bulb-outline', 'people-outline', 'settings-outline'];
  return icons[index] || 'help-outline';
};

const getResourceColor = (type: string) => {
  const colors: { [key: string]: string } = {
    'videos': 'secondary',
    'audio': 'tertiary',
    'documents': 'primary'
  };
  return colors[type] || 'medium';
};

const getQuizScoreColor = () => {
  if (quizScore.value >= 80) return 'success';
  if (quizScore.value >= 60) return 'warning';
  return 'danger';
};

const getQuizScoreMessage = () => {
  if (quizScore.value >= 80) return 'Excellent! You have a strong understanding of this topic.';
  if (quizScore.value >= 60) return 'Good! You have a solid foundation, but there\'s room for improvement.';
  return 'Keep learning! Review the materials and try again.';
};

const getTaskIcon = (index: number) => {
  const icons = ['helpCircle', 'bulb', 'arrowForward'];
  return icons[index] || 'helpCircle';
};

const getTaskColor = (index: number) => {
  const colors = ['primary', 'secondary', 'tertiary'];
  return colors[index] || 'primary';
};

// Event handlers
const completeTask = (index: number) => {
  if (disabilityContent.value?.reflectiveTasks) {
    disabilityContent.value.reflectiveTasks[index].completed = !disabilityContent.value.reflectiveTasks[index].completed;
  }
};

const openResource = (resource: any) => {
  console.log(`Opening resource: ${resource.title}`);
};

const downloadResource = (resource: any) => {
  console.log(`Downloading resource: ${resource.title}`);
};

const contactOrganization = (org: any) => {
  console.log(`Contacting organization: ${org.name}`);
};

const nextQuizQuestion = () => {
  if (currentQuizQuestion.value < quizQuestions.value.length - 1) {
    currentQuizQuestion.value++;
    currentQuizAnswer.value = '';
  } else {
    // Calculate score (simplified)
    quizScore.value = Math.floor(Math.random() * 40) + 60; // 60-100 for demo
    quizCompleted.value = true;
  }
};

const retakeQuiz = () => {
  currentQuizQuestion.value = 0;
  currentQuizAnswer.value = '';
  quizCompleted.value = false;
  quizScore.value = 0;
};

const presentActionSheet = async () => {
  const actionSheet = await actionSheetController.create({
    header: 'Options',
    buttons: [
      {
        text: 'Share',
        icon: 'share-outline',
        handler: () => {
          console.log('Share clicked');
        }
      },
      {
        text: 'Bookmark',
        icon: 'bookmark-outline',
        handler: () => {
          console.log('Bookmark clicked');
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
};
</script>

<style scoped>
ion-card {
  margin: 16px;
}

ion-tabs {
  height: 100%;
}

ion-tab-bar {
  --background: var(--ion-color-light);
}

ion-range {
  --bar-background: var(--ion-color-light);
  --bar-background-active: var(--ion-color-primary);
}

ion-toggle {
  --background: var(--ion-color-light);
  --background-checked: var(--ion-color-primary);
}

ion-rating {
  --color: var(--ion-color-warning);
}

ion-chip {
  margin: 4px;
}

ion-thumbnail {
  --size: 48px;
}

ion-progress-bar {
  margin: 8px 0;
}

ion-segment {
  margin: 16px 0;
}

ion-fab {
  margin-bottom: 16px;
}

ion-spinner {
  display: block;
  margin: 20px auto;
}

.rating-display {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
}

.rating-text {
  margin-left: 8px;
  font-size: 0.9em;
  color: var(--ion-color-medium);
}
</style> 