/**
 * 环境变量加载器
 * 用于从 env.config 文件加载环境变量
 */

// 加载环境变量
export const loadEnvConfig = () => {
  // 尝试从 env.config 文件加载
  try {
    // 这里可以添加自定义的环境变量加载逻辑
    // 目前 Vite 会自动处理 .env 文件
    console.log('环境变量加载完成')
    console.log('API地址:', import.meta.env.VITE_API_BASE_URL)
    console.log('应用标题:', import.meta.env.VITE_APP_TITLE)
  } catch (error) {
    console.warn('环境变量加载失败，使用默认值:', error)
  }
}

// 获取环境变量
export const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key]
  return value || defaultValue || ''
}

// 检查是否为开发环境
export const isDev = (): boolean => {
  return import.meta.env.DEV
}

// 检查是否为生产环境
export const isProd = (): boolean => {
  return import.meta.env.PROD
}

// 获取API基础URL
export const getApiBaseUrl = (): string => {
  return getEnvVar('VITE_API_BASE_URL', 'http://localhost:3000/api')
}

// 获取应用标题
export const getAppTitle = (): string => {
  return getEnvVar('VITE_APP_TITLE', 'Basic Database')
} 