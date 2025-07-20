# 工具类函数库使用指南

这个目录包含了项目中常用的工具类函数，提供了丰富的字符串处理、日期格式化、数据验证等功能。

## 文件结构

```
src/utils/
├── commonUtils.ts          # 常用工具类函数
├── commonUtils.example.ts  # 使用示例
├── collectionUtils.ts      # 集合操作工具类
├── collectionUtils.example.ts # 集合操作示例
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

### 9. 集合操作 (新增)
- `unique(arr, key)` - 数组去重
- `groupBy(arr, key)` - 数组分组
- `sortBy(arr, key, order)` - 数组排序
- `paginate(arr, page, pageSize)` - 数组分页
- `flatten(arr, depth)` - 数组扁平化
- `intersection(arr1, arr2)` - 数组交集
- `union(arr1, arr2)` - 数组并集
- `difference(arr1, arr2)` - 数组差集
- `shuffle(arr)` - 数组随机打乱
- `randomChoice(arr, count)` - 数组随机选择
- `chunk(arr, size)` - 数组分块
- `fill(length, value)` - 数组填充
- `range(start, end, step)` - 数组范围
- `countBy(arr, key)` - 数组统计
- `sum(arr, key)` - 数组求和
- `average(arr, key)` - 数组平均值
- `max(arr, key)` - 数组最大值
- `min(arr, key)` - 数组最小值
- `includes(arr, item)` - 检查数组是否包含元素
- `first(arr)` - 获取数组第一个元素
- `last(arr)` - 获取数组最后一个元素
- `deepMerge(target, ...sources)` - 对象深度合并
- `flattenObject(obj, prefix)` - 对象扁平化
- `pick(obj, keys)` - 对象选择指定属性
- `omit(obj, keys)` - 对象排除指定属性
- `toPairs(obj)` - 对象转键值对数组
- `fromPairs(pairs)` - 键值对数组转对象
- `setIntersection(set1, set2)` - Set交集
- `setUnion(set1, set2)` - Set并集
- `setDifference(set1, set2)` - Set差集
- `mapToObject(map)` - Map转对象
- `objectToMap(obj)` - 对象转Map
- `mapToPairs(map)` - Map转键值对数组
- `pairsToMap(pairs)` - 键值对数组转Map

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

### 集合操作 (新增)
```typescript
import {
  unique, groupBy, sortBy, paginate, intersection, union, difference,
  shuffle, randomChoice, chunk, countBy, sum, average, max, min,
  deepMerge, pick, omit, setIntersection, mapToObject
} from '@/utils/collectionUtils'

// 数组操作
const users = [
  { id: 1, name: 'Alice', age: 25, city: 'Beijing', salary: 5000 },
  { id: 2, name: 'Bob', age: 30, city: 'Shanghai', salary: 6000 },
  { id: 3, name: 'Charlie', age: 25, city: 'Beijing', salary: 5500 }
]

// 数组去重
const uniqueUsers = unique(users, 'city')

// 数组分组
const usersByCity = groupBy(users, 'city')

// 数组排序
const sortedUsers = sortBy(users, 'salary', 'desc')

// 数组分页
const pageResult = paginate(users, 1, 2)

// 数组集合操作
const arr1 = [1, 2, 3, 4, 5]
const arr2 = [4, 5, 6, 7, 8]
const intersectionResult = intersection(arr1, arr2)
const unionResult = union(arr1, arr2)
const differenceResult = difference(arr1, arr2)

// 数组随机操作
const shuffledUsers = shuffle([...users])
const randomUsers = randomChoice(users, 2)

// 数组分块
const chunks = chunk(users, 2)

// 数组统计
const cityStats = countBy(users, 'city')
const salaries = users.map(u => u.salary)
const totalSalary = sum(salaries)
const avgSalary = average(salaries)
const maxSalary = max(salaries)
const minSalary = min(salaries)

// 对象操作
const user = { id: 1, name: 'Alice', profile: { age: 25 } }
const userUpdate = { name: 'Alice Smith', profile: { age: 26 } }

// 对象深度合并
const mergedUser = deepMerge({ ...user }, userUpdate)

// 对象属性选择
const userBasic = pick(user, ['id', 'name'])
const userWithoutProfile = omit(user, ['profile'])

// Set 操作
const set1 = new Set([1, 2, 3, 4, 5])
const set2 = new Set([4, 5, 6, 7, 8])
const setIntersectionResult = setIntersection(set1, set2)

// Map 操作
const userMap = new Map([['id', 1], ['name', 'Alice']])
const userObj = mapToObject(userMap)
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

## 实际应用场景

### 1. 用户数据处理
```typescript
import { groupBy, average, sortBy, paginate } from '@/utils/collectionUtils'

// 处理用户数据
const processUserData = (users) => {
  // 按城市分组
  const usersByCity = groupBy(users, 'city')
  
  // 计算每个城市的平均薪资
  const cityStats = Object.entries(usersByCity).map(([city, cityUsers]) => ({
    city,
    userCount: cityUsers.length,
    avgSalary: average(cityUsers.map(u => u.salary))
  }))
  
  // 按平均薪资排序
  const sortedStats = sortBy(cityStats, 'avgSalary', 'desc')
  
  // 分页显示
  const pageResult = paginate(sortedStats, 1, 10)
  
  return pageResult
}
```

### 2. 表单数据处理
```typescript
import { deepMerge, flattenObject, pick } from '@/utils/collectionUtils'

// 处理表单数据
const processFormData = (formData, requiredFields) => {
  // 扁平化表单数据
  const flattened = flattenObject(formData)
  
  // 选择必需字段
  const required = pick(flattened, requiredFields)
  
  // 合并默认值
  const result = deepMerge({}, required)
  
  return result
}
```

### 3. 数据统计
```typescript
import { countBy, sum, average, max, min } from '@/utils/collectionUtils'

// 数据统计
const generateStats = (data) => {
  return {
    total: data.length,
    categoryCount: countBy(data, 'category'),
    totalValue: sum(data, 'value'),
    avgValue: average(data, 'value'),
    maxValue: max(data, 'value'),
    minValue: min(data, 'value')
  }
}
```

## 注意事项

1. **类型安全**: 所有函数都使用 TypeScript 类型定义
2. **性能优化**: 防抖和节流函数可以优化性能
3. **浏览器兼容**: 复制功能包含降级方案
4. **错误处理**: 函数包含适当的错误处理
5. **文档完整**: 每个函数都有详细的 JSDoc 注释
6. **集合操作**: 新增的集合操作工具类提供了丰富的数组、对象、Set、Map 操作功能

## 扩展建议

如果需要添加新的工具函数：

1. 在 `commonUtils.ts` 或 `collectionUtils.ts` 中添加新函数
2. 添加完整的 TypeScript 类型定义
3. 添加 JSDoc 注释说明
4. 在对应的 example 文件中添加使用示例
5. 更新此文档

## 相关文件

- `commonUtils.ts` - 基础工具函数
- `collectionUtils.ts` - 集合操作工具类
- `axios.ts` - HTTP 客户端配置
- `sessionValidator.ts` - 会话验证工具
- `themeManager.ts` - 主题管理
- `animationManager.ts` - 动画管理 