# Basic Database 系统运行说明

## 项目简介

Basic Database 是一个基于 Vue 3 + TypeScript + Vite 的员工数据库管理系统，支持 ISP、个人、车辆等数据管理功能。

## 技术栈

- **前端框架**: Vue 3 + TypeScript
- **构建工具**: Vite
- **UI 组件库**: Element Plus
- **路由管理**: Vue Router
- **HTTP 客户端**: Axios
- **关系图组件**: Relation Graph

## 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0

## 安装依赖

```bash
npm install
```

## 运行项目

### 开发环境

```bash
npm run dev
```

- **访问地址**: http://localhost:3001
- **API 地址**: 通过 `env.config` 文件配置

### 构建生产版本

```bash
# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 系统功能

### 1. 会话管理
- **Session ID 验证**: 系统需要有效的 sessionId (`a123456789`) 才能访问
- **自动跳转**: 无效 sessionId 自动跳转到错误页面
- **本地存储**: sessionId 保存在 localStorage 中

### 2. 页面功能
- **Dashboard**: 系统仪表板
- **ISP Database**: ISP 数据库管理
- **Personal Database**: 个人数据库管理
- **Vehicle Database**: 车辆数据库管理
- **Analytics**: 数据分析页面
- **User Confirm**: 用户确认页面
- **Error Page**: 错误页面

### 3. 导航功能
- **菜单导航**: 点击菜单项进行页面切换
- **Session 验证**: 每次切换菜单都会验证 sessionId
- **URL 清理**: 菜单跳转不携带 sessionId 参数

### 4. API 配置
- **豁免 URL**: 某些 API 不需要 sessionId 验证
- **错误处理**: 自动处理 API 错误并跳转
- **环境切换**: 支持开发和生产环境切换

## 环境配置

### API 地址配置 (`env.config`)
```
# 修改这个地址来切换不同的API服务
VITE_API_BASE_URL=http://localhost:3000/api

# 应用标题
VITE_APP_TITLE=Basic Database
```

**常用API地址示例**：
- 本地开发：`http://localhost:3000/api`
- 测试环境：`https://test-api.example.com/api`
- 生产环境：`https://api.example.com/api`

**环境变量加载**：
- 系统会自动从 `env.config` 文件读取环境变量
- 支持 `VITE_` 前缀的环境变量
- 可以通过修改 `env.config` 文件来切换API地址

## API 豁免列表

以下 URL 不需要 sessionId 验证：
- `/auth/login` - 登录接口
- `/auth/register` - 注册接口
- `/public/health` - 公共健康检查
- `/public/status` - 公共状态检查
- `/api/health` - API 健康检查
- `/api/status` - API 状态检查
- `/health` - 通用健康检查
- `/status` - 通用状态检查

## 使用流程

### 1. 首次访问
1. 访问系统时需要携带有效的 sessionId
2. 示例: `http://localhost:3001/dashboard?sessionId=a123456789`

### 2. 系统登录
1. 系统验证 sessionId 有效性
2. 有效 sessionId 保存到 localStorage
3. 跳转到用户确认页面

### 3. 进入系统
1. 在用户确认页面点击 "Enter System"
2. 系统再次验证 sessionId
3. 验证通过后进入主系统

### 4. 功能使用
1. 通过导航菜单切换不同功能页面
2. 每次切换都会验证 sessionId
3. 所有 API 请求都会携带 sessionId

### 5. 退出系统
1. 点击用户菜单中的 "Logout"
2. 跳转到用户确认页面
3. 可选择重新进入或完全退出

## 开发调试

### 查看当前配置
在浏览器控制台运行：
```javascript
import { getApiBaseUrl, getAppTitle } from '@/utils/envLoader'

console.log('API地址:', getApiBaseUrl())
console.log('应用标题:', getAppTitle())
console.log('SessionId:', localStorage.getItem('sessionId'))
```

### 添加豁免 URL
```javascript
import { addExemptUrl } from '@/utils/axios'
addExemptUrl('/api/public/data')
```

### 检查豁免 URL
```javascript
import { isExemptUrl } from '@/utils/axios'
console.log('是否豁免:', isExemptUrl('/api/auth/login'))
```

## 错误处理

### 常见错误页面
- **no-sessionid**: 缺少 sessionId
- **invalid-sessionid**: sessionId 无效
- **unauthorized**: 未授权访问
- **forbidden**: 禁止访问
- **server-error**: 服务器错误

### 错误页面访问
```
http://localhost:3001/errorPage?reason=no-sessionid
http://localhost:3001/errorPage?reason=invalid-sessionid
```

## 项目结构

```
basicdatabase/
├── src/
│   ├── components/          # 组件
│   ├── views/              # 页面
│   ├── router/             # 路由配置
│   ├── utils/              # 工具函数
│   ├── api/                # API 接口
│   ├── types/              # TypeScript 类型
│   └── style/              # 样式文件
├── public/                 # 静态资源
├── docs/                   # 项目文档
├── env.config              # 环境配置
└── package.json            # 项目配置
```

## 注意事项

1. **SessionId 要求**: 系统只接受 `a123456789` 作为有效 sessionId
2. **API 地址配置**: 修改 `env.config` 文件中的 `VITE_API_BASE_URL` 来切换API地址
3. **豁免 URL**: 某些 API 不需要验证，已在配置中设置
4. **错误处理**: 系统会自动处理各种错误情况

## 技术支持

如有问题，请检查：
1. Node.js 版本是否符合要求
2. 依赖是否正确安装
3. 端口 3001 是否被占用
4. API 服务是否正常运行

---

**版本**: 1.0.0  
**最后更新**: 2024年 