
// import {leafletMap} from './modules/maps';
// leafletMap();   


// import Search from './modules/search.js';
// const search = new Search();

// Fibernaci numbers
let memory = []
function fib(n) {
   let result

    if (memory[n]) return memory[n]
    if (n === 1 || n === 2 )   result = 1
    else result = fib(n -1) + fib(n - 2)
    memory[n] = result
    return result
}
console.log(fib(32))