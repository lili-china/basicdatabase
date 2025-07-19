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
  const sessionId = getSessionIdFromUrl()
  
  if (!sessionId) {
    return {
      isValid: false,
      error: 'No session ID provided'
    }
  }
  
  if (!validateSessionId(sessionId)) {
    return {
      isValid: false,
      sessionId,
      error: `Invalid session ID format: ${sessionId} (must be at least 8 characters with both letters and numbers)`
    }
  }
  
  // 这里可以添加更多的验证逻辑
  // 比如检查session是否过期、是否有效等
  
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