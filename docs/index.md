# Basic Database 项目文档

欢迎来到 Basic Database 项目文档中心！

## 📚 文档目录

### 1. [项目运行说明](./README.md)
- 项目简介和技术栈
- 环境要求和安装步骤
- 运行和构建命令
- 系统功能说明
- 使用流程指南

### 2. [工具类使用指南](./utils-guide.md)
- 字符串处理函数
- 日期和数字格式化
- 对象和数组操作
- 性能优化函数
- 数据验证工具
- 浏览器操作函数

### 3. [API调用指南](./api-guide.md)
- 异步和同步调用方式
- 带重试和超时的调用
- 批量操作和实时数据
- 文件上传示例
- 错误处理最佳实践
- Vue组件中的使用

## 🚀 快速开始

### 1. 安装依赖
```bash
npm install
```

### 2. 运行项目
```bash
npm run dev
```

### 3. 访问系统
```
http://localhost:3001/dashboard?sessionId=a123456789
```

## 📁 项目结构

```
basicdatabase/
├── docs/                   # 📚 项目文档
│   ├── README.md          # 项目运行说明
│   ├── utils-guide.md     # 工具类使用指南
│   ├── api-guide.md       # API调用指南
│   └── index.md           # 文档索引
├── src/                   # 💻 源代码
│   ├── api/              # API接口
│   ├── components/       # Vue组件
│   ├── utils/            # 工具函数
│   ├── views/            # 页面组件
│   └── router/           # 路由配置
├── public/               # 🌐 静态资源
├── env.config            # ⚙️ 环境配置
└── package.json          # 📦 项目配置
```

## 🔧 常用配置

### 环境变量配置
修改 `env.config` 文件来切换API地址：

```bash
# 本地开发
VITE_API_BASE_URL=http://localhost:3000/api

# 测试环境
VITE_API_BASE_URL=https://test-api.example.com/api

# 生产环境
VITE_API_BASE_URL=https://api.example.com/api
```

### Session ID 验证
系统需要有效的 sessionId (`a123456789`) 才能访问：

```
http://localhost:3001/dashboard?sessionId=a123456789
```

## 📖 开发指南

### 1. 工具类使用
```typescript
import { capitalize, formatDate, debounce } from '@/utils/commonUtils'

// 字符串处理
const name = capitalize('john') // 'John'

// 日期格式化
const date = formatDate(new Date(), 'YYYY-MM-DD')

// 防抖函数
const handleSearch = debounce((query) => {
  // 搜索逻辑
}, 300)
```

### 2. API调用
```typescript
import { getUserList, apiCallWithRetry } from '@/api/example'

// 异步调用
const result = await getUserList({ page: 1, pageSize: 10 })

// 带重试的调用
const userDetail = await apiCallWithRetry(
  () => getUserDetail('123'),
  3, 1000
)
```

### 3. Vue组件开发
```vue
<template>
  <div>
    <button @click="loadData" :disabled="loading">
      {{ loading ? '加载中...' : '获取数据' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getUserList } from '@/api/example'

const loading = ref(false)

const loadData = async () => {
  loading.value = true
  try {
    const result = await getUserList()
    if (result.success) {
      // 处理数据
    }
  } finally {
    loading.value = false
  }
}
</script>
```

## 🛠️ 开发工具

### 1. 查看当前配置
```javascript
import { getApiBaseUrl, getAppTitle } from '@/utils/envLoader'

console.log('API地址:', getApiBaseUrl())
console.log('应用标题:', getAppTitle())
```

### 2. 添加豁免URL
```javascript
import { addExemptUrl } from '@/utils/axios'
addExemptUrl('/api/public/data')
```

### 3. 检查豁免URL
```javascript
import { isExemptUrl } from '@/utils/axios'
console.log('是否豁免:', isExemptUrl('/api/auth/login'))
```

## 🚨 错误处理

### 常见错误页面
- `no-sessionid` - 缺少 sessionId
- `invalid-sessionid` - sessionId 无效
- `unauthorized` - 未授权访问
- `forbidden` - 禁止访问
- `server-error` - 服务器错误

### 错误页面访问
```
http://localhost:3001/errorPage?reason=no-sessionid
http://localhost:3001/errorPage?reason=invalid-sessionid
```

## 📞 技术支持

如有问题，请检查：

1. **Node.js 版本** - 确保 >= 16.0.0
2. **依赖安装** - 运行 `npm install`
3. **端口占用** - 确保端口 3001 未被占用
4. **API服务** - 确保后端API服务正常运行
5. **环境配置** - 检查 `env.config` 文件配置

## 📝 更新日志

### v1.0.0 (2024年)
- ✅ 完成基础功能开发
- ✅ 实现会话验证机制
- ✅ 添加工具类函数库
- ✅ 完善API调用示例
- ✅ 整理项目文档

---

**版本**: 1.0.0  
**最后更新**: 2024年  
**维护者**: Basic Database Team 