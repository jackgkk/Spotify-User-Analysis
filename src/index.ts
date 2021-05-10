import express, { Request, Response } from 'express'
import cors from 'cors'
import auth from './Routes/auth'
import topItems from './Routes/topItems'
import recommended from './Routes/getRecommended'

const port = process.env.PORT || 8080
const app = express()
app.use(cors())
app.use('/auth', auth)
app.use('/topItems', topItems)
app.use('/recommended', recommended)
app.get('/', (req: Request, res: Response)=>{
    res.send('Goou')
})

app.listen(port, ()=>{
    console.log("started on port "+port)
})

if(process.env.NODE_ENV==='production'){
    app.use(express.static('../client/build'))
}