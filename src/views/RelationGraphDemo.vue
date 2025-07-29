<template>
  <div class="relation-graph-demo">
    <div class="demo-header">
      <h1>Relationship Graph Demo</h1>
      <p>This is a demo page showing how to use the RelationGraph component</p>
    </div>
    
    <div class="demo-controls">
      <el-button @click="loadSampleData" type="primary">
        Load Sample Data
      </el-button>
      <el-button @click="clearGraph" type="warning">
        Clear Graph
      </el-button>
      <el-button @click="addRandomNode" type="success">
        Add Random Node
      </el-button>
    </div>
    
    <div class="graph-wrapper">
      <RelationGraph
        ref="graphRef"
        :data="graphData"
        title="Employee Relationships"
        height="600px"
        @nodeClick="handleNodeClick"
        @linkClick="handleLinkClick"
        @graphReady="handleGraphReady"
      />
    </div>
    
    <div class="demo-info">
      <h3>Usage Instructions:</h3>
      <ul>
        <li>Click on nodes to see details</li>
        <li>Drag nodes to rearrange</li>
        <li>Use mouse wheel to zoom</li>
        <li>Right-click for context menu</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import RelationGraph from '@/components/user-database/RelationGraph.vue'

const graphRef = ref()
const graphData = reactive({
  nodes: [] as any[],
  links: [] as any[]
})

// Sample data for demonstration
const sampleData = {
  nodes: [
    { id: '1', text: 'John Doe', x: 200, y: 150, data: { role: 'Manager', department: 'IT' } },
    { id: '2', text: 'Jane Smith', x: 400, y: 150, data: { role: 'Developer', department: 'IT' } },
    { id: '3', text: 'Bob Johnson', x: 600, y: 150, data: { role: 'Designer', department: 'Design' } },
    { id: '4', text: 'Alice Brown', x: 300, y: 300, data: { role: 'Developer', department: 'IT' } },
    { id: '5', text: 'Charlie Wilson', x: 500, y: 300, data: { role: 'Manager', department: 'Design' } }
  ],
  links: [
    { from: '1', to: '2', text: 'Manages' },
    { from: '1', to: '4', text: 'Manages' },
    { from: '5', to: '3', text: 'Manages' },
    { from: '2', to: '4', text: 'Collaborates' },
    { from: '2', to: '3', text: 'Works With' }
  ]
}

// Load sample data
const loadSampleData = () => {
  graphData.nodes = [...sampleData.nodes]
  graphData.links = [...sampleData.links]
  ElMessage.success('Sample data loaded successfully!')
}

// Clear graph
const clearGraph = () => {
  graphData.nodes = []
  graphData.links = []
  ElMessage.info('Graph cleared')
}

// Add random node
const addRandomNode = () => {
  const nodeId = (graphData.nodes.length + 1).toString()
  const names = ['Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'William', 'Sophia', 'James']
  const roles = ['Developer', 'Designer', 'Manager', 'Analyst', 'Tester']
  const departments = ['IT', 'Design', 'Marketing', 'Sales', 'HR']
  
  const newNode = {
    id: nodeId,
    text: names[Math.floor(Math.random() * names.length)],
    x: Math.random() * 600 + 100,
    y: Math.random() * 400 + 100,
    data: {
      role: roles[Math.floor(Math.random() * roles.length)],
      department: departments[Math.floor(Math.random() * departments.length)]
    }
  }
  
  graphData.nodes.push(newNode)
  
  // Add a random link to existing node
  if (graphData.nodes.length > 1) {
    const randomNode = graphData.nodes[Math.floor(Math.random() * (graphData.nodes.length - 1))]
    const linkTypes = ['Reports To', 'Collaborates', 'Works With', 'Manages']
    
    const newLink = {
      from: randomNode.id,
      to: nodeId,
      text: linkTypes[Math.floor(Math.random() * linkTypes.length)]
    }
    
    graphData.links.push(newLink)
  }
  
  ElMessage.success('Random node added!')
}

// Event handlers
const handleNodeClick = (node: any) => {
  ElMessage.info(`Clicked on node: ${node.text}`)
  console.log('Node clicked:', node)
}

const handleLinkClick = (link: any) => {
  ElMessage.info(`Clicked on link: ${link.text}`)
  console.log('Link clicked:', link)
}

const handleGraphReady = (graph: any) => {
  console.log('Graph is ready:', graph)
  ElMessage.success('Graph initialized successfully!')
}
</script>

<style scoped>
.relation-graph-demo {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.demo-header {
  text-align: center;
  margin-bottom: 30px;
}

.demo-header h1 {
  color: #333;
  margin-bottom: 10px;
}

.demo-header p {
  color: #666;
  font-size: 16px;
}

.demo-controls {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.graph-wrapper {
  margin-bottom: 30px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

.demo-info {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.demo-info h3 {
  color: #333;
  margin-bottom: 15px;
}

.demo-info ul {
  color: #666;
  line-height: 1.6;
}

.demo-info li {
  margin-bottom: 8px;
}

/* Glassmorphism effect for buttons */
:deep(.el-button) {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #333;
  transition: all 0.3s ease;
}

:deep(.el-button:hover) {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Responsive design */
@media (max-width: 768px) {
  .relation-graph-demo {
    padding: 10px;
  }
  
  .demo-controls {
    flex-direction: column;
    align-items: center;
  }
  
  .demo-controls .el-button {
    width: 200px;
  }
}
</style> 