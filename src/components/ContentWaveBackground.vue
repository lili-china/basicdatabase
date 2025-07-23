<template>
  <div class="wave-bg-root">
    <canvas ref="canvas" class="wave-bg-canvas"></canvas>
    <div class="content-slot">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onBeforeUnmount, watch } from 'vue'
const props = defineProps<{ animationPaused?: boolean }>()
const canvas = ref<HTMLCanvasElement | null>(null)
let animationId: number
let isPaused = false

// 粒子相关
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}
const particles: Particle[] = [];
function initParticles() {
  particles.length = 0;
  for (let i = 0; i < 30; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 1,
      vy: (Math.random() - 0.5) * 1,
      size: Math.random() * 4 + 2,
      opacity: Math.random() * 0.7 + 0.3
    })
  }
}
function drawParticles(ctx: CanvasRenderingContext2D) {
  const waveColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-primary').trim() || '#2563eb';
  particles.forEach(particle => {
    // 更新粒子位置
    particle.x += particle.vx;
    particle.y += particle.vy;
    // 边界反弹
    if (particle.x < 0 || particle.x > window.innerWidth) particle.vx = -particle.vx;
    if (particle.y < 0 || particle.y > window.innerHeight) particle.vy = -particle.vy;
    // 绘制粒子
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = waveColor + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
    ctx.fill();
    // 光晕
    ctx.shadowColor = waveColor;
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'transparent';
    ctx.lineWidth = 0;
  });
}

function drawWave(ctx: CanvasRenderingContext2D, width: number, height: number, t: number) {
  ctx.clearRect(0, 0, width, height)
  // 波浪参数
  const baseWaveHeight = height * 0.6;
  const waveY = height - baseWaveHeight;
  // 第一层波浪
  ctx.beginPath();
  ctx.moveTo(0, height);
  const step = Math.max(2, Math.floor(width / 100));
  const points = [];
  for (let x = 0; x <= width; x += step) {
    const waveX = x / width;
    const wave1 = Math.sin(waveX * Math.PI * 3 + t * 0.8) * 80;
    const wave2 = Math.sin(waveX * Math.PI * 4.5 + t * 0.6) * 56;
    const wave3 = Math.cos(waveX * Math.PI * 2.4 + t * 0.4) * 32;
    const y = waveY + wave1 + wave2 + wave3;
    points.push({ x, y });
  }
  points.forEach(point => ctx.lineTo(point.x, point.y));
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.closePath();
  // 渐变色
  const waveColor = getComputedStyle(document.documentElement).getPropertyValue('--accent-primary').trim() || '#2563eb';
  const gradient = ctx.createLinearGradient(0, waveY, 0, height);
  gradient.addColorStop(0, waveColor + '80');
  gradient.addColorStop(1, waveColor + '40');
  ctx.fillStyle = gradient;
  ctx.save();
  ctx.globalAlpha = 0.7;
  ctx.shadowColor = waveColor;
  ctx.shadowBlur = 20;
  ctx.fill();
  ctx.restore();
  // 第二层波浪
  ctx.beginPath();
  ctx.moveTo(0, height);
  const points2 = [];
  for (let x = 0; x <= width; x += step) {
    const waveX = x / width;
    const wave4 = Math.sin(waveX * Math.PI * 4 + t * 1.2) * 30;
    const wave5 = Math.cos(waveX * Math.PI * 2.5 + t * 0.9) * 20;
    const y2 = waveY + wave4 + wave5;
    points2.push({ x, y: y2 });
  }
  points2.forEach(point => ctx.lineTo(point.x, point.y));
  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.closePath();
  const gradient2 = ctx.createLinearGradient(0, waveY, 0, height);
  gradient2.addColorStop(0, waveColor + '40');
  gradient2.addColorStop(1, waveColor + '20');
  ctx.fillStyle = gradient2;
  ctx.save();
  ctx.globalAlpha = 0.3;
  ctx.fill();
  ctx.restore();
  // 粒子
  drawParticles(ctx);
}

function resizeAndDraw() {
  const c = canvas.value
  if (!c) return
  const dpr = window.devicePixelRatio || 1
  c.width = window.innerWidth * dpr
  c.height = window.innerHeight * dpr
  c.style.width = window.innerWidth + 'px'
  c.style.height = window.innerHeight + 'px'
  initParticles()
}

onMounted(() => {
  resizeAndDraw()
  let t = 0
  function animate() {
    if (props.animationPaused || isPaused) return
    const c = canvas.value
    if (!c) return
    const ctx = c.getContext('2d')!
    const dpr = window.devicePixelRatio || 1
    const width = window.innerWidth * dpr
    const height = window.innerHeight * dpr
    drawWave(ctx, width, height, t)
    t += 0.02
    animationId = requestAnimationFrame(animate)
  }
  animate()
  watch(() => props.animationPaused, (val) => {
    if (val) {
      isPaused = true
      cancelAnimationFrame(animationId)
    } else {
      isPaused = false
      animate()
    }
  })
  window.addEventListener('resize', resizeAndDraw)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', resizeAndDraw)
})
</script>

<style scoped>
.wave-bg-root {
  position: fixed;
  left: 0; top: 0; width: 100vw; height: 100vh;
  z-index: 0;
  pointer-events: none;
}
.wave-bg-canvas {
  position: absolute;
  left: 0; top: 0; width: 100vw; height: 100vh;
  z-index: 0;
}
.content-slot {
  position: relative;
  z-index: 1;
  pointer-events: auto;
  /* 不设置 overflow-y，内容区自己控制滚动 */
}
</style> 