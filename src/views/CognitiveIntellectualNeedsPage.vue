<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Cognitive and intellectual needs</ion-title>
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
          <ion-title size="large">Cognitive and intellectual needs</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <!-- Key Definitions Card -->
        <ion-card id="key-definitions">
          <ion-card-content>
            <p>
              <strong>Dyslexia</strong><br>
              A learning difficulty that primarily affects reading and writing, with wider impacts on learning and daily life due to the central role of literacy across subjects.
            </p>

            <p>
              <strong>Dyscalculia</strong><br>
              A condition that affects how learners learn and remember arithmetic facts and calculations such as addition, subtraction, multiplication and division.
            </p>

            <p>
              <strong>Dysgraphia</strong><br>
              A neurological condition that affects memory processing and fine motor skills, making writing difficult. Individuals may struggle to form letters clearly and convert spoken sounds (phonemes) into written symbols (graphemes).
            </p>

            <p>
              <strong>Dyspraxia</strong><br>
              A condition where an individual finds learning and completing everyday tasks challenging due to poor coordination of their motor skills. A learner with dyspraxia may have difficulties with coordination, movement, and motor planning, which can affect tasks such as handwriting, organisation, and everyday physical activities.
            </p>
          </ion-card-content>
        </ion-card>

        <!-- Language Section -->
        <ion-card id="language">
          <ion-card-header>
            <ion-card-title>Language</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-accordion-group>
              <ion-accordion value="cin-lang-use">
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

              <ion-accordion value="cin-lang-avoid">
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
                <p>Questions and prompts to help understand the <strong>strengths</strong> of the learner:</p>
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
                <p>Questions and prompts to help understand the <strong>challenges</strong> of the learner:</p>
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
                <p>Questions and prompts to help find <strong>strategies</strong> that can support the learner:</p>
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
                        <template v-for="(c, i) in challenges.tasks" :key="`task-` + i">
                          <ion-item v-if="typeof c === 'string'">
                            <ion-icon :icon="documentIcon" slot="start" color="primary"></ion-icon>
                            <ion-label>{{ c }}</ion-label>
                          </ion-item>
                          <template v-else>
                            <ion-item-divider color="light">
                              <ion-label><strong>{{ c.title }}</strong></ion-label>
                            </ion-item-divider>
                            <ion-item>
                              <ion-icon :icon="documentIcon" slot="start" color="primary"></ion-icon>
                              <ion-label>
                                <ul style="margin: 0; padding-left: 16px;">
                                  <li v-for="(p, pi) in c.items" :key="`taskp-` + i + '-' + pi">{{ p }}</li>
                                </ul>
                              </ion-label>
                            </ion-item>
                          </template>
                        </template>
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
              <ion-accordion value="cin-enable-physical">
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

              <ion-accordion value="cin-enable-social">
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

              <ion-accordion value="cin-enable-tasks">
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

              <ion-accordion value="cin-enable-assessment">
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
              <ion-segment-button value="paper" disabled>
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
            <div class="case-study-text">
              <p>
                Charles is a learner with cognitive needs aged 11. He was diagnosed at nine years by an
                educational psychologist.
              </p>

              <p>Charles and his teacher agree that his strengths are:</p>
              <ul>
                <li><strong>Verbal communication:</strong> he is good at storytelling.</li>
                <li><strong>Creativity:</strong> he is excellent at drawing and role-playing.</li>
                <li>
                  <strong>Social skills:</strong> he is supportive and kind to peers; he relates well with
                  other peers in class.
                </li>
              </ul>

              <p>Charles has difficulty with:</p>
              <ul>
                <li><strong>Reading fluency:</strong> he reads slowly and often reads wrong words.</li>
                <li><strong>Spelling:</strong> he displays errors, even with simple or common words.</li>
                <li>
                  <strong>Writing:</strong> he has challenges with structuring sentences, even short and
                  simple ones.
                </li>
                <li>
                  <strong>Memory:</strong> he has short-term memory issues that affect his ability to follow
                  multi-step instructions; he forgets easily what he has been taught.
                </li>
                <li><strong>Concentration:</strong> he has a short concentration span and can easily disengage.</li>
                <li>
                  <strong>Self-esteem:</strong> he feels frustrated, annoyed and ashamed when reading to the
                  educator or peers.
                </li>
              </ul>

              <p>The educator uses the following teaching approach:</p>
              <ul>
                <li>
                  Use of sound games, rhymes and phoneme isolation, for example, “What sound can you hear
                  from outside the class?”.
                </li>
                <li>Use of visual aids such as letter cards, phonetic alphabet, pictures.</li>
                <li>Letter–sound association, teaching one sound symbol at a time.</li>
                <li>Use of task analysis: breaking down words into sounds and sentences into words.</li>
                <li>Repeating letters, words or sentences until it becomes automatic.</li>
                <li>Praises all success as a way to positively reinforce achievement.</li>
                <li>Keeps tasks short: about 10–15 minutes per task.</li>
                <li>
                  Multisensory instruction: incorporates visual, auditory and kinaesthetic learning (pictures,
                  concrete objects).
                </li>
                <li>
                  Classroom accommodations: extra time on assignments; use of alternative formats for reading
                  (e.g., audiobooks); reduced copying from the board.
                </li>
                <li>
                  Individualised Education Plan (IEP): goals focused on decoding skills and reading short
                  comprehension.
                </li>
                <li>Emotional support: positive reinforcement and praise for effort.</li>
              </ul>

              <h4 class="case-study-subheading">Questions</h4>
              <ul>
                <li>
                  Charles likes role play, storytelling and drawing and works well with his peers. How can
                  these strengths be used to boost confidence and self-esteem?
                </li>
                <li>How could these strengths be used to develop Charles’ interest in reading?</li>
                <li>How could these strengths be used to develop Charles’ comprehension skills?</li>
                <li>
                  How could these strengths be used to offer Charles alternative methods of demonstrating his
                  learning that do not rely solely on reading and writing?
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
                  Have you thought about how role-play can support comprehension of a story or concept?
                </li>
                <li>
                  Have you thought about choosing texts which Charles may already be familiar with the story?
                </li>
                <li>
                  Have you thought about how drawings can be used to support the spoken word, for example,
                  cartoons or animations?
                </li>
                <li>
                  Have you thought about different roles learners can have in group or paired work so that
                  Charles can actively participate without scribing or reading?
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
            <!-- Question 1 -->
            <div class="reflection-section">
              <p class="reflection-prompt">
                1) Choose three different tasks that you ask learners to do on everyday basis. Break each task into small steps.
              </p>
              <ion-textarea
                v-model="reflection.caseStudyReflection"
                placeholder="Describe the three tasks and how you would break each one into small steps..."
                :rows="6"
                :auto-grow="true"
                :maxlength="2000"
                :counter="true"
                class="reflection-textarea"
                @ionInput="autoSaveReflection"
              ></ion-textarea>

              <!-- Question 1 Think Box -->
              <ion-accordion-group>
                <ion-accordion value="cin-reflect-q1">
                  <ion-item slot="header" color="light">
                    <ion-icon :icon="bulb" slot="start" color="warning"></ion-icon>
                    <ion-label>Think about...</ion-label>
                  </ion-item>
                  <div class="ion-padding" slot="content">
                    <ion-list>
                      <ion-item>
                        <ion-icon :icon="checkmark" slot="start" color="primary"></ion-icon>
                        <ion-label>Could you add a picture or an icon to illustrate each step?</ion-label>
                      </ion-item>
                      <ion-item>
                        <ion-icon :icon="checkmark" slot="start" color="primary"></ion-icon>
                        <ion-label>How could the learner be sure that they have completed each step, for example, by ticking a box or crossing out a step?</ion-label>
                      </ion-item>
                      <ion-item>
                        <ion-icon :icon="checkmark" slot="start" color="primary"></ion-icon>
                        <ion-label>How can you celebrate success with the learner?</ion-label>
                      </ion-item>
                    </ion-list>
                  </div>
                </ion-accordion>
              </ion-accordion-group>
            </div>

            <!-- Question 2 -->
            <div class="reflection-section">
              <p class="reflection-prompt">
                2) Consider two different mathematical calculations. Select one concrete resource and one visual image that could be used to aid each calculation.
              </p>
              <ion-textarea
                v-model="reflection.practiceReflection"
                placeholder="Describe the calculations you chose and the concrete resources and visual images that would support each one..."
                :rows="6"
                :auto-grow="true"
                :maxlength="2000"
                :counter="true"
                class="reflection-textarea"
                @ionInput="autoSaveReflection"
              ></ion-textarea>

              <!-- Question 2 Think Box -->
              <ion-accordion-group>
                <ion-accordion value="cin-reflect-q2">
                  <ion-item slot="header" color="light">
                    <ion-icon :icon="bulb" slot="start" color="warning"></ion-icon>
                    <ion-label>Think about...</ion-label>
                  </ion-item>
                  <div class="ion-padding" slot="content">
                    <ion-list>
                      <ion-item>
                        <ion-icon :icon="checkmark" slot="start" color="secondary"></ion-icon>
                        <ion-label>Could you add a picture or an icon to prompt the learner to use a resource or an image?</ion-label>
                      </ion-item>
                      <ion-item>
                        <ion-icon :icon="checkmark" slot="start" color="secondary"></ion-icon>
                        <ion-label>How could the learner be sure that they have answered correctly, for example, by checking the answer using a different method or resource or image?</ion-label>
                      </ion-item>
                      <ion-item>
                        <ion-icon :icon="checkmark" slot="start" color="secondary"></ion-icon>
                        <ion-label>How can you celebrate success with the learner?</ion-label>
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
                        <ion-select v-model="matchingAnswers[subQ.id]" interface="popover" placeholder="True or False" :value="matchingAnswers[subQ.id]" class="multi-true-false-select">
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
                        <strong>Instructions:</strong> {{ currentQuestion.instructions || 'Complete each sentence by selecting the most appropriate word or phrase from the dropdown menus.' }}
                      </ion-note>
                    </div>
                    <ion-list>
                      <ion-item v-for="(sentence, sentenceIndex) in currentQuestion.sentences" :key="sentence.id" class="fill-in-blank-item">
                        <ion-label>
                          <h4>
                            <strong>{{ String.fromCharCode(97 + sentenceIndex) }})&nbsp;</strong>
                            <span class="fill-in-blank-text">
                              <span>{{ sentence.textBefore }}</span>
                              <ion-select v-model="matchingAnswers[sentence.id]" interface="popover" placeholder="Select answer" :value="matchingAnswers[sentence.id]" class="fill-in-blank-select">
                                <ion-select-option value="">Select answer</ion-select-option>
                                <ion-select-option v-for="opt in sentence.options" :key="opt" :value="opt">{{ opt }}</ion-select-option>
                              </ion-select>
                              <span>{{ sentence.textAfter }}</span>
                            </span>
                          </h4>
                        </ion-label>
                      </ion-item>
                    </ion-list>
                  </div>

                  <!-- Select all that apply -->
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
  IonItemDivider,
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

const wordsToUse: { term: string; explanation: string }[] = [
  { term: 'Person Person-centred language', explanation: 'a learner who is dyslexic or has dyslexia' },
  { term: 'A leaner who experiences characteristics of dyslexia', explanation: 'who might need more time to process information/organise tasks.' }
];
const wordsToAvoid: { term: string; reason: string }[] = [
  { term: 'Any language that suggests the learner indication that the person ‘suffers’ as a result of the disability', reason: '' },
  { term: 'Slow learner', reason: '' },
  { term: 'Not good at writing/mathematics/organisational skills.', reason: '' }
];

const understanding = {
  strengths: [
    { question: 'What do you enjoy doing out of school?', prompts: [] },
    { question: 'What kinds of activities do you enjoy in school?', prompts: [] },
    { question: 'Which subjects do you enjoy in school?', prompts: [] },
    { question: 'Which ways of communicating are best for you?', prompts: [] },
    { question: 'How do you use mathematics/reading/writing in your hobbies or everyday life?', prompts: [] },
    { question: 'Prompts:', prompts: ['playing games', 'counting money', 'reading or writing information for your work.'] },
    { question: 'What resources support your learning in reading/writing/mathematics?', prompts: [] },
    { question: 'What kind of lessons do you find easiest to participate in?', prompts: [] }
  ] as { question: string; prompts: string[] }[],
  challenges: [
    { question: 'Can you give me an example of a challenge for you in your learning activities?', prompts: [] },
    { question: 'Can you give me an example of a challenge for you when working with your peers?', prompts: [] },
    { question: 'Can you give me an example of a challenge with your educators?', prompts: [] },
    { question: 'Can you give me an example of a challenge for you in the learning environment?', prompts: [] },
    { question: 'Prompts:', prompts: ['noise', 'distractions', 'the way that learning materials and resources are presented.'] }
  ] as { question: string; prompts: string[] }[],
  strategies: [
    { question: 'Can I break these instructions into smaller steps for you?', prompts: [] },
    { question: 'Can you complete one step at a time and check in with me?', prompts: [] },
    { question: 'Can I create some different resources that you find helpful?', prompts: [] },
    { question: 'Would you like to try another way to complete this task?', prompts: [] },
    { question: 'Are there any other tools you used in the past that could help you here?', prompts: [] },
    { question: 'Could you dictate your ideas, and I will write them/type them for you?', prompts: [] },
    { question: 'Would a different way of communicating be helpful here?', prompts: [] },
    {
      question: 'Prompts:',
      prompts: ['noise', 'spoken words', 'concrete resources', 'typing keyboard', 'flash cards with clearly numbered instructions.']
    }
  ] as { question: string; prompts: string[] }[],
  advocacy: [
    'It helps me when …',
    'When I’m worried about work, I sometimes …',
    'To help me understand the task, you could …',
    'I prefer to write/say/act out/draw/ … my answers/ideas.'
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
    localStorage.setItem(`sage-cs-cognitive-intellectual-needs-current`, JSON.stringify({ text: caseStudyNote.value }));
    ProgressService.saveCaseStudyCompletion('cognitive-intellectual-needs');
  } catch {}
};
const saveCaseStudyNote = () => {
  try {
    localStorage.setItem(`sage-cs-cognitive-intellectual-needs-current`, JSON.stringify({ text: caseStudyNote.value }));
  } finally {
    ProgressService.saveCaseStudyCompletion('cognitive-intellectual-needs');
    toastController.create({ message: 'Case study note saved!', duration: 2000, position: 'bottom', color: 'success' }).then(t => t.present());
  }
};

const exportCaseStudyNote = () => {
  const content = `Case Study Note - Cognitive and Intellectual Needs\n\n${caseStudyNote.value || 'No notes written yet.'}`;
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = window.document.createElement('a');
  a.href = url;
  a.download = 'case-study-cognitive-intellectual-needs.txt';
  window.document.body.appendChild(a);
  a.click();
  window.document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toastController.create({ message: 'Case study note exported successfully!', duration: 2000, position: 'bottom', color: 'success' }).then(t => t.present());
};

const clearCaseStudyNote = () => {
  if (confirm('Are you sure you want to clear your case study note? This action cannot be undone.')) {
    caseStudyNote.value = '';
    localStorage.setItem(`sage-cs-cognitive-intellectual-needs-current`, JSON.stringify({ text: '' }));
    ProgressService.saveCaseStudyCompletion('cognitive-intellectual-needs');
    toastController.create({ message: 'Case study note cleared.', duration: 2000, position: 'bottom', color: 'warning' }).then(t => t.present());
  }
};

const challenges = {
  physical: [
    'Noise, distractions or over-stimulation in the learning environment.',
    'Inaccessible resources, cluttered classroom organisation.',
    'Holding a pencil/pen/paintbrush.'
  ] as string[],
  social: [
    'Anxiety in social situations.',
    'Low self-esteem or belief in their ability to complete a task.',
    'Lack of a sense of belonging and participation in decision-making in peer groups.',
    'Difficulties in cognition may be translated into unsettled behaviour.'
  ] as string[],
  tasks: [
    {
      title: 'Dyslexia',
      items: [
        'Difficulty with phonological skills such as blending sounds and letters into words, verbal working memory and verbal information processing.',
        'Difficulties with the organisation and planning of text.',
        'Difficulties reading and writing may lead to avoidance of the writing/speaking/reading tasks.',
        'Reading long passages of text combined with an expectation to comprehend it.',
        'Following complex instructions.',
        'High contrast in written text (black on white).'
      ]
    },
    {
      title: 'Dyscalculia',
      items: [
        'Remembering and repeating calculation procedures, possibly leading to a high number of errors.',
        'Understanding and solving mathematical problems.',
        'High level of anxiety about mathematics.'
      ]
    },
    {
      title: 'Dyspraxia',
      items: [
        'Everyday skills and tasks requiring fine and gross motor skills may be very challenging, for example, using scissors, tying shoelaces or doing buttons up on a coat.',
        'For some learners, dyspraxia may affect speech.',
        'As tasks require greater effort, learners can experience fatigue or appear demotivated.',
        'Potential high levels of anxiety and/or depression.',
        'Learners might generally feel unsuccessful in tasks that they observe and perceive their peers as finding easy.'
      ]
    },
    {
      title: 'Dysgraphia',
      items: [
        'Fine motor skills required to control a pen/pencil, which may lead to: irregular letter size and shape; incomplete letters; odd writing grip; frequent spelling mistakes; occasional pain when writing; decreased or increased speed of writing and copying; talking to self while writing; general illegibility and reluctance or refusal to complete writing tasks',
        'Difficulty with mMemorisationing of words and processing the letters in those words',
        'Fine motor skills required to control a pen/pencil.'
      ]
    }
  ] as Array<string | { title: string; items: string[] }>,
  assessment: [
    'Difficulties in understanding written or verbal instruction, complex tasks or multiple elements of tasks.',
    'Difficulties with working memory, organisational skills, and legibility of own handwriting.',
    'High level of anxiety when faced with texts and examination.'
  ] as string[]
};

const enabling = {
  physical: [] as string[],
  social: [] as string[],
  tasks: [] as string[],
  assessment: [] as string[]
};

const resources = {
  electronic: [] as any[],
  paper: [] as Array<{ title: string; description?: string; availability?: string }>,
  organizations: [] as Array<{ name: string; description?: string; contact?: string }>
};
const electronicLines: string[] = [
  'Text-to-speech and speech-to-text software',
  'Tablets for typing rather than handwriting'
];
const organizationsLines: string[] = [
  'https://www.bdadyslexia.org.uk/dyslexia/about-dyslexia/what-is-dyslexia – British Dyslexia Association – a group supporting people with dyslexia and co-ordinating with organisation to promote inclusion of dyslexia-friendly approaches.',
  'https://www.madebydyslexia.org/workplace/?gad_source=1&gad_campaignid=21767874124&gclid=EAIaIQobChMIyvGp-6jOjgMVn4pQBh0yTxqrEAAYASAAEgJMkPD_BwE – a platform full of useful printable resources for people with dyslexia.',
  'https://dyscalculianetwork.com/ – a not-for-profit community interest company, with a range of resources for educationalists, workforce and communities.',
  'https://dyspraxiauk.com/dyspraxia-foundation – a platform providing assessment tools for dyspraxia, while also advising on extensive information about dyspraxia and some relevant resources/readings for educators, parents and employers.',
  'https://dyslexiaida.org/understanding-dysgraphia/ – International Dyslexia Association offering six months free membership to classroom teachers to access resources.'
];

// Quiz configuration
interface QuestionFeedback {
  tip: string;
  explanation: string;
  learningPoint: string;
}

interface MCOption { value: string; text: string }
interface MultiTFSubQ { id: string; text: string; correctAnswer: 'true' | 'false'; explanation?: string }
interface FillSentence { id: string; textBefore: string; textAfter?: string; correctAnswer: string; options: string[] }

interface BaseQuestion {
  question: string;
  instructions?: string;
  feedback?: QuestionFeedback;
}

type CognitiveQuestion =
  | (BaseQuestion & { type?: 'multiple-choice'; options: MCOption[]; correctAnswer: string })
  | (BaseQuestion & { type: 'true-false'; options: MCOption[]; correctAnswer: string })
  | (BaseQuestion & { type: 'multi-true-false'; subQuestions: MultiTFSubQ[]; instructions?: string })
  | (BaseQuestion & { type: 'fill-in-blank'; sentences: FillSentence[]; instructions?: string })
  | (BaseQuestion & { type: 'select-all'; options: MCOption[]; correctAnswers: string[]; alternativeCorrectAnswers?: string[] });

const defaultFeedback: QuestionFeedback = {
  tip: 'Revisit the relevant guidance in this section to refresh your understanding.',
  explanation: 'Review the learning content to see why this answer is correct.',
  learningPoint: 'Inclusive strategies should build confidence, reduce anxiety and support active participation.'
};

const wordBankOptions = ['anxiety', 'self-esteem', 'break down', 'fatigue'];
const matchNeeds = ['Dysgraphia', 'Dyscalculia', 'Dyspraxia', 'Dyslexia'];

const questions = ref<CognitiveQuestion[]>([
  {
    question: 'What are the characteristics of learners with cognitive needs exhibited in the classroom? Select all that apply.',
    type: 'select-all',
    options: [
      { value: 'a', text: 'Anxiety and low self-esteem' },
      { value: 'b', text: 'Inability to blend sounds and letters into words' },
      { value: 'c', text: 'Difficulty to use speech-to-text software to produce written work' },
      { value: 'd', text: 'Difficulty in using imagination to plan a story' }
    ],
    correctAnswers: ['a', 'b'],
    feedback: {
      tip: 'Look for traits commonly linked with dyslexia and related cognitive needs.',
      explanation: 'Anxiety, low self-esteem and phonological difficulties are common; with modelling, speech-to-text becomes easier and dyslexic learners often have strong imaginations.',
      learningPoint: 'Recognise strengths while addressing areas like phonological processing and confidence.'
    }
  },
  {
    question: 'How can you make assessments accessible for learners with dyspraxia? Select all that apply.',
    type: 'select-all',
    options: [
      { value: 'a', text: 'Provide them with questions for tests a day before' },
      { value: 'b', text: 'Break down tasks into smaller chunks' },
      { value: 'c', text: 'Allow more time for processing of information' },
      { value: 'd', text: 'Provide concrete resources to aid calculations' }
    ],
    correctAnswers: ['b', 'c', 'd'],
    feedback: {
      tip: 'Focus on strategies that scaffold organisation, timing and access to tools.',
      explanation: 'Chunked tasks, extra processing time and concrete supports aid dyspraxic learners; simply seeing questions in advance may not resolve writing/organisation barriers.',
      learningPoint: 'Effective support emphasises structure, pacing and multisensory resources.'
    }
  },
  {
    question: 'Match each description with the cognitive need.',
    type: 'fill-in-blank',
    instructions: 'Options: Dysgraphia, Dyscalculia, Dyspraxia, Dyslexia.',
    sentences: [
      {
        id: 'a',
        textBefore: '“I struggle to re-read my own writing.” → ',
        textAfter: '',
        correctAnswer: 'Dysgraphia',
        options: matchNeeds
      },
      {
        id: 'b',
        textBefore: '“I find remembering number facts difficult.” → ',
        textAfter: '',
        correctAnswer: 'Dyscalculia',
        options: matchNeeds
      },
      {
        id: 'c',
        textBefore: '“I find it difficult to complete everyday tasks.” → ',
        textAfter: '',
        correctAnswer: 'Dyspraxia',
        options: matchNeeds
      },
      {
        id: 'd',
        textBefore: '“I use a blue overlay on any printed text.” → ',
        textAfter: '',
        correctAnswer: 'Dyslexia',
        options: matchNeeds
      }
    ],
    feedback: {
      tip: 'Link each statement to the primary area of difficulty: writing, maths, coordination or reading.',
      explanation: 'The cues describe dysgraphia (writing), dyscalculia (number facts), dyspraxia (everyday tasks) and dyslexia (visual stress when reading).',
      learningPoint: 'Understanding specific profiles guides targeted support.'
    }
  },
  {
    question: 'Fill in the blanks by selecting from the list.',
    type: 'fill-in-blank',
    instructions: 'Options: anxiety, self-esteem, break down, fatigue.',
    sentences: [
      {
        id: 'a',
        textBefore: 'Learners with cognitive disabilities are prone to a high level of ',
        textAfter: ' associated with their learning difficulty.',
        correctAnswer: 'anxiety',
        options: wordBankOptions
      },
      {
        id: 'b',
        textBefore: 'One common emotional and well-being difficulty is low ',
        textAfter: '.',
        correctAnswer: 'self-esteem',
        options: wordBankOptions
      },
      {
        id: 'c',
        textBefore: 'Teachers can ',
        textAfter: ' complex tasks into more manageable chunks to support learners with dyspraxia.',
        correctAnswer: 'break down',
        options: wordBankOptions
      },
      {
        id: 'd',
        textBefore: 'As tasks require greater effort, learners with cognitive difficulties can experience ',
        textAfter: ' or appear demotivated.',
        correctAnswer: 'fatigue',
        options: wordBankOptions
      }
    ],
    feedback: {
      tip: 'Match each blank to the emotional or instructional need described.',
      explanation: 'Learners may feel anxiety, have low self-esteem, need tasks broken down and experience fatigue.',
      learningPoint: 'Address emotional load alongside instructional scaffolds.'
    }
  },
  {
    question: 'True or false? Consider each statement carefully.',
    type: 'multi-true-false',
    instructions: 'Mark each statement as True or False.',
    subQuestions: [
      {
        id: 'a',
        text: 'Learners with dyscalculia can only calculate with small numbers.',
        correctAnswer: 'false',
        explanation: 'With appropriate support, learners with dyscalculia can work confidently with larger numbers.'
      },
      {
        id: 'b',
        text: 'Learners with dyslexia can find verbal instructions difficult to understand.',
        correctAnswer: 'true',
        explanation: 'Processing lengthy verbal instructions can be challenging without visual supports.'
      },
      {
        id: 'c',
        text: 'Learners with dyspraxia can benefit from acting out their expressions instead of writing them down.',
        correctAnswer: 'true',
        explanation: 'Demonstrating or acting out ideas can reduce the motor demands of writing.'
      },
      {
        id: 'd',
        text: 'It is best to have all the support resources available all the time for learners with cognitive disabilities.',
        correctAnswer: 'false',
        explanation: 'Too many resources at once can overwhelm learners; targeted supports are more effective.'
      }
    ],
    feedback: {
      tip: 'Think about how overload, alternative expression and targeted scaffolds impact learning.',
      explanation: 'Statements b and c are true; a and d are false because learners can progress beyond basic calculations and need carefully selected supports.',
      learningPoint: 'Use strategic supports and varied expression to reduce cognitive load.'
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

const currentQuestion = computed(() => questions.value[currentQuizIndex.value]);

const canProceed = computed(() => {
  const q = currentQuestion.value as any;
  if (!q) return false;
  if (!q.type || q.type === 'multiple-choice' || q.type === 'true-false') return !!currentAnswer.value;
  if (q.type === 'multi-true-false') return q.subQuestions.every((sq: any) => matchingAnswers.value[sq.id] === 'true' || matchingAnswers.value[sq.id] === 'false');
  if (q.type === 'fill-in-blank') return q.sentences.every((s: any) => !!matchingAnswers.value[s.id]);
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
    const allCorrect = q.sentences.every((s: any) => matchingAnswers.value[s.id] === s.correctAnswer);
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
        `sage-quiz-cognitive-intellectual-needs`,
        JSON.stringify({ completed: true, score: quizScore.value, answers: quizAnswers.value, lastCompleted: new Date().toISOString() })
      );
    } finally {
      ProgressService.saveQuizCompletion('cognitive-intellectual-needs', quizScore.value, quizAnswers.value);
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
  ProgressService.resetQuizCompletion('cognitive-intellectual-needs');
  localStorage.removeItem(`sage-quiz-cognitive-intellectual-needs`);
};

const getQuizScoreColor = (): 'success' | 'warning' | 'danger' => {
  if (quizScore.value >= 80) return 'success';
  if (quizScore.value >= 50) return 'warning';
  return 'danger';
};

const getQuizScoreMessage = (): string => {
  if (quizScore.value >= 80) return 'Great job! You have a strong understanding of cognitive and intellectual needs.';
  if (quizScore.value >= 50) return 'Good effort. Review the explanations to strengthen your understanding.';
  return 'Keep going. The explanations below will help you learn more.';
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
    return question.sentences.every((s: any) => ua[s.id] === s.correctAnswer);
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
    if (!ua || Object.keys(ua).length === 0) return 'Not answered';
    return Object.entries(ua)
      .map(([id, ans]) => `${id}: ${ans}`)
      .join(', ');
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
    return question.sentences.map((s: any) => `${s.id}: ${s.correctAnswer}`).join(', ');
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
      localStorage.setItem('cognitive-intellectual-reflection', JSON.stringify(reflection.value));
      ProgressService.saveReflectionCompletion('cognitive-intellectual-needs');
    } catch {}
  }, 500);
};

const saveReflection = () => {
  try {
    localStorage.setItem(`sage-reflection-cognitive-intellectual-needs-current`, JSON.stringify(reflection.value));
    ProgressService.saveReflectionCompletion('cognitive-intellectual-needs');
  } finally {
    toastController.create({ message: 'Reflection saved successfully!', duration: 2000, position: 'bottom', color: 'success' }).then(t => t.present());
  }
};

const exportReflection = () => {
  const content = `Reflective task - Cognitive and Intellectual Needs\n\n1) CASE STUDY REFLECTION:\n${reflection.value.caseStudyReflection || 'No reflection written yet.'}\n\n2) PRACTICE REFLECTION:\n${reflection.value.practiceReflection || 'No reflection written yet.'}`;
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = window.document.createElement('a');
  a.href = url;
  a.download = 'reflection-cognitive-intellectual-needs.txt';
  window.document.body.appendChild(a);
  a.click();
  window.document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toastController.create({ message: 'Reflection exported successfully!', duration: 2000, position: 'bottom', color: 'success' }).then(t => t.present());
};

const clearReflection = () => {
  if (confirm('Are you sure you want to clear all your reflections? This action cannot be undone.')) {
    reflection.value = { caseStudyReflection: '', practiceReflection: '' };
    localStorage.setItem(`sage-reflection-cognitive-intellectual-needs-current`, JSON.stringify(reflection.value));
    ProgressService.saveReflectionCompletion('cognitive-intellectual-needs');
    toastController.create({ message: 'Reflection cleared successfully!', duration: 2000, position: 'bottom', color: 'warning' }).then(t => t.present());
  }
};

onMounted(() => {
  console.log('[PageAnchor] CognitiveIntellectualNeeds mounted', { path: route.path });
  try {
    const saved = localStorage.getItem('cognitive-intellectual-reflection');
    if (saved) reflection.value = JSON.parse(saved);
  } catch {}

  try {
    const csSaved = localStorage.getItem('sage-cs-cognitive-intellectual-needs-current');
    if (csSaved) {
      const parsed = JSON.parse(csSaved);
      caseStudyNote.value = typeof parsed?.text === 'string' ? parsed.text : '';
    }
  } catch {}

  void consumePendingAnchor(route.path).then((didScroll) => {
    console.log('[PageAnchor] CognitiveIntellectualNeeds consume result', { didScroll });
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
.quiz-results-details { margin-top: 12px; }
.question-result-item { margin-top: 12px; }
.question-divider { height: 1px; background: var(--ion-color-medium); opacity: 0.2; margin: 12px 0; }
.explanation-divider { height: 1px; background-color: var(--ion-color-light-shade); margin: 16px 0; opacity: 0.6; }
.question-status-icon { margin-right: 8px; vertical-align: middle; font-size: 1.8rem; display: inline-flex; align-items: center; justify-content: center; }
.question-heading { font-size: 1.5rem; font-weight: 800; color: var(--ion-color-dark); display: flex; align-items: center; gap: 12px; margin-bottom: 12px; line-height: 1.2; }
.learning-tip-header { --background: #e3f2fd; border: 1px solid #2196f3; border-radius: 8px; }
.learning-tip-container { margin-top: 4px; margin-left: 0; margin-bottom: 0; width: 100%; background-color: #e3f2fd; border-radius: 8px; padding: 4px; border: 1px solid #2196f3; }
.fill-in-blank-text { display: inline-flex; flex-wrap: wrap; gap: 8px; align-items: center; }
</style>


