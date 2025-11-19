<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ getPageTitle() }}</ion-title>
        <ion-buttons slot="end">
          <span style="font-size: 14px; color: var(--ion-color-medium); margin-right: 8px;">v0.0.15</span>
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
          <!-- Communication page previously rendered the quiz here; it's now shown in the Knowledge Check card to keep section order consistent -->
          <div v-if="false">
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
                      
                                              <!-- Multi True/False Questions -->
                        <div v-else-if="quizQuestions[currentQuizQuestion] && quizQuestions[currentQuizQuestion].type === 'multi-true-false'">
                          <div class="multi-true-false-instructions">
                            <ion-note color="primary">
                              <strong>Instructions:</strong> Answer each statement as True or False using the dropdown menus.
                            </ion-note>
                          </div>
                          <ion-list>
                            <ion-item v-for="(subQ, subIndex) in (quizQuestions[currentQuizQuestion].subQuestions || [])" :key="subQ.id" class="multi-true-false-item">
                              <ion-label>
                                <h4><strong>{{ getQuestionLetter(subIndex) }})</strong> {{ subQ.text }}</h4>
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
                        
                                                <!-- Fill-in-the-Blank Questions -->
                        <div v-else-if="quizQuestions[currentQuizQuestion] && quizQuestions[currentQuizQuestion].type === 'fill-in-blank'">
                          <div class="fill-in-blank-instructions">
                            <ion-note color="primary">
                              <strong>Instructions:</strong> Complete each sentence by selecting the most appropriate word or phrase from the dropdown menus.
                            </ion-note>
                          </div>
                          <ion-list>
                            <ion-item v-for="(sentence, sentenceIndex) in (quizQuestions[currentQuizQuestion].sentences || [])" :key="sentence.id" class="fill-in-blank-item">
                              <ion-label>
                                <h4>
                                  <strong>{{ getQuestionLetter(sentenceIndex) }})</strong> 
                                  <span class="fill-in-blank-text">{{ sentence.textBefore }}</span>
                                  <ion-select 
                                    v-model="matchingAnswers[sentence.id]" 
                                    interface="popover" 
                                    placeholder="Select answer"
                                    :value="matchingAnswers[sentence.id]"
                                    class="fill-in-blank-select"
                                  >
                                    <ion-select-option value="">Select answer</ion-select-option>
                                    <ion-select-option 
                                      v-for="option in sentence.options" 
                                      :key="option" 
                                      :value="option"
                                    >
                                      {{ option }}
                                    </ion-select-option>
                                  </ion-select>
                                  <span class="fill-in-blank-text">{{ sentence.textAfter }}</span>
                                </h4>
                              </ion-label>
                            </ion-item>
                          </ion-list>
                        </div>
                        
                                                <!-- Select All That Apply Questions -->
                        <div v-if="quizQuestions[currentQuizQuestion] && quizQuestions[currentQuizQuestion].type === 'select-all'">
                          <!-- Simple test to see if template renders -->
                          <ion-note color="danger" style="font-size: 20px; font-weight: bold;">
                            🎯 SELECT-ALL TEMPLATE IS RENDERING! 🎯
                          </ion-note>
                          
                          <div class="select-all-instructions">
                            <ion-note color="primary">
                              <strong>Instructions:</strong> Select all options that apply. You can either select "All of these" OR select all the individual options.
                            </ion-note>
                          </div>
                          <!-- Debug info -->
                          <ion-note color="warning">
                            Debug: Question type = {{ quizQuestions[currentQuizQuestion]?.type }}, 
                            Options length = {{ quizQuestions[currentQuizQuestion]?.options?.length }},
                            Current question index = {{ currentQuizQuestion }}
                          </ion-note>
                          <ion-note color="warning">
                            Full question object: {{ JSON.stringify(quizQuestions[currentQuizQuestion]) }}
                          </ion-note>
                          <ion-note color="warning">
                            Template condition met: YES, rendering select-all template
                          </ion-note>
                          <ion-list>
                            <!-- Debug: Show options being iterated -->
                            <ion-note color="warning">
                              Options to iterate: {{ quizQuestions[currentQuizQuestion].options?.length }} options
                            </ion-note>
                            <ion-item v-for="option in quizQuestions[currentQuizQuestion].options" :key="option.value" class="select-all-item">
                              <!-- Debug: Show each option -->
                              <ion-note color="warning" slot="start">
                                Option: {{ option.value }} - {{ option.text }}
                              </ion-note>
                              <!-- Test with regular HTML checkbox first -->
                              <input 
                                type="checkbox" 
                                :value="option.value" 
                                v-model="checkboxAnswers[option.value]"
                                style="margin-right: 10px;"
                              />
                              <ion-label>
                                <h4><strong>{{ option.value }})</strong> {{ option.text }}</h4>
                              </ion-label>
                            </ion-item>
                          </ion-list>
                        </div>
                        
                        <!-- Matching Questions -->
                      <div v-else-if="quizQuestions[currentQuizQuestion] && quizQuestions[currentQuizQuestion].type === 'matching'">
                        <div class="matching-instructions">
                          <ion-note color="primary">
                            <strong>Instructions:</strong> Match each communication support strategy (a, b, c) with its correct purpose (a, b, c) using the dropdown menus.
                          </ion-note>
                        </div>
                        <ion-list>
                                                  <ion-item v-for="(strategy, strategyIndex) in (quizQuestions[currentQuizQuestion].strategies || [])" :key="strategy.id" class="matching-item">
                          <ion-label>
                            <h4><strong>{{ getQuestionLetter(strategyIndex) }})</strong> {{ strategy.text }}</h4>
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
                                v-for="(purpose, purposeIndex) in (quizQuestions[currentQuizQuestion].purposes || [])" 
                                :key="purpose.id" 
                                :value="purpose.id"
                              >
                                {{ getQuestionLetter(purposeIndex) }}) {{ purpose.text }}
                              </ion-select-option>
                            </ion-select>
                          </ion-item>
                        </ion-list>
                      </div>
                      
                      <div class="ion-padding-top">
                        <ion-button 
                          expand="block" 
                          color="primary"
                          @click="nextQuizQuestion" 
                          :disabled="!canProceedToNextQuestion"
                        >
                          {{ currentQuizQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question' }}
                        </ion-button>
                        <!-- Debug info -->
                        <div class="ion-padding-top">
                          <ion-note>Debug: allQuestionsAnswered = {{ allQuestionsAnswered }}, canProceedToNextQuestion = {{ canProceedToNextQuestion }}, disabled = {{ !canProceedToNextQuestion }}</ion-note>
                        </div>
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
                                
                                <!-- Learning Tip for All Answers - appears inside the ion-label -->
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
      
      <!-- Show shared content (language, understanding, challenges, enabling, resources, case study, reflective tasks) for all pages -->
      <div>
            
            <!-- Key Considerations Card - Controlled by pageSections -->
            <div v-if="pageSections.showKeyConsiderations">
              <ion-card>
                <ion-card-content>
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
                </ion-card-content>
              </ion-card>
            </div>

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
                <!-- For hearing-needs page: Green block first, then red block -->
                <template v-if="route.params.id === 'hearing-needs'">
                  <ion-accordion value="words-to-use">
                    <ion-item slot="header" color="success">
                      <ion-icon :icon="checkmarkCircle" slot="start" color="success"></ion-icon>
                      <ion-label>Respectful language for referring to individuals with hearing difficulties</ion-label>
                    </ion-item>
                    <div class="ion-padding" slot="content">
                      <ion-list>
                        <ion-item v-for="(word, index) in disabilityContent.language.wordsToUse" :key="index">
                          <ion-icon :icon="checkmark" slot="start" color="success"></ion-icon>
                          <ion-label>
                            <h4>{{ word.term }}<template v-if="word.explanation"> - {{ word.explanation }}</template></h4>
                          </ion-label>
                        </ion-item>
                      </ion-list>
                    </div>
                  </ion-accordion>

                  <ion-accordion value="words-to-avoid">
                    <ion-item slot="header" color="danger">
                      <ion-icon :icon="closeCircle" slot="start" color="danger"></ion-icon>
                      <ion-label>Language to be avoided when referring to individuals with hearing difficulties</ion-label>
                    </ion-item>
                    <div class="ion-padding" slot="content">
                      <ion-list>
                        <ion-item v-for="(word, index) in (disabilityContent as any).language.wordsToAvoid" :key="index">
                          <ion-icon :icon="close" slot="start" color="danger"></ion-icon>
                          <ion-label>
                            <h4>{{ word.term }}<template v-if="word.reason"> - {{ word.reason }}</template></h4>
                          </ion-label>
                        </ion-item>
                      </ion-list>
                    </div>
                  </ion-accordion>
                </template>

                <!-- For communication page: Green block first, then red block with generic labels -->
                <template v-else-if="route.params.id === 'communication'">
                  <ion-accordion value="words-to-use">
                    <ion-item slot="header" color="success">
                      <ion-icon :icon="checkmarkCircle" slot="start" color="success"></ion-icon>
                      <ion-label>Respectful language</ion-label>
                    </ion-item>
                    <div class="ion-padding" slot="content">
                      <ion-list>
                        <ion-item v-for="(word, index) in disabilityContent.language.wordsToUse" :key="index">
                          <ion-icon :icon="checkmark" slot="start" color="success"></ion-icon>
                          <ion-label>
                            <h4>{{ word.term }}<template v-if="word.explanation"> - {{ word.explanation }}</template></h4>
                          </ion-label>
                        </ion-item>
                      </ion-list>
                    </div>
                  </ion-accordion>

                  <ion-accordion value="words-to-avoid">
                    <ion-item slot="header" color="danger">
                      <ion-icon :icon="closeCircle" slot="start" color="danger"></ion-icon>
                      <ion-label>Language to avoid</ion-label>
                    </ion-item>
                    <div class="ion-padding" slot="content">
                      <ion-list>
                        <ion-item v-for="(word, index) in (disabilityContent as any).language.wordsToAvoid" :key="index">
                          <ion-icon :icon="close" slot="start" color="danger"></ion-icon>
                          <ion-label>
                            <h4>{{ word.term }}<template v-if="word.reason"> - {{ word.reason }}</template></h4>
                          </ion-label>
                        </ion-item>
                      </ion-list>
                    </div>
                  </ion-accordion>
                </template>

                <!-- For other pages: Red block first, then green block (original order) -->
                <template v-else>
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
                            <h4>{{ word.term }}<template v-if="word.reason"> - {{ word.reason }}</template></h4>
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
                            <h4>{{ word.term }}<template v-if="word.explanation"> - {{ word.explanation }}</template></h4>
                          </ion-label>
                        </ion-item>
                      </ion-list>
                    </div>
                  </ion-accordion>
                </template>
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
                  <h3 v-if="route.params.id === 'hearing-needs'">Some questions and prompts to support an understanding of the strengths of the learner from their own perspective:</h3>
                  <h3 v-else>Understanding Strengths</h3>
                  <ion-list>
                    <ion-item v-for="(question, index) in disabilityContent.understanding.strengths" :key="index">
                      <ion-icon :icon="star" slot="start" color="warning"></ion-icon>
                      <ion-label>{{ question }}</ion-label>
                    </ion-item>
                  </ion-list>
                </div>

                <div v-else-if="selectedUnderstandingSection === 'challenges'">
                  <h3 v-if="route.params.id === 'hearing-needs'">Some questions and prompts to support an understanding of the challenges the learner has encountered from their own perspective</h3>
                  <h3 v-else>Understanding Challenges</h3>
                  <ion-list>
                    <ion-item v-for="(question, index) in disabilityContent.understanding.challenges" :key="index">
                      <ion-icon :icon="helpCircle" slot="start" color="secondary"></ion-icon>
                      <ion-label>{{ question }}</ion-label>
                    </ion-item>
                  </ion-list>
                </div>

                <div v-else-if="selectedUnderstandingSection === 'strategies'">
                  <h3 v-if="route.params.id === 'hearing-needs'">Some questions and prompts to support an understanding of strategies that will support learning</h3>
                  <h3 v-else>Support Strategies</h3>
                  <ion-list>
                    <ion-item v-for="(question, index) in disabilityContent.understanding.strategies" :key="index">
                      <ion-icon :icon="bulb" slot="start" color="primary"></ion-icon>
                      <ion-label>{{ question }}</ion-label>
                    </ion-item>
                  </ion-list>
                </div>

                <div v-else-if="selectedUnderstandingSection === 'advocacy'">
                  <h3 v-if="route.params.id === 'hearing-needs'">Some statements which will indicate that the learner should advocate for what will help her</h3>
                  <h3 v-else>Supporting Self-Advocacy</h3>
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
                  <ion-item slot="header" color="success">
                    <ion-icon :icon="people" slot="start" color="success"></ion-icon>
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
                  <ion-item slot="header" color="danger">
                    <ion-icon :icon="document" slot="start" color="danger"></ion-icon>
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
              <!-- Custom content for Communication page -->
              <div v-if="route.params.id === 'communication'">
                <div class="case-study-text">
                  <p>
                    Chiedza is a learner with communication and social interaction needs. She has limited
                    verbal communication skills and struggles to interact with her peers in the class. She
                    can struggle to participate in group discussions. Chiedza also has challenges in
                    requesting help and does not always fully engage in learning activities.
                  </p>

                  <p>
                    The educator uses varied strategies to improve Chiedza’s communication. These strategies
                    include:
                  </p>
                  <ul>
                    <li>
                      <strong>Structured communication:</strong> the educator uses games and naming objects
                      familiar to her. Visual cue cards are also used (“I want to….”, “May I …..”, “May you
                      help me …..”). This improves her ability to make sentences.
                    </li>
                    <li>
                      <strong>Story telling:</strong> these are used to prepare Chiedza for new experiences
                      (sporting activities, trips).
                    </li>
                    <li>
                      <strong>Visual schedules:</strong> the educator sets aside 10 minutes daily for
                      picture displays to reduce anxiety and improve transitions.
                    </li>
                    <li>
                      <strong>Sensory breaks:</strong> scheduled quiet time in a sensory-friendly space help
                      regulate emotions.
                    </li>
                    <li>
                      <strong>Peer buddies:</strong> the educator identifies a classmate who is close to
                      Chiedza and always supportive, and uses role play with the peer in areas such as
                      greetings, requests and correct responses.
                    </li>
                    <li>
                      <strong>Task analysis:</strong> breaking down tasks into small steps with visual cues
                      and prompts.
                    </li>
                    <li>
                      <strong>Positive reinforcement:</strong> reward system for completing tasks and
                      engaging in group activities.
                    </li>
                    <li>
                      <strong>Parental involvement:</strong> the educator collaborates with the parent in
                      supporting Chiedza. The educator trains the parent how to use pictures and cards at
                      home. This reinforces what the child learns at school.
                    </li>
                  </ul>

                  <h4 class="case-study-subheading">Questions</h4>
                  <ul>
                    <li>
                      Chiedza has challenges in requesting help. Which of the strategies listed could be
                      developed to support her to ask for help?
                    </li>
                    <li>
                      Which of the strategies above could be developed to support Chiedza to be more engaged
                      in lessons?
                    </li>
                    <li>
                      Which of the eight strategies above do you already use? Are there any new strategies
                      you can use in your classroom? Are there any strategies you could give greater
                      emphasis to?
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
                      Have you thought about finding out what Chiedza is interested in and using that to
                      develop learning activities?
                    </li>
                    <li>
                      Have you thought about how peer buddies and positive reinforcement could be used to
                      support Chiedza to ask for help?
                    </li>
                    <li>
                      Could task analysis or parental involvement help Chiedza to be more engaged in
                      lessons?
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Default case study layout for other pages -->
              <div v-else class="case-study">
                <h3>{{ disabilityContent.caseStudy.title }}</h3>
                <p>{{ disabilityContent.caseStudy.scenario }}</p>
                
                <ion-list>
                  <ion-item v-for="(detail, index) in disabilityContent.caseStudy.details" :key="index">
                    <ion-icon :icon="informationCircle" slot="start" color="primary"></ion-icon>
                    <ion-label>{{ detail }}</ion-label>
                  </ion-item>
                </ion-list>

                <!-- Only show Key Learning Points for pages other than hearing-needs -->
                <div v-if="route.params.id !== 'hearing-needs'">
                  <h4>Key Learning Points</h4>
                  <ion-chip v-for="(point, index) in disabilityContent.caseStudy.learningPoints" :key="index" color="success">
                    <ion-icon :icon="checkmark"></ion-icon>
                    <ion-label>{{ point }}</ion-label>
                  </ion-chip>
                </div>
              </div>
            </ion-card-content>
          </ion-card>

          <!-- 8. Reflective Task -->
          <ion-card id="reflective-task">
            <ion-card-header>
              <ion-card-title>Reflective task</ion-card-title>
              <ion-card-subtitle>Deepen Your Learning Through Reflection</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <!-- Reflection Prompts -->
              <div class="reflection-section">
                <p 
                  class="reflection-prompt"
                  v-if="route.params.id === 'communication'"
                >
                  1) How do your classroom routines support or limit different modes of communication?
                </p>
                <p 
                  class="reflection-prompt"
                  v-else-if="route.params.id === 'cognitive-intellectual-needs'"
                >
                  1) Choose three different tasks that you ask learners to do on everyday basis. Break each task into small steps.
                </p>
                <p 
                  class="reflection-prompt"
                  v-else
                >
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
                
                <!-- Prompt Accordion for Case Study / Question 1 Reflection -->
                <ion-accordion-group>
                  <ion-accordion value="case-study-prompts">
                    <ion-item slot="header" color="light">
                      <ion-icon :icon="bulb" slot="start" color="warning"></ion-icon>
                      <ion-label>Think about...</ion-label>
                    </ion-item>
                    <div class="ion-padding" slot="content">
                      <!-- Communication page: Question 1 think box -->
                      <ion-list v-if="route.params.id === 'communication'">
                        <ion-item>
                          <ion-icon :icon="arrowForward" slot="start" color="primary"></ion-icon>
                          <ion-label>Can students engage with your instructions in multiple ways to show their understanding?</ion-label>
                        </ion-item>
                        <ion-item>
                          <ion-icon :icon="arrowForward" slot="start" color="primary"></ion-icon>
                          <ion-label>Do all students feel safe to communicate via their preferred mode?</ion-label>
                        </ion-item>
                        <ion-item>
                          <ion-icon :icon="arrowForward" slot="start" color="primary"></ion-icon>
                          <ion-label>Do you model several ways to communicate?</ion-label>
                        </ion-item>
                        <ion-item>
                          <ion-icon :icon="arrowForward" slot="start" color="primary"></ion-icon>
                          <ion-label>How often do you adjust your routines based on students’ preferences?</ion-label>
                        </ion-item>
                      </ion-list>

                      <!-- Cognitive & intellectual needs: Question 1 think box -->
                      <ion-list v-else-if="route.params.id === 'cognitive-intellectual-needs'">
                        <ion-item>
                          <ion-icon :icon="arrowForward" slot="start" color="primary"></ion-icon>
                          <ion-label>Could you add a picture or an icon to illustrate each step?</ion-label>
                        </ion-item>
                        <ion-item>
                          <ion-icon :icon="arrowForward" slot="start" color="primary"></ion-icon>
                          <ion-label>How could the learner be sure that they have completed each step, for example, by ticking a box or crossing out a step?</ion-label>
                        </ion-item>
                        <ion-item>
                          <ion-icon :icon="arrowForward" slot="start" color="primary"></ion-icon>
                          <ion-label>How can you celebrate success with the learner?</ion-label>
                        </ion-item>
                      </ion-list>

                      <!-- Hearing / visual pages: original think box -->
                      <ion-list v-else>
                        <ion-item>
                          <ion-icon :icon="arrowForward" slot="start" color="primary"></ion-icon>
                          <ion-label v-if="route.params.id === 'hearing-needs'">How could you adapt the hearing supports mentioned in the case study for your own students?</ion-label>
                          <ion-label v-else>How could you adapt the visual supports mentioned in the case study for your own students?</ion-label>
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
                <p 
                  class="reflection-prompt" 
                  v-if="route.params.id === 'communication'"
                >
                  2) Identify one communication method other than speaking. How could you teach a group of children, including those who speak confidently, to communicate via this mode? How might this support all students’ learning?
                </p>
                <p 
                  class="reflection-prompt" 
                  v-else-if="route.params.id === 'cognitive-intellectual-needs'"
                >
                  2) Consider two different mathematical calculations. Select one concrete resource and one visual image that could be used to aid each calculation.
                </p>
                <p 
                  class="reflection-prompt" 
                  v-else-if="route.params.id === 'hearing-needs'"
                >
                  Thinking about the lesson you taught recently, how might it be made more accessible to learners with hearing needs?
                </p>
                <p 
                  class="reflection-prompt" 
                  v-else
                >
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
                
                <!-- Prompt Accordion for Practice / Question 2 Reflection -->
                <ion-accordion-group>
                  <ion-accordion value="practice-prompts">
                    <ion-item slot="header" color="light">
                      <ion-icon :icon="bulb" slot="start" color="warning"></ion-icon>
                      <ion-label>Think about...</ion-label>
                    </ion-item>
                    <div class="ion-padding" slot="content">
                      <!-- Communication page: Question 2 think box -->
                      <ion-list v-if="route.params.id === 'communication'">
                        <ion-item>
                          <ion-icon :icon="arrowForward" slot="start" color="secondary"></ion-icon>
                          <ion-label>What strategies would you use to teach students to communicate via alternative methods? Perhaps using visual cues?</ion-label>
                        </ion-item>
                        <ion-item>
                          <ion-icon :icon="arrowForward" slot="start" color="secondary"></ion-icon>
                          <ion-label>Have you considered how integrating this way of communicating into group work or discussions could give confident speakers new ways to listen, interpret and respond more thoughtfully?</ion-label>
                        </ion-item>
                      </ion-list>

                      <!-- Cognitive & intellectual needs: Question 2 think box -->
                      <ion-list v-else-if="route.params.id === 'cognitive-intellectual-needs'">
                        <ion-item>
                          <ion-icon :icon="arrowForward" slot="start" color="secondary"></ion-icon>
                          <ion-label>Could you add a picture or an icon to prompt the learner to use a resource or an image?</ion-label>
                        </ion-item>
                        <ion-item>
                          <ion-icon :icon="arrowForward" slot="start" color="secondary"></ion-icon>
                          <ion-label>How could the learner be sure that they have answered correctly, for example, by checking the answer using a different method or resource or image?</ion-label>
                        </ion-item>
                        <ion-item>
                          <ion-icon :icon="arrowForward" slot="start" color="secondary"></ion-icon>
                          <ion-label>How can you celebrate success with the learner?</ion-label>
                        </ion-item>
                      </ion-list>

                      <!-- Hearing / visual pages: original think box -->
                      <ion-list v-else-if="route.params.id === 'hearing-needs'">
                        <ion-item>
                          <ion-icon :icon="arrowForward" slot="start" color="secondary"></ion-icon>
                          <ion-label>Have you considered the use of picture prompt?</ion-label>
                        </ion-item>
                        <ion-item>
                          <ion-icon :icon="arrowForward" slot="start" color="secondary"></ion-icon>
                          <ion-label>Could you use technology to support learners with hearing needs? E.G captioning on videos, speech to text software?</ion-label>
                        </ion-item>
                        <ion-item>
                          <ion-icon :icon="arrowForward" slot="start" color="secondary"></ion-icon>
                          <ion-label>How could the learning environment be improved? Consider background noise, seating positions.</ion-label>
                        </ion-item>
                      </ion-list>
                      <ion-list v-else>
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
          <ion-card id="knowledge-check" v-if="pageSections.showQuiz">
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
                    
                    <!-- Multi True/False Questions -->
                    <div v-else-if="quizQuestions[currentQuizQuestion].type === 'multi-true-false'">
                      <div class="multi-true-false-instructions">
                        <ion-note color="primary">
                          <strong>Instructions:</strong> Answer each statement as True or False using the dropdown menus.
                        </ion-note>
                      </div>
                      <ion-list>
                        <ion-item v-for="(subQ, subIndex) in quizQuestions[currentQuizQuestion].subQuestions" :key="subQ.id" class="multi-true-false-item">
                          <ion-label>
                            <h4><strong>{{ getQuestionLetter(subIndex) }})</strong> {{ subQ.text }}</h4>
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
                    
                    <!-- Fill-in-the-Blank Questions -->
                    <div v-else-if="quizQuestions[currentQuizQuestion].type === 'fill-in-blank'">
                      <div class="fill-in-blank-instructions">
                        <ion-note color="primary">
                          <strong>Instructions:</strong> Complete each sentence by selecting the most appropriate word or phrase from the dropdown menus.
                        </ion-note>
                      </div>
                      <ion-list>
                        <ion-item v-for="(sentence, sentenceIndex) in quizQuestions[currentQuizQuestion].sentences" :key="sentence.id" class="fill-in-blank-item">
                          <ion-label>
                            <h4>
                              <strong>{{ getQuestionLetter(sentenceIndex) }})</strong> 
                              <span class="fill-in-blank-text">{{ sentence.textBefore }}</span>
                              <ion-select 
                                v-model="matchingAnswers[sentence.id]" 
                                interface="popover" 
                                placeholder="Select answer"
                                :value="matchingAnswers[sentence.id]"
                                class="fill-in-blank-select"
                              >
                                <ion-select-option value="">Select answer</ion-select-option>
                                <ion-select-option 
                                  v-for="option in sentence.options" 
                                  :key="option" 
                                  :value="option"
                                >
                                  {{ option }}
                                </ion-select-option>
                              </ion-select>
                              <span class="fill-in-blank-text">{{ sentence.textAfter }}</span>
                            </h4>
                          </ion-label>
                        </ion-item>
                      </ion-list>
                    </div>
                    
                    <!-- Matching Questions -->
                  <div v-else-if="quizQuestions[currentQuizQuestion].type === 'matching'">
                    <div class="matching-instructions">
                      <ion-note color="primary">
                        <strong>Instructions:</strong> Match each 
                        <span v-if="route.params.id === 'hearing-needs'">hearing support strategy</span>
                        <span v-else>communication support strategy</span>
                        (a, b, c) with its correct purpose (a, b, c) using the dropdown menus.
                      </ion-note>
                    </div>
                      <ion-list>
                        <ion-item v-for="(strategy, strategyIndex) in quizQuestions[currentQuizQuestion].strategies" :key="strategy.id" class="matching-item">
                          <ion-label>
                            <h4><strong>{{ getQuestionLetter(strategyIndex) }})</strong> {{ strategy.text }}</h4>
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
                              v-for="(purpose, purposeIndex) in quizQuestions[currentQuizQuestion].purposes" 
                              :key="purpose.id" 
                              :value="purpose.id"
                            >
                              {{ getQuestionLetter(purposeIndex) }}) {{ purpose.text }}
                            </ion-select-option>
                          </ion-select>
                        </ion-item>
                      </ion-list>
                    </div>
                    
                    <!-- Select All That Apply Questions -->
                    <div v-else-if="quizQuestions[currentQuizQuestion] && quizQuestions[currentQuizQuestion].type === 'select-all'">
                      <div class="select-all-instructions">
                        <ion-note color="primary">
                          <strong>Instructions:</strong> Select all options that apply. You can either select "All of these" OR select all the individual options.
                        </ion-note>
                      </div>
                      <ion-list>
                        <ion-item v-for="option in quizQuestions[currentQuizQuestion].options" :key="option.value" class="select-all-item">
                          <!-- Test with regular HTML checkbox first -->
                          <input 
                            type="checkbox" 
                            :value="option.value" 
                            v-model="checkboxAnswers[option.value]"
                            style="margin-right: 10px;"
                          />
                          <ion-label>
                            <h4><strong>{{ option.value }})</strong> {{ option.text }}</h4>
                          </ion-label>
                        </ion-item>
                      </ion-list>
                    </div>
                    
                    <div class="ion-padding-top">
                      <ion-button 
                        expand="block" 
                        color="primary"
                        @click="nextQuizQuestion" 
                        :disabled="!canProceedToNextQuestion"
                      >
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
                              
                                                            <!-- Learning Tip for All Answers - appears inside the ion-label -->
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
// @ts-nocheck
import { useRoute } from 'vue-router';
import { computed, ref, onMounted, watch } from 'vue';
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
import { consumePendingAnchor } from '@/utils/anchorScroll';
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
  earOutline,
  chatbubbleOutline,
  save,
  trash,  arrowForward,
  settings,
  printOutline,
  accessibilityOutline
} from 'ionicons/icons';

const route = useRoute();

// Quiz question interfaces
interface BaseQuestion {
  question: string;
  type?: string;
}

interface MultipleChoiceQuestion extends BaseQuestion {
  options: { value: string; text: string }[];
  correctAnswer: string;
}

interface MultiTrueFalseQuestion extends BaseQuestion {
  type: 'multi-true-false';
  subQuestions: { id: string; text: string; correctAnswer: string; explanation: string }[];
}

interface FillInBlankQuestion extends BaseQuestion {
  type: 'fill-in-blank';
  sentences: { id: string; textBefore: string; textAfter: string; correctAnswer: string; options: string[] }[];
}

interface MatchingQuestion extends BaseQuestion {
  type: 'matching';
  strategies: { id: string; text: string }[];
  purposes: { id: string; text: string }[];
  correctAnswers: { [key: string]: string };
}

interface SelectAllQuestion extends BaseQuestion {
  type: 'select-all';
  options: { value: string; text: string }[];
  correctAnswers: string[];
  alternativeCorrectAnswers: string[];
}

interface TrueFalseQuestion extends BaseQuestion {
  type: 'true-false';
  options: { value: string; text: string }[];
  correctAnswer: string;
}

type QuizQuestion = MultipleChoiceQuestion | MultiTrueFalseQuestion | FillInBlankQuestion | MatchingQuestion | SelectAllQuestion | TrueFalseQuestion;

// Helper function to convert question index to letter (0 = a, 1 = b, etc.)
const getQuestionLetter = (index: number): string => {
  return String.fromCharCode(97 + index); // 97 is ASCII for 'a'
};

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
  console.log('[PageAnchor] DisabilityPage mounted', { path: route.path, id: route.params.id });
  console.log('DisabilityPage mounted, loading reflections...');
  
  // Clear any existing hearing-needs quiz data to ensure fresh start
  const pageId = route.params.id as string;
  if (pageId === 'hearing-needs') {
    ProgressService.resetQuizCompletion(pageId);
    console.log('Cleared existing hearing-needs quiz data');
  }
  
  // Load existing reflection versions from localStorage
  loadExistingReflectionVersions();
  console.log('Reflection loading completed');
  
  // Load quiz completion state from localStorage
  loadQuizState();
  console.log('Quiz state loading completed');
  
  // Debug: Log quiz questions for hearing-needs page
  if (pageId === 'hearing-needs') {
    setTimeout(() => {
      console.log('Quiz questions on mount:', quizQuestions.value);
      console.log('Question 4 details:', quizQuestions.value[3]);
      console.log('Question 4 type:', quizQuestions.value[3]?.type);
      console.log('Question 4 options:', quizQuestions.value[3]?.options);
    }, 100);
  }
  
  void consumePendingAnchor(route.path, { maxAttempts: 80 }).then((didScroll) => {
    console.log('[PageAnchor] DisabilityPage consume result', { didScroll, pageId });
  });
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
const checkboxAnswers = ref<{ [key: string]: boolean }>({});

// Case Study note state for Communication page
const caseStudyNote = ref('');

const autoSaveCaseStudyNote = () => {
  const pageId = route.params.id as string;
  if (pageId !== 'communication') return;
  try {
    localStorage.setItem(`sage-cs-${pageId}-current`, JSON.stringify({ text: caseStudyNote.value }));
    ProgressService.saveCaseStudyCompletion(pageId);
  } catch {}
};

const saveCaseStudyNote = () => {
  const pageId = route.params.id as string;
  if (pageId !== 'communication') return;
  try {
    localStorage.setItem(`sage-cs-${pageId}-current`, JSON.stringify({ text: caseStudyNote.value }));
  } finally {
    ProgressService.saveCaseStudyCompletion(pageId);
    toastController
      .create({
        message: 'Case study note saved!',
        duration: 2000,
        position: 'bottom',
        color: 'success'
      })
      .then((t) => t.present());
  }
};

const exportCaseStudyNote = () => {
  const pageId = route.params.id as string;
  if (pageId !== 'communication') return;
  const title = disabilityContent.value?.title || 'Case Study';
  const content = `Case Study Note - ${title}\n\n${caseStudyNote.value || 'No notes written yet.'}`;
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = window.document.createElement('a');
  a.href = url;
  a.download = `case-study-${pageId}.txt`;
  window.document.body.appendChild(a);
  a.click();
  window.document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toastController
    .create({
      message: 'Case study note exported successfully!',
      duration: 2000,
      position: 'bottom',
      color: 'success'
    })
    .then((t) => t.present());
};

const clearCaseStudyNote = () => {
  const pageId = route.params.id as string;
  if (pageId !== 'communication') return;
  if (confirm('Are you sure you want to clear your case study note? This action cannot be undone.')) {
    caseStudyNote.value = '';
    localStorage.setItem(`sage-cs-${pageId}-current`, JSON.stringify({ text: '' }));
    ProgressService.saveCaseStudyCompletion(pageId);
    toastController
      .create({
        message: 'Case study note cleared.',
        duration: 2000,
        position: 'bottom',
        color: 'warning'
      })
      .then((t) => t.present());
  }
};

// Simple computed property to check if all questions are answered
const allQuestionsAnswered = computed(() => {
  const currentQuestion = quizQuestions.value[currentQuizQuestion.value];
  
  console.log('=== allQuestionsAnswered Debug ===');
  console.log('Current question:', currentQuestion);
  console.log('Question type:', currentQuestion?.type);
  console.log('Question options:', currentQuestion?.options);
  
  if (currentQuestion?.type === 'multi-true-false' && 'subQuestions' in currentQuestion) {
    return currentQuestion.subQuestions.every(subQ => 
      matchingAnswers.value && matchingAnswers.value[subQ.id] !== undefined && matchingAnswers.value[subQ.id] !== ''
    );
  }
  
  if (currentQuestion?.type === 'select-all' && 'options' in currentQuestion) {
    // Check if at least one option is selected
    const hasSelection = Object.values(checkboxAnswers.value).some(checked => checked);
    console.log('Select-all validation - hasSelection:', hasSelection, 'checkboxAnswers:', checkboxAnswers.value);
    return hasSelection;
  }
  
  return false;
});

// Manual validation function for debugging
const checkButtonState = () => {
  console.log('=== Manual Button State Check ===');
  console.log('matchingAnswers.value:', matchingAnswers.value);
  console.log('currentQuizQuestion.value:', currentQuizQuestion.value);
  
  const currentQuestion = quizQuestions.value[currentQuizQuestion.value];
  console.log('Current question:', currentQuestion);
  
  if (currentQuestion?.type === 'multi-true-false' && 'subQuestions' in currentQuestion) {
    const allAnswered = currentQuestion.subQuestions.every(subQ => {
      const hasAnswer = matchingAnswers.value && matchingAnswers.value[subQ.id] !== undefined && matchingAnswers.value[subQ.id] !== '';
      console.log(`Sub-question ${subQ.id} has answer:`, hasAnswer, 'Value:', matchingAnswers.value?.[subQ.id]);
      return hasAnswer;
    });
    console.log('Manual check - All answered:', allAnswered);
    return allAnswered;
  }
  
  return false;
};

// Debug: Watch for changes to matchingAnswers
watch(matchingAnswers, (newVal) => {
  console.log('matchingAnswers changed:', newVal);
  // Manually check button state when answers change
  setTimeout(() => {
    checkButtonState();
  }, 100);
}, { deep: true });

// Watch for question changes and clear answers
watch(currentQuizQuestion, (newVal) => {
  console.log('Question changed to:', newVal);
  // Clear checkbox answers when moving to a new question
  checkboxAnswers.value = {};
  // Clear matching answers when moving to a new question
  matchingAnswers.value = {};
}, { immediate: false });

// Computed property to check if user can proceed to next question
const canProceedToNextQuestion = computed(() => {
  // Force reactivity by explicitly accessing the ref values
  const currentIndex = currentQuizQuestion.value;
  const answers = matchingAnswers.value;
  const currentAnswer = currentQuizAnswer.value;
  
  const currentQuestion = quizQuestions.value[currentIndex];
  
  console.log('=== canProceedToNextQuestion Debug ===');
  console.log('Current question index:', currentIndex);
  console.log('Current question:', currentQuestion);
  console.log('Current question type:', currentQuestion?.type);
  console.log('matchingAnswers.value:', answers);
  console.log('currentQuizAnswer.value:', currentAnswer);
  
  if (!currentQuestion) {
    console.log('No current question, returning false');
    return false;
  }
  
  if (currentQuestion.type === 'matching' && 'strategies' in currentQuestion) {
    // Check if all strategies have been matched
    const result = currentQuestion.strategies.every(strategy => 
      answers && answers[strategy.id] !== undefined && answers[strategy.id] !== ''
    );
    console.log('Matching question validation result:', result);
    return result;
  }
  
  if (currentQuestion.type === 'multi-true-false' && 'subQuestions' in currentQuestion) {
    // Use our simple computed property
    const result = allQuestionsAnswered.value;
    console.log('Multi-true-false using allQuestionsAnswered:', result);
    return result;
  }
  
  if (currentQuestion.type === 'select-all' && 'options' in currentQuestion) {
    // Check if at least one checkbox is selected
    const hasSelection = Object.values(checkboxAnswers.value).some(checked => checked);
    console.log('Select-all validation - hasSelection:', hasSelection, 'checkboxAnswers:', checkboxAnswers.value);
    return hasSelection;
  }
  
  if (currentQuestion.type === 'fill-in-blank' && 'sentences' in currentQuestion) {
    // Check if all sentences have been completed
    const result = currentQuestion.sentences.every(sentence => 
      answers && answers[sentence.id] !== undefined && answers[sentence.id] !== ''
    );
    console.log('Fill-in-blank validation result:', result);
    return result;
  }
  
  // For other question types, check if an answer is selected
  const result = !!currentAnswer;
  console.log('Regular question validation result:', result);
  return result;
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
const quizQuestions = computed((): QuizQuestion[] => {
  const id = route.params.id as string;
  
  if (id === 'hearing-needs') {
    return [
      {
        question: "What is an example of respectful language to use when describing a learner who has hearing needs?",
        options: [
          { value: 'a', text: 'Deaf or has hearing loss' },
          { value: 'b', text: 'Deaf and dumb' },
          { value: 'c', text: 'Handicapped' }
        ],
        correctAnswer: 'a'
      },
      {
        question: "True or false:",
        type: 'multi-true-false',
        subQuestions: [
          {
            id: 'a',
            text: "Low lighting can be problematic in classrooms for learners with hearing needs",
            correctAnswer: 'true',
            explanation: "True because learners with hearing needs will need to rely on their vision and will need to see speakers faces, mouths clearly as well as visual prompts and captions."
          },
          {
            id: 'b',
            text: "Learners with hearing needs may need extra time to process information",
            correctAnswer: 'true',
            explanation: "True because of the extra cognitive demands involved in processing information."
          },
          {
            id: 'c',
            text: "Dictation exercises are suitable for all deaf learners",
            correctAnswer: 'false',
            explanation: "False because learners with hearing needs may struggle to hear spoken information."
          }
        ]
      },
      {
        question: "Complete the following sentences:",
        type: 'fill-in-blank',
        sentences: [
          {
            id: 'a',
            textBefore: "Video content will be more accessible to learners with hearing needs if it includes",
            textAfter: "",
            correctAnswer: 'captions or subtitles',
            options: [
              'captions or subtitles',
              'background music',
              'fast speech',
              'no sound',
              'whispering',
              'echo effects',
              'foreign language',
              'technical jargon'
            ]
          },
          {
            id: 'b',
            textBefore: "Learners with hearing needs may",
            textAfter: "information if they are not facing the teacher",
            correctAnswer: 'miss',
            options: [
              'miss',
              'hear clearly',
              'understand better',
              'focus more',
              'learn faster',
              'remember everything',
              'enjoy the lesson',
              'participate actively'
            ]
          },
          {
            id: 'c',
            textBefore: "To reduce fatigue, learners with hearing needs may need regular",
            textAfter: "",
            correctAnswer: 'breaks or rest breaks',
            options: [
              'breaks or rest breaks',
              'homework assignments',
              'test questions',
              'group discussions',
              'written exercises',
              'oral presentations',
              'listening activities',
              'noise exposure'
            ]
          }
        ]
      },
      {
        question: "Which resources may support the learning for learners with hearing needs - select all that apply.",
        type: 'select-all',
        options: [
          { value: 'a', text: 'Sign language charts and posters' },
          { value: 'b', text: 'Captions on videos' },
          { value: 'c', text: 'Speech to text software' },
          { value: 'd', text: 'Written materials' },
          { value: 'e', text: 'All of these' }
        ],
        correctAnswers: ['e'],
        alternativeCorrectAnswers: ['a', 'b', 'c', 'd'] // Alternative way to get it right
      },
      {
        question: "True or false: it is important to face a learner with hearing needs, when you are speaking to them.",
        type: 'true-false',
        options: [
          { value: 'true', text: 'True' },
          { value: 'false', text: 'False' }
        ],
        correctAnswer: 'true'
      }
    ];
  }
  
  if (id === 'communication') {
    return [
      {
        question: "Which of the following is the most inclusive way to describe a learner who does not use speech?",
        options: [
          { value: 'a', text: 'Mute' },
          { value: 'b', text: 'Non-verbal' },
          { value: 'c', text: 'Cannot communicate' },
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
          { id: 'a', text: 'Visual timetable' },
          { id: 'b', text: 'Clear seating plan' },
          { id: 'c', text: 'Noise-cancelling headphones' }
        ],
        purposes: [
          { id: 'a', text: 'Reduce sensory input to support regulation' },
          { id: 'b', text: 'Help understand daily structure and transitions' },
          { id: 'c', text: 'Support concentration and communication access' }
        ],
        correctAnswers: { 'a': 'b', 'b': 'c', 'c': 'a' } as { [key: string]: string }
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
  if (id === 'xxxxxxx') {
    return 'Visual Needs';
  }
  return disabilityData[id as keyof typeof disabilityData]?.title || (id ? id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Unknown Page');
};

const getCategoryTitle = () => {
  const id = route.params.id as string;
  return disabilityData[id as keyof typeof disabilityData]?.category || 'Disability Category';
};

// Flexible section control for each disability page
const pageSections = computed(() => {
  const id = route.params.id as string;
  
  const sections: { [key: string]: {
    hasSubheadings: boolean;
    showKeyConsiderations: boolean;
    showLanguage: boolean;
    showUnderstanding: boolean;
    showChallenges: boolean;
    showEnabling: boolean;
    showResources: boolean;
    showCaseStudy: boolean;
    showReflectiveTasks: boolean;
    showQuiz: boolean;
  }} = {
    'physical-disabilities': {
      hasSubheadings: true,
      showKeyConsiderations: true,
      showLanguage: true,
      showUnderstanding: true,
      showChallenges: true,
      showEnabling: true,
      showResources: true,
      showCaseStudy: true,
      showReflectiveTasks: true,
      showQuiz: true
    },
    'hearing-needs': {
      hasSubheadings: true,
      showKeyConsiderations: false, // No key considerations for hearing needs
      showLanguage: true,
      showUnderstanding: true,
      showChallenges: true,
      showEnabling: true,
      showResources: true,
      showCaseStudy: true,
      showReflectiveTasks: true,
      showQuiz: true
    },
    'communication': {
      hasSubheadings: true,
      showKeyConsiderations: false,
      showLanguage: true,
      showUnderstanding: true,
      showChallenges: true,
      showEnabling: true,
      showResources: true,
      showCaseStudy: true,
      showReflectiveTasks: true,
      showQuiz: true
    },
    'physical-sensory-needs': {
      hasSubheadings: false,
      showKeyConsiderations: false,
      showLanguage: false,
      showUnderstanding: false,
      showChallenges: false,
      showEnabling: false,
      showResources: false,
      showCaseStudy: false,
      showReflectiveTasks: false,
      showQuiz: false
    },
    'cognitive-intellectual-needs': {
      hasSubheadings: false,
      showKeyConsiderations: false,
      showLanguage: false,
      showUnderstanding: false,
      showChallenges: false,
      showEnabling: false,
      showResources: false,
      showCaseStudy: false,
      showReflectiveTasks: true,
      showQuiz: false
    },
    'speech-language-needs': {
      hasSubheadings: false,
      showKeyConsiderations: false,
      showLanguage: false,
      showUnderstanding: false,
      showChallenges: false,
      showEnabling: false,
      showResources: false,
      showCaseStudy: false,
      showReflectiveTasks: false,
      showQuiz: false
    },
    'xxxxxxx': {
      hasSubheadings: false,
      showKeyConsiderations: false,
      showLanguage: false,
      showUnderstanding: false,
      showChallenges: false,
      showEnabling: false,
      showResources: false,
      showCaseStudy: false,
      showReflectiveTasks: false,
      showQuiz: false
    },
    'multiple-disabilities': {
      hasSubheadings: false,
      showKeyConsiderations: false,
      showLanguage: false,
      showUnderstanding: false,
      showChallenges: false,
      showEnabling: false,
      showResources: false,
      showCaseStudy: false,
      showReflectiveTasks: false,
      showQuiz: false
    }
  };
  
  return sections[id] || sections['physical-disabilities']; // Default fallback
});

const hasSubheadings = computed(() => {
  return pageSections.value.hasSubheadings;
});

const disabilityContent = computed(() => {
  const id = route.params.id as string;
  if (id === 'hearing-needs') {
    return {
      title: 'Hearing Needs',
      category: 'Hearing Needs',
      description: '',
      language: {
        wordsToAvoid: [
          { term: 'Deaf and dumb/deaf-mute', reason: 'Can suggest problems with intelligence' },
          { term: 'Suffers from hearing loss', reason: 'Implies suffering' },
          { term: 'Handicapped person', reason: 'Outdated and offensive' },
          { term: 'Normal hearing child', reason: 'Implies individuals with hearing loss are "abnormal." Use "hearing child."' }
        ],
        wordsToUse: [
          { term: 'Deaf', explanation: 'Refers to the condition of profound or complete hearing loss' },
          { term: 'Deaf', explanation: 'Many individuals with hearing needs prefer a capital D to be used when referring to being part of the Deaf community' },
          { term: 'Hearing loss', explanation: 'Refers to individuals with some hearing loss-they may use hearing aids and/or speech' },
          { term: 'Person with hearing loss', explanation: 'Does not depend on the severity' },
          { term: 'Uses sign language', explanation: 'Describes communication method' },
          { term: 'Non-verbal', explanation: 'Only to be used if the person does not use speech. They may communicate in different ways- i.e sign language' }
        ]
      },
      understanding: {
        strengths: [
          'What is your preferred way to communicate—signing, speaking, writing, drawing, or something else?',
          'What is the best position for you in the classroom in relation to the person speaking?',
          'What helps you understand things best e.g. seeing, doing, reading, or hearing?',
          'When learning new things, how do you prefer teachers to explain things to you?'
        ],
        challenges: [
          'What challenges do you have during class discussions, group work or when your teacher is instructing the class?',
          'Is there anything you would like your classmates or teachers to do differently when communicating with you?',
          'Do you have any problems using your hearing aids/apps or other tools?'
        ],
        strategies: [
          'What helps your learning in the classroom (seating, pictures, slides, things written on the board or spoken?',
          'Do you prefer quiet spaces or smaller group sizes?',
          'How is your learning affected by lighting or background noise?',
          'What communication methods work best for you (sign language, lip reading, something else?'
        ],
        advocacy: [
          'I found these parts of the lesson easy/hard to understand.',
          'Please do something differently, that will help me to...',
          'I need to sit somewhere else',
          'I need some equipment to help with my learning.'
        ]
      },
      challenges: {
        physical: [
          'Background noise (AC systems, chatter, outside noise)',
          'Poor acoustics- can create echoes, making speech harder to understand',
          'Low or flickering lighting can interfere with learners\' ability to lip read or see key visuals',
          'Learners faced away from the teacher or visual cues may miss information',
          'The absence of written instructions, captions, or visual cues can make following verbal lessons difficult'
        ],
        social: [
          'Noisy environments can make it difficult to follow instruction or group discussions',
          'Missed social cues, such as tone of voice, humour, nuance—leading to confusion or social misunderstandings',
          'Without understanding how to include and communicate with deaf or hard-of-hearing peers, classmates may unintentionally exclude them'
        ],
        tasks: [
          'Verbal explanations and examples can be limiting if not supported by visuals or gestures',
          'Listening and dictation tasks can disadvantage learners',
          'In longer tasks, learners may struggle with extra effort involved in listening, processing and concentrating',
          'Information shared informally through peer or teacher talk may be missed, reducing understanding'
        ],
        assessment: [
          'Verbal Instructions without written or visual support can limit understanding',
          'Listening-based assessments can be inaccessible, even with hearing aids',
          'Learners with hearing needs may struggle to show their knowledge in formats like oral presentations or spoken responses',
          'Time Pressure- learners with hearing needs may need extra time for processing, interpreting and understanding tasks'
        ]
      },
      enabling: {
        physical: [
          'Reduce background noise by ensuring one person speaks at time',
          'Move learners with hearing needs away from AC systems or other noise sources',
          'Use carpets and curtains to reduce echoes',
          'Position learners so they can clearly see the teacher, board, and interpreter (if applicable)',
          'Provide visual instructions and/or pictures and lesson objectives in writing',
          'Ensure lighting is even for better visibility of facial expressions and to aid lip-reading'
        ],
        social: [
          'Foster a deaf-aware classroom through peer education and empathy-building activities',
          'Use rules for communication- such as speaking one at a time, getting attention of person with hearing needs before speaking and facing the person you are talking to. Peers could be taught basic signs',
          'Encourage peer buddies or promote social inclusion activities'
        ],
        tasks: [
          'Gain the attention of a learner with hearing needs before speaking',
          'Provide written instructions and visual aids alongside spoken directions',
          'Offer captioned or transcribed materials for any audio or video-based content',
          'Build in short breaks to reduce fatigue during longer tasks'
        ],
        assessment: [
          'Ensure access to assistive listening technology or captioning',
          'Provide all instructions in clear, written format alongside verbal explanations',
          'Allow extra time and provide breaks to reduce fatigue',
          'Focus on assessing conceptual understanding rather than language expression',
          'Include formative assessments by evaluating the learner\'s everyday understanding'
        ]
      },
      resources: {
        electronic: [
          { title: 'Google Live Transcribe', description: 'Transcribes speech into text in real time', url: 'https://play.google.com/store/apps/details?id=com.google.audio.hearing.visualization.accessibility.scribe' },
          { title: 'YouTube with Auto-Captions', description: 'Video platform with automatic captioning features', url: 'https://www.youtube.com' },
          { title: 'BBC Bitesize', description: 'Offers captioned videos and structured learning content from KS1 to GCSE', url: 'https://www.bbc.co.uk/bitesize' },
          { title: 'Kahoot!', description: 'Interactive learning tool (Free Version)', url: 'https://kahoot.com' },
          { title: 'Quizlet', description: 'Interactive learning tool (Free Version)', url: 'https://quizlet.com' },
          { title: 'Nearpod', description: 'Interactive learning tool (Free Version)', url: 'https://nearpod.com' },
          { title: 'Zimbabwean Sign Language Resources', description: 'YouTube resources to learn Zimbabwean sign language', url: 'https://www.youtube.com/watch?v=Tf0ZlEmmcBc' },
          { title: 'PECS Cards', description: 'Picture Exchange Communication System - support learners who are non-verbal', url: 'https://www.leicspart.nhs.uk/wp-content/uploads/2024/02/PECS-advanced-information-sheet-final-2nd-Jan-2024.pdf' },
          { title: 'Storybooks with Deaf Characters', description: 'Use storybooks that include characters with hearing needs', url: 'https://www.perkins.org/books-about-deafness-or-with-deaf-characters/' }
        ],
        paper: [
          { title: 'Zimbabwean Sign Language Dictionary', description: 'King George VI Centre and School by Sindile Kevin Mhlanga', availability: 'Available from King George VI Centre and School' },
          { title: 'Visual Flashcards', description: 'With images, symbols, written words, or sign language illustrations to support development of vocabulary and conceptual understanding and to support routines', availability: 'Available from educational resource centers' },
          { title: 'Sign Language Charts and Posters', description: 'Displaying commonly used signs for classroom use', availability: 'Available from educational resource centers' }
        ],
        organizations: [
          { name: 'The Deaf Zimbabwe Trust', description: 'Includes resources for learning Zimbabwean sign language', contact: 'https://deafzimbabwetrust.org/' },
          { name: 'National Deaf Children\'s Society (NDCS)', description: 'Provides educational resources and teacher guidance', contact: 'https://www.ndcs.org.uk' },
          { name: 'Deaf Child Worldwide', description: 'Supports inclusive education in low-resource settings', contact: 'https://www.deafchildworldwide.org' }
        ]
      },
      caseStudy: {
        title: 'To be developed by CBM',
        scenario: '',
        details: [],
        learningPoints: []
      },
      reflectiveTasks: [
        { title: 'Case Study Reflection', description: 'How would you adapt your teaching methods to support Sarah\'s learning needs?', completed: false },
        { title: 'Practice Reflection', description: 'What audio content in your teaching could be made more accessible?', completed: false },
        { title: 'Next Steps Action Plan', description: 'Identify three specific ways to improve communication accessibility in your classroom', completed: false }
      ]
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
      description: '',
      language: {
        wordsToUse: [
          { term: 'Learner who is non-speaking', explanation: '' },
          { term: 'Learner who uses adaptive communication', explanation: '' },
          { term: '‘Show me’ or ‘share with me’ instead of ‘tell me or talk to your partner’.', explanation: '' }
        ],
        wordsToAvoid: [
          { term: 'Dumb', reason: '' },
          { term: 'Mute', reason: '' },
          { term: 'Non-verbal', reason: '' },
          { term: 'Can’t communicate', reason: '' },
          { term: 'Suffers from', reason: '' },
          { term: 'Refuses to talk', reason: '' },
          { term: 'Normal communication.', reason: '' }
        ]
      },
      understanding: {
        strengths: [
          'Show me how you prefer to communicate.',
          'Who best understands you?'
        ],
        challenges: [
          'Are there times when it’s hard to communicate?',
          'Do you ever feel like others don’t understand?',
          'What makes communication tricky or frustrating?'
        ],
        strategies: [
          'Is there anything we can do to make it easier for you to join in?',
          'How would you like me to communicate with you? For example, would it help if I refer to symbols?'
        ],
        advocacy: [
          'I need my … to help me communicate.',
          'Please listen. I have something to say.',
          'Please check that you have understood me.',
          'Please check that I have understood you.',
          'Please give me choices.'
        ]
      },
      challenges: {
        physical: [
          'Busy environments can make it challenging to know what/who to look at or listen to.',
          'Distractions can include pictures on the walls, objects and the presence of other people. These distractions may have a greater impact on learners with ADHD.',
          'Some learners may be hypersensitive to specific sensations. If they are in an environment containing sensations that cause them anxiety or distress, they may struggle to focus or to feel safe to communicate.'
        ],
        social: [
          'Learners may give too little or too much eye contact and can struggle to understand body language and facial expressions.',
          'Learners may misunderstand social conventions, for example, waiting their turn to speak.',
          'Learners may appear to ignore others.',
          'Learners may not understand the need for personal space.',
          'Learners may experience social isolation, frustration or anxiety due to struggles initiating and maintaining interactions or feeling that others misinterpret or ignore them.',
          'There may be inconsistent interactions between home and school due to differences in communication styles, expectations and distractions.'
        ],
        tasks: [
          'Learners may have difficulty following instructions.',
          'Non-speaking or minimally speaking learners may struggle to access speaking tasks.',
          'Moving between tasks or environments may be challenging due to difficulties understanding transitions.'
        ],
        assessment: [
          'May appear to make less progress than peers. This could be because the learner needs to receive or express information using alternative methods.'
        ]
      },
      enabling: {
        physical: [
          'Employ a total communication approach. This involves valuing, modelling and facilitating all communication modes, including verbal and non-verbal communication and Augmentative and Alternative Communication (AAC) devices, eye-tracking systems, symbols, gestures and speech.',
          'Reduce distractions by simplifying classroom displays, reducing clutter and ensuring that the classroom is quiet.',
          'Devise a seating plan: some learners may find it easier to engage when seated at the front of the classroom, whilst others might experience fewer distractions and less anxiety if they sit at the back.',
          'Ensure that learners are given regular opportunities to move. ‘Fidget toys’ may help some learners.',
          'Ensure individuals can access resources that help them, such as noise-cancelling headphones (or ear defenders), which support concentration and communication access.'
        ],
        social: [
          'Teach strategies for listening but respect variances, for example, eye contact is not compulsory).',
          'Support the learner’s interactions with their peers by modelling phrases and demonstrating different ways to listen and respond.',
          'Teach other children how to ‘listen’ to alternative communication methods such as symbols or sign language.',
          'Always gain the learner’s attention before attempting to interact.',
          'Help the learner to practise communicating in various situations in a way that is comfortable for them.'
        ],
        tasks: [
          'Establish consistent routines.',
          'Use multi-sensory approaches (for example, see it, hear it, touch it, do it).',
          'Allow extra time to understand communication and respond.',
          'Model ways to request help, such as using a gesture, symbol or phrase.',
          'Use visual timetables, now-and-next boards, and timers to support an understanding of daily routines and transitions.',
          'Create structure in unpredictable times (for example, lunch) by providing clubs, leading games, and outlining clear expectations of what learners should do in these periods.'
        ],
        assessment: [
          'Clearly explain and model the task and ensure learners understand how to achieve the objectives.',
          'Assess learning via the learner’s preferred communication method.'
        ]
      },
      resources: {
        electronic: [
          { title: 'Australian Education Research Organisation: Communication needs. Supporting students’ diverse needs', description: 'Further guidance about supporting a range of communication needs.', url: 'https://www.edresearch.edu.au/sites/default/files/2025-02/classroom-management-supporting-students-diverse-needs-communication-needs-aa.pdf' },
          { title: 'HPFT Total Communication – a guide to the Total Communication approach', description: '', url: 'https://www.youtube.com/watch?v=Au4wVMIAArI' }
        ],
        paper: [
          { title: 'Using Lego therapy with autistic pupils – guidance about using Lego to support learners’ social communication skills. https://www.autism.org.uk/advice-and-guidance/professional-practice/lego-pilot', description: '' },
          { title: 'Twinkl Symbols for AAC – Communication Pictures, Software & Resources – guidance and examples for using symbols to support communication. https://www.twinkl.co.uk/symbols', description: '' },
          { title: 'What is a Social Story? – Carol Gray – a social learning tool that supports the safe and meaningful exchange of information between parents, professionals and learners with communication needs. https://carolgraysocialstories.com/social-stories/what-is-a-social-story/', description: '' }
        ],
        organizations: [
          { name: 'Able Child', description: 'A charity working with the Zimbabwe Parents of Handicapped Children Association (ZPHCA) to promote the inclusion of children with disabilities in Zimbabwe.', contact: 'https://www.ablechild.org.uk/where-we-work/zimbabwe/' }
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
  if (resource.url) {
    // Open URL in new window/tab - works in both web browsers and mobile apps
    window.open(resource.url, '_blank', 'noopener,noreferrer');
  }
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
  if (org.contact && org.contact.startsWith('http')) {
    // If contact is a URL, open it in new window/tab
    window.open(org.contact, '_blank', 'noopener,noreferrer');
  } else if (org.contact) {
    // If contact is a phone number or other contact info, could show it in a toast or modal
    console.log(`Contact information: ${org.contact}`);
  }
};

const nextQuizQuestion = () => {
  // Save current answer before moving to next question
  const currentQuestion = quizQuestions.value[currentQuizQuestion.value];
  
  if (!currentQuestion) {
    return;
  }
  
  if (currentQuestion.type === 'matching' || currentQuestion.type === 'multi-true-false' || currentQuestion.type === 'fill-in-blank') {
    // Save matching answers, multi-true-false answers, or fill-in-blank answers
    quizAnswers.value[currentQuizQuestion.value] = { ...matchingAnswers.value };
  } else if (currentQuestion.type === 'select-all') {
    // Save checkbox answers for select-all questions
    quizAnswers.value[currentQuizQuestion.value] = { ...checkboxAnswers.value };
  } else {
    // Save regular answer
    quizAnswers.value[currentQuizQuestion.value] = currentQuizAnswer.value;
  }
  
  if (currentQuizQuestion.value < quizQuestions.value.length - 1) {
    // Move to next question first
    currentQuizQuestion.value++;
    currentQuizAnswer.value = '';
    // Reset matching answers for next question
    matchingAnswers.value = {};
    // Reset checkbox answers for next question
    checkboxAnswers.value = {};
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
          userMatchingAnswers && userMatchingAnswers[strategy.id] !== undefined && userMatchingAnswers[strategy.id] !== ''
        );
        if (allCorrect) {
          correctAnswers++;
        }
      } else if (question.type === 'multi-true-false') {
        // Check if all multi-true-false answers are correct
        const userMultiAnswers = userAnswer as { [key: string]: string };
        const allCorrect = question.subQuestions?.every(subQ => 
          userMultiAnswers && userMultiAnswers[subQ.id] && 
          userMultiAnswers[subQ.id] === subQ.correctAnswer
        );
        if (allCorrect) {
          correctAnswers++;
        }
      } else if (question.type === 'fill-in-blank') {
        // Check if all fill-in-blank answers are correct
        const userFillAnswers = userAnswer as { [key: string]: string };
        const allCorrect = question.sentences?.every(sentence => 
          userFillAnswers && userFillAnswers[sentence.id] && 
          userFillAnswers[sentence.id] === sentence.correctAnswer
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
  
  // For hearing-needs page, also clear localStorage to ensure fresh start
  if (pageId === 'hearing-needs') {
    localStorage.removeItem(`sage-quiz-${pageId}`);
    console.log('Cleared hearing-needs quiz data from localStorage');
  }
};

// Helper functions for quiz results
const isQuestionCorrect = (index: number) => {
  const question = quizQuestions.value[index];
  const userAnswer = quizAnswers.value[index];
  
  if (question.type === 'matching') {
    const userMatchingAnswers = userAnswer as { [key: string]: string };
    return question.strategies?.every(strategy => 
      userMatchingAnswers && userMatchingAnswers[strategy.id] !== undefined && userMatchingAnswers[strategy.id] !== ''
    ) || false;
  } else if (question.type === 'multi-true-false') {
    const userMultiAnswers = userAnswer as { [key: string]: string };
    if (!userMultiAnswers || !question.subQuestions) return false;
    
    return question.subQuestions.every(subQ => 
      userMultiAnswers[subQ.id] === subQ.correctAnswer
    );
  } else if (question.type === 'fill-in-blank') {
    const userFillAnswers = userAnswer as { [key: string]: string };
    if (!userFillAnswers || !question.sentences) return false;
    
    return question.sentences.every(sentence => 
      userFillAnswers[sentence.id] === sentence.correctAnswer
    );
  } else if (question.type === 'select-all') {
    const userCheckboxAnswers = userAnswer as { [key: string]: boolean };
    if (!userCheckboxAnswers || Object.keys(userCheckboxAnswers).length === 0) return false;
    
    // Check if user selected 'e' (All of these) - that's always correct
    if (userCheckboxAnswers['e']) return true;
    
    // Check if user selected all individual options (a, b, c, d) - that's also correct
    const selectedOptions = Object.entries(userCheckboxAnswers)
      .filter(([_, checked]) => checked)
      .map(([key, _]) => key);
    
    return selectedOptions.length === 4 && 
           selectedOptions.includes('a') && 
           selectedOptions.includes('b') && 
           selectedOptions.includes('c') && 
           selectedOptions.includes('d');
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
  } else if (question.type === 'multi-true-false') {
    const userMultiAnswers = userAnswer as { [key: string]: string };
    if (!userMultiAnswers || Object.keys(userMultiAnswers).length === 0) {
      return 'Not answered';
    }
    return Object.entries(userMultiAnswers)
      .map(([id, answer]) => `${id}: ${answer === 'true' ? 'True' : 'False'}`)
      .join(', ');
  } else if (question.type === 'fill-in-blank') {
    const userFillAnswers = userAnswer as { [key: string]: string };
    if (!userFillAnswers || Object.keys(userFillAnswers).length === 0) {
      return 'Not answered';
    }
    return Object.entries(userFillAnswers)
      .map(([id, answer]) => `${id}: ${answer}`)
      .join(', ');
  } else if (question.type === 'true-false') {
    return userAnswer === 'true' ? 'True' : 'False';
  } else if (question.type === 'select-all') {
    const userCheckboxAnswers = userAnswer as { [key: string]: boolean };
    if (!userCheckboxAnswers || Object.keys(userCheckboxAnswers).length === 0) {
      return 'Not answered';
    }
    
    const selectedOptions = Object.entries(userCheckboxAnswers)
      .filter(([_, checked]) => checked)
      .map(([key, _]) => key);
    
    if (selectedOptions.includes('e')) {
      return 'e) All of these';
    } else {
      return selectedOptions.map(key => `${key}) ${question.options?.find(opt => opt.value === key)?.text}`).join(', ');
    }
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
        .map(([strategy, purpose]) => `${strategy}: ${purpose}`)
        .join(', ');
    }
    return 'Unknown';
  } else if (question.type === 'multi-true-false') {
    if (!question.subQuestions) return 'Unknown';
    return question.subQuestions
      .map(subQ => `${subQ.id}: ${subQ.correctAnswer === 'true' ? 'True' : 'False'}`)
      .join(', ');
  } else if (question.type === 'fill-in-blank') {
    if (!question.sentences) return 'Unknown';
    return question.sentences
      .map(sentence => `${sentence.id}: ${sentence.correctAnswer}`)
      .join(', ');
  } else if (question.type === 'true-false') {
    return question.correctAnswer === 'true' ? 'True' : 'False';
  } else if (question.type === 'select-all') {
    // For select-all, show both correct answer paths
    return 'e) All of these (OR select a, b, c, d individually)';
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
  const pageId = route.params.id as string;
  
  if (question.type === 'matching') {
    if (pageId === 'hearing-needs') {
      return "In matching questions, each strategy must be correctly paired with its purpose. Review the hearing support strategies and their intended outcomes.";
    } else {
      return "In matching questions, each strategy must be correctly paired with its purpose. Review the communication support strategies and their intended outcomes.";
    }
  } else if (question.type === 'multi-true-false') {
    if (pageId === 'hearing-needs') {
      return "For multi-part true/false questions, consider each statement individually. Think about the specific needs and challenges that learners with hearing needs face in educational settings.";
    } else {
      return "For multi-part true/false questions, consider each statement individually. Think about the specific needs and challenges that learners with communication needs face in educational settings.";
    }
  } else if (question.type === 'fill-in-blank') {
    if (pageId === 'hearing-needs') {
      return "For fill-in-the-blank questions, think about what makes content accessible and supportive for learners with hearing needs. Consider both environmental factors and learning strategies.";
    } else {
      return "For fill-in-the-blank questions, think about what makes content accessible and supportive for learners with communication needs. Consider both environmental factors and learning strategies.";
    }
  } else if (question.type === 'true-false') {
    if (pageId === 'hearing-needs') {
      if (userAnswer === 'true' && question.correctAnswer === 'false') {
        return "This statement is false. Consider the complexity and individual nature of hearing needs - they vary greatly between individuals and contexts.";
      } else {
        return "This statement is true. Hearing abilities and needs are diverse and individual-specific.";
      }
    } else {
      if (userAnswer === 'true' && question.correctAnswer === 'false') {
        return "This statement is false. Consider the complexity and individual nature of communication needs - they vary greatly between individuals and contexts.";
      } else {
        return "This statement is true. Communication abilities and needs are diverse and individual-specific.";
      }
    }
  } else {
    // Multiple choice questions
    const userOption = question.options?.find(opt => opt.value === userAnswer);
    const correctOption = question.options?.find(opt => opt.value === question.correctAnswer);
    
    if (userOption && correctOption) {
      if (pageId === 'hearing-needs') {
        // Special handling for question 1 (index 0)
        if (index === 0) {
          if (userAnswer === 'b') {
            return "The term 'Deaf and dumb' is offensive and outdated. It incorrectly suggests that people with hearing loss cannot communicate or think clearly.";
          } else if (userAnswer === 'c') {
            return "The term 'Handicapped' is considered outdated and offensive. It focuses on limitations rather than abilities and individual identity.";
          }
        }
        return `You selected "${userOption.text}" but the correct answer is "${correctOption.text}". Consider the most inclusive and respectful language when discussing hearing needs.`;
      } else {
        return `You selected "${userOption.text}" but the correct answer is "${correctOption.text}". Consider the most inclusive and respectful language when discussing communication needs.`;
      }
    }
    if (pageId === 'hearing-needs') {
      return "Review the question carefully and consider which answer best reflects inclusive, person-first language and respectful communication practices for hearing needs.";
    } else {
      return "Review the question carefully and consider which answer best reflects inclusive, person-first language and respectful communication practices.";
    }
  }
};

// Get explanation for the correct answer
const getCorrectAnswerExplanation = (index: number) => {
  const question = quizQuestions.value[index];
  const pageId = route.params.id as string;
  
  if (question.type === 'matching') {
    if (pageId === 'hearing-needs') {
      return "Each hearing support strategy has a specific purpose. Captions on videos provide visual access to audio content, assistive listening devices amplify speech and reduce background noise, and visual aids support understanding through multiple modalities.";
    } else {
      return "Each communication support strategy has a specific purpose. Visual timetables help with structure, clear seating plans support concentration, and noise-cancelling headphones reduce sensory input.";
    }
  } else if (question.type === 'multi-true-false') {
    if (pageId === 'hearing-needs') {
      // Special handling for question 2 (index 1)
      if (index === 1) {
        return "I. True - Low lighting affects visual communication which is crucial for learners with hearing needs. II. True - Processing information requires additional cognitive effort. III. False - Dictation relies on hearing which can be challenging for learners with hearing needs.";
      }
      return "For multi-part true/false questions, each statement must be evaluated based on the specific needs and challenges that learners with hearing needs face.";
    } else {
      return "For multi-part true/false questions, each statement must be evaluated based on the specific needs and challenges that learners with communication needs face.";
    }
  } else if (question.type === 'fill-in-blank') {
    if (pageId === 'hearing-needs') {
      // Special handling for question 3 (index 2)
      if (index === 2) {
        return "A. Captions or subtitles provide visual access to audio content. B. Missing information occurs when visual cues are not available. C. Regular breaks help reduce cognitive fatigue from processing information.";
      }
      return "Fill-in-the-blank questions test understanding of accessibility features and support strategies for learners with hearing needs.";
    } else {
      return "Fill-in-the-blank questions test understanding of accessibility features and support strategies for learners with communication needs.";
    }
  } else if (question.type === 'true-false') {
    if (pageId === 'hearing-needs') {
      // Special handling for question 5 (index 4)
      if (index === 4) {
        return "True because they will be able to use visual cues such as mouth shapes and facial expressions which may aid their understanding.";
      }
      if (question.correctAnswer === 'false') {
        return "Hearing needs are highly individual and vary between home and school environments. What works in one context may not work in another.";
      } else {
        return "This statement accurately reflects the reality of hearing abilities and the importance of recognizing individual differences.";
      }
    } else {
      if (question.correctAnswer === 'false') {
        return "Communication needs are highly individual and vary between home and school environments. What works in one context may not work in another.";
      } else {
        return "This statement accurately reflects the reality of communication abilities and the importance of recognizing individual differences.";
      }
    }
  } else {
    // Multiple choice explanations
    const correctOption = question.options?.find(opt => opt.value === question.correctAnswer);
    if (correctOption) {
      if (pageId === 'hearing-needs') {
        // Special handling for question 1 (index 0)
        if (index === 0) {
          return `"${correctOption.text}" is the correct answer because it uses respectful, inclusive language that focuses on the person first and avoids offensive or outdated terms. Terms like 'Deaf and dumb' and 'Handicapped' are considered offensive and perpetuate harmful stereotypes.`;
        }
        return `"${correctOption.text}" is the correct answer because it uses person-first language, respects individual preferences, and promotes inclusive practices for hearing needs.`;
      } else {
        return `"${correctOption.text}" is the correct answer because it uses person-first language, respects individual preferences, and promotes inclusive communication practices.`;
      }
    }
    if (pageId === 'hearing-needs') {
      return "The correct answer reflects best practices in inclusive education and respectful language use for hearing needs.";
    } else {
      return "The correct answer reflects best practices in inclusive communication and respectful language use.";
    }
  }
};

// Get key learning point for the question
const getLearningPoint = (index: number) => {
  const question = quizQuestions.value[index];
  const pageId = route.params.id as string;
  
  if (question.type === 'matching') {
    if (pageId === 'hearing-needs') {
      return "Understanding the purpose of different hearing support strategies helps in providing appropriate accommodations for students with hearing needs.";
    } else {
      return "Understanding the purpose of different communication support strategies helps in providing appropriate accommodations for students with communication needs.";
    }
  } else if (question.type === 'multi-true-false') {
    if (pageId === 'hearing-needs') {
      // Special handling for question 2 (index 1)
      if (index === 1) {
        return "Understanding the specific environmental and cognitive needs of learners with hearing needs helps create more inclusive and supportive learning environments.";
      }
      return "Multi-part questions help assess understanding of different aspects of supporting learners with hearing needs.";
    } else {
      return "Multi-part questions help assess understanding of different aspects of supporting learners with communication needs.";
    }
  } else if (question.type === 'fill-in-blank') {
    if (pageId === 'hearing-needs') {
      // Special handling for question 3 (index 2)
      if (index === 2) {
        return "Understanding accessibility features and support strategies helps create inclusive learning environments that accommodate the diverse needs of learners with hearing needs.";
      }
      return "Fill-in-the-blank questions help assess practical knowledge of accessibility features and support strategies.";
    } else {
      return "Fill-in-the-blank questions help assess practical knowledge of accessibility features and support strategies.";
    }
  } else if (question.type === 'true-false') {
    if (pageId === 'hearing-needs') {
      return "Hearing needs are individual and contextual - avoid making assumptions about what works for all students in all situations.";
    } else {
      return "Communication needs are individual and contextual - avoid making assumptions about what works for all students in all situations.";
    }
  } else {
    if (pageId === 'hearing-needs') {
      // Special handling for question 1 (index 0)
      if (index === 0) {
        return "Language matters in creating inclusive environments. Using respectful terms like 'Deaf' or 'has hearing loss' shows respect for individual identity and helps create a culture of acceptance and understanding.";
      }
      return "Use person-first language and respect individual preferences when discussing hearing needs. Focus on abilities and support rather than limitations.";
    } else {
      return "Use person-first language and respect individual preferences when discussing communication needs. Focus on abilities and support rather than limitations.";
    }
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

/* Explanation divider between feedback and answer */
.explanation-divider {
  height: 1px;
  background-color: var(--ion-color-light-shade);
  margin: 16px 0;
  opacity: 0.6;
}

/* Fill-in-blank inline styling */
.fill-in-blank-text {
  display: inline;
  margin: 0 4px;
}

.fill-in-blank-select {
  display: inline-block;
  min-width: 180px;
  margin: 0 4px;
  vertical-align: middle;
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

.case-study-text {
  margin-bottom: 12px;
}

.case-study-text ul {
  margin: 8px 0 12px 20px;
}

.case-study-text .case-study-subheading {
  margin-top: 12px;
  margin-bottom: 8px;
  font-weight: 700;
}

.case-study-prompts {
  margin-top: 12px;
  margin-left: 20px;
}

.case-study-prompts li {
  margin-bottom: 6px;
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