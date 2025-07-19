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
        
        <!-- 搜索和过滤区域 -->
        <div class="search-section">
          <div class="search-box">
            <input 
              type="text" 
              placeholder="Search by vehicle type, license plate, or owner..."
              v-model="searchQuery"
              class="search-input"
            />
            <button class="search-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          
          <div class="filter-controls">
            <el-select 
              v-model="selectedType" 
              placeholder="All Vehicle Types"
              clearable
              style="width: 200px;"
            >
              <el-option label="All Vehicle Types" value="" />
              <el-option label="Company Car" value="Company Car" />
              <el-option label="Personal Vehicle" value="Personal Vehicle" />
              <el-option label="Motorcycle" value="Motorcycle" />
              <el-option label="Truck" value="Truck" />
            </el-select>
            
            <el-select 
              v-model="selectedStatus" 
              placeholder="All Status"
              clearable
              style="width: 150px;"
            >
              <el-option label="All Status" value="" />
              <el-option label="Active" value="Active" />
              <el-option label="Maintenance" value="Maintenance" />
              <el-option label="Retired" value="Retired" />
            </el-select>
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

// 生成车辆数据
const generateVehicles = () => {
  const vehicleTypes = ['Company Car', 'Personal Vehicle', 'Motorcycle', 'Truck']
  const statuses = ['Active', 'Maintenance', 'Retired']
  const brands = ['Toyota', 'Honda', 'Ford', 'BMW', 'Mercedes', 'Audi', 'Volkswagen', 'Nissan']
  const models = ['Camry', 'Accord', 'Focus', '3 Series', 'C-Class', 'A4', 'Golf', 'Altima']
  const colors = ['White', 'Black', 'Silver', 'Blue', 'Red', 'Gray', 'Green', 'Yellow']
  const owners = [
    'John Smith', 'Sarah Johnson', 'Michael Chen', 'Emily Rodriguez',
    'David Kim', 'Lisa Wang', 'Alex Thompson', 'Maria Garcia'
  ]
  
  const vehicles = []
  
  for (let i = 0; i < 30; i++) {
    const year = Math.floor(Math.random() * 10) + 2015 // 2015-2024
    const licensePlate = `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 9000) + 1000}`
    const brandIndex = i % brands.length
    const modelIndex = i % models.length
    
    vehicles.push({
      id: `VEH-2024-${String(i + 1).padStart(3, '0')}`,
      type: vehicleTypes[i % vehicleTypes.length],
      licensePlate: licensePlate,
      brand: brands[brandIndex],
      model: models[modelIndex],
      year: year,
      color: colors[i % colors.length],
      status: statuses[i % statuses.length],
      owner: owners[i % owners.length],
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop'
    })
  }
  
  return vehicles
}

const allVehicles = ref(generateVehicles())

// 搜索和过滤状态
const searchQuery = ref('')
const selectedType = ref('')
const selectedStatus = ref('')
const currentPage = ref(1)
const itemsPerPage = 12

// 对话框相关状态
const dialogVisible = ref(false)
const selectedVehicle = ref<any>(null)

// 过滤后的车辆列表
const filteredVehicles = computed(() => {
  let filtered = allVehicles.value
  
  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
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
  if (selectedType.value) {
    filtered = filtered.filter(vehicle => vehicle.type === selectedType.value)
  }
  
  // 状态过滤
  if (selectedStatus.value) {
    filtered = filtered.filter(vehicle => vehicle.status === selectedStatus.value)
  }
  
  return filtered
})

// 分页后的车辆列表
const paginatedVehicles = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredVehicles.value.slice(start, end)
})

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

/* 响应式设计 - 页面特有 */
@media (max-width: 480px) {
  .vehicle-icon {
    width: 70px;
    height: 70px;
  }
  
  .vehicle-info-section h2 {
    font-size: 1.1rem;
  }
  
  .license {
    font-size: 0.8rem;
  }
  
  .owner {
    font-size: 0.75rem;
  }
}
</style> 