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
            <label class="speed-label">Speed</label>
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
            <label class="progress-label">Progress</label>
            <div class="progress-container">
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: progressPercentage + '%' }"></div>
              </div>
              <span class="progress-text">
                <template v-if="totalPoints > 0">
                  {{ Math.max(1, Math.min(totalPoints, Math.round(progress))) }} / {{ totalPoints }}
                </template>
                <span class="progress-percent">({{ progressPercentage.toFixed(1) }}%)</span>
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
  
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick, computed } from 'vue'
import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import OSM from 'ol/source/OSM'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import LineString from 'ol/geom/LineString'
import Point from 'ol/geom/Point'
import { fromLonLat } from 'ol/proj'
import { Style, Stroke, Circle, Fill } from 'ol/style'
import XYZ from 'ol/source/XYZ'
import Icon from 'ol/style/Icon'

// 1. 起点SVG（绿色旗帜）和终点SVG（蓝色终点旗）
const startIconSvg =
  'data:image/svg+xml;utf8,<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="14" fill="%2322c55e"/><rect x="14" y="8" width="2" height="16" rx="1" fill="white"/><path d="M16 10H24V16H16Z" fill="white" stroke="white" stroke-width="1.5" stroke-linejoin="round"/></svg>'
const endIconSvg =
  'data:image/svg+xml;utf8,<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="16" r="14" fill="%233b82f6"/><rect x="14" y="8" width="2" height="16" rx="1" fill="white"/><path d="M16 10H24V16H16Z" fill="white" stroke="white" stroke-width="1.5" stroke-linejoin="round"/><circle cx="24" cy="16" r="2" fill="white"/></svg>'

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

// 移动点相关
let movingPointSource: VectorSource | null = null
let movingPointLayer: VectorLayer | null = null
let movingPointFeature: Feature<Point> | null = null
let animationId: number | null = null
let currentIndex = 0
const isPlaying = ref(false)
let segmentStartTime: number | null = null
let segmentElapsed: number = 0

// 移动点动画变量
const movingPointGlowRadius = ref(14)
const movingPointGlowAlpha = ref(0.25)
let movingPointGlowGrowing = true
let movingPointBlinkTimer: number | null = null

// 控制面板相关
const currentLayer = ref('osm')
const playbackSpeed = ref(1)
const totalPoints = ref(0)
const isPanelHidden = ref(false)
const showDataList = ref(false)
const expandedDates = ref<string[]>([])

// 计算属性：按日期分组的数据
const groupedTrackData = computed(() => {
  const groups: Record<string, any[]> = {}
  
  props.trackPoints.forEach((point: any, index: number) => {
    // 为每个点添加时间戳（模拟数据）
    const timestamp = new Date()
    timestamp.setDate(timestamp.getDate() - Math.floor(index / 5)) // 每天5个点
    timestamp.setHours(8 + (index % 5) * 3) // 每3小时一个点
    timestamp.setMinutes((index % 3) * 20)
    
    const dateKey = timestamp.toISOString().split('T')[0]
    const pointWithData = {
      ...point,
      timestamp,
      location: `Location ${index + 1}`,
      index
    }
    
    if (!groups[dateKey]) {
      groups[dateKey] = []
    }
    groups[dateKey].push(pointWithData)
  })
  
  return groups
})

// 1. 恢复 createPointStyle 为区分起点、终点、中间点
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

// 2. 移动点样式：小红点+红色呼吸光圈
const createMovingPointStyle = () => {
  return [
    // 呼吸光圈
    new Style({
      image: new Circle({
        radius: movingPointGlowRadius.value,
        fill: new Fill({ color: `rgba(239,68,68,${movingPointGlowAlpha.value})` })
      })
    }),
    // 主体小红点
    new Style({
      image: new Circle({
        radius: 6,
        fill: new Fill({ color: '#ef4444' })
      })
    })
  ]
}

// 移除 movingPointBlinkState、movingPointBlinkTimer 相关代码
// onMounted 只保留光晕动画部分
onMounted(() => {
  movingPointGlowGrowing = true
  movingPointGlowRadius.value = 14
  movingPointGlowAlpha.value = 0.25
  movingPointBlinkTimer = window.setInterval(() => {
    // 光晕动画
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
})
onUnmounted(() => {
  if (movingPointBlinkTimer) clearInterval(movingPointBlinkTimer)
})

// 生成轨迹样式
const createTrackStyle = () => {
  return new Style({
    stroke: new Stroke({
      color: '#fbbf24', // 黄色
      width: 2, // 更细的线条
      lineDash: [6, 3] // 更小的虚线效果
    })
  })
}

// 1. 新增响应式 progress 变量
const progress = ref<number>(0)

// 2. progressPercentage 计算用 progress.value
const progressPercentage = computed(() => {
  if (totalPoints.value === 0) return 0
  return (progress.value / totalPoints.value) * 100
})

// 3. animateMovingPoint 每帧更新 progress
const animateMovingPoint = () => {
  if (!isPlaying.value || !map || !movingPointFeature) return
  const coordinates = (props.trackPoints || []).map((point: any) => fromLonLat([point.lon, point.lat]))
  if (currentIndex >= coordinates.length - 1) {
    // 到最后一个点，停止
    currentIndex = coordinates.length - 1
    progress.value = coordinates.length
    isPlaying.value = false
    if (animationId) {
      cancelAnimationFrame(animationId)
      animationId = null
    }
    return
  }
  // 每段动画时长
  const segmentDuration = 1000 / playbackSpeed.value
  if (segmentStartTime === null) segmentStartTime = Date.now() - segmentElapsed
  const elapsed = Date.now() - segmentStartTime
  let segmentProgress = Math.min(elapsed / segmentDuration, 1)
  // 实时进度
  progress.value = currentIndex + segmentProgress
  // 插值坐标
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

// 4. 进度条和百分比、当前点显示全部用 progress.value 和 progressPercentage
// <span class="progress-text">
//   {{ Math.max(1, Math.min(totalPoints, Math.round(progress.value))) }} / {{ totalPoints }}
//   <span class="progress-percent">({{ progressPercentage.toFixed(1) }}%)</span>
// </span>

// 1. startAnimation 只用 currentIndex 计算动画起始时间
const startAnimation = () => {
  if (isPlaying.value || !map || !movingPointFeature) return
  // 如果已在终点，回到起点
  if (currentIndex >= totalPoints.value - 1) {
    currentIndex = 0
    progress.value = 0
    segmentElapsed = 0
  }
  isPlaying.value = true
  segmentStartTime = Date.now() - segmentElapsed
  animateMovingPoint()
}

// 2. animateMovingPoint 里每段的移动时间只与 playbackSpeed.value 有关
// 其它逻辑不变

// 切换播放/暂停
const togglePlayPause = () => {
  if (isPlaying.value) {
    stopAnimation()
  } else {
    startAnimation()
  }
}

// 切换图层
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

// 增加播放速度
const increaseSpeed = () => {
  if (playbackSpeed.value < 4) {
    playbackSpeed.value += 0.5
    if (isPlaying.value) segmentStartTime = Date.now() - segmentElapsed
  }
}

// 减少播放速度
const decreaseSpeed = () => {
  if (playbackSpeed.value > 0.5) {
    playbackSpeed.value -= 0.5
    if (isPlaying.value) segmentStartTime = Date.now() - segmentElapsed
  }
}

// 切换面板显示/隐藏
const togglePanel = (mode?: number) => {
  if (mode === 10) {
    // 显示控制面板
    isPanelHidden.value = false
    showDataList.value = false
  } else if (mode === 20) {
    // 显示数据列表
    isPanelHidden.value = false
    showDataList.value = true
  } else {
    // 默认切换行为：如果是隐藏状态，显示控制面板；如果是显示状态，隐藏整个面板
    if (isPanelHidden.value) {
      // 当前是隐藏，显示控制面板
      isPanelHidden.value = false
      showDataList.value = false
    } else {
      // 当前是显示，隐藏整个面板
      isPanelHidden.value = true
    }
  }
}





// 切换日期组展开/收起
const toggleDateGroup = (date: string) => {
  const index = expandedDates.value.indexOf(date)
  if (index > -1) {
    expandedDates.value.splice(index, 1)
  } else {
    expandedDates.value.push(date)
  }
}

// 格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

// 格式化时间
const formatTime = (timestamp: Date) => {
  return timestamp.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  })
}

// 聚焦到指定点
const focusOnPoint = (point: any) => {
  if (!map) return
  const coord = fromLonLat([point.lon, point.lat])
  // 1. 地图居中
  map.getView().animate({
    center: coord,
    zoom: 12,
    duration: 1000
  })
  // 2. 移动点跳到该点
  if (movingPointFeature && movingPointFeature.getGeometry()) {
    const geometry = movingPointFeature.getGeometry() as Point
    geometry.setCoordinates(coord)
  }
  // 3. 停止动画
  isPlaying.value = false
  if (animationId) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
  // 4. currentIndex 设为该点索引
  const coordinates = (props.trackPoints || []).map((p: any) => fromLonLat([p.lon, p.lat]))
  const idx = coordinates.findIndex(c => c[0] === coord[0] && c[1] === coord[1])
  if (idx !== -1) {
    currentIndex = idx
  }
}

// 1. stopAnimation 只停止动画
const stopAnimation = () => {
  isPlaying.value = false
  if (segmentStartTime) segmentElapsed = Date.now() - segmentStartTime
  if (animationId) {
    cancelAnimationFrame(animationId)
    animationId = null
  }
}

// 2. 新增 resetToStart
const resetToStart = () => {
  const coordinates = (props.trackPoints || []).map((point: any) => fromLonLat([point.lon, point.lat]))
  if (coordinates.length > 0 && movingPointFeature && movingPointFeature.getGeometry()) {
    const geometry = movingPointFeature.getGeometry() as Point
    geometry.setCoordinates(coordinates[0])
    currentIndex = 0
  }
}



// 动画移动点
// 1. renderMap内部，创建地图后注册单击事件
const renderMap = () => {
  if (!mapContainer.value) return

  // 顶部声明所有变量
  const coordinates: any[] = (props.trackPoints || []).map((point: any) => 
    fromLonLat([point.lon, point.lat])
  )
  const trackPoints: Feature[] = []

  // 创建轨迹线要素
  const trackFeature = new Feature({
    geometry: new LineString(coordinates)
  })
  trackFeature.setStyle(createTrackStyle())

  // 创建所有轨迹点
  coordinates.forEach((coord: any, index: number) => {
    const pointFeature = new Feature({
      geometry: new Point(coord)
    })
    pointFeature.setId(index)
    if (index === 0) pointFeature.setStyle(new Style({ image: new Icon({ src: startIconSvg, anchor: [0.5, 1], scale: 0.7 }) }))
    else if (index === coordinates.length - 1) pointFeature.setStyle(new Style({ image: new Icon({ src: endIconSvg, anchor: [0.5, 1], scale: 0.7 }) }))
    else pointFeature.setStyle(createPointStyle(false, false))
    trackPoints.push(pointFeature)
  })

  // 创建矢量源
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

  // 创建移动点
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
    
    // 添加移动点图层到地图
    map.addLayer(movingPointLayer)
    
    // 更新总点数
    totalPoints.value = coordinates.length
    
    // 自动调整视图范围
    if (trackSource) {
      const extent = trackSource.getExtent()
      map.getView().fit(extent, {
        padding: [50, 50, 50, 50],
        duration: 1000
      })
    }
  }

  // 注册地图单击事件
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



// 2. onMounted只需renderMap()
onMounted(async () => {
  await nextTick()
  renderMap()
})

watch(() => props.trackPoints, () => {
  // 停止动画
  stopAnimation()
  
  // 清理旧的地图资源
  if (map) {
    map.setTarget(undefined)
    // OpenLayers 没有全局 off，可以通过 setTarget(undefined) 彻底销毁实例
    map = null
  }
  
  // 清理图层资源
  if (trackLayer) {
    trackLayer.setSource(null)
    trackLayer = null
  }
  
  if (trackSource) {
    trackSource.clear()
    trackSource = null
  }
  
  // 清理移动点资源
  if (movingPointLayer) {
    movingPointLayer.setSource(null)
    movingPointLayer = null
  }
  
  if (movingPointSource) {
    movingPointSource.clear()
    movingPointSource = null
  }
  
  movingPointFeature = null
  
  renderMap()
})

// 组件卸载时清理资源
onUnmounted(() => {
  // 停止动画
  stopAnimation()
  
  // 清理地图
  if (map) {
    map.setTarget(undefined)
    map = null
  }
  
  // 清理图层资源
  if (trackLayer) {
    trackLayer.setSource(null)
    trackLayer = null
  }
  
  if (trackSource) {
    trackSource.clear()
    trackSource = null
  }
  
  // 清理移动点资源
  if (movingPointLayer) {
    movingPointLayer.setSource(null)
    movingPointLayer = null
  }
  
  if (movingPointSource) {
    movingPointSource.clear()
    movingPointSource = null
  }
  
  if (baseLayer) {
    baseLayer.setSource(null)
    baseLayer = null
  }
  
  movingPointFeature = null
})

// 暴露方法给父组件
defineExpose({
  startAnimation,
  stopAnimation
})
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
</style> 