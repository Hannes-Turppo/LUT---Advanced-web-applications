import express, {Express} from "express"
import path from "path"
import morgan from "morgan"
import mongoose, { Connection } from 'mongoose'
import dotenv from "dotenv"
import userRouter from "./src/routes/user"
import apiRouter from "./src/routes/api"

dotenv.config()

const app: Express = express()
const PORT = parseInt(process.env.PORT as string) || 3000

const mongoDB: string = process.env.MONGO_URL as string || ""
mongoose.connect(mongoDB)
mongoose.Promise = Promise
const db: Connection = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))

app.use(express.static(path.join(__dirname, '../public')))
app.use("/api/user", userRouter)
app.use("/api", apiRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
