<template>
  <div class="session-test">
    <div class="container">
      <h1>Session ID 缓存测试</h1>
      
      <div class="info-section">
        <h2>当前状态</h2>
        <div class="status-grid">
          <div class="status-item">
            <label>URL SessionId:</label>
            <span :class="{ 'valid': urlSessionId === 'a123456789', 'invalid': urlSessionId !== 'a123456789' }">
              {{ urlSessionId || '无' }}
            </span>
          </div>
          <div class="status-item">
            <label>缓存 SessionId:</label>
            <span :class="{ 'valid': cachedSessionId === 'a123456789', 'invalid': cachedSessionId !== 'a123456789' }">
              {{ cachedSessionId || '无' }}
            </span>
          </div>
          <div class="status-item">
            <label>当前使用 SessionId:</label>
            <span :class="{ 'valid': currentSessionId === 'a123456789', 'invalid': currentSessionId !== 'a123456789' }">
              {{ currentSessionId || '无' }}
            </span>
          </div>
          <div class="status-item">
            <label>最后登录时间:</label>
            <span>{{ lastLoginTime || '无' }}</span>
          </div>
        </div>
      </div>

      <div class="test-section">
        <h2>测试功能</h2>
        <div class="button-group">
          <button @click="testValidSession" class="btn btn-primary">
            测试有效 SessionId
          </button>
          <button @click="testInvalidSession" class="btn btn-warning">
            测试无效 SessionId
          </button>
          <button @click="testValidation" class="btn btn-success">
            测试校验功能
          </button>
          <button @click="testErrorPageRedirect" class="btn btn-info">
            测试错误页面自动跳转
          </button>
          <button @click="clearCache" class="btn btn-danger">
            清除缓存
          </button>
          <button @click="refreshPage" class="btn btn-secondary">
            刷新页面
          </button>
        </div>
      </div>

      <div class="log-section">
        <h2>操作日志</h2>
        <div class="log-container">
          <div v-for="(log, index) in logs" :key="index" class="log-item">
            <span class="log-time">{{ log.time }}</span>
            <span class="log-message">{{ log.message }}</span>
          </div>
        </div>
        <button @click="clearLogs" class="btn btn-secondary">清除日志</button>
      </div>

      <div class="url-section">
        <h2>测试 URL</h2>
        <div class="url-list">
          <div class="url-item">
            <label>有效 SessionId:</label>
            <a :href="validUrl" target="_blank">{{ validUrl }}</a>
          </div>
          <div class="url-item">
            <label>无效 SessionId:</label>
            <a :href="invalidUrl" target="_blank">{{ invalidUrl }}</a>
          </div>
          <div class="url-item">
            <label>无 SessionId:</label>
            <a :href="noSessionUrl" target="_blank">{{ noSessionUrl }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { 
  getSessionIdFromUrl, 
  refreshCache, 
  clearSessionCache,
  getCurrentSessionId,
  validateCurrentSession
} from '@/utils/sessionValidator'

// 响应式数据
const logs = ref<Array<{ time: string; message: string }>>([])
const urlSessionId = ref<string | null>(null)
const cachedSessionId = ref<string | null>(null)
const currentSessionId = ref<string | null>(null)
const lastLoginTime = ref<string | null>(null)

// 计算属性
const validUrl = computed(() => `${window.location.origin}/sessionTest?sessionId=a123456789`)
const invalidUrl = computed(() => `${window.location.origin}/sessionTest?sessionId=invalid123`)
const noSessionUrl = computed(() => `${window.location.origin}/sessionTest`)

// 添加日志
const addLog = (message: string) => {
  const time = new Date().toLocaleTimeString()
  logs.value.unshift({ time, message })
  console.log(`[${time}] ${message}`)
}

// 更新状态
const updateStatus = () => {
  urlSessionId.value = getSessionIdFromUrl()
  cachedSessionId.value = localStorage.getItem('sessionId')
  currentSessionId.value = getCurrentSessionId()
  lastLoginTime.value = localStorage.getItem('lastLoginTime')
  
  addLog(`状态更新 - URL: ${urlSessionId.value || '无'}, 缓存: ${cachedSessionId.value || '无'}, 当前: ${currentSessionId.value || '无'}`)
}

// 测试有效 SessionId
const testValidSession = () => {
  addLog('测试有效 SessionId')
  const testSessionId = 'a123456789'
  
  // 模拟URL中有sessionId的情况
  addLog('模拟URL中有sessionId，刷新缓存')
  refreshCache(testSessionId)
  
  updateStatus()
}

// 测试无效 SessionId
const testInvalidSession = () => {
  addLog('测试无效 SessionId')
  const testSessionId = 'invalid123'
  
  // 模拟URL中有无效sessionId的情况
  addLog('模拟URL中有无效sessionId，仍然刷新缓存')
  refreshCache(testSessionId)
  
  updateStatus()
}

// 测试校验功能
const testValidation = () => {
  addLog('测试校验功能')
  
  try {
    const result = validateCurrentSession()
    addLog(`校验结果: ${result.isValid ? '通过' : '失败'} - ${result.error || ''}`)
    
    if (result.isValid) {
      addLog('✅ 校验通过，sessionId有效')
    } else {
      addLog('❌ 校验失败，sessionId无效')
    }
  } catch (error) {
    addLog(`❌ 校验异常: ${error}`)
  }
}

// 测试错误页面自动跳转功能
const testErrorPageRedirect = () => {
  addLog('测试错误页面自动跳转功能')
  
  // 模拟访问错误页面但带有有效sessionId
  const errorPageWithValidSession = '/errorPage?sessionId=a123456789'
  addLog(`模拟访问: ${errorPageWithValidSession}`)
  
  // 在新窗口打开错误页面
  window.open(errorPageWithValidSession, '_blank')
  
  addLog('✅ 已在新窗口打开错误页面，应该会自动跳转到dashboard')
}

// 清除缓存
const clearCache = () => {
  addLog('清除所有缓存')
  clearSessionCache()
  updateStatus()
}

// 刷新页面
const refreshPage = () => {
  addLog('刷新页面')
  window.location.reload()
}

// 清除日志
const clearLogs = () => {
  logs.value = []
  addLog('日志已清除')
}

// 组件挂载时初始化
onMounted(() => {
  addLog('页面加载完成')
  updateStatus()
  
  // 监听 URL 变化
  window.addEventListener('popstate', () => {
    addLog('URL 变化检测')
    updateStatus()
  })
})
</script>

<style scoped>
.session-test {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.container {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
  text-align: center;
  margin-bottom: 30px;
}

h2 {
  color: #555;
  margin-bottom: 15px;
  border-bottom: 2px solid #eee;
  padding-bottom: 5px;
}

.info-section {
  margin-bottom: 30px;
}

.status-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.status-item {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 6px;
  border-left: 4px solid #007bff;
}

.status-item label {
  font-weight: bold;
  color: #666;
  display: block;
  margin-bottom: 5px;
}

.status-item span {
  font-family: monospace;
  font-size: 14px;
}

.valid {
  color: #28a745;
  font-weight: bold;
}

.invalid {
  color: #dc3545;
  font-weight: bold;
}

.warning {
  color: #ffc107;
  font-weight: bold;
}

.normal {
  color: #6c757d;
}

.test-section {
  margin-bottom: 30px;
}

.button-group {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-warning {
  background: #ffc107;
  color: #212529;
}

.btn-success {
  background: #28a745;
  color: white;
}

.btn-danger {
  background: #dc3545;
  color: white;
}

.btn-info {
  background: #17a2b8;
  color: white;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.log-section {
  margin-bottom: 30px;
}

.log-container {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 10px;
}

.log-item {
  padding: 8px 12px;
  border-bottom: 1px solid #dee2e6;
  font-family: monospace;
  font-size: 12px;
}

.log-item:last-child {
  border-bottom: none;
}

.log-time {
  color: #6c757d;
  margin-right: 10px;
}

.log-message {
  color: #333;
}

.url-section {
  margin-bottom: 20px;
}

.url-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.url-item {
  background: #f8f9fa;
  padding: 10px;
  border-radius: 4px;
  border-left: 3px solid #28a745;
}

.url-item label {
  font-weight: bold;
  color: #666;
  display: block;
  margin-bottom: 5px;
}

.url-item a {
  color: #007bff;
  text-decoration: none;
  word-break: break-all;
}

.url-item a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .status-grid {
    grid-template-columns: 1fr;
  }
  
  .button-group {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
}
</style> 