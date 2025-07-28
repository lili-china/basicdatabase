import { useRouter } from 'vue-router'

/**
 * 处理手机号点击事件
 * 点击手机号时打开ISP详情页面
 * @param phoneNumber 手机号
 * @param router Vue Router实例
 */
export function handlePhoneClick(phoneNumber: string, router: any) {
  // 根据手机号查找对应的ISP ID
  const phoneToISPIdMap: Record<string, string> = {
    '+968 91312548': '1', // Ooredoo
    '+968 91234567': '2', // Omantel
    '+968 98765432': '999', // Awasr
    // 可以添加更多手机号映射
  }
  
  const ispId = phoneToISPIdMap[phoneNumber]
  
  if (ispId) {
    // 打开ISP详情页面
    router.push(`/isp-detail-wrapper/${ispId}`)
  } else {
    // 如果没有找到对应的ISP，可以显示提示或跳转到搜索页面
    console.log(`No ISP found for phone number: ${phoneNumber}`)
    // 可以添加一个通用的ISP详情页面，显示手机号信息
    router.push(`/isp-detail-wrapper/search?phone=${encodeURIComponent(phoneNumber)}`)
  }
}

/**
 * 创建一个可复用的手机号点击处理函数
 * 可以在任何组件中使用
 */
export function createPhoneClickHandler() {
  const router = useRouter()
  
  return (phoneNumber: string) => {
    handlePhoneClick(phoneNumber, router)
  }
}

/**
 * 为手机号元素添加点击事件
 * @param phoneNumber 手机号
 * @param element 要添加点击事件的元素
 * @param router Vue Router实例
 */
export function addPhoneClickEvent(phoneNumber: string, element: HTMLElement, router: any) {
  element.style.cursor = 'pointer'
  element.style.color = 'var(--accent-primary)'
  element.style.textDecoration = 'underline'
  
  element.addEventListener('click', () => {
    handlePhoneClick(phoneNumber, router)
  })
  
  // 添加hover效果
  element.addEventListener('mouseenter', () => {
    element.style.opacity = '0.8'
  })
  
  element.addEventListener('mouseleave', () => {
    element.style.opacity = '1'
  })
} 