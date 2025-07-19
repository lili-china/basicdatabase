<template>
  <div class="info-section">
    <h3>Family Members</h3>
    
    <!-- 搜索条件区域 -->
    <div class="search-section">
      <el-row :gutter="16">
        <el-col :span="8">
          <el-input
            v-model="searchForm.name"
            placeholder="Name"
            clearable
            @input="handleSearch"
          />
        </el-col>
        <el-col :span="8">
          <el-select
            v-model="searchForm.relationship"
            placeholder="Relationship"
            clearable
            @change="handleSearch"
            style="width: 100%"
          >
            <el-option label="Spouse" value="Spouse" />
            <el-option label="Daughter" value="Daughter" />
            <el-option label="Son" value="Son" />
            <el-option label="Father" value="Father" />
            <el-option label="Mother" value="Mother" />
            <el-option label="Sister" value="Sister" />
            <el-option label="Brother" value="Brother" />
          </el-select>
        </el-col>
        <el-col :span="8">
          <el-select
            v-model="searchForm.emergencyContact"
            placeholder="Emergency Contact"
            clearable
            @change="handleSearch"
            style="width: 100%"
          >
            <el-option label="Yes" :value="true" />
            <el-option label="No" :value="false" />
          </el-select>
        </el-col>
      </el-row>
    </div>

    <div class="table-container">
      <el-table :data="paginatedMembers" style="width: 100%">
        <el-table-column prop="name" label="Name" min-width="120" />
        <el-table-column prop="relationship" label="Relationship" min-width="100" />
        <el-table-column prop="age" label="Age" min-width="80" />
        <el-table-column prop="occupation" label="Occupation" min-width="120" />
        <el-table-column prop="phone" label="Phone" min-width="140" />
        <el-table-column prop="address" label="Address" min-width="200" />
        <el-table-column prop="emergencyContact" label="Emergency Contact" min-width="100">
          <template #default="scope">
            <el-tag v-if="scope.row.emergencyContact" type="success" size="small">Yes</el-tag>
            <el-tag v-else type="info" size="small">No</el-tag>
          </template>
        </el-table-column>
      </el-table>
      
      <!-- 分页组件 -->
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="filteredMembers.length"
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

interface FamilyMember {
  name: string
  relationship: string
  age: number
  occupation: string
  phone: string
  address: string
  emergencyContact: boolean
}

interface Props {
  userId: string
}

const props = defineProps<Props>()

// 搜索表单
const searchForm = reactive({
  name: '',
  relationship: '',
  emergencyContact: null as boolean | null
})

// 分页状态
const currentPage = ref(1)
const pageSize = ref(10)

// 原始数据
const originalMembers = [
  {
    name: 'Lisa Johnson',
    relationship: 'Spouse',
    age: 26,
    occupation: 'Marketing Manager',
    phone: '+1 (555) 111-2222',
    address: '123 Maple Street, Toronto, ON M5V 2H1, Canada',
    emergencyContact: true
  },
  {
    name: 'Emma Johnson',
    relationship: 'Daughter',
    age: 8,
    occupation: 'Student',
    phone: 'N/A',
    address: '123 Maple Street, Toronto, ON M5V 2H1, Canada',
    emergencyContact: false
  },
  {
    name: 'Robert Johnson',
    relationship: 'Father',
    age: 65,
    occupation: 'Retired',
    phone: '+1 (555) 333-4444',
    address: '456 Oak Avenue, Vancouver, BC V6B 1A1, Canada',
    emergencyContact: true
  },
  {
    name: 'Mary Johnson',
    relationship: 'Mother',
    age: 62,
    occupation: 'Nurse',
    phone: '+1 (555) 555-6666',
    address: '456 Oak Avenue, Vancouver, BC V6B 1A1, Canada',
    emergencyContact: true
  },
  {
    name: 'James Johnson',
    relationship: 'Brother',
    age: 30,
    occupation: 'Software Engineer',
    phone: '+1 (555) 777-8888',
    address: '789 Pine Street, Montreal, QC H2Y 1C6, Canada',
    emergencyContact: false
  }
]

// 过滤后的成员
const filteredMembers = computed(() => {
  return originalMembers.filter(member => {
    const nameMatch = !searchForm.name || member.name.toLowerCase().includes(searchForm.name.toLowerCase())
    const relationshipMatch = !searchForm.relationship || member.relationship === searchForm.relationship
    const emergencyMatch = searchForm.emergencyContact === null || member.emergencyContact === searchForm.emergencyContact
    
    return nameMatch && relationshipMatch && emergencyMatch
  })
})

// 分页后的成员
const paginatedMembers = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredMembers.value.slice(start, end)
})

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