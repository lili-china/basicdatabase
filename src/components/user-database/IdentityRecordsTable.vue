<template>
  <div class="detail-section">
    <h4>Identity Change Information</h4>
    
    <!-- 搜索区域 -->
    <div class="search-section">
      <div class="search-row">
        <div class="search-item">
          <label class="search-label">Change Type</label>
          <el-select v-model="searchForm.changeType" placeholder="Select change type" clearable style="width: 100%">
            <el-option label="Marriage" value="Marriage" />
            <el-option label="Divorce" value="Divorce" />
            <el-option label="Legal" value="Legal" />
            <el-option label="Other" value="Other" />
          </el-select>
        </div>
        <div class="search-item">
          <label class="search-label">Operator</label>
          <el-input v-model="searchForm.operator" placeholder="Enter operator" clearable />
        </div>
        <div class="search-item">
          <label class="search-label">Remark</label>
          <el-input v-model="searchForm.remark" placeholder="Enter remark keywords" clearable />
        </div>
        <div class="search-actions">
          <el-button type="primary" @click="handleSearch" :icon="Search">Query</el-button>
          <el-button @click="handleReset" :icon="Refresh">Reset</el-button>
        </div>
      </div>
    </div>

    <el-table :data="filteredIdentityRecords" border stripe class="identity-change-table">
      <el-table-column label="Avatar">
        <template #default="scope">
          <img :src="scope.row.avatar" style="width:36px;height:36px;border-radius:50%;object-fit:cover;" />
        </template>
      </el-table-column>
      <el-table-column prop="id" label="ID">
        <template #default="scope">
          <span style="color:#409eff;cursor:pointer;" @click="handleIdClick(scope.row.id, $event)">{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="old" label="Old Name" />
      <el-table-column prop="new" label="New Name" />
      <el-table-column prop="date" label="Change Date" />
      <el-table-column prop="type" label="Change Type" />
      <el-table-column prop="operator" label="Operator" />
      <el-table-column prop="remark" label="Remark" />
    </el-table>
    <el-pagination
      v-model:current-page="currentPage"
      :page-size="pageSize"
      :total="filteredIdentityRecords.length"
      layout="total, prev, pager, next"
      style="margin-top: 10px;" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search, Refresh } from '@element-plus/icons-vue'

interface IdentityRecord {
  id: string
  avatar: string
  old: string
  new: string
  date: string
  type: string
  operator: string
  remark: string
}

interface Props {
  identityRecords: IdentityRecord[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  idClick: [id: string, event: MouseEvent]
}>()

// 搜索表单
const searchForm = ref({
  changeType: '',
  operator: '',
  remark: ''
})

const currentPage = ref(1)
const pageSize = 3

// 过滤后的记录
const filteredIdentityRecords = computed(() => {
  let filtered = props.identityRecords

  if (searchForm.value.changeType) {
    filtered = filtered.filter(record => 
      record.type.toLowerCase().includes(searchForm.value.changeType.toLowerCase())
    )
  }

  if (searchForm.value.operator) {
    filtered = filtered.filter(record => 
      record.operator.toLowerCase().includes(searchForm.value.operator.toLowerCase())
    )
  }

  if (searchForm.value.remark) {
    filtered = filtered.filter(record => 
      record.remark.toLowerCase().includes(searchForm.value.remark.toLowerCase())
    )
  }

  return filtered
})

function handleSearch() {
  currentPage.value = 1
}

function handleReset() {
  searchForm.value = {
    changeType: '',
    operator: '',
    remark: ''
  }
  currentPage.value = 1
}

function handleIdClick(id: string, event: MouseEvent) {
  emit('idClick', id, event)
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

.identity-change-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background: var(--bg-card, #fff);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(59,130,246,0.06);
}

.identity-change-table th,
.identity-change-table td {
  border: 1px solid var(--border-card, #e5e7eb);
  padding: 0.75rem 1.2rem;
  text-align: center;
  font-size: 0.95rem;
}

.identity-change-table th {
  background: var(--bg-primary, #f9fafb);
  font-weight: 600;
  color: var(--text-primary, #222);
}

.identity-change-table td {
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