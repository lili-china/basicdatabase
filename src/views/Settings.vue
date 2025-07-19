<template>
  <div class="app-container">
    <!-- 导航栏 -->
    <NavigationBar />
    
    <!-- 波浪背景和内容 -->
    <WaveBackground>
      <div class="wave-demo-container">
        <div class="page-header">
          <h1>Settings</h1>
          <p>System configuration and preferences</p>
        </div>
        
        <div class="coming-soon">
          <div class="coming-soon-content">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 16V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 8H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h2>Coming Soon</h2>
            <p>Settings functionality is under development.</p>
            <p>This page will include system preferences, user management, and configuration options.</p>
          </div>
        </div>
      </div>
    </WaveBackground>
  </div>
</template>

<script setup lang="ts">
import WaveBackground from '../components/WaveBackground.vue'
import NavigationBar from '../components/NavigationBar.vue'
</script>

<style scoped>
/* 页面特有样式 - 无需额外样式，使用公共布局 */
</style> 