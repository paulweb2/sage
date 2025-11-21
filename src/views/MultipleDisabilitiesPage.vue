<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Multiple disabilities</ion-title>
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
          <ion-title size="large">Multiple disabilities</ion-title>
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
              <ion-accordion value="md-lang-use">
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

              <ion-accordion value="md-lang-avoid">
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
                <p>Using the learner’s preferred way of communicating, questions and prompts help to find out about a learner’s <strong>strengths</strong>:</p>
                <ion-list v-if="understanding.strengths.length">
                  <ion-item v-for="(item, i) in understanding.strengths" :key="`str-` + i">
                    <ion-icon :icon="star" slot="start" color="warning"></ion-icon>
                    <ion-label>
                      <h4>{{ item.question }}</h4>
                      <ul v-if="item.prompts && item.prompts.length" style="margin: 6px 0 0 6px; padding-left: 12px;">
                        <li v-for="(p, pi) in item.prompts" :key="`strp-` + i + '-' + pi">{{ p }}</li>
                      </ul>
                    </ion-label>
                  </ion-item>
                </ion-list>
                <ion-note v-else color="medium">Content coming soon.</ion-note>
              </div>
              <div v-else-if="selectedUnderstanding === 'challenges'">
                <p>Using the learner’s preferred method of communication, questions and prompts help find out about <strong>challenges</strong> a learner may encounter:</p>
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
                <p>Using the learner’s preferred method of communication, questions and prompts help to understand strategies that can <strong>support</strong> the learner:</p>
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
                <p>Sentence starters to support learners to <strong>share</strong> their needs (supported by visual/auditory/sensory representations of the words/phrases):</p>
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
              <ion-accordion value="md-enable-physical">
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

              <ion-accordion value="md-enable-social">
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

              <ion-accordion value="md-enable-tasks">
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

              <ion-accordion value="md-enable-assessment">
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
              <!-- Previously: src="/MVI_7696_blur_even_lower_quality.mp4" -->
              <MediaPlayer
                ref="multipleDisabilitiesPlayer"
                type="video"
                title="Traditional dance lesson"
                subtitle="Learners responding to live music in the classroom"
                src="https://storage.googleapis.com/pwebtech.appspot.com/media/MVI_7696_blur_even_lower_quality.mp4"
                :duration="120"
              >
              </MediaPlayer>
            </div>
            <div class="case-study-text">
              <p>
                This primary school provides a supportive and inclusive environment where learners with
                different educational needs, including those with cognitive and multiple impairments, learn
                together with mainstream peers. Instructions are given in learners’ native language (Shona)
                for cultural relevance and easier understanding.
              </p>

              <p>
                In the first part of the lesson learners were asked to choose a video which showed
                traditional dance. The learners then watched the video to notice how the dancers moved to
                the music. In the video you will see the children applying this learning in response to the
                live music in their classroom.
              </p>

              <h4 class="case-study-subheading">Questions</h4>
              <ul>
                <li>What was the role of the educator?</li>
                <li>How does the lesson use the learner’s culture to promote participation and enjoyment?</li>
                <li>How could the learners’ enjoyment of music and dance be used in other curriculum areas?</li>
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
                <li>How did the educator encourage learner autonomy?</li>
                <li>How do culturally familiar activities support participation and enjoyment?</li>
                <li>How could music be used to support counting?</li>
                <li>How could music and dance be used to support storytelling?</li>
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
                1) Consider how different sensory needs can be met/explored in one task, for example, in reading a story.
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
                2) Could you design objects, sounds, different textures to explore through the story?
                <br /><br />
                3) Set aside a small amount time every day for a week to observe a learner with multiple learning difficulties and note all of the subtle ways they communicate/interact with their environment.
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
                <ion-accordion value="md-reflection-think">
                  <ion-item slot="header" color="light">
                    <ion-icon :icon="bulb" slot="start" color="warning"></ion-icon>
                    <ion-label>Think about...</ion-label>
                  </ion-item>
                  <div class="ion-padding" slot="content">
                    <ion-list>
                      <ion-item>
                        <ion-icon :icon="arrowForward" slot="start" color="secondary"></ion-icon>
                        <ion-label>Have you observed light muscle twitches, tilting of their head, gazing at particular objects/colours/people?</ion-label>
                      </ion-item>
                      <ion-item>
                        <ion-icon :icon="arrowForward" slot="start" color="secondary"></ion-icon>
                        <ion-label>Have you considered the time it takes for them to process a stimulus and respond to it in their communication mode?</ion-label>
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
                        <strong>Instructions:</strong> Decide if each statement is True or False using the dropdown menus.
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

                  <!-- Fill in the blank -->
                  <div v-else-if="currentQuestion.type === 'fill-in-blank'">
                    <div class="fill-in-blank-instructions">
                      <ion-note color="primary">
                        <strong>Word bank:</strong> Select the correct option from the dropdown to complete each sentence.
                      </ion-note>
                    </div>
                    <ion-list>
                      <ion-item v-for="(sentence, sentenceIndex) in currentQuestion.sentences" :key="sentence.id" class="fill-in-blank-item">
                        <ion-label>
                          <h4>
                            <strong>{{ String.fromCharCode(97 + sentenceIndex) }})&nbsp;</strong>
                            <span class="fill-in-blank-text">{{ sentence.textBefore }}</span>
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
                            <span class="fill-in-blank-text">{{ sentence.textAfter }}</span>
                          </h4>
                        </ion-label>
                      </ion-item>
                    </ion-list>
                  </div>

                  <!-- Select all that apply -->
                  <div v-else-if="currentQuestion.type === 'select-all'">
                    <div class="select-all-instructions">
                      <ion-note color="primary">
                        <strong>Instructions:</strong> Choose every option that directly matches the prompt. Selecting only “All of the above” is correct only when stated in the answers.
                      </ion-note>
                    </div>
                    <ion-list>
                      <ion-item v-for="option in currentQuestion.options" :key="option.value" class="select-all-item">
                        <input type="checkbox" :value="option.value" v-model="checkboxAnswers[option.value]" />
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
import MediaPlayer from '../components/MediaPlayer.vue';
import { ProgressService } from '@/services/ProgressService';
import { toastController } from '@ionic/vue';
import { consumePendingAnchor } from '@/utils/anchorScroll';

const route = useRoute();
const selectedUnderstanding = ref('strengths');
const selectedResourceType = ref('electronic');

const multipleDisabilitiesPlayer = ref<any>(null);

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
  'Person-first language, for example person with cerebral palsy or person who has cerebral palsy.'
];
const languageAvoidLines: string[] = [
  '‘Confined to a wheelchair’ suggests limited quality of life',
  '‘Wheelchair-bound’ also suggests limited quality of life',
  '‘Suffering with epilepsy’ suggests distress or hardship',
  'Medicalised terms such as ‘patient’ or ‘service-user’',
  'Do not use ‘sit down/stand up’ as these terms are not applicable for learners in wheelchairs.'
];

const understanding = {
  strengths: [
    { question: 'What are you interested in?', prompts: [] },
    {
      question: 'Prompts:',
      prompts: ['outside of school', 'in school']
    },
    { question: 'How do you prefer to communicate?', prompts: [] },
    { question: 'Work with parents and carers to find out about the learner’s likes and dislikes, preferred means of communication, and crucial medical information.', prompts: [] }
  ] as { question: string; prompts: string[] }[],
  challenges: [
    { question: 'What makes learning challenging for you?', prompts: [] },
    {
      question: 'Prompts:',
      prompts: [
        'Is it the set-up of the environment – position in the classroom, location of resources, sound, light, smells?',
        'Is it an overstimulating environment – noise, smells, sounds, tastes, colours>',
        'Teaching pace – is it too fast, too slow?',
        'Are there changes you don’t understand?',
        'Are there social situations such as …?'
      ]
    }
  ] as { question: string; prompts: string[] }[],
  strategies: [
    { question: 'Tell me about how you prefer to communicate.', prompts: [] },
    { question: 'Tell me about good times of the day for you to learn.', prompts: [] },
    { question: 'Work with parents to find out about effective strategies used at home and at school to support their participation in learning,', prompts: [] }
  ] as { question: string; prompts: string[] }[],
  advocacy: [
    'I like it when …',
    'Stop, I don’t like …',
    'More … please',
    'No more … please'
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
    localStorage.setItem(`sage-cs-multiple-disabilities-current`, JSON.stringify({ text: caseStudyNote.value }));
    ProgressService.saveCaseStudyCompletion('multiple-disabilities');
  } catch {}
};
const saveCaseStudyNote = () => {
  try {
    localStorage.setItem(`sage-cs-multiple-disabilities-current`, JSON.stringify({ text: caseStudyNote.value }));
  } finally {
    ProgressService.saveCaseStudyCompletion('multiple-disabilities');
    toastController.create({ message: 'Case study note saved!', duration: 2000, position: 'bottom', color: 'success' }).then(t => t.present());
  }
};

const exportCaseStudyNote = () => {
  const content = `Case Study Note - Multiple Disabilities\n\n${caseStudyNote.value || 'No notes written yet.'}`;
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = window.document.createElement('a');
  a.href = url;
  a.download = 'case-study-multiple-disabilities.txt';
  window.document.body.appendChild(a);
  a.click();
  window.document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toastController.create({ message: 'Case study note exported successfully!', duration: 2000, position: 'bottom', color: 'success' }).then(t => t.present());
};

const clearCaseStudyNote = () => {
  if (confirm('Are you sure you want to clear your case study note? This action cannot be undone.')) {
    caseStudyNote.value = '';
    localStorage.setItem(`sage-cs-multiple-disabilities-current`, JSON.stringify({ text: '' }));
    ProgressService.saveCaseStudyCompletion('multiple-disabilities');
    toastController.create({ message: 'Case study note cleared.', duration: 2000, position: 'bottom', color: 'warning' }).then(t => t.present());
  }
};

const challenges = {
  physical: [
    'Learners with multiple disabilities may have a number of physical challenges including sight, hearing and mobility, tactile preferences, coordination of speech and language, and speed of doing things.',
    'Crowded rooms or narrow passages may mean there is limited space to move a wheelchair and position other adjustable pieces of furniture.',
    'Lighting at different times of the day and different surroundings may interrupt clear vision.',
    'Temperature, smells, sensory needs such as texture of the food, clothing, learning materials, unexpected or invisible sounds, and any other external considerations (e.g., flying insects, classroom displays, sounds coming from other learners and rooms/buildings) may all impact on a learner with multiple needs.',
    'Moving from one activity/space to another may be difficult.',
    'Reaching and using equipment and resources if fine motor or gross motor skills are needed.',
    'The learner cannot easily see the teacher or the teaching materials due to their positioning, distance from the learner, print used in the material and light intensity of the environment.',
    'The learner cannot hear the teacher due to sound intensity, distance from the sound source and the quality of the sound.',
    'Time and access to personal and institutional/community care may be required.'
  ] as string[],
  social: [
    'Learners with multiple disabilities may experience visual, sensory, hearing, physical, mental, emotional and social difficulties in interactions with peers and educators.',
    'Learners may need specialised communication tools which require expert support from another educator, for example, sign language or Braille.',
    'Not feeling part of the school and class community may result in feeling discriminated against, isolated or neglected.',
    'Not feeling part of the decision-making process in social situations with peers and educators.'
  ] as string[],
  tasks: [
    'Traditional resources and ways of learning may be inaccessible due to physical, emotional, social, sensory or cognitive barriers.',
    'Unpredictable classroom routines limit understanding of expectations.',
    'Medical needs may cause pain or discomfort during the school day and may affect learners’ levels of energy or concentration on tasks.'
  ] as string[],
  assessment: [
    'If educators have not developed ways of communication that are suitable for the learners, assessment of their abilities will not be possible.',
    'Assessments may have been designed to identify big changes in learning rather than small progress steps.'
  ] as string[]
};

const enabling = {
  physical: [
    'Ensure passages between spaces/rooms/inside and outside are sufficient to accommodate wider frames of wheelchairs or walking frames to enable the learner’s smooth transitions.',
    'Position teacher and resources required for the tasks in accessible space, so they are visible and audible to the learner to enable full participation.',
    'Where appropriate, hand over resources or place under the hand of the learner to explore the materials.',
    'Label objects and furniture for additional visual support.'
  ] as string[],
  social: [
    'Ensure the learner has access to their preferred communication tools and that all staff members know how to use them.',
    'Model the use of the communication tools to other learners in the class so they can begin interacting with the learner, provided they have the ability to copy.',
    'Enable smaller group or 1:1 interaction that would support learners to respond in their unique, often subtle and non-verbal ways of communication.',
    'Be mindful of being at the learner’s line of vision in social situations.',
    'Allow sufficient time for processing of ideas and a response, which may be a muscle twitch or a verbal sound.',
    'Speak in short, clear sentences or one-word phrases, preferably with one person speaking at a time; touch to indicate interaction before using spoken words, whilst waiting for the response patiently.',
    'Development of trust and positive interactions are crucial to build strong relationships with learners. Know sounds of distress.',
    'Use light/sound/tapping the table to explore ways to focus attention.',
    'Recognition and praise of the learner’s contributions to the class community form an essential part of socialisation.',
    'Ensure the learner’s favourite characters/colours/objects form a part of the classroom environment to foster familiarity and a sense of belonging for the learner.',
    'Collaborate with parents/carers and wider community members who know the learner to discover tools and strategies required to support their participation in social situations.'
  ] as string[],
  tasks: [
    'Adapt resources and tasks to support the learner’s communication skills, and level of understanding/time required to process the information.',
    'Adapt learning objectives to reflect relevant, timely and achievable targets.',
    'Try different communication tools to find preferred means of communication.',
    'Visual aids such as writing with symbols, or pictures of objects of reference can support writing activities.',
    'Create a sensory environment to enhance the experience and understanding of learners. For example, bubbles, fans, water sprays can provide experiences where words may not be understood.',
    'Build in time for medical needs to be attended to.',
    'Allow rest breaks.',
    'Predictability and consistency aid the learner’s understanding of expectations/routines within the classroom.',
    'Parents/carers could become a sounding board for trying out different ways of completing tasks.'
  ] as string[],
  assessment: [
    'Observations in different environments, at different times of the day will enable an understanding of a learner’s abilities and preferences.',
    'Parents and carers can support an understanding of learners’ observed behaviours.',
    'Assessment should explore very small steps in learning. For example, do the learners notice stimuli? Do they respond to a stimulus (pause, reject)? Do they communicate a preference of two, for instance, if you held up a rabbit and a cat – does the learner consistently look at a cat?'
  ] as string[]
};

const resources = {
  electronic: [] as any[],
  paper: [] as Array<{ title: string; description?: string; availability?: string }>,
  organizations: [] as Array<{ name: string; description?: string; contact?: string }>
};
const electronicLines: string[] = [
  'Eye-gaze technology or switch-enabled technology that supports communication for some learners.',
  'PECS (Picture Exchange Communication System) to support communication.',
  'Augmentative and Alternative Communication (AAC) tools such as touch screen activities and text-to-speech technologies.',
  'Interactive boards to enhance teaching and learning (e.g., playing music, sharing images, showing videos).'
];
const organizationsLines: string[] = [
  'https://www.mencap.org.uk/sites/default/files/2016-06/NHS%20EM%20-%20PMLD.pdf – Top tips for supporting and meeting the needs of people with PMLD.',
  'https://www.mencap.org.uk/blog/how-communicate-me-amy-clarke – Person-centred communication and belonging to a local community.',
  'https://www.thesensoryprojects.co.uk/sensory-stories – Examples of sensory stories activities.',
  'https://apps.apple.com/gb/app/proloquo2go-aac/id308368164 – Proloquo2Go AAC app for people who cannot speak or need help being understood.',
  'https://www.nacwellbeing.org/about/ – Well-being and mental health support for children and families with PMLD experiences.',
  'https://hwb.gov.wales/curriculum-for-wales/routes-for-learning – Routes for Learning (Hwb) – Welsh curriculum materials for pupils with PMLD.',
  'https://www.pmldlink.org.uk/wp-content/uploads/2021/10/Quest-for-learning-Guidance-amp-Assessment-Materials-Profound-amp-Multiple-Learning-Difficulties.pdf – Quest for Learning: Guidance & Assessment Materials (PMLD).'
];

// Populate concrete resources (paper/concrete)
resources.paper = [
  {
    title: 'Concrete resources for painting, mark-making, and exploration of textures',
    description: 'Hands-on materials to develop sensory exploration and fine motor engagement.'
  },
  {
    title: 'Sensory stories for shared reading',
    description: 'Stories enhanced through different senses to support comprehension and engagement.'
  },
  {
    title: 'Puppetry during teaching and learning',
    description: 'Use of puppets to model interaction, capture attention, and support communication.'
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
      localStorage.setItem('multiple-disabilities-reflection', JSON.stringify(reflection.value));
      ProgressService.saveReflectionCompletion('multiple-disabilities');
    } catch {}
  }, 500);
};

const saveReflection = () => {
  try {
    localStorage.setItem(`sage-reflection-multiple-disabilities-current`, JSON.stringify(reflection.value));
    ProgressService.saveReflectionCompletion('multiple-disabilities');
  } finally {
    toastController.create({ message: 'Reflection saved successfully!', duration: 2000, position: 'bottom', color: 'success' }).then(t => t.present());
  }
};

const exportReflection = () => {
  const content = `Reflective task - Multiple Disabilities\n\n1) CASE STUDY REFLECTION:\n${reflection.value.caseStudyReflection || 'No reflection written yet.'}\n\n2) PRACTICE REFLECTION:\n${reflection.value.practiceReflection || 'No reflection written yet.'}`;
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = window.document.createElement('a');
  a.href = url;
  a.download = 'reflection-multiple-disabilities.txt';
  window.document.body.appendChild(a);
  a.click();
  window.document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toastController.create({ message: 'Reflection exported successfully!', duration: 2000, position: 'bottom', color: 'success' }).then(t => t.present());
};

const clearReflection = () => {
  if (confirm('Are you sure you want to clear all your reflections? This action cannot be undone.')) {
    reflection.value = { caseStudyReflection: '', practiceReflection: '' };
    localStorage.setItem(`sage-reflection-multiple-disabilities-current`, JSON.stringify(reflection.value));
    ProgressService.saveReflectionCompletion('multiple-disabilities');
    toastController.create({ message: 'Reflection cleared successfully!', duration: 2000, position: 'bottom', color: 'warning' }).then(t => t.present());
  }
};

// Quiz types and state
interface MCOption { value: string; text: string }
interface MultiTFSubQ { id: string; text: string; correctAnswer: 'true' | 'false'; explanation?: string }
interface FillSentence { id: string; textBefore: string; textAfter?: string; correctAnswer: string; options: string[] }

type MultipleDisabilitiesQuestion =
  | { type?: 'multiple-choice'; question: string; options: MCOption[]; correctAnswer: string }
  | { type: 'true-false'; question: string; options: MCOption[]; correctAnswer: string }
  | { type: 'multi-true-false'; question: string; subQuestions: MultiTFSubQ[] }
  | { type: 'fill-in-blank'; question: string; sentences: FillSentence[] }
  | { type: 'select-all'; question: string; options: MCOption[]; correctAnswers: string[]; alternativeCorrectAnswers?: string[] };

const questions = ref<MultipleDisabilitiesQuestion[]>([
  {
    question: 'What physical barriers might learners with multiple disabilities experience in the classroom? Select all that apply.',
    type: 'select-all',
    options: [
      { value: 'a', text: 'Crowded rooms without space to move the wheelchair.' },
      { value: 'b', text: 'Light interrupting their line of vision.' },
      { value: 'c', text: 'Lack of ability to reach resources or equipment.' },
      { value: 'd', text: 'Not being able to communicate with peers.' }
    ],
    correctAnswers: ['a', 'b', 'c']
  },
  {
    question: 'How can an educator enable socialisation of a learner with multiple disabilities into their classroom? Select all that apply.',
    type: 'select-all',
    options: [
      { value: 'a', text: 'Ensure the learner has access to their preferred communication tools and all staff members know how to use them.' },
      { value: 'b', text: 'Let the learner sit in the corner and engage with their communication tool on their own.' },
      { value: 'c', text: 'Model the use of communication tools to other learners so they can interact with the learner with support.' },
      { value: 'd', text: 'Include the learner’s favourite characters/colours/objects in the classroom environment to aid familiarity.' }
    ],
    correctAnswers: ['a', 'c', 'd']
  },
  {
    question: 'Fill in the blanks by choosing from the word bank.',
    type: 'fill-in-blank',
    sentences: [
      {
        id: 'a',
        textBefore: '______ of learners in different environments, at different times of the day, will enable an understanding of learner’s abilities and preferences.',
        textAfter: '',
        correctAnswer: 'observation',
        options: ['touch', 'hear', 'observation', 'times']
      },
      {
        id: 'b',
        textBefore: 'Classroom adaptation may include consideration of changes in seating position to ensure the learner can see and _____ the educator.',
        textAfter: '',
        correctAnswer: 'hear',
        options: ['touch', 'hear', 'observation', 'times']
      },
      {
        id: 'c',
        textBefore: 'Lighting at different _____ of the day may interrupt clear vision.',
        textAfter: '',
        correctAnswer: 'times',
        options: ['touch', 'hear', 'observation', 'times']
      },
      {
        id: 'd',
        textBefore: 'Use light, sound or _____ to focus attention.',
        textAfter: '',
        correctAnswer: 'touch',
        options: ['touch', 'hear', 'observation', 'times']
      }
    ]
  },
  {
    question: 'Which statements describe the benefits of engaging in partnerships with parents/carers and the wider community of learners with multiple disabilities?',
    type: 'select-all',
    options: [
      { value: 'a', text: 'Parents/carers have known their children the longest and can provide essential information about preferences, communication, and medical needs.' },
      { value: 'b', text: 'Wider community members always act in the best interest of the learners.' },
      { value: 'c', text: 'Parents/carers could become a sounding board for trying out different pedagogical approaches.' },
      { value: 'd', text: 'Parents/carers experience their child in all possible circumstances; therefore, they know everything about their child.' }
    ],
    correctAnswers: ['a', 'c']
  },
  {
    question: 'True or false? Evaluate each statement about supporting learners with multiple disabilities.',
    type: 'multi-true-false',
    subQuestions: [
      {
        id: 'a',
        text: 'Printing out questions in bigger size fonts always enables learners to complete the task.',
        correctAnswer: 'false',
        explanation: 'False – larger fonts only help if print access is the barrier; comprehension and communication also matter.'
      },
      {
        id: 'b',
        text: 'Visual aids such as symbols or objects of reference can support writing activities.',
        correctAnswer: 'true',
        explanation: 'True – additional visual cues help learners connect meaning to tasks.'
      },
      {
        id: 'c',
        text: 'Sensory inputs can enhance the learners’ understanding of tasks and experiences.',
        correctAnswer: 'true',
        explanation: 'True – multi-sensory cues offer alternative pathways for engagement.'
      },
      {
        id: 'd',
        text: 'Asking a teaching assistant to complete the task for the learner counts as adequate support.',
        correctAnswer: 'false',
        explanation: 'False – it removes the learner from the experience and limits their participation.'
      }
    ]
  }
]);

const currentQuizIndex = ref(0);
const currentAnswer = ref('');
const matchingAnswers = ref<{ [key: string]: string }>({});
const checkboxAnswers = ref<{ [key: string]: boolean }>({});
const quizCompleted = ref(false);
const quizScore = ref(0);
const quizAnswers = ref<{ [key: number]: any }>({});

const currentQuestion = computed(() => questions.value[currentQuizIndex.value]);

const canProceed = computed(() => {
  const q = currentQuestion.value as any;
  if (!q) return false;
  if (!q.type || q.type === 'multiple-choice' || q.type === 'true-false') return !!currentAnswer.value;
  if (q.type === 'multi-true-false') return q.subQuestions.every((sq: any) => matchingAnswers.value[sq.id] === 'true' || matchingAnswers.value[sq.id] === 'false');
  if (q.type === 'fill-in-blank') return q.sentences.every((s: any) => !!matchingAnswers.value[s.id]);
  if (q.type === 'select-all') return Object.values(checkboxAnswers.value).some(value => !!value);
  return false;
});

function setsEqual(a: string[], b: string[]) {
  if (a.length !== b.length) return false;
  const setA = new Set(a);
  return b.every(item => setA.has(item));
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
    const response = { ...matchingAnswers.value };
    quizAnswers.value[currentQuizIndex.value] = response;
    const allCorrect = q.subQuestions.every((sq: any) => response[sq.id] === sq.correctAnswer);
    if (allCorrect) {
      quizScore.value += increment;
    }
  } else if (q.type === 'fill-in-blank') {
    const response = { ...matchingAnswers.value };
    quizAnswers.value[currentQuizIndex.value] = response;
    const allCorrect = q.sentences.every((s: any) => response[s.id] === s.correctAnswer);
    if (allCorrect) {
      quizScore.value += increment;
    }
  } else if (q.type === 'select-all') {
    const selectedMap: { [key: string]: boolean } = {};
    Object.entries(checkboxAnswers.value).forEach(([key, value]) => {
      if (value) selectedMap[key] = true;
    });
    quizAnswers.value[currentQuizIndex.value] = selectedMap;
    const selected = Object.keys(selectedMap).sort();
    const correct = (q.correctAnswers || []).slice().sort();
    const alt = (q.alternativeCorrectAnswers || []).slice().sort();
    const isExact = selected.length > 0 && setsEqual(selected, correct);
    const isAlt = alt.length > 0 && setsEqual(selected, alt);
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
      localStorage.setItem(`sage-quiz-multiple-disabilities`, JSON.stringify({ completed: true, score: quizScore.value, answers: quizAnswers.value, lastCompleted: new Date().toISOString() }));
    } finally {
      ProgressService.saveQuizCompletion('multiple-disabilities', quizScore.value, quizAnswers.value);
    }
  }
};

const retakeQuiz = () => {
  currentQuizIndex.value = 0;
  currentAnswer.value = '';
  matchingAnswers.value = {};
  checkboxAnswers.value = {};
  quizCompleted.value = false;
  quizScore.value = 0;
  quizAnswers.value = {};
  ProgressService.resetQuizCompletion('multiple-disabilities');
  localStorage.removeItem(`sage-quiz-multiple-disabilities`);
};

const getQuizScoreColor = (): 'success' | 'warning' | 'danger' => {
  if (quizScore.value >= 80) return 'success';
  if (quizScore.value >= 50) return 'warning';
  return 'danger';
};

const getQuizScoreMessage = (): string => {
  if (quizScore.value >= 80) return 'Great job! You understand how to reduce barriers for learners with multiple disabilities.';
  if (quizScore.value >= 50) return 'Good effort. Review the explanations to deepen your understanding.';
  return 'Keep going. The explanations below highlight strategies to support learners with multiple disabilities.';
};

const fallbackExplanationText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
const questionTips = [
  'Think about tangible changes to the environment that make movement, vision, or access harder.',
  'Socialisation grows when tools, peers, and environments actively invite participation.',
  'Use the sentence context and the situations described to choose the most appropriate word from the bank.',
  'Strong partnerships respect family knowledge while still observing how learners respond at school.',
  'Evaluate each statement against inclusive practice—does it increase access and participation?'
];
const correctAnswerExplanations = [
  'Crowded spaces, lighting, and unreachable equipment are physical barriers. Communication challenges are social, so option d does not fit this category.',
  'Providing preferred communication tools, modelling their use, and designing familiar environments welcome the learner socially. Sitting alone reduces interaction opportunities.',
  'Observation reveals patterns, hearing supports communication, times captures lighting needs, and touch-based cues help focus attention.',
  'Parents/carers contribute vital insights and can co-design approaches. Community members may not always prioritise the learner, and no one knows every context in advance.',
  'Bigger print is not a cure-all; visual aids and sensory inputs add context; completing work for a learner removes engagement.'
];
const learningPoints = [
  'Addressing physical barriers is a foundational step toward full participation.',
  'Intentional classroom design plus peer modelling builds authentic social belonging.',
  'Observation and thoughtful environmental adjustments uncover how and when learners learn best.',
  'Family partnerships enrich professional insight and keep support aligned across settings.',
  'True inclusion focuses on meaningful participation, not just task completion.'
];

const isQuestionCorrect = (index: number): boolean => {
  const question = questions.value[index] as any;
  const userAnswer = quizAnswers.value[index];
  if (question.type === 'multi-true-false') {
    const ua = userAnswer as { [key: string]: string } | undefined;
    if (!ua) return false;
    return question.subQuestions.every((subQ: any) => ua[subQ.id] === subQ.correctAnswer);
  }
  if (question.type === 'fill-in-blank') {
    const ua = userAnswer as { [key: string]: string } | undefined;
    if (!ua) return false;
    return question.sentences.every((s: any) => ua[s.id] === s.correctAnswer);
  }
  if (question.type === 'select-all') {
    const ua = userAnswer as { [key: string]: boolean } | undefined;
    if (!ua) return false;
    const selected = Object.entries(ua).filter(([, checked]) => checked).map(([key]) => key).sort();
    if (selected.length === 0) return false;
    const correct = (question.correctAnswers || []).slice().sort();
    if (setsEqual(selected, correct)) return true;
    if (question.alternativeCorrectAnswers?.length) {
      return setsEqual(selected, question.alternativeCorrectAnswers.slice().sort());
    }
    return false;
  }
  return userAnswer === question.correctAnswer;
};

const formatUserAnswer = (index: number): string => {
  const question = questions.value[index] as any;
  const userAnswer = quizAnswers.value[index];
  if (!userAnswer) return 'Not answered';
  if (question.type === 'multi-true-false') {
    const ua = userAnswer as { [key: string]: string };
    const entries = Object.entries(ua || {});
    if (entries.length === 0) return 'Not answered';
    return entries.map(([id, ans]) => `${id}: ${ans === 'true' ? 'True' : 'False'}`).join(', ');
  }
  if (question.type === 'fill-in-blank') {
    const ua = userAnswer as { [key: string]: string };
    const entries = Object.entries(ua || {});
    if (entries.length === 0) return 'Not answered';
    return entries.map(([id, ans]) => `${id}: ${ans}`).join(', ');
  }
  if (question.type === 'select-all') {
    const ua = userAnswer as { [key: string]: boolean };
    const selected = Object.entries(ua || {}).filter(([, checked]) => checked).map(([key]) => key);
    if (selected.length === 0) return 'Not answered';
    return selected.map(key => {
      const option = (question.options || []).find((opt: any) => opt.value === key);
      return option ? `${key}) ${option.text}` : key;
    }).join(', ');
  }
  if (question.type === 'true-false') {
    return userAnswer === 'true' ? 'True' : 'False';
  }
  const option = (question.options || []).find((opt: any) => opt.value === userAnswer);
  return option ? option.text : 'Not answered';
};

const formatCorrectAnswer = (index: number): string => {
  const question = questions.value[index] as any;
  if (question.type === 'multi-true-false') {
    return question.subQuestions.map((sq: any) => `${sq.id}: ${sq.correctAnswer === 'true' ? 'True' : 'False'}`).join(', ');
  }
  if (question.type === 'fill-in-blank') {
    return question.sentences.map((s: any) => `${s.id}: ${s.correctAnswer}`).join(', ');
  }
  if (question.type === 'select-all') {
    const correct = (question.correctAnswers || []).map((value: string) => {
      const option = (question.options || []).find((opt: any) => opt.value === value);
      return option ? `${value}) ${option.text}` : value;
    });
    if (question.alternativeCorrectAnswers?.length) {
      const alt = question.alternativeCorrectAnswers.map((value: string) => {
        const option = (question.options || []).find((opt: any) => opt.value === value);
        return option ? `${value}) ${option.text}` : value;
      });
      return `${correct.join(', ')} (or ${alt.join(', ')})`;
    }
    return correct.join(', ');
  }
  if (question.type === 'true-false') {
    return question.correctAnswer === 'true' ? 'True' : 'False';
  }
  const option = (question.options || []).find((opt: any) => opt.value === question.correctAnswer);
  return option ? option.text : 'Unknown';
};

const getQuestionTip = (index: number): string => questionTips[index] || fallbackExplanationText;
const getCorrectAnswerExplanation = (index: number): string => correctAnswerExplanations[index] || fallbackExplanationText;
const getLearningPoint = (index: number): string => learningPoints[index] || fallbackExplanationText;

onMounted(() => {
  console.log('[PageAnchor] MultipleDisabilities mounted', { path: route.path });
  try {
    const saved = localStorage.getItem('multiple-disabilities-reflection');
    if (saved) reflection.value = JSON.parse(saved);
  } catch {}

  try {
    const csSaved = localStorage.getItem('sage-cs-multiple-disabilities-current');
    if (csSaved) {
      const parsed = JSON.parse(csSaved);
      caseStudyNote.value = typeof parsed?.text === 'string' ? parsed.text : '';
    }
  } catch {}

  void consumePendingAnchor(route.path).then((didScroll) => {
    console.log('[PageAnchor] MultipleDisabilities consume result', { didScroll });
  });
});

onBeforeRouteLeave(() => {
  if (multipleDisabilitiesPlayer.value && typeof multipleDisabilitiesPlayer.value.pauseMedia === 'function') {
    multipleDisabilitiesPlayer.value.pauseMedia();
  }
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
.case-study-video { margin-bottom: 16px; }
.quiz-results-details { margin-top: 12px; }
.question-result-item { margin-top: 12px; }
.question-divider { height: 1px; background: var(--ion-color-medium); opacity: 0.2; margin: 12px 0; }
.explanation-divider { height: 1px; background-color: var(--ion-color-light-shade); margin: 16px 0; opacity: 0.6; }
.question-status-icon { margin-right: 8px; vertical-align: middle; font-size: 1.8rem; display: inline-flex; align-items: center; justify-content: center; }
.question-heading { font-size: 1.5rem; font-weight: 800; color: var(--ion-color-dark); display: flex; align-items: center; gap: 12px; margin-bottom: 12px; line-height: 1.2; }
.learning-tip-header { --background: var(--ion-color-light); }
.learning-tip-container { margin-top: 4px; width: 100%; background-color: #e3f2fd; border-radius: 8px; padding: 4px; border: 1px solid #2196f3; }
.multi-true-false-instructions,
.fill-in-blank-instructions,
.select-all-instructions { margin-bottom: 12px; }
.multi-true-false-item,
.fill-in-blank-item,
.select-all-item { align-items: flex-start; }
.multi-true-false-select,
.fill-in-blank-select { min-width: 140px; }
.fill-in-blank-text { margin: 0 4px; display: inline-block; }
.select-all-item input { margin-right: 10px; }
</style>


