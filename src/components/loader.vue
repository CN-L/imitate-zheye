<template>
<div :style="{backgroundColor: background || ''}" class="d-flex justify-content-center loader-container align-items-center">
  <div class="text-center">
    <div class="spinner-border text-primary" role="status">
    </div>
    <p v-if="text" class="text-primary">{{text}}</p>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'loaderPage',
  props: {
    text: {
      type: String
    },
    background: String
  },
  setup() {
    return {}
  },
})
</script>
<style>
.loader-container {
  background: rgba(266, 255, 255, .5);
  z-index: 100;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  text-align: center;
}
</style>
