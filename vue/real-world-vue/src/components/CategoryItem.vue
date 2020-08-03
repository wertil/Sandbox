<template>
    <div class="category">
        <div class="category-item"
             @click="openChild"
             :style="`--cat-padding: ${levelsIn * 1}rem;`"
             v-html="getName">
        </div>
        <template v-if="showChild || searchCategoryTree">
            <transition-group name="slide-up">
            <CategoryItem
                v-for="(categoryChild, index) in category.children" :key="index" :category="categoryChild"
                :levelsIn="levelsIn + 1"
                :searchCategoryTree="searchCategoryTree"
            />
            </transition-group>
        </template>
    </div>
</template>

<script>
import CategoryItem from '@/components/CategoryItem.vue'

export default {
    name: 'CategoryItem',
    components: {CategoryItem},
    props: {
        category: {
            type: Object
        },
        levelsIn: {
            type: Number,
            default: 1
        },
        searchCategoryTree: {
            // check if category tree is unfolded to see all results:
            type: Boolean,
            default: false
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
    },
    computed: {
        getName() {
            if (this.category.nameHighlighted) return this.category.nameHighlighted
            return this.category.name
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