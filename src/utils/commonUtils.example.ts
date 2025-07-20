/**
 * 常用工具类使用示例
 */
import {
  capitalize,
  capitalizeWords,
  truncate,
  formatDate,
  formatNumber,
  formatFileSize,
  generateRandomString,
  generateId,
  debounce,
  throttle,
  deepClone,
  isEmpty,
  get,
  set,
  unique,
  groupBy,
  delay,
  copyToClipboard,
  downloadFile,
  isValidEmail,
  isValidPhone,
  isValidIdCard,
  getUrlParam,
  setUrlParam,
  removeUrlParam
} from './commonUtils'

// 字符串处理示例
console.log('首字母大写:', capitalize('hello')) // Hello
console.log('每个单词首字母大写:', capitalizeWords('hello world')) // Hello World
console.log('文字截取:', truncate('这是一段很长的文字', 5)) // 这是一段...

// 日期格式化示例
console.log('格式化日期:', formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss'))
console.log('格式化日期:', formatDate('2024-01-01', 'YYYY年MM月DD日'))

// 数字格式化示例
console.log('格式化数字:', formatNumber(1234567)) // 1,234,567
console.log('格式化数字:', formatNumber(1234.567, 2)) // 1,234.57

// 文件大小格式化示例
console.log('文件大小:', formatFileSize(1024)) // 1 KB
console.log('文件大小:', formatFileSize(1048576)) // 1 MB

// 随机字符串示例
console.log('随机字符串:', generateRandomString(10))
console.log('随机ID:', generateId())

// 防抖和节流示例
const debouncedSearch = debounce((query: string) => {
  console.log('搜索:', query)
}, 300)

const throttledScroll = throttle(() => {
  console.log('滚动事件')
}, 100)

// 对象操作示例
const obj = { user: { name: 'John', age: 30 } }
console.log('获取嵌套值:', get(obj, 'user.name')) // John
console.log('设置嵌套值:', set(obj, 'user.email', 'john@example.com'))

// 数组操作示例
const users = [
  { id: 1, name: 'John', role: 'admin' },
  { id: 2, name: 'Jane', role: 'user' },
  { id: 3, name: 'Bob', role: 'admin' }
]

console.log('数组去重:', unique(users, 'role'))
console.log('数组分组:', groupBy(users, 'role'))

// 验证示例
console.log('邮箱验证:', isValidEmail('test@example.com')) // true
console.log('手机号验证:', isValidPhone('13800138000')) // true
console.log('身份证验证:', isValidIdCard('110101199001011234')) // true

// URL参数示例
setUrlParam('page', '1')
console.log('获取URL参数:', getUrlParam('page')) // 1
removeUrlParam('page')

// 复制到剪贴板示例
const copyText = async () => {
  const success = await copyToClipboard('要复制的文本')
  if (success) {
    console.log('复制成功')
  } else {
    console.log('复制失败')
  }
}

// 下载文件示例
const downloadExample = () => {
  downloadFile('https://example.com/file.pdf', 'document.pdf')
}

// 延迟执行示例
const asyncExample = async () => {
  console.log('开始')
  await delay(1000)
  console.log('1秒后执行')
}

// 深拷贝示例
const original = { name: 'John', hobbies: ['reading', 'gaming'] }
const cloned = deepClone(original)
console.log('深拷贝:', cloned)

// 空值检查示例
console.log('空字符串:', isEmpty('')) // true
console.log('空数组:', isEmpty([])) // true
console.log('空对象:', isEmpty({})) // true
console.log('null:', isEmpty(null)) // true
console.log('undefined:', isEmpty(undefined)) // true

// Vue组件中使用示例
/*
<template>
  <div>
    <p>{{ formatUserName(user.name) }}</p>
    <p>{{ formatDate(user.createdAt) }}</p>
    <button @click="handleSearch">搜索</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { capitalize, formatDate, debounce } from '@/utils/commonUtils'

const user = ref({
  name: 'john doe',
  createdAt: new Date()
})

const formatUserName = (name: string) => {
  return capitalizeWords(name)
}

const handleSearch = debounce((query: string) => {
  // 搜索逻辑
  console.log('搜索:', query)
}, 300)
</script>
*/ 