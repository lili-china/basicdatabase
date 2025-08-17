<template>
  <div class="map-heatmap-container">
    <div ref="mapContainer" class="map-heatmap"></div>
         <!-- 悬浮控制面板 -->
     <div class="floating-control-panel">
       <button @click="toggleLayer" class="control-btn layer-btn" :class="{ active: currentLayer === 'satellite' }" title="Change Map View">
         <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
           <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
           <path d="M2 12h20" stroke="currentColor" stroke-width="2"/>
           <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" stroke-width="2"/>
         </svg>
       </button>
       <button @click="toggleFullscreen" class="control-btn fullscreen-btn" :title="isFullscreen ? 'exit fullscreen' : 'fullscreen'">
         <svg v-if="!isFullscreen" width="18" height="18" viewBox="0 0 24 24" fill="none">
           <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
         </svg>
         <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none">
           <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
         </svg>
       </button>
     </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import HeatmapLayer from 'ol/layer/Heatmap'
import TileLayer from 'ol/layer/Tile'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { fromLonLat } from 'ol/proj'
import XYZ from 'ol/source/XYZ'
import '@/style/hide-ol-control.css'

const props = defineProps({
  points: {
    type: Array,
    default: () => []
  },
  // 保持向后兼容，同时支持新的数据格式
  trackPoints: {
    type: Array,
    default: () => []
  }
})

const currentLayer = ref('osm')
const isFullscreen = ref(false)
const MAP_URL = 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'
const SATELLITE_URL = 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'

const toggleLayer = () => {
  if (!baseLayer || !map) return
  if (currentLayer.value === 'osm') {
    baseLayer.setSource(new XYZ({
      url: SATELLITE_URL,
      maxZoom: 18
    }))
    currentLayer.value = 'satellite'
  } else {
    baseLayer.setSource(new XYZ({
      url: MAP_URL,
      maxZoom: 18
    }))
    currentLayer.value = 'osm'
  }
  map.updateSize()
  if (map.renderSync) map.renderSync()
}

const toggleFullscreen = () => {
  if (!mapContainer.value) return
  
  if (!isFullscreen.value) {
    // 进入全屏
    if (mapContainer.value.requestFullscreen) {
      mapContainer.value.requestFullscreen()
    } else if ((mapContainer.value as any).webkitRequestFullscreen) {
      (mapContainer.value as any).webkitRequestFullscreen()
    } else if ((mapContainer.value as any).msRequestFullscreen) {
      (mapContainer.value as any).msRequestFullscreen()
    }
  } else {
    // 退出全屏
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen()
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen()
    }
  }
}

const mapContainer = ref<HTMLDivElement | null>(null)
let map: Map | null = null
let vectorSource: VectorSource | null = null
let heatmapLayer: HeatmapLayer | null = null
let baseLayer: TileLayer | null = null

// 预留方法：后期可替换为内网地图服务
// 注意：此方法为组件内部预留，不会在外部调用
const getMap = () => map

const renderMap = () => {
  if (!mapContainer.value) return

  // 构建热力点 - 支持多种数据格式
  const dataPoints = props.trackPoints?.length > 0 ? props.trackPoints : props.points
  const features = (dataPoints || []).map((item: any) => {
    // 支持的数据格式：
    // 1. { lon, lat, weight } - 热力图格式
    // 2. { lon, lat, timestamp, location, ... } - 轨迹格式
    return new Feature({
      geometry: new Point(fromLonLat([item.lon, item.lat])),
      weight: item.weight || 1
    })
  })

  vectorSource = new VectorSource({
    features
  })

  heatmapLayer = new HeatmapLayer({
    source: vectorSource,
    blur: 20,
    radius: 15
  })
  heatmapLayer.set('name', 'heatmap')

  baseLayer = new TileLayer({
    source: new XYZ({ url: MAP_URL, maxZoom: 18 })
  })
  baseLayer.set('name', 'base')

  map = new Map({
    target: mapContainer.value,
    layers: [
      baseLayer,
      heatmapLayer
    ],
    view: new View({
      center: fromLonLat([57.5, 21.5]), // 默认阿曼中心
      zoom: 6
    })
  })
  
  // 确保地图正确渲染
  setTimeout(() => {
    if (map) {
      map.updateSize()
    }
  }, 100)
}

onMounted(async () => {
  await nextTick()
  renderMap()
  
  // 监听全屏状态变化
  const handleFullscreenChange = () => {
    isFullscreen.value = !!(document.fullscreenElement || (document as any).webkitFullscreenElement || (document as any).msFullscreenElement)
    setTimeout(() => {
      if (map) {
        map.updateSize()
      }
    }, 100)
  }
  
  document.addEventListener('fullscreenchange', handleFullscreenChange)
  document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
  document.addEventListener('msfullscreenchange', handleFullscreenChange)
  
  // 清理事件监听器
  onUnmounted(() => {
    document.removeEventListener('fullscreenchange', handleFullscreenChange)
    document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
    document.removeEventListener('msfullscreenchange', handleFullscreenChange)
  })
})

watch(() => [props.points, props.trackPoints], () => {
  // 清理旧的地图资源
  if (map) {
    map.setTarget(undefined)
    map = null
  }
  
  // 清理图层资源
  if (heatmapLayer) {
    heatmapLayer.setSource(null)
    heatmapLayer = null
  }
  
  if (vectorSource) {
    vectorSource.clear()
    vectorSource = null
  }
  
  renderMap()
})

// 组件卸载时清理资源
onUnmounted(() => {
  // 清理地图
  if (map) {
    map.setTarget(undefined)
    map = null
  }
  
  // 清理图层资源
  if (heatmapLayer) {
    heatmapLayer.setSource(null)
    heatmapLayer = null
  }
  
  if (vectorSource) {
    vectorSource.clear()
    vectorSource = null
  }
  
  if (baseLayer) {
    baseLayer.setSource(null)
    baseLayer = null
  }
})

// 预留方法：后期可替换为内网地图服务
// 注意：此方法为组件内部预留，不会在外部调用
</script>

<style scoped>
.map-heatmap-container {
  width: 100%;
  position: relative;
}

.floating-control-panel {
  position: absolute;
  top: 10px;
  right: 5px;
  background: var(--bg-card);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-radius: 20px;
  box-shadow: var(--shadow-card), 0 0 0 1px var(--border-card), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  border: 1px solid var(--border-card);
  z-index: 1000;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: visible;
  min-width: 60px;
  width: 60px;
  height: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 8px 0;
}

.control-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 14px;
  background: var(--bg-secondary);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-card-light), 0 0 0 1px var(--border-card), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  border: 1px solid var(--border-card);
  position: relative;
}

.control-btn:hover {
  transform: translateY(-1px);
  background: var(--accent-secondary);
  box-shadow: var(--shadow-card), 0 0 0 1px var(--accent-primary), inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.layer-btn {
  background: var(--accent-secondary);
  color: var(--accent-primary);
}

.layer-btn:hover {
  background: var(--accent-hover);
  color: var(--accent-primary);
}

.layer-btn.active {
  background: var(--accent-primary);
  color: white;
  box-shadow: var(--shadow-card), 0 0 0 1px var(--accent-primary), inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.fullscreen-btn {
  background: var(--accent-secondary);
  color: var(--accent-primary);
}

.fullscreen-btn:hover {
  background: var(--accent-hover);
  color: var(--accent-primary);
}


.fullscreen-btn.active {
  background: var(--accent-primary);
  color: white;
  box-shadow: var(--shadow-card), 0 0 0 1px var(--accent-primary), inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.map-heatmap {
  width: 100%;
  height: 550px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow-card);
  border: 1px solid var(--border-card);
}

.ol-zoom,
.ol-control,
.ol-unselectable {
  display: none !important;
}
</style> 