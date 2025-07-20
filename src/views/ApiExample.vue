<template>
  <div class="api-example">
    <h1>API 调用示例</h1>
    
    <!-- 异步调用示例 -->
    <div class="example-section">
      <h2>异步调用示例</h2>
      <button @click="handleAsyncCall" :disabled="loading">
        {{ loading ? '加载中...' : '获取用户列表' }}
      </button>
      <div v-if="userList.length > 0" class="result">
        <h3>用户列表:</h3>
        <ul>
          <li v-for="user in userList" :key="user.id">
            {{ user.name }} - {{ user.email }}
          </li>
        </ul>
      </div>
    </div>

    <!-- 同步调用示例 -->
    <div class="example-section">
      <h2>同步调用示例</h2>
      <button @click="handleSyncCall" :disabled="syncLoading">
        {{ syncLoading ? '加载中...' : '获取ISP列表' }}
      </button>
      <div v-if="ispList.length > 0" class="result">
        <h3>ISP列表:</h3>
        <ul>
          <li v-for="isp in ispList" :key="isp.id">
            {{ isp.name }} - {{ isp.status }}
          </li>
        </ul>
      </div>
    </div>

    <!-- 带重试的调用示例 -->
    <div class="example-section">
      <h2>带重试的调用示例</h2>
      <button @click="handleRetryCall" :disabled="retryLoading">
        {{ retryLoading ? '重试中...' : '带重试获取用户详情' }}
      </button>
      <div v-if="userDetail" class="result">
        <h3>用户详情:</h3>
        <pre>{{ JSON.stringify(userDetail, null, 2) }}</pre>
      </div>
    </div>

    <!-- 带超时的调用示例 -->
    <div class="example-section">
      <h2>带超时的调用示例</h2>
      <button @click="handleTimeoutCall" :disabled="timeoutLoading">
        {{ timeoutLoading ? '请求中...' : '带超时获取统计数据' }}
      </button>
      <div v-if="stats" class="result">
        <h3>统计数据:</h3>
        <pre>{{ JSON.stringify(stats, null, 2) }}</pre>
      </div>
    </div>

    <!-- 批量操作示例 -->
    <div class="example-section">
      <h2>批量操作示例</h2>
      <button @click="handleBatchDelete" :disabled="batchLoading">
        {{ batchLoading ? '删除中...' : '批量删除用户' }}
      </button>
      <div v-if="batchProgress > 0" class="progress">
        <div class="progress-bar">
          <div class="progress-fill" :style="{ width: batchProgress + '%' }"></div>
        </div>
        <span>{{ batchProgress.toFixed(1) }}%</span>
      </div>
      <div v-if="batchResult" class="result">
        <h3>批量删除结果:</h3>
        <p>{{ batchResult.message }}</p>
      </div>
    </div>

    <!-- 实时数据示例 -->
    <div class="example-section">
      <h2>实时数据示例</h2>
      <button @click="startRealtime" :disabled="realtimeActive">
        {{ realtimeActive ? '停止轮询' : '开始实时通知' }}
      </button>
      <button v-if="realtimeActive" @click="stopRealtime">
        停止轮询
      </button>
      <div v-if="notifications.length > 0" class="result">
        <h3>实时通知:</h3>
        <ul>
          <li v-for="notification in notifications" :key="notification.id">
            {{ notification.message }} - {{ formatDate(notification.timestamp) }}
          </li>
        </ul>
      </div>
    </div>

    <!-- 文件上传示例 -->
    <div class="example-section">
      <h2>文件上传示例</h2>
      <input 
        type="file" 
        @change="handleFileUpload" 
        accept="image/*"
        :disabled="uploadLoading"
      />
      <button @click="uploadFile" :disabled="!selectedFile || uploadLoading">
        {{ uploadLoading ? '上传中...' : '上传图片' }}
      </button>
      <div v-if="uploadResult" class="result">
        <h3>上传结果:</h3>
        <p>{{ uploadResult.message }}</p>
      </div>
    </div>

    <!-- 错误处理示例 -->
    <div class="example-section">
      <h2>错误处理示例</h2>
      <button @click="handleErrorCall">
        触发错误调用
      </button>
      <div v-if="errorMessage" class="error">
        <h3>错误信息:</h3>
        <p>{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import {
  getUserList,
  getIspList,
  getUserDetail,
  getDashboardStats,
  batchDeleteUsers,
  startNotificationPolling,
  uploadVehicleImage,
  apiCallWithRetry,
  apiCallWithTimeout
} from '@/api/example'
import { formatDate } from '@/utils/commonUtils'

// 响应式数据
const loading = ref(false)
const syncLoading = ref(false)
const retryLoading = ref(false)
const timeoutLoading = ref(false)
const batchLoading = ref(false)
const uploadLoading = ref(false)
const realtimeActive = ref(false)

const userList = ref([])
const ispList = ref([])
const userDetail = ref(null)
const stats = ref(null)
const batchProgress = ref(0)
const batchResult = ref(null)
const notifications = ref([])
const selectedFile = ref<File | null>(null)
const uploadResult = ref(null)
const errorMessage = ref('')

let stopPolling: (() => void) | null = null

// 异步调用示例
const handleAsyncCall = async () => {
  loading.value = true
  try {
    const result = await getUserList({ page: 1, pageSize: 10 })
    if (result.success) {
      userList.value = result.data
    } else {
      console.error('获取用户列表失败:', result.message)
    }
  } catch (error) {
    console.error('调用失败:', error)
  } finally {
    loading.value = false
  }
}

// 同步调用示例
const handleSyncCall = () => {
  syncLoading.value = true
  getIspList({ page: 1, pageSize: 10 })
    .then(result => {
      if (result.success) {
        ispList.value = result.data
      } else {
        console.error('获取ISP列表失败:', result.message)
      }
    })
    .catch(error => {
      console.error('调用失败:', error)
    })
    .finally(() => {
      syncLoading.value = false
    })
}

// 带重试的调用示例
const handleRetryCall = async () => {
  retryLoading.value = true
  try {
    const result = await apiCallWithRetry(
      () => getUserDetail('123'),
      3,
      1000
    )
    userDetail.value = result.data
  } catch (error) {
    console.error('重试后仍然失败:', error)
    errorMessage.value = '重试后仍然失败: ' + error.message
  } finally {
    retryLoading.value = false
  }
}

// 带超时的调用示例
const handleTimeoutCall = async () => {
  timeoutLoading.value = true
  try {
    const result = await apiCallWithTimeout(
      () => getDashboardStats(),
      5000
    )
    stats.value = result.data
  } catch (error) {
    console.error('请求超时:', error)
    errorMessage.value = '请求超时: ' + error.message
  } finally {
    timeoutLoading.value = false
  }
}

// 批量操作示例
const handleBatchDelete = async () => {
  batchLoading.value = true
  batchProgress.value = 0
  
  const userIds = ['1', '2', '3', '4', '5']
  const result = await batchDeleteUsers(userIds, (progress) => {
    batchProgress.value = progress
  })
  
  batchResult.value = result
  batchLoading.value = false
}

// 实时数据示例
const startRealtime = () => {
  realtimeActive.value = true
  notifications.value = []
  
  stopPolling = startNotificationPolling((data) => {
    notifications.value.push(...data)
  }, 3000)
}

const stopRealtime = () => {
  if (stopPolling) {
    stopPolling()
    stopPolling = null
  }
  realtimeActive.value = false
}

// 文件上传示例
const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0]
  }
}

const uploadFile = async () => {
  if (!selectedFile.value) return
  
  uploadLoading.value = true
  try {
    const result = await uploadVehicleImage(selectedFile.value, 'vehicle-123')
    uploadResult.value = result
  } catch (error) {
    console.error('上传失败:', error)
    errorMessage.value = '上传失败: ' + error.message
  } finally {
    uploadLoading.value = false
  }
}

// 错误处理示例
const handleErrorCall = async () => {
  try {
    // 故意调用一个不存在的API
    const response = await fetch('/api/nonexistent')
    if (!response.ok) {
      throw new Error('API不存在')
    }
  } catch (error) {
    errorMessage.value = '错误处理示例: ' + error.message
  }
}

// 组件卸载时清理
onUnmounted(() => {
  if (stopPolling) {
    stopPolling()
  }
})
</script>

<style scoped>
.api-example {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.example-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
}

.example-section h2 {
  margin-bottom: 1rem;
  color: #374151;
  font-size: 1.25rem;
  font-weight: 600;
}

button {
  padding: 0.5rem 1rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
}

button:hover:not(:disabled) {
  background: #2563eb;
}

button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.result {
  margin-top: 1rem;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 6px;
  border-left: 4px solid #10b981;
}

.result h3 {
  margin-bottom: 0.5rem;
  color: #374151;
  font-size: 1rem;
  font-weight: 600;
}

.result ul {
  margin: 0;
  padding-left: 1.5rem;
}

.result li {
  margin-bottom: 0.25rem;
  color: #6b7280;
}

.progress {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #10b981;
  transition: width 0.3s ease;
}

.error {
  margin-top: 1rem;
  padding: 1rem;
  background: #fef2f2;
  border-radius: 6px;
  border-left: 4px solid #ef4444;
}

.error h3 {
  margin-bottom: 0.5rem;
  color: #dc2626;
  font-size: 1rem;
  font-weight: 600;
}

.error p {
  color: #991b1b;
  margin: 0;
}

input[type="file"] {
  margin-bottom: 0.5rem;
}

pre {
  background: #f3f4f6;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 0.875rem;
  color: #374151;
}
</style> 