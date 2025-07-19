import apiClient from '@/utils/axios'

// Vehicle Database API接口
export interface Vehicle {
  id: string
  type: string
  licensePlate: string
  brand: string
  model: string
  year: number
  color: string
  status: string
  owner: string
  image: string
  engineType?: string
  engineSize?: string
  fuelType?: string
  transmission?: string
  mileage?: number
  maxSpeed?: number
  fuelCapacity?: number
  seatingCapacity?: number
}

export interface VehicleSearchParams {
  searchQuery?: string
  type?: string
  status?: string
  brand?: string
  year?: number
  page?: number
  pageSize?: number
}

export interface VehicleResponse {
  success: boolean
  data: {
    vehicles: Vehicle[]
    total: number
    page: number
    pageSize: number
  }
  message?: string
}

// Vehicle Database API服务类
export class VehicleAPI {
  // 获取车辆列表
  static async getVehicles(params: VehicleSearchParams = {}): Promise<VehicleResponse> {
    try {
      const response = await apiClient.get('/vehicle/vehicles', { params })
      return response.data
    } catch (error) {
      console.error('Failed to fetch vehicles:', error)
      throw error
    }
  }

  // 获取车辆详情
  static async getVehicleDetail(vehicleId: string): Promise<any> {
    try {
      const response = await apiClient.get(`/vehicle/vehicles/${vehicleId}`)
      return response.data
    } catch (error) {
      console.error('Failed to fetch vehicle detail:', error)
      throw error
    }
  }

  // 搜索车辆
  static async searchVehicles(query: string): Promise<VehicleResponse> {
    try {
      const response = await apiClient.get('/vehicle/vehicles/search', {
        params: { query }
      })
      return response.data
    } catch (error) {
      console.error('Failed to search vehicles:', error)
      throw error
    }
  }

  // 获取车辆统计信息
  static async getVehicleStats(): Promise<any> {
    try {
      const response = await apiClient.get('/vehicle/stats')
      return response.data
    } catch (error) {
      console.error('Failed to fetch vehicle stats:', error)
      throw error
    }
  }

  // 获取车辆变更记录
  static async getVehicleChangeRecords(vehicleId: string): Promise<any> {
    try {
      const response = await apiClient.get(`/vehicle/vehicles/${vehicleId}/changes`)
      return response.data
    } catch (error) {
      console.error('Failed to fetch vehicle change records:', error)
      throw error
    }
  }

  // 获取车辆维护记录
  static async getVehicleMaintenanceRecords(vehicleId: string): Promise<any> {
    try {
      const response = await apiClient.get(`/vehicle/vehicles/${vehicleId}/maintenance`)
      return response.data
    } catch (error) {
      console.error('Failed to fetch vehicle maintenance records:', error)
      throw error
    }
  }

  // 获取车辆使用记录
  static async getVehicleUsageRecords(vehicleId: string): Promise<any> {
    try {
      const response = await apiClient.get(`/vehicle/vehicles/${vehicleId}/usage`)
      return response.data
    } catch (error) {
      console.error('Failed to fetch vehicle usage records:', error)
      throw error
    }
  }
}

export default VehicleAPI 