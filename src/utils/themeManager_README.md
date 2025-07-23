# Theme Manager - 全局主题管理系统

## 概述

主题管理器是一个全局的主题切换系统，支持亮色模式和暗色模式的自动切换，无需在每个页面单独添加主题切换功能。

## 功能特性

### 🌙 自动主题切换
- 支持亮色/暗色模式切换
- 自动跟随系统主题设置
- 本地存储主题偏好
- 平滑过渡动画

### 🎨 全局CSS变量
- 统一的颜色系统
- 自动适配所有组件
- 支持玻璃态效果
- 响应式设计

## 使用方法

### 1. 自动初始化
主题管理器在应用启动时自动初始化，无需手动调用：

```typescript
// App.vue 中自动导入
import { currentTheme } from './utils/themeManager'
```

### 2. 导航栏切换按钮
在NavigationBar组件中已集成主题切换按钮：

```vue
<template>
  <button @click="toggleTheme" class="theme-toggle">
    <svg v-if="currentTheme === 'dark'">
      <!-- 太阳图标 -->
    </svg>
    <svg v-else>
      <!-- 月亮图标 -->
    </svg>
  </button>
</template>
```

### 3. CSS变量系统
所有组件自动使用CSS变量，无需手动设置：

```css
/* 自动适配主题 */
.my-component {
  background: var(--bg-card);
  color: var(--text-primary);
  border: 1px solid var(--border-card);
  box-shadow: var(--shadow-card);
}
```

## CSS变量列表

### 背景颜色
- `--bg-primary`: 主背景色
- `--bg-secondary`: 次要背景色
- `--bg-tertiary`: 第三级背景色
- `--bg-card`: 卡片背景色
- `--bg-dialog`: 对话框背景色

### 文字颜色
- `--text-primary`: 主要文字颜色
- `--text-secondary`: 次要文字颜色
- `--text-tertiary`: 第三级文字颜色
- `--text-muted`: 静音文字颜色

### 边框和阴影
- `--border-primary`: 主要边框颜色
- `--border-secondary`: 次要边框颜色
- `--border-card`: 卡片边框颜色
- `--shadow-primary`: 主要阴影
- `--shadow-secondary`: 次要阴影
- `--shadow-card`: 卡片阴影
- `--shadow-dialog`: 对话框阴影

### 强调色
- `--accent-primary`: 主要强调色
- `--accent-secondary`: 次要强调色
- `--accent-hover`: 悬停强调色

### 特殊效果
- `--wave-bg`: 波浪背景渐变
- `--wave-overlay`: 波浪覆盖层

## 主题切换流程

1. **用户点击切换按钮**
   - NavigationBar中的主题切换按钮
   - 支持键盘快捷键（可选）

2. **主题状态更新**
   - 更新currentTheme状态
   - 修改document.documentElement的class
   - 保存到localStorage

3. **CSS变量自动切换**
   - 亮色模式：使用:root中的变量
   - 暗色模式：使用.dark中的变量
   - 所有组件自动适配

4. **组件重新渲染**
   - Vue组件自动响应CSS变量变化
   - 无需手动触发更新

## 支持的组件

### 已适配的组件
- ✅ NavigationBar - 导航栏
- ✅ WaveBackground - 波浪背景
- ✅ PersonalDatabase - 个人数据库页面
- ✅ VehicleDatabase - 车辆数据库页面
- ✅ Dashboard - 仪表板页面
- ✅ Analytics - 分析页面
- ✅ Settings - 设置页面
- ✅ ErrorPage - 错误页面
- ✅ personDetailPage - 用户详情对话框
- ✅ VehicleDetailDialog - 车辆详情对话框

### Element Plus 组件兼容性
- ✅ el-dialog - 对话框
- ✅ el-table - 表格
- ✅ el-pagination - 分页
- ✅ el-select - 选择器
- ✅ el-button - 按钮
- ✅ el-card - 卡片
- ✅ el-input - 输入框
- ✅ el-date-picker - 日期选择器
- ✅ el-tree - 树形组件
- ✅ el-message - 消息提示
- ✅ el-tooltip - 工具提示
- ✅ el-dropdown - 下拉菜单
- ✅ el-tabs - 标签页
- ✅ el-form - 表单

### 自动适配的特性
- 玻璃态背景效果
- 卡片阴影和边框
- 文字颜色层次
- 按钮和交互元素
- 波浪背景颜色
- Element Plus组件主题适配

## 技术实现

### 主题状态管理
```typescript
// 响应式主题状态
const currentTheme = ref<'light' | 'dark'>('light')

// 主题切换函数
const toggleTheme = () => {
  currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
  updateTheme()
}
```

### Element Plus 兼容性
```typescript
// 应用主题到DOM，包括Element Plus
const applyTheme = (theme: Theme) => {
  const root = document.documentElement
  
  if (theme === 'dark') {
    root.classList.add('dark')
    root.setAttribute('data-theme', 'dark')
  } else {
    root.classList.remove('dark')
    root.setAttribute('data-theme', 'light')
  }
  
  localStorage.setItem('theme', theme)
}
```

### CSS变量定义
```css
:root {
  /* 亮色模式变量 */
  --bg-primary: #ffffff;
  --text-primary: #1f2937;
  /* ... 其他变量 */
  
  /* Element Plus 兼容变量 */
  --el-color-primary: #3b82f6;
  --el-bg-color: #ffffff;
  --el-text-color-primary: #1f2937;
  /* ... 其他Element Plus变量 */
}

.dark {
  /* 暗色模式变量 */
  --bg-primary: #111827;
  --text-primary: #f9fafb;
  /* ... 其他变量 */
  
  /* Element Plus 暗色模式变量 */
  --el-color-primary: #60a5fa;
  --el-bg-color: #1f2937;
  --el-text-color-primary: #f9fafb;
  /* ... 其他Element Plus变量 */
}
```

### 自动主题检测
```typescript
// 检测系统主题偏好
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')

// 初始化主题
const initTheme = () => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    currentTheme.value = savedTheme as 'light' | 'dark'
  } else {
    currentTheme.value = prefersDark.matches ? 'dark' : 'light'
  }
  updateTheme()
}
```

## 最佳实践

### 1. 使用CSS变量
```css
/* ✅ 推荐 */
.my-component {
  background: var(--bg-card);
  color: var(--text-primary);
}

/* ❌ 避免 */
.my-component {
  background: #ffffff;
  color: #1f2937;
}
```

### 2. 组件开发
```vue
<template>
  <div class="my-component">
    <!-- 内容 -->
  </div>
</template>

<style scoped>
.my-component {
  /* 自动适配主题 */
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  color: var(--text-primary);
}
</style>
```

### 3. 动态内容
```vue
<script setup>
import { currentTheme } from '@/utils/themeManager'

// 在JavaScript中获取当前主题
const isDark = computed(() => currentTheme.value === 'dark')
</script>
```

## 故障排除

### 常见问题

1. **主题切换不生效**
   - 检查CSS变量是否正确定义
   - 确认组件使用了CSS变量
   - 验证主题管理器是否正确初始化

2. **样式不一致**
   - 确保所有颜色都使用CSS变量
   - 检查是否有硬编码的颜色值
   - 验证暗色模式的变量定义

3. **性能问题**
   - 主题切换是轻量级操作
   - CSS变量切换不会触发组件重新渲染
   - 只在必要时更新DOM

### 调试技巧

```javascript
// 检查当前主题
console.log('Current theme:', currentTheme.value)

// 检查CSS变量
const root = document.documentElement
const bgColor = getComputedStyle(root).getPropertyValue('--bg-primary')
console.log('Background color:', bgColor)
```

## 扩展功能

### 自定义主题
```typescript
// 添加自定义主题
const customTheme = {
  '--bg-primary': '#custom-color',
  '--text-primary': '#custom-text'
}

// 应用自定义主题
const applyCustomTheme = () => {
  Object.entries(customTheme).forEach(([property, value]) => {
    document.documentElement.style.setProperty(property, value)
  })
}
```

### 主题预设
```typescript
// 主题预设
const themePresets = {
  light: { /* 亮色主题变量 */ },
  dark: { /* 暗色主题变量 */ },
  blue: { /* 蓝色主题变量 */ },
  green: { /* 绿色主题变量 */ }
}
```

## 总结

全局主题系统提供了：

1. **零配置使用** - 无需在每个页面添加主题切换
2. **自动适配** - 所有组件自动响应主题变化
3. **统一设计** - 使用CSS变量确保设计一致性
4. **性能优化** - 轻量级切换，不影响性能
5. **用户友好** - 支持系统主题跟随和本地存储
6. **Element Plus兼容** - 完整的Element Plus组件主题适配

通过这个系统，整个应用的主题切换变得简单而统一，用户可以在任何页面自由切换主题，所有组件（包括Element Plus组件）都会自动适配。 