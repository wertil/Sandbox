const API = {
    postEmail: (address, total) => setTimeout(() => {
        console.log(`email sent to ${address} confirming price of ${total}`)
    }, 1000)
}

window.onload = () => {
    const price = "19.99"
    let total
    const calcTotal = (count) => {
        
       // faking call to an API to get the price
        return new Promise((resolve, reject) => {
           setTimeout(()=> {
            total = count * price
            resolve(total)
           }, 500) 
        })
    }
    const sendEmail = () => {
        debugger
        API.postEmail("example@gmail.com", total)
    }

    calcTotal(3).then((total) => {
        sendEmail()
    })
    
}

