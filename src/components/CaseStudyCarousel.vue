<template>
  <div class="case-study-carousel">
    <div
      ref="viewport"
      class="carousel-viewport"
      role="group"
      aria-label="Case study images"
      @scroll="handleScroll"
    >
      <div v-for="(image, index) in images" :key="`case-study-${index}`" class="carousel-item">
        <img :src="image.src" :alt="image.alt" class="carousel-image" />
      </div>
    </div>

    <div v-if="images.length > 1" class="carousel-controls">
      <ion-button
        fill="clear"
        size="small"
        :disabled="currentIndex === 0"
        aria-label="Previous image"
        @click="scrollPrev"
      >
        <ion-icon :icon="chevronBack"></ion-icon>
      </ion-button>
      <ion-button
        fill="clear"
        size="small"
        :disabled="currentIndex >= images.length - 1"
        aria-label="Next image"
        @click="scrollNext"
      >
        <ion-icon :icon="chevronForward"></ion-icon>
      </ion-button>
    </div>

    <div v-if="images.length > 1" class="carousel-dots" role="tablist" aria-label="Image navigation">
      <button
        v-for="(_, index) in images"
        :key="`case-study-dot-${index}`"
        class="carousel-dot"
        :class="{ 'is-active': index === currentIndex }"
        :aria-label="`Go to image ${index + 1}`"
        :aria-current="index === currentIndex ? 'true' : 'false'"
        @click="scrollToIndex(index)"
      ></button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IonButton, IonIcon } from '@ionic/vue';
import { chevronBack, chevronForward } from 'ionicons/icons';

interface CaseStudyImage {
  src: string;
  alt: string;
}

const props = defineProps<{
  images: CaseStudyImage[];
}>();

const viewport = ref<HTMLElement | null>(null);
const currentIndex = ref(0);

const handleScroll = () => {
  if (!viewport.value) return;
  const width = viewport.value.clientWidth;
  if (!width) return;
  const nextIndex = Math.round(viewport.value.scrollLeft / width);
  currentIndex.value = Math.min(props.images.length - 1, Math.max(0, nextIndex));
};

const scrollToIndex = (index: number) => {
  if (!viewport.value) return;
  const width = viewport.value.clientWidth;
  viewport.value.scrollTo({ left: width * index, behavior: 'smooth' });
  currentIndex.value = index;
};

const scrollPrev = () => {
  scrollToIndex(Math.max(0, currentIndex.value - 1));
};

const scrollNext = () => {
  scrollToIndex(Math.min(props.images.length - 1, currentIndex.value + 1));
};
</script>

<style scoped>
.case-study-carousel {
  margin-bottom: 12px;
}

.carousel-viewport {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 6px;
}

.carousel-item {
  flex: 0 0 100%;
  scroll-snap-align: center;
  display: flex;
  justify-content: center;
}

.carousel-image {
  width: 100%;
  max-width: 720px;
  height: auto;
  object-fit: contain;
  display: block;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.carousel-controls {
  margin-top: 6px;
  display: flex;
  justify-content: center;
  gap: 8px;
}

.carousel-dots {
  margin-top: 4px;
  display: flex;
  justify-content: center;
  gap: 6px;
}

.carousel-dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  border: none;
  background: var(--ion-color-medium);
  opacity: 0.35;
}

.carousel-dot.is-active {
  opacity: 1;
  background: var(--ion-color-primary);
}
</style>
