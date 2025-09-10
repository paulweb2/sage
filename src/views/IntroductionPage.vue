<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>Introduction</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Introduction</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <ion-card id="introduction-background">
          <ion-card-header>
            <ion-card-title>Background</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>This toolkit supports inclusive education across Zimbabwe, aligning with MoPSE guidance and sector partners. Placeholder background text goes here.</p>
          </ion-card-content>
        </ion-card>

        <ion-card id="introduction-objectives">
          <ion-card-header>
            <ion-card-title>Objectives</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>Provide practical guidance, resources and reflections to support inclusive, equitable learning for girls and learners with disabilities. Placeholder objectives text.</p>
          </ion-card-content>
        </ion-card>

        <ion-card id="introduction-info-source">
          <ion-card-header>
            <ion-card-title>Toolkit as an information source</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>Use topic pages for language, understanding learners, enabling strategies, resources and cases. Placeholder information source text.</p>
          </ion-card-content>
        </ion-card>

        <ion-card id="introduction-pd-resource">
          <ion-card-header>
            <ion-card-title>Toolkit as a professional development resource</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>Engage with reflective tasks, quizzes and case studies to build practice over time—individually or in communities of practice. Placeholder PD text.</p>
          </ion-card-content>
        </ion-card>

        <ion-card id="introduction-certificate">
          <ion-card-header>
            <ion-card-title>Certificate of Completion</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <p>Complete the activities to earn a certificate of completion acknowledging your engagement with the toolkit. Placeholder certificate text.</p>
          </ion-card-content>
        </ion-card>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/vue';
</script>

<style scoped>
ion-card { margin: 16px; }
</style> 