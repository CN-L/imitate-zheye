import { h, onMounted, render } from 'vue'
import Message from '@/components/Message.vue'
export type MesaageType = 'success' | 'error' | 'default'
const createMessage = (message: string, type: MesaageType, time?: number) => {
  const messageVnode = h(Message, {
    message,
    type,
    onCloseMesssage(result: boolean) {
      if(!result) {
        destory()
      }
    }
  })
  const mountNode = document.createElement('div') // 创建一个真实dom
  document.body.appendChild(mountNode)
  render(messageVnode, mountNode)
  const destory = () => {
    render(null, mountNode)
    document.body.removeChild(mountNode)
  }
  if(time) {
    setTimeout(() => {
      destory()
    }, time)
  }

  onMounted(() => {
    destory()
  })
}
export default createMessage
