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
        <div v-if="disabilityContent && disabilityContent.title">
          <!-- For communication page, only show the quiz -->
          <div v-if="route.params.id === 'communication'">
            <!-- Quiz -->
            <ion-card id="knowledge-check">
              <ion-card-header>
                <ion-card-title>Communication Quiz</ion-card-title>
                <ion-card-subtitle>Test Your Understanding of Communication Disabilities</ion-card-subtitle>
              </ion-card-header>
              <ion-card-content>
                <div v-if="!quizCompleted && quizQuestions.length > 0">
                  <ion-card>
                    <ion-card-header>
                      <ion-card-title>Question {{ currentQuizQuestion + 1 }} of {{ quizQuestions.length }}</ion-card-title>
                      <ion-progress-bar :value="(currentQuizQuestion + 1) / quizQuestions.length" color="primary"></ion-progress-bar>
                    </ion-card-header>
                    <ion-card-content>
                      <h4 v-if="quizQuestions[currentQuizQuestion]">{{ quizQuestions[currentQuizQuestion].question }}</h4>
                      
                      <!-- Multiple Choice Questions -->
                      <div v-if="quizQuestions[currentQuizQuestion] && (!quizQuestions[currentQuizQuestion].type || quizQuestions[currentQuizQuestion].type === 'multiple-choice')">
                        <ion-radio-group v-model="currentQuizAnswer">
                          <ion-item v-for="(option, index) in (quizQuestions[currentQuizQuestion].options || [])" :key="index">
                            <ion-radio :value="option.value" slot="start"></ion-radio>
                            <ion-label>{{ option.text }}</ion-label>
                          </ion-item>
                        </ion-radio-group>
                      </div>
                      
                      <!-- True/False Questions -->
                      <div v-else-if="quizQuestions[currentQuizQuestion] && quizQuestions[currentQuizQuestion].type === 'true-false'">
                        <ion-radio-group v-model="currentQuizAnswer">
                          <ion-item v-for="(option, index) in (quizQuestions[currentQuizQuestion].options || [])" :key="index">
                            <ion-radio :value="option.value" slot="start"></ion-radio>
                            <ion-label>{{ option.text }}</ion-label>
                          </ion-item>
                        </ion-radio-group>
                      </div>
                      
                      <!-- Matching Questions -->
                      <div v-else-if="quizQuestions[currentQuizQuestion] && quizQuestions[currentQuizQuestion].type === 'matching'">
                        <div class="matching-instructions">
                          <ion-note color="primary">
                            <strong>Instructions:</strong> Match each communication support strategy (A, B, C) with its correct purpose (1, 2, 3) using the dropdown menus.
                          </ion-note>
                        </div>
                        <ion-list>
                          <ion-item v-for="strategy in (quizQuestions[currentQuizQuestion].strategies || [])" :key="strategy.id" class="matching-item">
                            <ion-label>
                              <h4><strong>{{ strategy.id }}.</strong> {{ strategy.text }}</h4>
                            </ion-label>
                            <ion-select 
                              v-model="matchingAnswers[strategy.id]" 
                              interface="popover" 
                              placeholder="Select purpose"
                              :value="matchingAnswers[strategy.id]"
                              class="matching-select"
                            >
                              <ion-select-option value="">Select purpose</ion-select-option>
                              <ion-select-option 
                                v-for="purpose in (quizQuestions[currentQuizQuestion].purposes || [])" 
                                :key="purpose.id" 
                                :value="purpose.id"
                              >
                                {{ purpose.id }}. {{ purpose.text }}
                              </ion-select-option>
                            </ion-select>
                          </ion-item>
                        </ion-list>
                      </div>
                      
                      <div class="ion-padding-top">
                        <ion-button expand="block" color="primary" @click="nextQuizQuestion" :disabled="!canProceedToNextQuestion">
                          {{ currentQuizQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question' }}
                        </ion-button>
                      </div>
                    </ion-card-content>
                  </ion-card>
                </div>
                
                <div v-if="quizCompleted && quizQuestions.length > 0">
                  <ion-card>
                    <ion-card-header>
                      <ion-card-title>Quiz Results</ion-card-title>
                      <ion-card-subtitle>Your Score: {{ quizScore }}%</ion-card-subtitle>
                    </ion-card-header>
                    <ion-card-content>
                      <ion-progress-bar :value="quizScore / 100" :color="getQuizScoreColor()"></ion-progress-bar>
                      <ion-note>{{ getQuizScoreMessage() }}</ion-note>
                      
                      <!-- Detailed Results -->
                      <div class="quiz-results-details" v-if="quizCompleted && quizQuestions.length > 0">
                        <h4>Question Results:</h4>
                        <div v-for="(question, index) in quizQuestions" :key="index" class="question-result-item">
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
                                
                                <!-- Learning Tip for Wrong Answers - appears inside the ion-label -->
                                <div v-if="!isQuestionCorrect(index)" class="learning-tip-container">
                                  <ion-accordion-group>
                                    <ion-accordion>
                                      <ion-item slot="header" class="learning-tip-header">
                                        <ion-icon :icon="bulb" slot="start" color="primary"></ion-icon>
                                        <ion-label>
                                          <p>Learning tip</p>
                                        </ion-label>
                                      </ion-item>
                                      <div slot="content" class="ion-padding">
                                        <div class="tip-content">
                                          <h6>Why this answer was incorrect:</h6>
                                          <p>{{ getQuestionTip(index) }}</p>
                                          
                                          <div class="correct-answer-explanation">
                                            <h6>Correct Answer Explanation:</h6>
                                            <p>{{ getCorrectAnswerExplanation(index) }}</p>
                                          </div>
                                          
                                          <div class="learning-point">
                                            <ion-icon :icon="school" color="primary"></ion-icon>
                                            <span><strong>Key Learning Point:</strong> {{ getLearningPoint(index) }}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </ion-accordion>
                                  </ion-accordion-group>
                                </div>
                              </ion-label>
                            </ion-item>
                          </div>
                          
                          <!-- Manual divider after learning tip -->
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
          
          <!-- For other pages, show all content -->
          <div v-else>
            <!-- 1. Main Content Card -->
            <ion-card>
              <ion-card-content>
                <p>{{ disabilityContent.description }}</p>
                
                <!-- Add key considerations for Visual Needs -->
                <div v-if="route.params.id === 'physical-disabilities'">
                  <h4>Key Considerations:</h4>
                  <ion-list>
                    <ion-item>
                      <ion-icon :icon="eyeOutline" slot="start" color="primary"></ion-icon>
                      <ion-label>Provide materials in accessible formats (large print, audio, digital)</ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-icon :icon="checkmark" slot="start" color="success"></ion-icon>
                      <ion-label>Use descriptive language for all visual content</ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-icon :icon="home" slot="start" color="warning"></ion-icon>
                      <ion-label>Ensure adequate lighting and high contrast in learning environments</ion-label>
                    </ion-item>
                    <ion-item>
                      <ion-icon :icon="people" slot="start" color="secondary"></ion-icon>
                      <ion-label>Include student in all group activities with appropriate support</ion-label>
                    </ion-item>
                  </ion-list>
                </div>
              </ion-card-content>
            </ion-card>

            <!-- Show detailed content only if it exists and has subheadings -->
            <div v-if="hasSubheadings">

          <!-- 2. Language Section -->
          <ion-card id="language">
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
                      <ion-item v-for="(word, index) in (disabilityContent as any).language.wordsToAvoid" :key="index">
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
        <ion-card id="understanding">
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
          <ion-card id="challenges">
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
          <ion-card id="enabling">
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
          <ion-card id="resources">
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
          <ion-card id="case-study">
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
          <ion-card id="reflective-task">
            <ion-card-header>
              <ion-card-title>Reflective Writing Journal</ion-card-title>
              <ion-card-subtitle>Deepen Your Learning Through Reflection</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <!-- Version Selector -->
              <ion-item>
                <ion-label position="stacked">Select Version</ion-label>
                <ion-select 
                  v-model="selectedReflectionVersion" 
                  interface="popover" 
                  placeholder="Choose version"
                  @ionChange="loadReflectionVersion"
                >
                  <ion-select-option 
                    v-for="version in reflectionVersions" 
                    :key="version.id" 
                    :value="version.id"
                  >
                    {{ version.name }} ({{ version.lastModified }})
                  </ion-select-option>
                </ion-select>
                <ion-button fill="clear" slot="end" @click="createNewVersion">
                  <ion-icon :icon="add"></ion-icon>
                </ion-button>
              </ion-item>

              <!-- Reflection Prompts -->
              <div class="reflection-section">
                <h4>
                  <ion-icon :icon="helpCircle" slot="start" color="primary"></ion-icon>
                  Case Study Reflection
                </h4>
                <p class="reflection-prompt">
                  Based on the case study you've read, consider how you would apply similar strategies in your own context. 
                  What specific adaptations would you make? What challenges might you face and how would you address them?
                </p>
                <ion-textarea
                  v-model="currentReflection.caseStudyReflection"
                  placeholder="Reflect on how you would adapt the case study strategies to your own teaching context..."
                  :rows="6"
                  :auto-grow="true"
                  :maxlength="2000"
                  :counter="true"
                  class="reflection-textarea"
                  @ionInput="autoSaveReflection"
                ></ion-textarea>
                
                <!-- Prompt Accordion for Case Study Reflection -->
                <ion-accordion-group>
                  <ion-accordion value="case-study-prompts">
                    <ion-item slot="header" color="light">
                      <ion-icon :icon="bulb" slot="start" color="warning"></ion-icon>
                      <ion-label>Think about...</ion-label>
                    </ion-item>
                    <div class="ion-padding" slot="content">
                      <ion-list>
                        <ion-item>
                          <ion-icon :icon="arrowForward" slot="start" color="primary"></ion-icon>
                          <ion-label>How could you adapt the visual supports mentioned in the case study for your own students?</ion-label>
                        </ion-item>
                        <ion-item>
                          <ion-icon :icon="arrowForward" slot="start" color="primary"></ion-icon>
                          <ion-label>What additional resources or technologies might you need to implement similar strategies?</ion-label>
                        </ion-item>
                        <ion-item>
                          <ion-icon :icon="arrowForward" slot="start" color="primary"></ion-icon>
                          <ion-label>How would you involve other staff members or specialists in supporting your student?</ion-label>
                        </ion-item>
                        <ion-item>
                          <ion-icon :icon="arrowForward" slot="start" color="primary"></ion-icon>
                          <ion-label>What barriers might exist in your current environment and how could you overcome them?</ion-label>
                        </ion-item>
                        <ion-item>
                          <ion-icon :icon="arrowForward" slot="start" color="primary"></ion-icon>
                          <ion-label>How would you measure the success of these adaptations in your context?</ion-label>
                        </ion-item>
                      </ion-list>
                    </div>
                  </ion-accordion>
                </ion-accordion-group>
              </div>

              <div class="reflection-section">
                <h4>
                  <ion-icon :icon="bulb" slot="start" color="secondary"></ion-icon>
                  Practice Reflection
                </h4>
                <p class="reflection-prompt">
                  Think about your current teaching practice. What aspects of your approach could be made more accessible 
                  for students with visual needs? What barriers might exist and how could you remove them?
                </p>
                <ion-textarea
                  v-model="currentReflection.practiceReflection"
                  placeholder="Reflect on your current practice and identify areas for improvement in accessibility..."
                  :rows="6"
                  :auto-grow="true"
                  :maxlength="2000"
                  :counter="true"
                  class="reflection-textarea"
                  @ionInput="autoSaveReflection"
                ></ion-textarea>
                
                <!-- Prompt Accordion for Practice Reflection -->
                <ion-accordion-group>
                  <ion-accordion value="practice-prompts">
                    <ion-item slot="header" color="light">
                      <ion-icon :icon="bulb" slot="start" color="warning"></ion-icon>
                      <ion-label>Think about...</ion-label>
                    </ion-item>
                    <div class="ion-padding" slot="content">
                      <ion-list>
                        <ion-item>
                          <ion-icon :icon="arrowForward" slot="start" color="secondary"></ion-icon>
                          <ion-label>Could you offer your student some extra support with visual materials?</ion-label>
                        </ion-item>
                        <ion-item>
                          <ion-icon :icon="arrowForward" slot="start" color="secondary"></ion-icon>
                          <ion-label>Would you try using a new support such as text with more pictures?</ion-label>
                        </ion-item>
                        <ion-item>
                          <ion-icon :icon="arrowForward" slot="start" color="secondary"></ion-icon>
                          <ion-label>How do you think your student would react to these changes?</ion-label>
                        </ion-item>
                        <ion-item>
                          <ion-icon :icon="arrowForward" slot="start" color="secondary"></ion-icon>
                          <ion-label>What visual content in your lessons could be made more accessible?</ion-label>
                        </ion-item>
                        <ion-item>
                          <ion-icon :icon="arrowForward" slot="start" color="secondary"></ion-icon>
                          <ion-label>How could you improve the lighting and contrast in your learning environment?</ion-label>
                        </ion-item>
                        <ion-item>
                          <ion-icon :icon="arrowForward" slot="start" color="secondary"></ion-icon>
                          <ion-label>What assistive technologies could benefit your students?</ion-label>
                        </ion-item>
                      </ion-list>
                    </div>
                  </ion-accordion>
                </ion-accordion-group>
              </div>

              <div class="reflection-section">
                <h4>
                  <ion-icon :icon="arrowForward" slot="start" color="tertiary"></ion-icon>
                  Next Steps Action Plan
                </h4>
                <p class="reflection-prompt">
                  Based on your reflections, what specific actions will you take to improve your practice? 
                  Set concrete, achievable goals with timelines for implementation.
                </p>
                <ion-textarea
                  v-model="currentReflection.nextSteps"
                  placeholder="Outline your specific action plan with timelines and measurable goals..."
                  :rows="6"
                  :auto-grow="true"
                  :maxlength="2000"
                  :counter="true"
                  class="reflection-textarea"
                  @ionInput="autoSaveReflection"
                ></ion-textarea>
                
                <!-- Prompt Accordion for Next Steps -->
                <ion-accordion-group>
                  <ion-accordion value="next-steps-prompts">
                    <ion-item slot="header" color="light">
                      <ion-icon :icon="bulb" slot="start" color="warning"></ion-icon>
                      <ion-label>Think about...</ion-label>
                    </ion-item>
                    <div class="ion-padding" slot="content">
                      <ion-list>
                        <ion-item>
                          <ion-icon :icon="arrowForward" slot="start" color="tertiary"></ion-icon>
                          <ion-label>What specific resources do you need to acquire or develop?</ion-label>
                        </ion-item>
                        <ion-item>
                          <ion-icon :icon="arrowForward" slot="start" color="tertiary"></ion-icon>
                          <ion-label>Who else needs to be involved in implementing these changes?</ion-label>
                        </ion-item>
                        <ion-item>
                          <ion-icon :icon="arrowForward" slot="start" color="tertiary"></ion-icon>
                          <ion-label>What training or professional development might you need?</ion-label>
                        </ion-item>
                        <ion-item>
                          <ion-icon :icon="arrowForward" slot="start" color="tertiary"></ion-icon>
                          <ion-label>How will you measure the impact of these changes on student learning?</ion-label>
                        </ion-item>
                        <ion-item>
                          <ion-icon :icon="arrowForward" slot="start" color="tertiary"></ion-icon>
                          <ion-label>What timeline is realistic for implementing these improvements?</ion-label>
                        </ion-item>
                        <ion-item>
                          <ion-icon :icon="arrowForward" slot="start" color="tertiary"></ion-icon>
                          <ion-label>How will you ensure these changes are sustainable and ongoing?</ion-label>
                        </ion-item>
                      </ion-list>
                    </div>
                  </ion-accordion>
                </ion-accordion-group>
              </div>

              <!-- Action Buttons -->
              <div class="reflection-actions">
                <ion-button expand="block" color="primary" @click="saveReflection">
                  <ion-icon :icon="save" slot="start"></ion-icon>
                  Save Reflection
                </ion-button>
                
                <ion-button expand="block" fill="outline" color="secondary" @click="exportReflection">
                  <ion-icon :icon="download" slot="start"></ion-icon>
                  Export as PDF
                </ion-button>
                
                <ion-button expand="block" fill="outline" color="warning" @click="clearReflection">
                  <ion-icon :icon="trash" slot="start"></ion-icon>
                  Clear All
                </ion-button>
              </div>

              <!-- Progress Indicator -->
              <div class="reflection-progress">
                <ion-progress-bar 
                  :value="reflectionProgress" 
                  color="success"
                ></ion-progress-bar>
                <ion-note>{{ Math.round(reflectionProgress * 100) }}% Complete</ion-note>
              </div>
              
              <!-- General Reflection Prompts Accordion -->
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

          <!-- 9. Quiz -->
          <ion-card id="knowledge-check">
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
                    
                    <!-- Multiple Choice Questions -->
                    <div v-if="!quizQuestions[currentQuizQuestion].type || quizQuestions[currentQuizQuestion].type === 'multiple-choice'">
                      <ion-radio-group v-model="currentQuizAnswer">
                        <ion-item v-for="(option, index) in quizQuestions[currentQuizQuestion].options" :key="index">
                          <ion-radio :value="option.value" slot="start"></ion-radio>
                          <ion-label>{{ option.text }}</ion-label>
                        </ion-item>
                      </ion-radio-group>
                    </div>
                    
                    <!-- True/False Questions -->
                    <div v-else-if="quizQuestions[currentQuizQuestion].type === 'true-false'">
                      <ion-radio-group v-model="currentQuizAnswer">
                        <ion-item v-for="(option, index) in quizQuestions[currentQuizQuestion].options" :key="index">
                          <ion-radio :value="option.value" slot="start"></ion-radio>
                          <ion-label>{{ option.text }}</ion-label>
                        </ion-item>
                      </ion-radio-group>
                    </div>
                    
                    <!-- Matching Questions -->
                    <div v-else-if="quizQuestions[currentQuizQuestion].type === 'matching'">
                      <div class="matching-instructions">
                        <ion-note color="primary">
                          <strong>Instructions:</strong> Match each communication support strategy (A, B, C) with its correct purpose (1, 2, 3) using the dropdown menus.
                        </ion-note>
                      </div>
                      <ion-list>
                        <ion-item v-for="strategy in quizQuestions[currentQuizQuestion].strategies" :key="strategy.id" class="matching-item">
                          <ion-label>
                            <h4><strong>{{ strategy.id }}.</strong> {{ strategy.text }}</h4>
                          </ion-label>
                          <ion-select 
                            v-model="matchingAnswers[strategy.id]" 
                            interface="popover" 
                            placeholder="Select purpose"
                            :value="matchingAnswers[strategy.id]"
                            class="matching-select"
                          >
                            <ion-select-option value="">Select purpose</ion-select-option>
                            <ion-select-option 
                              v-for="purpose in quizQuestions[currentQuizQuestion].purposes" 
                              :key="purpose.id" 
                              :value="purpose.id"
                            >
                              {{ purpose.id }}. {{ purpose.text }}
                            </ion-select-option>
                          </ion-select>
                        </ion-item>
                      </ion-list>
                    </div>
                    
                    <div class="ion-padding-top">
                      <ion-button expand="block" color="primary" @click="nextQuizQuestion" :disabled="!currentQuizAnswer && quizQuestions[currentQuizQuestion].type !== 'matching'">
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




            </div> <!-- End of detailed content conditional -->
        </div>
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
import { computed, ref, onMounted } from 'vue';
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
  IonSelect,
  IonSelectOption,
  IonTextarea
} from '@ionic/vue';
import { actionSheetController, toastController } from '@ionic/vue';
import { ProgressService } from '../services/ProgressService';
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
  mail,
  eyeOutline,
  chatbubbleOutline,
  save,
  trash,  arrowForward,
  settings,
  printOutline,
  accessibilityOutline
} from 'ionicons/icons';

const route = useRoute();

// Reflective Writing State
const selectedReflectionVersion = ref('current');
const reflectionVersions = ref([
  {
    id: 'current',
    name: 'Current Session',
    lastModified: new Date().toLocaleDateString()
  }
]);

const currentReflection = ref({
  caseStudyReflection: '',
  practiceReflection: '',
  nextSteps: ''
});

const reflectionProgress = computed(() => {
  const totalFields = 3;
  const completedFields = [
    currentReflection.value.caseStudyReflection.trim(),
    currentReflection.value.practiceReflection.trim(),
    currentReflection.value.nextSteps.trim()
  ].filter(field => field.length > 0).length;
  
  return completedFields / totalFields;
});

// Auto-save functionality with debouncing
let autoSaveTimeout: ReturnType<typeof setTimeout> | null = null;
const autoSaveReflection = () => {
  // Clear existing timeout
  if (autoSaveTimeout) {
    clearTimeout(autoSaveTimeout);
  }
  
  // Set new timeout for debounced save
  autoSaveTimeout = setTimeout(() => {
    try {
      saveReflectionToStorage();
      console.log('Auto-saved reflection');
    } catch (e) {
      console.error('Error auto-saving reflection:', e);
    }
  }, 1000);
};

// Check for stored anchor to scroll to after page load
onMounted(() => {
  console.log('DisabilityPage mounted, loading reflections...');
  
  // Load existing reflection versions from localStorage
  loadExistingReflectionVersions();
  console.log('Reflection loading completed');
  
  // Load quiz completion state from localStorage
  loadQuizState();
  console.log('Quiz state loading completed');
  
  // Handle anchor scrolling after a delay to ensure DOM is ready
  const storedAnchor = sessionStorage.getItem('scrollToAnchor');
  if (storedAnchor) {
    setTimeout(() => {
      try {
        if (typeof window !== 'undefined' && window.document) {
          const element = window.document.getElementById(storedAnchor);
          if (element) {
            const cardHeader = element.querySelector('ion-card-header');
            const targetElement = cardHeader || element;
            
            targetElement.scrollIntoView({ 
              behavior: 'smooth', 
              block: 'start' 
            });
          }
        }
      } catch (e) {
        console.error('Error scrolling to anchor:', e);
      }
      sessionStorage.removeItem('scrollToAnchor');
    }, 1000);
  }
});

const loadExistingReflectionVersions = () => {
  const pageId = route.params.id;
  console.log('Loading reflections for page:', pageId);
  
  const savedVersions = localStorage.getItem(`sage-reflection-versions-${pageId}`);
  if (savedVersions) {
    try {
      reflectionVersions.value = JSON.parse(savedVersions);
      console.log('Loaded reflection versions:', reflectionVersions.value);
    } catch (e) {
      console.error('Error loading reflection versions:', e);
      reflectionVersions.value = [
        {
          id: 'current',
          name: 'Current Session',
          lastModified: new Date().toLocaleDateString()
        }
      ];
    }
  } else {
    console.log('No saved versions found, using default');
  }
  
  // Load current reflection if it exists
  const currentVersion = reflectionVersions.value.find(v => v.id === selectedReflectionVersion.value);
  if (currentVersion) {
    const savedReflection = localStorage.getItem(`sage-reflection-${pageId}-${currentVersion.id}`);
    if (savedReflection) {
      try {
        currentReflection.value = JSON.parse(savedReflection);
        console.log('Loaded current reflection:', currentReflection.value);
      } catch (e) {
        console.error('Error loading current reflection:', e);
        currentReflection.value = {
          caseStudyReflection: '',
          practiceReflection: '',
          nextSteps: ''
        };
      }
    } else {
      console.log('No saved reflection found for current version, using empty defaults');
    }
  }
};

// Add this new function to load quiz state
const loadQuizState = () => {
  const pageId = route.params.id as string;
  
  // Check if quiz is completed for this page
  const isCompleted = ProgressService.isQuizCompleted(pageId);
  if (isCompleted) {
    quizCompleted.value = true;
    quizScore.value = ProgressService.getQuizScore(pageId) || 0;
    const savedAnswers = ProgressService.getQuizAnswers(pageId);
    if (savedAnswers) {
      quizAnswers.value = savedAnswers;
      console.log(`Quiz for ${pageId} is already completed with score: ${quizScore.value}% and answers loaded`);
    } else {
      console.log(`Quiz for ${pageId} is completed but no answers found`);
    }
  } else {
    console.log(`Quiz for ${pageId} is not completed yet`);
  }
};

// State variables
const selectedUnderstandingSection = ref('strengths');
const selectedResourceType = ref('electronic');
const currentQuizQuestion = ref(0);
const currentQuizAnswer = ref('');
const quizCompleted = ref(false);
const quizScore = ref(0);
const matchingAnswers = ref<{ [key: string]: string }>({});
const quizAnswers = ref<{ [key: number]: string | { [key: string]: string } }>({});

// Computed property to check if user can proceed to next question
const canProceedToNextQuestion = computed(() => {
  const currentQuestion = quizQuestions.value[currentQuizQuestion.value];
  
  if (!currentQuestion) {
    return false;
  }
  
  if (currentQuestion.type === 'matching' && currentQuestion.strategies) {
    // Check if all strategies have been matched
    return currentQuestion.strategies.every(strategy => 
      matchingAnswers.value && matchingAnswers.value[strategy.id]
    );
  }
  
  // For other question types, check if an answer is selected
  return !!currentQuizAnswer.value;
});

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
const quizQuestions = computed(() => {
  const id = route.params.id as string;
  
  if (id === 'communication') {
    return [
      {
        question: "Which of the following is the most inclusive way to describe a learner who does not use speech?",
        options: [
          { value: 'a', text: 'Mute' },
          { value: 'b', text: 'Non-verbal' },
          { value: 'c', text: 'Can\'t communicate' },
          { value: 'd', text: 'Non-speaking' }
        ],
        correctAnswer: 'd'
      },
      {
        question: "Students with communication needs always experience the same challenges at home and school.",
        type: 'true-false',
        options: [
          { value: 'true', text: 'True' },
          { value: 'false', text: 'False' }
        ],
        correctAnswer: 'false'
      },
      {
        question: "Match the communication support strategy to its purpose:",
        type: 'matching',
        strategies: [
          { id: 'A', text: 'Visual timetable' },
          { id: 'B', text: 'Clear seating plan' },
          { id: 'C', text: 'Noise-cancelling headphones' }
        ],
        purposes: [
          { id: '1', text: 'Reduce sensory input to support regulation' },
          { id: '2', text: 'Help understand daily structure and transitions' },
          { id: '3', text: 'Support concentration and communication access' }
        ],
        correctAnswers: { 'A': '2', 'B': '3', 'C': '1' } as { [key: string]: string }
      },
      {
        question: "Children who cannot speak cannot learn.",
        type: 'true-false',
        options: [
          { value: 'true', text: 'True' },
          { value: 'false', text: 'False' }
        ],
        correctAnswer: 'false'
      },
      {
        question: "Which of the following best describes a 'total communication approach'?",
        options: [
          { value: 'a', text: 'Only using speech and writing in the classroom' },
          { value: 'b', text: 'Encouraging all students to use sign language' },
          { value: 'c', text: 'Supporting and valuing multiple communication methods (e.g., symbols, AAC, gestures, speech)' },
          { value: 'd', text: 'Limiting communication to one consistent method per student' }
        ],
        correctAnswer: 'c'
      }
    ];
  }
  
  // Default quiz questions for other pages
  return [
    {
      question: "What is the most important consideration when supporting students with this disability?",
      options: [
        { value: 'a', text: 'Providing extra time for all activities' },
        { value: 'b', text: 'Understanding individual needs and preferences' },
        { value: 'c', text: 'Using the same approach for all students' },
        { value: 'd', text: 'Focusing only on academic performance' }
      ],
      correctAnswer: 'b'
    },
    {
      question: "Which strategy is most effective for this disability category?",
      options: [
        { value: 'a', text: 'Standardized testing' },
        { value: 'b', text: 'Flexible learning approaches' },
        { value: 'c', text: 'Strict deadlines' },
        { value: 'd', text: 'One-size-fits-all instruction' }
      ],
      correctAnswer: 'b'
    },
    {
      question: "What should you avoid when working with students with this disability?",
      options: [
        { value: 'a', text: 'Making assumptions about their capabilities' },
        { value: 'b', text: 'Providing clear instructions' },
        { value: 'c', text: 'Offering multiple ways to demonstrate learning' },
        { value: 'd', text: 'Using assistive technologies' }
      ],
      correctAnswer: 'a'
    },
    {
      question: "How should you approach language when discussing this disability?",
      options: [
        { value: 'a', text: 'Use medical terminology only' },
        { value: 'b', text: 'Use person-first language and respect individual preferences' },
        { value: 'c', text: 'Use outdated terms if they are commonly understood' },
        { value: 'd', text: 'Avoid discussing the disability altogether' }
      ],
      correctAnswer: 'b'
    },
    {
      question: "What is the best way to support self-advocacy for students with this disability?",
      options: [
        { value: 'a', text: 'Make all decisions for them' },
        { value: 'b', text: 'Encourage them to express their needs and preferences' },
        { value: 'c', text: 'Ignore their input to maintain authority' },
        { value: 'd', text: 'Assume you know what they need' }
      ],
      correctAnswer: 'b'
    }
  ];
});

const getPageTitle = () => {
  const id = route.params.id as string;
  if (id === 'physical-disabilities') {
    return 'Visual Needs';
  }
  if (id === 'hearing-needs') {
    return 'Hearing Needs';
  }
  if (id === 'physical-sensory-needs') {
    return 'Physical and Sensory Needs';
  }
  if (id === 'cognitive-intellectual-needs') {
    return 'Cognitive and Intellectual Needs';
  }
  if (id === 'speech-language-needs') {
    return 'Speech and Language Needs';
  }
  if (id === 'communication') {
    return 'Communication';
  }
  if (id === 'multiple-disabilities') {
    return 'Multiple Disabilities';
  }
  return disabilityData[id as keyof typeof disabilityData]?.title || (id ? id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Unknown Page');
};

const getCategoryTitle = () => {
  const id = route.params.id as string;
  return disabilityData[id as keyof typeof disabilityData]?.category || 'Disability Category';
};

const hasSubheadings = computed(() => {
  const id = route.params.id as string;
  // Pages with subheadings: physical-disabilities (Visual Needs), communication
  // Pages without subheadings: hearing-needs, physical-sensory-needs, cognitive-intellectual-needs, speech-language-needs, multiple-disabilities
  return id === 'physical-disabilities' || id === 'communication';
});

const disabilityContent = computed(() => {
  const id = route.params.id as string;
  if (id === 'hearing-needs') {
    return {
      title: 'Hearing Needs',
      category: 'Hearing Needs',
      description: 'Content for Hearing Needs is coming soon...',
      language: {
        wordsToAvoid: [],
        wordsToUse: []
      },
      understanding: {
        strengths: [],
        challenges: [],
        strategies: [],
        advocacy: []
      },
      challenges: {
        physical: [],
        social: [],
        tasks: [],
        assessment: []
      },
      enabling: {
        physical: [],
        social: [],
        tasks: [],
        assessment: []
      },
      resources: {
        electronic: [],
        paper: [],
        organizations: []
      },
      caseStudy: {
        title: '',
        scenario: '',
        details: [],
        learningPoints: []
      },
      reflectiveTasks: []
    };
  }
  if (id === 'physical-sensory-needs') {
    return {
      title: 'Physical and Sensory Needs',
      category: 'Physical and Sensory Needs',
      description: 'Content for Physical and Sensory Needs is coming soon...',
      language: {
        wordsToAvoid: [],
        wordsToUse: []
      },
      understanding: {
        strengths: [],
        challenges: [],
        strategies: [],
        advocacy: []
      },
      challenges: {
        physical: [],
        social: [],
        tasks: [],
        assessment: []
      },
      enabling: {
        physical: [],
        social: [],
        tasks: [],
        assessment: []
      },
      resources: {
        electronic: [],
        paper: [],
        organizations: []
      },
      caseStudy: {
        title: '',
        scenario: '',
        details: [],
        learningPoints: []
      },
      reflectiveTasks: []
    };
  }
  if (id === 'cognitive-intellectual-needs') {
    return {
      title: 'Cognitive and Intellectual Needs',
      category: 'Cognitive and Intellectual Needs',
      description: 'Content for Cognitive and Intellectual Needs is coming soon...',
      language: {
        wordsToAvoid: [],
        wordsToUse: []
      },
      understanding: {
        strengths: [],
        challenges: [],
        strategies: [],
        advocacy: []
      },
      challenges: {
        physical: [],
        social: [],
        tasks: [],
        assessment: []
      },
      enabling: {
        physical: [],
        social: [],
        tasks: [],
        assessment: []
      },
      resources: {
        electronic: [],
        paper: [],
        organizations: []
      },
      caseStudy: {
        title: '',
        scenario: '',
        details: [],
        learningPoints: []
      },
      reflectiveTasks: []
    };
  }
  if (id === 'speech-language-needs') {
    return {
      title: 'Speech and Language Needs',
      category: 'Speech and Language Needs',
      description: 'Content for Speech and Language Needs is coming soon...',
      language: {
        wordsToAvoid: [],
        wordsToUse: []
      },
      understanding: {
        strengths: [],
        challenges: [],
        strategies: [],
        advocacy: []
      },
      challenges: {
        physical: [],
        social: [],
        tasks: [],
        assessment: []
      },
      enabling: {
        physical: [],
        social: [],
        tasks: [],
        assessment: []
      },
      resources: {
        electronic: [],
        paper: [],
        organizations: []
      },
      caseStudy: {
        title: '',
        scenario: '',
        details: [],
        learningPoints: []
      },
      reflectiveTasks: []
    };
  }
  if (id === 'multiple-disabilities') {
    return {
      title: 'Multiple Disabilities',
      category: 'Multiple Disabilities',
      description: 'Content for Multiple Disabilities is coming soon...',
      language: {
        wordsToAvoid: [],
        wordsToUse: []
      },
      understanding: {
        strengths: [],
        challenges: [],
        strategies: [],
        advocacy: []
      },
      challenges: {
        physical: [],
        social: [],
        tasks: [],
        assessment: []
      },
      enabling: {
        physical: [],
        social: [],
        tasks: [],
        assessment: []
      },
      resources: {
        electronic: [],
        paper: [],
        organizations: []
      },
      caseStudy: {
        title: '',
        scenario: '',
        details: [],
        learningPoints: []
      },
      reflectiveTasks: []
    };
  }
  if (id === 'communication') {
    // Return content structure for the communication page
    return {
      title: 'Communication',
      category: 'Communication & Interaction',
      description: 'Communication disabilities encompass a range of conditions that may affect speech, language, and social interaction. This guide provides information and strategies for supporting students with communication needs.',
      language: {
        wordsToAvoid: [
          { term: 'Handicapped', reason: 'Outdated and offensive term' },
          { term: 'Crippled', reason: 'Derogatory and inappropriate' },
          { term: 'Disabled person', reason: 'Person-first language is preferred' }
        ],
        wordsToUse: [
          { term: 'Student with communication needs', explanation: 'Person-first language that respects individual identity' },
          { term: 'Non-speaking student', explanation: 'Respectful term for students who do not use speech' },
          { term: 'Student with communication differences', explanation: 'Emphasizes diversity rather than deficits' }
        ]
      },
      understanding: {
        strengths: [
          'What communication methods work best for you?',
          'How do you prefer to express your thoughts and ideas?',
          'What assistive communication technologies do you use?',
          'Which social situations do you find most comfortable?'
        ],
        challenges: [
          'What communication barriers do you face in learning environments?',
          'How do you prefer to receive information and instructions?',
          'What social situations are most challenging for you?',
          'How do you handle group discussions and presentations?'
        ],
        strategies: [
          'What communication support strategies have been most helpful?',
          'How do you prefer to participate in classroom activities?',
          'What environmental factors help or hinder your communication?',
          'Which technologies or tools support your communication best?'
        ],
        advocacy: [
          'I need alternative ways to communicate my ideas',
          'Please provide written instructions and information',
          'I prefer to participate in discussions in smaller groups',
          'I need extra time to process and respond to questions'
        ]
      },
      challenges: {
        physical: [
          'Limited access to assistive communication technologies',
          'Inadequate seating arrangements for communication devices',
          'Poor acoustics and background noise in classrooms',
          'Inaccessible communication tools and materials'
        ],
        social: [
          'Difficulty participating in group discussions and activities',
          'Potential isolation from peer interactions',
          'Misunderstandings about communication abilities',
          'Limited opportunities for social communication practice'
        ],
        tasks: [
          'Completing oral presentations and assessments',
          'Participating in classroom discussions',
          'Accessing verbal instructions and information',
          'Communicating needs and preferences effectively'
        ],
        assessment: [
          'Standard assessment formats may not accommodate communication needs',
          'Oral components in assessments create barriers',
          'Limited access to communication accommodations during testing',
          'Difficulty with verbal presentation requirements'
        ]
      },
      enabling: {
        physical: [
          'Provide access to assistive communication technologies',
          'Create quiet, distraction-free communication spaces',
          'Ensure proper seating and positioning for communication devices',
          'Use visual supports and written materials'
        ],
        social: [
          'Include student in all activities with appropriate communication support',
          'Provide alternative ways to participate in group work',
          'Encourage peer support and understanding',
          'Create opportunities for successful social interactions'
        ],
        tasks: [
          'Offer multiple ways to demonstrate understanding and knowledge',
          'Provide written alternatives for oral assignments',
          'Allow extra time for communication and responses',
          'Use visual aids and written instructions'
        ],
        assessment: [
          'Offer alternative assessment formats and methods',
          'Provide communication accommodations during assessment',
          'Allow use of assistive technologies during testing',
          'Focus on content mastery rather than communication method'
        ]
      },
      resources: {
        electronic: [
          { title: 'Communication Support Guidelines', description: 'Comprehensive guide to supporting communication needs', url: 'www.communicationmatters.org.uk' },
          { title: 'Assistive Communication Technology', description: 'Guide to AAC devices and communication tools', url: 'www.isaac-online.org' },
          { title: 'Inclusive Communication Resources', description: 'Resources for creating inclusive communication environments', url: 'www.inclusive-communication.org' }
        ],
        paper: [
          { title: 'Communication Support Handbook', description: 'Printed guide to supporting communication needs in education', availability: 'Available from speech and language services' },
          { title: 'AAC Device Catalog', description: 'Catalog of available augmentative and alternative communication devices', availability: 'Contact communication support services' }
        ],
        organizations: [
          { name: 'Communication Matters', description: 'UK organization supporting people with communication needs', contact: 'www.communicationmatters.org.uk' },
          { name: 'ISAAC', description: 'International Society for Augmentative and Alternative Communication', contact: 'www.isaac-online.org' }
        ]
      },
      caseStudy: {
        title: 'Supporting a Non-Speaking Student in Mainstream Education',
        scenario: 'A student with cerebral palsy who uses a communication device joins a mainstream secondary school and needs support to participate fully in all aspects of learning.',
        details: [
          'Student uses an eye-gaze communication device for expression',
          'Requires support to access and use communication technology',
          'Needs visual supports and written materials for comprehension',
          'Benefits from peer support and inclusive communication strategies'
        ],
        learningPoints: [
          'Communication technology enables full participation in learning',
          'Visual supports enhance understanding and engagement',
          'Peer support creates inclusive communication environments',
          'Multiple communication methods support diverse learning needs'
        ]
      },
      reflectiveTasks: [
        {
          title: 'Assess Communication Environment',
          description: 'Review your learning environment for communication accessibility',
          completed: false
        },
        {
          title: 'Explore Communication Technologies',
          description: 'Research available assistive communication technologies',
          completed: false
        },
        {
          title: 'Plan Inclusive Communication',
          description: 'Design activities that include students with communication needs',
          completed: false
        }
      ]
    };
  }
  if (id === 'physical-disabilities') {
    // Return a default content structure for the visual needs page
    return {
      title: 'Visual Needs',
      category: 'Visual Needs',
      description: 'Visual needs encompass a range of conditions that may affect vision, sensory functions, or visual capabilities. This comprehensive guide provides information and strategies for supporting students with various visual needs.',
      language: {
        wordsToAvoid: [
          { term: 'Handicapped', reason: 'Outdated and offensive term' },
          { term: 'Crippled', reason: 'Derogatory and inappropriate' },
          { term: 'Disabled person', reason: 'Person-first language is preferred' }
        ],
        wordsToUse: [
          { term: 'Student with a physical disability', explanation: 'Person-first language that respects individual identity' },
          { term: 'Student with mobility needs', explanation: 'Focuses on accommodation needs rather than limitations' },
          { term: 'Student with physical access requirements', explanation: 'Clear description of specific needs' }
        ]
      },
      understanding: {
        strengths: [
          'What are your strongest learning methods?',
          'Which activities do you enjoy and feel confident doing?',
          'What assistive technologies work best for you?',
          'How do you prefer to receive information?'
        ],
        challenges: [
          'What physical barriers do you face in learning environments?',
          'Which tasks require the most physical effort?',
          'What environmental factors affect your learning?',
          'How do you currently navigate physical spaces?'
        ],
        strategies: [
          'What support strategies have been most helpful in the past?',
          'How do you prefer to access learning materials?',
          'What environmental adjustments make learning easier?',
          'Which technologies or tools do you find most useful?'
        ],
        advocacy: [
          'I need accessible learning environments',
          'Please provide materials in accessible formats',
          'I require additional time for physical tasks',
          'I need adaptive equipment and technologies'
        ]
      },
      challenges: {
        physical: [
          'Inaccessible learning environments and facilities',
          'Limited access to adaptive equipment and technologies',
          'Physical barriers in classrooms and common areas',
          'Inadequate seating and workspace accommodations'
        ],
        social: [
          'Difficulty participating in physical group activities',
          'Potential isolation from peers during physical tasks',
          'Misunderstandings about capabilities and needs',
          'Limited access to social spaces and activities'
        ],
        tasks: [
          'Completing physical assignments and projects',
          'Accessing learning materials and resources',
          'Participating in hands-on learning activities',
          'Managing time for physical tasks and transitions'
        ],
        assessment: [
          'Standard assessment formats may not be accessible',
          'Physical components in assessments create barriers',
          'Limited access to assessment accommodations',
          'Difficulty with physical presentation requirements'
        ]
      },
      enabling: {
        physical: [
          'Ensure physical accessibility of all learning spaces',
          'Provide adaptive equipment and assistive technologies',
          'Create clear pathways and remove physical barriers',
          'Offer flexible seating and workspace arrangements'
        ],
        social: [
          'Include student in all activities with appropriate support',
          'Provide alternative ways to participate in group work',
          'Encourage peer support and collaboration',
          'Foster understanding and inclusion among classmates'
        ],
        tasks: [
          'Provide materials in accessible formats',
          'Offer alternative ways to complete physical tasks',
          'Allow additional time for physical activities',
          'Use adaptive technologies and equipment'
        ],
        assessment: [
          'Offer alternative assessment formats and methods',
          'Provide physical accommodations during assessment',
          'Allow use of assistive technologies during testing',
          'Focus on content mastery rather than physical presentation'
        ]
      },
      resources: {
        electronic: [
          { title: 'Accessibility Guidelines', description: 'Comprehensive accessibility standards and guidelines', url: 'www.w3.org/WAI' },
          { title: 'Assistive Technology Guide', description: 'Guide to assistive technologies for physical disabilities', url: 'www.abilitynet.org.uk' },
          { title: 'Accessible Design Resources', description: 'Resources for creating accessible learning environments', url: 'www.inclusive-design.org' }
        ],
        paper: [
          { title: 'Physical Accessibility Handbook', description: 'Printed guide to physical accessibility in education', availability: 'Available from disability services' },
          { title: 'Adaptive Equipment Catalog', description: 'Catalog of available adaptive equipment and tools', availability: 'Contact disability services office' }
        ],
        organizations: [
          { name: 'Disability Rights UK', description: 'National organization advocating for disability rights', contact: 'www.disabilityrightsuk.org' },
          { name: 'Scope', description: 'Charity supporting people with physical disabilities', contact: 'www.scope.org.uk' }
        ]
      },
      caseStudy: {
        title: 'Supporting a Student with Physical Mobility Needs',
        scenario: 'A student with cerebral palsy joins a mainstream secondary school and needs support to access all aspects of the curriculum.',
        details: [
          'Student uses a wheelchair and has limited hand mobility',
          'Requires accessible classrooms and facilities',
          'Needs adaptive equipment for writing and computer use',
          'Benefits from peer support and inclusive activities'
        ],
        learningPoints: [
          'Physical accessibility is essential for full participation',
          'Adaptive technologies can enable independent learning',
          'Peer support enhances social inclusion and learning',
          'Flexible approaches accommodate diverse physical needs'
        ]
      },
      reflectiveTasks: [
        {
          title: 'Assess Your Environment',
          description: 'Review your learning environment for physical accessibility',
          completed: false
        },
        {
          title: 'Explore Assistive Technologies',
          description: 'Research available assistive technologies for physical disabilities',
          completed: false
        },
        {
          title: 'Plan Inclusive Activities',
          description: 'Design activities that include students with physical disabilities',
          completed: false
        }
      ]
    };
  }
  return disabilityData[id as keyof typeof disabilityData] || {
    title: getPageTitle(),
    category: 'Disability Category',
    description: 'Content for this disability category is coming soon...',
    language: {
      wordsToAvoid: [],
      wordsToUse: []
    },
    understanding: {
      strengths: [],
      challenges: [],
      strategies: [],
      advocacy: []
    },
    challenges: {
      physical: [],
      social: [],
      tasks: [],
      assessment: []
    },
    enabling: {
      physical: [],
      social: [],
      tasks: [],
      assessment: []
    },
    resources: {
      electronic: [],
      paper: [],
      organizations: []
    },
    caseStudy: {
      title: '',
      scenario: '',
      details: [],
      learningPoints: []
    },
    reflectiveTasks: []
  };
});

const getDisabilityColor = () => {
  const category = getCategoryTitle();
  const colors: { [key: string]: string } = {
    'Visual Needs': 'primary',
    'Cognition & Learning': 'secondary',
    'Communication & Interaction': 'tertiary',
    'Multiple Impairments': 'warning'
  };
  return colors[category] || 'primary';
};

const getDisabilityIcon = () => {
  const category = getCategoryTitle();
  const icons: { [key: string]: string } = {
    'Visual Needs': 'body-outline',
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

// Reflective Writing Functions
const createNewVersion = () => {
  // Save current reflection to localStorage before creating new version
  saveReflectionToStorage();
  
  const newVersion = {
    id: `version-${Date.now()}`,
    name: `Version ${reflectionVersions.value.length + 1}`,
    lastModified: new Date().toLocaleDateString()
  };
  reflectionVersions.value.push(newVersion);
  selectedReflectionVersion.value = newVersion.id;
  
  // Clear current reflection for new version
  currentReflection.value = {
    caseStudyReflection: '',
    practiceReflection: '',
    nextSteps: ''
  };
  
  console.log('Created new version:', newVersion.id);
};

const loadReflectionVersion = () => {
  const version = reflectionVersions.value.find(v => v.id === selectedReflectionVersion.value);
  if (version) {
    const pageId = route.params.id;
    console.log('Loading reflection for version:', version.id);
    const savedReflection = localStorage.getItem(`sage-reflection-${pageId}-${version.id}`);
    if (savedReflection) {
      try {
        currentReflection.value = JSON.parse(savedReflection);
        console.log('Loaded reflection for version:', version.id, currentReflection.value);
      } catch (e) {
        console.error('Error loading reflection version:', e);
        currentReflection.value = {
          caseStudyReflection: '',
          practiceReflection: '',
          nextSteps: ''
        };
      }
    } else {
      console.log('No saved reflection found for version:', version.id);
      currentReflection.value = {
        caseStudyReflection: '',
        practiceReflection: '',
        nextSteps: ''
      };
    }
  }
};

const saveReflection = () => {
  saveReflectionToStorage();
  
  // Show success message
  if (typeof toastController !== 'undefined') {
    toastController.create({
      message: 'Reflection saved successfully!',
      duration: 2000,
      position: 'bottom',
      color: 'success'
    }).then(toast => toast.present());
  }
};

const saveReflectionToStorage = () => {
  const version = reflectionVersions.value.find(v => v.id === selectedReflectionVersion.value);
  if (version) {
    const pageId = route.params.id;
    localStorage.setItem(`sage-reflection-${pageId}-${version.id}`, JSON.stringify(currentReflection.value));
    version.lastModified = new Date().toLocaleDateString();
    
    // Also save the versions list
    localStorage.setItem(`sage-reflection-versions-${pageId}`, JSON.stringify(reflectionVersions.value));
    
    // Update progress tracking
    ProgressService.saveReflectionCompletion(pageId as string);
  }
};

const exportReflection = () => {
  const version = reflectionVersions.value.find(v => v.id === selectedReflectionVersion.value);
  if (!version) return;
  
  const content = `
Reflective Writing Journal - ${getPageTitle()}
Version: ${version.name}
Date: ${version.lastModified}

CASE STUDY REFLECTION:
${currentReflection.value.caseStudyReflection || 'No reflection written yet.'}

PRACTICE REFLECTION:
${currentReflection.value.practiceReflection || 'No reflection written yet.'}

NEXT STEPS ACTION PLAN:
${currentReflection.value.nextSteps || 'No action plan written yet.'}
  `.trim();
  
  // Create and download text file
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = window.document.createElement('a');
  a.href = url;
  a.download = `reflection-${getPageTitle().toLowerCase().replace(/\s+/g, '-')}-${version.name.toLowerCase().replace(/\s+/g, '-')}.txt`;
  window.document.body.appendChild(a);
  a.click();
  window.document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  // Show success message
  if (typeof toastController !== 'undefined') {
    toastController.create({
      message: 'Reflection exported successfully!',
      duration: 2000,
      position: 'bottom',
      color: 'success'
    }).then(toast => toast.present());
  }
};

const clearReflection = () => {
  // Simple confirmation for now since actionSheetController might not be available
  if (confirm('Are you sure you want to clear all your reflections? This action cannot be undone.')) {
    currentReflection.value = {
      caseStudyReflection: '',
      practiceReflection: '',
      nextSteps: ''
    };
    saveReflectionToStorage();
    
    // Show success message
    if (typeof toastController !== 'undefined') {
      toastController.create({
        message: 'Reflection cleared successfully!',
        duration: 2000,
        position: 'bottom',
        color: 'warning'
      }).then(toast => toast.present());
    }
  }
};

const contactOrganization = (org: any) => {
  console.log(`Contacting organization: ${org.name}`);
};

const nextQuizQuestion = () => {
  // Save current answer before moving to next question
  const currentQuestion = quizQuestions.value[currentQuizQuestion.value];
  
  if (!currentQuestion) {
    return;
  }
  
  if (currentQuestion.type === 'matching') {
    // Save matching answers
    quizAnswers.value[currentQuizQuestion.value] = { ...matchingAnswers.value };
  } else {
    // Save regular answer
    quizAnswers.value[currentQuizQuestion.value] = currentQuizAnswer.value;
  }
  
  if (currentQuizQuestion.value < quizQuestions.value.length - 1) {
    currentQuizQuestion.value++;
    currentQuizAnswer.value = '';
    // Reset matching answers for next question
    matchingAnswers.value = {};
  } else {
    // Calculate score based on correct answers
    let correctAnswers = 0;
    const totalQuestions = quizQuestions.value.length;
    
    quizQuestions.value.forEach((question, index) => {
      const userAnswer = quizAnswers.value[index];
      
      if (question.type === 'matching') {
        // Check if all matching answers are correct
        const userMatchingAnswers = userAnswer as { [key: string]: string };
        const allCorrect = question.strategies?.every(strategy => 
          userMatchingAnswers && userMatchingAnswers[strategy.id] && 
          question.correctAnswers && question.correctAnswers[strategy.id] &&
          userMatchingAnswers[strategy.id] === question.correctAnswers[strategy.id]
        );
        if (allCorrect) {
          correctAnswers++;
        }
      } else {
        // Check regular question
        if (userAnswer === question.correctAnswer) {
          correctAnswers++;
        }
      }
    });
    
    quizScore.value = Math.round((correctAnswers / totalQuestions) * 100);
    quizCompleted.value = true;
    
    // Save quiz completion to progress tracking
    const pageId = route.params.id as string;
    ProgressService.saveQuizCompletion(pageId, quizScore.value, quizAnswers.value);
  }
};

const retakeQuiz = () => {
  currentQuizQuestion.value = 0;
  currentQuizAnswer.value = '';
  quizCompleted.value = false;
  quizScore.value = 0;
  matchingAnswers.value = {};
  quizAnswers.value = {};
  
  // Reset quiz completion in progress tracking
  const pageId = route.params.id as string;
  ProgressService.resetQuizCompletion(pageId);
};

// Helper functions for quiz results
const isQuestionCorrect = (index: number) => {
  const question = quizQuestions.value[index];
  const userAnswer = quizAnswers.value[index];
  
  if (question.type === 'matching') {
    const userMatchingAnswers = userAnswer as { [key: string]: string };
    return question.strategies?.every(strategy => 
      userMatchingAnswers && userMatchingAnswers[strategy.id] && 
      question.correctAnswers && question.correctAnswers[strategy.id] &&
      userMatchingAnswers[strategy.id] === question.correctAnswers[strategy.id]
    ) || false;
  } else {
    return userAnswer === question.correctAnswer;
  }
};

const formatUserAnswer = (index: number) => {
  const question = quizQuestions.value[index];
  const userAnswer = quizAnswers.value[index];
  
  if (question.type === 'matching') {
    const userMatchingAnswers = userAnswer as { [key: string]: string };
    if (userMatchingAnswers && Object.keys(userMatchingAnswers).length > 0) {
      return Object.entries(userMatchingAnswers)
        .map(([strategy, purpose]) => `${strategy}${purpose}`)
        .join(', ');
    }
    return 'Not answered';
  } else if (question.type === 'true-false') {
    return userAnswer === 'true' ? 'True' : 'False';
  } else {
    const option = question.options?.find(opt => opt.value === userAnswer);
    return option ? option.text : 'Not answered';
  }
};

const formatCorrectAnswer = (index: number) => {
  const question = quizQuestions.value[index];
  
  if (question.type === 'matching') {
    if (question.correctAnswers && Object.keys(question.correctAnswers).length > 0) {
      return Object.entries(question.correctAnswers)
        .map(([strategy, purpose]) => `${strategy}${purpose}`)
        .join(', ');
    }
    return 'Unknown';
  } else if (question.type === 'true-false') {
    return question.correctAnswer === 'true' ? 'True' : 'False';
  } else {
    const option = question.options?.find(opt => opt.value === question.correctAnswer);
    return option ? option.text : 'Unknown';
  }
};

// Check if there are any wrong answers to show tips
const hasWrongAnswers = computed(() => {
  return quizQuestions.value.some((_, index) => !isQuestionCorrect(index));
});

// Get questions that were answered incorrectly
const wrongAnswerQuestions = computed(() => {
  return quizQuestions.value
    .map((question, index) => ({ question, index }))
    .filter(({ index }) => !isQuestionCorrect(index));
});

// Get tip for a specific question
const getQuestionTip = (index: number) => {
  const question = quizQuestions.value[index];
  const userAnswer = quizAnswers.value[index];
  
  if (question.type === 'matching') {
    return "In matching questions, each strategy must be correctly paired with its purpose. Review the communication support strategies and their intended outcomes.";
  } else if (question.type === 'true-false') {
    if (userAnswer === 'true' && question.correctAnswer === 'false') {
      return "This statement is false. Consider the complexity and individual nature of communication needs - they vary greatly between individuals and contexts.";
    } else {
      return "This statement is true. Communication abilities and needs are diverse and individual-specific.";
    }
  } else {
    // Multiple choice questions
    const userOption = question.options?.find(opt => opt.value === userAnswer);
    const correctOption = question.options?.find(opt => opt.value === question.correctAnswer);
    
    if (userOption && correctOption) {
      return `You selected "${userOption.text}" but the correct answer is "${correctOption.text}". Consider the most inclusive and respectful language when discussing communication needs.`;
    }
    return "Review the question carefully and consider which answer best reflects inclusive, person-first language and respectful communication practices.";
  }
};

// Get explanation for the correct answer
const getCorrectAnswerExplanation = (index: number) => {
  const question = quizQuestions.value[index];
  
  if (question.type === 'matching') {
    return "Each communication support strategy has a specific purpose. Visual timetables help with structure, clear seating plans support concentration, and noise-cancelling headphones reduce sensory input.";
  } else if (question.type === 'true-false') {
    if (question.correctAnswer === 'false') {
      return "Communication needs are highly individual and vary between home and school environments. What works in one context may not work in another.";
    } else {
      return "This statement accurately reflects the reality of communication abilities and the importance of recognizing individual differences.";
    }
  } else {
    // Multiple choice explanations
    const correctOption = question.options?.find(opt => opt.value === question.correctAnswer);
    if (correctOption) {
      return `"${correctOption.text}" is the correct answer because it uses person-first language, respects individual preferences, and promotes inclusive communication practices.`;
    }
    return "The correct answer reflects best practices in inclusive communication and respectful language use.";
  }
};

// Get key learning point for the question
const getLearningPoint = (index: number) => {
  const question = quizQuestions.value[index];
  
  if (question.type === 'matching') {
    return "Understanding the purpose of different communication support strategies helps in providing appropriate accommodations for students with communication needs.";
  } else if (question.type === 'true-false') {
    return "Communication needs are individual and contextual - avoid making assumptions about what works for all students in all situations.";
  } else {
    return "Use person-first language and respect individual preferences when discussing communication needs. Focus on abilities and support rather than limitations.";
  }
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
          <title>SAGE - ${globalThis.document.title}</title>
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

const openAccessibilitySettings = () => {
  // Open accessibility settings modal or navigate to settings page
  console.log('Opening accessibility settings');
  showToast('Accessibility settings coming soon!');
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
</script>

<style scoped>
ion-card {
  margin: 16px;
}

/* Apply scroll margin to card headers for proper anchor positioning */
ion-card-header {
  scroll-margin-top: 100px; /* Account for fixed header */
}

/* Alternative: apply to the card title for more precise targeting */
ion-card-title {
  scroll-margin-top: 100px; /* Account for fixed header */
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

/* Quiz Results Styles */
.question-heading {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--ion-color-dark);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  margin-bottom: 12px;
  line-height: 1.2;
}

.question-status-icon {
  font-size: 1.6rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Learning Tip Styles */
.learning-tip-container {
  margin-top: 4px;
  margin-left: 0;
  margin-bottom: 0;
  width: 100%;
  background-color: #e3f2fd;
  border-radius: 8px;
  padding: 4px;
  border: 1px solid #2196f3;
}

.tip-content {
  background: var(--ion-color-light);
  border-radius: 8px;
  padding: 12px;
  margin: 4px 0;
}

.tip-content h6 {
  color: var(--ion-color-warning);
  margin-bottom: 6px;
  font-weight: 600;
}

.correct-answer-explanation {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--ion-color-light-shade);
}

.correct-answer-explanation h6 {
  color: var(--ion-color-success);
  margin-bottom: 6px;
  font-weight: 600;
}

.learning-point {
  margin-top: 12px;
  padding: 8px;
  background: var(--ion-color-primary-tint);
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
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

/* Matching question styles */
.matching-instructions {
  margin-bottom: 16px;
}

.matching-item {
  margin-bottom: 8px;
  border-radius: 8px;
  --background: var(--ion-color-light);
}

.matching-item ion-label h4 {
  font-weight: 600;
  margin-bottom: 4px;
}

.matching-select {
  min-width: 200px;
  --placeholder-color: var(--ion-color-medium);
  --placeholder-opacity: 0.8;
}

/* Reflective Writing Styles */
.reflection-section {
  margin-bottom: 24px;
  padding: 16px;
  background: rgba(var(--ion-color-light-rgb), 0.3);
  border-radius: 8px;
  border-left: 4px solid var(--ion-color-primary);
}

.reflection-section h4 {
  display: flex;
  align-items: center;
  margin: 0 0 12px 0;
  color: var(--ion-color-primary);
  font-weight: 600;
}

.reflection-section h4 ion-icon {
  margin-right: 8px;
}

.reflection-prompt {
  margin: 0 0 16px 0;
  color: var(--ion-color-medium);
  font-style: italic;
  line-height: 1.5;
}

.reflection-textarea {
  --background: white;
  --border-radius: 8px;
  --padding-start: 12px;
  --padding-end: 12px;
  --padding-top: 12px;
  --padding-bottom: 12px;
  border: 1px solid var(--ion-color-light-shade);
  margin-bottom: 8px;
}

.reflection-textarea:focus-within {
  border-color: var(--ion-color-primary);
  box-shadow: 0 0 0 2px rgba(var(--ion-color-primary-rgb), 0.2);
}

.reflection-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 24px 0;
}

.reflection-actions ion-button {
  margin: 0;
}

.reflection-progress {
  margin-top: 16px;
  padding: 16px;
  background: rgba(var(--ion-color-success-rgb), 0.1);
  border-radius: 8px;
  text-align: center;
}

.reflection-progress ion-progress-bar {
  margin-bottom: 8px;
}

.reflection-progress ion-note {
  font-size: 14px;
  color: var(--ion-color-success);
  font-weight: 500;
}

@media (max-width: 768px) {
  .reflection-section {
    padding: 12px;
    margin-bottom: 16px;
  }
  
  .reflection-actions {
    gap: 8px;
  }
}

/* Print styles */
@media print {
  ion-header, ion-toolbar, ion-buttons, ion-menu-button {
    display: none !important;
  }
  
  ion-content {
    padding: 0 !important;
    margin: 0 !important;
  }
  
  #container {
    padding: 20px !important;
    max-width: 800px !important;
    margin: 0 auto !important;
  }
  
  ion-card {
    break-inside: avoid !important;
    page-break-inside: avoid !important;
    margin: 16px 0 !important;
    border: 1px solid #ddd !important;
    border-radius: 8px !important;
    padding: 16px !important;
    background: white !important;
    box-shadow: none !important;
  }
  
  ion-card-header {
    border-bottom: 1px solid #eee !important;
    padding-bottom: 8px !important;
    margin-bottom: 16px !important;
  }
  
  ion-card-title {
    font-size: 18px !important;
    font-weight: bold !important;
    color: #2c3e50 !important;
    margin: 0 !important;
  }
  
  ion-card-subtitle {
    color: #666 !important;
    font-size: 14px !important;
    margin: 4px 0 0 0 !important;
  }
  
  .reflection-section {
    break-inside: avoid !important;
    page-break-inside: avoid !important;
    background: #f8f9fa !important;
    border-left: 4px solid #007bff !important;
    padding: 16px !important;
    margin: 16px 0 !important;
    border-radius: 4px !important;
  }
  
  .reflection-textarea {
    background: white !important;
    border: 1px solid #ddd !important;
    border-radius: 4px !important;
    padding: 12px !important;
    min-height: 100px !important;
    width: 100% !important;
    font-family: Arial, sans-serif !important;
  }
  
  ion-accordion-group {
    margin: 16px 0 !important;
  }
  
  ion-accordion ion-item[slot="header"] {
    background: #f8f9fa !important;
    padding: 12px !important;
    border: 1px solid #ddd !important;
    border-radius: 4px !important;
    margin-bottom: 4px !important;
  }
  
  ion-accordion .ion-padding {
    padding: 12px !important;
    border: 1px solid #ddd !important;
    border-top: none !important;
    border-radius: 0 0 4px 4px !important;
    background: white !important;
  }
  
  ion-segment {
    display: flex !important;
    background: #f8f9fa !important;
    border-radius: 8px !important;
    padding: 4px !important;
    margin: 16px 0 !important;
  }
  
  ion-segment-button {
    flex: 1 !important;
    text-align: center !important;
    padding: 8px !important;
    border: none !important;
    background: transparent !important;
    border-radius: 4px !important;
  }
  
  ion-segment-button.ion-selected {
    background: #007bff !important;
    color: white !important;
  }
  
  ion-list {
    list-style: none !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  
  ion-item {
    padding: 8px 0 !important;
    border-bottom: 1px solid #f0f0f0 !important;
    background: transparent !important;
  }
  
  ion-item:last-child {
    border-bottom: none !important;
  }
  
  ion-label {
    margin: 0 !important;
    color: #333 !important;
  }
  
  ion-note {
    color: #666 !important;
    font-size: 12px !important;
  }
  
  ion-chip {
    display: inline-block !important;
    background: #e3f2fd !important;
    color: #1976d2 !important;
    padding: 4px 8px !important;
    border-radius: 16px !important;
    font-size: 12px !important;
    margin: 2px !important;
  }
  
  ion-progress-bar {
    background: #e9ecef !important;
    height: 8px !important;
    border-radius: 4px !important;
    overflow: hidden !important;
    margin: 8px 0 !important;
  }
  
  ion-progress-bar::part(progress) {
    background: #28a745 !important;
  }
  
  ion-grid {
    display: grid !important;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)) !important;
    gap: 16px !important;
    margin: 16px 0 !important;
  }
  
  ion-col {
    padding: 0 !important;
  }
  
  ion-icon {
    display: none !important;
  }
  
  ion-button {
    display: none !important;
  }
  
  ion-fab {
    display: none !important;
  }

  /* Quiz Results Styles */
  .question-result-item {
    margin-bottom: 0;
  }

  .question-content {
    border-bottom: 1px solid var(--ion-color-light-shade);
    padding-bottom: 16px;
  }

  .question-item {
    --border-style: none;
  }

  .question-heading {
    font-size: 1.5rem !important;
    font-weight: 800 !important;
    color: var(--ion-color-dark) !important;
    display: flex !important;
    align-items: center !important;
    justify-content: flex-start !important;
    gap: 12px !important;
    margin-bottom: 12px !important;
    line-height: 1.2 !important;
  }

  .question-status-icon {
    font-size: 1.8rem !important;
    flex-shrink: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }

  .learning-tip-container {
    margin-top: 8px;
    margin-left: 16px;
    margin-bottom: 0;
    width: calc(100% - 32px);
  }

  .question-divider {
    height: 1px;
    background-color: var(--ion-color-light-shade);
    margin: 16px 0;
  }

  .learning-tip-header {
    --background: linear-gradient(135deg, #ff6b35, #f7931e);
    --color: white;
    border-radius: 12px;
    margin: 8px 0;
    box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
    border: 2px solid #ff6b35;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
  }

  .learning-tip-header:hover {
    --background: linear-gradient(135deg, #ff5722, #ff9800);
    box-shadow: 0 6px 16px rgba(255, 107, 53, 0.4);
    transform: translateY(-2px);
  }

.learning-tip-container {
  margin-top: 8px !important;
  margin-left: 16px !important;
  margin-bottom: 0 !important;
  width: calc(100% - 32px) !important;
  background-color: #e3f2fd !important;
  border-radius: 8px !important;
  padding: 8px !important;
  border: 1px solid #2196f3 !important;
}

/* Target the learning tip container specifically within ion-label */
ion-label .learning-tip-container {
  background-color: #e3f2fd !important;
  border: 1px solid #2196f3 !important;
  border-radius: 8px !important;
  padding: 8px !important;
  margin-top: 8px !important;
  margin-left: 16px !important;
  margin-bottom: 0 !important;
  width: calc(100% - 32px) !important;
}

  .tip-content {
    background: var(--ion-color-light);
    border-radius: 8px;
    padding: 16px;
    margin: 8px 0;
  }

  .tip-content h6 {
    color: var(--ion-color-warning);
    margin-bottom: 8px;
    font-weight: 600;
  }

  .correct-answer-explanation {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid var(--ion-color-light-shade);
  }

  .correct-answer-explanation h6 {
    color: var(--ion-color-success);
    margin-bottom: 8px;
    font-weight: 600;
  }

  .learning-point {
    margin-top: 16px;
    padding: 12px;
    background: var(--ion-color-primary-tint);
    border-radius: 6px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .learning-point ion-icon {
    color: var(--ion-color-primary);
    font-size: 18px;
  }

  .learning-point span {
    color: var(--ion-color-primary);
    font-size: 14px;
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