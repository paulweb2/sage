<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Physical and sensory needs</ion-title>
        <ion-buttons slot="end">
          <span style="font-size: 14px; color: var(--ion-color-medium); margin-right: 8px;">v0.0.17</span>
          <ion-button @click="presentActionSheet">
            <ion-icon :icon="ellipsisVertical"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Physical and sensory needs</ion-title>
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
              <ion-accordion value="psn-lang-use">
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

              <ion-accordion value="psn-lang-avoid">
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
                <p>Questions to find about a learner’s <strong>strengths</strong>:</p>
                <ion-list v-if="understanding.strengths.length">
                  <ion-item v-for="(q, i) in understanding.strengths" :key="`str-` + i + '-' + q">
                    <ion-icon :icon="star" slot="start" color="warning"></ion-icon>
                    <ion-label>{{ q }}</ion-label>
                  </ion-item>
                </ion-list>
                <ion-note v-else color="medium">Content coming soon.</ion-note>
              </div>
              <div v-else-if="selectedUnderstanding === 'challenges'">
                <p>Questions and prompts find out about <strong>challenges</strong> a learner may encounter:</p>
                <ion-list v-if="understanding.challenges.length">
                  <ion-item v-for="(item, i) in understanding.challenges" :key="`chal-` + i">
                    <ion-icon :icon="helpCircle" slot="start" color="secondary"></ion-icon>
                    <ion-label>
                      <h4>{{ item.question }}</h4>
                      <ul v-if="item.prompts && item.prompts.length" style="margin: 6px 0 0 6px; padding-left: 12px;">
                        <li v-for="(p, pi) in item.prompts" :key="`chalp-` + i + '-' + pi">{{ p }}</li>
                      </ul>
                    </ion-label>
                  </ion-item>
                </ion-list>
                <ion-note v-else color="medium">Content coming soon.</ion-note>
              </div>
              <div v-else-if="selectedUnderstanding === 'strategies'">
                <p>Questions to understand strategies that can <strong>support</strong> the learner:</p>
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
                <p>Sentence starters to support learners to <strong>share</strong> their needs</p>
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
              <ion-accordion value="psn-enable-physical">
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

              <ion-accordion value="psn-enable-social">
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

              <ion-accordion value="psn-enable-tasks">
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

              <ion-accordion value="psn-enable-assessment">
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
            <ion-card-subtitle>Real-World Examples</ion-card-subtitle>
          </ion-card-header>
          <ion-card-content>
            <!-- Case One: Rudo -->
            <div class="case-study-case">
              <h3 class="case-study-heading">Case one: Rudo</h3>
              <div class="case-study-layout">
                <div class="case-study-media">
                  <img
                    :src="getPublicUrl('physical_case_study_image1.jpg')"
                    alt="Rudo participating in a mathematics lesson"
                    class="case-study-image"
                  />
                </div>
                <div class="case-study-text">
                  <p>
                    Rudo, a girl with low vision and physical needs (uses spectacles and a wheelchair, but has
                    no upper limb challenges), attends a mathematics lesson.
                  </p>

                  <p>
                    During the lesson on percentages, the educator provided a workbook with enlarged font to
                    make reading easier. The educator conducted the lesson in a well-lit classroom to support
                    her visual needs.
                  </p>

                  <p>
                    The educator used a hundred square and sets of objects to illustrate percentages, building
                    on a previous lesson on fractions.
                  </p>
                </div>
              </div>

              <h4 class="case-study-subheading"><strong>Questions</strong></h4>
              <ul>
                <li>How has the educator adapted the physical environment for the learner?</li>
                <li>How could Rudo’s peers be supportive of her learning?</li>
              </ul>

              <div class="case-study-note">
                <ion-textarea
                  v-model="caseStudyNoteCase1"
                  placeholder="Write your case study notes here..."
                  :rows="6"
                  :auto-grow="true"
                  :maxlength="2000"
                  :counter="true"
                  class="reflection-textarea"
                  @ionInput="autoSaveCaseStudyNoteCase1"
                ></ion-textarea>
                <div class="reflection-actions">
                  <ion-button expand="block" color="primary" @click="saveCaseStudyNoteCase1">
                    <ion-icon :icon="save" slot="start"></ion-icon>
                    Save
                  </ion-button>
                  <ion-button expand="block" fill="outline" color="secondary" @click="exportCaseStudyNoteCase1">
                    <ion-icon :icon="download" slot="start"></ion-icon>
                    Export as TXT
                  </ion-button>
                  <ion-button expand="block" fill="outline" color="warning" @click="clearCaseStudyNoteCase1">
                    <ion-icon :icon="trash" slot="start"></ion-icon>
                    Clear
                  </ion-button>
                </div>
                <ul class="case-study-prompts">
                  <li>Have you considered the route from the classroom door to Rudo’s desk?</li>
                  <li>Have you thought about the height of the desk?</li>
                  <li>Have you thought about how Rudo could work with a peer to choose the resources for her task?</li>
                  <li>How can learners support Rudo to collect resources for a task?</li>
                  <li>How can learners offer support to Rudo?</li>
                </ul>
              </div>
            </div>

            <!-- Case Two: Zanele -->
            <div class="case-study-case">
              <h3 class="case-study-heading">Case two: Zanele</h3>
              <div class="case-study-layout">
                <div class="case-study-media">
                  <img
                    :src="getPublicUrl('physical_case_study_image2.png')"
                    alt="Zanele preparing for examinations"
                    class="case-study-image"
                  />
                </div>
                <div class="case-study-text">
                  <p>
                    Zanele, a Grade 7 learner with albinism, is preparing for her national examinations. She
                    experiences low vision and sensitivity to light, which affects her reading and writing. One
                    key challenge is practising on the Grade 7 examination scanner sheet for multiple-choice
                    questions, which requires shading small boxes neatly and accurately.
                  </p>

                  <p>The school applied to the Zimbabwe Schools Examination Council for special examination consideration.</p>
                </div>
              </div>

              <h4 class="case-study-subheading"><strong>Questions</strong></h4>
              <ul>
                <li>What special examination considerations might help Zanele to access the examination?</li>
              </ul>

              <div class="case-study-note">
                <ion-textarea
                  v-model="caseStudyNoteCase2"
                  placeholder="Write your case study notes here..."
                  :rows="6"
                  :auto-grow="true"
                  :maxlength="2000"
                  :counter="true"
                  class="reflection-textarea"
                  @ionInput="autoSaveCaseStudyNoteCase2"
                ></ion-textarea>
                <div class="reflection-actions">
                  <ion-button expand="block" color="primary" @click="saveCaseStudyNoteCase2">
                    <ion-icon :icon="save" slot="start"></ion-icon>
                    Save
                  </ion-button>
                  <ion-button expand="block" fill="outline" color="secondary" @click="exportCaseStudyNoteCase2">
                    <ion-icon :icon="download" slot="start"></ion-icon>
                    Export as TXT
                  </ion-button>
                  <ion-button expand="block" fill="outline" color="warning" @click="clearCaseStudyNoteCase2">
                    <ion-icon :icon="trash" slot="start"></ion-icon>
                    Clear
                  </ion-button>
                </div>
                <ul class="case-study-prompts">
                  <li>Is a scribe allowed?</li>
                  <li>Is a reader allowed?</li>
                  <li>Is there an alternative answer sheet that the examination council can provide?</li>
                  <li>Is extra time allowed?</li>
                </ul>
              </div>
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
                1) Conduct a self-observation and self-reflection throughout a week of teaching and note how often you seek points of view of your learners with physical disabilities (PD), and how often you make decisions for them.
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
              <h4>
                2) Consider what changes to your practice you might make in the light of your reflections.
                <br /><br />
                3) Devise and carry out an activity for all your learners where they would think and articulate/draw/paint what they understand inclusion and belonging means to them in your learning community.
              </h4>
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
                <ion-accordion value="psn-reflection-think">
                  <ion-item slot="header" color="light">
                    <ion-icon :icon="bulb" slot="start" color="warning"></ion-icon>
                    <ion-label>Think about...</ion-label>
                  </ion-item>
                  <div class="ion-padding" slot="content">
                    <ion-list>
                      <ion-item>
                        <ion-icon :icon="arrowForward" slot="start" color="secondary"></ion-icon>
                        <ion-label>Possible questions include: What does it mean to be included?</ion-label>
                      </ion-item>
                      <ion-item>
                        <ion-icon :icon="arrowForward" slot="start" color="secondary"></ion-icon>
                        <ion-label>How does it feel to belong somewhere?</ion-label>
                      </ion-item>
                      <ion-item>
                        <ion-icon :icon="arrowForward" slot="start" color="secondary"></ion-icon>
                        <ion-label>Can you implement some of the learners’ views into your teaching/set-up of your classroom?</ion-label>
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
            <div v-if="!quizCompleted">
              <ion-card :key="currentQuizIndex">
                <ion-card-header>
                  <ion-card-title>Question {{ currentQuizIndex + 1 }} of {{ questions.length }}</ion-card-title>
                  <ion-progress-bar :value="(currentQuizIndex + 1) / questions.length" color="primary"></ion-progress-bar>
                </ion-card-header>
                <ion-card-content>
                  <h4>{{ currentQuestion.question }}</h4>

                  <!-- Multiple Choice and True/False -->
                  <div v-if="!currentQuestion.type || currentQuestion.type === 'multiple-choice' || currentQuestion.type === 'true-false'">
                    <ion-radio-group v-model="currentAnswer">
                      <ion-item v-for="(option, idx) in currentQuestion.options || []" :key="idx">
                        <ion-radio :value="option.value" slot="start"></ion-radio>
                        <ion-label>{{ option.text }}</ion-label>
                      </ion-item>
                    </ion-radio-group>
                  </div>

                  <!-- Multi True/False -->
                  <div v-else-if="currentQuestion.type === 'multi-true-false'">
                    <div class="multi-true-false-instructions">
                      <ion-note color="primary">
                        <strong>Instructions:</strong> {{ currentQuestion.instructions || 'Answer each statement as True or False using the dropdown menus.' }}
                      </ion-note>
                    </div>
                    <ion-list>
                      <ion-item v-for="(subQ, subIndex) in currentQuestion.subQuestions" :key="subQ.id" class="multi-true-false-item">
                        <ion-label>
                          <h4><strong>{{ String.fromCharCode(97 + subIndex) }})&nbsp;</strong>{{ subQ.text }}</h4>
                        </ion-label>
                        <ion-select
                          v-model="matchingAnswers[subQ.id]"
                          interface="popover"
                          placeholder="True or False"
                          :value="matchingAnswers[subQ.id]"
                          class="multi-true-false-select"
                        >
                          <ion-select-option value="">Select answer</ion-select-option>
                          <ion-select-option value="true">True</ion-select-option>
                          <ion-select-option value="false">False</ion-select-option>
                        </ion-select>
                      </ion-item>
                    </ion-list>
                  </div>

                  <!-- Fill in the blank (dropdown for each blank) -->
                  <div v-else-if="currentQuestion.type === 'fill-in-blank'">
                    <div class="fill-in-blank-instructions">
                      <ion-note color="primary">
                        <strong>Instructions:</strong> {{ currentQuestion.instructions || 'Complete each sentence by selecting the most appropriate word or phrase from the dropdown menus.' }}
                      </ion-note>
                    </div>
                    <ion-list>
                      <ion-item v-for="(sentence, sentenceIndex) in currentQuestion.sentences" :key="sentence.id" class="fill-in-blank-item">
                        <ion-label>
                          <h4>
                            <strong>{{ String.fromCharCode(97 + sentenceIndex) }})&nbsp;</strong>
                          </h4>
                          <p class="fill-in-blank-text">
                            <span>{{ sentence.textBefore }}</span>
                            <ion-select
                              v-model="matchingAnswers[sentence.id]"
                              interface="popover"
                              placeholder="Select answer"
                              :value="matchingAnswers[sentence.id]"
                              class="fill-in-blank-select"
                            >
                              <ion-select-option value="">Select answer</ion-select-option>
                              <ion-select-option v-for="opt in sentence.options" :key="opt" :value="opt">{{ opt }}</ion-select-option>
                            </ion-select>
                            <span>{{ sentence.textAfter }}</span>
                            <template v-for="extra in sentence.extraBlanks || []" :key="extra.id">
                              <span v-if="extra.textBefore">{{ extra.textBefore }}</span>
                              <ion-select
                                v-model="matchingAnswers[extra.id]"
                                interface="popover"
                                placeholder="Select answer"
                                :value="matchingAnswers[extra.id]"
                                class="fill-in-blank-select"
                              >
                                <ion-select-option value="">Select answer</ion-select-option>
                                <ion-select-option v-for="opt in extra.options" :key="opt" :value="opt">{{ opt }}</ion-select-option>
                              </ion-select>
                              <span v-if="extra.textAfter">{{ extra.textAfter }}</span>
                            </template>
                          </p>
                        </ion-label>
                      </ion-item>
                    </ion-list>
                  </div>

                  <!-- Select all that apply (checkboxes) -->
                  <div v-else-if="currentQuestion.type === 'select-all'">
                    <div class="select-all-instructions">
                      <ion-note color="primary">
                        <strong>Instructions:</strong> Select all options that apply.
                      </ion-note>
                    </div>
                    <ion-list>
                      <ion-item v-for="option in currentQuestion.options" :key="option.value" class="select-all-item">
                        <input type="checkbox" :value="option.value" v-model="checkboxAnswers[option.value]" style="margin-right: 10px;" />
                        <ion-label>
                          <h4><strong>{{ option.value }})&nbsp;</strong>{{ option.text }}</h4>
                        </ion-label>
                      </ion-item>
                    </ion-list>
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

                  <div class="quiz-results-details" v-if="questions.length > 0">
                    <h4>Question Results:</h4>
                    <div v-for="(question, index) in questions" :key="index" class="question-result-item">
                      <div class="question-content">
                        <ion-item class="question-item">
                          <ion-label>
                            <h5 class="question-heading">
                              <ion-icon
                                :icon="isQuestionCorrect(index) ? checkmarkCircle : closeCircle"
                                :color="isQuestionCorrect(index) ? 'success' : 'danger'"
                                class="question-status-icon"
                              ></ion-icon>
                              Question {{ index + 1 }}
                            </h5>
                            <p>{{ question.question }}</p>
                            <ion-note color="medium">
                              <strong>Your answer:</strong> {{ formatUserAnswer(index) }} |
                              <strong>Correct answer:</strong> {{ formatCorrectAnswer(index) }}
                            </ion-note>

                            <div class="learning-tip-container">
                              <ion-accordion-group>
                                <ion-accordion>
                                  <ion-item slot="header" class="learning-tip-header">
                                    <ion-icon :icon="bulb" slot="start" color="primary"></ion-icon>
                                    <ion-label>
                                      <p>Explanation</p>
                                    </ion-label>
                                  </ion-item>
                                  <div slot="content" class="ion-padding">
                                    <p>{{ getQuestionTip(index) }}</p>
                                    <div class="explanation-divider"></div>
                                    <p>{{ getCorrectAnswerExplanation(index) }}</p>
                                    <p>{{ getLearningPoint(index) }}</p>
                                  </div>
                                </ion-accordion>
                              </ion-accordion-group>
                            </div>
                          </ion-label>
                        </ion-item>
                      </div>
                      <div class="question-divider"></div>
                    </div>
                  </div>

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
  ellipsisVertical,
  arrowForward
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
  const replaceOutsideAnchors = (html: string, targetEscaped: string, replacementHtml: string): string => {
    const parts = html.split(/(<a\b[^>]*>.*?<\/a>)/gi);
    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 0) {
        parts[i] = parts[i].split(targetEscaped).join(replacementHtml);
      }
    }
    return parts.join('');
  };
  let result = escapeHtml(line);
  const urls: string[] = [];
  const sortedUrls = urls.slice().sort((a, b) => b.length - a.length);
  sortedUrls.forEach((u) => {
    const escaped = escapeHtml(u);
    result = replaceOutsideAnchors(
      result,
      escaped,
      `<a href="${u}" target="_blank" rel="noopener noreferrer">${u}</a>`
    );
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

// Language content (exact wording preserved, bullets removed)
const languageUseLines: string[] = [
  'Person-first language, for instance, person with a prosthetic leg, or person with cerebral palsy, person using a wheelchair.'
];
const languageAvoidLines: string[] = [
  '‘Disabled person’, instead use ‘person with disability’',
  '‘Wheelchair-bound’, instead use ‘person in a wheelchair’',
  'Avoid using ‘sit down/stand up’ as these terms are not applicable to learners in wheelchairs.'
];

const understanding = {
  strengths: [
    'Describe your interests and talents.',
    'Which subjects or kinds of activities do you enjoy in school?'
  ] as string[],
  challenges: [
    { question: 'Can you always see/hear/access your learning?', prompts: [] },
    { question: 'Do you feel part of class activities and decision-making?', prompts: [] },
    { question: 'Are you comfortable in your wheelchair/the seat you use in the classroom?', prompts: [] },
    { question: 'What are the physical barriers in the classroom?', prompts: [] },
    {
      question: 'Prompts:',
      prompts: [
        'height of the desk',
        'access to sink or toilet',
        'space to move and transition from one activity to another',
        'moving from one classroom to another/in corridors?'
      ]
    }
  ] as { question: string; prompts: string[] }[],
  strategies: [
    { question: 'If the learner with PD experience cognitive difficulties too, say ‘Tell me about how you prefer to communicate.’', prompts: [] },
    { question: 'Tell me about good times of the day for you to learn.', prompts: [] },
    { question: 'Work with parents to find out about effective strategies used at home and at school.', prompts: [] }
  ] as { question: string; prompts: string[] }[],
  advocacy: [
    'It helps me when you …',
    'It helps if I have adapted ... (pens, cutlery etc)',
    'I can independently do …',
    'I need help with …',
    'I may need help with …',
    'May I have more time to think please?',
    'Can you ask me that again in a different way?',
    'I would like to play this game but I’m not sure how I could be included.'
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

// Case Study note state (two cases)
const caseStudyNoteCase1 = ref('');
const caseStudyNoteCase2 = ref('');

const autoSaveCaseStudyNoteCase1 = () => {
  try {
    localStorage.setItem(
      `sage-cs-physical-sensory-needs-case1`,
      JSON.stringify({ text: caseStudyNoteCase1.value })
    );
    ProgressService.saveCaseStudyCompletion('physical-sensory-needs');
  } catch {}
};

const saveCaseStudyNoteCase1 = () => {
  try {
    localStorage.setItem(
      `sage-cs-physical-sensory-needs-case1`,
      JSON.stringify({ text: caseStudyNoteCase1.value })
    );
  } finally {
    ProgressService.saveCaseStudyCompletion('physical-sensory-needs');
    toastController
      .create({
        message: 'Case study note (Case one) saved!',
        duration: 2000,
        position: 'bottom',
        color: 'success'
      })
      .then((t) => t.present());
  }
};

const exportCaseStudyNoteCase1 = () => {
  const content = `Case Study Note - Physical and Sensory Needs (Case one: Rudo)\n\n${
    caseStudyNoteCase1.value || 'No notes written yet.'
  }`;
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = window.document.createElement('a');
  a.href = url;
  a.download = 'case-study-physical-sensory-needs-case1-rudo.txt';
  window.document.body.appendChild(a);
  a.click();
  window.document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toastController
    .create({
      message: 'Case study note (Case one) exported successfully!',
      duration: 2000,
      position: 'bottom',
      color: 'success'
    })
    .then((t) => t.present());
};

const clearCaseStudyNoteCase1 = () => {
  if (confirm('Are you sure you want to clear your case study note for Case one? This action cannot be undone.')) {
    caseStudyNoteCase1.value = '';
    localStorage.setItem(`sage-cs-physical-sensory-needs-case1`, JSON.stringify({ text: '' }));
    ProgressService.saveCaseStudyCompletion('physical-sensory-needs');
    toastController
      .create({
        message: 'Case study note (Case one) cleared.',
        duration: 2000,
        position: 'bottom',
        color: 'warning'
      })
      .then((t) => t.present());
  }
};

const autoSaveCaseStudyNoteCase2 = () => {
  try {
    localStorage.setItem(
      `sage-cs-physical-sensory-needs-case2`,
      JSON.stringify({ text: caseStudyNoteCase2.value })
    );
    ProgressService.saveCaseStudyCompletion('physical-sensory-needs');
  } catch {}
};

const saveCaseStudyNoteCase2 = () => {
  try {
    localStorage.setItem(
      `sage-cs-physical-sensory-needs-case2`,
      JSON.stringify({ text: caseStudyNoteCase2.value })
    );
  } finally {
    ProgressService.saveCaseStudyCompletion('physical-sensory-needs');
    toastController
      .create({
        message: 'Case study note (Case two) saved!',
        duration: 2000,
        position: 'bottom',
        color: 'success'
      })
      .then((t) => t.present());
  }
};

const exportCaseStudyNoteCase2 = () => {
  const content = `Case Study Note - Physical and Sensory Needs (Case two: Zanele)\n\n${
    caseStudyNoteCase2.value || 'No notes written yet.'
  }`;
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = window.document.createElement('a');
  a.href = url;
  a.download = 'case-study-physical-sensory-needs-case2-zanele.txt';
  window.document.body.appendChild(a);
  a.click();
  window.document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toastController
    .create({
      message: 'Case study note (Case two) exported successfully!',
      duration: 2000,
      position: 'bottom',
      color: 'success'
    })
    .then((t) => t.present());
};

const clearCaseStudyNoteCase2 = () => {
  if (confirm('Are you sure you want to clear your case study note for Case two? This action cannot be undone.')) {
    caseStudyNoteCase2.value = '';
    localStorage.setItem(`sage-cs-physical-sensory-needs-case2`, JSON.stringify({ text: '' }));
    ProgressService.saveCaseStudyCompletion('physical-sensory-needs');
    toastController
      .create({
        message: 'Case study note (Case two) cleared.',
        duration: 2000,
        position: 'bottom',
        color: 'warning'
      })
      .then((t) => t.present());
  }
};

const challenges = {
  physical: [
    'Moving from one activity/space to another',
    'Reaching and using equipment and resources if fine motor or gross motor skills are\nneeded',
    'Teacher and teaching resources not being aligned with the line of learner’s line of\nvision or hearing',
    'Time and access to personal care',
    'Barriers to transition within the school environment.'
  ] as string[],
  social: [
    'Being excluded from social interactions with peers due to the seating position',
    'Barriers to participation in the classroom activities due to PD limiting opportunities to\nmove easily around the classroom; for example, if asked to select a group or find a\npartner may not be as fast or find it more challenging to move round the space',
    'Not being asked for an opinion about what’s happening in the classroom leading to\nfeeling lonely and isolated and limiting a sense of belonging',
    'If there is an assistant present, learner is sometimes not recognised and can feel\nignored if information always goes thought the assistant.'
  ] as string[],
  tasks: [
    'Lower expectations from educators who only expect learners with PD to participate in\nsome areas of learning at school or who assume that learners with PD always also\nhave cognitive disabilities.',
    'Problems using different resources caused by difficulties in fine and gross motor\nskills.',
    'PDs can often impact on the levels of concentration and time to process information\ndue to medication and/or discomfort within the immediate environment.'
  ] as string[],
  assessment: [
    'Learners with PD may often require flexibilities and specific adjustments on all forms\nof assessments.'
  ] as string[]
};

const enabling = {
  physical: [
    'Ensure passages between spaces/rooms/inside and outside are sufficient to\naccommodate wider frames of wheelchairs or walking frames to enable the learner’s\nsmooth movement between areas of learning.',
    'Ensure pathways are clear as even without equipment, if a person is not too steady\nobstacles can be difficult to navigate.',
    'Position educator and the resources so that they use are visible and audible to the\nlearner.',
    'Ensure the learner is enabled to reach for materials they need for a task.'
  ] as string[],
  social: [
    'Plan to include the learner in all class activities to foster a sense of belonging.',
    'Celebrate learner strengths and showcase their abilities amongst their peers.',
    'Encourage peers to learn the assistive tools that the learner might be using.',
    'Enable agency and decision-making of learners with PD by always asking if they\nwould like support with moving, position, holding resources, etc.',
    'Build in activities to develop and enhance social and emotional skills of self-esteem,\nindependence, and resilience.'
  ] as string[],
  tasks: [
    'Consider physical, sensory, fine and gross motor needs of learners to enable\naccessibility of the tasks and resources to enable those with PD to participate in all\ntasks.',
    'Allow additional time to process information and regular breaks to support concentration.',
    'Collaborate work with multi-agency colleagues to incorporate therapeutic programmes into the learning throughout the day.',
    'Strive to gain learners’ views on their experiences and sensations during class activities\nto involve them in the decision-making process and inform your planning for future\nactivities.'
  ] as string[],
  assessment: [
    'Adjustments for assessment may include using a different room for a test to minimis distractions.',
    'Adaptations of resources used in assessments should meet individual needs, such\nas using assistive technology or alternative modes of communication.',
    'Ensure assistance is provided for practical tests.',
    'Allowing extra time for processing of information.'
  ] as string[]
};

const resources = {
  electronic: [] as any[],
  paper: [
    { title: 'Depending on the level and variety of disability' },
    { title: 'Pencil grips' },
    { title: 'Paintbrush grips' },
    { title: 'Larger print' },
    { title: 'Clipboards to retain the paper in place may be needed.' }
  ] as Array<{ title: string; description?: string; availability?: string }>,
  organizations: [] as Array<{ name: string; description?: string; contact?: string }>
};
const electronicLines: string[] = [
  'Text-to-speech tools to adapt written aspects of tasks',
  'Eye-gaze equipment, for individual and practical tasks and group work.'
];
const organizationsLines: string[] = [
  'https://www.shinecharity.org.uk/ – a charity that supports individuals and families affected by\nspina bifida, microcephalus and hydrocephalus. It provides a range of specialist support\nservices, including information, advice and practical help for those living with these\nconditions, as well as guidance for educators.',
  'https://www.scope.org.uk/ – a disability equality charity in England and Wales. Some of the\nsupport directed for families will also support educators in creating stimulating, inclusive and\nsupportive classroom environment.',
  'https://pdnet.org.uk/ – a national network in the UK that provides support to professionals in\neducation who are working to promote positive outcomes for children and young people with\nphysical disabilities. It offers resources, training and a forum for sharing information and best\npractices among educators.',
  'Also consider including repositories for local supportive information and detail.'
];

// Quiz configuration
interface QuestionFeedback {
  tip: string;
  explanation: string;
  learningPoint: string;
}

interface MCOption { value: string; text: string }
interface MultiTFSubQ { id: string; text: string; correctAnswer: 'true' | 'false'; explanation?: string }
interface FillExtraBlank { id: string; textBefore?: string; textAfter?: string; correctAnswer: string; options: string[] }
interface FillSentence {
  id: string;
  textBefore: string;
  textAfter?: string;
  correctAnswer: string;
  options: string[];
  extraBlanks?: FillExtraBlank[];
}

interface BaseQuestion {
  question: string;
  instructions?: string;
  feedback?: QuestionFeedback;
}

type PhysicalQuestion =
  | (BaseQuestion & { type?: 'multiple-choice'; options: MCOption[]; correctAnswer: string })
  | (BaseQuestion & { type: 'true-false'; options: MCOption[]; correctAnswer: string })
  | (BaseQuestion & { type: 'multi-true-false'; subQuestions: MultiTFSubQ[] })
  | (BaseQuestion & { type: 'fill-in-blank'; sentences: FillSentence[] })
  | (BaseQuestion & { type: 'select-all'; options: MCOption[]; correctAnswers: string[]; alternativeCorrectAnswers?: string[] });

const defaultFeedback: QuestionFeedback = {
  tip: 'Review the related section on inclusive strategies for learners with PD.',
  explanation: 'Revisit the guidance in this module for a deeper explanation.',
  learningPoint: 'Inclusive adjustments should support participation, agency and belonging.'
};

const fillWordOptions = ['time', 'room/space', 'hear/understand', 'feeling/belonging'];
const aspectOptions = ['Social', 'Physical', 'Environmental', 'Emotional and well-being'];

const questions = ref<PhysicalQuestion[]>([
  {
    question: 'How could you enhance the social skills of learners with PD within the classroom? Select all the answers that are correct.',
    type: 'select-all',
    options: [
      { value: 'a', text: 'Ensure the learner always has a teaching assistant by their side in the playground.' },
      { value: 'b', text: 'Ensure the learner’s peers can operate the assistive technologies that the learner is using to communicate.' },
      { value: 'c', text: 'Learn about the learner’s social skills, abilities and preferences from their parents or carers.' },
      { value: 'd', text: 'Hold lower expectations for learners with PD as they are only able to participate in some areas of learning at school.' }
    ],
    correctAnswers: ['b', 'c'],
    feedback: {
      tip: 'Look for actions that empower peers and keep expectations high.',
      explanation: 'Peer understanding of technology and insights from families open up inclusive interactions without lowering expectations.',
      learningPoint: 'Sustained peer collaboration and high aspirations help learners with PD flourish socially.'
    }
  },
  {
    question: 'True or false? Consider each statement carefully.',
    type: 'multi-true-false',
    instructions: 'Mark each statement as True or False.',
    subQuestions: [
      {
        id: 'a',
        text: 'Learners with PD almost always have cognitive disabilities.',
        correctAnswer: 'false',
        explanation: 'Physical disabilities do not automatically mean cognitive disability; tailor supports to the individual learner.'
      },
      {
        id: 'b',
        text: 'Barriers to inclusion of learners with PD can be social as well as physical.',
        correctAnswer: 'true',
        explanation: 'Attitudes, interactions and classroom culture can either support or block participation.'
      },
      {
        id: 'c',
        text: 'Asking learners with PD to contribute to decision-making can support their sense of belonging.',
        correctAnswer: 'true',
        explanation: 'Inviting learner voice builds agency and community.'
      },
      {
        id: 'd',
        text: 'Pencil grip can be a supportive tool for fine-motor skills for learners with PD.',
        correctAnswer: 'true',
        explanation: 'Adapted tools such as pencil grips can increase independence with writing tasks.'
      }
    ],
    feedback: {
      tip: 'Think about whole-child development—physical, social and emotional.',
      explanation: 'Only statement a is false; the rest show how tools, belonging and social inclusion matter.',
      learningPoint: 'Avoid assumptions about cognition and focus on barrier removal plus learner agency.'
    }
  },
  {
    question: 'True or false? Reflect on how classroom organisation affects inclusion.',
    type: 'multi-true-false',
    instructions: 'Mark each statement as True or False.',
    subQuestions: [
      {
        id: 'a',
        text: 'It is not important where the learner with PD sits as their teaching assistant will always help them understand instructions.',
        correctAnswer: 'false',
        explanation: 'Positioning influences visibility, audibility and the learner’s independence.'
      },
      {
        id: 'b',
        text: 'Learners with PD might require additional time to process information and complete tasks.',
        correctAnswer: 'true',
        explanation: 'Pain, medication or motor planning needs can slow processing; flexible timing helps.'
      },
      {
        id: 'c',
        text: 'Considering sensory needs of learners with PD can contribute to an inclusive classroom.',
        correctAnswer: 'true',
        explanation: 'Lighting, noise and movement supports help learners stay regulated and engaged.'
      },
      {
        id: 'd',
        text: 'Positioning a learner with PD away from the group supports inclusivity as the learner can complete tasks without distractions.',
        correctAnswer: 'false',
        explanation: 'Seating away from peers can reduce a learner’s sense of belonging, so balance access with community.'
      }
    ],
    feedback: {
      tip: 'Balance access adjustments with social participation.',
      explanation: 'Only statements b and c are true; seating and grouping decisions influence independence and belonging.',
      learningPoint: 'Plan environments that maximise both access and classroom community.'
    }
  },
  {
    question: 'Fill in the blanks using the word bank.',
    type: 'fill-in-blank',
    instructions: 'Options: time, room/space, hear/understand, feeling/belonging.',
    sentences: [
      {
        id: 'a-time',
        textBefore: 'Adjustment to assessment can include more ',
        textAfter: ' to process information,',
        correctAnswer: 'time',
        options: fillWordOptions,
        extraBlanks: [
          {
            id: 'a-room',
            textBefore: ' using a different ',
            textAfter: ' to minimise distractions.',
            correctAnswer: 'room/space',
            options: fillWordOptions
          }
        ]
      },
      {
        id: 'b-hear',
        textBefore: 'Strategic seating arrangements can enable the learners to see and ',
        textAfter: ' the educator’s instructions effectively.',
        correctAnswer: 'hear/understand',
        options: fillWordOptions
      },
      {
        id: 'c-belong',
        textBefore: 'Active participation in all classroom activities can enhance the learner’s sense of ',
        textAfter: '.',
        correctAnswer: 'feeling/belonging',
        options: fillWordOptions
      }
    ],
    feedback: {
      tip: 'Match each blank to the adjustment being described.',
      explanation: 'Additional time, a different room or space, better audibility and feeling/belonging all support inclusive assessment.',
      learningPoint: 'Assessment adjustments should consider time, environment, communication and emotional safety.'
    }
  },
  {
    question: 'Match each statement to the aspect of learning it represents.',
    type: 'fill-in-blank',
    instructions: 'Options: Social, Physical, Environmental, Emotional and well-being.',
    sentences: [
      {
        id: 'a',
        textBefore: '“I like working on my tablet with my peers.” → ',
        textAfter: '',
        correctAnswer: 'Social',
        options: aspectOptions
      },
      {
        id: 'b',
        textBefore: '“The spaces between the tables and other areas in the classroom are big enough for me to transition efficiently.” → ',
        textAfter: '',
        correctAnswer: 'Physical',
        options: aspectOptions
      },
      {
        id: 'c',
        textBefore: '“I don’t like it when the sun shines through the blinds in the afternoon as I’m on a lower level of vision than others.” → ',
        textAfter: '',
        correctAnswer: 'Environmental',
        options: aspectOptions
      },
      {
        id: 'd',
        textBefore: '“I can build my self-esteem and independence when my resources are prepared and in an easy reach.” → ',
        textAfter: '',
        correctAnswer: 'Emotional and well-being',
        options: aspectOptions
      }
    ],
    feedback: {
      tip: 'Consider whether the statement is about people, movement, environment or feelings.',
      explanation: 'The statements highlight social interaction, physical access, environmental adjustments and emotional well-being.',
      learningPoint: 'Planning for PD should account for social, physical, environmental and emotional dimensions together.'
    }
  }
]);

const currentQuizIndex = ref(0);
const currentAnswer = ref('');
const matchingAnswers = ref<Record<string, string>>({});
const checkboxAnswers = ref<Record<string, boolean>>({});
const quizCompleted = ref(false);
const quizScore = ref(0);
const quizAnswers = ref<Record<number, any>>({});

const loadQuizState = () => {
  const completed = ProgressService.isQuizCompleted('physical-sensory-needs');
  if (!completed) return;
  quizCompleted.value = true;
  quizScore.value = ProgressService.getQuizScore('physical-sensory-needs') || 0;
  const savedAnswers = ProgressService.getQuizAnswers('physical-sensory-needs');
  if (savedAnswers) {
    quizAnswers.value = { ...(savedAnswers as Record<number, any>) };
  }
};

onMounted(loadQuizState);

const currentQuestion = computed(() => questions.value[currentQuizIndex.value]);

const getSentenceBlanks = (sentence: FillSentence) => {
  const base = [{ id: sentence.id, correctAnswer: sentence.correctAnswer }];
  if (!sentence.extraBlanks || !sentence.extraBlanks.length) return base;
  return base.concat(sentence.extraBlanks.map((extra) => ({ id: extra.id, correctAnswer: extra.correctAnswer })));
};

const canProceed = computed(() => {
  const q = currentQuestion.value as any;
  if (!q) return false;
  if (!q.type || q.type === 'multiple-choice' || q.type === 'true-false') return !!currentAnswer.value;
  if (q.type === 'multi-true-false') return q.subQuestions.every((sq: any) => matchingAnswers.value[sq.id] === 'true' || matchingAnswers.value[sq.id] === 'false');
  if (q.type === 'fill-in-blank')
    return q.sentences.every((s: FillSentence) => getSentenceBlanks(s).every((blank) => !!matchingAnswers.value[blank.id]));
  if (q.type === 'select-all') return Object.values(checkboxAnswers.value).some((v) => v);
  return false;
});

function setsEqual(a: string[], b: string[]) {
  if (a.length !== b.length) return false;
  const sa = new Set(a);
  return b.every((v) => sa.has(v));
}

const nextQuestion = () => {
  const q = currentQuestion.value as any;
  if (!q) return;

  const increment = Math.round(100 / questions.value.length);

  if (!q.type || q.type === 'multiple-choice' || q.type === 'true-false') {
    quizAnswers.value[currentQuizIndex.value] = currentAnswer.value;
    if (q.correctAnswer && currentAnswer.value === q.correctAnswer) {
      quizScore.value += increment;
    }
  } else if (q.type === 'multi-true-false') {
    quizAnswers.value[currentQuizIndex.value] = { ...matchingAnswers.value };
    const allCorrect = q.subQuestions.every((sq: any) => matchingAnswers.value[sq.id] === sq.correctAnswer);
    if (allCorrect) {
      quizScore.value += increment;
    }
  } else if (q.type === 'fill-in-blank') {
    quizAnswers.value[currentQuizIndex.value] = { ...matchingAnswers.value };
    const allCorrect = q.sentences.every((s: FillSentence) =>
      getSentenceBlanks(s).every((blank) => matchingAnswers.value[blank.id] === blank.correctAnswer)
    );
    if (allCorrect) {
      quizScore.value += increment;
    }
  } else if (q.type === 'select-all') {
    const correct = q.correctAnswers as string[];
    const alt = (q.alternativeCorrectAnswers || []) as string[];
    const selectedMap: Record<string, boolean> = {};
    Object.keys(checkboxAnswers.value).forEach((k) => {
      if (checkboxAnswers.value[k]) selectedMap[k] = true;
    });
    quizAnswers.value[currentQuizIndex.value] = selectedMap;
    const selected = Object.keys(selectedMap).sort();
    const isExact = setsEqual(selected, correct.slice().sort());
    const isAlt = alt.length > 0 && setsEqual(selected, alt.slice().sort());
    if (isExact || isAlt) {
      quizScore.value += increment;
    }
  }

  if (currentQuizIndex.value < questions.value.length - 1) {
    currentQuizIndex.value += 1;
    currentAnswer.value = '';
    matchingAnswers.value = {};
    checkboxAnswers.value = {};
  } else {
    quizCompleted.value = true;
    try {
      localStorage.setItem(
        `sage-quiz-physical-sensory-needs`,
        JSON.stringify({ completed: true, score: quizScore.value, answers: quizAnswers.value, lastCompleted: new Date().toISOString() })
      );
    } finally {
      ProgressService.saveQuizCompletion('physical-sensory-needs', quizScore.value, quizAnswers.value);
    }
  }
};

const retakeQuiz = () => {
  currentQuizIndex.value = 0;
  currentAnswer.value = '';
  quizCompleted.value = false;
  quizScore.value = 0;
  matchingAnswers.value = {};
  checkboxAnswers.value = {};
  quizAnswers.value = {};
  ProgressService.resetQuizCompletion('physical-sensory-needs');
  localStorage.removeItem(`sage-quiz-physical-sensory-needs`);
};

const getQuizScoreColor = (): 'success' | 'warning' | 'danger' => {
  if (quizScore.value >= 80) return 'success';
  if (quizScore.value >= 50) return 'warning';
  return 'danger';
};

const getQuizScoreMessage = (): string => {
  if (quizScore.value >= 80) return 'Excellent understanding of strategies for learners with PD.';
  if (quizScore.value >= 50) return 'Good effort. Review the explanations to strengthen your understanding.';
  return 'Keep going. Use the explanations to guide your next review.';
};

const isQuestionCorrect = (index: number): boolean => {
  const question = questions.value[index] as any;
  const userAnswer = quizAnswers.value[index];
  if (question.type === 'multi-true-false') {
    const ua = userAnswer as Record<string, string> | undefined;
    if (!ua || !question.subQuestions) return false;
    return question.subQuestions.every((subQ: any) => ua[subQ.id] === subQ.correctAnswer);
  } else if (question.type === 'fill-in-blank') {
    const ua = userAnswer as Record<string, string> | undefined;
    if (!ua || !question.sentences) return false;
    return question.sentences.every((s: FillSentence) => getSentenceBlanks(s).every((blank) => ua[blank.id] === blank.correctAnswer));
  } else if (question.type === 'select-all') {
    const ua = userAnswer as Record<string, boolean> | undefined;
    if (!ua) return false;
    const selected = Object.entries(ua)
      .filter(([, checked]) => checked)
      .map(([k]) => k);
    return selected.length === (question.correctAnswers?.length || 0) && setsEqual(selected.slice().sort(), (question.correctAnswers || []).slice().sort());
  }
  return userAnswer === question.correctAnswer;
};

const formatUserAnswer = (index: number): string => {
  const question = questions.value[index] as any;
  const userAnswer = quizAnswers.value[index];
  if (question.type === 'multi-true-false') {
    const ua = userAnswer as Record<string, string> | undefined;
    if (!ua || Object.keys(ua).length === 0) return 'Not answered';
    return Object.entries(ua)
      .map(([id, ans]) => `${id}: ${ans === 'true' ? 'True' : 'False'}`)
      .join(', ');
  } else if (question.type === 'fill-in-blank') {
    const ua = userAnswer as Record<string, string> | undefined;
    if (!ua) return 'Not answered';
    const answered = (question.sentences as FillSentence[])
      .flatMap((s) => getSentenceBlanks(s).map((blank) => ({ id: blank.id, value: ua[blank.id] })))
      .filter((entry) => !!entry.value);
    if (!answered.length) return 'Not answered';
    return answered.map((entry) => `${entry.id}: ${entry.value}`).join(', ');
  } else if (question.type === 'select-all') {
    const ua = userAnswer as Record<string, boolean> | undefined;
    if (!ua || Object.keys(ua).length === 0) return 'Not answered';
    const selected = Object.entries(ua)
      .filter(([, checked]) => checked)
      .map(([k]) => k);
    if (selected.length === 0) return 'Not answered';
    return selected
      .map((key) => {
        const opt = (question.options || []).find((o: any) => o.value === key);
        return `${key}) ${opt ? opt.text : ''}`;
      })
      .join(', ');
  } else if (question.type === 'true-false') {
    if (!userAnswer) return 'Not answered';
    return userAnswer === 'true' ? 'True' : 'False';
  } else {
    const opt = (question.options || []).find((o: any) => o.value === userAnswer);
    return opt ? opt.text : 'Not answered';
  }
};

const formatCorrectAnswer = (index: number): string => {
  const question = questions.value[index] as any;
  if (question.type === 'multi-true-false') {
    return question.subQuestions.map((sq: any) => `${sq.id}: ${sq.correctAnswer === 'true' ? 'True' : 'False'}`).join(', ');
  } else if (question.type === 'fill-in-blank') {
    return (question.sentences as FillSentence[])
      .flatMap((s) => getSentenceBlanks(s).map((blank) => `${blank.id}: ${blank.correctAnswer}`))
      .join(', ');
  } else if (question.type === 'select-all') {
    return (question.options || [])
      .filter((opt: any) => (question.correctAnswers || []).includes(opt.value))
      .map((opt: any) => `${opt.value}) ${opt.text}`)
      .join(', ');
  } else if (question.type === 'true-false') {
    return question.correctAnswer === 'true' ? 'True' : 'False';
  } else {
    const opt = (question.options || []).find((o: any) => o.value === question.correctAnswer);
    return opt ? opt.text : 'Unknown';
  }
};

const getFeedbackValue = (index: number, key: keyof QuestionFeedback): string => {
  const question = questions.value[index];
  if (question && question.feedback && question.feedback[key]) {
    return question.feedback[key] as string;
  }
  return defaultFeedback[key];
};

const getQuestionTip = (index: number): string => getFeedbackValue(index, 'tip');
const getCorrectAnswerExplanation = (index: number): string => getFeedbackValue(index, 'explanation');
const getLearningPoint = (index: number): string => getFeedbackValue(index, 'learningPoint');

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
      localStorage.setItem('physical-sensory-reflection', JSON.stringify(reflection.value));
      ProgressService.saveReflectionCompletion('physical-sensory-needs');
    } catch {}
  }, 500);
};

const saveReflection = () => {
  try {
    localStorage.setItem(`sage-reflection-physical-sensory-needs-current`, JSON.stringify(reflection.value));
    ProgressService.saveReflectionCompletion('physical-sensory-needs');
  } finally {
    toastController.create({ message: 'Reflection saved successfully!', duration: 2000, position: 'bottom', color: 'success' }).then(t => t.present());
  }
};

const exportReflection = () => {
  const content = `Reflective task - Physical and Sensory Needs\n\n1) CASE STUDY REFLECTION:\n${reflection.value.caseStudyReflection || 'No reflection written yet.'}\n\n2) PRACTICE REFLECTION:\n${reflection.value.practiceReflection || 'No reflection written yet.'}`;
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = window.document.createElement('a');
  a.href = url;
  a.download = 'reflection-physical-sensory-needs.txt';
  window.document.body.appendChild(a);
  a.click();
  window.document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toastController.create({ message: 'Reflection exported successfully!', duration: 2000, position: 'bottom', color: 'success' }).then(t => t.present());
};

const clearReflection = () => {
  if (confirm('Are you sure you want to clear all your reflections? This action cannot be undone.')) {
    reflection.value = { caseStudyReflection: '', practiceReflection: '' };
    localStorage.setItem(`sage-reflection-physical-sensory-needs-current`, JSON.stringify(reflection.value));
    ProgressService.saveReflectionCompletion('physical-sensory-needs');
    toastController.create({ message: 'Reflection cleared successfully!', duration: 2000, position: 'bottom', color: 'warning' }).then(t => t.present());
  }
};

onMounted(() => {
  console.log('[PageAnchor] PhysicalSensoryNeeds mounted', { path: route.path });
  try {
    const saved = localStorage.getItem('physical-sensory-reflection');
    if (saved) reflection.value = JSON.parse(saved);
  } catch {}

  try {
    const cs1 = localStorage.getItem('sage-cs-physical-sensory-needs-case1');
    const cs2 = localStorage.getItem('sage-cs-physical-sensory-needs-case2');

    if (cs1) {
      const parsed1 = JSON.parse(cs1);
      caseStudyNoteCase1.value = typeof parsed1?.text === 'string' ? parsed1.text : '';
    }

    if (cs2) {
      const parsed2 = JSON.parse(cs2);
      caseStudyNoteCase2.value = typeof parsed2?.text === 'string' ? parsed2.text : '';
    }

    // Backwards compatibility: load legacy single note into Case one if present and no new notes yet
    if (!cs1 && !cs2) {
      const csLegacy = localStorage.getItem('sage-cs-physical-sensory-needs-current');
      if (csLegacy) {
        const parsedLegacy = JSON.parse(csLegacy);
        caseStudyNoteCase1.value = typeof parsedLegacy?.text === 'string' ? parsedLegacy.text : '';
      }
    }
  } catch {}

  void consumePendingAnchor(route.path).then((didScroll) => {
    console.log('[PageAnchor] PhysicalSensoryNeeds consume result', { didScroll });
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
.case-study-case { margin-bottom: 24px; }
.case-study-heading { margin-bottom: 12px; font-weight: 700; }
.case-study-layout { display: block; }
.case-study-media { margin-bottom: 12px; }
.case-study-image { width: 100%; height: auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
@media (min-width: 768px) {
  .case-study-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
    gap: 16px;
    align-items: flex-start;
  }
  .case-study-media { margin-bottom: 0; }
}
.quiz-results-details { margin-top: 12px; }
.question-result-item { margin-top: 12px; }
.question-divider { height: 1px; background: var(--ion-color-medium); opacity: 0.2; margin: 12px 0; }
.explanation-divider { height: 1px; background-color: var(--ion-color-light-shade); margin: 16px 0; opacity: 0.6; }
.question-status-icon { margin-right: 8px; vertical-align: middle; font-size: 1.8rem; display: inline-flex; align-items: center; justify-content: center; }
.question-heading { font-size: 1.5rem; font-weight: 800; color: var(--ion-color-dark); display: flex; align-items: center; gap: 12px; margin-bottom: 12px; line-height: 1.2; }
.learning-tip-header { --background: #e3f2fd; border: 1px solid #2196f3; border-radius: 8px; }
.learning-tip-container { margin-top: 4px; margin-left: 0; margin-bottom: 0; width: 100%; background-color: #e3f2fd; border-radius: 8px; padding: 4px; border: 1px solid #2196f3; }
.fill-in-blank-text { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-top: 4px; }
</style>


