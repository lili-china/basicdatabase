import axios from 'axios'
import { getApiBaseUrl, isDev } from './envLoader'

// 环境配置
const isDevelopment = isDev()

// URL配置 - 从环境变量读取，支持从 env.config 文件读取
const API_BASE_URL = getApiBaseUrl()

// 不需要验证sessionId的URL列表
const EXEMPT_URLS = [
  '/auth/login',
  '/auth/register', 
  '/public/health',
  '/public/status',
  '/api/health',
  '/api/status',
  '/health',
  '/status'
]

// 创建axios实例
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    // 检查URL是否需要跳过验证
    const requestUrl = config.url || ''
    const isExemptUrl = EXEMPT_URLS.some(exemptUrl => 
      requestUrl.includes(exemptUrl) || 
      requestUrl.endsWith(exemptUrl) ||
      requestUrl.startsWith(exemptUrl)
    )
    
    // 如果是豁免URL，跳过sessionId验证
    if (isExemptUrl) {
      console.log('跳过sessionId验证的URL:', requestUrl)
      return config
    }
    
    // 优先从localStorage获取sessionId，如果没有则从URL获取
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
      return Promise.reject(new Error('Invalid session ID'))
    }
    
    // 如果没有sessionId，跳转到错误页面
    if (!sessionId) {
      window.location.href = '/errorPage?reason=no-sessionid'
      return Promise.reject(new Error('No session ID'))
    }
    
    // 添加认证token（如果有）
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // 添加session ID到请求头
    config.headers['X-Session-ID'] = sessionId
    
    console.log('Request:', config.method?.toUpperCase(), config.url)
    return config
  },
  (error) => {
    console.error('Request Error:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => {
    console.log('Response:', response.status, response.config.url)
    return response
  },
  (error) => {
    console.error('Response Error:', error.response?.status, error.response?.data)
    
    // 检查URL是否需要跳过错误处理
    const requestUrl = error.config?.url || ''
    const isExemptUrl = EXEMPT_URLS.some(exemptUrl => 
      requestUrl.includes(exemptUrl) || 
      requestUrl.endsWith(exemptUrl) ||
      requestUrl.startsWith(exemptUrl)
    )
    
    // 如果是豁免URL，跳过错误重定向
    if (isExemptUrl) {
      console.log('跳过错误处理的豁免URL:', requestUrl)
      return Promise.reject(error)
    }
    
    // 处理常见错误
    if (error.response?.status === 401) {
      // 未授权，重定向到错误页面
      window.location.href = '/errorPage?reason=unauthorized'
    } else if (error.response?.status === 403) {
      // 禁止访问
      window.location.href = '/errorPage?reason=forbidden'
    } else if (error.response?.status === 500) {
      // 服务器错误
      window.location.href = '/errorPage?reason=server-error'
    } else if (error.message === 'Invalid session ID' || error.message === 'No session ID') {
      // session验证失败，已经在请求拦截器中处理了跳转
      return Promise.reject(error)
    }
    
    return Promise.reject(error)
  }
)

// 动态添加豁免URL的函数
export const addExemptUrl = (url: string) => {
  if (!EXEMPT_URLS.includes(url)) {
    EXEMPT_URLS.push(url)
    console.log('添加豁免URL:', url)
  }
}

// 检查URL是否为豁免URL的函数
export const isExemptUrl = (url: string) => {
  return EXEMPT_URLS.some(exemptUrl => 
    url.includes(exemptUrl) || 
    url.endsWith(exemptUrl) ||
    url.startsWith(exemptUrl)
  )
}

// 导出配置
export const API_CONFIG = {
  API_BASE_URL,
  isDevelopment,
  EXEMPT_URLS
}

export default apiClient 