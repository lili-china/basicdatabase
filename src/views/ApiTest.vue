<template>
  <div class="app-container">
    <!-- 导航栏 -->
    <NavigationBar />
    
    <!-- 波浪背景和内容 -->
    <WaveBackground>
      <div class="wave-demo-container">
        
        <!-- 页面标题 -->
        <div class="page-header">
          <h1>API Test Page</h1>
          <p>Test and debug API validation functionality</p>
        </div>
        
        <!-- API配置区域 -->
        <div class="api-config-section">
          <div class="config-header">
            <h3>API Configuration</h3>
          </div>
          
          <div class="config-content">
            <div class="config-row">
              <label>API Enabled:</label>
              <el-switch 
                v-model="apiEnabled" 
                @change="toggleApiEnabled"
                active-text="Enabled"
                inactive-text="Disabled"
              />
            </div>
            
            <div class="config-row">
              <label>API Base URL:</label>
              <el-input 
                v-model="apiBaseUrl" 
                placeholder="http://localhost:8080/api"
                @change="updateApiBaseUrl"
              />
            </div>
            
            <div class="config-row">
              <label>Timeout (ms):</label>
              <el-input-number 
                v-model="apiTimeout" 
                :min="1000" 
                :max="30000"
                @change="updateApiTimeout"
              />
            </div>
            
            <div class="config-row">
              <label>Retry Count:</label>
              <el-input-number 
                v-model="apiRetryCount" 
                :min="1" 
                :max="10"
                @change="updateApiRetryCount"
              />
            </div>
          </div>
        </div>
        
        <!-- 测试区域 -->
        <div class="test-section">
          <div class="test-header">
            <h3>API Testing</h3>
          </div>
          
          <div class="test-content">
            <div class="test-row">
              <el-button type="primary" @click="testSessionValidation">
                Test Session Validation
              </el-button>
              <el-button type="success" @click="testUserInfo">
                Test User Info
              </el-button>
              <el-button type="warning" @click="testSessionRefresh">
                Test Session Refresh
              </el-button>
            </div>
            
            <div class="test-row">
              <el-button type="info" @click="getCurrentConfig">
                Get Current Config
              </el-button>
              <el-button type="danger" @click="clearCache">
                Clear Cache
              </el-button>
            </div>
          </div>
        </div>
        
        <!-- 结果显示区域 -->
        <div class="result-section">
          <div class="result-header">
            <h3>Test Results</h3>
            <el-button @click="clearResults" size="small">Clear</el-button>
          </div>
          
          <div class="result-content">
            <div v-for="(result, index) in testResults" :key="index" class="result-item">
              <div class="result-time">{{ result.time }}</div>
              <div class="result-type">{{ result.type }}</div>
              <div class="result-status" :class="result.success ? 'success' : 'error'">
                {{ result.success ? 'SUCCESS' : 'ERROR' }}
              </div>
              <div class="result-message">{{ result.message }}</div>
              <div v-if="result.data" class="result-data">
                <pre>{{ JSON.stringify(result.data, null, 2) }}</pre>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 当前状态显示 -->
        <div class="status-section">
          <div class="status-header">
            <h3>Current Status</h3>
          </div>
          
          <div class="status-content">
            <div class="status-item">
              <span class="status-label">API Enabled:</span>
              <span class="status-value" :class="apiEnabled ? 'success' : 'error'">
                {{ apiEnabled ? 'Yes' : 'No' }}
              </span>
            </div>
            
            <div class="status-item">
              <span class="status-label">Current Session ID:</span>
              <span class="status-value">{{ currentSessionId || 'None' }}</span>
            </div>
            
            <div class="status-item">
              <span class="status-label">Session Expired:</span>
              <span class="status-value" :class="sessionExpired ? 'error' : 'success'">
                {{ sessionExpired ? 'Yes' : 'No' }}
              </span>
            </div>
            
            <div class="status-item">
              <span class="status-label">API Base URL:</span>
              <span class="status-value">{{ apiBaseUrl }}</span>
            </div>
          </div>
        </div>
      </div>
    </WaveBackground>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import WaveBackground from '../components/WaveBackground.vue'
import NavigationBar from '../components/NavigationBar.vue'
import { 
  setApiEnabled, 
  setApiBaseUrl, 
  setApiConfig, 
  getApiConfig,
  isApiEnabled 
} from '../utils/apiConfig'
import { 
  getCurrentSessionId, 
  validateSessionWithApi, 
  getUserInfoFromApi, 
  refreshSessionWithApi,
  clearSessionCache,
  isSessionExpired 
} from '../utils/sessionValidator'

// 响应式数据
const apiEnabled = ref(false)
const apiBaseUrl = ref('http://localhost:8080/api')
const apiTimeout = ref(10000)
const apiRetryCount = ref(3)
const currentSessionId = ref<string | null>(null)
const sessionExpired = ref(false)
const testResults = ref<Array<{
  time: string
  type: string
  success: boolean
  message: string
  data?: any
}>>([])

// 初始化
onMounted(() => {
  const config = getApiConfig()
  apiEnabled.value = config.enabled
  apiBaseUrl.value = config.baseUrl
  apiTimeout.value = config.timeout
  apiRetryCount.value = config.retryCount
  
  currentSessionId.value = getCurrentSessionId()
  sessionExpired.value = isSessionExpired()
})

// 切换API启用状态
const toggleApiEnabled = (enabled: boolean) => {
  setApiEnabled(enabled)
  addTestResult('Config Update', true, `API ${enabled ? 'enabled' : 'disabled'}`)
}

// 更新API基础URL
const updateApiBaseUrl = (url: string) => {
  setApiBaseUrl(url)
  addTestResult('Config Update', true, `API base URL updated to: ${url}`)
}

// 更新API超时时间
const updateApiTimeout = (timeout: number) => {
  setApiConfig({ timeout })
  addTestResult('Config Update', true, `API timeout updated to: ${timeout}ms`)
}

// 更新API重试次数
const updateApiRetryCount = (retryCount: number) => {
  setApiConfig({ retryCount })
  addTestResult('Config Update', true, `API retry count updated to: ${retryCount}`)
}

// 测试Session验证
const testSessionValidation = async () => {
  const sessionId = getCurrentSessionId()
  if (!sessionId) {
    addTestResult('Session Validation', false, 'No session ID available')
    return
  }
  
  try {
    const result = await validateSessionWithApi(sessionId)
    addTestResult('Session Validation', result, 
      result ? 'Session validation successful' : 'Session validation failed')
  } catch (error) {
    addTestResult('Session Validation', false, `Error: ${error}`)
  }
}

// 测试用户信息
const testUserInfo = async () => {
  const sessionId = getCurrentSessionId()
  if (!sessionId) {
    addTestResult('User Info', false, 'No session ID available')
    return
  }
  
  try {
    const userInfo = await getUserInfoFromApi(sessionId)
    if (userInfo) {
      addTestResult('User Info', true, 'User info retrieved successfully', userInfo)
    } else {
      addTestResult('User Info', false, 'Failed to retrieve user info')
    }
  } catch (error) {
    addTestResult('User Info', false, `Error: ${error}`)
  }
}

// 测试Session刷新
const testSessionRefresh = async () => {
  const sessionId = getCurrentSessionId()
  if (!sessionId) {
    addTestResult('Session Refresh', false, 'No session ID available')
    return
  }
  
  try {
    const newSessionId = await refreshSessionWithApi(sessionId)
    if (newSessionId) {
      addTestResult('Session Refresh', true, `Session refreshed: ${newSessionId}`)
    } else {
      addTestResult('Session Refresh', false, 'Failed to refresh session')
    }
  } catch (error) {
    addTestResult('Session Refresh', false, `Error: ${error}`)
  }
}

// 获取当前配置
const getCurrentConfig = () => {
  const config = getApiConfig()
  addTestResult('Get Config', true, 'Current API configuration', config)
}

// 清除缓存
const clearCache = () => {
  clearSessionCache()
  addTestResult('Clear Cache', true, 'Session cache cleared')
}

// 清除结果
const clearResults = () => {
  testResults.value = []
}

// 添加测试结果
const addTestResult = (type: string, success: boolean, message: string, data?: any) => {
  testResults.value.unshift({
    time: new Date().toLocaleTimeString(),
    type,
    success,
    message,
    data
  })
}
</script>

<style scoped>
/* API配置区域 */
.api-config-section {
  margin-bottom: 2rem;
}

.config-header {
  margin-bottom: 1rem;
  text-align: center;
}

.config-header h3 {
  font-size: 1.25rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.config-content {
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid var(--border-card);
  box-shadow: var(--shadow-card);
}

.config-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.config-row:last-child {
  margin-bottom: 0;
}

.config-row label {
  min-width: 120px;
  font-weight: 500;
  color: var(--text-primary);
}

/* 测试区域 */
.test-section {
  margin-bottom: 2rem;
}

.test-header {
  margin-bottom: 1rem;
  text-align: center;
}

.test-header h3 {
  font-size: 1.25rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.test-content {
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid var(--border-card);
  box-shadow: var(--shadow-card);
}

.test-row {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.test-row:last-child {
  margin-bottom: 0;
}

/* 结果显示区域 */
.result-section {
  margin-bottom: 2rem;
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.result-header h3 {
  font-size: 1.25rem;
  color: var(--text-primary);
  margin: 0;
}

.result-content {
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid var(--border-card);
  box-shadow: var(--shadow-card);
  max-height: 400px;
  overflow-y: auto;
}

.result-item {
  padding: 1rem;
  border: 1px solid var(--border-card);
  border-radius: 8px;
  margin-bottom: 1rem;
  background: var(--bg-secondary);
}

.result-item:last-child {
  margin-bottom: 0;
}

.result-time {
  font-size: 0.75rem;
  color: var(--text-tertiary);
  margin-bottom: 0.5rem;
}

.result-type {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.result-status {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.result-status.success {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.result-status.error {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.result-message {
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.result-data {
  background: var(--bg-primary);
  border-radius: 4px;
  padding: 0.5rem;
  font-family: monospace;
  font-size: 0.875rem;
  overflow-x: auto;
}

.result-data pre {
  margin: 0;
  color: var(--text-primary);
}

/* 状态显示区域 */
.status-section {
  margin-bottom: 2rem;
}

.status-header {
  margin-bottom: 1rem;
  text-align: center;
}

.status-header h3 {
  font-size: 1.25rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.status-content {
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid var(--border-card);
  box-shadow: var(--shadow-card);
}

.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--border-card);
}

.status-item:last-child {
  border-bottom: none;
}

.status-label {
  font-weight: 500;
  color: var(--text-primary);
}

.status-value {
  font-weight: 600;
}

.status-value.success {
  color: #22c55e;
}

.status-value.error {
  color: #ef4444;
}
</style> 