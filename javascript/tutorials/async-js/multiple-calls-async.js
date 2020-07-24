const API = {

    getProductInfo: async (count, price) => {
        const total = await new Promise((resolve, reject) => {
            setTimeout(()=> {
             resolve(count * price)
            }, 500) 
         })
         return API.postEmail("test@test.com", total)

    },

    postEmail: async (address, total) =>  {
        return await new Promise((resolve, reject) => {           
            setTimeout(()=> {
             resolve(`email sent to ${address} with amount of ${total}.`)
            }, 1000) 
         })
        
    }
}

window.onload = () => {
  API.getProductInfo("4", "10.99")
    .then( response => console.log(response))
}

