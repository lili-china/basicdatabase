<template>
  <div class="detail-section collapsible">
    <div class="section-header" @click="toggleSection">
      <h4>Broadband Registration Information</h4>
      <svg class="collapse-icon" :class="{ 'collapsed': !expanded }" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="section-content" :class="{ 'collapsed': !expanded }">
      
      <!-- 搜索区域 -->
      <div class="search-section">
        <div class="search-row">
          <div class="search-item">
            <label class="search-label">Operator</label>
            <el-select v-model="searchForm.operator" placeholder="Select operator" clearable style="width: 100%">
              <el-option label="Bell" value="Bell" />
              <el-option label="Rogers" value="Rogers" />
              <el-option label="Telus" value="Telus" />
              <el-option label="Shaw" value="Shaw" />
              <el-option label="Other" value="Other" />
            </el-select>
          </div>
          <div class="search-item">
            <label class="search-label">Status</label>
            <el-select v-model="searchForm.status" placeholder="Select status" clearable style="width: 100%">
              <el-option label="Active" value="Active" />
              <el-option label="Inactive" value="Inactive" />
              <el-option label="Suspended" value="Suspended" />
            </el-select>
          </div>
          <div class="search-item">
            <label class="search-label">Address</label>
            <el-input v-model="searchForm.address" placeholder="Enter address keywords" clearable />
          </div>
          <div class="search-actions">
            <el-button type="primary" @click="handleSearch" :icon="Search">Query</el-button>
            <el-button @click="handleReset" :icon="Refresh">Reset</el-button>
          </div>
        </div>
      </div>

      <el-table :data="filteredBroadbandRecords" border stripe class="broadband-table">
        <el-table-column prop="account" label="Account" />
        <el-table-column prop="regDate" label="Reg Date" />
        <el-table-column prop="address" label="Address" />
        <el-table-column prop="operator" label="Operator" />
        <el-table-column prop="status" label="Status" />
        <el-table-column prop="remark" label="Remark" />
      </el-table>
      <el-pagination
        v-model:current-page="currentPage"
        :page-size="pageSize"
        :total="filteredBroadbandRecords.length"
        layout="total, prev, pager, next"
        style="margin-top: 10px;" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search, Refresh } from '@element-plus/icons-vue'

interface BroadbandRecord {
  account: string
  regDate: string
  address: string
  operator: string
  status: string
  remark: string
}

interface Props {
  broadbandRecords: BroadbandRecord[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  toggleSection: []
}>()

const expanded = ref(true)
const currentPage = ref(1)
const pageSize = 3

// 搜索表单
const searchForm = ref({
  operator: '',
  status: '',
  address: ''
})

// 过滤后的宽带记录
const filteredBroadbandRecords = computed(() => {
  let filtered = props.broadbandRecords

  if (searchForm.value.operator) {
    filtered = filtered.filter(record => 
      record.operator.toLowerCase().includes(searchForm.value.operator.toLowerCase())
    )
  }

  if (searchForm.value.status) {
    filtered = filtered.filter(record => 
      record.status.toLowerCase().includes(searchForm.value.status.toLowerCase())
    )
  }

  if (searchForm.value.address) {
    filtered = filtered.filter(record => 
      record.address.toLowerCase().includes(searchForm.value.address.toLowerCase())
    )
  }

  return filtered
})

function toggleSection() {
  expanded.value = !expanded.value
  emit('toggleSection')
}

function handleSearch() {
  currentPage.value = 1
}

function handleReset() {
  searchForm.value = {
    operator: '',
    status: '',
    address: ''
  }
  currentPage.value = 1
}
</script>

<style scoped>
.detail-section {
  background: var(--bg-card);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid var(--border-card);
  box-shadow: 0 2px 8px rgba(59,130,246,0.06);
  margin-bottom: 2rem;
}

.detail-section h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--accent-primary);
}

.collapsible .section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 0;
  margin: 0;
  transition: all 0.3s ease;
}

.collapsible .section-header:hover {
  background: var(--bg-primary);
  border-radius: 8px;
  padding: 0.5rem;
  margin: -0.5rem;
}

.collapsible .section-header h4 {
  margin: 0;
  padding: 0;
  border-bottom: none;
}

.collapse-icon {
  transition: transform 0.3s ease;
  color: var(--text-secondary);
}

.collapse-icon.collapsed {
  transform: rotate(-90deg);
}

.section-content {
  margin-top: 1.5rem;
  overflow: hidden;
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s;
  opacity: 1;
  max-height: 2000px;
}

.section-content.collapsed {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
  margin-top: 0;
  margin-bottom: 0;
}

.search-section {
  margin-bottom: 1rem;
  padding: 1rem;
  background: var(--bg-primary);
  border-radius: 8px;
  border: 1px solid var(--border-card);
}

.search-row {
  display: flex;
  gap: 1rem;
  align-items: end;
  flex-wrap: wrap;
}

.search-item {
  flex: 1;
  min-width: 150px;
}

.search-label {
  display: block;
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.search-actions {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}

.broadband-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background: var(--bg-card, #fff);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(59,130,246,0.06);
}

.broadband-table th,
.broadband-table td {
  border: 1px solid var(--border-card, #e5e7eb);
  padding: 0.75rem 1.2rem;
  text-align: center;
  font-size: 0.95rem;
}

.broadband-table th {
  background: var(--bg-primary, #f9fafb);
  font-weight: 600;
  color: var(--text-primary, #222);
}

.broadband-table td {
  color: var(--text-primary, #222);
}

@media (max-width: 768px) {
  .search-row {
    flex-direction: column;
  }
  
  .search-item {
    min-width: 100%;
  }
  
  .search-actions {
    width: 100%;
    justify-content: center;
  }
}
</style> 