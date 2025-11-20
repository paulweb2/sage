<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Visual Needs</ion-title>
        <ion-buttons slot="end">
          <span style="font-size: 14px; color: var(--ion-color-medium); margin-right: 8px;">v0.0.16</span>
          <ion-button @click="presentActionSheet">
            <ion-icon :icon="ellipsisVertical"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Visual Needs</ion-title>
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
              <ion-accordion value="visual-lang-use">
                <ion-item slot="header" color="success">
                  <ion-icon :icon="checkmarkCircle" slot="start" color="success"></ion-icon>
                  <ion-label>Respectful language</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content">
                  <ion-list v-if="languageUseLines.length">
                    <ion-item v-for="(line, index) in languageUseLines" :key="'use-' + index">
                      <ion-icon :icon="checkmark" slot="start" color="success"></ion-icon>
                      <ion-label>
                        <h4 style="margin: 0; white-space: pre-wrap;">{{ line }}</h4>
                      </ion-label>
                    </ion-item>
                  </ion-list>
                  <ion-note v-else color="medium">Content coming soon.</ion-note>
                </div>
              </ion-accordion>

              <ion-accordion value="visual-lang-avoid">
                <ion-item slot="header" color="danger">
                  <ion-icon :icon="closeCircle" slot="start" color="danger"></ion-icon>
                  <ion-label>Language to avoid</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content">
                  <ion-list v-if="languageAvoidLines.length">
                    <ion-item v-for="(line, index) in languageAvoidLines" :key="'avoid-' + index">
                      <ion-icon :icon="close" slot="start" color="danger"></ion-icon>
                      <ion-label>
                        <h4 style="margin: 0; white-space: pre-wrap;">{{ line }}</h4>
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
                <p>Questions and prompts to help find out about a learner’s <strong>strengths</strong>:</p>
                <ion-list v-if="understanding.strengths.length">
                  <ion-item v-for="(q, i) in understanding.strengths" :key="`str-` + i + '-' + q">
                    <ion-icon :icon="star" slot="start" color="warning"></ion-icon>
                    <ion-label>{{ q }}</ion-label>
                  </ion-item>
                </ion-list>
                <ion-note v-else color="medium">Content coming soon.</ion-note>
              </div>
              <div v-else-if="selectedUnderstanding === 'challenges'">
                <p>Questions and promptsto help find out about <strong>challenges</strong> a learner may encounter:</p>
                <ion-list v-if="understanding.challenges.length">
                  <ion-item v-for="(q, i) in understanding.challenges" :key="`chal-` + i + '-' + q">
                    <ion-icon :icon="helpCircle" slot="start" color="secondary"></ion-icon>
                    <ion-label>{{ q }}</ion-label>
                  </ion-item>
                </ion-list>
                <ion-note v-else color="medium">Content coming soon.</ion-note>
              </div>
              <div v-else-if="selectedUnderstanding === 'strategies'">
                <p>Questions and prompts to understand strategies that can <strong>support</strong> the learner:</p>
                <ion-list v-if="understanding.strategies.length">
                  <ion-item v-for="(item, i) in understanding.strategies" :key="`strat-` + i">
                    <ion-icon :icon="bulb" slot="start" color="primary"></ion-icon>
                    <ion-label>
                      <h4>{{ item.question }}</h4>
                      <ul v-if="item.prompts && item.prompts.length" style="margin: 6px 0 0 6px; padding-left: 12px;">
                        <li>Prompts: {{ item.prompts.join(', ') }}</li>
                      </ul>
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
              <ion-accordion value="visual-enable-physical">
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

              <ion-accordion value="visual-enable-social">
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

              <ion-accordion value="visual-enable-tasks">
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

              <ion-accordion value="visual-enable-assessment">
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
            <div class="case-study-video">
              <!-- Previously: src="/SAGE 7638_7632_even_lower_quality.mp4" -->
              <MediaPlayer
                ref="visualCaseStudyPlayer"
                type="video"
                title="Weekend writing task using a Perkins Braille machine"
                subtitle="Learner composing and reading his own work"
                src="https://storage.googleapis.com/pwebtech.appspot.com/media/SAGE%207638_7632_even_lower_quality.mp4"
                :duration="120"
              >
              </MediaPlayer>
            </div>
            <div class="case-study-text">
              <p>
                A Grade 3 learner, born blind and from an Apostolic Church family, is accessing education in
                an inclusive school. The learner benefits from a range of accessible learning tools including
                a Perkins Braille machine, audio books, voice recorders and Braille books.
              </p>

              <p>
                The learner was asked to write a short composition about what he did at the weekend. In the
                video you will see the learner writing about his weekend on a Perkins Braille machine. The
                learner then reads his own work aloud. Minor punctuation errors were noted by the educator,
                but the ideas were coherent and well structured.
              </p>

              <h4 class="case-study-subheading"><strong>Questions</strong></h4>
              <ul>
                <li>What can the learner do?</li>
                <li>What other assistive technology might support the learner with reading and writing?</li>
                <li>How could the learner be supported to further develop their fluency in reading and writing?</li>
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
                  Did you notice that the learner independently inserted Braille paper into the Perkins machine,
                  identified correct keys, spaced accurately, and constructed sentences in response to the task?
                </li>
                <li>
                  How might speech to text technology be used, so that the learner’s message is accessible beyond
                  those who can read Braille?
                </li>
                <li>How can the teacher support the learner to proofread and edit his work?</li>
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
                1) Thinking about a lesson you taught recently, what barriers were there to learners who are blind or visually impaired, and how could you adapt that lesson to make it more inclusive?
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
              <ion-accordion-group>
                <ion-accordion value="visual-q1-think">
                  <ion-item slot="header" color="light">
                    <ion-icon :icon="bulb" slot="start" color="warning"></ion-icon>
                    <ion-label>Think about...</ion-label>
                  </ion-item>
                  <div class="ion-padding" slot="content">
                    <ion-list>
                      <ion-item>
                        <ion-icon :icon="arrowForward" slot="start" color="primary"></ion-icon>
                        <ion-label>Have you considered the description of resources?</ion-label>
                      </ion-item>
                      <ion-item>
                        <ion-icon :icon="arrowForward" slot="start" color="primary"></ion-icon>
                        <ion-label>Could you think about the role of technology?</ion-label>
                      </ion-item>
                      <ion-item>
                        <ion-icon :icon="arrowForward" slot="start" color="primary"></ion-icon>
                        <ion-label>How could the learning environment be improved? Consider background noise, seating positions.</ion-label>
                      </ion-item>
                    </ion-list>
                  </div>
                </ion-accordion>
              </ion-accordion-group>
            </div>
            <div class="reflection-section">
              <h4>2) Plan an introduction to a lesson. How can you adapt the start of the lesson to make it more inclusive for learners with visual needs?</h4>
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
              <ion-accordion-group>
                <ion-accordion value="visual-q2-think">
                  <ion-item slot="header" color="light">
                    <ion-icon :icon="bulb" slot="start" color="warning"></ion-icon>
                    <ion-label>Think about...</ion-label>
                  </ion-item>
                  <div class="ion-padding" slot="content">
                    <ion-list>
                      <ion-item>
                        <ion-icon :icon="arrowForward" slot="start" color="secondary"></ion-icon>
                        <ion-label>Have you described everything that is written on a board?</ion-label>
                      </ion-item>
                      <ion-item>
                        <ion-icon :icon="arrowForward" slot="start" color="secondary"></ion-icon>
                        <ion-label>Have you considered the use of real-world objects and models that learners can touch and feel?</ion-label>
                      </ion-item>
                      <ion-item>
                        <ion-icon :icon="arrowForward" slot="start" color="secondary"></ion-icon>
                        <ion-label>Could a buddy system be useful?</ion-label>
                      </ion-item>
                      <ion-item>
                        <ion-icon :icon="arrowForward" slot="start" color="secondary"></ion-icon>
                        <ion-label>Have you allowed enough time for learners to process information and answer questions?</ion-label>
                      </ion-item>
                      <ion-item>
                        <ion-icon :icon="arrowForward" slot="start" color="secondary"></ion-icon>
                        <ion-label>How could you include the learner in deciding which resources and modes of communication to use?</ion-label>
                      </ion-item>
                    </ion-list>
                  </div>
                </ion-accordion>
              </ion-accordion-group>
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
          <ion-card-content>
            <div v-if="questions.length === 0">
              <ion-note color="medium">Quiz coming soon.</ion-note>
            </div>
            <div v-else-if="!quizCompleted">
              <ion-card>
                <ion-card-header>
                  <ion-card-title>Question {{ currentQuizIndex + 1 }} of {{ questions.length }}</ion-card-title>
                  <ion-progress-bar :value="(currentQuizIndex + 1) / questions.length" color="primary"></ion-progress-bar>
                </ion-card-header>
                <ion-card-content>
                  <h4>{{ currentQuestion.question }}</h4>

                  <div v-if="!currentQuestion.type || currentQuestion.type === 'multiple-choice' || currentQuestion.type === 'true-false'">
                    <ion-radio-group v-model="currentAnswer">
                      <ion-item v-for="(option, idx) in currentQuestion.options || []" :key="idx">
                        <ion-radio :value="option.value" slot="start"></ion-radio>
                        <ion-label>{{ option.text }}</ion-label>
                      </ion-item>
                    </ion-radio-group>
                  </div>

                  <div class="ion-padding-top">
                    <ion-button expand="block" color="primary" @click="nextQuestion" :disabled="!canProceed">
                      {{ currentQuizIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question' }}
                    </ion-button>
                  </div>
                </ion-card-content>
              </ion-card>
            </div>

            <div v-else>
              <ion-card>
                <ion-card-header>
                  <ion-card-title>Results</ion-card-title>
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
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { useRoute, onBeforeRouteLeave } from 'vue-router';
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
  ellipsisVertical,
  arrowForward
} from 'ionicons/icons';
import { ProgressService } from '@/services/ProgressService';
import { toastController } from '@ionic/vue';
import { consumePendingAnchor } from '@/utils/anchorScroll';
import MediaPlayer from '../components/MediaPlayer.vue';

const route = useRoute();
const selectedUnderstanding = ref('strengths');
const selectedResourceType = ref('electronic');

const visualCaseStudyPlayer = ref<any>(null);

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

// Exact provided lines (kept as-is, including bullets, punctuation, and line breaks)
const languageUseLines: string[] = [
  'Partially sighted for a learner with some usable vision',
  'Low vision for a visual impairment that cannot be corrected by standard spectacles',
  'Person-first language, for example, a learner who is blind, learner who has difficulty\nseeing, child with low vision or person with a visual impairment.',
];
const languageAvoidLines: string[] = [
  'Using the word blind as a metaphor, for example, ‘she was blind to her failings’ or\n‘the blind leading the blind’',
  '‘Suffers from blindness’ implies suffering.',
  '‘Afflicted with visual impairment’ suggests helplessness',
  '‘Victim of visual impairment’ or ‘victim of vision loss’ suggests pity',
  '‘Bind as a bat’ is considered disrespectful and dehumanising',
  '‘Visually challenged’ is euphemistic and considered condescending.',
];



const understanding = {
  strengths: [
    'What things are you really good at/and interested in?',
    'How do you find your way around the school and classroom or what helps you to find your way around the school or classroom?',
    'How do you like to receive instruction when you’re learning something new?',
    'How do you like to receive written material for reading? Prompts: large, print, Braille, audio',
    'Do you like working on your own or with other learners?'
  ] as string[],
  challenges: [
    'What are some barriers you have experienced when doing classroom activities?',
    'What challenges do you face with physical spaces at school – like hallways, cafeterias, or classrooms – and what challenges do you face?',
    'What stops you from understanding the learning?',
    'What stops you working on tasks with your friends?'
  ] as string[],
  strategies: [
    {
      question: 'How can an educator support your learning?',
      prompts: ['demonstrations or instructions', 'group activities', 'written tasks', 'in different subjects.']
    },
    { question: 'In what ways can verbal description help you?', prompts: [] },
    { question: 'What assistive technologies help you with your learning?', prompts: [] },
    { question: 'In what ways to models and concrete images help you with your learning?', prompts: [] },
    { question: 'How can collaborative group work be made more accessible and inclusive for you?', prompts: [] }
  ] as { question: string; prompts: string[] }[],
  advocacy: [
    'I need this document in a different format (large print, Braille).',
    'Please describe ...',
    'Can you guide me around and talk to me about the classroom layout before the lesson?',
    'Please can you enlarge/change …'
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
    localStorage.setItem(`sage-cs-visual-needs-current`, JSON.stringify({ text: caseStudyNote.value }));
    ProgressService.saveCaseStudyCompletion('visual-needs');
  } catch {}
};
const saveCaseStudyNote = () => {
  try {
    localStorage.setItem(`sage-cs-visual-needs-current`, JSON.stringify({ text: caseStudyNote.value }));
  } finally {
    ProgressService.saveCaseStudyCompletion('visual-needs');
    toastController.create({ message: 'Case study note saved!', duration: 2000, position: 'bottom', color: 'success' }).then(t => t.present());
  }
};

const exportCaseStudyNote = () => {
  const content = `Case Study Note - Visual Needs\n\n${caseStudyNote.value || 'No notes written yet.'}`;
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = window.document.createElement('a');
  a.href = url;
  a.download = 'case-study-visual-needs.txt';
  window.document.body.appendChild(a);
  a.click();
  window.document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toastController.create({ message: 'Case study note exported successfully!', duration: 2000, position: 'bottom', color: 'success' }).then(t => t.present());
};

const clearCaseStudyNote = () => {
  if (confirm('Are you sure you want to clear your case study note? This action cannot be undone.')) {
    caseStudyNote.value = '';
    localStorage.setItem(`sage-cs-visual-needs-current`, JSON.stringify({ text: '' }));
    ProgressService.saveCaseStudyCompletion('visual-needs');
    toastController.create({ message: 'Case study note cleared.', duration: 2000, position: 'bottom', color: 'warning' }).then(t => t.present());
  }
};

const challenges = {
  physical: [
    'Cluttered, frequently altered classroom layouts and uneven flooring can be hazardous.',
    'Background noise or poor acoustics can disadvantage those relying on hearing information.',
    'Lack of rails may hinder mobility.'
  ] as string[],
  social: [
    'Students with visual needs may miss body language, facial expressions and non-\nverbal gestures during social interactions leading to feelings of social isolation.',
    'Unhelpful assumptions, low expectations and stereotyping from peers and educators can mean they assume a student with visual needs is less able than their peers.',
    'Learners with visual needs may not know who is speaking.',
    'Learners with visual needs may talk while not facing the recipient.'
  ] as string[],
  tasks: [
    'Important information and resources for learning or safety are only presented through inaccessible formats such as written materials small fonts, low contrast, no oral explanation.',
    'Educators write on the board without reading aloud or providing alternative accessible formats.',
    'Lack of access to electronic or adapted paper resources such as screen-readers, braille materials or large print or concrete materials.'
  ] as string[],
  assessment: [
    'Inaccessible assessment formats such as visual and print based tasks can be a barrier for learners with visual needs.',
    'Diagrams and charts can be inaccessible for learners with visual needs',
    'Lack of adapted/accessible materials and additional time may hinder learners with visual needs from fully demonstrating their knowledge.'
  ] as string[]
};

const enabling = {
  physical: [
    'Ensure the classroom layout is predictable, consistent and clutter-free. Learners are\nmade aware of uneven flooring through tactile markers or easily visible tape.',
    'Important information and resources for learning should be presented in accessible\nformats, such as large font or with verbal explanations.',
    'Background noise is minimised to allow full concentration.',
    'Use tactile materials to help a learner navigate different areas of the\nclassroom/school.'
  ] as string[],
  social: [
    'Peers should be taught about communicating with learners with visual needs, such\nas saying their names before speaking and verbalising gestures.',
    'With support and training, peer mentoring and buddy systems can be helpful for\nlearners with visual needs.',
    'Ensure high expectations of learners with visual needs are upheld and adaptations\nmade that support independent learning.'
  ] as string[],
  tasks: [
    'All materials should be in an accessible format. For example, check the learner’s\npreferred font and size.',
    'Provide an oral commentary of the educator’s written demonstrations or instructions.',
    'Add raised dots or a tab to mark the start/end of each task.',
    'Allow extra time, where needed, to access and process alternative ways of\npresenting learning.'
  ] as string[],
  assessment: [
    'Assessments should be in accessible formats (for example, large print, audio-\ndescribed, compatible with screen-reading software).',
    'Diagrams and charts should be described and or raised.',
    'Extra time may be needed for learners with visual needs to fully demonstrate their\nknowledge.'
  ] as string[]
};

const resources = {
  electronic: [] as any[],
  paper: [
    { title: 'Braille books and materials.' },
    { title: 'Audio books – National Braille Printing Press.' },
    { title: 'Tactile graphics – such as raised-line drawings for maps, graphs, diagrams, geometric figures – can be created using ‘swell paper’ in an ordinary printer.' },
    { title: 'Books, worksheets, and handouts printed in a larger font size (typically 18-point or higher).' },
    { title: '3D shapes, counting blocks, abacuses, based in blocks and 3D models E.G skeletons, solar systems' },
    { title: 'Textured number lines, clocks, thermometers and rulers with Braille or raised markers.' }
  ] as Array<{ title: string; description?: string; availability?: string }>,
  organizations: [] as Array<{ name: string; description?: string; contact?: string }>
};
const electronicLines: string[] = [
  'https://www.nvaccess.org – NVDA (Non-Visual Desktop Access)- a free screen\nreader.',
  'https://www.bookshare.org – bookshare (audio books for students with qualifying\ndisabilities.',
  'https://support.microsoft.com/en-us/topic/use-immersive-reader-in-microsoft-edge-78a7a17d-52e1-47ee-b0ac-eff8539015e1 – Microsoft Immersive Reader (provides\naudio narration and accessible text.',
  'VoiceOver – available on all Apple devices (built into iOS/macOS; no external link\nneeded).',
  'https://www.bemyeyes.com – volunteers who provide visual assistance.',
  'https://www.aph.org/resources/ – Tactile Graphic Image Library (free downloads for\ntactile graphics).'
];
const organizationsLines: string[] = [
  'https://councilfortheblind.org.zw/ – Council for The Blind Zimbabwe offers support in\ncorrecting sight problems and integrating learners that are blind and partially sighted\ninto education.',
  'https://www.perkins.org/international – Perkins School for the Blind provides support\nfor educators of students with visual needs.',
  'Dorothy Duncan Centre provides reading and educational materials for the blind and\npartially sighted'
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
      localStorage.setItem('visual-reflection', JSON.stringify(reflection.value));
      ProgressService.saveReflectionCompletion('visual-needs');
    } catch {}
  }, 500);
};

const saveReflection = () => {
  try {
    localStorage.setItem(`sage-reflection-visual-needs-current`, JSON.stringify(reflection.value));
    ProgressService.saveReflectionCompletion('visual-needs');
  } finally {
    toastController.create({ message: 'Reflection saved successfully!', duration: 2000, position: 'bottom', color: 'success' }).then(t => t.present());
  }
};

const exportReflection = () => {
  const content = `Reflective task - Visual Needs\n\n1) CASE STUDY REFLECTION:\n${reflection.value.caseStudyReflection || 'No reflection written yet.'}\n\n2) PRACTICE REFLECTION:\n${reflection.value.practiceReflection || 'No reflection written yet.'}`;
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = window.document.createElement('a');
  a.href = url;
  a.download = 'reflection-visual-needs.txt';
  window.document.body.appendChild(a);
  a.click();
  window.document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toastController.create({ message: 'Reflection exported successfully!', duration: 2000, position: 'bottom', color: 'success' }).then(t => t.present());
};

const clearReflection = () => {
  if (confirm('Are you sure you want to clear all your reflections? This action cannot be undone.')) {
    reflection.value = { caseStudyReflection: '', practiceReflection: '' };
    localStorage.setItem(`sage-reflection-visual-needs-current`, JSON.stringify(reflection.value));
    ProgressService.saveReflectionCompletion('visual-needs');
    toastController.create({ message: 'Reflection cleared successfully!', duration: 2000, position: 'bottom', color: 'warning' }).then(t => t.present());
  }
};

onMounted(() => {
  console.log('[PageAnchor] VisualNeeds mounted', { path: route.path });
  try {
    const saved = localStorage.getItem('visual-reflection');
    if (saved) reflection.value = JSON.parse(saved);
  } catch {}

  try {
    const csSaved = localStorage.getItem('sage-cs-visual-needs-current');
    if (csSaved) {
      const parsed = JSON.parse(csSaved);
      caseStudyNote.value = typeof parsed?.text === 'string' ? parsed.text : '';
    }
  } catch {}

  void consumePendingAnchor(route.path).then((didScroll) => {
    console.log('[PageAnchor] VisualNeeds consume result', { didScroll });
  });
});

onBeforeRouteLeave(() => {
  if (visualCaseStudyPlayer.value && typeof visualCaseStudyPlayer.value.pauseMedia === 'function') {
    visualCaseStudyPlayer.value.pauseMedia();
  }
});

// Quiz types and state (retain minimal structure with placeholder question)
interface MCOption { value: string; text: string }
type VisualQuestion =
  | { type?: 'multiple-choice'; question: string; options: MCOption[]; correctAnswer: string }
  | { type: 'true-false'; question: string; options: MCOption[]; correctAnswer: string };

const questions = ref<VisualQuestion[]>([
  {
    question: 'Placeholder question for Visual Needs (content coming soon).',
    options: [
      { value: 'a', text: 'Coming soon' },
      { value: 'b', text: 'Coming soon' }
    ],
    correctAnswer: 'a'
  }
]);

const currentQuizIndex = ref(0);
const currentAnswer = ref('');
const quizCompleted = ref(false);
const quizScore = ref(0);
const quizAnswers = ref<{ [key: number]: any }>({});

const currentQuestion = computed(() => questions.value[currentQuizIndex.value]);

const canProceed = computed(() => {
  const q = currentQuestion.value as any;
  if (!q) return false;
  if (!q.type || q.type === 'multiple-choice' || q.type === 'true-false') return !!currentAnswer.value;
  return false;
});

const nextQuestion = () => {
  const q = currentQuestion.value as any;
  if (!q) return;

  const increment = Math.round(100 / questions.value.length);

  if (!q.type || q.type === 'multiple-choice' || q.type === 'true-false') {
    quizAnswers.value[currentQuizIndex.value] = currentAnswer.value;
    if (q.correctAnswer && currentAnswer.value === q.correctAnswer) {
      quizScore.value += increment;
    }
  }

  if (currentQuizIndex.value < questions.value.length - 1) {
    currentQuizIndex.value += 1;
    currentAnswer.value = '';
  } else {
    quizCompleted.value = true;
    try {
      localStorage.setItem(`sage-quiz-visual-needs`, JSON.stringify({ completed: true, score: quizScore.value, answers: quizAnswers.value, lastCompleted: new Date().toISOString() }));
    } finally {
      ProgressService.saveQuizCompletion('visual-needs', quizScore.value, quizAnswers.value);
    }
  }
};

const retakeQuiz = () => {
  currentQuizIndex.value = 0;
  currentAnswer.value = '';
  quizCompleted.value = false;
  quizScore.value = 0;
  quizAnswers.value = {};
  ProgressService.resetQuizCompletion('visual-needs');
  localStorage.removeItem(`sage-quiz-visual-needs`);
};

const getQuizScoreColor = (): 'success' | 'warning' | 'danger' => {
  if (quizScore.value >= 80) return 'success';
  if (quizScore.value >= 50) return 'warning';
  return 'danger';
};

const getQuizScoreMessage = (): string => {
  if (quizScore.value >= 80) return 'Great job! You have a strong understanding of visual needs.';
  if (quizScore.value >= 50) return 'Good effort. Review the explanations to strengthen your understanding.';
  return 'Keep going. More content will be available soon.';
};
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
.case-study-video { margin-bottom: 16px; }
</style>


