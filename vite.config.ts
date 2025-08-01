import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    server: {
      port: 3001
    },
    // 生产环境基础路径
    base: mode === 'production' ? '/basicdatabase/' : '/',
    // 自定义环境变量文件
    envDir: '.',
    envPrefix: 'VITE_'
  }
}) 