<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>General Information</ion-title>
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
          <ion-title size="large">General Information</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <ion-card id="introduction-background">
          <ion-card-header>
            <ion-card-title>Background to the toolkit</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>According to the World Health Organisation, around 15% of the world’s population has some form of disability. Many are excluded from education and face barriers that stop them from taking part in society equally with others.</p>
            <p>Getting an education is especially difficult in low- and middle-income countries due to challenges, such as:</p>
            <ul>
              <li>negative attitudes and stigma about disability</li>
              <li>long distances to school and/or poor transport networks</li>
              <li>school buildings and facilities that are not accessible</li>
              <li>teaching and learning materials that are not usable by everyone</li>
              <li>a shortage of teachers trained to support learners with disabilities.</li>
            </ul>
            <p>To change this, there is a need for clear, practical guidance on how to teach in ways that include all learners.</p>
            <p>The toolkit gives educators practical guidance on how to include learners with disabilities into all aspects of school and classroom life and support their progress in learning. The toolkit identifies resources that can be adapted for various needs and acts as a bridge between policy and practice by turning laws and commitments, such as the Convention on the Rights of Persons with Disabilities, into real actions that make classrooms inclusive.</p>
          </ion-card-content>
        </ion-card>

        <ion-card id="introduction-objectives">
          <ion-card-header>
            <ion-card-title>Objectives of the toolkit</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>The toolkit aims to help educators and others to:</p>
            <ol type="i">
              <li>use respectful language when talking to or about learners with disabilities</li>
              <li>recognise, screen, and refer learners with disabilities for further assessment and support</li>
              <li>teach in inclusive ways that meet the needs of all learners.</li>
            </ol>
          </ion-card-content>
        </ion-card>

        <ion-card id="introduction-info-source">
          <ion-card-header>
            <ion-card-title>Toolkit as an information source</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>The digital toolkit can be used by educators as an interactive and accessible information source which provides advice and guidance for learners in their classes or groups.</p>
            <p>It includes information in written, picture and video format to inform and illustrate strategies and resources for learners with different needs. The signposting tool can be used to screen learners and decide next steps.</p>
          </ion-card-content>
        </ion-card>

        <ion-card id="introduction-pd-resource">
          <ion-card-header>
            <ion-card-title>Toolkit as a professional learning resource</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>The digital toolkit can also be used by educators as a source of professional learning. Educators can choose to complete reflective tasks and quizzes.</p>
            <p>Responses to the reflective tasks can be typed into the App and are saved so that you can return to them at a later date. Quizzes are automatically marked and feedback given to support learning.</p>
          </ion-card-content>
        </ion-card>

        <ion-card id="introduction-certificate">
          <ion-card-header>
            <ion-card-title>Certificate of Participation</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>Educators who choose to use the toolkit as a professional learning resource should complete all of the tasks and quizzes in order to receive a certificate of participation which recognises their engagement with the learning and resources in this toolkit.</p>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonButtons, IonButton, IonIcon, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, actionSheetController } from '@ionic/vue';
import { ellipsisVertical } from 'ionicons/icons';

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
    // Fallback: simple print
    printPage();
  }
};

const printPage = () => {
  if (typeof window !== 'undefined') {
    window.print();
  }
};

const openAccessibilitySettings = () => {
  // Placeholder for future accessibility settings
  console.log('Accessibility settings coming soon!');
};
</script>

<style scoped>
ion-card { margin: 16px; }
</style> 