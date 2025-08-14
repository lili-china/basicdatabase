<template>
  <div class="map-track-container">
    <div ref="mapContainer" class="map-track"></div>
    
    <!-- 悬浮控制面板 -->
    <div class="floating-control-panel" :class="{ 'hidden': isPanelHidden }">
      
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
      
      <!-- 图层切换按钮 -->
      <button @click="toggleLayer" class="map-layer-toggle-btn" :class="{ active: currentLayer === 'satellite' }" :title="currentLayer === 'satellite' ? 'Switch to Map' : 'Switch to Satellite'">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
          <path d="M2 12h20" stroke="currentColor" stroke-width="2"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" stroke-width="2"/>
        </svg>
      </button>
      
      <!-- 控制面板内容 -->
      <div class="control-panel-content">
        <!-- 播放控制面板 -->
        <div class="control-section">
          <!-- <h4 class="section-title">Track Controls</h4> -->
          <!-- 主要控制按钮 -->
          <div class="main-controls">
            <!-- 播放/暂停按钮 -->
            <button @click="togglePlayPause" class="control-btn play-btn" :title="isPlaying ? 'Pause' : 'Play'">
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
const isPanelHidden = ref(false)
const avatarUrl = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
let avatarOverlay: Overlay | null = null
const showAvatarDialog = ref(false)
const avatarDialogData = ref({ id: '', name: '', nationality: '', phone: '' })

function handleAvatarClick() {
  const idx = Math.round(currentIndex);
  const point = currentTrackPoints.value?.[idx] as any;
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
  
  // 如果已存在，先移除旧的
  if (avatarOverlay) {
    try {
      (map as any).removeOverlay(avatarOverlay);
    } catch (e) {
      // 忽略移除错误
    }
    avatarOverlay = null;
  }
  
  // 创建新的 avatarOverlay
  const avatarDiv = document.createElement('div');
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
  
  // 立即设置初始位置
  if (movingPointFeature && movingPointFeature.getGeometry()) {
    const geometry = movingPointFeature.getGeometry() as Point;
    syncAvatarOverlay(geometry.getCoordinates());
  }
}

function updateAvatarOverlayPosition() {
  if (!avatarOverlay || !movingPointFeature) return
  const geom = movingPointFeature.getGeometry() as Point
  if (geom) {
    const coords = geom.getCoordinates()
    if (coords) {
      avatarOverlay.setPosition(coords)
    }
  }
}

/**
 * 同步头像覆盖层位置
 * 
 * 功能说明：
 * - 更新地图上头像的位置
 * - 支持直接传入坐标或从移动点获取坐标
 * - 确保头像跟随移动点显示
 * 
 * 参数说明：
 * @param coordinates - 可选的坐标数组 [x, y]，如果提供则直接使用
 * 
 * 使用场景：
 * 1. 传入坐标：直接设置头像位置（如动画播放时）
 * 2. 不传坐标：从移动点获取坐标（如初始化时）
 */
function syncAvatarOverlay(coordinates?: number[]) {
  if (avatarOverlay && coordinates) {
    // 直接使用传入的坐标
    avatarOverlay.setPosition(coordinates)
  } else if (avatarOverlay && movingPointFeature) {
    // 从移动点获取坐标
    updateAvatarOverlayPosition()
  }
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
  const currentTotalPoints = currentTrackPoints.value.length
  if (currentTotalPoints === 0) return 0
  return (progress.value / currentTotalPoints) * 100
})

/**
 * 动画移动点
 * 
 * 功能说明：
 * - 实现轨迹播放动画的核心函数
 * - 在两点之间进行插值计算，实现平滑移动
 * - 同步更新移动点和头像位置
 * - 基于 currentTrackPoints 数据进行播放
 * 
 * 动画逻辑：
 * 1. 检查播放状态和必要组件
 * 2. 获取当前轨迹的坐标数组
 * 3. 检查是否到达终点
 * 4. 计算插值坐标并更新位置
 * 5. 递归调用实现连续动画
 */
const animateMovingPoint = () => {
  // 检查播放状态和必要组件
  if (!isPlaying.value || !map || !movingPointFeature) return
  
  // 获取当前轨迹的坐标数组（基于 currentTrackPoints）
  const coordinates = (currentTrackPoints.value || []).map((point: any) => fromLonLat([point.lon, point.lat]))
  
  // 检查是否到达终点
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
    // 更新 avatarOverlay 位置
    syncAvatarOverlay(interpolatedCoord)
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
  const currentTotalPoints = currentTrackPoints.value.length
  if (currentIndex >= currentTotalPoints - 1) {
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
  } else if (currentLayer.value === 'satellite') {
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

const togglePanel = () => {
  isPanelHidden.value = !isPanelHidden.value
}

// 当前显示的轨迹点 - 地图渲染和动画的数据源
const currentTrackPoints = ref<any[]>([])

/**
 * 处理传入的轨迹数据
 * 
 * 功能说明：
 * - 将传入的props.trackPoints转换为组件内部使用的格式
 * - 设置默认的timestamp和location字段
 */
function processTrackData() {
  if (!props.trackPoints || props.trackPoints.length === 0) {
    // 如果没有数据，使用默认数据
    const base = [57.5, 21.5]
    const defaultData = Array.from({ length: 3 }, (_, i) => ({
      lon: base[0] + i * 0.1,
      lat: base[1] + i * 0.05,
      timestamp: new Date(Date.now() - i * 86400000),
      location: `Point ${i + 1}`,
      weight: 1
    }))
    currentTrackPoints.value = defaultData
    return
  }

  // 处理传入的数据
  const processedData = props.trackPoints.map((point: any, index: number) => ({
    lon: point.lon,
    lat: point.lat,
    timestamp: point.timestamp || new Date(Date.now() - index * 3600000),
    location: point.location || `Point ${index + 1}`,
    weight: point.weight || 1,
    ...point // 保留其他字段
  }))

  currentTrackPoints.value = processedData
}

onMounted(() => {
  processTrackData()
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
  })
})

onUnmounted(() => {
  if (movingPointBlinkTimer) clearInterval(movingPointBlinkTimer)
  if (avatarOverlay && map) {
    try {
      (map as any).removeOverlay(avatarOverlay)
    } catch (e) {
      // 忽略移除覆盖层时的错误
    }
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
  const coordinates = (currentTrackPoints.value || []).map((point: any) => fromLonLat([point.lon, point.lat]))
  if (coordinates.length > 0 && movingPointFeature && movingPointFeature.getGeometry()) {
    const geometry = movingPointFeature.getGeometry() as Point
    geometry.setCoordinates(coordinates[0])
    currentIndex = 0
    // 更新 avatarOverlay 位置
    syncAvatarOverlay(coordinates[0])
  }
}


/**
 * 聚焦到指定轨迹点
 * 
 * 功能说明：
 * - 点击数据行时调用，用于聚焦到特定的轨迹点
 * - 支持两种调用方式：数组、单个点
 * - 会自动更新地图显示和移动点位置
 * 
 * 参数说明：
 * @param point - 轨迹点数据或轨迹点数组
 * 
 * 调用场景：
 * 1. 传入数组：直接显示该数组的所有轨迹点
 * 2. 传入单个点：显示该点
 */
function focusOnPoint(point: any) {
  if (!map) return;
  
  // 场景1: 传入数组，直接使用该数组作为轨迹数据
  if (Array.isArray(point)) {
    currentTrackPoints.value = point;
    renderMap();
    nextTick(() => {
      fitTrackExtent();
      // 确保 avatarOverlay 位置正确
      setTimeout(() => {
        if (movingPointFeature && movingPointFeature.getGeometry()) {
          const geometry = movingPointFeature.getGeometry() as Point;
          syncAvatarOverlay(geometry.getCoordinates());
        }
      }, 100);
    });
    return;
  }
  
  // 场景2: 传入单个点
  currentTrackPoints.value = [point];
  renderMap();
  currentIndex = 0;
  isPlaying.value = false;
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  if (movingPointFeature && movingPointFeature.getGeometry()) {
    const geometry = movingPointFeature.getGeometry() as Point;
    const coords = fromLonLat([point.lon, point.lat]);
    geometry.setCoordinates(coords);
    // 立即更新 avatarOverlay 位置
    syncAvatarOverlay(coords);
  }
  nextTick(() => {
    fitTrackExtent();
    // 确保 avatarOverlay 位置正确
    setTimeout(() => {
      if (movingPointFeature && movingPointFeature.getGeometry()) {
        const geometry = movingPointFeature.getGeometry() as Point;
        syncAvatarOverlay(geometry.getCoordinates());
      }
    }, 100);
  });
}

/**
 * 渲染地图
 * 
 * 功能说明：
 * - 重新创建和渲染整个地图
 * - 基于 currentTrackPoints 数据渲染轨迹
 * - 清理旧的地图组件并创建新的
 * - 设置移动点和头像覆盖层
 * 
 * 渲染流程：
 * 1. 清理旧地图和图层
 * 2. 从 currentTrackPoints 生成坐标数组
 * 3. 创建轨迹线和轨迹点
 * 4. 创建地图实例和图层
 * 5. 创建移动点和头像覆盖层
 * 6. 适应视图范围
 */
const renderMap = () => {
  if (!mapContainer.value) return

  // 步骤1: 清理旧地图和图层
  if (map) {
    // 清理 avatarOverlay
    if (avatarOverlay) {
      try {
        (map as any).removeOverlay(avatarOverlay);
      } catch (e) {
        // 忽略移除错误
      }
      avatarOverlay = null;
    }
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

  // 步骤2: 从 currentTrackPoints 生成坐标数组
  const coordinates = (currentTrackPoints.value || []).map((point: any) => 
    fromLonLat([point.lon, point.lat])
  )
  // 步骤3: 创建轨迹线和轨迹点
  const trackPoints: Feature[] = []
  const trackFeature = new Feature({
    geometry: new LineString(coordinates)
  })
  trackFeature.setStyle(createTrackStyle())
  
  // 为每个坐标点创建轨迹点特征
  coordinates.forEach((coord: any, index: number) => {
    const pointFeature = new Feature({
      geometry: new Point(coord)
    })
    pointFeature.setId(index)
    // 设置不同样式：起点、终点、中间点
    if (index === 0) pointFeature.setStyle(new Style({ image: new Icon({ src: startIconSvg, anchor: [0.5, 0.5], scale: 1 }) }))
    else if (index === coordinates.length - 1) pointFeature.setStyle(new Style({ image: new Icon({ src: endIconSvg, anchor: [0.5, 0.5], scale: 1 }) }))
    else pointFeature.setStyle(createPointStyle(false, false))
    trackPoints.push(pointFeature)
  })
  
  // 合并所有特征并创建图层
  const features: Feature[] = [trackFeature, ...trackPoints]
  trackSource = new VectorSource({ features })
  trackLayer = new VectorLayer({ source: trackSource })
  trackLayer.set('name', 'track')
  
  // 步骤4: 创建地图实例和图层
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
  // 步骤5: 创建移动点和头像覆盖层
  if (coordinates.length > 0) {
    // 创建移动点特征
    movingPointFeature = new Feature({
      geometry: new Point(coordinates[0])
    })
    movingPointFeature.setStyle(createMovingPointStyle())
    
    // 创建移动点图层
    movingPointSource = new VectorSource({
      features: [movingPointFeature]
    })
    movingPointLayer = new VectorLayer({
      source: movingPointSource
    })
    movingPointLayer.set('name', 'movingPoint')
    map.addLayer(movingPointLayer)
    
    // 创建头像覆盖层
    createAvatarOverlay()
    
    // 设置初始位置
    if (movingPointFeature && movingPointFeature.getGeometry()) {
      const geometry = movingPointFeature.getGeometry() as Point;
      syncAvatarOverlay(geometry.getCoordinates());
    }
    
    // 步骤6: 适应视图范围
    if (trackSource) {
      const extent = trackSource.getExtent()
      map.getView().fit(extent, {
        padding: [50, 50, 50, 50],
        duration: 1000
      })
    }
  }
  map.on('singleclick', (evt: any) => {
    if (map) {
      const coordinates = (currentTrackPoints.value || []).map((point: any) => fromLonLat([point.lon, point.lat]))
      map.forEachFeatureAtPixel(evt.pixel, (feature: any) => {
        const id = feature.getId()
        if (typeof id === 'number') {
          if (movingPointFeature && movingPointFeature.getGeometry()) {
            const geometry = movingPointFeature.getGeometry() as Point
            geometry.setCoordinates(coordinates[id])
            // 更新 avatarOverlay 位置
            syncAvatarOverlay(coordinates[id])
          }
          currentIndex = id
          isPlaying.value = false
          if (animationId) {
            cancelAnimationFrame(animationId)
            animationId = null
          }
        }
      })
    }
  })
}

watch(() => props.trackPoints, () => {
  stopAnimation()
  processTrackData()
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
  if (avatarOverlay) {
    avatarOverlay = null
  }
  renderMap()
})

defineExpose({
  startAnimation,
  stopAnimation
})
// 弹窗浮动定位样式
const avatarFloatStyle = computed(() => {
  if (!avatarOverlay || !avatarOverlay.getPosition() || !map) return {}
  const position = avatarOverlay.getPosition()
  if (!position) return {}
  const pixel = map.getPixelFromCoordinate(position)
  if (!pixel) return {}
  // 头像宽48，右侧偏移8px，卡片宽220
  return {
    position: 'absolute',
    left: `${pixel[0] + 32}px`, // 头像右侧8px间距
    top: `${pixel[1] - 48}px`, // 顶部对齐头像
    zIndex: 1001
  }
})



function fitTrackExtent() {
  if (!map || !trackSource) return
  const extent = trackSource.getExtent()
  map.getView().fit(extent, {
    padding: [50, 50, 50, 50],
    duration: 800
  })
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
  height: 500px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

/* 悬浮控制面板样式 */
.floating-control-panel {
  position: absolute;
  top: 10px;
  right: 5px;
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-radius: 20px;
  z-index: 1000;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: visible;
  min-width: 320px;
  width: 320px;
}

/* 主题适配样式 */
.map-track-container .floating-control-panel {
  background: var(--bg-card) !important;
  border: 1px solid var(--border-card) !important;
  box-shadow: var(--shadow-card) !important;
}



.map-track-container .floating-control-panel.hidden {
  transform: translateX(calc(100% - 80px));
  opacity: 0.8;
  background: var(--bg-card) !important;
  border: 1px solid var(--border-card) !important;
}

.map-track-container .floating-control-panel.hidden:hover {
  opacity: 1;
  background: var(--bg-card) !important;
  transform: translateX(calc(100% - 90px));
  border: 1px solid var(--border-card) !important;
}



.panel-toggle-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: var(--accent-secondary);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: var(--accent-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 1001;
  box-shadow: var(--shadow-card-light);
  border: 1px solid var(--accent-primary);
}

/* 确保切换按钮在隐藏状态下仍然可见 */
.floating-control-panel.hidden .panel-toggle-btn {
  right: 12px;
  background: var(--accent-secondary);
  color: var(--accent-primary);
  box-shadow: var(--shadow-card-light);
}

/* 确保图层切换按钮在隐藏状态下仍然可见 */
.floating-control-panel.hidden .map-layer-toggle-btn {
  top: 60px;
  right: 12px;
  background: var(--accent-secondary);
  color: var(--accent-primary);
  box-shadow: var(--shadow-card-light);
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
  background: var(--accent-hover);
  color: var(--accent-primary);
  transform: scale(1.05);
  box-shadow: var(--shadow-card);
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
  text-align: center;
}

.main-controls {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 16px;
}

.floating-control-panel .control-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 14px;
  background: var(--accent-secondary);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: var(--shadow-card-light);
  border: 1px solid var(--border-card);
  position: relative;
}

.floating-control-panel .control-btn:hover {
  transform: translateY(-3px);
  background: var(--accent-hover);
  box-shadow: var(--shadow-card);
}

.floating-control-panel .control-btn.active {
  background: var(--accent-primary);
  color: white;
  box-shadow: var(--shadow-card);
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

.floating-control-panel .play-btn {
  background: var(--accent-secondary);
  color: var(--accent-primary);
  border: 1px solid var(--accent-primary);
}

.floating-control-panel .play-btn:hover {
  background: var(--accent-hover);
  color: var(--accent-primary);
  border: 1px solid var(--accent-primary);
}

.floating-control-panel .stop-btn {
  background: var(--accent-secondary);
  color: var(--accent-primary);
  border: 1px solid var(--accent-primary);
}

.floating-control-panel .stop-btn:hover {
  background: var(--accent-hover);
  color: var(--accent-primary);
  border: 1px solid var(--accent-primary);
}

.floating-control-panel .map-layer-toggle-btn {
  background: rgba(99, 102, 241, 0.2);
  color: #6366f1;
}

.floating-control-panel .map-layer-toggle-btn:hover {
  background: rgba(99, 102, 241, 0.3);
  color: white;
}

.floating-control-panel .mode-btn {
  background: rgba(139, 92, 246, 0.2);
  color: #8b5cf6;
}

.floating-control-panel .mode-btn:hover {
  background: rgba(139, 92, 246, 0.3);
  color: white;
}

.floating-control-panel .mode-btn.active {
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
  background: var(--accent-secondary);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 10px 16px;
  border: 1px solid var(--border-card);
  box-shadow: var(--shadow-card-light);
}

.speed-btn {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 6px;
  background: var(--bg-card);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  color: var(--text-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border: 1px solid var(--border-card);
}

.speed-btn:hover:not(:disabled) {
  background: var(--accent-hover);
  color: var(--accent-primary);
  transform: scale(1.1);
}

.speed-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
  background: var(--bg-tertiary);
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
  background: var(--accent-secondary);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 10px 16px;
  border: 1px solid var(--border-card);
  box-shadow: var(--shadow-card-light);
}

.progress-bar {
  flex: 1;
  height: 10px;
  background: var(--bg-tertiary);
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid var(--border-card);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-primary), var(--accent-hover));
  border-radius: 6px;
  transition: width 0.3s ease;
  box-shadow: var(--shadow-card-light);
}

.progress-text {
  font-size: 0.875rem;
  color: var(--text-primary);
  font-weight: 600;
  min-width: 60px;
  text-align: center;
}

.progress-percent {
  color: var(--accent-primary);
  margin-left: 6px;
  font-weight: bold;
}




/* 图层切换按钮样式 */
.map-layer-toggle-btn {
  position: absolute;
  top: 60px;
  right: 12px;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: var(--accent-secondary);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  color: var(--accent-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 1001;
  box-shadow: var(--shadow-card-light);
  border: 1px solid var(--accent-primary);
}

.map-layer-toggle-btn:hover {
  background: var(--accent-hover);
  color: var(--accent-primary);
  transform: scale(1.05);
  box-shadow: var(--shadow-card);
}

.map-layer-toggle-btn.active {
  background: var(--accent-primary);
  color: white;
  box-shadow: var(--shadow-card);
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

.avatar-float-info {
  min-width: 180px;
  max-width: 260px;
  background: var(--bg-card);
  border-radius: 12px;
  box-shadow: var(--shadow-card);
  padding: 14px 18px 10px 18px;
  position: absolute;
  backdrop-filter: blur(18px) saturate(180%);
  -webkit-backdrop-filter: blur(18px) saturate(180%);
  border: 1px solid var(--border-card);
  transition: all 0.2s;
  pointer-events: auto;
}
.avatar-float-info h4 {
  margin: 0 0 8px 0;
  font-size: 1rem;
  font-weight: 700;
  text-align: left;
  color: var(--text-primary);
}
.avatar-float-info .avatar-dialog-row {
  display: flex;
  gap: 8px;
  font-size: 0.95rem;
  margin-bottom: 6px;
}
.avatar-float-info .avatar-dialog-row .label {
  color: var(--text-secondary);
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
  background: var(--accent-primary);
  color: #fff;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.2s;
}
.avatar-float-info .avatar-dialog-close:hover {
  background: var(--accent-primary-dark-2);
}

.moving-avatar {
  position: relative;
  z-index: 1000;
  pointer-events: auto;
}
</style> 