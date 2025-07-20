/**
 * API 调用示例
 * 包含同步和异步调用方式
 */
import apiClient from '@/utils/axios'
import { getApiBaseUrl } from '@/utils/envLoader'
import { ref } from 'vue'

// ==================== 用户相关 API ====================

/**
 * 获取用户列表 - 异步调用
 */
export const getUserList = async (params: {
  page?: number
  pageSize?: number
  search?: string
  role?: string
}) => {
  try {
    const response = await apiClient.get('/users', { params })
    return {
      success: true,
      data: response.data,
      message: '获取用户列表成功'
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      message: '获取用户列表失败',
      error
    }
  }
}

/**
 * 获取用户详情 - 异步调用
 */
export const getUserDetail = async (userId: string) => {
  try {
    const response = await apiClient.get(`/users/${userId}`)
    return {
      success: true,
      data: response.data,
      message: '获取用户详情成功'
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      message: '获取用户详情失败',
      error
    }
  }
}

/**
 * 创建用户 - 异步调用
 */
export const createUser = async (userData: {
  name: string
  email: string
  role: string
  phone?: string
}) => {
  try {
    const response = await apiClient.post('/users', userData)
    return {
      success: true,
      data: response.data,
      message: '创建用户成功'
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      message: '创建用户失败',
      error
    }
  }
}

/**
 * 更新用户 - 异步调用
 */
export const updateUser = async (userId: string, userData: Partial<{
  name: string
  email: string
  role: string
  phone: string
}>) => {
  try {
    const response = await apiClient.put(`/users/${userId}`, userData)
    return {
      success: true,
      data: response.data,
      message: '更新用户成功'
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      message: '更新用户失败',
      error
    }
  }
}

/**
 * 删除用户 - 异步调用
 */
export const deleteUser = async (userId: string) => {
  try {
    await apiClient.delete(`/users/${userId}`)
    return {
      success: true,
      data: null,
      message: '删除用户成功'
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      message: '删除用户失败',
      error
    }
  }
}

// ==================== ISP 相关 API ====================

/**
 * 获取ISP列表 - 同步调用（Promise方式）
 */
export const getIspList = (params?: {
  page?: number
  pageSize?: number
  status?: string
}) => {
  return apiClient.get('/isp', { params })
    .then(response => ({
      success: true,
      data: response.data,
      message: '获取ISP列表成功'
    }))
    .catch(error => ({
      success: false,
      data: null,
      message: '获取ISP列表失败',
      error
    }))
}

/**
 * 获取ISP详情 - 同步调用（Promise方式）
 */
export const getIspDetail = (ispId: string) => {
  return apiClient.get(`/isp/${ispId}`)
    .then(response => ({
      success: true,
      data: response.data,
      message: '获取ISP详情成功'
    }))
    .catch(error => ({
      success: false,
      data: null,
      message: '获取ISP详情失败',
      error
    }))
}

// ==================== 车辆相关 API ====================

/**
 * 获取车辆列表 - 异步调用（带加载状态）
 */
export const getVehicleList = async (params: {
  page?: number
  pageSize?: number
  type?: string
  status?: string
}) => {
  // 模拟加载状态
  const loading = ref(true)
  
  try {
    const response = await apiClient.get('/vehicles', { params })
    loading.value = false
    return {
      success: true,
      data: response.data,
      message: '获取车辆列表成功',
      loading: loading.value
    }
  } catch (error) {
    loading.value = false
    return {
      success: false,
      data: null,
      message: '获取车辆列表失败',
      error,
      loading: loading.value
    }
  }
}

/**
 * 上传车辆图片 - 异步调用（文件上传）
 */
export const uploadVehicleImage = async (file: File, vehicleId: string) => {
  const formData = new FormData()
  formData.append('image', file)
  formData.append('vehicleId', vehicleId)
  
  try {
    const response = await apiClient.post('/vehicles/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return {
      success: true,
      data: response.data,
      message: '上传图片成功'
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      message: '上传图片失败',
      error
    }
  }
}

// ==================== 数据分析 API ====================

/**
 * 获取统计数据 - 异步调用（多个API并行）
 */
export const getDashboardStats = async () => {
  try {
    // 并行调用多个API
    const [userStats, ispStats, vehicleStats] = await Promise.all([
      apiClient.get('/stats/users'),
      apiClient.get('/stats/isp'),
      apiClient.get('/stats/vehicles')
    ])
    
    return {
      success: true,
      data: {
        users: userStats.data,
        isp: ispStats.data,
        vehicles: vehicleStats.data
      },
      message: '获取统计数据成功'
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      message: '获取统计数据失败',
      error
    }
  }
}

/**
 * 获取图表数据 - 异步调用（带缓存）
 */
export const getChartData = async (type: 'users' | 'isp' | 'vehicles', period: string) => {
  const cacheKey = `chart_${type}_${period}`
  const cached = sessionStorage.getItem(cacheKey)
  
  if (cached) {
    return {
      success: true,
      data: JSON.parse(cached),
      message: '获取图表数据成功（缓存）',
      fromCache: true
    }
  }
  
  try {
    const response = await apiClient.get(`/charts/${type}`, {
      params: { period }
    })
    
    // 缓存数据
    sessionStorage.setItem(cacheKey, JSON.stringify(response.data))
    
    return {
      success: true,
      data: response.data,
      message: '获取图表数据成功',
      fromCache: false
    }
  } catch (error) {
    return {
      success: false,
      data: null,
      message: '获取图表数据失败',
      error
    }
  }
}

// ==================== 批量操作 API ====================

/**
 * 批量删除用户 - 异步调用（带进度）
 */
export const batchDeleteUsers = async (userIds: string[], onProgress?: (progress: number) => void) => {
  const total = userIds.length
  let completed = 0
  
  const results = []
  
  for (const userId of userIds) {
    try {
      const result = await deleteUser(userId)
      results.push(result)
      completed++
      
      if (onProgress) {
        onProgress((completed / total) * 100)
      }
    } catch (error) {
      results.push({
        success: false,
        userId,
        error
      })
      completed++
      
      if (onProgress) {
        onProgress((completed / total) * 100)
      }
    }
  }
  
  return {
    success: results.some(r => r.success),
    data: results,
    message: `批量删除完成，成功: ${results.filter(r => r.success).length}/${total}`
  }
}

// ==================== 实时数据 API ====================

/**
 * 获取实时通知 - 轮询方式
 */
export const startNotificationPolling = (callback: (data: any) => void, interval = 5000) => {
  const poll = async () => {
    try {
      const response = await apiClient.get('/notifications/realtime')
      if (response.data.length > 0) {
        callback(response.data)
      }
    } catch (error) {
      console.error('获取实时通知失败:', error)
    }
  }
  
  // 立即执行一次
  poll()
  
  // 设置轮询
  const timer = setInterval(poll, interval)
  
  // 返回停止函数
  return () => {
    clearInterval(timer)
  }
}

/**
 * 获取实时数据 - WebSocket方式（模拟）
 */
export const connectWebSocket = (url: string, onMessage: (data: any) => void) => {
  // 模拟WebSocket连接
  const ws = new WebSocket(url)
  
  ws.onopen = () => {
    console.log('WebSocket连接已建立')
  }
  
  ws.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data)
      onMessage(data)
    } catch (error) {
      console.error('解析WebSocket消息失败:', error)
    }
  }
  
  ws.onerror = (error) => {
    console.error('WebSocket错误:', error)
  }
  
  ws.onclose = () => {
    console.log('WebSocket连接已关闭')
  }
  
  return ws
}

// ==================== 错误处理 API ====================

/**
 * 带重试的API调用
 */
export const apiCallWithRetry = async <T>(
  apiCall: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> => {
  let lastError: any
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await apiCall()
    } catch (error) {
      lastError = error
      console.warn(`API调用失败，第${i + 1}次重试:`, error)
      
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * (i + 1)))
      }
    }
  }
  
  throw lastError
}

/**
 * 带超时的API调用
 */
export const apiCallWithTimeout = async <T>(
  apiCall: () => Promise<T>,
  timeout = 10000
): Promise<T> => {
  const timeoutPromise = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error('请求超时')), timeout)
  })
  
  return Promise.race([apiCall(), timeoutPromise])
}

// ==================== 使用示例 ====================

/**
 * Vue组件中的使用示例
 */
export const apiUsageExamples = {
  // 异步调用示例
  asyncExample: async () => {
    const result = await getUserList({ page: 1, pageSize: 10 })
    if (result.success) {
      console.log('用户列表:', result.data)
    } else {
      console.error('获取失败:', result.message)
    }
  },
  
  // 同步调用示例
  syncExample: () => {
    getIspList({ page: 1, pageSize: 10 })
      .then(result => {
        if (result.success) {
          console.log('ISP列表:', result.data)
        } else {
          console.error('获取失败:', result.message)
        }
      })
      .catch(error => {
        console.error('调用失败:', error)
      })
  },
  
  // 带重试的调用示例
  retryExample: async () => {
    try {
      const result = await apiCallWithRetry(
        () => getUserDetail('123'),
        3,
        1000
      )
      console.log('用户详情:', result)
    } catch (error) {
      console.error('重试后仍然失败:', error)
    }
  },
  
  // 带超时的调用示例
  timeoutExample: async () => {
    try {
      const result = await apiCallWithTimeout(
        () => getDashboardStats(),
        5000
      )
      console.log('统计数据:', result)
    } catch (error) {
      console.error('请求超时:', error)
    }
  },
  
  // 批量操作示例
  batchExample: async () => {
    const userIds = ['1', '2', '3']
    const result = await batchDeleteUsers(userIds, (progress) => {
      console.log(`删除进度: ${progress}%`)
    })
    console.log('批量删除结果:', result)
  },
  
  // 实时数据示例
  realtimeExample: () => {
    const stopPolling = startNotificationPolling((notifications) => {
      console.log('新通知:', notifications)
    }, 3000)
    
    // 5秒后停止轮询
    setTimeout(stopPolling, 5000)
  }
}

// 导出所有API函数
export default {
  // 用户相关
  getUserList,
  getUserDetail,
  createUser,
  updateUser,
  deleteUser,
  
  // ISP相关
  getIspList,
  getIspDetail,
  
  // 车辆相关
  getVehicleList,
  uploadVehicleImage,
  
  // 数据分析
  getDashboardStats,
  getChartData,
  
  // 批量操作
  batchDeleteUsers,
  
  // 实时数据
  startNotificationPolling,
  connectWebSocket,
  
  // 错误处理
  apiCallWithRetry,
  apiCallWithTimeout,
  
  // 使用示例
  apiUsageExamples
} 