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
  /* 亮色模式变量 - 优化为更明亮、对比更高的配色 */
  --bg-primary: #ffffff; /* 主背景白色 */
  --bg-secondary: #f4f6fa; /* 次背景淡灰 */
  --bg-tertiary: #e9edf5; /* 第三级背景更淡灰 */
  --bg-card: #f9fafb; /* 卡片背景 */
  --bg-dialog: #ffffff; /* 对话框背景 */
  --text-primary: #222c3a; /* 主文字深灰 */
  --text-secondary: #5a6270; /* 次文字灰色 */
  --text-tertiary: #8a94a6; /* 第三级文字灰色 */
  --text-muted: #b0b8c9; /* 静音文字 */
  --border-primary: #e5e7eb; /* 主边框淡灰 */
  --border-secondary: #e5e7eb; /* 次边框淡灰 */
  --border-card: #e5e7eb; /* 卡片边框 */
  --accent-primary: #2563eb; /* 强调色蓝色 */
  --accent-secondary: #e0e7ff; /* 次强调色淡蓝 */
  --accent-hover: #bcd0ff; /* 悬停强调色 */
  --shadow-primary: rgba(0, 0, 0, 0.08);
  --shadow-secondary: rgba(0, 0, 0, 0.12);
  --shadow-card: 0 8px 32px rgba(0, 0, 0, 0.08);
  --shadow-dialog: 0 4px 16px rgba(0, 0, 0, 0.10);
  --shadow-card-light: 0 4px 16px rgba(0, 0, 0, 0.05);
  --bg-card-light: #f4f6fa;
  --border-card-light: #e5e7eb;
  --wave-bg: linear-gradient(135deg, #2563eb 0%, #60a5fa 100%);
  --wave-overlay: rgba(255, 255, 255, 0.1);
  /* Element Plus 兼容变量 */
  --el-color-primary: #2563eb;
  --el-color-primary-light-3: #60a5fa;
  --el-color-primary-light-5: #93c5fd;
  --el-color-primary-light-7: #bfdbfe;
  --el-color-primary-light-8: #dbeafe;
  --el-color-primary-light-9: #eff6ff;
  --el-color-primary-dark-2: #1d4ed8;
  --el-bg-color: #ffffff;
  --el-bg-color-page: #f4f6fa;
  --el-bg-color-overlay: #f9fafb;
  --el-text-color-primary: #222c3a;
  --el-text-color-regular: #5a6270;
  --el-text-color-secondary: #8a94a6;
  --el-text-color-placeholder: #b0b8c9;
  --el-border-color: #e5e7eb;
  --el-border-color-light: #e5e7eb;
  --el-border-color-lighter: #f4f6fa;
  --el-border-color-extra-light: #f9fafb;
  --el-fill-color: #f4f6fa;
  --el-fill-color-light: #e5e7eb;
  --el-fill-color-lighter: #f9fafb;
  --el-fill-color-extra-light: #ffffff;
  --el-fill-color-dark: #e5e7eb;
  --el-fill-color-darker: #b0b8c9;
  --el-mask-color: rgba(0, 0, 0, 0.08);
  --el-mask-color-extra-light: rgba(0, 0, 0, 0.03);
  --el-box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08), 0 0 6px rgba(0, 0, 0, 0.05);
  --el-box-shadow-light: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
  --el-box-shadow-lighter: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
  --el-box-shadow-dark: 0 2px 4px rgba(0, 0, 0, 0.10), 0 0 6px rgba(0, 0, 0, 0.10);
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
  overflow: auto;
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
  overflow: auto;
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