# VehicleDetailDialog Component

## 概述

`VehicleDetailDialog` 是一个专门用于显示车辆详细信息的对话框组件，包含车辆基础信息、技术参数、注册信息、变更记录、维护记录和使用记录等。

## 功能特性

- **车辆基本信息**: 显示车辆ID、类型、车牌号、品牌、型号、年份、颜色、状态等
- **技术参数**: 发动机类型、排量、燃料类型、变速箱、里程、最高速度、油箱容量、座位数等
- **注册信息**: 注册日期、注册号、到期日期、保险公司、保险到期日期
- **注册人信息**: 注册人的详细信息，包括头像、姓名、员工ID、部门、联系方式等
- **变更记录**: 车辆所有权、状态、车牌号等变更历史
- **维护记录**: 保养、维修、检查等服务记录
- **使用记录**: 车辆使用情况，包括驾驶员、用途、目的地、里程、油耗等
- **分页支持**: 所有数据表格都支持分页
- **响应式设计**: 适配不同屏幕尺寸
- **玻璃态设计**: 现代化的UI设计风格

## 使用方法

### 基本用法

```vue
<template>
  <div>
    <!-- 触发按钮 -->
    <button @click="showDialog = true">查看车辆详情</button>
    
    <!-- 车辆详情对话框 -->
    <VehicleDetailDialog
      v-model="showDialog"
      :vehicle="selectedVehicle"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VehicleDetailDialog from '@/components/VehicleDetailDialog.vue'

const showDialog = ref(false)
const selectedVehicle = ref({
  id: 'VEH-2024-001',
  type: 'Company Car',
  licensePlate: 'ABC-1234',
  brand: 'Toyota',
  model: 'Camry',
  year: 2023,
  color: 'White',
  status: 'Active',
  image: 'https://example.com/vehicle.jpg'
})
</script>
```

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| modelValue | Boolean | false | 控制对话框显示/隐藏 |
| vehicle | Object \| null | null | 车辆数据对象 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| update:modelValue | Boolean | 对话框显示状态变化时触发 |

## 车辆数据格式

```typescript
interface Vehicle {
  id: string
  type: string
  licensePlate: string
  brand: string
  model: string
  year: number
  color: string
  status: string
  image: string
}
```

## 组件内部数据

组件内部会自动生成以下模拟数据：

### 技术参数
- **发动机类型**: V6、I4、Electric等
- **发动机排量**: 2.0L、3.0L、4.0L等
- **燃料类型**: Gasoline、Diesel、Electric等
- **变速箱**: Automatic、Manual、Single Speed等
- **里程**: 当前行驶里程
- **最高速度**: 车辆最高时速
- **油箱容量**: 燃料箱容量
- **座位数**: 车辆座位数量

### 注册信息
- **注册日期**: 车辆注册日期
- **注册号**: 车辆注册号码
- **到期日期**: 注册到期日期
- **保险公司**: 保险提供商
- **保险到期**: 保险到期日期

### 注册人信息
- **姓名**: 注册人姓名
- **员工ID**: 员工编号
- **部门**: 所属部门
- **电话**: 联系电话
- **邮箱**: 电子邮箱
- **头像**: 注册人头像

### 变更记录
- **变更日期**: 变更发生日期
- **变更类型**: 所有权变更、状态更新、车牌变更等
- **原值**: 变更前的值
- **新值**: 变更后的值
- **变更原因**: 变更的原因说明
- **变更人**: 执行变更的人员

### 维护记录
- **服务日期**: 维护服务日期
- **服务类型**: 保养、维修、检查等
- **描述**: 服务详细描述
- **费用**: 服务费用
- **服务商**: 服务提供商
- **下次服务**: 下次服务日期

### 使用记录
- **使用日期**: 车辆使用日期
- **驾驶员**: 使用车辆的驾驶员
- **用途**: 使用目的
- **目的地**: 行驶目的地
- **里程**: 行驶里程
- **油耗**: 消耗的燃料量

## 样式定制

组件使用玻璃态设计风格，主要样式特点：

- 半透明背景 (`rgba(255, 255, 255, 0.8)`)
- 模糊效果 (`backdrop-filter: blur(20px)`)
- 圆角设计 (`border-radius: 12px`)
- 阴影效果 (`box-shadow`)
- 技术参数网格布局
- 注册信息双列布局

## 响应式支持

- **桌面端**: 完整布局，多列显示
- **平板端**: 调整列数和间距
- **手机端**: 单列布局，优化触摸体验

## 示例页面

参考以下页面了解完整的使用示例：

- `VehicleDatabase.vue` - 车辆数据库页面

## 注意事项

1. 确保传入的车辆对象包含所有必需的字段
2. 组件会自动处理数据为空的情况
3. 所有表格都支持分页，每页显示5条记录
4. 对话框宽度为80%，最大高度为70vh
5. 内容区域支持滚动，适合大量数据展示
6. 车辆图片建议使用400x300像素的尺寸
7. 技术参数会根据车辆类型自动生成
8. 注册人信息会随机生成不同的员工信息 