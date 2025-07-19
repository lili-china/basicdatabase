<template>
  <div class="relation-graph-container">
    <div class="graph-header">
      <h3>{{ title }}</h3>
      <div class="graph-controls">
        <el-button @click="resetGraph" size="small" type="primary">
          Reset
        </el-button>
        <el-button @click="exportGraph" size="small" type="success">
          Export
        </el-button>
        <el-button @click="toggleFullscreen" size="small" type="info">
          {{ isFullscreen ? 'Exit' : 'Fullscreen' }}
        </el-button>
      </div>
    </div>
    
    <div 
      ref="graphContainer" 
      class="graph-container"
      :class="{ 'fullscreen': isFullscreen }"
    >
      <canvas 
        ref="canvas" 
        class="graph-canvas"
        @mousedown="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseup="handleMouseUp"
        @wheel="handleWheel"
      ></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'

interface Node {
  id: string
  text: string
  x: number
  y: number
  data?: any
}

interface Link {
  from: string
  to: string
  text?: string
}

interface GraphData {
  nodes: Node[]
  links: Link[]
}

interface Props {
  data?: GraphData
  title?: string
  width?: string | number
  height?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Relationship Graph',
  width: '100%',
  height: '600px'
})

const emit = defineEmits<{
  nodeClick: [node: Node]
  linkClick: [link: Link]
  graphReady: [graph: any]
}>()

const graphContainer = ref<HTMLElement>()
const canvas = ref<HTMLCanvasElement>()
const isFullscreen = ref(false)
let ctx: CanvasRenderingContext2D | null = null
let animationId: number | null = null
let isDragging = false
let selectedNode: Node | null = null
let mouseX = 0
let mouseY = 0
let offsetX = 0
let offsetY = 0
let scale = 1

const graphData = ref<GraphData>({ nodes: [], links: [] })

// Initialize canvas
const initCanvas = () => {
  if (!canvas.value) return
  
  ctx = canvas.value.getContext('2d')
  if (!ctx) return
  
  resizeCanvas()
  drawGraph()
}

// Resize canvas
const resizeCanvas = () => {
  if (!canvas.value || !graphContainer.value) return
  
  const rect = graphContainer.value.getBoundingClientRect()
  canvas.value.width = rect.width
  canvas.value.height = rect.height
}

// Draw graph
const drawGraph = () => {
  if (!ctx || !canvas.value) return
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
  
  // Apply transformations
  ctx.save()
  ctx.translate(offsetX, offsetY)
  ctx.scale(scale, scale)
  
  // Draw links
  graphData.value.links.forEach(link => {
    const fromNode = graphData.value.nodes.find(n => n.id === link.from)
    const toNode = graphData.value.nodes.find(n => n.id === link.to)
    
    if (fromNode && toNode && ctx) {
      ctx.beginPath()
      ctx.moveTo(fromNode.x, fromNode.y)
      ctx.lineTo(toNode.x, toNode.y)
      ctx.strokeStyle = '#666666'
      ctx.lineWidth = 2
      ctx.stroke()
      
      // Draw link text
      if (link.text && ctx) {
        const midX = (fromNode.x + toNode.x) / 2
        const midY = (fromNode.y + toNode.y) / 2
        ctx.fillStyle = '#333333'
        ctx.font = '12px Arial'
        ctx.textAlign = 'center'
        ctx.fillText(link.text, midX, midY - 10)
      }
    }
  })
  
  // Draw nodes
  graphData.value.nodes.forEach(node => {
    if (!ctx) return
    
    // Node circle
    ctx.beginPath()
    ctx.arc(node.x, node.y, 30, 0, 2 * Math.PI)
    ctx.fillStyle = '#4CAF50'
    ctx.fill()
    ctx.strokeStyle = '#2E7D32'
    ctx.lineWidth = 2
    ctx.stroke()
    
    // Node text
    ctx.fillStyle = '#ffffff'
    ctx.font = '12px Arial'
    ctx.textAlign = 'center'
    ctx.fillText(node.text, node.x, node.y + 4)
  })
  
  ctx.restore()
}

// Mouse event handlers
const handleMouseDown = (e: MouseEvent) => {
  if (!canvas.value) return
  
  const rect = canvas.value.getBoundingClientRect()
  mouseX = (e.clientX - rect.left - offsetX) / scale
  mouseY = (e.clientY - rect.top - offsetY) / scale
  
  // Check if clicking on a node
  const foundNode = graphData.value.nodes.find(node => {
    const distance = Math.sqrt((node.x - mouseX) ** 2 + (node.y - mouseY) ** 2)
    return distance <= 30
  })
  selectedNode = foundNode || null
  
  if (selectedNode) {
    isDragging = true
    emit('nodeClick', selectedNode)
  }
}

const handleMouseMove = (e: MouseEvent) => {
  if (!canvas.value) return
  
  const rect = canvas.value.getBoundingClientRect()
  const newMouseX = (e.clientX - rect.left - offsetX) / scale
  const newMouseY = (e.clientY - rect.top - offsetY) / scale
  
  if (isDragging && selectedNode) {
    selectedNode.x = newMouseX
    selectedNode.y = newMouseY
    drawGraph()
  }
}

const handleMouseUp = () => {
  isDragging = false
  selectedNode = null
}

const handleWheel = (e: WheelEvent) => {
  e.preventDefault()
  
  const delta = e.deltaY > 0 ? 0.9 : 1.1
  scale = Math.max(0.5, Math.min(2, scale * delta))
  
  drawGraph()
}

// Update graph data
const updateGraph = (data: GraphData) => {
  graphData.value = data
  drawGraph()
}

// Reset graph
const resetGraph = () => {
  offsetX = 0
  offsetY = 0
  scale = 1
  drawGraph()
}

// Export graph
const exportGraph = () => {
  const data = graphData.value
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json'
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'relation-graph.json'
  a.click()
  URL.revokeObjectURL(url)
}

// Toggle fullscreen
const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
  nextTick(() => {
    resizeCanvas()
    drawGraph()
  })
}

// Watch for data changes
watch(() => props.data, (newData) => {
  if (newData) {
    updateGraph(newData)
  }
}, { deep: true })

// Expose methods to parent
defineExpose({
  updateGraph,
  resetGraph,
  exportGraph
})

onMounted(async () => {
  await nextTick()
  initCanvas()
  
  if (props.data) {
    updateGraph(props.data)
  }
  
  emit('graphReady', { updateGraph, resetGraph, exportGraph })
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
})
</script>

<style scoped>
.relation-graph-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
}

.graph-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.graph-header h3 {
  margin: 0;
  color: #333;
  font-size: 18px;
  font-weight: 600;
}

.graph-controls {
  display: flex;
  gap: 8px;
}

.graph-container {
  flex: 1;
  position: relative;
  width: v-bind(width);
  height: v-bind(height);
  transition: all 0.3s ease;
}

.graph-container.fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100002;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
}

.graph-canvas {
  width: 100%;
  height: 100%;
  cursor: grab;
}

.graph-canvas:active {
  cursor: grabbing;
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
  .graph-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
  
  .graph-controls {
    width: 100%;
    justify-content: flex-end;
  }
}
</style> 