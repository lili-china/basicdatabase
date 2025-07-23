<template>
  <div class="app-container">
    <!-- 导航栏 -->
    <NavigationBar />
    
    <!-- 波浪背景和内容 -->
    <WaveBackground>
      <div class="wave-demo-container">
        
        <!-- 页面标题 -->
        <div class="page-header">
          <h1>Personal Database</h1>
          <p>Search and view personal information and records</p>
        </div>
        
        <!-- 搜索和筛选区域 -->
        <div class="search-section">
          <div class="search-filters">
            <div class="filter-row">
              <!-- 搜索输入框 -->
              <div class="filter-group">
                <label class="filter-label">Search</label>
                <el-input
                  v-model="pageQuery.searchQuery"
                  placeholder="Search by name, ID, position, or phone..."
                  class="filter-input"
                  clearable
                />
              </div>

              <!-- 国籍下拉框 -->
              <div class="filter-group">
                <label class="filter-label">Nationality</label>
                <el-select v-model="pageQuery.selectedNationality" placeholder="Select Nationality" class="filter-input">
                  <el-option label="All Nationalities" value="" />
                  <el-option label="American" value="American" />
                  <el-option label="Canadian" value="Canadian" />
                  <el-option label="British" value="British" />
                  <el-option label="German" value="German" />
                  <el-option label="French" value="French" />
                  <el-option label="Italian" value="Italian" />
                  <el-option label="Spanish" value="Spanish" />
                </el-select>
              </div>

              <!-- 职位下拉框 -->
              <div class="filter-group">
                <label class="filter-label">Position</label>
                <el-select v-model="pageQuery.selectedPosition" placeholder="Select Position" class="filter-input">
                  <el-option label="All Positions" value="" />
                  <el-option label="Software Engineer" value="Software Engineer" />
                  <el-option label="UI/UX Designer" value="UI/UX Designer" />
                  <el-option label="Product Manager" value="Product Manager" />
                  <el-option label="Data Scientist" value="Data Scientist" />
                  <el-option label="DevOps Engineer" value="DevOps Engineer" />
                  <el-option label="Frontend Developer" value="Frontend Developer" />
                  <el-option label="Backend Developer" value="Backend Developer" />
                </el-select>
              </div>

              <!-- 性别下拉框 -->
              <div class="filter-group">
                <label class="filter-label">Gender</label>
                <el-select v-model="pageQuery.selectedGender" placeholder="Select Gender" class="filter-input">
                  <el-option label="All Genders" value="" />
                  <el-option label="Male" value="Male" />
                  <el-option label="Female" value="Female" />
                </el-select>
              </div>

              <!-- 年龄范围下拉框 -->
              <div class="filter-group">
                <label class="filter-label">Age Range</label>
                <el-select v-model="pageQuery.selectedAgeRange" placeholder="Select Age Range" class="filter-input">
                  <el-option label="All Ages" value="" />
                  <el-option label="22-30" value="22-30" />
                  <el-option label="31-35" value="31-35" />
                  <el-option label="36-40" value="36-40" />
                  <el-option label="41-46" value="41-46" />
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
        
        <!-- 卡片网格 -->
        <div class="cards-grid">
          <div 
            v-for="(user, index) in paginatedUsers" 
            :key="user.id"
            class="data-card"
            @click="showUserDetail(user)"
          >
            <div class="card-header">
              <div class="avatar">
                <img :src="user.avatar" :alt="user.name" />
              </div>
            </div>
            
            <div class="user-info-section">
              <h2>{{ user.name }}</h2>
              <p class="position">{{ user.position }}</p>
              <p class="email">{{ user.email }}</p>
            </div>
            
            <div class="card-body">
              <div class="info-row">
                <span class="label">ID:</span>
                <span class="value">{{ user.id }}</span>
              </div>
              <div class="info-row">
                <span class="label">Name:</span>
                <span class="value">{{ user.name }}</span>
              </div>
              <div class="info-row">
                <span class="label">Phone:</span>
                <span class="value">{{ user.phone }}</span>
              </div>
              <div class="info-row">
                <span class="label">Gender:</span>
                <span class="value">{{ user.gender }}</span>
              </div>
              <div class="info-row">
                <span class="label">Age:</span>
                <span class="value">{{ user.age }}</span>
              </div>
              <div class="info-row">
                <span class="label">Nationality:</span>
                <span class="value">{{ user.nationality }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Element UI 分页 -->
        <div class="pagination-section">
          <el-pagination
            v-model:current-page="currentPage"
            :page-size="itemsPerPage"
            :total="filteredUsers.length"
            layout="total, prev, pager, next, jumper"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </WaveBackground>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import WaveBackground from '../components/WaveBackground.vue'
import NavigationBar from '../components/NavigationBar.vue'
import { generateMockUsers } from '../utils/mockData'

// 使用mock数据
const allUsers = ref(generateMockUsers())

// 页面查询对象
const pageQuery = ref({
  searchQuery: '',
  selectedNationality: '',
  selectedPosition: '',
  selectedGender: '',
  selectedAgeRange: ''
})
const currentPage = ref(1)
const itemsPerPage = 12

// 对话框相关状态
const dialogVisible = ref(false)
const selectedUser = ref<any>(null)



// 过滤后的用户列表
const filteredUsers = computed(() => {
  let filtered = allUsers.value
  
  // 搜索过滤
  if (pageQuery.value.searchQuery) {
    const query = pageQuery.value.searchQuery.toLowerCase()
    filtered = filtered.filter(user => 
      user.name.toLowerCase().includes(query) ||
      user.id.toLowerCase().includes(query) ||
      user.position.toLowerCase().includes(query) ||
      user.phone.includes(query)
    )
  }
  
  // 国籍过滤
  if (pageQuery.value.selectedNationality) {
    filtered = filtered.filter(user => user.nationality === pageQuery.value.selectedNationality)
  }
  
  // 职位过滤
  if (pageQuery.value.selectedPosition) {
    filtered = filtered.filter(user => user.position === pageQuery.value.selectedPosition)
  }
  
  // 性别过滤
  if (pageQuery.value.selectedGender) {
    filtered = filtered.filter(user => user.gender === pageQuery.value.selectedGender)
  }
  
  // 年龄范围过滤
  if (pageQuery.value.selectedAgeRange) {
    const [minAge, maxAge] = pageQuery.value.selectedAgeRange.split('-').map(Number)
    filtered = filtered.filter(user => user.age >= minAge && user.age <= maxAge)
  }
  
  return filtered
})

// 分页后的用户列表
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredUsers.value.slice(start, end)
})

// 搜索功能
const performSearch = () => {
  currentPage.value = 1
  // 搜索逻辑已通过computed实现
}

// 重置筛选
const resetFilters = () => {
  pageQuery.value.searchQuery = ''
  pageQuery.value.selectedNationality = ''
  pageQuery.value.selectedPosition = ''
  pageQuery.value.selectedGender = ''
  pageQuery.value.selectedAgeRange = ''
  currentPage.value = 1
}

// 分页方法
const handleCurrentChange = (page: number) => {
  currentPage.value = page
  // 滚动到页面顶部
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// 显示用户详情
const showUserDetail = (user: any) => {
  window.open(`/user-detail/${user.id}`, '_blank')
}


</script>

<style scoped>
/* 用户信息区域 */
.user-info-section {
  text-align: center;
  margin-bottom: 1.5rem;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  border: 3px solid rgba(59, 130, 246, 0.3);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-info-section h2 {
  color: var(--text-primary);
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0 0 0.3rem 0;
}

.position {
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0 0 0.2rem 0;
}

.email {
  color: var(--text-tertiary);
  font-size: 0.8rem;
  margin: 0;
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
  min-width: 200px;
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

body.el-popup-parent--hidden .navigation-bar .nav-item,
body.dialog-open .navigation-bar .nav-item {
  color: var(--text-secondary) !important;
  background: transparent !important;
  pointer-events: none !important;
}
body.el-popup-parent--hidden .navigation-bar .nav-item.active,
body.dialog-open .navigation-bar .nav-item.active {
  color: var(--text-secondary) !important;
  background: transparent !important;
}

</style> 