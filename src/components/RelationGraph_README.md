# RelationGraph Component

A customizable relationship graph component built with Vue 3 and HTML5 Canvas.

## Features

- **Interactive Graph Visualization**: Display nodes and links with drag-and-drop functionality
- **Zoom and Pan**: Mouse wheel zoom and canvas panning
- **Glassmorphism Design**: Modern UI with backdrop blur effects
- **Fullscreen Mode**: Toggle fullscreen view for better visualization
- **Export Functionality**: Export graph data as JSON
- **Event Handling**: Click events for nodes and links
- **Responsive Design**: Works on desktop and mobile devices

## Usage

### Basic Usage

```vue
<template>
  <RelationGraph
    :data="graphData"
    title="My Relationship Graph"
    height="600px"
    @nodeClick="handleNodeClick"
    @linkClick="handleLinkClick"
    @graphReady="handleGraphReady"
  />
</template>

<script setup>
import RelationGraph from '@/components/RelationGraph.vue'

const graphData = {
  nodes: [
    { id: '1', text: 'John Doe', x: 200, y: 150, data: { role: 'Manager' } },
    { id: '2', text: 'Jane Smith', x: 400, y: 150, data: { role: 'Developer' } }
  ],
  links: [
    { from: '1', to: '2', text: 'Manages' }
  ]
}

const handleNodeClick = (node) => {
  console.log('Node clicked:', node)
}

const handleLinkClick = (link) => {
  console.log('Link clicked:', link)
}

const handleGraphReady = (graph) => {
  console.log('Graph is ready:', graph)
}
</script>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `GraphData` | `undefined` | Graph data containing nodes and links |
| `title` | `string` | `'Relationship Graph'` | Title displayed in the header |
| `width` | `string \| number` | `'100%'` | Width of the graph container |
| `height` | `string \| number` | `'600px'` | Height of the graph container |

### Events

| Event | Parameters | Description |
|-------|------------|-------------|
| `nodeClick` | `(node: Node)` | Fired when a node is clicked |
| `linkClick` | `(link: Link)` | Fired when a link is clicked |
| `graphReady` | `(graph: any)` | Fired when the graph is initialized |

### Data Structure

#### Node
```typescript
interface Node {
  id: string
  text: string
  x: number
  y: number
  data?: any
}
```

#### Link
```typescript
interface Link {
  from: string
  to: string
  text?: string
}
```

#### GraphData
```typescript
interface GraphData {
  nodes: Node[]
  links: Link[]
}
```

### Exposed Methods

The component exposes the following methods:

- `updateGraph(data: GraphData)`: Update the graph with new data
- `resetGraph()`: Reset zoom and pan to default
- `exportGraph()`: Export current graph data as JSON

### Example: Accessing Component Methods

```vue
<template>
  <RelationGraph ref="graphRef" :data="graphData" />
  <button @click="exportData">Export</button>
</template>

<script setup>
import { ref } from 'vue'
import RelationGraph from '@/components/RelationGraph.vue'

const graphRef = ref()

const exportData = () => {
  graphRef.value?.exportGraph()
}
</script>
```

## Styling

The component uses glassmorphism design with:
- Semi-transparent backgrounds
- Backdrop blur effects
- Smooth transitions
- Modern button styling

### Custom Styling

You can customize the appearance by overriding CSS variables or modifying the component styles:

```css
.relation-graph-container {
  /* Custom container styles */
}

.graph-header {
  /* Custom header styles */
}

.graph-canvas {
  /* Custom canvas styles */
}
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Dependencies

- Vue 3
- Element Plus (for buttons and messages)
- TypeScript

## Demo Page

Visit `/relation-graph` to see a live demo of the component with sample data and interactive controls.

## Notes

- The component uses HTML5 Canvas for rendering
- Nodes are draggable by default
- Mouse wheel zooms in/out
- Right-click context menu is available
- Graph data is reactive and updates automatically 