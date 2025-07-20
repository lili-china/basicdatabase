<template>
  <div v-if="isLoading" class="loading-container">
    <div class="loading-spinner">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="31.416" stroke-dashoffset="31.416">
          <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
          <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
        </circle>
      </svg>
      <p>Validating session...</p>
    </div>
  </div>
  
  <router-view v-else />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { validateCurrentSession } from '@/utils/sessionValidator'

const router = useRouter()
const route = useRoute()
const isLoading = ref(true)

// 检查当前路由是否需要session验证
const needsSessionValidation = (path: string) => {
  return !path.startsWith('/error') && !path.startsWith('/errorPage') && !path.startsWith('/login') && !path.startsWith('/user-confirm')
}

// 检查登录状态
const checkLoginStatus = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
  const sessionId = localStorage.getItem('sessionId')
  
  if (!isLoggedIn || !sessionId) {
    console.log('SessionGuard: User not logged in, redirecting to login')
    router.push('/login')
    return false
  }
  
  return true
}

// 执行session验证（新版：用localStorage和URL参数校验）
const performSessionValidation = async () => {
  try {
    console.log('SessionGuard: Starting session validation...')

    // 优先从localStorage获取sessionId
    let sessionId = localStorage.getItem('sessionId')
    
    // 如果localStorage中没有，尝试从URL获取（仅第一次）
    if (!sessionId) {
      sessionId = new URLSearchParams(window.location.search).get('sessionId') || 
                  new URLSearchParams(window.location.search).get('sessionid')
      
      // 如果从URL获取到有效的sessionId，保存到localStorage
      if (sessionId && sessionId === 'a123456789') {
        localStorage.setItem('sessionId', sessionId)
      }
    }
    
    // 验证sessionId
    if (sessionId && sessionId !== 'a123456789') {
      // sessionId不正确，跳转到错误页面
      window.location.href = '/errorPage?reason=invalid-sessionid'
      return
    }
    
    // 如果没有sessionId，跳转到错误页面
    if (!sessionId) {
      window.location.href = '/errorPage?reason=no-sessionid'
      return
    }
    
    // 校验通过，显示内容
    isLoading.value = false
  } catch (error) {
    console.error('SessionGuard: Session validation error:', error)
    // 万一异常，跳转到错误页
    window.location.href = '/errorPage?reason=exception'
  }
}

onMounted(async () => {
  console.log('SessionGuard: Current path:', route.path)
  console.log('SessionGuard: Needs validation:', needsSessionValidation(route.path))
  
  // 如果当前是错误页面，直接显示内容
  if (!needsSessionValidation(route.path)) {
    console.log('SessionGuard: Error page detected, skipping validation')
    isLoading.value = false
    return
  }
  
  console.log('SessionGuard: Proceeding with validation...')
  await performSessionValidation()
})

// 监听路由变化
watch(() => route.path, async (newPath) => {
  if (!needsSessionValidation(newPath)) {
    console.log('SessionGuard: Login or error page detected, skipping validation')
    isLoading.value = false
    return
  }
  
  // 如果从登录页面切换到其他页面，重新验证
  if (isLoading.value === false) {
    isLoading.value = true
    await performSessionValidation()
  }
})
</script>

<style scoped>
.loading-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-spinner {
  text-align: center;
  color: white;
}

.loading-spinner svg {
  margin-bottom: 1rem;
  animation: spin 2s linear infinite;
}

.loading-spinner p {
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style> 