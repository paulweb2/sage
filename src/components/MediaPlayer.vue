<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>{{ title }}</ion-card-title>
      <ion-card-subtitle>{{ subtitle }}</ion-card-subtitle>
    </ion-card-header>
    <ion-card-content>
      <!-- Video Player -->
      <div v-if="type === 'video'" class="video-container">
        <video 
          ref="videoPlayer"
          :src="src" 
          controls
          preload="metadata"
          class="video-player">
          Your browser does not support the video tag.
        </video>
        
        <div class="video-controls">
          <ion-button fill="clear" @click="togglePlay">
            <ion-icon :icon="isPlaying ? pause : play" slot="start"></ion-icon>
            {{ isPlaying ? 'Pause' : 'Play' }}
          </ion-button>
          
          <ion-button fill="clear" @click="toggleMute">
            <ion-icon :icon="isMuted ? volumeMute : volumeHigh" slot="start"></ion-icon>
            {{ isMuted ? 'Unmute' : 'Mute' }}
          </ion-button>
          
          <ion-button fill="clear" @click="toggleFullscreen">
            <ion-icon :icon="expand" slot="start"></ion-icon>
            Fullscreen
          </ion-button>
        </div>
      </div>

      <!-- Audio Player -->
      <div v-else-if="type === 'audio'" class="audio-container">
        <audio 
          ref="audioPlayer"
          :src="src" 
          preload="metadata"
          class="audio-player">
          Your browser does not support the audio tag.
        </audio>
        
        <div class="audio-info">
          <ion-icon :icon="musicalNote" size="large" color="primary"></ion-icon>
          <div class="audio-details">
            <h3>{{ title }}</h3>
            <p>{{ subtitle }}</p>
          </div>
        </div>
        
        <div class="audio-controls">
          <ion-button fill="clear" @click="togglePlay" size="large">
            <ion-icon :icon="isPlaying ? pause : play" size="large"></ion-icon>
          </ion-button>
          
          <ion-button fill="clear" @click="toggleMute">
            <ion-icon :icon="isMuted ? volumeMute : volumeHigh"></ion-icon>
          </ion-button>
          
          <ion-range 
            :value="currentTime" 
            @ionChange="seekAudio"
            :max="duration"
            :min="0"
            :step="0.1"
            color="primary">
            <ion-label slot="start">{{ formatTime(currentTime) }}</ion-label>
            <ion-label slot="end">{{ formatTime(duration) }}</ion-label>
          </ion-range>
        </div>
        
        <div class="audio-progress">
          <ion-progress-bar :value="progress" color="primary"></ion-progress-bar>
        </div>
      </div>

      <!-- Media Info -->
      <div class="media-info">
        <ion-chip :color="type === 'video' ? 'secondary' : 'tertiary'">
          <ion-icon :icon="type === 'video' ? videocam : musicalNote"></ion-icon>
          <ion-label>{{ type === 'video' ? 'Video' : 'Audio' }}</ion-label>
        </ion-chip>
        
        <ion-chip color="medium">
          <ion-icon :icon="time"></ion-icon>
          <ion-label>{{ formatDuration(duration) }}</ion-label>
        </ion-chip>
      </div>

      <!-- Download Button -->
      <ion-button expand="block" fill="outline" @click="downloadMedia">
        <ion-icon :icon="download" slot="start"></ion-icon>
        Download {{ type === 'video' ? 'Video' : 'Audio' }}
      </ion-button>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonRange,
  IonProgressBar,
  IonChip,
  IonLabel,
  toastController
} from '@ionic/vue';
import {
  play,
  pause,
  volumeHigh,
  volumeMute,
  expand,
  musicalNote,
  videocam,
  time,
  download
} from 'ionicons/icons';

interface Props {
  type: 'video' | 'audio';
  title: string;
  subtitle: string;
  src: string;
  duration?: number;
}

const props = withDefaults(defineProps<Props>(), {
  duration: 0
});

const videoPlayer = ref<HTMLVideoElement>();
const audioPlayer = ref<HTMLAudioElement>();
const isPlaying = ref(false);
const isMuted = ref(false);
const currentTime = ref(0);
const duration = ref(props.duration);

const progress = computed(() => {
  if (duration.value === 0) return 0;
  return (currentTime.value / duration.value) * 100;
});

onMounted(() => {
  const player = props.type === 'video' ? videoPlayer.value : audioPlayer.value;
  if (player) {
    player.addEventListener('loadedmetadata', () => {
      duration.value = player.duration;
    });
    
    player.addEventListener('timeupdate', () => {
      currentTime.value = player.currentTime;
    });
    
    player.addEventListener('play', () => {
      isPlaying.value = true;
    });
    
    player.addEventListener('pause', () => {
      isPlaying.value = false;
    });
    
    player.addEventListener('ended', () => {
      isPlaying.value = false;
      currentTime.value = 0;
    });
  }
});

onUnmounted(() => {
  const player = props.type === 'video' ? videoPlayer.value : audioPlayer.value;
  if (player) {
    player.pause();
  }
});

const togglePlay = () => {
  const player = props.type === 'video' ? videoPlayer.value : audioPlayer.value;
  if (player) {
    if (isPlaying.value) {
      player.pause();
    } else {
      player.play();
    }
  }
};

const toggleMute = () => {
  const player = props.type === 'video' ? videoPlayer.value : audioPlayer.value;
  if (player) {
    player.muted = !player.muted;
    isMuted.value = player.muted;
  }
};

const toggleFullscreen = () => {
  if (videoPlayer.value) {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoPlayer.value.requestFullscreen();
    }
  }
};

const seekAudio = (event: any) => {
  if (audioPlayer.value) {
    audioPlayer.value.currentTime = event.detail.value;
  }
};

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const formatDuration = (time: number) => {
  if (time === 0) return 'Unknown';
  return formatTime(time);
};

const downloadMedia = async () => {
  try {
    const response = await fetch(props.src);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${props.title}.${props.type === 'video' ? 'mp4' : 'mp3'}`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    const toast = await toastController.create({
      message: `${props.type === 'video' ? 'Video' : 'Audio'} downloaded successfully!`,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  } catch (error) {
    const toast = await toastController.create({
      message: 'Download failed. Please try again.',
      duration: 2000,
      position: 'bottom',
      color: 'danger'
    });
    await toast.present();
  }
};
</script>

<style scoped>
.video-container {
  margin-bottom: 16px;
}

.video-player {
  width: 100%;
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.video-controls {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 8px;
}

.audio-container {
  margin-bottom: 16px;
}

.audio-player {
  display: none;
}

.audio-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding: 12px;
  background: var(--ion-color-light);
  border-radius: 8px;
}

.audio-details h3 {
  margin: 0 0 4px 0;
  font-size: 1.1em;
}

.audio-details p {
  margin: 0;
  color: var(--ion-color-medium);
  font-size: 0.9em;
}

.audio-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.audio-progress {
  margin-bottom: 16px;
}

.media-info {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

ion-range {
  flex: 1;
  --bar-background: var(--ion-color-light);
  --bar-background-active: var(--ion-color-primary);
}

ion-chip {
  margin: 0;
}
</style> 