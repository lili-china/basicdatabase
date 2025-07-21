<template>
  <div v-if="isp" class="isp-detail-content isp-detail-page-content">
    <div class="isp-detail-header">
      <span @click="$emit('back')" class="breadcrumb-back">
        <svg class="breadcrumb-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </span>
      <span v-if="isp && isp.phoneNum" class="breadcrumb-phone themed">{{ isp.phoneNum }}</span>
    </div>
    <div class="detail-section">
      <h4>Basic Information</h4>
      <div class="isp-detail-avatar-row">
        <img v-if="isp.photo" :src="isp.photo" alt="头像" class="isp-detail-avatar" />
      </div>
      <div class="detail-grid">
        <div class="detail-item">
          <span class="detail-label">Real Name:</span>
          <span class="detail-value">{{ isp.realName }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Identity Number:</span>
          <span class="detail-value">{{ isp.identityNo }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Phone Number:</span>
          <span class="detail-value">{{ isp.phoneNum }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Nationality:</span>
          <span class="detail-value">{{ isp.nationality }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Birth Date:</span>
          <span class="detail-value">{{ isp.birthDate }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Address:</span>
          <span class="detail-value">{{ isp.address }}</span>
        </div>
      </div>
    </div>
    <div class="detail-section">
      <h4>ISP Information</h4>
      <div class="detail-grid">
        <div class="detail-item">
          <span class="detail-label">Operator:</span>
          <span class="detail-value">{{ isp.name }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Service Type:</span>
          <span class="detail-value">{{ isp.serviceType }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Max Speed:</span>
          <span class="detail-value">{{ isp.maxSpeed }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Coverage:</span>
          <span class="detail-value">{{ isp.coverage }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Location:</span>
          <span class="detail-value">{{ isp.location }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Description:</span>
          <span class="detail-value">{{ isp.description }}</span>
        </div>
      </div>
    </div>
    <div class="detail-section">
      <h4>Timeline Information</h4>
      <div class="detail-grid">
        <div class="detail-item">
          <span class="detail-label">Registration Date:</span>
          <span class="detail-value">{{ isp.registrationDate }}</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Expiry Date:</span>
          <span class="detail-value" :class="{ 'expired': isExpired(isp.expiryDate) }">
            {{ isp.expiryDate }}
          </span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Status:</span>
          <span class="detail-value">
            <span class="status-tag" :class="isp.status">{{ isp.status }}</span>
          </span>
        </div>
      </div>
    </div>
    <div class="detail-section">
      <h4>最近通话的20个人</h4>
      <div class="contact-card-list">
        <div v-for="contact in contacts as Array<any>" :key="contact.phone" class="contact-card">
          <img :src="contact.photo" alt="头像" class="contact-avatar" />
          <div class="contact-info">
            <div class="contact-name">{{ contact.name }}</div>
            <div class="contact-id">ID: {{ contact.phone }}</div>
            <div class="contact-count">通话次数：{{ contact.count }}</div>
          </div>
        </div>
        <div v-if="contacts.length === 0" style="color: #999; padding: 1rem 0;">暂无通话记录</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  isp: Object,
  contacts: {
    type: Array,
    default: () => []
  }
})
function isExpired(dateString: string) {
  const expiryDate = new Date(dateString)
  const today = new Date()
  return expiryDate < today
}
</script>

<style scoped>
.isp-detail-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  color: #888;
  gap: 0.5em;
}
.breadcrumb-back {
  display: flex;
  align-items: center;
  color: var(--accent-primary, #2563eb);
  cursor: pointer;
  font-weight: 600;
  font-size: 1em;
  user-select: none;
  gap: 0.2em;
  transition: color 0.2s;
}
.breadcrumb-back:hover {
  color: #1d4ed8;
}
.breadcrumb-arrow {
  margin-right: 0.2em;
  vertical-align: middle;
  color: inherit;
}
.breadcrumb-phone {
  margin-left: 1em;
  background: var(--accent-primary, #2563eb);
  color: #fff;
  border-radius: 16px;
  padding: 0.15em 0.9em;
  font-size: 0.95em;
  font-weight: 500;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(59,130,246,0.08);
  display: inline-block;
}
.isp-detail-content.isp-detail-page-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 0 auto;
  padding: 0 2vw;
}
.isp-detail-dialog .el-dialog {
  max-width: 100vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}
.isp-detail-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.detail-section {
  background: var(--bg-card);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--border-card);
}
.detail-section h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--accent-primary);
}
.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}
.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: var(--bg-primary);
  border-radius: 8px;
  border: 1px solid var(--border-card);
}
.detail-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}
.detail-value {
  font-size: 0.875rem;
  color: var(--text-primary);
  font-weight: 600;
  text-align: right;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.detail-value.expired {
  color: #ef4444;
}
.detail-value .status-tag {
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
}
.detail-value .status-tag.active {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}
.detail-value .status-tag.inactive {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}
.detail-value .status-tag.pending {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}
.detail-value .status-tag.suspended {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}
.isp-detail-avatar-row {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}
.isp-detail-avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--accent-primary, #2563eb);
  background: #f3f4f6;
  box-shadow: 0 2px 8px rgba(59,130,246,0.10);
}
.contact-card-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}
.contact-card {
  background: var(--bg-card, #fff);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  border: 1px solid var(--border-card, #e5e7eb);
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  min-width: 180px;
  max-width: 320px;
  gap: 1rem;
  transition: box-shadow 0.2s, transform 0.2s;
  flex: 1 1 220px;
}
.contact-card:hover {
  box-shadow: 0 4px 16px rgba(59,130,246,0.15);
  transform: translateY(-2px) scale(1.03);
}
.contact-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--border-card, #e5e7eb);
  background: #f3f4f6;
}
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}
.contact-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary, #222);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 140px;
}
.contact-id {
  font-size: 0.75rem;
  color: var(--text-secondary, #888);
}
.contact-count {
  font-size: 0.85rem;
  color: #2563eb;
  font-weight: 500;
}
</style> 