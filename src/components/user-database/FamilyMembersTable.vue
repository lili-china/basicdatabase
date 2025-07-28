<template>
  <div class="detail-section collapsible">
    <div class="section-header" @click="toggleSection">
      <h4>Family Members</h4>
      <svg class="collapse-icon" :class="{ 'collapsed': !expanded }" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="section-content" :class="{ 'collapsed': !expanded }">
      <div class="family-filter-row" style="display:flex;align-items:center;margin-bottom:12px;">
        <el-select v-if="showFamilySelect" v-model="selectedFamily" placeholder="筛选家庭成员" style="width: 180px;">
          <el-option v-for="item in familyListAll" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
        <svg @click.stop="toggleFamilySelect" style="margin-left: 10px; cursor: pointer; vertical-align: middle;" width="22" height="22" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
          <path d="M12 16c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" stroke="currentColor" stroke-width="2"/>
        </svg>
        <img v-if="!showFamilySelect && selectedFamilyAvatar" :src="selectedFamilyAvatar" alt="家庭成员头像" style="width:36px;height:36px;border-radius:8px;margin-left:10px;vertical-align:middle;" @click.stop="toggleFamilySelect" />
        <el-button size="small" style="margin-left:16px;" @click="toggleFamilyGraph">
          {{ showFamilyGraph ? '隐藏家庭关系图' : '显示家庭关系图' }}
        </el-button>
      </div>
      <RelationGraph v-if="showFamilyGraph" :data="familyGraphData" style="margin-bottom:16px;" />
      <el-table :data="familyList" border stripe class="family-table">
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
        <el-table-column prop="name" label="Name">
          <template #default="scope">
            <span style="color:#409eff;cursor:pointer;" @click="handleIdClick(scope.row.id, $event)">{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="relation" label="Relation" />
        <el-table-column prop="age" label="Age" />
        <el-table-column prop="nationality" label="Nationality" />
        <el-table-column prop="phone" label="Phone" />
        <el-table-column prop="remark" label="Remark" />
      </el-table>
      <el-pagination
        v-model:current-page="currentPage"
        :page-size="pageSize"
        :total="familyListAll.length"
        layout="total, prev, pager, next"
        style="margin-top: 10px;" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import RelationGraph from '@/components/RelationGraph.vue'

interface FamilyMember {
  id: string
  avatar: string
  name: string
  relation: string
  age: number
  nationality: string
  phone: string
  remark: string
}

interface Props {
  familyMembers: FamilyMember[]
  currentUserId: string
  currentUserName: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  idClick: [id: string, event: MouseEvent]
  toggleSection: []
}>()

const expanded = ref(true)
const currentPage = ref(1)
const pageSize = 3
const showFamilySelect = ref(true)
const selectedFamily = ref<string | null>(null)
const showFamilyGraph = ref(false)

const familyListAll = computed(() => props.familyMembers)
const familyList = computed(() => 
  familyListAll.value.slice(
    (currentPage.value - 1) * pageSize, 
    currentPage.value * pageSize
  )
)

const selectedFamilyAvatar = computed(() => {
  if (!selectedFamily.value) return null
  const member = familyListAll.value.find(f => f.id === selectedFamily.value)
  return member ? member.avatar : null
})

const familyGraphData = computed(() => {
  // 以当前用户为中心，家庭成员为节点
  const nodes = [
    { id: props.currentUserId, text: props.currentUserName, x: 300, y: 200 }
  ]
  const links: any[] = []
  if (props.familyMembers && props.familyMembers.length) {
    props.familyMembers.forEach((f, idx) => {
      nodes.push({ id: f.id, text: f.name, x: 150 + idx*120, y: 400 })
      links.push({ from: props.currentUserId, to: f.id, text: f.relation })
    })
  }
  return { nodes, links }
})

function toggleSection() {
  expanded.value = !expanded.value
  emit('toggleSection')
}

function toggleFamilySelect() {
  showFamilySelect.value = !showFamilySelect.value
}

function toggleFamilyGraph() {
  showFamilyGraph.value = !showFamilyGraph.value
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

.family-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background: var(--bg-card, #fff);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(59,130,246,0.06);
}

.family-table th,
.family-table td {
  border: 1px solid var(--border-card, #e5e7eb);
  padding: 0.75rem 1.2rem;
  text-align: center;
  font-size: 0.95rem;
}

.family-table th {
  background: var(--bg-primary, #f9fafb);
  font-weight: 600;
  color: var(--text-primary, #222);
}

.family-table td {
  color: var(--text-primary, #222);
}
</style> 