
// import {leafletMap} from './modules/maps';
// leafletMap();   


import Search from './modules/search.js';
const search = new Search();

const products = [
    { name: 'Iphone', price: 200 },
    { name: 'Motorola', price: 70 },
    { name: 'Samsung', price: 150 },
    { name: 'Sony', price: 98 },
    { name: 'Windows pone', price: 10 }
];

let template = "";

function isOnSale(price) {
    if (price < 100) {
        return "<span>On sale !!</span>"
    }
}

products.forEach(product => {
    template += `
    <div class="product"> 
        <h1>${product.name}</h1>
        <strong>Prices: $ ${product.price} </strong>
        ${isOnSale(product.price)}
    </div>
    `
})


document.body.insertAdjacentHTML('beforeend', template);
