// API配置文件 - 用于管理内网API配置

export interface ApiEndpoints {
  // 认证相关
  auth: {
    validateSession: string
    refreshSession: string
    getUserInfo: string
    login: string
    logout: string
  }
  // 数据相关
  data: {
    personal: string
    vehicle: string
    isp: string
    analytics: string
  }
  // 系统相关
  system: {
    health: string
    status: string
    config: string
  }
}

export interface ApiConfig {
  baseUrl: string
  timeout: number
  retryCount: number
  enabled: boolean
  endpoints: ApiEndpoints
}

// 默认API配置
export const DEFAULT_API_CONFIG: ApiConfig = {
  baseUrl: 'http://localhost:8080/api',
  timeout: 10000,
  retryCount: 3,
  enabled: false, // 默认关闭，等内网API准备好后改为true
  endpoints: {
    auth: {
      validateSession: '/auth/validate-session',
      refreshSession: '/auth/refresh-session',
      getUserInfo: '/auth/user-info',
      login: '/auth/login',
      logout: '/auth/logout'
    },
    data: {
      personal: '/data/personal',
      vehicle: '/data/vehicle',
      isp: '/data/isp',
      analytics: '/data/analytics'
    },
    system: {
      health: '/system/health',
      status: '/system/status',
      config: '/system/config'
    }
  }
}

// 当前API配置
let currentApiConfig: ApiConfig = { ...DEFAULT_API_CONFIG }

// 设置API配置
export function setApiConfig(config: Partial<ApiConfig>): void {
  currentApiConfig = { ...currentApiConfig, ...config }
  console.log('API配置已更新:', currentApiConfig)
}

// 获取API配置
export function getApiConfig(): ApiConfig {
  return { ...currentApiConfig }
}

// 启用/禁用API
export function setApiEnabled(enabled: boolean): void {
  currentApiConfig.enabled = enabled
  console.log('API状态:', enabled ? '已启用' : '已禁用')
}

// 设置API基础URL
export function setApiBaseUrl(baseUrl: string): void {
  currentApiConfig.baseUrl = baseUrl
  console.log('API基础URL已更新:', baseUrl)
}

// 获取完整的API URL
export function getApiUrl(endpoint: string): string {
  return `${currentApiConfig.baseUrl}${endpoint}`
}

// 检查API是否启用
export function isApiEnabled(): boolean {
  return currentApiConfig.enabled
}

// 获取API超时时间
export function getApiTimeout(): number {
  return currentApiConfig.timeout
}

// 获取API重试次数
export function getApiRetryCount(): number {
  return currentApiConfig.retryCount
}

// 获取认证相关端点
export function getAuthEndpoints(): ApiEndpoints['auth'] {
  return currentApiConfig.endpoints.auth
}

// 获取数据相关端点
export function getDataEndpoints(): ApiEndpoints['data'] {
  return currentApiConfig.endpoints.data
}

// 获取系统相关端点
export function getSystemEndpoints(): ApiEndpoints['system'] {
  return currentApiConfig.endpoints.system
}

// 预留：从环境变量加载API配置
export function loadApiConfigFromEnv(): void {
  // 这里可以从环境变量或配置文件加载API配置
  // 例如：从 .env 文件或 env.config 文件读取
  const envBaseUrl = import.meta.env.VITE_API_BASE_URL
  const envEnabled = import.meta.env.VITE_API_ENABLED === 'true'
  
  if (envBaseUrl) {
    setApiBaseUrl(envBaseUrl)
  }
  
  if (envEnabled !== undefined) {
    setApiEnabled(envEnabled)
  }
  
  console.log('从环境变量加载API配置完成')
}

// 预留：保存API配置到本地存储
export function saveApiConfigToStorage(): void {
  try {
    localStorage.setItem('apiConfig', JSON.stringify(currentApiConfig))
    console.log('API配置已保存到本地存储')
  } catch (error) {
    console.error('保存API配置失败:', error)
  }
}

// 预留：从本地存储加载API配置
export function loadApiConfigFromStorage(): void {
  try {
    const stored = localStorage.getItem('apiConfig')
    if (stored) {
      const config = JSON.parse(stored)
      setApiConfig(config)
      console.log('从本地存储加载API配置完成')
    }
  } catch (error) {
    console.error('加载API配置失败:', error)
  }
}

// 初始化API配置
export function initApiConfig(): void {
  // 1. 从本地存储加载
  loadApiConfigFromStorage()
  
  // 2. 从环境变量加载（会覆盖本地存储的配置）
  loadApiConfigFromEnv()
  
  console.log('API配置初始化完成:', currentApiConfig)
} 