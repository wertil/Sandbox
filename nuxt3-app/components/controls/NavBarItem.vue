<template>
  <li
    :style="[`--tabBarItemBg: ${tabBackground}`]"
    class="tab-bar-item"
  >
    <slot />
  </li>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TabBarItem',
  props: {
    tabBackground: {
      type: String,
      default: '',
    },
  },
});
</script>)

<style lang='scss' scoped>
.tab-bar-item {
  padding: 0.5rem 1rem;
  text-transform: uppercase;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease-in-out;
  white-space: nowrap;

  &.active {
    background-color: var(--tabBarItemBg);
  }


  &:hover {
    background-color: var(--tabBarItemBg);
  }


}

</style>
