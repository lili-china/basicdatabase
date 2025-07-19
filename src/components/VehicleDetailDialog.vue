<template>
  <el-dialog
    v-model="dialogVisible"
    :title="selectedVehicle ? selectedVehicle.type + ' - Vehicle Information' : 'Vehicle Information'"
    width="80%"
    class="vehicle-dialog"
  >
    <div v-if="selectedVehicle" class="vehicle-detail-content">
      <!-- 车辆基本信息 -->
      <div class="info-section">
        <h3>Basic Vehicle Information</h3>
        <div class="basic-info">
          <div class="vehicle-image-large">
            <img :src="selectedVehicle.image" :alt="selectedVehicle.type" />
          </div>
          <div class="basic-details">
            <div class="detail-row">
              <span class="label">Vehicle ID:</span>
              <span class="value">{{ selectedVehicle.id }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Type:</span>
              <span class="value">{{ selectedVehicle.type }}</span>
            </div>
            <div class="detail-row">
              <span class="label">License Plate:</span>
              <span class="value">{{ selectedVehicle.licensePlate }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Brand:</span>
              <span class="value">{{ selectedVehicle.brand }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Model:</span>
              <span class="value">{{ selectedVehicle.model }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Year:</span>
              <span class="value">{{ selectedVehicle.year }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Color:</span>
              <span class="value">{{ selectedVehicle.color }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Status:</span>
              <span class="value">{{ selectedVehicle.status }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 车辆技术参数 -->
      <div class="info-section">
        <h3>Technical Specifications</h3>
        <div class="specs-grid">
          <div class="spec-item">
            <span class="spec-label">Engine Type:</span>
            <span class="spec-value">{{ vehicleSpecs.engineType }}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Engine Size:</span>
            <span class="spec-value">{{ vehicleSpecs.engineSize }}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Fuel Type:</span>
            <span class="spec-value">{{ vehicleSpecs.fuelType }}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Transmission:</span>
            <span class="spec-value">{{ vehicleSpecs.transmission }}</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Mileage:</span>
            <span class="spec-value">{{ vehicleSpecs.mileage }} km</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Max Speed:</span>
            <span class="spec-value">{{ vehicleSpecs.maxSpeed }} km/h</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Fuel Capacity:</span>
            <span class="spec-value">{{ vehicleSpecs.fuelCapacity }} L</span>
          </div>
          <div class="spec-item">
            <span class="spec-label">Seating Capacity:</span>
            <span class="spec-value">{{ vehicleSpecs.seatingCapacity }} persons</span>
          </div>
        </div>
      </div>
      
      <!-- 注册信息 -->
      <div class="info-section">
        <h3>Registration Information</h3>
        <div class="registration-info">
          <div class="reg-details">
            <div class="detail-row">
              <span class="label">Registration Date:</span>
              <span class="value">{{ registrationInfo.registrationDate }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Registration Number:</span>
              <span class="value">{{ registrationInfo.registrationNumber }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Expiry Date:</span>
              <span class="value">{{ registrationInfo.expiryDate }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Insurance Provider:</span>
              <span class="value">{{ registrationInfo.insuranceProvider }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Insurance Expiry:</span>
              <span class="value">{{ registrationInfo.insuranceExpiry }}</span>
            </div>
          </div>
          
          <div class="registrant-info">
            <h4>Registrant Information</h4>
            <div class="registrant-card">
              <div class="registrant-header">
                <div class="registrant-avatar">
                  <img :src="registrationInfo.registrant.avatar" :alt="registrationInfo.registrant.name" />
                </div>
                <div class="registrant-basic">
                  <h5>{{ registrationInfo.registrant.name }}</h5>
                  <p class="employee-id">{{ registrationInfo.registrant.employeeId }}</p>
                  <p class="department">{{ registrationInfo.registrant.department }}</p>
                </div>
              </div>
              <div class="registrant-contact">
                <div class="contact-item">
                  <div class="contact-icon phone-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </div>
                  <div class="contact-details">
                    <span class="contact-label">Phone</span>
                    <span class="contact-value">{{ registrationInfo.registrant.phone }}</span>
                  </div>
                </div>
                <div class="contact-item">
                  <div class="contact-icon email-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <div class="contact-details">
                    <span class="contact-label">Email</span>
                    <span class="contact-value">{{ registrationInfo.registrant.email }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 车辆变更记录 -->
      <div class="info-section">
        <h3>Vehicle Change Records</h3>
        <el-table :data="changeRecords" style="width: 100%">
          <el-table-column prop="date" label="Date" width="120" />
          <el-table-column prop="changeType" label="Change Type" width="150" />
          <el-table-column prop="oldValue" label="Old Value" />
          <el-table-column prop="newValue" label="New Value" />
          <el-table-column prop="reason" label="Reason" />
          <el-table-column prop="changedBy" label="Changed By" width="120">
            <template #default="scope">
              <div v-if="scope.row.changedBy" class="changed-by">
                <img :src="scope.row.changedByAvatar" :alt="scope.row.changedBy" class="user-avatar-small" />
                <span>{{ scope.row.changedBy }}</span>
              </div>
              <span v-else>-</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-model:current-page="changeCurrentPage"
          :page-size="changePageSize"
          :total="changeRecords.length"
          layout="total, prev, pager, next"
          class="pagination"
        />
      </div>
      
      <!-- 维护记录 -->
      <div class="info-section">
        <h3>Maintenance Records</h3>
        <el-table :data="maintenanceRecords" style="width: 100%">
          <el-table-column prop="date" label="Date" width="120" />
          <el-table-column prop="serviceType" label="Service Type" width="150" />
          <el-table-column prop="description" label="Description" />
          <el-table-column prop="cost" label="Cost" width="100" />
          <el-table-column prop="serviceProvider" label="Service Provider" width="150" />
          <el-table-column prop="nextService" label="Next Service" width="120" />
        </el-table>
        <el-pagination
          v-model:current-page="maintenanceCurrentPage"
          :page-size="maintenancePageSize"
          :total="maintenanceRecords.length"
          layout="total, prev, pager, next"
          class="pagination"
        />
      </div>
      
      <!-- 使用记录 -->
      <div class="info-section">
        <h3>Usage Records</h3>
        <el-table :data="usageRecords" style="width: 100%">
          <el-table-column prop="date" label="Date" width="120" />
          <el-table-column prop="driver" label="Driver" width="120">
            <template #default="scope">
              <div v-if="scope.row.driver" class="driver-info">
                <img :src="scope.row.driverAvatar" :alt="scope.row.driver" class="user-avatar-small" />
                <span>{{ scope.row.driver }}</span>
              </div>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="purpose" label="Purpose" width="150" />
          <el-table-column prop="destination" label="Destination" />
          <el-table-column prop="distance" label="Distance (km)" width="120" />
          <el-table-column prop="fuelUsed" label="Fuel Used (L)" width="120" />
        </el-table>
        <el-pagination
          v-model:current-page="usageCurrentPage"
          :page-size="usagePageSize"
          :total="usageRecords.length"
          layout="total, prev, pager, next"
          class="pagination"
        />
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Vehicle {
  id: string
  type: string
  licensePlate: string
  brand: string
  model: string
  year: number
  color: string
  status: string
  image: string
}

interface Props {
  modelValue: boolean
  vehicle: Vehicle | null
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

// 计算属性用于双向绑定
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const selectedVehicle = computed(() => props.vehicle)

// 分页状态
const changeCurrentPage = ref(1)
const changePageSize = ref(5)
const maintenanceCurrentPage = ref(1)
const maintenancePageSize = ref(5)
const usageCurrentPage = ref(1)
const usagePageSize = ref(5)

// 车辆技术参数生成函数
const generateVehicleSpecs = () => {
  const specs = [
    { engineType: 'V6', engineSize: '3.0L', fuelType: 'Gasoline', transmission: 'Automatic', mileage: 45000, maxSpeed: 200, fuelCapacity: 60, seatingCapacity: 5 },
    { engineType: 'I4', engineSize: '2.0L', fuelType: 'Diesel', transmission: 'Manual', mileage: 32000, maxSpeed: 180, fuelCapacity: 50, seatingCapacity: 5 },
    { engineType: 'Electric', engineSize: 'N/A', fuelType: 'Electric', transmission: 'Single Speed', mileage: 15000, maxSpeed: 160, fuelCapacity: 75, seatingCapacity: 4 },
    { engineType: 'V8', engineSize: '4.0L', fuelType: 'Gasoline', transmission: 'Automatic', mileage: 28000, maxSpeed: 250, fuelCapacity: 80, seatingCapacity: 7 }
  ]
  return specs[Math.floor(Math.random() * specs.length)]
}

// 注册信息生成函数
const generateRegistrationInfo = () => {
  const registrants = [
    { name: 'John Smith', employeeId: 'EMP-2024-001', department: 'Engineering', phone: '+1 (555) 123-4567', email: 'john.smith@company.com', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
    { name: 'Sarah Johnson', employeeId: 'EMP-2024-002', department: 'Sales', phone: '+1 (555) 234-5678', email: 'sarah.johnson@company.com', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' },
    { name: 'Michael Chen', employeeId: 'EMP-2024-003', department: 'Marketing', phone: '+1 (555) 345-6789', email: 'michael.chen@company.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' }
  ]
  const registrant = registrants[Math.floor(Math.random() * registrants.length)]
  
  return {
    registrationDate: '2023-06-15',
    registrationNumber: `REG-${Math.floor(Math.random() * 9000) + 1000}`,
    expiryDate: '2025-06-15',
    insuranceProvider: 'State Farm',
    insuranceExpiry: '2024-12-31',
    registrant
  }
}

// 变更记录生成函数
const generateChangeRecords = () => {
  return [
    { 
      date: '2024-01-20', 
      changeType: 'Owner Change', 
      oldValue: 'John Smith', 
      newValue: 'Sarah Johnson', 
      reason: 'Employee transfer',
      changedBy: 'Admin User',
      changedByAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
    },
    { 
      date: '2023-12-10', 
      changeType: 'Status Update', 
      oldValue: 'Active', 
      newValue: 'Maintenance', 
      reason: 'Scheduled maintenance',
      changedBy: 'Fleet Manager',
      changedByAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    { 
      date: '2023-11-05', 
      changeType: 'License Plate', 
      oldValue: 'ABC-1234', 
      newValue: 'XYZ-5678', 
      reason: 'License plate renewal',
      changedBy: 'Registration Office',
      changedByAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
    }
  ]
}

// 维护记录生成函数
const generateMaintenanceRecords = () => {
  return [
    { date: '2024-01-15', serviceType: 'Oil Change', description: 'Regular oil change and filter replacement', cost: '$85', serviceProvider: 'AutoCare Center', nextService: '2024-04-15' },
    { date: '2023-12-20', serviceType: 'Brake Service', description: 'Brake pad replacement and brake fluid check', cost: '$320', serviceProvider: 'Quick Fix Garage', nextService: '2024-06-20' },
    { date: '2023-11-10', serviceType: 'Tire Rotation', description: 'Tire rotation and balance', cost: '$45', serviceProvider: 'Tire World', nextService: '2024-02-10' },
    { date: '2023-10-05', serviceType: 'Annual Inspection', description: 'Annual safety and emissions inspection', cost: '$120', serviceProvider: 'State Inspection Center', nextService: '2024-10-05' }
  ]
}

// 使用记录生成函数
const generateUsageRecords = () => {
  const drivers = [
    { name: 'John Smith', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
    { name: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face' },
    { name: 'Michael Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' }
  ]
  
  return [
    { date: '2024-02-01', driver: drivers[0].name, driverAvatar: drivers[0].avatar, purpose: 'Client Meeting', destination: 'Downtown Office', distance: 25, fuelUsed: 2.5 },
    { date: '2024-01-30', driver: drivers[1].name, driverAvatar: drivers[1].avatar, purpose: 'Site Visit', destination: 'Construction Site', distance: 45, fuelUsed: 4.2 },
    { date: '2024-01-28', driver: drivers[2].name, driverAvatar: drivers[2].avatar, purpose: 'Airport Pickup', destination: 'International Airport', distance: 60, fuelUsed: 5.8 },
    { date: '2024-01-25', driver: drivers[0].name, driverAvatar: drivers[0].avatar, purpose: 'Equipment Transport', destination: 'Warehouse', distance: 30, fuelUsed: 3.1 }
  ]
}

// 模拟数据
const vehicleSpecs = ref(generateVehicleSpecs())
const registrationInfo = ref(generateRegistrationInfo())
const changeRecords = ref(generateChangeRecords())
const maintenanceRecords = ref(generateMaintenanceRecords())
const usageRecords = ref(generateUsageRecords())
</script>

<style scoped>
/* 对话框样式 */
.vehicle-dialog {
  max-width: 90vw;
}

.vehicle-detail-content {
  max-height: 70vh;
  overflow-y: auto;
}

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

.basic-info {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.vehicle-image-large {
  width: 200px;
  height: 150px;
  border-radius: 16px;
  overflow: hidden;
  border: 4px solid rgba(59, 130, 246, 0.3);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  flex-shrink: 0;
}

.vehicle-image-large img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.basic-details {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-row .label {
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
}

.detail-row .value {
  color: var(--text-primary);
  font-size: 0.875rem;
  font-weight: 600;
}

/* 技术参数网格 */
.specs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.spec-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: rgba(59, 130, 246, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(59, 130, 246, 0.1);
}

.spec-label {
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
}

.spec-value {
  color: #1f2937;
  font-size: 0.875rem;
  font-weight: 600;
}

/* 注册信息 */
.registration-info {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.reg-details {
  flex: 1;
  min-width: 300px;
}

.registrant-info {
  flex: 1;
  min-width: 300px;
}

.registrant-info h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 1rem 0;
}

.registrant-card {
  background: linear-gradient(135deg, var(--bg-secondary) 0%, rgba(59, 130, 246, 0.05) 100%);
  border-radius: 16px;
  border: 1px solid var(--border-primary);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.registrant-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.registrant-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.registrant-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--accent-primary);
  flex-shrink: 0;
}

.registrant-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.registrant-basic {
  flex: 1;
}

.registrant-basic h5 {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.25rem 0;
}

.employee-id {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0 0 0.25rem 0;
}

.department {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.registrant-contact {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: rgba(59, 130, 246, 0.08);
  border-radius: 8px;
  border: 1px solid rgba(59, 130, 246, 0.15);
  transition: all 0.2s ease;
  flex: 1;
  min-width: 200px;
}

.contact-item:hover {
  background: rgba(59, 130, 246, 0.12);
  transform: translateY(-1px);
}

.contact-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.phone-icon {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
}

.email-icon {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
}

.contact-icon svg {
  width: 16px;
  height: 16px;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.contact-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.contact-value {
  font-size: 0.875rem;
  color: var(--text-primary);
  font-weight: 600;
}

.changed-by, .driver-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-avatar-small {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
}

.pagination {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .basic-info {
    flex-direction: column;
    gap: 1rem;
  }
  
  .vehicle-image-large {
    width: 100%;
    height: 200px;
  }
  
  .basic-details {
    grid-template-columns: 1fr;
  }
  
  .specs-grid {
    grid-template-columns: 1fr;
  }
  
  .registration-info {
    flex-direction: column;
  }
  
  .registrant-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .registrant-header {
    flex-direction: column;
    align-items: center;
  }
  
  .registrant-basic {
    text-align: center;
  }
  
  .registrant-contact {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .info-section {
    padding: 1rem;
  }
}
</style>