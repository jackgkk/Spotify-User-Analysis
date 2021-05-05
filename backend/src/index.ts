import express from 'express'
import cors from 'cors'
import auth from './Routes/auth'
import topItems from './Routes/topItems'
import recommended from './Routes/getRecommended'

const app = express()
app.use(cors())
app.use('/auth', auth)
app.use('/topItems', topItems)
app.use('/recommended', recommended)

app.listen(5000, ()=>{
    console.log("started")
})