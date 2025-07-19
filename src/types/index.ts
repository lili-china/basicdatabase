// 用户数据类型定义
export interface User {
  id: string
  name: string
  position: string
  email: string
  avatar: string
  nationality: string
  gender: string
  age: number
  phone: string
  isUsed?: boolean
}

// 波浪背景配置类型
export interface WaveConfig {
  color: string
  height: number
  speed: number
  amplitude: number
  frequency: number
}

// 背景配置类型
export interface BackgroundConfig {
  gradient: string
} 