export interface FlyToTargetOptions {
  start: { x: number, y: number } | HTMLElement
  end: HTMLElement
  content: HTMLElement
  duration?: number
  scaleFrom?: number
  scaleTo?: number
  opacityFrom?: number
  opacityTo?: number
  bezierOffset?: number
}

export function flyToTarget(options: FlyToTargetOptions): Promise<void> {
  return new Promise(resolve => {
    // 计算起点
    let startX: number, startY: number
    if (options.start instanceof HTMLElement) {
      const rect = options.start.getBoundingClientRect()
      startX = rect.left + rect.width / 2
      startY = rect.top + rect.height / 2
    } else {
      startX = options.start.x
      startY = options.start.y
    }
    // 终点
    const endRect = options.end.getBoundingClientRect()
    const endX = endRect.left + endRect.width / 2
    const endY = endRect.top + endRect.height / 2
    // 控制点
    const ctrlX = (startX + endX) / 2
    const ctrlY = Math.min(startY, endY) - (options.bezierOffset ?? 80)
    // 克隆内容节点
    const flyNode = options.content.cloneNode(true) as HTMLElement
    Object.assign(flyNode.style, {
      position: 'fixed',
      left: startX + 'px',
      top: startY + 'px',
      zIndex: 99999,
      pointerEvents: 'none',
      opacity: (options.opacityFrom ?? 1).toString(),
      transform: `scale(${options.scaleFrom ?? 1.2})`,
      transition: 'none',
    })
    document.body.appendChild(flyNode)
    let start: number | null = null
    function animateFly(ts: number) {
      if (!start) start = ts
      const duration = options.duration ?? 700
      const t = Math.min((ts - start) / duration, 1)
      // 贝塞尔插值
      const x = (1-t)*(1-t)*startX + 2*(1-t)*t*ctrlX + t*t*endX
      const y = (1-t)*(1-t)*startY + 2*(1-t)*t*ctrlY + t*t*endY
      flyNode.style.left = x + 'px'
      flyNode.style.top = y + 'px'
      flyNode.style.opacity = ((options.opacityFrom ?? 1) * (1-t) + (options.opacityTo ?? 0.2) * t).toString()
      flyNode.style.transform = `scale(${(options.scaleFrom ?? 1.2) - ((options.scaleFrom ?? 1.2)-(options.scaleTo ?? 0.5))*t})`
      if (t < 1) {
        requestAnimationFrame(animateFly)
      } else {
        flyNode.remove()
        resolve()
      }
    }
    requestAnimationFrame(animateFly)
  })
} 