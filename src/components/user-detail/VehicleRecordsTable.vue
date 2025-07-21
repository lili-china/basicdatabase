<template>
  <div class="info-section">
    <h3>Vehicle Information Change Records</h3>
    
    <!-- 搜索条件区域 -->
    <div class="search-section">
      <el-row :gutter="16">
        <el-col :span="8">
          <el-input
            v-model="searchForm.licensePlate"
            placeholder="License Plate"
            clearable
            @input="handleSearch"
          />
        </el-col>
        <el-col :span="8">
          <el-select
            v-model="searchForm.vehicleType"
            placeholder="Vehicle Type"
            clearable
            @change="handleSearch"
            style="width: 100%"
          >
            <el-option label="Company Car" value="Company Car" />
            <el-option label="Personal Vehicle" value="Personal Vehicle" />
            <el-option label="Motorcycle" value="Motorcycle" />
            <el-option label="Truck" value="Truck" />
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-date-picker
            v-model="searchForm.dateRange"
            type="daterange"
            range-separator="To"
            start-placeholder="Start Date"
            end-placeholder="End Date"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            @change="handleSearch"
            style="width: 100%"
          />
        </el-col>
      </el-row>
    </div>

    <div class="table-container">
      <el-table :data="paginatedRecords" style="width: 100%">
        <el-table-column prop="date" label="Date" min-width="100" />
        <el-table-column prop="vehicleType" label="Vehicle Type" min-width="120" />
        <el-table-column prop="licensePlate" label="License Plate" min-width="120" />
        <el-table-column prop="brand" label="Brand" min-width="100" />
        <el-table-column prop="model" label="Model" min-width="100" />
        <el-table-column prop="year" label="Year" min-width="80" />
        <el-table-column prop="color" label="Color" min-width="80" />
        <el-table-column prop="status" label="Status" min-width="100" />
        <el-table-column prop="previousUser" label="Previous User" min-width="120">
          <template #default="scope">
            <div v-if="scope.row.previousUser" class="previous-user-clickable" @click="$emit('showUserDetail', scope.row.previousUser)">
              <img :src="scope.row.previousUserAvatar" :alt="scope.row.previousUser" class="user-avatar-small" />
              <span class="clickable-id">{{ scope.row.previousUser }}</span>
            </div>
            <span v-else>-</span>
          </template>
        </el-table-column>
      </el-table>
      
      <!-- 分页组件 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="filteredRecords.length"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, reactive } from 'vue'

interface VehicleRecord {
  date: string
  vehicleType: string
  licensePlate: string
  brand: string
  model: string
  year: number
  color: string
  status: string
  previousUser?: string
  previousUserAvatar?: string
}

interface Props {
  userId: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  showUserDetail: [userName: string]
}>()

// 搜索表单
const searchForm = reactive({
  licensePlate: '',
  vehicleType: '',
  dateRange: [] as string[]
})

// 分页状态
const currentPage = ref(1)
const pageSize = ref(10)

// 原始数据
const originalRecords = [
  { 
    date: '2024-01-20', 
    vehicleType: 'Company Car', 
    licensePlate: 'ABC-1234', 
    brand: 'Toyota', 
    model: 'Camry', 
    year: 2022, 
    color: 'White', 
    status: 'Active',
    previousUser: 'Sarah Johnson',
    previousUserAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  { 
    date: '2023-12-10', 
    vehicleType: 'Personal Vehicle', 
    licensePlate: 'XYZ-5678', 
    brand: 'Honda', 
    model: 'Accord', 
    year: 2021, 
    color: 'Black', 
    status: 'Maintenance',
    previousUser: 'Michael Chen',
    previousUserAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  },
  { 
    date: '2023-11-15', 
    vehicleType: 'Motorcycle', 
    licensePlate: 'MOTO-999', 
    brand: 'Harley-Davidson', 
    model: 'Sportster', 
    year: 2020, 
    color: 'Red', 
    status: 'Active',
    previousUser: 'Emily Rodriguez',
    previousUserAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  { 
    date: '2023-10-05', 
    vehicleType: 'Truck', 
    licensePlate: 'TRUCK-001', 
    brand: 'Ford', 
    model: 'F-150', 
    year: 2023, 
    color: 'Blue', 
    status: 'Active',
    previousUser: 'David Wilson',
    previousUserAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  }
]

// 过滤后的记录
const filteredRecords = computed(() => {
  return originalRecords.filter(record => {
    const plateMatch = !searchForm.licensePlate || record.licensePlate.toLowerCase().includes(searchForm.licensePlate.toLowerCase())
    const typeMatch = !searchForm.vehicleType || record.vehicleType === searchForm.vehicleType
    
    let dateMatch = true
    if (searchForm.dateRange && searchForm.dateRange.length === 2) {
      const recordDate = new Date(record.date)
      const startDate = new Date(searchForm.dateRange[0])
      const endDate = new Date(searchForm.dateRange[1])
      dateMatch = recordDate >= startDate && recordDate <= endDate
    }
    
    return plateMatch && typeMatch && dateMatch
  })
})

// 分页后的记录
const paginatedRecords = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredRecords.value.slice(start, end)
})

// 搜索处理
const handleSearch = () => {
  currentPage.value = 1
}

// 分页处理
const handleSizeChange = (size: number) => {
  pageSize.value = size
  currentPage.value = 1
}

const handleCurrentChange = (page: number) => {
  currentPage.value = page
  // 滚动到表格顶部
  const tableContainer = document.querySelector('.table-container')
  if (tableContainer) {
    tableContainer.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<style scoped>
.info-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: var(--bg-tertiary);
  border-radius: 12px;
  border: 1px solid var(--border-primary);
}

.info-section h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 1rem 0;
  border-bottom: 2px solid var(--accent-secondary);
  padding-bottom: 0.5rem;
}

.search-section {
  margin-bottom: 1rem;
  padding: 1rem;
  background: var(--bg-primary);
  border-radius: 8px;
  border: 1px solid var(--border-primary);
}

.table-container {
  overflow-x: auto;
  border-radius: 8px;
  background: var(--bg-primary);
}

.pagination-container {
  padding: 1rem;
  display: flex;
  justify-content: center;
  background: var(--bg-primary);
  border-top: 1px solid var(--border-primary);
}

.previous-user-clickable {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.previous-user-clickable:hover {
  background-color: rgba(59, 130, 246, 0.1);
}

.clickable-id {
  color: var(--accent-primary);
  font-weight: 500;
  text-decoration: underline;
}

.user-avatar-small {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .info-section {
    padding: 1rem;
  }
  
  .table-container {
    font-size: 0.875rem;
  }
  
  .search-section .el-col {
    margin-bottom: 0.5rem;
  }
}

/* 表格滚动条样式 */
.table-container::-webkit-scrollbar {
  height: 6px;
}

.table-container::-webkit-scrollbar-track {
  background: var(--bg-primary);
  border-radius: 3px;
}

.table-container::-webkit-scrollbar-thumb {
  background: var(--border-primary);
  border-radius: 3px;
}

.table-container::-webkit-scrollbar-thumb:hover {
  background: var(--accent-primary);
}
</style> 