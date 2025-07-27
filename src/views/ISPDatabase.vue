<template>
  <div class="app-container">
    <!-- 导航栏 -->
    <NavigationBar />
    
    <!-- 波浪背景和内容 -->
    <WaveBackground>
      <div class="wave-demo-container">
        <div class="page-header">
          <h1>ISP Database</h1>
          <p>Search and view internet service provider information</p>
        </div>
        <div class="content-area">
          <template v-if="!showDetail">
            <!-- 搜索和筛选区域 -->
            <div class="search-section">
              <div class="search-filters">
                <!-- 筛选行 -->
                <div class="filter-row">
                  <!-- 运营商筛选 -->
                  <div class="filter-section">
                    <label class="filter-label">Operator Filter</label>
                    <div class="operator-filters">
                      <button 
                        class="operator-btn" 
                        :class="{ active: pageQuery.selectedOperator === '' }"
                        @click="selectOperator('')"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M12 16H28M12 20H28M12 24H20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                          <circle cx="28" cy="24" r="3" fill="currentColor"/>
                        </svg>
                        <span>All</span>
                      </button>
                      <button 
                        class="operator-btn" 
                        :class="{ active: pageQuery.selectedOperator === 'Omantel' }"
                        @click="selectOperator('Omantel')"
                        data-operator="Omantel"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>Omantel</span>
                      </button>
                      <button 
                        class="operator-btn" 
                        :class="{ active: pageQuery.selectedOperator === 'Ooredoo' }"
                        @click="selectOperator('Ooredoo')"
                        data-operator="Ooredoo"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M4 19V5C4 4.44772 4.44772 4 5 4H12C13.1046 4 14 4.89543 14 6C14 7.10457 13.1046 8 12 8H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M6 8H12C13.1046 8 14 8.89543 14 10C14 11.1046 13.1046 12 12 12H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M6 12H12C13.1046 12 14 12.8954 14 14C14 15.1046 13.1046 16 12 16H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>Ooredoo</span>
                      </button>
                      <button 
                        class="operator-btn" 
                        :class="{ active: pageQuery.selectedOperator === 'Vodafone' }"
                        @click="selectOperator('Vodafone')"
                        data-operator="Vodafone"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16C9.79 16 8 14.21 8 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>Vodafone</span>
                      </button>
                      <button 
                        class="operator-btn" 
                        :class="{ active: pageQuery.selectedOperator === 'FRiENDi' }"
                        @click="selectOperator('FRiENDi')"
                        data-operator="FRiENDi"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M4 6H20V18H4V6Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M4 6L12 12L20 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>FRiENDi</span>
                      </button>
                      <button 
                        class="operator-btn" 
                        :class="{ active: pageQuery.selectedOperator === 'Awasr' }"
                        @click="selectOperator('Awasr')"
                        data-operator="Awasr"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M4 6H20V8H4V6Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M4 12H20V14H4V12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M4 18H20V20H4V18Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>Awasr</span>
                      </button>
                    </div>
                  </div>

                  <!-- 状态筛选 -->
                  <div class="filter-section">
                    <label class="filter-label">Status Filter</label>
                    <el-radio-group v-model="pageQuery.selectedStatus" size="medium">
                      <el-radio-button label="">All</el-radio-button>
                      <el-radio-button label="available">Available</el-radio-button>
                      <el-radio-button label="unavailable">Unavailable</el-radio-button>
                    </el-radio-group>
                  </div>
                </div>

                <div class="filter-row">
                  <!-- 身份证号输入框 -->
                  <div class="filter-group">
                    <label class="filter-label">Identity Number</label>
                    <el-input
                      v-model="pageQuery.identityNo"
                      placeholder="Enter identity number"
                      class="filter-input"
                      clearable
                    />
                  </div>

                  <!-- 电话号码输入框 -->
                  <div class="filter-group">
                    <label class="filter-label">Phone Number</label>
                    <el-input
                      v-model="pageQuery.phoneNum"
                      placeholder="Enter phone number"
                      class="filter-input"
                      clearable
                    />
                  </div>

                  <!-- 真实姓名输入框 -->
                  <div class="filter-group">
                    <label class="filter-label">Real Name</label>
                    <el-input
                      v-model="pageQuery.realName"
                      placeholder="Enter real name"
                      class="filter-input"
                      clearable
                    />
                  </div>

                  <!-- 操作按钮 -->
                  <div class="filter-group">
                    <label class="filter-label">Actions</label>
                    <div class="filter-actions">
                      <el-button type="primary" @click="performSearch" class="search-btn">
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- ISP列表 -->
            <div class="isp-list">
              <div 
                v-for="isp in filteredISPs" 
                :key="isp.id" 
                class="isp-item" 
                :class="{ 'loading': viewLoadingId === isp.id }"
                @click="handleRowClick(isp)"
              >
                <div class="isp-header">
                  <div class="isp-photo">
                    <img 
                      :src="isp.photo || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiM2QjcyODAiLz4KPGNpcmNsZSBjeD0iNDAiIGN5PSIzMCIgcj0iMTIiIGZpbGw9IiNGRkZGRkYiLz4KPHBhdGggZD0iTTE2IDYwQzE2IDUwIDI2IDQwIDQwIDQwQzU0IDQwIDY0IDUwIDY0IDYwIiBmaWxsPSIjRkZGRkZGIi8+Cjwvc3ZnPgo='" 
                      :alt="isp.realName"
                      @error="handleImageError"
                    />
                  </div>
                  <div class="isp-info">
                    <div class="isp-basic">
                      <h3 class="isp-name">{{ isp.realName }}</h3>
                      <p class="isp-id clickable" @click.stop="openUserProfile(isp)">ID: {{ isp.identityNo }}</p>
                    </div>
                    <div class="isp-highlight">
                      <div class="highlight-item operator">
                        <span class="highlight-label">Operator</span>
                        <span class="highlight-value">{{ isp.name }}</span>
                      </div>
                      <div class="highlight-item phone">
                        <span class="highlight-label">Phone</span>
                        <span class="highlight-value">{{ isp.phoneNum }}</span>
                      </div>
                    </div>
                    <div class="isp-details">
                      <div class="detail-row">
                        <span class="detail-label">Nationality:</span>
                        <span class="detail-value">{{ isp.nationality }}</span>
                      </div>
                      <div class="detail-row">
                        <span class="detail-label">Birth Date:</span>
                        <span class="detail-value">{{ isp.birthDate }}</span>
                      </div>
                      <div class="detail-row">
                        <span class="detail-label">Address:</span>
                        <span class="detail-value">{{ isp.address }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="isp-timeline">
                    <div class="timeline-item">
                      <span class="timeline-label">Registration</span>
                      <span class="timeline-date">{{ isp.registrationDate }}</span>
                    </div>
                    <div class="timeline-item">
                      <span class="timeline-label">Expiry</span>
                      <span class="timeline-date" :class="{ 'expired': isExpired(isp.expiryDate) }">{{ isp.expiryDate }}</span>
                    </div>
                  </div>
                  <div class="isp-status">
                    <span class="status-tag" :class="isp.status">{{ isp.status }}</span>
                  </div>
                  <div class="isp-actions">
                    <el-button
                      size="small"
                      class="view-btn"
                      :loading="viewLoadingId === isp.id"
                      @click.stop="handleViewClick(isp)"
                      aria-label="View details"
                      tabindex="0"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style="margin-right:4px;vertical-align:middle;">
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      View
                    </el-button>
                  </div>
                </div>
              </div>
            </div>
            <!-- 分页 -->
            <div class="pagination-section">
              <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[10, 20, 50, 100]"
                :total="totalItems"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>
          </template>
          <template v-else>
            <ISPDetailPage v-if="selectedISP" :isp="selectedISP" :contacts="recentContacts" @back="showDetail = false" />
          </template>
        </div>
      </div>
    </WaveBackground>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getSessionIdFromUrl } from '@/utils/sessionValidator'
import WaveBackground from '../components/WaveBackground.vue'
import NavigationBar from '../components/NavigationBar.vue'
import { mockISPs } from '../utils/mockData'
import { mockCallRecords } from '../utils/mockData'
import { useRouter } from 'vue-router'
import ISPDetailPage from '@/components/isp-database/ISPDetailPage.vue'

// 当前session ID
const currentSessionId = ref<string | null>(null)

// 页面查询对象
const pageQuery = ref({
  selectedOperator: '',
  identityNo: '',
  phoneNum: '',
  realName: '',
  selectedStatus: '',
  selectedServiceProvider: '',
  selectedLetter: ''
})

// 分页状态
const currentPage = ref(1)
const pageSize = ref(20)
const totalItems = ref(0)

// 使用mock数据
const ispData = ref([
  ...mockISPs,
  // 添加一条Awasr测试数据
  {
    id: 999,
    realName: 'Ahmed Al-Mahri',
    identityNo: '1234567890',
    phoneNum: '+968 91234567',
    nationality: 'Omani',
    birthDate: '1985-03-15',
    address: 'Al Ghubrah, Muscat, Oman',
    name: 'Awasr',
    serviceType: 'Fixed Fiber Internet',
    maxSpeed: '1 Gbps',
    coverage: 'Muscat Metropolitan Area',
    location: 'Al Ghubrah, Muscat, Oman',
    description: 'High-speed fiber internet service with 24/7 support',
    registrationDate: '2023-01-15',
    expiryDate: '2025-01-15',
    status: 'available',
    photo: 'https://via.placeholder.com/80x80/ea580c/ffffff?text=AA',
    // 固网特有属性
    networkType: 'Fiber Optic',
    installationDate: '2023-01-10',
    lastMaintenance: '2024-01-15',
    bandwidth: '1000 Mbps',
    ipAddress: '192.168.1.100',
    routerModel: 'Awasr Fiber Router v2.0'
  }
])

// 计算筛选后的ISP列表
const filteredISPs = computed(() => {
  let filtered = ispData.value

  // 运营商筛选
  if (pageQuery.value.selectedOperator) {
    filtered = filtered.filter(isp => 
      isp.name && isp.name.toLowerCase().includes(pageQuery.value.selectedOperator.toLowerCase())
    )
  }

  // 身份证号筛选
  if (pageQuery.value.identityNo) {
    filtered = filtered.filter(isp => 
      isp.identityNo && isp.identityNo.toLowerCase().includes(pageQuery.value.identityNo.toLowerCase())
    )
  }

  // 电话号码筛选
  if (pageQuery.value.phoneNum) {
    filtered = filtered.filter(isp => 
      isp.phoneNum && isp.phoneNum.includes(pageQuery.value.phoneNum)
    )
  }

  // 真实姓名筛选
  if (pageQuery.value.realName) {
    filtered = filtered.filter(isp => 
      isp.realName && isp.realName.toLowerCase().includes(pageQuery.value.realName.toLowerCase())
    )
  }

  // 状态筛选
  if (pageQuery.value.selectedStatus) {
    filtered = filtered.filter(isp => isp.status === pageQuery.value.selectedStatus)
  }

  // 运行商筛选
  if (pageQuery.value.selectedServiceProvider) {
    filtered = filtered.filter(isp => 
      isp.name.toLowerCase().includes(pageQuery.value.selectedServiceProvider.toLowerCase())
    )
  }

  // 字母筛选
  if (pageQuery.value.selectedLetter) {
    filtered = filtered.filter(isp => 
      isp.realName && isp.realName.toUpperCase().startsWith(pageQuery.value.selectedLetter)
    )
  }

  totalItems.value = filtered.length
  return filtered
})

// 搜索功能
const performSearch = () => {
  currentPage.value = 1
  // 搜索逻辑已通过computed实现
}

// 字母筛选方法
const selectLetter = (letter: string) => {
  pageQuery.value.selectedLetter = letter
  currentPage.value = 1
}

// 运营商筛选方法
const selectOperator = (operator: string) => {
  pageQuery.value.selectedOperator = operator
  currentPage.value = 1
}

// 重置筛选
const resetFilters = () => {
  pageQuery.value.selectedOperator = ''
  pageQuery.value.identityNo = ''
  pageQuery.value.phoneNum = ''
  pageQuery.value.realName = ''
  pageQuery.value.selectedStatus = ''
  pageQuery.value.selectedServiceProvider = ''
  pageQuery.value.selectedLetter = ''
  currentPage.value = 1
}

// 分页处理
const handleSizeChange = (size: number) => {
  pageSize.value = size
  currentPage.value = 1
}

const handleCurrentChange = (page: number) => {
  currentPage.value = page
  // 滚动到页面顶部
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// ISP详情弹窗状态
const showDetail = ref(false)
const selectedISP = ref<any>(null)
const recentContacts = ref<any[]>([])

// 最近通话联系人
interface ContactRecord {
  name: string;
  phone: string;
  direction: string;
  time: string;
  photo?: string;
}
interface AggregatedContact {
  name: string;
  phone: string;
  photo?: string;
  count: number;
  records: Array<{ direction: string; time: string }>;
}

// 获取联系人头像（根据姓名匹配 mockISPs）
const getContactPhoto = (name: string) => {
  const match = ispData.value.find(isp => isp.realName === name)
  return match && match.photo ? match.photo : 'https://via.placeholder.com/40x40/cccccc/ffffff?text=User'
}

// ISP详情功能
const goToDetail = (isp: any) => {
  selectedISP.value = isp
  
  // 如果是Awasr运营商，提供固网相关的联系人数据
  if (isp.name === 'Awasr') {
    recentContacts.value = [
      {
        name: 'Technical Support',
        phone: '+968 8000 1234',
        photo: 'https://via.placeholder.com/40x40/ea580c/ffffff?text=TS',
        count: 3,
        records: [
          { direction: 'Incoming', time: '2024-01-15 10:30' },
          { direction: 'Outgoing', time: '2024-01-20 14:15' },
          { direction: 'Incoming', time: '2024-02-01 09:45' }
        ]
      },
      {
        name: 'Customer Service',
        phone: '+968 8000 5678',
        photo: 'https://via.placeholder.com/40x40/ea580c/ffffff?text=CS',
        count: 2,
        records: [
          { direction: 'Outgoing', time: '2024-01-10 16:20' },
          { direction: 'Incoming', time: '2024-01-25 11:30' }
        ]
      }
    ]
  } else {
    // 查找最近通话联系人
    const record = mockCallRecords.find(r => r.userId === isp.identityNo)
    const contacts = record ? record.contacts.slice(0, 20) : []
    // 聚合同一联系人
    const contactMap: Record<string, any> = {}
    contacts.forEach(c => {
      const key = c.name + '_' + c.phone
      if (!contactMap[key]) {
        contactMap[key] = {
          name: c.name,
          phone: c.phone,
          photo: getContactPhoto(c.name),
          count: 1,
          records: [{ direction: c.direction, time: c.time }]
        }
      } else {
        contactMap[key].count++
        contactMap[key].records.push({ direction: c.direction, time: c.time })
      }
    })
    recentContacts.value = Object.values(contactMap)
  }
  
  showDetail.value = true
}

// 用户详情功能
const openUserProfile = (isp: any) => {
  window.open(`/user-profile/${isp.identityNo}`, '_blank')
}

// 计算年龄
const calculateAge = (birthDate: string) => {
  const birth = new Date(birthDate)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  
  return age
}



// 判断日期是否过期
const isExpired = (dateString: string) => {
  const expiryDate = new Date(dateString);
  const today = new Date();
  return expiryDate < today;
};

// 处理图片加载失败
const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  // 使用SVG默认头像
  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiM2QjcyODAiLz4KPGNpcmNsZSBjeD0iNDAiIGN5PSIzMCIgcj0iMTIiIGZpbGw9IiNGRkZGRkYiLz4KPHBhdGggZD0iTTE2IDYwQzE2IDUwIDI2IDQwIDQwIDQwQzU0IDQwIDY0IDUwIDY0IDYwIiBmaWxsPSIjRkZGRkZGIi8+Cjwvc3ZnPgo=';
};

// 组件挂载时获取session ID
onMounted(() => {
  currentSessionId.value = getSessionIdFromUrl()
})

const router = useRouter()

const viewLoadingId = ref<number|string|null>(null)
function handleViewClick(isp: any) {
  if (viewLoadingId.value) return
  viewLoadingId.value = isp.id
  setTimeout(() => {
    goToDetail(isp)
    viewLoadingId.value = null
  }, 400)
}

function handleRowClick(isp: any) {
  if (viewLoadingId.value) return
  viewLoadingId.value = isp.id
  setTimeout(() => {
    goToDetail(isp)
    viewLoadingId.value = null
  }, 400)
}
</script>

<style scoped>
.isp-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 1400px;
  margin: 0 auto;
}

.isp-item {
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 0.75rem;
  border: 1px solid var(--border-card);
  box-shadow: var(--shadow-card);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.isp-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-secondary);
}

.isp-item.loading {
  pointer-events: none;
  opacity: 0.7;
  position: relative;
}

.isp-item.loading::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin: -10px 0 0 -10px;
  border: 2px solid var(--accent-primary);
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  z-index: 10;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.isp-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
}

.isp-photo {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--border-card);
  box-shadow: var(--shadow-card);
}

.isp-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.isp-info {
  flex: 1;
  min-width: 0;
}

.isp-basic {
  margin-bottom: 0.125rem;
}

.isp-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.125rem 0;
}

.isp-id {
  font-size: 0.625rem;
  color: var(--text-secondary);
  margin: 0 0 0.125rem 0;
}

.clickable {
  cursor: pointer;
  transition: color 0.2s ease;
}

.clickable:hover {
  color: var(--accent-primary);
  text-decoration: underline;
}



.isp-highlight {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.375rem;
  padding: 0.375rem;
  background: linear-gradient(135deg, var(--accent-secondary) 0%, rgba(59, 130, 246, 0.1) 100%);
  border-radius: 8px;
  border: 1px solid var(--accent-primary);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.15);
}

.highlight-item {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  flex: 1;
}

.highlight-item.operator {
  border-right: 1px solid var(--border-card);
  padding-right: 0.75rem;
}

.highlight-label {
  font-size: 0.5rem;
  color: var(--accent-primary);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.highlight-value {
  font-size: 0.75rem;
  color: var(--text-primary);
  font-weight: 700;
}

.highlight-item.operator .highlight-value {
  color: var(--accent-primary);
  font-weight: 800;
  font-size: 0.875rem;
}

.highlight-item.phone .highlight-value {
  color: #22c55e;
  font-weight: 800;
  font-size: 0.875rem;
}

.isp-details {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  margin-bottom: 0.125rem;
}

.detail-row {
  display: flex;
  gap: 0.375rem;
  align-items: center;
}

.detail-label {
  font-size: 0.5rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.detail-value {
  font-size: 0.625rem;
  color: var(--text-primary);
  font-weight: 600;
}

.isp-timeline {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  margin-bottom: 0.125rem;
  min-width: 80px;
}

.timeline-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.125rem;
}

.timeline-label {
  font-size: 0.5rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.timeline-date {
  font-size: 0.625rem;
  color: var(--text-primary);
  font-weight: 600;
}

.timeline-date.expired {
  color: #ef4444;
}

.isp-status {
  margin-bottom: 0.125rem;
}

.status-tag {
  padding: 0.125rem 0.375rem;
  border-radius: 8px;
  font-size: 0.5rem;
  font-weight: 500;
}

.status-tag.available {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.status-tag.unavailable {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.isp-actions {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
  margin-left: auto;
  opacity: 0;
  transition: opacity 0.2s;
}
.isp-item:hover .isp-actions {
  opacity: 1;
}
.view-btn {
  background: var(--accent-primary);
  color: #fff;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  transition: background 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(59,130,246,0.10);
  display: flex;
  align-items: center;
  padding: 0 1.2em;
}
.view-btn:hover {
  background: #1d4ed8;
  color: #fff;
  box-shadow: 0 4px 16px rgba(59,130,246,0.15);
}

/* 搜索区域样式 */
.search-section {
  margin-bottom: 2rem;
}

.search-header {
  margin-bottom: 1rem;
  text-align: center;
}

.search-header h3 {
  font-size: 1.25rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}



.search-filters {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid var(--border-card);
  box-shadow: var(--shadow-card);
}

.filter-row {
  display: flex;
  gap: 1rem;
  align-items: end;
  flex-wrap: wrap;
}

.filter-group {
  flex: 1;
  min-width: 180px;
  max-width: 200px;
}

.filter-label {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  display: block;
}

.filter-input {
  width: 100%;
}

.filter-actions {
  display: flex;
  gap: 0.75rem;
  flex-shrink: 0;
  height: 32px;
  align-items: center;
}

/* 筛选行样式 */
.filter-row {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

/* 筛选区域样式 */
.filter-section {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 200px;
}

/* 状态筛选组样式 */
.filter-section .el-radio-group {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.letter-filters {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
}

.letter-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem;
  background: var(--bg-primary);
  border: 1px solid var(--border-card);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 60px;
  color: var(--text-secondary);
}

.letter-btn:hover {
  background: var(--accent-secondary);
  border-color: var(--accent-primary);
  color: var(--accent-primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-card);
}

.letter-btn.active {
  background: var(--accent-primary);
  border-color: var(--accent-primary);
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.letter-btn svg {
  width: 16px;
  height: 16px;
}

.letter-btn span {
  font-size: 0.75rem;
  font-weight: 600;
}

.operator-filters {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
}

.operator-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem;
  background: var(--bg-primary);
  border: 1px solid var(--border-card);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 100px;
  max-width: 120px;
  color: var(--text-secondary);
}

.operator-btn:hover {
  background: var(--accent-secondary);
  border-color: var(--accent-primary);
  color: var(--accent-primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-card);
}

.operator-btn.active {
  background: var(--accent-primary);
  border-color: var(--accent-primary);
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

/* 运营商特定颜色 */
.operator-btn[data-operator="Omantel"]:hover {
  border-color: #2563eb;
  color: #2563eb;
}

.operator-btn[data-operator="Ooredoo"]:hover {
  border-color: #dc2626;
  color: #dc2626;
}

.operator-btn[data-operator="Vodafone"]:hover {
  border-color: #059669;
  color: #059669;
}

.operator-btn[data-operator="FRiENDi"]:hover {
  border-color: #7c3aed;
  color: #7c3aed;
}

.operator-btn[data-operator="Awasr"]:hover {
  border-color: #ea580c;
  color: #ea580c;
}

.operator-btn svg {
  width: 16px;
  height: 16px;
}

.operator-btn span {
  font-size: 0.7rem;
  font-weight: 600;
  text-align: center;
  line-height: 1.2;
}

.search-btn {
  height: 32px;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.search-icon {
  width: 16px;
  height: 16px;
}

.reset-btn {
  height: 32px;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.reset-icon {
  width: 16px;
  height: 16px;
}




/* ISP详情弹窗样式 */
.isp-detail-dialog {
  .el-dialog__body {
    padding: 1.5rem;
  }
}

.isp-detail-dialog .el-dialog {
  max-width: 100vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
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

.contact-card-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
}
.contact-card {
  background: var(--bg-card, #fff);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  border: 1px solid var(--border-card, #e5e7eb);
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  min-width: 180px;
  max-width: 320px;
  gap: 1rem;
  transition: box-shadow 0.2s, transform 0.2s;
  flex: 1 1 220px;
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
.contact-count {
  font-size: 0.85rem;
  color: #2563eb;
  font-weight: 500;
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
.detail-breadcrumb {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 1rem;
  color: #888;
  gap: 0.5em;
}
.left-breadcrumb {
  justify-content: flex-start;
}
.breadcrumb-link {
  color: var(--accent-primary, #2563eb);
  cursor: pointer;
  text-decoration: underline;
}
.breadcrumb-link:hover {
  color: #1d4ed8;
}
.breadcrumb-sep {
  margin: 0 0.5em;
  color: #bbb;
}
.breadcrumb-current {
  color: #222;
  font-weight: 600;
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
</style> 