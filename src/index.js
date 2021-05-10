import express from 'express'
import cors from 'cors'
import auth from './Routes/auth.ts'
import topItems from './Routes/topItems.ts'
import recommended from './Routes/getRecommended.ts'

const port = process.env.PORT || 5000
const app = express()
app.use(cors())
app.use('/auth', auth)
app.use('/topItems', topItems)
app.use('/recommended', recommended)

app.listen(port, ()=>{
    console.log("started")
})

if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'))
}