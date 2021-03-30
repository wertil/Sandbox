<template>
  <div class="modal">
    <div class="overlay" @click="$emit('close')"></div>
    <div class="modal-card">
      <slot></slot>
    </div>
  </div>

</template>

<script>
import {onBeforeUnmount} from "vue";

export default {
  name: "ModalView",
  emits: ['close'],
  setup(props, {emit}) {
    let onKeydown = event => {
      if(event.key === 'Escape') {
        emit('close')
      }
    }
    window.addEventListener('keydown', onKeydown)
    onBeforeUnmount(() => {
      window.removeEventListener('keydown', onKeydown)
    })
    return {emit}
  }
}
</script>

<style scoped>

</style>
