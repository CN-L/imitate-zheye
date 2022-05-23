
import { defineComponent, h, ref } from 'vue'

export default defineComponent({
  name: 'VNode',
  props: {
    msg: {
      type: String,
      default: '',
      required: true
    }
  },
  render: () => h('div', { id: '90' }),
  setup(props) {
    const count = ref(1)
    return () => (
      <div>
        <h1>{props.msg}</h1>
        <div>{count.value}</div>
      </div>
      
    )
    // return () => [h('h1', props.msg + count.value), h('div', count.value)]
  }
})