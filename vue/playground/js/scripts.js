var app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        image: './img/vmSocks-green-onWhite.jpg',
        inStock: true,
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantID: 2234,
                variantColor: "green",
                variantImage: './img/vmSocks-green-onWhite.jpg',
            },
            {
                variantID: 2235,
                variantColor: "blue",
                variantImage: './img/vmSocks-blue-onWhite.jpg',
            }
        ],
        cart: 0

    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        changeImage(url) {
            console.log(url)
            this.image = url
        }
    }
})