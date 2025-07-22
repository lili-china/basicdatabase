<template>
  <div class="app-container">
    <!-- 导航栏 -->
    <NavigationBar />
    
    <!-- 波浪背景和内容 -->
    <WaveBackground>
      <div class="wave-demo-container">
        
        <!-- 页面标题 -->
        <div class="page-header">
          <h1>Enterprise Database</h1>
          <p>Search and view enterprise information and records</p>
        </div>
        
        <!-- 搜索和筛选区域 -->
        <div class="search-section">
          <div class="search-filters">
            <div class="filter-row">
              <!-- 搜索输入框 -->
              <div class="filter-group">
                <label class="filter-label">Search</label>
                <el-input
                  v-model="pageQuery.searchQuery"
                  placeholder="Search by company name, registration number, or address..."
                  class="filter-input"
                  clearable
                />
              </div>

              <!-- 企业类型下拉框 -->
              <div class="filter-group">
                <label class="filter-label">Company Type</label>
                <el-select v-model="pageQuery.selectedCompanyType" placeholder="Select Company Type" class="filter-input">
                  <el-option label="All Types" value="" />
                  <el-option label="Technology" value="Technology" />
                  <el-option label="Manufacturing" value="Manufacturing" />
                  <el-option label="Finance" value="Finance" />
                  <el-option label="Healthcare" value="Healthcare" />
                  <el-option label="Education" value="Education" />
                  <el-option label="Retail" value="Retail" />
                  <el-option label="Consulting" value="Consulting" />
                </el-select>
              </div>

              <!-- 注册资本范围下拉框 -->
              <div class="filter-group">
                <label class="filter-label">Registered Capital</label>
                <el-select v-model="pageQuery.selectedCapitalRange" placeholder="Select Capital Range" class="filter-input">
                  <el-option label="All Ranges" value="" />
                  <el-option label="Under 1M" value="0-1M" />
                  <el-option label="1M-10M" value="1M-10M" />
                  <el-option label="10M-100M" value="10M-100M" />
                  <el-option label="100M-1B" value="100M-1B" />
                  <el-option label="Over 1B" value="1B+" />
                </el-select>
              </div>

              <!-- 成立年份下拉框 -->
              <div class="filter-group">
                <label class="filter-label">Founded Year</label>
                <el-select v-model="pageQuery.selectedFoundedYear" placeholder="Select Founded Year" class="filter-input">
                  <el-option label="All Years" value="" />
                  <el-option label="2020-2024" value="2020-2024" />
                  <el-option label="2010-2019" value="2010-2019" />
                  <el-option label="2000-2009" value="2000-2009" />
                  <el-option label="1990-1999" value="1990-1999" />
                  <el-option label="Before 1990" value="before-1990" />
                </el-select>
              </div>

              <!-- 状态下拉框 -->
              <div class="filter-group">
                <label class="filter-label">Status</label>
                <el-select v-model="pageQuery.selectedStatus" placeholder="Select Status" class="filter-input">
                  <el-option label="All Status" value="" />
                  <el-option label="Active" value="Active" />
                  <el-option label="Inactive" value="Inactive" />
                  <el-option label="Suspended" value="Suspended" />
                  <el-option label="Dissolved" value="Dissolved" />
                </el-select>
              </div>

              <!-- 操作按钮 -->
              <div class="filter-actions">
                <el-button type="primary" @click="performSearch" class="search-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="search-icon">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Search
                </el-button>
                <el-button @click="resetFilters" class="reset-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="reset-icon">
                    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M3 3v5h5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Reset
                </el-button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 数据卡片网格 -->
        <div class="cards-grid">
          <div v-for="enterprise in paginatedEnterprises" :key="enterprise.id" class="data-card">
            <div class="card-header">
              <div>
                <div class="company-name">{{ enterprise.companyName }}</div>
                <div class="company-type">{{ enterprise.companyType }}</div>
              </div>
              <el-tag :type="getStatusType(enterprise.status)" size="small">{{ enterprise.status }}</el-tag>
            </div>
            <div class="card-body">
              <div class="info-row">
                <span class="label">Registration No.:</span>
                <span class="value">{{ enterprise.registrationNumber }}</span>
              </div>
            </div>
            <div class="card-footer">
              <el-button type="primary" size="small" @click="viewEnterpriseDetail(enterprise)">View</el-button>
            </div>
          </div>
        </div>

        <!-- 分页 -->
        <div class="pagination-section">
          <el-pagination
            v-model:current-page="currentPage"
            :page-size="itemsPerPage"
            :total="filteredEnterprises.length"
            layout="total, sizes, prev, pager, next, jumper"
            :page-sizes="[10, 20, 50, 100]"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          />
        </div>
        
        <!-- 企业详情对话框 -->
        <el-dialog
          v-model="dialogVisible"
          title="Enterprise Details"
          width="80%"
          :before-close="handleClose"
          class="enterprise-detail-dialog"
        >
          <EnterpriseDetail 
            v-if="selectedEnterprise"
            :enterprise-id="selectedEnterprise.id"
            :enterprise-data="selectedEnterprise"
          />
          
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false">Close</el-button>
              <el-button type="primary" @click="exportEnterpriseData">
                Export Data
              </el-button>
            </span>
          </template>
        </el-dialog>
      </div>
    </WaveBackground>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import WaveBackground from '../components/WaveBackground.vue'
import NavigationBar from '../components/NavigationBar.vue'
import { generateMockEnterprises } from '../utils/mockData'
import EnterpriseDetail from '@/components/EnterpriseDetail.vue'

const router = useRouter()

// 使用mock数据
const allEnterprises = ref(generateMockEnterprises())

// 页面查询对象
const pageQuery = ref({
  searchQuery: '',
  selectedCompanyType: '',
  selectedCapitalRange: '',
  selectedFoundedYear: '',
  selectedStatus: ''
})

const currentPage = ref(1)
const itemsPerPage = ref(20)

// 对话框相关状态
const dialogVisible = ref(false)
const selectedEnterprise = ref<any>(null)

// 过滤后的企业列表
const filteredEnterprises = computed(() => {
  let filtered = allEnterprises.value
  
  // 搜索过滤
  if (pageQuery.value.searchQuery) {
    const query = pageQuery.value.searchQuery.toLowerCase()
    filtered = filtered.filter(enterprise => 
      enterprise.companyName.toLowerCase().includes(query) ||
      enterprise.registrationNumber.toLowerCase().includes(query) ||
      enterprise.address.toLowerCase().includes(query) ||
      enterprise.legalRepresentative.toLowerCase().includes(query)
    )
  }
  
  // 企业类型过滤
  if (pageQuery.value.selectedCompanyType) {
    filtered = filtered.filter(enterprise => enterprise.companyType === pageQuery.value.selectedCompanyType)
  }
  
  // 注册资本过滤
  if (pageQuery.value.selectedCapitalRange) {
    const [min, max] = pageQuery.value.selectedCapitalRange.split('-')
    filtered = filtered.filter(enterprise => {
      const capital = parseFloat(enterprise.registeredCapital.replace(/[^\d.]/g, ''))
      if (max === '1M') return capital < 1000000
      if (max === '10M') return capital >= 1000000 && capital < 10000000
      if (max === '100M') return capital >= 10000000 && capital < 100000000
      if (max === '1B') return capital >= 100000000 && capital < 1000000000
      if (max === '+') return capital >= 1000000000
      return true
    })
  }
  
  // 成立年份过滤
  if (pageQuery.value.selectedFoundedYear) {
    const [startYear, endYear] = pageQuery.value.selectedFoundedYear.split('-')
    filtered = filtered.filter(enterprise => {
      const year = parseInt(enterprise.foundedYear)
      if (endYear === '2024') return year >= 2020 && year <= 2024
      if (endYear === '2019') return year >= 2010 && year <= 2019
      if (endYear === '2009') return year >= 2000 && year <= 2009
      if (endYear === '1999') return year >= 1990 && year <= 1999
      if (startYear === 'before') return year < 1990
      return true
    })
  }
  
  // 状态过滤
  if (pageQuery.value.selectedStatus) {
    filtered = filtered.filter(enterprise => enterprise.status === pageQuery.value.selectedStatus)
  }
  
  return filtered
})

// 分页后的企业列表
const paginatedEnterprises = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredEnterprises.value.slice(start, end)
})

// 搜索功能
const performSearch = () => {
  currentPage.value = 1
}

// 重置筛选
const resetFilters = () => {
  pageQuery.value.searchQuery = ''
  pageQuery.value.selectedCompanyType = ''
  pageQuery.value.selectedCapitalRange = ''
  pageQuery.value.selectedFoundedYear = ''
  pageQuery.value.selectedStatus = ''
  currentPage.value = 1
}

// 分页方法
const handleCurrentChange = (page: number) => {
  currentPage.value = page
  // 滚动到页面顶部
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const handleSizeChange = (size: number) => {
  itemsPerPage.value = size
  currentPage.value = 1
}

// 显示企业详情
const showEnterpriseDetail = (enterprise: any) => {
  selectedEnterprise.value = enterprise
  dialogVisible.value = true
}

// 跳转到企业详情页面
const viewEnterpriseDetail = (enterprise: any) => {
  selectedEnterprise.value = enterprise
  dialogVisible.value = true
}

// 关闭对话框
const handleClose = () => {
  dialogVisible.value = false
  selectedEnterprise.value = null
}

// 获取状态类型
const getStatusType = (status: string) => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'warning'
    case 'Suspended': return 'danger'
    case 'Dissolved': return 'info'
    default: return ''
  }
}

// 刷新数据
const refreshData = () => {
  allEnterprises.value = generateMockEnterprises()
  currentPage.value = 1
}

// 导出数据
const exportData = () => {
  const data = filteredEnterprises.value
  const csvContent = generateCSV(data)
  downloadCSV(csvContent, 'enterprise_data.csv')
}

// 导出企业详情数据
const exportEnterpriseData = () => {
  if (selectedEnterprise.value) {
    const csvContent = generateCSV([selectedEnterprise.value])
    downloadCSV(csvContent, `enterprise_${selectedEnterprise.value.id}.csv`)
  }
}

// 生成CSV内容
const generateCSV = (data: any[]) => {
  const headers = ['ID', 'Company Name', 'Registration Number', 'Type', 'Capital', 'Founded', 'Legal Rep.', 'Phone', 'Email', 'Address', 'Status']
  const rows = data.map(item => [
    item.id,
    item.companyName,
    item.registrationNumber,
    item.companyType,
    item.registeredCapital,
    item.foundedYear,
    item.legalRepresentative,
    item.phone,
    item.email,
    item.address,
    item.status
  ])
  
  const csvContent = [headers, ...rows]
    .map(row => row.map(cell => `"${cell}"`).join(','))
    .join('\n')
  
  return csvContent
}

// 下载CSV文件
const downloadCSV = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<style scoped>
/* 企业数据库页面特定样式 */
.wave-demo-container {
  width: 100%;
  max-width: none;
  padding: 2rem 1rem;
  margin: 0;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
  width: 100%;
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

/* 搜索区域样式 */
.search-section {
  margin-bottom: 2rem;
  width: 100%;
}

.search-header {
  margin-bottom: 1rem;
  text-align: center;
}

.search-header h3 {
  font-size: 1.25rem;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.search-filters {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid var(--border-card);
  box-shadow: var(--shadow-card);
  width: 100%;
}

.filter-row {
  display: flex;
  gap: 1rem;
  align-items: end;
  flex-wrap: wrap;
  width: 100%;
}

.filter-group {
  flex: 1;
  min-width: 180px;
  max-width: 200px;
}

.filter-label {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  display: block;
}

.filter-input {
  width: 100%;
}

.filter-actions {
  display: flex;
  gap: 0.75rem;
  flex-shrink: 0;
  min-width: 200px;
}

.search-btn {
  height: 40px;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.search-icon {
  width: 16px;
  height: 16px;
}

.reset-btn {
  height: 40px;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.reset-icon {
  width: 16px;
  height: 16px;
}

/* 表格区域样式 */
.table-section {
  margin-bottom: 2rem;
  width: 100%;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  width: 100%;
}

.table-header h3 {
  font-size: 1.25rem;
  color: var(--text-primary);
  margin: 0;
}

.table-actions {
  display: flex;
  gap: 0.5rem;
}

.table-container {
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid var(--border-card);
  box-shadow: var(--shadow-card);
  overflow: hidden;
  width: 100%;
}

/* 分页区域样式 */
.pagination-section {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  width: 100%;
}

/* 企业详情对话框样式 */
.enterprise-detail {
  color: var(--text-primary);
}

.detail-section {
  margin-bottom: 2rem;
}

.detail-section:last-child {
  margin-bottom: 0;
}

.detail-section h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-card);
}

.detail-section p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

/* 地址和经营范围内容样式 */
.address-content,
.business-scope-content {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--bg-secondary);
  border-radius: 8px;
  border: 1px solid var(--border-card);
  color: var(--text-secondary);
  line-height: 1.6;
}

.address-content svg,
.business-scope-content svg {
  color: var(--accent-primary);
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.address-content span,
.business-scope-content span {
  flex: 1;
}

/* 对话框样式优化 */
:deep(.enterprise-detail-dialog .el-dialog) {
  background: var(--bg-card);
  border: 1px solid var(--border-card);
  border-radius: 16px;
  box-shadow: var(--shadow-dialog);
}

:deep(.enterprise-detail-dialog .el-dialog__header) {
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-card);
  border-radius: 16px 16px 0 0;
  padding: 1.5rem;
}

:deep(.enterprise-detail-dialog .el-dialog__title) {
  color: var(--text-primary);
  font-weight: 600;
  font-size: 1.25rem;
}

:deep(.enterprise-detail-dialog .el-dialog__body) {
  background: var(--bg-card);
  padding: 1.5rem;
  color: var(--text-primary);
}

:deep(.enterprise-detail-dialog .el-dialog__footer) {
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-card);
  border-radius: 0 0 16px 16px;
  padding: 1.5rem;
}

/* 描述列表样式优化 */
:deep(.enterprise-descriptions .el-descriptions__header) {
  color: var(--text-primary);
}

:deep(.enterprise-descriptions .el-descriptions__body) {
  background: var(--bg-card);
}

:deep(.enterprise-descriptions .el-descriptions__table) {
  background: var(--bg-card);
}

:deep(.enterprise-descriptions .el-descriptions__cell) {
  background: var(--bg-card);
  color: var(--text-primary);
  border-color: var(--border-card);
}

:deep(.enterprise-descriptions .el-descriptions__label) {
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-weight: 600;
  border-color: var(--border-card);
}

:deep(.enterprise-descriptions .el-descriptions__content) {
  color: var(--text-secondary);
}

/* 标签样式优化 */
:deep(.el-tag) {
  border-radius: 6px;
  font-weight: 500;
}

:deep(.el-tag--success) {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  border-color: rgba(34, 197, 94, 0.2);
}

:deep(.el-tag--warning) {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
  border-color: rgba(245, 158, 11, 0.2);
}

:deep(.el-tag--danger) {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border-color: rgba(239, 68, 68, 0.2);
}

:deep(.el-tag--info) {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  border-color: rgba(59, 130, 246, 0.2);
}

/* 表格样式覆盖 */
:deep(.el-table) {
  background: transparent;
}

:deep(.el-table th) {
  background: var(--bg-secondary) !important;
  color: var(--text-primary) !important;
  border-color: var(--border-card);
}

:deep(.el-table td) {
  background: var(--bg-card) !important;
  color: var(--text-primary) !important;
  border-color: var(--border-card);
}

:deep(.el-table--striped .el-table__body tr.el-table__row--striped td) {
  background: var(--bg-secondary) !important;
}

:deep(.el-table--enable-row-hover .el-table__body tr:hover > td) {
  background: var(--accent-secondary) !important;
}

:deep(.el-table__body tr.current-row > td) {
  background: var(--accent-primary) !important;
  color: white !important;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  max-width: 1400px;
  margin: 0 auto 2rem auto;
}
.data-card {
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 1.25rem;
  border: 1px solid var(--border-card);
  box-shadow: var(--shadow-card);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 180px;
}
.data-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-secondary);
  cursor: pointer;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.company-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
}
.company-type {
  font-size: 0.9rem;
  color: var(--text-secondary);
}
.card-body {
  margin-bottom: 1rem;
}
.info-row {
  display: flex;
  gap: 0.5rem;
  font-size: 0.95rem;
  color: var(--text-primary);
}
.label {
  color: var(--text-secondary);
}
.value {
  color: var(--text-primary);
  font-weight: 600;
}
.card-footer {
  display: flex;
  justify-content: flex-end;
}
</style> 