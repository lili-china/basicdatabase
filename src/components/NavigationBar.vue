<template>
  <nav class="navigation-bar" :class="{ 'nav-hidden': isNavHidden }">
    <div class="nav-container">
      <!-- Logo区域 -->
      <a @click="handleNavigation('/dashboard')" class="nav-logo">
        <div class="logo-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="logo-text">Basic Database</span>
      </a>

      <!-- 导航菜单 -->
      <div class="nav-menu" ref="navMenu">
        <a @click="handleNavigation('/dashboard')" class="nav-item" :class="{ active: $route.path === '/dashboard' }">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Dashboard</span>
        </a>

        <a @click="handleNavigation('/isp-database')" class="nav-item" :class="{ active: $route.path === '/isp-database' }">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>ISP </span>
        </a>
<!-- 
        <a @click="handleNavigation('/personal-database')" class="nav-item" :class="{ active: $route.path === '/personal-database' }">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Personal Database</span>
        </a>
        
        <a @click="handleNavigation('/vehicle-database')" class="nav-item" :class="{ active: $route.path === '/vehicle-database' }">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M7 17L3 21L7 17ZM3 21V11C3 10.4696 3.21071 9.96086 3.58579 9.58579C3.96086 9.21071 4.46957 9 5 9H11L21 19V21C21 21.5304 20.7893 22.0391 20.4142 22.4142C20.0391 22.7893 19.5304 23 19 23H5C4.46957 23 3.96086 22.7893 3.58579 22.4142C3.21071 22.0391 3 21.5304 3 21V21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16 3H21V8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M4 15L9 20L20 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Vehicle Database</span>
        </a>
        
        <!-- More下拉菜单 -->
        <!-- <div class="nav-more-dropdown" ref="moreDropdown">
          <button class="nav-more-btn" @click="toggleMoreMenu" :class="{ active: isMoreMenuOpen }">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="1" stroke="currentColor" stroke-width="2"/>
              <circle cx="19" cy="12" r="1" stroke="currentColor" stroke-width="2"/>
              <circle cx="5" cy="12" r="1" stroke="currentColor" stroke-width="2"/>
            </svg>
            <span>More</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" class="dropdown-arrow" :class="{ 'rotated': isMoreMenuOpen }">
              <path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button> 
          
          <div v-if="isMoreMenuOpen" class="more-dropdown-menu">
            <a 
              v-for="item in moreMenuItems" 
              :key="item.path"
              @click="handleMoreNavigation(item.path)"
              class="more-dropdown-item"
              :class="{ active: $route.path === item.path }"
            >
              <component :is="iconComponents[item.icon as keyof typeof iconComponents]" width="16" height="16" />
              <span>{{ item.label }}</span>
            </a>
          </div>
        </div> -->
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
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <!-- 暂停图标 (动画播放时) -->
              <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="6" y="4" width="4" height="16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <rect x="14" y="4" width="4" height="16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>{{ isAnimationPaused ? 'Resume Animation' : 'Pause Animation' }}</span>
            </button>
            
            <button class="dropdown-item" @click="toggleNavVisibility">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M3 12H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M3 6H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>{{ isNavHidden ? 'Show Navigation' : 'Hide Navigation' }}</span>
            </button>
          </div>
          
          <div class="dropdown-divider"></div>
          
          <button class="dropdown-item logout-item" @click="handleLogout">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <polyline points="16,17 21,12 16,7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  </nav>
  <Teleport to="body">
    <button
      v-if="isNavHidden"
      class="show-nav-btn"
      @click="isNavHidden = false"
      style="position:fixed;top:20px;right:20px;z-index:2147483646;width:48px;height:48px;background:#2563eb;border:none;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.12);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background 0.2s;"
      title="显示导航栏"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="6" width="18" height="3" rx="1.5" fill="#fff"/>
        <rect x="3" y="11" width="18" height="3" rx="1.5" fill="#fff"/>
        <rect x="3" y="16" width="18" height="3" rx="1.5" fill="#fff"/>
      </svg>
    </button>
    <!-- About Account 弹窗 -->
    <el-dialog
      v-model="aboutAccountDialogVisible"
      title="About Account"
      width="400px"
      :append-to-body="true"
      :close-on-click-modal="true"
    >
      <div style="padding: 1.5rem 0; text-align: center;">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style="margin-bottom: 1rem;">
          <circle cx="12" cy="8" r="5" stroke="#2563eb" stroke-width="2" />
          <path d="M20 21C20 16.5817 16.4183 13 12 13C7.58172 13 4 16.5817 4 21" stroke="#2563eb" stroke-width="2" />
        </svg>
        <div style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">Admin User</div>
        <div style="color: var(--text-secondary); margin-bottom: 0.5rem;">admin@company.com</div>
        <div style="color: var(--text-secondary);">Role: Administrator</div>
      </div>
    </el-dialog>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, h, nextTick, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { currentTheme, toggleTheme } from '@/utils/themeManager'
import { isAnimationPaused, toggleAnimation } from '@/utils/animationManager'
import { getSessionIdFromUrl } from '@/utils/sessionValidator'

const router = useRouter()
const route = useRoute()

// 导航栏状态
const isNavHidden = ref(false)
const isUserMenuOpen = ref(false)
const isMoreMenuOpen = ref(false)

// About Account弹窗状态
const aboutAccountDialogVisible = ref(false)

// DOM引用
const moreDropdown = ref<HTMLElement>()
const userMenuTrigger = ref<HTMLElement>()

// More菜单项配置（始终在More菜单中）
const moreMenuItems = ref([
  {
    path: '/enterprise-database',
    label: 'Enterprise Database',
    icon: 'EnterpriseDatabaseIcon'
  },
  {
    path: '/api-test',
    label: 'API Test',
    icon: 'ApiTestIcon'
  }
])

// 图标组件映射
const iconComponents = {
  ApiTestIcon: () => h('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none' }, [
    h('path', { d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
    h('polyline', { points: '14,2 14,8 20,8', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
    h('line', { x1: '16', y1: '13', x2: '8', y2: '13', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
    h('line', { x1: '16', y1: '17', x2: '8', y2: '17', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
    h('polyline', { points: '10,9 9,9 8,9', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
  ]),
  EnterpriseDatabaseIcon: () => h('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none' }, [
    h('path', { d: 'M12 2L2 7L12 12L22 7L12 2Z', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
    h('path', { d: 'M2 17L12 22L22 17', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
    h('path', { d: 'M2 12L12 17L22 12', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
  ])
}

// 切换More菜单
const toggleMoreMenu = () => {
  isMoreMenuOpen.value = !isMoreMenuOpen.value
}

// 处理导航
const handleNavigation = (path: string) => {
  const sessionId = getSessionIdFromUrl() || localStorage.getItem('sessionId')
  if (sessionId) {
    router.push({ path, query: { sessionId } })
  } else {
    router.push(path)
  }
}

// 处理More菜单中的导航
const handleMoreNavigation = (path: string) => {
  handleNavigation(path)
  isMoreMenuOpen.value = false
}

// 切换用户菜单
const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value
}

// 切换导航栏可见性
const toggleNavVisibility = () => {
  isNavHidden.value = !isNavHidden.value
  localStorage.setItem('navHidden', isNavHidden.value.toString())
}

// 处理关于账户
const handleAboutAccount = () => {
  aboutAccountDialogVisible.value = true
  isUserMenuOpen.value = false
}

// 处理登出
const handleLogout = () => {
  const sessionId = localStorage.getItem('sessionId')
  if (sessionId) {
    router.push({ path: '/user-confirm', query: { sessionId } })
  } else {
    router.push('/login')
  }
  isUserMenuOpen.value = false
}

// 点击外部关闭菜单
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  
  // 关闭用户菜单
  if (userMenuTrigger.value && !userMenuTrigger.value.contains(target)) {
    isUserMenuOpen.value = false
  }
  
  // 关闭More菜单
  if (moreDropdown.value && !moreDropdown.value.contains(target)) {
    isMoreMenuOpen.value = false
  }
}

// 监听路由变化
watch(() => route.path, () => {
  isMoreMenuOpen.value = false
  isUserMenuOpen.value = false
})

// 组件挂载时获取session ID和添加事件监听
onMounted(() => {
  // 优先从localStorage获取sessionId
  let sessionId = localStorage.getItem('sessionId')
  
  // 如果localStorage中没有，尝试从URL获取（仅第一次）
  if (!sessionId) {
    sessionId = getSessionIdFromUrl()
    
    // 如果从URL获取到有效的sessionId，保存到localStorage
    if (sessionId && sessionId === 'a123456789') {
      localStorage.setItem('sessionId', sessionId)
    }
  }
  
  document.addEventListener('click', handleClickOutside)
  // 移除自动恢复导航栏状态逻辑
})

// 组件卸载时移除事件监听
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style>
/* 导航栏基础样式 */
.navigation-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: var(--bg-navbar);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border-navbar);
  z-index: var(--z-navbar) !important;
  transition: transform 0.3s ease;
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  gap: 1rem;
}

/* Logo样式 */
.nav-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  text-decoration: none;
  color: var(--text-primary);
  font-weight: 600;
  font-size: 1.125rem;
  transition: color 0.2s ease;
  flex-shrink: 0;
}

.nav-logo:hover {
  color: var(--accent-primary);
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--accent-secondary);
  color: var(--accent-primary);
}

.logo-text {
  color: var(--text-primary);
}

/* 导航菜单样式 */
.nav-menu {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  justify-content: center;
  margin: 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  color: var(--text-secondary);
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
}

.nav-item:hover {
  background: var(--accent-secondary);
  color: var(--accent-primary);
}

.nav-item.active {
  background: var(--accent-secondary);
  color: var(--accent-primary);
}

.nav-item svg {
  flex-shrink: 0;
  color: inherit;
}

/* More下拉菜单样式 */
.nav-more-dropdown {
  position: relative;
  display: flex;
  align-items: center;
}

.nav-more-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  font-weight: 500;
}

.nav-more-btn:hover {
  background: var(--accent-secondary);
  color: var(--accent-primary);
}

.nav-more-btn.active {
  background: var(--accent-secondary);
  color: var(--accent-primary);
}

.dropdown-arrow {
  transition: transform 0.2s ease;
}

.dropdown-arrow.rotated {
  transform: rotate(180deg);
}

.more-dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.5rem;
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-card);
  border-radius: 12px;
  box-shadow: var(--shadow-dialog);
  z-index: var(--z-dropdown) !important;
  min-width: 240px;
  width: max-content;
  transform-origin: top left;
  animation: dropdownSlideIn 0.2s ease-out;
}

.more-dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: var(--text-secondary);
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  border-radius: 0;
}

.more-dropdown-item:first-child {
  border-radius: 12px 12px 0 0;
}

.more-dropdown-item:last-child {
  border-radius: 0 0 12px 12px;
}

.more-dropdown-item:hover {
  background: var(--accent-secondary);
  color: var(--accent-primary);
}

.more-dropdown-item.active {
  background: var(--accent-secondary);
  color: var(--accent-primary);
}

.more-dropdown-item svg {
  color: inherit;
}

/* 用户区域样式 */
.nav-user {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  position: relative;
  flex-shrink: 0;
}

.nav-user:hover {
  background: var(--accent-secondary);
}

.user-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--accent-secondary);
  color: var(--accent-primary);
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.user-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1;
}

.user-role {
  font-size: 0.75rem;
  color: var(--text-secondary);
  line-height: 1;
}

.user-menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.user-menu-btn svg {
  transition: transform 0.2s ease;
}

.user-menu-btn svg.rotated {
  transform: rotate(180deg);
}

/* 用户下拉菜单样式 */
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
  z-index: var(--z-dropdown) !important;
  min-width: 260px;
  width: max-content;
  transform-origin: top right;
  animation: dropdownSlideIn 0.2s ease-out;
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--accent-secondary);
  color: var(--accent-primary);
}

.dropdown-user-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.dropdown-user-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
}

.dropdown-user-email {
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.dropdown-divider {
  height: 1px;
  background: var(--border-secondary);
  margin: 0.5rem 0;
}

.dropdown-menu-items {
  padding: 0.5rem 0;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  text-align: left;
  font-size: 0.875rem;
}

.dropdown-item:hover {
  background: var(--accent-secondary);
  color: var(--accent-primary);
}

.dropdown-item svg {
  color: inherit;
}

.logout-item {
  color: #ef4444;
}

.logout-item:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

/* 导航栏隐藏状态 */
.nav-hidden {
  transform: translateY(-100%);
}

/* 下拉菜单动画 */
@keyframes dropdownSlideIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-container {
    padding: 0 1rem;
    gap: 0.5rem;
  }
  
  .nav-menu {
    margin: 0;
    gap: 0.25rem;
  }
  
  .nav-item {
    padding: 0.5rem 0.75rem;
    font-size: 0.8rem;
  }
  
  .user-info {
    display: none;
  }
  
  .nav-logo {
    font-size: 1rem;
  }
  
  .logo-icon {
    width: 28px;
    height: 28px;
  }
}

/* 弹窗打开时禁用导航栏交互 */
body.el-popup-parent--hidden .navigation-bar,
body.dialog-open .navigation-bar {
  pointer-events: none !important;
}
body.el-popup-parent--hidden .navigation-bar *,
body.dialog-open .navigation-bar * {
  pointer-events: none !important;
}
body.el-popup-parent--hidden .navigation-bar,
body.dialog-open .navigation-bar {
  pointer-events: auto !important;
}
</style> 