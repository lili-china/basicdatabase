// 全局弹窗管理器 - 确保所有弹窗都在最顶层
export const setupGlobalDialogManager = () => {
  let activeDialogs = 0 // 跟踪活跃弹窗数量
  let isScrollDisabled = false // 跟踪滚动是否已被禁用
  
  // 禁用页面滚动
  const disablePageScroll = () => {
    if (!isScrollDisabled) {
      // 使用CSS类来控制滚动条，避免直接操作style
      document.body.classList.add('dialog-open')
      document.documentElement.classList.add('dialog-open')
      isScrollDisabled = true
    }
  }
  
  // 恢复页面滚动
  const enablePageScroll = () => {
    if (isScrollDisabled) {
      // 移除CSS类来恢复滚动
      document.body.classList.remove('dialog-open')
      document.documentElement.classList.remove('dialog-open')
      isScrollDisabled = false
    }
  }
  
  // 监听所有弹窗的创建
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as Element
          
          // 检查是否是弹窗
          if (element.classList?.contains('el-dialog__wrapper')) {
            activeDialogs++
            disablePageScroll()
            setupDialog(element as HTMLElement)
          }
          
          // 检查子元素中是否有弹窗
          const dialogs = element.querySelectorAll?.('.el-dialog__wrapper')
          dialogs?.forEach((dialog) => {
            activeDialogs++
            disablePageScroll()
            setupDialog(dialog as HTMLElement)
          })
        }
      })
    })
    
    // 监听弹窗移除
    mutations.forEach((mutation) => {
      mutation.removedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as Element
          
          // 检查是否是弹窗被移除
          if (element.classList?.contains('el-dialog__wrapper')) {
            activeDialogs = Math.max(0, activeDialogs - 1)
            if (activeDialogs === 0) {
              enablePageScroll()
            }
          }
          
          // 检查子元素中是否有弹窗被移除
          const dialogs = element.querySelectorAll?.('.el-dialog__wrapper')
          if (dialogs && dialogs.length > 0) {
            activeDialogs = Math.max(0, activeDialogs - dialogs.length)
            if (activeDialogs === 0) {
              enablePageScroll()
            }
          }
        }
      })
    })
  })
  
  // 开始监听DOM变化
  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
  
  // 设置弹窗样式
  const setupDialog = (dialogWrapper: HTMLElement) => {
    if (!dialogWrapper) return
    
    // 确保弹窗wrapper覆盖整个视口
    dialogWrapper.style.position = 'fixed'
    dialogWrapper.style.top = '0'
    dialogWrapper.style.left = '0'
    dialogWrapper.style.right = '0'
    dialogWrapper.style.bottom = '0'
    dialogWrapper.style.width = '100vw'
    dialogWrapper.style.height = '100vh'
    dialogWrapper.style.overflow = 'visible'
    dialogWrapper.style.pointerEvents = 'none'
    dialogWrapper.style.zIndex = '99998'
    
    // 设置弹窗本身
    const dialog = dialogWrapper.querySelector('.el-dialog') as HTMLElement
    if (dialog) {
      // 移除所有移动限制
      dialog.style.position = 'fixed'
      dialog.style.top = '50%'
      dialog.style.left = '50%'
      dialog.style.transform = 'translate(-50%, -50%)'
      dialog.style.margin = '0'
      dialog.style.maxWidth = 'none'
      dialog.style.maxHeight = 'none'
      dialog.style.minWidth = '300px'
      dialog.style.minHeight = '200px'
      dialog.style.zIndex = '99999'
      
      // 确保弹窗可以移动到任何位置
      dialog.style.pointerEvents = 'auto'
      
      // 添加拖拽事件监听
      setupDragEvents(dialog)
    }
  }
  
  // 设置拖拽事件
  const setupDragEvents = (dialog: HTMLElement) => {
    let isDragging = false
    let startX = 0
    let startY = 0
    let startLeft = 0
    let startTop = 0
    
    const header = dialog.querySelector('.el-dialog__header') as HTMLElement
    if (!header) return
    
    // 鼠标按下事件
    const onMouseDown = (e: MouseEvent) => {
      isDragging = true
      startX = e.clientX
      startY = e.clientY
      
      const rect = dialog.getBoundingClientRect()
      startLeft = rect.left
      startTop = rect.top
      
      dialog.style.transition = 'none'
      dialog.classList.add('is-dragging')
      
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    }
    
    // 鼠标移动事件
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      
      const deltaX = e.clientX - startX
      const deltaY = e.clientY - startY
      
      const newLeft = startLeft + deltaX
      const newTop = startTop + deltaY
      
      dialog.style.left = `${newLeft}px`
      dialog.style.top = `${newTop}px`
      dialog.style.transform = 'none'
    }
    
    // 鼠标释放事件
    const onMouseUp = () => {
      isDragging = false
      dialog.style.transition = 'all 0.3s ease'
      dialog.classList.remove('is-dragging')
      
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
    
    // 添加拖拽事件监听
    header.addEventListener('mousedown', onMouseDown)
    header.style.cursor = 'move'
    header.style.userSelect = 'none'
  }
  
  // 清理函数
  const cleanup = () => {
    observer.disconnect()
    enablePageScroll()
  }
  
  return cleanup
}

// 自动初始化
if (typeof window !== 'undefined') {
  // 在DOM加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupGlobalDialogManager)
  } else {
    setupGlobalDialogManager()
  }
} 