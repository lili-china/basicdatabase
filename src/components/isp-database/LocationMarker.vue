<template>
  <div class="location-marker-container">
    <div ref="mapContainer" class="location-marker"></div>
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
  
  <div v-if="showAvatarDialog" class="avatar-dialog-mask" @click="showAvatarDialog = false">
    <div class="avatar-dialog glass" @click.stop>
      <div class="avatar-dialog-row"><span class="label">ID:</span><span>{{ avatarDialogData.id }}</span></div>
      <div class="avatar-dialog-row"><span class="label">Name:</span><span>{{ avatarDialogData.name }}</span></div>
      <div class="avatar-dialog-row"><span class="label">Nationality:</span><span>{{ avatarDialogData.nationality }}</span></div>
      <div class="avatar-dialog-row"><span class="label">Phone:</span><span>{{ avatarDialogData.phone }}</span></div>
      <button class="avatar-dialog-close" @click="showAvatarDialog = false">Close</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { fromLonLat } from 'ol/proj'
import { Style, Circle, Fill, Stroke } from 'ol/style'
import XYZ from 'ol/source/XYZ'
import Overlay from 'ol/Overlay'
import '@/style/hide-ol-control.css'

interface LocationPoint {
  lon: number
  lat: number
  name?: string
  id?: string
  nationality?: string
  phone?: string
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
let avatarOverlay: Overlay | null = null
const avatarUrl = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
const showAvatarDialog = ref(false)
const avatarDialogData = ref({ id: '', name: '', nationality: '', phone: '' })

// 图层切换相关
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

// 预留方法：后期可替换为内网地图服务
// 注意：此方法为组件内部预留，不会在外部调用
const getMap = () => map

function handleAvatarClick() {
  if (props.location) {
    avatarDialogData.value = {
      id: props.location.id || '123123213',
      name: props.location.name || 'Lee',
      nationality: props.location.nationality || 'china',
      phone: props.location.phone || '+968 91312548'
    }
    showAvatarDialog.value = true
  }
}

function createAvatarOverlay() {
  if (!map) return
  
  // 如果已存在，先移除旧的
  if (avatarOverlay) {
    try {
      (map as any).removeOverlay(avatarOverlay)
    } catch (e) {
      // 忽略移除错误
    }
    avatarOverlay = null
  }
  
  // 创建新的 avatarOverlay
  const avatarDiv = document.createElement('div')
  avatarDiv.className = 'moving-avatar'
  avatarDiv.innerHTML = `<img src="${avatarUrl}" alt="avatar" style="width:48px;height:48px;object-fit:cover;display:block;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.18);border:2px solid #fff;cursor:pointer;" />`
  avatarDiv.style.pointerEvents = 'auto'
  avatarDiv.onclick = handleAvatarClick
  
  avatarOverlay = new Overlay({
    element: avatarDiv,
    positioning: 'bottom-center',
    offset: [0, 0],
    stopEvent: false
  })
  
  map.addOverlay(avatarOverlay)
  
  // 立即设置初始位置
  if (props.location) {
    const coords = fromLonLat([props.location.lon, props.location.lat])
    avatarOverlay.setPosition(coords)
  }
}

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
    source: new XYZ({
      url: MAP_URL,
      maxZoom: 18
    })
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

  // 创建头像覆盖层
  createAvatarOverlay()

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
    // 清理 avatarOverlay
    if (avatarOverlay) {
      try {
        (map as any).removeOverlay(avatarOverlay)
      } catch (e) {
        // 忽略移除错误
      }
      avatarOverlay = null
    }
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
    // 清理 avatarOverlay
    if (avatarOverlay) {
      try {
        (map as any).removeOverlay(avatarOverlay)
      } catch (e) {
        // 忽略移除错误
      }
      avatarOverlay = null
    }
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
.location-marker-container {
  width: 100%;
  position: relative;
}

.floating-control-panel {
  position: absolute;
  top: 50px;
  right: 10px;
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
  transform: translateY(-3px);
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

.location-marker {
  width: 100%;
  height: 400px;
  /* margin-top: 2rem; */
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

.avatar-dialog-mask {
  position: fixed;
  left: 0; top: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.25);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-dialog {
  background: var(--bg-card);
  border-radius: 14px;
  box-shadow: var(--shadow-card);
  padding: 18px 24px 12px 24px;
  min-width: 220px;
  max-width: 80vw;
  position: relative;
  backdrop-filter: blur(18px) saturate(180%);
  -webkit-backdrop-filter: blur(18px) saturate(180%);
  border: 1px solid var(--border-card);
  transition: all 0.2s;
}

.avatar-dialog.glass {
  background: var(--bg-card);
  backdrop-filter: blur(18px) saturate(180%);
  -webkit-backdrop-filter: blur(18px) saturate(180%);
  border: 1px solid var(--border-card);
}

.avatar-dialog h4 {
  margin: 0 0 10px 0;
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
  color: var(--text-primary);
}

.avatar-dialog-row {
  display: flex;
  gap: 8px;
  font-size: 0.95rem;
  margin-bottom: 6px;
}

.avatar-dialog-row .label {
  color: var(--text-secondary);
  min-width: 54px;
  text-align: right;
}

.avatar-dialog-close {
  margin: 0 auto;
  display: block;
  margin-top: 10px;
  padding: 4px 18px;
  border: none;
  border-radius: 6px;
  background: var(--accent-primary);
  color: #fff;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.2s;
}

.avatar-dialog-close:hover {
  background: var(--accent-primary-dark-2);
}

.moving-avatar {
  position: relative;
  z-index: 1000;
  pointer-events: auto;
}
</style> 