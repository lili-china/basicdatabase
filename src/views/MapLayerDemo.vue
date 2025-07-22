<template>
  <div class="app-container">
    <!-- 导航栏 -->
    <NavigationBar />
    
    <!-- 波浪背景和内容 -->
    <WaveBackground>
      <div class="wave-demo-container">
        <div class="page-header">
          <h1>Map Layer Demo</h1>
          <p>Demonstrate layer switching with getMap() method</p>
        </div>
        
        <div class="content-area">
          <!-- 控制面板 -->
          <div class="control-panel">
            <h3>Layer Controls</h3>
            
            <!-- 热力图控制 -->
            <div class="control-section">
              <h4>Heatmap Controls</h4>
              <div class="button-group">
                <el-button @click="toggleHeatmapLayer" :type="heatmapVisible ? 'primary' : 'default'">
                  {{ heatmapVisible ? 'Hide' : 'Show' }} Heatmap
                </el-button>
                <el-button @click="changeHeatmapRadius" type="info">
                  Change Radius
                </el-button>
              </div>
            </div>
            
            <!-- 位置标记控制 -->
            <div class="control-section">
              <h4>Location Marker Controls</h4>
              <div class="button-group">
                <el-button @click="toggleMarkerLayer" :type="markerVisible ? 'primary' : 'default'">
                  {{ markerVisible ? 'Hide' : 'Show' }} Marker
                </el-button>
                <el-button @click="toggleAnimationLayer" :type="animationVisible ? 'primary' : 'default'">
                  {{ animationVisible ? 'Stop' : 'Start' }} Animation
                </el-button>
              </div>
            </div>
            
            <!-- 基础图层控制 -->
            <div class="control-section">
              <h4>Base Layer Controls</h4>
              <div class="button-group">
                <el-button @click="switchToOSM" :type="currentBaseLayer === 'osm' ? 'primary' : 'default'">
                  OpenStreetMap
                </el-button>
                <el-button @click="switchToSatellite" :type="currentBaseLayer === 'satellite' ? 'primary' : 'default'">
                  Satellite
                </el-button>
              </div>
            </div>
          </div>
          
          <!-- 地图容器 -->
          <div class="map-container">
            <div class="map-section">
              <h4>Heatmap</h4>
              <MapHeatmap 
                ref="heatmapRef"
                :points="heatmapPoints" 
              />
            </div>
            
            <div class="map-section">
              <h4>Location Marker</h4>
              <LocationMarker 
                ref="markerRef"
                :location="markerLocation"
                :zoom="12"
              />
            </div>
          </div>
        </div>
      </div>
    </WaveBackground>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getSessionIdFromUrl } from '@/utils/sessionValidator'
import WaveBackground from '../components/WaveBackground.vue'
import NavigationBar from '../components/NavigationBar.vue'
import MapHeatmap from '../components/MapHeatmap.vue'
import LocationMarker from '../components/LocationMarker.vue'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'

// 当前session ID
const currentSessionId = ref<string | null>(null)

// 组件引用
const heatmapRef = ref<InstanceType<typeof MapHeatmap> | null>(null)
const markerRef = ref<InstanceType<typeof LocationMarker> | null>(null)

// 状态控制
const heatmapVisible = ref(true)
const markerVisible = ref(true)
const animationVisible = ref(true)
const currentBaseLayer = ref('osm')

// 热力图数据
const heatmapPoints = ref([
  { lon: 57.5, lat: 21.5, weight: 1 },
  { lon: 57.6, lat: 21.6, weight: 2 },
  { lon: 57.4, lat: 21.4, weight: 1.5 },
  { lon: 57.7, lat: 21.3, weight: 3 },
  { lon: 57.3, lat: 21.7, weight: 2.5 }
])

// 位置标记数据
const markerLocation = ref({
  lon: 57.5,
  lat: 21.5,
  name: 'Muscat, Oman'
})

// 切换热力图层
const toggleHeatmapLayer = () => {
  const map = heatmapRef.value?.getMap()
  if (map) {
    const layers = map.getLayers()
    const heatmapLayer = layers.getArray().find(layer => layer.get('name') === 'heatmap')
    if (heatmapLayer) {
      heatmapLayer.setVisible(!heatmapVisible.value)
      heatmapVisible.value = !heatmapVisible.value
    }
  }
}

// 改变热力图半径
const changeHeatmapRadius = () => {
  const map = heatmapRef.value?.getMap()
  if (map) {
    const layers = map.getLayers()
    const heatmapLayer = layers.getArray().find(layer => layer.get('name') === 'heatmap')
    if (heatmapLayer) {
      const currentRadius = heatmapLayer.get('radius') || 15
      const newRadius = currentRadius === 15 ? 25 : 15
      heatmapLayer.set('radius', newRadius)
      heatmapLayer.changed()
    }
  }
}

// 切换标记图层
const toggleMarkerLayer = () => {
  const map = markerRef.value?.getMap()
  if (map) {
    const layers = map.getLayers()
    const markerLayer = layers.getArray().find(layer => layer.get('name') === 'marker')
    if (markerLayer) {
      markerLayer.setVisible(!markerVisible.value)
      markerVisible.value = !markerVisible.value
    }
  }
}

// 切换动画图层
const toggleAnimationLayer = () => {
  const map = markerRef.value?.getMap()
  if (map) {
    const layers = map.getLayers()
    const animationLayer = layers.getArray().find(layer => layer.get('name') === 'animation')
    if (animationLayer) {
      animationLayer.setVisible(!animationVisible.value)
      animationVisible.value = !animationVisible.value
    }
  }
}

// 切换到OSM图层
const switchToOSM = () => {
  const map = heatmapRef.value?.getMap()
  if (map) {
    const layers = map.getLayers()
    const baseLayer = layers.getArray().find(layer => layer.get('name') === 'base') as TileLayer
    if (baseLayer) {
      baseLayer.setSource(new XYZ({
        url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      }))
      currentBaseLayer.value = 'osm'
    }
  }
}

// 切换到卫星图层
const switchToSatellite = () => {
  const map = heatmapRef.value?.getMap()
  if (map) {
    const layers = map.getLayers()
    const baseLayer = layers.getArray().find(layer => layer.get('name') === 'base') as TileLayer
    if (baseLayer) {
      baseLayer.setSource(new XYZ({
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      }))
      currentBaseLayer.value = 'satellite'
    }
  }
}

// 组件挂载时获取session ID
onMounted(() => {
  currentSessionId.value = getSessionIdFromUrl()
})
</script>

<style scoped>
.content-area {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.control-panel {
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid var(--border-card);
  box-shadow: var(--shadow-card);
  margin-bottom: 2rem;
}

.control-panel h3 {
  margin: 0 0 1.5rem 0;
  color: var(--text-primary);
  font-size: 1.25rem;
  font-weight: 600;
}

.control-section {
  margin-bottom: 2rem;
}

.control-section h4 {
  margin: 0 0 1rem 0;
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 600;
}

.button-group {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.map-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.map-section {
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid var(--border-card);
  box-shadow: var(--shadow-card);
}

.map-section h4 {
  margin: 0 0 1rem 0;
  color: var(--text-primary);
  font-size: 1.125rem;
  font-weight: 600;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .map-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .content-area {
    padding: 1rem;
  }
  
  .button-group {
    flex-direction: column;
  }
}
</style> 