<template>
  <div class="app-container">
    <!-- 导航栏 -->
    <NavigationBar />
    
    <!-- 波浪背景和内容 -->
    <WaveBackground>
      <div class="wave-demo-container">
        <div class="page-header">
          <h1>Map Heatmap</h1>
          <p>Visualize data distribution with heatmap</p>
        </div>
        
        <div class="content-area">
                     <!-- 搜索和筛选区域 -->
           <div class="search-section">
             <div class="search-filters">
               <div class="filter-row">
                 <!-- Phone Number Filter -->
                 <div class="filter-group">
                   <label class="filter-label">Phone Number</label>
                   <el-input
                     v-model="phoneNumber"
                     placeholder="Enter phone number"
                     class="filter-input"
                     clearable
                   >
                     <template #prefix>
                       <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                         <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                       </svg>
                     </template>
                   </el-input>
                 </div>

                 <!-- Time Range Selection -->
                 <div class="filter-group">
                   <label class="filter-label">Time Range</label>
                   <el-date-picker
                     v-model="dateRange"
                     type="daterange"
                     range-separator="to"
                     start-placeholder="Start Date"
                     end-placeholder="End Date"
                     format="YYYY-MM-DD"
                     value-format="YYYY-MM-DD"
                     class="filter-input"
                   />
                 </div>

                                   <!-- Action Buttons -->
                  <div class="filter-group">
                    <label class="filter-label">Actions</label>
                    <div class="filter-actions">
                      <el-button type="primary" @click="updateHeatmap" class="search-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="search-icon">
                          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Search
                      </el-button>
                      <el-button @click="resetFilters" class="reset-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="reset-icon">
                          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M3 3v5h5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Reset
                      </el-button>
                      <el-button @click="toggleDisplayMode" class="mode-btn" :class="{ active: displayMode === 'track' }">
                        <svg v-if="displayMode === 'heatmap'" width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M3 3L21 3L21 21L3 21L3 3Z" stroke="currentColor" stroke-width="2"/>
                          <path d="M9 9L15 9" stroke="currentColor" stroke-width="2"/>
                          <path d="M9 13L15 13" stroke="currentColor" stroke-width="2"/>
                          <path d="M9 17L15 17" stroke="currentColor" stroke-width="2"/>
                        </svg>
                        <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M2 12L8 6L14 12L22 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <circle cx="8" cy="6" r="2" fill="currentColor"/>
                          <circle cx="14" cy="12" r="2" fill="currentColor"/>
                          <circle cx="22" cy="6" r="2" fill="currentColor"/>
                        </svg>
                        {{ displayMode === 'heatmap' ? 'Track Mode' : 'Heatmap Mode' }}
                      </el-button>
                      <el-button @click="toggleDataPanel" class="data-btn" :class="{ active: isDataPanelVisible }">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2"/>
                          <polyline points="14,2 14,8 20,8" stroke="currentColor" stroke-width="2"/>
                          <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" stroke-width="2"/>
                          <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" stroke-width="2"/>
                          <polyline points="10,9 9,9 8,9" stroke="currentColor" stroke-width="2"/>
                        </svg>
                        Data Panel
                      </el-button>
                    </div>
                  </div>
               </div>
             </div>
           </div>

                     <!-- Map Section -->
           <div class="map-section">
             <!-- 使用热力图组件 -->
             <MapHeatmap v-if="displayMode === 'heatmap'" :points="filteredDataPoints" />
             
             <!-- 使用轨迹组件 -->
             <MapTrack v-else :trackPoints="filteredDataPoints" />
           </div>
         </div>
       </div>
     </WaveBackground>
     
     <!-- Data Panel - Slides in from right -->
     <div class="data-panel" :class="{ 'data-panel-visible': isDataPanelVisible }">
       <div class="data-panel-header">
         <h3>Data Statistics</h3>
         <button @click="toggleDataPanel" class="close-btn" title="Close Panel">
           <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
             <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
             <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
           </svg>
         </button>
       </div>
       
               <div class="data-panel-content">
                     <div class="data-section">
             <h4>Search Statistics</h4>
             <div class="data-item">
               <span class="data-label">Total Points:</span>
               <span class="data-value">{{ samplePoints.length }}</span>
             </div>
                           <div class="data-item">
                <span class="data-label">Displayed Points:</span>
                <span class="data-value" :class="{ 'all-points': !selectedGroup && !selectedPoint }">
                  {{ filteredDataPoints.length }}
                  <span v-if="!selectedGroup && !selectedPoint" class="all-points-indicator">(All Points)</span>
                </span>
              </div>
                           <div class="data-item">
                <span class="data-label">Selected Group:</span>
                <span class="data-value">{{ selectedGroup ? formatDate(selectedGroup) : 'All Groups (Showing All Points)' }}</span>
              </div>
              <div class="data-item">
                <span class="data-label">Selected Point:</span>
                <span class="data-value">{{ selectedPoint ? `Lat: ${selectedPoint.lat.toFixed(4)}, Lon: ${selectedPoint.lon.toFixed(4)}` : 'None (Showing All Points)' }}</span>
              </div>
             <div class="data-item">
               <span class="data-label">Phone Number:</span>
               <span class="data-value">{{ phoneNumber || 'Not specified' }}</span>
             </div>
             <div class="data-item">
               <span class="data-label">Time Range:</span>
               <span class="data-value">{{ dateRange.length > 0 ? `${dateRange[0]} to ${dateRange[1]}` : 'Not specified' }}</span>
             </div>
           </div>
          
                     <div class="data-section">
             <h4>Map Settings</h4>
                           <div class="data-item">
                <span class="data-label">Map Layer:</span>
                <span class="data-value">Standard</span>
              </div>
                                                       <div class="data-item">
                 <span class="data-label">Display Mode:</span>
                 <span class="data-value">{{ displayMode === 'heatmap' ? 'Heatmap' : 'Track (with lines)' }}</span>
               </div>
               <div class="data-item">
                 <span class="data-label">Animation Status:</span>
                 <span class="data-value">
                   {{ displayMode === 'track' ? 'Available in Track Mode' : 'Not Available in Heatmap Mode' }}
                 </span>
               </div>
           </div>
         
                   <div class="data-section">
            <h4>Data Points by Day</h4>
                         <div class="data-groups-list">
               <div v-for="(group, date) in groupedDataPoints" :key="date" class="data-group" :class="{ 'selected': selectedGroup === date }">
                 <div class="group-header">
                   <div class="group-info" @click="selectGroup(date)">
                     <span class="group-date">{{ formatDate(date) }}</span>
                     <span class="group-count">{{ group.length }} points</span>
                   </div>
                   <div class="group-actions">
                     <button 
                       class="select-btn" 
                       :class="{ 'active': selectedGroup === date }"
                       @click="selectGroup(date)"
                       title="Show this group on map"
                     >
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                         <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" stroke-width="2"/>
                         <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2"/>
                       </svg>
                     </button>
                     <button 
                       class="expand-btn"
                       @click="toggleGroup(date)"
                       title="Expand/collapse details"
                     >
                       <svg 
                         class="expand-icon" 
                         :class="{ 'expanded': expandedGroups.includes(date) }"
                         width="16" 
                         height="16" 
                         viewBox="0 0 24 24" 
                         fill="none"
                       >
                         <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                       </svg>
                     </button>
                   </div>
                 </div>
                                 <div class="group-content" :class="{ 'expanded': expandedGroups.includes(date) }">
                   <div 
                     v-for="(point, index) in group" 
                     :key="index" 
                     class="data-point-item"
                     :class="{ 'selected': selectedPoint === point }"
                     @click="selectPoint(point)"
                   >
                     <div class="point-coordinates">
                       <span class="coord-label">Lat:</span>
                       <span class="coord-value">{{ point.lat.toFixed(4) }}</span>
                       <span class="coord-label">Lon:</span>
                       <span class="coord-value">{{ point.lon.toFixed(4) }}</span>
                     </div>
                     <div class="point-weight">
                       <span class="weight-label">Weight:</span>
                       <span class="weight-value">{{ point.weight }}</span>
                     </div>
                     <div class="point-actions">
                       <button 
                         class="point-select-btn" 
                         :class="{ 'active': selectedPoint === point }"
                         @click.stop="selectPoint(point)"
                         title="Show this point on map"
                       >
                         <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                           <path d="M21 10C21 17 12 23 12 23S3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" stroke-width="2"/>
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
 </template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick, computed } from 'vue'
import NavigationBar from '../components/NavigationBar.vue'
import WaveBackground from '../components/WaveBackground.vue'
import { MapHeatmap, MapTrack } from '../components/map-components'

// Filter conditions
const phoneNumber = ref('')
const dateRange = ref([])

// Data panel state
const isDataPanelVisible = ref(false)

// Display mode state
const displayMode = ref<'heatmap' | 'track'>('heatmap')

// Animation state - 现在由MapTrack组件处理

// Sample data - can be modified as needed
const samplePoints = ref([
  { lon: 57.5, lat: 21.5, weight: 1, date: '2024-01-15' },
  { lon: 58.0, lat: 21.0, weight: 2, date: '2024-01-15' },
  { lon: 57.0, lat: 22.0, weight: 1.5, date: '2024-01-16' },
  { lon: 58.5, lat: 21.8, weight: 3, date: '2024-01-16' },
  { lon: 56.8, lat: 21.2, weight: 1.8, date: '2024-01-17' },
  { lon: 57.2, lat: 21.6, weight: 2.2, date: '2024-01-17' },
  { lon: 58.2, lat: 21.3, weight: 1.3, date: '2024-01-18' }
])

// Group management
const expandedGroups = ref<string[]>([])
const selectedGroup = ref<string | null>(null)
const selectedPoint = ref<any>(null)

// Computed property to group data points by date
const groupedDataPoints = computed(() => {
  const groups: Record<string, any[]> = {}
  samplePoints.value.forEach(point => {
    const date = point.date || 'Unknown'
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(point)
  })
  return groups
})

// Computed property for filtered data points based on selected group and point
const filteredDataPoints = computed(() => {
  if (selectedPoint.value) {
    return [selectedPoint.value]
  }
  if (selectedGroup.value) {
    return samplePoints.value.filter(point => point.date === selectedGroup.value)
  }
  return samplePoints.value
})

// Filter methods
const updateHeatmap = () => {
  // Update heatmap data based on filter conditions
  console.log('Update heatmap:', {
    phoneNumber: phoneNumber.value,
    dateRange: dateRange.value
  })
  
  // Here you can regenerate data points based on filter conditions
  // The map components will automatically update when filteredDataPoints changes
}

const resetFilters = () => {
  phoneNumber.value = ''
  dateRange.value = []
}

const toggleDataPanel = () => {
  isDataPanelVisible.value = !isDataPanelVisible.value
}

const toggleDisplayMode = () => {
  displayMode.value = displayMode.value === 'heatmap' ? 'track' : 'heatmap'
  console.log('Display mode changed to:', displayMode.value)
}

const toggleGroup = (date: string) => {
  const index = expandedGroups.value.indexOf(date)
  if (index > -1) {
    expandedGroups.value.splice(index, 1)
  } else {
    expandedGroups.value.push(date)
  }
}

const selectGroup = (date: string) => {
  if (selectedGroup.value === date) {
    // If clicking the same group, deselect it and show all points
    selectedGroup.value = null
    console.log('Deselected group - showing all points')
  } else {
    // Select the new group
    selectedGroup.value = date
    console.log('Selected group:', date)
  }
  // Clear point selection when selecting group
  selectedPoint.value = null
  // The map components will automatically update when filteredDataPoints changes
}

const selectPoint = (point: any) => {
  console.log('selectPoint called with:', point)
  if (selectedPoint.value === point) {
    // If clicking the same point, deselect it and show all points
    selectedPoint.value = null
    console.log('Deselected point - showing all points')
  } else {
    // Select the new point
    selectedPoint.value = point
    console.log('Selected point:', point)
  }
  // Clear group selection when selecting point
  selectedGroup.value = null
  // The map components will automatically update when filteredDataPoints changes
}

const formatDate = (dateString: string) => {
  if (dateString === 'Unknown') return 'Unknown Date'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

onMounted(async () => {
  await nextTick()
  console.log('MapHeatmapView mounted')
})

// Clean up resources when component unmounts
onUnmounted(() => {
  console.log('MapHeatmapView unmounted')
})
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  background: var(--bg-primary);
}

.wave-demo-container {
  padding-top: 80px;
  min-height: 100vh;
  position: relative;
  z-index: 1;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
  padding: 2rem 0;
}

.page-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-header p {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin: 0;
}

.content-area {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Search section styles */
.search-section {
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-card);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-card);
}

.search-filters {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.filter-row {
  display: flex;
  gap: 2rem;
  align-items: flex-end;
  flex-wrap: wrap;
}

.filter-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 200px;
}

.filter-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.region-filters {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.region-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-card);
  border-radius: 8px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  font-weight: 500;
}

.region-btn:hover {
  background: var(--accent-secondary);
  color: var(--accent-primary);
  border-color: var(--accent-primary);
}

.region-btn.active {
  background: var(--accent-primary);
  color: white;
  border-color: var(--accent-primary);
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 200px;
}

.filter-input {
  width: 100%;
}

.filter-actions {
  display: flex;
  gap: 0.5rem;
}

.search-btn, .reset-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.search-btn {
  background: var(--accent-primary);
  color: white;
  border: 1px solid var(--accent-primary);
}

.search-btn:hover {
  background: var(--accent-hover);
  border-color: var(--accent-hover);
}

.reset-btn {
  background: var(--bg-secondary);
  color: var(--text-secondary);
  border: 1px solid var(--border-card);
}

.reset-btn:hover {
  background: var(--accent-secondary);
  color: var(--accent-primary);
  border-color: var(--accent-primary);
}

.search-icon, .reset-icon {
  width: 16px;
  height: 16px;
}

/* Map section styles */
.map-section {
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-card);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: var(--shadow-card);
}

/* Data panel styles */
.data-panel {
  position: fixed;
  top: 0;
  right: -400px;
  width: 400px;
  height: 100vh;
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  border-left: 1px solid var(--border-card);
  box-shadow: var(--shadow-dialog);
  z-index: var(--z-dropdown);
  transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
}

.data-panel-visible {
  right: 0;
}

.data-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-secondary);
  background: var(--bg-secondary);
}

.data-panel-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-card);
  border-radius: 8px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: var(--accent-secondary);
  color: var(--accent-primary);
  border-color: var(--accent-primary);
}

.data-panel-content {
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;
}

.data-section {
  margin-bottom: 2rem;
}

.data-section h4 {
  margin: 0 0 1rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  border-bottom: 1px solid var(--border-secondary);
  padding-bottom: 0.5rem;
}

.data-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--border-secondary);
}

.data-item:last-child {
  border-bottom: none;
}

.data-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.data-value {
  font-size: 0.875rem;
  color: var(--text-primary);
  font-weight: 600;
}

.all-points {
  color: var(--accent-primary);
  font-weight: 700;
}

.all-points-indicator {
  font-size: 0.75rem;
  color: var(--accent-secondary);
  margin-left: 0.5rem;
  font-weight: 500;
}



.data-groups-list {
  max-height: 400px;
  overflow-y: auto;
}

.data-group {
  margin-bottom: 1rem;
  border: 1px solid var(--border-card);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s ease;
}

.data-group.selected {
  border-color: var(--accent-primary);
  box-shadow: 0 0 0 1px var(--accent-primary);
}

.group-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: var(--bg-secondary);
  transition: all 0.2s ease;
  border-bottom: 1px solid var(--border-card);
}

.group-info {
  cursor: pointer;
  flex: 1;
}

.group-info:hover {
  opacity: 0.8;
}

.group-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.select-btn, .expand-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 6px;
  background: var(--bg-card);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid var(--border-card);
}

.select-btn:hover, .expand-btn:hover {
  background: var(--accent-secondary);
  color: var(--accent-primary);
  border-color: var(--accent-primary);
}

.select-btn.active {
  background: var(--accent-primary);
  color: white;
  border-color: var(--accent-primary);
}

.group-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.group-date {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
}

.group-count {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.expand-icon {
  color: var(--text-secondary);
  transition: transform 0.2s ease;
}

.expand-icon.expanded {
  transform: rotate(180deg);
}

.group-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.group-content.expanded {
  max-height: 500px;
}

.data-point-item {
  padding: 0.75rem;
  background: var(--bg-card);
  border-bottom: 1px solid var(--border-secondary);
  margin: 0;
  border-radius: 0;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.data-point-item:hover {
  background: var(--bg-secondary);
}

.data-point-item.selected {
  background: var(--accent-secondary);
  border-left: 3px solid var(--accent-primary);
  transform: scale(1.02);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.data-point-item:last-child {
  border-bottom: none;
}

.point-coordinates {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}

.coord-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.coord-value {
  font-size: 0.75rem;
  color: var(--text-primary);
  font-weight: 600;
  font-family: monospace;
}

.point-weight {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.weight-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.weight-value {
  font-size: 0.875rem;
  color: var(--accent-primary);
  font-weight: 600;
}

.point-actions {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  gap: 0.25rem;
}

.point-select-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 4px;
  background: var(--bg-card);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid var(--border-card);
}

.point-select-btn:hover {
  background: var(--accent-secondary);
  color: var(--accent-primary);
  border-color: var(--accent-primary);
}

.point-select-btn.active {
  background: var(--accent-primary);
  color: white;
  border-color: var(--accent-primary);
}

/* Responsive design */
@media (max-width: 768px) {
  .content-area {
    padding: 0 1rem;
  }
  
  .page-header h1 {
    font-size: 2rem;
  }
  
  .filter-row {
    flex-direction: column;
    gap: 1rem;
  }
  
  .filter-section,
  .filter-group {
    min-width: 100%;
  }
  
  .region-filters {
    justify-content: center;
  }
  
  .search-section,
  .map-section {
    padding: 1rem;
  }
  
  .data-panel {
    width: 100%;
    right: -100%;
  }
}
</style> 