let http = require("http")
let ourApp = http.createServer((req, res) => {
    if (req.url == "/") {
        res.end("Hello, and welcome to our website.")
    }
    if(req.url == "/about") {
        res.end("Thank you.")
    }

    res.end("We cand find the page you are looking for.")
})
ourApp.listen(3000)