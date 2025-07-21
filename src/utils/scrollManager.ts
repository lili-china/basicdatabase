import { ref, onMounted, onUnmounted } from 'vue'

// 滚动状态管理
const isScrolled = ref(false)
const scrollThreshold = 50 // 滚动阈值

// 滚动处理函数
const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  isScrolled.value = scrollTop > scrollThreshold
}

// 初始化滚动监听
export const initScrollListener = () => {
  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return isScrolled
}

// 获取滚动状态
export const getScrollState = () => isScrolled

// 手动设置滚动状态（用于测试）
export const setScrollState = (state: boolean) => {
  isScrolled.value = state
} 