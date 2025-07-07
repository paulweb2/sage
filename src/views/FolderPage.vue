<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ getPageTitle() }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ getPageTitle() }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <div v-if="route.params.id === 'Home'">
          <ion-card>
            <ion-card-header>
              <ion-card-title>Welcome to SAGE</ion-card-title>
              <ion-card-subtitle>Supporting Adolescent Girls' Education</ion-card-subtitle>
            </ion-card-header>
            <ion-card-content>
              <p>SAGE is your mobile learning companion for understanding and supporting students with disabilities. 
              Get practical guidance, case studies, and resources to help create inclusive learning environments.</p>
              
              <ion-button expand="block" fill="outline" class="ion-margin-top">
                <ion-icon :icon="accessibilityOutline" slot="start"></ion-icon>
                Start Screening Tool
              </ion-button>
            </ion-card-content>
          </ion-card>

          <ion-grid>
            <ion-row>
              <ion-col size="6">
                <ion-card>
                  <ion-card-content>
                    <ion-icon :icon="informationCircleOutline" size="large" color="primary"></ion-icon>
                    <h3>General Information</h3>
                    <p>Universal Design for Learning principles and OU policies</p>
                  </ion-card-content>
                </ion-card>
              </ion-col>
              <ion-col size="6">
                <ion-card>
                  <ion-card-content>
                    <ion-icon :icon="schoolOutline" size="large" color="secondary"></ion-icon>
                    <h3>Resources</h3>
                    <p>PDFs, videos, and practical tools for educators</p>
                  </ion-card-content>
                </ion-card>
              </ion-col>
            </ion-row>
          </ion-grid>
        </div>

        <div v-else-if="route.params.id === 'General'">
          <ion-card>
            <ion-card-header>
              <ion-card-title>General Information</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <h3>Universal Design for Learning (UDL)</h3>
              <p>UDL is a framework for designing learning experiences that work for everyone. 
              It provides multiple means of engagement, representation, and action & expression.</p>
              
              <h3>Assistive Technologies</h3>
              <p>Overview of technologies that help students with disabilities access learning materials 
              and participate fully in educational activities.</p>
              
              <h3>OU Policy & Support</h3>
              <p>Information about The Open University's commitment to accessibility and available support services.</p>
            </ion-card-content>
          </ion-card>
        </div>

        <div v-else-if="route.params.id === 'Screening'">
          <ion-card>
            <ion-card-header>
              <ion-card-title>Screening Tool</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <p>This simple questionnaire helps identify which disability categories might be most relevant 
              for your current situation. Answer a few questions to get personalized guidance.</p>
              
              <ion-button expand="block" color="primary">
                Start Screening
              </ion-button>
            </ion-card-content>
          </ion-card>
        </div>

        <div v-else-if="route.params.id === 'Resources'">
          <ion-card>
            <ion-card-header>
              <ion-card-title>Resources</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <ion-list>
                <ion-item>
                  <ion-icon :icon="documentOutline" slot="start"></ion-icon>
                  <ion-label>
                    <h3>Accessibility Guidelines</h3>
                    <p>Comprehensive guide for creating accessible content</p>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-icon :icon="videocamOutline" slot="start"></ion-icon>
                  <ion-label>
                    <h3>Case Study Videos</h3>
                    <p>Real-world examples of inclusive teaching practices</p>
                  </ion-label>
                </ion-item>
                <ion-item>
                  <ion-icon :icon="micOutline" slot="start"></ion-icon>
                  <ion-label>
                    <h3>Audio Resources</h3>
                    <p>Podcasts and audio guides for educators</p>
                  </ion-label>
                </ion-item>
              </ion-list>
            </ion-card-content>
          </ion-card>
        </div>

        <div v-else-if="route.params.id === 'About'">
          <ion-card>
            <ion-card-header>
              <ion-card-title>About SAGE</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <p>SAGE (Supporting Adolescent Girls' Education) is developed by The Open University's 
              Access & Success Team to help educators understand and support students with disabilities.</p>
              
              <h3>Project Scope</h3>
              <p>This first release focuses on four key disability categories: Physical, Cognition & Learning, 
              Communication & Interaction, and Multiple Impairments.</p>
              
              <h3>Contact</h3>
              <p>For questions or feedback, please contact the Access & Success Team.</p>
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
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/vue';
import { 
  accessibilityOutline,
  informationCircleOutline,
  schoolOutline,
  documentOutline,
  videocamOutline,
  micOutline
} from 'ionicons/icons';

const route = useRoute();

const getPageTitle = () => {
  const id = route.params.id as string;
  const titles: { [key: string]: string } = {
    'Home': 'SAGE Disability',
    'General': 'General Information',
    'Screening': 'Screening Tool',
    'Resources': 'Resources',
    'About': 'About SAGE'
  };
  return titles[id] || id;
};
</script>

<style scoped>
#container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

ion-card {
  margin-bottom: 20px;
}

ion-card-content h3 {
  color: var(--ion-color-primary);
  margin-top: 20px;
  margin-bottom: 10px;
}

ion-card-content h3:first-child {
  margin-top: 0;
}

ion-grid {
  margin-top: 20px;
}

ion-card-content ion-icon {
  display: block;
  margin: 0 auto 10px;
  text-align: center;
}

ion-card-content h3 {
  text-align: center;
  margin-top: 10px;
}
</style>
