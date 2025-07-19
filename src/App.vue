<template>
  <SessionGuard />
</template>

<script setup lang="ts">
import SessionGuard from './components/SessionGuard.vue'
import { currentTheme } from './utils/themeManager'

// 确保主题管理器在应用启动时初始化
console.log('Current theme:', currentTheme.value)
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  /* 亮色模式变量 - 调整为更暗的色调 */
  --bg-primary: #f8fafc;
  --bg-secondary: rgba(248, 250, 252, 0.9);
  --bg-tertiary: rgba(241, 245, 249, 0.8);
  --bg-card: rgba(248, 250, 252, 0.9);
  --bg-dialog: rgba(248, 250, 252, 0.95);
  --text-primary: #1e293b;
  --text-secondary: #475569;
  --text-tertiary: #64748b;
  --text-muted: #64748b;
  --border-primary: rgba(226, 232, 240, 0.5);
  --border-secondary: rgba(0, 0, 0, 0.08);
  --border-card: rgba(226, 232, 240, 0.5);
  --accent-primary: #3b82f6;
  --accent-secondary: rgba(59, 130, 246, 0.1);
  --accent-hover: rgba(59, 130, 246, 0.2);
  --shadow-primary: rgba(0, 0, 0, 0.12);
  --shadow-secondary: rgba(0, 0, 0, 0.18);
  --shadow-card: 0 8px 32px rgba(0, 0, 0, 0.12);
  --shadow-dialog: 0 4px 16px rgba(0, 0, 0, 0.12);
  --shadow-card-light: 0 4px 16px rgba(0, 0, 0, 0.08);
  --bg-card-light: rgba(241, 245, 249, 0.8);
  --border-card-light: rgba(226, 232, 240, 0.4);
  --wave-bg: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --wave-overlay: rgba(255, 255, 255, 0.1);
  
  /* Element Plus 兼容变量 - 调整为更暗的色调 */
  --el-color-primary: #3b82f6;
  --el-color-primary-light-3: #60a5fa;
  --el-color-primary-light-5: #93c5fd;
  --el-color-primary-light-7: #bfdbfe;
  --el-color-primary-light-8: #dbeafe;
  --el-color-primary-light-9: #eff6ff;
  --el-color-primary-dark-2: #1d4ed8;
  --el-bg-color: #f8fafc;
  --el-bg-color-page: #f1f5f9;
  --el-bg-color-overlay: rgba(248, 250, 252, 0.9);
  --el-text-color-primary: #1e293b;
  --el-text-color-regular: #475569;
  --el-text-color-secondary: #64748b;
  --el-text-color-placeholder: #94a3b8;
  --el-border-color: #cbd5e1;
  --el-border-color-light: #e2e8f0;
  --el-border-color-lighter: #f1f5f9;
  --el-border-color-extra-light: #f8fafc;
  --el-fill-color: #f1f5f9;
  --el-fill-color-light: #e2e8f0;
  --el-fill-color-lighter: #f8fafc;
  --el-fill-color-extra-light: #fafbfc;
  --el-fill-color-dark: #cbd5e1;
  --el-fill-color-darker: #94a3b8;
  --el-mask-color: rgba(0, 0, 0, 0.8);
  --el-mask-color-extra-light: rgba(0, 0, 0, 0.3);
  --el-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.08);
  --el-box-shadow-light: 0 2px 12px 0 rgba(0, 0, 0, 0.12);
  --el-box-shadow-lighter: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
  --el-box-shadow-dark: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.12);
}

.dark {
  /* 暗色模式变量 */
  --bg-primary: #111827;
  --bg-secondary: rgba(31, 41, 55, 0.9);
  --bg-tertiary: rgba(31, 41, 55, 0.8);
  --bg-card: rgba(31, 41, 55, 0.9);
  --bg-dialog: rgba(31, 41, 55, 0.95);
  --text-primary: #f9fafb;
  --text-secondary: #d1d5db;
  --text-tertiary: #9ca3af;
  --text-muted: #6b7280;
  --border-primary: rgba(255, 255, 255, 0.1);
  --border-secondary: rgba(255, 255, 255, 0.05);
  --border-card: rgba(255, 255, 255, 0.1);
  --accent-primary: #60a5fa;
  --accent-secondary: rgba(96, 165, 250, 0.1);
  --accent-hover: rgba(96, 165, 250, 0.2);
  --shadow-primary: rgba(0, 0, 0, 0.3);
  --shadow-secondary: rgba(0, 0, 0, 0.4);
  --shadow-card: 0 8px 32px rgba(0, 0, 0, 0.3);
  --shadow-dialog: 0 4px 16px rgba(0, 0, 0, 0.3);
  --wave-bg: linear-gradient(135deg, #1e3a8a 0%, #7c3aed 100%);
  --wave-overlay: rgba(0, 0, 0, 0.2);
  
  /* Element Plus 暗色模式兼容变量 */
  --el-color-primary: #60a5fa;
  --el-color-primary-light-3: #93c5fd;
  --el-color-primary-light-5: #bfdbfe;
  --el-color-primary-light-7: #dbeafe;
  --el-color-primary-light-8: #eff6ff;
  --el-color-primary-light-9: #f8fafc;
  --el-color-primary-dark-2: #3b82f6;
  --el-bg-color: #1f2937;
  --el-bg-color-page: #111827;
  --el-bg-color-overlay: rgba(31, 41, 55, 0.9);
  --el-text-color-primary: #f9fafb;
  --el-text-color-regular: #d1d5db;
  --el-text-color-secondary: #9ca3af;
  --el-text-color-placeholder: #6b7280;
  --el-border-color: #374151;
  --el-border-color-light: #4b5563;
  --el-border-color-lighter: #6b7280;
  --el-border-color-extra-light: #9ca3af;
  --el-fill-color: #374151;
  --el-fill-color-light: #4b5563;
  --el-fill-color-lighter: #6b7280;
  --el-fill-color-extra-light: #9ca3af;
  --el-fill-color-dark: #1f2937;
  --el-fill-color-darker: #111827;
  --el-mask-color: rgba(0, 0, 0, 0.8);
  --el-mask-color-extra-light: rgba(0, 0, 0, 0.3);
  --el-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3), 0 0 6px rgba(0, 0, 0, 0.2);
  --el-box-shadow-light: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
  --el-box-shadow-lighter: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
  --el-box-shadow-dark: 0 2px 4px rgba(0, 0, 0, 0.3), 0 0 6px rgba(0, 0, 0, 0.3);
}

html, body {
  height: 100%;
  overflow: hidden; /* 防止页面级滚动 */
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
  color: var(--text-primary);
  background-color: var(--bg-primary);
  transition: color 0.3s ease, background-color 0.3s ease;
}

#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* 防止应用级滚动 */
}

/* 全局过渡效果 */
* {
  transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

/* 弹窗滚动条控制 - 修改为只控制内容区域 */
body.dialog-open {
  overflow: hidden !important;
}

html.dialog-open {
  overflow: hidden !important;
}

/* 确保弹窗打开时页面滚动条被隐藏 */
.el-dialog__wrapper {
  overflow: visible !important;
}
</style> 