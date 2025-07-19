<template>
  <div class="app-container">
    <!-- 导航栏 -->
    <NavigationBar />
    
    <!-- 波浪背景和内容 -->
    <WaveBackground>
      <div class="wave-demo-container">
        
        <!-- 页面标题 -->
        <div class="page-header">
          <h1>Personal Database</h1>
          <p>Search and view personal information and records</p>
        </div>
        
        <!-- 搜索和过滤区域 -->
        <div class="search-section">
          <div class="search-box">
            <input 
              type="text" 
              placeholder="Search by name, ID, position, or phone..."
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
              v-model="selectedNationality" 
              placeholder="All Nationalities"
              clearable
              style="width: 200px;"
            >
              <el-option label="All Nationalities" value="" />
              <el-option label="American" value="American" />
              <el-option label="Canadian" value="Canadian" />
              <el-option label="British" value="British" />
              <el-option label="German" value="German" />
              <el-option label="French" value="French" />
              <el-option label="Italian" value="Italian" />
              <el-option label="Spanish" value="Spanish" />
            </el-select>
            
            <el-select 
              v-model="selectedPosition" 
              placeholder="All Positions"
              clearable
              style="width: 200px;"
            >
              <el-option label="All Positions" value="" />
              <el-option label="Software Engineer" value="Software Engineer" />
              <el-option label="UI/UX Designer" value="UI/UX Designer" />
              <el-option label="Product Manager" value="Product Manager" />
              <el-option label="Data Scientist" value="Data Scientist" />
              <el-option label="DevOps Engineer" value="DevOps Engineer" />
              <el-option label="Frontend Developer" value="Frontend Developer" />
              <el-option label="Backend Developer" value="Backend Developer" />
            </el-select>
            
            <el-select 
              v-model="selectedGender" 
              placeholder="All Genders"
              clearable
              style="width: 150px;"
            >
              <el-option label="All Genders" value="" />
              <el-option label="Male" value="Male" />
              <el-option label="Female" value="Female" />
            </el-select>
            
            <el-select 
              v-model="selectedAgeRange" 
              placeholder="All Ages"
              clearable
              style="width: 150px;"
            >
              <el-option label="All Ages" value="" />
              <el-option label="22-30" value="22-30" />
              <el-option label="31-35" value="31-35" />
              <el-option label="36-40" value="36-40" />
              <el-option label="41-46" value="41-46" />
            </el-select>
          </div>
        </div>
        
        <!-- 卡片网格 -->
        <div class="cards-grid">
          <div 
            v-for="(user, index) in paginatedUsers" 
            :key="user.id"
            class="data-card"
            @click="showUserDetail(user)"
          >
            <div class="card-header">
              <div class="avatar">
                <img :src="user.avatar" :alt="user.name" />
              </div>
            </div>
            
            <div class="user-info-section">
              <h2>{{ user.name }}</h2>
              <p class="position">{{ user.position }}</p>
              <p class="email">{{ user.email }}</p>
            </div>
            
            <div class="card-body">
              <div class="info-row">
                <span class="label">ID:</span>
                <span class="value">{{ user.id }}</span>
              </div>
              <div class="info-row">
                <span class="label">Name:</span>
                <span class="value">{{ user.name }}</span>
              </div>
              <div class="info-row">
                <span class="label">Phone:</span>
                <span class="value">{{ user.phone }}</span>
              </div>
              <div class="info-row">
                <span class="label">Gender:</span>
                <span class="value">{{ user.gender }}</span>
              </div>
              <div class="info-row">
                <span class="label">Age:</span>
                <span class="value">{{ user.age }}</span>
              </div>
              <div class="info-row">
                <span class="label">Nationality:</span>
                <span class="value">{{ user.nationality }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 用户详情对话框 -->
        <UserDetailDialog
          v-model="dialogVisible"
          :user="selectedUser"
        />
        
        <!-- Element UI 分页 -->
        <div class="pagination-section">
          <el-pagination
            v-model:current-page="currentPage"
            :page-size="itemsPerPage"
            :total="filteredUsers.length"
            layout="total, prev, pager, next, jumper"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </WaveBackground>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import WaveBackground from '../components/WaveBackground.vue'
import NavigationBar from '../components/NavigationBar.vue'
import UserDetailDialog from '../components/UserDetailDialog.vue'

// 生成50个用户数据
const generateUsers = () => {
  const names = [
    'John Smith', 'Sarah Johnson', 'Michael Chen', 'Emily Rodriguez',
    'David Kim', 'Lisa Wang', 'Alex Thompson', 'Maria Garcia',
    'James Wilson', 'Jennifer Lee', 'Robert Brown', 'Amanda Davis',
    'Christopher Miller', 'Jessica Taylor', 'Daniel Anderson', 'Ashley White',
    'Matthew Jackson', 'Nicole Martinez', 'Joshua Garcia', 'Stephanie Rodriguez',
    'Andrew Lopez', 'Rachel Gonzalez', 'Kevin Perez', 'Lauren Torres',
    'Brian Moore', 'Megan Lewis', 'Ryan Clark', 'Katherine Hall',
    'Steven Young', 'Victoria Allen', 'Timothy King', 'Samantha Wright',
    'Jeffrey Green', 'Hannah Scott', 'Gary Baker', 'Olivia Adams',
    'Ronald Nelson', 'Isabella Carter', 'Edward Mitchell', 'Sophia Roberts',
    'Kenneth Turner', 'Ava Phillips', 'Donald Campbell', 'Mia Parker',
    'Paul Evans', 'Chloe Edwards', 'Mark Collins', 'Grace Stewart',
    'George Morris', 'Zoe Rogers'
  ]
  
  const positions = [
    'Software Engineer', 'UI/UX Designer', 'Product Manager', 'Data Scientist',
    'DevOps Engineer', 'Frontend Developer', 'Backend Developer', 'QA Engineer',
    'System Administrator', 'Network Engineer', 'Security Analyst', 'Business Analyst',
    'Project Manager', 'Technical Lead', 'Architect', 'Database Administrator'
  ]
  
  const nationalities = [
    'American', 'Canadian', 'British', 'Australian', 'German', 'French',
    'Italian', 'Spanish', 'Dutch', 'Swedish', 'Norwegian', 'Danish',
    'Swiss', 'Austrian', 'Belgian', 'Irish', 'Scottish', 'Welsh'
  ]
  
  const genders = ['Male', 'Female']
  
  const avatars = [
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face'
  ]
  
  const users = []
  
  for (let i = 0; i < 50; i++) {
    const age = Math.floor(Math.random() * 25) + 22 // 22-46岁
    const phoneNumber = `+1 (555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`
    const mainAvatar = avatars[i % avatars.length]
    
    // 为每个用户生成多张照片（10多张）
    const userAvatars = [
      mainAvatar,
      avatars[(i + 1) % avatars.length],
      avatars[(i + 2) % avatars.length],
      avatars[(i + 3) % avatars.length],
      avatars[(i + 4) % avatars.length],
      avatars[(i + 5) % avatars.length],
      avatars[(i + 6) % avatars.length],
      avatars[(i + 7) % avatars.length],
      avatars[(i + 8) % avatars.length],
      avatars[(i + 9) % avatars.length],
      avatars[(i + 10) % avatars.length],
      avatars[(i + 11) % avatars.length],
      avatars[(i + 12) % avatars.length]
    ]
    
    users.push({
      id: `EMP-2024-${String(i + 1).padStart(3, '0')}`,
      name: names[i % names.length],
      position: positions[i % positions.length],
      email: `${names[i % names.length].toLowerCase().replace(' ', '.')}@company.com`,
      avatar: mainAvatar,
      avatars: userAvatars,
      nationality: nationalities[i % nationalities.length],
      gender: genders[i % genders.length],
      age: age,
      phone: phoneNumber
    })
  }
  
  return users
}

const allUsers = ref(generateUsers())

// 搜索和过滤状态
const searchQuery = ref('')
const selectedNationality = ref('')
const selectedPosition = ref('')
const selectedGender = ref('')
const selectedAgeRange = ref('')
const currentPage = ref(1)
const itemsPerPage = 12

// 对话框相关状态
const dialogVisible = ref(false)
const selectedUser = ref<any>(null)



// 过滤后的用户列表
const filteredUsers = computed(() => {
  let filtered = allUsers.value
  
  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(user => 
      user.name.toLowerCase().includes(query) ||
      user.id.toLowerCase().includes(query) ||
      user.position.toLowerCase().includes(query) ||
      user.phone.includes(query)
    )
  }
  
  // 国籍过滤
  if (selectedNationality.value) {
    filtered = filtered.filter(user => user.nationality === selectedNationality.value)
  }
  
  // 职位过滤
  if (selectedPosition.value) {
    filtered = filtered.filter(user => user.position === selectedPosition.value)
  }
  
  // 性别过滤
  if (selectedGender.value) {
    filtered = filtered.filter(user => user.gender === selectedGender.value)
  }
  
  // 年龄范围过滤
  if (selectedAgeRange.value) {
    const [minAge, maxAge] = selectedAgeRange.value.split('-').map(Number)
    filtered = filtered.filter(user => user.age >= minAge && user.age <= maxAge)
  }
  
  return filtered
})

// 分页后的用户列表
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredUsers.value.slice(start, end)
})

// 分页方法
const handleCurrentChange = (page: number) => {
  currentPage.value = page
}

// 显示用户详情
const showUserDetail = (user: any) => {
  selectedUser.value = user
  dialogVisible.value = true
}


</script>

<style scoped>
/* 用户信息区域 */
.user-info-section {
  text-align: center;
  margin-bottom: 1.5rem;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  border: 3px solid rgba(59, 130, 246, 0.3);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-info-section h2 {
  color: var(--text-primary);
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0 0 0.3rem 0;
}

.position {
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  margin: 0 0 0.2rem 0;
}

.email {
  color: var(--text-tertiary);
  font-size: 0.8rem;
  margin: 0;
}

/* 响应式设计 - 页面特有 */
@media (max-width: 480px) {
  .avatar {
    width: 70px;
    height: 70px;
  }
  
  .user-info-section h2 {
    font-size: 1.1rem;
  }
  
  .position {
    font-size: 0.8rem;
  }
  
  .email {
    font-size: 0.75rem;
  }
}
</style> 