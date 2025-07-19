import apiClient from '@/utils/axios'

// Personal Database API接口
export interface PersonalUser {
  id: string
  name: string
  position: string
  email: string
  phone: string
  gender: string
  age: number
  nationality: string
  avatar: string
  department?: string
  hireDate?: string
  status?: string
  emergencyContact?: string
  bloodType?: string
  maritalStatus?: string
  education?: string
  skills?: string[]
}

export interface PersonalSearchParams {
  searchQuery?: string
  nationality?: string
  position?: string
  gender?: string
  ageRange?: string
  page?: number
  pageSize?: number
}

export interface PersonalResponse {
  success: boolean
  data: {
    users: PersonalUser[]
    total: number
    page: number
    pageSize: number
  }
  message?: string
}

// Personal Database API服务类
export class PersonalAPI {
  // 获取用户列表
  static async getUsers(params: PersonalSearchParams = {}): Promise<PersonalResponse> {
    try {
      const response = await apiClient.get('/personal/users', { params })
      return response.data
    } catch (error) {
      console.error('Failed to fetch personal users:', error)
      throw error
    }
  }

  // 获取用户详情
  static async getUserDetail(userId: string): Promise<any> {
    try {
      const response = await apiClient.get(`/personal/users/${userId}`)
      return response.data
    } catch (error) {
      console.error('Failed to fetch user detail:', error)
      throw error
    }
  }

  // 搜索用户
  static async searchUsers(query: string): Promise<PersonalResponse> {
    try {
      const response = await apiClient.get('/personal/users/search', {
        params: { query }
      })
      return response.data
    } catch (error) {
      console.error('Failed to search users:', error)
      throw error
    }
  }

  // 获取用户统计信息
  static async getUserStats(): Promise<any> {
    try {
      const response = await apiClient.get('/personal/stats')
      return response.data
    } catch (error) {
      console.error('Failed to fetch user stats:', error)
      throw error
    }
  }

  // 获取用户变更记录
  static async getUserChangeRecords(userId: string): Promise<any> {
    try {
      const response = await apiClient.get(`/personal/users/${userId}/changes`)
      return response.data
    } catch (error) {
      console.error('Failed to fetch user change records:', error)
      throw error
    }
  }
}

export default PersonalAPI 