<template>
  <div ref="mapContainer" class="map-heatmap"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import HeatmapLayer from 'ol/layer/Heatmap'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { fromLonLat } from 'ol/proj'

const props = defineProps({
  points: {
    type: Array,
    default: () => []
  }
})

const mapContainer = ref<HTMLDivElement | null>(null)
let map: Map | null = null

const renderMap = () => {
  if (!mapContainer.value) return

  // 构建热力点
  const features = (props.points || []).map((item: any) => {
    // item: { lon, lat, weight }
    return new Feature({
      geometry: new Point(fromLonLat([item.lon, item.lat])),
      weight: item.weight || 1
    })
  })

  const vectorSource = new VectorSource({
    features
  })

  const heatmapLayer = new HeatmapLayer({
    source: vectorSource,
    blur: 20,
    radius: 15
  })

  const baseLayer = new TileLayer({
    source: new OSM()
  })

  map = new Map({
    target: mapContainer.value,
    layers: [
      baseLayer,
      heatmapLayer
    ],
    view: new View({
      center: fromLonLat([57.5, 21.5]), // 默认阿曼中心
      zoom: 6
    })
  })
}

onMounted(async () => {
  await nextTick()
  renderMap()
})

watch(() => props.points, () => {
  if (map) {
    map.setTarget(null)
    map = null
  }
  renderMap()
})
</script>

<style scoped>
.map-heatmap {
  width: 100%;
  height: 400px;
  margin-top: 2rem;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
</style> 