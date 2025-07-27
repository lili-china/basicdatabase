<template>
  <div class="isp-detail-page">
    <template v-if="isp">
      <div class="isp-detail-content isp-detail-page-content">
        <div class="isp-detail-header">
          <span @click="goBack" class="breadcrumb-back">
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
        <!-- 非Awasr运营商显示通话记录 -->
        <div v-if="!isAwasrOperator" class="detail-section collapsible">
          <div class="section-header" @click="toggleSection('caller')">
            <h4>Caller & Called (Top 20)</h4>
            <svg class="collapse-icon" :class="{ 'collapsed': !expandedSections.caller }" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="section-content" :class="{ 'collapsed': !expandedSections.caller }">
            <!-- 日期范围选择器 -->
            <div class="date-range-filter">
              <el-date-picker
                v-model="callerDateRange"
                type="daterange"
                range-separator="To"
                start-placeholder="Start date"
                end-placeholder="End date"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                @change="filterCallerData"
                style="width: 100%; max-width: 400px;"
              />
              <el-button @click="queryCaller" size="small" type="primary" plain style="margin-left: 0.5rem;">Query</el-button>
            </div>
            <div v-if="!selectedContact" class="contact-card-list">
              <div v-for="contact in contacts as Array<any>" :key="contact.phone" class="contact-card" @click="selectContact(contact)">
                <img :src="contact.photo" alt="头像" class="contact-avatar" />
                <div class="contact-info">
                  <div class="contact-name">{{ contact.name }}</div>
                  <div class="contact-id">ID: {{ contact.phone }}</div> 
                  <div class="contact-phone">+968 91312548</div>
                  <div class="contact-count">Call times: {{ contact.count }}</div>
                </div>
              </div>
              <div v-if="contacts.length === 0" style="color: #999; padding: 1rem 0;">No call records</div>
            </div>
            <div v-else class="contact-call-list">
              <div class="contact-detail-header">
                <span @click="backToContacts" class="breadcrumb-back">
                  <svg class="breadcrumb-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </span>
                <img :src="selectedContact.photo" alt="头像" class="contact-avatar" />
                <div class="contact-info">
                  <div class="contact-name">{{ selectedContact.name }}</div>
                  <div class="contact-id">ID: {{ selectedContact.phone }}</div>
                  <div class="contact-phone"> {{ selectedContact.phone }}</div>
                </div>
              </div>
              <table class="call-table">
                <thead>
                  <tr>
                    <th>Call Time</th>
                    <th>Type</th>
                    <th>Duration</th>
                    <th>Other Phone</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(call, idx) in (selectedContact.calls || [])" :key="idx">
                    <td>{{ call.time }}</td>
                    <td>{{ call.type }}</td>
                    <td>{{ call.duration }}</td>
                    <td>{{ call.otherPhone }}</td>
                  </tr>
                  <tr v-if="!selectedContact.calls || selectedContact.calls.length === 0">
                    <td colspan="4" style="color: #999; text-align: center;">No call records</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- 非Awasr运营商显示热力图 -->
        <div v-if="!isAwasrOperator" class="detail-section collapsible">
          <div class="section-header" @click="toggleSection('heatmap')">
            <h4>Activity Heatmap (Current Month)</h4>
            <svg class="collapse-icon" :class="{ 'collapsed': !expandedSections.heatmap }" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="section-content" :class="{ 'collapsed': !expandedSections.heatmap }">
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
        
        <!-- 非Awasr运营商显示轨迹图 -->
        <div v-if="!isAwasrOperator" class="detail-section collapsible">
          <div class="section-header" @click="toggleSection('track')">
            <h4>Activity Track (Current Month)</h4>
            <svg class="collapse-icon" :class="{ 'collapsed': !expandedSections.track }" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="section-content" :class="{ 'collapsed': !expandedSections.track }">
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
        
        <!-- Awasr运营商显示固网位置信息 -->
        <div v-if="isAwasrOperator" class="detail-section collapsible">
          <div class="section-header" @click="toggleSection('location')">
            <h4>Fixed Network Location</h4>
            <svg class="collapse-icon" :class="{ 'collapsed': !expandedSections.location }" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="section-content" :class="{ 'collapsed': !expandedSections.location }">
            <div class="location-info">
              <div class="location-details">
                <div class="detail-item">
                  <span class="detail-label">Installation Address:</span>
                  <span class="detail-value">{{ isp.address }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Service Area:</span>
                  <span class="detail-value">{{ isp.location || 'Muscat, Oman' }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Network Type:</span>
                  <span class="detail-value">Fixed Fiber</span>
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
    </template>
    <template v-else>
      <div class="not-found">The ISP details were not found, please check the data or URL.</div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import MapHeatmap from '@/components/isp-database/MapHeatmap.vue'
import MapTrack from '@/components/isp-database/MapTrack.vue'
import LocationMarker from '@/components/isp-database/LocationMarker.vue'

const props = defineProps({
  isp: Object,
  contacts: {
    type: Array,
    default: () => [
      {
        name: 'John Doe',
        phone: '+968 91312548',
        photo: '',
        count: 5,
        calls: [
          { time: '2024-06-01 10:00', type: 'Outgoing', duration: '2:30', otherPhone: '+968 91234567' },
          { time: '2024-06-02 14:20', type: 'Incoming', duration: '1:10', otherPhone: '+968 93456789' }
        ]
      },
      {
        name: 'Jane Smith',
        phone: '+968 91234567',
        photo: '',
        count: 3,
        calls: [
          { time: '2024-06-03 09:15', type: 'Outgoing', duration: '3:05', otherPhone: '+968 91312548' },
          { time: '2024-06-04 16:40', type: 'Incoming', duration: '0:55', otherPhone: '+968 93456789' }
        ]
      }
    ]
  }
})
const emit = defineEmits(['back'])

// 判断是否为Awasr运营商
const isAwasrOperator = computed(() => {
  return props.isp && props.isp.name === 'Awasr'
})

// 新增：选中的联系人
const selectedContact = ref<any>(null)

function selectContact(contact: any) {
  selectedContact.value = contact
}
function backToContacts() {
  selectedContact.value = null
}

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
const callerDateRange = ref<[string, string] | null>(null)
const heatmapDateRange = ref<[string, string] | null>(null)
const trackDateRange = ref<[string, string] | null>(null)

// 折叠面板状态管理
const expandedSections = ref({
  caller: true,
  heatmap: true,
  track: true,
  location: true
})

// 固网位置信息
const fixedLocation = ref({
  lon: 58.5453,
  lat: 23.5880,
  name: 'Muscat, Oman'
})

function toggleSection(section: string) {
  expandedSections.value[section as keyof typeof expandedSections.value] = 
    !expandedSections.value[section as keyof typeof expandedSections.value]
}

function goBack() {
  emit('back')
}

function isExpired(dateString: string) {
  const expiryDate = new Date(dateString)
  const today = new Date()
  return expiryDate < today
}

// 过滤函数
function filterCallerData() {
  if (!callerDateRange.value) return
  
  const [startDate, endDate] = callerDateRange.value
  console.log('Filtering caller data for date range:', startDate, 'to', endDate)
  // 这里可以添加实际的过滤逻辑
}

function filterHeatmapData() {
  if (!heatmapDateRange.value) return
  
  const [startDate, endDate] = heatmapDateRange.value
  console.log('Filtering heatmap data for date range:', startDate, 'to', endDate)
  // 重新生成热力图数据
  activityPoints.value = randomOmanPoints(10)
}

function filterTrackData() {
  if (!trackDateRange.value) return
  
  const [startDate, endDate] = trackDateRange.value
  console.log('Filtering track data for date range:', startDate, 'to', endDate)
  // 重新生成轨迹数据
  trackPoints.value = randomOmanTrackPoints(15)
}

// 查询函数
function queryCaller() {
  if (!callerDateRange.value) {
    console.log('No date range selected for caller query')
    return
  }
  
  const [startDate, endDate] = callerDateRange.value
  console.log('Querying caller data for date range:', startDate, 'to', endDate)
  // 这里可以添加实际的查询逻辑
}

function queryHeatmap() {
  if (!heatmapDateRange.value) {
    console.log('No date range selected for heatmap query')
    return
  }
  
  const [startDate, endDate] = heatmapDateRange.value
  console.log('Querying heatmap data for date range:', startDate, 'to', endDate)
  // 重新生成热力图数据
  activityPoints.value = randomOmanPoints(10)
}

function queryTrack() {
  if (!trackDateRange.value) {
    console.log('No date range selected for track query')
    return
  }
  
  const [startDate, endDate] = trackDateRange.value
  console.log('Querying track data for date range:', startDate, 'to', endDate)
  // 重新生成轨迹数据
  trackPoints.value = randomOmanTrackPoints(15)
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
}
.isp-detail-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  color: #888;
  gap: 0.5em;
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
.contact-card-list {
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: flex-start;
}
.contact-card {
  background: var(--bg-card, #fff);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  border: 1px solid var(--border-card, #e5e7eb);
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  min-width: 220px;
  max-width: 320px;
  flex: 1 1 260px;
  gap: 1rem;
  transition: box-shadow 0.2s, transform 0.2s;
}
@media (max-width: 900px) {
  .contact-card-list {
    gap: 1rem;
  }
  .contact-card {
    min-width: 160px;
    max-width: 100%;
    flex: 1 1 100%;
  }
}
@media (max-width: 600px) {
  .contact-card-list {
    flex-direction: column;
    gap: 0.75rem;
  }
  .contact-card {
    min-width: 0;
    max-width: 100%;
    flex: 1 1 100%;
  }
}
.contact-card:hover {
  box-shadow: 0 4px 16px rgba(59,130,246,0.15);
  transform: translateY(-2px) scale(1.03);
}
.contact-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--border-card, #e5e7eb);
  background: #f3f4f6;
}
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}
.contact-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary, #222);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 140px;
}
.contact-id {
  font-size: 0.75rem;
  color: var(--text-secondary, #888);
}
.contact-phone {
  color: #2563eb;
  font-weight: bold;
  font-size: 0.95rem;
  letter-spacing: 1px;
}
.contact-count {
  font-size: 0.85rem;
  color: #2563eb;
  font-weight: 500;
}
.contact-call-list {
  padding: 1rem 0;
  max-height: none;
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
.contact-detail-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  background: var(--bg-card, #fff);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  border: 1px solid var(--border-card, #e5e7eb);
  padding: 1rem 1.5rem;
  min-width: 180px;
  max-width: 320px;
  flex: 1 1 150px;
  flex-shrink: 0;
}
.call-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}
.call-table th, .call-table td {
  border: 1px solid var(--border-card, #e5e7eb);
  padding: 0.5rem 1rem;
  text-align: center;
}
.call-table th {
  background: var(--bg-card, #f9fafb);
  font-weight: 600;
}

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
  padding: 1rem;
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
</style> 