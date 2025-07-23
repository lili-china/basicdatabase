<template>
  <div class="map-heatmap-container">
    <div ref="mapContainer" class="map-heatmap"></div>
    <!-- 悬浮控制面板，仅图层切换 -->
    <div class="floating-control-panel">
      <button @click="toggleLayer" class="control-btn layer-btn" :class="{ active: currentLayer === 'satellite' }" title="切换地图图层">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
          <path d="M2 12h20" stroke="currentColor" stroke-width="2"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" stroke-width="2"/>
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
  }
})

const currentLayer = ref('osm')
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

  // 构建热力点
  const features = (props.points || []).map((item: any) => {
    // item: { lon, lat, weight }
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
}

onMounted(async () => {
  await nextTick()
  renderMap()
})

watch(() => props.points, () => {
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
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 1000;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: visible;
  min-width: 60px;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.control-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
}

.control-btn:hover {
  transform: translateY(-3px);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

.layer-btn {
  background: rgba(99, 102, 241, 0.2);
  color: #6366f1;
}

.layer-btn:hover {
  background: rgba(99, 102, 241, 0.3);
  color: white;
}

.layer-btn.active {
  background: rgba(37, 99, 235, 0.3);
  color: white;
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

.map-heatmap {
  width: 100%;
  height: 400px;
  margin-top: 2rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.ol-zoom,
.ol-control,
.ol-unselectable {
  display: none !important;
}
</style> 