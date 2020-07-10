
var eventBus = new Vue()

Vue.component('product-tabs', {
    template:'#product-tabs',
    props: {
        reviews: {
          type: Array,
          required: true
        }
      },
    data() {
        return {
            tabs: ['Reviews', 'Make a Review'],
            selectedTab: 'Reviews',
            review: null
        }
    }
})

Vue.component('product-details', {
    props: {
      details: {
        type: Array,
        required: true
      }
    },
    template: `
      <ul>
        <li v-for="detail in details">{{ detail }}</li>
      </ul>
    `
  })

  Vue.component('product-review', {
    template: '#product-review',
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommend: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            this.errors = []
            if (this.name && this.review && this.rating && this.recommend) {
                   let productReview = {
                name: this.name,
                review: this.review,
                rating: this.rating,
                recommend: this.recommend
            }
            eventBus.$emit('review-submitted', productReview)
            this.name = null
            this.review = null
            this.rating = null
            this.recrecommendommend = null
            }    
            else {
                if(!this.name) this.errors.push("Name required")
                if(!this.review) this.errors.push("Review required")
                if(!this.rating) this.errors.push("Rating required")
            }     
        }
    
    }
  })

Vue.component('product', {
    props: {
      premium: {
        type: Boolean,
        required: true
      }
    },
    template: '#product',
    data() {
      return {
        brand: 'Vue Mastery',
        product: 'Socks',
        selectedVariant: 0,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantID: 2234,
                variantColor: "green",
                variantImage: './img/vmSocks-green-onWhite.jpg',
                variantQuantity: 10
            },
            {
                variantID: 2235,
                variantColor: "blue",
                variantImage: './img/vmSocks-blue-onWhite.jpg',
                variantQuantity: 0
            }
        ],
        reviews: []
      }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping(){
            if(this.premium) {
                return "Free"
            }
            return 2.99
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantID)
        },
        removefromCart(){
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantID)
        },
        changeImage(index) {
            this.selectedVariant = index
        }
    },
    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
    }
  })
  

  var app = new Vue({
    el: '#app',
    data: {
      premium: true,
      cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        removeItem(id) {
            this.cart.pop(id)
        }
    }
})
