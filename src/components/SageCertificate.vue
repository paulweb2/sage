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
        <li>Physical needs</li>
        <li>Cognitive needs</li>
        <li>Speech and language needs</li>
        <li>Communication needs</li>
        <li>Multiple learning needs</li>
      </ul>

      <div class="date-section">
        <span>{{ props.completionDate }}</span>
      </div>

      <div class="signature-row">
        <div class="signature-box">
          <div class="signature-placeholder signature-with-image">
            <img src="/cbm_signature.png" alt="Signature of a CBM representative." />
          </div>
          <div class="signature-caption signature-caption-cbm">
            <span>Greaterman Chivandire</span>
            <span>Country Director</span>
            <span>Christian Blind Mission Global Disability Inclusion Zimbabwe</span>
          </div>
        </div>
        <div class="signature-box">
          <div class="signature-placeholder signature-with-image">
            <img src="/ou_signature.png" alt="Signature of an Open University representative." />
          </div>
          <div class="signature-caption signature-caption-cbm">
            <span>Dr. Clare Tope</span>
            <span>Lecturer in Education</span>
            <span>The Open University, UK</span>
          </div>
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
  const originalTitle = document.title;
  document.body.innerHTML = printContents;
  document.title = 'zdt_certificate';
  window.print();
  document.title = originalTitle;
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
  padding: 40px 56px 64px;
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
  margin: 0 0 20px;
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
  margin: 16px 0 20px;
}

.signature-row {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.signature-box {
  display: flex;
  align-items: center;
  gap: 16px;
}

.signature-placeholder {
  border: 2px solid #c1c1c1;
  height: 80px;
  width: 220px;
  flex-shrink: 0;
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
  text-align: left;
}

.signature-caption-cbm {
  text-transform: none;
  letter-spacing: 0;
  font-size: 0.84rem;
  line-height: 1.2;
  max-width: 360px;
}

.signature-caption-cbm span {
  display: block;
}

.footer-banner {
  width: 100%;
  margin-top: 8px;
  position: relative;
  top: 24px;
}

@media print {
  @page {
    size: A4 portrait;
    margin: 10mm;
  }

  body {
    background: #fff !important;
  }
  .certificate-container {
    background: #fff !important;
    padding: 0 !important;
    align-items: flex-start;
  }
  .certificate-sheet {
    width: 100% !important;
    max-width: none !important;
    min-height: auto !important;
    box-sizing: border-box;
    padding: 18px 40px 42px !important;
    font-size: 92%;
    box-shadow: none !important;
    border: 6px solid #c3c3c3 !important;
    overflow: hidden;
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .footer-banner {
    margin-top: 0 !important;
    top: 18px;
  }

  .needs-list {
    margin-bottom: 12px !important;
  }

  .date-section {
    margin: 10px 0 14px !important;
  }

  .signature-row {
    gap: 8px !important;
    margin-bottom: 10px !important;
  }
}
</style>