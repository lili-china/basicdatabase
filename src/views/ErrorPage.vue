<template>
  <div class="error-page">
    <LoginWaveBackground>
      <div class="error-container">
        <div class="error-icon">
          <svg width="100" height="100" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
            <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" stroke-width="2"/>
            <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2"/>
          </svg>
        </div>
        
        <h1 class="error-title">{{ errorTitle }}</h1>
        <p class="error-message">{{ errorMessage }}</p>
        
        <div class="error-details" v-if="errorDetails">
          <h3>Error Details:</h3>
          <p>{{ errorDetails }}</p>
        </div>
        
        <div class="error-actions">
          <button @click="goHome" class="btn btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Go to Home
          </button>
          
          <button @click="goBack" class="btn btn-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Go Back
          </button>
          
          <button @click="refreshPage" class="btn btn-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M1 4V10H7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M23 20V14H17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14L18.36 18.36A9 9 0 0 1 3.51 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Refresh Page
          </button>
        </div>
      </div>
    </LoginWaveBackground>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import LoginWaveBackground from '../components/LoginWaveBackground.vue'
import { getSessionIdFromUrl, refreshCache } from '@/utils/sessionValidator'

interface Props {
  errorType?: 'session' | 'network' | 'permission' | 'general'
  errorCode?: string
  errorDetails?: string
}

const props = withDefaults(defineProps<Props>(), {
  errorType: 'session',
  errorCode: 'ERR-' + Math.random().toString(36).substr(2, 8).toUpperCase(),
  errorDetails: ''
})

const router = useRouter()

// 检查URL中的sessionId并自动跳转
const checkSessionIdAndRedirect = () => {
  const urlSessionId = getSessionIdFromUrl()
  
  if (urlSessionId && urlSessionId === 'a123456789') {
    console.log('ErrorPage: 检测到有效的sessionId，自动跳转到dashboard')
    
    // 刷新缓存
    refreshCache(urlSessionId)
    
    // 跳转到dashboard
    router.push('/dashboard')
    return true
  }
  
  return false
}

const errorTitle = computed(() => {
  switch (props.errorType) {
    case 'session':
      return 'Session Validation Failed'
    case 'network':
      return 'Network Error'
    case 'permission':
      return 'Access Denied'
    default:
      return 'An Error Occurred'
  }
})

const errorMessage = computed(() => {
  switch (props.errorType) {
    case 'session':
      return 'Session authentication failed. Invalid or missing session identifier. Please re-authenticate with valid credentials.'
    case 'network':
      return 'Unable to connect to the server. Please check your internet connection and try again.'
    case 'permission':
      return 'You do not have permission to access this resource. Please contact your administrator.'
    default:
      return 'Something went wrong. Please try again or contact support if the problem persists.'
  }
})

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  window.history.back()
}

const refreshPage = () => {
  window.location.reload()
}

// 组件挂载时检查sessionId
onMounted(() => {
  console.log('ErrorPage: 页面加载，检查URL中的sessionId')
  checkSessionIdAndRedirect()
})
</script>

<style scoped>
.error-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.error-container {
  background: var(--bg-dialog);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 3.5rem;
  max-width: 600px;
  width: 100%;
  text-align: center;
  box-shadow: var(--shadow-dialog);
  border: 1px solid var(--border-card);
}

.error-icon {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  color: white;
  box-shadow: 0 8px 32px rgba(239, 68, 68, 0.3);
  border: 4px solid rgba(255, 255, 255, 0.2);
}

.error-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 1rem 0;
  letter-spacing: -0.025em;
}

.error-message {
  font-size: 1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0 0 2rem 0;
  background: rgba(239, 68, 68, 0.08);
  padding: 1rem 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(239, 68, 68, 0.15);
  font-weight: 500;
}

.error-details {
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 2rem 0;
  text-align: left;
}

.error-details h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #dc2626;
  margin: 0 0 0.75rem 0;
}

.error-details p {
  font-size: 0.9rem;
  color: #7f1d1d;
  margin: 0;
  font-family: monospace;
}

.error-actions {
  display: flex;
  gap: 1.25rem;
  justify-content: center;
  margin: 2rem 0 0 0;
  flex-wrap: wrap;
}

.btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  min-width: 140px;
  justify-content: center;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.3);
}

.btn-primary:hover {
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.4);
}

.btn-secondary {
  background: rgba(107, 114, 128, 0.08);
  color: #6b7280;
  border: 1px solid rgba(107, 114, 128, 0.2);
}

.btn-secondary:hover {
  background: rgba(107, 114, 128, 0.15);
  color: #374151;
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(107, 114, 128, 0.2);
}
</style> 