<template>
  <nav class="navigation-bar" :class="{ 'nav-hidden': isNavHidden }">
    <div class="nav-container">
      <!-- Logo区域 -->
      <router-link :to="{ path: '/dashboard', query: { sessionId: currentSessionId } }" class="nav-logo">
        <div class="logo-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="logo-text">Basic Database</span>
      </router-link>

      <!-- 导航菜单 -->
      <div class="nav-menu">
        <router-link :to="{ path: '/dashboard', query: { sessionId: currentSessionId } }" class="nav-item" :class="{ active: $route.path === '/dashboard' }">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Dashboard</span>
        </router-link>
        
        <router-link :to="{ path: '/personal-database', query: { sessionId: currentSessionId } }" class="nav-item" :class="{ active: $route.path === '/personal-database' }">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Personal Database</span>
        </router-link>
        
        <router-link :to="{ path: '/vehicle-database', query: { sessionId: currentSessionId } }" class="nav-item" :class="{ active: $route.path === '/vehicle-database' }">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M7 17L3 21L7 17ZM3 21V11C3 10.4696 3.21071 9.96086 3.58579 9.58579C3.96086 9.21071 4.46957 9 5 9H11L21 19V21C21 21.5304 20.7893 22.0391 20.4142 22.4142C20.0391 22.7893 19.5304 23 19 23H5C4.46957 23 3.96086 22.7893 3.58579 22.4142C3.21071 22.0391 3 21.5304 3 21V21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16 3H21V8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4 15L9 20L20 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Vehicle Database</span>
        </router-link>
        
        <router-link :to="{ path: '/isp-database', query: { sessionId: currentSessionId } }" class="nav-item" :class="{ active: $route.path === '/isp-database' }">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>ISP Database</span>
        </router-link>
        
        <router-link :to="{ path: '/analytics', query: { sessionId: currentSessionId } }" class="nav-item" :class="{ active: $route.path === '/analytics' }">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M9 11H1L9 3V11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M20.2 5.8L16 10L20.2 14.2L16 18.4L20.2 22.6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4 19H12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Analytics</span>
        </router-link>
        
        <router-link :to="{ path: '/settings', query: { sessionId: currentSessionId } }" class="nav-item" :class="{ active: $route.path === '/settings' }">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 16V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 8H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Settings</span>
        </router-link>
      </div>

      <!-- 用户区域 -->
      <div class="nav-user" @click="toggleUserMenu" ref="userMenuTrigger">
        <div class="user-avatar">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M20 21C20 16.5817 16.4183 13 12 13C7.58172 13 4 16.5817 4 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="user-info">
          <span class="user-name">Admin User</span>
          <span class="user-role">Administrator</span>
        </div>
        <button class="user-menu-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" :class="{ 'rotated': isUserMenuOpen }">
            <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        
        <!-- 用户下拉菜单 -->
        <div v-if="isUserMenuOpen" class="user-dropdown-menu">
          <div class="dropdown-header">
            <div class="dropdown-user-info">
              <div class="dropdown-avatar">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M20 21C20 16.5817 16.4183 13 12 13C7.58172 13 4 16.5817 4 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="dropdown-user-details">
                <span class="dropdown-user-name">Admin User</span>
                <span class="dropdown-user-email">admin@company.com</span>
              </div>
            </div>
          </div>
          
          <div class="dropdown-divider"></div>
          
          <div class="dropdown-menu-items">
            <button class="dropdown-item" @click="handleAboutAccount">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 16V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12 8H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>About Account</span>
            </button>
            
            <button class="dropdown-item" @click="toggleTheme">
              <!-- 太阳图标 (亮色模式) -->
              <svg v-if="currentTheme === 'light'" width="16" height="16" viewBox="0 0 24 24" fill="none">
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
              <!-- 月亮图标 (暗色模式) -->
              <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>{{ currentTheme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode' }}</span>
            </button>
            
            <button class="dropdown-item" @click="toggleAnimation">
              <!-- 波浪图标 (动画暂停时) -->
              <svg v-if="isAnimationPaused" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M2 12C2 12 4 8 8 8C12 8 14 12 18 12C22 12 24 8 24 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 16C2 16 4 12 8 12C12 12 14 16 18 16C22 16 24 12 24 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="12" cy="12" r="2" fill="currentColor"/>
              </svg>
              <!-- 暂停波浪图标 (动画播放时) -->
              <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M2 12C2 12 4 8 8 8C12 8 14 12 18 12C22 12 24 8 24 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 16C2 16 4 12 8 12C12 12 14 16 18 16C22 16 24 12 24 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="8" y1="6" x2="8" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <line x1="16" y1="6" x2="16" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <span>{{ isAnimationPaused ? 'Resume Background Animation' : 'Pause Background Animation' }}</span>
            </button>
            
            <button class="dropdown-item" @click="toggleNavVisibility">
              <svg v-if="!isNavHidden" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M3 12H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M3 6H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>{{ isNavHidden ? 'Show Navigation' : 'Hide Navigation' }}</span>
            </button>
            
            <button class="dropdown-item" @click="handleLogout">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16 17L21 12L16 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M21 12H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
  
  <!-- 悬浮标 -->
  <div v-if="isNavHidden" class="floating-nav-trigger" @click="toggleFloatingMenu" ref="floatingMenuTrigger">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3 12H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3 6H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    
    <!-- 悬浮下拉菜单 -->
    <div v-if="isFloatingMenuOpen" class="floating-dropdown-menu">
      <div class="floating-dropdown-header">
        <div class="floating-dropdown-user-info">
          <div class="floating-dropdown-avatar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M20 21C20 16.5817 16.4183 13 12 13C7.58172 13 4 16.5817 4 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="floating-dropdown-user-details">
            <span class="floating-dropdown-user-name">Admin User</span>
            <span class="floating-dropdown-user-role">Administrator</span>
          </div>
        </div>
      </div>
      
      <div class="floating-dropdown-divider"></div>
      
      <div class="floating-dropdown-menu-items">
        <button class="floating-dropdown-item" @click="toggleNavVisibility">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M3 12H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3 6H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Show Navigation</span>
        </button>
        
        <button class="floating-dropdown-item" @click="toggleTheme">
          <!-- 太阳图标 (亮色模式) -->
          <svg v-if="currentTheme === 'light'" width="16" height="16" viewBox="0 0 24 24" fill="none">
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
          <!-- 月亮图标 (暗色模式) -->
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>{{ currentTheme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode' }}</span>
        </button>
        
        <button class="floating-dropdown-item" @click="toggleAnimation">
          <!-- 波浪图标 (动画暂停时) -->
          <svg v-if="isAnimationPaused" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M2 12C2 12 4 8 8 8C12 8 14 12 18 12C22 12 24 8 24 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 16C2 16 4 12 8 12C12 12 14 16 18 16C22 16 24 12 24 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="12" cy="12" r="2" fill="currentColor"/>
          </svg>
          <!-- 暂停波浪图标 (动画播放时) -->
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M2 12C2 12 4 8 8 8C12 8 14 12 18 12C22 12 24 8 24 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 16C2 16 4 12 8 12C12 12 14 16 18 16C22 16 24 12 24 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="8" y1="6" x2="8" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <line x1="16" y1="6" x2="16" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <span>{{ isAnimationPaused ? 'Resume Background Animation' : 'Pause Background Animation' }}</span>
        </button>
      </div>
    </div>
  </div>
  
  <!-- 关于账户弹窗 -->
  <el-dialog
    v-model="showAboutDialog"
    title="Account Information"
    width="400px"
    :show-close="true"
    :close-on-click-modal="true"
    :close-on-press-escape="true"
    class="about-account-dialog"
  >
    <div class="account-info">
      <div class="account-avatar">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M20 21C20 16.5817 16.4183 13 12 13C7.58172 13 4 16.5817 4 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      
      <div class="account-details">
        <div class="account-field">
          <label>User ID:</label>
          <span>ADMIN-001</span>
        </div>
        <div class="account-field">
          <label>Username:</label>
          <span>Admin User</span>
        </div>
        <div class="account-field">
          <label>Email:</label>
          <span>admin@company.com</span>
        </div>
        <div class="account-field">
          <label>Role:</label>
          <span>Administrator</span>
        </div>
        <div class="account-field">
          <label>Status:</label>
          <span class="status-active">Active</span>
        </div>
      </div>
    </div>
    
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="showAboutDialog = false">Close</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { getSessionIdFromUrl } from '@/utils/sessionValidator'
import { currentTheme, toggleTheme } from '@/utils/themeManager'
import { isAnimationPaused, toggleAnimation } from '@/utils/animationManager'

const router = useRouter()

// 当前session ID
const currentSessionId = ref<string | null>(null)

// 导航栏隐藏状态
const isNavHidden = ref(false)

// 用户菜单状态
const isUserMenuOpen = ref(false)
const userMenuTrigger = ref<HTMLElement>()

// 悬浮菜单状态
const isFloatingMenuOpen = ref(false)
const floatingMenuTrigger = ref<HTMLElement>()

// 关于账户弹窗状态
const showAboutDialog = ref(false)

// 切换导航栏可见性
const toggleNavVisibility = () => {
  isNavHidden.value = !isNavHidden.value
  // 保存状态到localStorage
  localStorage.setItem('navHidden', isNavHidden.value.toString())
}

// 切换用户菜单
const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value
}

// 切换悬浮菜单
const toggleFloatingMenu = () => {
  isFloatingMenuOpen.value = !isFloatingMenuOpen.value
}

// 处理关于账户
const handleAboutAccount = () => {
  console.log('关于账户被点击')
  showAboutDialog.value = true
}

// 处理登出
const handleLogout = () => {
  console.log('登出被点击')
  
  // 清除登录状态
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('sessionId')
  localStorage.removeItem('username')
  localStorage.removeItem('rememberMe')
  
  // 关闭用户菜单
  isUserMenuOpen.value = false
  
  // 跳转到登录页面
  router.push('/login')
}

// 点击外部关闭菜单
const handleClickOutside = (event: Event) => {
  if (userMenuTrigger.value && !userMenuTrigger.value.contains(event.target as Node)) {
    isUserMenuOpen.value = false
  }
  if (floatingMenuTrigger.value && !floatingMenuTrigger.value.contains(event.target as Node)) {
    isFloatingMenuOpen.value = false
  }
}

// 组件挂载时获取session ID和添加事件监听
onMounted(() => {
  currentSessionId.value = getSessionIdFromUrl()
  document.addEventListener('click', handleClickOutside)
  
  // 从localStorage恢复导航栏状态
  const savedNavHidden = localStorage.getItem('navHidden')
  if (savedNavHidden) {
    isNavHidden.value = savedNavHidden === 'true'
  }
})

// 组件卸载时移除事件监听
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.navigation-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: var(--bg-secondary);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border-primary);
  box-shadow: 0 2px 20px var(--shadow-primary);
  transition: transform 0.3s ease-in-out;
}

.nav-hidden {
  transform: translateY(-100%);
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Logo区域 */
.nav-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
  border-radius: 8px;
  padding: 0.25rem;
}

.nav-logo:hover {
  background: rgba(59, 130, 246, 0.05);
  transform: translateY(-1px);
}

.logo-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.025em;
}

/* 导航菜单 */
.nav-menu {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  position: relative;
}

.nav-item:hover {
  color: var(--accent-primary);
  background: var(--accent-secondary);
}

.nav-item.active {
  color: var(--accent-primary);
  background: var(--accent-secondary);
}

.nav-item svg {
  flex-shrink: 0;
}

/* 悬浮标 */
.floating-nav-trigger {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 48px;
  height: 48px;
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-card);
  border-radius: 50%;
  box-shadow: var(--shadow-dialog);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100000;
  transition: all 0.3s ease;
  color: var(--text-primary);
}

.floating-nav-trigger:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 32px var(--shadow-primary);
  background: var(--accent-secondary);
  color: var(--accent-primary);
}

.floating-nav-trigger svg {
  transition: all 0.3s ease;
}

.floating-nav-trigger:hover svg {
  transform: scale(1.1);
}

/* 用户区域 */
.nav-user {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  position: relative; /* 添加相对定位 */
  cursor: pointer;
}

.nav-user:hover {
  background: var(--border-secondary);
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(59, 130, 246, 0.2);
  background: rgba(59, 130, 246, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b82f6;
}

.user-avatar svg {
  width: 20px;
  height: 20px;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.user-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.2;
}

.user-role {
  font-size: 0.75rem;
  color: var(--text-secondary);
  line-height: 1.2;
}

.user-menu-btn {
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.user-menu-btn:hover {
  color: var(--accent-primary);
  background: var(--accent-secondary);
}

.user-menu-btn svg {
  transition: transform 0.2s ease;
}

.user-menu-btn svg.rotated {
  transform: rotate(180deg);
}

/* 用户下拉菜单 */
.user-dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-card);
  border-radius: 12px;
  box-shadow: var(--shadow-dialog);
  z-index: 100000;
  min-width: 220px;
  transform-origin: top right;
  animation: dropdownFadeIn 0.2s ease-out;
}

@keyframes dropdownFadeIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.dropdown-header {
  padding: 1rem;
  border-bottom: 1px solid var(--border-secondary);
}

.dropdown-user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.dropdown-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(59, 130, 246, 0.2);
  background: rgba(59, 130, 246, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b82f6;
}

.dropdown-user-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.dropdown-user-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.2;
}

.dropdown-user-email {
  font-size: 0.75rem;
  color: var(--text-secondary);
  line-height: 1.2;
}

.dropdown-divider {
  height: 1px;
  background-color: var(--border-secondary);
  margin: 0;
}

.dropdown-menu-items {
  padding: 0.5rem;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  width: 100%;
  color: var(--text-primary);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  background: transparent;
  text-align: left;
}

.dropdown-item:hover {
  background: var(--accent-secondary);
  color: var(--accent-primary);
}

.dropdown-item svg {
  flex-shrink: 0;
  color: var(--text-secondary);
  transition: color 0.2s ease;
}

.dropdown-item:hover svg {
  color: var(--accent-primary);
}

/* 悬浮下拉菜单 */
.floating-dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-card);
  border-radius: 12px;
  box-shadow: var(--shadow-dialog);
  z-index: 100000;
  min-width: 220px;
  transform-origin: top right;
  animation: dropdownFadeIn 0.2s ease-out;
}

@keyframes dropdownFadeIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.floating-dropdown-header {
  padding: 1rem;
  border-bottom: 1px solid var(--border-secondary);
}

.floating-dropdown-user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.floating-dropdown-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(59, 130, 246, 0.2);
  background: rgba(59, 130, 246, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b82f6;
}

.floating-dropdown-user-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.floating-dropdown-user-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.2;
}

.floating-dropdown-user-role {
  font-size: 0.75rem;
  color: var(--text-secondary);
  line-height: 1.2;
}

.floating-dropdown-divider {
  height: 1px;
  background-color: var(--border-secondary);
  margin: 0;
}

.floating-dropdown-menu-items {
  padding: 0.5rem;
}

.floating-dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  width: 100%;
  color: var(--text-primary);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  background: transparent;
  text-align: left;
}

.floating-dropdown-item:hover {
  background: var(--accent-secondary);
  color: var(--accent-primary);
}

.floating-dropdown-item svg {
  flex-shrink: 0;
  color: var(--text-secondary);
  transition: color 0.2s ease;
}

.floating-dropdown-item:hover svg {
  color: var(--accent-primary);
}

/* 关于账户弹窗样式 */
.about-account-dialog {
  backdrop-filter: blur(20px);
}

.account-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem 0;
}

.account-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(59, 130, 246, 0.2);
  background: rgba(59, 130, 246, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b82f6;
}

.account-details {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.account-field {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--border-secondary);
}

.account-field:last-child {
  border-bottom: none;
}

.account-field label {
  font-weight: 600;
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.account-field span {
  color: var(--text-primary);
  font-weight: 500;
  font-size: 0.875rem;
}

.status-active {
  color: #10b981 !important;
  font-weight: 600 !important;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-container {
    padding: 0 0.75rem;
  }
  
  .nav-menu {
    gap: 0.25rem;
  }
  
  .nav-item {
    padding: 0.5rem 0.75rem;
    font-size: 0.8rem;
  }
  
  .nav-item span {
    display: none;
  }
  
  .user-info {
    display: none;
  }
  
  .floating-nav-trigger {
    width: 44px;
    height: 44px;
    top: 16px;
    right: 16px;
  }
  
  .floating-dropdown-menu {
    min-width: 200px;
  }
  
  .floating-dropdown-item {
    padding: 0.625rem;
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .nav-container {
    padding: 0 0.5rem;
  }
  
  .logo-text {
    display: none;
  }
  
  .nav-menu {
    gap: 0.125rem;
  }
  
  .nav-item {
    padding: 0.5rem;
  }
  
  .floating-nav-trigger {
    width: 40px;
    height: 40px;
    top: 12px;
    right: 12px;
  }
  
  .floating-dropdown-menu {
    min-width: 180px;
  }
  
  .floating-dropdown-item {
    padding: 0.5rem;
    font-size: 0.75rem;
  }
  
  .floating-dropdown-header {
    padding: 0.75rem;
  }
  
  .floating-dropdown-avatar {
    width: 32px;
    height: 32px;
  }
  
  .floating-dropdown-user-name {
    font-size: 0.8rem;
  }
  
  .floating-dropdown-user-role {
    font-size: 0.7rem;
  }
}
</style> 