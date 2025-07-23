<template>
  <div class="login-container">
    <!-- 控制按钮区域 -->
    <div class="login-controls">
      <!-- 主题切换按钮 -->
      <button class="control-btn theme-toggle-btn" @click="toggleTheme" :title="currentTheme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'">
        <!-- 太阳图标 (亮色模式) -->
        <svg v-if="currentTheme === 'light'" width="20" height="20" viewBox="0 0 24 24" fill="none" class="control-icon">
          <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <!-- 月亮图标 (暗色模式) -->
        <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" class="control-icon">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>

      <!-- 波浪动画控制按钮 -->
      <button class="control-btn animation-toggle-btn" @click="toggleAnimation" :title="isAnimationPaused ? 'Resume Background Animation' : 'Pause Background Animation'">
        <!-- 波浪图标 (动画暂停时) -->
        <svg v-if="isAnimationPaused" width="20" height="20" viewBox="0 0 24 24" fill="none" class="control-icon">
          <path d="M2 12C2 12 4 8 8 8C12 8 14 12 18 12C22 12 24 8 24 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 16C2 16 4 12 8 12C12 12 14 16 18 16C22 16 24 12 24 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="12" cy="12" r="2" fill="currentColor"/>
        </svg>
        <!-- 暂停波浪图标 (动画播放时) -->
        <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" class="control-icon">
          <path d="M2 12C2 12 4 8 8 8C12 8 14 12 18 12C22 12 24 8 24 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 16C2 16 4 12 8 12C12 12 14 16 18 16C22 16 24 12 24 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="8" y1="6" x2="8" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="16" y1="6" x2="16" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>

    <!-- 波浪背景 -->
    <LoginWaveBackground>
      <div class="login-content">
        <!-- 主登录卡片 -->
        <div class="login-card">
          <!-- 装饰性背景元素 -->
          <div class="card-decoration">
            <div class="decoration-circle circle-1"></div>
            <div class="decoration-circle circle-2"></div>
            <div class="decoration-circle circle-3"></div>
          </div>

          <!-- Logo区域 -->
          <div class="login-header">
            <div class="logo-container">
              <div class="logo-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="logo-text">
                <h1 class="login-title">Basic Database</h1>
                <p class="login-subtitle">Secure Access Portal</p>
              </div>
            </div>
          </div>

          <!-- 登录表单 -->
          <form @submit.prevent="handleLogin" class="login-form">
            <div class="form-group">
              <div class="input-container">
                <div class="input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="8" r="5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M20 21C20 16.5817 16.4183 13 12 13C7.58172 13 4 16.5817 4 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <input
                  id="username"
                  v-model="loginForm.username"
                  type="text"
                  placeholder="Enter username (optional)"
                  class="form-input"
                />
                <div class="input-border"></div>
              </div>
            </div>

            <div class="form-group">
              <div class="input-container">
                <div class="input-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="12" cy="16" r="1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7 11V7C7 5.93913 7.42143 4.92172 8.17157 4.17157C8.92172 3.42143 9.93913 3 11 3H13C14.0609 3 15.0783 3.42143 15.8284 4.17157C16.5786 4.92143 17 5.93913 17 7V11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <input
                  id="password"
                  v-model="loginForm.password"
                  type="password"
                  placeholder="Enter password (optional)"
                  class="form-input"
                />
                <div class="input-border"></div>
              </div>
            </div>

            <div class="form-options">
              <label class="checkbox-container">
                <input type="checkbox" v-model="loginForm.rememberMe" />
                <span class="custom-checkbox"></span>
                <span class="checkbox-label">Remember me</span>
              </label>
              <a href="#" class="forgot-link">Forgot password?</a>
            </div>

            <button type="submit" class="login-button" :disabled="isLoading">
              <div class="button-content">
                <svg v-if="isLoading" width="20" height="20" viewBox="0 0 24 24" fill="none" class="loading-spinner">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="31.416" stroke-dashoffset="31.416">
                    <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
                    <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
                  </circle>
                </svg>
                <span v-else>Sign In</span>
              </div>
              <div class="button-glow"></div>
            </button>
          </form>

          <!-- 错误信息 -->
          <div v-if="errorMessage" class="error-message">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
              <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            {{ errorMessage }}
          </div>

          <!-- 底部信息 -->
          <div class="login-footer">
            <p>Don't have an account? <a href="#" class="signup-link">Sign up</a></p>
          </div>
        </div>
      </div>
    </LoginWaveBackground>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import LoginWaveBackground from '../components/LoginWaveBackground.vue'
import { currentTheme, toggleTheme } from '@/utils/themeManager'
import { isAnimationPaused, toggleAnimation } from '@/utils/animationManager'
import { validateCurrentSession } from '@/utils/sessionValidator'

const router = useRouter()

// 登录表单数据
const loginForm = reactive({
  username: '',
  password: '',
  rememberMe: false
})

// 状态管理
const isLoading = ref(false)
const errorMessage = ref('')
const showLoginForm = ref(true)

onMounted(async () => {
  // 检查 URL 是否有 sessionId
  const urlParams = new URLSearchParams(window.location.search)
  const sessionId = urlParams.get('sessionId')
  if (sessionId) {
    // 校验 sessionId
    const result = await validateCurrentSession()
    if (result.isValid) {
      // 校验通过，自动跳转
      router.replace('/user-confirm')
      return
    }
    // 校验不通过，停留在登录页
    showLoginForm.value = true
    return
  }
  // 只有当前页面不是 /login 时才校验 session
  if (window.location.pathname !== '/login') {
    const result = await validateCurrentSession()
    if (result.isValid) {
      showLoginForm.value = false
      router.push('/dashboard')
      return
    }
    showLoginForm.value = true
  } else {
    // login 页面永远允许访问
    showLoginForm.value = true
  }
})

// 处理登录
const handleLogin = () => {
  // 生成session ID
  const sessionId = 'session_' + Date.now()
  
  // 保存登录状态
  localStorage.setItem('isLoggedIn', 'true')
  localStorage.setItem('sessionId', sessionId)
  localStorage.setItem('username', 'admin')
  
  if (loginForm.rememberMe) {
    localStorage.setItem('rememberMe', 'true')
  }
  
  // 直接跳转到Dashboard
  router.push({
    path: '/dashboard',
    query: { sessionId }
  })
}
</script>

<style scoped>
/* 控制按钮区域 */
.login-controls {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 0.5rem;
  z-index: 1000;
}

.control-btn {
  width: 44px;
  height: 44px;
  border: none;
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-card);
  border-radius: 50%;
  box-shadow: var(--shadow-dialog);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--text-primary);
}

.control-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 32px var(--shadow-primary);
  background: var(--accent-secondary);
  color: var(--accent-primary);
}

.control-icon {
  transition: all 0.3s ease;
}

.control-btn:hover .control-icon {
  transform: scale(1.1);
}

.theme-toggle-btn:hover .control-icon {
  transform: rotate(15deg);
}

.animation-toggle-btn:hover .control-icon {
  transform: scale(1.1);
}

.login-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* padding: 2rem; */
  overflow: hidden;
}

.login-content {
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
}

.login-card {
  position: relative;
  background: var(--bg-card);
  backdrop-filter: blur(30px);
  border-radius: 24px;
  padding: 2rem 1.5rem;
  border: 1px solid var(--border-card);
  box-shadow: var(--shadow-card);
  overflow: hidden;
  max-height: 90vh;
  overflow-y: auto;
}

/* 装饰性背景元素 */
.card-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  overflow: hidden;
}

.decoration-circle {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  opacity: 0.1;
  animation: float 6s ease-in-out infinite;
}

.circle-1 {
  width: 120px;
  height: 120px;
  top: -60px;
  right: -60px;
  animation-delay: 0s;
}

.circle-2 {
  width: 80px;
  height: 80px;
  bottom: -40px;
  left: -40px;
  animation-delay: 2s;
}

.circle-3 {
  width: 60px;
  height: 60px;
  top: 50%;
  right: 10%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

.login-header {
  text-align: center;
  margin-bottom: 1.2rem;
  position: relative;
}

.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.logo-icon {
  width: 72px;
  height: 72px;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3);
  position: relative;
}

.logo-icon::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  border-radius: 22px;
  z-index: -1;
  opacity: 0.3;
  filter: blur(8px);
}

.logo-text {
  text-align: center;
}

.login-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
  background: linear-gradient(135deg, var(--text-primary), var(--accent-primary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.login-subtitle {
  font-size: 1rem;
  color: var(--text-secondary);
  margin: 0;
  font-weight: 500;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
}

.form-group {
  position: relative;
}

.input-container {
  position: relative;
  display: flex;
  align-items: center;
  background: var(--bg-primary);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.input-container:focus-within {
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
  transform: translateY(-1px);
}

.input-icon {
  position: absolute;
  left: 1rem;
  color: var(--text-tertiary);
  z-index: 1;
  transition: all 0.3s ease;
}

.input-container:focus-within .input-icon {
  color: var(--accent-primary);
}

.form-input {
  flex: 1;
  padding: 1rem 1rem 1rem 3rem;
  border: none;
  outline: none;
  background: transparent;
  font-size: 1rem;
  color: var(--text-primary);
  font-weight: 500;
}

.form-input::placeholder {
  color: var(--text-tertiary);
  font-weight: 400;
}

.input-border {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.input-container:focus-within .input-border {
  transform: scaleX(1);
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-secondary);
  cursor: pointer;
  font-weight: 500;
}

.checkbox-container input[type="checkbox"] {
  display: none;
}

.custom-checkbox {
  width: 18px;
  height: 18px;
  border: 2px solid var(--border-card);
  border-radius: 4px;
  position: relative;
  transition: all 0.3s ease;
  background: var(--bg-primary);
}

.checkbox-container input[type="checkbox"]:checked + .custom-checkbox {
  background: var(--accent-primary);
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.checkbox-container input[type="checkbox"]:checked + .custom-checkbox::after {
  content: '';
  position: absolute;
  left: 5px;
  top: 2px;
  width: 6px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-label {
  font-weight: 500;
}

.forgot-link {
  color: var(--accent-primary);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
}

.forgot-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--accent-primary);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.forgot-link:hover::after {
  transform: scaleX(1);
}

.login-button {
  position: relative;
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  margin-top: 1rem;
}

.login-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(59, 130, 246, 0.4);
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.button-content {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.button-glow {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.login-button:hover .button-glow {
  opacity: 0.2;
}

.loading-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.error-message {
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 12px;
  color: #ef4444;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.login-footer {
  margin-top: 1rem;
  text-align: center;
  font-size: 0.875rem;
  color: var(--text-secondary);
  position: relative;
}

.signup-link {
  color: var(--accent-primary);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
}

.signup-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--accent-primary);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.signup-link:hover::after {
  transform: scaleX(1);
}


</style> 