<template>
  <div class="app-container">
    <!-- 导航栏 -->
    <NavigationBar />
    
    <!-- 波浪背景和内容 -->
    <WaveBackground>
      <div class="wave-demo-container">
        <div class="page-header">
          <h1>Location Marker</h1>
          <p>Display location with animated marker</p>
        </div>
        
        <div class="content-area">
          <!-- 位置信息卡片 -->
          <div class="location-card">
            <div class="location-info">
              <h3>Location Details</h3>
              <div class="info-grid">
                <div class="info-item">
                  <span class="info-label">Name:</span>
                  <span class="info-value">{{ currentLocation.name || 'Unknown Location' }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Latitude:</span>
                  <span class="info-value">{{ currentLocation.lat.toFixed(6) }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Longitude:</span>
                  <span class="info-value">{{ currentLocation.lon.toFixed(6) }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">Zoom Level:</span>
                  <span class="info-value">{{ zoomLevel }}</span>
                </div>
              </div>
            </div>
            
            <!-- 控制面板 -->
            <div class="control-panel">
              <h4>Controls</h4>
              <div class="control-group">
                <label>Zoom Level:</label>
                <el-slider
                  v-model="zoomLevel"
                  :min="8"
                  :max="18"
                  :step="1"
                  show-input
                  input-size="small"
                />
              </div>
              
              <div class="location-buttons">
                <el-button 
                  v-for="location in sampleLocations" 
                  :key="location.name"
                  @click="setLocation(location)"
                  :type="currentLocation.name === location.name ? 'primary' : 'default'"
                  size="small"
                >
                  {{ location.name }}
                </el-button>
              </div>
            </div>
          </div>
          
          <!-- 地图组件 -->
          <LocationMarker 
            :location="currentLocation"
            :zoom="zoomLevel"
          />
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
import LocationMarker from '../components/LocationMarker.vue'

// 当前session ID
const currentSessionId = ref<string | null>(null)

// 当前位置
const currentLocation = ref({
  lon: 57.5,
  lat: 21.5,
  name: 'Muscat, Oman'
})

// 缩放级别
const zoomLevel = ref(12)

// 示例位置
const sampleLocations = [
  {
    lon: 57.5,
    lat: 21.5,
    name: 'Muscat, Oman'
  },
  {
    lon: 55.2708,
    lat: 25.2048,
    name: 'Dubai, UAE'
  },
  {
    lon: 46.6753,
    lat: 24.7136,
    name: 'Riyadh, Saudi Arabia'
  },
  {
    lon: 51.3890,
    lat: 35.6892,
    name: 'Tehran, Iran'
  },
  {
    lon: 74.2179,
    lat: 31.5204,
    name: 'Lahore, Pakistan'
  }
]

// 设置位置
const setLocation = (location: any) => {
  currentLocation.value = { ...location }
}

// 组件挂载时获取session ID
onMounted(() => {
  currentSessionId.value = getSessionIdFromUrl()
})
</script>

<style scoped>
.content-area {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.location-card {
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid var(--border-card);
  box-shadow: var(--shadow-card);
  margin-bottom: 2rem;
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
}

.location-info h3 {
  margin: 0 0 1.5rem 0;
  color: var(--text-primary);
  font-size: 1.25rem;
  font-weight: 600;
}

.info-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: var(--bg-primary);
  border-radius: 8px;
  border: 1px solid var(--border-card);
}

.info-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.info-value {
  font-size: 0.875rem;
  color: var(--text-primary);
  font-weight: 600;
}

.control-panel h4 {
  margin: 0 0 1rem 0;
  color: var(--text-primary);
  font-size: 1rem;
  font-weight: 600;
}

.control-group {
  margin-bottom: 1.5rem;
}

.control-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.location-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.location-buttons .el-button {
  justify-content: flex-start;
  text-align: left;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .location-card {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .content-area {
    padding: 1rem;
  }
}
</style> 