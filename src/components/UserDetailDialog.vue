<template>
  <el-dialog
    v-model="dialogVisible"
    :title="currentUser ? currentUser.name + ' - Personal Information' : 'User Information'"
    width="90%"
    class="user-dialog super-z-dialog"
    draggable
    :fullscreen="isFullscreen"
    :before-close="handleClose"
    :modal="false"
    :append-to-body="true"
    :lock-scroll="false"
    top="5vh"
  >
    <template #header="{ close, titleId, titleClass }">
      <div class="dialog-header">
        <span :id="titleId" :class="titleClass">{{ currentUser ? currentUser.name + ' - Personal Information' : 'User Information' }}</span>
        <div class="dialog-controls">
          <el-button
            type="text"
            @click="isFullscreen = !isFullscreen"
            :title="isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'"
          >
            <svg v-if="!isFullscreen" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </el-button>
        </div>
      </div>
    </template>
    <div v-if="currentUser" class="user-detail-content">
      <!-- 用户切换标签页 -->
      <el-tabs v-model="activeTab" type="card" class="user-tabs">
        <el-tab-pane 
          v-for="user in userHistory" 
          :key="user.id" 
          :label="user.name" 
          :name="user.id"
        >
          <div class="tab-content">
            <!-- 基本信息 -->
            <BasicInfoSection :user="user" />
            
            <!-- 身份信息变更记录 -->
            <IdentityRecordsTable 
              :userId="user.id" 
              @showUserDetail="showUserDetail"
            />
            
            <!-- 手机号变更记录 -->
            <PhoneRecordsTable 
              :userId="user.id" 
              @showUserDetail="showUserDetail"
            />
            
            <!-- 车辆信息变更记录 -->
            <VehicleRecordsTable 
              :userId="user.id" 
              @showUserDetail="showUserDetail"
            />
            
            <!-- 家庭成员关系 -->
            <div class="family-section">
              <div class="section-header">
                <h3>Family Members</h3>
                <el-button
                  type="primary"
                  size="small"
                  @click="showFamilyGraph(user)"
                  class="family-graph-btn"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  Family Graph
                </el-button>
              </div>
              <FamilyMembersTable :userId="user.id" />
            </div>
            
            <!-- 投资信息 -->
            <InvestmentsTable :userId="user.id" />
            
            <!-- 社交媒体账号信息 -->
            <SocialMediaTable :userId="user.id" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    
    <!-- 家庭关系图谱对话框 -->
    <el-dialog
      v-model="showFamilyGraphDialog"
      title="Family Relationship Graph"
      width="90%"
      class="family-graph-dialog"
      draggable
      :modal="false"
      :append-to-body="true"
      :lock-scroll="false"
      top="5vh"
    >
      <div v-if="currentFamilyUser" class="family-graph-content">
        <RelationGraph
          :data="generateFamilyGraphData(currentFamilyUser)"
          title="Family Relationships"
          height="600px"
          @nodeClick="handleFamilyNodeClick"
          @linkClick="handleFamilyLinkClick"
        />
      </div>
    </el-dialog>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import BasicInfoSection from './user-detail/BasicInfoSection.vue'
import IdentityRecordsTable from './user-detail/IdentityRecordsTable.vue'
import PhoneRecordsTable from './user-detail/PhoneRecordsTable.vue'
import VehicleRecordsTable from './user-detail/VehicleRecordsTable.vue'
import FamilyMembersTable from './user-detail/FamilyMembersTable.vue'
import InvestmentsTable from './user-detail/InvestmentsTable.vue'
import SocialMediaTable from './user-detail/SocialMediaTable.vue'
import RelationGraph from './RelationGraph.vue'

interface User {
  id: string
  name: string
  position: string
  email: string
  phone: string
  gender: string
  age: number
  nationality: string
  avatar: string
  avatars: string[]
  birthDate: string
  idCardNumber: string
  emergencyContact: string
  emergencyPhone: string
  address: string
  department: string
  status: string
  hireDate: string
  workYears: number
  manager: string
  bloodType: string
  maritalStatus: string
  educationLevel: string
  skills: string
}

interface Props {
  modelValue: boolean
  user: User | null
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

// 用户历史记录和当前用户
const userHistory = ref<User[]>([])
const activeTab = ref('')

// 全屏状态
const isFullscreen = ref(false)

// 家庭关系图谱状态
const showFamilyGraphDialog = ref(false)
const currentFamilyUser = ref<User | null>(null)

// 处理关闭事件
const handleClose = (done: () => void) => {
  // 如果全屏，先退出全屏
  if (isFullscreen.value) {
    isFullscreen.value = false
  }
  done()
}

// 当前显示的用户
const currentUser = computed(() => {
  if (userHistory.value.length === 0) return null
  return userHistory.value.find(user => user.id === activeTab.value) || userHistory.value[0]
})

// 监听props.user变化，初始化用户历史
watch(() => props.user, (newUser) => {
  if (newUser) {
    // 如果用户历史中没有当前用户，则添加
    if (!userHistory.value.find(user => user.id === newUser.id)) {
      userHistory.value.push(newUser)
    }
    activeTab.value = newUser.id
  }
}, { immediate: true })

// 监听标签页切换，滚动到顶部
watch(activeTab, () => {
  nextTick(() => {
    const dialogContent = document.querySelector('.user-detail-content')
    if (dialogContent) {
      dialogContent.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  })
})

// 显示用户详情
const showUserDetail = (userName: string) => {
  // 根据用户名查找用户数据
  const user = findUserByName(userName)
  if (user) {
    // 如果用户历史中没有该用户，则添加
    if (!userHistory.value.find(u => u.id === user.id)) {
      userHistory.value.push(user)
    }
    activeTab.value = user.id
    
    // 滚动到顶部
    nextTick(() => {
      const dialogContent = document.querySelector('.user-detail-content')
      if (dialogContent) {
        dialogContent.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
    })
  }
}

// 显示家庭关系图谱
const showFamilyGraph = (user: User) => {
  currentFamilyUser.value = user
  showFamilyGraphDialog.value = true
}

// 生成家庭关系图谱数据
const generateFamilyGraphData = (user: User) => {
  const familyMembers = [
    { name: 'Lisa Johnson', relationship: 'Spouse', age: 26, occupation: 'Marketing Manager' },
    { name: 'Emma Johnson', relationship: 'Daughter', age: 8, occupation: 'Student' },
    { name: 'Robert Johnson', relationship: 'Father', age: 65, occupation: 'Retired' },
    { name: 'Mary Johnson', relationship: 'Mother', age: 62, occupation: 'Nurse' },
    { name: 'James Johnson', relationship: 'Brother', age: 30, occupation: 'Software Engineer' }
  ]
  
  const nodes = [
    // 主用户
    { id: 'main', text: user.name, x: 400, y: 200, data: { role: user.position, age: user.age } },
    // 家庭成员
    { id: 'spouse', text: 'Lisa Johnson', x: 600, y: 200, data: { role: 'Spouse', age: 26 } },
    { id: 'daughter', text: 'Emma Johnson', x: 500, y: 100, data: { role: 'Daughter', age: 8 } },
    { id: 'father', text: 'Robert Johnson', x: 200, y: 100, data: { role: 'Father', age: 65 } },
    { id: 'mother', text: 'Mary Johnson', x: 200, y: 300, data: { role: 'Mother', age: 62 } },
    { id: 'brother', text: 'James Johnson', x: 600, y: 300, data: { role: 'Brother', age: 30 } }
  ]
  
  const links = [
    { from: 'main', to: 'spouse', text: 'Spouse' },
    { from: 'main', to: 'daughter', text: 'Parent' },
    { from: 'spouse', to: 'daughter', text: 'Parent' },
    { from: 'father', to: 'main', text: 'Parent' },
    { from: 'mother', to: 'main', text: 'Parent' },
    { from: 'father', to: 'mother', text: 'Spouse' },
    { from: 'father', to: 'brother', text: 'Parent' },
    { from: 'mother', to: 'brother', text: 'Parent' },
    { from: 'main', to: 'brother', text: 'Sibling' }
  ]
  
  return { nodes, links }
}

// 处理家庭关系图谱节点点击
const handleFamilyNodeClick = (node: any) => {
  console.log('Family node clicked:', node)
}

// 处理家庭关系图谱链接点击
const handleFamilyLinkClick = (link: any) => {
  console.log('Family link clicked:', link)
}

// 根据用户名查找用户（模拟数据）
const findUserByName = (name: string): User | null => {
  const users = [
    {
      id: 'EMP-2024-001',
      name: 'Sarah Johnson',
      position: 'UI/UX Designer',
      email: 'sarah.johnson@company.com',
      phone: '+1 (555) 987-6543',
      gender: 'Female',
      age: 28,
      nationality: 'Canadian',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      avatars: [
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1524504388940-b57c6c6f2df5?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop&crop=face'
      ],
      birthDate: '1996-03-15',
      idCardNumber: 'CA123456789',
      emergencyContact: 'John Johnson',
      emergencyPhone: '+1 (555) 123-4567',
      address: '123 Maple Street, Toronto, ON M5V 2H1, Canada',
      department: 'Design',
      status: 'active',
      hireDate: '2022-01-15',
      workYears: 2,
      manager: 'Alex Thompson',
      bloodType: 'A+',
      maritalStatus: 'Single',
      educationLevel: 'Bachelor\'s Degree',
      skills: 'Figma, Adobe Creative Suite, User Research, Prototyping'
    },
    {
      id: 'EMP-2024-002',
      name: 'Michael Chen',
      position: 'Data Scientist',
      email: 'michael.chen@company.com',
      phone: '+1 (555) 234-5678',
      gender: 'Male',
      age: 32,
      nationality: 'American',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      avatars: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1524504388940-b57c6c6f2df5?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop&crop=face'
      ],
      birthDate: '1992-08-22',
      idCardNumber: 'US987654321',
      emergencyContact: 'Lisa Chen',
      emergencyPhone: '+1 (555) 234-5678',
      address: '456 Oak Avenue, San Francisco, CA 94102, USA',
      department: 'Data Science',
      status: 'active',
      hireDate: '2021-06-01',
      workYears: 3,
      manager: 'David Wilson',
      bloodType: 'O+',
      maritalStatus: 'Married',
      educationLevel: 'Master\'s Degree',
      skills: 'Python, R, Machine Learning, SQL, TensorFlow'
    },
    {
      id: 'EMP-2024-003',
      name: 'Emily Rodriguez',
      position: 'Product Manager',
      email: 'emily.rodriguez@company.com',
      phone: '+1 (555) 345-6789',
      gender: 'Female',
      age: 30,
      nationality: 'Spanish',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      avatars: [
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1524504388940-b57c6c6f2df5?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop&crop=face'
      ],
      birthDate: '1994-11-08',
      idCardNumber: 'ES456789123',
      emergencyContact: 'Carlos Rodriguez',
      emergencyPhone: '+1 (555) 345-6789',
      address: '789 Pine Lane, Madrid, Spain 28001',
      department: 'Product',
      status: 'active',
      hireDate: '2023-03-01',
      workYears: 1,
      manager: 'Sarah Johnson',
      bloodType: 'B+',
      maritalStatus: 'Single',
      educationLevel: 'Bachelor\'s Degree',
      skills: 'Product Strategy, User Research, Agile, Jira, Figma'
    },
    {
      id: 'EMP-2024-004',
      name: 'David Kim',
      position: 'DevOps Engineer',
      email: 'david.kim@company.com',
      phone: '+1 (555) 456-7890',
      gender: 'Male',
      age: 35,
      nationality: 'Korean',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      avatars: [
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1524504388940-b57c6c6f2df5?w=150&h=150&fit=crop&crop=face',
        'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop&crop=face'
      ],
      birthDate: '1989-05-12',
      idCardNumber: 'KR789123456',
      emergencyContact: 'Min Kim',
      emergencyPhone: '+1 (555) 456-7890',
      address: '101 Cedar Street, Seoul, South Korea 04521',
      department: 'Engineering',
      status: 'active',
      hireDate: '2020-09-15',
      workYears: 4,
      manager: 'Michael Chen',
      bloodType: 'AB+',
      maritalStatus: 'Married',
      educationLevel: 'Master\'s Degree',
      skills: 'Docker, Kubernetes, AWS, Jenkins, Terraform'
    }
  ]
  
  return users.find(user => user.name === name) || null
}
</script>

<style scoped>
/* 对话框样式 */
.user-dialog {
  max-width: 95vw;
  margin: 0 auto;
}

.user-dialog :deep(.el-dialog) {
  margin-top: 5vh !important;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.user-dialog :deep(.el-dialog__body) {
  flex: 1;
  overflow: hidden;
}

.user-dialog :deep(.el-dialog__wrapper) {
}

/* 全局样式已处理弹窗层级，这里只需要组件特定样式 */

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.dialog-controls {
  display: flex;
  gap: 0.5rem;
}

.dialog-controls .el-button {
  padding: 4px;
  color: var(--text-secondary);
  transition: color 0.2s ease;
}

.dialog-controls .el-button:hover {
  color: var(--accent-primary);
}

.user-detail-content {
  max-height: 75vh;
  overflow-y: auto;
  padding: 0 1rem;
}

.user-tabs {
  margin-bottom: 1rem;
}

.tab-content {
  padding: 1rem 0;
}

/* 家庭关系区域样式 */
.family-section {
  margin-bottom: 2rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.section-header h3 {
  margin: 0;
  color: var(--text-primary);
  font-size: 18px;
  font-weight: 600;
}

.family-graph-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.family-graph-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 家庭关系图谱对话框样式 */
.family-graph-dialog :deep(.el-dialog) {
  margin-top: 5vh !important;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.family-graph-dialog :deep(.el-dialog__body) {
  flex: 1;
  overflow: hidden;
  padding: 0;
}

.family-graph-dialog :deep(.el-dialog__wrapper) {
}

.family-graph-content {
  height: 100%;
  padding: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .user-detail-content {
    max-height: 65vh;
    padding: 0 0.5rem;
  }
  
  .user-dialog {
    max-width: 98vw;
  }
  
  .section-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
  
  .family-graph-btn {
    width: 100%;
    justify-content: center;
  }
}
</style> 