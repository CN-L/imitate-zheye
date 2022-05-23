import { createApp } from 'vue'
import Message from '@/components/Message.vue'
export type MesaageType = 'success' | 'error' | 'default'
const createMessage = (message: string, type: MesaageType, time = 2000) => {
  const messageInstance = createApp(Message, {
    message,
    type
  })
  const mountNode = document.createElement('div') // 创建一个dom
  document.body.appendChild(mountNode) // 添加到token
  messageInstance.mount(mountNode) // 将应用的实例 挂在到mountnode
  setTimeout(() => {
    messageInstance.unmount()
    // document.body.removeChild(mountNode)
  }, time)
}
export default createMessage
