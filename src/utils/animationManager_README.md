# 动画管理器使用指南

## 概述

`animationManager.ts` 提供了一个通用的数字动画解决方案，支持多种缓动函数和批量动画管理。

## 主要功能

### 1. 单个数字动画

```typescript
import { animateNumber, Easing } from '@/utils/animationManager'

// 基本用法
const animator = animateNumber(0, 1000, {
  duration: 2000,
  easing: Easing.easeOutQuart,
  onUpdate: (value) => {
    // 更新显示的值
    count.value = value
  },
  onComplete: () => {
    console.log('动画完成')
  }
})

animator.start()
```

### 2. 批量数字动画

```typescript
import { createBatchAnimator, Easing } from '@/utils/animationManager'

const batchAnimator = createBatchAnimator()

// 添加多个动画
batchAnimator.addAnimator(0, 1250, {
  duration: 2000,
  easing: Easing.easeOutQuart,
  onUpdate: (value) => personalCount.value = value
})

batchAnimator.addAnimator(0, 856, {
  duration: 2000,
  easing: Easing.easeOutQuart,
  onUpdate: (value) => vehicleCount.value = value
})

// 启动所有动画
batchAnimator.startAll()
```

### 3. 带格式化的数字动画

```typescript
import { animateFormattedNumber } from '@/utils/animationManager'

// 带千位分隔符的动画
const animator = animateFormattedNumber(0, 1000000, {
  duration: 2000,
  format: 'number', // 显示为 1,000,000
  onUpdate: (value) => {
    // value 是数字，但可以格式化为字符串
    displayValue.value = value.toLocaleString()
  }
})

// 大数字格式化动画
const largeAnimator = animateFormattedNumber(0, 1500000, {
  duration: 2000,
  format: 'large', // 显示为 1.5M
  onUpdate: (value) => {
    displayValue.value = value
  }
})
```

## 缓动函数

### 线性缓动
- `Easing.linear` - 线性变化

### 二次缓动
- `Easing.easeInQuad` - 缓入
- `Easing.easeOutQuad` - 缓出
- `Easing.easeInOutQuad` - 缓入缓出

### 三次缓动
- `Easing.easeInCubic` - 缓入
- `Easing.easeOutCubic` - 缓出
- `Easing.easeInOutCubic` - 缓入缓出

### 四次缓动
- `Easing.easeInQuart` - 缓入
- `Easing.easeOutQuart` - 缓出（推荐用于数字动画）
- `Easing.easeInOutQuart` - 缓入缓出

### 弹性缓动
- `Easing.easeInElastic` - 弹性缓入
- `Easing.easeOutElastic` - 弹性缓出

### 弹跳缓动
- `Easing.easeInBounce` - 弹跳缓入
- `Easing.easeOutBounce` - 弹跳缓出

## 配置选项

```typescript
interface NumberAnimationConfig {
  duration?: number      // 动画持续时间（毫秒），默认 2000
  easing?: EasingFunction // 缓动函数，默认 easeOutQuart
  delay?: number         // 延迟开始时间（毫秒），默认 0
  onUpdate?: (value: number) => void // 更新回调
  onComplete?: () => void // 完成回调
}
```

## 在Vue组件中使用

```vue
<template>
  <div>
    <div class="stat-value">{{ count }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { animateNumber, Easing } from '@/utils/animationManager'

const count = ref(0)

onMounted(() => {
  const animator = animateNumber(0, 1250, {
    duration: 2000,
    easing: Easing.easeOutQuart,
    onUpdate: (value) => {
      count.value = value
    }
  })
  
  animator.start()
})
</script>
```

## 高级用法

### 1. 自定义缓动函数

```typescript
const customEasing = (t: number) => {
  // 自定义缓动逻辑
  return Math.sin(t * Math.PI / 2)
}

const animator = animateNumber(0, 1000, {
  easing: customEasing,
  onUpdate: (value) => count.value = value
})
```

### 2. 链式动画

```typescript
const animator1 = animateNumber(0, 500, {
  duration: 1000,
  onComplete: () => {
    // 第一个动画完成后启动第二个
    animator2.start()
  }
})

const animator2 = animateNumber(500, 1000, {
  duration: 1000
})

animator1.start()
```

### 3. 响应式动画

```typescript
import { watch } from 'vue'

// 监听数据变化，自动启动动画
watch(() => targetValue.value, (newValue) => {
  const animator = animateNumber(currentValue.value, newValue, {
    duration: 1000,
    onUpdate: (value) => currentValue.value = value
  })
  animator.start()
})
```

## 性能优化

1. **使用 `requestAnimationFrame`** - 动画管理器内部使用 `requestAnimationFrame` 确保流畅的动画
2. **自动清理** - 动画完成或停止时会自动清理资源
3. **批量管理** - 使用 `BatchNumberAnimator` 可以统一管理多个动画

## 注意事项

1. 动画会在组件卸载时自动停止
2. 可以随时调用 `stop()` 方法停止动画
3. 缓动函数 `Easing.easeOutQuart` 特别适合数字动画，提供自然的减速效果
4. 大数字建议使用 `formatLargeNumber` 函数进行格式化显示 