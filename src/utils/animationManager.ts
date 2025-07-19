import { ref } from 'vue'

// 全局动画状态
const isAnimationPaused = ref(false)

// 切换动画状态
const toggleAnimation = () => {
  isAnimationPaused.value = !isAnimationPaused.value
  
  // 触发全局事件
  window.dispatchEvent(new CustomEvent('toggleBackgroundAnimation', {
    detail: { paused: isAnimationPaused.value }
  }))
  
  // 保存到localStorage
  localStorage.setItem('animationPaused', isAnimationPaused.value.toString())
}

// 设置动画状态
const setAnimationPaused = (paused: boolean) => {
  isAnimationPaused.value = paused
  
  // 触发全局事件
  window.dispatchEvent(new CustomEvent('toggleBackgroundAnimation', {
    detail: { paused: isAnimationPaused.value }
  }))
  
  // 保存到localStorage
  localStorage.setItem('animationPaused', isAnimationPaused.value.toString())
}

// 初始化动画状态
const initAnimationState = () => {
  const savedState = localStorage.getItem('animationPaused')
  if (savedState !== null) {
    isAnimationPaused.value = savedState === 'true'
  }
}

// 初始化
initAnimationState()

export { isAnimationPaused, toggleAnimation, setAnimationPaused } 