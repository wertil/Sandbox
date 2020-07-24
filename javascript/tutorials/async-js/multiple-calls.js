const API = {

    getProductInfo: (count, price) => {
        return new Promise((resolve, reject) => {
            setTimeout(()=> {
             total = count * price
             resolve(total)
            }, 500) 
         })
    },

    postEmail: (address) =>  {
        return new Promise((resolve, reject) => {
            setTimeout(()=> {
             resolve(`email sent to ${address}.`)
            }, 1000) 
         })
        
    }
}

window.onload = () => {
    Promise.all([API.getProductInfo("4", "10.99"), API.postEmail("test@test.com")])
        .then((response) => {
            console.log(response)
        })
    
}

