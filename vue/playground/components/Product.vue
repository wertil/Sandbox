<template>
    <div class="product">
        <div class="product-image">
            <img :src="image" alt />
        </div>

        <div class="product-info">
            <h1>{{ title }}</h1>
            <p v-if="inStock">In Stock</p>
            <!-- <p v-else :class="!inStock ? 'line-through' : ''">Out of Stock</p> -->
            <p v-else :class="{ 'line-through' : !inStock}">Out of Stock</p>
            <p>Shipping: {{ shipping }}</p>
            <product-details :details="details" />

            <div
                v-for="(variant, index) in variants"
                :key="variant.variantID"
                class="color-box"
                :style="{ 'background-color': variant.variantColor }"
                @mouseover="changeImage(index)"
            ></div>

            <button
                @click="addToCart"
                :disabled="!inStock"
                :class="{ disabledButton: !inStock }"
            >Add to Cart</button>

            <div class="cart">
                <p>Cart ({{ cart }})</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
     props: {
      premium: {
        type: Boolean,
        required: true
      }
    },
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
};
</script>