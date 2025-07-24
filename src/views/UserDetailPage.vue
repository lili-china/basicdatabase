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
        <!-- Basic Information 不可折叠 -->
        <div class="detail-section basic-info-section horizontal-card single-col-info">
          <div class="avatar-block">
            <img :src="mainAvatar" alt="Avatar" class="main-avatar" />
            <div class="avatar-history" v-if="currentUser.identity && currentUser.identity.length">
              <div class="history-label">Photo History</div>
              <div class="history-thumbs">
                <div
                  v-for="item in currentUser.identity"
                  :key="item.id"
                  class="history-thumb"
                  :class="{ active: mainAvatar === item.avatar }"
                  @click="mainAvatar = item.avatar"
                >
                  <img :src="item.avatar" alt="History Photo" />
                </div>
              </div>
            </div>
          </div>
          <div class="info-block info-block-bordered">
            <div class="info-header-row">
              <h2 class="user-name">{{ currentUser.name }}</h2>
              <span class="user-id">ID: {{ currentUser.id }}</span>
              <span class="status-badge active">Active Resident</span>
            </div>
            <div class="multi-col-info-list">
              <div class="multi-col-info-row">
                <span class="multi-col-info-label">Gender</span>
                <span class="multi-col-info-value">{{ currentUser.gender }}</span>
              </div>
              <div class="multi-col-info-row">
                <span class="multi-col-info-label">Age</span>
                <span class="multi-col-info-value">{{ currentUser.age }}</span>
              </div>
              <div class="multi-col-info-row">
                <span class="multi-col-info-label">Nationality</span>
                <span class="multi-col-info-value">{{ currentUser.nationality }}</span>
              </div>
              <div class="multi-col-info-row">
                <span class="multi-col-info-label">Birth Date</span>
                <span class="multi-col-info-value">{{ currentUser.birth }}</span>
              </div>
              <div class="multi-col-info-row">
                <span class="multi-col-info-label">Address</span>
                <span class="multi-col-info-value">{{ currentUser.address }}</span>
              </div>
              <div class="multi-col-info-row">
                <span class="multi-col-info-label">Phone</span>
                <span class="multi-col-info-value">{{ currentUser.phone }}</span>
              </div>
              <div class="multi-col-info-row">
                <span class="multi-col-info-label">Email</span>
                <span class="multi-col-info-value">{{ currentUser.email }}</span>
              </div>
              <div class="multi-col-info-row">
                <span class="multi-col-info-label">Registration Date</span>
                <span class="multi-col-info-value">{{ currentUser.reg }}</span>
              </div>
              <div class="multi-col-info-row">
                <span class="multi-col-info-label">Expiry Date</span>
                <span class="multi-col-info-value">{{ currentUser.exp }}</span>
              </div>
              <!-- 你可以随意添加更多 multi-col-info-row，不影响布局 -->
            </div>
          </div>
        </div>
        <!-- Identity Change Information 不可折叠 -->
          <div class="detail-section">
          <h4>Identity Change Information</h4>
          <el-table :data="identityChangeList" border stripe class="identity-change-table">
            <el-table-column label="Avatar">
                <template #default="scope">
                <img :src="scope.row.avatar" style="width:36px;height:36px;border-radius:50%;object-fit:cover;" />
                </template>
              </el-table-column>
            <el-table-column prop="id" label="ID">
                <template #default="scope">
                <span style="color:#409eff;cursor:pointer;" @click="addSelectedId(scope.row.id, $event)">{{scope.row.id}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="old" label="Old Name" />
              <el-table-column prop="new" label="New Name" />
              <el-table-column prop="date" label="Change Date" />
            <el-table-column prop="type" label="Change Type" />
            <el-table-column prop="operator" label="Operator" />
            <el-table-column prop="remark" label="Remark" />
            </el-table>
            <el-pagination
            v-model:current-page="identityPage"
            :page-size="identityPageSize"
            :total="identityChangeListAll.length"
              layout="total, prev, pager, next"
              style="margin-top: 10px;" />
        </div>
        <div class="detail-section collapsible">
          <div class="section-header" @click="toggleSection('family')">
            <h4>Family Members</h4>
            <svg class="collapse-icon" :class="{ 'collapsed': !expandedSections.family }" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="section-content" :class="{ 'collapsed': !expandedSections.family }">
            <div class="family-filter-row" style="display:flex;align-items:center;margin-bottom:12px;">
              <el-select v-if="showFamilySelect" v-model="selectedFamily" placeholder="筛选家庭成员" style="width: 180px;">
                <el-option v-for="item in familyListAll" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
              <svg @click.stop="toggleFamilySelect" style="margin-left: 10px; cursor: pointer; vertical-align: middle;" width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                <path d="M12 16c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" stroke="currentColor" stroke-width="2"/>
              </svg>
              <img v-if="!showFamilySelect && selectedFamilyAvatar" :src="selectedFamilyAvatar" alt="家庭成员头像" style="width:36px;height:36px;border-radius:8px;margin-left:10px;vertical-align:middle;" @click.stop="toggleFamilySelect" />
              <el-button size="small" style="margin-left:16px;" @click="showFamilyGraph = !showFamilyGraph">
                {{ showFamilyGraph ? '隐藏家庭关系图' : '显示家庭关系图' }}
              </el-button>
            </div>
            <RelationGraph v-if="showFamilyGraph" :data="familyGraphData" style="margin-bottom:16px;" />
            <el-table :data="familyList" border stripe class="family-table">
              <el-table-column label="Avatar">
                <template #default="scope">
                  <img :src="scope.row.avatar" style="width:36px;height:36px;border-radius:50%;object-fit:cover;" />
                </template>
              </el-table-column>
              <el-table-column prop="id" label="ID">
                <template #default="scope">
                  <span style="color:#409eff;cursor:pointer;" @click="addSelectedId(scope.row.id, $event)">{{scope.row.id}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="Name">
                <template #default="scope">
                  <span style="color:#409eff;cursor:pointer;" @click="addSelectedId(scope.row.id, $event)">{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="relation" label="Relation" />
              <el-table-column prop="age" label="Age" />
              <el-table-column prop="nationality" label="Nationality" />
              <el-table-column prop="phone" label="Phone" />
              <el-table-column prop="remark" label="Remark" />
            </el-table>
            <el-pagination
              v-model:current-page="familyPage"
              :page-size="familyPageSize"
              :total="familyListAll.length"
              layout="total, prev, pager, next"
              style="margin-top: 10px;" />
          </div>
        </div>
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
        <div class="detail-section collapsible">
          <div class="section-header" @click="toggleSection('phone')">
            <h4>Phone Registration Information</h4>
            <svg class="collapse-icon" :class="{ 'collapsed': !expandedSections.phone }" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="section-content" :class="{ 'collapsed': !expandedSections.phone }">
            <el-table :data="phoneRegList" border stripe class="phone-table">
              <el-table-column label="Avatar">
                <template #default="scope">
                  <img :src="scope.row.avatar" style="width:36px;height:36px;border-radius:50%;object-fit:cover;" />
                </template>
              </el-table-column>
              <el-table-column prop="id" label="ID">
                <template #default="scope">
                  <span style="color:#409eff;cursor:pointer;" @click="addSelectedId(scope.row.id, $event)">{{scope.row.id}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="phone" label="Phone" />
              <el-table-column prop="regDate" label="Reg Date" />
              <el-table-column prop="operator" label="Operator" />
              <el-table-column prop="status" label="Status" />
              <el-table-column prop="remark" label="Remark" />
            </el-table>
            <el-pagination
              v-model:current-page="phonePage"
              :page-size="phonePageSize"
              :total="phoneRegListAll.length"
              layout="total, prev, pager, next"
              style="margin-top: 10px;" />
          </div>
        </div>
        <div class="detail-section collapsible">
          <div class="section-header" @click="toggleSection('broadband')">
            <h4>Broadband Registration Information</h4>
            <svg class="collapse-icon" :class="{ 'collapsed': !expandedSections.broadband }" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="section-content" :class="{ 'collapsed': !expandedSections.broadband }">
            <el-table :data="broadbandRegList" border stripe class="broadband-table">
              <el-table-column prop="account" label="Account" />
              <el-table-column prop="regDate" label="Reg Date" />
              <el-table-column prop="address" label="Address" />
              <el-table-column prop="operator" label="Operator" />
              <el-table-column prop="status" label="Status" />
              <el-table-column prop="remark" label="Remark" />
            </el-table>
            <el-pagination
              v-model:current-page="broadbandPage"
              :page-size="broadbandPageSize"
              :total="broadbandRegListAll.length"
              layout="total, prev, pager, next"
              style="margin-top: 10px;" />
          </div>
        </div>
        <div class="detail-section collapsible">
          <div class="section-header" @click="toggleSection('vehicle')">
            <h4>Vehicle Registration Information</h4>
            <svg class="collapse-icon" :class="{ 'collapsed': !expandedSections.vehicle }" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="section-content" :class="{ 'collapsed': !expandedSections.vehicle }">
            <el-table :data="vehicleList" border stripe class="vehicle-table">
              <el-table-column prop="plate" label="Plate" />
              <el-table-column prop="type" label="Type" />
              <el-table-column prop="regDate" label="Reg Date" />
              <el-table-column prop="owner" label="Owner" />
              <el-table-column prop="status" label="Status" />
              <el-table-column prop="remark" label="Remark" />
            </el-table>
            <el-pagination
              v-model:current-page="vehiclePage"
              :page-size="vehiclePageSize"
              :total="vehicleListAll.length"
              layout="total, prev, pager, next"
              style="margin-top: 10px;" />
          </div>
        </div>
      </div>
    </ContentWaveBackground>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, reactive, nextTick, watch } from 'vue'
import ContentWaveBackground from '../components/ContentWaveBackground.vue'
import { currentTheme, toggleTheme } from '@/utils/themeManager'
import { flyToTarget } from '@/utils/flyToTarget'
import '@/style/common-fly-effect.css'
import { validateCurrentSession } from '@/utils/sessionValidator'
import RelationGraph from '@/components/RelationGraph.vue'
import InvestmentsTable from '@/components/user-detail/InvestmentsTable.vue'

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
    phone: [
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
    phone: [
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
    if (u.family && u.family.some(f => f.id === id)) return u.family.find(f => f.id === id)?.avatar
    if (u.identity && u.identity.some(f => f.id === id)) return u.identity.find(f => f.id === id)?.avatar
    if (u.phone && u.phone.some(f => f.id === id)) return u.phone.find(f => f.id === id)?.avatar
  }
  return 'https://via.placeholder.com/40x40?text=ID'
}

// 身份变更信息分页
const identityChangeListAll = computed(() => currentUser.value.identity)
const identityPage = ref(1)
const identityPageSize = 3
const identityChangeList = computed(() => identityChangeListAll.value.slice((identityPage.value-1)*identityPageSize, identityPage.value*identityPageSize))

// 家庭成员分页
const familyListAll = computed(() => currentUser.value.family)
const familyPage = ref(1)
const familyPageSize = 3
const familyList = computed(() => familyListAll.value.slice((familyPage.value-1)*familyPageSize, familyPage.value*familyPageSize))



// 手机号注册信息分页
const phoneRegListAll = computed(() => currentUser.value.phone)
const phonePage = ref(1)
const phonePageSize = 3
const phoneRegList = computed(() => phoneRegListAll.value.slice((phonePage.value-1)*phonePageSize, phonePage.value*phonePageSize))

// 固网注册信息分页
const broadbandRegListAll = computed(() => currentUser.value.broadband || [])
const broadbandPage = ref(1)
const broadbandPageSize = 3
const broadbandRegList = computed(() => broadbandRegListAll.value.slice((broadbandPage.value-1)*broadbandPageSize, broadbandPage.value*broadbandPageSize))

// 车辆登记信息分页
const vehicleListAll = computed(() => currentUser.value.vehicle || [])
const vehiclePage = ref(1)
const vehiclePageSize = 3
const vehicleList = computed(() => vehicleListAll.value.slice((vehiclePage.value-1)*vehiclePageSize, vehiclePage.value*vehiclePageSize))



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

const mainAvatar = ref(currentUser.value.avatar)
watch(currentUser, (u) => { mainAvatar.value = u.avatar })

const familyFilter = ref('')
const showFamilyList = ref(true)
const showFamilyAvatar = ref(false)
const filteredFamilyList = computed(() => {
  if (!familyFilter.value) return familyList.value
  return familyList.value.filter(f => f.id === familyFilter.value)
})
const selectedFamilyMember = computed(() => {
  if (!familyFilter.value) return null
  return familyListAll.value.find(f => f.id === familyFilter.value)
})
function toggleFamilyList(e?: Event) {
  showFamilyList.value = !showFamilyList.value
  showFamilyAvatar.value = !showFamilyList.value
}

const showFamilySelect = ref(true)
const selectedFamily = ref<string | null>(null)
const selectedFamilyAvatar = computed(() => {
  if (!selectedFamily.value) return null
  const member = familyListAll.value.find(f => f.id === selectedFamily.value)
  return member ? member.avatar : null
})
function toggleFamilySelect() {
  showFamilySelect.value = !showFamilySelect.value
}

const showFamilyGraph = ref(false)
const familyGraphData = computed(() => {
  // 以当前用户为中心，家庭成员为节点
  const user = currentUser.value
  if (!user) return { nodes: [], links: [] }
  const nodes = [
    { id: user.id, text: user.name, x: 300, y: 200 }
  ]
  const links = []
  if (user.family && user.family.length) {
    user.family.forEach((f, idx) => {
      nodes.push({ id: f.id, text: f.name, x: 150 + idx*120, y: 400 })
      links.push({ from: user.id, to: f.id, text: f.relation })
    })
  }
  return { nodes, links }
})

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

/* Basic Information 新样式 */
.basic-info-section {
  padding: 2rem;
}

.basic-info-header {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  align-items: flex-start;
}

.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.main-avatar-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.main-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--accent-primary);
  box-shadow: 0 8px 32px rgba(59,130,246,0.15);
  background: var(--bg-primary);
}

.avatar-status {
  position: absolute;
  bottom: 8px;
  right: 8px;
}

.status-indicator {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 3px solid var(--bg-card);
  display: block;
}

.status-indicator.active {
  background: #22c55e;
}

.avatar-history {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.history-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.history-thumbs {
  display: flex;
  gap: 0.5rem;
}

.history-thumb {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.history-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.history-thumb.active,
.history-thumb:hover {
  border-color: var(--accent-primary);
  transform: scale(1.05);
}

.user-info-summary {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.user-name {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  line-height: 1.2;
}

.user-meta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
}

.user-id {
  background: var(--accent-secondary);
  color: var(--accent-primary);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}

.user-position,
.user-department {
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
}

.user-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-badge.active {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}

.status-text {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.info-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.info-card {
  background: var(--bg-primary);
  border-radius: 12px;
  border: 1px solid var(--border-card);
  overflow: hidden;
  transition: all 0.3s ease;
}

.info-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(59,130,246,0.1);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem;
  background: var(--bg-card);
  border-bottom: 1px solid var(--border-card);
}

.card-icon {
  color: var(--accent-primary);
}

.card-header h3 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
}

.card-content {
  padding: 1.25rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--border-primary);
}

.info-row:last-child {
  border-bottom: none;
}

.info-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.info-value {
  font-size: 0.875rem;
  color: var(--text-primary);
  font-weight: 600;
  text-align: right;
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .basic-info-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .user-meta {
    justify-content: center;
  }
  
  .info-cards {
    grid-template-columns: 1fr;
  }
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
.isp-detail-avatar-row {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}
.isp-detail-avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--accent-primary, #2563eb);
  background: #f3f4f6;
  box-shadow: 0 2px 8px rgba(59,130,246,0.10);
}
.isp-detail-avatar.main-avatar {
  width: 96px;
  height: 96px;
  border-radius: 12px;
  object-fit: cover;
  border: 3px solid var(--accent-primary, #2563eb);
  background: #f3f4f6;
  box-shadow: 0 2px 8px rgba(59,130,246,0.10);
}
.avatar-history-row {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 1.5rem;
}
.avatar-history-thumb {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid transparent;
  cursor: pointer;
  transition: border 0.2s;
}
.avatar-history-thumb.active,
.avatar-history-thumb:hover {
  border: 2px solid var(--accent-primary, #2563eb);
}
.avatar-history-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.status-tag {
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
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
.identity-change-table, .family-table, .investment-table, .phone-table, .broadband-table, .vehicle-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background: var(--bg-card, #fff);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(59,130,246,0.06);
}
.identity-change-table th, .identity-change-table td,
.family-table th, .family-table td,
.investment-table th, .investment-table td,
.phone-table th, .phone-table td,
.broadband-table th, .broadband-table td,
.vehicle-table th, .vehicle-table td {
  border: 1px solid var(--border-card, #e5e7eb);
  padding: 0.75rem 1.2rem;
  text-align: center;
  font-size: 0.95rem;
}
.identity-change-table th, .family-table th, .investment-table th, .phone-table th, .broadband-table th, .vehicle-table th {
  background: var(--bg-primary, #f9fafb);
  font-weight: 600;
  color: var(--text-primary, #222);
}
.identity-change-table td, .family-table td, .investment-table td, .phone-table td, .broadband-table td, .vehicle-table td {
  color: var(--text-primary, #222);
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
.basic-info-section {
  position: relative;
}
/* 移除 basic-info-header 相关样式，保持与其他 section 一致 */
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
.family-toggle-icon {
  color: var(--accent-primary);
  transition: color 0.2s;
}
.family-toggle-icon:hover {
  color: #1d4ed8;
}
.family-avatar-img {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(59,130,246,0.10);
  background: #f3f4f6;
  border: 2px solid var(--accent-primary, #2563eb);
}

/* 横向卡片风格样式 */
.horizontal-card {
  display: flex;
  align-items: flex-start;
  gap: 2.5rem;
  padding: 2rem 2.5rem;
  background: var(--bg-card);
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(59,130,246,0.08);
}
.avatar-block {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.main-avatar {
  width: 100px;
  height: 100px;
  border-radius: 16px;
  object-fit: cover;
  border: 3px solid var(--accent-primary);
  box-shadow: 0 2px 8px rgba(59,130,246,0.10);
  background: var(--bg-primary);
}
.info-block {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.info-header-row {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 0.5rem;
}
.user-name {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}
.user-id {
  background: var(--accent-secondary);
  color: var(--accent-primary);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.95rem;
  font-weight: 600;
}
.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}
.info-row-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem 2.5rem;
}
.info-row {
  min-width: 180px;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 1rem;
}
.info-label {
  color: var(--text-secondary);
  font-weight: 500;
  min-width: 90px;
}
.info-value {
  color: var(--text-primary);
  font-weight: 600;
}
@media (max-width: 900px) {
  .horizontal-card {
    flex-direction: column;
    align-items: flex-start;
    padding: 1.2rem 1rem;
    gap: 1.2rem;
  }
  .main-avatar {
    width: 80px;
    height: 80px;
    border-radius: 12px;
  }
  .info-row-group {
    gap: 0.7rem 1.2rem;
  }
}
.info-block-bordered {
  border: 1.5px solid var(--border-card);
  border-radius: 14px;
  background: var(--bg-primary);
  padding: 2rem 2rem 1.5rem 2rem;
  box-shadow: 0 2px 8px rgba(59,130,246,0.06);
}
@media (max-width: 900px) {
  .info-block-bordered {
    padding: 1.2rem 1rem 1rem 1rem;
  }
}

/* info-block 分组美化 */
.info-section-group {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.info-section-card {
  background: var(--bg-card);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(59,130,246,0.06);
  padding: 1.2rem 1.5rem 1rem 1.5rem;
  border: 1px solid var(--border-card);
}
.info-section-title {
  font-size: 1.08rem;
  font-weight: 600;
  color: var(--accent-primary);
  margin-bottom: 0.7rem;
  letter-spacing: 0.5px;
}
.info-section-card .info-row {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 1rem;
  margin-bottom: 0.3rem;
}
.info-section-card .info-label {
  color: var(--text-secondary);
  font-weight: 500;
  min-width: 110px;
}
.info-section-card .info-value {
  color: var(--text-primary);
  font-weight: 600;
}
@media (max-width: 900px) {
  .info-section-card {
    padding: 1rem 0.7rem 0.7rem 0.7rem;
  }
  .info-section-title {
    font-size: 1rem;
  }
}

/* 单列信息列表样式 */
.single-col-info .info-block {
  padding-top: 0.5rem;
}
.single-info-list {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin-top: 0.5rem;
}
.single-info-row {
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border-primary);
  padding: 0.65rem 0;
  font-size: 1rem;
}
.single-info-row:last-child {
  border-bottom: none;
}
.single-info-label {
  min-width: 120px;
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 0.98rem;
}
.single-info-value {
  color: var(--text-primary);
  font-weight: 600;
  font-size: 1rem;
  word-break: break-all;
}
@media (max-width: 900px) {
  .single-col-info.horizontal-card {
    flex-direction: column;
    align-items: flex-start;
    padding: 1.2rem 1rem;
    gap: 1.2rem;
  }
  .single-info-label {
    min-width: 90px;
  }
}

/* 多列信息列表样式 */
.multi-col-info-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(180px, 1fr));
  gap: 0.5rem 2.5rem;
  margin-top: 0.5rem;
}
.multi-col-info-row {
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--border-primary);
  padding: 0.65rem 0;
  font-size: 1rem;
}
.multi-col-info-label {
  min-width: 90px;
  color: var(--text-secondary);
  font-weight: 500;
  font-size: 0.98rem;
  margin-right: 0.5rem;
}
.multi-col-info-value {
  color: var(--text-primary);
  font-weight: 600;
  font-size: 1rem;
  word-break: break-all;
}
@media (max-width: 900px) {
  .multi-col-info-list {
    grid-template-columns: 1fr;
    gap: 0.5rem 0;
  }
  .multi-col-info-label {
    min-width: 80px;
  }
}

/* el-descriptions 样式微调 */
</style> 