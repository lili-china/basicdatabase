<template>
  <div class="error-page">
    <div class="error-container">
      <div class="error-icon">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
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
      
      <div class="error-help">
        <h3>Need Help?</h3>
        <p>If you continue to experience issues, please contact support:</p>
        <ul>
          <li>Email: support@employeedb.com</li>
          <li>Phone: +1 (555) 123-4567</li>
          <li>Reference Code: {{ errorCode }}</li>
        </ul>
      </div>
      
      <div class="session-help" v-if="errorType === 'session'">
        <h3>Session ID Requirements:</h3>
        <ul>
          <li>Must be at least 8 characters long</li>
          <li>Must contain both letters and numbers</li>
          <li>Example: <code>abc123def456</code></li>
        </ul>
        <p>Try accessing: <code>http://localhost:3000/personal-database?sessionid=abc123def456</code></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

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
      return 'Your session has expired or is invalid. Please log in again with a valid session ID.'
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
</script>

<style scoped>
.error-page {
  min-height: 100vh;
  background: var(--wave-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.error-container {
  background: var(--bg-dialog);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 3rem;
  max-width: 700px;
  width: 100%;
  text-align: center;
  box-shadow: var(--shadow-dialog);
}

.error-icon {
  color: #ef4444;
  margin-bottom: 2rem;
}

.error-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 1rem 0;
}

.error-message {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0 0 2rem 0;
}

.error-details {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 8px;
  padding: 1rem;
  margin: 1.5rem 0;
  text-align: left;
}

.error-details h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #dc2626;
  margin: 0 0 0.5rem 0;
}

.error-details p {
  font-size: 0.9rem;
  color: #7f1d1d;
  margin: 0;
  font-family: monospace;
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin: 2rem 0;
  flex-wrap: wrap;
}

.btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.btn-secondary {
  background: rgba(107, 114, 128, 0.1);
  color: #6b7280;
  border: 1px solid rgba(107, 114, 128, 0.2);
}

.btn-secondary:hover {
  background: rgba(107, 114, 128, 0.2);
  color: #374151;
}

.error-help {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  text-align: left;
}

.error-help h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
}

.error-help p {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin: 0 0 1rem 0;
}

.error-help ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.error-help li {
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0.25rem 0;
  padding: 0.25rem 0;
}

.session-help {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  text-align: left;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 8px;
  padding: 1.5rem;
}

.session-help h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 1rem 0;
}

.session-help ul {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem 0;
}

.session-help li {
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0.25rem 0;
  padding: 0.25rem 0;
}

.session-help code {
  background: rgba(0, 0, 0, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.8rem;
}

.session-help p {
  font-size: 0.9rem;
  color: #6b7280;
  margin: 0;
  word-break: break-all;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .error-page {
    padding: 1rem;
  }
  
  .error-container {
    padding: 2rem;
  }
  
  .error-title {
    font-size: 1.5rem;
  }
  
  .error-message {
    font-size: 1rem;
  }
  
  .error-actions {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .error-container {
    padding: 1.5rem;
  }
  
  .error-title {
    font-size: 1.3rem;
  }
  
  .error-message {
    font-size: 0.9rem;
  }
}
</style> 