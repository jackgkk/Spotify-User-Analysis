import express from 'express'
import cors from 'cors'
import auth from './Routes/auth'
import topItems from './Routes/topItems'

const app = express()
app.use(cors())
app.use('/auth', auth)
app.use('/topItems', topItems)

app.listen(5000, ()=>{
    console.log("started")
})