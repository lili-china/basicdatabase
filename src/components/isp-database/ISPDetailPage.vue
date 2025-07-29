<template>
  <div class="isp-detail-page">
    <template v-if="isp">
      <div class="isp-detail-content isp-detail-page-content">
        <div class="isp-detail-header" :class="{ 'centered': hideBackButton }">
          <span v-if="!hideBackButton" @click="goBack" class="breadcrumb-back">
            <svg class="breadcrumb-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
          <span v-if="isp && isp.phoneNum" class="breadcrumb-phone themed">{{ isp.phoneNum }}</span>
        </div>
        <div class="detail-section">
          <h4>Basic Information</h4>
          <div class="isp-detail-avatar-row">
            <img v-if="isp.photo" :src="isp.photo" alt="avatar" class="isp-detail-avatar" />
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-label">Real Name:</span>
              <span class="detail-value">{{ isp.realName }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Identity Number:</span>
              <span class="detail-value">{{ isp.identityNo }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Phone Number:</span>
              <span class="detail-value">{{ isp.phoneNum }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Nationality:</span>
              <span class="detail-value">{{ isp.nationality }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Birth Date:</span>
              <span class="detail-value">{{ isp.birthDate }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Address:</span>
              <span class="detail-value">{{ isp.address }}</span>
            </div>
          </div>
        </div>
        <div class="detail-section">
          <h4>ISP Information</h4>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-label">Operator:</span>
              <span class="detail-value">{{ isp.name }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Service Type:</span>
              <span class="detail-value">{{ isp.serviceType }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Max Speed:</span>
              <span class="detail-value">{{ isp.maxSpeed }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Coverage:</span>
              <span class="detail-value">{{ isp.coverage }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Location:</span>
              <span class="detail-value">{{ isp.location }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Description:</span>
              <span class="detail-value">{{ isp.description }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Description:</span>
              <span class="detail-value">{{ isp.description }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Description:</span>
              <span class="detail-value">{{ isp.description }}</span>
            </div>
          </div>
        </div>
        <div class="detail-section">
          <h4>Timeline Information</h4>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-label">Registration Date:</span>
              <span class="detail-value">{{ isp.registrationDate }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Expiry Date:</span>
              <span class="detail-value" :class="{ 'expired': isExpired(isp.expiryDate) }">
                {{ isp.expiryDate }}
              </span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Expiry Date:</span>
              <span class="detail-value" :class="{ 'expired': isExpired(isp.expiryDate) }">
                {{ isp.expiryDate }}
              </span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Expiry Date:</span>
              <span class="detail-value" :class="{ 'expired': isExpired(isp.expiryDate) }">
                {{ isp.expiryDate }}
              </span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Status:</span>
              <span class="detail-value">
                <span class="status-tag" :class="isp.status">{{ isp.status }}</span>
              </span>
            </div>
          </div>
        </div>
        <!-- 当前设备使用信息 - 非Awasr运营商显示 -->
        <div v-if="!isAwasrOperator" class="detail-section collapsible">
          <div class="section-header" @click="toggleSection('deviceInfo')">
            <h4>Device Information</h4>
            <svg class="collapse-icon" :class="{ 'collapsed': !expandedSections.deviceInfo }" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="section-content" :class="{ 'collapsed': !expandedSections.deviceInfo }">
            <!-- Loading状态 -->
            <div v-if="loadingStates.deviceInfo" class="section-loading">
              <div class="loading-spinner"></div>
              <div class="loading-text">Loading device information...</div>
            </div>
            
            <!-- 内容区域 -->
            <div v-else>
              <!-- 设备基本信息 -->
              <div class="device-info-section">
                <div class="device-avatar">
                  <!-- 苹果设备图标 -->
                  <svg v-if="isAppleDevice" width="48" height="48" viewBox="0 0 24 24" fill="none">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" fill="currentColor"/>
                  </svg>
                  <!-- 安卓设备图标 -->
                  <svg v-else width="48" height="48" viewBox="0 0 24 24" fill="none">
                                      <!-- Google图标 -->
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
                <div class="device-details">
                  <div class="device-title">Current Device</div>
                  <div class="device-model">{{ deviceInfo.model }}</div>
                </div>
              </div>
              
              <!-- 设备详细信息 -->
              <div class="device-details-grid">
                <div class="detail-item">
                  <span class="detail-label">IMEI:</span>
                  <span class="detail-value">{{ deviceInfo.imei }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">IMSI:</span>
                  <span class="detail-value">{{ deviceInfo.associatedPhone }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Device Model:</span>
                  <span class="detail-value">{{ deviceInfo.model }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Manufacturer:</span>
                  <span class="detail-value">{{ deviceInfo.manufacturer }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">OS:</span>
                  <span class="detail-value" v-if="isAppleDevice">
                    IOS
                  </span>
                  <span class="detail-value" v-else>
                    Android
                  </span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Registration Date:</span>
                  <span class="detail-value">{{ deviceInfo.registrationDate }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Last Active:</span>
                  <span class="detail-value">{{ deviceInfo.lastActive }}</span>
                </div>
                <!-- <div class="detail-item">
                  <span class="detail-label">Status:</span>
                  <span class="detail-value">
                    <span class="status-tag" :class="deviceInfo.status">{{ deviceInfo.status }}</span>
                  </span>
                </div> -->
              </div>
              
            </div>
          </div>
        </div>
        <!-- 非Awasr运营商显示通话记录 -->
        <div v-if="!isAwasrOperator" class="detail-section collapsible">
          <div class="section-header" @click="toggleSection('caller')">
            <h4>Caller & Called</h4>
            <svg class="collapse-icon" :class="{ 'collapsed': !expandedSections.caller }" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="section-content" :class="{ 'collapsed': !expandedSections.caller }">
            <!-- Loading状态 -->
            <div v-if="loadingStates.caller" class="section-loading">
              <div class="loading-spinner"></div>
              <div class="loading-text">Loading caller data...</div>
            </div>
            
            <!-- 内容区域 -->
            <div v-else>
              <CallerRecords 
                :contacts="contacts" 
                @loading-change="(loading: boolean) => loadingStates.caller = loading"
              />
            </div>
          </div>
        </div>
        <!-- 非Awasr运营商显示移动应用流量使用情况 -->
        <div v-if="!isAwasrOperator" class="detail-section collapsible">
          <div class="section-header" @click="toggleSection('mobileTraffic')">
            <h4>Mobile App Traffic Usage</h4>
            <svg class="collapse-icon" :class="{ 'collapsed': !expandedSections.mobileTraffic }" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="section-content" :class="{ 'collapsed': !expandedSections.mobileTraffic }">
            <!-- Loading状态 -->
            <div v-if="loadingStates.mobileTraffic" class="section-loading">
              <div class="loading-spinner"></div>
              <div class="loading-text">Loading mobile traffic data...</div>
            </div>
            
            <!-- 内容区域 -->
            <div v-else>

              
              <!-- 筛选条件 -->
              <div class="mobile-traffic-filter">
                <!-- 应用搜索 -->
                <div class="filter-item">
                  <label class="filter-label">Application:</label>
                  <el-input
                    v-model="mobileTrafficSearch"
                    placeholder="Search applications..."
                    clearable
                    style="width: 100%; max-width: 300px;"
                    @input="filterMobileTrafficData"
                  >
                    <template #prefix>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </template>
                  </el-input>
                </div>
                
                <!-- 时间选择 -->
                <div class="filter-item">
                  <label class="filter-label">Time Range:</label>
                  <el-radio-group v-model="mobileTrafficTimeRange" @change="filterMobileTrafficData">
                    <el-radio label="today">Today</el-radio>
                    <el-radio label="yesterday">Yesterday</el-radio>
                  </el-radio-group>
                </div>
                
                <!-- 操作按钮 -->
                <div class="filter-actions">
                  <el-button @click="queryMobileTraffic" size="small" type="primary" plain>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style="margin-right: 4px;">
                      <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Query
                  </el-button>
                  <el-button @click="openThirdPartyApp" size="small" type="success" plain>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style="margin-right: 4px;">
                      <path d="M18 13V19A2 2 0 0 1 16 21H8A2 2 0 0 1 6 19V13M18 13L13 8M18 13L13 18M18 13H12M6 13L11 8M6 13L11 18M6 13H12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Open App
                  </el-button>
                </div>
              </div>
              
              <!-- 应用流量详情表格 -->
              <div class="app-traffic-table">
                <el-table 
                  :data="paginatedMobileApps" 
                  style="width: 100%"
                  :header-cell-style="{ background: 'var(--bg-primary)', color: 'var(--text-secondary)', fontWeight: '600' }"
                  :cell-style="{ color: 'var(--text-primary)' }"
                  stripe
                  border
                >
                  <el-table-column prop="name" label="App Name" min-width="200">
                    <template #default="scope">
                      <div class="app-info">
                        <img 
                          :src="scope.row.icon" 
                          :alt="scope.row.name" 
                          class="app-icon" 
                          :title="`${scope.row.name}\nUpload: ${scope.row.uploadTraffic} MB\nDownload: ${scope.row.downloadTraffic} MB`"
                        />
                        <span>{{ scope.row.name }}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="dataUsage" label="Data Usage" width="120" />
                  <el-table-column prop="usageTime" label="Usage Time" width="120" />
                  <el-table-column prop="lastUsed" label="Last Used" width="180" />
                </el-table>
                
                <!-- 分页组件 -->
                <div class="pagination-container">
                  <el-pagination
                    v-model:current-page="currentPage"
                    v-model:page-size="pageSize"
                    :page-sizes="[5, 10, 20, 50]"
                    :total="mobileApps.length"
                    layout="total, sizes, prev, pager, next, jumper"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    background
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 非Awasr运营商显示热力图 -->
        <div v-if="!isAwasrOperator" class="detail-section collapsible">
          <div class="section-header" @click="toggleSection('heatmap')">
            <h4>Activity Heatmap</h4>
            <svg class="collapse-icon" :class="{ 'collapsed': !expandedSections.heatmap }" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="section-content" :class="{ 'collapsed': !expandedSections.heatmap }">
            <!-- Loading状态 -->
            <div v-if="loadingStates.heatmap" class="section-loading">
              <div class="loading-spinner"></div>
              <div class="loading-text">Loading heatmap data...</div>
            </div>
            
            <!-- 内容区域 -->
            <div v-else>
              <!-- 日期范围选择器 -->
              <div class="date-range-filter">
              <el-date-picker
                v-model="heatmapDateRange"
                type="daterange"
                range-separator="To"
                start-placeholder="Start date"
                end-placeholder="End date"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                @change="filterHeatmapData"
                style="width: 100%; max-width: 400px;"
              />
              <el-button @click="queryHeatmap" size="small" type="primary" plain style="margin-left: 0.5rem;">Query</el-button>
            </div>
            <MapHeatmap v-if="expandedSections.heatmap" :points="activityPoints" />
            </div>
          </div>
        </div>
        
        <!-- 非Awasr运营商显示轨迹图 -->
        <div v-if="!isAwasrOperator" class="detail-section collapsible">
          <div class="section-header" @click="toggleSection('track')">
            <h4>Activity Track</h4>
            <svg class="collapse-icon" :class="{ 'collapsed': !expandedSections.track }" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="section-content" :class="{ 'collapsed': !expandedSections.track }">
            <!-- Loading状态 -->
            <div v-if="loadingStates.track" class="section-loading">
              <div class="loading-spinner"></div>
              <div class="loading-text">Loading track data...</div>
            </div>
            
            <!-- 内容区域 -->
            <div v-else>
              <!-- 日期范围选择器 -->
              <div class="date-range-filter">
              <el-date-picker
                v-model="trackDateRange"
                type="daterange"
                range-separator="To"
                start-placeholder="Start date"
                end-placeholder="End date"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                @change="filterTrackData"
                style="width: 100%; max-width: 400px;"
              />
              <el-button @click="queryTrack" size="small" type="primary" plain style="margin-left: 0.5rem;">Query</el-button>
            </div>
            <MapTrack v-if="expandedSections.track" ref="mapTrackRef" :trackPoints="trackPoints" />
            </div>
          </div>
        </div>
        
        <!-- Awasr运营商显示固网位置信息 -->
        <div v-if="isAwasrOperator" class="detail-section collapsible">
          <div class="section-header" @click="toggleSection('location')">
            <h4>Fixed Network Location</h4>
            <svg class="collapse-icon" :class="{ 'collapsed': !expandedSections.location }" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="section-content" :class="{ 'collapsed': !expandedSections.location }">
            <!-- Loading状态 -->
            <div v-if="loadingStates.location" class="section-loading">
              <div class="loading-spinner"></div>
              <div class="loading-text">Loading location data...</div>
            </div>
            
            <!-- 内容区域 -->
            <div v-else>
              <div class="location-info">
              <div class="location-details">
                <div class="detail-item">
                  <span class="detail-label">Landine Number / IP Address:</span>
                  <span class="detail-value" >
                    <span class="status-tag active">127.0.0.1
                    </span>
                    </span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Network Type:</span>
                  <span class="detail-value">Fixed Fiber</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Lat:</span>
                  <span class="detail-value" >
                    <span class="status-tag active">23.99
                    </span>
                    </span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Lon:</span>
                  <span class="detail-value" >
                    <span class="status-tag active">52.00
                    </span>
                    </span>
                </div>
                <div class="detail-item">
                  <span class="detail-label"> Address:</span>
                  <span class="detail-value">{{ isp.address }}</span>
                </div>
            
                <div class="detail-item">
                  <span class="detail-label">Service Area:</span>
                  <span class="detail-value">{{ isp.location || 'Muscat, Oman' }}</span>
                </div>
                
                <div class="detail-item">
                  <span class="detail-label">Connection Status:</span>
                  <span class="detail-value">
                    <span class="status-tag active">Connected</span>
                  </span>
                </div>
              </div>
              <LocationMarker 
                :location="fixedLocation" 
                :zoom="14"
              />
            </div>
          </div>
        </div>
        </div>
        </div>
    </template>
    <template v-else>
      <div class="not-found">The ISP details were not found, please check the data or URL.</div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed,onMounted } from 'vue'
import MapHeatmap from '@/components/isp-database/MapHeatmap.vue'
import MapTrack from '@/components/isp-database/MapTrack.vue'
import LocationMarker from '@/components/isp-database/LocationMarker.vue'
import CallerRecords from '@/components/isp-database/CallerRecords.vue'

//第三方引用 需要添加查询手机号的接口
onMounted(() => {
  // 初始化时启动loading状态
  loadingStates.value.deviceInfo = true
  
  // 模拟初始化数据加载
  setTimeout(() => {
    loadingStates.value.deviceInfo = false
  }, 1000)
})


interface Contact {
  phone: string
  name: string
  photo: string
  count: number
  calls?: Array<{
    time: string
    type: string
    duration: string
    otherPhone: string
  }>
}

const props = defineProps({
  isp: Object,
  contacts: {
    type: Array as () => Contact[],
    default: () => []
  },
  hideBackButton: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['back'])



// 判断是否为Awasr运营商
const isAwasrOperator = computed(() => {
  return props.isp && props.isp.name === 'Awasr'
})

// 通话记录相关的状态和函数已经移到CallerRecords组件中

// 阿曼经纬度范围（大致）：
// 经度 52.0 ~ 60.0，纬度 16.5 ~ 26.5
function randomOmanPoints(n = 10) {
  const points = []
  for (let i = 0; i < n; i++) {
    const lon = 52 + Math.random() * (60 - 52)
    const lat = 16.5 + Math.random() * (26.5 - 16.5)
    const weight = 0.5 + Math.random() * 0.5
    points.push({ lon, lat, weight })
  }
  return points
}

// 生成轨迹点数据
function randomOmanTrackPoints(n = 15) {
  const points = []
  let currentLon = 54 + Math.random() * 4 // 起始经度
  let currentLat = 18 + Math.random() * 6 // 起始纬度
  
  for (let i = 0; i < n; i++) {
    // 在当前位置附近随机生成下一个点
    const deltaLon = (Math.random() - 0.5) * 2 // ±1度经度变化
    const deltaLat = (Math.random() - 0.5) * 2 // ±1度纬度变化
    
    currentLon = Math.max(52, Math.min(60, currentLon + deltaLon))
    currentLat = Math.max(16.5, Math.min(26.5, currentLat + deltaLat))
    
    points.push({ lon: currentLon, lat: currentLat })
  }
  return points
}

const activityPoints = ref(randomOmanPoints(10))
const trackPoints = ref(randomOmanTrackPoints(15))
const mapTrackRef = ref()

// 日期范围选择器
const heatmapDateRange = ref<[string, string] | null>(null)
const trackDateRange = ref<[string, string] | null>(null)
const mobileTrafficSearch = ref('')
const mobileTrafficTimeRange = ref('today')

// 移动应用数据
const mobileApps = ref([
  {
    name: 'WhatsApp',
    icon: 'https://cdn-icons-png.flaticon.com/512/733/733585.png',
    dataUsage: '856 MB',
    usageTime: '2.3 hrs',
    lastUsed: '2024-06-15 14:30',
    status: 'active',
    uploadTraffic: 234,
    downloadTraffic: 622
  },
  {
    name: 'Instagram',
    icon: 'https://cdn-icons-png.flaticon.com/512/174/174855.png',
    dataUsage: '1.2 GB',
    usageTime: '3.1 hrs',
    lastUsed: '2024-06-15 16:45',
    status: 'active',
    uploadTraffic: 456,
    downloadTraffic: 744
  },
  {
    name: 'YouTube',
    icon: 'https://cdn-icons-png.flaticon.com/512/3670/3670147.png',
    dataUsage: '2.1 GB',
    usageTime: '4.2 hrs',
    lastUsed: '2024-06-15 18:20',
    status: 'active',
    uploadTraffic: 123,
    downloadTraffic: 1977
  },
  {
    name: 'TikTok',
    icon: 'https://cdn-icons-png.flaticon.com/512/3938/3938056.png',
    dataUsage: '567 MB',
    usageTime: '1.8 hrs',
    lastUsed: '2024-06-15 12:15',
    status: 'active',
    uploadTraffic: 89,
    downloadTraffic: 478
  },
  {
    name: 'Facebook',
    icon: 'https://cdn-icons-png.flaticon.com/512/124/124010.png',
    dataUsage: '234 MB',
    usageTime: '0.9 hrs',
    lastUsed: '2024-06-15 10:30',
    status: 'inactive',
    uploadTraffic: 67,
    downloadTraffic: 167
  },
  {
    name: 'Twitter',
    icon: 'https://cdn-icons-png.flaticon.com/512/3256/3256013.png',
    dataUsage: '123 MB',
    usageTime: '0.5 hrs',
    lastUsed: '2024-06-15 09:15',
    status: 'active',
    uploadTraffic: 45,
    downloadTraffic: 78
  },
  {
    name: 'LinkedIn',
    icon: 'https://cdn-icons-png.flaticon.com/512/174/174857.png',
    dataUsage: '89 MB',
    usageTime: '0.3 hrs',
    lastUsed: '2024-06-15 08:45',
    status: 'active',
    uploadTraffic: 23,
    downloadTraffic: 66
  },
  {
    name: 'Snapchat',
    icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111463.png',
    dataUsage: '345 MB',
    usageTime: '1.2 hrs',
    lastUsed: '2024-06-15 17:30',
    status: 'active',
    uploadTraffic: 78,
    downloadTraffic: 267
  },
  {
    name: 'Telegram',
    icon: 'https://cdn-icons-png.flaticon.com/512/2111/2111646.png',
    dataUsage: '234 MB',
    usageTime: '1.5 hrs',
    lastUsed: '2024-06-15 15:20',
    status: 'active',
    uploadTraffic: 56,
    downloadTraffic: 178
  },
  {
    name: 'Discord',
    icon: 'https://cdn-icons-png.flaticon.com/512/3670/3670157.png',
    dataUsage: '178 MB',
    usageTime: '0.8 hrs',
    lastUsed: '2024-06-15 13:10',
    status: 'active',
    uploadTraffic: 34,
    downloadTraffic: 144
  }
])

// 分页相关变量
const currentPage = ref(1)
const pageSize = ref(5)

// 计算分页后的数据
const paginatedMobileApps = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return mobileApps.value.slice(start, end)
})

// 分页处理函数
function handleSizeChange(newSize: number) {
  pageSize.value = newSize
  currentPage.value = 1 // 重置到第一页
}

function handleCurrentChange(newPage: number) {
  currentPage.value = newPage
}



// 设备信息数据
const deviceInfo = ref({
  imei: '123456789012345',
  associatedPhone: '+968 91312548',
  model: 'iPhone 15 Pro',
  manufacturer: 'Apple Inc.',
  osVersion: 'iOS 17.2.1',
  registrationDate: '2024-01-15 00:00:00',
  lastActive: '2024-06-15 18:30:00',
  status: 'active'
})


// 判断是否为苹果设备
const isAppleDevice = computed(() => {
  return !deviceInfo.value.manufacturer.toLowerCase().includes('apple')
})


// 折叠面板状态管理
const expandedSections = ref({
  caller: false,
  heatmap: false,
  track: false,
  location: true,
  mobileTraffic: false,
  deviceInfo: true
})

// Loading状态管理
const loadingStates = ref({
  caller: false,
  heatmap: false,
  track: false,
  location: false,
  mobileTraffic: false,
  deviceInfo: false
})

// 固网位置信息
const fixedLocation = ref({
  lon: 58.5453,
  lat: 23.5880,
  name: 'Muscat, Oman'
})





function toggleSection(section: string) {
  const isExpanding = !expandedSections.value[section as keyof typeof expandedSections.value]
  expandedSections.value[section as keyof typeof expandedSections.value] = isExpanding
  
  // 如果正在展开section，启动loading状态
  if (isExpanding) {
    loadingStates.value[section as keyof typeof loadingStates.value] = true
    
    // 模拟API调用延迟
    setTimeout(() => {
      loadingStates.value[section as keyof typeof loadingStates.value] = false
    }, 1500) // 1.5秒后结束loading
  }
}

function goBack() {
  // 启动loading状态
  loadingStates.value.caller = true
  
  // 模拟API调用延迟
  setTimeout(() => {
    loadingStates.value.caller = false
    emit('back')
  }, 500)
}

function isExpired(dateString: string) {
  const expiryDate = new Date(dateString)
  const today = new Date()
  return expiryDate < today
}

// 通话记录过滤和查询功能已移到CallerRecords组件中

function filterHeatmapData() {
  if (!heatmapDateRange.value) return
  
  const [startDate, endDate] = heatmapDateRange.value
  console.log('Filtering heatmap data for date range:', startDate, 'to', endDate)
  
  // 启动loading状态
  loadingStates.value.heatmap = true
  
  // 模拟API调用延迟
  setTimeout(() => {
    loadingStates.value.heatmap = false
    // 重新生成热力图数据
    activityPoints.value = randomOmanPoints(10)
  }, 1000)
}

function filterTrackData() {
  if (!trackDateRange.value) return
  
  const [startDate, endDate] = trackDateRange.value
  console.log('Filtering track data for date range:', startDate, 'to', endDate)
  
  // 启动loading状态
  loadingStates.value.track = true
  
  // 模拟API调用延迟
  setTimeout(() => {
    loadingStates.value.track = false
    // 重新生成轨迹数据
    trackPoints.value = randomOmanTrackPoints(15)
  }, 1000)
}

// 通话记录查询功能已移到CallerRecords组件中

function queryHeatmap() {
  if (!heatmapDateRange.value) {
    console.log('No date range selected for heatmap query')
    return
  }
  
  const [startDate, endDate] = heatmapDateRange.value
  console.log('Querying heatmap data for date range:', startDate, 'to', endDate)
  
  // 启动loading状态
  loadingStates.value.heatmap = true
  
  // 模拟API调用延迟
  setTimeout(() => {
    loadingStates.value.heatmap = false
    // 重新生成热力图数据
    activityPoints.value = randomOmanPoints(10)
  }, 1500)
}

function queryTrack() {
  // if (!trackDateRange.value) {
  //   console.log('No date range selected for track query')
  //   return
  // }
  
  if (trackDateRange.value) {
    const [startDate, endDate] = trackDateRange.value
    console.log('Querying track data for date range:', startDate, 'to', endDate)
  } else {
    console.log('Querying track data without date range')
  }
  
  // 启动loading状态
  loadingStates.value.track = true
  
  // 模拟API调用延迟
  setTimeout(() => {
    loadingStates.value.track = false
    // 重新生成轨迹数据
    trackPoints.value = randomOmanTrackPoints(15)
  }, 1500)
}

function filterMobileTrafficData() {
  console.log('Filtering mobile traffic data with search:', mobileTrafficSearch.value, 'and time range:', mobileTrafficTimeRange.value)
  
  // 重置分页到第一页
  currentPage.value = 1
  
  // 启动loading状态
  loadingStates.value.mobileTraffic = true
  
  // 模拟API调用延迟
  setTimeout(() => {
    loadingStates.value.mobileTraffic = false
    // 这里可以添加实际的过滤逻辑
  }, 1000)
}

function queryMobileTraffic() {
  console.log('Querying mobile traffic data with search:', mobileTrafficSearch.value, 'and time range:', mobileTrafficTimeRange.value)
  
  // 重置分页到第一页
  currentPage.value = 1
  
  // 启动loading状态
  loadingStates.value.mobileTraffic = true
  
  // 模拟API调用延迟
  setTimeout(() => {
    loadingStates.value.mobileTraffic = false
    // 这里可以添加实际的查询逻辑
  }, 1500)
}

function openThirdPartyApp() {
  console.log('Opening third party application...')
  
  // 启动loading状态
  loadingStates.value.mobileTraffic = true
  
  // 模拟API调用延迟
  setTimeout(() => {
    loadingStates.value.mobileTraffic = false
    // 这里可以添加跳转到第三方应用的逻辑
    // 例如：window.open('https://example.com', '_blank')
    alert('Opening third party application...')
    window.open('https://www.google.com', '_blank')
  }, 1000)
}


</script>

<style scoped>
.isp-detail-page {
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.back-btn {
  margin-bottom: 1.5rem;
}
.not-found {
  color: #ef4444;
  font-size: 1.2rem;
  margin-top: 3rem;
  font-weight: bold;
}
.isp-detail-content.isp-detail-page-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 0 auto;
  padding: 0 3vw;
  width: 100%;
  position: relative;
}
.isp-detail-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  color: #888;
  gap: 0.5em;
}

.isp-detail-header.centered {
  justify-content: center;
}


.breadcrumb-back {
  display: flex;
  align-items: center;
  color: var(--accent-primary, #2563eb);
  cursor: pointer;
  font-weight: 600;
  font-size: 1em;
  user-select: none;
  gap: 0.2em;
  transition: color 0.2s;
}
.breadcrumb-back:hover {
  color: #1d4ed8;
}
.breadcrumb-arrow {
  margin-right: 0.2em;
  vertical-align: middle;
  color: inherit;
}
.breadcrumb-phone {
  margin-left: 1em;
  background: var(--accent-primary, #2563eb);
  color: #fff;
  border-radius: 16px;
  padding: 0.15em 0.9em;
  font-size: 0.95em;
  font-weight: 500;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(59,130,246,0.08);
  display: inline-block;
}
.detail-section {
  background: var(--bg-card);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--border-card);
}
.detail-section h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--accent-primary);
}
.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}
.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: var(--bg-primary);
  border-radius: 8px;
  border: 1px solid var(--border-card);
}
.detail-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}
.detail-value {
  font-size: 0.875rem;
  color: var(--text-primary);
  font-weight: 600;
  text-align: right;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.detail-value.expired {
  color: #ef4444;
}
.detail-value .status-tag {
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
}
.detail-value .status-tag.active {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}
.detail-value .status-tag.inactive {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}
.detail-value .status-tag.pending {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}
.detail-value .status-tag.suspended {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}
.isp-detail-avatar-row {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}
.isp-detail-avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--accent-primary, #2563eb);
  background: #f3f4f6;
  box-shadow: 0 2px 8px rgba(59,130,246,0.10);
}
/* 通话记录相关样式已移到CallerRecords组件中 */

/* 折叠面板样式 */
.collapsible .section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 0;
  margin: 0;
  transition: all 0.3s ease;
}

.collapsible .section-header + .section-content {
  margin-top: 1rem;
}

.collapsible .section-header:hover {
  background: var(--bg-primary);
  border-radius: 8px;
  padding: 0.5rem;
  margin: -0.5rem;
}

.collapsible .section-header h4 {
  margin: 0;
  padding: 0;
  border-bottom: none;
}

.collapse-icon {
  transition: transform 0.3s ease;
  color: var(--text-secondary);
}

.collapse-icon.collapsed {
  transform: rotate(-90deg);
}

.section-content {
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 1;
  max-height: 2000px;
  transform: translateY(0);
}

.section-content.collapsed {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
  padding-top: 0;
  padding-bottom: 0;
  margin-top: 0;
  margin-bottom: 0;
}

/* 固网位置信息样式 */
.location-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.location-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
}

.location-details .detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: var(--bg-primary);
  border-radius: 8px;
  border: 1px solid var(--border-card);
}

.location-details .detail-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.location-details .detail-value {
  font-size: 0.875rem;
  color: var(--text-primary);
  font-weight: 600;
  text-align: right;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 日期范围过滤器样式 */
.date-range-filter {
  margin-bottom: 1.5rem;
  padding: 0.5rem;
  background: var(--bg-primary);
  border-radius: 8px;
  border: 1px solid var(--border-card);
}

.date-range-filter .el-date-editor {
  width: 100%;
  max-width: 400px;
}

.date-range-filter .el-input__wrapper {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 6px;
}

.date-range-filter .el-input__inner {
  color: var(--text-primary);
}

.date-range-filter .el-range-separator {
  color: var(--text-secondary);
}

.date-range-filter .el-range-input {
  color: var(--text-primary);
}

.date-range-filter .el-range__close-icon {
  color: var(--text-secondary);
}



/* 移动应用流量样式 */
.mobile-traffic-filter {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background: var(--bg-primary);
  border-radius: 12px;
  border: 1px solid var(--border-card);
}

.filter-item {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.filter-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
  min-width: 100px;
}

.filter-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.filter-actions .el-button {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .mobile-traffic-filter {
    gap: 1.5rem;
  }
  
  .filter-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .filter-label {
    min-width: auto;
  }
  
  .filter-actions {
    flex-direction: column;
  }
}


/* 应用流量表格样式 */
.app-traffic-table {
  background: var(--bg-card);
  border-radius: 12px;
  border: 1px solid var(--border-card);
  overflow: hidden;
  margin-top: 1.5rem;
}

.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  background: var(--bg-card);
  border-top: 1px solid var(--border-card);
}



.app-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.app-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--bg-primary);
  border: 1px solid var(--border-card);
  transition: all 0.2s ease;
  cursor: pointer;
}

.app-icon:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.status-badge.active {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.status-badge.inactive {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

/* 设备信息样式 */
.device-info-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--bg-card);
  border-radius: 12px;
  border: 1px solid var(--border-card);
  margin-bottom: 1.5rem;
}

.device-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: var(--accent-secondary);
  border-radius: 12px;
  color: var(--accent-primary);
}

.device-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.device-title {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.device-model {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
}

.device-details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.device-stats {
  background: var(--bg-card);
  border-radius: 12px;
  border: 1px solid var(--border-card);
  padding: 1.5rem;
}

.device-stats h5 {
  margin: 0 0 1.5rem 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  border-bottom: 1px solid var(--border-card);
  padding-bottom: 0.75rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--bg-primary);
  border-radius: 12px;
  border: 1px solid var(--border-card);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;
}

.stat-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: var(--accent-secondary);
  border-radius: 12px;
  color: var(--accent-primary);
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .device-info-section {
    flex-direction: column;
    text-align: center;
    gap: 0.75rem;
  }
  
  .device-avatar {
    width: 48px;
    height: 48px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}

/* Loading状态样式 */
.section-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  min-height: 200px;
  background: var(--bg-card);
  border-radius: 12px;
  border: 1px solid var(--border-card);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--border-card);
  border-top: 3px solid var(--accent-primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

.loading-text {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
  text-align: center;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Loading状态下的内容区域 */
.section-content > div:not(.section-loading) {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


</style> 