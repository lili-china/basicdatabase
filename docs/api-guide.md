# API 调用示例说明

这个目录包含了项目中各种API调用的示例，包括同步和异步调用方式。

## 文件结构

```
src/api/
├── example.ts          # API调用示例
├── README.md          # 说明文档
└── views/
    └── ApiExample.vue # Vue组件示例
```

## 调用方式分类

### 1. 异步调用 (async/await)

```typescript
// 异步调用示例
const handleAsyncCall = async () => {
  try {
    const result = await getUserList({ page: 1, pageSize: 10 })
    if (result.success) {
      console.log('用户列表:', result.data)
    } else {
      console.error('获取失败:', result.message)
    }
  } catch (error) {
    console.error('调用失败:', error)
  }
}
```

**特点**：
- 使用 `async/await` 语法
- 代码更清晰易读
- 错误处理更直观
- 适合复杂的异步逻辑

### 2. 同步调用 (Promise)

```typescript
// 同步调用示例
const handleSyncCall = () => {
  getIspList({ page: 1, pageSize: 10 })
    .then(result => {
      if (result.success) {
        console.log('ISP列表:', result.data)
      } else {
        console.error('获取失败:', result.message)
      }
    })
    .catch(error => {
      console.error('调用失败:', error)
    })
}
```

**特点**：
- 使用 Promise 链式调用
- 适合简单的API调用
- 可以链式处理多个操作

### 3. 带重试的调用

```typescript
// 带重试的调用示例
const handleRetryCall = async () => {
  try {
    const result = await apiCallWithRetry(
      () => getUserDetail('123'),
      3,    // 最大重试次数
      1000  // 重试间隔（毫秒）
    )
    console.log('用户详情:', result)
  } catch (error) {
    console.error('重试后仍然失败:', error)
  }
}
```

**特点**：
- 自动重试失败的请求
- 可配置重试次数和间隔
- 适合网络不稳定的情况

### 4. 带超时的调用

```typescript
// 带超时的调用示例
const handleTimeoutCall = async () => {
  try {
    const result = await apiCallWithTimeout(
      () => getDashboardStats(),
      5000  // 超时时间（毫秒）
    )
    console.log('统计数据:', result)
  } catch (error) {
    console.error('请求超时:', error)
  }
}
```

**特点**：
- 设置请求超时时间
- 避免长时间等待
- 适合对响应时间有要求的场景

### 5. 批量操作

```typescript
// 批量操作示例
const handleBatchDelete = async () => {
  const userIds = ['1', '2', '3', '4', '5']
  const result = await batchDeleteUsers(userIds, (progress) => {
    console.log(`删除进度: ${progress}%`)
  })
  console.log('批量删除结果:', result)
}
```

**特点**：
- 支持批量操作
- 带进度回调
- 适合大量数据处理

### 6. 实时数据

```typescript
// 实时数据示例
const startRealtime = () => {
  const stopPolling = startNotificationPolling((notifications) => {
    console.log('新通知:', notifications)
  }, 3000)  // 轮询间隔
  
  // 停止轮询
  setTimeout(stopPolling, 10000)
}
```

**特点**：
- 支持轮询获取实时数据
- 可配置轮询间隔
- 返回停止函数

### 7. 文件上传

```typescript
// 文件上传示例
const uploadFile = async (file: File) => {
  try {
    const result = await uploadVehicleImage(file, 'vehicle-123')
    if (result.success) {
      console.log('上传成功:', result.data)
    } else {
      console.error('上传失败:', result.message)
    }
  } catch (error) {
    console.error('上传失败:', error)
  }
}
```

**特点**：
- 支持文件上传
- 自动处理 FormData
- 带进度和错误处理

## 返回格式

所有API调用都返回统一的格式：

```typescript
interface ApiResponse<T> {
  success: boolean
  data: T | null
  message: string
  error?: any
}
```

**示例**：
```typescript
// 成功响应
{
  success: true,
  data: { id: 1, name: 'John' },
  message: '获取用户成功'
}

// 失败响应
{
  success: false,
  data: null,
  message: '获取用户失败',
  error: Error对象
}
```

## 错误处理

### 1. try/catch 方式

```typescript
try {
  const result = await getUserList()
  if (result.success) {
    // 处理成功
  } else {
    // 处理业务错误
    console.error(result.message)
  }
} catch (error) {
  // 处理网络错误
  console.error('网络错误:', error)
}
```

### 2. Promise 方式

```typescript
getUserList()
  .then(result => {
    if (result.success) {
      // 处理成功
    } else {
      // 处理业务错误
    }
  })
  .catch(error => {
    // 处理网络错误
  })
```

## 在Vue组件中使用

### 1. 基础使用

```vue
<template>
  <div>
    <button @click="loadUsers" :disabled="loading">
      {{ loading ? '加载中...' : '获取用户' }}
    </button>
    <ul v-if="users.length">
      <li v-for="user in users" :key="user.id">
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getUserList } from '@/api/example'

const loading = ref(false)
const users = ref([])

const loadUsers = async () => {
  loading.value = true
  try {
    const result = await getUserList()
    if (result.success) {
      users.value = result.data
    }
  } finally {
    loading.value = false
  }
}
</script>
```

### 2. 带错误处理

```vue
<template>
  <div>
    <button @click="loadUsers">获取用户</button>
    <div v-if="error" class="error">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getUserList } from '@/api/example'

const error = ref('')

const loadUsers = async () => {
  try {
    const result = await getUserList()
    if (result.success) {
      // 处理成功
    } else {
      error.value = result.message
    }
  } catch (err) {
    error.value = '网络错误，请重试'
  }
}
</script>
```

## 最佳实践

### 1. 统一错误处理

```typescript
// 创建统一的错误处理函数
const handleApiError = (error: any, defaultMessage = '操作失败') => {
  if (error.response?.status === 401) {
    // 未授权，跳转到登录页
    router.push('/login')
  } else if (error.response?.status === 403) {
    // 禁止访问
    ElMessage.error('没有权限执行此操作')
  } else {
    // 其他错误
    ElMessage.error(error.message || defaultMessage)
  }
}
```

### 2. 加载状态管理

```typescript
// 使用组合式函数管理加载状态
const useLoading = () => {
  const loading = ref(false)
  
  const withLoading = async (fn: () => Promise<any>) => {
    loading.value = true
    try {
      return await fn()
    } finally {
      loading.value = false
    }
  }
  
  return { loading, withLoading }
}
```

### 3. 缓存策略

```typescript
// 带缓存的API调用
const getCachedData = async (key: string, apiCall: () => Promise<any>) => {
  const cached = sessionStorage.getItem(key)
  if (cached) {
    return JSON.parse(cached)
  }
  
  const result = await apiCall()
  sessionStorage.setItem(key, JSON.stringify(result))
  return result
}
```

## 注意事项

1. **错误处理**: 始终处理API调用的错误
2. **加载状态**: 为用户提供加载反馈
3. **类型安全**: 使用TypeScript定义API响应类型
4. **缓存策略**: 合理使用缓存提高性能
5. **重试机制**: 对重要操作添加重试逻辑
6. **超时设置**: 设置合理的超时时间
7. **批量操作**: 大量数据操作时考虑分批处理 