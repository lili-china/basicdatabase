<template>
  <div class="app-container">
    <!-- 导航栏 -->
    <NavigationBar />
    
    <!-- 波浪背景和内容 -->
    <WaveBackground>
      <div class="wave-demo-container">
        <div class="page-header">
          <h1>Analytics</h1>
          <p>Data analysis and reporting dashboard</p>
        </div>
        
        <div class="coming-soon">
          <div class="coming-soon-content">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
              <path d="M9 11H1L9 3V11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M20.2 5.8L16 10L20.2 14.2L16 18.4L20.2 22.6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M4 19H12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h2>Coming Soon</h2>
            <p>Analytics functionality is under development.</p>
            <p>This page will include charts, reports, and data visualization.</p>
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