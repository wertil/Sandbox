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
            matchArray: [],
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
            // finds the searchterm inside name
            return array.filter(category => {
                // g=global (entire string), i = incensitive:
                const regex = new RegExp(term, 'gi')
                return category.name.match(regex)
            })
        },

        isMatch(name, term = this.searchTerm) {
            // returns true if it is a match
            // g=global (entire string), i = incensitive:
            const regex = new RegExp(term, 'gi')
            return regex.test(name)
        },

        loopOfDeatch(element) {
            if (this.isMatch(element.name)) {
                const nameHighlighted = this.highlightSearchMatch(element.name)
                this.matchArray.push({
                    nameHighlighted: nameHighlighted,
                    match: true,
                    ...element,
                    children: []
                })
            } else {
                this.matchArray.push({ match: false, ...element, children: [] })
            }
        },

        highlightSearchMatch(value) {
            // surrouding the searchterm inside the category name with a span:
            const regex = new RegExp(this.searchTerm, 'gi')
            const nameHighlighted = value.replace(
                regex,
                `<span class="hl">${this.searchTerm}</span>`
            )
            return nameHighlighted
        },

        searchIt() {
            // open Category Treee
            this.openCategoryTree = true

            this.matchArray = []

            // Create new Array of the Tree with highlighted matches           
            this.dataOriginal.forEach(element => {
                
                // if the Search Term matches the name:
                this.loopOfDeatch(element) 
                // if(element.children != undefined) {
                //     element.children.forEach(element => {
                //         this.loopOfDeatch(element) 
                //     });                    
                // }
               
            })

            // if new Array has content, override data, otherwise show "no results" message
            if (this.matchArray.length) {
                this.data = this.matchArray
            } else {
                this.data = [{ name: 'no matches found' }]
            }

            console.log(this.matchArray)
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