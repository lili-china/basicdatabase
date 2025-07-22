<template>
  <div class="map-track-container">
    <div ref="mapContainer" class="map-track"></div>
    
    <!-- 悬浮控制面板 -->
    <div class="floating-control-panel" :class="{ 'hidden': isPanelHidden, 'data-mode': showDataList }">
      
      <!-- 隐藏/显示切换按钮 -->
      <button @click="() => togglePanel()" class="panel-toggle-btn" :title="isPanelHidden ? 'Show Controls' : 'Hide Controls'">
        <svg v-if="isPanelHidden" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      
      <!-- 数据列表按钮 -->
      <button @click="() => togglePanel(20)" class="data-toggle-btn" :class="{ active: showDataList }" :title="showDataList ? 'Hide Data List' : 'Show Data List'">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M8 6h13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8 12h13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8 18h13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M3 6h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M3 12h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M3 18h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      
      <!-- 控制面板内容 -->
      <div class="control-panel-content">
        <!-- 播放控制面板 -->
        <div v-if="!showDataList" class="control-section">
          <!-- <h4 class="section-title">Track Controls</h4> -->
          <!-- 主要控制按钮 -->
          <div class="main-controls">
            <!-- 图层切换按钮 -->
            <button @click="toggleLayer" class="control-btn layer-btn" :class="{ active: currentLayer === 'satellite' }" title="Toggle Map Layer">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                <path d="M2 12h20" stroke="currentColor" stroke-width="2"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" stroke-width="2"/>
              </svg>
            </button>
            
            <!-- 播放/暂停按钮 -->
            <button @click="togglePlayPause" class="control-btn play-btn" :title="isPlaying ? '暂停' : '播放'">
              <svg v-if="!isPlaying" width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M8 5v14l11-7z" fill="currentColor"/>
              </svg>
              <svg v-else width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="6" y="4" width="4" height="16" fill="currentColor"/>
                <rect x="14" y="4" width="4" height="16" fill="currentColor"/>
              </svg>
            </button>
            
            <!-- 停止按钮 -->
            <button @click="() => { stopAnimation(); resetToStart(); }" class="control-btn stop-btn" title="Stop Animation">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
                <rect x="8" y="8" width="8" height="8" fill="currentColor"/>
              </svg>
            </button>
          </div>
          

          
          <!-- 倍速控制 -->
          <div class="speed-section">
            <!-- <label class="speed-label">Speed</label> -->
            <div class="speed-control">
              <button @click="decreaseSpeed" class="speed-btn" :disabled="playbackSpeed <= 0.5" title="Decrease Speed">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M19 12H5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
              <span class="speed-text">{{ playbackSpeed }}x</span>
              <button @click="increaseSpeed" class="speed-btn" :disabled="playbackSpeed >= 4" title="Increase Speed">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5v14M19 12l-7-7M19 12l-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
          
          <!-- 进度条 -->
          <div class="progress-section">
            <!-- <label class="progress-label">Progress</label> -->
            <div class="progress-container">
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
              </div>
              <span class="progress-text">
                <!-- <template v-if="totalPoints > 0">
                  {{ Math.max(1, Math.min(totalPoints, Math.round(progress))) }} / {{ totalPoints }}
                </template> -->
                <span class="progress-percent" v-if="progressPercentage <100 && progressPercentage > 0">({{ progressPercentage.toFixed(1) }}%)</span>
                <span class="progress-percent" v-else>({{ progressPercentage }}%)</span>
              </span>
            </div>
          </div>
        </div>
        
        <!-- 数据列表面板 -->
        <div v-if="showDataList" class="data-section">
          <div class="data-header">
            <h4 class="section-title">Track Data List</h4>
          </div>
          
          <div class="data-list-body">
            <div v-for="(group, date) in groupedTrackData" :key="date" class="date-group">
              <div class="date-header" @click="toggleDateGroup(date)">
                <div class="date-info">
                  <span class="date-text">{{ formatDate(date) }}</span>
                  <span class="point-count">{{ group.length }} points</span>
                </div>
                <svg class="expand-icon" :class="{ 'expanded': expandedDates.includes(date) }" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              
              <div v-if="expandedDates.includes(date)" class="date-details">
                <div class="detail-table">
                  <div class="table-header">
                    <div class="header-cell">Time</div>
                    <div class="header-cell">Location</div>
                    <div class="header-cell">Coordinates</div>
                    <div class="header-cell">Actions</div>
                  </div>
                  <div v-for="(point, index) in group" :key="index" class="table-row">
                    <div class="table-cell">{{ formatTime(point.timestamp) }}</div>
                    <div class="table-cell">{{ point.location || 'Unknown' }}</div>
                    <div class="table-cell">{{ point.lon.toFixed(6) }}, {{ point.lat.toFixed(6) }}</div>
                    <div class="table-cell">
                      <button @click="focusOnPoint(point)" class="focus-btn" title="Focus on this point">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" stroke-width="2"/>
                          <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  
    <div v-if="showAvatarDialog" class="avatar-dialog-mask" @click="showAvatarDialog = false">
      <div class="avatar-dialog glass" @click.stop>
        <div class="avatar-dialog-row"><span class="label">ID:</span><span>{{ 123123213 }}</span></div>
        <div class="avatar-dialog-row"><span class="label">Name:</span><span>Lee </span></div>
        <div class="avatar-dialog-row"><span class="label">Nationality:</span><span>china </span></div>
        <div class="avatar-dialog-row"><span class="label">Phone:</span><span>+968 91312548</span></div>
        <button class="avatar-dialog-close" @click="showAvatarDialog = false">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick, computed } from 'vue'
import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import LineString from 'ol/geom/LineString'
import Point from 'ol/geom/Point'
import { fromLonLat } from 'ol/proj'
import { Style, Stroke, Circle, Fill } from 'ol/style'
import XYZ from 'ol/source/XYZ'
import Icon from 'ol/style/Icon'
import Overlay from 'ol/Overlay'
import '@/style/hide-ol-control.css'

const startIconSvg =
  'data:image/svg+xml;utf8,<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="13" fill="%2322c55e" stroke="white" stroke-width="2"/><rect x="13" y="7" width="4" height="16" rx="2" fill="white"/><path d="M15 9H25V17H15Z" fill="white" stroke="white" stroke-width="1.5" stroke-linejoin="round"/><path d="M15 9L25 17" stroke="%2322c55e" stroke-width="1.5" stroke-linecap="round"/></svg>'
const endIconSvg =
  'data:image/svg+xml;utf8,<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="13" fill="%233b82f6" stroke="white" stroke-width="2"/><rect x="13" y="7" width="4" height="16" rx="2" fill="white"/><path d="M15 9H25V17H15Z" fill="white" stroke="white" stroke-width="1.5" stroke-linejoin="round"/><circle cx="25" cy="17" r="2.5" fill="white" stroke="%233b82f6" stroke-width="1.5"/></svg>'

const props = defineProps({
  trackPoints: {
    type: Array,
    default: () => []
  }
})

const mapContainer = ref<HTMLDivElement | null>(null)
let map: Map | null = null
let trackSource: VectorSource | null = null
let trackLayer: VectorLayer | null = null
let baseLayer: TileLayer | null = null
let movingPointSource: VectorSource | null = null
let movingPointLayer: VectorLayer | null = null
let movingPointFeature: Feature<Point> | null = null
let animationId: number | null = null
let currentIndex = 0
const isPlaying = ref(false)
let segmentStartTime: number | null = null
let segmentElapsed: number = 0
const movingPointGlowRadius = ref(14)
const movingPointGlowAlpha = ref(0.25)
let movingPointGlowGrowing = true
let movingPointBlinkTimer: number | null = null
const currentLayer = ref('osm')
const playbackSpeed = ref(0.5)
const totalPoints = ref(0)
const isPanelHidden = ref(false)
const showDataList = ref(false)
const avatarUrl = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
let avatarOverlay: Overlay | null = null
const showAvatarDialog = ref(false)
const avatarDialogData = ref({ id: '', name: '', nationality: '', phone: '' })

function handleAvatarClick() {
  const idx = Math.round(currentIndex);
  const point = props.trackPoints?.[idx];
  if (point) {
    avatarDialogData.value = {
      id: point.id || '',
      name: point.name || '',
      nationality: point.nationality || '',
      phone: point.phone || ''
    }
    showAvatarDialog.value = true;
  }
}

function createAvatarOverlay() {
  if (!map) return;
  let avatarDiv: HTMLDivElement;
  if (avatarOverlay) {
    avatarDiv = avatarOverlay.getElement() as HTMLDivElement;
    if (avatarDiv) {
      avatarDiv.onclick = handleAvatarClick;
      avatarDiv.style.pointerEvents = 'auto';
    }
    return;
  }
  avatarDiv = document.createElement('div');
  avatarDiv.className = 'moving-avatar';
  avatarDiv.innerHTML = `<img src="${avatarUrl}" alt="avatar" style="width:48px;height:48px;object-fit:cover;display:block;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.18);border:2px solid #fff;cursor:pointer;" />`;
  avatarDiv.style.pointerEvents = 'auto';
  avatarDiv.onclick = handleAvatarClick;
  avatarOverlay = new Overlay({
    element: avatarDiv,
    positioning: 'bottom-center',
    offset: [0, 0],
    stopEvent: false
  });
  map.addOverlay(avatarOverlay);
}

function updateAvatarOverlayPosition() {
  if (!avatarOverlay || !movingPointFeature) return
  const geom = movingPointFeature.getGeometry() as Point
  avatarOverlay.setPosition(geom.getCoordinates())
}

function syncAvatarOverlay() {
  updateAvatarOverlayPosition()
  requestAnimationFrame(syncAvatarOverlay)
}

const createPointStyle = (isStart: boolean = false, isEnd: boolean = false) => {
  if (isStart) {
    return new Style({
      image: new Circle({
        radius: 10,
        fill: new Fill({ color: '#22c55e' })
      })
    })
  } else if (isEnd) {
    return new Style({
      image: new Circle({
        radius: 10,
        fill: new Fill({ color: '#3b82f6' })
      })
    })
  } else {
    return new Style({
      image: new Circle({
        radius: 6,
        fill: new Fill({ color: '#6366f1' })
      })
    })
  }
}

const createMovingPointStyle = () => {
  // 修正 alpha 范围和精度
  const safeAlpha = Math.max(0, Math.min(1, Number(movingPointGlowAlpha.value.toFixed(2))))
  return [
    new Style({
      image: new Circle({
        radius: movingPointGlowRadius.value,
        fill: new Fill({ color: `rgba(239,68,68,${safeAlpha})` })
      })
    }),
    new Style({
      image: new Circle({
        radius: 6,
        fill: new Fill({ color: '#ef4444' })
      })
    })
  ]
}

const createTrackStyle = () => {
  return new Style({
    stroke: new Stroke({
      color: '#fbbf24',
      width: 2,
      lineDash: [6, 3]
    })
  })
}

const progress = ref<number>(0)
const progressPercentage = computed(() => {
  if (totalPoints.value === 0) return 0
  return (progress.value / totalPoints.value) * 100
})

const animateMovingPoint = () => {
  if (!isPlaying.value || !map || !movingPointFeature) return
  const coordinates = (props.trackPoints || []).map((point: any) => fromLonLat([point.lon, point.lat]))
  if (currentIndex >= coordinates.length - 1) {
    currentIndex = coordinates.length - 1
    progress.value = coordinates.length
    isPlaying.value = false
    if (animationId) {
      cancelAnimationFrame(animationId)
      animationId = null
    }
    return
  }
  const segmentDuration = 1000 / playbackSpeed.value
  if (segmentStartTime === null) segmentStartTime = Date.now() - segmentElapsed
  const elapsed = Date.now() - segmentStartTime
  let segmentProgress = Math.min(elapsed / segmentDuration, 1)
  progress.value = currentIndex + segmentProgress
  const currentCoord = coordinates[currentIndex]
  const nextCoord = coordinates[currentIndex + 1]
  const interpolatedCoord = [
    currentCoord[0] + (nextCoord[0] - currentCoord[0]) * segmentProgress,
    currentCoord[1] + (nextCoord[1] - currentCoord[1]) * segmentProgress
  ]
  if (movingPointFeature && movingPointFeature.getGeometry()) {
    const geometry = movingPointFeature.getGeometry() as Point
    geometry.setCoordinates(interpolatedCoord)
  }
  if (segmentProgress >= 1) {
    currentIndex++
    segmentStartTime = Date.now()
    segmentElapsed = 0
  }
  animationId = requestAnimationFrame(animateMovingPoint)
}

const startAnimation = () => {
  if (isPlaying.value || !map || !movingPointFeature) return
  if (currentIndex >= totalPoints.value - 1) {
    currentIndex = 0
    progress.value = 0
    segmentElapsed = 0
  }
  isPlaying.value = true
  segmentStartTime = Date.now() - segmentElapsed
  animateMovingPoint()
}

const togglePlayPause = () => {
  if (isPlaying.value) {
    stopAnimation()
  } else {
    startAnimation()
  }
}

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

const increaseSpeed = () => {
  if (playbackSpeed.value < 4) {
    if (isPlaying.value && segmentStartTime !== null) {
      segmentElapsed = Date.now() - segmentStartTime;
    }
    playbackSpeed.value += 0.5;
    if (isPlaying.value) {
      segmentStartTime = Date.now() - segmentElapsed;
    }
  }
}

const decreaseSpeed = () => {
  if (playbackSpeed.value > 0.5) {
    if (isPlaying.value && segmentStartTime !== null) {
      segmentElapsed = Date.now() - segmentStartTime;
    }
    playbackSpeed.value -= 0.5;
    if (isPlaying.value) {
      segmentStartTime = Date.now() - segmentElapsed;
    }
  }
}

const togglePanel = (mode?: number) => {
  if (mode === 10) {
    isPanelHidden.value = false
    showDataList.value = false
  } else if (mode === 20) {
    isPanelHidden.value = false
    showDataList.value = true
  } else {
    if (isPanelHidden.value) {
      isPanelHidden.value = false
      showDataList.value = false
    } else {
      isPanelHidden.value = true
    }
  }
}

onMounted(() => {
  movingPointGlowGrowing = true
  movingPointGlowRadius.value = 14
  movingPointGlowAlpha.value = 0.25
  movingPointBlinkTimer = window.setInterval(() => {
    if (movingPointGlowGrowing) {
      movingPointGlowRadius.value += 1.5
      movingPointGlowAlpha.value -= 0.025
      if (movingPointGlowRadius.value >= 28) movingPointGlowGrowing = false
    } else {
      movingPointGlowRadius.value -= 1.5
      movingPointGlowAlpha.value += 0.025
      if (movingPointGlowRadius.value <= 14) movingPointGlowGrowing = true
    }
    if (movingPointFeature) movingPointFeature.setStyle(createMovingPointStyle())
  }, 60)
  nextTick(() => {
    renderMap()
    createAvatarOverlay()
    syncAvatarOverlay()
  })
})

onUnmounted(() => {
  if (movingPointBlinkTimer) clearInterval(movingPointBlinkTimer)
  if (avatarOverlay && map) {
    map.removeOverlay(avatarOverlay)
    avatarOverlay = null
  }
})

const stopAnimation = () => {
  isPlaying.value = false
  if (segmentStartTime) segmentElapsed = Date.now() - segmentStartTime
  if (animationId) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
}

const resetToStart = () => {
  const coordinates = (props.trackPoints || []).map((point: any) => fromLonLat([point.lon, point.lat]))
  if (coordinates.length > 0 && movingPointFeature && movingPointFeature.getGeometry()) {
    const geometry = movingPointFeature.getGeometry() as Point
    geometry.setCoordinates(coordinates[0])
    currentIndex = 0
  }
}

const renderMap = () => {
  if (!mapContainer.value) return
  const coordinates: any[] = (props.trackPoints || []).map((point: any) => 
    fromLonLat([point.lon, point.lat])
  )
  const trackPoints: Feature[] = []
  const trackFeature = new Feature({
    geometry: new LineString(coordinates)
  })
  trackFeature.setStyle(createTrackStyle())
  coordinates.forEach((coord: any, index: number) => {
    const pointFeature = new Feature({
      geometry: new Point(coord)
    })
    pointFeature.setId(index)
    if (index === 0) pointFeature.setStyle(new Style({ image: new Icon({ src: startIconSvg, anchor: [0.5, 0.5], scale: 1 }) }))
    else if (index === coordinates.length - 1) pointFeature.setStyle(new Style({ image: new Icon({ src: endIconSvg, anchor: [0.5, 0.5], scale: 1 }) }))
    else pointFeature.setStyle(createPointStyle(false, false))
    trackPoints.push(pointFeature)
  })
  const features: Feature[] = [trackFeature, ...trackPoints]
  trackSource = new VectorSource({ features })
  trackLayer = new VectorLayer({ source: trackSource })
  trackLayer.set('name', 'track')
  baseLayer = new TileLayer({ source: new XYZ({ url: MAP_URL, maxZoom: 18 }), visible: true })
  baseLayer.set('name', 'base')
  map = new Map({
    target: mapContainer.value,
    layers: [baseLayer, trackLayer],
    view: new View({
      center: coordinates.length > 0 ? coordinates[0] : fromLonLat([57.5, 21.5]),
      zoom: 10
    })
  })
  if (coordinates.length > 0) {
    movingPointFeature = new Feature({
      geometry: new Point(coordinates[0])
    })
    movingPointFeature.setStyle(createMovingPointStyle())
    movingPointSource = new VectorSource({
      features: [movingPointFeature]
    })
    movingPointLayer = new VectorLayer({
      source: movingPointSource
    })
    movingPointLayer.set('name', 'movingPoint')
    map.addLayer(movingPointLayer)
    totalPoints.value = coordinates.length
    if (trackSource) {
      const extent = trackSource.getExtent()
      map.getView().fit(extent, {
        padding: [50, 50, 50, 50],
        duration: 1000
      })
    }
  }
  map.on('singleclick', (evt: any) => {
    map.forEachFeatureAtPixel(evt.pixel, (feature: any) => {
      const id = feature.getId()
      if (typeof id === 'number') {
        if (movingPointFeature && movingPointFeature.getGeometry()) {
          const geometry = movingPointFeature.getGeometry() as Point
          geometry.setCoordinates(coordinates[id])
        }
        currentIndex = id
        isPlaying.value = false
        if (animationId) {
          cancelAnimationFrame(animationId)
          animationId = null
        }
      }
    })
  })
}

watch(() => props.trackPoints, () => {
  stopAnimation()
  if (map) {
    map.setTarget(undefined)
    map = null
  }
  if (trackLayer) {
    trackLayer.setSource(null)
    trackLayer = null
  }
  if (trackSource) {
    trackSource.clear()
    trackSource = null
  }
  if (movingPointLayer) {
    movingPointLayer.setSource(null)
    movingPointLayer = null
  }
  if (movingPointSource) {
    movingPointSource.clear()
    movingPointSource = null
  }
  movingPointFeature = null
  if (avatarOverlay && map) {
    map.removeOverlay(avatarOverlay)
    avatarOverlay = null
  }
  renderMap()
})

defineExpose({
  startAnimation,
  stopAnimation
})
// 弹窗浮动定位样式
import { computed } from 'vue'
const avatarFloatStyle = computed(() => {
  if (!avatarOverlay || !avatarOverlay.getPosition() || !map) return {}
  const pixel = map.getPixelFromCoordinate(avatarOverlay.getPosition())
  if (!pixel) return {}
  // 头像宽48，右侧偏移8px，卡片宽220
  return {
    position: 'absolute',
    left: `${pixel[0] + 32}px`, // 头像右侧8px间距
    top: `${pixel[1] - 48}px`, // 顶部对齐头像
    zIndex: 1001
  }
})

const expandedDates = ref<string[]>([])

// Track Data List 分组逻辑
const groupedTrackData = computed(() => {
  const groups: Record<string, any[]> = {}
  props.trackPoints.forEach((point: any, index: number) => {
    // 假设每个点有 timestamp 字段，否则用模拟数据
    let timestamp = point.timestamp
    if (!timestamp) {
      timestamp = new Date()
      timestamp.setDate(timestamp.getDate() - Math.floor(index / 5))
      timestamp.setHours(8 + (index % 5) * 3)
      timestamp.setMinutes((index % 3) * 20)
    }
    const dateKey = (timestamp instanceof Date ? timestamp : new Date(timestamp)).toISOString().split('T')[0]
    const pointWithData = {
      ...point,
      timestamp,
      location: point.location || `Location ${index + 1}`,
      index
    }
    if (!groups[dateKey]) {
      groups[dateKey] = []
    }
    groups[dateKey].push(pointWithData)
  })
  return groups
})

function toggleDateGroup(date: string) {
  const index = expandedDates.value.indexOf(date)
  if (index > -1) {
    expandedDates.value.splice(index, 1)
  } else {
    expandedDates.value.push(date)
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function formatTime(timestamp: Date) {
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })
}

function focusOnPoint(point: any) {
  if (!map) return;
  const coordinates = (props.trackPoints || []).map((p: any) => fromLonLat([p.lon, p.lat]));
  const index = coordinates.findIndex(coord => coord[0] === point.lon && coord[1] === point.lat);
  if (index !== -1) {
    currentIndex = index;
    isPlaying.value = false;
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
    if (movingPointFeature && movingPointFeature.getGeometry()) {
      const geometry = movingPointFeature.getGeometry() as Point;
      geometry.setCoordinates(coordinates[currentIndex]);
    }
  }
}
</script>

<style scoped>
.map-track-container {
  width: 100%;
  position: relative;
}



.map-track {
  margin-top: 2rem;
  width: 100%;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

/* 悬浮控制面板样式 */
.floating-control-panel {
  position: absolute;
  top: 10px;
  right: 5px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-radius: 20px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  z-index: 1000;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: visible;
  min-width: 320px;
  width: 320px;
}

/* 当显示数据列表时，增加面板宽度 */
.floating-control-panel.data-mode {
  width: 480px;
  min-width: 480px;
}

.floating-control-panel.hidden {
  transform: translateX(calc(100% - 80px));
  opacity: 0.7;
  background: rgba(255, 255, 255, 0.1);
}

.floating-control-panel.hidden:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.2);
  transform: translateX(calc(100% - 90px));
}

.panel-toggle-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: rgba(37, 99, 235, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: var(--accent-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 1001;
  box-shadow: 
    0 4px 16px rgba(37, 99, 235, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* 确保切换按钮在隐藏状态下仍然可见 */
.floating-control-panel.hidden .panel-toggle-btn {
  right: 12px;
  background: rgba(37, 99, 235, 0.3);
  color: white;
  box-shadow: 
    0 4px 16px rgba(37, 99, 235, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

/* 确保数据按钮在隐藏状态下仍然可见 */
.floating-control-panel.hidden .data-toggle-btn {
  right: 12px;
  background: rgba(16, 185, 129, 0.3);
  color: white;
  box-shadow: 
    0 4px 16px rgba(16, 185, 129, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

/* 隐藏状态下的面板样式 */
.floating-control-panel.hidden {
  width: 55px;
  min-width: 65px;
  border-radius: 40px;
}

/* 添加展开提示 */
.floating-control-panel.hidden::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  opacity: 0.5;
  pointer-events: none;
}

.panel-toggle-btn:hover {
  background: rgba(37, 99, 235, 0.3);
  color: white;
  transform: scale(1.05);
  box-shadow: 
    0 6px 20px rgba(37, 99, 235, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

.control-panel-content {
  padding: 20px;
  padding-right: 70px;
}

/* 隐藏状态下隐藏内容 */
.floating-control-panel.hidden .control-panel-content {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}

.control-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-title {
  margin: 0 0 8px 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  text-align: center;
}

.main-controls {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 16px;
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
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
}

.control-btn:hover {
  transform: translateY(-3px);
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 6px 20px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

.control-btn.active {
  background: rgba(37, 99, 235, 0.3);
  color: white;
  box-shadow: 
    0 4px 16px rgba(37, 99, 235, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

.control-btn::after {
  content: attr(title);
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease;
}

.control-btn:hover::after {
  opacity: 1;
}

.play-btn {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
}

.play-btn:hover {
  background: rgba(34, 197, 94, 0.3);
  color: white;
}

.stop-btn {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.stop-btn:hover {
  background: rgba(239, 68, 68, 0.3);
  color: white;
}

.layer-btn {
  background: rgba(99, 102, 241, 0.2);
  color: #6366f1;
}

.layer-btn:hover {
  background: rgba(99, 102, 241, 0.3);
  color: white;
}

.mode-btn {
  background: rgba(139, 92, 246, 0.2);
  color: #8b5cf6;
}

.mode-btn:hover {
  background: rgba(139, 92, 246, 0.3);
  color: white;
}

.mode-btn.active {
  background: rgba(139, 92, 246, 0.4);
  color: white;
}

.speed-section, .progress-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.speed-label, .progress-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-secondary);
  text-align: center;
}

.speed-control {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 10px 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.speed-btn {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  color: var(--text-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.speed-btn:hover:not(:disabled) {
  background: rgba(37, 99, 235, 0.2);
  color: var(--accent-primary);
  transform: scale(1.1);
}

.speed-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
  background: rgba(255, 255, 255, 0.05);
}

.speed-text {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-primary);
  min-width: 30px;
  text-align: center;
}

.progress-container {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 10px 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.progress-bar {
  flex: 1;
  height: 10px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, rgba(37, 99, 235, 0.8), rgba(59, 130, 246, 0.8));
  border-radius: 6px;
  transition: width 0.3s ease;
  box-shadow: 
    0 0 12px rgba(37, 99, 235, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.progress-text {
  font-size: 0.875rem;
  color: var(--text-primary);
  font-weight: 600;
  min-width: 60px;
  text-align: center;
}

.progress-percent {
  color: #f59e0b;
  margin-left: 6px;
  font-weight: bold;
}


.date-group {
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.date-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.date-header:hover {
  background: rgba(0, 0, 0, 0.02);
}

.date-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.date-text {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
}

.point-count {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.expand-icon {
  transition: transform 0.3s ease;
  color: var(--text-secondary);
}

.expand-icon.expanded {
  transform: rotate(90deg);
}

.date-details {
  background: rgba(0, 0, 0, 0.02);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.detail-table {
  padding: 16px 24px;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 80px;
  gap: 16px;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--text-primary);
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 2fr 2fr 80px;
  gap: 16px;
  padding: 12px 16px;
  border-radius: 8px;
  transition: background-color 0.2s ease;
  font-size: 0.875rem;
}

.table-row:hover {
  background: rgba(0, 0, 0, 0.02);
}

.table-cell {
  display: flex;
  align-items: center;
  color: var(--text-primary);
}

.focus-btn {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 6px;
  background: rgba(37, 99, 235, 0.1);
  color: var(--accent-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.focus-btn:hover {
  background: rgba(37, 99, 235, 0.2);
  transform: scale(1.1);
}

/* 数据列表面板样式 */
.data-section {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.data-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 16px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 16px;
}

.data-header .section-title {
  margin: 0;
}

.data-header .close-btn {
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.1);
  color: var(--text-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.data-header .close-btn:hover {
  background: rgba(0, 0, 0, 0.2);
  transform: scale(1.1);
}

.data-list-body {
  flex: 1;
  overflow-y: auto;
  max-height: 300px;
  padding-right: 8px;
}

/* 数据模式下的表格样式优化 */
.floating-control-panel.data-mode .detail-table {
  grid-template-columns: 1fr 2fr 2fr 80px;
  gap: 12px;
  font-size: 0.875rem;
}

.floating-control-panel.data-mode .table-cell {
  padding: 8px 4px;
}

/* 数据切换按钮样式 */
.data-toggle-btn {
  position: absolute;
  top: 70px;
  right: 12px;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: rgba(16, 185, 129, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: #10b981;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 1001;
  pointer-events: auto;
  box-shadow: 
    0 4px 16px rgba(16, 185, 129, 0.2),
    0 0 0 1px rgba(255, 255, 255, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* 数据模式下调整按钮位置 */
.floating-control-panel.data-mode .data-toggle-btn {
  right: 12px;
}

.data-toggle-btn:hover {
  background: rgba(16, 185, 129, 0.3);
  color: white;
  transform: scale(1.05);
  box-shadow: 
    0 6px 20px rgba(16, 185, 129, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

.data-toggle-btn.active {
  background: rgba(16, 185, 129, 0.4);
  color: white;
  box-shadow: 
    0 4px 16px rgba(16, 185, 129, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
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
  background: rgba(255,255,255,0.18);
  border-radius: 14px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.18);
  padding: 18px 24px 12px 24px;
  min-width: 220px;
  max-width: 80vw;
  position: relative;
  backdrop-filter: blur(18px) saturate(180%);
  -webkit-backdrop-filter: blur(18px) saturate(180%);
  border: 1px solid rgba(255,255,255,0.25);
  transition: all 0.2s;
}
.avatar-dialog.glass {
  background: rgba(255,255,255,0.18);
  backdrop-filter: blur(18px) saturate(180%);
  -webkit-backdrop-filter: blur(18px) saturate(180%);
  border: 1px solid rgba(255,255,255,0.25);
}
.avatar-dialog h4 {
  margin: 0 0 10px 0;
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
}
.avatar-dialog-row {
  display: flex;
  gap: 8px;
  font-size: 0.95rem;
  margin-bottom: 6px;
}
.avatar-dialog-row .label {
  color: #666;
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
  background: #2563eb;
  color: #fff;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.2s;
}
.avatar-dialog-close:hover {
  background: #1d4ed8;
}

.avatar-float-info {
  min-width: 180px;
  max-width: 260px;
  background: rgba(255,255,255,0.18);
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  padding: 14px 18px 10px 18px;
  position: absolute;
  backdrop-filter: blur(18px) saturate(180%);
  -webkit-backdrop-filter: blur(18px) saturate(180%);
  border: 1px solid rgba(255,255,255,0.18);
  transition: all 0.2s;
  pointer-events: auto;
}
.avatar-float-info h4 {
  margin: 0 0 8px 0;
  font-size: 1rem;
  font-weight: 700;
  text-align: left;
}
.avatar-float-info .avatar-dialog-row {
  display: flex;
  gap: 8px;
  font-size: 0.95rem;
  margin-bottom: 6px;
}
.avatar-float-info .avatar-dialog-row .label {
  color: #666;
  min-width: 54px;
  text-align: right;
}
.avatar-float-info .avatar-dialog-close {
  margin: 0 0 0 auto;
  display: block;
  margin-top: 8px;
  padding: 3px 14px;
  border: none;
  border-radius: 6px;
  background: #2563eb;
  color: #fff;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.2s;
}
.avatar-float-info .avatar-dialog-close:hover {
  background: #1d4ed8;
}
</style> 