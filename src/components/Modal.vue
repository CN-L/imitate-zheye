<template>
  <teleport to="#modals">
    <div class="modal d-block" v-if="visible" tabindex="-1">
      <div class="modal-dialog w-50">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{title}}</h5>
            <button type="button" class="btn-close" @click="onClose" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="onClose" data-bs-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="onConfirm">确认</button>
          </div>
        </div>
      </div>
  </div>
  </teleport>

</template>
<script lang="ts">
import { defineComponent } from 'vue'
import useDomCreate from '@/hooks/useDomCreate'
export default defineComponent({
  name: 'ModalPage',
  props: {
    title: {
      type: String,
      default: '提示',
    },
    visible: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  emits: ['modal-close', 'modal-on-confirm'],
  setup(props, context) {
    useDomCreate('modals')
    const onClose = () => {
      context.emit('modal-close')
    }
    const onConfirm = () => [
      context.emit('modal-on-confirm')
    ]
    return {
      onClose,
      onConfirm
    }
  },
})
</script>
