import apiClient from '@/utils/axios'

// ISP Database API接口
export interface ISPUser {
  id: number
  name: string
  location: string
  serviceType: string
  status: string
  maxSpeed: string
  coverage: string
  logo: string
  region: string
  description: string
  identityNo: string
  phoneNum: string
  realName: string
  nationality: string
  birthDate: string
  address: string
  registrationDate: string
  expiryDate: string
  photo: string
  avatars: string[]
}

export interface ISPSearchParams {
  operator?: string
  identityNo?: string
  phoneNum?: string
  realName?: string
  status?: string
  page?: number
  pageSize?: number
}

export interface ISPResponse {
  success: boolean
  data: {
    isps: ISPUser[]
    total: number
    page: number
    pageSize: number
  }
  message?: string
}

// ISP Database API服务类
export class ISPAPI {
  // 获取ISP列表
  static async getISPs(params: ISPSearchParams = {}): Promise<ISPResponse> {
    try {
      const response = await apiClient.get('/isp/isps', { params })
      return response.data
    } catch (error) {
      console.error('Failed to fetch ISPs:', error)
      throw error
    }
  }

  // 获取ISP详情
  static async getISPDetail(ispId: number): Promise<any> {
    try {
      const response = await apiClient.get(`/isp/isps/${ispId}`)
      return response.data
    } catch (error) {
      console.error('Failed to fetch ISP detail:', error)
      throw error
    }
  }

  // 搜索ISP
  static async searchISPs(query: string): Promise<ISPResponse> {
    try {
      const response = await apiClient.get('/isp/isps/search', {
        params: { query }
      })
      return response.data
    } catch (error) {
      console.error('Failed to search ISPs:', error)
      throw error
    }
  }

  // 获取ISP统计信息
  static async getISPStats(): Promise<any> {
    try {
      const response = await apiClient.get('/isp/stats')
      return response.data
    } catch (error) {
      console.error('Failed to fetch ISP stats:', error)
      throw error
    }
  }

  // 获取ISP变更记录
  static async getISPChangeRecords(ispId: number): Promise<any> {
    try {
      const response = await apiClient.get(`/isp/isps/${ispId}/changes`)
      return response.data
    } catch (error) {
      console.error('Failed to fetch ISP change records:', error)
      throw error
    }
  }

  // 获取运营商列表
  static async getOperators(): Promise<any> {
    try {
      const response = await apiClient.get('/isp/operators')
      return response.data
    } catch (error) {
      console.error('Failed to fetch operators:', error)
      throw error
    }
  }

  // 获取状态列表
  static async getStatuses(): Promise<any> {
    try {
      const response = await apiClient.get('/isp/statuses')
      return response.data
    } catch (error) {
      console.error('Failed to fetch statuses:', error)
      throw error
    }
  }

  // 验证身份证号
  static async validateIdentityNo(identityNo: string): Promise<any> {
    try {
      const response = await apiClient.post('/isp/validate-identity', {
        identityNo
      })
      return response.data
    } catch (error) {
      console.error('Failed to validate identity number:', error)
      throw error
    }
  }

  // 验证电话号码
  static async validatePhoneNum(phoneNum: string): Promise<any> {
    try {
      const response = await apiClient.post('/isp/validate-phone', {
        phoneNum
      })
      return response.data
    } catch (error) {
      console.error('Failed to validate phone number:', error)
      throw error
    }
  }
}

export default ISPAPI 