<template>
  <NavBar
      :tab-items="navBarItems"
  >
    <NavBarItem
        v-for="item in navBarItems"
        :key="item.id"
        :class="{ active : item.isActive }"
        @click="setActiveNavTabBarItem(item.id)"
    >
      {{ item.name }}
    </NavBarItem>
  </NavBar>
</template>

<script lang="ts" setup>
import NavBar from '~/components/controls/NavBar.vue';
import NavBarItem from '~/components/controls/NavBarItem.vue';

const navBarItems = ref([
  {
    id: 1,
    name: 'Countdown',
    isActive: true,
    color: '#000',
  },
  {
    id: 2,
    name: 'World Time',
    isActive: false,
    color: '#ccc',
  },
]);

function setActiveNavTabBarItem(id: number): void {
  navBarItems.value.forEach(item => {
    item.isActive = item.id === id;
  });
}
</script>

<style lang="scss" scoped>

</style>