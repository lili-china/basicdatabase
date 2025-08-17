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
                  <div class="filter-group">
                    <label class="filter-label">Actions</label>
                    <div class="filter-actions">
                      <el-button type="primary" @click="updateHeatmap" class="search-btn">
                        Search
                      </el-button>
                      <el-button @click="resetFilters" class="reset-btn">
                        Reset
                      </el-button>
                      <el-button @click="toggleDisplayMode" class="mode-btn" :class="{ active: displayMode === 'track' }">
                        {{ displayMode === 'heatmap' ? 'Heatmap' : 'Track' }}
                      </el-button>
                      <el-button @click="toggleDataPanel" class="data-btn" :class="{ active: isDataPanelVisible }">
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
            
                         <!-- User Information Section -->
             <div class="data-section">
               <h4>User Information</h4>
               <div v-if="searchedUser" class="user-info-card">
                                   <div class="user-profile">
                    <div class="user-avatar">
                      <img 
                        :src="`/public/assets/icons/isp/${getUserAvatar(searchedUser.name)}.svg`" 
                        :alt="searchedUser.name"
                        class="avatar-image"
                        @error="handleAvatarError"
                      />
                      <div class="avatar-circle hidden">
                        {{ searchedUser.name.charAt(0).toUpperCase() }}
                      </div>
                    </div>
                   <div class="user-details">
                     <div class="user-name">{{ searchedUser.name }}</div>
                     <div class="user-id">ID: {{ searchedUser.id }}</div>
                     <div class="user-nationality">{{ searchedUser.nationality }}</div>
                   </div>
                 </div>
                 
                 <!-- Phone Numbers Dropdown -->
                 <div class="phone-section">
                   <div class="phone-dropdown">
                     <button 
                       class="phone-toggle"
                       @click="togglePhoneDropdown(searchedUser.id)"
                       :class="{ 'active': expandedPhones.includes(searchedUser.id) }"
                     >
                       <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                         <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                       </svg>
                       <span class="phone-count">{{ getPhoneNumbers(searchedUser).length }} Phone(s)</span>
                       <svg 
                         class="dropdown-arrow" 
                         :class="{ 'expanded': expandedPhones.includes(searchedUser.id) }"
                         width="12" 
                         height="12" 
                         viewBox="0 0 24 24" 
                         fill="none"
                       >
                         <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                       </svg>
                     </button>
                     <div class="phone-list" :class="{ 'expanded': expandedPhones.includes(searchedUser.id) }">
                       <div 
                         v-for="(phone, phoneIndex) in getPhoneNumbers(searchedUser)" 
                         :key="phoneIndex"
                         class="phone-item"
                         @click="selectPhone(phone)"
                       >
                         <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                           <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                         </svg>
                         <span class="phone-number">{{ phone }}</span>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
               <div v-else class="no-user-selected">
                 <span class="data-value">Search for a user to see information</span>
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
                       <!-- Point Coordinates and Info -->
                       <div class="point-coordinates">
                         <span class="coord-label">Lat:</span>
                         <span class="coord-value">{{ point.lat.toFixed(4) }}</span>
                         <span class="coord-label">Lon:</span>
                         <span class="coord-value">{{ point.lon.toFixed(4) }}</span>
                       </div>
                       <div class="point-info">
                         <div class="point-weight">
                           <span class="weight-label">Weight:</span>
                           <span class="weight-value">{{ point.weight }}</span>
                         </div>
                         <div class="point-location">
                           <span class="location-label">Location:</span>
                           <span class="location-value">{{ point.location }}</span>
                         </div>
                         <div class="point-user">
                           <span class="user-label">User:</span>
                           <span class="user-value">{{ point.name }} ({{ point.nationality }})</span>
                         </div>
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



// Sample data
const samplePoints = ref([
  { lon: 57.5, lat: 21.5, weight: 1, timestamp: new Date('2024-01-15'), location: 'Location 1', id: '1', name: 'User 1', nationality: 'Omani', phone: '+968 1234 5678', phones: ['+968 1234 5678', '+968 1234 5679', '+968 1234 5680'] },
  { lon: 58.0, lat: 21.0, weight: 2, timestamp: new Date('2024-01-15'), location: 'Location 2', id: '2', name: 'User 2', nationality: 'Omani', phone: '+968 2345 6789', phones: ['+968 2345 6789', '+968 2345 6790'] },
  { lon: 57.0, lat: 22.0, weight: 1.5, timestamp: new Date('2024-01-16'), location: 'Location 3', id: '3', name: 'User 3', nationality: 'Omani', phone: '+968 3456 7890', phones: ['+968 3456 7890', '+968 3456 7891', '+968 3456 7892', '+968 3456 7893'] },
  { lon: 58.5, lat: 21.8, weight: 3, timestamp: new Date('2024-01-16'), location: 'Location 4', id: '4', name: 'User 4', nationality: 'Omani', phone: '+968 4567 8901', phones: ['+968 4567 8901'] },
  { lon: 56.8, lat: 21.2, weight: 1.8, timestamp: new Date('2024-01-17'), location: 'Location 5', id: '5', name: 'User 5', nationality: 'Omani', phone: '+968 5678 9012', phones: ['+968 5678 9012', '+968 5678 9013'] },
  { lon: 57.2, lat: 21.6, weight: 2.2, timestamp: new Date('2024-01-17'), location: 'Location 6', id: '6', name: 'User 6', nationality: 'Omani', phone: '+968 6789 0123', phones: ['+968 6789 0123', '+968 6789 0124', '+968 6789 0125'] },
  { lon: 58.2, lat: 21.3, weight: 1.3, timestamp: new Date('2024-01-18'), location: 'Location 7', id: '7', name: 'User 7', nationality: 'Omani', phone: '+968 7890 1234', phones: ['+968 7890 1234', '+968 7890 1235'] }
])

// Group management
const expandedGroups = ref<string[]>([])
const selectedGroup = ref<string | null>(null)
const selectedPoint = ref<any>(null)

// Phone dropdown management
const expandedPhones = ref<string[]>([])

// Searched user information
const searchedUser = ref<any>({
  id: '1',
  name: 'Ahmed Al-Mansouri',
  nationality: 'Omani',
  phone: '+968 1234 5678',
  phones: ['+968 1234 5678', '+968 1234 5679', '+968 1234 5680', '+968 1234 5681']
})

// Computed property to group data points by date
const groupedDataPoints = computed(() => {
  const groups: Record<string, any[]> = {}
  samplePoints.value.forEach(point => {
    const date = point.timestamp ? point.timestamp.toISOString().split('T')[0] : 'Unknown'
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
    return samplePoints.value.filter(point => {
      const pointDate = point.timestamp ? point.timestamp.toISOString().split('T')[0] : 'Unknown'
      return pointDate === selectedGroup.value
    })
  }
  return samplePoints.value
})

// Filter methods
const updateHeatmap = () => {
  console.log('Update heatmap:', {
    phoneNumber: phoneNumber.value,
    dateRange: dateRange.value
  })
  
  if (phoneNumber.value) {
    const foundUser = samplePoints.value.find(point => 
      point.phones?.includes(phoneNumber.value) || point.phone === phoneNumber.value
    )
    searchedUser.value = foundUser || null
  } else {
    searchedUser.value = null
  }
}

const resetFilters = () => {
  phoneNumber.value = ''
  dateRange.value = []
  // searchedUser.value = null
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
    selectedGroup.value = null
    console.log('Deselected group - showing all points')
  } else {
    selectedGroup.value = date
    console.log('Selected group:', date)
  }
  selectedPoint.value = null
}

const selectPoint = (point: any) => {
  console.log('selectPoint called with:', point)
  if (selectedPoint.value === point) {
    selectedPoint.value = null
    console.log('Deselected point - showing all points')
  } else {
    selectedPoint.value = point
    console.log('Selected point:', point)
  }
  selectedGroup.value = null
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

// Phone dropdown methods
const togglePhoneDropdown = (userId: string) => {
  const index = expandedPhones.value.indexOf(userId)
  if (index > -1) {
    expandedPhones.value.splice(index, 1)
  } else {
    expandedPhones.value.push(userId)
  }
}

const getPhoneNumbers = (point: any) => {
  return point.phones || [point.phone]
}

const selectPhone = (phone: string) => {
  console.log('Selected phone:', phone)
}

// Avatar methods
const getUserAvatar = (userName: string) => {
  const avatarMap: Record<string, string> = {
    'Ahmed Al-Mansouri': 'omantel',
    'User 1': 'omantel',
    'User 2': 'ooredoo',
    'User 3': 'vodafone',
    'User 4': 'awasr',
    'User 5': 'friendi',
    'User 6': 'omantel',
    'User 7': 'ooredoo'
  }
  return avatarMap[userName] || 'omantel'
}

const handleAvatarError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.style.display = 'none'
  target.nextElementSibling?.classList.remove('hidden')
}

onMounted(async () => {
  await nextTick()
  console.log('MapHeatmapView mounted')
})

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

.filter-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
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

/* Mode button styles */
.mode-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--bg-secondary);
  color: var(--text-secondary);
  border: 1px solid var(--border-card);
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
}

.mode-btn:hover {
  background: var(--accent-secondary);
  color: var(--accent-primary);
  border-color: var(--accent-primary);
}

.mode-btn.active {
  background: var(--accent-primary);
  color: white;
  border-color: var(--accent-primary);
}

/* Map section styles */
.map-section {
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-card);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: var(--shadow-card);
  min-height: 600px;
  display: flex;
  flex-direction: column;
}

.map-section :deep(.map-heatmap-container),
.map-section :deep(.map-track-container) {
  flex: 1;
  min-height: 550px;
  width: 100%;
  position: relative;
}

.map-section :deep(.map-heatmap),
.map-section :deep(.map-track) {
  width: 100% !important;
  height: 550px !important;
  margin-top: 0 !important;
  border-radius: 12px;
  overflow: hidden;
}

/* Data panel styles */
.data-panel {
  position: fixed;
  top: 0;
  right: -500px;
  width: 500px;
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

.point-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}

.point-weight, .point-location, .point-user {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.weight-label, .location-label, .user-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.weight-value {
  font-size: 0.875rem;
  color: var(--accent-primary);
  font-weight: 600;
}

.location-value, .user-value {
  font-size: 0.75rem;
  color: var(--text-primary);
  font-weight: 500;
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

/* User profile styles */
.user-profile {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  padding: 0.5rem;
  background: var(--bg-secondary);
  border-radius: 8px;
}

.user-avatar {
  flex-shrink: 0;
  position: relative;
}

.avatar-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--border-card);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.avatar-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.hidden {
  display: none;
}

.user-details {
  flex: 1;
  min-width: 0;
}

.user-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.user-id {
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-weight: 500;
  margin-bottom: 0.125rem;
}

.user-nationality {
  font-size: 0.75rem;
  color: var(--accent-secondary);
  font-weight: 500;
}

/* Phone section styles */
.phone-section {
  margin-bottom: 0.75rem;
}

.phone-dropdown {
  position: relative;
}

.phone-toggle {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 0.75rem;
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 6px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.75rem;
  font-weight: 500;
}

.phone-toggle:hover {
  background: var(--bg-secondary);
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}

.phone-toggle.active {
  background: var(--accent-secondary);
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}

.phone-count {
  flex: 1;
  text-align: left;
}

.dropdown-arrow {
  color: var(--text-secondary);
  transition: transform 0.2s ease;
}

.dropdown-arrow.expanded {
  transform: rotate(180deg);
}

.phone-list {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-top: none;
  border-radius: 0 0 6px 6px;
  margin-top: -1px;
}

.phone-list.expanded {
  max-height: 200px;
}

.phone-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
  border-bottom: 1px solid var(--border-secondary);
  color: var(--text-secondary);
}

.phone-item:last-child {
  border-bottom: none;
}

.phone-item:hover {
  background: var(--bg-secondary);
  color: var(--accent-primary);
}

.phone-number {
  font-size: 0.75rem;
  font-weight: 500;
}

/* User info card styles */
.user-info-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-card);
  border-radius: 12px;
  padding: 1rem;
  margin-top: 0.5rem;
}

.no-user-selected {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border-card);
  border-radius: 12px;
  margin-top: 0.5rem;
  color: var(--text-secondary);
  font-style: italic;
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
  
  .filter-group {
    min-width: 100%;
  }
  
  .search-section,
  .map-section {
    padding: 1rem;
  }
  
  .map-section {
    min-height: 500px;
  }
  
  .map-section :deep(.map-heatmap-container),
  .map-section :deep(.map-track-container) {
    min-height: 450px;
  }
  
  .map-section :deep(.map-heatmap),
  .map-section :deep(.map-track) {
    min-height: 450px !important;
  }
  
  .data-panel {
    width: 100%;
    right: -100%;
  }
}

/* 大屏幕优化 */
@media (min-width: 1200px) {
  .map-section {
    min-height: 700px;
  }
  
  .map-section :deep(.map-heatmap-container),
  .map-section :deep(.map-track-container) {
    min-height: 650px;
  }
  
  .map-section :deep(.map-heatmap),
  .map-section :deep(.map-track) {
    min-height: 650px !important;
  }
}
</style> 