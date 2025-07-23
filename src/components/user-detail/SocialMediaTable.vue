<template>
  <div class="info-section">
    <h3>Social Media Accounts</h3>
    
    <!-- 搜索条件区域 -->
    <div class="search-section">
      <el-row :gutter="16">
        <el-col :span="8">
          <el-input
            v-model="searchForm.platform"
            placeholder="Platform"
            clearable
            @input="handleSearch"
          />
        </el-col>
        <el-col :span="8">
          <el-select
            v-model="searchForm.status"
            placeholder="Status"
            clearable
            @change="handleSearch"
            style="width: 100%"
          >
            <el-option label="Active" value="Active" />
            <el-option label="Inactive" value="Inactive" />
            <el-option label="Private" value="Private" />
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-date-picker
            v-model="searchForm.dateRange"
            type="daterange"
            range-separator="To"
            start-placeholder="Start Date"
            end-placeholder="End Date"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            @change="handleSearch"
            style="width: 100%"
          />
        </el-col>
      </el-row>
    </div>

    <div class="table-container">
      <el-table :data="socialAccounts || []" style="width: 100%">
        <el-table-column prop="platform" label="Platform" min-width="120" />
        <el-table-column prop="username" label="Username" min-width="150" />
        <el-table-column prop="url" label="URL" min-width="200" />
        <el-table-column prop="followers" label="Followers" min-width="100" />
        <el-table-column prop="status" label="Status" min-width="100">
          <template #default="scope">
            <el-tag :type="getStatusType(scope.row.status)" size="small">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="lastActive" label="Last Active" min-width="120" />
      </el-table>
      
      <!-- 分页组件 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, reactive } from 'vue'

interface SocialAccount {
  platform: string
  username: string
  url: string
  followers: string
  status: string
  lastActive: string
}

interface Props {
  userId: string
}

const props = defineProps<Props>()

// 搜索表单
const searchForm = reactive({
  platform: '',
  status: '',
  dateRange: [] as string[]
})

// 分页状态
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(4)

// 获取社交媒体账号信息
const socialAccounts = computed(() => {
  return [
    {
      platform: 'LinkedIn',
      username: 'sarah.johnson',
      url: 'https://linkedin.com/in/sarah.johnson',
      followers: '1,250',
      status: 'Active',
      lastActive: '2024-01-15'
    },
    {
      platform: 'Twitter',
      username: '@sarahjohnson',
      url: 'https://twitter.com/sarahjohnson',
      followers: '850',
      status: 'Active',
      lastActive: '2024-01-10'
    },
    {
      platform: 'Instagram',
      username: 'sarah.johnson.design',
      url: 'https://instagram.com/sarah.johnson.design',
      followers: '2,100',
      status: 'Active',
      lastActive: '2024-01-12'
    },
    {
      platform: 'GitHub',
      username: 'sarahjohnson',
      url: 'https://github.com/sarahjohnson',
      followers: '320',
      status: 'Active',
      lastActive: '2024-01-14'
    }
  ]
})

const getStatusType = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'success'
    case 'inactive':
      return 'info'
    case 'private':
      return 'warning'
    default:
      return 'info'
  }
}

// 搜索处理
const handleSearch = () => {
  currentPage.value = 1
}

// 分页处理
const handleSizeChange = (size: number) => {
  pageSize.value = size
  currentPage.value = 1
}

const handleCurrentChange = (page: number) => {
  currentPage.value = page
  // 滚动到表格顶部
  const tableContainer = document.querySelector('.table-container')
  if (tableContainer) {
    tableContainer.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<style scoped>
.info-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: var(--bg-tertiary);
  border-radius: 12px;
  border: 1px solid var(--border-primary);
}

.info-section h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 1rem 0;
  border-bottom: 2px solid var(--accent-secondary);
  padding-bottom: 0.5rem;
}

.search-section {
  margin-bottom: 1rem;
  padding: 1rem;
  background: var(--bg-primary);
  border-radius: 8px;
  border: 1px solid var(--border-primary);
}

.table-container {
  overflow-x: auto;
  border-radius: 8px;
  background: var(--bg-primary);
}

.pagination-container {
  padding: 1rem;
  display: flex;
  justify-content: center;
  background: var(--bg-primary);
  border-top: 1px solid var(--border-primary);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .info-section {
    padding: 1rem;
  }
  
  .table-container {
    font-size: 0.875rem;
  }
  
  .search-section .el-col {
    margin-bottom: 0.5rem;
  }
}

/* 表格滚动条样式 */
.table-container::-webkit-scrollbar {
  height: 6px;
}

.table-container::-webkit-scrollbar-track {
  background: var(--bg-primary);
  border-radius: 3px;
}

.table-container::-webkit-scrollbar-thumb {
  background: var(--border-primary);
  border-radius: 3px;
}

.table-container::-webkit-scrollbar-thumb:hover {
  background: var(--accent-primary);
}
</style> 