<template>
    <div class="category-view">
        <input
            class="cat-search"
            placeholder="search categories"
            v-model="searchTerm"
            @keyup="searchIt"
        />
        <div @click="closeDropDown" class="close">close</div>

        <div class="result-box">

            <Transition name="fade">

                <div class="category-box" v-if="openCategoryTree">
                    <CategoryItem
                        v-for="(category, index) in data"
                        :key="index"
                        :category="category"
                        :searchCategoryTree="searchCategoryTree"
                    />
                </div>
            </Transition>

            <div v-if="!openCategoryTree" class="category-dropdown" @click="toggleCategoryTree">Select Category</div>

        </div>






    </div>
</template>

<script>
import CategoryItem from '@/components/CategoryItem.vue'
import {uuid} from '@/utils'
import _ from 'lodash'

export default {
    name: 'Categories',
    components: {CategoryItem},
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
        addContact() {
            this.contacts.push(this.newContact)
            this.newContact = ""
        },
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

        // creates elements for matchArray
        createMatchElement(element) {
            // create an empty Child array
            const childArray = []

            // loop through the children and create matched element, add to child array
            // recursive function
            let whatLevel = 0;

            if (element.children) {
                element.children.forEach(child => {
                    whatLevel++
                    const dot = '.'
                    console.log('Child', dot.repeat(whatLevel), whatLevel, child.name)
                    childArray.push(this.createMatchElement(child))
                })
            }

            // if element contains search term:
            if (this.isMatch(element.name)) {
                const nameHighlighted = this.highlightSearchMatch(element.name)
                return {
                    nameHighlighted: nameHighlighted,
                    match: true,
                    ...element,
                    children: childArray
                }
            } else {
                return {
                    match: false,
                    ...element,
                    children: childArray
                }
            }

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
            this.matchArray = []

            let firstLevel = 0;
            this.dataOriginal.forEach(element => {
                firstLevel++;
                console.log('Level', firstLevel, element.name)

                const matchedElement = this.createMatchElement(element);
                if (matchedElement !== null) {
                    this.matchArray.push(matchedElement)
                }

            })

            // if new Array has content, override data, otherwise show "no results" message
            if (this.matchArray.length) {
                this.data = this.matchArray
            } else {
                this.data = [{name: 'no matches found'}]
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

.category-box {
    width: 100%;
}

.result-box {
    position: relative;
}


</style>