# 工具类函数库使用指南

这个目录包含了项目中常用的工具类函数，提供了丰富的字符串处理、日期格式化、数据验证等功能。

## 文件结构

```
src/utils/
├── commonUtils.ts          # 常用工具类函数
├── commonUtils.example.ts  # 使用示例
├── axios.ts               # HTTP 客户端配置
├── sessionValidator.ts     # 会话验证工具
├── themeManager.ts        # 主题管理
├── animationManager.ts    # 动画管理
└── README.md             # 说明文档
```

## 主要功能分类

### 1. 字符串处理
- `capitalize(str)` - 首字母大写
- `capitalizeWords(str)` - 每个单词首字母大写
- `truncate(str, maxLength, suffix)` - 文字过长截取用...代替

### 2. 日期和数字格式化
- `formatDate(date, format)` - 格式化日期
- `formatNumber(num, decimals)` - 格式化数字（添加千分位分隔符）
- `formatFileSize(bytes, decimals)` - 格式化文件大小

### 3. 数据生成
- `generateRandomString(length)` - 生成随机字符串
- `generateId()` - 生成随机ID

### 4. 性能优化
- `debounce(func, wait)` - 防抖函数
- `throttle(func, limit)` - 节流函数

### 5. 对象和数组操作
- `deepClone(obj)` - 深拷贝对象
- `isEmpty(obj)` - 检查对象是否为空
- `get(obj, path, defaultValue)` - 获取对象指定路径的值
- `set(obj, path, value)` - 设置对象指定路径的值
- `unique(arr, key)` - 数组去重
- `groupBy(arr, key)` - 数组分组

### 6. 浏览器操作
- `copyToClipboard(text)` - 复制文本到剪贴板
- `downloadFile(url, filename)` - 下载文件
- `delay(ms)` - 延迟执行

### 7. 数据验证
- `isValidEmail(email)` - 验证邮箱格式
- `isValidPhone(phone)` - 验证手机号格式
- `isValidIdCard(idCard)` - 验证身份证号格式

### 8. URL 操作
- `getUrlParam(name)` - 获取URL参数
- `setUrlParam(name, value)` - 设置URL参数
- `removeUrlParam(name)` - 移除URL参数

## 使用示例

### 基础使用
```typescript
import { capitalize, truncate, formatDate } from '@/utils/commonUtils'

// 字符串处理
const name = capitalize('john') // 'John'
const description = truncate('这是一段很长的描述文字', 10) // '这是一段很长的...'

// 日期格式化
const date = formatDate(new Date(), 'YYYY-MM-DD') // '2024-01-01'
```

### Vue 组件中使用
```vue
<template>
  <div>
    <h1>{{ formatUserName(user.name) }}</h1>
    <p>{{ formatDate(user.createdAt) }}</p>
    <input @input="handleSearch" placeholder="搜索..." />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { capitalizeWords, formatDate, debounce } from '@/utils/commonUtils'

const user = ref({
  name: 'john doe',
  createdAt: new Date()
})

const formatUserName = (name: string) => {
  return capitalizeWords(name)
}

const handleSearch = debounce((event: Event) => {
  const query = (event.target as HTMLInputElement).value
  console.log('搜索:', query)
}, 300)
</script>
```

### 防抖和节流
```typescript
import { debounce, throttle } from '@/utils/commonUtils'

// 防抖：搜索输入
const debouncedSearch = debounce((query: string) => {
  // 执行搜索
  searchAPI(query)
}, 300)

// 节流：滚动事件
const throttledScroll = throttle(() => {
  // 处理滚动
  updateScrollPosition()
}, 100)
```

### 对象操作
```typescript
import { get, set, deepClone } from '@/utils/commonUtils'

const user = {
  profile: {
    name: 'John',
    address: {
      city: 'Beijing'
    }
  }
}

// 获取嵌套值
const city = get(user, 'profile.address.city') // 'Beijing'

// 设置嵌套值
set(user, 'profile.email', 'john@example.com')

// 深拷贝
const clonedUser = deepClone(user)
```

### 数组操作
```typescript
import { unique, groupBy } from '@/utils/commonUtils'

const users = [
  { id: 1, name: 'John', role: 'admin' },
  { id: 2, name: 'Jane', role: 'user' },
  { id: 3, name: 'Bob', role: 'admin' }
]

// 数组去重
const uniqueRoles = unique(users, 'role')

// 数组分组
const groupedByRole = groupBy(users, 'role')
// 结果: { admin: [...], user: [...] }
```

### 数据验证
```typescript
import { isValidEmail, isValidPhone, isValidIdCard } from '@/utils/commonUtils'

// 验证邮箱
console.log(isValidEmail('test@example.com')) // true

// 验证手机号
console.log(isValidPhone('13800138000')) // true

// 验证身份证
console.log(isValidIdCard('110101199001011234')) // true
```

### 浏览器操作
```typescript
import { copyToClipboard, downloadFile, delay } from '@/utils/commonUtils'

// 复制到剪贴板
const copyText = async () => {
  const success = await copyToClipboard('要复制的文本')
  if (success) {
    console.log('复制成功')
  }
}

// 下载文件
downloadFile('https://example.com/file.pdf', 'document.pdf')

// 延迟执行
const asyncTask = async () => {
  console.log('开始')
  await delay(1000)
  console.log('1秒后执行')
}
```

## 注意事项

1. **类型安全**: 所有函数都使用 TypeScript 类型定义
2. **性能优化**: 防抖和节流函数可以优化性能
3. **浏览器兼容**: 复制功能包含降级方案
4. **错误处理**: 函数包含适当的错误处理
5. **文档完整**: 每个函数都有详细的 JSDoc 注释

## 扩展建议

如果需要添加新的工具函数：

1. 在 `commonUtils.ts` 中添加新函数
2. 添加完整的 TypeScript 类型定义
3. 添加 JSDoc 注释说明
4. 在 `commonUtils.example.ts` 中添加使用示例
5. 更新此文档

## 相关文件

- `axios.ts` - HTTP 客户端配置
- `sessionValidator.ts` - 会话验证工具
- `themeManager.ts` - 主题管理
- `animationManager.ts` - 动画管理 