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

        <!-- 搜索和筛选区域 -->
        <div class="search-section">
         
          
          <div class="search-filters">
            <!-- 运营商筛选行 -->
            <div class="letter-filter-row">
              <label class="filter-label">Operator Filter</label>
              <div class="letter-filters">
                <button 
                  class="letter-btn" 
                  :class="{ active: pageQuery.selectedLetter === '' }"
                  @click="selectLetter('')"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 16H28M12 20H28M12 24H20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    <circle cx="28" cy="24" r="3" fill="currentColor"/>
                  </svg>
                  <span>All</span>
                </button>
                <button 
                  class="letter-btn" 
                  :class="{ active: pageQuery.selectedLetter === 'A' }"
                  @click="selectLetter('A')"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>A</span>
                </button>
                <button 
                  class="letter-btn" 
                  :class="{ active: pageQuery.selectedLetter === 'B' }"
                  @click="selectLetter('B')"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M4 19V5C4 4.44772 4.44772 4 5 4H12C13.1046 4 14 4.89543 14 6C14 7.10457 13.1046 8 12 8H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6 8H12C13.1046 8 14 8.89543 14 10C14 11.1046 13.1046 12 12 12H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6 12H12C13.1046 12 14 12.8954 14 14C14 15.1046 13.1046 16 12 16H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>B</span>
                </button>
                <button 
                  class="letter-btn" 
                  :class="{ active: pageQuery.selectedLetter === 'C' }"
                  @click="selectLetter('C')"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16C9.79 16 8 14.21 8 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>C</span>
                </button>
                <button 
                  class="letter-btn" 
                  :class="{ active: pageQuery.selectedLetter === 'D' }"
                  @click="selectLetter('D')"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M4 6H20V18H4V6Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M4 6L12 12L20 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>D</span>
                </button>
                <button 
                  class="letter-btn" 
                  :class="{ active: pageQuery.selectedLetter === 'E' }"
                  @click="selectLetter('E')"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M4 6H20V8H4V6Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M4 12H20V14H4V12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M4 18H20V20H4V18Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>E</span>
                </button>
              </div>
            </div>

            <div class="filter-row">
              <!-- 运营商下拉框 -->
              <div class="filter-group">
                <label class="filter-label">Operator</label>
                <el-select v-model="pageQuery.selectedOperator" placeholder="Select Operator" class="filter-input">
                  <el-option label="All Operators" value="" />
                  <el-option label="Comcast" value="comcast" />
                  <el-option label="Verizon" value="verizon" />
                  <el-option label="AT&T" value="att" />
                  <el-option label="Spectrum" value="spectrum" />
                  <el-option label="CenturyLink" value="centurylink" />
                  <el-option label="Cox" value="cox" />
                  <el-option label="Frontier" value="frontier" />
                  <el-option label="Windstream" value="windstream" />
                </el-select>
              </div>

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

              <!-- 状态下拉框 -->
              <div class="filter-group">
                <label class="filter-label">Status</label>
                <el-select v-model="pageQuery.selectedStatus" placeholder="Select Status" class="filter-input">
                  <el-option label="All Status" value="" />
                  <el-option label="Active" value="active" />
                  <el-option label="Inactive" value="inactive" />
                  <el-option label="Pending" value="pending" />
                  <el-option label="Suspended" value="suspended" />
                </el-select>
              </div>

              <!-- 运行商筛选 -->
              <div class="filter-group">
                <label class="filter-label">Service Provider</label>
                <el-select v-model="pageQuery.selectedServiceProvider" placeholder="Select Service Provider" class="filter-input">
                  <el-option label="All Providers" value="" />
                  <el-option label="Comcast" value="comcast" />
                  <el-option label="Verizon Fios" value="verizon" />
                  <el-option label="AT&T" value="att" />
                  <el-option label="Spectrum" value="spectrum" />
                  <el-option label="CenturyLink" value="centurylink" />
                  <el-option label="Cox Communications" value="cox" />
                  <el-option label="Frontier" value="frontier" />
                  <el-option label="Windstream" value="windstream" />
                </el-select>
              </div>

              <!-- 操作按钮 -->
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

        <!-- ISP列表 -->
        <div class="isp-list">
          <div v-for="isp in filteredISPs" :key="isp.id" class="isp-item" @click="showISPDetails(isp)">
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
                  <p class="isp-id clickable" @click.stop="showUserDetailDialog(isp)">ID: {{ isp.identityNo }}</p>
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
                <el-button size="small" @click.stop="showISPDetails(isp)">View</el-button>
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
      </div>
    </WaveBackground>

    <!-- UserDetailDialog组件 -->
    <UserDetailDialog
      v-model="userDetailDialogVisible"
      :user="selectedUserForDialog"
    />

    <!-- ISP详情弹窗 -->
    <el-dialog
      v-model="ispDetailDialogVisible"
      :title="`ISP Details - ${selectedISP?.realName || ''}`"
      width="800px"
      class="isp-detail-dialog"
    >
      <div v-if="selectedISP" class="isp-detail-content">
        <div class="detail-section">
          <h4>Basic Information</h4>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-label">Real Name:</span>
              <span class="detail-value">{{ selectedISP.realName }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Identity Number:</span>
              <span class="detail-value">{{ selectedISP.identityNo }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Phone Number:</span>
              <span class="detail-value">{{ selectedISP.phoneNum }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Nationality:</span>
              <span class="detail-value">{{ selectedISP.nationality }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Birth Date:</span>
              <span class="detail-value">{{ selectedISP.birthDate }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Address:</span>
              <span class="detail-value">{{ selectedISP.address }}</span>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <h4>ISP Information</h4>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-label">Operator:</span>
              <span class="detail-value">{{ selectedISP.name }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Service Type:</span>
              <span class="detail-value">{{ selectedISP.serviceType }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Max Speed:</span>
              <span class="detail-value">{{ selectedISP.maxSpeed }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Coverage:</span>
              <span class="detail-value">{{ selectedISP.coverage }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Location:</span>
              <span class="detail-value">{{ selectedISP.location }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Description:</span>
              <span class="detail-value">{{ selectedISP.description }}</span>
            </div>
          </div>
        </div>

        <div class="detail-section">
          <h4>Timeline Information</h4>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-label">Registration Date:</span>
              <span class="detail-value">{{ selectedISP.registrationDate }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Expiry Date:</span>
              <span class="detail-value" :class="{ 'expired': isExpired(selectedISP.expiryDate) }">
                {{ selectedISP.expiryDate }}
              </span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Status:</span>
              <span class="detail-value">
                <span class="status-tag" :class="selectedISP.status">{{ selectedISP.status }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getSessionIdFromUrl } from '@/utils/sessionValidator'
import WaveBackground from '../components/WaveBackground.vue'
import NavigationBar from '../components/NavigationBar.vue'
import UserDetailDialog from '../components/UserDetailDialog.vue'
import { mockISPs } from '../utils/mockData'

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
const ispData = ref(mockISPs)

// 计算筛选后的ISP列表
const filteredISPs = computed(() => {
  let filtered = ispData.value

  // 运营商筛选
  if (pageQuery.value.selectedOperator) {
    filtered = filtered.filter(isp => 
      isp.name.toLowerCase().includes(pageQuery.value.selectedOperator.toLowerCase())
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
}

// UserDetailDialog状态
const userDetailDialogVisible = ref(false)
const selectedUserForDialog = ref<any>(null)

// ISP详情弹窗状态
const ispDetailDialogVisible = ref(false)
const selectedISP = ref<any>(null)

// ISP详情功能
const showISPDetails = (isp: any) => {
  selectedISP.value = isp
  ispDetailDialogVisible.value = true
}

// 用户详情功能
const showUserDetailDialog = (isp: any) => {
  // 将ISP数据转换为UserDetailDialog需要的格式
  const userData = {
    id: isp.identityNo,
    name: isp.realName,
    position: isp.name, // 运营商作为职位
    email: `${isp.realName.toLowerCase().replace(' ', '.')}@${isp.name.toLowerCase()}.com`,
    phone: isp.phoneNum,
    gender: 'Unknown',
    age: calculateAge(isp.birthDate),
    nationality: isp.nationality,
    avatar: isp.photo,
    avatars: isp.avatars || [isp.photo], // 使用avatars数组，如果没有则使用单张照片
    birthDate: isp.birthDate,
    idCardNumber: isp.identityNo,
    emergencyContact: 'Emergency Contact',
    emergencyPhone: isp.phoneNum,
    address: isp.address,
    department: isp.name,
    status: isp.status,
    hireDate: isp.registrationDate,
    workYears: Math.floor((new Date().getTime() - new Date(isp.registrationDate).getTime()) / (1000 * 60 * 60 * 24 * 365)),
    manager: 'Manager',
    bloodType: 'Unknown',
    maritalStatus: 'Unknown',
    educationLevel: 'Unknown',
    skills: 'ISP Management, Network Administration'
  }
  
  selectedUserForDialog.value = userData
  userDetailDialogVisible.value = true
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

.status-tag.active {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.status-tag.inactive {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.status-tag.pending {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.status-tag.suspended {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.isp-actions {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
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
  font-size: 0.625rem;
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
  min-width: 200px;
}

/* 字母筛选样式 */
.letter-filter-row {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.letter-filters {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
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

.search-btn {
  height: 40px;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.search-icon {
  width: 16px;
  height: 16px;
}

.reset-btn {
  height: 40px;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

.isp-detail-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
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


</style> 