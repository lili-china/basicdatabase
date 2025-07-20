/**
 * 集合操作工具类使用示例
 */

import {
  // 数组操作
  unique, groupBy, sortBy, paginate, flatten, intersection, union, difference,
  shuffle, randomChoice, chunk, fill, range, countBy, sum, average, max, min,
  includes, first, last,
  
  // 对象操作
  deepMerge, flattenObject, pick, omit, toPairs, fromPairs,
  
  // Set 操作
  setIntersection, setUnion, setDifference,
  
  // Map 操作
  mapToObject, objectToMap, mapToPairs, pairsToMap
} from './collectionUtils'

// ==================== 数组操作示例 ====================

// 示例数据
const users = [
  { id: 1, name: 'Alice', age: 25, city: 'Beijing', salary: 5000 },
  { id: 2, name: 'Bob', age: 30, city: 'Shanghai', salary: 6000 },
  { id: 3, name: 'Charlie', age: 25, city: 'Beijing', salary: 5500 },
  { id: 4, name: 'David', age: 35, city: 'Guangzhou', salary: 7000 },
  { id: 5, name: 'Eve', age: 28, city: 'Shanghai', salary: 6500 }
]

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'grape']

// 1. 数组去重
console.log('=== 数组去重 ===')
console.log('原始数组:', fruits)
console.log('去重后:', unique(fruits))
console.log('按城市去重:', unique(users, 'city'))

// 2. 数组分组
console.log('\n=== 数组分组 ===')
console.log('按城市分组:', groupBy(users, 'city'))
console.log('按年龄分组:', groupBy(users, 'age'))

// 3. 数组排序
console.log('\n=== 数组排序 ===')
console.log('按年龄升序:', sortBy(users, 'age', 'asc'))
console.log('按薪资降序:', sortBy(users, 'salary', 'desc'))

// 4. 数组分页
console.log('\n=== 数组分页 ===')
const pageResult = paginate(users, 1, 2)
console.log('分页结果:', pageResult)

// 5. 数组扁平化
console.log('\n=== 数组扁平化 ===')
const nestedArray = [1, [2, 3], [4, [5, 6]], 7]
console.log('原始数组:', nestedArray)
console.log('扁平化后:', flatten(nestedArray))

// 6. 数组集合操作
console.log('\n=== 数组集合操作 ===')
const arr1 = [1, 2, 3, 4, 5]
const arr2 = [4, 5, 6, 7, 8]
console.log('交集:', intersection(arr1, arr2))
console.log('并集:', union(arr1, arr2))
console.log('差集:', difference(arr1, arr2))

// 7. 数组随机操作
console.log('\n=== 数组随机操作 ===')
console.log('打乱数组:', shuffle([...numbers]))
console.log('随机选择3个:', randomChoice(users, 3))

// 8. 数组分块
console.log('\n=== 数组分块 ===')
console.log('分块结果:', chunk(numbers, 3))

// 9. 数组填充和范围
console.log('\n=== 数组填充和范围 ===')
console.log('填充数组:', fill(5, 'hello'))
console.log('范围数组:', range(1, 10, 2))

// 10. 数组统计
console.log('\n=== 数组统计 ===')
console.log('按城市统计:', countBy(users, 'city'))
console.log('按年龄统计:', countBy(users, 'age'))

// 11. 数组数学运算
console.log('\n=== 数组数学运算 ===')
const salaries = users.map(u => u.salary)
console.log('薪资总和:', sum(salaries))
console.log('薪资平均值:', average(salaries))
console.log('最高薪资:', max(salaries))
console.log('最低薪资:', min(salaries))

// 12. 数组工具函数
console.log('\n=== 数组工具函数 ===')
console.log('包含检查:', includes(numbers, 5))
console.log('第一个元素:', first(users))
console.log('最后一个元素:', last(users))

// ==================== 对象操作示例 ====================

// 示例对象
const user = {
  id: 1,
  name: 'Alice',
  profile: {
    age: 25,
    address: {
      city: 'Beijing',
      street: 'Main St'
    }
  },
  settings: {
    theme: 'dark',
    language: 'zh-CN'
  }
}

const userUpdate = {
  name: 'Alice Smith',
  profile: {
    age: 26,
    address: {
      street: 'New St'
    }
  },
  settings: {
    theme: 'light'
  }
}

// 1. 对象深度合并
console.log('\n=== 对象深度合并 ===')
console.log('原始对象:', user)
console.log('更新对象:', userUpdate)
console.log('合并后:', deepMerge({ ...user }, userUpdate))

// 2. 对象扁平化
console.log('\n=== 对象扁平化 ===')
console.log('扁平化结果:', flattenObject(user))

// 3. 对象属性选择
console.log('\n=== 对象属性选择 ===')
console.log('选择指定属性:', pick(user, ['id', 'name']))
console.log('排除指定属性:', omit(user, ['settings']))

// 4. 对象键值对转换
console.log('\n=== 对象键值对转换 ===')
const pairs = toPairs(user)
console.log('对象转键值对:', pairs)
console.log('键值对转对象:', fromPairs(pairs))

// ==================== Set 操作示例 ====================

const set1 = new Set([1, 2, 3, 4, 5])
const set2 = new Set([4, 5, 6, 7, 8])

console.log('\n=== Set 操作 ===')
console.log('Set1:', set1)
console.log('Set2:', set2)
console.log('交集:', setIntersection(set1, set2))
console.log('并集:', setUnion(set1, set2))
console.log('差集:', setDifference(set1, set2))

// ==================== Map 操作示例 ====================

const userMap = new Map([
  ['id', 1],
  ['name', 'Alice'],
  ['age', 25]
])

const userObj = {
  id: 1,
  name: 'Alice',
  age: 25
}

console.log('\n=== Map 操作 ===')
console.log('原始Map:', userMap)
console.log('Map转对象:', mapToObject(userMap))
console.log('对象转Map:', objectToMap(userObj))
console.log('Map转键值对:', mapToPairs(userMap))
console.log('键值对转Map:', pairsToMap([['a', 1], ['b', 2]]))

// ==================== 实际应用示例 ====================

console.log('\n=== 实际应用示例 ===')

// 示例：处理用户数据
const processUserData = () => {
  // 1. 按城市分组用户
  const usersByCity = groupBy(users, 'city')
  console.log('按城市分组:', usersByCity)
  
  // 2. 计算每个城市的平均薪资
  const cityStats = Object.entries(usersByCity).map(([city, cityUsers]) => ({
    city,
    userCount: cityUsers.length,
    avgSalary: average(cityUsers.map(u => u.salary))
  }))
  console.log('城市统计:', cityStats)
  
  // 3. 找出薪资最高的用户
  const highestPaidUser = users.reduce((max, user) => 
    user.salary > max.salary ? user : max
  )
  console.log('薪资最高用户:', highestPaidUser)
  
  // 4. 随机选择3个用户进行调研
  const surveyUsers = randomChoice(users, 3)
  console.log('调研用户:', surveyUsers)
  
  // 5. 分页显示用户列表
  const page1 = paginate(users, 1, 2)
  const page2 = paginate(users, 2, 2)
  console.log('第1页:', page1.data)
  console.log('第2页:', page2.data)
}

processUserData()

// ==================== 性能优化示例 ====================

console.log('\n=== 性能优化示例 ===')

// 示例：大数据量处理
const largeArray = Array.from({ length: 10000 }, (_, i) => ({
  id: i,
  value: Math.random() * 1000,
  category: `category_${i % 10}`
}))

const processLargeData = () => {
  console.log('大数据量:', largeArray.length, '条记录')
  
  // 1. 分块处理
  const chunks = chunk(largeArray, 1000)
  console.log('分块数量:', chunks.length)
  
  // 2. 按类别统计
  const categoryStats = countBy(largeArray, 'category')
  console.log('类别统计:', categoryStats)
  
  // 3. 计算平均值
  const avgValue = average(largeArray.map(item => item.value))
  console.log('平均值:', avgValue)
  
  // 4. 找出最大值和最小值
  const maxValue = max(largeArray.map(item => item.value))
  const minValue = min(largeArray.map(item => item.value))
  console.log('最大值:', maxValue, '最小值:', minValue)
}

processLargeData()

export {
  users, numbers, fruits, user, userMap, userObj
} 