<template>
  <div class="vehicle-detail-page">
    <div v-if="loading" class="global-loading-mask">
      <div class="global-loading-spinner"></div>
    </div>
    <!-- 左上角浮动区：主题切换+波浪动画控制 -->
    <div class="floating-id-trigger-group-vertical">
      <button class="control-btn theme-toggle-btn left-theme-btn" @click="toggleTheme" :title="currentTheme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'">
        <svg v-if="currentTheme === 'light'" width="20" height="20" viewBox="0 0 24 24" fill="none" class="control-icon">
          <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" class="control-icon">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <button class="control-btn animation-toggle-btn left-wave-btn" @click="toggleWave" :title="wavePaused ? '恢复波浪动画' : '暂停波浪动画'">
        <svg v-if="wavePaused" width="20" height="20" viewBox="0 0 24 24" fill="none" class="control-icon">
          <path d="M2 12C2 12 4 8 8 8C12 8 14 12 18 12C22 12 24 8 24 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 16C2 16 4 12 8 12C12 12 14 16 18 16C22 16 24 12 24 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="12" cy="12" r="2" fill="currentColor"/>
        </svg>
        <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" class="control-icon">
          <path d="M2 12C2 12 4 8 8 8C12 8 14 12 18 12C22 12 24 8 24 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 16C2 16 4 12 8 12C12 12 14 16 18 16C22 16 24 12 24 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="8" y1="6" x2="8" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <line x1="16" y1="6" x2="16" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
    <ContentWaveBackground :animationPaused="wavePaused">
      <div class="vehicle-detail-content vehicle-detail-page-content">
        <VehicleDetailPage 
          :vehicle="vehicleData" 
          :drivers="driversData"
          :hideBackButton="true"
          @back="handleBack"
        />
      </div>
    </ContentWaveBackground>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ContentWaveBackground from '@/components/ContentWaveBackground.vue'
import VehicleDetailPage from '@/components/vehicle-database/VehicleDetailPage.vue'
import { currentTheme, toggleTheme } from '@/utils/themeManager'
import { validateCurrentSession } from '@/utils/sessionValidator'

const route = useRoute()
const router = useRouter()

// 波浪动画控制
const wavePaused = ref(false)
function toggleWave() {
  wavePaused.value = !wavePaused.value
}

// 全局加载状态
const loading = ref(false)

// 动态车辆数据
const vehicleData = ref({
  id: '',
  plateNumber: '',
  brand: '',
  model: '',
  year: '',
  color: '',
  vin: '',
  engineNumber: '',
  ownerName: '',
  ownerPhone: '',
  registrationDate: '',
  expiryDate: '',
  insuranceExpiry: '',
  status: '',
  photo: '',
  fuelType: '',
  transmission: '',
  mileage: '',
  lastServiceDate: '',
  nextServiceDate: ''
})

// 根据路由参数加载车辆数据
const loadVehicleData = (id: string) => {
  // 模拟从API获取数据
  const mockVehicles = [
    {
      id: '1',
      plateNumber: 'ABC-1234',
      brand: 'Toyota',
      model: 'Camry',
      year: '2020',
      color: 'White',
      vin: '1HGBH41JXMN109186',
      engineNumber: 'ENG123456789',
      ownerName: 'Ahmed Al-Mansouri',
      ownerPhone: '+968 91312548',
      registrationDate: '2020-01-15',
      expiryDate: '2025-01-15',
      insuranceExpiry: '2024-12-31',
      status: 'active',
      photo: 'https://via.placeholder.com/300x200/ea580c/ffffff?text=Toyota+Camry',
      fuelType: 'Petrol',
      transmission: 'Automatic',
      mileage: '45,000 km',
      lastServiceDate: '2024-01-15',
      nextServiceDate: '2024-07-15'
    },
    {
      id: '2',
      plateNumber: 'XYZ-5678',
      brand: 'Honda',
      model: 'Civic',
      year: '2019',
      color: 'Black',
      vin: '2T1BURHE0JC123456',
      engineNumber: 'ENG987654321',
      ownerName: 'Fatima Al-Zahra',
      ownerPhone: '+968 91234567',
      registrationDate: '2019-06-10',
      expiryDate: '2024-06-10',
      insuranceExpiry: '2024-11-30',
      status: 'active',
      photo: 'https://via.placeholder.com/300x200/2563eb/ffffff?text=Honda+Civic',
      fuelType: 'Petrol',
      transmission: 'Manual',
      mileage: '38,500 km',
      lastServiceDate: '2024-02-20',
      nextServiceDate: '2024-08-20'
    },
    {
      id: '999',
      plateNumber: 'OMN-9999',
      brand: 'BMW',
      model: 'X5',
      year: '2022',
      color: 'Blue',
      vin: '5UXCR6C56KLL12345',
      engineNumber: 'ENG111222333',
      ownerName: 'Omar Al-Rashid',
      ownerPhone: '+968 98765432',
      registrationDate: '2022-03-20',
      expiryDate: '2027-03-20',
      insuranceExpiry: '2025-06-30',
      status: 'active',
      photo: 'https://via.placeholder.com/300x200/7c3aed/ffffff?text=BMW+X5',
      fuelType: 'Diesel',
      transmission: 'Automatic',
      mileage: '25,000 km',
      lastServiceDate: '2024-03-10',
      nextServiceDate: '2024-09-10'
    }
  ]
  
  // 如果是search模式，通过车牌号查找
  if (id === 'search') {
    const plate = route.query.plate as string
    if (plate) {
      const vehicle = mockVehicles.find(vehicle => vehicle.plateNumber === plate)
      if (vehicle) {
        vehicleData.value = vehicle
        return
      }
    }
  }
  
  // 通过ID查找
  const vehicle = mockVehicles.find(vehicle => vehicle.id === id)
  if (vehicle) {
    vehicleData.value = vehicle
  }
}

// 模拟驾驶员数据
const driversData = ref([
  {
    id: '1',
    name: 'Ahmed Al-Mansouri',
    phone: '+968 91312548',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    licenseNumber: 'DL123456789',
    licenseExpiry: '2026-05-15',
    status: 'active',
    trips: [
      { date: '2024-06-15', destination: 'Muscat to Salalah', duration: '8 hours', distance: '450 km' },
      { date: '2024-06-14', destination: 'Muscat to Sohar', duration: '2 hours', distance: '120 km' }
    ]
  },
  {
    id: '2',
    name: 'Fatima Al-Zahra',
    phone: '+968 91234567',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    licenseNumber: 'DL987654321',
    licenseExpiry: '2025-08-20',
    status: 'active',
    trips: [
      { date: '2024-06-15', destination: 'Muscat to Nizwa', duration: '1.5 hours', distance: '80 km' }
    ]
  },
  {
    id: '3',
    name: 'Omar Al-Rashid',
    phone: '+968 98765432',
    photo: 'https://randomuser.me/api/portraits/men/45.jpg',
    licenseNumber: 'DL555666777',
    licenseExpiry: '2027-12-10',
    status: 'active',
    trips: [
      { date: '2024-06-15', destination: 'Muscat to Sur', duration: '3 hours', distance: '200 km' }
    ]
  }
])

function handleBack() {
  router.push('/vehicle-database')
}

onMounted(async () => {
  const result = await validateCurrentSession()
  if (!result.isValid) {
    window.location.href = '/errorPage?reason=invalid-sessionid'
  }
  
  // 从路由参数获取车辆ID并加载数据
  const vehicleId = route.params.id as string
  if (vehicleId) {
    loadVehicleData(vehicleId)
  }
})

// 监听路由参数变化
watch(() => route.params.id, (newId) => {
  if (newId) {
    loadVehicleData(newId as string)
  }
})
</script>

<style scoped>
html, body {
  height: 100%;
  min-height: 100%;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  overflow-y: auto;
}

.vehicle-detail-page {
  min-height: 99vh;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.vehicle-detail-content.vehicle-detail-page-content {
  width: 100%;
  /* max-width: 1400px; */
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 2rem 220px 80px;
  min-height: 0;
  height: 100vh;
  overflow-y: auto;
  position: relative;
  z-index: 2;
  margin-top: 1rem;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .vehicle-detail-content.vehicle-detail-page-content {
    max-width: 100%;
    padding: 0 1.5rem 220px 80px;
  }
}

@media (max-width: 768px) {
  .vehicle-detail-content.vehicle-detail-page-content {
    padding: 0 1rem 220px 60px;
  }
  
  .floating-id-trigger-group-vertical {
    left: 16px;
    top: 60px;
  }
}

@media (max-width: 480px) {
  .vehicle-detail-content.vehicle-detail-page-content {
    padding: 0 0.5rem 220px 50px;
  }
  
  .floating-id-trigger-group-vertical {
    left: 12px;
    top: 50px;
  }
  
  .control-btn {
    width: 40px;
    height: 40px;
  }
}

:deep(.login-wave-background .content-slot) {
  min-height: 100vh !important;
  height: auto !important;
  display: block !important;
  align-items: stretch !important;
  justify-content: flex-start !important;
  padding: 0 !important;
  overflow-y: auto !important;
  overflow-x: hidden !important;
  position: static !important;
  width: 100% !important;
  max-width: 100% !important;
}

/* 防止横向滚动 */
html, body {
  overflow-x: hidden;
  width: 100%;
  max-width: 100vw;
}

.control-btn {
  width: 44px;
  height: 44px;
  border: none;
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-card);
  border-radius: 50%;
  box-shadow: var(--shadow-dialog);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--text-primary);
}

.control-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 32px var(--shadow-primary);
  background: var(--accent-secondary);
  color: var(--accent-primary);
}

.control-icon {
  transition: all 0.3s ease;
}

.control-btn:hover .control-icon {
  transform: scale(1.1);
}

.theme-toggle-btn:hover .control-icon {
  transform: rotate(15deg);
}

.animation-toggle-btn:hover .control-icon {
  transform: scale(1.1);
}

.floating-id-trigger-group-vertical {
  position: fixed;
  top: 80px;
  left: 24px;
  z-index: 1200;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}

.left-theme-btn {
  margin-left: 0;
}

.left-wave-btn {
  margin-left: 0;
}

.global-loading-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255,255,255,0.6);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.global-loading-spinner {
  width: 48px;
  height: 48px;
  border: 5px solid #e5e7eb;
  border-top: 5px solid var(--accent-primary, #2563eb);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style> 