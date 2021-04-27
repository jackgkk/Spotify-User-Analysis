import express from 'express'

const app = express()

app.get('/sendNudes', (req, res)=>{
    res.send("take your fucking nudes")
})






app.listen(5000, ()=>{
    console.log("started")
})