<template>
  <div class="caller-records-container">
    <!-- 日期范围选择器 -->
    <div class="date-range-filter">
      <el-date-picker
        v-model="dateRange"
        type="daterange"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
        format="YYYY-MM-DD"
        value-format="YYYY-MM-DD"
        @change="filterData"
        style="width: 100%; max-width: 400px;"
      />
      <el-button @click="queryData" size="small" type="primary" plain style="margin-left: 0.5rem;">Query</el-button>
    </div>

    <!-- Loading状态 -->
    <div v-if="loading" class="section-loading">
      <div class="loading-spinner"></div>
      <div class="loading-text">Loading caller data...</div>
    </div>
    
    <!-- 内容区域 -->
    <div v-else>
      <div v-if="!selectedContact" class="contact-card-list">
        <div v-for="contact in contacts" :key="contact.phone" class="contact-card" @click="selectContact(contact)">
          <img :src="contact.photo" alt="头像" class="contact-avatar" />
          <div class="contact-info">
            <div class="contact-name">{{ contact.name }}</div>
            <div class="contact-id">ID: {{ contact.phone }}</div> 
            <div class="contact-phone">+968 91312548</div>
            <div class="contact-count">Call times: {{ contact.count }}</div>
          </div>
        </div>
        <div v-if="!contacts || contacts.length === 0" style="color: #999; padding: 1rem 0;">No call records</div>
      </div>
      <div v-else class="contact-call-list">
        <div class="contact-detail-header">
          <span @click="backToContacts" class="breadcrumb-back">
            <svg class="breadcrumb-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
          <img :src="selectedContact.photo" alt="头像" class="contact-avatar" />
          <div class="contact-info">
            <div class="contact-name">{{ selectedContact.name }}</div>
            <div class="contact-id">ID: {{ selectedContact.phone }}</div>
            <div class="contact-phone"> {{ selectedContact.phone }}</div>
          </div>
        </div>
        <table class="call-table">
          <thead>
            <tr>
              <th>Call Time</th>
              <th>Type</th>
              <th>Duration</th>
              <th>Other Phone</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(call, idx) in (selectedContact.calls || [])" :key="idx">
              <td>{{ call.time }}</td>
              <td>{{ call.type }}</td>
              <td>{{ call.duration }}</td>
              <td>{{ call.otherPhone }}</td>
            </tr>
            <tr v-if="!selectedContact.calls || selectedContact.calls.length === 0">
              <td colspan="4" style="color: #999; text-align: center;">No call records</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Contact {
  phone: string
  name: string
  photo: string
  count: number
  calls?: Array<{
    time: string
    type: string
    duration: string
    otherPhone: string
  }>
}

const props = defineProps({
  contacts: {
    type: Array as () => Contact[],
    default: () => []
  }
})

const emit = defineEmits(['loading-change'])

// 响应式数据
const dateRange = ref<[string, string] | null>(null)
const selectedContact = ref<Contact | null>(null)
const loading = ref(false)

// 选择联系人
function selectContact(contact: Contact) {
  loading.value = true
  emit('loading-change', true)
  
  setTimeout(() => {
    loading.value = false
    emit('loading-change', false)
    selectedContact.value = contact
  }, 800)
}

// 返回联系人列表
function backToContacts() {
  loading.value = true
  emit('loading-change', true)
  
  setTimeout(() => {
    loading.value = false
    emit('loading-change', false)
    selectedContact.value = null
  }, 500)
}

// 过滤数据
function filterData() {
  if (!dateRange.value) return
  
  const [startDate, endDate] = dateRange.value
  console.log('Filtering caller data for date range:', startDate, 'to', endDate)
  
  loading.value = true
  emit('loading-change', true)
  
  setTimeout(() => {
    loading.value = false
    emit('loading-change', false)
  }, 1000)
}

// 查询数据
function queryData() {
  if (!dateRange.value) {
    console.log('No date range selected for caller query')
    return
  }
  
  const [startDate, endDate] = dateRange.value
  console.log('Querying caller data for date range:', startDate, 'to', endDate)
  
  loading.value = true
  emit('loading-change', true)
  
  setTimeout(() => {
    loading.value = false
    emit('loading-change', false)
  }, 1500)
}
</script>

<style scoped>
.caller-records-container {
  width: 100%;
}

.contact-card-list {
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: flex-start;
}

.contact-card {
  background: var(--bg-card, #fff);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  border: 1px solid var(--border-card, #e5e7eb);
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  min-width: 220px;
  max-width: 320px;
  flex: 1 1 260px;
  gap: 1rem;
  transition: box-shadow 0.2s, transform 0.2s;
}

@media (max-width: 900px) {
  .contact-card-list {
    gap: 1rem;
  }
  .contact-card {
    min-width: 160px;
    max-width: 100%;
    flex: 1 1 100%;
  }
}

@media (max-width: 600px) {
  .contact-card-list {
    flex-direction: column;
    gap: 0.75rem;
  }
  .contact-card {
    min-width: 0;
    max-width: 100%;
    flex: 1 1 100%;
  }
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

.contact-phone {
  color: #2563eb;
  font-weight: bold;
  font-size: 0.95rem;
  letter-spacing: 1px;
}

.contact-count {
  font-size: 0.85rem;
  color: #2563eb;
  font-weight: 500;
}

.contact-call-list {
  padding: 1rem 0;
  max-height: none;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.contact-detail-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  background: var(--bg-card, #fff);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  border: 1px solid var(--border-card, #e5e7eb);
  padding: 1rem 1.5rem;
  min-width: 180px;
  max-width: 320px;
  flex: 1 1 150px;
  flex-shrink: 0;
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

.call-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.call-table th, .call-table td {
  border: 1px solid var(--border-card, #e5e7eb);
  padding: 0.5rem 1rem;
  text-align: center;
}

.call-table th {
  background: var(--bg-card, #f9fafb);
  font-weight: 600;
}

/* 日期范围过滤器样式 */
.date-range-filter {
  margin-bottom: 1.5rem;
  padding: 0.5rem;
  background: var(--bg-primary);
  border-radius: 8px;
  border: 1px solid var(--border-card);
}

.date-range-filter .el-date-editor {
  width: 100%;
  max-width: 400px;
}

.date-range-filter .el-input__wrapper {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 6px;
}

.date-range-filter .el-input__inner {
  color: var(--text-primary);
}

.date-range-filter .el-range-separator {
  color: var(--text-secondary);
}

.date-range-filter .el-range-input {
  color: var(--text-primary);
}

.date-range-filter .el-range__close-icon {
  color: var(--text-secondary);
}

/* Loading状态样式 */
.section-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  min-height: 200px;
  background: var(--bg-card);
  border-radius: 12px;
  border: 1px solid var(--border-card);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--border-card);
  border-top: 3px solid var(--accent-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

.loading-text {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
  text-align: center;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style> 