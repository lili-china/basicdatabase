<template>
  <div class="app-container">
    <!-- 波浪背景和内容 -->
    <WaveBackground>
      <div class="wave-demo-container">
        <div class="page-header">
          <h1>File Manager</h1>
          <p>Manage and organize your files and folders</p>
        </div>
        <div class="content-area">
          <!-- 左上角浮动区：主题切换+波浪动画控制 -->
          <div class="floating-id-trigger-group-vertical">
            <button class="control-btn theme-toggle-btn left-theme-btn" @click="toggleTheme" :title="currentTheme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'">
              <svg v-if="currentTheme === 'light'" width="20" height="20" viewBox="0 0 24 24" fill="none" class="control-icon">
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
              <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" class="control-icon">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <button class="control-btn animation-toggle-btn left-wave-btn" @click="toggleWave" :title="wavePaused ? '恢复波浪动画' : '暂停波浪动画'">
              <svg v-if="wavePaused" width="20" height="20" viewBox="0 0 24 24" fill="none" class="control-icon">
                <path d="M2 12C2 12 4 8 8 8C12 8 14 12 18 12C22 12 24 8 24 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 16C2 16 4 12 8 12C12 12 14 16 18 16C22 16 24 12 24 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="12" cy="12" r="2" fill="currentColor"/>
              </svg>
              <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" class="control-icon">
                <path d="M2 12C2 12 4 8 8 8C12 8 14 12 18 12C22 12 24 8 24 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 16C2 16 4 12 8 12C12 12 14 16 18 16C22 16 24 12 24 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="8" y1="6" x2="8" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <line x1="16" y1="6" x2="16" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>

            <!-- 主要内容区域 -->
            <div class="main-content">
              <!-- 右侧内容区域 -->
              <div class="content-area">
                <!-- 面包屑导航 -->
                <div class="breadcrumb-nav">
                  <div class="nav-top">
                    <div class="navbar-left">
                      <div class="search-box">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <circle cx="11" cy="11" r="8" stroke="currentColor" stroke-width="2"/>
                          <path d="m21 21-4.35-4.35" stroke="currentColor" stroke-width="2"/>
                        </svg>
                        <input type="text" placeholder="Search files and folders..." class="search-input">
                      </div>
                    </div>
                    <div class="navbar-right">
                      <div class="view-controls">
                        <button 
                          @click="viewMode = 'grid'" 
                          class="view-btn"
                          :class="{ active: viewMode === 'grid' }"
                          title="Grid View"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <rect x="3" y="3" width="7" height="7" stroke="currentColor" stroke-width="2"/>
                            <rect x="14" y="3" width="7" height="7" stroke="currentColor" stroke-width="2"/>
                            <rect x="3" y="14" width="7" height="7" stroke="currentColor" stroke-width="2"/>
                            <rect x="14" y="14" width="7" height="7" stroke="currentColor" stroke-width="2"/>
                          </svg>
                        </button>
                        <button 
                          @click="viewMode = 'list'" 
                          class="view-btn"
                          :class="{ active: viewMode === 'list' }"
                          title="List View"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <line x1="8" y1="6" x2="21" y2="6" stroke="currentColor" stroke-width="2"/>
                            <line x1="8" y1="12" x2="21" y2="12" stroke="currentColor" stroke-width="2"/>
                            <line x1="8" y1="18" x2="21" y2="18" stroke="currentColor" stroke-width="2"/>
                            <line x1="3" y1="6" x2="3.01" y2="6" stroke="currentColor" stroke-width="2"/>
                            <line x1="3" y1="12" x2="3.01" y2="12" stroke="currentColor" stroke-width="2"/>
                            <line x1="3" y1="18" x2="3.01" y2="18" stroke="currentColor" stroke-width="2"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div class="breadcrumb">
                    <span 
                      v-for="(item, index) in breadcrumb" 
                      :key="index"
                      @click="navigateToFolder(index)"
                      class="breadcrumb-item"
                      :class="{ active: index === breadcrumb.length - 1 }"
                    >
                      {{ item.name }}
                      <span v-if="index < breadcrumb.length - 1" class="separator">/</span>
                    </span>
                  </div>
                  <!-- 操作工具栏 -->
                  <div class="toolbar">
                    <div class="toolbar-left">
                      <button @click="createFolder" class="toolbar-btn primary">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2"/>
                        </svg>
                        New Folder
                      </button>
                      <button @click="uploadFile" class="toolbar-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" stroke-width="2"/>
                        </svg>
                        Upload Files
                      </button>
                    </div>
                  </div>
                </div>

                <!-- 文件列表 -->
          <div class="file-list">
            <!-- 网格视图 -->
            <div v-if="viewMode === 'grid'" class="grid-view">
              <div 
                v-for="item in currentItems" 
                :key="item.id"
                      class="file-card"
                @click="handleItemClick(item)"
              >
                                            <div class="file-icon">
                        <svg v-if="item.type === 'folder'" viewBox="0 0 24 24" fill="none">
                          <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-5l-2-2H5a2 2 0 0 0-2 2z" stroke="currentColor" stroke-width="2"/>
                        </svg>
                        <svg v-else viewBox="0 0 24 24" fill="none">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2"/>
                          <polyline points="14,2 14,8 20,8" stroke="currentColor" stroke-width="2"/>
                        </svg>
                        <!-- 锁图标 -->
                        <div v-if="item.locked" class="lock-icon">
                          <svg viewBox="0 0 24 24" fill="none">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
                            <circle cx="12" cy="16" r="1" stroke="currentColor" stroke-width="2"/>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" stroke-width="2"/>
                          </svg>
                        </div>
                      </div>
                      <div class="file-details">
                    <h3 class="file-name">{{ item.name }}</h3>
                        <p class="file-meta">
                        <span v-if="item.type === 'folder'">{{ item.itemCount }} items</span>
                        <span v-else>{{ formatFileSize(item.size) }}</span>
                          • {{ formatDate(item.modified) }}
                        </p>
                </div>
                <div class="file-actions">
                        <button class="action-btn" @click.stop="handleItemClick(item)">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" stroke="currentColor" stroke-width="2"/>
                    </svg>
                        </button>
                </div>
              </div>
            </div>

            <!-- 列表视图 -->
            <div v-else class="list-view">
              <el-table 
                :data="currentItems" 
                class="file-table" 
                @row-click="handleItemClick" 
                height="70vh"
              >
                <el-table-column prop="name" label="Name" min-width="200">
                  <template #default="{ row }">
                    <div class="name-content">
                      <svg v-if="row.type === 'folder'" viewBox="0 0 24 24" fill="none">
                        <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-5l-2-2H5a2 2 0 0 0-2 2z" stroke="currentColor" stroke-width="2"/>
                      </svg>
                      <svg v-else viewBox="0 0 24 24" fill="none">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2"/>
                        <polyline points="14,2 14,8 20,8" stroke="currentColor" stroke-width="2"/>
                      </svg>
                      <span>{{ row.name }}</span>
                      <svg v-if="row.locked" viewBox="0 0 24 24" fill="none" class="list-lock-icon">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
                        <circle cx="12" cy="16" r="1" stroke="currentColor" stroke-width="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" stroke-width="2"/>
                      </svg>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="Type" min-width="120">
                  <template #default="{ row }">
                    <div>{{ getFileType(row) }}</div>
                  </template>
                </el-table-column>
                <el-table-column label="Modified" min-width="120" sortable>
                  <template #default="{ row }">
                    <div>{{ formatDate(row.modified) }}</div>
                  </template>
                </el-table-column>
                <el-table-column label="Owner" min-width="100">
                  <template #default="{ row }">
                    <div>{{ row.owner || 'Admin' }}</div>
                  </template>
                </el-table-column>
                <el-table-column label="Actions" min-width="150" fixed="right">
                  <template #default="{ row }">
                    <div class="action-buttons">
                      <button class="action-btn-small" @click.stop="openItemFromTable(row)" title="Open">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" stroke="currentColor" stroke-width="2"/>
                        </svg>
                      </button>
                      <button class="action-btn-small" @click.stop="renameItemFromTable(row)" title="Rename">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2"/>
                        </svg>
                      </button>
                      <button v-if="row.type === 'folder'" class="action-btn-small" @click.stop="toggleLockFromTable(row)" :title="row.locked ? 'Unlock' : 'Lock'">
                        <svg v-if="row.locked" viewBox="0 0 24 24" fill="none">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
                          <circle cx="12" cy="16" r="1" stroke="currentColor" stroke-width="2"/>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" stroke-width="2"/>
                        </svg>
                        <svg v-else viewBox="0 0 24 24" fill="none">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
                          <circle cx="12" cy="16" r="1" stroke="currentColor" stroke-width="2"/>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" stroke-width="2"/>
                          <path d="M12 11V7a3 3 0 0 0-6 0v4" stroke="currentColor" stroke-width="2"/>
                        </svg>
                      </button>
                      <button class="action-btn-small danger" @click.stop="deleteItemFromTable(row)" title="Delete">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <polyline points="3,6 5,6 21,6" stroke="currentColor" stroke-width="2"/>
                          <path d="M19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2" stroke="currentColor" stroke-width="2"/>
                        </svg>
                      </button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>


              </div>
            </div>
        </div>
      </div>
    </WaveBackground>
    
    <!-- Element Plus 对话框组件 -->
    
    <!-- 输入对话框 -->
    <el-dialog
      v-model="inputDialogVisible"
      :title="inputDialogTitle"
      width="400px"
      :close-on-click-modal="false"
      @close="inputDialogCallback?.(null)"
    >
      <el-input
        v-model="inputDialogValue"
        :placeholder="inputDialogPlaceholder"
        @keyup.enter="handleInputConfirm"
        @keyup.escape="handleInputCancel"
        ref="inputDialogRef"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleInputCancel">Cancel</el-button>
          <el-button type="primary" @click="handleInputConfirm">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
    
    <!-- 确认对话框 -->
    <el-dialog
      v-model="confirmDialogVisible"
      :title="confirmDialogTitle"
      width="400px"
      :close-on-click-modal="false"
      @close="confirmDialogCallback?.(false)"
    >
      <span>{{ confirmDialogMessage }}</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleConfirmCancel">Cancel</el-button>
          <el-button type="primary" @click="handleConfirmConfirm">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
    
    <!-- 密码对话框 -->
    <el-dialog
      v-model="passwordDialogVisible"
      :title="passwordDialogTitle"
      width="400px"
      :close-on-click-modal="false"
      @close="passwordDialogCallback?.(null)"
    >
      <el-input
        v-model="passwordDialogValue"
        type="password"
        placeholder="Enter password"
        @keyup.enter="handlePasswordConfirm"
        @keyup.escape="handlePasswordCancel"
        ref="passwordDialogRef"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handlePasswordCancel">Cancel</el-button>
          <el-button type="primary" @click="handlePasswordConfirm">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
    
    <!-- 上传文件对话框 -->
    <el-dialog
      v-model="uploadDialogVisible"
      title="Upload Files"
      width="500px"
      :close-on-click-modal="false"
    >
      <el-upload
        ref="uploadRef"
        class="upload-demo"
        drag
        multiple
        :auto-upload="false"
        :on-success="handleUploadSuccess"
        :on-error="handleUploadError"
        :before-upload="handleUploadBefore"
        :on-remove="handleUploadRemove"
        :file-list="[]"
        action="#"
        :http-request="() => {}"
      >
        <el-icon class="el-icon--upload"><svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" stroke-width="2"/>
        </svg></el-icon>
        <div class="el-upload__text">
          Drop files here or <em>click to upload</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            Files smaller than 50MB are allowed
          </div>
        </template>
      </el-upload>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="uploadDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="handleUploadSubmit">Upload</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getSessionIdFromUrl, validateCurrentSession } from '@/utils/sessionValidator'
import WaveBackground from '../components/WaveBackground.vue'
import { currentTheme, toggleTheme } from '@/utils/themeManager'
import { ElMessageBox, ElMessage } from 'element-plus'

// 当前session ID
const currentSessionId = ref<string | null>(null)

// 波浪动画控制
const wavePaused = ref(false)

// 对话框相关
const inputDialogVisible = ref(false)
const inputDialogTitle = ref('')
const inputDialogPlaceholder = ref('')
const inputDialogValue = ref('')
const inputDialogCallback = ref<((value: string | null) => void) | null>(null)

const confirmDialogVisible = ref(false)
const confirmDialogTitle = ref('')
const confirmDialogMessage = ref('')
const confirmDialogCallback = ref<((result: boolean) => void) | null>(null)

const passwordDialogVisible = ref(false)
const passwordDialogTitle = ref('')
const passwordDialogValue = ref('')
const passwordDialogCallback = ref<((password: string | null) => void) | null>(null)

// 上传相关
const uploadDialogVisible = ref(false)
const uploadRef = ref()
function toggleWave() {
  wavePaused.value = !wavePaused.value
  // 触发波浪动画控制事件
  window.dispatchEvent(new CustomEvent('toggleBackgroundAnimation', {
    detail: { paused: wavePaused.value }
  }))
}



// 视图模式
const viewMode = ref<'grid' | 'list'>('grid')

// 面包屑导航
const breadcrumb = ref([
  { id: 'root', name: 'Home' },
  { id: 'documents', name: 'Documents' }
])

// 当前目录内容
const currentItems = ref([
  {
    id: '1',
    name: 'Work Projects',
    type: 'folder',
    itemCount: 12,
    modified: new Date('2024-01-15'),
    path: '/documents/work',
    locked: false,
    owner: 'John Smith'
  },
  {
    id: '2',
    name: 'Personal Files',
    type: 'folder',
    itemCount: 8,
    modified: new Date('2024-01-10'),
    path: '/documents/personal',
    locked: true,
    owner: 'Jane Doe'
  },
  {
    id: '3',
    name: 'report.pdf',
    type: 'file',
    size: 2048576,
    modified: new Date('2024-01-12'),
    path: '/documents/report.pdf',
    locked: false,
    owner: 'John Smith'
  },
  {
    id: '4',
    name: 'presentation.pptx',
    type: 'file',
    size: 5242880,
    modified: new Date('2024-01-08'),
    path: '/documents/presentation.pptx',
    locked: false,
    owner: 'Mike Johnson'
  },
  {
    id: '5',
    name: 'budget.xlsx',
    type: 'file',
    size: 1048576,
    modified: new Date('2024-01-14'),
    path: '/documents/budget.xlsx',
    locked: true,
    owner: 'Sarah Wilson'
  },
  {
    id: '6',
    name: 'images',
    type: 'folder',
    itemCount: 25,
    modified: new Date('2024-01-05'),
    path: '/documents/images',
    locked: false,
    owner: 'Admin'
  }
])



// 格式化文件类型
function getFileType(item: any): string {
  if (item.type === 'folder') {
    return 'Folder'
  }
  
  // 根据文件扩展名判断类型
  const extension = item.name.split('.').pop()?.toLowerCase()
  switch (extension) {
    case 'pdf':
      return 'PDF Document'
    case 'doc':
    case 'docx':
      return 'Word Document'
    case 'xls':
    case 'xlsx':
      return 'Excel Spreadsheet'
    case 'ppt':
    case 'pptx':
      return 'PowerPoint Presentation'
    case 'txt':
      return 'Text Document'
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return 'Image'
    case 'mp4':
    case 'avi':
    case 'mov':
      return 'Video'
    case 'mp3':
    case 'wav':
      return 'Audio'
    default:
      return 'File'
  }
}

// 格式化文件大小
function formatFileSize(bytes: number | undefined): string {
  if (!bytes || bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

// 格式化日期
function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// 导航到文件夹
function navigateToFolder(index: number) {
  breadcrumb.value = breadcrumb.value.slice(0, index + 1)
  console.log('Navigating to folder with sessionId:', currentSessionId.value)
}

// 处理项目点击
function handleItemClick(item: any) {
  // 检查是否是锁定的文件夹
  if (item.type === 'folder' && item.locked) {
    showPasswordDialog('Open', item.name, (password) => {
      if (password !== null) {
        // 验证密码
        if (password === '123456') {
          console.log('Opening locked folder with sessionId:', currentSessionId.value)
        } else {
          // 密码错误
          showDialog('Access Denied', 'Incorrect password! Cannot open locked folder.')
          console.log(`Failed to open locked folder "${item.name}" - incorrect password`)
        }
      }
    })
  } else {
    console.log('Opening item with sessionId:', currentSessionId.value)
  }
}


// 显示输入对话框
function showInputDialog(title: string, placeholder: string, callback: (value: string | null) => void) {
  inputDialogTitle.value = title
  inputDialogPlaceholder.value = placeholder
  inputDialogValue.value = ''
  inputDialogCallback.value = callback
  inputDialogVisible.value = true
}

// 创建文件夹
function createFolder() {
  showInputDialog('Create New Folder', 'Enter folder name:', (folderName) => {
    if (folderName) {
      const newFolder = {
        id: Date.now().toString(),
        name: folderName,
        type: 'folder',
        itemCount: 0,
        modified: new Date(),
        path: `/documents/${folderName}`,
        locked: false,
        owner: 'Admin'
      }
      currentItems.value.unshift(newFolder)
      console.log('Creating folder with sessionId:', currentSessionId.value)
    }
  })
}

// 上传文件
function uploadFile() {
  uploadDialogVisible.value = true
}



// 显示通用对话框
function showDialog(title: string, message: string, type: 'alert' | 'confirm' = 'alert', callback?: (result: boolean) => void) {
  if (type === 'alert') {
    ElMessage.info(message)
    if (callback) callback(true)
  } else {
    confirmDialogTitle.value = title
    confirmDialogMessage.value = message
    confirmDialogCallback.value = callback || (() => {})
    confirmDialogVisible.value = true
  }
}

// 显示密码输入对话框
function showPasswordDialog(action: string, itemName: string, callback: (password: string | null) => void) {
  passwordDialogTitle.value = `${action} "${itemName}"`
  passwordDialogValue.value = ''
  passwordDialogCallback.value = callback
  passwordDialogVisible.value = true
}



// 从表格打开项目
function openItemFromTable(item: any) {
  // 检查是否是锁定的文件夹
  if (item.type === 'folder' && item.locked) {
    showPasswordDialog('Open', item.name, (password) => {
      if (password !== null) {
        // 验证密码
        if (password === '123456') {
          handleItemClick(item)
          console.log('Opening locked folder via table with sessionId:', currentSessionId.value)
        } else {
          // 密码错误
          showDialog('Access Denied', 'Incorrect password! Cannot open locked folder.')
          console.log(`Failed to open locked folder "${item.name}" via table - incorrect password`)
        }
      }
    })
  } else {
    // 非锁定文件夹或文件直接打开
    handleItemClick(item)
  }
}

// 从表格重命名项目
function renameItemFromTable(item: any) {
  showInputDialog('Rename Item', 'Enter new name:', (newName) => {
    if (newName) {
      item.name = newName
    }
  })
}

// 从表格锁定/解锁项目
function toggleLockFromTable(item: any) {
  const action = item.locked ? 'unlock' : 'lock'
  
  showPasswordDialog(action, item.name, (password) => {
    if (password !== null) {
      // 这里可以添加实际的密码验证逻辑
      // 目前使用简单的密码验证（比如密码是 "123456"）
      if (password === '123456') {
        item.locked = !item.locked
        console.log(`Successfully ${action}ed item "${item.name}" via table with sessionId:`, currentSessionId.value)
      } else {
        // 密码错误提示
        showDialog('Access Denied', 'Incorrect password!')
        console.log(`Failed to ${action} item "${item.name}" via table - incorrect password`)
      }
    }
  })
}

// 从表格删除项目
function deleteItemFromTable(item: any) {
  showDialog('Confirm Deletion', `Are you sure you want to delete "${item.name}"?`, 'confirm', (result) => {
    if (result) {
      const index = currentItems.value.findIndex(currentItem => currentItem.id === item.id)
      if (index > -1) {
        currentItems.value.splice(index, 1)
      }
    }
  })
}

// 对话框处理函数
function handleInputConfirm() {
  if (inputDialogValue.value.trim()) {
    inputDialogCallback.value?.(inputDialogValue.value.trim())
  }
  inputDialogVisible.value = false
}

function handleInputCancel() {
  inputDialogCallback.value?.(null)
  inputDialogVisible.value = false
}

function handleConfirmConfirm() {
  confirmDialogCallback.value?.(true)
  confirmDialogVisible.value = false
}

function handleConfirmCancel() {
  confirmDialogCallback.value?.(false)
  confirmDialogVisible.value = false
}

function handlePasswordConfirm() {
  if (passwordDialogValue.value.trim()) {
    passwordDialogCallback.value?.(passwordDialogValue.value.trim())
  }
  passwordDialogVisible.value = false
}

function handlePasswordCancel() {
  passwordDialogCallback.value?.(null)
  passwordDialogVisible.value = false
}

// 上传处理函数
function handleUploadSuccess(response: any, file: any) {
  console.log('File uploaded successfully:', file.name, 'with sessionId:', currentSessionId.value)
  ElMessage.success(`File "${file.name}" uploaded successfully`)
  
  // 添加新文件到列表
  const newFile = {
    id: Date.now().toString(),
    name: file.name,
    type: 'file',
    size: file.size,
    modified: new Date(),
    path: `/documents/${file.name}`,
    locked: false,
    owner: 'Admin'
  }
  currentItems.value.unshift(newFile)
}

function handleUploadError(error: any, file: any) {
  console.error('Upload failed:', error)
  ElMessage.error(`Failed to upload "${file.name}"`)
}

function handleUploadBefore(file: any) {
  // 检查文件大小（限制为50MB）
  const isLt50M = file.size / 1024 / 1024 < 50
  if (!isLt50M) {
    ElMessage.error('File size must be smaller than 50MB!')
    return false
  }
  return true
}

function handleUploadRemove(file: any) {
  console.log('File removed from upload:', file.name)
}

function handleUploadSubmit() {
  if (uploadRef.value) {
    const fileList = uploadRef.value.uploadFiles
    if (fileList.length === 0) {
      ElMessage.warning('Please select files to upload')
      return
    }
    
    // 模拟上传过程
    fileList.forEach((file: any) => {
      // 模拟上传延迟
      setTimeout(() => {
        handleUploadSuccess({}, file.raw)
      }, Math.random() * 1000 + 500)
    })
    
    uploadDialogVisible.value = false
    ElMessage.success(`Uploading ${fileList.length} file(s)...`)
  }
}



// 验证session
const validateSession = async () => {
  try {
    console.log('FileManager: Starting session validation...')
    
    const urlSessionId = getSessionIdFromUrl()
    if (urlSessionId) {
      currentSessionId.value = urlSessionId
    }
    
    const result = await validateCurrentSession()
    
    console.log('FileManager: Validation result:', result)
    
    if (!result.isValid) {
      console.log('FileManager: Session validation failed:', result.error)
      return false
    }
    
    console.log('FileManager: Session validation successful')
    return true
  } catch (error) {
    console.error('FileManager: Session validation error:', error)
    window.location.href = '/errorPage?reason=exception'
    return false
  }
}

onMounted(async () => {
  const isValid = await validateSession()
  if (!isValid) {
    return
  }
})
</script>

<style scoped>
.content-area {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0 auto;
  padding: 0 0.5vw;
  width: 100%;
  max-width: 1400px;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
}

.page-header p {
  font-size: 1rem;
  color: var(--text-secondary);
  margin: 0;
}



.navbar-left {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--accent-primary);
}

.logo svg {
  color: var(--accent-primary);
}

.search-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--bg-primary);
  border: 1px solid var(--border-card);
  border-radius: 8px;
  padding: 0.2rem 0.3rem;
  min-width: 280px;
}

.search-box svg {
  color: var(--text-secondary);
}

.search-input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 0.875rem;
  color: var(--text-primary);
  width: 100%;
  height: 24px;
  line-height: 24px;
}

.search-input::placeholder {
  color: var(--text-secondary);
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.upload-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background: var(--accent-primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.875rem;
}

.upload-btn:hover {
  background: var(--accent-secondary);
  transform: translateY(-1px);
}

/* 主要内容区域 */
.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}



/* 面包屑导航 */
.breadcrumb-nav {
  display: flex;
  flex-direction: column;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid var(--border-card);
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  border-radius: 12px 12px 0 0;
  box-shadow: var(--shadow-card);
}

.nav-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.breadcrumb-item {
  color: var(--text-secondary);
  cursor: pointer;
  transition: color 0.2s;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  font-size: 0.875rem;
}

.breadcrumb-item:hover {
  color: var(--accent-primary);
  background: var(--accent-secondary);
}

.breadcrumb-item.active {
  color: var(--text-primary);
  font-weight: 600;
}

.separator {
  color: var(--border-card);
  margin: 0 0.25rem;
}

.view-controls {
  display: flex;
  gap: 0.25rem;
  background: var(--bg-primary);
  border: 1px solid var(--border-card);
  border-radius: 6px;
  padding: 0.25rem;
}

.view-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  border-radius: 4px;
  cursor: pointer;
  color: var(--text-secondary);
  transition: all 0.2s;
}

.view-btn:hover {
  background: var(--accent-secondary);
  color: var(--accent-primary);
}

.view-btn.active {
  background: var(--accent-primary);
  color: white;
}

/* 工具栏 */
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  border: none;
  background: transparent;
}

.toolbar-left,
.toolbar-right {
  display: flex;
  gap: 0.5rem;
}

.toolbar-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border: 1px solid var(--border-card);
  border-radius: 6px;
  background: var(--bg-card);
  color: var(--text-primary);
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;
}

.toolbar-btn:hover {
  background: var(--accent-secondary);
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}

.toolbar-btn.primary {
  background: var(--accent-primary);
  color: white;
  border-color: var(--accent-primary);
}

.toolbar-btn.primary:hover {
  background: var(--accent-secondary);
  color: var(--accent-primary);
}

/* 文件列表 */
.file-list {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: var(--bg-card);
  border-radius: 0 0 12px 12px;
}

/* 网格视图 */
.grid-view {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
  height: 100%;
  overflow-y: auto;
}

.file-card {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.file-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--accent-secondary) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.file-card:hover {
  border-color: var(--accent-primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-secondary);
}

.file-card:hover::before {
  opacity: 1;
}

.file-icon {
  margin-bottom: 1rem;
  color: var(--accent-primary);
  position: relative;
  z-index: 2;
  transition: transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.file-icon svg {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
}

.file-card:hover .file-icon {
  transform: scale(1.1);
}

.lock-icon {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  padding: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.list-lock-icon {
  color: #ef4444;
  margin-left: 0.5rem;
  width: 14px;
  height: 14px;
}



.file-details {
  flex: 1;
  width: 100%;
  position: relative;
  z-index: 2;
}

.file-name {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  word-break: break-word;
  font-size: 0.875rem;
}

.file-meta {
  font-size: 0.75rem;
  color: var(--text-secondary);
  line-height: 1.4;
}

.file-actions {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  opacity: 0;
  transition: opacity 0.2s;
}

.file-card:hover .file-actions {
  opacity: 1;
}

.action-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: var(--accent-secondary);
  color: var(--accent-primary);
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.action-btn:hover {
  background: var(--accent-primary);
  color: white;
}

/* 表格操作按钮 */
.action-buttons {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.action-btn-small {
  width: 25px;
  height: 25px;
  border: none;
  background: var(--bg-primary);
  color: var(--text-secondary);
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  border: 1px solid var(--border-card);
  position: relative;
  z-index: 2;
}

.action-btn-small:hover {
  background: var(--accent-secondary);
  color: var(--accent-primary);
  border-color: var(--accent-primary);
  transform: scale(1.05);
  z-index: 3;
}

.action-btn-small.danger {
  color: #ef4444;
  border-color: #ef4444;
}

.action-btn-small.danger:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.action-btn-small svg {
  width: 12px;
  height: 12px;
  flex-shrink: 0;
}

/* 列表视图 */
.list-view {
  height: 100%;
  overflow-y: auto;
  width: 100%;
  min-width: 0;
}

.file-table {
  width: 100%;
  border-collapse: collapse;
  background: var(--bg-card);
  border-radius: 0 0 12px 12px;
}

.file-table th {
  background: var(--bg-card);
  color: var(--text-primary);
  font-weight: 600;
  padding: 2rem 2rem;
  text-align: left;
  border-bottom: 1px solid var(--border-card);
}

.file-table td {
  padding: 2rem 2rem;
  border-bottom: 1px solid var(--border-card);
  color: var(--text-primary);
}

.name-col {
  width: 40%;
}

.type-col {
  width: 20%;
}

.date-col {
  width: 20%;
}

.user-col {
  width: 20%;
}

.name-cell {
  font-weight: 600;
}

.type-cell,
.date-cell,
.user-cell {
  color: var(--text-secondary);
}

.file-row {
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.file-row:hover {
  background: var(--accent-secondary);
}

/* 使用深度选择器覆盖Element Plus表格hover样式 */
:deep(.file-table .el-table__body tr:hover) {
  background-color: var(--accent-secondary) !important;
}

:deep(.file-table .el-table__body tr:hover td) {
  background-color: var(--accent-secondary) !important;
}

.file-row::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: var(--accent-primary);
  transform: scaleY(0);
  transition: transform 0.2s ease;
}

.file-row:hover::before {
  transform: scaleY(1);
}

.name-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
}

.name-content span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
}

.name-content svg {
  color: var(--accent-primary);
  flex-shrink: 0;
  width: 20px;
  height: 20px;
}



/* 控制按钮样式 */
.floating-id-trigger-group-vertical {
  position: fixed;
  top: 80px;
  left: 24px;
  z-index: 1200;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
}

.control-btn {
  width: 44px;
  height: 44px;
  border: none;
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  border: 1px solid var(--border-card);
  border-radius: 50%;
  box-shadow: var(--shadow-dialog);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--text-primary);
}

.control-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 32px var(--shadow-primary);
  background: var(--accent-secondary);
  color: var(--accent-primary);
}

.control-icon {
  transition: all 0.3s ease;
}

.control-btn:hover .control-icon {
  transform: scale(1.1);
}

.theme-toggle-btn:hover .control-icon {
  transform: rotate(15deg);
}

.animation-toggle-btn:hover .control-icon {
  transform: scale(1.1);
}

.left-theme-btn {
  margin-left: 0;
}

.left-wave-btn {
  margin-left: 0;
}

/* 上传组件样式 */
.upload-demo {
  width: 100%;
}

.el-upload__text {
  margin-top: 10px;
  color: var(--text-secondary);
}

.el-upload__text em {
  color: var(--accent-primary);
  font-style: normal;
}

.el-upload__tip {
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin-top: 8px;
}

/* 深度选择器覆盖Element Plus上传组件样式 */
:deep(.el-upload--text) {
  border: 2px dashed var(--border-card);
  border-radius: 6px;
  background: var(--bg-primary);
  color: var(--text-secondary);
}

:deep(.el-upload--text:hover) {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}

:deep(.el-upload--text.is-drag) {
  border-color: var(--accent-primary);
  background: var(--accent-secondary);
  color: var(--accent-primary);
}

:deep(.el-upload__text) {
  color: var(--text-secondary);
}

:deep(.el-upload__text em) {
  color: var(--accent-primary);
}

:deep(.el-upload__tip) {
  color: var(--text-secondary);
}

:deep(.el-upload__input) {
  color: var(--text-primary);
}

:deep(.el-upload-dragger) {
  background: var(--bg-primary);
  border: 2px dashed var(--border-card);
  border-radius: 6px;
  color: var(--text-secondary);
}

:deep(.el-upload-dragger:hover) {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
}

:deep(.el-upload-dragger.is-dragover) {
  border-color: var(--accent-primary);
  background: var(--accent-secondary);
  color: var(--accent-primary);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .navbar-left {
    gap: 1rem;
  }
  
  .search-box {
    min-width: 200px;
  }
  
  .breadcrumb-nav,
  .toolbar {
    padding: 1rem;
  }
  
  .grid-view {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 0.75rem;
    padding: 1rem;
  }
  
  .file-table {
    font-size: 0.875rem;
  }
  
  .file-table th,
  .file-table td {
    padding: 0.75rem 0.5rem;
  }
  
  .name-col {
    min-width: 150px;
  }

  .type-col,
  .user-col {
    min-width: 80px;
  }

  .date-col {
    min-width: 100px;
  }
}
</style> 