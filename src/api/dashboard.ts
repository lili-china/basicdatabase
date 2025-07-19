import apiClient from '@/utils/axios'

// Dashboard API接口
export interface DashboardStats {
  personalCount: number
  vehicleCount: number
  enterpriseCount: number
  custom1Count: number
  custom2Count: number
  custom3Count: number
}

export interface DashboardResponse {
  success: boolean
  data: DashboardStats
  message?: string
}

// Dashboard API服务类
export class DashboardAPI {
  // 获取Dashboard统计数据
  static async getDashboardStats(): Promise<DashboardResponse> {
    try {
      const response = await apiClient.get('/dashboard/stats')
      return response.data
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error)
      throw error
    }
  }

  // 获取系统概览信息
  static async getSystemOverview(): Promise<any> {
    try {
      const response = await apiClient.get('/dashboard/overview')
      return response.data
    } catch (error) {
      console.error('Failed to fetch system overview:', error)
      throw error
    }
  }

  // 获取最近活动
  static async getRecentActivity(): Promise<any> {
    try {
      const response = await apiClient.get('/dashboard/recent-activity')
      return response.data
    } catch (error) {
      console.error('Failed to fetch recent activity:', error)
      throw error
    }
  }

  // 获取性能指标
  static async getPerformanceMetrics(): Promise<any> {
    try {
      const response = await apiClient.get('/dashboard/performance')
      return response.data
    } catch (error) {
      console.error('Failed to fetch performance metrics:', error)
      throw error
    }
  }
}

export default DashboardAPI 