<template>
  <div class="app-container">
    <!-- 导航栏 -->
    <NavigationBar />
    
    <!-- 波浪背景和内容 -->
    <WaveBackground>
      <div class="wave-demo-container">
        <div class="page-header">
          <h1>Vehicle Database</h1>
          <p>Search and view vehicle information and records</p>
        </div>
        
        <!-- 搜索和筛选区域 -->
        <div class="search-section">
   
          
          <div class="search-filters">
            <div class="filter-row">
              <!-- 车辆类型下拉框 -->
              <div class="filter-group">
                <label class="filter-label">Vehicle Type</label>
                <el-select v-model="pageQuery.selectedType" placeholder="Select Vehicle Type" class="filter-input">
                  <el-option label="All Vehicle Types" value="" />
                  <el-option label="Company Car" value="Company Car" />
                  <el-option label="Personal Vehicle" value="Personal Vehicle" />
                  <el-option label="Motorcycle" value="Motorcycle" />
                  <el-option label="Truck" value="Truck" />
                </el-select>
              </div>

              <!-- 状态下拉框 -->
              <div class="filter-group">
                <label class="filter-label">Status</label>
                <el-select v-model="pageQuery.selectedStatus" placeholder="Select Status" class="filter-input">
                  <el-option label="All Status" value="" />
                  <el-option label="Active" value="Active" />
                  <el-option label="Maintenance" value="Maintenance" />
                  <el-option label="Retired" value="Retired" />
                </el-select>
              </div>

              <!-- 搜索输入框 -->
              <div class="filter-group">
                <label class="filter-label">Search</label>
                <el-input
                  v-model="pageQuery.searchQuery"
                  placeholder="Search by type, license plate, or owner..."
                  class="filter-input"
                  clearable
                />
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
        
        <!-- 车辆卡片网格 -->
        <div class="cards-grid">
          <div 
            v-for="(vehicle, index) in paginatedVehicles" 
            :key="vehicle.id"
            class="data-card"
            @click="showVehicleDetail(vehicle)"
          >
            <div class="card-header">
              <div class="vehicle-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L3 21L7 17ZM3 21V11C3 10.4696 3.21071 9.96086 3.58579 9.58579C3.96086 9.21071 4.46957 9 5 9H11L21 19V21C21 21.5304 20.7893 22.0391 20.4142 22.4142C20.0391 22.7893 19.5304 23 19 23H5C4.46957 23 3.96086 22.7893 3.58579 22.4142C3.21071 22.0391 3 21.5304 3 21V21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
            
            <div class="vehicle-info-section">
              <h2>{{ vehicle.brand }} {{ vehicle.model }}</h2>
              <p class="license">{{ vehicle.licensePlate }}</p>
              <p class="owner">{{ vehicle.owner }}</p>
            </div>
            
            <div class="card-body">
              <div class="info-row">
                <span class="label">ID:</span>
                <span class="value">{{ vehicle.id }}</span>
              </div>
              <div class="info-row">
                <span class="label">Type:</span>
                <span class="value">{{ vehicle.type }}</span>
              </div>
              <div class="info-row">
                <span class="label">Brand:</span>
                <span class="value">{{ vehicle.brand }}</span>
              </div>
              <div class="info-row">
                <span class="label">Model:</span>
                <span class="value">{{ vehicle.model }}</span>
              </div>
              <div class="info-row">
                <span class="label">Year:</span>
                <span class="value">{{ vehicle.year }}</span>
              </div>
              <div class="info-row">
                <span class="label">Color:</span>
                <span class="value">{{ vehicle.color }}</span>
              </div>
              <div class="info-row">
                <span class="label">Status:</span>
                <span class="value">{{ vehicle.status }}</span>
              </div>
              <div class="info-row">
                <span class="label">Owner:</span>
                <span class="value">{{ vehicle.owner }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 分页 -->
        <div class="pagination-section">
          <el-pagination
            v-model:current-page="currentPage"
            :page-size="itemsPerPage"
            :total="filteredVehicles.length"
            layout="total, prev, pager, next, jumper"
            @current-change="handleCurrentChange"
          />
        </div>
        
        <!-- 车辆详情对话框 -->
        <VehicleDetailDialog
          v-model="dialogVisible"
          :vehicle="selectedVehicle"
        />
      </div>
    </WaveBackground>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import WaveBackground from '../components/WaveBackground.vue'
import NavigationBar from '../components/NavigationBar.vue'
import VehicleDetailDialog from '../components/VehicleDetailDialog.vue'
import { generateMockVehicles } from '../utils/mockData'

// 使用mock数据
const allVehicles = ref(generateMockVehicles())

// 页面查询对象
const pageQuery = ref({
  searchQuery: '',
  selectedType: '',
  selectedStatus: ''
})
const currentPage = ref(1)
const itemsPerPage = 12

// 对话框相关状态
const dialogVisible = ref(false)
const selectedVehicle = ref<any>(null)

// 过滤后的车辆列表
const filteredVehicles = computed(() => {
  let filtered = allVehicles.value
  
  // 搜索过滤
  if (pageQuery.value.searchQuery) {
    const query = pageQuery.value.searchQuery.toLowerCase()
    filtered = filtered.filter(vehicle => 
      vehicle.type.toLowerCase().includes(query) ||
      vehicle.licensePlate.toLowerCase().includes(query) ||
      vehicle.owner.toLowerCase().includes(query) ||
      vehicle.brand.toLowerCase().includes(query) ||
      vehicle.model.toLowerCase().includes(query) ||
      vehicle.color.toLowerCase().includes(query)
    )
  }
  
  // 类型过滤
  if (pageQuery.value.selectedType) {
    filtered = filtered.filter(vehicle => vehicle.type === pageQuery.value.selectedType)
  }
  
  // 状态过滤
  if (pageQuery.value.selectedStatus) {
    filtered = filtered.filter(vehicle => vehicle.status === pageQuery.value.selectedStatus)
  }
  
  return filtered
})

// 分页后的车辆列表
const paginatedVehicles = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredVehicles.value.slice(start, end)
})

// 搜索功能
const performSearch = () => {
  currentPage.value = 1
  // 搜索逻辑已通过computed实现
}

// 重置筛选
const resetFilters = () => {
  pageQuery.value.searchQuery = ''
  pageQuery.value.selectedType = ''
  pageQuery.value.selectedStatus = ''
  currentPage.value = 1
}

// 分页方法
const handleCurrentChange = (page: number) => {
  currentPage.value = page
}

// 显示车辆详情
const showVehicleDetail = (vehicle: any) => {
  selectedVehicle.value = vehicle
  dialogVisible.value = true
}
</script>

<style scoped>
/* 车辆图标样式 */
.vehicle-icon {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  border: 3px solid rgba(59, 130, 246, 0.3);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(59, 130, 246, 0.1);
}

.vehicle-icon svg {
  color: #3b82f6;
}

/* 车辆信息区域 */
.vehicle-info-section {
  text-align: center;
  margin-bottom: 1.5rem;
}

.vehicle-info-section h2 {
  color: var(--text-primary);
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0 0 0.3rem 0;
}

.license {
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0 0 0.2rem 0;
}

.owner {
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


</style> 