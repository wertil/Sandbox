<template>
  <div class="modal">
    <div class="overlay" @click="$emit('closeModal')"></div>
    <div class="modal-card">
      <slot></slot>
    </div>
  </div>

</template>

<script>
import useKeyDown from "../composables/use-keydown";

export default {
  name: "ModalView",
  emits: ['closeModal'],
  setup(props, {emit}) {
    // array of functions with the key that is supposed to trigger it in useKeyDown function
    useKeyDown([
      { key: 'Escape',fn: () => { emit('closeModal')}}
    ]);
    return {emit}
  }
}
</script>

<style scoped>

</style>
