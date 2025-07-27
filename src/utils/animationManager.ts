/**
 * 通用动画管理器
 * 提供数字动画、缓动函数等通用动画功能
 */

// 缓动函数类型
export type EasingFunction = (t: number) => number

// 缓动函数集合
export const Easing = {
  // 线性
  linear: (t: number) => t,
  
  // 二次缓动
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  
  // 三次缓动
  easeInCubic: (t: number) => t * t * t,
  easeOutCubic: (t: number) => (--t) * t * t + 1,
  easeInOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  
  // 四次缓动
  easeInQuart: (t: number) => t * t * t * t,
  easeOutQuart: (t: number) => 1 - Math.pow(1 - t, 4),
  easeInOutQuart: (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
  
  // 弹性缓动
  easeInElastic: (t: number) => {
    if (t === 0) return 0
    if (t === 1) return 1
    return -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * ((2 * Math.PI) / 3))
  },
  easeOutElastic: (t: number) => {
    if (t === 0) return 0
    if (t === 1) return 1
    return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) + 1
  },
  
  // 弹跳缓动
  easeInBounce: (t: number) => 1 - Easing.easeOutBounce(1 - t),
  easeOutBounce: (t: number) => {
    if (t < 1 / 2.75) {
      return 7.5625 * t * t
    } else if (t < 2 / 2.75) {
      return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
    } else if (t < 2.5 / 2.75) {
      return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
    } else {
      return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375
    }
  }
}

// 数字动画配置接口
export interface NumberAnimationConfig {
  duration?: number
  easing?: EasingFunction
  delay?: number
  onUpdate?: (value: number) => void
  onComplete?: () => void
}

// 数字动画类
export class NumberAnimator {
  private startValue: number
  private endValue: number
  private duration: number
  private easing: EasingFunction
  private delay: number
  private onUpdate?: (value: number) => void
  private onComplete?: () => void
  private startTime: number = 0
  private animationId?: number

  constructor(
    startValue: number,
    endValue: number,
    config: NumberAnimationConfig = {}
  ) {
    this.startValue = startValue
    this.endValue = endValue
    this.duration = config.duration || 2000
    this.easing = config.easing || Easing.easeOutQuart
    this.delay = config.delay || 0
    this.onUpdate = config.onUpdate
    this.onComplete = config.onComplete
  }

  start(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }

    setTimeout(() => {
      this.startTime = Date.now()
      this.animate()
    }, this.delay)
  }

  stop(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
      this.animationId = undefined
    }
  }

  private animate(): void {
    const elapsed = Date.now() - this.startTime
    const progress = Math.min(elapsed / this.duration, 1)
    const easedProgress = this.easing(progress)
    
    const currentValue = Math.floor(
      this.startValue + (this.endValue - this.startValue) * easedProgress
    )

    if (this.onUpdate) {
      this.onUpdate(currentValue)
    }

    if (progress < 1) {
      this.animationId = requestAnimationFrame(() => this.animate())
    } else {
      // 确保最终值准确
      if (this.onUpdate) {
        this.onUpdate(this.endValue)
      }
      if (this.onComplete) {
        this.onComplete()
      }
    }
  }
}

// 批量数字动画管理器
export class BatchNumberAnimator {
  private animators: NumberAnimator[] = []

  addAnimator(
    startValue: number,
    endValue: number,
    config: NumberAnimationConfig = {}
  ): NumberAnimator {
    const animator = new NumberAnimator(startValue, endValue, config)
    this.animators.push(animator)
    return animator
  }

  startAll(): void {
    this.animators.forEach(animator => animator.start())
  }

  stopAll(): void {
    this.animators.forEach(animator => animator.stop())
  }

  clear(): void {
    this.stopAll()
    this.animators = []
  }
}

// 便捷函数：创建单个数字动画
export function animateNumber(
  startValue: number,
  endValue: number,
  config: NumberAnimationConfig = {}
): NumberAnimator {
  return new NumberAnimator(startValue, endValue, config)
}

// 便捷函数：创建批量数字动画
export function createBatchAnimator(): BatchNumberAnimator {
  return new BatchNumberAnimator()
}

// 便捷函数：格式化数字（添加千位分隔符）
export function formatNumber(num: number): string {
  return num.toLocaleString()
}

// 便捷函数：格式化大数字（K, M, B等）
export function formatLargeNumber(num: number): string {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B'
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

// 便捷函数：创建带格式化的数字动画
export function animateFormattedNumber(
  startValue: number,
  endValue: number,
  config: NumberAnimationConfig & { format?: 'number' | 'large' } = {}
): NumberAnimator {
  const { format = 'number', ...animationConfig } = config
  
  return new NumberAnimator(startValue, endValue, {
    ...animationConfig,
    onUpdate: (value) => {
      const formattedValue = format === 'large' 
        ? formatLargeNumber(value) 
        : formatNumber(value)
      
      if (config.onUpdate) {
        config.onUpdate(value)
      }
    }
  })
} 