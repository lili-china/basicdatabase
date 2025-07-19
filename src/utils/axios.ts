import axios from 'axios'

// 环境配置
const isDevelopment = import.meta.env.DEV

// URL配置
const LOCAL_BASE_URL = 'http://localhost:3000/api'
const GLOBAL_BASE_URL = 'https://api.example.com/api'

// 根据环境选择基础URL
const BASE_URL = isDevelopment ? LOCAL_BASE_URL : GLOBAL_BASE_URL

// 创建axios实例
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    // 添加认证token（如果有）
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // 添加session ID到请求头
    const sessionId = new URLSearchParams(window.location.search).get('sessionId')
    if (sessionId) {
      config.headers['X-Session-ID'] = sessionId
    }
    
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
    
    // 处理常见错误
    if (error.response?.status === 401) {
      // 未授权，重定向到登录页
      window.location.href = '/login'
    } else if (error.response?.status === 403) {
      // 禁止访问
      console.error('Access forbidden')
    } else if (error.response?.status === 500) {
      // 服务器错误
      console.error('Server error')
    }
    
    return Promise.reject(error)
  }
)

// 导出配置
export const API_CONFIG = {
  LOCAL_BASE_URL,
  GLOBAL_BASE_URL,
  BASE_URL,
  isDevelopment
}

export default apiClient 