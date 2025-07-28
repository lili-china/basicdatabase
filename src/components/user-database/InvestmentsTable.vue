<template>
  <div class="investment-content">
    
    <!-- 搜索条件区域 -->
    <!-- <div class="search-section">
      <el-row :gutter="16">
        <el-col :span="8">
          <el-input
            v-model="searchForm.companyName"
            placeholder="Company Name"
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
            <el-option label="Pending" value="Pending" />
            <el-option label="Closed" value="Closed" />
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
    </div> -->

    <div class="table-container">
      <el-table 
        :data="filteredCompanies" 
        style="width: 100%"
        @row-click="handleCompanyClick"
        class="company-table"
      >
        <el-table-column prop="companyName" label="Company Name" min-width="150" />
        <el-table-column prop="industry" label="Industry" min-width="120" />
        <el-table-column prop="totalInvestment" label="Total Investment" min-width="120" />
        <el-table-column prop="investorCount" label="Investor Count" min-width="100" />
        <el-table-column prop="status" label="Status" min-width="100">
          <template #default="scope">
            <el-tag :type="getStatusType(scope.row.status)" size="small">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="investmentDate" label="Investment Date" min-width="120" />
        <el-table-column label="Actions" width="100">
          <template #default="scope">
            <el-button 
              type="primary" 
              size="small" 
              @click.stop="toggleCompanyDetail(scope.row)"
            >
              {{ expandedCompanies.includes(scope.row.id) ? 'Collapse' : 'Expand' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <!-- 公司详情展开区域 -->
      <div 
        v-for="company in companies" 
        :key="company.id"
        v-show="expandedCompanies.includes(company.id)"
        class="company-detail-section"
      >
        <div class="detail-header">
          <h4>{{ company.companyName }} - Investment Details</h4>
          <div class="detail-summary">
            <span class="summary-item">
              <strong>Total Investment:</strong> {{ company.totalInvestment }}
            </span>
            <span class="summary-item">
              <strong>Investors:</strong> {{ company.investors.length }}
            </span>
            <span class="summary-item">
              <strong>Industry:</strong> {{ company.industry }}
            </span>
          </div>
        </div>
        
        <div class="detail-content">
          <!-- 投资人信息表格 -->
          <div class="investors-section">
            <h5>Investor Information</h5>
            <el-table :data="company.investors" style="width: 100%">
              <el-table-column prop="id" label="ID" width="100" />
              <el-table-column label="Investor" min-width="200">
                <template #default="scope">
                  <div class="investor-info">
                    <el-avatar 
                      :src="scope.row.avatar" 
                      :size="40"
                      class="investor-avatar"
                    />
                    <span class="investor-name">{{ scope.row.name }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="shares" label="Shares" width="100" />
              <el-table-column prop="investmentAmount" label="Investment Amount" min-width="150" />
              <el-table-column prop="percentage" label="Ownership %" width="120" />
              <el-table-column prop="investmentDate" label="Investment Date" min-width="120" />
            </el-table>
          </div>
          
          <!-- 饼状图 -->
          <div class="chart-section">
            <h5>Investment Distribution</h5>
            <div class="chart-container">
              <div 
                :id="`chart-${company.id}`" 
                style="height: 400px; width: 100%;"
              ></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 分页组件 -->
      <!-- <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="filteredCompanies.length"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, reactive, onMounted, nextTick } from 'vue'
import * as echarts from 'echarts'

interface Investor {
  id: string
  name: string
  avatar: string
  shares: number
  investmentAmount: string
  percentage: number
  investmentDate: string
}

interface Company {
  id: string
  companyName: string
  industry: string
  totalInvestment: string
  investorCount: number
  status: string
  investmentDate: string
  investors: Investor[]
}

interface Props {
  userId: string
}

const props = defineProps<Props>()

// 搜索表单
const searchForm = reactive({
  companyName: '',
  status: '',
  dateRange: [] as string[]
})

// 分页状态
const currentPage = ref(1)
const pageSize = ref(10)

// 展开的公司ID列表
const expandedCompanies = ref<string[]>([])

// 公司数据
const companies = ref<Company[]>([
  {
    id: '1',
    companyName: 'TechCorp Solutions',
    industry: 'Technology',
    totalInvestment: '$2,500,000',
    investorCount: 5,
    status: 'Active',
    investmentDate: '2023-06-15',
    investors: [
      {
        id: 'INV-001',
        name: 'John Smith',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        shares: 10000,
        investmentAmount: '$500,000',
        percentage: 20,
        investmentDate: '2023-06-15'
      },
      {
        id: 'INV-002',
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        shares: 8000,
        investmentAmount: '$400,000',
        percentage: 16,
        investmentDate: '2023-06-20'
      },
      {
        id: 'INV-003',
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        shares: 12000,
        investmentAmount: '$600,000',
        percentage: 24,
        investmentDate: '2023-07-01'
      },
      {
        id: 'INV-004',
        name: 'Emily Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        shares: 15000,
        investmentAmount: '$750,000',
        percentage: 30,
        investmentDate: '2023-07-15'
      },
      {
        id: 'INV-005',
        name: 'David Wilson',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        shares: 5000,
        investmentAmount: '$250,000',
        percentage: 10,
        investmentDate: '2023-08-01'
      }
    ]
  },
  {
    id: '2',
    companyName: 'Green Energy Ltd',
    industry: 'Renewable Energy',
    totalInvestment: '$1,800,000',
    investorCount: 3,
    status: 'Active',
    investmentDate: '2023-09-10',
    investors: [
      {
        id: 'INV-006',
        name: 'Lisa Brown',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        shares: 15000,
        investmentAmount: '$900,000',
        percentage: 50,
        investmentDate: '2023-09-10'
      },
      {
        id: 'INV-007',
        name: 'Robert Davis',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face',
        shares: 9000,
        investmentAmount: '$540,000',
        percentage: 30,
        investmentDate: '2023-09-20'
      },
      {
        id: 'INV-008',
        name: 'Jennifer Lee',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
        shares: 6000,
        investmentAmount: '$360,000',
        percentage: 20,
        investmentDate: '2023-10-05'
      }
    ]
  },
  {
    id: '3',
    companyName: 'HealthTech Innovations',
    industry: 'Healthcare',
    totalInvestment: '$3,200,000',
    investorCount: 4,
    status: 'Active',
    investmentDate: '2023-11-01',
    investors: [
      {
        id: 'INV-009',
        name: 'Alex Thompson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        shares: 20000,
        investmentAmount: '$1,200,000',
        percentage: 37.5,
        investmentDate: '2023-11-01'
      },
      {
        id: 'INV-010',
        name: 'Maria Garcia',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        shares: 16000,
        investmentAmount: '$960,000',
        percentage: 30,
        investmentDate: '2023-11-15'
      },
      {
        id: 'INV-011',
        name: 'James Miller',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        shares: 12000,
        investmentAmount: '$720,000',
        percentage: 22.5,
        investmentDate: '2023-12-01'
      },
      {
        id: 'INV-012',
        name: 'Amanda White',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        shares: 8000,
        investmentAmount: '$320,000',
        percentage: 10,
        investmentDate: '2023-12-15'
      }
    ]
  }
])

// 过滤后的公司列表
const filteredCompanies = computed(() => {
  let filtered = companies.value

  if (searchForm.companyName) {
    filtered = filtered.filter(company => 
      company.companyName.toLowerCase().includes(searchForm.companyName.toLowerCase())
    )
  }

  if (searchForm.status) {
    filtered = filtered.filter(company => company.status === searchForm.status)
  }

  return filtered
})

const getStatusType = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
      return 'success'
    case 'pending':
      return 'warning'
    case 'closed':
      return 'info'
    default:
      return 'info'
  }
}





// 生成饼状图配置
const getPieChartOption = (company: Company) => {
  const data = company.investors.map(investor => ({
    name: investor.name,
    value: investor.percentage
  }))

  return {
    title: {
      text: 'Investment Distribution',
      left: 'center',
      textStyle: {
        color: 'var(--text-primary)',
        fontSize: 16,
        fontWeight: 600
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c}% ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      textStyle: {
        color: 'var(--text-primary)'
      }
    },
    series: [
      {
        name: 'Investment Share',
        type: 'pie',
        radius: '50%',
        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        label: {
          formatter: '{b}: {c}%'
        }
      }
    ]
  }
}

// 初始化图表
const initChart = (company: Company) => {
  nextTick(() => {
    const chartDom = document.getElementById(`chart-${company.id}`)
    if (chartDom) {
      const myChart = echarts.init(chartDom)
      const option = getPieChartOption(company)
      myChart.setOption(option as any)
      
      // 监听窗口大小变化
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    }
  })
}

// 处理公司点击
const handleCompanyClick = (row: Company) => {
  toggleCompanyDetail(row)
}

// 切换公司详情展开状态
const toggleCompanyDetail = (company: Company) => {
  const index = expandedCompanies.value.indexOf(company.id)
  if (index > -1) {
    // 如果当前公司已展开，则收起
    expandedCompanies.value.splice(index, 1)
  } else {
    // 如果当前公司未展开，则先清空所有展开的公司，再展开当前公司
    expandedCompanies.value = [company.id]
    // 初始化图表
    initChart(company)
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
}
</script>

<style scoped>
.investment-content {
  padding: 0;
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

.company-table {
  cursor: pointer;
}

.company-table .el-table__row:hover {
  background-color: var(--bg-secondary);
}

/* 公司详情展开区域样式 */
.company-detail-section {
  /* margin: 1rem 0; */
  padding: 1.5rem 0;
  background: var(--bg-card);
  /* border-radius: 12px; */
  /* border: 1px solid var(--border-card); */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.detail-header {
  margin-bottom: 1.5rem;
}

.detail-header h4 {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 1rem 0;
  border-bottom: 2px solid var(--accent-primary);
  padding-bottom: 0.5rem;
}

.detail-summary {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.summary-item {
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.summary-item strong {
  color: var(--text-primary);
}

.detail-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.investors-section,
.chart-section {
  background: var(--bg-primary);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--border-card);
}

.investors-section h5,
.chart-section h5 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 1rem 0;
}

.chart-container {
  background: var(--bg-card);
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid var(--border-card);
}

.pagination-container {
  padding: 1rem;
  display: flex;
  justify-content: center;
  background: var(--bg-primary);
  border-top: 1px solid var(--border-primary);
}

/* 投资人信息样式 */
.investor-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.investor-avatar {
  border: 2px solid var(--border-card);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.investor-name {
  font-weight: 500;
  color: var(--text-primary);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .detail-content {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

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
  
  .detail-summary {
    flex-direction: column;
    gap: 0.5rem;
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