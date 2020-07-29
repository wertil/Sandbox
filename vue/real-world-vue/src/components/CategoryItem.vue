<template>
    <div class="category">
       <div class="category-item"
        @click="openChild"
        :style="`--cat-padding: ${levelsIn * 1}rem;`"
        v-html="category.name">
        </div>
        <template v-if="showChild">
          <CategoryItem v-for="(categoryChild, index) in category.children" :key="index" :category="categoryChild" :levelsIn="levelsIn + 1"          
           />
        </template>
    </div>
</template>

<script>
import CategoryItem from '@/components/CategoryItem.vue'
    export default {
        name: 'CategoryItem',
        components: { CategoryItem },
         props: {
            category: {
                type: Object
            },
            levelsIn: {
                type: Number,
                default: 1
            }          
         },
          data() {
                return {
                  showChild: false
                }
            },
        methods: {
            openChild() {
                this.showChild = !this.showChild
            }
        }
    }
</script>

<style lang="scss" scoped>
    .category {
        --cat-padding: 1rem;
    }
    .category-item {
          padding: 0.5rem;   
          padding-left: var(--cat-padding);     
          border: 1px solid grey;
          cursor: pointer;
    }
   
</style>