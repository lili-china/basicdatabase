<template>
  <div ref="mapContainer" class="location-marker"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import OSM from 'ol/source/OSM'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { fromLonLat } from 'ol/proj'
import { Style, Circle, Fill, Stroke } from 'ol/style'

interface LocationPoint {
  lon: number
  lat: number
  name?: string
}

const props = defineProps({
  location: {
    type: Object as () => LocationPoint,
    required: true
  },
  zoom: {
    type: Number,
    default: 12
  }
})

const mapContainer = ref<HTMLDivElement | null>(null)
let map: Map | null = null
let animationFrameId: number | null = null
let vectorSource: VectorSource | null = null
let markerLayer: VectorLayer | null = null
let animationLayer: VectorLayer | null = null
let baseLayer: TileLayer | null = null

// 预留方法：后期可替换为内网地图服务
// 注意：此方法为组件内部预留，不会在外部调用
const getMap = () => map

// 创建闪光样式
const createPulseStyle = () => {
  return new Style({
    image: new Circle({
      radius: 5,
      fill: new Fill({
        color: 'rgba(239, 68, 68, 0.9)'
      }),
      stroke: new Stroke({
        color: 'rgba(239, 68, 68, 1)',
        width: 1.5
      })
    })
  })
}

// 创建闪光动画样式
const createPulseAnimationStyle = (timestamp: number) => {
  const pulse = Math.sin(timestamp / 200) * 0.5 + 0.5
  const radius = 5 + pulse * 12
  
  return new Style({
    image: new Circle({
      radius: radius,
      fill: new Fill({
        color: `rgba(239, 68, 68, ${0.4 - pulse * 0.3})`
      }),
      stroke: new Stroke({
        color: `rgba(239, 68, 68, ${0.7 + pulse * 0.3})`,
        width: 1 + pulse * 2
      })
    })
  })
}

const renderMap = () => {
  if (!mapContainer.value || !props.location) return

  // 创建位置点
  const feature = new Feature({
    geometry: new Point(fromLonLat([props.location.lon, props.location.lat]))
  })

  vectorSource = new VectorSource({
    features: [feature]
  })

  // 创建矢量图层
  markerLayer = new VectorLayer({
    source: vectorSource,
    style: createPulseStyle()
  })
  markerLayer.set('name', 'marker')

  // 创建动画图层
  animationLayer = new VectorLayer({
    source: vectorSource,
    style: (feature) => {
      return createPulseAnimationStyle(Date.now())
    }
  })
  animationLayer.set('name', 'animation')

  baseLayer = new TileLayer({
    source: new OSM()
  })
  baseLayer.set('name', 'base')

  map = new Map({
    target: mapContainer.value,
    layers: [
      baseLayer,
      markerLayer,
      animationLayer
    ],
    view: new View({
      center: fromLonLat([props.location.lon, props.location.lat]),
      zoom: props.zoom
    })
  })

  // 启动动画
  const animate = () => {
    if (map && animationLayer) {
      animationLayer.changed()
      animationFrameId = requestAnimationFrame(animate)
    }
  }
  animate()
}

onMounted(async () => {
  await nextTick()
  renderMap()
})

watch(() => props.location, () => {
  // 停止动画
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
  
  // 清理旧的地图资源
  if (map) {
    map.setTarget(undefined)
    map = null
  }
  
  // 清理图层资源
  if (markerLayer) {
    markerLayer.setSource(null)
    markerLayer = null
  }
  
  if (animationLayer) {
    animationLayer.setSource(null)
    animationLayer = null
  }
  
  if (vectorSource) {
    vectorSource.clear()
    vectorSource = null
  }
  
  renderMap()
}, { deep: true })

watch(() => props.zoom, () => {
  if (map && props.location) {
    map.getView().setZoom(props.zoom)
  }
})

// 组件卸载时清理资源
onUnmounted(() => {
  // 停止动画
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
  
  // 清理地图
  if (map) {
    map.setTarget(undefined)
    map = null
  }
  
  // 清理图层资源
  if (markerLayer) {
    markerLayer.setSource(null)
    markerLayer = null
  }
  
  if (animationLayer) {
    animationLayer.setSource(null)
    animationLayer = null
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
.location-marker {
  width: 100%;
  height: 400px;
  margin-top: 2rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  border: 1px solid var(--border-card);
}
</style> 