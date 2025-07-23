# ISP Database Components

这个文件夹包含了 ISP 数据库功能相关的专用组件。

## 组件列表

### MapHeatmap.vue
- **功能**: 热力图组件
- **用途**: 显示用户活动热力图
- **特性**: 
  - 支持谷歌地图图层切换
  - 可配置热力点权重
  - 响应式设计

### MapTrack.vue  
- **功能**: 轨迹图组件
- **用途**: 显示用户活动轨迹
- **特性**:
  - 支持轨迹播放动画
  - 头像覆盖层显示
  - 数据列表面板
  - 图层切换功能

### LocationMarker.vue
- **功能**: 位置标记组件
- **用途**: 显示固定位置信息
- **特性**:
  - 闪光动画效果
  - 头像覆盖层
  - 谷歌地图支持
  - 图层切换功能

### ISPDetailPage.vue
- **功能**: ISP详情页面组件
- **用途**: 显示完整的ISP信息页面
- **特性**:
  - 基本信息展示
  - 通话记录管理
  - 活动热力图
  - 活动轨迹图
  - 固网位置信息
  - 日期范围过滤
  - 折叠面板交互

## 使用方式

```typescript
// 统一导入
import { MapHeatmap, MapTrack, LocationMarker, ISPDetailPage } from '@/components/isp-database'

// 或者单独导入
import MapHeatmap from '@/components/isp-database/MapHeatmap.vue'
import MapTrack from '@/components/isp-database/MapTrack.vue'
import LocationMarker from '@/components/isp-database/LocationMarker.vue'
import ISPDetailPage from '@/components/isp-database/ISPDetailPage.vue'
```

## 依赖关系

这些组件依赖于以下公用组件（不在此文件夹中）：
- `NavigationBar` - 导航栏组件
- `WaveBackground` - 波浪背景组件  
- `UserDetailDialog` - 用户详情对话框

## 技术栈

- Vue 3 Composition API
- OpenLayers (地图功能)
- Element Plus (UI组件)
- TypeScript 