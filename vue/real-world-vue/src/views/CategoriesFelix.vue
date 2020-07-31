<template>
  <div class="category-view">
    <input
      class="cat-search"
      placeholder="search categories"
      v-model="searchTerm"
      @keyup="searchIt"
      @blur="() => {if(!searchTerm){closeDropDown()}}"
    />
    <div @click="closeDropDown" class="close">close</div>
    <div v-if="openCategoryTree" class="category-box">
      <CategoryItem
        v-for="(category, index) in data"
        :key="index"
        :category="category"
        :searchCategoryTree="searchCategoryTree"
      />
    </div>
    <div v-else class="category-dropdown" @click="toggleCategoryTree">Select Category</div>
  </div>
</template>

<script>
import CategoryItem from '@/components/CategoryItem.vue'
import { uuid } from '@/utils'
import _ from 'lodash'

export default {
    name: 'CategoriesFelix',
    components: { CategoryItem },
    data() {
        return {
            data: {},
            dataOriginal: {},
            matchArray: [],
            searchTerm: '',
            openCategoryTree: false,
            searchCategoryTree: false
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
            const regex = new RegExp(term, 'gi')
            return array.filter(category => {
                // g=global (entire string), i = incensitive:
                return category.name.match(regex)
            })
        },

        isMatch(name, term = this.searchTerm) {
            // returns true if it is a match
            // g=global (entire string), i = incensitive:
            const regex = new RegExp(term, 'gi')
            return regex.test(name)
        },

        // creates elements for matchArray
        createMatchElement(element, path = element.name) {
            // create an empty Child array
            const childArray = []
            const isMatched = this.isMatch(element.name);

            // loop through the children and create matched element, add to child array
            // recursive function
            if (element.children !== undefined) {
                element.children.forEach(child => {

                  const matchedElement = this.createMatchElement(child, child.name);
                  if(matchedElement){
                    childArray.push(matchedElement);
                  }
                })
                if(childArray.length){
                  const nameHighlighted = this.highlightSearchMatch(element.name);
                  return {
                    nameHighlighted: nameHighlighted,
                    match: true,
                    ...element,
                    children: childArray
                  }
                }
            }
            else {
              if(isMatched){
                const nameHighlighted = this.highlightSearchMatch(element.name);
                return {
                  nameHighlighted: nameHighlighted,
                  match: true,
                  ...element,
                  children: []
                }
              }
            }

            return null;
        },

        highlightSearchMatch(value) {
            // surrounding the searchterm inside the category name with a span:
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
            this.searchCategoryTree = true

            // Create new Array of the Tree with highlighted matches
            this.matchArray = [];

            this.dataOriginal.forEach(element => {
                const matchedElement = this.createMatchElement(element);
                // only push if element has children or is a match
                if (matchedElement !== null) {
                    this.matchArray.push(matchedElement)
                }
            })

            // if new Array has content, override data, otherwise show "no results" message
            if (this.matchArray.length) {
                // const noMatches = _.remove(this.matchArray, element => {
                //     return element.match == false
                // })
                this.data = this.matchArray
            } else {
                this.data = [{ name: 'no matches found' }]
            }
        },

        closeDropDown() {
            this.openCategoryTree = false
            this.searchCategoryTree = false
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