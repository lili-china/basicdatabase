# Employee Database

一个现代化的员工数据库管理系统，具有搜索、过滤和分页功能。

## 功能特性

- 🔍 **智能搜索**: 支持按姓名、ID、职位、手机号搜索
- 🎯 **多维度过滤**: 按国籍、职位、性别、年龄范围过滤
- 📱 **响应式设计**: 适配各种屏幕尺寸
- 🌊 **波浪背景**: 动态波浪背景效果
- 🎨 **现代化UI**: 毛玻璃效果和优雅的卡片设计
- 📄 **分页显示**: Element UI分页组件
- 🔐 **Session验证**: URL参数session验证和错误处理

## Session验证

系统支持通过URL参数进行session验证：

### 验证规则
- URL必须包含 `sessionid` 或 `sessionId` 参数
- Session ID格式：至少8位，包含字母和数字
- 示例：`?sessionid=abc123def456`

### 错误处理
- 无session ID：显示"Session Validation Failed"
- 格式错误：显示"Invalid session ID format"
- 服务器验证失败：显示"Session validation failed on server"

### 使用示例
```
http://localhost:3000/personal-database?sessionid=abc123def456
http://localhost:3000/vehicle-database?sessionId=xyz789ghi012
```

## 技术栈

- Vue 3 + TypeScript
- Vite
- Element Plus
- CSS3 (毛玻璃效果、动画)

## 快速开始

### 安装依赖
```bash
npm install
```
test push test

### 启动开发服务器
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

## 项目结构

```
employee-database/
├── src/
│   ├── components/
│   │   ├── WaveBackground.vue    # 波浪背景组件
│   │   ├── NavigationBar.vue     # 导航栏组件
│   │   └── SessionGuard.vue      # Session验证守卫
│   ├── views/
│   │   ├── EmployeeDatabase.vue  # 员工数据库页面
│   │   ├── VehicleDatabase.vue   # 车辆数据库页面
│   │   ├── Analytics.vue         # 数据分析页面
│   │   ├── Settings.vue          # 设置页面
│   │   └── ErrorPage.vue         # 错误页面
│   ├── utils/
│   │   └── sessionValidator.ts   # Session验证工具
│   ├── types/
│   │   └── index.ts              # TypeScript类型定义
│   ├── router/
│   │   └── index.ts              # 路由配置
│   ├── App.vue                   # 根组件
│   └── main.ts                   # 应用入口
├── package.json
├── vite.config.ts
└── README.md
```

## 主要功能

### Session验证
- URL参数验证
- 格式检查
- 服务器端验证（模拟）
- 错误页面跳转

### 搜索功能
- 实时搜索，支持模糊匹配
- 可搜索字段：姓名、ID、职位、手机号

### 过滤功能
- 国籍过滤
- 职位过滤  
- 性别过滤
- 年龄范围过滤

### 分页功能
- 每页显示12个员工卡片
- 支持页码跳转
- 显示总记录数

### 数据展示
- 员工头像
- 基本信息（姓名、职位、邮箱）
- 详细信息（ID、手机号、性别、年龄、国籍）

## 样式特点

- **毛玻璃效果**: 使用 `backdrop-filter: blur()` 实现
- **波浪背景**: Canvas绘制的动态波浪效果
- **悬浮动画**: 卡片悬浮时的阴影和位移效果
- **响应式布局**: 自适应网格布局

## 错误处理

系统包含完整的错误处理机制：

### 错误类型
- **Session错误**: 验证失败或格式错误
- **网络错误**: 连接问题
- **权限错误**: 访问被拒绝
- **通用错误**: 其他未知错误

### 错误页面功能
- 错误类型识别
- 详细错误信息
- 错误代码生成
- 返回和刷新按钮
- 技术支持信息

## 浏览器支持

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 开发说明

项目使用 Vue 3 Composition API 和 TypeScript，确保类型安全。所有组件都经过优化，支持良好的性能和用户体验。

### Session验证流程
1. 页面加载时检查URL参数
2. 验证session ID格式
3. 可选：调用服务器验证
4. 验证失败跳转错误页面
5. 验证成功显示正常内容 