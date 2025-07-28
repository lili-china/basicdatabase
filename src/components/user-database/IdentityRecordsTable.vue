<template>
  <div class="detail-section">
    <h4>Identity Change Information</h4>
    <el-table :data="identityChangeList" border stripe class="identity-change-table">
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
      :total="identityChangeListAll.length"
      layout="total, prev, pager, next"
      style="margin-top: 10px;" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

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

const currentPage = ref(1)
const pageSize = 3

const identityChangeListAll = computed(() => props.identityRecords)
const identityChangeList = computed(() => 
  identityChangeListAll.value.slice(
    (currentPage.value - 1) * pageSize, 
    currentPage.value * pageSize
  )
)

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
</style> 