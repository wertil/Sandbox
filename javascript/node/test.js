let express = require("express")
let ourApp = express()

ourApp.use(express.urlencoded({extended: false}))

ourApp.get('/', (req, res) => {
    res.send(`
        <form action="/answer" method="POST">
        <p>What color is the sky?</p>
        <input name="skyColor">
        <button>Submit Answer</button>
        </form>
    `)
})

ourApp.post('/answer', (req, res) => {
    if(req.body.skyColor.toUpperCase() == "BLUE"){
        res.send(`
            <p>congrats, that is correct</p>
            <a href="/"> back to home</a>    
        `)
    } else {
        res.send(`
        <p>sorry, wrong answer</p>
        <a href="/"> back to home</a>    
    `)
    }
})

ourApp.get('/answer', (req, res) => {
    res.send("are you lost?")
})

ourApp.listen(3000)
