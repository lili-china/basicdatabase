<template>
  <div class="enterprise-detail">
    <!-- Enterprise Information -->
    <div class="info-section">
      <h3>Enterprise Information</h3>
      
      <!-- Enterprise Basic Information -->
      <div class="basic-info">
        <div class="company-avatar-large">
          <div class="avatar-placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
        <div class="basic-details">
          <div class="detail-group">
            <h4 class="group-title">Company Information</h4>
            <div class="detail-row">
              <span class="label">Company Name:</span>
              <span class="value">{{ enterpriseInfo.name }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Credit Code:</span>
              <span class="value">{{ enterpriseInfo.creditCode }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Registered Capital:</span>
              <span class="value">{{ enterpriseInfo.registeredCapital }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Establishment Date:</span>
              <span class="value">{{ enterpriseInfo.establishDate }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Company Type:</span>
              <span class="value">{{ enterpriseInfo.type }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Business Status:</span>
              <span class="value">
                <span class="status-badge" :class="enterpriseInfo.status">
                  {{ enterpriseInfo.statusText }}
                </span>
              </span>
            </div>
          </div>
          
          <div class="detail-group">
            <h4 class="group-title">Contact Information</h4>
            <div class="detail-row">
              <span class="label">Registered Address:</span>
              <span class="value">{{ enterpriseInfo.address }}</span>
            </div>
            <div class="detail-row">
              <span class="label">Business Scope:</span>
              <span class="value">{{ enterpriseInfo.businessScope }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Shareholder Information -->
      <div class="shareholders-container">
        <!-- Major Shareholder Information -->
        <div class="major-shareholder-section">
          <h4>Major Shareholder</h4>
          <div class="major-shareholder">
            <div class="shareholder-card major">
              <div class="shareholder-avatar">
                <div class="avatar-placeholder">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
              <div class="shareholder-info">
                <div class="shareholder-name">{{ majorShareholder.name }}</div>
                <div class="shareholder-type">{{ majorShareholder.type }}</div>
                <div class="shareholder-id">ID: {{ majorShareholder.idNumber }}</div>
              </div>
              <div class="shareholder-shares">
                <div class="shares-amount">{{ majorShareholder.shares }}</div>
                <div class="shares-percentage">{{ majorShareholder.percentage }}%</div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Shareholders List -->
        <div class="shareholders-list-section">
          <h4>All Shareholders</h4>
          <div class="shareholders-table-container">
            <el-table 
              :data="shareholders" 
              style="width: 100%"
              class="shareholders-table"
              :header-cell-style="{ 
                backgroundColor: 'var(--bg-secondary)', 
                color: 'var(--text-primary)',
                fontWeight: '600',
                fontSize: '0.875rem'
              }"
              :cell-style="{ 
                backgroundColor: 'var(--bg-primary)', 
                color: 'var(--text-primary)',
                fontSize: '0.875rem'
              }"
            >
              <el-table-column label="Shareholder" width="200">
                <template #default="scope">
                  <div class="shareholder-cell">
                    <div class="shareholder-avatar small">
                      <div class="avatar-placeholder">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                          <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </div>
                    </div>
                    <div class="shareholder-details">
                      <div class="shareholder-name">{{ scope.row.name }}</div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="type" label="Type" width="120" />
              <el-table-column prop="shares" label="Shares" width="150">
                <template #default="scope">
                  <span class="shares-amount-table">{{ scope.row.shares }}</span>
                </template>
              </el-table-column>
              <el-table-column label="Percentage" width="150">
                <template #default="scope">
                  <div class="shares-percentage">
                    <div class="percentage-bar">
                      <div 
                        class="percentage-fill" 
                        :style="{ width: scope.row.percentage + '%' }"
                      ></div>
                    </div>
                    <span class="percentage-text">{{ scope.row.percentage }}%</span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>

      <!-- Organizational Structure Chart -->
      <div class="org-chart-section">
        <h4>Organizational Structure Chart</h4>
        <div class="org-chart-container">
          <div class="org-chart">
            <!-- Main Company -->
            <div class="org-node main-company">
              <div class="node-avatar">
                <div class="avatar-placeholder">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
              <div class="node-content">
                <div class="node-title">{{ enterpriseInfo.name }}</div>
                <div class="node-subtitle">Main Company</div>
              </div>
            </div>
            
            <!-- Shareholders Level -->
            <div class="shareholders-level">
              <div 
                v-for="shareholder in shareholders.slice(0, 5)" 
                :key="shareholder.id"
                class="org-node shareholder-node"
                :class="{ 'major': shareholder.percentage > 20 }"
              >
                <div class="node-avatar">
                  <div class="avatar-placeholder">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                </div>
                <div class="node-content">
                  <div class="node-title">{{ shareholder.name }}</div>
                  <div class="node-subtitle">{{ shareholder.percentage }}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

// Props定义
interface Props {
  enterpriseId?: string | number
  enterpriseData?: any
}

const props = withDefaults(defineProps<Props>(), {
  enterpriseId: '',
  enterpriseData: null
})

// 格式化数字为千分位
const formatNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// 格式化股份数量
const formatShares = (shares: string): string => {
  // 提取数字部分
  const match = shares.match(/(\d+(?:\.\d+)?)\s*(Million|Thousand|Shares)/i)
  if (match) {
    const number = parseFloat(match[1])
    const unit = match[2]
    const formattedNumber = formatNumber(number)
    return `${formattedNumber} ${unit}`
  }
  return shares
}

// Enterprise basic information
const enterpriseInfo = ref({
  name: 'Beijing Technology Co., Ltd.',
  creditCode: '91110000123456789X',
  registeredCapital: '10,000,000 CNY',
  establishDate: '2020-03-15',
  type: 'Limited Liability Company',
  status: 'active',
  statusText: 'Active',
  address: 'No. 1 Jianguomenwai Street, Chaoyang District, Beijing',
  businessScope: 'Technology development, technology consulting, technology services; software development; computer system services; data processing; basic software services; application software services; sales of computers, software and auxiliary equipment.'
})

// Major shareholder information
const majorShareholder = ref({
  name: 'Zhang San',
  type: 'Individual',
  idNumber: '110101199001011234',
  shares: '5,000,000 Shares',
  percentage: 50
})

// Shareholders list
const shareholders = ref([
  {
    id: 1,
    name: 'Zhang San',
    type: 'Individual',
    shares: '5,000,000 Shares',
    percentage: 50
  },
  {
    id: 2,
    name: 'Li Si',
    type: 'Individual',
    shares: '2,000,000 Shares',
    percentage: 20
  },
  {
    id: 3,
    name: 'Wang Wu',
    type: 'Individual',
    shares: '1,500,000 Shares',
    percentage: 15
  },
  {
    id: 4,
    name: 'Zhao Liu',
    type: 'Individual',
    shares: '1,000,000 Shares',
    percentage: 10
  },
  {
    id: 5,
    name: 'Qian Qi',
    type: 'Individual',
    shares: '500,000 Shares',
    percentage: 5
  }
])

// Watch props changes and update enterprise information
watch(() => props.enterpriseData, (newData) => {
  if (newData) {
    // Update enterprise information based on passed data
    enterpriseInfo.value = {
      name: newData.companyName || enterpriseInfo.value.name,
      creditCode: newData.registrationNumber || enterpriseInfo.value.creditCode,
      registeredCapital: newData.registeredCapital ? formatShares(newData.registeredCapital) : enterpriseInfo.value.registeredCapital,
      establishDate: newData.foundedYear ? `${newData.foundedYear}-01-01` : enterpriseInfo.value.establishDate,
      type: newData.companyType || enterpriseInfo.value.type,
      status: newData.status === 'Active' ? 'active' : 'inactive',
      statusText: newData.status || enterpriseInfo.value.statusText,
      address: newData.address || enterpriseInfo.value.address,
      businessScope: newData.businessScope || enterpriseInfo.value.businessScope
    }
  }
}, { immediate: true })

onMounted(() => {
  console.log('EnterpriseDetail: Component loaded', props.enterpriseId, props.enterpriseData)
})
</script>

<style scoped>
.enterprise-detail {
  background: var(--bg-primary);
  padding: 0;
  height: auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* 信息区块 */
.info-section {
  background: var(--bg-tertiary);
  border-radius: 12px;
  padding: 2rem;
  border: 1px solid var(--border-primary);
  height: auto;
  min-height: 0;
  flex-shrink: 0;
}

.info-section h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 2rem 0;
  border-bottom: 2px solid var(--accent-secondary);
  padding-bottom: 0.5rem;
}

.info-section h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 1rem 0;
}

/* 基本信息 */
.basic-info {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.company-avatar-large {
  width: 200px;
  height: 150px;
  border-radius: 16px;
  background: var(--accent-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 4px solid rgba(59, 130, 246, 0.3);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.company-avatar-large .avatar-placeholder {
  color: white;
  font-size: 1.5rem;
}

.basic-details {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.detail-group {
  background: var(--bg-secondary);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--border-primary);
}

.group-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.75rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border-primary);
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-row .label {
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
}

.detail-row .value {
  color: var(--text-primary);
  font-size: 0.875rem;
  font-weight: 600;
  text-align: right;
  max-width: 60%;
  word-break: break-word;
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 600;
}

.status-badge.active {
  background: #10b981;
  color: white;
}

.status-badge.inactive {
  background: #ef4444;
  color: white;
}

/* 股东信息 */
.shareholders-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  height: auto;
  min-height: 0;
  margin-bottom: 2rem;
}

.major-shareholder-section {
  background: var(--bg-secondary);
  border: 1px solid var(--border-primary);
  border-radius: 8px;
  padding: 1.5rem;
  height: auto;
}

.major-shareholder {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-primary);
  border-radius: 8px;
  border: 1px solid var(--border-primary);
}

.major-shareholder.major {
  background: var(--bg-secondary);
  border-color: var(--border-primary);
}

.shareholders-list-section {
  height: auto;
  min-height: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.shareholders-table-container {
  height: auto;
  min-height: 0;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.shareholders-table-container .el-table {
  flex: 1;
  height: auto;
  min-height: 300px;
}

.shareholder-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--accent-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.shareholder-avatar.small {
  width: 32px;
  height: 32px;
}

.shareholder-info {
  flex: 1;
  min-width: 0;
}

.shareholder-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.shareholder-type {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
}

.shareholder-id {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.shareholder-shares {
  text-align: right;
}

.shares-amount {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--accent-primary);
  margin-bottom: 0.25rem;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  letter-spacing: 0.5px;
}

.shares-percentage {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent-primary);
}

/* 股东表格 */
.shareholder-cell {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.shareholder-details {
  flex: 1;
}

.shares-amount-table {
  font-weight: 600;
  color: var(--accent-primary);
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  letter-spacing: 0.5px;
  font-size: 1rem;
}

.shares-percentage {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.percentage-bar {
  flex: 1;
  height: 6px;
  background: var(--bg-secondary);
  border-radius: 3px;
  overflow: hidden;
}

.percentage-fill {
  height: 100%;
  background: var(--accent-primary);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.percentage-text {
  font-weight: 600;
  color: var(--accent-primary);
  min-width: 40px;
  text-align: right;
  font-size: 1rem;
}

/* Element Plus 表格样式覆盖 */
.shareholders-table :deep(.el-table) {
  background-color: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: 8px;
  overflow: hidden;
  width: 100% !important;
}

.shareholders-table :deep(.el-table__header) {
  background-color: var(--bg-secondary);
}

.shareholders-table :deep(.el-table__header th) {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
  font-weight: 600;
  font-size: 0.875rem;
  border-bottom: 1px solid var(--border-primary);
}

.shareholders-table :deep(.el-table__body td) {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-size: 0.875rem;
  border-bottom: 1px solid var(--border-secondary);
}

.shareholders-table :deep(.el-table__body tr:hover > td) {
  background-color: var(--bg-secondary);
}

.shareholders-table :deep(.el-table__body tr:last-child td) {
  border-bottom: none;
}

/* 组织架构图 */
.org-chart-section {
  background: var(--bg-secondary);
  border-radius: 8px;
  padding: 2rem;
  border: 1px solid var(--border-primary);
  width: 100%;
}

.org-chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 1rem;
  background: var(--bg-primary);
  border-radius: 8px;
  border: 1px solid var(--border-primary);
}

.org-chart {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.org-node {
  background: var(--bg-primary);
  border: 1px solid var(--border-primary);
  border-radius: 8px;
  padding: 1.5rem;
  min-width: 200px;
  text-align: center;
  box-shadow: none;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.org-node:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.org-node.main-company {
  background: var(--accent-primary);
  color: white;
  border-color: var(--accent-primary);
}

.org-node .node-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--accent-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.org-node .node-avatar .avatar-placeholder {
  color: white;
  font-size: 1.5rem;
}

.org-node.main-company .node-avatar {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.shareholders-level {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.shareholder-node {
  background: var(--bg-primary);
  border-color: var(--border-primary);
}

.shareholder-node.major {
  background: var(--bg-secondary);
  border-color: var(--border-primary);
}

.shareholder-node.major .node-avatar {
  background: var(--accent-primary);
}

.node-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.node-title {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.2;
  word-break: break-word;
}

.node-subtitle {
  font-size: 0.875rem;
  opacity: 0.8;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .basic-info {
    flex-direction: column;
    gap: 1rem;
  }
  
  .company-avatar-large {
    width: 100%;
    height: 200px;
  }
  
  .basic-details {
    grid-template-columns: 1fr;
  }
  
  .detail-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
  
  .detail-row .value {
    text-align: left;
    max-width: 100%;
  }
  
  .major-shareholder {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .shareholder-avatar {
    width: 60px;
    height: 60px;
  }
  
  .shareholders-level {
    flex-direction: column;
    align-items: center;
  }
  
  .org-node {
    min-width: 150px;
    padding: 1rem;
  }
  
  .org-node .node-avatar {
    width: 32px;
    height: 32px;
  }
  
  .org-node .node-avatar .avatar-placeholder svg {
    width: 16px;
    height: 16px;
  }
  
  .info-section {
    padding: 1rem;
  }
}

/* 响应式布局 */
@media (max-width: 768px) {
  .shareholders-container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .major-shareholder-section {
    order: 1;
  }
  
  .shareholders-list-section {
    order: 2;
  }
  
  .org-chart-section {
    order: 3;
  }
}
</style> 