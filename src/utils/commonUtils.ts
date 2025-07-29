/**
 * 常用工具类函数
 */

/**
 * 首字母大写
 * @param str 输入字符串
 * @returns 首字母大写的字符串
 */
export const capitalize = (str: string): string => {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * 每个单词首字母大写
 * @param str 输入字符串
 * @returns 每个单词首字母大写的字符串
 */
export const capitalizeWords = (str: string): string => {
  if (!str) return str
  return str.split(' ').map(word => capitalize(word)).join(' ')
}

/**
 * 文字过长截取用...代替
 * @param str 输入字符串
 * @param maxLength 最大长度
 * @param suffix 后缀，默认为 '...'
 * @returns 截取后的字符串
 */
export const truncate = (str: string, maxLength: number, suffix: string = '...'): string => {
  if (!str || str.length <= maxLength) return str
  return str.substring(0, maxLength) + suffix
}

/**
 * 格式化日期
 * @param date 日期对象或日期字符串
 * @param format 格式，默认为 'YYYY-MM-DD'
 * @returns 格式化后的日期字符串
 */
export const formatDate = (date: Date | string, format: string = 'YYYY-MM-DD'): string => {
  const d = new Date(date)
  if (isNaN(d.getTime())) return ''
  
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hours = String(d.getHours()).padStart(2, '0')
  const minutes = String(d.getMinutes()).padStart(2, '0')
  const seconds = String(d.getSeconds()).padStart(2, '0')
  
  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

/**
 * 格式化数字（添加千分位分隔符）
 * @param num 数字
 * @param decimals 小数位数，默认为0
 * @returns 格式化后的数字字符串
 */
export const formatNumber = (num: number, decimals: number = 0): string => {
  if (isNaN(num)) return '0'
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  })
}

/**
 * 格式化文件大小
 * @param bytes 字节数
 * @param decimals 小数位数，默认为2
 * @returns 格式化后的文件大小字符串
 */
export const formatFileSize = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

/**
 * 生成随机字符串
 * @param length 字符串长度，默认为8
 * @returns 随机字符串
 */
export const generateRandomString = (length: number = 8): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

/**
 * 生成随机ID
 * @returns 随机ID字符串
 */
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

/**
 * 防抖函数
 * @param func 要防抖的函数
 * @param wait 等待时间（毫秒）
 * @returns 防抖后的函数
 */
export const debounce = <T extends (...args: any[]) => any>(func: T, wait: number): T => {
  let timeout: number
  return ((...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }) as T
}

/**
 * 节流函数
 * @param func 要节流的函数
 * @param limit 限制时间（毫秒）
 * @returns 节流后的函数
 */
export const throttle = <T extends (...args: any[]) => any>(func: T, limit: number): T => {
  let inThrottle: boolean
  return ((...args: any[]) => {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }) as T
}

/**
 * 深拷贝对象
 * @param obj 要拷贝的对象
 * @returns 深拷贝后的对象
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime()) as any
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as any
  if (typeof obj === 'object') {
    const clonedObj = {} as any
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key])
      }
    }
    return clonedObj
  }
  return obj
}

/**
 * 检查对象是否为空
 * @param obj 要检查的对象
 * @returns 是否为空
 */
export const isEmpty = (obj: any): boolean => {
  if (obj === null || obj === undefined) return true
  if (typeof obj === 'string') return obj.trim().length === 0
  if (Array.isArray(obj)) return obj.length === 0
  if (typeof obj === 'object') return Object.keys(obj).length === 0
  return false
}

/**
 * 获取对象指定路径的值
 * @param obj 对象
 * @param path 路径，如 'user.name'
 * @param defaultValue 默认值
 * @returns 路径对应的值
 */
export const get = (obj: any, path: string, defaultValue?: any): any => {
  const keys = path.split('.')
  let result = obj
  
  for (const key of keys) {
    if (result === null || result === undefined) return defaultValue
    result = result[key]
  }
  
  return result !== undefined ? result : defaultValue
}

/**
 * 设置对象指定路径的值
 * @param obj 对象
 * @param path 路径，如 'user.name'
 * @param value 要设置的值
 * @returns 设置后的对象
 */
export const set = (obj: any, path: string, value: any): any => {
  const keys = path.split('.')
  const lastKey = keys.pop()!
  let current = obj
  
  for (const key of keys) {
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {}
    }
    current = current[key]
  }
  
  current[lastKey] = value
  return obj
}

/**
 * 数组去重
 * @param arr 数组
 * @param key 对象数组的去重键，可选
 * @returns 去重后的数组
 */
export const unique = <T>(arr: T[], key?: string): T[] => {
  if (!Array.isArray(arr)) return []
  
  if (key) {
    const seen = new Set()
    return arr.filter(item => {
      const value = get(item, key)
      if (seen.has(value)) return false
      seen.add(value)
      return true
    })
  }
  
  return [...new Set(arr)]
}

/**
 * 数组分组
 * @param arr 数组
 * @param key 分组键
 * @returns 分组后的对象
 */
export const groupBy = <T>(arr: T[], key: string): Record<string, T[]> => {
  return arr.reduce((groups, item) => {
    const groupKey = get(item, key)
    if (!groups[groupKey]) {
      groups[groupKey] = []
    }
    groups[groupKey].push(item)
    return groups
  }, {} as Record<string, T[]>)
}

/**
 * 延迟执行
 * @param ms 延迟时间（毫秒）
 * @returns Promise
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 复制文本到剪贴板
 * @param text 要复制的文本
 * @returns 是否复制成功
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // 降级方案
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      return true
    }
  } catch (error) {
    console.error('复制失败:', error)
    return false
  }
}

/**
 * 下载文件
 * @param url 文件URL
 * @param filename 文件名
 */
export const downloadFile = (url: string, filename?: string): void => {
  const link = document.createElement('a')
  link.href = url
  link.download = filename || ''
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * 验证邮箱格式
 * @param email 邮箱地址
 * @returns 是否有效
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * 验证手机号格式
 * @param phone 手机号
 * @returns 是否有效
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^1[3-9]\d{9}$/
  return phoneRegex.test(phone)
}

/**
 * 验证身份证号格式
 * @param idCard 身份证号
 * @returns 是否有效
 */
export const isValidIdCard = (idCard: string): boolean => {
  const idCardRegex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return idCardRegex.test(idCard)
}

/**
 * 获取URL参数
 * @param name 参数名
 * @returns 参数值
 */
export const getUrlParam = (name: string): string | null => {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(name)
}

/**
 * 设置URL参数
 * @param name 参数名
 * @param value 参数值
 */
export const setUrlParam = (name: string, value: string): void => {
  const url = new URL(window.location.href)
  url.searchParams.set(name, value)
  window.history.replaceState({}, '', url.toString())
}

/**
 * 移除URL参数
 * @param name 参数名
 */
export const removeUrlParam = (name: string): void => {
  const url = new URL(window.location.href)
  url.searchParams.delete(name)
  window.history.replaceState({}, '', url.toString())
}

/**
 * 导航到用户详情页面（新标签页打开）
 * @param userId 用户ID
 * @param from 来源页面标识
 */
export const navigateToUserDetail = (
  userId: string, 
  from: string = 'unknown'
): void => {
  const baseUrl = window.location.origin
  const sessionId = sessionStorage.getItem('sessionId') || ''
  const url = `${baseUrl}/user-profile/${userId}?sessionId=${encodeURIComponent(sessionId)}&from=${encodeURIComponent(from)}`
  
  // 在当前浏览器中打开新标签页
  const link = document.createElement('a')
  link.href = url
  link.target = '_blank'
  link.rel = 'noopener noreferrer'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * 导航到用户详情页面（使用window.open打开）
 * @param userId 用户ID
 * @param from 来源页面标识
 * @param windowFeatures 窗口特性，默认为 'width=1200,height=800,scrollbars=yes,resizable=yes'
 */
export const navigateToUserDetailWithWindow = (
  userId: string, 
  from: string = 'unknown',
  windowFeatures: string = 'width=1200,height=800,scrollbars=yes,resizable=yes'
): void => {
  const baseUrl = window.location.origin
  const sessionId = sessionStorage.getItem('sessionId') || ''
  const url = `${baseUrl}/user-profile/${userId}?sessionId=${encodeURIComponent(sessionId)}&from=${encodeURIComponent(from)}`
  
  // 使用window.open打开新窗口
  const windowName = `userDetail_${userId}_${Date.now()}`
  window.open(url, windowName, windowFeatures)
} 