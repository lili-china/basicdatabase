<template>
  <div class="app-container">
    <!-- 导航栏 -->
    <NavigationBar />
    
    <!-- 波浪背景和内容 -->
    <WaveBackground>
      <div class="wave-demo-container dashboard-container" :class="{ 'with-fixed-header': isScrolled }">
        <div class="page-header" :class="{ 'scrolled': isScrolled }">
          <h1>Dashboard</h1>
          <p>System statistics and data insights</p>
        </div>

        <div class="dashboard-content">
          <!-- 统计卡片区域 -->
          <div class="stats-grid">
            <!-- Personal Database 统计 -->
            <div class="stat-card">
              <div class="stat-icon personal">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="stat-content">
                <h3 class="stat-title">Personal Database</h3>
                <div class="stat-value">{{ formatNumber(personalCount) }}</div>
                <div class="stat-change">
                  <span class="change-indicator neutral">Total Records</span>
                </div>
              </div>
            </div>

            <!-- Vehicle Database 统计 -->
            <div class="stat-card">
              <div class="stat-icon vehicle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L3 21L7 17ZM3 21V11C3 10.4696 3.21071 9.96086 3.58579 9.58579C3.96086 9.21071 4.46957 9 5 9H11L21 19V21C21 21.5304 20.7893 22.0391 20.4142 22.4142C20.0391 22.7893 19.5304 23 19 23H5C4.46957 23 3.96086 22.7893 3.58579 22.4142C3.21071 22.0391 3 21.5304 3 21V21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16 3H21V8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M4 15L9 20L20 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="stat-content">
                <h3 class="stat-title">Vehicle Database</h3>
                <div class="stat-value">{{ formatNumber(vehicleCount) }}</div>
                <div class="stat-change">
                  <span class="change-indicator neutral">Total Records</span>
                </div>
              </div>
            </div>

            <!-- Enterprise Information 统计 -->
            <div class="stat-card">
              <div class="stat-icon enterprise">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="stat-content">
                <h3 class="stat-title">Enterprise Information</h3>
                <div class="stat-value">{{ formatNumber(enterpriseCount) }}</div>
                <div class="stat-change">
                  <span class="change-indicator neutral">Total Records</span>
                </div>
              </div>
            </div>

            <!-- 预留统计卡片 1 -->
            <div class="stat-card">
              <div class="stat-icon custom">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 16V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 8H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="stat-content">
                <h3 class="stat-title">Custom Database 1</h3>
                <div class="stat-value">{{ formatNumber(custom1Count) }}</div>
                <div class="stat-change">
                  <span class="change-indicator neutral">No Data</span>
                </div>
              </div>
            </div>

            <!-- 预留统计卡片 2 -->
            <div class="stat-card">
              <div class="stat-icon custom">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 11H1L9 3V11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M20.2 5.8L16 10L20.2 14.2L16 18.4L20.2 22.6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M4 19H12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="stat-content">
                <h3 class="stat-title">Custom Database 2</h3>
                <div class="stat-value">{{ formatNumber(custom2Count) }}</div>
                <div class="stat-change">
                  <span class="change-indicator neutral">No Data</span>
                </div>
              </div>
            </div>

            <!-- 预留统计卡片 3 -->
            <div class="stat-card">
              <div class="stat-icon custom">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <div class="stat-content">
                <h3 class="stat-title">Custom Database 3</h3>
                <div class="stat-value">{{ formatNumber(custom3Count) }}</div>
                <div class="stat-change">
                  <span class="change-indicator neutral">No Data</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 快速操作区域 -->
          <div class="quick-actions">
            <h3 class="section-title">Quick Actions</h3>
            <div class="actions-grid">
              <router-link :to="{ path: '/personal-database', query: { sessionId: currentSessionId } }" class="action-card">
                <div class="action-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <span>View Personal Data</span>
              </router-link>

              <router-link :to="{ path: '/vehicle-database', query: { sessionId: currentSessionId } }" class="action-card">
                <div class="action-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L3 21L7 17ZM3 21V11C3 10.4696 3.21071 9.96086 3.58579 9.58579C3.96086 9.21071 4.46957 9 5 9H11L21 19V21C21 21.5304 20.7893 22.0391 20.4142 22.4142C20.0391 22.7893 19.5304 23 19 23H5C4.46957 23 3.96086 22.7893 3.58579 22.4142C3.21071 22.0391 3 21.5304 3 21V21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M16 3H21V8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M4 15L9 20L20 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <span>View Vehicle Data</span>
              </router-link>

              <router-link :to="{ path: '/enterprise-database', query: { sessionId: currentSessionId } }" class="action-card">
                <div class="action-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 7L10 17L5 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M7 3H17V7H7V3Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <span>View Enterprise Data</span>
              </router-link>

              <router-link :to="{ path: '/analytics', query: { sessionId: currentSessionId } }" class="action-card">
                <div class="action-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M9 11H1L9 3V11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M20.2 5.8L16 10L20.2 14.2L16 18.4L20.2 22.6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M4 19H12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <span>View Analytics</span>
              </router-link>

              <router-link :to="{ path: '/settings', query: { sessionId: currentSessionId } }" class="action-card">
                <div class="action-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 16V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M12 8H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <span>System Settings</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </WaveBackground>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getSessionIdFromUrl } from '@/utils/sessionValidator'
import { initScrollListener } from '@/utils/scrollManager'
import { createBatchAnimator, Easing, formatNumber } from '@/utils/animationManager'
import WaveBackground from '../components/WaveBackground.vue'
import NavigationBar from '../components/NavigationBar.vue'

// 当前session ID
const currentSessionId = ref<string | null>(null)

// 统计数据 - 这些值后期将从API获取
const personalCount = ref(0)
const vehicleCount = ref(0)
const enterpriseCount = ref(0)
const custom1Count = ref(0)
const custom2Count = ref(0)
const custom3Count = ref(0)

// 目标数值
const targetPersonalCount = 12502312312
const targetVehicleCount = 856123123123
const targetEnterpriseCount = 34212312312
const targetCustom1Count = 0
const targetCustom2Count = 0
const targetCustom3Count = 0

// 滚动状态
const isScrolled = initScrollListener()

// 组件挂载时获取session ID
onMounted(() => {
  currentSessionId.value = getSessionIdFromUrl()
  
  // 启动数字动画
  setTimeout(() => {
    const batchAnimator = createBatchAnimator()
    
    // 添加所有数字动画
    batchAnimator.addAnimator(0, targetPersonalCount, {
      duration: 2000,
      easing: Easing.easeOutQuart,
      onUpdate: (value) => personalCount.value = value
    })
    
    batchAnimator.addAnimator(0, targetVehicleCount, {
      duration: 2000,
      easing: Easing.easeOutQuart,
      onUpdate: (value) => vehicleCount.value = value
    })
    
    batchAnimator.addAnimator(0, targetEnterpriseCount, {
      duration: 2000,
      easing: Easing.easeOutQuart,
      onUpdate: (value) => enterpriseCount.value = value
    })
    
    batchAnimator.addAnimator(0, targetCustom1Count, {
      duration: 2000,
      easing: Easing.easeOutQuart,
      onUpdate: (value) => custom1Count.value = value
    })
    
    batchAnimator.addAnimator(0, targetCustom2Count, {
      duration: 2000,
      easing: Easing.easeOutQuart,
      onUpdate: (value) => custom2Count.value = value
    })
    
    batchAnimator.addAnimator(0, targetCustom3Count, {
      duration: 2000,
      easing: Easing.easeOutQuart,
      onUpdate: (value) => custom3Count.value = value
    })
    
    // 启动所有动画
    batchAnimator.startAll()
  }, 500) // 延迟500ms开始动画
  
  // TODO: 从API获取统计数据
  // fetchDashboardStats()
})

// TODO: 实现API调用函数
// async function fetchDashboardStats() {
//   try {
//     const response = await fetch('/api/dashboard/stats')
//     const data = await response.json()
//     // 更新统计数据
//   } catch (error) {
//     console.error('Failed to fetch dashboard stats:', error)
//   }
// }
</script>

<style scoped>
/* Dashboard 特有样式 */

.dashboard-header {
  margin-bottom: 2rem;
  text-align: center;
}

.dashboard-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dashboard-subtitle {
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin: 0;
  font-weight: 500;
}

.dashboard-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* 统计卡片网格 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
}

/* 响应式网格布局 */
@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }
}

@media (max-width: 900px) {
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 0.75rem;
  }
}

@media (max-width: 600px) {
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
  
  .stat-card {
    padding: 1rem;
  }
}

.stat-card {
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid var(--border-card);
  box-shadow: var(--shadow-card);
  transition: all 0.3s ease;
  min-width: 0; /* 允许卡片收缩 */
  overflow: hidden; /* 防止内容溢出 */
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-secondary);
}

.stat-content {
  flex: 1;
  min-width: 0; /* 允许内容区域收缩 */
  overflow: hidden; /* 防止内容溢出 */
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon.personal {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.stat-icon.vehicle {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

.stat-icon.enterprise {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.stat-icon.custom {
  background: rgba(139, 92, 246, 0.1);
  color: #8b5cf6;
}

.stat-content {
  flex: 1;
}

.stat-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.25rem 0;
  transition: all 0.3s ease;
  position: relative;
  word-break: break-all;
  overflow-wrap: break-word;
  hyphens: auto;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.stat-value::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--accent-primary), transparent);
  transition: width 0.3s ease;
}

.stat-card:hover .stat-value::after {
  width: 100%;
}

/* 响应式字体大小 */
@media (max-width: 1200px) {
  .stat-value {
    font-size: 1.75rem;
  }
}

@media (max-width: 900px) {
  .stat-value {
    font-size: 1.5rem;
  }
}

@media (max-width: 600px) {
  .stat-value {
    font-size: 1.25rem;
  }
}

@media (max-width: 480px) {
  .stat-value {
    font-size: 1rem;
  }
}

.stat-change {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.change-indicator {
  font-size: 0.875rem;
  font-weight: 600;
}

.change-indicator.positive {
  color: #10b981;
}

.change-indicator.negative {
  color: #ef4444;
}

.change-indicator.neutral {
  color: #6b7280;
}

.change-period {
  font-size: 0.75rem;
  color: var(--text-tertiary);
}

/* 快速操作区域 */
.quick-actions {
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-card);
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: var(--shadow-card);
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 1rem 0;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.action-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(59, 130, 246, 0.05);
  border: 1px solid rgba(59, 130, 246, 0.1);
  border-radius: 12px;
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.action-card:hover {
  background: rgba(59, 130, 246, 0.1);
  border-color: rgba(59, 130, 246, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

.action-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 8px;
}


</style> 