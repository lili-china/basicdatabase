# personDetailPage 组件

## 概述

`personDetailPage` 是一个可复用的用户详情对话框组件，用于显示用户的详细信息，包括基本信息、变更记录、家庭成员、投资信息等。

## 功能特性

- **基本信息展示**: 显示用户头像、ID、姓名、职位、邮箱、电话、性别、年龄、国籍等
- **变更记录**: 身份信息、手机号、车辆信息的变更历史
- **关联信息**: 家庭成员、投资信息、社交媒体账号
- **分页支持**: 所有数据表格都支持分页
- **响应式设计**: 适配不同屏幕尺寸
- **玻璃态设计**: 现代化的UI设计风格

## 使用方法

### 基本用法

```vue
<template>
  <div>
    <!-- 触发按钮 -->
    <button @click="showDialog = true">查看用户详情</button>
    
    <!-- 用户详情对话框 -->
    <personDetailPage
      v-model="showDialog"
      :user="selectedUser"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import personDetailPage from '@/components/personDetailPage.vue'

const showDialog = ref(false)
const selectedUser = ref({
  id: 'EMP-2024-001',
  name: 'John Smith',
  position: 'Software Engineer',
  email: 'john.smith@company.com',
  phone: '+1 (555) 123-4567',
  gender: 'Male',
  age: 30,
  nationality: 'American',
  avatar: 'https://example.com/avatar.jpg'
})
</script>
```

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| modelValue | Boolean | false | 控制对话框显示/隐藏 |
| user | Object \| null | null | 用户数据对象 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:modelValue | Boolean | 对话框显示状态变化时触发 |

## 用户数据格式

```typescript
interface User {
  id: string
  name: string
  position: string
  email: string
  phone: string
  gender: string
  age: number
  nationality: string
  avatar: string
}
```

## 组件内部数据

组件内部会自动生成以下模拟数据：

- **身份变更记录**: 姓名、国籍、ID号等变更历史
- **手机号变更记录**: 包含之前使用者的头像和姓名
- **车辆信息变更记录**: 车辆类型、信息变更历史
- **家庭成员**: 配偶、子女、父母等家庭成员信息
- **投资信息**: 股票、房地产、加密货币等投资记录
- **社交媒体账号**: LinkedIn、Twitter、GitHub等平台账号

## 样式定制

组件使用玻璃态设计风格，主要样式特点：

- 半透明背景 (`rgba(255, 255, 255, 0.8)`)
- 模糊效果 (`backdrop-filter: blur(20px)`)
- 圆角设计 (`border-radius: 12px`)
- 阴影效果 (`box-shadow`)

## 响应式支持

- **桌面端**: 完整布局，多列显示
- **平板端**: 调整列数和间距
- **手机端**: 单列布局，优化触摸体验

## 示例页面

参考以下页面了解完整的使用示例：

- `PersonalDatabase.vue` - 个人数据库页面
- `VehicleDatabase.vue` - 车辆数据库页面

## 注意事项

1. 确保传入的用户对象包含所有必需的字段
2. 组件会自动处理数据为空的情况
3. 所有表格都支持分页，每页显示5条记录
4. 对话框宽度为80%，最大高度为70vh
5. 内容区域支持滚动，适合大量数据展示 