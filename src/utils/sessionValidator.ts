// Session验证工具
export interface SessionValidationResult {
  isValid: boolean
  sessionId?: string
  error?: string
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

// 验证当前页面的session
export function validateCurrentSession(): SessionValidationResult {
  // 如果当前已经在错误页面，不执行跳转
  if (window.location.pathname === '/errorPage') {
    return {
      isValid: false,
      error: 'Already on error page'
    }
  }
  
  const sessionId = getSessionIdFromUrl()
  
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
      error: `Session ID must be a123456789, got: ${sessionId}`
    }
  }

  return {
    isValid: true,
    sessionId
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