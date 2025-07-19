import { ref, watch } from 'vue'

// 主题类型
export type Theme = 'light' | 'dark'

// 主题状态
const currentTheme = ref<Theme>('light')

// 从localStorage获取初始主题
const getInitialTheme = (): Theme => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme
  }
  
  // 检查系统偏好
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  
  return 'light'
}

// 初始化主题
currentTheme.value = getInitialTheme()

// 应用主题到DOM
const applyTheme = (theme: Theme) => {
  const root = document.documentElement
  
  if (theme === 'dark') {
    root.classList.add('dark')
    root.setAttribute('data-theme', 'dark')
  } else {
    root.classList.remove('dark')
    root.setAttribute('data-theme', 'light')
  }
  
  // 保存到localStorage
  localStorage.setItem('theme', theme)
}

// 切换主题
export const toggleTheme = () => {
  currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
}

// 设置主题
export const setTheme = (theme: Theme) => {
  currentTheme.value = theme
}

// 获取当前主题
export const getTheme = () => currentTheme.value

// 监听主题变化并应用
watch(currentTheme, (newTheme) => {
  applyTheme(newTheme)
}, { immediate: true })

// 监听系统主题变化
if (window.matchMedia) {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
  mediaQuery.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      // 只有在用户没有手动设置主题时才跟随系统
      currentTheme.value = e.matches ? 'dark' : 'light'
    }
  })
}

export { currentTheme } 