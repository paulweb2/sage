<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Hearing needs</ion-title>
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
          <ion-title size="large">Hearing needs</ion-title>
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
              <ion-accordion value="hearing-lang-use">
                <ion-item slot="header" color="success">
                  <ion-icon :icon="checkmarkCircle" slot="start" color="success"></ion-icon>
                  <ion-label>Respectful language</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content">
                  <ion-list>
                    <ion-item v-for="(word, index) in wordsToUse" :key="`use-` + word.term + '-' + index">
                      <ion-icon :icon="checkmark" slot="start" color="success"></ion-icon>
                      <ion-label>
                        <h4>{{ word.term }} - {{ word.explanation }}</h4>
                      </ion-label>
                    </ion-item>
                  </ion-list>
                </div>
              </ion-accordion>

              <ion-accordion value="hearing-lang-avoid">
                <ion-item slot="header" color="danger">
                  <ion-icon :icon="closeCircle" slot="start" color="danger"></ion-icon>
                  <ion-label>Language to avoid</ion-label>
                </ion-item>
                <div class="ion-padding" slot="content">
                  <ion-list>
                    <ion-item v-for="(word, index) in wordsToAvoid" :key="`avoid-` + word.term + '-' + index">
                      <ion-icon :icon="close" slot="start" color="danger"></ion-icon>
                      <ion-label>
                        <h4>{{ word.term }} - {{ word.reason }}</h4>
                      </ion-label>
                    </ion-item>
                  </ion-list>
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
                <p>Using the learner’s preferred communication method, questions and prompts help to find about a learner’s <strong>strengths</strong>:</p>
                <ion-list>
                  <ion-item v-for="(q, i) in understanding.strengths" :key="`str-` + i + '-' + q">
                    <ion-icon :icon="star" slot="start" color="warning"></ion-icon>
                    <ion-label>{{ q }}</ion-label>
                  </ion-item>
                </ion-list>
              </div>
              <div v-else-if="selectedUnderstanding === 'challenges'">
                <p>Using the learner’s preferred communication method, questions and prompts help to find about <strong>challenges</strong> a learner may encounter:</p>
                <ion-list>
                  <ion-item v-for="(q, i) in understanding.challenges" :key="`chal-` + i + '-' + q">
                    <ion-icon :icon="helpCircle" slot="start" color="secondary"></ion-icon>
                    <ion-label>{{ q }}</ion-label>
                  </ion-item>
                </ion-list>
              </div>
              <div v-else-if="selectedUnderstanding === 'strategies'">
                <p>Using the learner’s preferred communication method, questions and prompts help to understand strategies that can support the learner:</p>
                <ion-list>
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
              </div>
              <div v-else-if="selectedUnderstanding === 'advocacy'">
                <p>Sentence starters to support learners to share their needs:</p>
                <ion-list>
                  <ion-item v-for="(q, i) in understanding.advocacy" :key="`adv-` + i + '-' + q">
                    <ion-icon :icon="megaphone" slot="start" color="tertiary"></ion-icon>
                    <ion-label>{{ q }}</ion-label>
                  </ion-item>
                </ion-list>
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
            <ion-grid>
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
          </ion-card-content>
        </ion-card>

        <!-- Enabling Section -->
        <ion-card id="enabling">
          <ion-card-header>
            <ion-card-title>Enabling Learning</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-accordion-group>
              <ion-accordion value="hearing-enable-physical">
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

              <ion-accordion value="hearing-enable-social">
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

              <ion-accordion value="hearing-enable-tasks">
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

              <ion-accordion value="hearing-enable-assessment">
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
                <ion-list>
                  <ion-item v-for="(line, i) in electronicLines" :key="`res-elec-` + i">
                    <ion-icon :icon="laptop" slot="start" color="primary"></ion-icon>
                    <ion-label>
                      <p style="white-space: pre-wrap; margin: 0;" v-html="linkifyElectronicLine(line)"></p>
                    </ion-label>
                  </ion-item>
                </ion-list>
              </div>
              <div v-else-if="selectedResourceType === 'paper'">
                <ion-list>
                  <ion-item v-for="(r, i) in resources.paper" :key="`res-paper-` + i + '-' + r.title">
                    <ion-icon :icon="documentIcon" slot="start" color="secondary"></ion-icon>
                    <ion-label>
                      <h4 v-html="linkifyText(r.title)"></h4>
                      <p>{{ r.description }}</p>
                      <p v-if="r.availability">{{ r.availability }}</p>
                    </ion-label>
                  </ion-item>
                </ion-list>
              </div>
              <div v-else-if="selectedResourceType === 'organizations'">
                <ion-list>
                  <ion-item v-for="(line, i) in organizationsLines" :key="`res-org-` + i">
                    <ion-icon :icon="business" slot="start" color="tertiary"></ion-icon>
                    <ion-label>
                      <p v-html="linkifyText(line)" style="white-space: pre-wrap; margin: 0;"></p>
                    </ion-label>
                  </ion-item>
                </ion-list>
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
              <img :src="getPublicUrl('hearing_casestudy_image1.png')" alt="Case study image 1" class="case-study-image" />
              <img :src="getPublicUrl('hearing_casestudy_image2.png')" alt="Case study image 2" class="case-study-image" />
              <img :src="getPublicUrl('hearing_casestudy_image3.png')" alt="Case study image 3" class="case-study-image" />
            </div>

            <div class="case-study-text">
              <p>
                A class consists of 10 learners (3 boys, 7 girls) who use Zimbabwe Sign Language (ZSL) for
                communication.
              </p>

              <p>Learners are grouped into two levels:</p>
              <ul>
                <li>working with numbers 1-10</li>
                <li>working with numbers to 20.</li>
              </ul>

              <p>
                The lesson was designed to connect images of different amounts or sets of objects with
                written numbers. The teacher engaged learners in number-counting activities using a mix of
                tools and communication approaches:
              </p>
              <ul>
                <li>objects, dice, abacus, number lines</li>
                <li>games, visual aids and charts to reinforce number concepts</li>
                <li>blocks and abacus for learners working with 2-digit numbers</li>
                <li>
                  total communication approach: ZSL, gestures, voice for lip-readers, concrete objects,
                  pictures and spoken English.
                </li>
              </ul>

              <h4 class="case-study-subheading">Questions</h4>
              <ul>
                <li>
                  How has the teacher positioned the learner’s so they can access the total
                  communication approach?
                </li>
                <li>
                  What else might the teacher need to consider when putting children into pairs to play
                  a game or complete a task?
                </li>
                <li>
                  How are the concrete objects and games supporting access and participation in a
                  lesson about number?
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
                <li>Have you thought about the table arrangements?</li>
                <li>Have you thought about the position of the teacher or any other adults?</li>
                <li>Have you considered grouping learners who communicate in the same ways or pairing learners with different ways of communicating?</li>
                <li>How does the use of games support participation?</li>
                <li>How does the use of dice or dominoes support an understanding of number?</li>
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
                1) Thinking about a lesson you have taught recently, how might it be made more accessible to learners with hearing needs?
              </p>
              <ion-textarea
                v-model="reflection.caseStudyReflection"
                placeholder="How could you adapt the hearing supports mentioned in the case study for your own students?"
                :rows="6"
                :auto-grow="true"
                :maxlength="2000"
                :counter="true"
                class="reflection-textarea"
                @ionInput="autoSaveReflection"
              ></ion-textarea>
              <ion-accordion-group>
                <ion-accordion value="cs-think">
                  <ion-item slot="header" color="light">
                    <ion-icon :icon="bulb" slot="start" color="warning"></ion-icon>
                    <ion-label>Think about...</ion-label>
                  </ion-item>
                  <div class="ion-padding" slot="content">
                    <ion-list>
                      <ion-item>
                        <ion-icon :icon="arrowForward" slot="start" color="primary"></ion-icon>
                        <ion-label>Have you considered the use of visual and written resources?</ion-label>
                      </ion-item>
                      <ion-item>
                        <ion-icon :icon="arrowForward" slot="start" color="primary"></ion-icon>
                        <ion-label>Could you think about the role of technology, for example, captioning on videos, speech to text software?</ion-label>
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
              <h4>2) How could you help hearing children communicate with those with a hearing need?</h4>
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
                <ion-accordion value="practice-think">
                  <ion-item slot="header" color="light">
                    <ion-icon :icon="bulb" slot="start" color="warning"></ion-icon>
                    <ion-label>Think about...</ion-label>
                  </ion-item>
                  <div class="ion-padding" slot="content">
                    <ion-list>
                      <ion-item>
                        <ion-icon :icon="arrowForward" slot="start" color="secondary"></ion-icon>
                        <ion-label>Have you considered how all learners will know how to communicate with a peer with a hearing need, for example, preferred positions, gaining attention of the listener?</ion-label>
                      </ion-item>
                      <ion-item>
                        <ion-icon :icon="arrowForward" slot="start" color="secondary"></ion-icon>
                        <ion-label>Could you teach all learners basic sign language?</ion-label>
                      </ion-item>
                      <ion-item>
                        <ion-icon :icon="arrowForward" slot="start" color="secondary"></ion-icon>
                        <ion-label>What basic Zimbabwean sign language signs would be useful to teach the children?</ion-label>
                      </ion-item>
                      <ion-item>
                        <ion-icon :icon="arrowForward" slot="start" color="secondary"></ion-icon>
                        <ion-label>How might you intervene to ensure learners with hearing needs are included in social activities?</ion-label>
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

        <!-- Knowledge Check (Quiz) -->
        <ion-card id="knowledge-check">
          <ion-card-header>
            <ion-card-title>Quiz</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <div v-if="!quizCompleted">
              <ion-card>
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
                        <strong>Instructions:</strong> Answer each statement as True or False using the dropdown menus.
                      </ion-note>
                    </div>
                    <ion-list>
                      <ion-item v-for="(subQ, subIndex) in currentQuestion.subQuestions" :key="subQ.id" class="multi-true-false-item">
                        <ion-label>
                          <h4><strong>{{ String.fromCharCode(97 + subIndex) }})&nbsp;</strong>{{ subQ.text }}</h4>
                        </ion-label>
                        <ion-select v-model="matchingAnswers[subQ.id]" interface="popover" placeholder="True or False" :value="matchingAnswers[subQ.id]" class="multi-true-false-select">
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
                        <strong>Instructions:</strong> Complete each sentence by selecting the most appropriate word or phrase from the dropdown menus.
                      </ion-note>
                    </div>
                    <ion-list>
                      <ion-item v-for="(sentence, sentenceIndex) in currentQuestion.sentences" :key="sentence.id" class="fill-in-blank-item">
                        <ion-label>
                          <h4>
                            <strong>{{ String.fromCharCode(97 + sentenceIndex) }})&nbsp;</strong>
                            <span class="fill-in-blank-text">{{ sentence.textBefore }}</span>
                            <ion-select v-model="matchingAnswers[sentence.id]" interface="popover" placeholder="Select answer" :value="matchingAnswers[sentence.id]" class="fill-in-blank-select">
                              <ion-select-option value="">Select answer</ion-select-option>
                              <ion-select-option v-for="opt in sentence.options" :key="opt" :value="opt">{{ opt }}</ion-select-option>
                            </ion-select>
                            <span class="fill-in-blank-text">{{ sentence.textAfter }}</span>
                          </h4>
                        </ion-label>
                      </ion-item>
                    </ion-list>
                  </div>

                  <!-- Select all that apply (checkboxes) -->
                  <div v-else-if="currentQuestion.type === 'select-all'">
                    <div class="select-all-instructions">
                      <ion-note color="primary">
                        <strong>Instructions:</strong> Select all options that apply. You can either select "All of these" OR select all the individual options.
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
                              <ion-icon :icon="isQuestionCorrect(index) ? checkmarkCircle : closeCircle" :color="isQuestionCorrect(index) ? 'success' : 'danger'" class="question-status-icon"></ion-icon>
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
  IonChip,
  IonCheckbox,
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
  arrowForward,
  save,
  download,
  trash,
  settings,
  heart,
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
  const replaceOutsideAnchors = (html: string, targetEscaped: string, replacementHtml: string): string => {
    // Split by existing <a>...</a> to avoid replacing inside links
    const parts = html.split(/(<a\b[^>]*>.*?<\/a>)/gi);
    for (let i = 0; i < parts.length; i++) {
      // Only replace in non-anchor segments (even indices)
      if (i % 2 === 0) {
        parts[i] = parts[i].split(targetEscaped).join(replacementHtml);
      }
    }
    return parts.join('');
  };
  let result = escapeHtml(line);
  // Handle Google Play URL that is split across a newline in the provided text
  const googleDisplay =
    'https://play.google.com/store/apps/details?id=com.google.audio.hearing.visualization.access\nibility.scribe';
  const googleHref =
    'https://play.google.com/store/apps/details?id=com.google.audio.hearing.visualization.accessibility.scribe';
  const escapedGoogleDisplay = escapeHtml(googleDisplay);
  result = replaceOutsideAnchors(
    result,
    escapedGoogleDisplay,
    `<a href="${googleHref}" target="_blank" rel="noopener noreferrer">${googleDisplay}</a>`
  );
  // Linkify standard URLs while keeping visible text exactly the same
  const urls = [
    'https://www.bbc.co.uk/bitesize',
    'https://www.youtube.com/watch?v=Tf0ZlEmmcBc',
    'https://www.youtube.com',
    'https://kahoot.com',
    'https://quizlet.com',
    'https://nearpod.com'
  ];
  // Ensure longer URLs (e.g., full YouTube watch URL) are linkified before shorter base URLs
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
  // Simple URL regex for http/https
  const urlRegex = /(https?:\/\/[^\s)]+)/g;
  result = result.replace(urlRegex, (m) => {
    const href = m;
    return `<a href="${href}" target="_blank" rel="noopener noreferrer">${m}</a>`;
  });
  return result;
};

const wordsToUse = [
  { term: 'D/deaf', explanation: 'Refers to the condition of profound or complete hearing loss; lower or upper case D/d can be used. Check with the learner for their preference.' },
  { term: 'Hearing impairment / hearing loss', explanation: 'These terms are also used. Again, check with the learner for their preference.' },
  { term: 'Non-verbal', explanation: 'Should only be used if the person does not use speech. Learners may communicate in different ways, for example, sign language and gestures.' },
  { term: 'Person-first language', explanation: "For example, 'person with hearing loss', 'a person who uses sign language'." }
];

const wordsToAvoid = [
  { term: '‘deaf’ and ‘dumb/deaf-mute’', reason: 'can suggest problems with intelligence.' },
  { term: '‘suffers from hearing loss’', reason: 'implies suffering.' },
  { term: '‘normal hearing learner’', reason: 'implies that individuals with hearing loss are ‘abnormal’; use ‘hearing learner’.' }
];

const understanding = {
  strengths: [
    'What is your preferred way to communicate – signing, speaking, writing, drawing or something else?',
    'What is the best position for you in the classroom in relation to the person speaking?',
    'What helps you understand things best, for example, seeing, doing, reading or hearing?',
    'When learning new things, how do you prefer teachers to explain things to you?'
  ],
  challenges: [
    'What challenges do you have during class discussions, group work or when your teacher is instructing you?',
    'Is there anything you would like your classmates or teachers to do differently when communicating with you?',
    'Do you have any problems using your hearing aids/assistive devices or other tools?'
  ],
  strategies: [
    {
      question: 'What helps your learning in the classroom?',
      prompts: ['seating', 'pictures', 'slides', 'things written on the board or spoken']
    },
    {
      question: 'Where do you prefer to learn?',
      prompts: ['space', 'group size']
    },
    {
      question: 'Are there environmental factors that are difficult for you?',
      prompts: ['lighting', 'sound']
    },
    {
      question: 'Is your learning affected by lighting or background noise, and in what ways?',
      prompts: []
    },
    {
      question: 'How do you prefer to communicate?',
      prompts: ['sign language', 'lip-reading', 'technology']
    }
  ],
  advocacy: [
    'I understand you more when …',
    'It would help me if you …',
    'I prefer to sit …',
    'I need to use … to help my learning.'
  ]
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
    localStorage.setItem(`sage-cs-hearing-needs-current`, JSON.stringify({ text: caseStudyNote.value }));
    ProgressService.saveCaseStudyCompletion('hearing-needs');
  } catch {}
};
const saveCaseStudyNote = () => {
  try {
    localStorage.setItem(`sage-cs-hearing-needs-current`, JSON.stringify({ text: caseStudyNote.value }));
  } finally {
    ProgressService.saveCaseStudyCompletion('hearing-needs');
    toastController.create({ message: 'Case study note saved!', duration: 2000, position: 'bottom', color: 'success' }).then(t => t.present());
  }
};

const exportCaseStudyNote = () => {
  const content = `Case Study Note - Hearing Needs\n\n${caseStudyNote.value || 'No notes written yet.'}`;
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = window.document.createElement('a');
  a.href = url;
  a.download = 'case-study-hearing-needs.txt';
  window.document.body.appendChild(a);
  a.click();
  window.document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toastController.create({ message: 'Case study note exported successfully!', duration: 2000, position: 'bottom', color: 'success' }).then(t => t.present());
};

const clearCaseStudyNote = () => {
  if (confirm('Are you sure you want to clear your case study note? This action cannot be undone.')) {
    caseStudyNote.value = '';
    localStorage.setItem(`sage-cs-hearing-needs-current`, JSON.stringify({ text: '' }));
    ProgressService.saveCaseStudyCompletion('hearing-needs');
    toastController.create({ message: 'Case study note cleared.', duration: 2000, position: 'bottom', color: 'warning' }).then(t => t.present());
  }
};

const challenges = {
  physical: [
    'Noise in the learning environment such as background, for example, AC systems, chatter, outside noise, or echoes can make speech harder to understand.',
    'Low or flickering lighting can interfere with learner’s ability to lip read or see resources.',
    'Learners facing away from the educator, peers or visual cues may miss information.',
    'The absence of written instructions, captions or visual cues can make following verbal lessons difficult.'
  ],
  social: [
    'Knowing what and who to pay attention to in busy environments can be hard to work out.',
    'Teachers or other children do not gain the attention of the learner before communicating with them.',
    'Missed social cues, such as tone of voice or humour, can lead to confusion or social misunderstandings.'
  ],
  tasks: [
    'Verbal explanations may not be fully understood without visual support.',
    'Listening and dictation tasks can be difficult and require more time.',
    'Longer or more complex tasks may be tiring due to the extra effort required to understand and process information.',
    'Information shared informally through peer or teacher talk may be missed.'
  ],
  assessment: [
    'Verbal Instructions without written or visual support can limit understanding for the learner.',
    'Listening-based assessments can be inaccessible to the learner even with hearing aids.',
    'Learners with hearing needs may struggle to show their knowledge in formats such as oral presentations or spoken responses.',
    'Learners with hearing needs may need extra time for processing, interpreting and understanding tasks.'
  ]
};

const enabling = {
  physical: [
    'Reduce background noise by ensuring one person speaks at a time. Move learners with hearing needs away from AC systems or other noise sources. Consider the need for carpets and curtains to reduce echoes.',
    'Ensure lighting allows for the visibility of facial expressions and to aid lip-reading.',
    'Position learners to clearly see the teacher, board and where necessary the interpreter.',
    'Provide visual instructions and/or pictures and lesson objectives in written formats that are accessible to the learner.'
  ],
  social: [
    'Teach ways to communicate learners with hearing needs to staff and learners. For example, speaking one at a time, gaining the attention of a person with hearing needs before speaking, and facing the person you are talking to. Peers could be taught basic signs.',
    'Foster a ‘deaf-aware’ classroom through peer education and empathy-building activities.',
    'Encourage peer buddies or promote social inclusion activities.',
    'Use home language where appropriate.'
  ],
  tasks: [
    'Provide written instructions and visual aids alongside spoken directions.',
    'Instructions should be short and precise.',
    'Offer captioned, subtitled or transcribed materials for any audio- or video-based content.',
    'Build in short breaks to reduce fatigue during longer or more demanding tasks.'
  ],
  assessment: [
    'Support verbal Instructions with written or visual aids.',
    'Use home language where appropriate.',
    'Provide alternatives to listening-based assessments where appropriate,',
    'Provide alternatives, where appropriate, to oral presentations or spoken responses.',
    'Allow extra time and provide breaks to reduce fatigue.',
    'Learners with hearing needs may need extra time for processing, interpreting and understanding tasks.',
    'Focus on assessing conceptual understanding rather than use of language. For example, learners can demonstrate an understanding of a triangle by sorting shapes into sets without needing to say the word triangle.'
  ]
};

interface PaperResource {
  title: string;
  description?: string;
  availability?: string;
}

interface OrganizationResource {
  name: string;
  description?: string;
  contact?: string;
}

const resources: { electronic: string[]; paper: PaperResource[]; organizations: OrganizationResource[] } = {
  electronic: [
    // Unused for electronic rendering on this page; kept for structure consistency
  ],
  paper: [
    { title: 'Zimbabwean sign language dictionary. King George VI Centre and School by Sindile Kevin Mhlanga' },
    { title: 'Sign language charts and posters' },
    { title: 'Visual – flashcards with images, symbols, written words, or sign language illustrations to support development of vocabulary and conceptual understanding and to support routines.' },
    { title: 'Sign language charts and posters displaying commonly used signs for classroom use.' },
    { title: 'PECS (Picture Exchange Communication System) Cards – support learners who are non-verbal.' },
    { title: 'Storybooks that include characters with hearing needs, for example, https://www.perkins.org/books-about-deafness-or-with-deaf-characters/' }
  ],
  organizations: [
    { name: "National Deaf Children's Society", description: 'Supporting deaf children and their families', contact: '0808 800 8880' },
    { name: 'Action on Hearing Loss', description: 'Supporting people with hearing loss and tinnitus', contact: '0808 808 0123' },
    { name: 'British Deaf Association', description: 'Promoting sign language and Deaf culture', contact: '0121 450 7711' }
  ]
};
const electronicLines = [
  'https://www.bbc.co.uk/bitesize offers captioned videos and structured learning\ncontent from KS1 to GCSE.',
  'https://play.google.com/store/apps/details?id=com.google.audio.hearing.visualization.access\nibility.scribe Google Live, transcribes speech into text in real time.',
  'https://www.youtube.com YouTube with auto-captions.',
  'https://www.bbc.co.uk/bitesize offers captioned videos and structured learning\ncontent from KS1 to GCSE.',
  'https://kahoot.com | https://quizlet.com | https://nearpod.com Kahoot! Quizlet, and\nNearpod (Free Versions) Interactive learning tools.',
  'https://www.youtube.com/watch?v=Tf0ZlEmmcBc YouTube resources to learn\nZimbabwean sign language.'
];

const organizationsLines = [
  'https://deafzimbabwetrust.org/ – includes resources for learning Zimbabwean\nsign language.',
  'https://www.ndcs.org.uk – the National Deaf Children’s Society (NDCS)\nprovides educational resources and teacher guidance.',
  'https://www.deafchildworldwide.org – supports inclusive education in low-\nresource settings.'
];

const caseStudy = {
  title: 'To be developed by CBM',
  scenario: ''
};

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
      localStorage.setItem('hearing-reflection', JSON.stringify(reflection.value));
      // Also update progress completion timestamp
      ProgressService.saveReflectionCompletion('hearing-needs');
    } catch {}
  }, 500);
};

const saveReflection = () => {
  try {
    localStorage.setItem(`sage-reflection-hearing-needs-current`, JSON.stringify(reflection.value));
    ProgressService.saveReflectionCompletion('hearing-needs');
  } finally {
    toastController.create({ message: 'Reflection saved successfully!', duration: 2000, position: 'bottom', color: 'success' }).then(t => t.present());
  }
};

const exportReflection = () => {
  const content = `Reflective task - Hearing Needs\n\n1) CASE STUDY REFLECTION:\n${reflection.value.caseStudyReflection || 'No reflection written yet.'}\n\n2) PRACTICE REFLECTION:\n${reflection.value.practiceReflection || 'No reflection written yet.'}`;
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = window.document.createElement('a');
  a.href = url;
  a.download = 'reflection-hearing-needs.txt';
  window.document.body.appendChild(a);
  a.click();
  window.document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toastController.create({ message: 'Reflection exported successfully!', duration: 2000, position: 'bottom', color: 'success' }).then(t => t.present());
};

const clearReflection = () => {
  if (confirm('Are you sure you want to clear all your reflections? This action cannot be undone.')) {
    reflection.value = { caseStudyReflection: '', practiceReflection: '' };
    localStorage.setItem(`sage-reflection-hearing-needs-current`, JSON.stringify(reflection.value));
    ProgressService.saveReflectionCompletion('hearing-needs');
    toastController.create({ message: 'Reflection cleared successfully!', duration: 2000, position: 'bottom', color: 'warning' }).then(t => t.present());
  }
};

onMounted(() => {
  console.log('[PageAnchor] HearingNeeds mounted', { path: route.path });
  try {
    const saved = localStorage.getItem('hearing-reflection');
    if (saved) reflection.value = JSON.parse(saved);
  } catch {}

  try {
    const csSaved = localStorage.getItem('sage-cs-hearing-needs-current');
    if (csSaved) {
      const parsed = JSON.parse(csSaved);
      caseStudyNote.value = typeof parsed?.text === 'string' ? parsed.text : '';
    }
  } catch {}

  void consumePendingAnchor(route.path).then((didScroll) => {
    console.log('[PageAnchor] HearingNeeds consume result', { didScroll });
  });
});

// Quiz types and state
interface MCOption { value: string; text: string }
interface MultiTFSubQ { id: string; text: string; correctAnswer: 'true' | 'false'; explanation?: string }
interface FillSentence { id: string; textBefore: string; textAfter?: string; correctAnswer: string; options: string[] }

type HearingQuestion =
  | { type?: 'multiple-choice'; question: string; options: MCOption[]; correctAnswer: string }
  | { type: 'true-false'; question: string; options: MCOption[]; correctAnswer: string }
  | { type: 'multi-true-false'; question: string; subQuestions: MultiTFSubQ[] }
  | { type: 'fill-in-blank'; question: string; sentences: FillSentence[] }
  | { type: 'select-all'; question: string; options: MCOption[]; correctAnswers: string[]; alternativeCorrectAnswers?: string[] };

const questions = ref<HearingQuestion[]>([
  {
    question: "What is an example of respectful language to use when describing a learner who has hearing needs?",
    options: [
      { value: 'a', text: 'D/deaf or has hearing loss' },
      { value: 'b', text: 'Deaf and dumb' },
      { value: 'c', text: 'Handicapped' }
    ],
    correctAnswer: 'a'
  },
  {
    question: 'True or false:',
    type: 'multi-true-false',
    subQuestions: [
      {
        id: 'a',
        text: 'Low lighting can be problematic in classrooms for learners with hearing needs',
        correctAnswer: 'true',
        explanation: 'True because learners with hearing needs will need to rely on their vision and will need to see speakers faces, mouths clearly as well as visual prompts and captions.'
      },
      {
        id: 'b',
        text: 'Learners with hearing needs may need extra time to process information',
        correctAnswer: 'true',
        explanation: 'True because of the extra cognitive demands involved in processing information.'
      },
      {
        id: 'c',
        text: 'Dictation exercises are suitable for all deaf learners',
        correctAnswer: 'false',
        explanation: 'False because learners with hearing needs may struggle to hear spoken information.'
      }
    ]
  },
  {
    question: 'Complete the following sentences:',
    type: 'fill-in-blank',
    sentences: [
      {
        id: 'a',
        textBefore: 'Video content will be more accessible to learners with hearing needs if it includes',
        textAfter: '',
        correctAnswer: 'subtitles',
        options: [
          'facing',
          'breaks',
          'subtitles'
        ]
      },
      {
        id: 'b',
        textBefore: 'Learners with hearing needs may need to be',
        textAfter: 'the teacher to better access information',
        correctAnswer: 'facing',
        options: [
          'facing',
          'breaks',
          'subtitles'
        ]
      },
      {
        id: 'c',
        textBefore: 'To reduce fatigue, learners with hearing needs may need regular',
        textAfter: '',
        correctAnswer: 'breaks',
        options: [
          'facing',
          'breaks',
          'subtitles'
        ]
      }
    ]
  },
  {
    question: 'Which resources may support the learning for learners with hearing needs - select all that apply.',
    type: 'select-all',
    options: [
      { value: 'a', text: 'Sign language charts and posters' },
      { value: 'b', text: 'Captions on videos' },
      { value: 'c', text: 'Speech to text software' },
      { value: 'd', text: 'Written materials' },
      { value: 'e', text: 'All of these' }
    ],
    correctAnswers: ['e'],
    alternativeCorrectAnswers: ['a', 'b', 'c', 'd']
  },
  {
    question: 'Focus assessments on conceptual understanding rather than use of language.',
    type: 'true-false',
    options: [
      { value: 'true', text: 'True' },
      { value: 'false', text: 'False' }
    ],
    correctAnswer: 'true'
  }
]);

const currentQuizIndex = ref(0);
const currentAnswer = ref('');
const multiAnswers = ref<{ [key: string]: string }>({});
const fillAnswers = ref<{ [key: string]: string }>({});
const selectedOptions = ref<string[]>([]);
const matchingAnswers = ref<{ [key: string]: string }>({});
const checkboxAnswers = ref<{ [key: string]: boolean }>({});
const quizCompleted = ref(false);
const quizScore = ref(0);
const quizAnswers = ref<{ [key: number]: any }>({});

const loadQuizState = () => {
  const completed = ProgressService.isQuizCompleted('hearing-needs');
  if (!completed) return;
  quizCompleted.value = true;
  quizScore.value = ProgressService.getQuizScore('hearing-needs') || 0;
  const savedAnswers = ProgressService.getQuizAnswers('hearing-needs');
  if (savedAnswers) {
    quizAnswers.value = { ...(savedAnswers as { [key: number]: any }) };
  }
};

onMounted(loadQuizState);

const currentQuestion = computed(() => questions.value[currentQuizIndex.value]);

const canProceed = computed(() => {
  const q = currentQuestion.value as any;
  if (!q) return false;
  if (!q.type || q.type === 'multiple-choice' || q.type === 'true-false') return !!currentAnswer.value;
  if (q.type === 'multi-true-false') return q.subQuestions.every((sq: any) => matchingAnswers.value[sq.id] === 'true' || matchingAnswers.value[sq.id] === 'false');
  if (q.type === 'fill-in-blank') return q.sentences.every((s: any) => !!matchingAnswers.value[s.id]);
  if (q.type === 'select-all') return Object.values(checkboxAnswers.value).some(v => v);
  return false;
});

function setsEqual(a: string[], b: string[]) {
  if (a.length !== b.length) return false;
  const sa = new Set(a);
  return b.every(v => sa.has(v));
}

// toggleOption no longer used with native checkbox v-model

const nextQuestion = () => {
  const q = currentQuestion.value as any;
  if (!q) return;

  const increment = Math.round(100 / questions.value.length);

  if (!q.type || q.type === 'multiple-choice' || q.type === 'true-false') {
    // save answer
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
    const allCorrect = q.sentences.every((s: any) => matchingAnswers.value[s.id] === s.correctAnswer);
    if (allCorrect) {
      quizScore.value += increment;
    }
  } else if (q.type === 'select-all') {
    const correct = q.correctAnswers as string[];
    const alt = (q.alternativeCorrectAnswers || []) as string[];
    // store as mapping like old page
    const selectedMap: { [key: string]: boolean } = {};
    Object.keys(checkboxAnswers.value).forEach(k => { if (checkboxAnswers.value[k]) selectedMap[k] = true; });
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
    checkboxAnswers.value = {} as any;
  } else {
    quizCompleted.value = true;
    try {
      localStorage.setItem(`sage-quiz-hearing-needs`, JSON.stringify({ completed: true, score: quizScore.value, answers: quizAnswers.value, lastCompleted: new Date().toISOString() }));
    } finally {
      ProgressService.saveQuizCompletion('hearing-needs', quizScore.value, quizAnswers.value);
    }
  }
};

const retakeQuiz = () => {
  currentQuizIndex.value = 0;
  currentAnswer.value = '';
  quizCompleted.value = false;
  quizScore.value = 0;
  matchingAnswers.value = {};
  checkboxAnswers.value = {} as any;
  quizAnswers.value = {};
  ProgressService.resetQuizCompletion('hearing-needs');
  localStorage.removeItem(`sage-quiz-hearing-needs`);
};

// Results helpers
const getQuizScoreColor = (): 'success' | 'warning' | 'danger' => {
  if (quizScore.value >= 80) return 'success';
  if (quizScore.value >= 50) return 'warning';
  return 'danger';
};

const getQuizScoreMessage = (): string => {
  if (quizScore.value >= 80) return 'Great job! You have a strong understanding of hearing needs.';
  if (quizScore.value >= 50) return 'Good effort. Review the explanations to strengthen your understanding.';
  return 'Keep going. The explanations below will help you learn more.';
};

const isQuestionCorrect = (index: number): boolean => {
  const question = questions.value[index] as any;
  const userAnswer = quizAnswers.value[index];
  if (question.type === 'multi-true-false') {
    const ua = userAnswer as { [key: string]: string } | undefined;
    if (!ua || !question.subQuestions) return false;
    return question.subQuestions.every((subQ: any) => ua[subQ.id] === subQ.correctAnswer);
  } else if (question.type === 'fill-in-blank') {
    const ua = userAnswer as { [key: string]: string } | undefined;
    if (!ua || !question.sentences) return false;
    return question.sentences.every((s: any) => ua[s.id] === s.correctAnswer);
  } else if (question.type === 'select-all') {
    const ua = userAnswer as { [key: string]: boolean } | undefined;
    if (!ua) return false;
    if (ua['e']) return true;
    const selected = Object.entries(ua).filter(([_, checked]) => checked).map(([k]) => k);
    return selected.length === 4 && selected.includes('a') && selected.includes('b') && selected.includes('c') && selected.includes('d');
  } else if (question.type === 'true-false' || !question.type || question.type === 'multiple-choice') {
    return userAnswer === question.correctAnswer;
  }
  return false;
};

const formatUserAnswer = (index: number): string => {
  const question = questions.value[index] as any;
  const userAnswer = quizAnswers.value[index];
  if (question.type === 'multi-true-false') {
    const ua = userAnswer as { [key: string]: string } | undefined;
    if (!ua || Object.keys(ua).length === 0) return 'Not answered';
    return Object.entries(ua).map(([id, ans]) => `${id}: ${ans === 'true' ? 'True' : 'False'}`).join(', ');
  } else if (question.type === 'fill-in-blank') {
    const ua = userAnswer as { [key: string]: string } | undefined;
    if (!ua || Object.keys(ua).length === 0) return 'Not answered';
    return Object.entries(ua).map(([id, ans]) => `${id}: ${ans}`).join(', ');
  } else if (question.type === 'select-all') {
    const ua = userAnswer as { [key: string]: boolean } | undefined;
    if (!ua || Object.keys(ua).length === 0) return 'Not answered';
    const selected = Object.entries(ua).filter(([_, checked]) => checked).map(([k]) => k);
    if (selected.includes('e')) return 'e) All of these';
    return selected.map(key => {
      const opt = (question.options || []).find((o: any) => o.value === key);
      return `${key}) ${opt ? opt.text : ''}`;
    }).join(', ');
  } else if (question.type === 'true-false') {
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
    return question.sentences.map((s: any) => `${s.id}: ${s.correctAnswer}`).join(', ');
  } else if (question.type === 'select-all') {
    return 'e) All of these (OR select a, b, c, d individually)';
  } else if (question.type === 'true-false') {
    return question.correctAnswer === 'true' ? 'True' : 'False';
  } else {
    const opt = (question.options || []).find((o: any) => o.value === question.correctAnswer);
    return opt ? opt.text : 'Unknown';
  }
};

const getQuestionTip = (index: number): string => {
  const question = questions.value[index] as any;
  const userAnswer = quizAnswers.value[index];
  if (question.type === 'multi-true-false') {
    return 'For multi-part true/false questions, consider each statement individually. Think about the specific needs and challenges that learners with hearing needs face in educational settings.';
  } else if (question.type === 'fill-in-blank') {
    return 'For fill-in-the-blank questions, think about what makes content accessible and supportive for learners with hearing needs. Consider both environmental factors and learning strategies.';
  } else if (question.type === 'true-false') {
    if (userAnswer === 'true' && question.correctAnswer === 'false') {
      return 'This statement is false. Consider the complexity and individual nature of hearing needs - they vary greatly between individuals and contexts.';
    }
    return 'This statement is true. Hearing abilities and needs are diverse and individual-specific.';
  } else {
    const userOption = (question.options || []).find((o: any) => o.value === userAnswer);
    const correctOption = (question.options || []).find((o: any) => o.value === question.correctAnswer);
    if (userOption && correctOption) {
      if (index === 0) {
        if (userAnswer === 'b') {
          return "The term 'Deaf and dumb' is offensive and outdated. It incorrectly suggests that people with hearing loss cannot communicate or think clearly.";
        } else if (userAnswer === 'c') {
          return "The term 'Handicapped' is considered outdated and offensive. It focuses on limitations rather than abilities and individual identity.";
        }
      }
      return `You selected "${userOption.text}" but the correct answer is "${correctOption.text}". Consider the most inclusive and respectful language when discussing hearing needs.`;
    }
    return 'Review the question carefully and consider which answer best reflects inclusive, person-first language and respectful communication practices for hearing needs.';
  }
};

const getCorrectAnswerExplanation = (index: number): string => {
  const question = questions.value[index] as any;
  if (question.type === 'multi-true-false') {
    if (index === 1) {
      return 'I. True - Low lighting affects visual communication which is crucial for learners with hearing needs. II. True - Processing information requires additional cognitive effort. III. False - Dictation relies on hearing which can be challenging for learners with hearing needs.';
    }
    return 'For multi-part true/false questions, each statement must be evaluated based on the specific needs and challenges that learners with hearing needs face.';
  } else if (question.type === 'fill-in-blank') {
    if (index === 2) {
      return 'A. Subtitles provide visual access to audio content. B. Facing the teacher supports access to visual cues and speechreading. C. Regular breaks help reduce cognitive fatigue from processing information.';
    }
    return 'Fill-in-the-blank questions test understanding of accessibility features and support strategies for learners with hearing needs.';
  } else if (question.type === 'true-false') {
    if (index === 4) {
      return 'True because prioritising conceptual understanding allows learners to demonstrate knowledge without relying on specific language forms.';
    }
    if (question.correctAnswer === 'false') {
      return 'Hearing needs are highly individual and vary between home and school environments. What works in one context may not work in another.';
    }
    return 'This statement accurately reflects the reality of hearing abilities and the importance of recognizing individual differences.';
  } else {
    const correctOption = (question.options || []).find((o: any) => o.value === question.correctAnswer);
    if (correctOption) {
      if (index === 0) {
        return `"${correctOption.text}" is the correct answer because it uses respectful, inclusive language that focuses on the person first and avoids offensive or outdated terms. Terms like 'Deaf and dumb' and 'Handicapped' are considered offensive and perpetuate harmful stereotypes.`;
      }
      return `"${correctOption.text}" is the correct answer because it uses person-first language, respects individual preferences, and promotes inclusive practices for hearing needs.`;
    }
    return 'The correct answer reflects best practices in inclusive education and respectful language use for hearing needs.';
  }
};

const getLearningPoint = (index: number): string => {
  const question = questions.value[index] as any;
  if (question.type === 'multi-true-false') {
    if (index === 1) {
      return 'Understanding the specific environmental and cognitive needs of learners with hearing needs helps create more inclusive and supportive learning environments.';
    }
    return 'Multi-part questions help assess understanding of different aspects of supporting learners with hearing needs.';
  } else if (question.type === 'fill-in-blank') {
    if (index === 2) {
      return 'Accessibility features like captions and structured breaks are essential tools for supporting learners with hearing needs.';
    }
    return 'Selecting appropriate accessibility supports demonstrates understanding of learners’ needs.';
  } else if (question.type === 'true-false') {
    return 'Recognizing the diversity of hearing needs is crucial for inclusive teaching.';
  }
  return 'Using respectful, person-first language supports inclusive practice for hearing needs.';
};
</script>

<style scoped>
ion-card { margin: 16px; }
.reflection-section { margin-top: 12px; }
.reflection-textarea { margin-top: 8px; }
.reflection-progress { margin-top: 12px; display: flex; align-items: center; gap: 8px; }
.reflection-actions { margin-top: 12px; display: flex; flex-direction: column; gap: 8px; }
/* Quiz Results Styles */
.quiz-results-details { margin-top: 12px; }
.question-result-item { margin-top: 12px; }
.question-divider { height: 1px; background: var(--ion-color-medium); opacity: 0.2; margin: 12px 0; }
.explanation-divider { height: 1px; background-color: var(--ion-color-light-shade); margin: 16px 0; opacity: 0.6; }
.question-status-icon { margin-right: 8px; vertical-align: middle; font-size: 1.8rem; display: inline-flex; align-items: center; justify-content: center; }
.question-heading { font-size: 1.5rem; font-weight: 800; color: var(--ion-color-dark); display: flex; align-items: center; gap: 12px; margin-bottom: 12px; line-height: 1.2; }
.learning-tip-header { --background: #e3f2fd; border: 1px solid #2196f3; border-radius: 8px; }
.learning-tip-container { margin-top: 4px; margin-left: 0; margin-bottom: 0; width: 100%; background-color: #e3f2fd; border-radius: 8px; padding: 4px; border: 1px solid #2196f3; }
.tip-content { background: var(--ion-color-light); border-radius: 8px; padding: 12px; margin: 4px 0; }
.tip-content h6 { color: var(--ion-color-warning); margin-bottom: 6px; font-weight: 600; }
.correct-answer-explanation { margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--ion-color-light-shade); }
.correct-answer-explanation h6 { color: var(--ion-color-success); margin-bottom: 6px; font-weight: 600; }
.learning-tip-header { --background: var(--ion-color-light); }
.case-study-images { display: grid; grid-template-columns: 1fr; gap: 12px; margin-bottom: 12px; }
.case-study-image { width: 100%; height: auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
@media (min-width: 768px) {
  .case-study-images { grid-template-columns: repeat(3, 1fr); }
}
.case-study-text ul { margin: 8px 0 12px 20px; }
.case-study-text .case-study-subheading { margin-top: 12px; margin-bottom: 8px; font-weight: 700; }
.case-study-prompts { margin-top: 12px; margin-left: 20px; }
.case-study-prompts li { margin-bottom: 6px; }
</style> 