// Session验证工具
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

// 从URL参数获取session ID
export function getSessionIdFromUrl(): string | null {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get('sessionid') || urlParams.get('sessionId')
}

// 检查是否需要刷新缓存
export function shouldRefreshCache(urlSessionId: string | null): boolean {
  if (!urlSessionId) return false
  
  const cachedSessionId = localStorage.getItem('sessionId')
  
  // 如果缓存中的sessionId与URL中的不同，需要刷新
  if (cachedSessionId !== urlSessionId) {
    console.log('检测到sessionId变化，需要刷新缓存:', {
      cached: cachedSessionId,
      url: urlSessionId
    })
    return true
  }
  
  return false
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
  if (newSessionId && newSessionId === 'a123456789') {
    localStorage.setItem('sessionId', newSessionId)
    localStorage.setItem('lastLoginTime', new Date().toISOString())
    console.log('缓存刷新完成')
  }
}

// 验证当前页面的session
export function validateCurrentSession(): SessionValidationResult {
  // 如果当前已经在错误页面，不执行跳转
  if (window.location.pathname === '/errorPage') {
    return {
      isValid: false,
      error: 'Already on error page'
    }
  }
  
  const urlSessionId = getSessionIdFromUrl()
  let cacheRefreshed = false
  
  // 检查是否需要刷新缓存
  if (shouldRefreshCache(urlSessionId)) {
    refreshCache(urlSessionId!)
    cacheRefreshed = true
  }
  
  // 优先使用URL中的sessionId，如果没有则使用缓存的
  const sessionId = urlSessionId || localStorage.getItem('sessionId')
  
  if (!sessionId) {
    // 没有sessionid，跳转错误页
    window.location.href = '/errorPage?reason=no-sessionid'
    return {
      isValid: false,
      error: 'No session ID provided'
    }
  }

  // 只允许特定sessionid
  if (sessionId !== 'a123456789') {
    window.location.href = '/errorPage?reason=invalid-sessionid'
    return {
      isValid: false,
      sessionId,
      error: `Session ID must be a123456789, got: ${sessionId}`,
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
  const cachedSessionId = localStorage.getItem('sessionId')
  
  // 如果URL中有sessionId且与缓存不同，刷新缓存
  if (urlSessionId && urlSessionId !== cachedSessionId) {
    refreshCache(urlSessionId)
    return urlSessionId
  }
  
  return urlSessionId || cachedSessionId
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