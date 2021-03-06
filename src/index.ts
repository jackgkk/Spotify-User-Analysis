import express, { Request, Response } from "express"
import cors from "cors"
import auth from "./Routes/auth"
import topItems from "./Routes/topItems"
import recommended from "./Routes/getRecommended"
import path from "path"

const port = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use("/auth", auth)
app.use("/topItems", topItems)
app.use("/recommended", recommended)


app.listen(port, () => {
  console.log(`started on port ${port}`)
})

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")))
}

app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../client/build", 'index.html'))
})
