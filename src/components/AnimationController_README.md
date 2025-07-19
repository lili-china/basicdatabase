# 背景动画控制器

## 概述

背景动画控制器允许用户通过导航栏中的按钮来控制波浪背景动画的播放和暂停，提供更好的用户体验和性能控制。动画状态是全局的，在页面切换时会保持状态。

## 功能特性

### 🎮 动画控制
- **播放/暂停切换** - 一键控制背景动画
- **实时响应** - 立即生效，无需刷新页面
- **全局状态** - 动画状态在页面切换时保持
- **本地存储** - 动画状态保存到localStorage
- **性能优化** - 暂停时停止所有动画计算

### 🎨 视觉反馈
- **动态图标** - 播放/暂停图标根据状态变化
- **悬停效果** - 按钮悬停时有缩放和颜色变化
- **工具提示** - 显示当前操作提示

## 使用方法

### 1. 基本控制
```vue
<!-- 在导航栏中自动显示 -->
<button class="animation-toggle-btn" @click="toggleAnimation">
  <!-- 播放图标 (动画暂停时) -->
  <svg v-if="isAnimationPaused">
    <polygon points="5,3 19,12 5,21" />
  </svg>
  <!-- 暂停图标 (动画播放时) -->
  <svg v-else>
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
</button>
```

### 2. 全局状态管理
```typescript
// 使用全局动画管理器
import { isAnimationPaused, toggleAnimation } from '@/utils/animationManager'

// 动画状态是全局的，自动同步
const isAnimationPaused = ref(false) // 从全局管理器导入

// 切换动画状态
const toggleAnimation = () => {
  // 调用全局管理器的切换函数
  toggleAnimation()
}
```

### 3. 全局状态同步
```typescript
// 在WaveBackground组件中检查全局状态
mounted() {
  // 检查全局动画状态，如果暂停则不启动动画
  const isPaused = localStorage.getItem('animationPaused') === 'true'
  if (!isPaused) {
    this.startAnimation()
  }
}

// 监听全局事件
setupAnimationControlListener() {
  this.handleAnimationControl = (event) => {
    const { paused } = event.detail
    if (paused) {
      this.stopAnimation()
    } else {
      this.startAnimation()
    }
  }
  window.addEventListener('toggleBackgroundAnimation', this.handleAnimationControl)
}
```

## 技术实现

### 全局状态管理
```typescript
// 全局动画状态管理器
const isAnimationPaused = ref(false)

// 切换动画状态
const toggleAnimation = () => {
  isAnimationPaused.value = !isAnimationPaused.value
  
  // 触发全局事件
  window.dispatchEvent(new CustomEvent('toggleBackgroundAnimation', {
    detail: { paused: isAnimationPaused.value }
  }))
  
  // 保存到localStorage
  localStorage.setItem('animationPaused', isAnimationPaused.value.toString())
}

// 初始化时从localStorage恢复状态
const initAnimationState = () => {
  const savedState = localStorage.getItem('animationPaused')
  if (savedState !== null) {
    isAnimationPaused.value = savedState === 'true'
  }
}
```

### 事件通信机制
```typescript
// 发送动画控制事件
window.dispatchEvent(new CustomEvent('toggleBackgroundAnimation', {
  detail: { paused: boolean }
}))

// 监听动画控制事件
window.addEventListener('toggleBackgroundAnimation', (event) => {
  const { paused } = event.detail
  // 处理动画状态
})
```

### 动画状态管理
```typescript
// 动画状态
const isActive = ref(false)
const isVisible = ref(true)

// 开始动画
const startAnimation = () => {
  if (!this.isActive && this.isVisible) {
    this.isActive = true
    this.drawWave()
  }
}

// 停止动画
const stopAnimation = () => {
  this.isActive = false
  if (this.animationId) {
    cancelAnimationFrame(this.animationId)
    this.animationId = null
  }
}
```

## 样式设计

### 按钮样式
```css
.animation-toggle-btn {
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.2s ease;
  margin-right: 0.5rem;
}

.animation-toggle-btn:hover {
  color: var(--accent-primary);
  background: var(--accent-secondary);
  transform: scale(1.05);
}
```

### 图标动画
```css
.animation-icon {
  transition: all 0.3s ease;
}

.animation-toggle-btn:hover .animation-icon {
  transform: scale(1.1);
}
```

## 响应式适配

### 移动端优化
```css
@media (max-width: 768px) {
  .animation-toggle-btn {
    width: 36px;
    height: 36px;
    margin-right: 0.25rem;
  }
}

@media (max-width: 480px) {
  .animation-toggle-btn {
    width: 32px;
    height: 32px;
    margin-right: 0.125rem;
  }
}
```

## 性能优化

### 1. 动画暂停
- 停止requestAnimationFrame循环
- 减少CPU使用率
- 节省电池电量

### 2. 事件清理
```typescript
beforeDestroy() {
  this.removeAnimationControlListener()
}
```

### 3. 内存管理
- 及时清理事件监听器
- 避免内存泄漏
- 优化组件销毁

## 用户体验

### 1. 视觉反馈
- 图标状态变化
- 悬停效果
- 工具提示

### 2. 操作便利
- 一键切换
- 即时响应
- 状态保持

### 3. 性能考虑
- 低性能设备友好
- 电池续航优化
- 流畅的用户体验

## 故障排除

### 常见问题

1. **动画不响应控制**
   - 检查事件监听器是否正确设置
   - 确认事件名称匹配
   - 验证组件生命周期

2. **按钮状态不同步**
   - 检查状态管理逻辑
   - 确认事件传递正确
   - 验证响应式数据绑定

3. **性能问题**
   - 确认动画正确暂停
   - 检查事件监听器清理
   - 验证内存使用情况

### 调试方法

```javascript
// 检查动画状态
console.log('Animation paused:', isAnimationPaused.value)

// 检查事件监听
window.addEventListener('toggleBackgroundAnimation', (event) => {
  console.log('Animation control event:', event.detail)
})

// 检查动画循环
console.log('Animation active:', isActive.value)
```

## 最佳实践

### 1. 状态管理
```typescript
// 使用响应式状态
const isAnimationPaused = ref(false)

// 状态变化时触发事件
watch(isAnimationPaused, (newValue) => {
  // 处理状态变化
})
```

### 2. 事件通信
```typescript
// 使用CustomEvent进行组件间通信
const event = new CustomEvent('toggleBackgroundAnimation', {
  detail: { paused: boolean }
})
window.dispatchEvent(event)
```

### 3. 生命周期管理
```typescript
// 组件挂载时设置监听
mounted() {
  this.setupAnimationControlListener()
}

// 组件销毁时清理
beforeDestroy() {
  this.removeAnimationControlListener()
}
```

## 总结

背景动画控制器提供了：

1. **用户控制** - 让用户自主控制动画播放
2. **全局状态** - 动画状态在页面切换时保持
3. **本地存储** - 动画状态持久化保存
4. **性能优化** - 暂停时减少资源消耗
5. **视觉反馈** - 清晰的状态指示和波浪图标
6. **响应式设计** - 适配不同屏幕尺寸
7. **事件通信** - 组件间的解耦通信

通过这个控制器，用户可以根据自己的喜好和设备性能来控制背景动画，提供更好的用户体验。动画状态是全局的，切换页面时不会重新开始动画。 