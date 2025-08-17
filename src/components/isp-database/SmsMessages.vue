<template>
  <div class="sms-messages-component">
    <!-- 筛选条件 -->
    <div class="sms-filter">
      <!-- 搜索框 -->
      <div class="filter-item">
        <label class="filter-label">Search:</label>
        <el-input
          v-model="smsSearch"
          placeholder="Search messages or contacts..."
          clearable
          style="width: 100%; max-width: 300px;"
          @input="filterSmsData"
        >
          <template #prefix>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </template>
        </el-input>
      </div>
      
      <!-- 消息类型选择 -->
      <div class="filter-item">
        <label class="filter-label">Type:</label>
        <el-select v-model="smsType" placeholder="All messages" @change="filterSmsData" style="width: 100%; max-width: 200px;">
          <el-option label="All messages" value="all" />
          <el-option label="Inbox" value="inbox" />
          <el-option label="Sent" value="sent" />
          <el-option label="Draft" value="draft" />
        </el-select>
      </div>
      
      <!-- 时间范围选择 -->
      <div class="filter-item">
        <label class="filter-label">Time Range:</label>
        <el-date-picker
          v-model="smsDateRange"
          type="daterange"
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          @change="filterSmsData"
          style="width: 100%; max-width: 300px;"
        />
      </div>
      
      <!-- 操作按钮 -->
      <div class="filter-actions">
        <el-button @click="querySms" size="small" type="primary" plain>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style="margin-right: 4px;">
            <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Query
        </el-button>
        <el-button @click="exportSms" size="small" type="success" plain>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style="margin-right: 4px;">
            <path d="M21 15V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V15M7 10L12 15M12 15L17 10M12 15V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Export
        </el-button>
      </div>
    </div>
    
    <!-- 短信统计信息 -->
    <div class="sms-stats">
      <div class="stat-card">
        <div class="stat-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M21 15A2 2 0 0 1 19 17H7L4 20V5A2 2 0 0 1 6 3H19A2 2 0 0 1 21 5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="stat-info">
          <div class="stat-label">Total Messages</div>
          <div class="stat-value">{{ smsMessages.length }}</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="stat-info">
          <div class="stat-label">Sent</div>
          <div class="stat-value">{{ sentCount }}</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M21 15A2 2 0 0 1 19 17H7L4 20V5A2 2 0 0 1 6 3H19A2 2 0 0 1 21 5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="stat-info">
          <div class="stat-label">Received</div>
          <div class="stat-value">{{ receivedCount }}</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="stat-info">
          <div class="stat-label">Draft</div>
          <div class="stat-value">{{ draftCount }}</div>
        </div>
      </div>
    </div>
    
    <!-- 短信列表 -->
    <div class="sms-list">
      <div v-for="message in paginatedSmsMessages" :key="message.id" class="sms-item" :class="message.type">
                 <div class="sms-header" @click="openConversationDialog(message)" style="cursor: pointer;">
          <div class="sms-contact">
            <div class="contact-avatar">
              <img v-if="message.contactPhoto" :src="message.contactPhoto" :alt="message.contactName" />
              <div v-else class="contact-initial">{{ message.contactName.charAt(0).toUpperCase() }}</div>
            </div>
            <div class="contact-info">
              <div class="contact-name">{{ message.contactName }}</div>
              <div class="contact-number">{{ message.phoneNumber }}</div>
            </div>
          </div>
          <div class="sms-meta">
            <div class="sms-time">{{ formatSmsTime(message.timestamp) }}</div>
            
          </div>
        </div>
        <div class="sms-content">
          <div class="sms-text">{{ message.content }}</div>
        </div>
        
                          <!-- 对话记录提示 -->
         <div class="conversation-hint">
           <span class="hint-text">点击查看完整对话记录 ({{ getConversationHistory(message.phoneNumber).length }} 条消息)</span>
         </div>
       </div>
     </div>
     
     <!-- 对话记录弹窗 -->
     <el-dialog
       v-model="dialogVisible"
       :title="`与 ${selectedMessage?.contactName} 的对话记录`"
       width="60%"
       :before-close="closeConversationDialog"
       class="conversation-dialog"
     >
       <div v-if="selectedMessage" class="conversation-dialog-content">
         <div class="conversation-dialog-header">
           <div class="contact-info-dialog">
             <div class="contact-avatar-dialog">
               <img v-if="selectedMessage.contactPhoto" :src="selectedMessage.contactPhoto" :alt="selectedMessage.contactName" />
               <div v-else class="contact-initial-dialog">{{ selectedMessage.contactName.charAt(0).toUpperCase() }}</div>
             </div>
             <div class="contact-details">
               <div class="contact-name-dialog">{{ selectedMessage.contactName }}</div>
               <div class="contact-number-dialog">{{ selectedMessage.phoneNumber }}</div>
             </div>
           </div>
           <div class="conversation-stats">
             <span class="conversation-count-dialog">{{ getConversationHistory(selectedMessage.phoneNumber).length }} 条消息</span>
           </div>
         </div>
         
         <div class="conversation-dialog-messages">
           <div 
             v-for="conversationMsg in getConversationHistory(selectedMessage.phoneNumber)" 
             :key="conversationMsg.id" 
             class="conversation-dialog-message"
             :class="conversationMsg.type"
           >
             <div class="conversation-dialog-message-header">
               <div class="message-type-indicator-dialog">
                 <svg v-if="conversationMsg.type === 'sent'" width="12" height="12" viewBox="0 0 24 24" fill="none">
                   <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                 </svg>
                 <svg v-else width="12" height="12" viewBox="0 0 24 24" fill="none">
                   <path d="M21 15A2 2 0 0 1 19 17H7L4 20V5A2 2 0 0 1 6 3H19A2 2 0 0 1 21 5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                 </svg>
               </div>
               <span class="conversation-dialog-time">{{ formatSmsTime(conversationMsg.timestamp) }}</span>
             </div>
             <div class="conversation-dialog-content-text">{{ conversationMsg.content }}</div>
           </div>
         </div>
       </div>
       
       <template #footer>
         <div class="dialog-footer">
           <el-button @click="closeConversationDialog">关闭</el-button>
         </div>
       </template>
     </el-dialog>
     
     <!-- 分页组件 -->
    <div class="pagination-container">
      <el-pagination
        v-model:current-page="smsCurrentPage"
        v-model:page-size="smsPageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="filteredSmsMessages.length"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSmsSizeChange"
        @current-change="handleSmsCurrentChange"
        background
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// 短信相关数据
const smsSearch = ref('')
const smsType = ref('all')
const smsDateRange = ref<[string, string] | null>(null)
const smsCurrentPage = ref(1)
const smsPageSize = ref(10)

// 弹窗状态管理
const dialogVisible = ref(false)
const selectedMessage = ref<any>(null)

// 短信消息数据
const smsMessages = ref([
  {
    id: '1',
    type: 'sent',
    contactName: 'Ahmed Al-Mansouri',
    contactPhoto: null,
    phoneNumber: '+968 91312548',
    content: 'Hello! How are you doing today?',
    timestamp: new Date('2024-06-15 14:30:00')
  },
  {
    id: '2',
    type: 'inbox',
    contactName: 'Ahmed Al-Mansouri',
    contactPhoto: null,
    phoneNumber: '+968 91312548',
    content: 'I\'m doing great, thanks for asking! How about you?',
    timestamp: new Date('2024-06-15 14:32:00')
  },
  {
    id: '3',
    type: 'sent',
    contactName: 'Ahmed Al-Mansouri',
    contactPhoto: null,
    phoneNumber: '+968 91312548',
    content: 'Pretty good! Are you free for lunch tomorrow?',
    timestamp: new Date('2024-06-15 14:35:00')
  },
  {
    id: '4',
    type: 'inbox',
    contactName: 'Ahmed Al-Mansouri',
    contactPhoto: null,
    phoneNumber: '+968 91312548',
    content: 'Sure! What time works for you?',
    timestamp: new Date('2024-06-15 14:37:00')
  },
  {
    id: '5',
    type: 'sent',
    contactName: 'Sarah Johnson',
    contactPhoto: null,
    phoneNumber: '+968 98765432',
    content: 'Thanks for the information. I will get back to you soon.',
    timestamp: new Date('2024-06-15 13:45:00')
  },
  {
    id: '6',
    type: 'inbox',
    contactName: 'Sarah Johnson',
    contactPhoto: null,
    phoneNumber: '+968 98765432',
    content: 'No problem, take your time.',
    timestamp: new Date('2024-06-15 13:50:00')
  },
  {
    id: '7',
    type: 'sent',
    contactName: 'Mohammed Ali',
    contactPhoto: null,
    phoneNumber: '+968 87654321',
    content: 'Meeting scheduled for tomorrow at 10 AM. Please confirm.',
    timestamp: new Date('2024-06-15 12:20:00')
  },
  {
    id: '8',
    type: 'inbox',
    contactName: 'Mohammed Ali',
    contactPhoto: null,
    phoneNumber: '+968 87654321',
    content: 'Confirmed. I\'ll be there.',
    timestamp: new Date('2024-06-15 12:25:00')
  },
  {
    id: '9',
    type: 'sent',
    contactName: 'Fatima Hassan',
    contactPhoto: null,
    phoneNumber: '+968 76543210',
    content: 'The project files have been uploaded. Please check your email.',
    timestamp: new Date('2024-06-15 11:15:00')
  },
  {
    id: '10',
    type: 'inbox',
    contactName: 'Fatima Hassan',
    contactPhoto: null,
    phoneNumber: '+968 76543210',
    content: 'Got it, thanks!',
    timestamp: new Date('2024-06-15 11:20:00')
  },
  {
    id: '11',
    type: 'draft',
    contactName: 'Omar Khalil',
    contactPhoto: null,
    phoneNumber: '+968 65432109',
    content: 'I would like to discuss the new proposal...',
    timestamp: new Date('2024-06-15 10:30:00')
  },
  {
    id: '12',
    type: 'inbox',
    contactName: 'Aisha Rahman',
    contactPhoto: null,
    phoneNumber: '+968 54321098',
    content: 'Happy birthday! Hope you have a wonderful day!',
    timestamp: new Date('2024-06-15 09:00:00')
  },
  {
    id: '13',
    type: 'sent',
    contactName: 'Aisha Rahman',
    contactPhoto: null,
    phoneNumber: '+968 54321098',
    content: 'Thank you so much! That\'s very kind of you.',
    timestamp: new Date('2024-06-15 09:05:00')
  },
  {
    id: '14',
    type: 'sent',
    contactName: 'Yusuf Ahmed',
    contactPhoto: null,
    phoneNumber: '+968 43210987',
    content: 'The delivery has been confirmed. You will receive it by 3 PM.',
    timestamp: new Date('2024-06-14 16:45:00')
  },
  {
    id: '15',
    type: 'inbox',
    contactName: 'Yusuf Ahmed',
    contactPhoto: null,
    phoneNumber: '+968 43210987',
    content: 'Perfect, thank you!',
    timestamp: new Date('2024-06-14 16:50:00')
  },
  {
    id: '16',
    type: 'inbox',
    contactName: 'Noor Al-Zahra',
    contactPhoto: null,
    phoneNumber: '+968 32109876',
    content: 'Can we reschedule our meeting to next week?',
    timestamp: new Date('2024-06-14 15:30:00')
  },
  {
    id: '17',
    type: 'sent',
    contactName: 'Noor Al-Zahra',
    contactPhoto: null,
    phoneNumber: '+968 32109876',
    content: 'Of course, what day works for you?',
    timestamp: new Date('2024-06-14 15:35:00')
  },
  {
    id: '18',
    type: 'inbox',
    contactName: 'Noor Al-Zahra',
    contactPhoto: null,
    phoneNumber: '+968 32109876',
    content: 'How about Tuesday at 2 PM?',
    timestamp: new Date('2024-06-14 15:40:00')
  }
])

// 计算短信统计
const sentCount = computed(() => smsMessages.value.filter(msg => msg.type === 'sent').length)
const receivedCount = computed(() => smsMessages.value.filter(msg => msg.type === 'inbox').length)
const draftCount = computed(() => smsMessages.value.filter(msg => msg.type === 'draft').length)

// 过滤后的短信消息
const filteredSmsMessages = computed(() => {
  let filtered = smsMessages.value

  // 按类型过滤
  if (smsType.value !== 'all') {
    filtered = filtered.filter(msg => msg.type === smsType.value)
  }

  // 按搜索关键词过滤
  if (smsSearch.value) {
    const searchTerm = smsSearch.value.toLowerCase()
    filtered = filtered.filter(msg => 
      msg.contactName.toLowerCase().includes(searchTerm) ||
      msg.phoneNumber.includes(searchTerm) ||
      msg.content.toLowerCase().includes(searchTerm)
    )
  }

  // 按日期范围过滤
  if (smsDateRange.value) {
    const [startDate, endDate] = smsDateRange.value
    const start = new Date(startDate)
    const end = new Date(endDate)
    end.setHours(23, 59, 59, 999) // 设置为当天结束时间
    
    filtered = filtered.filter(msg => {
      const msgDate = new Date(msg.timestamp)
      return msgDate >= start && msgDate <= end
    })
  }

  return filtered
})

// 分页后的短信消息
const paginatedSmsMessages = computed(() => {
  const start = (smsCurrentPage.value - 1) * smsPageSize.value
  const end = start + smsPageSize.value
  return filteredSmsMessages.value.slice(start, end)
})

// 获取联系人的完整对话记录
const getConversationHistory = (phoneNumber: string) => {
  return smsMessages.value
    .filter(msg => msg.phoneNumber === phoneNumber)
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
}

// 打开对话弹窗
const openConversationDialog = (message: any) => {
  selectedMessage.value = message
  dialogVisible.value = true
}

// 关闭对话弹窗
const closeConversationDialog = () => {
  dialogVisible.value = false
  selectedMessage.value = null
}

// 短信相关函数
function filterSmsData() {
  console.log('Filtering SMS data with search:', smsSearch.value, 'type:', smsType.value, 'date range:', smsDateRange.value)
  
  // 重置分页到第一页
  smsCurrentPage.value = 1
}

function querySms() {
  console.log('Querying SMS data with search:', smsSearch.value, 'type:', smsType.value, 'date range:', smsDateRange.value)
  
  // 重置分页到第一页
  smsCurrentPage.value = 1
  
  // 这里可以添加实际的查询逻辑
}

function exportSms() {
  console.log('Exporting SMS data...')
  
  // 这里可以添加导出逻辑
  alert('SMS data exported successfully!')
}

function formatSmsTime(timestamp: Date) {
  const now = new Date()
  const diff = now.getTime() - timestamp.getTime()
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (minutes < 60) {
    return `${minutes}m ago`
  } else if (hours < 24) {
    return `${hours}h ago`
  } else if (days < 7) {
    return `${days}d ago`
  } else {
    return timestamp.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: timestamp.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    })
  }
}

function handleSmsSizeChange(newSize: number) {
  smsPageSize.value = newSize
  smsCurrentPage.value = 1 // 重置到第一页
}

function handleSmsCurrentChange(newPage: number) {
  smsCurrentPage.value = newPage
}
</script>

<style scoped>
.sms-messages-component {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* 短信相关样式 */
.sms-filter {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background: var(--bg-primary);
  border-radius: 12px;
  border: 1px solid var(--border-card);
  flex-shrink: 0;
}

.filter-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.filter-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
  min-width: 100px;
}

.filter-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.filter-actions .el-button {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.sms-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-shrink: 0;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--bg-card);
  border-radius: 12px;
  border: 1px solid var(--border-card);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;
}

.stat-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: var(--accent-secondary);
  border-radius: 12px;
  color: var(--accent-primary);
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
}

.sms-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
  min-height: 500px;
  max-height: calc(100vh - 400px);
  overflow-y: auto;
  flex: 1;
  height: auto;
}

.sms-item {
  background: var(--bg-card);
  border-radius: 12px;
  border: 1px solid var(--border-card);
  padding: 1rem;
  transition: all 0.2s ease;
  min-height: fit-content;
  height: auto;
}

.sms-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.sms-item.sent {
  border-left: 4px solid var(--accent-primary);
}

.sms-item.inbox {
  border-left: 4px solid #22c55e;
}

.sms-item.draft {
  border-left: 4px solid #f59e0b;
}

.sms-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.sms-contact {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.contact-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--accent-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-primary);
  font-weight: 600;
  font-size: 1rem;
  overflow: hidden;
}

.contact-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.contact-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
}

.contact-number {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.sms-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}

.sms-time {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.expand-icon {
  display: flex;
  align-items: center;
  color: var(--text-secondary);
  transition: transform 0.2s ease;
}

.sms-header:hover .expand-icon {
  color: var(--accent-primary);
}

.sms-content {
  margin-top: 0.75rem;
}

.sms-text {
  font-size: 0.875rem;
  color: var(--text-primary);
  line-height: 1.5;
  margin-bottom: 0.5rem;
  word-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;
  overflow-wrap: break-word;
}

/* 对话记录预览样式 */
.conversation-preview {
  margin-top: 1rem;
  padding: 1rem;
  background: var(--bg-primary);
  border-radius: 8px;
  border: 1px solid var(--border-card);
  max-height: 200px;
  overflow-y: auto;
  opacity: 0.8;
}

/* 对话记录弹窗样式 */
.conversation-dialog {
  .el-dialog__body {
    padding: 0;
  }
}

.conversation-dialog-content {
  max-height: 60vh;
  overflow-y: auto;
}

.conversation-dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background: var(--bg-primary);
  border-bottom: 1px solid var(--border-card);
  position: sticky;
  top: 0;
  z-index: 10;
}

.contact-info-dialog {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.contact-avatar-dialog {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--accent-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-primary);
  font-weight: 600;
  font-size: 1.25rem;
  overflow: hidden;
}

.contact-avatar-dialog img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.contact-name-dialog {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
}

.contact-number-dialog {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.conversation-stats {
  display: flex;
  align-items: center;
}

.conversation-count-dialog {
  font-size: 0.875rem;
  color: var(--text-secondary);
  background: var(--accent-secondary);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 500;
}

.conversation-dialog-messages {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.conversation-dialog-message {
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid var(--border-card);
  background: var(--bg-card);
  word-wrap: break-word;
  word-break: break-word;
  transition: all 0.2s ease;
}

.conversation-dialog-message:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.conversation-dialog-message.sent {
  border-left: 4px solid var(--accent-primary);
  background: rgba(37, 99, 235, 0.05);
  margin-left: 2rem;
}

.conversation-dialog-message.inbox {
  border-left: 4px solid #22c55e;
  background: rgba(34, 197, 94, 0.05);
  margin-right: 2rem;
}

.conversation-dialog-message.draft {
  border-left: 4px solid #f59e0b;
  background: rgba(245, 158, 11, 0.05);
}

.conversation-dialog-message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.message-type-indicator-dialog {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.message-type-indicator-dialog svg {
  color: var(--text-secondary);
}

.conversation-dialog-message.sent .message-type-indicator-dialog svg {
  color: var(--accent-primary);
}

.conversation-dialog-message.inbox .message-type-indicator-dialog svg {
  color: #22c55e;
}

.conversation-dialog-message.draft .message-type-indicator-dialog svg {
  color: #f59e0b;
}

.conversation-dialog-time {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.conversation-dialog-content-text {
  font-size: 0.875rem;
  color: var(--text-primary);
  line-height: 1.6;
  white-space: pre-wrap;
  overflow-wrap: break-word;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--border-card);
}

.conversation-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-card);
}

.conversation-header h4 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
}

.conversation-count {
  font-size: 0.75rem;
  color: var(--text-secondary);
  background: var(--accent-secondary);
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
}

.conversation-messages {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-height: fit-content;
}

.conversation-message {
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid var(--border-card);
  background: var(--bg-card);
  word-wrap: break-word;
  word-break: break-word;
}

.conversation-message.sent {
  border-left: 3px solid var(--accent-primary);
  background: rgba(37, 99, 235, 0.05);
}

.conversation-message.inbox {
  border-left: 3px solid #22c55e;
  background: rgba(34, 197, 94, 0.05);
}

.conversation-message.draft {
  border-left: 3px solid #f59e0b;
  background: rgba(245, 158, 11, 0.05);
}

.conversation-message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.message-type-indicator {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.message-type-indicator svg {
  color: var(--text-secondary);
}

.conversation-message.sent .message-type-indicator svg {
  color: var(--accent-primary);
}

.conversation-message.inbox .message-type-indicator svg {
  color: #22c55e;
}

.conversation-message.draft .message-type-indicator svg {
  color: #f59e0b;
}

.conversation-time {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.conversation-content {
  font-size: 0.875rem;
  color: var(--text-primary);
  line-height: 1.5;
  white-space: pre-wrap;
  overflow-wrap: break-word;
}



.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  background: var(--bg-card);
  border-top: 1px solid var(--border-card);
  flex-shrink: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .sms-filter {
    gap: 1.5rem;
  }
  
  .filter-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .filter-label {
    min-width: auto;
  }
  
  .filter-actions {
    flex-direction: column;
  }
  
  .sms-stats {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .sms-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  
  .sms-meta {
    align-items: flex-start;
  }
}
</style> 