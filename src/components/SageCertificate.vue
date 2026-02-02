<template>
  <div class="certificate-container" ref="certificateRef">
    <div class="certificate-sheet">
      <img src="/sage-logo.svg" alt="SAGE logo" class="certificate-logo" />

      <div class="title-block">
        <p class="title-prefix">
          <span class="title-strong">Zimbabwe</span>
          <span class="title-light">Disability Toolkit</span>
        </p>
        <h1>Certificate of Participation</h1>
      </div>

      <p class="intro-text">This is to certify that</p>

      <div class="recipient-name">
        <span>{{ displayedName }}</span>
      </div>

      <p class="body-text">
        has engaged with the reflective tasks and quizzes for learners with
      </p>

      <ul class="needs-list">
        <li>Visual needs</li>
        <li>Hearing needs</li>
        <li>Communication needs</li>
        <li>Speech needs</li>
        <li>Cognitive needs</li>
        <li>Multiple needs</li>
        <li>Physical needs</li>
      </ul>

      <div class="date-section">
        <span>{{ props.completionDate }}</span>
      </div>

      <div class="signature-row">
        <div class="signature-box">
          <div class="signature-placeholder"></div>
          <div class="signature-caption">Permanent Secretary</div>
        </div>
        <div class="signature-box">
          <div class="signature-placeholder signature-with-image">
            <img src="/cbm_signature.png" alt="Signature of a CBM representative." />
          </div>
          <div class="signature-caption">CBM</div>
        </div>
        <div class="signature-box">
          <div class="signature-placeholder"></div>
          <div class="signature-caption">The Open University</div>
        </div>
      </div>

      <img src="/sage_logo_strip.png" alt="Logos of SAGE and partner organisations." class="footer-banner" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps<{
  completionDate: string;
  recipientName?: string;
}>();

const displayedName = computed(() => props.recipientName?.trim() || '[Your Name]');
const certificateRef = ref<HTMLElement | null>(null);

const printCertificate = () => {
  if (!certificateRef.value) return;
  const printContents = certificateRef.value.innerHTML;
  const originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
  window.location.reload();
};

defineExpose({ printCertificate });
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Source+Sans+3:wght@400;600&display=swap');

.certificate-container {
  display: flex;
  justify-content: center;
  padding: 32px;
  background: #f2f2f2;
}

.certificate-sheet {
  background: #fff;
  padding: 48px 56px 40px;
  border: 6px solid #d4d4d4;
  max-width: 900px;
  width: 100%;
  min-height: 640px;
  position: relative;
  text-align: center;
  font-family: 'Source Sans 3', Arial, sans-serif;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
}

.certificate-logo {
  width: 220px;
  margin: 0 auto 16px;
  display: block;
}

.title-block {
  margin-bottom: 24px;
}

.title-prefix {
  font-family: 'Source Sans 3', Arial, sans-serif;
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: 1px;
  color: #444;
  text-transform: uppercase;
  margin: 0;
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
  line-height: 1.2;
}

.title-strong {
  font-weight: 700;
}

.title-light {
  font-weight: 400;
}

.title-block h1 {
  font-family: 'Playfair Display', 'Times New Roman', serif;
  font-size: 2rem;
  margin: 4px 0 0;
  color: #222;
}

.intro-text {
  font-size: 1.1rem;
  color: #444;
  margin-bottom: 12px;
}

.recipient-name {
  font-family: 'Playfair Display', 'Times New Roman', serif;
  font-size: 2.2rem;
  color: #1f2933;
  margin-bottom: 16px;
}

.recipient-name span {
  padding: 4px 48px;
  display: inline-block;
}

.body-text {
  font-size: 1.05rem;
  color: #444;
  margin-bottom: 16px;
}

.needs-list {
  list-style: none;
  padding: 0;
  margin: 0 0 32px;
  font-size: 1rem;
  color: #444;
}

.needs-list li {
  margin: 4px 0;
}

.date-section {
  font-family: 'Playfair Display', 'Times New Roman', serif;
  font-size: 1.3rem;
  color: #1f2933;
  margin: 24px 0 36px;
}

.signature-row {
  display: flex;
  justify-content: space-between;
  gap: 32px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.signature-box {
  flex: 1;
  min-width: 200px;
  text-align: center;
}

.signature-placeholder {
  border: 2px solid #c1c1c1;
  height: 80px;
  margin-bottom: 12px;
}

.signature-with-image {
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.signature-with-image img {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  filter: grayscale(1);
}
.signature-caption {
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #555;
}

.footer-banner {
  width: 100%;
  margin-top: 16px;
}

@media print {
  body {
    background: #fff !important;
  }
  .certificate-container {
    background: #fff !important;
    padding: 0 !important;
  }
  .certificate-sheet {
    box-shadow: none !important;
    border-color: #c3c3c3;
  }
}
</style>