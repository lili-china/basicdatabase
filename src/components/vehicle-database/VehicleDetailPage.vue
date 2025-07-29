<template>
  <div class="vehicle-detail-page">
    <template v-if="vehicle">
      <div class="vehicle-detail-content vehicle-detail-page-content">
        <div class="vehicle-detail-header" :class="{ 'centered': hideBackButton }">
          <span v-if="!hideBackButton" @click="goBack" class="breadcrumb-back">
            <svg class="breadcrumb-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
          <span v-if="vehicle && vehicle.plateNumber" class="breadcrumb-plate themed">{{ vehicle.plateNumber }}</span>
        </div>
        
        <!-- Basic Vehicle Information -->
        <div class="detail-section">
          <h4>Basic Vehicle Information</h4>
          <div class="vehicle-detail-avatar-row">
            <div class="brand-logo-container">
              <img v-if="getBrandLogo(vehicle.brand)" :src="getBrandLogo(vehicle.brand)" :alt="vehicle.brand + ' logo'" class="brand-logo" />
              <div v-else class="brand-logo-placeholder">
                <span class="brand-name">{{ vehicle.brand }}</span>
              </div>
            </div>
          </div>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-label">Plate Number:</span>
              <span class="detail-value">{{ vehicle.plateNumber }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Brand:</span>
              <span class="detail-value">{{ vehicle.brand }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Model:</span>
              <span class="detail-value">{{ vehicle.model }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Year:</span>
              <span class="detail-value">{{ vehicle.year }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Color:</span>
              <span class="detail-value">{{ vehicle.color }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">VIN:</span>
              <span class="detail-value">{{ vehicle.vin }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Engine Number:</span>
              <span class="detail-value">{{ vehicle.engineNumber }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Fuel Type:</span>
              <span class="detail-value">{{ vehicle.fuelType }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Transmission:</span>
              <span class="detail-value">{{ vehicle.transmission }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Mileage:</span>
              <span class="detail-value">{{ vehicle.mileage }}</span>
            </div>
          </div>
        </div>

        <!-- Registration Information -->
        <div class="detail-section">
          <h4>Registration Information</h4>
          <div class="detail-grid">
            <div class="detail-item">
              <span class="detail-label">Registration Type:</span>
              <span class="detail-value">
                <span class="status-tag" :class="vehicle.registrationType">{{ vehicle.registrationType }}</span>
              </span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Owner Name:</span>
              <span class="detail-value">{{ vehicle.ownerName }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Owner Phone:</span>
              <span class="detail-value">{{ vehicle.ownerPhone }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Owner ID:</span>
              <span class="detail-value">{{ vehicle.ownerId }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Registration Date:</span>
              <span class="detail-value">{{ vehicle.registrationDate }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Expiry Date:</span>
              <span class="detail-value" :class="{ 'expired': isExpired(vehicle.expiryDate) }">
                {{ vehicle.expiryDate }}
              </span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Insurance Expiry:</span>
              <span class="detail-value" :class="{ 'expired': isExpired(vehicle.insuranceExpiry) }">
                {{ vehicle.insuranceExpiry }}
              </span>
            </div>
            <div class="detail-item">
              <span class="detail-label">Status:</span>
              <span class="detail-value">
                <span class="status-tag" :class="vehicle.status">{{ vehicle.status }}</span>
              </span>
            </div>
          </div>
        </div>

        <!-- Vehicle Change Records -->
        <div class="detail-section">
          <h4>Vehicle Change Records</h4>
          <div class="change-records-container">
            <el-table 
              :data="paginatedChangeRecords" 
              style="width: 100%"
              :header-cell-style="{ background: 'var(--bg-primary)', color: 'var(--text-secondary)', fontWeight: '600' }"
              :cell-style="{ color: 'var(--text-primary)' }"
              fit
            >
              <el-table-column prop="date" label="Date" min-width="120" />
              <el-table-column prop="changeType" label="Change Type" min-width="150" />
              <el-table-column prop="description" label="Description" min-width="200" show-overflow-tooltip />
              <el-table-column prop="previousValue" label="Previous Value" min-width="150" show-overflow-tooltip />
              <el-table-column prop="newValue" label="New Value" min-width="150" show-overflow-tooltip />
              <el-table-column prop="changedBy" label="Changed By" min-width="120" />
              <el-table-column prop="status" label="Status" min-width="100">
                <template #default="scope">
                  <el-tag 
                    :type="scope.row.status === 'completed' ? 'success' : scope.row.status === 'pending' ? 'warning' : 'danger'"
                    size="small"
                  >
                    {{ scope.row.status }}
                  </el-tag>
                </template>
              </el-table-column>
            </el-table>
            
            <!-- Pagination -->
            <div class="pagination-wrapper">
              <el-pagination
                v-model:current-page="currentPage"
                v-model:page-size="pageSize"
                :page-sizes="[5, 10, 20, 50]"
                :total="totalChangeRecords"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>
          </div>
        </div>

      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { getBrandLogo } from '@/utils/vehicleUtils'

interface Vehicle {
  id: string
  plateNumber: string
  brand: string
  model: string
  year: string
  color: string
  vin: string
  engineNumber: string
  ownerName: string
  ownerPhone: string
  ownerId: string
  registrationType: string
  registrationDate: string
  expiryDate: string
  insuranceExpiry: string
  status: string
  photo: string
  fuelType: string
  transmission: string
  mileage: string
}

interface ChangeRecord {
  id: number
  date: string
  changeType: string
  description: string
  previousValue: string
  newValue: string
  changedBy: string
  status: string
}

interface Props {
  vehicle: Vehicle | null
  hideBackButton?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  back: []
}>()

// Mock vehicle data
const mockVehicle = computed(() => ({
  id: 'VEH001',
  plateNumber: '京A12345',
  brand: 'BMW',
  model: 'X5',
  year: '2022',
  color: 'White',
  vin: 'WBA5A7C50FD123456',
  engineNumber: 'N55B30M0',
  ownerName: 'John Smith',
  ownerPhone: '13800138000',
  ownerId: 'ID123456789',
  registrationType: 'personal',
  registrationDate: '2022-03-15',
  expiryDate: '2025-03-15',
  insuranceExpiry: '2024-12-31',
  status: 'active',
  photo: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop',
  fuelType: 'Gasoline',
  transmission: 'Automatic',
  mileage: '15,000 km'
}))

// Use mock data instead of props vehicle
const vehicle = computed(() => mockVehicle.value)

// Change records data
const changeRecords = ref<ChangeRecord[]>([
  {
    id: 1,
    date: '2024-06-15',
    changeType: 'Owner Transfer',
    description: 'Vehicle ownership transferred from previous owner',
    previousValue: 'Previous Owner',
    newValue: 'John Smith',
    changedBy: 'System Admin',
    status: 'completed'
  },
  {
    id: 2,
    date: '2024-05-20',
    changeType: 'Registration Update',
    description: 'Updated registration information',
    previousValue: 'Old Registration',
    newValue: 'New Registration',
    changedBy: 'Registration Office',
    status: 'completed'
  },
  {
    id: 3,
    date: '2024-04-10',
    changeType: 'Insurance Update',
    description: 'Insurance policy renewed',
    previousValue: 'Expired Insurance',
    newValue: 'Active Insurance',
    changedBy: 'Insurance Agent',
    status: 'completed'
  },
  {
    id: 4,
    date: '2024-03-25',
    changeType: 'Maintenance Record',
    description: 'Regular maintenance completed',
    previousValue: '15,000 km',
    newValue: '15,500 km',
    changedBy: 'Service Center',
    status: 'completed'
  },
  {
    id: 5,
    date: '2024-02-15',
    changeType: 'Color Change',
    description: 'Vehicle color changed',
    previousValue: 'Black',
    newValue: 'White',
    changedBy: 'Owner',
    status: 'completed'
  },
  {
    id: 6,
    date: '2024-01-30',
    changeType: 'Plate Number',
    description: 'Plate number updated',
    previousValue: '京A12344',
    newValue: '京A12345',
    changedBy: 'Traffic Police',
    status: 'completed'
  },
  {
    id: 7,
    date: '2023-12-20',
    changeType: 'Registration Type',
    description: 'Registration type changed from company to personal',
    previousValue: 'Company',
    newValue: 'Personal',
    changedBy: 'Registration Office',
    status: 'completed'
  },
  {
    id: 8,
    date: '2023-11-15',
    changeType: 'Engine Update',
    description: 'Engine replacement',
    previousValue: 'Old Engine',
    newValue: 'New Engine',
    changedBy: 'Service Center',
    status: 'completed'
  }
])

// Pagination
const currentPage = ref(1)
const pageSize = ref(5)

const totalChangeRecords = computed(() => changeRecords.value.length)
const startIndex = computed(() => (currentPage.value - 1) * pageSize.value)
const endIndex = computed(() => Math.min(startIndex.value + pageSize.value, totalChangeRecords.value))

const paginatedChangeRecords = computed(() => {
  const start = startIndex.value
  const end = endIndex.value
  return changeRecords.value.slice(start, end)
})

function handleSizeChange(val: number) {
  pageSize.value = val
  currentPage.value = 1 // Reset to first page when page size changes
}

function handleCurrentChange(val: number) {
  currentPage.value = val
}

function goBack() {
  emit('back')
}

function isExpired(date: string): boolean {
  if (!date) return false
  const expiryDate = new Date(date)
  const today = new Date()
  return expiryDate < today
}
</script>

<style scoped>
.vehicle-detail-page {
  width: 100%;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.vehicle-detail-content.vehicle-detail-page-content {
  padding: 0;
  flex: 1;
  width: 100%;
}

.vehicle-detail-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem 0;
  border-bottom: 2px solid var(--border-primary);
}

.vehicle-detail-header.centered {
  justify-content: center;
}

.breadcrumb-back {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--text-primary);
}

.breadcrumb-back:hover {
  background: var(--accent-secondary);
  color: var(--accent-primary);
  transform: scale(1.1);
}

.breadcrumb-arrow {
  transition: transform 0.3s ease;
}

.breadcrumb-back:hover .breadcrumb-arrow {
  transform: translateX(-2px);
}

.breadcrumb-plate {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.detail-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 12px;
  box-shadow: var(--shadow-card);
  width: 100%;
}

.detail-section h4 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--accent-secondary);
}

.vehicle-detail-avatar-row {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.brand-logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 80px;
  border-radius: 12px;
  background: var(--bg-tertiary);
  border: 3px solid var(--accent-secondary);
  box-shadow: var(--shadow-card);
  overflow: hidden;
}

.brand-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.brand-logo-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: var(--bg-tertiary);
  border-radius: 12px;
  border: 3px solid var(--accent-secondary);
  box-shadow: var(--shadow-card);
}

.brand-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  width: 100%;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: var(--bg-tertiary);
  border-radius: 8px;
  border: 1px solid var(--border-primary);
  width: 100%;
  min-height: 50px;
}

.detail-label {
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
}

.detail-value {
  color: var(--text-primary);
  font-size: 0.875rem;
  font-weight: 600;
}

.detail-value.expired {
  color: #ef4444;
  font-weight: 700;
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

.detail-value .status-tag.personal {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.detail-value .status-tag.company {
  background: rgba(168, 85, 247, 0.1);
  color: #a855f7;
}

/* Change Records Table */
.change-records-container {
  width: 100%;
  overflow-x: auto;
}

.change-records-container .el-table {
  width: 100% !important;
}

.change-records-container .el-table__body-wrapper {
  overflow-x: auto;
}

.pagination-wrapper {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  padding: 1rem;
  background: var(--bg-primary);
  border-radius: 8px;
  border: 1px solid var(--border-card);
}

/* Responsive Design */
@media (max-width: 1200px) {
  .detail-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}

@media (max-width: 768px) {
  .detail-grid {
    grid-template-columns: 1fr;
  }
  
  .pagination-wrapper {
    padding: 0.75rem;
  }
}

@media (max-width: 480px) {
  .detail-section {
    padding: 1rem;
  }
  
  .brand-logo-container {
    width: 100px;
    height: 67px;
  }
  
  .pagination-wrapper {
    padding: 0.5rem;
  }
}
</style> 