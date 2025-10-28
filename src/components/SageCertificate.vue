<template>
  <div class="certificate-container" ref="certificateRef">
    <div class="certificate">
      <!-- Certificate Border -->
      <div class="certificate-border">
        <div class="border-pattern"></div>
      </div>
      
      <!-- Certificate Content -->
      <div class="certificate-content">
        <!-- Header -->
        <div class="certificate-header">
          <div class="logo-section">
            <div class="sage-logo">SAGE</div>
            <div class="logo-subtitle">Supporting Accessible and Inclusive Education</div>
          </div>
          <div class="certificate-title">
            <h1>Certificate of Participation</h1>
            <div class="title-underline"></div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="certificate-body">
          <div class="presentation-text">
            This is to certify that
          </div>
          
          <div class="recipient-name">
            <span class="name-placeholder">{{ recipientName || '[Your Name]' }}</span>
          </div>
          
          <div class="achievement-text">
            has successfully completed all SAGE learning activities and demonstrated comprehensive knowledge of supporting students with diverse needs.
          </div>
          
          <div class="master-status">
            <div class="master-badge">
              <span class="trophy-icon">🏆</span>
              <span class="master-text">SAGE Master</span>
            </div>
          </div>
          
          <div class="completion-details">
            <div class="detail-item">
              <strong>Date of Completion:</strong> {{ completionDate }}
            </div>
            <div class="detail-item">
              <strong>Total Activities Completed:</strong> {{ totalCompleted }}/{{ totalItems }}
            </div>
            <div class="detail-item">
              <strong>Average Quiz Score:</strong> {{ averageScore }}%
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="certificate-footer">
          <div class="signature-section">
            <div class="signature-line"></div>
            <div class="signature-label">SAGE Program Director</div>
          </div>
          
          <div class="certificate-number">
            Certificate #: SAGE-{{ certificateNumber }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps<{
  completionDate: string
  totalCompleted: number
  totalItems: number
  averageScore: number
  certificateNumber: string
  recipientName?: string
}>();

const certificateRef = ref<HTMLElement | null>(null);

// Print only the certificate area
const printCertificate = () => {
  if (!certificateRef.value) return;
  const printContents = certificateRef.value.innerHTML;
  const originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
  window.location.reload(); // reload to restore app state
};
defineExpose({ printCertificate });
</script>

<style scoped>
.certificate-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  background: #f8f9fa;
  padding: 32px 0;
}
.certificate {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 32px rgba(0,0,0,0.08), 0 1.5px 6px rgba(0,0,0,0.04);
  max-width: 700px;
  width: 100%;
  padding: 0;
  position: relative;
  overflow: hidden;
}
.certificate-border {
  position: absolute;
  inset: 0;
  border: 6px solid #f7c948;
  border-radius: 16px;
  pointer-events: none;
  z-index: 1;
}
.border-pattern {
  position: absolute;
  inset: 0;
  border: 2px dashed #f7c948;
  border-radius: 12px;
  margin: 16px;
  pointer-events: none;
  z-index: 2;
}
.certificate-content {
  position: relative;
  z-index: 3;
  padding: 48px 32px 32px 32px;
  text-align: center;
}
.certificate-header {
  margin-bottom: 32px;
}
.logo-section {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 2rem;
  color: #f7c948;
  letter-spacing: 2px;
  margin-bottom: 8px;
}
.logo-subtitle {
  font-size: 1rem;
  color: #888;
  font-weight: 400;
  margin-bottom: 16px;
}
.certificate-title h1 {
  font-size: 2.2rem;
  font-weight: 700;
  margin: 0;
  color: #222;
}
.title-underline {
  width: 80px;
  height: 4px;
  background: #f7c948;
  margin: 12px auto 0 auto;
  border-radius: 2px;
}
.certificate-body {
  margin: 32px 0;
}
.presentation-text {
  font-size: 1.1rem;
  color: #444;
  margin-bottom: 12px;
}
.recipient-name {
  font-size: 2rem;
  font-weight: 700;
  color: #2d6a4f;
  margin-bottom: 12px;
}
.name-placeholder {
  border-bottom: 1px dashed #bbb;
  padding: 0 32px;
}
.achievement-text {
  font-size: 1.1rem;
  color: #444;
  margin-bottom: 24px;
}
.master-status {
  margin-bottom: 24px;
}
.master-badge {
  display: inline-flex;
  align-items: center;
  background: #f7c948;
  color: #fff;
  font-weight: 700;
  font-size: 1.2rem;
  border-radius: 24px;
  padding: 8px 24px;
  box-shadow: 0 2px 8px rgba(247,201,72,0.15);
}
.trophy-icon {
  font-size: 2rem;
  margin-right: 12px;
}
.completion-details {
  margin-top: 16px;
  font-size: 1rem;
  color: #555;
}
.detail-item {
  margin-bottom: 4px;
}
.certificate-footer {
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 0.95rem;
  color: #888;
}
.signature-section {
  text-align: left;
}
.signature-line {
  width: 160px;
  border-bottom: 2px solid #bbb;
  margin-bottom: 4px;
  margin-left: 8px;
}
.signature-label {
  font-size: 0.95rem;
  color: #888;
  margin-left: 8px;
}
.certificate-number {
  text-align: right;
  font-size: 0.95rem;
  color: #bbb;
}
@media print {
  body {
    background: #fff !important;
  }
  .certificate-container {
    background: #fff !important;
    padding: 0 !important;
    min-height: 0 !important;
  }
  .certificate {
    box-shadow: none !important;
    border: none !important;
    margin: 0 auto !important;
  }
}
</style> 