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
        <!-- Home Page -->
        <div v-if="route.params.id === 'Home'">
          <!-- SAGE Cover Illustration -->
          <div class="sage-cover-illustration-wrapper">
            <img src="/SAGE cover illustration disability.jpg" alt="Illustration of a diverse group of girls and community members, including a girl in a wheelchair, in a rural Zimbabwean setting" class="sage-cover-illustration" />
          </div>

          <!-- Demo Video Player with Transcript -->
          <ion-card>
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
          </ion-card>

          <!-- Demo Audio Player with Transcript -->
          <ion-card>
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
          </ion-card>
          <!-- Hero Section with Video -->
          <ion-card>
            <ion-card-header>
              <ion-card-title>Welcome to SAGE</ion-card-title>
              <ion-card-subtitle>Supporting Adolescent Girls' Education</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <p>SAGE is your mobile learning companion for understanding and supporting students with disabilities. 
              Get practical guidance, case studies, and resources to help create inclusive learning environments.</p>
              
              <!-- Video Component -->
              <ion-item>
                <ion-label>Introduction Video</ion-label>
                <ion-button fill="clear" @click="playVideo">
                  <ion-icon :icon="playCircle" slot="start"></ion-icon>
                  Play Video
                </ion-button>
              </ion-item>
            </ion-card-content>
          </ion-card>

          <!-- Progress Summary Card -->
          <ion-card v-if="overallProgress.percentage > 0" class="progress-summary-card">
            <ion-card-header>
              <ion-card-title>
                <ion-icon :icon="trophy" slot="start" :color="achievementLevel.color"></ion-icon>
                Your Learning Progress
              </ion-card-title>
              <ion-card-subtitle>Track your SAGE journey</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <div class="progress-summary-content">
                <div class="progress-circle-small" :style="{ '--progress': overallProgress.percentage }">
                  <div class="progress-circle-inner-small">
                    <div class="progress-percentage-small">{{ overallProgress.percentage }}%</div>
                  </div>
                </div>
                <div class="progress-details">
                  <ion-chip :color="achievementLevel.color" class="achievement-chip-small">
                    <ion-icon :icon="achievementLevel.icon"></ion-icon>
                    <ion-label>{{ achievementLevel.level }}</ion-label>
                  </ion-chip>
                  <p class="progress-stats-small">
                    {{ overallProgress.completedItems }} of {{ overallProgress.totalItems }} activities completed
                  </p>
                  <ion-button 
                    fill="clear" 
                    size="small" 
                    router-link="/progress" 
                    router-direction="forward"
                    class="view-progress-btn"
                  >
                    View Full Progress
                    <ion-icon :icon="arrowForward" slot="end"></ion-icon>
                  </ion-button>
                </div>
              </div>
            </ion-card-content>
          </ion-card>
              
              <ion-button expand="block" fill="outline" class="ion-margin-top" @click="startScreening">
                <ion-icon :icon="accessibilityOutline" slot="start"></ion-icon>
                Start Screening Tool
              </ion-button>

          <!-- Quick Stats with Progress -->
          <ion-card>
            <ion-card-header>
              <ion-card-title>Your Progress</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <ion-progress-bar :value="0.3" color="primary"></ion-progress-bar>
              <ion-note>30% of content completed</ion-note>
              
              <ion-list>
                <ion-item>
                  <ion-icon :icon="checkmarkCircle" slot="start" color="success"></ion-icon>
                  <ion-label>Completed: General Information</ion-label>
                </ion-item>
                <ion-item>
                  <ion-icon :icon="time" slot="start" color="warning"></ion-icon>
                  <ion-label>In Progress: Screening Tool</ion-label>
                </ion-item>
                <ion-item>
                  <ion-icon :icon="ellipse" slot="start" color="medium"></ion-icon>
                  <ion-label>Not Started: Resources</ion-label>
                </ion-item>
              </ion-list>
            </ion-card-content>
          </ion-card>

          <!-- Feature Grid -->
          <ion-grid>
            <ion-row>
              <ion-col size="6">
                <ion-card @click="navigateTo('General')">
                  <ion-card-content>
                    <ion-icon :icon="informationCircleOutline" size="large" color="primary"></ion-icon>
                    <h3>General Information</h3>
                    <p>Universal Design for Learning principles and OU policies</p>
                    <ion-badge color="primary">New</ion-badge>
                  </ion-card-content>
                </ion-card>
              </ion-col>
              <ion-col size="6">
                <ion-card @click="navigateTo('Resources')">
                  <ion-card-content>
                    <ion-icon :icon="schoolOutline" size="large" color="secondary"></ion-icon>
                    <h3>Resources</h3>
                    <p>PDFs, videos, and practical tools for educators</p>
                    <ion-badge color="secondary">Updated</ion-badge>
                  </ion-card-content>
                </ion-card>
              </ion-col>
            </ion-row>
          </ion-grid>

          <!-- Media Players Section -->
          <ion-card>
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
          </ion-card>

          <!-- Quick Reference Guide -->
          <ion-card>
            <ion-card-header>
              <ion-card-title>Quick Reference Guide</ion-card-title>
              <ion-card-subtitle>Essential Information at Your Fingertips</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <h3>Key Principles of Inclusive Education</h3>
              <p>Inclusive education is based on the fundamental principle that all students have the right to participate in and benefit from education. This approach recognizes and values diversity, ensuring that every student feels welcomed, supported, and challenged to reach their full potential.</p>
              
              <h3>Universal Design for Learning (UDL)</h3>
              <p>UDL is a framework that guides the design of learning experiences to proactively meet the needs of all learners. It provides multiple means of engagement, representation, and action & expression, ensuring that learning is accessible to everyone.</p>
              
              <h3>Reasonable Adjustments</h3>
              <p>Reasonable adjustments are changes made to remove or reduce barriers that disabled students face in education. These adjustments are legally required and should be made in consultation with the student and their family.</p>
              
              <ion-list>
                <ion-item>
                  <ion-icon :icon="checkmark" slot="start" color="success"></ion-icon>
                  <ion-label>
                    <h4>Individualized Approach</h4>
                    <p>Every student is unique and requires personalized support strategies</p>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-icon :icon="checkmark" slot="start" color="success"></ion-icon>
                  <ion-label>
                    <h4>Collaborative Planning</h4>
                    <p>Involve students, parents, and professionals in decision-making</p>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-icon :icon="checkmark" slot="start" color="success"></ion-icon>
                  <ion-label>
                    <h4>Continuous Assessment</h4>
                    <p>Regularly evaluate and adjust support strategies based on progress</p>
                  </ion-label>
                </ion-item>
              </ion-list>
            </ion-card-content>
          </ion-card>

          <!-- Getting Started Tips -->
          <ion-card>
            <ion-card-header>
              <ion-card-title>Getting Started Tips</ion-card-title>
              <ion-card-subtitle>Making the Most of SAGE</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <h3>Step-by-Step Guide</h3>
              <ion-list>
                <ion-item>
                  <ion-label>
                    <h4>1. Complete the Screening Tool</h4>
                    <p>Start by taking the comprehensive assessment to identify your knowledge gaps and get personalized recommendations</p>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-label>
                    <h4>2. Explore General Information</h4>
                    <p>Read through the foundational content to understand key concepts and principles</p>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-label>
                    <h4>3. Focus on Specific Areas</h4>
                    <p>Use the menu to navigate to specific disability categories relevant to your context</p>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-label>
                    <h4>4. Access Resources</h4>
                    <p>Download practical tools, watch videos, and listen to audio guides</p>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-label>
                    <h4>5. Apply and Reflect</h4>
                    <p>Use the interactive elements to test your understanding and reflect on your practice</p>
                  </ion-label>
                </ion-item>
              </ion-list>
              
              <h3>Best Practices</h3>
              <p>Take your time exploring the content. The app is designed to be used at your own pace, allowing you to revisit sections as needed. Use the interactive features to engage actively with the material, and don't hesitate to contact the team if you have questions or suggestions for improvement.</p>
            </ion-card-content>
          </ion-card>
        </div>

        <!-- General Information Page -->
        <div v-else-if="route.params.id === 'General'">
          <!-- How to Use This APP -->
          <ion-card>
            <ion-card-header>
              <ion-card-title>How to Use This APP</ion-card-title>
              <ion-card-subtitle>Getting Started with SAGE</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <h3>Overview of Functionality</h3>
              <p>The SAGE (Supporting Adolescent Girls' Education) app is your comprehensive digital toolkit for understanding and supporting students with disabilities in educational settings. This mobile application provides educators, parents, and support staff with practical guidance, resources, and tools to create inclusive learning environments.</p>
              
              <h3>Key Features</h3>
              <ion-list>
                <ion-item>
                  <ion-icon :icon="informationCircle" slot="start" color="primary"></ion-icon>
                  <ion-label>
                    <h4>Screening Tool</h4>
                    <p>Interactive assessment to identify specific disability categories and get personalized recommendations</p>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-icon :icon="schoolOutline" slot="start" color="secondary"></ion-icon>
                  <ion-label>
                    <h4>Resource Library</h4>
                    <p>Comprehensive collection of guides, videos, audio resources, and practical tools</p>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-icon :icon="accessibilityOutline" slot="start" color="tertiary"></ion-icon>
                  <ion-label>
                    <h4>Disability-Specific Information</h4>
                    <p>Detailed guidance for different categories of disabilities and learning needs</p>
                  </ion-label>
                </ion-item>
              </ion-list>
              
              <h3>Navigation Guide</h3>
              <p>Use the menu to navigate between different sections. The app is organized into seven main areas of needs: Visual Needs, Hearing Needs, Physical and Sensory Needs, Cognitive and Intellectual Needs, Speech and Language Needs, Communication, and Multiple Disabilities. Each section contains specific information, strategies, and resources relevant to that category.</p>
            </ion-card-content>
          </ion-card>

          <!-- Introduction to the Toolkit -->
          <ion-card>
            <ion-card-header>
              <ion-card-title>Introduction to the Toolkit</ion-card-title>
              <ion-card-subtitle>Background and Purpose</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <h3>Background to the Toolkit</h3>
              <p>The SAGE toolkit was developed by The Open University's Access & Success Team in response to the growing need for comprehensive, accessible guidance on supporting students with disabilities in educational settings. Drawing from years of experience working with diverse learners, this toolkit represents a collaborative effort to bridge the gap between policy and practice.</p>
              
              <h3>Why This Toolkit is Important</h3>
              <p>Inclusive education is not just a legal requirement—it's a fundamental human right. Every student deserves access to quality education that meets their individual needs. However, many educators feel unprepared to support students with disabilities effectively. This toolkit addresses this gap by providing practical, evidence-based guidance that can be immediately applied in educational settings.</p>
              
              <h3>Why a Digital Toolkit?</h3>
              <p>The digital format offers several advantages: accessibility across devices, easy updates to reflect current best practices, multimedia content including videos and audio resources, and interactive features like the screening tool and quizzes. This ensures the toolkit remains current and accessible to all users.</p>
              
              <h3>Objectives of the Toolkit</h3>
              <ion-list>
                <ion-item>
                  <ion-icon :icon="checkmark" slot="start" color="success"></ion-icon>
                  <ion-label>Increase awareness and understanding of different disabilities and learning needs</ion-label>
                </ion-item>
                <ion-item>
                  <ion-icon :icon="checkmark" slot="start" color="success"></ion-icon>
                  <ion-label>Provide practical strategies for creating inclusive learning environments</ion-label>
                </ion-item>
                <ion-item>
                  <ion-icon :icon="checkmark" slot="start" color="success"></ion-icon>
                  <ion-label>Support educators in making reasonable adjustments</ion-label>
                </ion-item>
                <ion-item>
                  <ion-icon :icon="checkmark" slot="start" color="success"></ion-icon>
                  <ion-label>Promote partnership working with learners, parents, and other stakeholders</ion-label>
                </ion-item>
              </ion-list>
              
              <h3>Who This Toolkit is Aimed At</h3>
              <p>This toolkit is designed for educators at all levels, including teachers, teaching assistants, support staff, and educational leaders. It's also valuable for parents, caregivers, and anyone involved in supporting students with disabilities. The content is structured to be accessible to both experienced practitioners and those new to inclusive education.</p>
              
              <h3>Understanding Impairments and Needs</h3>
              <p>Throughout this toolkit, we use the terms "impairments" and "needs" carefully. An impairment refers to a physical, sensory, cognitive, or mental health condition that may impact learning. However, we focus on the needs that arise from these impairments rather than defining students by their conditions. This person-centered approach emphasizes what students can do and what support they need to succeed.</p>
            </ion-card-content>
          </ion-card>

          <!-- Reflective Tasks and Quizzes -->
          <ion-card>
            <ion-card-header>
              <ion-card-title>Reflective Tasks, Case Studies and Quizzes</ion-card-title>
              <ion-card-subtitle>Interactive Learning Elements</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <h3>Why We Include Interactive Elements</h3>
              <p>Learning is most effective when it's active and engaging. The reflective tasks, case studies, and quizzes in this toolkit are designed to help you apply theoretical knowledge to real-world situations, test your understanding, and develop practical skills.</p>
              
              <h3>Types of Interactive Content</h3>
              <ion-list>
                <ion-item>
                  <ion-icon :icon="bulbOutline" slot="start" color="warning"></ion-icon>
                  <ion-label>
                    <h4>Reflective Tasks</h4>
                    <p>Questions that encourage you to think about your current practice and consider how you might adapt your approach</p>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-icon :icon="people" slot="start" color="primary"></ion-icon>
                  <ion-label>
                    <h4>Case Studies</h4>
                    <p>Real-world scenarios that demonstrate how different strategies work in practice</p>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-icon :icon="helpCircleOutline" slot="start" color="secondary"></ion-icon>
                  <ion-label>
                    <h4>Quizzes</h4>
                    <p>Knowledge checks that help you assess your understanding and identify areas for further learning</p>
                  </ion-label>
                </ion-item>
              </ion-list>
              
              <h3>How to Complete Interactive Elements</h3>
              <p>Take your time with each interactive element. There are no right or wrong answers for reflective tasks—they're designed to prompt thinking and discussion. For case studies, consider multiple perspectives and how different approaches might work in your context. Quizzes provide immediate feedback to help you track your learning progress.</p>
            </ion-card-content>
          </ion-card>

          <!-- Language of Disability -->
          <ion-card>
            <ion-card-header>
              <ion-card-title>Language of Disability</ion-card-title>
              <ion-card-subtitle>Why Words Matter</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <h3>Why Choice of Words Matters</h3>
              <p>Language shapes our understanding of the world and influences how we treat others. The words we use to describe disability can either promote inclusion and respect or perpetuate stereotypes and discrimination. Thoughtful language choices demonstrate respect for individual dignity and promote positive attitudes toward disability.</p>
              
              <h3>How Language Changes Over Time</h3>
              <p>Disability language has evolved significantly over the past century. Terms that were once considered acceptable are now recognized as outdated or offensive. This evolution reflects broader social changes in how we understand and value human diversity. Staying current with language preferences shows respect for the disability community and demonstrates cultural competence.</p>
              
              <h3>General Guidance on Disability Language</h3>
              <ion-list>
                <ion-item>
                  <ion-icon :icon="checkmark" slot="start" color="success"></ion-icon>
                  <ion-label>Use person-first language (e.g., "student with dyslexia" rather than "dyslexic student")</ion-label>
                </ion-item>
                <ion-item>
                  <ion-icon :icon="checkmark" slot="start" color="success"></ion-icon>
                  <ion-label>Avoid outdated terms like "handicapped," "crippled," or "mentally retarded"</ion-label>
                </ion-item>
                <ion-item>
                  <ion-icon :icon="checkmark" slot="start" color="success"></ion-icon>
                  <ion-label>Respect individual preferences—some people prefer identity-first language</ion-label>
                </ion-item>
                <ion-item>
                  <ion-icon :icon="checkmark" slot="start" color="success"></ion-icon>
                  <ion-label>Focus on abilities and needs rather than limitations</ion-label>
                </ion-item>
                <ion-item>
                  <ion-icon :icon="checkmark" slot="start" color="success"></ion-icon>
                  <ion-label>Use neutral, descriptive language that doesn't carry negative connotations</ion-label>
                </ion-item>
              </ion-list>
            </ion-card-content>
          </ion-card>

          <!-- Working in Partnership -->
          <ion-card>
            <ion-card-header>
              <ion-card-title>Working in Partnership with Learners with Disabilities</ion-card-title>
              <ion-card-subtitle>Collaborative Approaches</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <h3>Partnership with Learners</h3>
              <p>Students with disabilities are experts in their own experiences and needs. Effective support begins with listening to and respecting their perspectives. Involve students in decisions about their learning, accommodations, and support strategies. This collaborative approach promotes self-advocacy and builds confidence.</p>
              
              <h3>Partnership with Parents</h3>
              <p>Parents and caregivers often have valuable insights into their child's needs, preferences, and effective strategies. Regular communication with families helps ensure consistency between home and school support. Respect family expertise while providing professional guidance on educational approaches.</p>
              
              <h3>Partnership with Community</h3>
              <p>Local disability organizations, advocacy groups, and community resources can provide valuable support and expertise. Building relationships with these organizations helps create a network of support for students and families. Community partnerships also help educators stay current with best practices and available resources.</p>
              
              <h3>Partnership with Other Stakeholders</h3>
              <p>Effective support often requires collaboration with multiple professionals, including special education teachers, therapists, medical professionals, and support staff. Clear communication and shared goals ensure coordinated support that meets all aspects of a student's needs.</p>
            </ion-card-content>
          </ion-card>

          <!-- Tensions and Complexities -->
          <ion-card>
            <ion-card-header>
              <ion-card-title>Tensions and Complexities of Working with Learners with Disabilities</ion-card-title>
              <ion-card-subtitle>Navigating Challenges</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <h3>Learners Do Not Fall Neatly into Single Categories</h3>
              <p>Many students have multiple disabilities or learning needs that overlap and interact in complex ways. A student might have both dyslexia and ADHD, or a physical disability combined with learning difficulties. This complexity requires flexible, individualized approaches rather than one-size-fits-all solutions.</p>
              
              <h3>Can't Do Everything - Reasonable Adjustments</h3>
              <p>While we strive to meet all student needs, practical constraints mean we must prioritize and make reasonable adjustments. This involves balancing individual needs with available resources, legal requirements, and the needs of other students. The goal is to provide meaningful support within realistic parameters.</p>
              
              <h3>Resource Constraints: Funds, Staffing, Expertise</h3>
              <p>Limited funding, insufficient staffing, and gaps in expertise are common challenges in inclusive education. These constraints can create tension between ideal support and what's practically achievable. Creative problem-solving, professional development, and advocacy for additional resources are essential strategies for addressing these challenges.</p>
            </ion-card-content>
          </ion-card>

          <!-- Screening and Referring -->
          <ion-card>
            <ion-card-header>
              <ion-card-title>Screening and Referring Learners with Disabilities</ion-card-title>
              <ion-card-subtitle>Identification and Support Pathways</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <h3>The Screening Process</h3>
              <p>Screening is the first step in identifying students who may need additional support. This toolkit includes a comprehensive screening tool that helps educators identify potential areas of need across different disability categories. The screening process should be ongoing, as needs may change over time.</p>
              
              <h3>When to Refer</h3>
              <p>Referral to specialist services should be considered when: screening indicates significant areas of concern, current support strategies are not meeting the student's needs, or there are concerns about the student's safety or well-being. Early referral can prevent problems from escalating and ensure timely access to appropriate support.</p>
              
              <h3>Referral Pathways</h3>
              <ion-list>
                <ion-item>
                  <ion-icon :icon="medicalOutline" slot="start" color="primary"></ion-icon>
                  <ion-label>
                    <h4>Educational Psychology Services</h4>
                    <p>For learning difficulties, behavioral concerns, and cognitive assessments</p>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-icon :icon="bodyOutline" slot="start" color="secondary"></ion-icon>
                  <ion-label>
                    <h4>Occupational Therapy</h4>
                    <p>For physical difficulties, sensory processing issues, and daily living skills</p>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-icon :icon="chatbubbleOutline" slot="start" color="tertiary"></ion-icon>
                  <ion-label>
                    <h4>Speech and Language Therapy</h4>
                    <p>For communication difficulties and language development</p>
                  </ion-label>
                </ion-item>
              </ion-list>
            </ion-card-content>
          </ion-card>

          <!-- Useful Contacts -->
          <ion-card>
            <ion-card-header>
              <ion-card-title>Useful Contacts</ion-card-title>
              <ion-card-subtitle>Support Organizations and Resources</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <h3>National Organizations</h3>
              <ion-list>
                <ion-item>
                  <ion-icon :icon="people" slot="start" color="primary"></ion-icon>
                  <ion-label>
                    <h4>British Dyslexia Association</h4>
                    <p>Support and information for dyslexia</p>
                    <ion-note>www.bdadyslexia.org.uk</ion-note>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-icon :icon="eyeOutline" slot="start" color="secondary"></ion-icon>
                  <ion-label>
                    <h4>Royal National Institute of Blind People (RNIB)</h4>
                    <p>Support for visual impairments</p>
                    <ion-note>www.rnib.org.uk</ion-note>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-icon :icon="earOutline" slot="start" color="tertiary"></ion-icon>
                  <ion-label>
                    <h4>National Deaf Children's Society</h4>
                    <p>Support for hearing impairments</p>
                    <ion-note>www.ndcs.org.uk</ion-note>
                  </ion-label>
                </ion-item>
              </ion-list>
              
              <h3>Educational Support</h3>
              <ion-list>
                <ion-item>
                  <ion-icon :icon="school" slot="start" color="success"></ion-icon>
                  <ion-label>
                    <h4>Special Educational Needs and Disability Information, Advice and Support Services (SENDIASS)</h4>
                    <p>Free, impartial information and advice about SEN and disability</p>
                    <ion-note>Available in all local authorities</ion-note>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-icon :icon="shieldCheckmark" slot="start" color="warning"></ion-icon>
                  <ion-label>
                    <h4>Equality and Human Rights Commission</h4>
                    <p>Information about disability rights and discrimination</p>
                    <ion-note>www.equalityhumanrights.com</ion-note>
                  </ion-label>
                </ion-item>
              </ion-list>
              
              <h3>Technology and Assistive Devices</h3>
              <ion-list>
                <ion-item>
                  <ion-icon :icon="bulbOutline" slot="start" color="primary"></ion-icon>
                  <ion-label>
                    <h4>AbilityNet</h4>
                    <p>Technology support for disabled people</p>
                    <ion-note>www.abilitynet.org.uk</ion-note>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-icon :icon="medicalOutline" slot="start" color="secondary"></ion-icon>
                  <ion-label>
                    <h4>Disabled Living Foundation</h4>
                    <p>Information about equipment and adaptations</p>
                    <ion-note>www.dlf.org.uk</ion-note>
                  </ion-label>
                </ion-item>
              </ion-list>
            </ion-card-content>
          </ion-card>

          <!-- Video Tutorials -->
          <ion-card>
            <ion-card-header>
              <ion-card-title>Video Tutorials</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <ion-segment v-model="selectedVideo" :scrollable="true">
                <ion-segment-button value="udl-video">
                  <ion-label>UDL Overview</ion-label>
                </ion-segment-button>
                <ion-segment-button value="tech-video">
                  <ion-label>Assistive Tech</ion-label>
                </ion-segment-button>
                <ion-segment-button value="policy-video">
                  <ion-label>OU Policy</ion-label>
                </ion-segment-button>
              </ion-segment>

              <div class="ion-padding">
                <div v-if="selectedVideo === 'udl-video'">
                  <h4>Universal Design for Learning</h4>
                  <p>Learn about the three principles of UDL and how to apply them in your teaching.</p>
                  <ion-button expand="block" @click="playVideo('udl')">
                    <ion-icon :icon="play" slot="start"></ion-icon>
                    Watch Video
                  </ion-button>
                </div>
                <div v-else-if="selectedVideo === 'tech-video'">
                  <h4>Assistive Technologies</h4>
                  <p>Explore various assistive technologies and how they support different learning needs.</p>
                  <ion-button expand="block" @click="playVideo('tech')">
                    <ion-icon :icon="play" slot="start"></ion-icon>
                    Watch Video
                  </ion-button>
                </div>
                <div v-else-if="selectedVideo === 'policy-video'">
                  <h4>OU Accessibility Policy</h4>
                  <p>Understand The Open University's commitment to accessibility and inclusion.</p>
                  <ion-button expand="block" @click="playVideo('policy')">
                    <ion-icon :icon="play" slot="start"></ion-icon>
                    Watch Video
                  </ion-button>
                </div>
              </div>
            </ion-card-content>
          </ion-card>
        </div>

        <!-- Enhanced Screening Tool/Quiz -->
        <div v-else-if="route.params.id === 'Screening'">
          <ion-card v-if="!screeningStarted">
            <ion-card-header>
              <ion-card-title>Screening Tool</ion-card-title>
              <ion-card-subtitle>Disability Awareness Assessment</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <p>This comprehensive questionnaire helps identify which disability categories might be most relevant 
              for your current situation. Answer questions to get personalized guidance and recommendations.</p>
              
              <ion-list>
                <ion-item>
                  <ion-icon :icon="informationCircle" slot="start" color="primary"></ion-icon>
                  <ion-label>
                    <h3>What you'll learn:</h3>
                    <p>• Your knowledge level in different disability areas</p>
                    <p>• Personalized recommendations for further study</p>
                    <p>• Practical strategies for your teaching context</p>
                  </ion-label>
                </ion-item>
              </ion-list>
              
              <ion-button expand="block" color="primary" @click="startScreening">
                <ion-icon :icon="play" slot="start"></ion-icon>
                Start Screening Assessment
              </ion-button>
            </ion-card-content>
          </ion-card>

          <!-- Quiz Questions -->
          <div v-if="screeningStarted && currentQuestion < questions.length">
            <ion-card>
              <ion-card-header>
                <ion-card-title>Question {{ currentQuestion + 1 }} of {{ questions.length }}</ion-card-title>
                <ion-progress-bar :value="(currentQuestion + 1) / questions.length" color="primary"></ion-progress-bar>
              </ion-card-header>
              <ion-card-content>
                <h3>{{ currentQuizQuestionObj.question }}</h3>
                
                <div v-if="currentQuizQuestionObj.type === 'radio'">
                  <ion-radio-group v-model="currentAnswer">
                    <ion-item v-for="(option, index) in (currentQuizQuestionObj.type === 'radio' ? currentQuizQuestionObj.options : [])" :key="index">
                      <ion-radio :value="option.value" slot="start"></ion-radio>
                      <ion-label>{{ option.text }}</ion-label>
                    </ion-item>
                  </ion-radio-group>
                </div>
                <div v-else-if="currentQuizQuestionObj.type === 'select'">
                  <ion-item>
                    <ion-label>Select an option</ion-label>
                    <ion-select v-model="currentAnswer" interface="popover" placeholder="Choose one">
                      <ion-select-option v-for="option in (currentQuizQuestionObj.type === 'select' ? currentQuizQuestionObj.options : [])" :key="option.value" :value="option.value">
                        {{ option.text }}
                      </ion-select-option>
                    </ion-select>
                  </ion-item>
                </div>
                <div v-else-if="currentQuizQuestionObj.type === 'input'">
                  <ion-item>
                    <ion-label position="stacked">Your Answer</ion-label>
                    <ion-input v-model="currentAnswer" :placeholder="currentQuizQuestionObj.type === 'input' ? currentQuizQuestionObj.placeholder : ''" clear-input></ion-input>
                  </ion-item>
                </div>
                <div v-else-if="currentQuizQuestionObj.type === 'checkbox'">
                  <ion-list>
                    <ion-item v-for="option in (currentQuizQuestionObj.type === 'checkbox' ? currentQuizQuestionObj.options : [])" :key="option.value">
                      <ion-checkbox v-model="checkboxAnswers[option.value]" slot="start"></ion-checkbox>
                      <ion-label>{{ option.text }}</ion-label>
                    </ion-item>
                  </ion-list>
                </div>
                <div v-else-if="currentQuizQuestionObj.type === 'toggle'">
                  <ion-item>
                    <ion-label>{{ currentQuizQuestionObj.question }}</ion-label>
                    <ion-toggle v-model="currentAnswer" slot="end"></ion-toggle>
                  </ion-item>
                </div>
                <div v-else-if="currentQuizQuestionObj.type === 'range'">
                  <ion-item>
                    <ion-label position="stacked">{{ currentQuizQuestionObj.question }}</ion-label>
                    <ion-range
                      v-model="currentAnswer"
                      :min="currentQuizQuestionObj.type === 'range' ? currentQuizQuestionObj.min : 0"
                      :max="currentQuizQuestionObj.type === 'range' ? currentQuizQuestionObj.max : 10"
                      :step="currentQuizQuestionObj.type === 'range' ? currentQuizQuestionObj.step || 1 : 1"
                      :snaps="true"
                      :ticks="true"
                      :pin="true"
                    >
                      <ion-label slot="start">{{ currentQuizQuestionObj.type === 'range' ? currentQuizQuestionObj.min : 0 }}</ion-label>
                      <ion-label slot="end">{{ currentQuizQuestionObj.type === 'range' ? currentQuizQuestionObj.max : 10 }}</ion-label>
                    </ion-range>
                  </ion-item>
                  <ion-note>Selected: {{ currentAnswer }}</ion-note>
                </div>
                <div v-else-if="currentQuizQuestionObj.type === 'textarea'">
                  <ion-item>
                    <ion-label position="stacked">{{ currentQuizQuestionObj.question }}</ion-label>
                    <ion-textarea
                      v-model="currentAnswer"
                      :placeholder="currentQuizQuestionObj.type === 'textarea' ? currentQuizQuestionObj.placeholder : ''"
                      :rows="currentQuizQuestionObj.type === 'textarea' ? currentQuizQuestionObj.rows || 4 : 4"
                      :auto-grow="true"
                      :maxlength="1000"
                      :counter="true"
                    ></ion-textarea>
                  </ion-item>
                </div>
                
                <div class="ion-padding-top">
                  <ion-button expand="block" color="primary" @click="nextQuestion" :disabled="!currentAnswer">
                    {{ currentQuestion === questions.length - 1 ? 'Finish Assessment' : 'Next Question' }}
                  </ion-button>
                </div>
              </ion-card-content>
            </ion-card>
          </div>

          <!-- Quiz Results -->
          <div v-if="screeningCompleted">
            <ion-card>
              <ion-card-header>
                <ion-card-title>Assessment Results</ion-card-title>
                <ion-card-subtitle>Your Personalized Recommendations</ion-card-subtitle>
              </ion-card-header>
              <ion-card-content>
                <ion-list>
                  <ion-item v-for="(category, index) in results" :key="index">
                    <ion-icon :icon="category.icon" slot="start" :color="category.color"></ion-icon>
                    <ion-label>
                      <h3>{{ category.name }}</h3>
                      <p>{{ category.description }}</p>
                      <ion-progress-bar :value="category.score / 100" :color="category.color"></ion-progress-bar>
                      <ion-note>{{ category.score }}% - {{ category.level }}</ion-note>
                    </ion-label>
                  </ion-item>
                </ion-list>
                
                <ion-button expand="block" color="primary" @click="resetScreening">
                  <ion-icon :icon="refresh" slot="start"></ion-icon>
                  Retake Assessment
                </ion-button>
              </ion-card-content>
            </ion-card>
          </div>
        </div>

        <!-- Enhanced Resources Page -->
        <div v-else-if="route.params.id === 'Resources'">
          <!-- Search Bar -->
          <ion-searchbar 
            v-model="searchTerm" 
            placeholder="Search resources..."
            :debounce="300"
            @ionInput="filterResources">
          </ion-searchbar>

          <!-- Resource Categories -->
                     <ion-segment v-model="selectedCategory" :scrollable="true">
             <ion-segment-button value="all">
               <ion-label>All</ion-label>
             </ion-segment-button>
             <ion-segment-button value="videos">
               <ion-label>Videos</ion-label>
             </ion-segment-button>
             <ion-segment-button value="audio">
               <ion-label>Audio</ion-label>
             </ion-segment-button>
             <ion-segment-button value="documents">
               <ion-label>Documents</ion-label>
             </ion-segment-button>
           </ion-segment>

          <!-- Filtered Resources -->
          <ion-list>
            <ion-item v-for="resource in filteredResources" :key="resource.id" button @click="openResource(resource)">
              <ion-thumbnail slot="start">
                <ion-icon :icon="resource.icon" size="large" :color="resource.color"></ion-icon>
              </ion-thumbnail>
              <ion-label>
                <h3>{{ resource.title }}</h3>
                <p>{{ resource.description }}</p>
                <ion-chip :color="resource.category" size="small">
                  <ion-label>{{ resource.category }}</ion-label>
                </ion-chip>
              </ion-label>
              <ion-button fill="clear" slot="end" @click="downloadResource(resource)">
                <ion-icon :icon="download"></ion-icon>
              </ion-button>
            </ion-item>
          </ion-list>

          <!-- Quick Actions -->
          <ion-fab vertical="bottom" horizontal="end" slot="fixed">
            <ion-fab-button @click="presentActionSheet">
              <ion-icon :icon="add"></ion-icon>
            </ion-fab-button>
          </ion-fab>
        </div>

        <!-- Enhanced About Page -->
        <div v-else-if="route.params.id === 'About'">
          <!-- Project Overview -->
          <ion-card>
            <ion-card-header>
              <ion-card-title>About SAGE</ion-card-title>
              <ion-card-subtitle>Supporting Adolescent Girls' Education</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <h3>Project Mission</h3>
              <p>SAGE (Supporting Adolescent Girls' Education) is a comprehensive digital toolkit developed by The Open University's Access & Success Team. Our mission is to bridge the gap between policy and practice in inclusive education, providing educators with practical, evidence-based guidance to support students with disabilities effectively.</p>
              
              <h3>Our Approach</h3>
              <p>We believe that every student deserves access to quality education that meets their individual needs. Our approach is grounded in the principles of Universal Design for Learning (UDL), which emphasizes creating learning experiences that work for everyone from the start, rather than retrofitting accommodations for specific students.</p>
              
              <ion-list>
                <ion-item>
                  <ion-icon :icon="people" slot="start" color="primary"></ion-icon>
                  <ion-label>
                    <h3>Project Team</h3>
                    <p>Access & Success Team, The Open University</p>
                    <ion-note>Comprised of educational specialists, disability experts, and technology professionals</ion-note>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-icon :icon="calendar" slot="start" color="secondary"></ion-icon>
                  <ion-label>
                    <h3>Version</h3>
                    <p>1.0.0 - Initial Release</p>
                    <ion-note>Released: December 2024</ion-note>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-icon :icon="mail" slot="start" color="tertiary"></ion-icon>
                  <ion-label>
                    <h3>Contact</h3>
                    <p>access-success@open.ac.uk</p>
                    <ion-note>We welcome feedback and suggestions for improvement</ion-note>
                  </ion-label>
                </ion-item>
              </ion-list>
            </ion-card-content>
          </ion-card>

          <!-- Project Scope -->
          <ion-card>
            <ion-card-header>
              <ion-card-title>Project Scope</ion-card-title>
              <ion-card-subtitle>Comprehensive Coverage of Disability Categories</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <h3>Disability Categories Covered</h3>
              <p>This first release focuses on four key disability categories, each representing different areas of need and requiring specific approaches to support:</p>
              
              <!-- Numbered List -->
              <ion-list>
                <ion-item>
                  <ion-label>
                    <h4>1. Visual Needs</h4>
                    <p>Visual, hearing, mobility, and speech impairments</p>
                    <ion-note>Focus on accessibility, assistive technologies, and environmental adaptations</ion-note>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-label>
                    <h4>2. Cognition & Learning</h4>
                    <p>Dyslexia, dyscalculia, ADHD, and memory issues</p>
                    <ion-note>Emphasis on multi-sensory approaches and cognitive support strategies</ion-note>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-label>
                    <h4>3. Communication & Interaction</h4>
                    <p>Autism spectrum, social anxiety, language barriers</p>
                    <ion-note>Focus on social communication, sensory needs, and structured learning environments</ion-note>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-label>
                    <h4>4. Multiple Impairments</h4>
                    <p>Complex needs and combined disabilities</p>
                    <ion-note>Integrated approaches addressing multiple areas of need simultaneously</ion-note>
                  </ion-label>
                </ion-item>
              </ion-list>
            </ion-card-content>
          </ion-card>

          <!-- Development Process -->
          <ion-card>
            <ion-card-header>
              <ion-card-title>Development Process</ion-card-title>
              <ion-card-subtitle>How SAGE Was Created</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <h3>Research and Consultation</h3>
              <p>The development of SAGE involved extensive research, consultation with disability experts, educators, and students with disabilities. We reviewed current best practices, evidence-based interventions, and gathered feedback from the educational community to ensure the toolkit meets real-world needs.</p>
              
              <h3>Content Development</h3>
              <p>All content was developed by educational specialists with expertise in inclusive education and disability support. We worked closely with disability organizations and advocacy groups to ensure accuracy, sensitivity, and relevance to current educational contexts.</p>
              
              <h3>Technology and Accessibility</h3>
              <p>The digital platform was designed with accessibility in mind from the start. We followed Web Content Accessibility Guidelines (WCAG) 2.1 standards and tested the app with users who have various disabilities to ensure it works for everyone.</p>
            </ion-card-content>
          </ion-card>

          <!-- Future Plans -->
          <ion-card>
            <ion-card-header>
              <ion-card-title>Future Development</ion-card-title>
              <ion-card-subtitle>What's Next for SAGE</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <h3>Planned Updates</h3>
              <ion-list>
                <ion-item>
                  <ion-icon :icon="add" slot="start" color="success"></ion-icon>
                  <ion-label>
                    <h4>Additional Disability Categories</h4>
                    <p>Expanding coverage to include more specific conditions and learning differences</p>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-icon :icon="videocamOutline" slot="start" color="secondary"></ion-icon>
                  <ion-label>
                    <h4>Enhanced Multimedia Content</h4>
                    <p>More video case studies, interactive simulations, and audio resources</p>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-icon :icon="people" slot="start" color="tertiary"></ion-icon>
                  <ion-label>
                    <h4>Community Features</h4>
                    <p>Forums for educators to share experiences and best practices</p>
                  </ion-label>
                </ion-item>
              </ion-list>
              
              <h3>Feedback and Improvement</h3>
              <p>We are committed to continuous improvement based on user feedback and emerging research. Your input helps us make SAGE more effective and relevant for educators and students.</p>
              
              <ion-button expand="block" color="primary" @click="contactTeam">
                <ion-icon :icon="mail" slot="start"></ion-icon>
                Contact the Team
              </ion-button>
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
  schoolOutline,
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
  people,
  school,
  informationCircle,
  refresh,
  download,
  add,
  calendar,
  mail,
  bulbOutline,
  helpCircleOutline,
  medicalOutline,
  bodyOutline,
  chatbubbleOutline,
  eyeOutline,
  earOutline,
  printOutline,
  trophy,
  arrowForward
} from 'ionicons/icons';
import MediaPlayer from '../components/MediaPlayer.vue';

const route = useRoute();
const router = useRouter();

// Quiz/Screening state
const screeningStarted = ref(false);
const screeningCompleted = ref(false);
const currentQuestion = ref(0);
const currentAnswer = ref<any>('');
const selectedVideo = ref('udl-video');
const searchTerm = ref('');
const selectedCategory = ref('all');

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
  const id = route.params.id as string;
  console.log('Route ID:', id); // Debug logging
  
  // Handle case sensitivity - check both exact match and case-insensitive
  const titles: { [key: string]: string } = {
    'Home': 'SAGE Disability v0.0.5',
    'home': 'SAGE Disability v0.0.5', // Add lowercase version
    'General': 'General Information',
    'Screening': 'Screening Tool',
    'Resources': 'Resources',
    'About': 'About SAGE'
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
  
  const finalTitle = title || id;
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
  max-width: 100%;
  height: auto;
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
  div[v-if="route.params.id === 'About'"],
  div[v-if="route.params.id === 'Resources'"],
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
