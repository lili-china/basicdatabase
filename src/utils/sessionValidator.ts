// Session验证工具
import { getApiConfig, getApiUrl, isApiEnabled, getAuthEndpoints } from './apiConfig'

export interface SessionValidationResult {
  isValid: boolean
  sessionId?: string
  error?: string
  cacheRefreshed?: boolean
}

// 验证session ID格式
export function validateSessionId(sessionId: string): boolean {
  // 基本格式验证：至少8位，包含字母和数字
  const sessionRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$/
  return sessionRegex.test(sessionId)
}

// 验证session ID是否为有效的测试sessionId
export function isValidTestSessionId(sessionId: string): boolean {
  // 当前只允许特定的测试sessionId
  const validTestSessionIds = ['a123456789']
  return validTestSessionIds.includes(sessionId)
}

// 综合验证sessionId（支持多种验证模式）
export function validateSessionIdComprehensive(sessionId: string): {
  isValid: boolean
  error?: string
  validationType: 'format' | 'test' | 'api'
} {
  // 1. 格式验证
  if (!validateSessionId(sessionId)) {
    return {
      isValid: false,
      error: 'Session ID format is invalid',
      validationType: 'format'
    }
  }
  
  // 2. 测试sessionId验证
  if (!isValidTestSessionId(sessionId)) {
    return {
      isValid: false,
      error: 'Session ID is not in the allowed test list',
      validationType: 'test'
    }
  }
  
  return {
    isValid: true,
    validationType: 'test'
  }
}

// 从URL参数获取session ID
export function getSessionIdFromUrl(): string | null {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get('sessionid') || urlParams.get('sessionId')
}

// 刷新缓存
export function refreshCache(newSessionId: string): void {
  console.log('刷新sessionId缓存:', newSessionId)
  
  // 清除旧的缓存数据
  localStorage.removeItem('sessionId')
  localStorage.removeItem('authToken')
  localStorage.removeItem('userData')
  localStorage.removeItem('lastLoginTime')
  
  // 设置新的sessionId
  localStorage.setItem('sessionId', newSessionId)
  localStorage.setItem('lastLoginTime', new Date().toISOString())
  console.log('缓存刷新完成，新的sessionId:', newSessionId)
}

// 预留：调用内网API验证session
export async function validateSessionWithApi(sessionId: string): Promise<boolean> {
  if (!isApiEnabled()) {
    console.log('API验证未启用，使用本地验证')
    return false
  }

  try {
    console.log('调用内网API验证session:', sessionId)
    
    const apiConfig = getApiConfig()
    const authEndpoints = getAuthEndpoints()
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), apiConfig.timeout)
    
    const response = await fetch(getApiUrl(authEndpoints.validateSession), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Session-ID': sessionId
      },
      body: JSON.stringify({ sessionId }),
      signal: controller.signal
    })
    
    clearTimeout(timeoutId)
    
    if (!response.ok) {
      console.error('API验证失败，状态码:', response.status)
      return false
    }
    
    const result = await response.json()
    console.log('API验证结果:', result)
    
    return result.isValid === true
  } catch (error) {
    console.error('API验证异常:', error)
    return false
  }
}

// 预留：获取用户信息
export async function getUserInfoFromApi(sessionId: string): Promise<any> {
  if (!isApiEnabled()) {
    console.log('API获取用户信息未启用')
    return null
  }

  try {
    const authEndpoints = getAuthEndpoints()
    const response = await fetch(getApiUrl(authEndpoints.getUserInfo), {
      method: 'GET',
      headers: {
        'X-Session-ID': sessionId
      }
    })
    
    if (!response.ok) {
      return null
    }
    
    return await response.json()
  } catch (error) {
    console.error('获取用户信息异常:', error)
    return null
  }
}

// 预留：刷新session
export async function refreshSessionWithApi(sessionId: string): Promise<string | null> {
  if (!isApiEnabled()) {
    console.log('API刷新session未启用')
    return null
  }

  try {
    const authEndpoints = getAuthEndpoints()
    const response = await fetch(getApiUrl(authEndpoints.refreshSession), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Session-ID': sessionId
      },
      body: JSON.stringify({ sessionId })
    })
    
    if (!response.ok) {
      return null
    }
    
    const result = await response.json()
    return result.newSessionId || null
  } catch (error) {
    console.error('刷新session异常:', error)
    return null
  }
}

// 验证当前页面的session
export async function validateCurrentSession(): Promise<SessionValidationResult> {
  // 如果当前已经在错误页面，不执行跳转
  if (window.location.pathname === '/errorPage') {
    return {
      isValid: false,
      error: 'Already on error page'
    }
  }
  
  const urlSessionId = getSessionIdFromUrl()
  const cachedSessionId = localStorage.getItem('sessionId')
  let cacheRefreshed = false
  let sessionId: string | null = null
  
  // 简化逻辑：URL有sessionId就刷新缓存，没有就用缓存
  if (urlSessionId) {
    // URL中有sessionId，刷新缓存
    refreshCache(urlSessionId)
    sessionId = urlSessionId
    cacheRefreshed = true
  } else {
    // URL中没有sessionId，使用缓存
    sessionId = cachedSessionId
  }
  
  if (!sessionId) {
    // 没有sessionid，跳转错误页
    window.location.href = '/errorPage?reason=no-sessionid'
    return {
      isValid: false,
      error: 'No session ID provided'
    }
  }

  // 检查session是否过期
  if (isSessionExpired()) {
    console.log('Session已过期，尝试刷新...')
    
    // 尝试通过API刷新session
    const newSessionId = await refreshSessionWithApi(sessionId)
    if (newSessionId) {
      refreshCache(newSessionId)
      sessionId = newSessionId
      cacheRefreshed = true
    } else {
      // 刷新失败，跳转错误页
      window.location.href = '/errorPage?reason=session-expired'
      return {
        isValid: false,
        error: 'Session expired and refresh failed'
      }
    }
  }

  // 如果API验证启用，优先使用API验证
  if (isApiEnabled()) {
    console.log('使用API验证session...')
    const apiValid = await validateSessionWithApi(sessionId)
    
    if (apiValid) {
      return {
        isValid: true,
        sessionId,
        cacheRefreshed
      }
    } else {
      console.log('API验证失败，回退到本地验证')
    }
  }

  // 本地验证（备用方案）
  console.log('使用本地验证session...')
  
  // 使用新的验证函数检查测试sessionId
  if (!isValidTestSessionId(sessionId)) {
    window.location.href = '/errorPage?reason=invalid-sessionid'
    return {
      isValid: false,
      sessionId,
      error: `Invalid test session ID: ${sessionId}`,
      cacheRefreshed
    }
  }

  return {
    isValid: true,
    sessionId,
    cacheRefreshed
  }
}

// 模拟session验证（实际项目中应该调用API）
export async function validateSessionWithServer(sessionId: string): Promise<boolean> {
  try {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // 模拟验证逻辑
    // 实际项目中这里应该调用后端API
    const isValid = sessionId.length >= 8 && /[a-zA-Z]/.test(sessionId) && /[0-9]/.test(sessionId)
    
    return isValid
  } catch (error) {
    console.error('Session validation error:', error)
    return false
  }
}

// 获取当前sessionId（优先从URL获取）
export function getCurrentSessionId(): string | null {
  const urlSessionId = getSessionIdFromUrl()
  
  if (urlSessionId) {
    // URL中有sessionId，刷新缓存并返回
    refreshCache(urlSessionId)
    return urlSessionId
  }
  
  // URL中没有sessionId，返回缓存中的
  return localStorage.getItem('sessionId')
}

// 清除所有session相关缓存
export function clearSessionCache(): void {
  console.log('清除所有session缓存')
  localStorage.removeItem('sessionId')
  localStorage.removeItem('authToken')
  localStorage.removeItem('userData')
  localStorage.removeItem('lastLoginTime')
  localStorage.removeItem('sessionCache')
}

// 调试函数：检查当前session状态
export function debugSessionStatus(): {
  urlSessionId: string | null
  cachedSessionId: string | null
  currentSessionId: string | null
  isValid: boolean
  validationResult?: any
} {
  const urlSessionId = getSessionIdFromUrl()
  const cachedSessionId = localStorage.getItem('sessionId')
  const currentSessionId = getCurrentSessionId()
  
  let isValid = false
  let validationResult = null
  
  if (currentSessionId) {
    validationResult = validateSessionIdComprehensive(currentSessionId)
    isValid = validationResult.isValid
  }
  
  return {
    urlSessionId,
    cachedSessionId,
    currentSessionId,
    isValid,
    validationResult
  }
}

// 检查session是否过期
export function isSessionExpired(): boolean {
  const lastLoginTime = localStorage.getItem('lastLoginTime')
  if (!lastLoginTime) return true
  
  const loginTime = new Date(lastLoginTime)
  const currentTime = new Date()
  const hoursDiff = (currentTime.getTime() - loginTime.getTime()) / (1000 * 60 * 60)
  
  // 24小时后过期
  return hoursDiff > 24
} 