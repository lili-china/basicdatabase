<template>
  <div class="user-confirm-page">
    <LoginWaveBackground>
      <div class="confirm-container">
        <div class="user-info">
          <div class="user-avatar">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M20 21C20 16.5817 16.4183 13 12 13C7.58172 13 4 16.5817 4 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h2 class="user-name">{{ userName }}</h2>
          <p class="user-session">Authentication completed via external system integration.</p>
        </div>
        
        <div class="confirm-actions">
          <button @click="enterSystem" class="btn btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Enter System
          </button>
        </div>
      </div>
    </LoginWaveBackground>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import LoginWaveBackground from '../components/LoginWaveBackground.vue'
import { getSessionIdFromUrl } from '@/utils/sessionValidator'

const router = useRouter()
const route = useRoute()

const userName = ref('Admin User')
const sessionId = ref('')

onMounted(() => {
  // 从URL获取sessionId
  sessionId.value = getSessionIdFromUrl() || ''

  // 强制显示导航栏
  localStorage.setItem('navHidden', 'false')

  // 从localStorage获取用户名
  const savedUserName = localStorage.getItem('username')
  if (savedUserName) {
    userName.value = savedUserName
  }
})

const enterSystem = () => {
  const localSessionId = localStorage.getItem('sessionId')
  if (!sessionId.value || sessionId.value !== localSessionId) {
    window.location.href = '/errorPage?reason=invalid-sessionid'
    return
  }
  router.push('/dashboard')
}


</script>

<style scoped>
.user-confirm-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.confirm-container {
  background: var(--bg-dialog);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 3.5rem;
  max-width: 480px;
  width: 100%;
  text-align: center;
  box-shadow: var(--shadow-dialog);
  border: 1px solid var(--border-card);
}

.user-info {
  margin-bottom: 3rem;
}

.user-avatar {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
  box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3);
  border: 4px solid rgba(255, 255, 255, 0.2);
}

.user-name {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 1rem 0;
  letter-spacing: -0.025em;
}

.user-session {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin: 0;
  background: rgba(59, 130, 246, 0.08);
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  display: inline-block;
  border: 1px solid rgba(59, 130, 246, 0.15);
  font-weight: 500;
}

.confirm-actions {
  display: flex;
  gap: 1.25rem;
  justify-content: center;
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
  background: rgba(239, 68, 68, 0.08);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.btn-secondary:hover {
  background: rgba(239, 68, 68, 0.15);
  color: #dc2626;
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(239, 68, 68, 0.2);
}
</style> 