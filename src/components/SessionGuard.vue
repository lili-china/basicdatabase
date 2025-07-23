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
  // login页面没有sessionId时不验证
  if (path.startsWith('/login')) {
    return false // 永远不校验
  }
  return !path.startsWith('/error') && !path.startsWith('/errorPage') && !path.startsWith('/user-confirm')
}

// 执行session验证（使用新的validateCurrentSession函数）
const performSessionValidation = async () => {
  try {
    console.log('SessionGuard: Starting session validation...')

    // 使用新的异步验证函数
    const result = await validateCurrentSession()
    
    console.log('SessionGuard: Validation result:', result)
    
    if (result.isValid) {
      console.log('SessionGuard: Session validation successful')
      isLoading.value = false
    } else {
      console.log('SessionGuard: Session validation failed:', result.error)
      // 验证失败时，validateCurrentSession 会自动跳转到错误页面
    }
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