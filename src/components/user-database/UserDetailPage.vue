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
      <div class="floating-id-trigger" ref="idTriggerRef" v-if="selectedIds.length > 0">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" class="id-list-icon" @click="toggleIdPanel">
          <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
          <path d="M4 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span class="id-badge" v-if="selectedIds.length > 0">{{ selectedIds.length }}</span>
        <div class="floating-id-list" v-if="showIdPanel && selectedIds.length > 0">
          <div
            v-for="id in selectedIds"
            :key="id"
            class="id-item"
            @click="handleIdListClick(id)"
          >
            <img class="id-avatar" :src="getUserAvatarById(id)" alt="头像" />
            <span class="id-text">{{ id }}</span>
            <span class="remove-btn" @click.stop="removeSelectedId(id)">×</span>
          </div>
        </div>
      </div>
    </div>
    <ContentWaveBackground :animationPaused="wavePaused">
      <div class="isp-detail-content isp-detail-page-content">
        <!-- Basic Information -->
        <BasicInfoSection 
          :user="currentUser" 
          @updateMainAvatar="updateMainAvatar"
        />
        
        <!-- Identity Change Information -->
        <IdentityRecordsTable 
          :identityRecords="currentUser.identity || []"
          @idClick="addSelectedId"
        />
        
        <!-- Family Members -->
        <FamilyMembersTable 
          :familyMembers="currentUser.family || []"
          :currentUserId="currentUser.id"
          :currentUserName="currentUser.name"
          @idClick="addSelectedId"
          @toggleSection="toggleSection('family')"
        />
        
        <!-- Investment Information -->
        <div class="detail-section collapsible">
          <div class="section-header" @click="toggleSection('investment')">
            <h4>Investment Information</h4>
            <svg class="collapse-icon" :class="{ 'collapsed': !expandedSections.investment }" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="section-content" :class="{ 'collapsed': !expandedSections.investment }">
            <InvestmentsTable :userId="currentUser.id" />
          </div>
        </div>
        
        <!-- Phone Registration Information -->
        <PhoneRecordsTable 
          :phoneRecords="currentUser.phoneRecords || []"
          @idClick="addSelectedId"
          @toggleSection="toggleSection('phone')"
        />
        
        <!-- Broadband Registration Information -->
        <BroadbandRecordsTable 
          :broadbandRecords="currentUser.broadband || []"
          @toggleSection="toggleSection('broadband')"
        />
        
        <!-- Vehicle Registration Information -->
        <VehicleRecordsTable 
          :vehicleRecords="currentUser.vehicle || []"
          @toggleSection="toggleSection('vehicle')"
        />
      </div>
    </ContentWaveBackground>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, reactive, nextTick, watch } from 'vue'
import ContentWaveBackground from '../ContentWaveBackground.vue'
import { currentTheme, toggleTheme } from '@/utils/themeManager'
import { flyToTarget } from '@/utils/flyToTarget'
import '@/style/common-fly-effect.css'
import { validateCurrentSession } from '@/utils/sessionValidator'
import BasicInfoSection from './BasicInfoSection.vue'
import IdentityRecordsTable from './IdentityRecordsTable.vue'
import FamilyMembersTable from './FamilyMembersTable.vue'
import PhoneRecordsTable from './PhoneRecordsTable.vue'
import BroadbandRecordsTable from './BroadbandRecordsTable.vue'
import VehicleRecordsTable from './VehicleRecordsTable.vue'
import InvestmentsTable from './InvestmentsTable.vue'

// 用户数据（静态2个用户，头像、id、基础信息等）
const usersAll = [
  {
    id: 'EMP-2024-001',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
    name: 'Sarah Johnson',
    gender: 'Female',
    age: 30,
    phone: '+1 555-1234',
    email: 'sarah.johnson@email.com',
    nationality: 'Canada',
    birth: '1994-03-15',
    address: 'Toronto, Canada',
    position: 'UI/UX Designer',
    department: 'Design',
    status: 'Active',
    reg: '2021-01-01',
    exp: '2026-01-01',
    family: [
      { id: 'FAM-001', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', name: 'John Johnson', relation: 'Father', age: 60, nationality: 'Canada', phone: '+1 555-1111', remark: 'Retired' },
      { id: 'FAM-002', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', name: 'Mary Johnson', relation: 'Mother', age: 58, nationality: 'Canada', phone: '+1 555-2222', remark: 'Homemaker' },
      { id: 'FAM-003', avatar: 'https://randomuser.me/api/portraits/women/45.jpg', name: 'Emily Johnson', relation: 'Sister', age: 28, nationality: 'Canada', phone: '+1 555-3333', remark: 'Teacher' }
    ],
    identity: [
      { id: 'ID-001', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', old: 'Sarah Johnson', new: 'Sarah Lee', date: '2023-05-10', type: 'Marriage', operator: 'Admin', remark: 'Marriage name change' },
      { id: 'ID-002', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', old: 'Sarah Lee', new: 'Sarah Johnson', date: '2024-01-15', type: 'Divorce', operator: 'System', remark: 'Divorce name revert' }
    ],
    phoneRecords: [
      { id: 'PH-001', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', phone: '+1 555-1234', regDate: '2020-06-15', operator: 'Bell', status: 'Active', remark: 'Main' },
      { id: 'PH-002', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', phone: '+1 555-5678', regDate: '2019-11-20', operator: 'Rogers', status: 'Inactive', remark: 'Old' }
    ],
    investment: [
      { name: 'Maple Fund', type: 'Stock', amount: 50000, currency: 'CAD', start: '2020-01-01', status: 'Active', remark: 'Long-term' },
      { name: 'Toronto Real Estate', type: 'Property', amount: 300000, currency: 'CAD', start: '2018-06-15', status: 'Active', remark: 'Rental' },
      { name: 'Tech Startup', type: 'Equity', amount: 20000, currency: 'USD', start: '2021-03-10', status: 'Inactive', remark: 'Exited' },
      { name: 'Green Energy', type: 'Bond', amount: 10000, currency: 'CAD', start: '2019-09-01', status: 'Active', remark: 'Government' },
      { name: 'Crypto Fund', type: 'Crypto', amount: 8000, currency: 'USD', start: '2022-02-20', status: 'Active', remark: 'High risk' }
    ],
    broadband: [
      { account: 'sarahj', regDate: '2019-08-15', address: 'Toronto, Canada', operator: 'Bell', status: 'Active', remark: 'Home' },
      { account: 'johnj', regDate: '2018-12-10', address: 'Ottawa, Canada', operator: 'Rogers', status: 'Inactive', remark: 'Old' },
      { account: 'emilyj', regDate: '2020-10-01', address: 'Vancouver, Canada', operator: 'Telus', status: 'Active', remark: 'Work' },
      { account: 'davidj', regDate: '2017-03-22', address: 'Montreal, Canada', operator: 'Bell', status: 'Active', remark: 'Backup' },
      { account: 'annal', regDate: '2016-07-30', address: 'Calgary, Canada', operator: 'Rogers', status: 'Inactive', remark: 'Dorm' }
    ],
    vehicle: [
      { plate: 'ON-12345', type: 'Sedan', regDate: '2022-05-01', owner: 'Sarah Johnson', status: 'Active', remark: 'Personal' },
      { plate: 'ON-67890', type: 'SUV', regDate: '2021-08-15', owner: 'Sarah Johnson', status: 'Active', remark: 'Family' },
      { plate: 'ON-54321', type: 'Truck', regDate: '2020-12-10', owner: 'Sarah Johnson', status: 'Inactive', remark: 'Sold' },
      { plate: 'ON-98765', type: 'Van', regDate: '2019-03-22', owner: 'Sarah Johnson', status: 'Active', remark: 'Company' },
      { plate: 'ON-11111', type: 'Sedan', regDate: '2018-07-30', owner: 'Sarah Johnson', status: 'Inactive', remark: 'Scrapped' }
    ]
  },
  {
    id: 'EMP-2024-002',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    name: 'David Lee',
    gender: 'Male',
    age: 35,
    phone: '+1 555-8888',
    email: 'david.lee@email.com',
    nationality: 'Canada',
    birth: '1989-02-20',
    address: 'Vancouver, Canada',
    position: 'Product Manager',
    department: 'Product',
    status: 'Active',
    reg: '2020-05-01',
    exp: '2025-05-01',
    family: [
      { id: 'FAM-004', avatar: 'https://randomuser.me/api/portraits/men/66.jpg', name: 'Michael Lee', relation: 'Father', age: 65, nationality: 'Canada', phone: '+1 555-6666', remark: 'Retired' },
      { id: 'FAM-005', avatar: 'https://randomuser.me/api/portraits/women/67.jpg', name: 'Linda Lee', relation: 'Mother', age: 62, nationality: 'Canada', phone: '+1 555-7777', remark: 'Homemaker' }
    ],
    identity: [
      { id: 'ID-003', avatar: 'https://randomuser.me/api/portraits/men/65.jpg', old: 'David Lee', new: 'David Smith', date: '2022-03-10', type: 'Legal', operator: 'Clerk', remark: 'Legal name update' }
    ],
    phoneRecords: [
      { id: 'PH-003', avatar: 'https://randomuser.me/api/portraits/men/65.jpg', phone: '+1 555-8888', regDate: '2021-07-10', operator: 'Bell', status: 'Active', remark: 'Main' }
    ]
  }
]

const currentUserId = ref(usersAll[0].id)
const currentUser = computed(() => usersAll.find(u => u.id === currentUserId.value)!)

// 选中的id数组
const selectedIds = ref<string[]>([])
const showIdPanel = ref(false)
const idTriggerRef = ref<HTMLElement | null>(null)

function addSelectedId(id: string, event?: MouseEvent) {
  if (!selectedIds.value.includes(id)) selectedIds.value.push(id)
  if (event) {
    const target = event.target as HTMLElement
    const rect = target.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    // 构造内容节点，使用全局样式
    const content = document.createElement('div')
    content.className = 'fly-to-target-effect'
    content.innerHTML = `<img src='${getUserAvatarById(id)}' class='fly-to-target-avatar'/><span class='fly-to-target-text'>${id}</span>`
    const svg = document.querySelector('.id-list-icon') as HTMLElement
    if (svg) {
      flyToTarget({
        start: { x: centerX, y: centerY },
        end: svg,
        content,
        duration: 700,
        scaleFrom: 1.2,
        scaleTo: 0.5,
        opacityFrom: 1,
        opacityTo: 0.2,
        bezierOffset: 80
      })
    }
  }
}

function removeSelectedId(id: string) {
  selectedIds.value = selectedIds.value.filter(i => i !== id)
}

function toggleIdPanel() {
  showIdPanel.value = !showIdPanel.value
}

function handleClickOutside(e: MouseEvent) {
  if (!idTriggerRef.value) return
  if (!idTriggerRef.value.contains(e.target as Node)) {
    showIdPanel.value = false
  }
}

onMounted(async () => {
  const result = await validateCurrentSession()
  if (!result.isValid) {
    window.location.href = '/errorPage?reason=invalid-sessionid'
  }
  document.addEventListener('mousedown', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})

function getUserAvatarById(id: string) {
  const user = usersAll.find(u => u.id === id)
  if (user) return user.avatar
  // 也可能是 family/phone/identity等id
  for (const u of usersAll) {
    if (u.family && u.family.some((f: any) => f.id === id)) return u.family.find((f: any) => f.id === id)?.avatar
    if (u.identity && u.identity.some((f: any) => f.id === id)) return u.identity.find((f: any) => f.id === id)?.avatar
    if (u.phoneRecords && u.phoneRecords.some((f: any) => f.id === id)) return u.phoneRecords.find((f: any) => f.id === id)?.avatar
  }
  return 'https://via.placeholder.com/40x40?text=ID'
}

const expandedSections = ref({
  basic: true,
  identity: true,
  family: true,
  investment: true,
  phone: true,
  broadband: true,
  vehicle: true
})

function toggleSection(key: keyof typeof expandedSections.value) {
  expandedSections.value[key] = !expandedSections.value[key]
}

const wavePaused = ref(false)
function toggleWave() {
  wavePaused.value = !wavePaused.value
}

const loading = ref(false)
function handleIdListClick(id: string) {
  loading.value = true
  setTimeout(() => {
    currentUserId.value = id
    showIdPanel.value = false
    // 滚动到顶部
    const content = document.querySelector('.isp-detail-content')
    if (content) content.scrollTop = 0
    window.scrollTo({ top: 0 })
    loading.value = false
  }, 500)
}

function updateMainAvatar(avatar: string) {
  // 这里可以处理头像更新逻辑
  console.log('Main avatar updated:', avatar)
}
</script>

<style scoped>
html, body {
  height: 100%;
  min-height: 100%;
  width: 100vw;
  overflow-x: hidden;
  overflow-y: auto;
}

.isp-detail-page {
  min-height: 99vh;
  width: 100vw;
  overflow-x: hidden;
}

.isp-detail-content.isp-detail-page-content {
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 3vw 220px 80px;
  min-height: 0;
  height: 100vh;
  overflow-y: auto;
  position: relative;
  z-index: 2;
  margin-top: 1rem;
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
}

/* 防止横向滚动 */
html, body {
  overflow-x: hidden;
}

.detail-section {
  background: var(--bg-card);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--border-card);
  box-shadow: 0 2px 8px rgba(59,130,246,0.06);
  margin-bottom: 2rem;
}

.detail-section h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--accent-primary);
}

.collapsible .section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 0;
  margin: 0;
  transition: all 0.3s ease;
}

.collapsible .section-header:hover {
  background: var(--bg-primary);
  border-radius: 8px;
  padding: 0.5rem;
  margin: -0.5rem;
}

.collapsible .section-header h4 {
  margin: 0;
  padding: 0;
  border-bottom: none;
}

.collapse-icon {
  transition: transform 0.3s ease;
  color: var(--text-secondary);
}

.collapse-icon.collapsed {
  transform: rotate(-90deg);
}

.section-content {
  margin-top: 1.5rem;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s;
  opacity: 1;
  max-height: 2000px;
}

.section-content.collapsed {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
  margin-top: 0;
  margin-bottom: 0;
}

.login-controls {
  display: none;
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

.floating-id-trigger {
  position: relative;
  margin-top: 10px;
  margin-left: 0;
  z-index: 1200;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.id-list-icon {
  color: var(--accent-primary);
  background: var(--bg-card);
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(59,130,246,0.10);
  cursor: pointer;
  padding: 4px;
  transition: all 0.3s ease;
  display: block;
}

.id-list-icon:hover {
  background: var(--accent-secondary);
  color: var(--accent-primary);
  transform: scale(1.1);
}

.floating-id-list {
  position: absolute;
  left: 48px;
  top: 0;
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(59,130,246,0.10);
  padding: 10px 16px;
  min-width: 180px;
  z-index: 1300;
  cursor: pointer;
}

.id-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 6px;
  font-size: 15px;
  color: var(--text-primary);
  border-radius: 6px;
  transition: background 0.2s;
  gap: 10px;
  padding: 4px 6px;
}

.id-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 6px;
  border: 2px solid var(--border-card);
  background: #f3f4f6;
}

.id-text {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.id-item:hover {
  background: var(--accent-secondary);
}

.remove-btn {
  margin-left: 8px;
  color: #ef4444;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
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

.fly-id-effect {
  display: flex;
  align-items: center;
  background: var(--bg-card);
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(59,130,246,0.25);
  padding: 4px 10px;
  font-size: 15px;
  color: var(--text-primary);
  border: 1px solid var(--border-card);
  pointer-events: none;
  position: fixed;
  z-index: 99999;
  transition: all 0.7s cubic-bezier(.4,1,.7,1);
}

.wave-toggle-btn {
  position: fixed;
  top: 32px;
  right: 32px;
  z-index: 2100;
  background: var(--bg-card);
  color: var(--accent-primary);
  border: 1px solid var(--border-card);
  border-radius: 8px;
  padding: 8px 18px;
  font-size: 15px;
  box-shadow: 0 2px 8px rgba(59,130,246,0.10);
  cursor: pointer;
  transition: all 0.2s;
}

.wave-toggle-btn:hover {
  background: var(--accent-secondary);
  color: var(--accent-primary);
}

.id-badge {
  position: absolute;
  top: 2px;
  right: 2px;
  min-width: 18px;
  height: 18px;
  background: #ef4444;
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(59,130,246,0.10);
  z-index: 2;
  pointer-events: none;
  padding: 0 5px;
  border: 2px solid #fff;
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