// API服务统一导出
export { default as DashboardAPI } from './dashboard'
export { default as PersonalAPI } from './personal'
export { default as VehicleAPI } from './vehicle'
export { default as ISPAPI } from './isp'

// 类型导出
export type {
  DashboardStats,
  DashboardResponse
} from './dashboard'

export type {
  PersonalUser,
  PersonalSearchParams,
  PersonalResponse
} from './personal'

export type {
  Vehicle,
  VehicleSearchParams,
  VehicleResponse
} from './vehicle'

export type {
  ISPUser,
  ISPSearchParams,
  ISPResponse
} from './isp'

// 默认导出所有API服务
export default {
  DashboardAPI,
  PersonalAPI,
  VehicleAPI,
  ISPAPI
} 