<template>
  <div class="category-view">
    <input
      class="cat-search"
      placeholder="search categories"
      v-model="searchTerm"
      @keyup="searchIt"
    />
    <div @click="closeDropDown" class="close">close</div>
    <div v-if="openCategoryTree" class="category-box">
      <CategoryItem v-for="(category, index) in data" :key="index" :category="category" />
    </div>
    <div v-else class="category-dropdown" @click="toggleCategoryTree">Select Category</div>
  </div>
</template>

<script>
import CategoryItem from '@/components/CategoryItem.vue'

export default {
    name: 'Categories',
    components: { CategoryItem },
    data() {
        return {
            data: {},
            dataOriginal: {},
            searchTerm: '',
            openCategoryTree: false
        }
    },
    beforeMount() {
        const url = 'http://localhost:3000/children'
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.data = data
                this.dataOriginal = data
            })
    },
    methods: {
        toggleCategoryTree() {
            this.openCategoryTree = !this.openCategoryTree
        },
        findMatches(term, array = this.dataOriginal) {
            return array.filter(category => {
                const regex = new RegExp(term, 'gi')
                return category.name.match(regex)
            })
        },
        searchIt() {
            this.openCategoryTree = true
            const matchArray = this.findMatches(this.searchTerm).map(category => {
                const regex = new RegExp(this.searchTerm, 'gi') // g=global (entire string), i = incensitive
                const catName = category.name.replace(
                    regex,
                    `<span class="hl">${this.searchTerm}</span>`
                )
                 return { name: catName }
            })
            if(matchArray.length) { 
                this.data = matchArray 
                } else {
                    this.data =[{ name: 'no matches found'}]
                    console.log("huhu")
                }            
        },
        closeDropDown() {
            this.openCategoryTree = false
            this.data = this.dataOriginal
            this.searchTerm = ''
        }
    }
}
</script>

<style lang="scss">
.cat-search {
    margin-bottom: 1rem;
    padding: 0.5rem;
    text-transform: uppercase;
}

.category-dropdown {
    padding: 0.5rem;
    border: 1px solid grey;
    pointer-events: all;
}

.close {
    cursor: pointer;
    display: inline;
    margin-left: 1rem;
}

.hl {
    color: #39b982;
    font-weight: bold; 
    text-transform: uppercase;
}
</style>