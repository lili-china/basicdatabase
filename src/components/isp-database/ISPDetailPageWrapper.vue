<template>
  <div class="isp-detail-page">
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
      <div class="isp-detail-content isp-detail-page-content">
        <ISPDetailPage 
          :isp="ispData" 
          :contacts="contactsData"
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
import ISPDetailPage from '@/components/isp-database/ISPDetailPage.vue'
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

// 动态ISP数据
const ispData = ref({
  id: '',
  name: '',
  phoneNum: '',
  realName: '',
  identityNo: '',
  nationality: '',
  birthDate: '',
  address: '',
  serviceType: '',
  maxSpeed: '',
  coverage: '',
  location: '',
  description: '',
  registrationDate: '',
  expiryDate: '',
  status: '',
  photo: ''
})

// 根据路由参数加载ISP数据
const loadISPData = (id: string) => {
  // 模拟从API获取数据
  const mockISPs = [
    {
      id: '1',
      name: 'Ooredoo',
      phoneNum: '+968 91312548',
      realName: 'Ahmed Al-Mansouri',
      identityNo: '1234567890',
      nationality: 'Oman',
      birthDate: '1985-03-15',
      address: 'Muscat, Oman',
      serviceType: 'Mobile',
      maxSpeed: '100 Mbps',
      coverage: 'National',
      location: 'Muscat, Oman',
      description: 'Leading telecommunications provider in Oman',
      registrationDate: '2020-01-15',
      expiryDate: '2025-01-15',
      status: 'active',
      photo: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      id: '2',
      name: 'Omantel',
      phoneNum: '+968 91234567',
      realName: 'Fatima Al-Zahra',
      identityNo: '0987654321',
      nationality: 'Oman',
      birthDate: '1990-07-22',
      address: 'Salalah, Oman',
      serviceType: 'Mobile',
      maxSpeed: '150 Mbps',
      coverage: 'National',
      location: 'Salalah, Oman',
      description: 'National telecommunications provider',
      registrationDate: '2019-06-10',
      expiryDate: '2024-06-10',
      status: 'active',
      photo: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      id: '999',
      name: 'Awasr',
      phoneNum: '+968 91234567',
      realName: 'Ahmed Al-Mahri',
      identityNo: '1234567890',
      nationality: 'Omani',
      birthDate: '1985-03-15',
      address: 'Al Ghubrah, Muscat, Oman',
      serviceType: 'Fixed Fiber Internet',
      maxSpeed: '1 Gbps',
      coverage: 'Muscat Metropolitan Area',
      location: 'Al Ghubrah, Muscat, Oman',
      description: 'High-speed fiber internet service with 24/7 support',
      registrationDate: '2023-01-15',
      expiryDate: '2025-01-15',
      status: 'available',
      photo: 'https://via.placeholder.com/80x80/ea580c/ffffff?text=AA'
    }
  ]
  
  // 如果是search模式，通过手机号查找
  if (id === 'search') {
    const phone = route.query.phone as string
    if (phone) {
      const isp = mockISPs.find(isp => isp.phoneNum === phone)
      if (isp) {
        ispData.value = isp
        return
      }
    }
  }
  
  // 通过ID查找
  const isp = mockISPs.find(isp => isp.id === id)
  if (isp) {
    ispData.value = isp
  }
}

// 模拟联系人数据
const contactsData = ref([
  {
    phone: '+968 91234567',
    name: 'Fatima Al-Zahra',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    count: 15,
    calls: [
      { time: '2024-06-15 14:30', type: 'Outgoing', duration: '5:23', otherPhone: '+968 91234567' },
      { time: '2024-06-14 16:45', type: 'Incoming', duration: '2:15', otherPhone: '+968 91234567' }
    ]
  },
  {
    phone: '+968 98765432',
    name: 'Omar Al-Rashid',
    photo: 'https://randomuser.me/api/portraits/men/45.jpg',
    count: 8,
    calls: [
      { time: '2024-06-15 10:20', type: 'Outgoing', duration: '3:45', otherPhone: '+968 98765432' }
    ]
  },
  {
    phone: '+968 95556666',
    name: 'Aisha Al-Said',
    photo: 'https://randomuser.me/api/portraits/women/46.jpg',
    count: 12,
    calls: [
      { time: '2024-06-15 18:10', type: 'Incoming', duration: '7:12', otherPhone: '+968 95556666' }
    ]
  }
])

function handleBack() {
  router.push('/isp-database')
}

onMounted(async () => {
  const result = await validateCurrentSession()
  if (!result.isValid) {
    window.location.href = '/errorPage?reason=invalid-sessionid'
  }
  
  // 从路由参数获取ISP ID并加载数据
  const ispId = route.params.id as string
  if (ispId) {
    loadISPData(ispId)
  }
})

// 监听路由参数变化
watch(() => route.params.id, (newId) => {
  if (newId) {
    loadISPData(newId as string)
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

.isp-detail-page {
  min-height: 99vh;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.isp-detail-content.isp-detail-page-content {
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
  .isp-detail-content.isp-detail-page-content {
    max-width: 100%;
    padding: 0 1.5rem 220px 80px;
  }
}

@media (max-width: 768px) {
  .isp-detail-content.isp-detail-page-content {
    padding: 0 1rem 220px 60px;
  }
  
  .floating-id-trigger-group-vertical {
    left: 16px;
    top: 60px;
  }
}

@media (max-width: 480px) {
  .isp-detail-content.isp-detail-page-content {
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