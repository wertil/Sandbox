<template>
  <ul
    ref="tabBar"
    :class="['tab-bar', { 'multi-color' : activeColor}]"
    :style="`--tabItemsCount: ${tabItemsCount}; --activeItemLeftPosition: ${ activeItemLeftPosition }px; --activeItemWidth: ${ activeItemWidth }px; ${ activeColor }`"
  >
    <slot />
  </ul>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  name: 'TabBar',
  props: {
    tabItems: {
      type: Object,
      required: true,
    },
  },
  setup(props) {

    const tabItemsCount = computed(() => props.tabItems.length);
    const activeTabItemIndex = computed(() => {
      let count = 0;
      for (let i = 0; i < tabItemsCount.value; i++) {
        if (props.tabItems[i].isActive) {
          count = i;
          break;
        }
      }
      return count;
    });
    const tabBar = ref();
    const tabBarLeftPosition = ref(0);

    // collect left position and width of all tab items:
    const tabItemsProperties = ref([]);

    const activeItemLeftPosition = computed(() => tabItemsProperties.value[activeTabItemIndex.value]?.left - tabBarLeftPosition.value);
    const activeItemWidth = computed(() => tabItemsProperties.value[activeTabItemIndex.value]?.width);
    const activeColor = computed(() => {
      if (props.tabItems[0].color) {
        return `--tabBorderColor: ${props.tabItems[activeTabItemIndex.value].color}`;
      }
      return null;
    });

    onMounted(() => {

      // get left position of tab bar
      tabBarLeftPosition.value = tabBar.value.offsetLeft;
      // get left and width of tab bar items
      // TODO: find out why we need to use setTimeOut to get the proper with of the tab item
      setTimeout(() => {
        const tabBarItems = tabBar.value.querySelectorAll('.tab-bar-item');
        if (tabBarItems) {
          for (let i = 0; i < tabBarItems.length; i++) {
            const left = tabBarLeftPosition.value + tabBarItems[i].offsetLeft;
            const width = tabBarItems[i].offsetWidth;

            tabItemsProperties.value.push({ left: left, width: width });
          }
        }
      }, 0);


    });

    return {
      tabItemsCount,
      activeTabItemIndex,
      tabBar,
      tabBarLeftPosition,
      tabItemsProperties,
      activeItemLeftPosition,
      activeItemWidth,
      activeColor,
    };

  },
});
</script>

<style lang="scss" scoped>

.tab-bar {
  position: relative;
  list-style: none;
  display: inline-flex;
  margin: 0;
  padding: 0;
  --tabBorderColor: var(--primary);


  &:before {
    position: absolute;
    content: "";
    bottom: 0;
    width: var(--activeItemWidth);
    transform: translateX(var(--activeItemLeftPosition));
    height: 3px;
    transition: all 0.3s ease-in-out;
    background-color: var(--tabBorderColor);
  }

}

</style>
