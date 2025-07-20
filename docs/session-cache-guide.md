# Session ID 缓存刷新功能说明

## 功能概述

当浏览器再次传递 sessionId 时，系统会自动检测并刷新缓存，确保使用最新的 sessionId。

## 核心功能

### 1. 缓存检测
- 自动检测 URL 中的 sessionId 与缓存中的 sessionId 是否一致
- 如果不一致，自动触发缓存刷新

### 2. 缓存刷新
- 清除旧的缓存数据（sessionId、authToken、userData 等）
- 设置新的 sessionId 和登录时间
- 更新相关状态

### 3. 智能验证
- 优先使用 URL 中的 sessionId
- 如果 URL 中没有，则使用缓存中的 sessionId
- 验证 sessionId 的有效性

## 新增函数

### `shouldRefreshCache(urlSessionId: string | null): boolean`
检查是否需要刷新缓存
```typescript
// 示例
const urlSessionId = getSessionIdFromUrl()
if (shouldRefreshCache(urlSessionId)) {
  console.log('需要刷新缓存')
}
```

### `refreshCache(newSessionId: string): void`
刷新缓存
```typescript
// 示例
refreshCache('a123456789')
```

### `getCurrentSessionId(): string | null`
获取当前 sessionId（优先从 URL 获取）
```typescript
// 示例
const sessionId = getCurrentSessionId()
```

### `clearSessionCache(): void`
清除所有 session 相关缓存
```typescript
// 示例
clearSessionCache()
```

### `isSessionExpired(): boolean`
检查 session 是否过期（24小时）
```typescript
// 示例
if (isSessionExpired()) {
  console.log('Session 已过期')
}
```

## 使用场景

### 1. 用户重新登录
```
用户访问: http://localhost:3001/dashboard?sessionId=a123456789
系统检测: URL sessionId 与缓存不同
自动刷新: 清除旧缓存，设置新 sessionId
```

### 2. 切换用户
```
用户A: 使用 sessionId=a123456789
用户B: 访问 URL 携带 sessionId=b987654321
系统检测: sessionId 变化
自动刷新: 清除用户A的缓存，设置用户B的 sessionId
```

### 3. 会话过期处理
```
检测到: sessionId 已过期（超过24小时）
自动清除: 所有相关缓存
跳转页面: 错误页面或登录页面
```

## 测试页面

访问 `/sessionTest` 页面可以测试缓存刷新功能：

### 测试功能
1. **状态显示** - 显示当前 URL sessionId、缓存 sessionId、是否需要刷新等
2. **功能测试** - 测试有效/无效 sessionId、清除缓存、刷新页面
3. **操作日志** - 记录所有操作和状态变化
4. **测试 URL** - 提供各种测试场景的 URL

### 访问方式
```
有效 SessionId: http://localhost:3001/sessionTest?sessionId=a123456789
无效 SessionId: http://localhost:3001/sessionTest?sessionId=invalid123
无 SessionId: http://localhost:3001/sessionTest
```

## 工作流程

### 1. 页面加载时
```typescript
// 1. 获取 URL 中的 sessionId
const urlSessionId = getSessionIdFromUrl()

// 2. 检查是否需要刷新缓存
if (shouldRefreshCache(urlSessionId)) {
  // 3. 刷新缓存
  refreshCache(urlSessionId!)
}

// 4. 获取当前 sessionId
const currentSessionId = getCurrentSessionId()

// 5. 验证 sessionId
if (!currentSessionId || currentSessionId !== 'a123456789') {
  // 跳转到错误页面
  window.location.href = '/errorPage?reason=invalid-sessionid'
}
```

### 2. API 请求时
```typescript
// axios 拦截器中的逻辑
const sessionId = getCurrentSessionId()

// 检查是否需要刷新缓存
const urlSessionId = new URLSearchParams(window.location.search).get('sessionId')
if (shouldRefreshCache(urlSessionId)) {
  refreshCache(urlSessionId!)
}

// 添加 sessionId 到请求头
config.headers['X-Session-ID'] = sessionId
```

## 缓存数据结构

### localStorage 存储项
```javascript
{
  'sessionId': 'a123456789',           // 当前 sessionId
  'lastLoginTime': '2024-01-01T10:00:00.000Z',  // 最后登录时间
  'authToken': 'bearer_token_here',     // 认证令牌（可选）
  'userData': '{"name":"John"}',       // 用户数据（可选）
  'sessionCache': 'cached_data'        // 其他缓存数据（可选）
}
```

### 缓存刷新时清除的数据
- `sessionId` - 旧的 sessionId
- `authToken` - 认证令牌
- `userData` - 用户数据
- `lastLoginTime` - 最后登录时间
- `sessionCache` - 其他缓存数据

## 错误处理

### 1. 无效 sessionId
```typescript
// 检测到无效 sessionId
if (sessionId && sessionId !== 'a123456789') {
  window.location.href = '/errorPage?reason=invalid-sessionid'
}
```

### 2. 缺少 sessionId
```typescript
// 没有 sessionId
if (!sessionId) {
  window.location.href = '/errorPage?reason=no-sessionid'
}
```

### 3. 会话过期
```typescript
// 检查会话是否过期
if (isSessionExpired()) {
  clearSessionCache()
  window.location.href = '/errorPage?reason=session-expired'
}
```

## 最佳实践

### 1. 定期检查会话状态
```typescript
// 在应用启动时检查
onMounted(() => {
  if (isSessionExpired()) {
    clearSessionCache()
    // 跳转到登录页面
  }
})
```

### 2. 监听 URL 变化
```typescript
// 监听浏览器前进/后退
window.addEventListener('popstate', () => {
  // 重新验证 sessionId
  validateCurrentSession()
})
```

### 3. 错误页面处理
```typescript
// 在错误页面中提供重新登录选项
const handleRelogin = () => {
  clearSessionCache()
  window.location.href = '/login'
}
```

## 注意事项

1. **安全性** - sessionId 验证是强制性的，无效的 sessionId 会导致跳转到错误页面
2. **性能** - 缓存刷新操作是同步的，不会影响页面性能
3. **兼容性** - 支持多种 sessionId 参数名（sessionId、sessionid）
4. **调试** - 所有操作都有详细的 console 日志
5. **测试** - 提供了专门的测试页面来验证功能

## 相关文件

- `src/utils/sessionValidator.ts` - 会话验证工具
- `src/utils/axios.ts` - HTTP 客户端配置
- `src/views/SessionTest.vue` - 测试页面
- `src/router/index.ts` - 路由配置 