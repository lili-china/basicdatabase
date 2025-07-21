# API集成指南

## 概述

本项目已预留了完整的内网API集成功能，包括session验证、用户信息获取、数据查询等。默认情况下API验证是关闭的，使用本地硬编码验证作为备用方案。

## 当前状态

- ✅ Session验证功能已预留
- ✅ API配置管理已实现
- ✅ 本地验证作为备用方案
- ✅ 异步验证支持
- ✅ 错误处理机制
- ⏳ 等待内网API准备就绪

## 启用内网API验证

### 方法1：通过代码启用

在应用启动时调用以下代码：

```typescript
import { setApiEnabled, setApiBaseUrl } from '@/utils/apiConfig'

// 启用API验证
setApiEnabled(true)

// 设置内网API地址
setApiBaseUrl('http://your-internal-api-server:8080/api')

// 可选：设置超时时间
setApiConfig({
  timeout: 10000,
  retryCount: 3
})
```

### 方法2：通过环境变量启用

创建 `.env` 文件或在环境变量中设置：

```bash
# 启用API验证
VITE_API_ENABLED=true

# 设置API基础URL
VITE_API_BASE_URL=http://your-internal-api-server:8080/api
```

### 方法3：通过配置文件启用

在 `env.config` 文件中添加：

```json
{
  "api": {
    "enabled": true,
    "baseUrl": "http://your-internal-api-server:8080/api",
    "timeout": 10000,
    "retryCount": 3
  }
}
```

## API端点配置

### 认证相关端点

```typescript
auth: {
  validateSession: '/auth/validate-session',    // 验证session
  refreshSession: '/auth/refresh-session',      // 刷新session
  getUserInfo: '/auth/user-info',               // 获取用户信息
  login: '/auth/login',                         // 用户登录
  logout: '/auth/logout'                        // 用户登出
}
```

### 数据相关端点

```typescript
data: {
  personal: '/data/personal',                   // 个人数据
  vehicle: '/data/vehicle',                     // 车辆数据
  isp: '/data/isp',                            // ISP数据
  analytics: '/data/analytics'                  // 分析数据
}
```

### 系统相关端点

```typescript
system: {
  health: '/system/health',                     // 健康检查
  status: '/system/status',                     // 系统状态
  config: '/system/config'                      // 系统配置
}
```

## 内网API接口规范

### 1. Session验证接口

**POST** `/auth/validate-session`

请求体：
```json
{
  "sessionId": "a123456789"
}
```

响应：
```json
{
  "isValid": true,
  "message": "Session is valid",
  "userInfo": {
    "userId": "12345",
    "username": "admin",
    "role": "admin"
  }
}
```

### 2. Session刷新接口

**POST** `/auth/refresh-session`

请求体：
```json
{
  "sessionId": "a123456789"
}
```

响应：
```json
{
  "success": true,
  "newSessionId": "b987654321",
  "expiresIn": 3600
}
```

### 3. 用户信息接口

**GET** `/auth/user-info`

请求头：
```
X-Session-ID: a123456789
```

响应：
```json
{
  "userId": "12345",
  "username": "admin",
  "email": "admin@company.com",
  "role": "admin",
  "permissions": ["read", "write", "admin"]
}
```

## 验证流程

1. **页面加载时**：SessionGuard组件自动验证session
2. **API请求时**：axios拦截器验证session
3. **Session过期时**：自动尝试刷新session
4. **验证失败时**：跳转到错误页面

## 错误处理

### 常见错误类型

- `no-sessionid`：未提供sessionId
- `invalid-sessionid`：sessionId无效
- `session-expired`：session已过期
- `unauthorized`：未授权访问
- `forbidden`：禁止访问
- `server-error`：服务器错误

### 错误页面处理

错误页面会自动检查URL中的sessionId，如果发现有效的sessionId会自动跳转到dashboard。

## 调试和监控

### 控制台日志

启用API验证后，可以在浏览器控制台查看详细的验证日志：

```
API验证状态: 已启用
调用内网API验证session: a123456789
API验证结果: { isValid: true, ... }
```

### 网络请求监控

在浏览器开发者工具的Network面板中可以监控API请求：

- 请求URL：`http://your-internal-api-server:8080/api/auth/validate-session`
- 请求方法：POST
- 请求头：包含X-Session-ID
- 响应状态：200 OK

## 安全考虑

1. **HTTPS**：生产环境必须使用HTTPS
2. **CORS**：确保内网API配置了正确的CORS策略
3. **超时设置**：合理设置API请求超时时间
4. **重试机制**：网络异常时自动重试
5. **错误处理**：妥善处理各种异常情况

## 迁移步骤

1. **准备内网API**：确保内网API服务正常运行
2. **配置API地址**：设置正确的API基础URL
3. **启用API验证**：将API验证状态设置为true
4. **测试验证**：验证session验证功能正常
5. **监控日志**：观察控制台日志和网络请求
6. **处理异常**：确保错误处理机制正常工作

## 回退方案

如果内网API暂时不可用，可以：

1. **禁用API验证**：`setApiEnabled(false)`
2. **使用本地验证**：系统会自动回退到硬编码验证
3. **保持功能正常**：所有功能继续正常工作

## 注意事项

1. **API地址**：确保内网API地址正确且可访问
2. **网络环境**：确保前端应用可以访问内网API
3. **CORS配置**：内网API需要配置正确的CORS策略
4. **超时设置**：根据网络环境调整超时时间
5. **错误处理**：测试各种异常情况的处理

## 技术支持

如果遇到问题，请检查：

1. 浏览器控制台日志
2. 网络请求状态
3. API服务状态
4. 网络连接情况
5. CORS配置 