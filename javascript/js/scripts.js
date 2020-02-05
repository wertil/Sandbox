
// import {leafletMap} from './modules/maps';
// leafletMap();   


// import Search from './modules/search.js';
// const search = new Search();

const cars = [
    {name:'Ford',price:200},
    {name:'Nissan',price:400},
    {name:'Nissan',price:600}
 ]

 function convertPrice(price) {
     return price * 200;
 }

 const newArray = cars.map( (car) => {
      return `The ${car.name} is ${convertPrice(car.price)} Rupies. `
 })

console.log(newArray);
document.body.insertAdjacentHTML('beforeend', newArray);
