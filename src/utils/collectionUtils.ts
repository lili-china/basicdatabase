/**
 * 集合操作工具类
 * 提供常用的数组、对象、Set、Map 操作函数
 */

// ==================== 数组操作 ====================

/**
 * 数组去重（支持对象数组）
 * @param arr 数组
 * @param key 对象属性键，如果提供则按该属性去重
 * @returns 去重后的数组
 */
export const unique = <T>(arr: T[], key?: string): T[] => {
  if (!Array.isArray(arr)) return []
  
  if (key) {
    const seen = new Set()
    return arr.filter(item => {
      const value = (item as any)[key]
      if (seen.has(value)) {
        return false
      }
      seen.add(value)
      return true
    })
  }
  
  return [...new Set(arr)]
}

/**
 * 数组分组
 * @param arr 数组
 * @param key 分组键
 * @returns 分组后的对象
 */
export const groupBy = <T>(arr: T[], key: string): Record<string, T[]> => {
  if (!Array.isArray(arr)) return {}
  
  return arr.reduce((groups, item) => {
    const groupKey = String((item as any)[key])
    if (!groups[groupKey]) {
      groups[groupKey] = []
    }
    groups[groupKey].push(item)
    return groups
  }, {} as Record<string, T[]>)
}

/**
 * 数组排序
 * @param arr 数组
 * @param key 排序键
 * @param order 排序方向，'asc' 或 'desc'
 * @returns 排序后的数组
 */
export const sortBy = <T>(arr: T[], key: string, order: 'asc' | 'desc' = 'asc'): T[] => {
  if (!Array.isArray(arr)) return []
  
  return [...arr].sort((a, b) => {
    const aVal = (a as any)[key]
    const bVal = (b as any)[key]
    
    if (aVal < bVal) return order === 'asc' ? -1 : 1
    if (aVal > bVal) return order === 'asc' ? 1 : -1
    return 0
  })
}

/**
 * 数组分页
 * @param arr 数组
 * @param page 页码（从1开始）
 * @param pageSize 每页大小
 * @returns 分页结果
 */
export const paginate = <T>(arr: T[], page: number, pageSize: number): {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
} => {
  if (!Array.isArray(arr)) {
    return { data: [], total: 0, page, pageSize, totalPages: 0 }
  }
  
  const total = arr.length
  const totalPages = Math.ceil(total / pageSize)
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  
  return {
    data: arr.slice(startIndex, endIndex),
    total,
    page,
    pageSize,
    totalPages
  }
}

/**
 * 数组扁平化
 * @param arr 数组
 * @param depth 扁平化深度，默认为 Infinity
 * @returns 扁平化后的数组
 */
export const flatten = <T>(arr: any[], depth: number = Infinity): T[] => {
  if (!Array.isArray(arr)) return []
  
  return arr.reduce((flat, item) => {
    if (Array.isArray(item) && depth > 0) {
      return flat.concat(flatten(item, depth - 1))
    }
    return flat.concat(item)
  }, [])
}

/**
 * 数组交集
 * @param arr1 数组1
 * @param arr2 数组2
 * @returns 交集数组
 */
export const intersection = <T>(arr1: T[], arr2: T[]): T[] => {
  const set1 = new Set(arr1)
  return arr2.filter(item => set1.has(item))
}

/**
 * 数组并集
 * @param arr1 数组1
 * @param arr2 数组2
 * @returns 并集数组
 */
export const union = <T>(arr1: T[], arr2: T[]): T[] => {
  return [...new Set([...arr1, ...arr2])]
}

/**
 * 数组差集
 * @param arr1 数组1
 * @param arr2 数组2
 * @returns 差集数组（arr1 中有但 arr2 中没有的元素）
 */
export const difference = <T>(arr1: T[], arr2: T[]): T[] => {
  const set2 = new Set(arr2)
  return arr1.filter(item => !set2.has(item))
}

/**
 * 数组随机打乱
 * @param arr 数组
 * @returns 打乱后的数组
 */
export const shuffle = <T>(arr: T[]): T[] => {
  if (!Array.isArray(arr)) return []
  
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

/**
 * 数组随机选择
 * @param arr 数组
 * @param count 选择数量
 * @returns 随机选择的元素数组
 */
export const randomChoice = <T>(arr: T[], count: number = 1): T[] => {
  if (!Array.isArray(arr) || arr.length === 0) return []
  
  const shuffled = shuffle(arr)
  return shuffled.slice(0, Math.min(count, arr.length))
}

// ==================== 对象操作 ====================

/**
 * 对象深度合并
 * @param target 目标对象
 * @param sources 源对象数组
 * @returns 合并后的对象
 */
export const deepMerge = <T extends Record<string, any>>(target: T, ...sources: Partial<T>[]): T => {
  if (!sources.length) return target
  
  const source = sources.shift()
  if (source === undefined) return target
  
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        deepMerge(target[key], source[key])
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }
  
  return deepMerge(target, ...sources)
}

/**
 * 对象扁平化
 * @param obj 对象
 * @param prefix 前缀
 * @returns 扁平化后的对象
 */
export const flattenObject = (obj: any, prefix: string = ''): Record<string, any> => {
  return Object.keys(obj).reduce((acc, key) => {
    const pre = prefix.length ? prefix + '.' : ''
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(acc, flattenObject(obj[key], pre + key))
    } else {
      acc[pre + key] = obj[key]
    }
    return acc
  }, {} as Record<string, any>)
}

/**
 * 对象选择指定属性
 * @param obj 对象
 * @param keys 要选择的属性键数组
 * @returns 新对象
 */
export const pick = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> => {
  const result = {} as Pick<T, K>
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key]
    }
  })
  return result
}

/**
 * 对象排除指定属性
 * @param obj 对象
 * @param keys 要排除的属性键数组
 * @returns 新对象
 */
export const omit = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> => {
  const result = { ...obj }
  keys.forEach(key => {
    delete result[key]
  })
  return result
}

/**
 * 对象键值对转换
 * @param obj 对象
 * @returns 键值对数组
 */
export const toPairs = <T extends Record<string, any>>(obj: T): [keyof T, T[keyof T]][] => {
  return Object.entries(obj) as [keyof T, T[keyof T]][]
}

/**
 * 键值对数组转对象
 * @param pairs 键值对数组
 * @returns 对象
 */
export const fromPairs = <T>(pairs: [string, T][]): Record<string, T> => {
  return pairs.reduce((obj, [key, value]) => {
    obj[key] = value
    return obj
  }, {} as Record<string, T>)
}

// ==================== Set 操作 ====================

/**
 * Set 交集
 * @param set1 Set1
 * @param set2 Set2
 * @returns 交集Set
 */
export const setIntersection = <T>(set1: Set<T>, set2: Set<T>): Set<T> => {
  return new Set([...set1].filter(x => set2.has(x)))
}

/**
 * Set 并集
 * @param set1 Set1
 * @param set2 Set2
 * @returns 并集Set
 */
export const setUnion = <T>(set1: Set<T>, set2: Set<T>): Set<T> => {
  return new Set([...set1, ...set2])
}

/**
 * Set 差集
 * @param set1 Set1
 * @param set2 Set2
 * @returns 差集Set（set1 中有但 set2 中没有的元素）
 */
export const setDifference = <T>(set1: Set<T>, set2: Set<T>): Set<T> => {
  return new Set([...set1].filter(x => !set2.has(x)))
}

// ==================== Map 操作 ====================

/**
 * Map 转对象
 * @param map Map对象
 * @returns 普通对象
 */
export const mapToObject = <K extends string, V>(map: Map<K, V>): Record<K, V> => {
  const obj = {} as Record<K, V>
  map.forEach((value, key) => {
    obj[key] = value
  })
  return obj
}

/**
 * 对象转Map
 * @param obj 对象
 * @returns Map对象
 */
export const objectToMap = <K extends string, V>(obj: Record<K, V>): Map<K, V> => {
  return new Map(Object.entries(obj) as [K, V][])
}

/**
 * Map 键值对转换
 * @param map Map对象
 * @returns 键值对数组
 */
export const mapToPairs = <K, V>(map: Map<K, V>): [K, V][] => {
  return Array.from(map.entries())
}

/**
 * 键值对数组转Map
 * @param pairs 键值对数组
 * @returns Map对象
 */
export const pairsToMap = <K, V>(pairs: [K, V][]): Map<K, V> => {
  return new Map(pairs)
}

// ==================== 工具函数 ====================

/**
 * 检查是否为对象
 * @param obj 要检查的值
 * @returns 是否为对象
 */
const isObject = (obj: any): obj is Record<string, any> => {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj)
}

/**
 * 检查数组是否包含指定元素
 * @param arr 数组
 * @param item 要检查的元素
 * @returns 是否包含
 */
export const includes = <T>(arr: T[], item: T): boolean => {
  return Array.isArray(arr) && arr.includes(item)
}

/**
 * 获取数组最后一个元素
 * @param arr 数组
 * @returns 最后一个元素
 */
export const last = <T>(arr: T[]): T | undefined => {
  return Array.isArray(arr) && arr.length > 0 ? arr[arr.length - 1] : undefined
}

/**
 * 获取数组第一个元素
 * @param arr 数组
 * @returns 第一个元素
 */
export const first = <T>(arr: T[]): T | undefined => {
  return Array.isArray(arr) && arr.length > 0 ? arr[0] : undefined
}

/**
 * 数组分块
 * @param arr 数组
 * @param size 块大小
 * @returns 分块后的数组
 */
export const chunk = <T>(arr: T[], size: number): T[][] => {
  if (!Array.isArray(arr) || size <= 0) return []
  
  const chunks: T[][] = []
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size))
  }
  return chunks
}

/**
 * 数组填充
 * @param length 长度
 * @param value 填充值
 * @returns 填充后的数组
 */
export const fill = <T>(length: number, value: T): T[] => {
  return Array(length).fill(value)
}

/**
 * 数组范围
 * @param start 开始值
 * @param end 结束值
 * @param step 步长
 * @returns 范围数组
 */
export const range = (start: number, end: number, step: number = 1): number[] => {
  const result: number[] = []
  for (let i = start; i <= end; i += step) {
    result.push(i)
  }
  return result
}

/**
 * 数组统计
 * @param arr 数组
 * @param key 统计键（可选）
 * @returns 统计结果
 */
export const countBy = <T>(arr: T[], key?: string): Record<string, number> => {
  if (!Array.isArray(arr)) return {}
  
  return arr.reduce((counts, item) => {
    const countKey = key ? String((item as any)[key]) : String(item)
    counts[countKey] = (counts[countKey] || 0) + 1
    return counts
  }, {} as Record<string, number>)
}

/**
 * 数组求和
 * @param arr 数组
 * @param key 求和键（可选）
 * @returns 总和
 */
export const sum = (arr: number[], key?: string): number => {
  if (!Array.isArray(arr)) return 0
  
  return arr.reduce((total, item) => {
    const value = key ? (item as any)[key] : item
    return total + (Number(value) || 0)
  }, 0)
}

/**
 * 数组平均值
 * @param arr 数组
 * @param key 平均值键（可选）
 * @returns 平均值
 */
export const average = (arr: number[], key?: string): number => {
  if (!Array.isArray(arr) || arr.length === 0) return 0
  
  const total = sum(arr, key)
  return total / arr.length
}

/**
 * 数组最大值
 * @param arr 数组
 * @param key 最大值键（可选）
 * @returns 最大值
 */
export const max = (arr: number[], key?: string): number => {
  if (!Array.isArray(arr) || arr.length === 0) return 0
  
  return Math.max(...arr.map(item => {
    const value = key ? (item as any)[key] : item
    return Number(value) || 0
  }))
}

/**
 * 数组最小值
 * @param arr 数组
 * @param key 最小值键（可选）
 * @returns 最小值
 */
export const min = (arr: number[], key?: string): number => {
  if (!Array.isArray(arr) || arr.length === 0) return 0
  
  return Math.min(...arr.map(item => {
    const value = key ? (item as any)[key] : item
    return Number(value) || 0
  }))
} 