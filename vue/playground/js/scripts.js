
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
        cart: 0
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
            this.cart += 1
        },
        changeImage(index) {
            this.selectedVariant = index
        }
    }
  })
  

  var app = new Vue({
    el: '#app',
    data: {
      premium: true
    }
})
