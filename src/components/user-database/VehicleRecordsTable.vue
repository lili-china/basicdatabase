<template>
  <div class="detail-section collapsible">
    <div class="section-header" @click="toggleSection">
      <h4>Vehicle Registration Information</h4>
      <svg class="collapse-icon" :class="{ 'collapsed': !expanded }" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="section-content" :class="{ 'collapsed': !expanded }">
      <el-table :data="vehicleList" border stripe class="vehicle-table">
        <el-table-column prop="plate" label="Plate" />
        <el-table-column prop="type" label="Type" />
        <el-table-column prop="regDate" label="Reg Date" />
        <el-table-column prop="owner" label="Owner" />
        <el-table-column prop="status" label="Status" />
        <el-table-column prop="remark" label="Remark" />
      </el-table>
      <el-pagination
        v-model:current-page="currentPage"
        :page-size="pageSize"
        :total="vehicleListAll.length"
        layout="total, prev, pager, next"
        style="margin-top: 10px;" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface VehicleRecord {
  plate: string
  type: string
  regDate: string
  owner: string
  status: string
  remark: string
}

interface Props {
  vehicleRecords: VehicleRecord[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  toggleSection: []
}>()

const expanded = ref(true)
const currentPage = ref(1)
const pageSize = 3

const vehicleListAll = computed(() => props.vehicleRecords)
const vehicleList = computed(() => 
  vehicleListAll.value.slice(
    (currentPage.value - 1) * pageSize, 
    currentPage.value * pageSize
  )
)

function toggleSection() {
  expanded.value = !expanded.value
  emit('toggleSection')
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

.vehicle-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background: var(--bg-card, #fff);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(59,130,246,0.06);
}

.vehicle-table th,
.vehicle-table td {
  border: 1px solid var(--border-card, #e5e7eb);
  padding: 0.75rem 1.2rem;
  text-align: center;
  font-size: 0.95rem;
}

.vehicle-table th {
  background: var(--bg-primary, #f9fafb);
  font-weight: 600;
  color: var(--text-primary, #222);
}

.vehicle-table td {
  color: var(--text-primary, #222);
}
</style> 